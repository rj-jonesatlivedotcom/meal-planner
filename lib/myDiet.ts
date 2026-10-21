import type { SupabaseClient } from "@supabase/supabase-js";

export type RequirementLevel = "Any" | "Low" | "Moderate";
export type CkdStage = "stage3" | "stage4" | "stage5" | "dialysis" | "custom";
export const monitoredNutrients = ["sodium", "protein", "potassium", "phosphate", "calories", "carbohydrate", "fluid"] as const;
export type MonitoredNutrient = typeof monitoredNutrients[number];
export type OnboardingStatus = "not_started" | "in_progress" | "skipped" | "completed";

export type Requirements = {
  ckdStage: CkdStage;
  sodiumLimit: number | null;
  proteinMinG: number | null;
  proteinMaxG: number | null;
  potassiumLimitMg: number | null;
  phosphateLimitMg: number | null;
  potassium: RequirementLevel;
  phosphate: RequirementLevel;
  purines: RequirementLevel;
  carbohydrateMin: number | null;
  carbohydrateMax: number | null;
  fluidLimitMl: number | null;
  // Optional until the additive migration is applied; null means unanswered.
  preferredName?: string | null;
  monitoredNutrients?: MonitoredNutrient[] | null;
  dietaryAdvice?: string | null;
  foodAllergies?: string[] | null;
  dislikedFoods?: string[] | null;
  onboardingVersion?: number | null;
  onboardingStatus?: OnboardingStatus | null;
  onboardingStep?: number | null;
};

export const REQUIREMENTS_STORAGE_KEY = "meal-planner-requirements";
export const REQUIREMENTS_PENDING_SAVE_KEY = "meal-planner-requirements-pending-save";
export const defaultRequirements: Requirements = {
  ckdStage: "custom", sodiumLimit: null, proteinMinG: null, proteinMaxG: null,
  potassiumLimitMg: null, phosphateLimitMg: null, potassium: "Any", phosphate: "Any",
  purines: "Any", carbohydrateMin: null, carbohydrateMax: null, fluidLimitMl: null,
};

const fields = {
  ckdStage: "ckd_stage", sodiumLimit: "sodium_limit", proteinMinG: "protein_min_g",
  proteinMaxG: "protein_max_g", potassiumLimitMg: "potassium_limit_mg",
  phosphateLimitMg: "phosphate_limit_mg", potassium: "potassium", phosphate: "phosphate",
  purines: "purines", carbohydrateMin: "carbohydrate_min", carbohydrateMax: "carbohydrate_max",
  fluidLimitMl: "fluid_limit_ml", preferredName: "preferred_name", monitoredNutrients: "monitored_nutrients",
  dietaryAdvice: "dietary_advice", foodAllergies: "food_allergies", dislikedFoods: "disliked_foods",
  onboardingVersion: "onboarding_version", onboardingStatus: "onboarding_status", onboardingStep: "onboarding_step",
} as const satisfies Record<keyof Requirements, string>;

export function requirementsFromRow(row: Record<string, unknown>): Requirements {
  const mapped: Record<string, unknown> = { ...defaultRequirements };
  for (const [key, column] of Object.entries(fields)) {
    if (column in row) mapped[key] = row[column];
  }
  mapped.ckdStage ??= "custom";
  return mapped as Requirements;
}

export function requirementsToRow(requirements: Requirements, userId: string) {
  const row: Record<string, unknown> = { user_id: userId, updated_at: new Date().toISOString() };
  for (const [key, column] of Object.entries(fields)) {
    const value = requirements[key as keyof Requirements];
    // Omit unavailable columns on databases that have not received the migration.
    if (value !== undefined) row[column] = value;
  }
  return row;
}

export async function loadRequirements(client: SupabaseClient, userId: string) {
  // Selecting the whole owned row works both before and after the additive migration.
  const { data, error } = await client.from("user_requirements").select("*")
    .eq("user_id", userId).maybeSingle();
  return { requirements: data ? requirementsFromRow(data) : null, error };
}

export async function persistRequirements(client: SupabaseClient, userId: string, requirements: Requirements) {
  const { error } = await client.from("user_requirements")
    .upsert(requirementsToRow(requirements, userId), { onConflict: "user_id" });
  if (error) throw error;
}

