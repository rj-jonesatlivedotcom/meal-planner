/** Dated Planner foundation. Not connected to application pages or Supabase yet. */
export const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export const MEAL_SLOTS = ["Breakfast", "Lunch", "Dinner"] as const;
export type WeekDay = typeof WEEK_DAYS[number];
export type MealSlot = typeof MEAL_SLOTS[number];
export type WeeklyMeals = Record<WeekDay, Record<MealSlot, string | null>>;
export type WeeklyPeople = Record<WeekDay, Partial<Record<MealSlot, number>>>;
export type PlanOwner = { kind: "guest"; id: string } | { kind: "account"; id: string };

export const CALENDAR_DEFAULTS = {
  timezone: "Europe/London", breakfastTime: "08:00", lunchTime: "13:00",
  dinnerTime: "18:00", mealReminderMinutes: 15, preparationReminderMinutes: 30,
  shoppingReminderWeekday: "Saturday", shoppingReminderTime: "10:00",
  shoppingReminderBeforePlannedWeek: true, advancePreparationRequiresVerifiedMetadata: true,
} as const;

export interface WeeklyPlan {
  version: 1;
  owner: PlanOwner;
  weekStart: string;
  planner: WeeklyMeals;
  mealPeople: WeeklyPeople;
  householdPeople: number;
  shopping: { checkedItems: string[]; legacy: Record<string, unknown> };
  /** Null means the draft has not been acknowledged by the account database. */
  baseRevision: number | null;
}

function object(value: unknown, name: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${name} must be an object`);
  return value as Record<string, unknown>;
}

function dateValue(value: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error("Expected YYYY-MM-DD date");
  const date = new Date(`${value}T12:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error("Invalid calendar date");
  return date;
}

/** Calendar arithmetic in UTC avoids browser-zone and daylight-saving drift. */
export function mondayForDate(value: string): string {
  const date = dateValue(value);
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
  return date.toISOString().slice(0, 10);
}

export function requireMonday(value: string): string {
  if (mondayForDate(value) !== value) throw new Error("Week must start on Monday");
  return value;
}

export function dateForSlot(weekStart: string, day: WeekDay): string {
  const date = dateValue(requireMonday(weekStart));
  const offset = WEEK_DAYS.indexOf(day);
  if (offset < 0) throw new Error("Invalid weekday");
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

export function shiftWeek(weekStart: string, weeks: number): string {
  if (!Number.isSafeInteger(weeks)) throw new Error("Invalid week offset");
  const date = dateValue(requireMonday(weekStart));
  date.setUTCDate(date.getUTCDate() + weeks * 7);
  return requireMonday(date.toISOString().slice(0, 10));
}

export function currentMonday(now = new Date(), timezone = CALENDAR_DEFAULTS.timezone as string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find(item => item.type === type)!.value;
  return mondayForDate(`${part("year")}-${part("month")}-${part("day")}`);
}

function people(value: unknown): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1 || value > 8) {
    throw new Error("People count must be an integer from 1 to 8");
  }
  return value;
}

function parseMeals(value: unknown): WeeklyMeals {
  const source = object(value, "Planner");
  for (const key of Object.keys(source)) {
    if (!(WEEK_DAYS as readonly string[]).includes(key) && key !== "mealPeople") {
      throw new Error(`Unrecognised Planner field: ${key}`);
    }
  }
  return Object.fromEntries(WEEK_DAYS.map(day => {
    const slots = source[day] === undefined ? {} : object(source[day], day);
    for (const key of Object.keys(slots)) {
      if (!(MEAL_SLOTS as readonly string[]).includes(key)) throw new Error(`Invalid meal slot: ${key}`);
    }
    return [day, Object.fromEntries(MEAL_SLOTS.map(meal => {
      const id = slots[meal];
      if (id !== undefined && id !== null && (typeof id !== "string" || !id.trim())) throw new Error("Invalid recipe ID");
      return [meal, id ?? null];
    }))];
  })) as WeeklyMeals;
}

function parsePeople(value: unknown): WeeklyPeople {
  const source = object(value, "Meal people");
  for (const key of Object.keys(source)) {
    if (!(WEEK_DAYS as readonly string[]).includes(key)) throw new Error(`Invalid people weekday: ${key}`);
  }
  return Object.fromEntries(WEEK_DAYS.map(day => {
    const slots = source[day] === undefined ? {} : object(source[day], day);
    for (const key of Object.keys(slots)) {
      if (!(MEAL_SLOTS as readonly string[]).includes(key)) throw new Error(`Invalid people slot: ${key}`);
    }
    return [day, Object.fromEntries(Object.entries(slots).map(([meal, count]) => [meal, people(count)]))];
  })) as WeeklyPeople;
}

