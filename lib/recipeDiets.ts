import type { Recipe } from "@/data/RecipeData";

export const DIET_TYPES = [
  "All", "Keto", "Atkins Phase 1", "Carnivore", "Mediterranean-style",
  "Low FODMAP", "Vegan", "Vegetarian", "Blue Zone-inspired", "DASH-style",
  "Intermittent fasting — eating-window meal", "Mixed diet",
] as const;

export function matchesDietFilter(recipe: Pick<Recipe, "dietCategories">, selected: string): boolean {
  if (selected === "All") return true;
  if (selected === "Not categorised") return !recipe.dietCategories?.length;
  return recipe.dietCategories?.includes(selected) ?? false;
}

export function recipeDietSearchTerms(recipe: Pick<Recipe, "dietCategories">): string {
  const labels = recipe.dietCategories ?? [];
  return [...labels, ...(labels.includes("Keto") ? ["ketogenic"] : [])].join(" ");
}

export function matchesDietSearch(recipe: Pick<Recipe, "dietCategories">, query: string): boolean {
  const constraints: [RegExp, string][] = [
    [/\b(?:keto|ketogenic)\b/i, "Keto"], [/\batkins\b/i, "Atkins Phase 1"],
    [/\bcarnivore\b/i, "Carnivore"], [/\bmediterranean\b/i, "Mediterranean-style"],
    [/\bfodmap\b/i, "Low FODMAP"], [/\bvegan\b/i, "Vegan"],
    [/\bvegetarian\b/i, "Vegetarian"], [/\bdash\b/i, "DASH-style"],
    [/\bblue[\s-]+zones?(?:[\s-]+inspired)?\b/i, "Blue Zone-inspired"],
    [/\bintermittent\s+fasting\b/i, "Intermittent fasting — eating-window meal"],
    [/\bmixed\s+diet\b/i, "Mixed diet"],
  ];
  return constraints.every(([pattern, category]) => !pattern.test(query) || matchesDietFilter(recipe, category));
}
