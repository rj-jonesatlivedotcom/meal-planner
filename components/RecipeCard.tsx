"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    };
  };
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

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-2
            "
          >

            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-slate-50
                px-2.5
                py-1
                text-xs
                font-semibold
                text-slate-600
              "
            >
              ⏱️ {recipe.cookingTime}
            </span>

            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-orange-50
                px-2.5
                py-1
                text-xs
                font-semibold
                text-orange-700
              "
            >
              🔥 {recipe.calories}
            </span>

            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-green-50
                px-2.5
                py-1
                text-xs
                font-semibold
                text-green-700
              "
            >
              💪 {recipe.protein}
            </span>

            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-blue-50
                px-2.5
                py-1
                text-xs
                font-semibold
                text-blue-700
              "
            >
              🧂 {recipe.nutrition?.sodium ?? "—"}
            </span>

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

          {/* Add to Planner */}
          <button
            type="button"
            onClick={openPlanner}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              whitespace-nowrap
              rounded-xl
              bg-orange-500
              px-4
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-orange-600
              hover:shadow-md
            "
          >
            📅 Add to Planner
          </button>

          {/* View Recipe — desktop only */}
          <Link
            href={`/recipes/${recipe.id}`}
            className="
              hidden
              h-9
              min-w-0
              shrink
              items-center
              justify-center
              whitespace-nowrap
              px-2
              text-sm
              font-semibold
              text-orange-600
              transition
              hover:text-orange-700

              sm:inline-flex
            "
          >
            View Recipe →
          </Link>

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
                    bg-orange-500
                    px-4
                    py-3
                    font-bold
                    text-white
                    transition
                    hover:bg-orange-600
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