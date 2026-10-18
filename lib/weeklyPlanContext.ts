import { requireMonday, type WeeklyPlan, type PlanOwner } from "./weeklyPlans";
import { createWeeklyPlanStore } from "./weeklyPlanStore";

type Store = ReturnType<typeof createWeeklyPlanStore>;
type LockPort = { request<T>(name: string, callback: () => Promise<T>): Promise<T> };
export type WeekContextSnapshot = {
  owner: PlanOwner | null; weekStart: string; plan: WeeklyPlan | null;
  status: "signed-out" | "loading" | "ready" | "saving" | "error"; error: string | null;
  notice?: string | null;
};

/** Framework-neutral provider for useSyncExternalStore. Not mounted in the app.
 * Auth integration calls setOwner after verified login/logout; old store is disposed.
 */
export function createWeeklyPlanContext(initialWeek: string, locks?: LockPort) {
  let state: WeekContextSnapshot = { owner: null, weekStart: requireMonday(initialWeek), plan: null, status: "signed-out", error: null };
  let store: Store | null = null;
  let generation = 0;
  const listeners = new Set<() => void>();
  const publish = (next: WeekContextSnapshot) => { state = next; listeners.forEach(fn => fn()); };
  const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
  async function coordinate<T>(owner: PlanOwner, week: string, run: () => Promise<T>): Promise<T> {
    if (!locks) {
      if (owner.kind === "account") return run(); // Supabase revisions coordinate account writes.
      throw new Error("Unable to save on this browser. Please try another browser.");
    }
    return locks.request(`renalplan-week:${owner.kind}:${encodeURIComponent(owner.id)}:${week}`, run);
  }
  async function select(week: string) {
    requireMonday(week);
    const target = store;
    if (!target) return;
    const request = ++generation;
    publish({ ...state, weekStart: week, plan: null, status: "loading", error: null, notice: null });
    try {
      const result = await target.select(week);
      if (request === generation && target === store && !result.stale) {
        publish({ ...state, plan: result.plan, status: "ready" });
      }
    } catch {
      if (request === generation && target === store) publish({ ...state, status: "error", error: state.owner?.kind === "account" ? "Unable to load your saved meals. Please check your connection and try again." : "Unable to load meals. Please try again." });
    }
  }
  return {
    getSnapshot: () => state,
    getDraft: () => store?.getDraft(state.weekStart) ?? null,
    subscribe(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn); }; },
    async setOwner(owner: PlanOwner | null, next: Store | null) {
      const request = ++generation; store?.dispose(); store = null;
      publish({ owner: owner ? { ...owner } : null, weekStart: state.weekStart, plan: null, status: owner ? "loading" : "signed-out", error: null });
      // Reject mismatched store ownership before exposing any cached content.
      if (owner && next) {
        let sample: WeeklyPlan;
        try { sample = await next.load(state.weekStart); }
        catch (error) {
          if (request !== generation) { next.dispose(); return; }
          if (owner.kind === "account") {
            store = next;
            publish({ ...state, plan: null, status: "error", error: "Unable to load your saved meals. Please check your connection and try again." });
            return;
          }
          const draft = next.getDraft(state.weekStart);
          if (!draft || JSON.stringify(draft.owner) !== JSON.stringify(owner)) { next.dispose(); throw error; }
          store = next;
          publish({ ...state, plan: draft, status: "error", error: error instanceof Error ? error.message : "Review the saved draft" });
          return;
        }
        if (request !== generation) { next.dispose(); return; }
        if (JSON.stringify(sample.owner) !== JSON.stringify(owner)) { next.dispose(); throw new Error("Provider owner mismatch"); }
        store = next;
        publish({ ...state, plan: sample, status: "ready", error: null });
        return;
      }
      publish({ owner: owner ? { ...owner } : null, weekStart: state.weekStart, plan: null, status: owner ? "loading" : "signed-out", error: null });
      if (store) await select(state.weekStart);
    },
    select,
    /** Capture identity before page handlers enqueue asynchronous edits. */
    capture() {
      const target = store, owner = state.owner, week = state.weekStart;
      if (!target || !owner || !state.plan) throw new Error("Week not loaded");
      const initial = copy(state.plan);
      return {
        owner, week,
        read: () => target === store ? target.getDraft(week) ?? initial : initial,
        async patch(transform: (plan: WeeklyPlan) => WeeklyPlan) {
          return coordinate(owner, week, async () => {
            if (target !== store) throw new Error("Account changed; pending change retained for recovery");
            if (owner.kind !== "account" && state.weekStart === week && state.status === "error") throw new Error("Unable to save meals. Please reload and try again.");
            const current = owner.kind === "account" ? await target.load(week) : target.getDraft(week) ?? await target.load(week);
            if (target !== store) throw new Error("Account changed; pending change retained for recovery");
            const changed = transform(copy(current));
            if (JSON.stringify(changed) === JSON.stringify(current)) return;
            try {
              target.edit(changed);
              if (state.weekStart === week && owner.kind !== "account") publish({ ...state, plan: changed });
              const saved = await target.save(week);
              if (target === store && state.weekStart === week) publish({ ...state, plan: saved, status: "ready", error: null,
                notice: "getSaveNotice" in target ? target.getSaveNotice(week) : null });
            } catch (error) {
              if (target === store && state.weekStart === week) publish({ ...state, plan: owner.kind === "account" ? target.getDraft(week) : changed, status: "error", error: "Unable to save your meals. Please check your connection and try again." });
              throw error;
            }
          });
        },
      };
    },
    async edit(plan: WeeklyPlan) {
      const target = store, owner = state.owner;
      if (!target || !owner || !state.plan || state.status !== "ready" || plan.weekStart !== state.weekStart ||
          JSON.stringify(plan.owner) !== JSON.stringify(owner)) throw new Error("Week is not ready for editing");
      await coordinate(owner, plan.weekStart, async () => {
        if (target !== store) throw new Error("Account changed");
        target.edit(copy(plan));
      });
      if (target === store && state.weekStart === plan.weekStart && owner.kind !== "account") publish({ ...state, plan: copy(plan) });
    },
    async save() {
      const target = store, owner = state.owner, week = state.weekStart, request = generation;
      if (!target || !owner || !state.plan) throw new Error("No selected week to save");
      publish({ ...state, status: "saving", error: null });
      try {
        const saved = await coordinate(owner, week, () => target.save(week));
        if (target === store && request === generation) publish({ ...state, plan: saved, status: "ready", error: null,
          notice: "getSaveNotice" in target ? target.getSaveNotice(week) : null });
      } catch (error) {
        if (target === store && request === generation) publish({ ...state,
          plan: owner.kind === "account" ? target.getDraft(week) : state.plan,
          status: "error", error: "Unable to save your meals. Please check your connection and try again." });
        throw error;
      }
    },
    async resolve(choice: WeeklyPlan | null, reviewedRevision: number | null, reviewedLocalRaw?: string | null) {
      const target = store, owner = state.owner, week = state.weekStart, request = generation;
      if (!target || !owner) throw new Error("Account required");
      const resolved = await coordinate(owner, week, async () => {
        const reviewed = await target.resolve(week, choice, reviewedRevision, reviewedLocalRaw);
        return choice ? target.save(week) : reviewed;
      });
      if (target === store && request === generation) publish({ ...state, plan: resolved, status: "ready", error: null });
    },
  };
}

