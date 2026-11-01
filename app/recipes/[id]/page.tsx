"use client";

import { useWeeklyPageStorage, navigateWeeklyPage } from "@/lib/weeklyPageStorage";

import RecipePhoto from "@/components/RecipePhoto";
import { RecipeAllergyNotice } from "@/components/RecipeAllergy";
import styles from "@/components/recipe-design.module.css";
import RecipeNutrition from "@/components/RecipeNutrition";
import RecipeIcon from "@/components/RecipeIcon";
import IngredientIcon from "@/components/IngredientIcon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { recipes } from "@/data/RecipeData";
import { createClient } from "@/lib/supabase/client";
import { getNutritionEvidenceText } from "@/lib/nutritionEvidence";
import { getDietaryGuide, getDietaryGuideSections } from "@/lib/dietaryGuides";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const mealTypes = [
  "Breakfast",
  "Lunch",
  "Dinner",
];

type Placement = {
  day: string;
  meal: string;
};

type PendingSlot = {
  day: string;
  meal: string;
};

function getDefaultMealType(code: string) {
  const firstLetter =
    code?.charAt(0).toUpperCase();

  if (firstLetter === "B") {
    return "Breakfast";
  }

  if (firstLetter === "L") {
    return "Lunch";
  }

  return "Dinner";
}

function formatSalt(sodiumValue: string | undefined) {
  if (!sodiumValue) {
    return "—";
  }

  const sodiumMg = parseFloat(
    sodiumValue.replace(/[^0-9.]/g, "")
  );

  if (!Number.isFinite(sodiumMg)) {
    return "—";
  }

  const saltGrams = (sodiumMg * 2.5) / 1000;

  return `${saltGrams.toFixed(2).replace(/\.00$/, "")} g`;
}

