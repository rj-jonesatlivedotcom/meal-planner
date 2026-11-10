import type { Recipe } from "@/data/RecipeData";

export const CUISINES = [
  "British", "Italian", "Chinese", "Indian", "Thai", "Vietnamese", "Mediterranean", "Mexican", "Middle Eastern",
  "Brazilian", "Caribbean & South America", "East Asia", "Europe", "Ghanaian", "Japanese", "Korean", "Moroccan",
  "North Africa", "Peruvian", "South Asia", "Southeast Asia", "Sri Lankan", "West Africa", "Other",
] as const;
export type Cuisine = typeof CUISINES[number];
type CuisineRecipe = Pick<Recipe, "cuisine">;

const normalizeCuisine = (value: string) => value.trim().toLowerCase().replace(/-/g, " ");

// These groups affect browsing only. The catalogue retains each recipe's specific cuisine tag.
const regionalGroups = new Map<string, Cuisine>([
  ["French", "Europe"], ["Hungarian", "Europe"], ["Polish", "Europe"], ["Portuguese", "Europe"],
  ["Indonesian", "Southeast Asia"], ["Malaysian", "Southeast Asia"], ["Nigerian", "West Africa"],
  ["Tunisian", "North Africa"], ["Bangladeshi", "South Asia"], ["Pakistani", "South Asia"],
  ["Caribbean", "Caribbean & South America"], ["South America", "Caribbean & South America"],
  ["South African", "Other"],
]);
const browseNames = new Map<string, Cuisine>(CUISINES.map(cuisine => [cuisine, cuisine]));
const cuisineNames = new Map([...CUISINES, ...regionalGroups.keys()].map(cuisine => [normalizeCuisine(cuisine), cuisine]));

// Map only explicit tags. Regional labels stay regional and unknowns go to Other.
const cuisineAliases = new Map<string, string>([
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

function specificCuisine(value?: string) {
  const label = normalizeCuisine(value ?? "");
  return cuisineNames.get(label) ?? cuisineAliases.get(label);
}

function browseCuisine(name?: string) {
  return name === undefined ? undefined : regionalGroups.get(name) ?? browseNames.get(name);
}

export function recipeCuisine(recipe: CuisineRecipe): Cuisine {
  return browseCuisine(specificCuisine(recipe.cuisine)) ?? "Other";
}

export function recipeCuisineOptions(recipes: readonly CuisineRecipe[]): Cuisine[] {
  const represented = new Set(recipes.map(recipeCuisine));
  return CUISINES.filter(cuisine => represented.has(cuisine));
}

export function restoreCuisineFilter(value: unknown, options: readonly Cuisine[]) {
  const group = typeof value === "string" ? browseCuisine(specificCuisine(value)) : undefined;
  return group && options.includes(group) ? group : "All";
}

export function matchesCuisineFilter(recipe: CuisineRecipe, selected: string): boolean {
  return selected === "All" || recipeCuisine(recipe) === selected;
}

export function recipeCuisineSearchTerms(recipe: CuisineRecipe): string {
  const original = recipe.cuisine?.trim();
  const name = specificCuisine(original);
  return [...new Set([original === "Simple cooking" ? undefined : original, name])]
    .filter(term => term && term !== "Other")
    .join(" ");
}
