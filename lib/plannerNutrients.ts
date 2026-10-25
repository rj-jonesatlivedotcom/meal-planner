import type { Requirements } from "./myDiet";

export const plannerNutrients = ["Calories", "Protein", "Carbohydrate", "Sodium", "Potassium", "Phosphorus"] as const;
export type PlannerNutrient = typeof plannerNutrients[number];

export function normalizePlannerNutrient(value: unknown): PlannerNutrient {
  return plannerNutrients.includes(value as PlannerNutrient) ? value as PlannerNutrient : "Calories";
}

export function visiblePlannerNutrients(requirements: Partial<Requirements> | null): PlannerNutrient[] {
  const nutrients = { Calories: "calories", Protein: "protein", Carbohydrate: "carbohydrate", Sodium: "sodium", Potassium: "potassium", Phosphorus: "phosphate" } as const;
  return plannerNutrients.filter(nutrient => requirements?.monitoredNutrients == null || requirements.monitoredNutrients.includes(nutrients[nutrient]));
}
