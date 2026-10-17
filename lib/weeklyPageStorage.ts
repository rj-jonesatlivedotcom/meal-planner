import { useState } from "react";
import { datedPlannerEnabled } from "./supabase/config";
import { convertLegacyPlan, dateForSlot, WEEK_DAYS, MEAL_SLOTS, type WeeklyPlan } from "./weeklyPlans";
import type { createWeeklyPlanContext } from "./weeklyPlanContext";

type Scope = { owner: WeeklyPlan["owner"] | null; weekStart: string } | null;
type Context = ReturnType<typeof createWeeklyPlanContext>;
let context: Context | null = null;
let queue: Promise<void> = Promise.resolve();
const requested = new Map<string, string>();
const activeJournals = new Set<string>();
export function pendingWeeklyChanges() {
  const prefix = scope("pending-change");
  const changes: Array<{ journal: string; key: string; value: unknown }> = [];
  for (let i = 0; i < localStorage.length; i++) {
    const journal = localStorage.key(i);
    if (!journal?.startsWith(`${prefix}:`) || activeJournals.has(journal)) continue;
    const entry = JSON.parse(localStorage.getItem(journal)!);
    if (!entry.reviewed) changes.push({ journal, key: entry.key, value: entry.value });
  }
  return changes;
}
export function retainReviewedWeeklyChange(journal: string) {
  if (!journal.startsWith(`${scope("pending-change")}:`)) throw new Error("Recovery identity changed");
  const entry = JSON.parse(localStorage.getItem(journal)!);
  localStorage.setItem(journal, JSON.stringify({ ...entry, reviewed: true }));
}
export function flushWeeklyPageWrites() { return queue; }
export function attachWeeklyPages(value: Context | null) { context = value; }
export function datedSnapshot() { return context?.getSnapshot() ?? null; }

export function datedDayDate(day: string) {
  const state = datedSnapshot();
  return datedPlannerEnabled() && state?.plan && WEEK_DAYS.includes(day as typeof WEEK_DAYS[number])
    ? dateForSlot(state.weekStart, day as typeof WEEK_DAYS[number]) : null;
}

export function projectShopping(plan: WeeklyPlan) {
  const counts: Record<string, number> = {};
  WEEK_DAYS.forEach(day => MEAL_SLOTS.forEach(meal => {
    const id = plan.planner[day][meal];
    if (id) counts[id] = (counts[id] ?? 0) + (plan.mealPeople[day][meal] ?? plan.householdPeople);
  }));
  return { ...plan.shopping.legacy, people: plan.householdPeople, checkedItems: plan.shopping.checkedItems,
    plannerRecipes: Object.keys(counts), selectedRecipes: Object.keys(counts), plannerCounts: counts };
}

function scope(key: string, state: Scope = datedSnapshot()) {
  if (!state?.owner) throw new Error("Week account not ready");
  return `renalplan:weekly-ui:${state.owner.kind}:${encodeURIComponent(state.owner.id)}:${state.weekStart}:${key}`;
}
function fluidScope(state: Scope = datedSnapshot()) {
  if (!state?.owner) throw new Error("Fluid account not ready");
  return `renalplan:weekly-ui:${state.owner.kind}:${encodeURIComponent(state.owner.id)}:fluid-log`;
}

/** Compatibility projection of the ONE shared store, not a legacy-key mirror.
 * Original localStorage keys remain untouched in dated mode.
 */
export function createWeeklyPageStorage() {
  const bound = datedPlannerEnabled() ? context?.capture() : null;
  const identity = bound ? { owner: bound.owner, weekStart: bound.week } : null;
  return {
  getItem(key: string) {
    if (!datedPlannerEnabled()) return localStorage.getItem(key);
    if (key === "renalplan-fluid-log-v1") return localStorage.getItem(fluidScope(identity));
    const plan = bound?.read();
    if (key === "weekly-planner") return plan ? JSON.stringify({ ...plan.planner, mealPeople: plan.mealPeople }) : null;
    if (key === "shopping-data") return plan ? JSON.stringify(projectShopping(plan)) : null;
    return localStorage.getItem(scope(key, identity));
  },
  setItem(key: string, raw: string) {
    if (!datedPlannerEnabled()) return localStorage.setItem(key, raw);
    if (key === "renalplan-fluid-log-v1") return localStorage.setItem(fluidScope(identity), raw);
    if (key !== "weekly-planner" && key !== "shopping-data") {
      return localStorage.setItem(scope(key, identity), raw);
    }
    if (!bound) throw new Error("Weekly context unavailable");
    const captured = bound;
    const value = JSON.parse(raw);
    const requestKey = scope(key, identity);
    if (requested.get(requestKey) === raw) return;
    const transform = (plan: WeeklyPlan): WeeklyPlan => {
      if (key === "weekly-planner") {
        const converted = convertLegacyPlan({ owner: plan.owner, weekStart: plan.weekStart, planner: value });
        return { ...plan, planner: converted.plan.planner, mealPeople: converted.plan.mealPeople };
      }
      return { ...plan, householdPeople: value.people ?? plan.householdPeople,
        shopping: { checkedItems: value.checkedItems ?? plan.shopping.checkedItems,
          legacy: { ...plan.shopping.legacy, ...value } } };
    };
    const current = captured.read();
    if (current && JSON.stringify(transform(current)) === JSON.stringify(current)) return;
    const journal = `${scope("pending-change", identity)}:${crypto.randomUUID()}`;
    // Persist intent before scheduling: logout/navigation must not lose it.
    localStorage.setItem(journal, JSON.stringify({ owner: captured.owner, week: captured.week, key, value }));
    requested.set(requestKey, raw);
    activeJournals.add(journal);
    const task = async () => {
      await captured.patch(transform);
      localStorage.removeItem(journal);
      if (requested.get(requestKey) === raw) requested.delete(requestKey);
      window.dispatchEvent(new Event("weekly-planner-updated"));
      window.dispatchEvent(new Event("shopping-list-updated"));
    };
    queue = queue.then(task).catch(error => {
      if (requested.get(requestKey) === raw) requested.delete(requestKey);
      window.dispatchEvent(new CustomEvent("renalplan-week-error", { detail: {
        owner: captured.owner, week: captured.week,
        message: error instanceof Error ? error.message : "Unable to save week",
      } }));
    }).finally(() => { activeJournals.delete(journal); });
  },
  removeItem(key: string) {
    if (!datedPlannerEnabled()) return localStorage.removeItem(key);
    if (key === "weekly-planner" || key === "shopping-data") throw new Error("Clear the selected week through the Planner");
    localStorage.removeItem(scope(key, identity));
  },
};
}

export function useWeeklyPageStorage() {
  const [storage] = useState(createWeeklyPageStorage);
  return storage;
}

export function afterWeeklyPageWrites(navigate: () => void) {
  if (!datedPlannerEnabled()) { navigate(); return; }
  const state = datedSnapshot();
  void queue.then(() => {
    const latest = datedSnapshot();
    if (latest?.owner?.id === state?.owner?.id && latest?.owner?.kind === state?.owner?.kind && latest?.weekStart === state?.weekStart && latest?.status === "ready") navigate();
  });
}

export function navigateWeeklyPage(url: string, clientNavigate: (url: string) => void) {
  if (!datedPlannerEnabled()) { window.location.href = url; return; }
  afterWeeklyPageWrites(() => clientNavigate(url));
}
