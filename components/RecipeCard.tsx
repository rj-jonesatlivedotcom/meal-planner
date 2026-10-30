"use client";

import { useWeeklyPageStorage, afterWeeklyPageWrites } from "@/lib/weeklyPageStorage";

import RecipePhoto from "./RecipePhoto";
import { RecipeAllergyNotice } from "./RecipeAllergy";
import styles from "./recipe-design.module.css";
import RecipeNutrition from "./RecipeNutrition";
import RecipeIcon from "./RecipeIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/lib/supabase/client";

type RecipeCardProps = {
  recipe: {
    id: string;
    code: string;
    emoji: string;
    image: string;
    name: string;
    description: string;
    conditionalProxyPending?: boolean;
    nutritionIncomplete?: ("calories" | "protein" | "carbohydrates" | "fat" | "fibre" | "sodium" | "salt" | "potassium" | "phosphate")[];
    quantityConversionsEstimated?: boolean;
    clinicalReviewPending?: boolean;
    potassium?: string;
    cookingTime: string;
    calories: string;
    protein: string;
    equipment: string;
    nutrition?: {
      sodium?: string;
      salt?: string;
      potassium?: string;
      phosphate?: string;
      carbohydrates?: string;
    };
  };
  favouriteRecipeIds?: string[];
  userId?: string | null;
  onFavouriteChange?: (recipeId: string, isFavourite: boolean) => void;
};

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

