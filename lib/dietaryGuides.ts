import type { Recipe } from "@/data/RecipeData/types";
import guides from "@/data/dietaryGuides.json";

export const neutralDietaryGuide =
  "Use the ingredient amounts and serving size shown when planning this meal. Compare the nutrition information with your saved My Diet targets and any advice from your renal team.";

export type DietaryGuideSection = {
  title: string;
  text: string;
};

export function getDietaryGuideSections(text: string): DietaryGuideSection[] {
  if (text === neutralDietaryGuide) return [];

  const sections = new Map<string, string[]>();
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);

  for (const sentence of sentences) {
    const potassium = /\bpotassium\b/i.test(sentence);
    const phosphorus = /\bphosph(?:orus|ate)\b/i.test(sentence);
    const title = potassium && phosphorus
      ? "Potassium and phosphorus"
      : potassium
        ? "Potassium"
        : phosphorus
          ? "Phosphorus"
          : /\bprotein\b/i.test(sentence)
            ? "Protein"
            : /\b(salt|sodium)\b/i.test(sentence)
              ? "Salt and flavour"
              : /\b(carbohydrate|sugar|starch)\b/i.test(sentence)
                ? "Carbohydrates"
                : /\b(calorie|energy)\b/i.test(sentence)
                  ? "Energy"
                  : /\b(serving|portion|target|amounts?)\b/i.test(sentence)
                    ? "Portions and personal targets"
                    : "About this serving";
    const content = sentence.trim();
    sections.set(title, [...(sections.get(title) ?? []), content]);
  }

  return Array.from(sections, ([title, content]) => ({ title, text: content.join(" ") }));
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
