"use client";

import { useEffect, useState } from "react";
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

type PlannerMeals = {
  [day: string]: {
    [meal: string]: string | null;
  };
};

type ShoppingData = {
  selectedRecipes: string[];
  shoppingList: unknown[];
  checkedItems: unknown[];
  people: number;
  plannerRecipes?: string[];
  manualRecipes?: string[];
  plannerCounts?: Record<string, number>;
};

function createEmptyPlanner(): PlannerMeals {
  const initial: PlannerMeals = {};

  days.forEach((day) => {
    initial[day] = {};

    mealTypes.forEach((meal) => {
      initial[day][meal] = null;
    });
  });

  return initial;
}

function getPlannerCounts(
  planner: PlannerMeals
): Record<string, number> {
  const counts: Record<string, number> = {};

  days.forEach((day) => {
    mealTypes.forEach((meal) => {
      const recipeId =
        planner[day]?.[meal];

      if (!recipeId) {
        return;
      }

      counts[recipeId] =
        (counts[recipeId] ?? 0) + 1;
    });
  });

  return counts;
}

function syncPlannerWithShoppingList(
  planner: PlannerMeals
) {
  const saved =
    localStorage.getItem("shopping-data");

  let data: ShoppingData = {
    selectedRecipes: [],
    shoppingList: [],
    checkedItems: [],
    people: 1,
    plannerRecipes: [],
    manualRecipes: [],
    plannerCounts: {},
  };

  if (saved) {
    try {
      data = {
        ...data,
        ...JSON.parse(saved),
      };
    } catch {
      // Use defaults.
    }
  }

  const selectedRecipes =
    data.selectedRecipes ?? [];

  const existingPlannerRecipes =
    data.plannerRecipes ?? [];

  const existingManualRecipes =
    data.manualRecipes ??
    selectedRecipes.filter(
      (recipeId) =>
        !existingPlannerRecipes.includes(
          recipeId
        )
    );

  const counts =
    getPlannerCounts(planner);

  const uniquePlannedRecipeIds =
    Object.keys(counts);

  const updatedSelectedRecipes = [
    ...new Set([
      ...existingManualRecipes,
      ...uniquePlannedRecipeIds,
    ]),
  ];

  localStorage.setItem(
    "shopping-data",
    JSON.stringify({
      ...data,
      selectedRecipes:
        updatedSelectedRecipes,
      plannerRecipes:
        uniquePlannedRecipeIds,
      manualRecipes:
        existingManualRecipes,
      plannerCounts:
        counts,
    })
  );

  window.dispatchEvent(
    new Event("shopping-list-updated")
  );
}

