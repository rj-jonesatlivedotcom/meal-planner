"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { recipes, type Recipe } from "@/data/recipes";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const mealTypes = ["Breakfast", "Lunch", "Dinner"] as const;

function MealIcon({
  type,
}: {
  type: "Breakfast" | "Lunch" | "Dinner" | "Nutrition";
}) {
  const common =
    "h-5 w-5 stroke-current stroke-[1.8]";

  if (type === "Breakfast") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M4 11h16" />
        <path d="M5 11a7 7 0 0 1 14 0" />
        <path d="M3 14h18" />
        <path d="M6 17h12" />
        <path d="M8 20h8" />
      </svg>
    );
  }

  if (type === "Lunch") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M4 8h16" />
        <path d="M5 8h14l-1 10H6L5 8Z" />
        <path d="M8 5h8" />
        <path d="M8 12h8" />
      </svg>
    );
  }

  if (type === "Dinner") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <circle cx="12" cy="13" r="7" />
        <path d="M5 6v5" />
        <path d="M3.5 6v5" />
        <path d="M6.5 6v5" />
        <path d="M5 11v7" />
        <path d="M19 6v12" />
        <path d="M19 6c-2 1.5-2 4 0 5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="M5.5 5.5l13 13" />
      <path d="M18.5 5.5l-13 13" />
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  );
}

type Day = (typeof days)[number];
type Meal = (typeof mealTypes)[number];

type PlannerMeals = Record<
  string,
  Record<string, string | null>
>;

type RequirementLevel = "Any" | "Low" | "Moderate";

type Requirements = {
  sodiumLimit: number | null;
  potassium: RequirementLevel;
  phosphate: RequirementLevel;
  purines: RequirementLevel;
  carbohydrateMin?: number | null;
  carbohydrateMax?: number | null;
};

type NutrientKey =
  | "calories"
  | "protein"
  | "carbohydrates"
  | "fat"
  | "fibre"
  | "sodium";

type NutrientTotals = Record<NutrientKey, number>;

type Status = "green" | "amber" | "red";

const REQUIREMENTS_STORAGE_KEY = "meal-planner-requirements";

const defaultRequirements: Requirements = {
  sodiumLimit: 1500,
  potassium: "Any",
  phosphate: "Any",
  purines: "Any",
  carbohydrateMin: null,
  carbohydrateMax: null,
};

const emptyTotals = (): NutrientTotals => ({
  calories: 0,
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  fibre: 0,
  sodium: 0,
});

const levelRank: Record<"Low" | "Moderate" | "High", number> = {
  Low: 1,
  Moderate: 2,
  High: 3,
};