export default function RecipeDetailPage() {
  const weeklyPageStorage = useWeeklyPageStorage();
  const router = useRouter();
  const params = useParams();

  const id = params?.id as string;

  const recipe = recipes.find(
    (item) => item.id === id
  );

  const [showPlanner, setShowPlanner] =
    useState(false);

  const [placements, setPlacements] =
    useState<Placement[]>([]);

  const [plannerDay, setPlannerDay] =
    useState("Monday");

  const [plannerMeal, setPlannerMeal] =
    useState("Dinner");

  const [pendingSlot, setPendingSlot] =
    useState<PendingSlot | null>(
      null
    );

  const [isFavourite, setIsFavourite] =
    useState(false);

  const [showLoginMessage, setShowLoginMessage] =
    useState(false);

  async function loadFavouriteStatus() {
    if (!recipe) {
      setIsFavourite(false);
      return;
    }

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsFavourite(false);
      return;
    }

    const { data, error } = await supabase
      .from("user_favourites")
      .select("id")
      .eq("user_id", user.id)
      .eq("recipe_id", recipe.id)
      .maybeSingle();

    if (error) {
      console.error("Unable to load favourite status:", error);
      setIsFavourite(false);
      return;
    }

    setIsFavourite(Boolean(data));
  }

  async function toggleFavourite() {
    if (!recipe) {
      return;
    }

    /*
     * Change the button immediately.
     * We deliberately do this before waiting for Supabase
     * so the user gets instant visual feedback.
     */
    const nextFavourite = !isFavourite;
    setIsFavourite(nextFavourite);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsFavourite(!nextFavourite);
      setShowLoginMessage(true);

      window.setTimeout(() => {
        setShowLoginMessage(false);
      }, 3000);

      return;
    }

    if (nextFavourite) {
      const { error } = await supabase
        .from("user_favourites")
        .insert({
          user_id: user.id,
          recipe_id: recipe.id,
        });

      if (error) {
        console.error("Unable to save favourite:", error);
        setIsFavourite(!nextFavourite);
        return;
      }
    } else {
      const { error } = await supabase
        .from("user_favourites")
        .delete()
        .eq("user_id", user.id)
        .eq("recipe_id", recipe.id);

      if (error) {
        console.error("Unable to remove favourite:", error);
        setIsFavourite(!nextFavourite);
        return;
      }
    }

    window.dispatchEvent(
      new Event("meal-planner-favourites-updated")
    );
  }

  /*
   * Find every place where this recipe
   * currently appears in the Weekly Planner.
   */
  function getRecipePlacements(): Placement[] {
    const saved =
      weeklyPageStorage.getItem("weekly-planner"
      );

    if (!saved) {
      return [];
    }

    try {
      const planner =
        JSON.parse(saved);

      const found: Placement[] = [];

      days.forEach((day) => {
        mealTypes.forEach((meal) => {
          if (
            planner?.[day]?.[meal] ===
            recipe?.id
          ) {
            found.push({
              day,
              meal,
            });
          }
        });
      });

      return found;
    } catch {
      return [];
    }
  }

  /*
   * Check whether the Planner sent us
   * here with a specific slot to fill.
   */
  function loadPendingSlot() {
    const saved =
      weeklyPageStorage.getItem("planner-pending-slot"
      );

    if (!saved) {
      setPendingSlot(null);
      return;
    }

    try {
      const slot =
        JSON.parse(saved);

      if (
        slot?.day &&
        slot?.meal &&
        days.includes(slot.day) &&
        mealTypes.includes(slot.meal)
      ) {
        setPendingSlot({
          day: slot.day,
          meal: slot.meal,
        });
      } else {
        setPendingSlot(null);

        weeklyPageStorage.removeItem("planner-pending-slot"
        );
      }
    } catch {
      setPendingSlot(null);

      weeklyPageStorage.removeItem("planner-pending-slot"
      );
    }
  }

  /*
   * Load planner locations and any
   * pending Planner slot.
   */
  function loadPlannerStatus() {
    if (!recipe) {
      return;
    }

    setPlacements(
      getRecipePlacements()
    );

    loadPendingSlot();
  }

  /*
   * Listen for changes made elsewhere
   * on the website.
   */
  useEffect(() => {
    if (!recipe) {
      return;
    }

    loadPlannerStatus();
    loadFavouriteStatus();

    window.addEventListener(
      "weekly-planner-updated",
      loadPlannerStatus
    );

    window.addEventListener(
      "meal-planner-favourites-updated",
      loadFavouriteStatus
    );

    window.addEventListener(
      "storage",
      loadPlannerStatus
    );

    window.addEventListener(
      "storage",
      loadFavouriteStatus
    );

    return () => {
      window.removeEventListener(
        "weekly-planner-updated",
        loadPlannerStatus
      );

      window.removeEventListener(
        "meal-planner-favourites-updated",
        loadFavouriteStatus
      );

      window.removeEventListener(
        "storage",
        loadPlannerStatus
      );

      window.removeEventListener(
        "storage",
        loadFavouriteStatus
      );
    };
  }, [recipe?.id]);

  /*
   * Add this recipe directly to the
   * Planner slot selected before coming
   * to Recipes.
   */
  function addToPendingSlot() {
    if (!recipe || !pendingSlot) {
      return;
    }

    const saved =
      weeklyPageStorage.getItem("weekly-planner"
      );

    let planner: {
      [day: string]: {
        [meal: string]:
          | string
          | null;
      };
    } = {};

    if (saved) {
      try {
        planner =
          JSON.parse(saved);
      } catch {
        planner = {};
      }
    }

    days.forEach((day) => {
      if (!planner[day]) {
        planner[day] = {};
      }

      mealTypes.forEach(
        (meal) => {
          if (
            !(meal in planner[day])
          ) {
            planner[day][meal] =
              null;
          }
        }
      );
    });

    planner[pendingSlot.day][
      pendingSlot.meal
    ] = recipe.id;

    weeklyPageStorage.setItem("weekly-planner",
      JSON.stringify(
        planner
      )
    );

    // Tell the Planner to preserve this recipe-page change during account hydration.
    weeklyPageStorage.setItem("planner-recipe-add-pending", "true");

    weeklyPageStorage.removeItem("planner-pending-slot"
    );

    setPendingSlot(null);

    setPlacements(
      getRecipePlacements()
    );

    window.dispatchEvent(
      new Event(
        "weekly-planner-updated"
      )
    );

    window.dispatchEvent(
      new Event(
        "shopping-list-updated"
      )
    );

    navigateWeeklyPage("/planner", url => router.push(url));
  }

  /*
   * Open the Planner.
   */
  function openPlanner() {
    if (pendingSlot) {
      addToPendingSlot();
      return;
    }

    if (placements.length > 0) {
      setPlannerDay(
        placements[0].day
      );

      setPlannerMeal(
        placements[0].meal
      );
    } else {
      setPlannerMeal(
        getDefaultMealType(
          recipe?.code ?? ""
        )
      );
    }

    setShowPlanner(true);
  }

  /*
   * Normal Add to Planner workflow.
   */
  function addToPlanner() {
    if (!recipe) {
      return;
    }

    const saved =
      weeklyPageStorage.getItem("weekly-planner"
      );

    let planner: {
      [day: string]: {
        [meal: string]:
          | string
          | null;
      };
    } = {};

    if (saved) {
      try {
        planner =
          JSON.parse(saved);
      } catch {
        planner = {};
      }
    }

    days.forEach((day) => {
      if (!planner[day]) {
        planner[day] = {};
      }

      mealTypes.forEach(
        (meal) => {
          if (
            !(meal in planner[day])
          ) {
            planner[day][meal] =
              null;
          }
        }
      );
    });

    planner[plannerDay][
      plannerMeal
    ] = recipe.id;

    weeklyPageStorage.setItem("weekly-planner",
      JSON.stringify(
        planner
      )
    );

    // Tell the Planner to preserve this recipe-page change during account hydration.
    weeklyPageStorage.setItem("planner-recipe-add-pending", "true");

    setPlacements(
      getRecipePlacements()
    );

    window.dispatchEvent(
      new Event(
        "weekly-planner-updated"
      )
    );

    window.dispatchEvent(
      new Event(
        "shopping-list-updated"
      )
    );

    setShowPlanner(false);

    navigateWeeklyPage("/planner", url => router.push(url));
  }

  /*
   * Remove every occurrence of this
   * recipe from the Weekly Planner.
   */
  function removeFromPlanner() {
    if (!recipe) {
      return;
    }

    const saved =
      weeklyPageStorage.getItem("weekly-planner"
      );

    if (!saved) {
      setPlacements([]);
      setShowPlanner(false);
      return;
    }

    try {
      const planner =
        JSON.parse(saved);

      days.forEach((day) => {
        if (!planner[day]) {
          return;
        }

        mealTypes.forEach(
          (meal) => {
            if (
              planner[day][meal] ===
              recipe.id
            ) {
              planner[day][meal] =
                null;
            }
          }
        );
      });

      weeklyPageStorage.setItem("weekly-planner",
        JSON.stringify(
          planner
        )
      );

      setPlacements([]);

      setShowPlanner(false);

      window.dispatchEvent(
        new Event(
          "weekly-planner-updated"
        )
      );

      window.dispatchEvent(
        new Event(
          "shopping-list-updated"
        )
      );

    } catch {
      // Ignore invalid planner data.
    }
  }

  /*
   * Recipe not found.
   */
  if (!recipe) {
    return (
      <main className="p-6">

        <h1 className="text-3xl font-bold">
          Recipe not found
        </h1>

      </main>
    );
  }

  const relatedRecipes = recipes.filter((item) => item.id !== recipe.id && item.category === recipe.category).slice(0, 4);
  const dietaryGuideSections = getDietaryGuideSections(getDietaryGuide(recipe));

  return (
    <main className={styles.detail}>
      <Link href="/recipes" className={styles.backLink}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m11 5-7 7 7 7M4 12h16" /></svg>Back to recipes</Link>
      <section className={styles.hero} aria-label="Recipe overview">
        <div><div className={styles.heroPhoto}><RecipePhoto recipeId={recipe.id} src={recipe.image} name={recipe.name} priority /></div><RecipeAllergyNotice recipeId={recipe.id} /></div>
        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <span className={styles.category}>{getDefaultMealType(recipe.code)}</span>
            <button type="button" onClick={toggleFavourite} aria-pressed={isFavourite} className={styles.favourite}>
              <RecipeIcon name="heart" /> {isFavourite ? "Favourited" : "Favourite"}
            </button>
          </div>
          {showLoginMessage && <p role="status">Please log in to save favourite recipes.</p>}
          <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>
          <div className={styles.meta}>
            <span><RecipeIcon name="time" />{recipe.cookingTime}</span>
            <span><RecipeIcon name="servings" />{recipe.servings} {recipe.servings === 1 ? "serving" : "servings"}</span>
          </div>
          <RecipeNutrition values={[
            ["Calories", recipe.nutrition.calories], ["Protein", recipe.nutrition.protein],
            ["Potassium", recipe.nutrition.potassium], ["Phosphorus", recipe.nutrition.phosphate],
          ]} />
          <button type="button" onClick={openPlanner} className={styles.primary}>
            <RecipeIcon name="planner" />{placements.length > 0 ? "Add Another to Planner" : "Add to Planner"}
          </button>
        </div>
      </section>
      <div className={styles.sections}>
        <section className={styles.panel} aria-labelledby="recipe-ingredients">
          <div className={styles.panelHeading}>
            <h2 id="recipe-ingredients"><RecipeIcon name="ingredients" />Ingredients</h2>
            <span>{recipe.servings} {recipe.servings === 1 ? "serving" : "servings"}</span>
          </div>
          <ul className={styles.ingredients}>
            {recipe.ingredients.map((ingredient, index) => <li key={index}>
              <IngredientIcon item={ingredient.item} />
              <div><strong>{ingredient.item}</strong><small>{ingredient.quantity}</small></div>
            </li>)}
          </ul>
          <div className={styles.equipment}>
            <h3><RecipeIcon name="method" />Equipment</h3>
            <p>{recipe.equipment}</p>
          </div>
        </section>
        <section className={styles.panel} aria-labelledby="recipe-method">
          <div className={styles.panelHeading}><h2 id="recipe-method"><RecipeIcon name="method" />Method</h2></div>
          <ol className={styles.method}>
            {recipe.method.map((step, index) => <li key={index}><span aria-hidden="true">{index + 1}</span><p>{step}</p></li>)}
          </ol>
        </section>
      </div>
      <div className={styles.lowerSections}>
        <section className={styles.panel} aria-labelledby="recipe-nutrition">
          <div className={styles.panelHeading}><h2 id="recipe-nutrition">Nutrition <small style={{fontSize: ".7rem", fontWeight: 400}}>(per serving)</small></h2></div>
          <RecipeNutrition detailed values={[
            ["Calories", recipe.nutrition.calories], ["Protein", recipe.nutrition.protein],
            ["Carbohydrates", recipe.nutrition.carbohydrates], ["Fat", recipe.nutrition.fat],
            ["Fibre", recipe.nutrition.fibre], ["Salt", recipe.nutrition.salt ?? formatSalt(recipe.nutrition.sodium)],
            ["Potassium", recipe.nutrition.potassium], ["Phosphorus", recipe.nutrition.phosphate],
          ]} />
          <details className={styles.evidence}><summary>About this nutrition information</summary><p>{getNutritionEvidenceText(recipe)}</p></details>
        </section>
        <section className={styles.guidePanel} aria-labelledby="recipe-guide">
          <h2 id="recipe-guide"><RecipeIcon name="Potassium" />Dietary Guide</h2>
          <p className={styles.guideIntro}>Discover more about the ingredients in this meal, what they contribute to your nutrition, and useful tips for making it your own.</p>
          {dietaryGuideSections.length > 0 ? <div className={styles.guideSections}>
            {dietaryGuideSections.map((section) => (
              <details className={styles.guideSection} key={section.title}>
                <summary>{section.title}</summary>
                <div className={styles.guideSectionContent}><div><p>{section.text}</p></div></div>
              </details>
            ))}
          </div> : <p className={styles.guideUnavailable}>Recipe-specific notes are not available for this meal yet. You can still compare the ingredients and per-serving nutrition above with your saved My Diet targets.</p>}
        </section>
      </div>
      {relatedRecipes.length > 0 && <section className={styles.related} aria-labelledby="related-recipes">
        <div className={styles.panelHeading}><h2 id="related-recipes"><RecipeIcon name="star" />You might also like</h2><Link href="/recipes">View all recipes &rarr;</Link></div>
        <div className={styles.relatedGrid}>
          {relatedRecipes.map((item) => <Link className={styles.relatedCard} href={`/recipes/${item.id}`} key={item.id}>
            <div className={styles.relatedPhoto}><RecipePhoto recipeId={item.id} src={item.image} name={item.name} /></div><RecipeAllergyNotice recipeId={item.id} />
            <strong>{item.name}</strong><small><RecipeIcon name="time" />{item.cookingTime}</small>
          </Link>)}
        </div>
      </section>}

      {showPlanner && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center">

          <div className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-xl">

            {/* Popup heading */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Weekly Planner
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {recipe.name}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowPlanner(false)
                }
                className="rounded-full px-3 py-2 text-lg text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                ×
              </button>

            </div>

            <div className="space-y-5 p-4">

              {/* Existing placements */}
              {placements.length > 0 && (
                <div>

                  <h3 className="mb-2 text-sm font-bold text-slate-700">
                    Currently planned
                  </h3>

                  <div className="space-y-2">

                    {placements.map(
                      (placement) => (
                        <div
                          key={`${placement.day}-${placement.meal}`}
                          className="rounded-xl bg-green-50 px-3 py-3"
                        >

                          <span className="font-semibold text-green-800">
                            📅{" "}
                            {placement.day}{" "}
                            •{" "}
                            {placement.meal}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

              {/* Add placement */}
              <div className="border-t border-gray-200 pt-4">

                <h3 className="mb-3 text-sm font-bold text-slate-700">

                  {placements.length > 0
                    ? "Add another placement"
                    : "Choose when to eat it"}

                </h3>

                {/* Day */}
                <div className="mb-4">

                  <label
                    htmlFor="recipe-planner-day"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Day
                  </label>

                  <select
                    id="recipe-planner-day"
                    value={plannerDay}
                    onChange={(e) =>
                      setPlannerDay(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-slate-900"
                  >

                    {days.map(
                      (day) => (
                        <option
                          key={day}
                          value={day}
                        >
                          {day}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* Meal */}
                <div className="mb-4">

                  <label
                    htmlFor="recipe-planner-meal"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Meal
                  </label>

                  <select
                    id="recipe-planner-meal"
                    value={plannerMeal}
                    onChange={(e) =>
                      setPlannerMeal(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-slate-900"
                  >

                    {mealTypes.map(
                      (meal) => (
                        <option
                          key={meal}
                          value={meal}
                        >
                          {meal}
                        </option>
                      )
                    )}

                  </select>

                </div>

                <button
                  type="button"
                  onClick={
                    addToPlanner
                  }
                  className="w-full rounded-xl bg-green-700 px-4 py-3 font-bold !text-white transition hover:bg-green-800"
                  style={{ color: "#ffffff" }}
                >
                  Add to Planner
                </button>

              </div>

              {/* Remove */}
              {placements.length > 0 && (
                <div className="border-t border-gray-200 pt-4">

                  <button
                    type="button"
                    onClick={
                      removeFromPlanner
                    }
                    className="w-full rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Remove from Planner
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </main>
  );
}
