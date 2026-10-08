"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useRef, useState } from "react";
import { recipes, type Recipe } from "@/data/RecipeData";

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
  ckdStage?: string | null;
  proteinMinG?: number | null;
  proteinMaxG?: number | null;
  potassiumLimitMg?: number | null;
  phosphateLimitMg?: number | null;
  fluidLimitMl?: number | null;
};

type NutrientKey =
  | "calories"
  | "protein"
  | "carbohydrates"
  | "fat"
  | "fibre"
  | "sodium"
  | "potassium"
  | "phosphate";

type NutrientTotals = Record<NutrientKey, number>;

type Status = "green" | "red";

type FluidEntry = { id: string; date: string; drink: string; amountMl: number; createdAt?: string };
const FLUID_LOG_STORAGE_KEY = "renalplan-fluid-log-v1";
function getLocalDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function getCurrentWeekDate(dayIndex: number): string {
  const today = new Date();
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weekday = monday.getDay();
  monday.setDate(monday.getDate() + (weekday === 0 ? -6 : 1 - weekday) + dayIndex);
  return getLocalDateKey(monday);
}
function readFluidLog(): FluidEntry[] {
  try {
    const raw = window.localStorage.getItem(FLUID_LOG_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

const REQUIREMENTS_STORAGE_KEY = "meal-planner-requirements";

const defaultRequirements: Requirements = {
  sodiumLimit: 1500,
  potassium: "Any",
  phosphate: "Any",
  purines: "Any",
  carbohydrateMin: null,
  carbohydrateMax: null,
  ckdStage: null,
  proteinMinG: null,
  proteinMaxG: null,
  potassiumLimitMg: null,
  phosphateLimitMg: null,
  fluidLimitMl: null,
};

const emptyTotals = (): NutrientTotals => ({
  calories: 0,
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  fibre: 0,
  sodium: 0,
  potassium: 0,
  phosphate: 0,
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
    totals.potassium += getNutritionNumber(recipe.nutrition.potassium);
    totals.phosphate += getNutritionNumber(recipe.nutrition.phosphate);
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
  totals.potassium = getNutritionNumber(recipe.nutrition.potassium);
  totals.phosphate = getNutritionNumber(recipe.nutrition.phosphate);

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
  return statuses.includes("red") ? "red" : "green";
}

function levelStatus(
  recipeLevel: "Low" | "Moderate" | "High",
  requirement: RequirementLevel
): Status {
  if (requirement === "Any") return "green";

  return levelRank[recipeLevel] <= levelRank[requirement]
    ? "green"
    : "red";
}

function numericLimitStatus(
  actual: number,
  min: number | null | undefined,
  max: number | null | undefined
): Status {
  const hasMin = min !== null && min !== undefined && Number.isFinite(min);
  const hasMax = max !== null && max !== undefined && Number.isFinite(max);

  if (hasMin && actual < min!) return "red";
  if (hasMax && actual > max!) return "red";

  return "green";
}

function getDailyStatus(
  totals: NutrientTotals,
  recipesForDay: Recipe[],
  requirements: Requirements
): Status {
  const statuses: Status[] = [
    numericLimitStatus(totals.protein, requirements.proteinMinG, requirements.proteinMaxG),
    numericLimitStatus(totals.sodium, null, requirements.sodiumLimit),
    numericLimitStatus(totals.potassium, null, requirements.potassiumLimitMg),
    numericLimitStatus(totals.phosphate, null, requirements.phosphateLimitMg),
    numericLimitStatus(totals.carbohydrates, requirements.carbohydrateMin, requirements.carbohydrateMax),
  ];

  // Purines remain qualitative because the recipe data contains a level,
  // not a numeric purine amount.
  recipesForDay.forEach((recipe) => {
    statuses.push(levelStatus(recipe.purines, requirements.purines));
  });

  return worstStatus(statuses);
}

function getStatusText(status: Status): string {
  return status === "green" ? "Within limit" : "Exceeds limit";
}

function getStatusDotClass(status: Status): string {
  return status === "green" ? "bg-green-600" : "!bg-red-600";
}

function getMatrixLevelText(
  level: "Low" | "Moderate" | "High"
): string {
  return level === "Moderate" ? "Mod" : level;
}

function formatSalt(sodiumMg: number): string {
  const saltGrams = (sodiumMg * 2.5) / 1000;
  return `${saltGrams.toFixed(1)} g`;
}

function formatPotassiumMmol(potassiumMg: number): string {
  return `${(potassiumMg / 39.1).toFixed(1)} mmol`;
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
  const [fluidEntries, setFluidEntries] = useState<FluidEntry[]>([]);
  const [fluidAllowanceMl, setFluidAllowanceMl] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] =
    useState<Day>("Monday");
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPdfOptions, setShowPdfOptions] = useState(false);
  const [pdfSections, setPdfSections] = useState({
    weeklySummary: true,
    dailyBreakdown: true,
    fluid: false,
    about: true,
  });


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

  async function loadRequirements() {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("user_requirements")
          .select(
            "ckd_stage, sodium_limit, protein_min_g, protein_max_g, potassium_limit_mg, phosphate_limit_mg, potassium, phosphate, purines, carbohydrate_min, carbohydrate_max, fluid_limit_ml"
          )
          .eq("user_id", user.id)
          .maybeSingle();

        if (!error && data) {
          const loadedRequirements: Requirements = {
            sodiumLimit: data.sodium_limit ?? null,
            potassium: (data.potassium ?? "Any") as RequirementLevel,
            phosphate: (data.phosphate ?? "Any") as RequirementLevel,
            purines: (data.purines ?? "Any") as RequirementLevel,
            carbohydrateMin: data.carbohydrate_min ?? null,
            carbohydrateMax: data.carbohydrate_max ?? null,
            ckdStage: data.ckd_stage ?? null,
            proteinMinG: data.protein_min_g ?? null,
            proteinMaxG: data.protein_max_g ?? null,
            potassiumLimitMg: data.potassium_limit_mg ?? null,
            phosphateLimitMg: data.phosphate_limit_mg ?? null,
            fluidLimitMl: data.fluid_limit_ml ?? null,
          };

          setRequirements(loadedRequirements);
          setFluidAllowanceMl(loadedRequirements.fluidLimitMl ?? null);

          try {
            window.localStorage.setItem(
              REQUIREMENTS_STORAGE_KEY,
              JSON.stringify(loadedRequirements)
            );
          } catch {
            // Ignore local storage errors.
          }

          return;
        }
      }
    } catch {
      // Fall through to local storage.
    }

    try {
      const saved = window.localStorage.getItem(REQUIREMENTS_STORAGE_KEY);

      if (!saved) {
        setRequirements(defaultRequirements);
        setFluidAllowanceMl(defaultRequirements.fluidLimitMl ?? null);
        return;
      }

      const parsed = JSON.parse(saved) as Partial<Requirements>;
      const loaded = { ...defaultRequirements, ...parsed };

      setRequirements(loaded);
      setFluidAllowanceMl(
        loaded.fluidLimitMl != null && Number.isFinite(Number(loaded.fluidLimitMl))
          ? Number(loaded.fluidLimitMl)
          : null
      );
    } catch {
      setRequirements(defaultRequirements);
      setFluidAllowanceMl(null);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;
      setIsLoggedIn(Boolean(user));
      setAuthChecked(true);
      if (user) {
        const { data: cloudEntries, error } = await createClient()
          .from("user_fluid_entries")
          .select("id, consumed_on, drink, amount_ml, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true });
        if (!error && cloudEntries && mounted) {
          const mapped: FluidEntry[] = cloudEntries.map((row: { id: string; consumed_on: string; drink: string; amount_ml: number; created_at: string }) => ({
            id: row.id, date: row.consumed_on, drink: row.drink, amountMl: row.amount_ml, createdAt: row.created_at,
          }));
          const local = readFluidLog();
          const merged = new Map<string, FluidEntry>();
          [...mapped, ...local].forEach((entry) => merged.set(entry.id, entry));
          const combined = [...merged.values()];
          setFluidEntries(combined);
          window.localStorage.setItem(FLUID_LOG_STORAGE_KEY, JSON.stringify(combined));
        }
      }
    }

    void checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    loadPlanner();
    void loadRequirements();
    setFluidEntries(readFluidLog());

    function handleFluidUpdate() {
      setFluidEntries(readFluidLog());
    }

    function handlePlannerUpdate() {
      loadPlanner();
    }

    function handleRequirementsUpdate() {
      void loadRequirements();
    }

    window.addEventListener(
      "weekly-planner-updated",
      handlePlannerUpdate
    );
    window.addEventListener("renalplan-fluid-log-updated", handleFluidUpdate);

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
      window.removeEventListener("renalplan-fluid-log-updated", handleFluidUpdate);

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

  // Fluid from planned meals is estimated from each recipe's fluidMl value.
  // The saved planner also stores per-meal serving counts in mealPeople.
  function plannedMealFluidForDay(day: Day): number {
    const savedPlanner = plannerMeals as (PlannerMeals & {
      mealPeople?: Record<string, Record<string, number>>;
    }) | null;

    return mealTypes.reduce((total, meal) => {
      const recipe = getRecipe(plannerMeals ?? {}, day, meal);
      if (!recipe) return total;
      const recipeFluid = Number((recipe as Recipe & { fluidMl?: number }).fluidMl ?? 0);
      const people = Number(savedPlanner?.mealPeople?.[day]?.[meal] ?? 1);
      return total + (Number.isFinite(recipeFluid) ? recipeFluid : 0) * (Number.isFinite(people) && people > 0 ? people : 1);
    }, 0);
  }

  function drinksFluidForDayIndex(dayIndex: number): number {
    const date = getCurrentWeekDate(dayIndex);
    return fluidEntries
      .filter((entry) => entry.date === date)
      .reduce((sum, entry) => sum + Number(entry.amountMl || 0), 0);
  }

  function totalFluidForDayIndex(dayIndex: number): number {
    return plannedMealFluidForDay(days[dayIndex]) + drinksFluidForDayIndex(dayIndex);
  }

  const weeklyFluidTotal = days.reduce((sum, _day, index) => sum + totalFluidForDayIndex(index), 0);
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

  const weeklyPurineLevel = useMemo(
    () => averageRecipeLevel(allPlannedRecipes, "purines"),
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

  const showLoginOverlay = authChecked && !isLoggedIn;

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-white">
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white px-4">
          <section className="w-full max-w-lg rounded-3xl border border-blue-100 bg-blue-50 p-8 text-center shadow-xl sm:p-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <span className="text-3xl">🔒</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Checking your account…</h1>
            <p className="mt-3 text-slate-600">Please wait while we check your RenalPlan account.</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <>
      {showLoginOverlay && (
        <div className="fixed inset-x-0 bottom-0 top-[80px] z-[40] flex items-center justify-center bg-white/10 px-4 backdrop-blur-[2px]">
          <section className="relative h-full w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0 select-none blur-[2px] opacity-55" aria-hidden="true">
              <div className="p-4 sm:p-6">
                <div className="h-8 w-56 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-100" />
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="h-56 rounded-2xl bg-rose-50" />
                  <div className="h-56 rounded-2xl bg-rose-50" />
                  <div className="h-56 rounded-2xl bg-rose-50" />
                  <div className="h-56 rounded-2xl bg-rose-50" />
                </div>
              </div>
            </div>

            <div className="renal-login-modal-backdrop absolute inset-0 flex items-center justify-center bg-white/20 p-4">
              <div className="renal-login-modal-card w-full max-w-md rounded-3xl bg-white/95 p-7 text-center shadow-2xl ring-1 ring-slate-200">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                  🔒
                </div>

                <h1 className="renal-login-modal-title mt-4 text-2xl font-extrabold text-slate-900">
                  Log in to view your Nutrition Report
                </h1>

                <p className="renal-login-modal-description mt-3 text-sm leading-6 text-slate-600">
                  Your personalised weekly nutrition report is available when you are logged into your RenalPlan account. Sign in to view your report and create a printable or PDF copy to share with your nutritionist or renal consultant.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href="/auth/login"
                    className="rounded-2xl bg-[#0B3B75] px-4 py-3 text-center font-bold text-white transition hover:bg-[#082E5C]"
                  >
                    Log in
                  </a>
                  <a
                    href="/signup"
                    className="rounded-2xl bg-orange-500 px-4 py-3 text-center font-bold text-white transition hover:bg-orange-600"
                  >
                    Create account
                  </a>
                </div>

                <p className="renal-login-modal-footnote mt-4 text-xs text-slate-500">
                  Your personalised report is saved to your account.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {showPdfOptions && (
        <div className="nutrition-print-hidden fixed inset-0 z-[20000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="pdf-options-title"
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-xl">
                🖨️
              </div>
              <div>
                <h2 id="pdf-options-title" className="text-xl font-extrabold text-slate-900">
                  Choose your PDF report
                </h2>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  Select the sections you want to include.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                {
                  key: "weeklySummary" as const,
                  title: "Weekly nutritional summary",
                  description: "Weekly totals and daily averages for your nutrients.",
                },
                {
                  key: "dailyBreakdown" as const,
                  title: "Daily nutrition breakdown",
                  description: "Breakfast, lunch and dinner nutrition for each day.",
                },
                {
                  key: "fluid" as const,
                  title: "Fluid intake",
                  description: "Recorded drinks plus estimated fluid from planned meals.",
                },
                {
                  key: "about" as const,
                  title: "About these figures",
                  description: "How the figures and traffic lights are calculated.",
                },
              ].map((section) => (
                <label
                  key={section.key}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-orange-300 hover:bg-orange-50/40"
                >
                  <input
                    type="checkbox"
                    checked={pdfSections[section.key]}
                    onChange={(event) =>
                      setPdfSections((current) => ({
                        ...current,
                        [section.key]: event.target.checked,
                      }))
                    }
                    className="mt-1 h-5 w-5 shrink-0 accent-orange-500"
                  />
                  <span>
                    <span className="block font-bold text-slate-900">{section.title}</span>
                    <span className="mt-1 block text-sm leading-5 text-slate-500">{section.description}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowPdfOptions(false)}
                className="rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!Object.values(pdfSections).some(Boolean)}
                onClick={() => {
                  setShowPdfOptions(false);
                  window.setTimeout(() => window.print(), 50);
                }}
                className="rounded-2xl bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create PDF
              </button>
            </div>
          </section>
        </div>
      )}

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

          .nutrition-print-page.pdf-show-weekly-summary > .nutrition-print-summary,
          .nutrition-print-page.pdf-show-daily-breakdown > .nutrition-print-grid,
          .nutrition-print-page.pdf-show-fluid > .nutrition-print-fluid,
          .nutrition-print-page.pdf-show-about .nutrition-print-about {
            display: block !important;
          }

          .nutrition-print-page:not(.pdf-show-weekly-summary) .nutrition-print-summary,
          .nutrition-print-page:not(.pdf-show-daily-breakdown) .nutrition-print-grid,
          .nutrition-print-page:not(.pdf-show-fluid) .nutrition-print-fluid,
          .nutrition-print-page:not(.pdf-show-about) .nutrition-print-about {
            display: none !important;
          }

          .nutrition-print-card {
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
          }

          @page {
            size: A4 landscape;
            margin: 10mm;
          }

          /* The weekly grid contains 7 days plus a daily-average column.
             Let the table use the full landscape page instead of allowing
             the individual day cells to force the report off the page. */
          .nutrition-print-grid {
            width: 100% !important;
            max-width: none !important;
            overflow: visible !important;
          }

          .nutrition-print-grid > div {
            width: 100% !important;
            overflow: visible !important;
          }

          .nutrition-print-grid table {
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
            table-layout: fixed !important;
          }

          .nutrition-print-grid th:first-child,
          .nutrition-print-grid td:first-child {
            width: 85px !important;
          }

          .nutrition-print-grid th,
          .nutrition-print-grid td {
            padding: 4px !important;
          }

          .nutrition-print-grid .nutrition-weekly-average {
            width: 90px !important;
          }

          .nutrition-print-grid td > div {
            min-width: 0 !important;
            font-size: 9px !important;
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
        html[data-theme="dark"] .nutrition-pdf-button {
          background-color: #c45f16 !important;
        }

        html[data-theme="dark"] .nutrition-pdf-button:hover {
          background-color: #d66b19 !important;
        }

        .nutrition-pdf-shimmer {
          animation: nutrition-pdf-shimmer 3.5s ease-in-out infinite;
          opacity: 0.5;
        }

        @keyframes nutrition-pdf-shimmer {
          0%, 52% {
            transform: translateX(-180%) skewX(-20deg);
          }
          68%, 100% {
            transform: translateX(260%) skewX(-20deg);
          }
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-5 md:px-6 md:py-6">
        <div
          className={`nutrition-print-page mx-auto max-w-7xl md:max-w-[1400px] ${
            pdfSections.weeklySummary ? "pdf-show-weekly-summary" : ""
          } ${
            pdfSections.dailyBreakdown ? "pdf-show-daily-breakdown" : ""
          } ${
            pdfSections.fluid ? "pdf-show-fluid" : ""
          } ${
            pdfSections.about ? "pdf-show-about" : ""
          }`}
        >
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
                          <span className="text-slate-500">Salt (g)</span>
                          <strong className="text-slate-900">
                            {formatSalt(totals.sodium)}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Potassium</span>
                          <strong className="text-slate-900">
                            {formatNutrient(getNutritionNumber(recipe.nutrition.potassium), "mg")}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Phosphorus</span>
                          <strong className="text-slate-900">
                            {formatNutrient(getNutritionNumber(recipe.nutrition.phosphate), "mg")}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">Purines</span>
                          <strong className="text-slate-900">
                            {getMatrixLevelText(recipe.purines)}
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="nutrition-mobile-daily-total mt-4 rounded-2xl bg-pink-50 p-4">
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
                  <span className="text-slate-600">Salt (g)</span>
                  <strong className="text-slate-900">
                    {formatSalt(dayTotals[selectedDay].sodium)}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-600">Potassium</span>
                  <span className="flex items-center gap-2 font-semibold text-slate-900">
                    <span
                      className={`h-3 w-3 rounded-full ${getStatusDotClass(
                        numericLimitStatus(
                          dayTotals[selectedDay].potassium,
                          null,
                          requirements.potassiumLimitMg
                        )
                      )}`}
                    />
                    {formatPotassiumMmol(dayTotals[selectedDay].potassium)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-600">Phosphorus</span>
                  <span className="flex items-center gap-2 font-semibold text-slate-900">
                    <span
                      className={`h-3 w-3 rounded-full ${getStatusDotClass(
                        numericLimitStatus(
                          dayTotals[selectedDay].phosphate,
                          null,
                          requirements.phosphateLimitMg
                        )
                      )}`}
                    />
                    {formatNutrient(dayTotals[selectedDay].phosphate, "mg")}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-600">Purines</span>
                  <span className="flex items-center gap-2 font-semibold text-slate-900">
                    <span
                      className={`h-3 w-3 rounded-full ${getStatusDotClass(
                        worstStatus(
                          mealTypes
                            .map((meal) => getRecipe(plannerMeals, selectedDay, meal))
                            .filter((recipe): recipe is Recipe => Boolean(recipe))
                            .map((recipe) => levelStatus(recipe.purines, requirements.purines))
                        )
                      )}`}
                    />
                    {(() => {
                      const level = averageRecipeLevel(
                        mealTypes
                          .map((meal) => getRecipe(plannerMeals, selectedDay, meal))
                          .filter((recipe): recipe is Recipe => Boolean(recipe)),
                        "purines"
                      );
                      return level ? getMatrixLevelText(level) : "—";
                    })()}
                  </span>
                </div>
              </div>
            </div>

            {/* MOBILE FLUID INTAKE: follows the selected day, like the meal and daily-total cards above. */}
            <section className="nutrition-mobile-fluid mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-pink-700">Fluid intake</p>
                  <p className="mt-1 text-sm text-slate-500">Meals + drinks recorded</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-slate-900">
                    {totalFluidForDayIndex(days.indexOf(selectedDay)).toLocaleString()} ml
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{selectedDay}</p>
                </div>
              </div>
              {fluidAllowanceMl !== null && (
                <p className="mt-3 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">
                  Personal allowance saved in My Diet: {fluidAllowanceMl.toLocaleString()} ml/day.
                </p>
              )}
            </section>
          </section>

          {/* DESKTOP WEEKLY GRID */}
          <section className="nutrition-print-grid nutrition-print-card mb-7 hidden overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 md:block">
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

                    <th className="nutrition-weekly-average border-l-2 border-blue-200 bg-blue-50 px-3 py-4 text-center text-sm font-bold text-blue-900">
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
                                  <span className="text-slate-500">Salt (g)</span>
                                  <strong className="text-slate-900">
                                    {formatSalt(totals.sodium)}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Potassium</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(getNutritionNumber(recipe.nutrition.potassium), "mg")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Phosphorus</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(getNutritionNumber(recipe.nutrition.phosphate), "mg")}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Purines</span>
                                  <strong className="text-slate-900">
                                    {getMatrixLevelText(recipe.purines)}
                                  </strong>
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

                      <td className="nutrition-weekly-average border-l-2 border-blue-200 bg-blue-50 px-2 py-5 align-top">
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
                                  <span className="text-slate-500">Salt (g)</span>
                                  <strong className="text-slate-900">
                                    {formatSalt(average.sodium)}
                                  </strong>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Potassium</span>
                                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                        average.potassium
                                          ? numericLimitStatus(
                                        average.potassium,
                                        null,
                                        requirements.potassiumLimitMg
                                      )
                                          : "green"
                                      )}`}
                                    />
                                    {formatNutrient(average.potassium, "mg")}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Phosphorus</span>
                                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                        average.phosphate
                                          ? numericLimitStatus(
                                        average.phosphate,
                                        null,
                                        requirements.phosphateLimitMg
                                      )
                                          : "green"
                                      )}`}
                                    />
                                    {formatNutrient(average.phosphate, "mg")}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-500">Purines</span>
                                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                        purines
                                          ? levelStatus(purines, requirements.purines)
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
                                    <span className="text-slate-500">Salt (g)</span>
                                    <strong className="text-slate-900">
                                      {formatSalt(dayTotals[day].sodium)}
                                    </strong>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Potassium</span>
                                    <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                      <span
                                        className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                          numericLimitStatus(
                                            dayTotals[day].potassium,
                                            null,
                                            requirements.potassiumLimitMg
                                          )
                                        )}`}
                                      />
                                      {formatPotassiumMmol(dayTotals[day].potassium)}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Phosphorus</span>
                                    <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                      <span
                                        className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                          numericLimitStatus(
                                            dayTotals[day].phosphate,
                                            null,
                                            requirements.phosphateLimitMg
                                          )
                                        )}`}
                                      />
                                      {formatNutrient(dayTotals[day].phosphate, "mg")}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-500">Purines</span>
                                    <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                      <span
                                        className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                          purines
                                            ? levelStatus(purines, requirements.purines)
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

                    <td className="nutrition-weekly-average border-l-2 border-blue-200 bg-blue-50 px-2 py-5 align-top">
                      <div className="min-w-[125px] space-y-1.5 text-left text-xs">
                        {(() => {
                          const purines = weeklyPurineLevel;

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
                                <span className="text-slate-500">Salt (g)</span>
                                <strong className="text-slate-900">
                                  {formatSalt(dailyAverage.sodium)}
                                </strong>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Potassium</span>
                                <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                      numericLimitStatus(
                                        dailyAverage.potassium,
                                        null,
                                        requirements.potassiumLimitMg
                                      )
                                    )}`}
                                  />
                                  {formatPotassiumMmol(dailyAverage.potassium)}
                                </span>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Phosphorus</span>
                                <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                      numericLimitStatus(
                                        dailyAverage.phosphate,
                                        null,
                                        requirements.phosphateLimitMg
                                      )
                                    )}`}
                                  />
                                  {formatNutrient(dailyAverage.phosphate, "mg")}
                                </span>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Purines</span>
                                <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(
                                      purines
                                        ? levelStatus(purines, requirements.purines)
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

          <section className="nutrition-print-fluid nutrition-print-card mb-6 hidden w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-600 dark:bg-slate-800 md:block">
            <div className="mb-3">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">Fluid intake</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Estimated fluid includes drinks you record plus fluid from the meals planned for each day.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  <col style={{ width: "150px" }} />
                  {days.map((day) => <col key={day} />)}
                  <col />
                </colgroup>
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-600">
                    <th className="px-2 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300">Total fluid</th>
                    {days.map((day) => (
                      <th key={day} className="px-2 py-3 text-center text-xs font-bold text-slate-500 dark:text-slate-300">{day}</th>
                    ))}
                    <th className="border-l-2 border-slate-200 bg-slate-50 px-2 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">Daily average</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="px-2 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Meals + drinks</th>
                    {days.map((day, index) => {
                      const drinks = drinksFluidForDayIndex(index);
                      const meals = plannedMealFluidForDay(day);
                      const total = meals + drinks;
                      return (
                        <td key={day} className="px-2 py-4 text-center align-top">
                          <div className="mx-auto rounded-xl border border-slate-200 bg-slate-50 px-2 py-3 dark:border-slate-600 dark:bg-slate-700">
                            <p className="text-lg font-extrabold text-slate-900 dark:text-white">{total.toLocaleString()} ml</p>
                            <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-300">{day}</p>
                            <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-300">Meals {meals.toLocaleString()} ml · Drinks {drinks.toLocaleString()} ml</p>
                          </div>
                        </td>
                      );
                    })}
                    <td className="border-l-2 border-slate-200 bg-slate-50 px-2 py-4 text-center align-top dark:border-slate-600 dark:bg-slate-700">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">Weekly daily average</p>
                      <p className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">{Math.round(weeklyFluidTotal / 7).toLocaleString()} ml/day</p>
                    </td>
                  </tr>
                  {fluidAllowanceMl !== null && (
                    <tr>
                      <td colSpan={9} className="px-2 pt-2 text-xs leading-5 text-slate-500 dark:text-slate-300">
                        Personal allowance saved in My Diet: {fluidAllowanceMl.toLocaleString()} ml/day. This is your saved setting, not a target recommended by RenalPlan.
                      </td>
                    </tr>
                  )}
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
                        total: formatNumber(weeklyTotals.calories),
                        average: formatNumber(dailyAverage.calories),
                        requirement: "Not specified",
                        status: "green" as Status,
                      },
                      {
                        label: "Protein (g)",
                        total: formatNumber(weeklyTotals.protein),
                        average: formatNumber(dailyAverage.protein),
                        requirement: formatRange(
                          requirements.proteinMinG,
                          requirements.proteinMaxG,
                          "g/day"
                        ),
                        status: numericLimitStatus(
                          dailyAverage.protein,
                          requirements.proteinMinG,
                          requirements.proteinMaxG
                        ),
                      },
                      {
                        label: "Carbohydrate (g)",
                        total: formatNumber(weeklyTotals.carbohydrates),
                        average: formatNumber(dailyAverage.carbohydrates),
                        requirement: formatRange(
                          requirements.carbohydrateMin,
                          requirements.carbohydrateMax,
                          "g/day"
                        ),
                        status: numericLimitStatus(
                          dailyAverage.carbohydrates,
                          requirements.carbohydrateMin,
                          requirements.carbohydrateMax
                        ),
                      },
                      {
                        label: "Fat (g)",
                        total: formatNumber(weeklyTotals.fat),
                        average: formatNumber(dailyAverage.fat),
                        requirement: "Not specified",
                        status: "green" as Status,
                      },
                      {
                        label: "Fibre (g)",
                        total: formatNumber(weeklyTotals.fibre),
                        average: formatNumber(dailyAverage.fibre),
                        requirement: "Not specified",
                        status: "green" as Status,
                      },
                      {
                        label: "Salt (g)",
                        total: formatSalt(weeklyTotals.sodium),
                        average: formatSalt(dailyAverage.sodium),
                        requirement:
                          requirements.sodiumLimit !== null &&
                          requirements.sodiumLimit !== undefined
                            ? `≤ ${formatSalt(requirements.sodiumLimit)}/day`
                            : "No limit set",
                        status: numericLimitStatus(
                          dailyAverage.sodium,
                          null,
                          requirements.sodiumLimit
                        ),
                      },
                      {
                        label: "Potassium",
                        total: formatPotassiumMmol(weeklyTotals.potassium),
                        average: formatPotassiumMmol(dailyAverage.potassium),
                        requirement:
                          requirements.potassiumLimitMg != null
                            ? `≤ ${formatPotassiumMmol(requirements.potassiumLimitMg)}/day`
                            : "No limit set",
                        status: numericLimitStatus(
                          dailyAverage.potassium,
                          null,
                          requirements.potassiumLimitMg
                        ),
                      },
                      {
                        label: "Phosphorus",
                        total: formatNumber(weeklyTotals.phosphate) + " mg",
                        average: formatNumber(dailyAverage.phosphate) + " mg",
                        requirement:
                          requirements.phosphateLimitMg != null
                            ? `≤ ${formatNumber(requirements.phosphateLimitMg)} mg/day`
                            : "No limit set",
                        status: numericLimitStatus(
                          dailyAverage.phosphate,
                          null,
                          requirements.phosphateLimitMg
                        ),
                      },
                      {
                        label: "Purines",
                        total: weeklyPurineLevel
                          ? `Average: ${weeklyPurineLevel}`
                          : "—",
                        average: weeklyPurineLevel
                          ? getMatrixLevelText(weeklyPurineLevel)
                          : "—",
                        requirement: requirementLevelText(requirements.purines),
                        status: weeklyPurineLevel
                          ? levelStatus(weeklyPurineLevel, requirements.purines)
                          : "green",
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
                    <tr className="border-b border-slate-100">
                      <td className="px-3 py-3 font-semibold text-slate-900">Total fluid (meals + drinks)</td>
                      <td className="px-3 py-3 text-slate-700">{weeklyFluidTotal.toLocaleString()} ml</td>
                      <td className="px-3 py-3 text-slate-700">{Math.round(weeklyFluidTotal / 7).toLocaleString()} ml/day</td>
                    </tr>
                    <tr className="border-b border-slate-100 last:border-b-0">
                      <td className="px-3 py-3 font-semibold text-slate-900">Personal fluid allowance</td>
                      <td className="px-3 py-3 text-slate-700">{fluidAllowanceMl === null ? "Not set" : `${fluidAllowanceMl.toLocaleString()} ml/day`}</td>
                      <td className="px-3 py-3 text-slate-700">{fluidAllowanceMl === null ? "Not set" : `${fluidAllowanceMl.toLocaleString()} ml/day`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <aside className="nutrition-print-about h-full rounded-2xl bg-green-50 p-4">
                {!showLoginOverlay && (
                <div className="nutrition-print-hidden mb-4">
                  <button
                    type="button"
                    onClick={() => setShowPdfOptions(true)}
                    className="nutrition-pdf-button relative w-full overflow-hidden rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    <span className="relative z-10">🖨️ Print / Save as PDF</span>
                    <span
                      aria-hidden="true"
                      className="nutrition-pdf-shimmer pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent"
                    />
                  </button>
                </div>
                )}

                <h3 className="font-bold text-green-900">
                  About these figures
                </h3>

                <p className="mt-2 text-sm leading-5 text-slate-700">
                  These figures are calculated from the nutritional
                  content of the recipes in your weekly plan.
                </p>

                <p className="mt-3 text-sm leading-5 text-slate-700">
                  Your daily totals and averages are compared with the
                  personal requirements saved in My Diet. The traffic
                  light shows the overall result against those limits.
                </p>

                <div className="mt-3 space-y-2 text-sm">
                  {(["green", "red"] as Status[]).map((status) => (
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
                          ? "Within limit"
                          : "Exceeds limit"}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-3 border-t border-green-200 pt-3 text-xs leading-5 text-slate-600">
                  Green means the daily figure is within the saved limit;
                  red means it exceeds the saved limit. Individual meal
                  figures are shown for information only and are not judged
                  against the full daily allowance. Potassium is displayed
                  in mmol, phosphorus in mg and salt in g. Purines are shown
                  as Low, Moderate or High because the recipe data uses a
                  classification rather than a numeric purine value.
                </p>
              </aside>
            </div>
          </section>



          <p className="nutrition-print-hidden mx-auto mt-5 max-w-5xl text-center text-xs leading-5 text-slate-500">
            RenalPlan nutrition figures are intended as a
            planning aid and should not replace advice from your
            renal or healthcare team.
          </p>
        </div>
      </main>
      <style jsx global>{`
        /* Dark mode: the restricted-login popup should be a dark RenalPlan
           panel with light, high-contrast writing. Light mode is unchanged. */
        html[data-theme="dark"] .renal-login-modal-backdrop {
          background: rgba(5, 15, 25, 0.42) !important;
        }

        html[data-theme="dark"] .renal-login-modal-card {
          background: #172635 !important;
          border-color: #33475a !important;
          color: #f8fafc !important;
        }

        html[data-theme="dark"] .renal-login-modal-title {
          color: #f8fafc !important;
        }

        html[data-theme="dark"] .renal-login-modal-description {
          color: #cbd5e1 !important;
        }

        html[data-theme="dark"] .renal-login-modal-footnote {
          color: #94a3b8 !important;
        }

        html[data-theme="dark"] .renal-login-modal-title,
        html[data-theme="dark"] .renal-login-modal-description,
        html[data-theme="dark"] .renal-login-modal-footnote {
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
}




