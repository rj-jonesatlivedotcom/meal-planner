import { breakfasts } from "./breakfasts";
import { lunches } from "./lunches";
import { dinners } from "./dinners";
import { rangeBreakfasts, rangeDinners } from "./rangeAdditions";

export const recipes = [
  ...breakfasts,
  ...rangeBreakfasts,
  ...lunches,
  ...dinners,
  ...rangeDinners,
];

// Keep L007 available by ID for saved recipes and plans. L002 is the public card.
export const browseRecipes = recipes.filter((recipe) => recipe.id !== "ham-lettuce-sandwich");

export type {
  Recipe,
  Ingredient,
  Nutrition,
} from "./types";