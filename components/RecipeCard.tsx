"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type RecipeCardProps = {
  recipe: {
    id: string;
    code: string;
    emoji: string;
    image: string;
    name: string;
    description: string;
    cookingTime: string;
    calories: string;
    protein: string;
    equipment: string;
    nutrition?: {
      sodium?: string;
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
  const router = useRouter();

  const [showPlanner, setShowPlanner] =
    useState(false);

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

  const [showLoginMessage, setShowLoginMessage] =
    useState(false);

  useEffect(() => {
    if (!showLoginMessage) return;

    const timer = window.setTimeout(() => {
      setShowLoginMessage(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [showLoginMessage]);

  useEffect(() => {
    setIsFavourite(favouriteRecipeIds.includes(recipe.id));
  }, [favouriteRecipeIds, recipe.id]);

  async function toggleFavourite() {
    if (!userId) {
      setShowLoginMessage(true);
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
      localStorage.getItem(
        "weekly-planner"
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
      localStorage.getItem(
        "planner-pending-slot"
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

        localStorage.removeItem(
          "planner-pending-slot"
        );
      }
    } catch {
      setPendingSlot(null);

      localStorage.removeItem(
        "planner-pending-slot"
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
      localStorage.getItem(
        "weekly-planner"
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
    localStorage.setItem(
      "weekly-planner",
      JSON.stringify(
        planner
      )
    );

    /*
     * Clear temporary slot.
     */
    localStorage.removeItem(
      "planner-pending-slot"
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
    router.push("/planner");
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
      localStorage.getItem(
        "weekly-planner"
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
    localStorage.setItem(
      "weekly-planner",
      JSON.stringify(
        planner
      )
    );

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
    router.push("/planner");
  }

  /*
   * Remove ALL occurrences of this recipe
   * from the Weekly Planner.
   */
  function removeFromPlanner() {
    const saved =
      localStorage.getItem(
        "weekly-planner"
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

      localStorage.setItem(
        "weekly-planner",
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
  const hasRecipeImage =
    typeof recipe.image === "string" &&
    recipe.image.trim().length > 0;

  return (
    <article
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-visible
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg

        sm:flex-row

        md:flex-col
      "
    >

      {/* ===================================================
          RECIPE IMAGE
          =================================================== */}

      <Link
        href={`/recipes/${recipe.id}`}
        className="
          block
          w-full
          shrink-0

          sm:w-28

          md:w-full
        "
      >
        {hasRecipeImage ? (
          <Image
            src={recipe.image}
            alt={recipe.name}
            width={600}
            height={420}
            sizes="
            (max-width: 639px) 100vw,
            (max-width: 1023px) 112px,
            50vw
          "
          className="
            h-52
            w-full
            rounded-t-2xl
            object-cover

            sm:h-full
            sm:min-h-[150px]
            sm:w-28
            sm:rounded-l-2xl
            sm:rounded-t-none

            md:h-48
            md:w-full
            md:rounded-l-none
            md:rounded-t-2xl
          "
          />
        ) : (
          <div
            className="flex h-52 w-full items-center justify-center rounded-t-2xl bg-slate-100 sm:h-full sm:min-h-[150px] sm:w-28 sm:rounded-l-2xl sm:rounded-t-none md:h-48 md:w-full md:rounded-l-none md:rounded-t-2xl"
            aria-label="Recipe image coming soon"
          >
            <span className="text-4xl" aria-hidden="true">🍽️</span>
          </div>
        )}
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

        {/* Recipe content */}
        <Link
          href={`/recipes/${recipe.id}`}
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

          {/* Primary recipe information */}
          <div
            className="
              mt-4
              grid
              grid-cols-2
              gap-2
            "
          >
            <div
              className="
                rounded-xl
                border
                border-green-200
                bg-green-50
                px-3
                py-2.5
              "
            >
              <div className="text-[11px] font-semibold uppercase tracking-wide text-green-700">
                Cooking time
              </div>
              <div className="mt-0.5 flex items-baseline gap-1.5 text-base font-extrabold text-green-900">
                <span aria-hidden="true">⏱️</span>
                <span>{recipe.cookingTime.replace(/\bminutes\b/gi, "mins")}</span>
              </div>
            </div>

            <div
              className="
                rounded-xl
                border
                border-green-200
                bg-green-50
                px-3
                py-2.5
              "
            >
              <div className="text-[11px] font-semibold uppercase tracking-wide text-green-700">
                Calories
              </div>
              <div className="mt-0.5 flex items-baseline gap-1.5 text-base font-extrabold text-green-900">
                <span aria-hidden="true">🔥</span>
                <span>{recipe.calories}</span>
              </div>
            </div>
          </div>

        </Link>

        {/* =================================================
            BOTTOM CONTROLS
            ================================================= */}

        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            justify-between
            gap-2

            sm:mt-auto
            sm:pt-4

            md:mt-auto
            md:pt-5
          "
        >
          {showLoginMessage && (
            <div
              role="status"
              className="
                absolute
                bottom-16
                left-1/2
                z-20
                w-max
                max-w-[calc(100%-2rem)]
                -translate-x-1/2
                rounded-xl
                bg-slate-900
                px-4
                py-3
                text-center
                text-sm
                font-semibold
                text-white
                shadow-lg
              "
            >
              🔒 Please log in to save favourite recipes.
            </div>
          )}


          {/* Favourite */}
          <button
            type="button"
            onClick={toggleFavourite}
            aria-pressed={isFavourite}
            className={`
              inline-flex
              h-10
              items-center
              justify-center
              whitespace-nowrap
              rounded-xl
              px-4
              text-sm
              font-semibold
              shadow-sm
              transition
              ${
                isFavourite
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "border border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100"
              }
            `}
          >
            {isFavourite
              ? "★ Favourite"
              : "☆ Favourite"}
          </button>

          {/* Add to Planner */}
          <button
            type="button"
            onClick={openPlanner}
            aria-pressed={placements.length > 0}
            className={`
              inline-flex
              h-10
              items-center
              justify-center
              whitespace-nowrap
              rounded-xl
              px-4
              text-sm
              font-semibold
              shadow-sm
              transition
              ${
                placements.length > 0
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "border border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
              }
            `}
          >
            {placements.length > 0
              ? "✓ Added to Planner"
              : "📅 Add to Planner"}
          </button>

        </div>

      </div>

      {/* ===================================================
          PLANNER POPUP
          =================================================== */}

      {showPlanner && (
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
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Weekly Planner
                </h2>

                <p
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
                  "
                >
                  Add to Planner
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

        </div>
      )}

    </article>
  );
}