export default function WeeklyPlannerPage() {
  const [selectedDay, setSelectedDay] =
    useState("Monday");

  const [plannerMeals, setPlannerMeals] =
    useState<PlannerMeals | null>(null);

  const [picker, setPicker] =
    useState<{
      day: string;
      meal: string;
    } | null>(null);

  const [showClearConfirm, setShowClearConfirm] =
    useState(false);

  useEffect(() => {
    const emptyPlanner =
      createEmptyPlanner();

    const saved =
      localStorage.getItem(
        "weekly-planner"
      );

    if (!saved) {
      setPlannerMeals(emptyPlanner);
      return;
    }

    try {
      const savedPlanner =
        JSON.parse(saved);

      const loadedPlanner: PlannerMeals = {
        ...emptyPlanner,
        ...savedPlanner,
      };

      setPlannerMeals(loadedPlanner);

      syncPlannerWithShoppingList(
        loadedPlanner
      );
    } catch {
      setPlannerMeals(emptyPlanner);
    }
  }, []);

  useEffect(() => {
    if (plannerMeals === null) {
      return;
    }

    localStorage.setItem(
      "weekly-planner",
      JSON.stringify(plannerMeals)
    );

    syncPlannerWithShoppingList(
      plannerMeals
    );

    window.dispatchEvent(
      new Event("weekly-planner-updated")
    );
  }, [plannerMeals]);

  function chooseRecipe(
    recipeId: string
  ) {
    if (
      !picker ||
      plannerMeals === null
    ) {
      return;
    }

    setPlannerMeals((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,

        [picker.day]: {
          ...current[picker.day],

          [picker.meal]: recipeId,
        },
      };
    });

    setPicker(null);
  }

  function browseRecipes() {
    if (!picker) {
      return;
    }

    localStorage.setItem(
      "planner-pending-slot",
      JSON.stringify({
        day: picker.day,
        meal: picker.meal,
      })
    );

    setPicker(null);

    window.location.href = "/recipes";
  }

  function removeRecipe(
    day: string,
    meal: string
  ) {
    setPlannerMeals((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,

        [day]: {
          ...current[day],

          [meal]: null,
        },
      };
    });
  }

  function clearWeek() {
    setPlannerMeals(
      createEmptyPlanner()
    );

    setShowClearConfirm(false);
  }

  function getRecipe(
    recipeId: string | null
  ) {
    if (!recipeId) {
      return null;
    }

    return (
      recipes.find(
        (recipe) =>
          recipe.id === recipeId
      ) ?? null
    );
  }

  if (plannerMeals === null) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-6">

        <h1 className="text-3xl font-bold text-slate-900">
          Weekly Planner
        </h1>

        <p className="mt-2 text-slate-600">
          Loading your planner...
        </p>

      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">

      {/* HEADING */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-slate-900">
          Weekly Planner
        </h1>

        <p className="mt-1 text-slate-600">
          Plan your meals for the week.
        </p>

      </div>

      {/* MOBILE DAY SELECTOR */}
      <div className="mb-5 md:hidden">

        <label
          htmlFor="planner-day"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Day
        </label>

        <select
          id="planner-day"
          value={selectedDay}
          onChange={(e) =>
            setSelectedDay(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-slate-900 shadow-sm"
        >

          {days.map((day) => (
            <option
              key={day}
              value={day}
            >
              {day}
            </option>
          ))}

        </select>

      </div>

      {/* MOBILE PLANNER */}
      <div className="md:hidden">

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

          <h2 className="mb-4 text-xl font-bold text-slate-900">
            {selectedDay}
          </h2>

          <div className="space-y-4">

            {mealTypes.map((meal) => {

              const recipe =
                getRecipe(
                  plannerMeals[
                    selectedDay
                  ][meal]
                );

              return (
                <div
                  key={meal}
                  className="rounded-xl border border-gray-200 bg-slate-50 p-4"
                >

                  <h3 className="mb-3 font-bold text-slate-900">
                    {meal}
                  </h3>

                  {recipe ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-3">

                      <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">

                          <p className="truncate font-semibold text-slate-900">
                            {recipe.name}
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeRecipe(
                              selectedDay,
                              meal
                            )
                          }
                          className="shrink-0 text-sm font-semibold text-red-500"
                        >
                          Remove
                        </button>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setPicker({
                            day: selectedDay,
                            meal,
                          })
                        }
                        className="mt-3 w-full rounded-lg bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-600"
                      >
                        Change meal
                      </button>

                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setPicker({
                          day: selectedDay,
                          meal,
                        })
                      }
                      className="w-full rounded-xl border-2 border-dashed border-gray-300 bg-white px-4 py-4 text-sm font-semibold text-slate-500 transition hover:border-orange-400 hover:text-orange-600"
                    >
                      + Choose meal
                    </button>
                  )}

                </div>
              );

            })}

          </div>

        </div>

      </div>

      {/* DESKTOP PLANNER */}
      <div className="hidden overflow-x-auto md:block">

        <div className="min-w-[850px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="grid grid-cols-8 border-b border-gray-200 bg-slate-50">

            <div className="p-4 font-bold text-slate-700">
              Meal
            </div>

            {days.map((day) => (
              <div
                key={day}
                className="border-l border-gray-200 p-4 text-center font-bold text-slate-900"
              >
                {day.slice(0, 3)}
              </div>
            ))}

          </div>

          {mealTypes.map((meal) => (
            <div
              key={meal}
              className="grid grid-cols-8 border-b border-gray-200 last:border-b-0"
            >

              <div className="flex items-center bg-slate-50 p-4 font-bold text-slate-700">
                {meal}
              </div>

              {days.map((day) => {

                const recipe =
                  getRecipe(
                    plannerMeals[
                      day
                    ][meal]
                  );

                return (
                  <div
                    key={`${day}-${meal}`}
                    className="border-l border-gray-200 p-3"
                  >

                    {recipe ? (
                      <div className="rounded-xl border border-gray-200 bg-white p-3">

                        <p className="text-sm font-semibold text-slate-900">
                          {recipe.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {recipe.cookingTime}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removeRecipe(
                              day,
                              meal
                            )
                          }
                          className="mt-2 text-xs font-semibold text-red-500"
                        >
                          Remove
                        </button>

                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setPicker({
                            day,
                            meal,
                          })
                        }
                        className="flex min-h-[90px] w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white px-2 text-sm font-semibold text-slate-500 transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
                      >
                        + Choose meal
                      </button>
                    )}

                  </div>
                );

              })}

            </div>
          ))}

        </div>

      </div>

      {/* CLEAR WEEK */}
      <div className="mt-6 flex justify-end">

        <button
          type="button"
          onClick={() =>
            setShowClearConfirm(true)
          }
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-red-100 hover:text-red-700"
        >
          🗑️ Clear Week
        </button>

      </div>

      {/* CLEAR CONFIRMATION */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="text-lg font-bold text-slate-900">
              Clear this week?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This will remove all meals from your Weekly Planner and update your Shopping List.
            </p>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowClearConfirm(false)
                }
                className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-slate-700 hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={clearWeek}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white hover:bg-red-600"
              >
                Clear Week
              </button>

            </div>

          </div>

        </div>
      )}

      {/* RECIPE PICKER */}
      {picker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* POPUP HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 p-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Choose a meal
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {picker.day} •{" "}
                  {picker.meal}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setPicker(null)
                }
                className="rounded-full px-3 py-2 text-xl text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                ×
              </button>

            </div>

            {/* BROWSE / QUICK SELECT */}
            <div className="shrink-0 space-y-3 border-b border-gray-200 p-5">

              <button
                type="button"
                onClick={browseRecipes}
                className="w-full rounded-xl bg-orange-500 px-5 py-4 text-left text-white transition hover:bg-orange-600"
              >

                <div className="text-base font-bold">
                  🔎 Browse Recipes
                </div>

                <div className="mt-1 text-sm text-orange-50">
                  See photos, cooking times, calories and nutrition information.
                </div>

              </button>

              <div className="rounded-xl bg-slate-50 px-5 py-3">

                <p className="text-sm font-semibold text-slate-700">
                  📋 Quick Select
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Choose directly from the available recipes below.
                </p>

              </div>

            </div>

            {/* QUICK SELECT LIST */}
            <div className="min-h-0 flex-1 overflow-y-auto p-5">

              <div className="space-y-3">

                {recipes
                  .filter((recipe) => {

                    const code =
                      recipe.code
                        ?.toUpperCase() ??
                      "";

                    if (
                      picker.meal ===
                      "Breakfast"
                    ) {
                      return code.startsWith(
                        "B"
                      );
                    }

                    if (
                      picker.meal ===
                      "Lunch"
                    ) {
                      return code.startsWith(
                        "L"
                      );
                    }

                    if (
                      picker.meal ===
                      "Dinner"
                    ) {
                      return code.startsWith(
                        "D"
                      );
                    }

                    return true;
                  })
                  .map((recipe) => (

                    <button
                      key={recipe.id}
                      type="button"
                      onClick={() =>
                        chooseRecipe(
                          recipe.id
                        )
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-left transition hover:border-orange-400 hover:bg-orange-50 active:bg-orange-100"
                    >

                      <div className="flex items-center justify-between gap-5">

                        <div className="min-w-0 flex-1">

                          <p className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
                            {recipe.name}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {recipe.calories}
                          </p>

                        </div>

                        <div className="shrink-0 text-right">

                          <p className="text-sm font-semibold text-slate-600">
                            ⏱️
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {recipe.cookingTime}
                          </p>

                        </div>

                      </div>

                    </button>

                  ))}

              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}