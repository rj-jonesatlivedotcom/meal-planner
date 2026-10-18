"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { datedPlannerEnabled, calendarGuestStorageKey } from "@/lib/supabase/config";
import { createWeeklyPlanContext, bindWeeklyPlanAuth } from "@/lib/weeklyPlanContext";
import { createWeeklyPlanStore } from "@/lib/weeklyPlanStore";
import { createWeeklyPlanAccount } from "@/lib/weeklyPlanAccount";
import { migrateLegacyAccount } from "@/lib/weeklyPlanMigration";
import { attachWeeklyPages, flushWeeklyPageWrites } from "@/lib/weeklyPageStorage";
import { currentMonday, shiftWeek, emptyWeeklyPlan, type WeeklyPlan } from "@/lib/weeklyPlans";
import CalendarToolbar from "./CalendarToolbar";
import { LegacyWeekAssignment } from "./IntegrationControls";
import { stageLegacyGuestImport } from "@/lib/weeklyPlanStore";

type LegacyInput = Parameters<typeof migrateLegacyAccount>[0]["input"];
function isPlannerRoute(path: string) { return path === "/planner"; }

export default function DatedPlannerBoundary({ children }: { children: ReactNode }) {
  return datedPlannerEnabled() ? <PlannerRuntime>{children}</PlannerRuntime> : children;
}

function PlannerRuntime({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [context] = useState(() => createWeeklyPlanContext(currentMonday(), typeof navigator !== "undefined" ? navigator.locks : undefined));
  const state = useSyncExternalStore(context.subscribe, context.getSnapshot, context.getSnapshot);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (state.status !== "ready") return;
    // Refresh read-only dashboard/shopping summaries once the correct
    // account's week has finished loading.
    window.dispatchEvent(new Event("weekly-planner-updated"));
    window.dispatchEvent(new Event("shopping-list-updated"));
    void Promise.resolve().then(() => {
      setError(null);
    }).catch(failure => setError(failure instanceof Error ? failure.message : "Unable to inspect recovery drafts"));
  }, [state, context]);

  useEffect(() => {
    attachWeeklyPages(context);
    const guestKey = calendarGuestStorageKey();
    let guestId = localStorage.getItem(guestKey);
    if (!guestId) { guestId = crypto.randomUUID(); localStorage.setItem(guestKey, guestId); }
    const client = createClient();
    const stop = bindWeeklyPlanAuth(context, client.auth, owner => createWeeklyPlanStore({ owner, storage: localStorage,
      ...(owner.kind === "account" ? { account: createWeeklyPlanAccount(client, owner.id) } : {}) }),
    { kind: "guest", id: guestId }, failure => setError(failure instanceof Error ? failure.message : "Unable to verify account"));
    const onError = (event: Event) => {
      const detail = (event as CustomEvent<{ owner: WeeklyPlan["owner"]; week: string; message: string }>).detail;
      const active = context.getSnapshot();
      if (detail.owner.id === active.owner?.id && detail.owner.kind === active.owner.kind && detail.week === active.weekStart) setError(detail.message);
    };
    window.addEventListener("renalplan-week-error", onError);
    return () => { stop(); attachWeeklyPages(null); window.removeEventListener("renalplan-week-error", onError); };
  }, [context]);

  const isRecoveryRoute = path === "/saved-meals/recovery";
  const usesMeals = isRecoveryRoute || path === "/planner" || path === "/shopping" || path === "/nutrition";
  if (!usesMeals) return children;
  if (!state.owner) return <p role="status" className="p-5">{error ? "Unable to load your saved meals. Please reload and try again." : "Loading saved meals..."}</p>;
  const recovery = (error || state.status === "error") && <div className="mx-auto max-w-4xl p-5">
    <p role="alert">Unable to load or save your meals. Please check your connection and try again.</p>
    <button className="mt-3 rounded-lg bg-sky-100 px-4 py-2" onClick={() => {
      setError(null); void context.select(state.weekStart);
    }}>Try again</button>
  </div>;
  const shift = (amount: number) => { void context.select(shiftWeek(state.weekStart, amount / 7)); };
  const shownPlan = state.plan ?? emptyWeeklyPlan(state.owner, state.weekStart);
  return <div>
    {isRecoveryRoute && children}
    {(isPlannerRoute(path) || isRecoveryRoute) && <CalendarToolbar key={`toolbar:${state.owner.kind}:${state.owner.id}:${state.weekStart}`} plan={shownPlan}
      shift={shift} thisWeek={() => void context.select(currentMonday())}
      readPlan={() => context.getSnapshot().status === "ready" ? context.getSnapshot().plan : null} />}
    {recovery}
    {state.notice && <p role="status" className="mx-auto max-w-4xl px-4 py-2 text-sm">{state.notice}</p>}
    {isRecoveryRoute && <>
      <ExistingPlan key={`legacy:${state.owner.kind}:${state.owner.id}`} owner={state.owner} onImported={async week => {
        const owner = state.owner!;
        const current = context.getSnapshot().owner;
        if (!current || current.id !== owner.id || current.kind !== owner.kind) throw new Error("Account changed; reopen the saved plan");
        await flushWeeklyPageWrites();
        const client = createClient();
        await context.setOwner(owner, createWeeklyPlanStore({owner, storage: localStorage,
          ...(owner.kind === "account" ? { account: createWeeklyPlanAccount(client, owner.id) } : {})}));
        await context.select(week);
      }} />
    </>}
    {!state.plan ? (!recovery && <p role="status" className="p-5">Loading saved meals...</p>) :
      <div key={`${state.owner.kind}:${state.owner.id}:${state.weekStart}`} inert={state.status === "error"}>{!isRecoveryRoute && children}</div>}
  </div>;
}