type AuthPort = {
  getUser(): Promise<{ data: { user: { id: string } | null }; error: unknown }>;
  onAuthStateChange(callback: () => void): { data: { subscription: { unsubscribe(): void } } };
};

/** Opt-in auth binding. Never mounted automatically; verified getUser identity,
 * not editable metadata, selects the owner. Callback work runs outside Auth locks.
 */
export function bindWeeklyPlanAuth(
  context: ReturnType<typeof createWeeklyPlanContext>, auth: AuthPort,
  createStore: (owner: PlanOwner) => Store, guest: PlanOwner,
  onError: (error: unknown) => void,
) {
  if (guest.kind !== "guest") throw new Error("Guest namespace required");
  let generation = 0, closed = false;
  const refresh = () => {
    const request = ++generation;
    // Clear immediately, before verification or any new account load.
    void context.setOwner(null, null);
    void Promise.resolve().then(async () => {
      const { data, error } = await auth.getUser();
      if (closed || request !== generation) return;
      // Supabase reports a missing session as an error for legitimate guests.
      const missingSession = error && typeof error === "object" && "name" in error &&
        error.name === "AuthSessionMissingError";
      if (error && !missingSession) throw new Error("Unable to verify the Planner account");
      const owner: PlanOwner = data.user ? { kind: "account", id: data.user.id } : guest;
      await context.setOwner(owner, createStore(owner));
    }).catch(error => { if (!closed && request === generation) onError(error); });
  };
  const { data: { subscription } } = auth.onAuthStateChange(refresh);
  refresh();
  return () => { closed = true; generation += 1; subscription.unsubscribe(); void context.setOwner(null, null); };
}
