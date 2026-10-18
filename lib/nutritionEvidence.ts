import type { Recipe } from "@/data/RecipeData";

const fieldLabels: Record<string, string> = {
  calories: "energy",
  protein: "protein",
  carbohydrates: "carbohydrate",
  fat: "fat",
  sodium: "sodium",
  salt: "salt",
  potassium: "potassium",
  phosphate: "phosphorus",
  fibre: "fibre",
};

export function getNutritionEvidenceText(
  recipe: Pick<
    Recipe,
    | "conditionalProxyPending"
    | "nutritionIncomplete"
  | "nutritionSourceNote"
    | "quantityConversionsEstimated"
    | "clinicalReviewPending"
  >,
): string {
  const notes = ["CoFID ingredient-input estimate"];

  if (recipe.conditionalProxyPending) {
    notes.push("provisional pending owner approval of a conditional food match");
  }

  if (recipe.nutritionSourceNote) {
    notes.push(recipe.nutritionSourceNote);
  }

  if (recipe.nutritionIncomplete?.length) {
    const missing = recipe.nutritionIncomplete
      .map((field) => fieldLabels[field] ?? field)
      .join(", ");
    notes.push(
      `incomplete: CoFID marks ${missing} input(s) N; known contributions are shown as a subtotal and missing values are not treated as zero`,
    );
  }

  if (recipe.quantityConversionsEstimated) {
    notes.push("includes qualified standard quantity-conversion estimates");
  }

  if (recipe.clinicalReviewPending) {
    notes.push("dietary classifications and guidance are pending renal dietitian review");
  }

  return `${notes.join("; ")}.`;
}

export const clinicalReviewNotice =
  "Potassium and phosphorus classifications and dietary guidance are pending qualified renal dietitian review.";