function getNutritionNumber(value: string | undefined): number {
  if (!value) return 0;

  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function getRecipe(
  plannerMeals: PlannerMeals,
  day: Day,
  meal: Meal
): Recipe | null {
  const recipeId = plannerMeals?.[day]?.[meal] ?? null;

  if (!recipeId) return null;

  return recipes.find((recipe) => recipe.id === recipeId) ?? null;
}

function getDayTotals(
  plannerMeals: PlannerMeals,
  day: Day
): NutrientTotals {
  const totals = emptyTotals();

  mealTypes.forEach((meal) => {
    const recipe = getRecipe(plannerMeals, day, meal);

    if (!recipe) return;

    totals.calories += getNutritionNumber(recipe.nutrition.calories);
    totals.protein += getNutritionNumber(recipe.nutrition.protein);
    totals.carbohydrates += getNutritionNumber(
      recipe.nutrition.carbohydrates
    );
    totals.fat += getNutritionNumber(recipe.nutrition.fat);
    totals.fibre += getNutritionNumber(recipe.nutrition.fibre);
    totals.sodium += getNutritionNumber(recipe.nutrition.sodium);
  });

  return totals;
}

function getMealTotals(recipe: Recipe | null): NutrientTotals {
  const totals = emptyTotals();

  if (!recipe) return totals;

  totals.calories = getNutritionNumber(recipe.nutrition.calories);
  totals.protein = getNutritionNumber(recipe.nutrition.protein);
  totals.carbohydrates = getNutritionNumber(
    recipe.nutrition.carbohydrates
  );
  totals.fat = getNutritionNumber(recipe.nutrition.fat);
  totals.fibre = getNutritionNumber(recipe.nutrition.fibre);
  totals.sodium = getNutritionNumber(recipe.nutrition.sodium);

  return totals;
}

function addTotals(
  target: NutrientTotals,
  source: NutrientTotals
) {
  (Object.keys(target) as NutrientKey[]).forEach((key) => {
    target[key] += source[key];
  });
}

function worstStatus(statuses: Status[]): Status {
  if (statuses.includes("red")) return "red";
  if (statuses.includes("amber")) return "amber";
  return "green";
}

function levelStatus(
  recipeLevel: "Low" | "Moderate" | "High",
  requirement: RequirementLevel
): Status {
  if (requirement === "Any") return "green";

  const recipeRank = levelRank[recipeLevel];
  const requirementRank = levelRank[requirement];

  if (recipeRank <= requirementRank) return "green";
  if (recipeRank === requirementRank + 1) return "amber";
  return "red";
}

function getMealStatus(
  recipe: Recipe | null,
  requirements: Requirements
): Status {
  if (!recipe) return "green";

  return worstStatus([
    levelStatus(recipe.potassium, requirements.potassium),
    levelStatus(recipe.phosphate, requirements.phosphate),
    levelStatus(recipe.purines, requirements.purines),
  ]);
}

function getDailyStatus(
  totals: NutrientTotals,
  recipesForDay: Recipe[],
  requirements: Requirements
): Status {
  const statuses: Status[] = [];

  if (
    requirements.sodiumLimit !== null &&
    requirements.sodiumLimit !== undefined
  ) {
    const ratio = totals.sodium / requirements.sodiumLimit;

    if (ratio > 1) {
      statuses.push("red");
    } else if (ratio > 0.75) {
      statuses.push("amber");
    } else {
      statuses.push("green");
    }
  }

  if (
    requirements.carbohydrateMin !== null &&
    requirements.carbohydrateMin !== undefined
  ) {
    if (totals.carbohydrates < requirements.carbohydrateMin * 0.95) {
      statuses.push("red");
    } else if (totals.carbohydrates < requirements.carbohydrateMin) {
      statuses.push("amber");
    } else {
      statuses.push("green");
    }
  }

  if (
    requirements.carbohydrateMax !== null &&
    requirements.carbohydrateMax !== undefined
  ) {
    if (totals.carbohydrates > requirements.carbohydrateMax * 1.05) {
      statuses.push("red");
    } else if (totals.carbohydrates > requirements.carbohydrateMax) {
      statuses.push("amber");
    } else {
      statuses.push("green");
    }
  }

  recipesForDay.forEach((recipe) => {
    statuses.push(
      levelStatus(recipe.potassium, requirements.potassium),
      levelStatus(recipe.phosphate, requirements.phosphate),
      levelStatus(recipe.purines, requirements.purines)
    );
  });

  return statuses.length ? worstStatus(statuses) : "green";
}

function getStatusText(status: Status): string {
  if (status === "green") return "Within target";
  if (status === "amber") return "Approaching limit";
  return "Outside target";
}

function getStatusDotClass(status: Status): string {
  if (status === "green") return "bg-green-600";
  if (status === "amber") return "bg-amber-400";
  return "bg-red-500";
}

function getLevelDotStatus(
  level: "Low" | "Moderate" | "High", _requirement?: RequirementLevel
): Status {
  if (level === "Low") return "green";
  if (level === "Moderate") return "amber";
  return "red";
}

function getMatrixLevelText(
  level: "Low" | "Moderate" | "High"
): string {
  return level === "Moderate" ? "Mod" : level;
}

function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("en-GB");
}

function formatNutrient(
  value: number,
  unit: "kcal" | "g" | "mg"
): string {
  return `${formatNumber(value)} ${unit}`;
}

function formatRange(
  min: number | null | undefined,
  max: number | null | undefined,
  unit: string
): string {
  if (min !== null && min !== undefined && max !== null && max !== undefined) {
    return `${formatNumber(min)}–${formatNumber(max)} ${unit}`;
  }

  if (min !== null && min !== undefined) {
    return `≥ ${formatNumber(min)} ${unit}`;
  }

  if (max !== null && max !== undefined) {
    return `≤ ${formatNumber(max)} ${unit}`;
  }

  return "—";
}

function requirementLevelText(
  level: RequirementLevel
): string {
  if (level === "Any") return "Any level";
  return `${level} preferred`;
}

function averageRecipeLevel(
  dayRecipes: Recipe[],
  key: "potassium" | "phosphate" | "purines"
): "Low" | "Moderate" | "High" | null {
  if (!dayRecipes.length) return null;

  const totalPoints = dayRecipes.reduce(
    (total, recipe) => total + levelRank[recipe[key]],
    0
  );

  const averagePoints = Math.round(totalPoints / dayRecipes.length);

  if (averagePoints <= 1) return "Low";
  if (averagePoints === 2) return "Moderate";
  return "High";
}

