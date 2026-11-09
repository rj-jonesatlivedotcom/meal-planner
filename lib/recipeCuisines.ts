import type { Recipe } from "@/data/RecipeData";

export const CUISINES = ["British", "Italian", "Chinese", "Indian", "Thai", "Vietnamese", "Mediterranean", "Mexican", "Middle Eastern", "Other"] as const;
export type Cuisine = typeof CUISINES[number];
type CuisineRecipe = Pick<Recipe, "cuisine">;

// Group existing country/adjective metadata for discovery, retaining its original
// specificity for recipe pages and schema. Other includes unclassified recipes.
const taxonomy: Record<string, Cuisine> = {
  britain: "British", british: "British",
  italy: "Italian", italian: "Italian",
  china: "Chinese", chinese: "Chinese",
  india: "Indian", indian: "Indian", "south-indian": "Indian",
  thailand: "Thai", thai: "Thai",
  vietnam: "Vietnamese", vietnamese: "Vietnamese",
  mediterranean: "Mediterranean", greek: "Mediterranean", greece: "Mediterranean", spanish: "Mediterranean", spain: "Mediterranean",
  mexico: "Mexican", mexican: "Mexican",
  "middle eastern": "Middle Eastern", lebanese: "Middle Eastern", lebanon: "Middle Eastern", turkish: "Middle Eastern", turkey: "Middle Eastern", persian: "Middle Eastern", iran: "Middle Eastern",
};
export function recipeCuisine(recipe: CuisineRecipe): Cuisine {
  return taxonomy[recipe.cuisine?.trim().toLowerCase() ?? ""] ?? "Other";
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
