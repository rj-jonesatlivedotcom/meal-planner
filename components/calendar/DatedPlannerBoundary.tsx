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
import { currentMonday, mondayForDate, planStorageKey, type WeeklyPlan } from "@/lib/weeklyPlans";
import CalendarToolbar from "./CalendarToolbar";
import { LegacyWeekAssignment, WeekConflictReview } from "./IntegrationControls";
import { stageLegacyGuestImport } from "@/lib/weeklyPlanStore";

type LegacyInput = Parameters<typeof migrateLegacyAccount>[0]["input"];
function isPlannerRoute(path: string) { return path === "/planner"; }

export default function DatedPlannerBoundary({ children }: { children: ReactNode }) {
  return datedPlannerEnabled() ? <TestRuntime>{children}</TestRuntime> : children;
}

function TestRuntime({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [context] = useState(() => createWeeklyPlanContext(currentMonday(), typeof navigator !== "undefined" ? navigator.locks : undefined));
  const state = useSyncExternalStore(context.subscribe, context.getSnapshot, context.getSnapshot);
  const [error, setError] = useState<string | null>(null);
  const [legacy, setLegacy] = useState<LegacyInput | null>(null);
  const [legacyChecked, setLegacyChecked] = useState(false);
  const [review, setReview] = useState<{ local: WeeklyPlan; remote: WeeklyPlan | null; raw: string | null } | null>(null);
  const [pending, setPending] = useState<ReturnType<typeof pendingWeeklyChanges>>([]);

  useEffect(() => {
    if (state.status !== "ready") return;
    void Promise.resolve().then(() => {
      setPending(pendingWeeklyChanges());
    }).catch(failure => setError(failure instanceof Error ? failure.message : "Unable to inspect recovery drafts"));
  }, [state]);

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

  useEffect(() => {
    let cancelled = false;
    const owner = state.owner;
    if (!owner) return;
    void Promise.resolve().then(async () => {
      if (cancelled) return;
      setLegacyChecked(false); setLegacy(null); setReview(null); setError(null);
      if (owner.kind === "account") {
        const original = await createWeeklyPlanAccount(createClient(), owner.id).loadLegacy(currentMonday());
        if (!cancelled) setLegacy(original);
      } else {
        const raw = localStorage.getItem("weekly-planner");
        if (raw && !cancelled) setLegacy({ owner, weekStart: currentMonday(), planner: JSON.parse(raw),
          shopping: JSON.parse(localStorage.getItem("shopping-data") ?? "{}") });
      }
      if (!cancelled) setLegacyChecked(true);
    }).catch(failure => { if (!cancelled) setError(failure instanceof Error ? failure.message : "Unable to inspect legacy data"); });
    return () => { cancelled = true; };
  }, [state.owner]);

  useEffect(() => {
    if (path === "/" && state.owner && state.weekStart !== currentMonday()) void context.select(currentMonday());
  }, [path, state.owner, state.weekStart, context]);

  // Calendar setup and recovery screens belong to the Planner only.
  // Other routes must remain accessible even when an old plan needs importing.
  if (!isPlannerRoute(path)) return children;
  if (!state.owner) return <p role="status" className="p-5">Loading the selected account...</p>;
  const currentReview = review?.local.owner.id === state.owner.id && review?.local.owner.kind === state.owner.kind && review.local.weekStart === state.weekStart ? review : null;
  const currentPending = pending.filter(item => item.journal.startsWith(`renalplan:weekly-ui:${state.owner!.kind}:${encodeURIComponent(state.owner!.id)}:${state.weekStart}:pending-change:`));
  if (error || state.status === "error") return <div className="mx-auto max-w-4xl p-5">
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
  if (!state.plan || !legacyChecked || (path === "/" && state.weekStart !== currentMonday())) return <p role="status" className="p-5">Loading the selected week…</p>;
  if (legacy && legacy.owner.id === state.owner.id && legacy.owner.kind === state.owner.kind) return <div className="mx-auto max-w-3xl p-5"><LegacyWeekAssignment onImport={async week => {
    if (legacy.owner.kind === "account") await migrateLegacyAccount({ account: createWeeklyPlanAccount(createClient(), legacy.owner.id), storage: localStorage, input: { ...legacy, weekStart: week } });
    else stageLegacyGuestImport(localStorage, { ...legacy, weekStart: week });
    setLegacy(null); await context.select(week);
  }} /><button className="mt-3 text-sm underline" onClick={() => setLegacy(null)}>Keep the original and continue without importing</button></div>;
  if (currentPending.length) return <section className="mx-auto max-w-3xl p-5" aria-label="Recover interrupted changes">
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
  const shift = (amount: number) => {
    const date = new Date(`${state.weekStart}T12:00:00Z`); date.setUTCDate(date.getUTCDate() + amount);
    void context.select(mondayForDate(date.toISOString().slice(0, 10)));
  };
  return <div>
    {path === "/planner" && <CalendarToolbar key={`toolbar:${state.owner.kind}:${state.owner.id}:${state.weekStart}`} plan={state.plan}
      shift={shift} thisWeek={() => void context.select(currentMonday())}
      readPlan={() => context.getSnapshot().status === "ready" ? context.getSnapshot().plan : null} />}
    <div key={`${state.owner?.kind}:${state.owner?.id}:${state.weekStart}`}>{children}</div>
  </div>;
}
