"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { datedPlannerEnabled, calendarGuestStorageKey } from "@/lib/supabase/config";
import { createWeeklyPlanContext, bindWeeklyPlanAuth } from "@/lib/weeklyPlanContext";
import { createWeeklyPlanStore } from "@/lib/weeklyPlanStore";
import { createWeeklyPlanAccount } from "@/lib/weeklyPlanAccount";
import { migrateLegacyAccount } from "@/lib/weeklyPlanMigration";
import { attachWeeklyPages, pendingWeeklyChanges, retainReviewedWeeklyChange, createWeeklyPageStorage, flushWeeklyPageWrites } from "@/lib/weeklyPageStorage";
import { currentMonday, shiftWeek, emptyWeeklyPlan, planStorageKey, type WeeklyPlan } from "@/lib/weeklyPlans";
import CalendarToolbar from "./CalendarToolbar";
import { LegacyWeekAssignment, WeekConflictReview } from "./IntegrationControls";
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

  const [review, setReview] = useState<{ local: WeeklyPlan; remote: WeeklyPlan | null; raw: string | null } | null>(null);
  const [pending, setPending] = useState<ReturnType<typeof pendingWeeklyChanges>>([]);

  useEffect(() => {
    if (state.status !== "ready") return;
    void Promise.resolve().then(() => {
      setError(null);
      setPending(pendingWeeklyChanges());
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

  const usesMeals = path === "/planner" || path === "/shopping" || path === "/nutrition";
  if (!usesMeals) return children;
  if (!state.owner) return <p role="status" className="p-5">{error ?? "Loading saved meals..."}</p>;
  const currentReview = review?.local.owner.id === state.owner.id && review?.local.owner.kind === state.owner.kind && review.local.weekStart === state.weekStart ? review : null;
  const currentPending = pending.filter(item => item.journal.startsWith(`renalplan:weekly-ui:${state.owner!.kind}:${encodeURIComponent(state.owner!.id)}:${state.weekStart}:pending-change:`));
  const recovery = (error || state.status === "error") && <div className="mx-auto max-w-4xl p-5">
    <p role="alert">{error ?? state.error}</p>
    {!currentReview && <button className="mt-3 rounded-lg bg-sky-100 px-4 py-2" onClick={() => {
      void (async () => {
        const local = state.plan ?? context.getDraft();
        if (!local) { setError(null); await context.select(state.weekStart); return; }
        const remote = local.owner.kind === "account" ? await createWeeklyPlanAccount(createClient(), local.owner.id).load(local.weekStart) : null;
        setReview({ local, remote, raw: localStorage.getItem(`${planStorageKey(local.owner, local.weekStart)}:sync`) });
      })().catch(failure => setError(failure instanceof Error ? failure.message : "Review failed"));
    }}>Review saved and local versions</button>}
    {currentReview && <WeekConflictReview key={`${currentReview.local.owner.id}:${currentReview.local.weekStart}:${currentReview.remote?.baseRevision}`} {...currentReview}
      reviewedLocalRaw={currentReview.raw} onResolve={async (choice, revision, raw) => {
        await context.resolve(choice, revision, raw); setReview(null); setError(null);
      }} />}
  </div>;
  const interrupted = currentPending.length > 0 && <section className="mx-auto max-w-3xl p-5" aria-label="Recover interrupted changes">
    <h2 className="font-semibold">Review interrupted changes for {state.weekStart}</h2>
    <p className="my-2 text-sm">These changes were retained before a save finished. Review each change before continuing. The recovery record remains preserved.</p>
    <pre className="max-h-72 overflow-auto whitespace-pre-wrap text-xs">{JSON.stringify(currentPending[0].value, null, 2)}</pre>
    <button className="m-2 rounded-lg bg-sky-100 px-3 py-2" onClick={() => {
      void (async () => {
        const item = currentPending[0], storage = createWeeklyPageStorage();
        storage.setItem(item.key, JSON.stringify(item.value));
        await flushWeeklyPageWrites();
        if (context.getSnapshot().status === "error") return;
        retainReviewedWeeklyChange(item.journal); setPending(pendingWeeklyChanges());
      })().catch(failure => setError(failure instanceof Error ? failure.message : "Recovery failed"));
    }}>Apply this recovered change</button>
    <button className="m-2 rounded-lg border px-3 py-2" onClick={() => {
      retainReviewedWeeklyChange(currentPending[0].journal); setPending(pendingWeeklyChanges());
    }}>Keep current plan; retain recovery record</button>
  </section>;
  const shift = (amount: number) => { void context.select(shiftWeek(state.weekStart, amount / 7)); };
  const shownPlan = state.plan ?? emptyWeeklyPlan(state.owner, state.weekStart);
  return <div>
    {isPlannerRoute(path) && <CalendarToolbar key={`toolbar:${state.owner.kind}:${state.owner.id}:${state.weekStart}`} plan={shownPlan}
      shift={shift} thisWeek={() => void context.select(currentMonday())}
      readPlan={() => context.getSnapshot().status === "ready" ? context.getSnapshot().plan : null} />}
    {recovery}
    {isPlannerRoute(path) && <>
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
      {interrupted && <details className="mx-auto max-w-4xl p-3"><summary>Review interrupted changes</summary>{interrupted}</details>}
    </>}
    {!state.plan ? <p role="status" className="p-5">Loading saved meals...</p> :
      <div key={`${state.owner.kind}:${state.owner.id}:${state.weekStart}`} inert={state.status === "error"}>{children}</div>}
  </div>;
}

/** Only an explicit click reads or offers to assign an undated plan. */
function ExistingPlan({owner, onImported}: {owner: WeeklyPlan["owner"]; onImported: (week: string) => Promise<void>}) {
  const [opened, setOpened] = useState(false);
  const [input, setInput] = useState<LegacyInput | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!opened) return;
    let cancelled = false;
    void (async () => {
      setMessage("Loading existing saved plan...");
      let source: LegacyInput | null = null;
      if (owner.kind === "account") source = await createWeeklyPlanAccount(createClient(), owner.id).loadLegacy(currentMonday());
      else {
        const raw = localStorage.getItem("weekly-planner");
        if (raw) source = {owner, weekStart: currentMonday(), planner: JSON.parse(raw), shopping: JSON.parse(localStorage.getItem("shopping-data") ?? "{}")};
      }
      if (!cancelled) { setInput(source); setMessage(source ? "Your original saved plan stays unchanged until you explicitly assign a week." : "No undated saved plan was found."); }
    })().catch(failure => {if (!cancelled) setMessage(failure instanceof Error ? failure.message : "Unable to read saved plan");});
    return () => {cancelled = true;};
  }, [opened, owner]);
  return <details className="mx-auto max-w-[1448px] px-4 py-1 text-sm md:px-6" onToggle={event => setOpened(event.currentTarget.open)}>
    <summary className="cursor-pointer text-slate-600 dark:text-slate-300">Existing undated plan</summary>
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
