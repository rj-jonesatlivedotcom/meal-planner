import type { Recipe } from "@/data/RecipeData/types";
import guides from "@/data/dietaryGuides.json";

export const neutralDietaryGuide =
  "Use the ingredient amounts and serving size shown when planning this meal. Compare the nutrition information with your saved My Diet targets and any advice from your renal team.";

export type DietaryGuideSection = {
  title: string;
  text: string;
};

export function getDietaryGuideSections(text: string): DietaryGuideSection[] {
  if (text.trim() === neutralDietaryGuide) return [];

  // Section choices are editorial, not inferred from nutrient keywords.
  // This also handles one titled paragraph and omits empty headings.
  return text.split(/\n\s*\n/).flatMap(paragraph => {
    const content = paragraph.trim();
    if (!content) return [];
    const titled = content.match(/^([A-Z][A-Za-z &-]+):\s*([\s\S]*)$/);
    if (titled) return titled[2].trim() ? [{ title: titled[1], text: titled[2].trim() }] : [];
    return [{ title: "About this meal", text: content }];
  });
}

// A change to any reviewed ingredient, quantity, method or serving size requires
// revalidation. This checksum detects content drift; it is not a security hash.
export function dietaryGuideFingerprint(recipe: Pick<Recipe, "ingredients" | "method" | "servings">): string {
  const input = JSON.stringify([recipe.ingredients, recipe.method, recipe.servings]);
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

export function getDietaryGuide(recipe: Recipe): string {
  const entry = (guides as Record<string, { fingerprint: string; text: string | null }>)[recipe.id];
  return entry?.text && entry.fingerprint === dietaryGuideFingerprint(recipe)
    ? entry.text
    : neutralDietaryGuide;
}

export function getDietaryGuideReferences(recipe: Recipe): string[] {
  const entry = (guides as Record<string, { fingerprint: string; text: string | null; references?: string[]; guidanceReferences?: string[] }>)[recipe.id];
  return entry?.text?.trim() && entry.fingerprint === dietaryGuideFingerprint(recipe)
    ? entry.guidanceReferences ?? entry.references ?? []
    : [];
}
