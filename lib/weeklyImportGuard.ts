import {
  convertLegacyPlan, readLocalDraft, saveLocalDraft, planStorageKey,
  type PlanOwner, type WeeklyPlan,
} from "./weeklyPlans";

type Store = Pick<Storage, "getItem" | "setItem">;

export type LegacyWeekSource = {
  planner: unknown;
  shopping?: unknown;
  householdPeople?: unknown;
};

/**
 * Prepare an explicit legacy-to-dated import. This function NEVER writes or
 * guesses which week an undated legacy plan belongs to.
 */
export function previewLegacyWeekImport(
  storage: Store, owner: PlanOwner, weekStart: string, source: LegacyWeekSource,
): { plan: WeeklyPlan; existing: WeeklyPlan | null; original: string } {
  const { plan, original } = convertLegacyPlan({
    owner, weekStart, planner: source.planner,
    shopping: source.shopping, householdPeople: source.householdPeople,
  });
  return { plan, existing: readLocalDraft(storage, owner, weekStart), original };
}

/**
 * Explicitly accept an import into a genuinely empty dated slot. Refuse to
 * replace even an empty-but-existing week; never delete or alter legacy keys.
 * Account cloud migration must be handled separately with server revisions.
 */
export function acceptLegacyWeekImport(
  storage: Store, owner: PlanOwner, weekStart: string, source: LegacyWeekSource,
): WeeklyPlan {
  const { plan, existing } = previewLegacyWeekImport(storage, owner, weekStart, source);
  if (existing) throw new Error("Target week already exists; review both plans before importing");
  // A second read inside saveLocalDraft catches changes since the preview.
  saveLocalDraft(storage, plan, null);
  return plan;
}

/** Read one owner/week without writing anything or falling back to legacy. */
export function inspectDatedWeek(storage: Pick<Storage, "getItem">, owner: PlanOwner, weekStart: string) {
  return { key: planStorageKey(owner, weekStart), plan: readLocalDraft(storage, owner, weekStart) };
}
