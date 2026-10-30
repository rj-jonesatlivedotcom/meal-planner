import type { Recipe } from "@/data/RecipeData";

export type RequirementLevel = "Any" | "Low" | "Moderate";

export type Requirements = {
  sodiumLimit: number | null;
  potassium: RequirementLevel;
  phosphate: RequirementLevel;
  purines: RequirementLevel;
  carbohydrateMin: number | null;
  carbohydrateMax: number | null;
  potassiumLimitMg?: number | null;
  phosphateLimitMg?: number | null;
};

export const REQUIREMENTS_STORAGE_KEY = "meal-planner-requirements";

export const defaultRequirements: Requirements = {
  sodiumLimit: 1500,
  potassium: "Any",
  phosphate: "Any",
  purines: "Any",
  carbohydrateMin: null,
  carbohydrateMax: null,
};

const levelRank: Record<"Low" | "Moderate" | "High", number> = {
  Low: 1,
  Moderate: 2,
  High: 3,
};

function getSodiumNumber(value: string) {
  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : Number.NaN;
}

function getCarbohydrateNumber(value: string) {
  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : Number.NaN;
}

function matchesLevel(
  recipeLevel: Recipe["potassium"],
  requirement: RequirementLevel
) {
  if (requirement === "Any") return true;
  if (recipeLevel === "Pending review") return false;
  return levelRank[recipeLevel] <= levelRank[requirement];
}

export function recipeMatchesRequirements(
  recipe: Recipe,
  requirements: Requirements | null
) {
  if (!requirements) {
    return true;
  }

  const requiredFields = [
    ...(requirements.sodiumLimit != null ? ["sodium"] : []),
    ...(requirements.carbohydrateMin != null || requirements.carbohydrateMax != null ? ["carbohydrates"] : []),
    ...(requirements.potassiumLimitMg != null ? ["potassium"] : []),
    ...(requirements.phosphateLimitMg != null ? ["phosphate"] : []),
  ] as (keyof Recipe["nutrition"])[];
  if (requiredFields.some(field => recipe.nutritionIncomplete?.includes(field) ||
    !Number.isFinite(getSodiumNumber(recipe.nutrition[field] ?? "")))) return false;
  if ((requirements.potassium !== "Any" && recipe.potassium === "Pending review") ||
    (requirements.phosphate !== "Any" && recipe.phosphate === "Pending review") ||
    (requirements.purines !== "Any" && recipe.purines === "Pending review")) return false;

  const mealSodiumGuide =
    requirements.sodiumLimit === null
      ? null
      : requirements.sodiumLimit / 3;

  const sodium = getSodiumNumber(recipe.nutrition.sodium);
  const carbohydrates = getCarbohydrateNumber(
    recipe.nutrition.carbohydrates
  );

  const matchesCarbohydrateMinimum =
    requirements.carbohydrateMin === null ||
    carbohydrates >= requirements.carbohydrateMin;

  const matchesCarbohydrateMaximum =
    requirements.carbohydrateMax === null ||
    carbohydrates <= requirements.carbohydrateMax;

  return (
    (mealSodiumGuide === null || sodium <= mealSodiumGuide) &&
    (requirements.potassiumLimitMg == null ||
      getSodiumNumber(recipe.nutrition.potassium ?? "") <= requirements.potassiumLimitMg) &&
    (requirements.phosphateLimitMg == null ||
      getSodiumNumber(recipe.nutrition.phosphate ?? "") <= requirements.phosphateLimitMg) &&
    (recipe.clinicalReviewPending || (
      matchesLevel(recipe.potassium, requirements.potassium) &&
      matchesLevel(recipe.phosphate, requirements.phosphate) &&
      matchesLevel(recipe.purines, requirements.purines)
    )) &&
    matchesCarbohydrateMinimum &&
    matchesCarbohydrateMaximum
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




