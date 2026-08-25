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

type MealPeople = {
  [day: string]: {
    [meal: string]: number | undefined;
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

function createEmptyMealPeople(): MealPeople {
  const initial: MealPeople = {};

  days.forEach((day) => {
    initial[day] = {};
  });

  return initial;
}

function getHouseholdPeople(): number {
  try {
    const shoppingData =
      localStorage.getItem("shopping-data");

    if (shoppingData) {
      const parsed = JSON.parse(shoppingData);

      if (
        typeof parsed.people === "number" &&
        parsed.people > 0
      ) {
        return parsed.people;
      }
    }
  } catch {
    // Use the default below.
  }

  return 1;
}

function getPlannerCounts(
  planner: PlannerMeals,
  mealPeople: MealPeople
): Record<string, number> {
  const counts: Record<string, number> = {};
  const householdPeople = getHouseholdPeople();

  days.forEach((day) => {
    mealTypes.forEach((meal) => {
      const recipeId = planner[day]?.[meal];

      if (!recipeId) return;

      const people =
        mealPeople[day]?.[meal] ??
        householdPeople;

      counts[recipeId] =
        (counts[recipeId] ?? 0) + people;
    });
  });

  return counts;
}

function syncPlannerWithShoppingList(
  planner: PlannerMeals,
  mealPeople: MealPeople
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
    getPlannerCounts(
      planner,
      mealPeople
    );

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

  const [mealPeople, setMealPeople] =
    useState<MealPeople | null>(null);

  const [peoplePicker, setPeoplePicker] =
    useState<{
      day: string;
      meal: string;
    } | null>(null);

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

    const defaultMealPeople =
      createEmptyMealPeople();

    const saved =
      localStorage.getItem(
        "weekly-planner"
      );

    if (!saved) {
      setPlannerMeals(emptyPlanner);
      setMealPeople(createEmptyMealPeople());
      return;
    }

    try {
      const savedPlanner =
        JSON.parse(saved);

      const loadedPlanner: PlannerMeals = {
        ...emptyPlanner,
        ...savedPlanner,
      };

      const loadedMealPeople: MealPeople = {
        ...createEmptyMealPeople(),
      };

      const savedMealPeople =
        savedPlanner.mealPeople ?? null;

      days.forEach((day) => {
        loadedMealPeople[day] = {
          ...defaultMealPeople[day],
          ...(savedMealPeople?.[day] ?? {}),
        };
      });

      /*
       * Migration: older versions of this feature could save every meal
       * as 1 person. If the Shopping List household size is larger and
       * the saved meal settings are all still 1, treat those as defaults
       * rather than genuine per-meal overrides.
       */
      const householdPeople = getHouseholdPeople();

      if (
        householdPeople > 1 &&
        savedMealPeople
      ) {
        const savedValues = days.flatMap((day) =>
          mealTypes.map(
            (meal) =>
              savedMealPeople?.[day]?.[meal]
          )
        );

        const definedSavedValues =
          savedValues.filter(
            (value): value is number =>
              typeof value === "number"
          );

        const allDefinedSavedValuesAreOne =
          definedSavedValues.length > 0 &&
          definedSavedValues.every(
            (value) => value === 1
          );

        if (allDefinedSavedValuesAreOne) {
          days.forEach((day) => {
            mealTypes.forEach((meal) => {
              loadedMealPeople[day][meal] =
                householdPeople;
            });
          });
        }
      }

      setPlannerMeals(loadedPlanner);
      setMealPeople(loadedMealPeople);

      syncPlannerWithShoppingList(
        loadedPlanner,
        loadedMealPeople
      );
    } catch {
      setPlannerMeals(emptyPlanner);
      setMealPeople(createEmptyMealPeople());
    }
  }, []);

  useEffect(() => {
    if (
      plannerMeals === null ||
      mealPeople === null
    ) {
      return;
    }

    localStorage.setItem(
      "weekly-planner",
      JSON.stringify({
        ...plannerMeals,
        mealPeople,
      })
    );

    syncPlannerWithShoppingList(
      plannerMeals,
      mealPeople
    );

    window.dispatchEvent(
      new Event("weekly-planner-updated")
    );
  }, [plannerMeals, mealPeople]);

  function getPeopleForMeal(
    day: string,
    meal: string
  ) {
    return (
      mealPeople?.[day]?.[meal] ??
      getHouseholdPeople()
    );
  }

  function setPeopleForMeal(
    day: string,
    meal: string,
    people: number
  ) {
    setMealPeople((current) => {
      if (!current) return current;

      return {
        ...current,
        [day]: {
          ...current[day],
          [meal]: Math.max(
            1,
            Math.min(8, people)
          ),
        },
      };
    });
  }

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

    // Removing a meal must also remove its previous
    // people override. The next meal added to this slot
    // will then default to the current Shopping List
    // household size.
    setMealPeople((current) => {
      if (!current) return current;

      const updatedDay = {
        ...current[day],
      };

      delete updatedDay[meal];

      return {
        ...current,
        [day]: updatedDay,
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
    if (
    plannerMeals === null ||
    mealPeople === null
  ) {
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

    setMealPeople(
      createEmptyMealPeople()
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

    window.location.href = `/recipes?meal=${encodeURIComponent(
      picker.meal
    )}`;
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

  type NutritionView =
    | "Calories"
    | "Protein"
    | "Sodium"
    | "Potassium"
    | "Phosphate"
    | "Purines";

  const [nutritionView, setNutritionView] =
    useState<NutritionView>("Potassium");

  function getNutritionNumber(
    value: string
  ) {
    const match = value.match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  function getDayMealRecipes(day: string) {
    return {
      Breakfast: getRecipe(
        plannerMeals?.[day]?.Breakfast ?? null
      ),
      Lunch: getRecipe(
        plannerMeals?.[day]?.Lunch ?? null
      ),
      Dinner: getRecipe(
        plannerMeals?.[day]?.Dinner ?? null
      ),
    };
  }

  function getDailyNutritionTotal(
    day: string,
    field: "calories" | "protein"
  ) {
    const meals = getDayMealRecipes(day);
    const values = mealTypes
      .map((meal) => meals[meal as keyof typeof meals])
      .filter(Boolean)
      .map((recipe) =>
        getNutritionNumber(
          field === "calories"
            ? recipe!.calories
            : recipe!.protein
        )
      );

    if (values.length === 0) {
      return null;
    }

    return values.reduce(
      (total, value) => total + value,
      0
    );
  }

  function getSodiumRating(sodium: string) {
    const value = getNutritionNumber(sodium);

    if (value <= 500) {
      return "Low";
    }

    if (value <= 767) {
      return "Moderate";
    }

    return "High";
  }

  function getMealNutritionRating(
    day: string,
    meal: string
  ) {
    const recipe = getRecipe(
      plannerMeals?.[day]?.[meal] ?? null
    );

    if (!recipe) {
      return "Empty";
    }

    if (
      nutritionView !== "Sodium" &&
      nutritionView !== "Potassium" &&
      nutritionView !== "Phosphate" &&
      nutritionView !== "Purines"
    ) {
      return "Empty";
    }

    if (nutritionView === "Sodium") {
      return getSodiumRating(
        recipe.nutrition.sodium
      );
    }

    if (nutritionView === "Potassium") {
      return recipe.potassium;
    }

    if (nutritionView === "Phosphate") {
      return recipe.phosphate;
    }

    return recipe.purines;
  }

  function getNutritionSegmentClass(
    rating: string
  ) {
    if (rating === "Low") {
      return "#4ade80";
    }

    if (rating === "Moderate") {
      return "#fbbf24";
    }

    if (rating === "High") {
      return "#f87171";
    }

    return "#e2e8f0";
  }

  function Tricirculus({
    day,
    desktop = false,
  }: {
    day: string;
    desktop?: boolean;
  }) {
    if (
      nutritionView === "Calories" ||
      nutritionView === "Protein"
    ) {
      const total = getDailyNutritionTotal(
        day,
        nutritionView === "Calories"
          ? "calories"
          : "protein"
      );

      if (total === null) {
        return (
          <span className="text-sm font-bold text-slate-300">
            —
          </span>
        );
      }

      if (!desktop) {
        return (
          <span className="text-sm font-extrabold text-slate-800">
            {total.toLocaleString()}
            {nutritionView === "Calories"
              ? " kcal"
              : " g"}
          </span>
        );
      }

      return (
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-[5px] border-slate-200 bg-white shadow-sm">
            <div className="text-center leading-tight">
              <div className="text-[11px] font-extrabold text-slate-800">
                {total.toLocaleString()}
              </div>

              <div className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
                {nutritionView === "Calories"
                  ? "kcal"
                  : "protein"}
              </div>
            </div>
          </div>
        </div>
      );
    }

    const breakfast = getMealNutritionRating(
      day,
      "Breakfast"
    );

    const lunch = getMealNutritionRating(
      day,
      "Lunch"
    );

    const dinner = getMealNutritionRating(
      day,
      "Dinner"
    );

    const breakfastColour =
      getNutritionSegmentClass(breakfast);

    const lunchColour =
      getNutritionSegmentClass(lunch);

    const dinnerColour =
      getNutritionSegmentClass(dinner);

    if (!desktop) {
      return (
        <span
          className="h-11 w-11 shrink-0 rounded-full shadow-sm ring-1 ring-slate-200/90"
          style={{
            background: `conic-gradient(from -90deg, ${breakfastColour} 0deg 118deg, #ffffff 118deg 122deg, ${lunchColour} 122deg 238deg, #ffffff 238deg 242deg, ${dinnerColour} 242deg 358deg, #ffffff 358deg 360deg)`,
          }}
          aria-label={`${day} ${nutritionView}: breakfast ${breakfast.toLowerCase()}, lunch ${lunch.toLowerCase()}, dinner ${dinner.toLowerCase()}`}
          title={`${day} ${nutritionView}: breakfast ${breakfast.toLowerCase()}, lunch ${lunch.toLowerCase()}, dinner ${dinner.toLowerCase()}`}
        />
      );
    }

    const ratings = [
      breakfast,
      lunch,
      dinner,
    ].filter(
      (rating) => rating !== "Empty"
    );

    let overallStatus = "No meals";

    if (ratings.includes("High")) {
      overallStatus = "High";
    } else if (ratings.includes("Moderate")) {
      overallStatus = "Moderate";
    } else if (ratings.includes("Low")) {
      overallStatus = "Low";
    }

    const statusColour =
      overallStatus === "High"
        ? "#ef4444"
        : overallStatus === "Moderate"
          ? "#f59e0b"
          : overallStatus === "Low"
            ? "#16a34a"
            : "#94a3b8";

    const mealCount = ratings.length;

    function getBadgeClass(rating: string) {
      if (rating === "High") {
        return "bg-red-500 text-white";
      }

      if (rating === "Moderate") {
        return "bg-amber-400 text-white";
      }

      if (rating === "Low") {
        return "bg-green-500 text-white";
      }

      return "bg-slate-200 text-slate-400";
    }

    function getShortRating(rating: string) {
      if (rating === "Moderate") {
        return "Mod";
      }

      if (rating === "Empty") {
        return "—";
      }

      return rating;
    }

    return (
      <div
        className="flex flex-col items-center justify-center"
        aria-label={`${day} ${nutritionView}: breakfast ${breakfast.toLowerCase()}, lunch ${lunch.toLowerCase()}, dinner ${dinner.toLowerCase()}`}
        title={`${day} ${nutritionView}: breakfast ${breakfast.toLowerCase()}, lunch ${lunch.toLowerCase()}, dinner ${dinner.toLowerCase()}`}
      >
        <div
          className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full shadow-sm"
          style={{
            background: `conic-gradient(from -90deg, ${breakfastColour} 0deg 116deg, #ffffff 116deg 122deg, ${lunchColour} 122deg 238deg, #ffffff 238deg 244deg, ${dinnerColour} 244deg 358deg, #ffffff 358deg 360deg)`,
          }}
        >
          <div className="flex h-[54px] w-[54px] flex-col items-center justify-center rounded-full bg-white shadow-inner">
            <span
              className="text-[10px] font-extrabold uppercase tracking-wide"
              style={{ color: statusColour }}
            >
              {overallStatus}
            </span>

            <span className="mt-0.5 text-[9px] font-bold text-slate-500">
              {mealCount} {mealCount === 1 ? "meal" : "meals"}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-start justify-center gap-2">
          <div className="flex flex-col items-center">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-extrabold shadow-sm ${getBadgeClass(
                breakfast
              )}`}
            >
              B
            </span>

            <span className="mt-1 text-[8px] font-semibold text-slate-400">
              {getShortRating(breakfast)}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-extrabold shadow-sm ${getBadgeClass(
                lunch
              )}`}
            >
              L
            </span>

            <span className="mt-1 text-[8px] font-semibold text-slate-400">
              {getShortRating(lunch)}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-extrabold shadow-sm ${getBadgeClass(
                dinner
              )}`}
            >
              D
            </span>

            <span className="mt-1 text-[8px] font-semibold text-slate-400">
              {getShortRating(dinner)}
            </span>
          </div>
        </div>
      </div>
    );
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

      <div className="mx-auto max-w-7xl md:max-w-[1280px]">

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

                    <button
                      type="button"
                      onClick={() =>
                        setPeoplePicker({
                          day: selectedDay,
                          meal: "Breakfast",
                        })
                      }
                      className="shrink-0 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold leading-none text-white shadow-sm"
                    >
                      {getPeopleForMeal(
                        selectedDay,
                        "Breakfast"
                      )} {getPeopleForMeal(
                        selectedDay,
                        "Breakfast"
                      ) === 1 ? "person" : "people"}
                    </button>

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

                      <Link
                        href={`/recipes/${mobileBreakfast.id}`}
                        className="shrink-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        aria-label={`View ${mobileBreakfast.name} recipe`}
                      >
                        <img
                          src={mobileBreakfast.image}
                          alt={mobileBreakfast.name}
                          className="h-20 w-20 rounded-xl object-cover shadow-sm"
                        />
                      </Link>

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

                    <button
                      type="button"
                      onClick={() =>
                        setPeoplePicker({
                          day: selectedDay,
                          meal: "Lunch",
                        })
                      }
                      className="shrink-0 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold leading-none text-white shadow-sm"
                    >
                      {getPeopleForMeal(
                        selectedDay,
                        "Lunch"
                      )} {getPeopleForMeal(
                        selectedDay,
                        "Lunch"
                      ) === 1 ? "person" : "people"}
                    </button>

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

                      <Link
                        href={`/recipes/${mobileLunch.id}`}
                        className="shrink-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        aria-label={`View ${mobileLunch.name} recipe`}
                      >
                        <img
                          src={mobileLunch.image}
                          alt={mobileLunch.name}
                          className="h-20 w-20 rounded-xl object-cover shadow-sm"
                        />
                      </Link>

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

                    <button
                      type="button"
                      onClick={() =>
                        setPeoplePicker({
                          day: selectedDay,
                          meal: "Dinner",
                        })
                      }
                      className="shrink-0 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold leading-none text-white shadow-sm"
                    >
                      {getPeopleForMeal(
                        selectedDay,
                        "Dinner"
                      )} {getPeopleForMeal(
                        selectedDay,
                        "Dinner"
                      ) === 1 ? "person" : "people"}
                    </button>

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

                      <Link
                        href={`/recipes/${mobileDinner.id}`}
                        className="shrink-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        aria-label={`View ${mobileDinner.name} recipe`}
                      >
                        <img
                          src={mobileDinner.image}
                          alt={mobileDinner.name}
                          className="h-20 w-20 rounded-xl object-cover shadow-sm"
                        />
                      </Link>

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

          {/* MOBILE DAILY NUTRITION */}

          <section className="mt-3 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">

            <div className="flex items-center justify-between gap-4 border-t border-slate-100 px-4 py-3">

              <div className="min-w-0">

                <h2 className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                  Daily Nutrition
                </h2>

                <select
                  value={nutritionView}
                  onChange={(event) =>
                    setNutritionView(
                      event.target.value as NutritionView
                    )
                  }
                  className="mt-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  aria-label="Choose daily nutrition"
                >
                  <option value="Calories">
                    Calories
                  </option>
                  <option value="Protein">
                    Protein
                  </option>
                  <option value="Sodium">
                    Sodium
                  </option>
                  <option value="Potassium">
                    Potassium
                  </option>
                  <option value="Phosphate">
                    Phosphate
                  </option>
                  <option value="Purines">
                    Purines
                  </option>
                </select>

              </div>

              <div className="flex shrink-0 items-center justify-center pr-1">
                <Tricirculus day={selectedDay} />
              </div>

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
                  className="flex items-center justify-center border-l border-slate-100 bg-orange-50/30 py-2.5"
                >

                  <span className="text-base font-extrabold tracking-tight text-orange-600">
                    {day.slice(0, 3)}
                  </span>

                </div>

              ))}

            </div>

            {/* BREAKFAST ROW */}

            <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] border-b border-slate-100">

              <div className="flex items-start bg-gradient-to-b from-orange-50 to-amber-50 px-3 py-3">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    🥣
                  </div>

                  <h2 className="mt-2 text-[15px] font-extrabold tracking-tight text-slate-900">
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
                    className={`border-l border-slate-100 p-1.5 md:p-2 ${
                      recipe
                        ? "bg-orange-50/35"
                        : "bg-white"
                    }`}
                  >

                    {recipe ? (

                      <div className="relative flex h-[176px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 shadow-sm ring-1 ring-orange-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

                        <div className="relative flex justify-center pt-2">

                          <Link
                            href={`/recipes/${recipe.id}`}
                            className="rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            aria-label={`View ${recipe.name} recipe`}
                          >
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="h-[76px] w-[76px] rounded-xl object-cover shadow-sm"
                            />
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              removeRecipe(
                                day,
                                "Breakfast"
                              )
                            }
                            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-xs font-medium leading-none text-slate-400 shadow-sm ring-1 ring-black/5 transition hover:bg-white hover:text-red-600"
                            aria-label={`Remove ${recipe.name}`}
                            title={`Remove ${recipe.name}`}
                          >
                            ×
                          </button>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setPeoplePicker({
                              day,
                              meal: "Breakfast",
                            })
                          }
                          className="mx-auto mt-1 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold leading-none text-white shadow-sm"
                        >
                          {getPeopleForMeal(
                            day,
                            "Breakfast"
                          )} {getPeopleForMeal(
                            day,
                            "Breakfast"
                          ) === 1 ? "person" : "people"}
                        </button>


                        <div className="flex flex-1 items-center justify-center px-2 pb-2 pt-1 text-center">

                          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-900">
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
                        className="group flex min-h-[136px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-gradient-to-br from-white to-orange-50/40 px-3 text-center transition duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50/70 hover:shadow-sm"
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

              <div className="flex items-start bg-gradient-to-b from-orange-50 to-amber-50 px-3 py-3">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    🥪
                  </div>

                  <h2 className="mt-2 text-[15px] font-extrabold tracking-tight text-slate-900">
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
                    className={`border-l border-slate-100 p-1.5 md:p-2 ${
                      recipe
                        ? "bg-orange-50/35"
                        : "bg-white"
                    }`}
                  >

                    {recipe ? (

                      <div className="relative flex h-[176px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 shadow-sm ring-1 ring-orange-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

                        <div className="relative flex justify-center pt-2">

                          <Link
                            href={`/recipes/${recipe.id}`}
                            className="rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            aria-label={`View ${recipe.name} recipe`}
                          >
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="h-[76px] w-[76px] rounded-xl object-cover shadow-sm"
                            />
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              removeRecipe(
                                day,
                                "Lunch"
                              )
                            }
                            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-xs font-medium leading-none text-slate-400 shadow-sm ring-1 ring-black/5 transition hover:bg-white hover:text-red-600"
                            aria-label={`Remove ${recipe.name}`}
                            title={`Remove ${recipe.name}`}
                          >
                            ×
                          </button>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setPeoplePicker({
                              day,
                              meal: "Lunch",
                            })
                          }
                          className="mx-auto mt-1 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold leading-none text-white shadow-sm"
                        >
                          {getPeopleForMeal(
                            day,
                            "Lunch"
                          )} {getPeopleForMeal(
                            day,
                            "Lunch"
                          ) === 1 ? "person" : "people"}
                        </button>

                        <div className="flex flex-1 items-center justify-center px-2 pb-2 pt-1 text-center">

                          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-900">
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
                        className="group flex min-h-[136px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-gradient-to-br from-white to-orange-50/40 px-3 text-center transition duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50/70 hover:shadow-sm"
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

              <div className="flex items-start bg-gradient-to-b from-orange-50 to-amber-50 px-3 py-3">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    🍽️
                  </div>

                  <h2 className="mt-2 text-[15px] font-extrabold tracking-tight text-slate-900">
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
                    className={`border-l border-slate-100 p-1.5 md:p-2 ${
                      recipe
                        ? "bg-orange-50/35"
                        : "bg-white"
                    }`}
                  >

                    {recipe ? (

                      <div className="relative flex h-[176px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 shadow-sm ring-1 ring-orange-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

                        <div className="relative flex justify-center pt-2">

                          <Link
                            href={`/recipes/${recipe.id}`}
                            className="rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            aria-label={`View ${recipe.name} recipe`}
                          >
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="h-[76px] w-[76px] rounded-xl object-cover shadow-sm"
                            />
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              removeRecipe(
                                day,
                                "Dinner"
                              )
                            }
                            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-xs font-medium leading-none text-slate-400 shadow-sm ring-1 ring-black/5 transition hover:bg-white hover:text-red-600"
                            aria-label={`Remove ${recipe.name}`}
                            title={`Remove ${recipe.name}`}
                          >
                            ×
                          </button>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setPeoplePicker({
                              day,
                              meal: "Dinner",
                            })
                          }
                          className="mx-auto mt-1 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold leading-none text-white shadow-sm"
                        >
                          {getPeopleForMeal(
                            day,
                            "Dinner"
                          )} {getPeopleForMeal(
                            day,
                            "Dinner"
                          ) === 1 ? "person" : "people"}
                        </button>

                        <div className="flex flex-1 items-center justify-center px-2 pb-2 pt-1 text-center">

                          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-900">
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
                        className="group flex min-h-[136px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-gradient-to-br from-white to-orange-50/40 px-3 text-center transition duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50/70 hover:shadow-sm"
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

            {/* DAILY NUTRITION ROW */}

            <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] border-t border-slate-100 bg-slate-50/30">

              <div className="flex items-center justify-center border-r border-slate-100 bg-slate-50/70 px-2 py-3">

                <div className="flex flex-col items-center gap-1.5">

                  <h2 className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Daily Nutrition
                  </h2>

                  <select
                    value={nutritionView}
                    onChange={(event) =>
                      setNutritionView(
                        event.target.value as NutritionView
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-bold text-slate-700 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    aria-label="Choose daily nutrition"
                  >
                    <option value="Calories">
                      Calories
                    </option>
                    <option value="Protein">
                      Protein
                    </option>
                    <option value="Sodium">
                      Sodium
                    </option>
                    <option value="Potassium">
                      Potassium
                    </option>
                    <option value="Phosphate">
                      Phosphate
                    </option>
                    <option value="Purines">
                      Purines
                    </option>
                  </select>

                  <div className="mt-2 flex flex-col gap-1 text-[9px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Low
                    </span>

                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      Moderate
                    </span>

                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      High
                    </span>
                  </div>

                </div>

              </div>

              {days.map((day) => (

                <div
                  key={`nutrition-${day}-${nutritionView}`}
                  className="flex min-h-[118px] items-center justify-center border-l border-slate-100 px-1 py-3"
                >
                  <Tricirculus
                    day={day}
                    desktop
                  />
                </div>

              ))}

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
                  Go to Shopping List!
                </h2>

                <p className="mt-0.5 text-xs leading-5 text-slate-600 md:text-sm">
                  Meals you select appear automatically in the Shopping List.
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

      {/* PEOPLE PICKER */}

      {peoplePicker && (

        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-xs rounded-3xl bg-white p-6 shadow-2xl">

            <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
              {peoplePicker.meal}
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              How many people?
            </h2>

            <div className="mt-5 flex items-center justify-center gap-5">

              <button
                type="button"
                onClick={() =>
                  setPeopleForMeal(
                    peoplePicker.day,
                    peoplePicker.meal,
                    getPeopleForMeal(
                      peoplePicker.day,
                      peoplePicker.meal
                    ) - 1
                  )
                }
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-700 hover:bg-slate-200"
                aria-label="Decrease people"
              >
                −
              </button>

              <div className="min-w-[90px] text-center">

                <div className="text-3xl font-extrabold text-slate-900">
                  {getPeopleForMeal(
                    peoplePicker.day,
                    peoplePicker.meal
                  )}
                </div>

                <div className="text-sm text-slate-500">
                  {getPeopleForMeal(
                    peoplePicker.day,
                    peoplePicker.meal
                  ) === 1
                    ? "person"
                    : "people"}
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setPeopleForMeal(
                    peoplePicker.day,
                    peoplePicker.meal,
                    getPeopleForMeal(
                      peoplePicker.day,
                      peoplePicker.meal
                    ) + 1
                  )
                }
                className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-700 hover:bg-orange-200"
                aria-label="Increase people"
              >
                +
              </button>

            </div>

            <button
              type="button"
              onClick={() => setPeoplePicker(null)}
              className="mt-6 w-full rounded-2xl bg-orange-500 px-4 py-3 font-bold text-white hover:bg-orange-600"
            >
              Done
            </button>

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