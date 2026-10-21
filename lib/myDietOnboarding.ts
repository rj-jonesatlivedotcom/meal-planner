import type { Requirements, MonitoredNutrient } from "./myDiet";
import { visibleMonitoredNutrients } from "./myDiet";

export const onboardingSteps = ["Meet Henle", "Nutrients to monitor", "Your dietary guidance", "Foods you love and avoid", "You're ready!"];
export const henleGuidance = [
  { opening: "Hi! I'm Henle!", text: "I'll help make RenalPlan feel right for you." },
  { opening: "Nutrients to monitor", text: "Pick what matters to you!" },
  { opening: "Your daily targets", text: "Has your kidney team given you daily targets? You can also just monitor." },
  { opening: "Foods you love and avoid", text: "What should we know about your plate?" },
  { opening: "A little more you", text: "Take a look. Does this feel right?" },
];
export const nutrientExplanations: Record<MonitoredNutrient, string> = {
  potassium: "View the potassium amounts available for your planned meals. Selecting this does not set a restriction.",
  phosphate: "View phosphorus amounts where available. Your saved settings use the internal name phosphate.",
  sodium: "Keep an eye on salt and sodium. My Diet displays salt in grams and stores the equivalent sodium amount.",
  protein: "View protein amounts in grams. You can enter a daily minimum or maximum if you already have one.",
  calories: "View energy in kcal, with an optional daily target or range from your kidney team.",
  carbohydrate: "View carbohydrate amounts in grams, with an optional existing daily range.",
  fluid: "Record that you monitor fluid. An optional allowance can be entered in millilitres; dashboard fluid totals may be unavailable.",
};

export type TargetKey = "sodiumLimit" | "proteinMinG" | "proteinMaxG" | "potassiumLimitMg" |
  "phosphateLimitMg" | "carbohydrateMin" | "carbohydrateMax" | "fluidLimitMl" | "energyMinKcal" | "energyMaxKcal";
export const onboardingTargets: { key: TargetKey; label: string; unit: string }[] = [
  { key: "sodiumLimit", label: "Salt maximum", unit: "g/day" },
  { key: "proteinMinG", label: "Protein minimum", unit: "g/day" },
  { key: "proteinMaxG", label: "Protein maximum", unit: "g/day" },
  { key: "potassiumLimitMg", label: "Potassium maximum", unit: "mg/day" },
  { key: "phosphateLimitMg", label: "Phosphorus maximum", unit: "mg/day" },
  { key: "carbohydrateMin", label: "Carbohydrate minimum", unit: "g/day" },
  { key: "carbohydrateMax", label: "Carbohydrate maximum", unit: "g/day" },
  { key: "fluidLimitMl", label: "Fluid allowance", unit: "ml/day" },
  { key: "energyMinKcal", label: "Energy minimum", unit: "kcal/day" },
  { key: "energyMaxKcal", label: "Energy maximum", unit: "kcal/day" },
];

export function createOnboardingDraft(requirements: Requirements): Requirements {
  const resuming = requirements.onboardingStatus === "in_progress" || requirements.onboardingStatus === "skipped";
  const step = requirements.onboardingStep;
  return { ...requirements, preferredName: requirements.preferredName ?? null,
    monitoredNutrients: visibleMonitoredNutrients(requirements), dietaryAdvice: requirements.dietaryAdvice ?? null,
    foodAllergies: requirements.foodAllergies ?? null, dislikedFoods: requirements.dislikedFoods ?? null,
    onboardingVersion: 1, onboardingStatus: "in_progress",
    onboardingStep: resuming && typeof step === "number" && Number.isInteger(step) && step >= 1 && step <= 5 ? step : 1 };
}

export function parseFoodList(text: string) {
  return [...new Set(text.split(/[,\n]/).map(item => item.trim()).filter(Boolean))];
}

export function targetDisplayValue(requirements: Requirements, key: TargetKey): number | "" {
  const value = key === "energyMinKcal" || key === "energyMaxKcal" ? requirements.nutrientTargetSettings?.[key] : requirements[key];
  return value == null ? "" : key === "sodiumLimit" ? Number((value / 400).toFixed(2)) : value;
}

export function withTarget(requirements: Requirements, key: TargetKey, text: string): Requirements {
  const number = text === "" ? null : Number(text);
  if (key === "energyMinKcal" || key === "energyMaxKcal") return { ...requirements,
    nutrientTargetSettings: { ...requirements.nutrientTargetSettings, [key]: number } };
  return { ...requirements, [key]: number === null ? null : key === "sodiumLimit" ? Math.round(number * 400) : number };
}

export function validateOnboardingTargets(requirements: Requirements): string | null {
  for (const { key, label } of onboardingTargets) {
    const value = targetDisplayValue(requirements, key);
    if (value !== "" && (!Number.isFinite(value) || value < 0)) return `${label} must be a number of zero or more, or left blank.`;
  }
  if (requirements.proteinMinG != null && requirements.proteinMaxG != null && requirements.proteinMinG > requirements.proteinMaxG)
    return "Protein minimum must not exceed the maximum.";
  if (requirements.carbohydrateMin != null && requirements.carbohydrateMax != null && requirements.carbohydrateMin > requirements.carbohydrateMax)
    return "Carbohydrate minimum must not exceed the maximum.";
  const energy = requirements.nutrientTargetSettings;
  if (energy?.energyMinKcal != null && energy.energyMaxKcal != null && energy.energyMinKcal > energy.energyMaxKcal)
    return "Energy minimum must not exceed the maximum.";
  return null;
}

export type OnboardingAction = "continue" | "skip" | "complete";
export async function saveOnboardingAction(requirements: Requirements, step: number, action: OnboardingAction,
  save: (next: Requirements) => Promise<void>): Promise<Requirements> {
  const next: Requirements = { ...requirements, onboardingVersion: 1,
    onboardingStatus: action === "complete" ? "completed" : action === "skip" ? "skipped" : "in_progress",
    onboardingStep: action === "continue" ? Math.min(5, step + 1) : step };
  // Do not advance or acknowledge completion until the existing account save resolves.
  await save(next);
  return next;
}

export function onboardingSaveError(error: unknown) {
  const code = error && typeof error === "object" && "code" in error ? error.code : null;
  const message = error && typeof error === "object" && "message" in error ? String(error.message) : "";
  if (message.includes("signed-in account changed") || message.includes("Sign in to save"))
    return "Your sign-in has changed. Reopen My Diet, sign in if needed, and try again. Setup has not been marked complete.";
  if (code === "PGRST204" || code === "42703")
    return "Account saving isn't available yet. Your answers are still here; setup is not complete.";
  if (code === "23514")
    return "These choices couldn't be saved. Your answers are still here; setup is not complete.";
  return "We couldn't save your answers to your account. Your entries are still here. Please try again. Setup has not been marked complete.";
}
