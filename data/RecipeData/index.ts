import { breakfasts } from "./breakfasts";
import { lunches } from "./lunches";
import { dinners } from "./dinners";

export const recipes = [
  ...breakfasts,
  ...lunches,
  ...dinners,
];

export type {
  Recipe,
  Ingredient,
  Nutrition,
} from "./types";