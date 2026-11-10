import { breakfasts } from "./breakfasts";
import { lunches } from "./lunches";
import { dinners } from "./dinners";
import { rangeBreakfasts, rangeDinners } from "./rangeAdditions";
import { isPublicBrowseRecipe } from "./variants";

export const recipes = [
  ...breakfasts,
  ...rangeBreakfasts,
  ...lunches,
  ...dinners,
  ...rangeDinners,
];

// Saved meals and favourites still resolve through the complete catalogue.
export const browseRecipes = recipes.filter((recipe) => isPublicBrowseRecipe(recipe.id));

export type {
  Recipe,
  Ingredient,
  Nutrition,
} from "./types";