export default function NutritionPage() {
  const [plannerMeals, setPlannerMeals] =
    useState<PlannerMeals | null>(null);
  const [requirements, setRequirements] =
    useState<Requirements>(defaultRequirements);
  const [selectedDay, setSelectedDay] =
    useState<Day>("Monday");

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  function handleNutritionTouchStart(
    event: React.TouchEvent<HTMLElement>
  ) {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }

  function handleNutritionTouchEnd(
    event: React.TouchEvent<HTMLElement>
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

  function loadPlanner() {
    try {
      const saved = window.localStorage.getItem(
        "weekly-planner"
      );

      if (!saved) {
        setPlannerMeals(null);
        return;
      }

      const parsed = JSON.parse(saved);

      setPlannerMeals(parsed);
    } catch {
      setPlannerMeals(null);
    }
  }

  function loadRequirements() {
    try {
      const saved = window.localStorage.getItem(
        REQUIREMENTS_STORAGE_KEY
      );

      if (!saved) {
        setRequirements(defaultRequirements);
        return;
      }

      setRequirements({
        ...defaultRequirements,
        ...JSON.parse(saved),
      });
    } catch {
      setRequirements(defaultRequirements);
    }
  }

  useEffect(() => {
    loadPlanner();
    loadRequirements();

    function handlePlannerUpdate() {
      loadPlanner();
    }

    function handleRequirementsUpdate() {
      loadRequirements();
    }

    window.addEventListener(
      "weekly-planner-updated",
      handlePlannerUpdate
    );

    window.addEventListener(
      "meal-planner-requirements-updated",
      handleRequirementsUpdate
    );

    window.addEventListener("storage", handlePlannerUpdate);
    window.addEventListener("storage", handleRequirementsUpdate);

    return () => {
      window.removeEventListener(
        "weekly-planner-updated",
        handlePlannerUpdate
      );

      window.removeEventListener(
        "meal-planner-requirements-updated",
        handleRequirementsUpdate
      );

      window.removeEventListener("storage", handlePlannerUpdate);
      window.removeEventListener(
        "storage",
        handleRequirementsUpdate
      );
    };
  }, []);

  const dayTotals = useMemo(() => {
    const totals = {} as Record<Day, NutrientTotals>;

    days.forEach((day) => {
      totals[day] = getDayTotals(
        plannerMeals ?? {},
        day
      );
    });

    return totals;
  }, [plannerMeals]);

  const weeklyTotals = useMemo(() => {
    const totals = emptyTotals();

    days.forEach((day) => {
      addTotals(totals, dayTotals[day]);
    });

    return totals;
  }, [dayTotals]);

  const dailyAverage = useMemo(() => {
    const totals = emptyTotals();

    (Object.keys(totals) as NutrientKey[]).forEach(
      (key) => {
        totals[key] = weeklyTotals[key] / 7;
      }
    );

    return totals;
  }, [weeklyTotals]);

  const allPlannedRecipes = useMemo(() => {
    const result: Recipe[] = [];

    days.forEach((day) => {
      mealTypes.forEach((meal) => {
        const recipe = getRecipe(
          plannerMeals ?? {},
          day,
          meal
        );

        if (recipe) result.push(recipe);
      });
    });

    return result;
  }, [plannerMeals]);

  const weeklyLevels = useMemo(
    () => ({
      potassium: averageRecipeLevel(
        allPlannedRecipes,
        "potassium"
      ),
      phosphate: averageRecipeLevel(
        allPlannedRecipes,
        "phosphate"
      ),
      purines: averageRecipeLevel(
        allPlannedRecipes,
        "purines"
      ),
    }),
    [allPlannedRecipes]
  );

  function getDailyStatusForDay(day: Day): Status {
    const recipesForDay = mealTypes
      .map((meal) =>
        getRecipe(plannerMeals ?? {}, day, meal)
      )
      .filter((recipe): recipe is Recipe => Boolean(recipe));

    return getDailyStatus(
      dayTotals[day],
      recipesForDay,
      requirements
    );
  }

  if (plannerMeals === null) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-2xl">
                🥗
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Nutrition
                </h1>
                <p className="mt-2 text-slate-600">
                  Your weekly nutrition summary will appear here
                  once you have planned some meals.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-slate-700">
              Go to the Weekly Planner to add breakfasts,
              lunches and dinners.
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          body > header {
            display: none !important;
          }

          .nutrition-print-hidden {
            display: none !important;
          }

          .nutrition-print-page {
            max-width: none !important;
            padding: 0 !important;
          }

          .nutrition-print-page > * {
            display: none !important;
          }

          .nutrition-print-page > .nutrition-print-summary {
            display: block !important;
          }

          .nutrition-print-card {
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
          }

          @page {
            margin: 12mm;
          }

          .nutrition-print-summary {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            margin: 0 !important;
          }

          .nutrition-print-summary > .grid {
            display: block !important;
          }

          .nutrition-print-summary > .grid > div:first-child {
            width: 100% !important;
          }

          .nutrition-print-summary table {
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
          }

          .nutrition-print-summary aside {
            margin-top: 16px !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-5 md:px-6 md:py-6">
        <div className="nutrition-print-page mx-auto max-w-7xl md:max-w-[1400px]">
          <div className="nutrition-print-hidden mb-4 md:hidden">
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
                        ? "bg-pink-600 text-white shadow-sm"
                        : "bg-white text-slate-600 ring-1 ring-black/5 hover:bg-pink-50 hover:text-pink-700"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE NUTRITION */}
          <section
            className="nutrition-print-card mb-7 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 md:hidden"
            onTouchStart={handleNutritionTouchStart}
            onTouchEnd={handleNutritionTouchEnd}
          >
            <div className="space-y-3">
              {mealTypes.map((meal) => {
                const recipe = getRecipe(
                  plannerMeals,
                  selectedDay,
                  meal
                );
                const totals = getMealTotals(recipe);
                const status = getMealStatus(
                  recipe,
                  requirements
                );

                return (
                  <div
                    key={meal}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-pink-600 shadow-sm ring-1 ring-pink-100">
                          <MealIcon type={meal} />
                        </div>

                        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-pink-700">
                          {meal}
                        </p>

                        <h3 className="mt-1 font-bold text-slate-900">
                          {recipe?.name ?? "No meal planned"}
                        </h3>
                      </div>

                      {recipe && (
                        <span
                          className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full ${getStatusDotClass(
                            status
                          )}`}
                          title={getStatusText(status)}
                        />
                      )}
                    </div>

                    {recipe && (
                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Energy</span>
                          <strong className="text-slate-900">
                            {formatNutrient(totals.calories, "kcal")}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Protein</span>
                          <strong className="text-slate-900">
                            {formatNutrient(totals.protein, "g")}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Carbohydrate</span>
                          <strong className="text-slate-900">
                            {formatNutrient(totals.carbohydrates, "g")}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Fat</span>
                          <strong className="text-slate-900">
                            {formatNutrient(totals.fat, "g")}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Fibre</span>
                          <strong className="text-slate-900">
                            {formatNutrient(totals.fibre, "g")}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Sodium</span>
                          <strong className="text-slate-900">
                            {formatNutrient(totals.sodium, "mg")}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Potassium</span>
                          <span className="flex items-center gap-2 font-semibold text-slate-900">
                            <span
                              className={`h-3 w-3 rounded-full ${getStatusDotClass(
                                getLevelDotStatus(recipe.potassium)
                              )}`}
                              title={getStatusText(
                                levelStatus(recipe.potassium, requirements.potassium)
                              )}
                            />
                            {getMatrixLevelText(recipe.potassium)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Phosphorus</span>
                          <span className="flex items-center gap-2 font-semibold text-slate-900">
                            <span
                              className={`h-3 w-3 rounded-full ${getStatusDotClass(
                                getLevelDotStatus(recipe.phosphate)
                              )}`}
                              title={getStatusText(
                                levelStatus(recipe.phosphate, requirements.phosphate)
                              )}
                            />
                            {getMatrixLevelText(recipe.phosphate)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Purines</span>
                          <span className="flex items-center gap-2 font-semibold text-slate-900">
                            <span
                              className={`h-3 w-3 rounded-full ${getStatusDotClass(
                                getLevelDotStatus(recipe.purines)
                              )}`}
                              title={getStatusText(
                                levelStatus(recipe.purines, requirements.purines)
                              )}
                            />
                            {getMatrixLevelText(recipe.purines)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl bg-pink-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-slate-900">
                  Daily total
                </span>
                <span className="flex items-center gap-2 font-bold text-pink-800">
                  <span
                    className={`h-3 w-3 rounded-full ${getStatusDotClass(
                      getDailyStatusForDay(selectedDay)
                    )}`}
                    title={getStatusText(getDailyStatusForDay(selectedDay))}
                  />
                </span>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-600">Energy</span>
                  <strong className="text-slate-900">
                    {formatNutrient(dayTotals[selectedDay].calories, "kcal")}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-600">Protein</span>
                  <strong className="text-slate-900">
                    {formatNutrient(dayTotals[selectedDay].protein, "g")}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-600">Carbohydrate</span>
                  <strong className="text-slate-900">
                    {formatNutrient(dayTotals[selectedDay].carbohydrates, "g")}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-600">Fat</span>
                  <strong className="text-slate-900">
                    {formatNutrient(dayTotals[selectedDay].fat, "g")}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-600">Fibre</span>
                  <strong className="text-slate-900">
                    {formatNutrient(dayTotals[selectedDay].fibre, "g")}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-600">Sodium</span>
                  <strong className="text-slate-900">
                    {formatNutrient(dayTotals[selectedDay].sodium, "mg")}
                  </strong>
                </div>

                {([
                  ["Potassium", "potassium"],
                  ["Phosphorus", "phosphate"],
                  ["Purines", "purines"],
                ] as const).map(([label, key]) => {
                  const dayRecipes = mealTypes
                    .map((meal) => getRecipe(plannerMeals, selectedDay, meal))
                    .filter((recipe): recipe is Recipe => Boolean(recipe));

                  const level = averageRecipeLevel(dayRecipes, key);
                  const status = level ? getLevelDotStatus(level) : "green";

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-slate-600">{label}</span>

                      <span className="flex items-center gap-2 font-semibold text-slate-900">
                        <span
                          className={`h-3 w-3 rounded-full ${getStatusDotClass(status)}`}
                          title={getStatusText(status)}
                        />
                        {level ? getMatrixLevelText(level) : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* DESKTOP WEEKLY GRID */}
          <section className="nutrition-print-card mb-7 hidden overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 md:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="w-[150px] px-3 py-4 text-left text-sm font-bold text-slate-700">
                      Meal
                    </th>

                    {days.map((day) => (
                      <th
                        key={day}
                        className="px-3 py-4 text-center text-sm font-bold text-slate-900"
                      >
                        {day.slice(0, 3)}
                      </th>
                    ))}

                    <th className="border-l-2 border-blue-200 bg-blue-50 px-3 py-4 text-center text-sm font-bold text-blue-900">
                      Daily average
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {mealTypes.map((meal) => (
                    <tr
                      key={meal}
                      className="border-b border-slate-200 last:border-b-0"
                    >
                      <td className="px-5 py-5 align-top">
                        <div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-pink-600 shadow-sm ring-1 ring-pink-100">
                            <MealIcon type={meal} />
                          </div>

                          <span className="mt-2 block font-bold text-slate-900">
                            {meal}
                          </span>
                        </div>
                      </td>

                      {days.map((day) => {
                        const recipe = getRecipe(
                          plannerMeals,
                          day,
                          meal
                        );
                        const totals = getMealTotals(recipe);

                        return (
                          <td
                            key={`${day}-${meal}`}
                            className="px-2 py-5 align-top text-center"
                          >
                            {recipe ? (
                              <div className="min-w-[125px] space-y-1.5 text-left text-xs">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Energy</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.calories, "kcal")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Protein</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.protein, "g")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Carbohydrate</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.carbohydrates, "g")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Fat</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.fat, "g")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Fibre</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.fibre, "g")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Sodium</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.sodium, "mg")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Potassium</span>
                                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(getLevelDotStatus(recipe.potassium))}`}
                                    />
                                    {getMatrixLevelText(recipe.potassium)}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Phosphorus</span>
                                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(getLevelDotStatus(recipe.phosphate))}`}
                                    />
                                    {getMatrixLevelText(recipe.phosphate)}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Purines</span>
                                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(getLevelDotStatus(recipe.purines))}`}
                                    />
                                    {getMatrixLevelText(recipe.purines)}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-sm font-bold text-slate-300">
                                —
                              </span>
                            )}
                          </td>
                        );
                      })}

                      <td className="border-l-2 border-blue-200 bg-blue-50 px-2 py-5 align-top">
                        <div className="min-w-[125px] space-y-1.5 text-left text-xs">
                          {(() => {
                            const mealRecipes = days
                              .map((day) => getRecipe(plannerMeals, day, meal))
                              .filter((recipe): recipe is Recipe => Boolean(recipe));

                            const average = emptyTotals();

                            days.forEach((day) => {
                              addTotals(
                                average,
                                getMealTotals(
                                  getRecipe(plannerMeals, day, meal)
                                )
                              );
                            });

                            (Object.keys(average) as NutrientKey[]).forEach((key) => {
                              average[key] /= 7;
                            });

                            const potassium = averageRecipeLevel(mealRecipes, "potassium");
                            const phosphate = averageRecipeLevel(mealRecipes, "phosphate");
                            const purines = averageRecipeLevel(mealRecipes, "purines");

                            return (
                              <>
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Energy</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.calories, "kcal")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Protein</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.protein, "g")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Carbohydrate</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.carbohydrates, "g")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Fat</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.fat, "g")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Fibre</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.fibre, "g")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Sodium</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.sodium, "mg")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Potassium</span>
                                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                        potassium
                                          ? getLevelDotStatus(
                                              potassium,
                                              requirements.potassium
                                            )
                                          : "green"
                                      )}`}
                                    />
                                    {potassium ? getMatrixLevelText(potassium) : "—"}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Phosphorus</span>
                                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                        phosphate
                                          ? getLevelDotStatus(
                                              phosphate,
                                              requirements.phosphate
                                            )
                                          : "green"
                                      )}`}
                                    />
                                    {phosphate ? getMatrixLevelText(phosphate) : "—"}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Purines</span>
                                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                        purines
                                          ? getLevelDotStatus(
                                              purines,
                                              requirements.purines
                                            )
                                          : "green"
                                      )}`}
                                    />
                                    {purines ? getMatrixLevelText(purines) : "—"}
                                  </span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr className="bg-green-50">
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">Σ</span>
                        <span className="font-extrabold text-slate-900">
                          Daily total
                        </span>
                      </div>
                    </td>

                    {days.map((day) => {
                      return (
                        <td
                          key={`total-${day}`}
                          className="px-2 py-5 align-top"
                        >
                          <div className="min-w-[125px] space-y-1.5 text-left text-xs">
                            {(() => {
                              const dayRecipes = mealTypes
                                .map((meal) => getRecipe(plannerMeals, day, meal))
                                .filter((recipe): recipe is Recipe => Boolean(recipe));

                              const potassium = averageRecipeLevel(
                                dayRecipes,
                                "potassium"
                              );
                              const phosphate = averageRecipeLevel(
                                dayRecipes,
                                "phosphate"
                              );
                              const purines = averageRecipeLevel(
                                dayRecipes,
                                "purines"
                              );

                              return (
                                <>
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Energy</span>
                                    <strong className="text-slate-900">
                                      {formatNutrient(dayTotals[day].calories, "kcal")}
                                    </strong>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Protein</span>
                                    <strong className="text-slate-900">
                                      {formatNutrient(dayTotals[day].protein, "g")}
                                    </strong>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Carbohydrate</span>
                                    <strong className="text-slate-900">
                                      {formatNutrient(
                                        dayTotals[day].carbohydrates,
                                        "g"
                                      )}
                                    </strong>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Fat</span>
                                    <strong className="text-slate-900">
                                      {formatNutrient(dayTotals[day].fat, "g")}
                                    </strong>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Fibre</span>
                                    <strong className="text-slate-900">
                                      {formatNutrient(dayTotals[day].fibre, "g")}
                                    </strong>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Sodium</span>
                                    <strong className="text-slate-900">
                                      {formatNutrient(dayTotals[day].sodium, "mg")}
                                    </strong>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Potassium</span>
                                    <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                      <span
                                        className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                          potassium
                                            ? getLevelDotStatus(
                                                potassium,
                                                requirements.potassium
                                              )
                                            : "green"
                                        )}`}
                                      />
                                      {potassium ? getMatrixLevelText(potassium) : "—"}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Phosphorus</span>
                                    <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                      <span
                                        className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                          phosphate
                                            ? getLevelDotStatus(
                                                phosphate,
                                                requirements.phosphate
                                              )
                                            : "green"
                                        )}`}
                                      />
                                      {phosphate ? getMatrixLevelText(phosphate) : "—"}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Purines</span>
                                    <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                      <span
                                        className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                          purines
                                            ? getLevelDotStatus(
                                                purines,
                                                requirements.purines
                                              )
                                            : "green"
                                        )}`}
                                      />
                                      {purines ? getMatrixLevelText(purines) : "—"}
                                    </span>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </td>
                      );
                    })}

                    <td className="border-l-2 border-blue-200 bg-blue-50 px-2 py-5 align-top">
                      <div className="min-w-[125px] space-y-1.5 text-left text-xs">
                        {(() => {
                          const potassium = weeklyLevels.potassium;
                          const phosphate = weeklyLevels.phosphate;
                          const purines = weeklyLevels.purines;

                          return (
                            <>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Energy</span>
                                <strong className="text-slate-900">
                                  {formatNutrient(dailyAverage.calories, "kcal")}
                                </strong>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Protein</span>
                                <strong className="text-slate-900">
                                  {formatNutrient(dailyAverage.protein, "g")}
                                </strong>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Carbohydrate</span>
                                <strong className="text-slate-900">
                                  {formatNutrient(
                                    dailyAverage.carbohydrates,
                                    "g"
                                  )}
                                </strong>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Fat</span>
                                <strong className="text-slate-900">
                                  {formatNutrient(dailyAverage.fat, "g")}
                                </strong>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Fibre</span>
                                <strong className="text-slate-900">
                                  {formatNutrient(dailyAverage.fibre, "g")}
                                </strong>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Sodium</span>
                                <strong className="text-slate-900">
                                  {formatNutrient(dailyAverage.sodium, "mg")}
                                </strong>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Potassium</span>
                                <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                      potassium
                                        ? getLevelDotStatus(
                                            potassium
                                          )
                                        : "green"
                                    )}`}
                                  />
                                  {potassium ? getMatrixLevelText(potassium) : "—"}
                                </span>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Phosphorus</span>
                                <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                      phosphate
                                        ? getLevelDotStatus(
                                            phosphate
                                          )
                                        : "green"
                                    )}`}
                                  />
                                  {phosphate ? getMatrixLevelText(phosphate) : "—"}
                                </span>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Purines</span>
                                <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                      purines
                                        ? getLevelDotStatus(
                                            purines
                                          )
                                        : "green"
                                    )}`}
                                  />
                                  {purines ? getMatrixLevelText(purines) : "—"}
                                </span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* WEEKLY SUMMARY */}
          <section className="nutrition-print-summary nutrition-print-card rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 md:p-6">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-green-800">
                Weekly Nutrition Summary
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Weekly totals and daily averages from the meals
                currently in your planner.
              </p>
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,720px)_minmax(320px,360px)] xl:justify-start">
              <div className="overflow-x-auto">
                <table className="w-full max-w-[720px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left">
                      <th className="px-3 py-3 font-bold text-slate-700">
                        Nutrient
                      </th>
                      <th className="px-3 py-3 font-bold text-slate-700">
                        Weekly total
                      </th>
                      <th className="px-3 py-3 font-bold text-slate-700">
                        Daily average
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      {
                        label: "Energy (kcal)",
                        total: formatNumber(
                          weeklyTotals.calories
                        ),
                        average: formatNumber(
                          dailyAverage.calories
                        ),
                        requirement: "Not specified",
                        status: "green" as Status,
                      },
                      {
                        label: "Protein (g)",
                        total: formatNumber(
                          weeklyTotals.protein
                        ),
                        average: formatNumber(
                          dailyAverage.protein
                        ),
                        requirement: "Not specified",
                        status: "green" as Status,
                      },
                      {
                        label: "Carbohydrate (g)",
                        total: formatNumber(
                          weeklyTotals.carbohydrates
                        ),
                        average: formatNumber(
                          dailyAverage.carbohydrates
                        ),
                        requirement: formatRange(
                          requirements.carbohydrateMin,
                          requirements.carbohydrateMax,
                          "g"
                        ),
                        status:
                          requirements.carbohydrateMin ===
                            null &&
                          requirements.carbohydrateMax === null
                            ? "green"
                            : worstStatus([
                                requirements.carbohydrateMin !==
                                  null &&
                                requirements.carbohydrateMin !==
                                  undefined
                                  ? dailyAverage.carbohydrates <
                                    requirements.carbohydrateMin
                                    ? "amber"
                                    : "green"
                                  : "green",
                                requirements.carbohydrateMax !==
                                  null &&
                                requirements.carbohydrateMax !==
                                  undefined
                                  ? dailyAverage.carbohydrates >
                                    requirements.carbohydrateMax
                                    ? "amber"
                                    : "green"
                                  : "green",
                              ]),
                      },
                      {
                        label: "Fat (g)",
                        total: formatNumber(weeklyTotals.fat),
                        average: formatNumber(
                          dailyAverage.fat
                        ),
                        requirement: "Not specified",
                        status: "green" as Status,
                      },
                      {
                        label: "Fibre (g)",
                        total: formatNumber(
                          weeklyTotals.fibre
                        ),
                        average: formatNumber(
                          dailyAverage.fibre
                        ),
                        requirement: "Not specified",
                        status: "green" as Status,
                      },
                      {
                        label: "Sodium (mg)",
                        total: formatNumber(
                          weeklyTotals.sodium
                        ),
                        average: formatNumber(
                          dailyAverage.sodium
                        ),
                        requirement:
                          requirements.sodiumLimit !== null &&
                          requirements.sodiumLimit !== undefined
                            ? `≤ ${formatNumber(
                                requirements.sodiumLimit
                              )} mg/day`
                            : "No limit set",
                        status:
                          requirements.sodiumLimit === null ||
                          requirements.sodiumLimit === undefined
                            ? "green"
                            : dailyAverage.sodium >
                                requirements.sodiumLimit
                              ? "red"
                              : dailyAverage.sodium >
                                  requirements.sodiumLimit *
                                    0.75
                                ? "amber"
                                : "green",
                      },
                      {
                        label: "Potassium",
                        total:
                          weeklyLevels.potassium
                            ? `Average: ${weeklyLevels.potassium}`
                            : "—",
                        average: weeklyLevels.potassium
                          ? getMatrixLevelText(weeklyLevels.potassium)
                          : "—",
                        requirement:
                          requirementLevelText(
                            requirements.potassium
                          ),
                        status: worstStatus(
                          allPlannedRecipes.map((recipe) =>
                            levelStatus(
                              recipe.potassium,
                              requirements.potassium
                            )
                          )
                        ),
                      },
                      {
                        label: "Phosphorus",
                        total:
                          weeklyLevels.phosphate
                            ? `Average: ${weeklyLevels.phosphate}`
                            : "—",
                        average: weeklyLevels.phosphate
                          ? getMatrixLevelText(weeklyLevels.phosphate)
                          : "—",
                        requirement:
                          requirementLevelText(
                            requirements.phosphate
                          ),
                        status: worstStatus(
                          allPlannedRecipes.map((recipe) =>
                            levelStatus(
                              recipe.phosphate,
                              requirements.phosphate
                            )
                          )
                        ),
                      },
                      {
                        label: "Purines",
                        total:
                          weeklyLevels.purines
                            ? `Average: ${weeklyLevels.purines}`
                            : "—",
                        average: weeklyLevels.purines
                          ? getMatrixLevelText(weeklyLevels.purines)
                          : "—",
                        requirement:
                          requirementLevelText(
                            requirements.purines
                          ),
                        status: worstStatus(
                          allPlannedRecipes.map((recipe) =>
                            levelStatus(
                              recipe.purines,
                              requirements.purines
                            )
                          )
                        ),
                      },
                    ].map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        <td className="px-3 py-3 font-semibold text-slate-900">
                          {row.label}
                        </td>

                        <td className="px-3 py-3 text-slate-700">
                          {row.total}
                        </td>

                        <td className="px-3 py-3 text-slate-700">
                          {row.average}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <aside className="h-full rounded-2xl bg-green-50 p-4">
                <div className="nutrition-print-hidden mb-4">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full rounded-xl bg-green-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800"
                  >
                    🖨️ Print / Save as PDF
                  </button>
                </div>

                <h3 className="font-bold text-green-900">
                  About these figures
                </h3>

                <p className="mt-2 text-sm leading-5 text-slate-700">
                  These figures are calculated from the nutritional
                  content of the recipes in your weekly plan.
                </p>

                <p className="mt-3 text-sm leading-5 text-slate-700">
                  Traffic lights use your saved Meal Planner
                  requirements where a comparable target is
                  available.
                </p>

                <div className="mt-3 space-y-2 text-sm">
                  {(["green", "amber", "red"] as Status[]).map(
                    (status) => (
                      <div
                        key={status}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`h-3.5 w-3.5 rounded-full ${getStatusDotClass(
                            status
                          )}`}
                        />

                        <span className="text-slate-700">
                          {status === "green"
                            ? "Within target"
                            : status === "amber"
                              ? "Approaching limit"
                              : "Outside target"}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <p className="mt-3 border-t border-green-200 pt-3 text-xs leading-5 text-slate-600">
                  Potassium, phosphorus and purines are currently
                  stored as Low, Moderate or High recipe ratings,
                  rather than numeric amounts. Aggregate levels use
                  Low = 1, Moderate = 2 and High = 3 points, averaged
                  across the planned meals and rounded to the nearest
                  whole level.
                </p>
              </aside>
            </div>
          </section>

          <p className="nutrition-print-hidden mx-auto mt-5 max-w-5xl text-center text-xs leading-5 text-slate-500">
            Meal Planner nutrition figures are intended as a
            planning aid and should not replace advice from your
            renal or healthcare team.
          </p>
        </div>
      </main>
    </>
  );
}