"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

  const [showPickConfirm, setShowPickConfirm] =
    useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  function handlePlannerTouchStart(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }

  function handlePlannerTouchEnd(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX =
      touch.clientX - touchStartX.current;
    const deltaY =
      touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    /*
     * Only treat the gesture as a day swipe when
     * the horizontal movement is clearly greater
     * than the vertical movement. This keeps normal
     * vertical page scrolling working as expected.
     */
    if (
      Math.abs(deltaX) < 50 ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    const currentIndex =
      days.indexOf(selectedDay);

    if (deltaX < 0) {
      // Swipe left -> next day.
      if (currentIndex < days.length - 1) {
        setSelectedDay(days[currentIndex + 1]);
      }
    } else {
      // Swipe right -> previous day.
      if (currentIndex > 0) {
        setSelectedDay(days[currentIndex - 1]);
      }
    }
  }

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

  function getRandomRecipeId(
    meal: string,
    usedIds: Set<string>
  ) {
    const mealRecipes =
      getMealRecipes(meal);

    const unusedRecipes =
      mealRecipes.filter(
        (recipe) => !usedIds.has(recipe.id)
      );

    const pool =
      unusedRecipes.length > 0
        ? unusedRecipes
        : mealRecipes;

    if (pool.length === 0) {
      return null;
    }

    const randomIndex =
      Math.floor(
        Math.random() * pool.length
      );

    return pool[randomIndex].id;
  }

  function pickForMe(
    replaceAll = false
  ) {
    setPlannerMeals((current) => {
      if (!current) return current;

      const nextPlanner: PlannerMeals =
        replaceAll
          ? createEmptyPlanner()
          : JSON.parse(
              JSON.stringify(current)
            );

      const usedByMeal: Record<
        string,
        Set<string>
      > = {
        Breakfast: new Set<string>(),
        Lunch: new Set<string>(),
        Dinner: new Set<string>(),
      };

      /*
       * Keep existing choices in the
       * used pool so Pick for Me does
       * not create unnecessary repeats.
       */
      if (!replaceAll) {
        days.forEach((day) => {
          mealTypes.forEach((meal) => {
            const recipeId =
              current[day]?.[meal];

            if (
              recipeId &&
              usedByMeal[meal]
            ) {
              usedByMeal[meal].add(
                recipeId
              );
            }
          });
        });
      }

      /*
       * Fill empty slots.
       *
       * If replaceAll is true, every slot
       * is filled with a new random choice.
       */
      days.forEach((day) => {
        mealTypes.forEach((meal) => {
          if (
            !replaceAll &&
            nextPlanner[day][meal]
          ) {
            return;
          }

          const recipeId =
            getRandomRecipeId(
              meal,
              usedByMeal[meal]
            );

          if (!recipeId) {
            return;
          }

          nextPlanner[day][meal] =
            recipeId;

          usedByMeal[meal].add(
            recipeId
          );
        });
      });

      return nextPlanner;
    });

    setShowPickConfirm(false);
  }

  function startPickForMe() {
    if (plannerMeals === null) {
      return;
    }

    const hasEmptySlots =
      days.some((day) =>
        mealTypes.some(
          (meal) =>
            !plannerMeals[day]?.[meal]
        )
      );

    /*
     * If the week is already full,
     * ask before replacing everything.
     */
    if (!hasEmptySlots) {
      setShowPickConfirm(true);
      return;
    }

    /*
     * If there are empty slots,
     * fill only those slots.
     */
    pickForMe();
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

  function getMealRecipes(
    meal: string
  ) {
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
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-5 md:px-6 md:py-6">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <section className="relative mb-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 md:mb-4">

          <div className="absolute -right-16 -top-20 h-40 w-40 rounded-full bg-orange-100/70 md:h-48 md:w-48" />

          <div className="absolute -bottom-20 -left-10 h-32 w-32 rounded-full bg-amber-100/60 md:h-40 md:w-40" />

          <div className="relative px-5 py-5 md:px-8 md:py-5">

            <div className="flex items-center gap-3 md:gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl shadow-sm md:h-12 md:w-12 md:rounded-2xl md:text-2xl">
                🍽️
              </div>

              <div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Weekly Planner
                </h1>

                <p className="mt-1 max-w-xl text-sm leading-5 text-slate-600 md:text-base md:leading-6">
                  Plan your meals for the week and let your Shopping List do the rest.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* MOBILE DAY SELECTOR */}

        <div className="mb-4 md:hidden">

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

        <div
          className="md:hidden"
          onTouchStart={handlePlannerTouchStart}
          onTouchEnd={handlePlannerTouchEnd}
        >

          <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">

            <div className="space-y-3 p-3">

              {/* BREAKFAST */}

              {mobileBreakfast ? (

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 ring-1 ring-orange-100">

                  <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 p-3">

                    <span className="min-w-0 text-lg font-bold leading-none text-slate-800">
                      🥣 Breakfast
                    </span>

                    <span className="shrink-0 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase leading-none tracking-wide text-white shadow-sm">
                      Planned
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeRecipe(
                          selectedDay,
                          "Breakfast"
                        )
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm leading-none text-slate-500 transition hover:bg-white/80 hover:text-red-600"
                      aria-label="Remove breakfast"
                      title="Remove breakfast"
                    >
                      🗑️
                    </button>

                    <div className="col-span-3 flex items-center gap-3">

                      <img
                        src={mobileBreakfast.image}
                        alt={mobileBreakfast.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-sm"
                      />

                      <h3 className="min-w-0 flex-1 text-left text-lg font-bold leading-6 text-slate-900">
                        {mobileBreakfast.name}
                      </h3>

                    </div>

                  </div>

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
                  className="group flex min-h-[145px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-gradient-to-br from-white to-orange-50/60 text-center transition hover:border-orange-400 hover:bg-orange-50"
                >

                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-2xl text-orange-600 shadow-sm transition group-hover:scale-105">
                    +
                  </span>

                  <span className="mt-3 text-sm font-bold text-slate-700">
                    Add breakfast
                  </span>

                </button>

              )}

              {/* LUNCH */}

              {mobileLunch ? (

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 ring-1 ring-orange-100">

                  <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 p-3">

                    <span className="min-w-0 text-lg font-bold leading-none text-slate-800">
                      🥪 Lunch
                    </span>

                    <span className="shrink-0 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase leading-none tracking-wide text-white shadow-sm">
                      Planned
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeRecipe(
                          selectedDay,
                          "Lunch"
                        )
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm leading-none text-slate-500 transition hover:bg-white/80 hover:text-red-600"
                      aria-label="Remove lunch"
                      title="Remove lunch"
                    >
                      🗑️
                    </button>

                    <div className="col-span-3 flex items-center gap-3">

                      <img
                        src={mobileLunch.image}
                        alt={mobileLunch.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-sm"
                      />

                      <h3 className="min-w-0 flex-1 text-left text-lg font-bold leading-6 text-slate-900">
                        {mobileLunch.name}
                      </h3>

                    </div>

                  </div>

                </div>

              ) : (

                <button
                  type="button"
                  onClick={() =>
                    setPicker({
                      day: selectedDay,
                      meal: "Lunch",
                    })
                  }
                  className="group flex min-h-[145px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-gradient-to-br from-white to-orange-50/60 text-center transition hover:border-orange-400 hover:bg-orange-50"
                >

                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-2xl text-orange-600 shadow-sm transition group-hover:scale-105">
                    +
                  </span>

                  <span className="mt-3 text-sm font-bold text-slate-700">
                    Add lunch
                  </span>

                </button>

              )}

              {/* DINNER */}

              {mobileDinner ? (

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 ring-1 ring-orange-100">

                  <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 p-3">

                    <span className="min-w-0 text-lg font-bold leading-none text-slate-800">
                      🍽️ Dinner
                    </span>

                    <span className="shrink-0 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase leading-none tracking-wide text-white shadow-sm">
                      Planned
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeRecipe(
                          selectedDay,
                          "Dinner"
                        )
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm leading-none text-slate-500 transition hover:bg-white/80 hover:text-red-600"
                      aria-label="Remove dinner"
                      title="Remove dinner"
                    >
                      🗑️
                    </button>

                    <div className="col-span-3 flex items-center gap-3">

                      <img
                        src={mobileDinner.image}
                        alt={mobileDinner.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-sm"
                      />

                      <h3 className="min-w-0 flex-1 text-left text-lg font-bold leading-6 text-slate-900">
                        {mobileDinner.name}
                      </h3>

                    </div>

                  </div>

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
                  className="group flex min-h-[145px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-gradient-to-br from-white to-orange-50/60 text-center transition hover:border-orange-400 hover:bg-orange-50"
                >

                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-2xl text-orange-600 shadow-sm transition group-hover:scale-105">
                    +
                  </span>

                  <span className="mt-3 text-sm font-bold text-slate-700">
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

              <div className="flex items-center px-4 py-2">

                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Meals
                </span>

              </div>

              {days.map((day) => (

                <div
                  key={day}
                  className="flex items-center justify-center border-l border-slate-100 py-2"
                >

                  <span className="text-sm font-bold text-orange-600">
                    {day.slice(0, 3)}
                  </span>

                </div>

              ))}

            </div>

            {/* BREAKFAST ROW */}

            <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] border-b border-slate-100">

              <div className="flex items-start bg-gradient-to-b from-orange-50 to-amber-50 px-4 py-3">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    🥣
                  </div>

                  <h2 className="mt-2 text-base font-bold text-slate-900">
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
                    plannerMeals[
                      day
                    ].Breakfast
                  );

                return (

                  <div
                    key={`${day}-Breakfast-${plannerMeals[day].Breakfast ?? "empty"}`}
                    className={`border-l border-slate-100 p-2 ${
                      recipe
                        ? "bg-orange-50/35"
                        : "bg-white"
                    }`}
                  >

                    {recipe ? (

                      <div className="relative flex min-h-[136px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 shadow-sm ring-1 ring-orange-100">

                        <div className="relative flex justify-center pt-2">

                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="h-[76px] w-[76px] rounded-xl object-cover shadow-sm"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeRecipe(
                                day,
                                "Breakfast"
                              )
                            }
                            className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold leading-none text-slate-500 shadow-sm ring-1 ring-black/10 transition hover:text-red-600"
                            aria-label={`Remove ${recipe.name}`}
                            title={`Remove ${recipe.name}`}
                          >
                            ×
                          </button>

                        </div>

                        <div className="flex flex-1 items-center justify-center px-2 pb-2 pt-1 text-center">

                          <h3 className="text-sm font-bold leading-5 text-slate-900">
                            {recipe.name}
                          </h3>

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
                        className="group flex min-h-[136px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-white px-3 text-center transition hover:border-orange-300 hover:bg-orange-50/50"
                      >

                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-2xl font-light text-orange-400 transition group-hover:bg-orange-100 group-hover:text-orange-500">
                          +
                        </span>

                        <span className="mt-2 text-sm font-bold text-slate-500 group-hover:text-orange-700">
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

              <div className="flex items-start bg-gradient-to-b from-orange-50 to-amber-50 px-4 py-3">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    🥪
                  </div>

                  <h2 className="mt-2 text-base font-bold text-slate-900">
                    Lunch
                  </h2>

                  <p className="mt-1 max-w-[65px] text-xs leading-5 text-slate-500">
                    Midday meal
                  </p>

                </div>

              </div>

              {days.map((day) => {

                const recipe =
                  getRecipe(
                    plannerMeals[
                      day
                    ].Lunch
                  );

                return (

                  <div
                    key={`${day}-Lunch-${plannerMeals[day].Lunch ?? "empty"}`}
                    className={`border-l border-slate-100 p-2 ${
                      recipe
                        ? "bg-orange-50/35"
                        : "bg-white"
                    }`}
                  >

                    {recipe ? (

                      <div className="relative flex min-h-[136px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 shadow-sm ring-1 ring-orange-100">

                        <div className="relative flex justify-center pt-2">

                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="h-[76px] w-[76px] rounded-xl object-cover shadow-sm"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeRecipe(
                                day,
                                "Lunch"
                              )
                            }
                            className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold leading-none text-slate-500 shadow-sm ring-1 ring-black/10 transition hover:text-red-600"
                            aria-label={`Remove ${recipe.name}`}
                            title={`Remove ${recipe.name}`}
                          >
                            ×
                          </button>

                        </div>

                        <div className="flex flex-1 items-center justify-center px-2 pb-2 pt-1 text-center">

                          <h3 className="text-sm font-bold leading-5 text-slate-900">
                            {recipe.name}
                          </h3>

                        </div>

                      </div>

                    ) : (

                      <button
                        type="button"
                        onClick={() =>
                          setPicker({
                            day,
                            meal: "Lunch",
                          })
                        }
                        className="group flex min-h-[136px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-white px-3 text-center transition hover:border-orange-300 hover:bg-orange-50/50"
                      >

                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-2xl font-light text-orange-400 transition group-hover:bg-orange-100 group-hover:text-orange-500">
                          +
                        </span>

                        <span className="mt-2 text-sm font-bold text-slate-500 group-hover:text-orange-700">
                          Add lunch
                        </span>

                      </button>

                    )}

                  </div>

                );

              })}

            </div>

            {/* DINNER ROW */}

            <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))]">

              <div className="flex items-start bg-gradient-to-b from-orange-50 to-amber-50 px-4 py-3">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    🍽️
                  </div>

                  <h2 className="mt-2 text-base font-bold text-slate-900">
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
                    plannerMeals[
                      day
                    ].Dinner
                  );

                return (

                  <div
                    key={`${day}-Dinner-${plannerMeals[day].Dinner ?? "empty"}`}
                    className={`border-l border-slate-100 p-2 ${
                      recipe
                        ? "bg-orange-50/35"
                        : "bg-white"
                    }`}
                  >

                    {recipe ? (

                      <div className="relative flex min-h-[136px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 shadow-sm ring-1 ring-orange-100">

                        <div className="relative flex justify-center pt-2">

                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="h-[76px] w-[76px] rounded-xl object-cover shadow-sm"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeRecipe(
                                day,
                                "Dinner"
                              )
                            }
                            className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold leading-none text-slate-500 shadow-sm ring-1 ring-black/10 transition hover:text-red-600"
                            aria-label={`Remove ${recipe.name}`}
                            title={`Remove ${recipe.name}`}
                          >
                            ×
                          </button>

                        </div>

                        <div className="flex flex-1 items-center justify-center px-2 pb-2 pt-1 text-center">

                          <h3 className="text-sm font-bold leading-5 text-slate-900">
                            {recipe.name}
                          </h3>

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
                        className="group flex min-h-[136px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-white px-3 text-center transition hover:border-orange-300 hover:bg-orange-50/50"
                      >

                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-2xl font-light text-orange-400 transition group-hover:bg-orange-100 group-hover:text-orange-500">
                          +
                        </span>

                        <span className="mt-2 text-sm font-bold text-slate-500 group-hover:text-orange-700">
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

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-stretch">

          <Link
            href="/shopping"
            className="group flex flex-1 items-center justify-between rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition hover:bg-green-50 hover:ring-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 md:p-5"
            aria-label="Go to Shopping List"
          >

            <div className="flex min-w-0 items-center gap-3">

              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-xl transition group-hover:scale-105">
                🛒
              </span>

              <div className="min-w-0">

                <h2 className="text-base font-bold text-slate-900 md:text-lg">
                  Your shopping list is ready
                </h2>

                <p className="mt-0.5 text-xs leading-5 text-slate-600 md:text-sm">
                  Your planned meals have automatically been added to your Shopping List.
                </p>

              </div>

            </div>

            <span
              className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600 transition group-hover:translate-x-1 group-hover:bg-green-600 group-hover:text-white"
              aria-hidden="true"
            >
              →
            </span>

          </Link>

          <div className="flex items-center gap-2 self-stretch md:self-auto">

            <button
              type="button"
              onClick={startPickForMe}
              className="flex-1 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-600 md:flex-none md:px-5 md:py-3 md:text-sm"
            >
              <span className="text-xl leading-none md:text-2xl" aria-hidden="true">🎲</span>
              <span>Pick for Me</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setShowClearConfirm(true)
              }
              className="flex-1 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-black/10 transition hover:bg-red-50 hover:text-red-600 md:flex-none md:px-5 md:py-3 md:text-sm"
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

      {/* PICK FOR ME CONFIRMATION */}

      {showPickConfirm && (

        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl">
              🎲
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Pick a new week?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your week is already full. This will replace all of your current meals with random choices.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowPickConfirm(false)
                }
                className="rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-200"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  pickForMe(true)
                }
                className="rounded-2xl bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                Pick for Me
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

            </div>

            <div className="flex-1 overflow-y-auto p-5">

              <div className="grid gap-3 sm:grid-cols-2">

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
                    className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-left ring-1 ring-slate-100 transition hover:bg-orange-50 hover:ring-orange-200"
                  >

                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />

                    <span className="min-w-0 text-sm font-bold leading-5 text-slate-800">
                      {recipe.name}
                    </span>

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