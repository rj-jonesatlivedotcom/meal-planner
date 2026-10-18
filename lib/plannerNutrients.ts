export const plannerNutrients = ["Calories", "Protein", "Carbohydrate", "Sodium", "Potassium", "Phosphorus"] as const;
export type PlannerNutrient = typeof plannerNutrients[number];

export function normalizePlannerNutrient(value: unknown): PlannerNutrient {
  return plannerNutrients.includes(value as PlannerNutrient) ? value as PlannerNutrient : "Calories";
}