export function readStoredRequirements(): Requirements | null {
  try {
    const raw = window.localStorage.getItem(REQUIREMENTS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? { ...defaultRequirements, ...parsed } : null;
  } catch {
    return null;
  }
}

export function hasPendingRequirementsSave() {
  try {
    return window.localStorage.getItem(REQUIREMENTS_PENDING_SAVE_KEY) === "true";
  } catch {
    return false;
  }
}

export function syncRequirementsToLocalStorage(requirements: Requirements, pendingSave = false) {
  try {
    // Preserve fields unknown to an older caller, including future profile additions.
    const previous = readStoredRequirements();
    const next = { ...previous, ...requirements };
    // Completion is acknowledged only by the newest successful account save.
    if (pendingSave && next.onboardingStatus === "completed" && previous?.onboardingStatus !== "completed") {
      next.onboardingStatus = previous?.onboardingStatus ?? null;
    }
    window.localStorage.setItem(REQUIREMENTS_STORAGE_KEY, JSON.stringify(next));
    if (pendingSave) window.localStorage.setItem(REQUIREMENTS_PENDING_SAVE_KEY, "true");
    else window.localStorage.removeItem(REQUIREMENTS_PENDING_SAVE_KEY);
    window.dispatchEvent(new Event("meal-planner-requirements-updated"));
  } catch {
    // Retain the existing best-effort cache behaviour when storage is unavailable.
  }
}

export function cacheAccountRequirements(requirements: Requirements): Requirements {
  // Check after the request too: an edit may have started while the account read was in flight.
  const pending = hasPendingRequirementsSave() ? readStoredRequirements() : null;
  if (pending) return pending;
  syncRequirementsToLocalStorage(requirements);
  return readStoredRequirements() ?? requirements;
}

export const monitoringWithoutTargetLabel = "Monitoring — no target entered";
export const nutrientLabels: Record<MonitoredNutrient, string> = {
  sodium: "Salt", protein: "Protein", potassium: "Potassium",
  phosphate: "Phosphorus", calories: "Energy / calories", carbohydrate: "Carbohydrates", fluid: "Fluid",
};

// Null/absent monitoring is a legacy account: preserve its explicitly saved limits.
export function isNutrientActive(requirements: { monitoredNutrients?: MonitoredNutrient[] | null }, nutrient: MonitoredNutrient) {
  return requirements.monitoredNutrients == null || requirements.monitoredNutrients.includes(nutrient);
}

export const targetNutrients = {
  sodiumLimit: "sodium", proteinMinG: "protein", proteinMaxG: "protein",
  potassiumLimitMg: "potassium", phosphateLimitMg: "phosphate",
  carbohydrateMin: "carbohydrate", carbohydrateMax: "carbohydrate", fluidLimitMl: "fluid",
} as const;

/** An assessment-only projection. Never persist this over the saved profile. */
export function activeRequirements<T extends { monitoredNutrients?: MonitoredNutrient[] | null }>(saved: T): T {
  const active = { ...saved } as T & Record<string, unknown>;
  for (const [key, nutrient] of Object.entries(targetNutrients)) {
    if (!isNutrientActive(saved, nutrient)) (active as Record<string, unknown>)[key] = null;
  }
  if (!isNutrientActive(saved, "potassium")) (active as Record<string, unknown>).potassium = "Any";
  if (!isNutrientActive(saved, "phosphate")) (active as Record<string, unknown>).phosphate = "Any";
  return active;
}

export function isMonitoringWithoutTarget(requirements: Requirements, nutrient: MonitoredNutrient) {
  const targets = {
    sodium: [requirements.sodiumLimit], protein: [requirements.proteinMinG, requirements.proteinMaxG],
    potassium: [requirements.potassiumLimitMg], phosphate: [requirements.phosphateLimitMg],
    calories: [], carbohydrate: [requirements.carbohydrateMin, requirements.carbohydrateMax], fluid: [requirements.fluidLimitMl],
  };
  return Boolean(requirements.monitoredNutrients?.includes(nutrient)) && targets[nutrient].every(value => value == null);
}

export function hasConfiguredRequirements(requirements: Requirements | null) {
  if (!requirements) return false;
  return [requirements.potassium, requirements.phosphate, requirements.purines]
    .some(value => ["Low", "Moderate", "High"].includes(value)) ||
    [requirements.sodiumLimit, requirements.proteinMinG, requirements.proteinMaxG,
      requirements.potassiumLimitMg, requirements.phosphateLimitMg, requirements.carbohydrateMin,
      requirements.carbohydrateMax, requirements.fluidLimitMl].some(value => value != null) ||
    Boolean(requirements.monitoredNutrients?.length);
}

/** No rollout is enabled in Stage 1. Pass an explicit, fixed release timestamp in Stage 2.
 * Use auth.getUser().created_at, never the requirements row's creation time or missing settings.
 */
export function isNewAccountEligibleForOnboarding(accountCreatedAt: string, rolloutStartedAt?: string) {
  if (!rolloutStartedAt || !/(Z|[+-]\d{2}:\d{2})$/.test(rolloutStartedAt) ||
    !/(Z|[+-]\d{2}:\d{2})$/.test(accountCreatedAt)) return false;
  const created = Date.parse(accountCreatedAt), rollout = Date.parse(rolloutStartedAt);
  return Number.isFinite(created) && Number.isFinite(rollout) && created >= rollout;
}
