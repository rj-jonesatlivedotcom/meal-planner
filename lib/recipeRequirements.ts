import type { Recipe } from "@/data/recipes";

export type RequirementLevel = "Any" | "Low" | "Moderate";

export type Requirements = {
  sodiumLimit: number | null;
  potassium: RequirementLevel;
  phosphate: RequirementLevel;
  purines: RequirementLevel;
};

export const REQUIREMENTS_STORAGE_KEY = "meal-planner-requirements";

export const defaultRequirements: Requirements = {
  sodiumLimit: 1500,
  potassium: "Any",
  phosphate: "Any",
  purines: "Any",
};

const levelRank: Record<"Low" | "Moderate" | "High", number> = {
  Low: 1,
  Moderate: 2,
  High: 3,
};

function getSodiumNumber(value: string) {
  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function matchesLevel(
  recipeLevel: "Low" | "Moderate" | "High",
  requirement: RequirementLevel
) {
  if (requirement === "Any") return true;
  return levelRank[recipeLevel] <= levelRank[requirement];
}

export function recipeMatchesRequirements(
  recipe: Recipe,
  requirements: Requirements | null
) {
  if (!requirements) {
    return true;
  }

  const mealSodiumGuide =
    requirements.sodiumLimit === null
      ? null
      : requirements.sodiumLimit / 3;

  const sodium = getSodiumNumber(recipe.nutrition.sodium);

  return (
    (mealSodiumGuide === null || sodium <= mealSodiumGuide) &&
    matchesLevel(recipe.potassium, requirements.potassium) &&
    matchesLevel(recipe.phosphate, requirements.phosphate) &&
    matchesLevel(recipe.purines, requirements.purines)
  );
}

export function getStoredRequirements(): Requirements | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(
      REQUIREMENTS_STORAGE_KEY
    );

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as Partial<Requirements>;

    return {
      ...defaultRequirements,
      ...parsed,
    };
  } catch {
    return null;
  }
}
