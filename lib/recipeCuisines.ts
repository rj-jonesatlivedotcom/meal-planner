import type { Recipe } from "@/data/RecipeData";

export const CUISINES = [
  "British", "Italian", "Chinese", "Indian", "Thai", "Vietnamese", "Mediterranean", "Mexican", "Middle Eastern",
  "Bangladeshi", "Brazilian", "Caribbean", "East Asia", "French", "Ghanaian", "Hungarian", "Indonesian",
  "Japanese", "Korean", "Malaysian", "Moroccan", "Nigerian", "North Africa", "Pakistani", "Peruvian",
  "Polish", "Portuguese", "South African", "South America", "Southeast Asia", "Sri Lankan", "Tunisian", "West Africa",
  "Other",
] as const;
export type Cuisine = typeof CUISINES[number];
type CuisineRecipe = Pick<Recipe, "cuisine">;

const normalizeCuisine = (value: string) => value.trim().toLowerCase().replace(/-/g, " ");
const cuisineNames = new Map(CUISINES.map(cuisine => [normalizeCuisine(cuisine), cuisine]));

// Map only explicit tags. Regional labels stay regional and unknowns go to Other.
const cuisineAliases = new Map<string, Cuisine>([
  ["britain", "British"], ["italy", "Italian"], ["china", "Chinese"], ["india", "Indian"], ["south indian", "Indian"],
  ["thailand", "Thai"], ["vietnam", "Vietnamese"], ["mexico", "Mexican"],
  ["greek", "Mediterranean"], ["greece", "Mediterranean"], ["spanish", "Mediterranean"], ["spain", "Mediterranean"],
  ["lebanese", "Middle Eastern"], ["lebanon", "Middle Eastern"], ["turkish", "Middle Eastern"], ["turkey", "Middle Eastern"],
  ["persian", "Middle Eastern"], ["iran", "Middle Eastern"],
  ["bangladesh", "Bangladeshi"], ["brazil", "Brazilian"], ["france", "French"], ["ghana", "Ghanaian"],
  ["indonesia", "Indonesian"], ["japan", "Japanese"], ["malaysia", "Malaysian"], ["morocco", "Moroccan"],
  ["pakistan", "Pakistani"], ["peru", "Peruvian"], ["poland", "Polish"], ["portugal", "Portuguese"],
  ["south africa", "South African"], ["sri lanka", "Sri Lankan"],
]);
export function recipeCuisine(recipe: CuisineRecipe): Cuisine {
  const label = normalizeCuisine(recipe.cuisine ?? "");
  return cuisineNames.get(label) ?? cuisineAliases.get(label) ?? "Other";
}
export function recipeCuisineOptions(recipes: readonly CuisineRecipe[]): Cuisine[] {
  const represented = new Set(recipes.map(recipeCuisine));
  return CUISINES.filter(cuisine => represented.has(cuisine));
}
export function matchesCuisineFilter(recipe: CuisineRecipe, selected: string): boolean {
  return selected === "All" || recipeCuisine(recipe) === selected;
}
export function recipeCuisineSearchTerms(recipe: CuisineRecipe): string {
  const cuisine = recipeCuisine(recipe);
  return [recipe.cuisine === "Simple cooking" ? "" : recipe.cuisine, cuisine === "Other" ? "" : cuisine].filter(Boolean).join(" ");
}
