"use client";

import Link from "next/link";
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

const mealTypes = ["Breakfast", "Lunch", "Dinner"];

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
      const recipeId = planner[day]?.[meal];

      if (!recipeId) return;

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
    if (plannerMeals === null) return;

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
      if (!current) return current;

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

  function removeRecipe(
    day: string,
    meal: string
  ) {
    setPlannerMeals((current) => {
      if (!current) return current;

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

    localStorage.removeItem(
      "planner-pending-slot"
    );

    setShowClearConfirm(false);
  }

  /*
   * When the user chooses a specific Planner
   * slot and then clicks Browse Recipes, save
   * that slot so RecipeCard knows exactly where
   * the next recipe should be placed.
   */
  function browseRecipes() {
    if (!picker) return;

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

  function getRecipe(
    recipeId: string | null
  ) {
    if (!recipeId) return null;

    return (
      recipes.find(
        (recipe) =>
          recipe.id === recipeId
      ) ?? null
    );
  }

  function getMealRecipes(meal: string) {
    return recipes.filter((recipe) => {
      const code =
        recipe.code?.toUpperCase() ?? "";

      if (meal === "Breakfast") {
        return code.startsWith("B");
      }

      if (meal === "Lunch") {
        return code.startsWith("L");
      }

      if (meal === "Dinner") {
        return code.startsWith("D");
      }

      return false;
    });
  }

  if (plannerMeals === null) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-8">

        <div className="mx-auto max-w-6xl">

          <h1 className="text-3xl font-bold text-slate-900">
            Weekly Planner
          </h1>

          <p className="mt-2 text-slate-600">
            Loading your planner...
          </p>

        </div>

      </main>
    );
  }

  const mobileBreakfast = getRecipe(
    plannerMeals[selectedDay].Breakfast
  );

  const mobileLunch = getRecipe(
    plannerMeals[selectedDay].Lunch
  );

  const mobileDinner = getRecipe(
    plannerMeals[selectedDay].Dinner
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-6 md:px-6 md:py-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <section className="relative mb-5 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 md:mb-7">

          <div className="absolute -right-16 -top-20 h-40 w-40 rounded-full bg-orange-100/70 md:h-48 md:w-48" />

          <div className="absolute -bottom-20 -left-10 h-32 w-32 rounded-full bg-amber-100/60 md:h-40 md:w-40" />

          <div className="relative px-5 py-5 md:px-8 md:py-8">

            <div className="flex items-start gap-3 md:gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl shadow-sm md:h-12 md:w-12 md:rounded-2xl md:text-2xl">
                🍽️
              </div>

              <div>

                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600 md:mb-1 md:text-xs">
                  Weekly meal planning
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Weekly Planner
                </h1>

                <p className="mt-1 max-w-xl text-sm leading-5 text-slate-600 md:mt-2 md:text-base md:leading-6">
                  Plan your meals for the week and let your Shopping List do the rest.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* MOBILE DAY SELECTOR */}

        <div className="mb-5 md:hidden">

          <div
            className="grid grid-cols-7 gap-1.5"
            role="tablist"
            aria-label="Choose day"
          >

            {days.map((day) => {

              const isSelected =
                selectedDay === day;

              return (

                <button
                  key={day}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() =>
                    setSelectedDay(day)
                  }
                  className={`min-w-0 rounded-xl px-1 py-2.5 text-[11px] font-bold transition ${
                    isSelected
                      ? "bg-orange-500 text-white shadow-sm"
                      : "bg-white text-slate-600 ring-1 ring-black/5 hover:bg-orange-50 hover:text-orange-700"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>

              );

            })}

          </div>

        </div>

        {/* MOBILE PLANNER */}

        <div className="md:hidden">

          <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">

            <div className="space-y-4 p-4">

              {/* BREAKFAST */}

              {mobileBreakfast ? (

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 ring-1 ring-orange-100">

                  <div className="flex items-center gap-4 p-4 pr-14">

                    <img
                      src={mobileBreakfast.image}
                      alt={mobileBreakfast.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-sm"
                    />

                    <div className="min-w-0 flex-1">

                      <div className="mb-2 flex items-center justify-between gap-2">

                        <span className="text-lg font-bold text-slate-800">
                          🥣 Breakfast
                        </span>

                        <span className="shrink-0 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                          Planned
                        </span>

                      </div>

                      <h3 className="text-left text-lg font-bold leading-6 text-slate-900">
                        {mobileBreakfast.name}
                      </h3>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeRecipe(
                        selectedDay,
                        "Breakfast"
                      )
                    }
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-base text-red-500 transition hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove breakfast"
                    title="Remove breakfast"
                  >
                    🗑️
                  </button>

                </div>

              ) : (

                <button
                  type="button"
                  onClick={() =>
                    setPicker({
                      day: selectedDay,
                      meal: "Breakfast",
                    })
                  }
                  className="group flex min-h-[150px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-gradient-to-br from-white to-orange-50/60 text-center transition hover:border-orange-400 hover:bg-orange-50"
                >

                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl text-orange-600 shadow-sm transition group-hover:scale-105">
                    +
                  </span>

                  <span className="mt-3 text-base font-bold text-slate-700">
                    Add breakfast
                  </span>

                </button>

              )}

              {/* LUNCH */}

              {mobileLunch ? (

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 ring-1 ring-orange-100">

                  <div className="flex items-center gap-4 p-4 pr-14">

                    <img
                      src={mobileLunch.image}
                      alt={mobileLunch.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-sm"
                    />

                    <div className="min-w-0 flex-1">

                      <div className="mb-2 flex items-center justify-between gap-2">

                        <span className="text-lg font-bold text-slate-800">
                          🥪 Lunch
                        </span>

                        <span className="shrink-0 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                          Planned
                        </span>

                      </div>

                      <h3 className="text-left text-lg font-bold leading-6 text-slate-900">
                        {mobileLunch.name}
                      </h3>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeRecipe(
                        selectedDay,
                        "Lunch"
                      )
                    }
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-base text-red-500 transition hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove lunch"
                    title="Remove lunch"
                  >
                    🗑️
                  </button>

                </div>

              ) : (

                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">

                  <div className="flex items-center justify-between">

                    <span className="text-lg font-bold text-slate-700">
                      🥪 Lunch
                    </span>

                    <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-bold text-slate-500">
                      Soon
                    </span>

                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Lunch recipes are coming soon.
                  </p>

                </div>

              )}

              {/* DINNER */}

              {mobileDinner ? (

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 ring-1 ring-orange-100">

                  <div className="flex items-center gap-4 p-4 pr-14">

                    <img
                      src={mobileDinner.image}
                      alt={mobileDinner.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-sm"
                    />

                    <div className="min-w-0 flex-1">

                      <div className="mb-2 flex items-center justify-between gap-2">

                        <span className="text-lg font-bold text-slate-800">
                          🍽️ Dinner
                        </span>

                        <span className="shrink-0 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                          Planned
                        </span>

                      </div>

                      <h3 className="text-left text-lg font-bold leading-6 text-slate-900">
                        {mobileDinner.name}
                      </h3>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeRecipe(
                        selectedDay,
                        "Dinner"
                      )
                    }
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-base text-red-500 transition hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove dinner"
                    title="Remove dinner"
                  >
                    🗑️
                  </button>

                </div>

              ) : (

                <button
                  type="button"
                  onClick={() =>
                    setPicker({
                      day: selectedDay,
                      meal: "Dinner",
                    })
                  }
                  className="group flex min-h-[150px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white text-center transition hover:border-orange-300 hover:bg-orange-50/50"
                >

                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-2xl font-light text-slate-400 transition group-hover:bg-orange-100 group-hover:text-orange-500">
                    +
                  </span>

                  <span className="mt-3 text-sm font-bold text-slate-500 group-hover:text-orange-700">
                    Add dinner
                  </span>

                </button>

              )}

            </div>

          </section>

        </div>

        {/* DESKTOP PLANNER */}

        <div className="hidden md:block">

          <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">

            {/* WEEK HEADER */}

            <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] border-b border-slate-100 bg-slate-50/80">

              <div className="flex items-center px-4 py-5">

                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Meals
                </span>

              </div>

              {days.map((day) => {

                const breakfast =
                  getRecipe(
                    plannerMeals[day].Breakfast
                  );

                const dinner =
                  getRecipe(
                    plannerMeals[day].Dinner
                  );

                return (

                  <div
                    key={day}
                    className={`border-l border-slate-100 px-2 py-5 text-center ${
                      breakfast || dinner
                        ? "bg-orange-50/60"
                        : ""
                    }`}
                  >

                    <span
                      className={`text-sm font-bold ${
                        breakfast || dinner
                          ? "text-orange-700"
                          : "text-slate-700"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </span>

                  </div>

                );

              })}

            </div>

            {/* BREAKFAST ROW */}

            <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] border-b border-slate-100">

              <div className="flex min-h-[235px] items-start bg-gradient-to-b from-orange-50 to-amber-50 px-4 py-7">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    🥣
                  </div>

                  <h2 className="mt-4 text-base font-bold text-slate-900">
                    Breakfast
                  </h2>

                  <p className="mt-1 max-w-[65px] text-xs leading-5 text-slate-500">
                    Morning meal
                  </p>

                </div>

              </div>

              {days.map((day) => {

                const recipe =
                  getRecipe(
                    plannerMeals[day].Breakfast
                  );

                return (

                  <div
                    key={`${day}-Breakfast`}
                    className={`border-l border-slate-100 p-3 ${
                      recipe
                        ? "bg-orange-50/35"
                        : "bg-white"
                    }`}
                  >

                    {recipe ? (

                      <div className="flex min-h-[207px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 shadow-sm ring-1 ring-orange-100">

                        <div className="flex justify-center px-2 pt-4">

                          <span className="whitespace-nowrap rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                            Planned
                          </span>

                        </div>

                        <div className="flex flex-1 items-start justify-center px-3 pt-6 text-center">

                          <h3 className="text-sm font-bold leading-5 text-slate-900">
                            {recipe.name}
                          </h3>

                        </div>

                        <div className="flex justify-center border-t border-orange-100 bg-white/60 px-2 py-3">

                          <button
                            type="button"
                            onClick={() =>
                              removeRecipe(
                                day,
                                "Breakfast"
                              )
                            }
                            aria-label={`Remove ${recipe.name}`}
                            className="whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-white hover:text-red-600"
                          >
                            🗑️ Remove
                          </button>

                        </div>

                      </div>

                    ) : (

                      <button
                        type="button"
                        onClick={() =>
                          setPicker({
                            day,
                            meal: "Breakfast",
                          })
                        }
                        className="group flex min-h-[207px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-white px-3 text-center transition hover:border-orange-300 hover:bg-orange-50/50"
                      >

                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-2xl font-light text-orange-400 transition group-hover:bg-orange-100 group-hover:text-orange-500">
                          +
                        </span>

                        <span className="mt-4 text-sm font-bold text-slate-500 group-hover:text-orange-700">
                          Add breakfast
                        </span>

                      </button>

                    )}

                  </div>

                );

              })}

            </div>

            {/* LUNCH ROW */}

            <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] border-b border-slate-100">

              <div className="flex min-h-[145px] items-start bg-slate-50 px-4 py-7">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    🥪
                  </div>

                  <h2 className="mt-4 text-base font-bold text-slate-500">
                    Lunch
                  </h2>

                  <span className="mt-2 inline-block rounded-full bg-slate-200 px-2 py-1 text-[10px] font-bold text-slate-500">
                    Soon
                  </span>

                </div>

              </div>

              {days.map((day) => (

                <div
                  key={`${day}-Lunch`}
                  className="border-l border-slate-100 bg-slate-50/50 p-3"
                >

                  <div className="flex min-h-[117px] items-center justify-center rounded-2xl bg-white/70 px-3 text-center ring-1 ring-slate-100">

                    <p className="text-xs font-semibold text-slate-400">
                      Coming soon
                    </p>

                  </div>

                </div>

              ))}

            </div>

            {/* DINNER ROW */}

            <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))]">

              <div className="flex min-h-[235px] items-start bg-gradient-to-b from-orange-50 to-amber-50 px-4 py-7">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    🍽️
                  </div>

                  <h2 className="mt-4 text-base font-bold text-slate-900">
                    Dinner
                  </h2>

                  <p className="mt-1 max-w-[65px] text-xs leading-5 text-slate-500">
                    Evening meal
                  </p>

                </div>

              </div>

              {days.map((day) => {

                const recipe =
                  getRecipe(
                    plannerMeals[day].Dinner
                  );

                return (

                  <div
                    key={`${day}-Dinner`}
                    className={`border-l border-slate-100 p-3 ${
                      recipe
                        ? "bg-orange-50/35"
                        : "bg-white"
                    }`}
                  >

                    {recipe ? (

                      <div className="flex min-h-[207px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 shadow-sm ring-1 ring-orange-100">

                        <div className="flex justify-center px-2 pt-4">

                          <span className="whitespace-nowrap rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                            Planned
                          </span>

                        </div>

                        <div className="flex flex-1 items-start justify-center px-3 pt-6 text-center">

                          <h3 className="text-sm font-bold leading-5 text-slate-900">
                            {recipe.name}
                          </h3>

                        </div>

                        <div className="flex justify-center border-t border-orange-100 bg-white/60 px-2 py-3">

                          <button
                            type="button"
                            onClick={() =>
                              removeRecipe(
                                day,
                                "Dinner"
                              )
                            }
                            aria-label={`Remove ${recipe.name}`}
                            className="whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-white hover:text-red-600"
                          >
                            🗑️ Remove
                          </button>

                        </div>

                      </div>

                    ) : (

                      <button
                        type="button"
                        onClick={() =>
                          setPicker({
                            day,
                            meal: "Dinner",
                          })
                        }
                        className="group flex min-h-[207px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-3 text-center transition hover:border-orange-300 hover:bg-orange-50/50"
                      >

                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-2xl font-light text-slate-400 transition group-hover:bg-orange-100 group-hover:text-orange-500">
                          +
                        </span>

                        <span className="mt-4 text-sm font-bold text-slate-500 group-hover:text-orange-700">
                          Add dinner
                        </span>

                      </button>

                    )}

                  </div>

                );

              })}

            </div>

          </section>

        </div>

        {/* SHOPPING LIST / CLEAR */}

        <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 md:p-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                🛒
              </span>

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Your shopping list is ready
                </h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                  Your planned meals have been added to your Shopping List.
                </p>

                <Link
                  href="/shopping"
                  className="mt-2 inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
                >
                  🛒 Go to Shopping List
                  <span className="ml-2">
                    →
                  </span>
                </Link>

              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                setShowClearConfirm(true)
              }
              className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-black/10 transition hover:bg-red-50 hover:text-red-600 md:shrink-0"
            >
              🗑️ Clear Week
            </button>

          </div>

        </div>

      </div>

      {/* CLEAR CONFIRMATION */}

      {showClearConfirm && (

        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-xl">
              🗑️
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Clear this week?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This will remove all meals from your Weekly Planner and update your Shopping List.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowClearConfirm(false)
                }
                className="rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-200"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={clearWeek}
                className="rounded-2xl bg-red-500 px-4 py-3 font-bold text-white transition hover:bg-red-600"
              >
                Clear Week
              </button>

            </div>

          </div>

        </div>

      )}

      {/* RECIPE PICKER */}

      {picker && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-5">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Choose {picker.meal.toLowerCase()}
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {picker.day}
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setPicker(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500 transition hover:bg-slate-200"
                aria-label="Close"
              >
                ×
              </button>

            </div>

            <div className="shrink-0 border-b border-slate-100 p-5">

              <button
                type="button"
                onClick={browseRecipes}
                className="group w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-5 text-left text-white shadow-sm transition hover:shadow-md"
              >

                <div className="flex items-center gap-3">

                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-xl">
                    🔎
                  </span>

                  <div>

                    <div className="text-base font-bold">
                      Browse Recipes
                    </div>

                    <div className="mt-1 text-sm text-orange-50">
                      See photos, cooking times and nutrition information.
                    </div>

                  </div>

                </div>

              </button>

              <div className="mt-3 flex items-center gap-2 px-1">

                <span className="text-sm">
                  📋
                </span>

                <div>

                  <p className="text-sm font-bold text-slate-700">
                    Quick Select
                  </p>

                  <p className="text-xs text-slate-500">
                    Or choose directly from the {picker.meal.toLowerCase()} recipes below.
                  </p>

                </div>

              </div>

            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/50 p-5">

              <div className="space-y-3">

                {getMealRecipes(
                  picker.meal
                ).map((recipe) => (

                  <button
                    key={recipe.id}
                    type="button"
                    onClick={() =>
                      chooseRecipe(
                        recipe.id
                      )
                    }
                    className="w-full rounded-2xl bg-white px-5 py-4 text-left shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:ring-orange-200 hover:shadow-md active:translate-y-0"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div className="min-w-0">

                        <p className="text-base font-bold leading-snug text-slate-900">
                          {recipe.name}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {recipe.calories}
                        </p>

                      </div>

                      <span className="shrink-0 text-lg text-orange-500">
                        →
                      </span>

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