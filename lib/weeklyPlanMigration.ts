import { convertLegacyPlan, planStorageKey, type WeeklyPlan } from "./weeklyPlans";

type StoragePort = Pick<Storage, "getItem" | "setItem">;
type AccountPort = { load(week: string): Promise<WeeklyPlan | null>; save(plan: WeeklyPlan): Promise<WeeklyPlan> };
type Input = Parameters<typeof convertLegacyPlan>[0];

/** The caller supplies a verified legacy account snapshot and explicitly chosen Monday.
 * Original account/local stores are never modified. No automatic guest adoption.
 */
export async function migrateLegacyAccount(options: {
  account: AccountPort; storage: StoragePort; input: Input;
}): Promise<WeeklyPlan> {
  const { account, storage, input } = options;
  if (input.owner.kind !== "account") throw new Error("Explicit account import required");
  const { plan, original } = convertLegacyPlan(input);
  const archiveKey = `${planStorageKey(plan.owner, plan.weekStart)}:account-legacy-archive`;
  const previous = storage.getItem(archiveKey);
  if (previous !== null && previous !== original) throw new Error("Legacy source changed; retain both snapshots and review");
  if (previous === null) storage.setItem(archiveKey, original);
  const marker = { version: 1, assignedWeek: plan.weekStart, source: original };
  const matches = (candidate: WeeklyPlan) => {
    const saved = candidate.shopping.legacy.renalplanMigration;
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return false;
    const value = saved as Record<string, unknown>;
    // PostgreSQL jsonb does not preserve object property order.
    return value.version === marker.version && value.assignedWeek === marker.assignedWeek && value.source === marker.source;
  };
  // Store the original source in the same owner-protected weekly snapshot for
  // cross-device recovery; it is not used as a second active plan.
  plan.shopping.legacy.renalplanMigration = marker;
  const remote = await account.load(plan.weekStart);
  if (remote) {
    if (matches(remote)) return remote; // Includes later user edits: never re-import.
    throw new Error("Destination week already exists; no import applied");
  }
  try {
    return await account.save(plan); // create-only, null revision
  } catch (error) {
    // A lost response may follow a committed import. Check, never blindly retry.
    const committed = await account.load(plan.weekStart);
    if (committed && matches(committed)) return committed;
    throw error;
  }
}
