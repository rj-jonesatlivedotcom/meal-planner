import { emptyWeeklyPlan, planStorageKey, readLocalDraft, requireMonday, type PlanOwner, type WeeklyPlan } from "./weeklyPlans";

type Account = { load(week: string): Promise<WeeklyPlan | null>; save(plan: WeeklyPlan): Promise<WeeklyPlan> };
type StoragePort = Pick<Storage, "getItem" | "setItem">;
const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

/** Supabase owns account plans. Browser storage is only a disposable mirror and
 * passive backup; it can never block a read or supply an account plan on login. */
export function createAuthoritativeAccountPlanStore(owner: PlanOwner, storage: StoragePort, account: Account) {
  const saved = new Map<string, WeeklyPlan>();
  const drafts = new Map<string, WeeklyPlan>();
  const pending = new Map<string, Promise<WeeklyPlan>>();
  const loads = new Map<string, number>();
  const notices = new Map<string, string>();
  let disposed = false, selection = 0, sequence = 0;
  const active = () => { if (disposed) throw new Error("This account store is closed"); };
  function validate(plan: WeeklyPlan, week: string) {
    if (plan.weekStart !== week) throw new Error("Account week mismatch");
    return readLocalDraft({ getItem: () => JSON.stringify(plan) }, owner, week)!;
  }
  function backup(week: string, value: unknown) {
    try { storage.setItem(`${planStorageKey(owner, week)}:sync:recovery:${Date.now()}:${++sequence}`, JSON.stringify(value)); }
    catch { /* Storage availability must never prevent reading the saved account. */ }
  }
  function install(plan: WeeklyPlan) {
    active();
    loads.set(plan.weekStart, (loads.get(plan.weekStart) ?? 0) + 1);
    saved.set(plan.weekStart, copy(plan)); drafts.delete(plan.weekStart);
    try {
      const key = `${planStorageKey(owner, plan.weekStart)}:sync`;
      const raw = storage.getItem(key);
      if (raw && raw !== JSON.stringify({ plan, dirty: false })) {
        // Keep stale browser data passively, without asking users to reconcile it.
        storage.setItem(`${key}:recovery:${Date.now()}:${++sequence}`, raw);
      }
      storage.setItem(key, JSON.stringify({ plan, dirty: false }));
    } catch { /* Leave the old browser record untouched if archival is unavailable. */ }
    return copy(plan);
  }
  async function load(week: string): Promise<WeeklyPlan> {
    active(); requireMonday(week);
    if (pending.has(week)) return copy(await pending.get(week)!);
    const request = (loads.get(week) ?? 0) + 1;
    loads.set(week, request);
    const remote = await account.load(week);
    active();
    if (pending.has(week)) return copy(await pending.get(week)!);
    if (request !== loads.get(week) && saved.has(week)) return copy(saved.get(week)!);
    const result = validate(remote ?? emptyWeeklyPlan(owner, week), week);
    const draft = drafts.get(week);
    if (draft) backup(week, { unsaved: draft });
    return install(result);
  }
  return {
    dispose() { disposed = true; selection++; },
    load,
    async select(week: string): Promise<{ stale: true } | { stale: false; plan: WeeklyPlan }> {
      const request = ++selection;
      try {
        const plan = await load(week);
        return disposed || request !== selection ? { stale: true } : { stale: false, plan };
      } catch (error) { if (disposed || request !== selection) return { stale: true }; throw error; }
    },
    getDraft(week: string): WeeklyPlan | null { active(); return copy(drafts.get(week) ?? saved.get(week) ?? null); },
    getSaveNotice(week: string) { return notices.get(week) ?? null; },
    edit(plan: WeeklyPlan) {
      active(); notices.delete(plan.weekStart);
      loads.set(plan.weekStart, (loads.get(plan.weekStart) ?? 0) + 1);
      drafts.set(plan.weekStart, copy(validate(plan, plan.weekStart)));
    },
    async save(week: string): Promise<WeeklyPlan> {
      active(); requireMonday(week);
      if (pending.has(week)) return copy(await pending.get(week)!);
      const snapshot = copy(drafts.get(week) ?? saved.get(week) ?? null);
      if (!snapshot) throw new Error("No selected week to save");
      if (!drafts.has(week)) return snapshot;
      const task = (async () => {
        try {
          const result = validate(await account.save(snapshot), week);
          active();
          const newer = drafts.get(week);
          install(result);
          // A later explicit edit is retained for its next save, never marked saved.
          if (newer && JSON.stringify(newer) !== JSON.stringify(snapshot)) {
            drafts.set(week, { ...newer, baseRevision: result.baseRevision });
          }
          return copy(result);
        } catch {
          active(); backup(week, { unsaved: drafts.get(week), attempted: snapshot });
          // Covers revision collisions and lost replies: read the server once,
          // never replay an entire stale week using a newer revision token.
          try {
            const remote = await account.load(week);
            active();
            const result = validate(remote ?? emptyWeeklyPlan(owner, week), week);
            if (JSON.stringify({ ...result, baseRevision: null }) !== JSON.stringify({ ...snapshot, baseRevision: null })) {
              notices.set(week, "Your saved meals have been refreshed. Please try that change again.");
            }
            return install(result);
          } catch {
            active(); drafts.delete(week);
            throw new Error("Unable to reach your saved plan. Please check your connection and try again.");
          }
        } finally { pending.delete(week); }
      })();
      pending.set(week, task);
      return copy(await task);
    },
    // Compatibility for callers outside the normal UI: account authority is fixed.
    async resolve(week: string, _choice: WeeklyPlan | null, _revision: number | null, _raw?: string | null) {
      void [_choice, _revision, _raw]; // Legacy arguments never choose account content.
      return load(week);
    },
  };
}