function getMealTypeLabel(code: string) {
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

type Placement = {
  day: string;
  meal: string;
};

type PendingSlot = {
  day: string;
  meal: string;
};

export default function RecipeCard({
  recipe,
  favouriteRecipeIds = [],
  userId = null,
  onFavouriteChange,
}: RecipeCardProps) {
  const weeklyPageStorage = useWeeklyPageStorage();
  const router = useRouter();

  function trackRecipeViewed() {
    if (typeof window === "undefined") return;

    const gtag = (window as typeof window & {
      gtag?: (...args: any[]) => void;
    }).gtag;

    if (gtag) {
      gtag("event", "recipe_viewed", {
        recipe_id: recipe.id,
        recipe_name: recipe.name,
        meal_type: getMealTypeLabel(recipe.code),
      });
    }
  }

  const [showPlanner, setShowPlanner] =
    useState(false);

  const plannerDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPlanner) return;
    const dialog = plannerDialogRef.current;
    if (!dialog) return;
    const origin = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
    )).filter(element => element.getClientRects().length > 0);
    const focusFirst = () => (focusable()[0] ?? dialog).focus();
    const keepFocus = (event: FocusEvent) => {
      if (!dialog.contains(event.target as Node)) focusFirst();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setShowPlanner(false);
      } else if (event.key === "Tab") {
        const controls = focusable();
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first || !dialog.contains(document.activeElement) ||
            (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) ||
            (!event.shiftKey && document.activeElement === last)) {
          event.preventDefault();
          (event.shiftKey ? last ?? dialog : first ?? dialog).focus();
        }
      }
    };
    focusFirst();
    document.addEventListener("keydown", handleKey, true);
    document.addEventListener("focusin", keepFocus);
    return () => {
      document.removeEventListener("keydown", handleKey, true);
      document.removeEventListener("focusin", keepFocus);
      if (origin?.isConnected) origin.focus();
    };
  }, [showPlanner]);

  const [placements, setPlacements] =
    useState<Placement[]>([]);

  const [plannerDay, setPlannerDay] =
    useState("Monday");

  const [plannerMeal, setPlannerMeal] =
    useState(
      getDefaultMealType(recipe.code)
    );

  const [pendingSlot, setPendingSlot] =
    useState<PendingSlot | null>(
      null
    );

  const [isFavourite, setIsFavourite] =
    useState(favouriteRecipeIds.includes(recipe.id));

  useEffect(() => {
    setIsFavourite(favouriteRecipeIds.includes(recipe.id));
  }, [favouriteRecipeIds, recipe.id]);

  async function toggleFavourite() {
    if (!userId) {
      return;
    }

    const nextFavourite = !isFavourite;

    // Update the UI and the Recipes-page filter immediately.
    setIsFavourite(nextFavourite);
    onFavouriteChange?.(recipe.id, nextFavourite);

    const supabase = createClient();

    if (nextFavourite) {
      const { error } = await supabase
        .from("user_favourites")
        .insert({
          user_id: userId,
          recipe_id: recipe.id,
        });

      if (error) {
        console.error("Unable to save favourite:", error);
        setIsFavourite(false);
        onFavouriteChange?.(recipe.id, false);
      }
    } else {
      const { error } = await supabase
        .from("user_favourites")
        .delete()
        .eq("user_id", userId)
        .eq("recipe_id", recipe.id);

      if (error) {
        console.error("Unable to remove favourite:", error);
        setIsFavourite(true);
        onFavouriteChange?.(recipe.id, true);
      }
    }
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
            recipe.id
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
   * Refresh Planner information.
   */
  function loadPlannerStatus() {
    setPlacements(
      getRecipePlacements()
    );

    loadPendingSlot();
  }

  useEffect(() => {
    loadPlannerStatus();

    window.addEventListener(
      "weekly-planner-updated",
      loadPlannerStatus
    );

    window.addEventListener(
      "storage",
      loadPlannerStatus
    );

    return () => {
      window.removeEventListener(
        "weekly-planner-updated",
        loadPlannerStatus
      );

      window.removeEventListener(
        "storage",
        loadPlannerStatus
      );
    };
  }, [recipe.id]);

  /*
   * Remove any people override for a slot when
   * a new meal is placed there. A newly selected
   * meal should use the current Shopping List
   * household size as its default.
   */
  function clearMealPeopleOverride(
    planner: any,
    day: string,
    meal: string
  ) {
    if (
      planner?.mealPeople?.[day]
    ) {
      delete planner.mealPeople[day][meal];
    }
  }

  /*
   * Add directly to the Planner slot
   * selected before coming to Recipes.
   */
  function addToPendingSlot() {
    if (!pendingSlot) {
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

    /*
     * Make sure all days and meal
     * slots exist.
     */
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

    /*
     * Put this recipe directly into
     * the selected Planner slot.
     */
    planner[pendingSlot.day][
      pendingSlot.meal
    ] = recipe.id;

    clearMealPeopleOverride(
      planner,
      pendingSlot.day,
      pendingSlot.meal
    );

    /*
     * Save Planner.
     */
    weeklyPageStorage.setItem("weekly-planner",
      JSON.stringify(
        planner
      )
    );

    // Tell the Planner to preserve this recipe-card change during account hydration.
    weeklyPageStorage.setItem("planner-recipe-add-pending", "true");

    /*
     * Clear temporary slot.
     */
    weeklyPageStorage.removeItem("planner-pending-slot"
    );

    setPendingSlot(null);

    setPlacements(
      getRecipePlacements()
    );

    /*
     * Tell the rest of the site
     * that the Planner changed.
     */
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

    /*
     * Return to Weekly Planner.
     */
    afterWeeklyPageWrites(() => router.push("/planner"));
  }

  /*
   * Open Planner.
   *
   * If we came from a specific Planner
   * slot, add directly to that slot.
   *
   * Otherwise show the normal selector.
   */
  function openPlanner() {
    if (pendingSlot) {
      addToPendingSlot();
      return;
    }

    /*
     * A recipe can be added multiple times.
     * If it is already in the Planner,
     * start with its first existing placement
     * but still allow another placement.
     */
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
          recipe.code
        )
      );
    }

    setShowPlanner(true);
  }

  /*
   * Normal Add to Planner workflow.
   */
  function addToPlanner() {
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

    /*
     * Make sure all days and meal
     * slots exist.
     */
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

    /*
     * Put recipe into selected slot.
     *
     * This intentionally allows the
     * same recipe to be placed again
     * elsewhere in the week.
     */
    planner[plannerDay][
      plannerMeal
    ] = recipe.id;

    clearMealPeopleOverride(
      planner,
      plannerDay,
      plannerMeal
    );

    /*
     * Save Planner.
     */
    weeklyPageStorage.setItem("weekly-planner",
      JSON.stringify(
        planner
      )
    );

    // Tell the Planner to preserve this recipe-card change during account hydration.
    weeklyPageStorage.setItem("planner-recipe-add-pending", "true");

    /*
     * Refresh displayed locations.
     */
    setPlacements(
      getRecipePlacements()
    );

    /*
     * Tell the rest of the site
     * that the Planner changed.
     */
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

    /*
     * Close popup.
     */
    setShowPlanner(false);

    /*
     * Return to Weekly Planner.
     */
    afterWeeklyPageWrites(() => router.push("/planner"));
  }

  /*
   * Remove ALL occurrences of this recipe
   * from the Weekly Planner.
   */
  function removeFromPlanner() {
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

              if (
                planner.mealPeople?.[day]
              ) {
                delete planner.mealPeople[day][meal];
              }
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

  const mealType = getMealTypeLabel(recipe.code);


  return (
    <article
      className={styles.card}
    >

      {/* ===================================================
          RECIPE IMAGE
          =================================================== */}

      <button
        type="button"
        onClick={toggleFavourite}
        aria-label={
          isFavourite
            ? `Remove ${recipe.name} from favourites`
            : `Add ${recipe.name} to favourites`
        }
        aria-pressed={isFavourite}
        disabled={!userId}
        className={styles.cardFavourite}
      >
        {isFavourite ? "♥" : "♡"}
      </button>

      <Link
        href={`/recipes/${recipe.id}`}
        onClick={trackRecipeViewed}
        className={styles.cardImage}
      >
        <RecipePhoto recipeId={recipe.id} src={recipe.image} name={recipe.name} />
      </Link>

      {/* ===================================================
          RECIPE INFORMATION
          =================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          p-4

          md:p-5
        "
      >

        <RecipeAllergyNotice recipeId={recipe.id} />
        {/* Recipe content */}
        <Link
          href={`/recipes/${recipe.id}`}
          onClick={trackRecipeViewed}
          className="block"
        >

          {/* Meal type */}
          <div
            className="
              mb-2
              inline-flex
              items-center
              rounded-full
              bg-orange-50
              px-2.5
              py-1
              text-xs
              font-bold
              text-orange-600
            "
          >
            {mealType}
          </div>

          <h2
            className="
              text-lg
              font-bold
              leading-tight
              text-slate-900
              transition
              group-hover:text-orange-600
            "
          >
            {recipe.name}
          </h2>

          <p
            className="
              mt-2
              line-clamp-3
              text-sm
              leading-relaxed
              text-slate-600

              sm:mt-1
              sm:line-clamp-2
            "
          >
            {recipe.description}
          </p>

          <p className="mt-3 text-xs font-semibold text-slate-500"><span aria-hidden="true">◷</span> {recipe.cookingTime}</p>
          {recipe.potassium === "Pending review" && <p className="mt-2 text-xs text-amber-800">Pending review · dietary suitability not assessed</p>}
          <RecipeNutrition values={[
            ["Calories", recipe.calories], ["Protein", recipe.protein],
            ["Potassium", recipe.nutrition?.potassium], ["Phosphorus", recipe.nutrition?.phosphate],
          ]} />

        </Link>

        <div className={styles.cardActions}>
          <Link href={`/recipes/${recipe.id}`} onClick={trackRecipeViewed}>View recipe <span aria-hidden="true">&rarr;</span></Link>
          <button type="button" onClick={openPlanner} className={styles.primary}><RecipeIcon name="planner" />Add to Planner</button>
        </div>
      </div>

      {/* ===================================================
          PLANNER POPUP
          =================================================== */}

      {showPlanner && createPortal(
        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-end
            justify-center
            bg-black/40
            p-4

            sm:items-center
          "
        >

          <div
            ref={plannerDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`planner-title-${recipe.id}`}
            aria-describedby={`planner-recipe-${recipe.id}`}
            tabIndex={-1}
            className="
              max-h-[85vh]
              w-full
              max-w-md
              overflow-y-auto
              rounded-2xl
              bg-white
              shadow-xl
            "
          >

            {/* Popup heading */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-gray-200
                p-4
              "
            >

              <div>

                <h2
                  id={`planner-title-${recipe.id}`}
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Weekly Planner
                </h2>

                <p
                  id={`planner-recipe-${recipe.id}`}
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  {recipe.name}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowPlanner(false)
                }
                className="
                  rounded-full
                  px-3
                  py-2
                  text-lg
                  text-slate-500
                  hover:bg-slate-100
                "
                aria-label="Close"
              >
                ×
              </button>

            </div>

            <div
              className="
                space-y-5
                p-4
              "
            >

              {/* Existing placements */}
              {placements.length > 0 && (
                <div>

                  <h3
                    className="
                      mb-2
                      text-sm
                      font-bold
                      text-slate-700
                    "
                  >
                    Currently planned
                  </h3>

                  <div className="space-y-2">

                    {placements.map(
                      (placement) => (
                        <div
                          key={`${placement.day}-${placement.meal}`}
                          className="
                            rounded-xl
                            bg-green-50
                            px-3
                            py-3
                          "
                        >

                          <span
                            className="
                              font-semibold
                              text-green-800
                            "
                          >
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

              {/* Choose new placement */}
              <div
                className="
                  border-t
                  border-gray-200
                  pt-4
                "
              >

                <h3
                  className="
                    mb-3
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  {placements.length > 0
                    ? "Add another placement"
                    : "Choose when to eat it"}
                </h3>

                {/* Day */}
                <div className="mb-4">

                  <label
                    htmlFor={`planner-day-${recipe.id}`}
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Day
                  </label>

                  <select
                    id={`planner-day-${recipe.id}`}
                    value={plannerDay}
                    onChange={(e) =>
                      setPlannerDay(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      text-base
                      text-slate-900
                    "
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
                    htmlFor={`planner-meal-${recipe.id}`}
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Meal
                  </label>

                  <select
                    id={`planner-meal-${recipe.id}`}
                    value={plannerMeal}
                    onChange={(e) =>
                      setPlannerMeal(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      text-base
                      text-slate-900
                    "
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
                  className="
                    w-full
                    rounded-xl
                    bg-green-700
                    px-4
                    py-3
                    font-bold
                    text-white
                    transition
                    hover:bg-green-800
                    !text-white
                  "
                  style={{ color: "#ffffff" }}
                >
                  <span
                    className="!text-white"
                    style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                  >
                    Add to Planner
                  </span>
                </button>

              </div>

              {/* Remove */}
              {placements.length > 0 && (
                <div
                  className="
                    border-t
                    border-gray-200
                    pt-4
                  "
                >

                  <button
                    type="button"
                    onClick={
                      removeFromPlanner
                    }
                    className="
                      w-full
                      rounded-xl
                      bg-red-50
                      px-4
                      py-3
                      font-semibold
                      text-red-600
                      transition
                      hover:bg-red-100
                    "
                  >
                    Remove from Planner
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>,
        document.body
      )}

    </article>
  );
}