function checked(value: unknown): string[] {
  if (!Array.isArray(value) || value.some(item => typeof item !== "string")) throw new Error("Invalid checked items");
  return [...value];
}

/** Caller must explicitly assign the undated legacy payload to a week. No storage writes. */
export function convertLegacyPlan(input: {
  owner: PlanOwner; weekStart: string; planner: unknown;
  mealPeople?: unknown; householdPeople?: unknown; checkedItems?: unknown;
  shopping?: unknown;
}): { plan: WeeklyPlan; original: string } {
  const planner = object(input.planner, "Planner");
  const shopping = input.shopping === undefined ? {} : object(input.shopping, "Shopping");
  // Conflicting redundant copies require reconciliation; never silently choose one.
  if (input.mealPeople !== undefined && planner.mealPeople !== undefined &&
      JSON.stringify(parsePeople(input.mealPeople)) !== JSON.stringify(parsePeople(planner.mealPeople))) {
    throw new Error("Conflicting embedded and separate people counts");
  }
  const household = input.householdPeople ?? shopping.people ?? 1;
  if (input.householdPeople !== undefined && shopping.people !== undefined && input.householdPeople !== shopping.people) {
    throw new Error("Conflicting household people counts");
  }
  if (input.checkedItems !== undefined && shopping.checkedItems !== undefined &&
      JSON.stringify(checked(input.checkedItems)) !== JSON.stringify(checked(shopping.checkedItems))) {
    throw new Error("Conflicting checked items");
  }
  const plan: WeeklyPlan = {
    version: 1, owner: { ...input.owner }, weekStart: requireMonday(input.weekStart),
    planner: parseMeals(planner), mealPeople: parsePeople(input.mealPeople ?? planner.mealPeople ?? {}),
    householdPeople: people(household),
    shopping: { checkedItems: checked(input.checkedItems ?? shopping.checkedItems ?? []),
      legacy: JSON.parse(JSON.stringify(shopping)) as Record<string, unknown> },
    baseRevision: null,
  };
  planStorageKey(plan.owner, plan.weekStart);
  return { plan, original: JSON.stringify(input) };
}

export function emptyWeeklyPlan(owner: PlanOwner, weekStart: string, householdPeople = 1): WeeklyPlan {
  return convertLegacyPlan({ owner, weekStart, householdPeople, planner: {} }).plan;
}

export function planStorageKey(owner: PlanOwner, weekStart: string): string {
  if (!owner.id || !["guest", "account"].includes(owner.kind)) throw new Error("Invalid plan owner");
  return `renalplan:weekly:v1:${owner.kind}:${encodeURIComponent(owner.id)}:${requireMonday(weekStart)}`;
}

type StoragePort = Pick<Storage, "getItem" | "setItem">;

/** Synchronous same-tab guard only. Cross-tab/account writes still need revision locking. */
export function saveLocalDraft(storage: StoragePort, plan: WeeklyPlan, expectedRaw: string | null): string {
  const key = planStorageKey(plan.owner, plan.weekStart);
  if (storage.getItem(key) !== expectedRaw) throw new Error("Local plan changed; preserve and reconcile both drafts");
  const raw = JSON.stringify(plan);
  storage.setItem(key, raw);
  return raw;
}

/** Reading an absent week never writes, copies a prior week, or deletes legacy storage. */
export function readLocalDraft(storage: Pick<Storage, "getItem">, owner: PlanOwner, weekStart: string): WeeklyPlan | null {
  const raw = storage.getItem(planStorageKey(owner, weekStart));
  if (raw === null) return null;
  const plan = object(JSON.parse(raw), "Weekly plan");
  const storedOwner = object(plan.owner, "Owner");
  if (plan.version !== 1 || plan.weekStart !== weekStart || storedOwner.kind !== owner.kind || storedOwner.id !== owner.id) {
    throw new Error("Stored plan identity mismatch");
  }
  parseMeals(plan.planner);
  parsePeople(plan.mealPeople);
  people(plan.householdPeople);
  const shopping = object(plan.shopping, "Shopping");
  checked(shopping.checkedItems);
  object(shopping.legacy, "Legacy shopping");
  if (plan.baseRevision !== null && (typeof plan.baseRevision !== "number" || !Number.isSafeInteger(plan.baseRevision) || plan.baseRevision < 0)) {
    throw new Error("Invalid account revision");
  }
  return plan as unknown as WeeklyPlan;
}
