"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { recipes } from "@/data/recipes";

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

function getShortDay(day: string) {
  return day.slice(0, 3);
}

export default function RecipeDetailPage() {
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

  const [showSidney, setShowSidney] =
    useState(false);

  const [sidneyMessage, setSidneyMessage] =
    useState("");

  const sidneyMessages = [
    "Excellent!",
    "Enjoy!",
    "Tasty!",
    "Lovely!",
    "Great Choice!",
    "Yum!",
    "Delicious!",
    "Wow!",
    "Brilliant!",
    "Nice!",
  ];

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
   * Load planner locations.
   */
  function loadPlannerStatus() {
    if (!recipe) {
      return;
    }

    setPlacements(
      getRecipePlacements()
    );
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
  }, [recipe?.id]);

  /*
   * Open the Planner popup.
   */
  function openPlanner() {
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
   * Add the recipe to the selected
   * Planner day and meal.
   */
  function addToPlanner() {
    if (!recipe) {
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
     * Make sure every day and meal
     * slot exists.
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
     * Add the recipe.
     */
    planner[plannerDay][
      plannerMeal
    ] = recipe.id;

    /*
     * Save the Planner.
     */
    localStorage.setItem(
      "weekly-planner",
      JSON.stringify(
        planner
      )
    );

    /*
     * Update the displayed locations.
     */
    setPlacements(
      getRecipePlacements()
    );

    /*
     * Sidney celebrates.
     */
    const randomMessage =
      sidneyMessages[
        Math.floor(
          Math.random() *
            sidneyMessages.length
        )
      ];

    setSidneyMessage(
      randomMessage
    );

    setShowSidney(true);

    window.setTimeout(() => {
      setShowSidney(false);
    }, 1500);

    /*
     * Tell the rest of the website.
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
     * Close the popup automatically.
     */
    setShowPlanner(false);
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

  /*
   * Button text.
   */
  function getPlannerButtonText() {
    if (placements.length === 0) {
      return "📅 Add to Planner";
    }

    if (placements.length === 1) {
      return `📅 ${getShortDay(
        placements[0].day
      )} • ${placements[0].meal}`;
    }

    return `📅 ${placements.length} places`;
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

  return (
    <main className="mx-auto max-w-3xl px-6 pb-32 pt-6">

      {/* Recipe image */}
      <Image
        src={recipe.image}
        alt={recipe.name}
        width={1200}
        height={700}
        className="mb-6 h-80 w-full rounded-xl object-cover"
      />

      {/* Title */}
      <h1 className="mb-4 text-3xl font-bold">
        {recipe.name}
      </h1>

      {/* Description */}
      <p className="mb-6 text-lg">
        {recipe.description}
      </p>

      {/* Recipe summary */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-lg border p-4 text-center">

          <div className="text-2xl">
            ⏱️
          </div>

          <strong>
            Cooking Time
          </strong>

          <p>
            {recipe.cookingTime}
          </p>

        </div>

        <div className="rounded-lg border p-4 text-center">

          <div className="text-2xl">
            🔥
          </div>

          <strong>
            Calories
          </strong>

          <p>
            {recipe.calories}
          </p>

        </div>

        <div className="rounded-lg border p-4 text-center">

          <div className="text-2xl">
            💪
          </div>

          <strong>
            Protein
          </strong>

          <p>
            {recipe.protein}
          </p>

        </div>

      </div>

      {/* Equipment */}
      <h2 className="mb-2 mt-6 text-xl font-bold">
        🔎 Equipment
      </h2>

      <p className="mb-6">
        {recipe.equipment}
      </p>

      {/* Ingredients */}
      <h2 className="mb-2 mt-6 text-xl font-bold">
        🥘 Ingredients
      </h2>

      <ul className="ml-6 list-disc space-y-1">

        {recipe.ingredients.map(
          (ingredient, index) => (
            <li key={index}>
              {ingredient.item} -{" "}
              {ingredient.quantity}
            </li>
          )
        )}

      </ul>

      {/* Method */}
      <h2 className="mb-2 mt-8 text-xl font-bold">
        👨‍🍳 Method
      </h2>

      <ol className="ml-6 list-decimal space-y-2">

        {recipe.method.map(
          (step, index) => (
            <li key={index}>
              {step}
            </li>
          )
        )}

      </ol>

      {/* Nutrition */}
      <h2 className="mb-2 mt-8 text-xl font-bold">
        📊 Nutrition
      </h2>

      <div className="rounded-lg border p-4">

        <p>
          Calories:{" "}
          {recipe.nutrition.calories}
        </p>

        <p>
          Protein:{" "}
          {recipe.nutrition.protein}
        </p>

        <p>
          Carbohydrates:{" "}
          {recipe.nutrition.carbohydrates}
        </p>

        <p>
          Fat:{" "}
          {recipe.nutrition.fat}
        </p>

        <p>
          Fibre:{" "}
          {recipe.nutrition.fibre}
        </p>

      </div>

      {/* Dietary Guide */}
      <h2 className="mb-2 mt-8 text-xl font-bold">
        🥗 Dietary Guide
      </h2>

      <div className="space-y-2 rounded-lg border p-4">

        <p>
          🥔{" "}
          <strong>
            Potassium:
          </strong>{" "}
          {recipe.potassium}
        </p>

        <p>
          🧀{" "}
          <strong>
            Phosphate:
          </strong>{" "}
          {recipe.phosphate}
        </p>

        <p>
          🍖{" "}
          <strong>
            Purines:
          </strong>{" "}
          {recipe.purines}
        </p>

        {recipe.dietaryNote && (
          <p className="mt-3 text-sm text-gray-600">
            {recipe.dietaryNote}
          </p>
        )}

      </div>

      {/* Fixed Planner button */}
      <div className="fixed bottom-4 right-4 z-40">

        <button
          type="button"
          onClick={
            openPlanner
          }
          className={`rounded-xl px-5 py-3 text-sm font-bold shadow-lg transition ${
            placements.length > 0
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {getPlannerButtonText()}
        </button>

      </div>

      {/* Sidney */}
      {showSidney && (
        <div className="pointer-events-none fixed bottom-20 right-4 z-50 flex items-start gap-1">

          <img
            src="/images/sidney/sidney-recipes.png"
            alt="Sidney"
            className="h-20 w-20 object-contain"
          />

          <div className="relative mt-1 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-lg">

            <div className="absolute left-[-6px] top-3 h-0 w-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-white" />

            {sidneyMessage}

          </div>

        </div>
      )}

      {/* Planner popup */}
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
                  className="w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600"
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