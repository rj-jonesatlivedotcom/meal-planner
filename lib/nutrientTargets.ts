import { classifyTargetRange, type TargetRangeStatus } from "./energyTarget";
import { isNutrientActive, type Requirements } from "./myDiet";

export type TargetNutrient = "calories" | "protein" | "carbohydrates" | "sodium" | "potassium" | "phosphate" | "fluid";
export type NutrientTargetStatus = TargetRangeStatus | "green" | "red" | "pending";

/** Visible nutrients use their saved numerical limits. Never rewrite saved settings. */
export function getNutrientTarget(requirements: Partial<Requirements> | null, nutrient: TargetNutrient) {
  if (!requirements) return { min: null, max: null };
  const monitored = nutrient === "carbohydrates" ? "carbohydrate" : nutrient;
  if (!isNutrientActive(requirements, monitored)) {
    return { min: null, max: null };
  }
  switch (nutrient) {
    case "calories": return { min: requirements.nutrientTargetSettings?.energyMinKcal, max: requirements.nutrientTargetSettings?.energyMaxKcal };
    case "protein": return { min: requirements.proteinMinG, max: requirements.proteinMaxG };
    case "carbohydrates": return { min: requirements.carbohydrateMin, max: requirements.carbohydrateMax };
    case "sodium": return { min: null, max: requirements.sodiumLimit };
    case "potassium": return { min: null, max: requirements.potassiumLimitMg };
    case "phosphate": return { min: null, max: requirements.phosphateLimitMg };
    case "fluid": return { min: null, max: requirements.fluidLimitMl };
  }
}

export function evaluateNutrientTarget(
  actual: number | null,
  requirements: Partial<Requirements> | null,
  nutrient: TargetNutrient,
  incomplete = false,
): NutrientTargetStatus {
  const { min, max } = getNutrientTarget(requirements, nutrient);
  const status = actual == null || !Number.isFinite(actual) ? null : classifyTargetRange(actual, min, max);
  // A known exceedance remains conclusive even if another contribution is missing.
  if (!status || (incomplete && status !== "Exceeds target")) return "pending";
  if (nutrient === "calories" || (min != null && Number.isFinite(min))) return status;
  return status === "Exceeds target" ? "red" : "green";
}

export function nutrientStatusTone(status: NutrientTargetStatus | null): "green" | "red" | "amber" | "neutral" {
  if (status === "green" || status === "Within target") return "green";
  if (status === "red" || status === "Exceeds target") return "red";
  if (status === "Below target") return "amber";
  return "neutral";
}

export function nutrientStatusText(status: NutrientTargetStatus | null): string {
  if (!status || status === "pending") return "Not assessed";
  if (status === "green") return "Within limit";
  if (status === "red") return "Exceeds limit";
  return status;
}