/** Read-only discovery; importing still requires an explicit week assignment. */
function hasPreviousMeals(planner: unknown): boolean {
  if (!planner || typeof planner !== "object") return false;
  return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].some(day => {
    const meals = (planner as Record<string, unknown>)[day];
    return !!meals && typeof meals === "object" && ["Breakfast", "Lunch", "Dinner"].some(slot => {
      const recipe = (meals as Record<string, unknown>)[slot];
      return typeof recipe === "string" && recipe.trim().length > 0;
    });
  });
}
function ExistingPlan({owner, onImported}: {owner: WeeklyPlan["owner"]; onImported: (week: string) => Promise<void>}) {
  const [opened, setOpened] = useState(false);
  const [input, setInput] = useState<LegacyInput | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setMessage("Loading existing saved plan...");
      let source: LegacyInput | null = null;
      if (owner.kind === "account") source = await createWeeklyPlanAccount(createClient(), owner.id).loadLegacy(currentMonday());
      else {
        const raw = localStorage.getItem("weekly-planner");
        if (raw) source = {owner, weekStart: currentMonday(), planner: JSON.parse(raw), shopping: JSON.parse(localStorage.getItem("shopping-data") ?? "{}")};
      }
      if (!cancelled) { setInput(source && hasPreviousMeals(source.planner) ? source : null); setMessage(source ? "Your earlier meals are still saved. Choose a week to use them in your Planner. Your original plan will be kept." : "No undated saved plan was found."); }
    })().catch(failure => {if (!cancelled) setMessage(failure instanceof Error ? failure.message : "Unable to read saved plan");});
    return () => {cancelled = true;};
  }, [owner]);
  if (!input) return null;
  return <details className="mx-auto max-w-[1448px] px-4 py-1 text-sm md:px-6" onToggle={event => setOpened(event.currentTarget.open)}>
    <summary className="cursor-pointer text-slate-600 dark:text-slate-300">Recover an older meal plan</summary>
    {opened && <div className="py-2">
      <p role="status">{message}</p>
      {input && <LegacyWeekAssignment onImport={async week => {
        await flushWeeklyPageWrites();
        if (owner.kind === "account") await migrateLegacyAccount({account: createWeeklyPlanAccount(createClient(), owner.id), storage: localStorage, input: {...input, weekStart: week}});
        else stageLegacyGuestImport(localStorage, {...input, weekStart: week});
        await onImported(week); setInput(null); setMessage("Plan imported. The original is preserved.");
      }} />}
    </div>}
  </details>;
}
