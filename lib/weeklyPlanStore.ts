import { emptyWeeklyPlan, planStorageKey, readLocalDraft, requireMonday,
  convertLegacyPlan, type PlanOwner, type WeeklyPlan } from "./weeklyPlans";

type StoragePort = Pick<Storage, "getItem" | "setItem">;
type AccountPort = {
  load(week: string): Promise<WeeklyPlan | null>;
  save(plan: WeeklyPlan): Promise<WeeklyPlan>;
};
type CacheEntry = { plan: WeeklyPlan; dirty: boolean };
const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const content = (plan: WeeklyPlan) => JSON.stringify({ ...plan, baseRevision: null });

export class WeeklyDraftConflict extends Error {
  constructor() { super("Both the local draft and account week changed. Keep both versions for review."); }
}

/** Shared non-React store. A separate instance belongs to each authenticated owner.
 * No imports from browser clients, no global legacy-key writes, no default environment.
 */
export function createWeeklyPlanStore(options: {
  owner: PlanOwner; storage: StoragePort; account?: AccountPort;
}) {
  const { storage, account } = options;
  const owner = { ...options.owner };
  if ((owner.kind === "account") !== Boolean(account)) throw new Error("Account storage must match the owner namespace");
  const entries = new Map<string, CacheEntry>();
  const observed = new Map<string, string | null>();
  const pending = new Map<string, Promise<WeeklyPlan>>();
  const blocked = new Set<string>();
  let recoverySequence = 0;
  let disposed = false;
  let selection = 0;

  const key = (week: string) => `${planStorageKey(owner, week)}:sync`;
  function active() { if (disposed) throw new Error("This account store is closed"); }
  function archive(week: string, value: unknown) {
    const archiveKey = `${key(week)}:recovery:${Date.now()}:${++recoverySequence}`;
    // Archive before replacing or rejecting a draft. No archive is deleted here.
    if (storage.getItem(archiveKey) !== null) throw new Error("Recovery archive collision");
    storage.setItem(archiveKey, JSON.stringify(value));
  }
  function validate(plan: WeeklyPlan): WeeklyPlan {
    const raw = JSON.stringify(plan);
    return readLocalDraft({ getItem: () => raw }, owner, plan.weekStart)!;
  }
  function read(week: string): CacheEntry | null {
    if (entries.has(week)) return entries.get(week)!;
    const raw = storage.getItem(key(week));
    if (observed.has(week) && raw !== observed.get(week)) throw new WeeklyDraftConflict();
    observed.set(week, raw);
    if (raw === null) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (typeof parsed.dirty !== "boolean") throw new Error("Invalid weekly cache metadata");
    const entry = { plan: validate(parsed.plan), dirty: parsed.dirty };
    if (entry.plan.weekStart !== week) throw new Error("Cached week mismatch");
    entries.set(week, entry);
    return entry;
  }
  function write(entry: CacheEntry) {
    active();
    const week = entry.plan.weekStart;
    // Detect an intervening tab write before replacing its cache. UI integration
    // must also serialise across tabs with Web Locks (or block cross-tab edits).
    const raw = storage.getItem(key(week));
    const existing = entries.get(week);
    if ((existing && raw !== JSON.stringify(existing)) || (observed.has(week) && raw !== observed.get(week))) {
      archive(week, { local: existing, proposed: entry, otherTabRaw: raw });
      blocked.add(week);
      throw new WeeklyDraftConflict();
    }
    const cloned = copy(entry);
    storage.setItem(key(week), JSON.stringify(cloned));
    observed.set(week, JSON.stringify(cloned));
    entries.set(week, cloned);
  }

  async function load(week: string): Promise<WeeklyPlan> {
    active(); requireMonday(week);
    const before = read(week);
    if (!account) return copy(before?.plan ?? emptyWeeklyPlan(owner, week));
    const remote = await account.load(week);
    active();
    const local = read(week);
    // Do not install a server response over edits made while the request ran.
    if (pending.has(week) || local !== before) return copy(local?.plan ?? emptyWeeklyPlan(owner, week));
    if (local?.dirty) {
      if (remote && (remote.baseRevision !== local.plan.baseRevision || content(remote) !== content(local.plan))) {
        // Same base revision is safe: local-only edits may be saved using CAS.
        if (remote.baseRevision !== local.plan.baseRevision) {
          archive(week, { local, remote });
          storage.setItem(`${key(week)}:remote`, JSON.stringify(remote));
          blocked.add(week);
          throw new WeeklyDraftConflict();
        }
      } else if (!remote && local.plan.baseRevision !== null) {
        archive(week, { local, remote: null });
        blocked.add(week); throw new WeeklyDraftConflict();
      }
      return copy(local.plan);
    }
    const result = remote ?? emptyWeeklyPlan(owner, week);
    write({ plan: result, dirty: false });
    return copy(result);
  }

  return {
    dispose() { disposed = true; selection += 1; },
    async select(week: string): Promise<{ stale: true } | { stale: false; plan: WeeklyPlan }> {
      const request = ++selection;
      try {
        const plan = await load(week);
        return request === selection && !disposed ? { stale: false, plan } : { stale: true };
      } catch (error) {
        if (request !== selection || disposed) return { stale: true };
        throw error;
      }
    },
    load,
    getDraft(week: string): WeeklyPlan | null { active(); return copy(read(week)?.plan ?? null); },
    /** Explicit resolution only; reviewed revision must still match the server.
     * choice=null accepts the remote version; a plan is the owner's reviewed merge.
     */
    async resolve(week: string, choice: WeeklyPlan | null, reviewedRevision: number | null, reviewedLocalRaw?: string | null): Promise<WeeklyPlan> {
      active(); requireMonday(week);
      if (pending.has(week)) throw new Error("Wait for the pending save before resolving");
      const local = entries.get(week) ?? null;
      const remote = account ? await account.load(week) : null;
      active();
      if ((entries.get(week) ?? null) !== local) throw new WeeklyDraftConflict();
      if ((remote?.baseRevision ?? null) !== reviewedRevision) throw new WeeklyDraftConflict();
      if (choice && choice.weekStart !== week) throw new Error("Resolution week mismatch");
      const resolved = validate(choice ?? remote ?? emptyWeeklyPlan(owner, week));
      // A local revision token also prevents overwriting another tab during review.
      const raw = storage.getItem(key(week));
      if (((local && raw !== JSON.stringify(local)) ||
          (observed.has(week) && raw !== observed.get(week))) && raw !== reviewedLocalRaw) {
        archive(week, { local, remote, otherTabRaw: raw, proposed: choice });
        throw new WeeklyDraftConflict();
      }
      archive(week, { local, remote, resolution: resolved });
      const next = { ...resolved, baseRevision: remote?.baseRevision ?? null };
      // Only after explicit review and archival may another tab's cache baseline
      // be replaced. The next normal write must still observe that same raw value.
      if (raw !== JSON.stringify(local)) {
        if (raw === null) entries.delete(week);
        else {
          const baseline = JSON.parse(raw) as CacheEntry;
          validate(baseline.plan);
          entries.set(week, baseline);
        }
        observed.set(week, raw);
      }
      write({ plan: next, dirty: choice !== null });
      blocked.delete(week);
      return copy(next);
    },
    edit(plan: WeeklyPlan) {
      active(); validate(plan);
      let existing: CacheEntry | null;
      try { existing = read(plan.weekStart); }
      catch (error) {
        archive(plan.weekStart, { proposed: plan, otherTabRaw: storage.getItem(key(plan.weekStart)) });
        blocked.add(plan.weekStart);
        throw error;
      }
      if (existing && existing.plan.baseRevision !== plan.baseRevision) throw new WeeklyDraftConflict();
      write({ plan, dirty: true });
    },
    async save(week: string): Promise<WeeklyPlan> {
      active(); requireMonday(week);
      if (blocked.has(week)) throw new WeeklyDraftConflict();
      if (pending.has(week)) return copy(await pending.get(week)!);
      const entry = read(week);
      if (!entry) throw new Error("No local draft to save");
      if (!account || !entry.dirty) return copy(entry.plan);
      const snapshot = copy(entry.plan);
      const task = (async () => {
        try {
          const saved = validate(await account.save(snapshot));
          active();
          if (saved.weekStart !== week) throw new Error("Save returned a different week");
          const latest = read(week)!;
          if (content(latest.plan) === content(snapshot)) {
            write({ plan: saved, dirty: false });
          } else {
            // Keep edits made during the save, acknowledging only their baseline.
            write({ plan: { ...latest.plan, baseRevision: saved.baseRevision }, dirty: true });
          }
          return copy(read(week)!.plan);
        } catch (error) {
          // Unknown network outcomes also block automatic retry: the write may
          // have committed. A new load/reconciliation is needed before retry.
          blocked.add(week);
          if (!disposed) archive(week, { local: read(week), attempted: snapshot, unknownSaveOutcome: true });
          throw error;
        } finally { pending.delete(week); }
      })();
      pending.set(week, task);
      return copy(await task);
    },
  };
}

