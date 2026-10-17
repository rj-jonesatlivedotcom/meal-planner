import type { SupabaseClient } from "@supabase/supabase-js";
import { convertLegacyPlan, readLocalDraft, requireMonday, type WeeklyPlan } from "./weeklyPlans";

export class WeeklyPlanConflict extends Error {
  constructor() {
    super("This week changed elsewhere. Your draft must be reconciled before saving again.");
    this.name = "WeeklyPlanConflict";
  }
}

export class WeeklyPlanSessionChanged extends Error {
  constructor() {
    super("The signed-in account changed. Keep the draft under its original account.");
    this.name = "WeeklyPlanSessionChanged";
  }
}

type AccountClient = Pick<SupabaseClient, "auth" | "from" | "rpc">;

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid account plan response");
  return value as Record<string, unknown>;
}

/** Validate source identity and payload before allowing server data into the local cache. */
export function accountRowToPlan(value: unknown, userId: string, weekStart: string): WeeklyPlan {
  const row = record(value);
  if (row.user_id !== userId || row.week_start !== requireMonday(weekStart)) {
    throw new Error("Account plan identity mismatch");
  }
  if (typeof row.revision !== "number" || !Number.isSafeInteger(row.revision) || row.revision < 1) {
    throw new Error("Invalid account plan revision");
  }
  const shopping = record(row.shopping_state);
  if (row.planner === undefined || row.meal_people === undefined || row.household_people === undefined ||
      !Array.isArray(shopping.checkedItems) || !shopping.legacy ||
      typeof shopping.legacy !== "object" || Array.isArray(shopping.legacy)) {
    throw new Error("Incomplete account plan response");
  }
  const { plan } = convertLegacyPlan({
    owner: { kind: "account", id: userId }, weekStart,
    planner: row.planner, mealPeople: row.meal_people,
    householdPeople: row.household_people, checkedItems: shopping.checkedItems,
  });
  // legacy shopping is retained as evidence, not used to override canonical values.
  plan.shopping.legacy = JSON.parse(JSON.stringify(shopping.legacy)) as Record<string, unknown>;
  plan.baseRevision = row.revision;
  return plan;
}

/** No implicit client construction: callers explicitly supply the intended environment. */
export function createWeeklyPlanAccount(client: AccountClient, userId: string) {
  if (!userId) throw new Error("Account identity required");

  async function checkSession() {
    const { data, error } = await client.auth.getUser();
    if (error || data.user?.id !== userId) throw new WeeklyPlanSessionChanged();
  }

  return {
    /** Read-only legacy source; never import or guess its original date here. */
    async loadLegacy(assignedWeek: string) {
      requireMonday(assignedWeek);
      await checkSession();
      const { data, error } = await client.from("user_meal_plans")
        .select("user_id,planner,meal_people,household_people,checked_items")
        .eq("user_id", userId).maybeSingle();
      await checkSession();
      if (error) throw new Error("Unable to read the legacy plan; migration has not started");
      if (data === null) return null;
      const row = record(data);
      if (row.user_id !== userId || row.planner == null || row.meal_people == null ||
          row.household_people == null || row.checked_items == null) throw new Error("Invalid legacy account snapshot");
      const input = { owner: { kind: "account" as const, id: userId }, weekStart: assignedWeek,
        planner: row.planner, mealPeople: row.meal_people, householdPeople: row.household_people,
        checkedItems: row.checked_items };
      convertLegacyPlan(input);
      return input;
    },
    async load(weekStart: string): Promise<WeeklyPlan | null> {
      requireMonday(weekStart);
      await checkSession();
      const { data, error } = await client.from("user_weekly_meal_plans")
        .select("user_id,week_start,planner,meal_people,household_people,shopping_state,revision")
        .eq("user_id", userId).eq("week_start", weekStart).maybeSingle();
      await checkSession();
      if (error) throw new Error("Unable to load this saved week. The local draft has been retained.");
      return data === null ? null : accountRowToPlan(data, userId, weekStart);
    },

    async save(draft: WeeklyPlan): Promise<WeeklyPlan> {
      // Capture and validate before awaiting: a caller may keep editing or switch weeks.
      const raw = JSON.stringify(draft);
      if (draft.owner.kind !== "account" || draft.owner.id !== userId) throw new WeeklyPlanSessionChanged();
      const snapshot = readLocalDraft({ getItem: () => raw }, draft.owner, draft.weekStart)!;
      await checkSession();
      const { data, error } = await client.rpc("rp_save_week", {
        p_week_start: snapshot.weekStart,
        p_expected_revision: snapshot.baseRevision,
        p_planner: snapshot.planner,
        p_meal_people: snapshot.mealPeople,
        p_household_people: snapshot.householdPeople,
        p_shopping_state: snapshot.shopping,
      });
      await checkSession();
      if (error?.code === "PT409") throw new WeeklyPlanConflict();
      if (error) throw new Error("Unable to save this week. Keep the draft and reload before retrying.");
      const saved = accountRowToPlan(data, userId, snapshot.weekStart);
      if (saved.baseRevision !== (snapshot.baseRevision === null ? 1 : snapshot.baseRevision + 1)) {
        throw new Error("Unexpected save revision; reload the account week before continuing");
      }
      return saved;
    },
  };
}

/** Latest-selection guard. Cache/save operations must still retain their own week identity. */
export function createWeekSelectionLoader(account: Pick<ReturnType<typeof createWeeklyPlanAccount>, "load">) {
  let generation = 0;
  return {
    cancel() { generation += 1; },
    async select(weekStart: string): Promise<
      { stale: true } | { stale: false; weekStart: string; plan: WeeklyPlan | null }
    > {
      requireMonday(weekStart);
      const request = ++generation;
      try {
        const plan = await account.load(weekStart);
        return request === generation ? { stale: false, weekStart, plan } : { stale: true };
      } catch (error) {
        if (request !== generation) return { stale: true };
        throw error;
      }
    },
  };
}
