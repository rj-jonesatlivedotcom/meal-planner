"use client";
import { recipes } from "@/data/RecipeData";
import { matchRecipeAllergies, plannerAllergyConflicts } from "@/lib/allergies";
import { useMyDiet } from "./my-diet/MyDietProvider";
const byId = new Map(recipes.map(recipe => [recipe.id, recipe]));
function useMatch(recipeId: string) {
  const { requirements, ready, error } = useMyDiet();
  return { ...matchRecipeAllergies(byId.get(recipeId) ?? {}, requirements?.foodAllergies), unavailable: !ready || error };
}
export function AllergyOverlay({ recipeId }: { recipeId: string }) {
  const { detected } = useMatch(recipeId);
  if (!detected.length) return null;
  return <svg role="img" aria-label={`Contains your allergen: ${detected.join(", ")}`} viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-10 h-full w-full">
    <title>Contains your allergen: {detected.join(", ")}</title>
    <path d="M4 4L96 96M96 4L4 96" stroke="white" strokeOpacity="0.9" strokeWidth="13" />
    <path d="M4 4L96 96M96 4L4 96" stroke="#ef101d" strokeWidth="9" />
  </svg>;
}
export function RecipeAllergyNotice({ recipeId }: { recipeId: string }) {
  const { detected, uncertain, uncertainIngredients, unavailable } = useMatch(recipeId);
  return <>
    {detected.length > 0 && <p className="mt-2 break-words text-sm font-bold text-red-700 dark:text-red-300">Contains your allergen: {detected.join(", ")}</p>}
    {uncertain.length > 0 && <p className="mt-1 break-words text-xs leading-5 text-amber-800 dark:text-amber-200">Allergy check uncertain: {uncertain.join(", ")}. {uncertainIngredients.length ? `Check labels for ${uncertainIngredients.join(", ")}.` : "Ingredient details or this allergy need checking."} Excluded from MyChef.</p>}
    {unavailable && <p className="mt-1 text-xs text-amber-800 dark:text-amber-200">Allergy settings {unavailable ? "are loading or unavailable" : ""}; check ingredients before choosing.</p>}
  </>;
}
export function RecipeAllergyImage({ recipeId, src, alt, className }: { recipeId: string; src: string; alt: string; className: string }) {
  return <span className={`relative block overflow-hidden ${className}`}><img src={src} alt={alt} className="h-full w-full object-cover" /><AllergyOverlay recipeId={recipeId} /></span>;
}

export function PlannerAllergyWarnings({ planner }: { planner: Record<string, Record<string, string | null>> | null }) {
  const { requirements } = useMyDiet();
  const conflicts = plannerAllergyConflicts(planner, recipes, requirements?.foodAllergies);
  return conflicts.length > 0 ? <section aria-label="Existing planner allergy warnings" className="mx-auto mb-4 max-w-6xl rounded-2xl border border-red-300 bg-red-50 p-4 dark:bg-slate-900 dark:text-slate-100">
    <h2 className="font-bold text-red-800 dark:text-red-200">Review existing meals for your allergies</h2>
    {conflicts.map(({ day, meal, recipe }) => <div key={`${day}-${meal}`} className="mt-3"><strong>{day} {meal}: {recipe.name}</strong><RecipeAllergyNotice recipeId={recipe.id} /></div>)}
    <p className="mt-3 text-xs">Your existing meals are kept. Review ingredients and packaging before using them.</p>
  </section> : null;
}