/** Archive-first guest conversion. Never reads/writes the original legacy keys.
 * UI must explicitly supply a date and guest identity. Account import is separate.
 */
export function stageLegacyGuestImport(storage: StoragePort, input: Parameters<typeof convertLegacyPlan>[0]) {
  if (input.owner.kind !== "guest") throw new Error("Guest import cannot claim account ownership");
  const converted = convertLegacyPlan(input);
  const key = planStorageKey(input.owner, input.weekStart);
  const archiveKey = `${key}:legacy-archive`;
  const original = storage.getItem(archiveKey);
  if (original !== null && original !== converted.original) throw new WeeklyDraftConflict();
  if (original === null) storage.setItem(archiveKey, converted.original);
  const syncKey = `${key}:sync`;
  const existing = storage.getItem(syncKey);
  converted.plan.shopping.legacy.renalplanMigration = { version: 1, source: converted.original };
  const result = JSON.stringify({ plan: converted.plan, dirty: true });
  if (existing !== null && existing !== result) {
    const candidate = JSON.parse(existing) as CacheEntry;
    const valid = readLocalDraft({ getItem: () => JSON.stringify(candidate.plan) }, input.owner, input.weekStart)!;
    const marker = valid.shopping.legacy.renalplanMigration as { version?: unknown; source?: unknown } | null;
    if (!marker || marker.version !== 1 || marker.source !== converted.original) {
      throw new WeeklyDraftConflict();
    }
    return valid; // An already imported week may contain later edits.
  }
  if (existing === null) storage.setItem(syncKey, result);
  return converted.plan;
}
