"use client";
import { evaluateNutrientTarget, getNutrientTarget, nutrientStatusText, type NutrientTargetStatus } from "@/lib/nutrientTargets";
import { defaultRequirements as sharedDefaultRequirements, activeRequirements, isPersonalisedNutrientVisible, type Requirements } from "@/lib/myDiet";
import { useMyDiet } from "@/components/my-diet/MyDietProvider";


import { useWeeklyPageStorage, datedDayDate } from "@/lib/weeklyPageStorage";

import { useFoodAccount } from "@/lib/useFoodAccount";
import { snackNutrients, snackSummary, type SnackNutrient } from "@/lib/foodSnacks";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const nutrientRows: { key: SnackNutrient; label: string; unit: "kcal" | "g" | "mg" | "salt" }[] = [
  { key: "calories", label: "Energy", unit: "kcal" },
  { key: "protein", label: "Protein", unit: "g" },
  { key: "carbohydrates", label: "Carbohydrate", unit: "g" },
  { key: "fat", label: "Fat", unit: "g" },
  { key: "fibre", label: "Fibre", unit: "g" },
  { key: "sodium", label: "Salt (g)", unit: "salt" },
  { key: "potassium", label: "Potassium", unit: "mg" },
  { key: "phosphate", label: "Phosphorus", unit: "mg" },
];

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

type Status = NutrientTargetStatus;

type FluidEntry = { id: string; date: string; drink: string; amountMl: number; createdAt?: string };
const FLUID_LOG_STORAGE_KEY = "renalplan-fluid-log-v1";
function getLocalDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function getCurrentWeekDate(dayIndex: number): string {
  const dated = datedDayDate(days[dayIndex]);
  if (dated) return dated;
  const today = new Date();
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weekday = monday.getDay();
  monday.setDate(monday.getDate() + (weekday === 0 ? -6 : 1 - weekday) + dayIndex);
  return getLocalDateKey(monday);
}


const defaultRequirements: Requirements = sharedDefaultRequirements;

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


function getNutritionNumber(value: string | undefined): number {
  if (!value) return Number.NaN;

  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : Number.NaN;
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

    addTotals(totals, getMealTotals(recipe));
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

  for (const field of recipe.nutritionIncomplete ?? []) {
    if (field !== "salt") totals[field] = Number.NaN;
    else totals.sodium = Number.NaN;
  }
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
  if (statuses.includes("Exceeds target")) return "Exceeds target";
  if (statuses.includes("pending")) return "pending";
  if (statuses.includes("Below target")) return "Below target";
  if (statuses.includes("Within target")) return "Within target";
  return statuses.includes("green") ? "green" : "pending";
}


function numericLimitStatus(
  actual: number,
  min: number | null | undefined,
  max: number | null | undefined
): Status {
  return evaluateNutrientTarget(actual, { proteinMinG: min, proteinMaxG: max }, "protein");
}

function getDailyStatus(
  totals: NutrientTotals,
  requirements: Requirements,
  incomplete: (key: NutrientKey) => boolean = () => false,
): Status {
  const statuses = (["calories", "protein", "carbohydrates", "sodium", "potassium", "phosphate"] as const)
    .filter(key => {
      const { min, max } = getNutrientTarget(requirements, key);
      return min != null || max != null;
    })
    .map(key => evaluateNutrientTarget(totals[key], requirements, key, incomplete(key)));

  return worstStatus(statuses);
}

function getStatusText(status: Status): string {
  return nutrientStatusText(status);
}

function getStatusDotClass(status: Status): string {
  if (status === "pending") return "bg-slate-400";
  if (status === "Below target") return "bg-amber-600";
  if (status === "Within target") return "bg-green-600";
  return status === "green" ? "bg-green-600" : "!bg-red-600";
}

function NutritionStatusDot({ status }: { status: Status }) {
  return <span role="img" aria-label={getStatusText(status)} title={getStatusText(status)} className={`nutrition-status-dot h-2.5 w-2.5 shrink-0 rounded-full ${getStatusDotClass(status)}`} />;
}

function NutritionStatusLabel({ status }: { status: Status | null }) {
  if (!status) {
    return <span className="text-xs text-slate-500">Not assessed</span>;
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-slate-600"
    >
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(status)}`}
      />
      {getStatusText(status)}
    </span>
  );
}


function formatSalt(sodiumMg: number): string {
  if (!Number.isFinite(sodiumMg)) return "—";
  const saltGrams = (sodiumMg * 2.5) / 1000;
  return `${saltGrams.toFixed(1)} g`;
}

function formatPotassiumMg(potassiumMg: number): string {
  return formatNutrient(potassiumMg, "mg");
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return Math.round(value).toLocaleString("en-GB");
}

function formatNutrient(
  value: number,
  unit: "kcal" | "g" | "mg"
): string {
  return Number.isFinite(value) ? `${formatNumber(value)} ${unit}` : "—";
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


export default function NutritionPage() {
  const weeklyPageStorage = useWeeklyPageStorage();
  const snackAccount = useFoodAccount(getCurrentWeekDate(0), getCurrentWeekDate(6));
const readFluidLog = useCallback(function readFluidLog(): FluidEntry[] {
  try {
    const raw = weeklyPageStorage.getItem(FLUID_LOG_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}, [weeklyPageStorage]);

  const [plannerMeals, setPlannerMeals] =
    useState<PlannerMeals | null>(null);
  const { requirements: savedDiet } = useMyDiet();
  const requirements = activeRequirements(savedDiet ?? defaultRequirements);
  const [fluidEntries, setFluidEntries] = useState<FluidEntry[]>([]);
  const fluidAllowanceMl = requirements.fluidLimitMl ?? null;
  const [selectedDay, setSelectedDay] =
    useState<Day>("Monday");
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPdfOptions, setShowPdfOptions] = useState(false);
  const [mainSummaryOpen, setMainSummaryOpen] = useState(false);
  const [pdfSections, setPdfSections] = useState({
    weeklySummary: true,
    dailyBreakdown: true,
    fluid: false,
    about: true,
  });


  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const pdfOptionsDialogRef = useRef<HTMLElement | null>(null);
  const pdfOptionsReturnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const openPdfOptions = () => {
      const activeElement = document.activeElement;
      pdfOptionsReturnFocusRef.current =
        activeElement instanceof HTMLElement ? activeElement : null;
      setShowPdfOptions(true);
    };

    window.addEventListener("renalplan:open-nutrition-pdf", openPdfOptions);
    return () =>
      window.removeEventListener("renalplan:open-nutrition-pdf", openPdfOptions);
  }, []);

  useEffect(() => {
    if (!showPdfOptions) return;

    const dialog = pdfOptionsDialogRef.current;
    if (!dialog) return;

    const getFocusableElements = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      );

    getFocusableElements()[0]?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setShowPdfOptions(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        dialog.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === firstElement || !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement || !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeyDown);
    return () => {
      document.removeEventListener("keydown", handleDialogKeyDown);
      const returnFocusTarget = pdfOptionsReturnFocusRef.current;
      if (returnFocusTarget?.isConnected) returnFocusTarget.focus();
      pdfOptionsReturnFocusRef.current = null;
    };
  }, [showPdfOptions]);

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

  const loadPlanner = useCallback(function loadPlanner() {
    try {
      const saved = weeklyPageStorage.getItem("weekly-planner"
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
  }, [weeklyPageStorage]);


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
          weeklyPageStorage.setItem(FLUID_LOG_STORAGE_KEY, JSON.stringify(combined));
        }
      }
    }

    void checkAuth();

    return () => {
      mounted = false;
    };
  }, [readFluidLog, weeklyPageStorage]);

  useEffect(() => {
    loadPlanner();
    setFluidEntries(readFluidLog());

    function handleFluidUpdate() {
      setFluidEntries(readFluidLog());
    }

    function handlePlannerUpdate() {
      loadPlanner();
    }



    window.addEventListener(
      "weekly-planner-updated",
      handlePlannerUpdate
    );
    window.addEventListener("renalplan-fluid-log-updated", handleFluidUpdate);

    window.addEventListener("storage", handlePlannerUpdate);

    return () => {
      window.removeEventListener(
        "weekly-planner-updated",
        handlePlannerUpdate
      );
      window.removeEventListener("renalplan-fluid-log-updated", handleFluidUpdate);

      window.removeEventListener("storage", handlePlannerUpdate);
    };
  }, [loadPlanner, readFluidLog]);

  const dayTotals = useMemo(() => {
    const totals = {} as Record<Day, NutrientTotals>;

    days.forEach((day, index) => {
      totals[day] = getDayTotals(
        plannerMeals ?? {},
        day
      );
      const snacks = snackSummary(snackAccount.snacks, getCurrentWeekDate(index));
      snackNutrients.forEach(key => { if (snacks[key].value !== null) totals[day][key] += snacks[key].value; });
    });

    return totals;
  }, [plannerMeals, snackAccount.snacks, weeklyPageStorage]);

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
  function formatFluid(value: number): string {
    return Number.isFinite(value) ? Math.round(value).toLocaleString("en-GB") : "—";
  }

  function plannedMealFluidForDay(day: Day): number {
    const savedPlanner = plannerMeals as (PlannerMeals & {
      mealPeople?: Record<string, Record<string, number>>;
    }) | null;

    return mealTypes.reduce((total, meal) => {
      const recipe = getRecipe(plannerMeals ?? {}, day, meal);
      if (!recipe) return total;
      const recipeFluid = Number((recipe as Recipe & { fluidMl?: number }).fluidMl ?? Number.NaN);
      const people = Number(savedPlanner?.mealPeople?.[day]?.[meal] ?? 1);
      return total + recipeFluid * (Number.isFinite(people) && people > 0 ? people : 1);
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


  const weeklySummaryRows: Array<{
    nutrient: string;
    label: string;
    total: string;
    average: string;
    requirement: string;
    status: Status | null;
  }> = [
    {
      nutrient: "calories",
      label: "Energy (kcal)",
      total: formatNumber(weeklyTotals.calories),
      average: formatNumber(dailyAverage.calories),
      requirement: formatRange(requirements.nutrientTargetSettings?.energyMinKcal, requirements.nutrientTargetSettings?.energyMaxKcal, "kcal/day"),
      status: evaluateNutrientTarget(dailyAverage.calories, requirements, "calories"),
    },
    {
      nutrient: "protein",
      label: "Protein (g)",
      total: formatNumber(weeklyTotals.protein),
      average: formatNumber(dailyAverage.protein),
      requirement: formatRange(requirements.proteinMinG, requirements.proteinMaxG, "g/day"),
      status: evaluateNutrientTarget(dailyAverage.protein, requirements, "protein"),
    },
    {
      nutrient: "carbohydrates",
      label: "Carbohydrate (g)",
      total: formatNumber(weeklyTotals.carbohydrates),
      average: formatNumber(dailyAverage.carbohydrates),
      requirement: formatRange(requirements.carbohydrateMin, requirements.carbohydrateMax, "g/day"),
      status: evaluateNutrientTarget(dailyAverage.carbohydrates, requirements, "carbohydrates"),
    },
    {
      nutrient: "fat",
      label: "Fat (g)",
      total: formatNumber(weeklyTotals.fat),
      average: formatNumber(dailyAverage.fat),
      requirement: "Not specified",
      status: null,
    },
    {
      nutrient: "fibre",
      label: "Fibre (g)",
      total: formatNumber(weeklyTotals.fibre),
      average: formatNumber(dailyAverage.fibre),
      requirement: "Not specified",
      status: null,
    },
    {
      nutrient: "sodium",
      label: "Salt (g)",
      total: formatSalt(weeklyTotals.sodium),
      average: formatSalt(dailyAverage.sodium),
      requirement:
        requirements.sodiumLimit !== null && requirements.sodiumLimit !== undefined
          ? `≤ ${formatSalt(requirements.sodiumLimit)}/day`
          : "No limit set",
      status: evaluateNutrientTarget(dailyAverage.sodium, requirements, "sodium"),
    },
    {
      nutrient: "potassium",
      label: "Potassium (mg)",
      total: formatPotassiumMg(weeklyTotals.potassium),
      average: formatPotassiumMg(dailyAverage.potassium),
      requirement:
        requirements.potassiumLimitMg != null
          ? `≤ ${formatPotassiumMg(requirements.potassiumLimitMg)}/day`
          : "No limit set",
      status: evaluateNutrientTarget(dailyAverage.potassium, requirements, "potassium"),
    },
    {
      nutrient: "phosphate",
      label: "Phosphorus",
      total: formatNutrient(weeklyTotals.phosphate, "mg"),
      average: formatNutrient(dailyAverage.phosphate, "mg"),
      requirement:
        requirements.phosphateLimitMg != null
          ? `≤ ${formatNumber(requirements.phosphateLimitMg)} mg/day`
          : "No limit set",
      status: evaluateNutrientTarget(dailyAverage.phosphate, requirements, "phosphate"),
    },

    {
      nutrient: "fluid",
      label: "Total fluid (meals + drinks)",
      total: `${formatFluid(weeklyFluidTotal)} ml`,
      average: `${formatFluid(Math.round(weeklyFluidTotal / 7))} ml/day`,
      requirement: fluidAllowanceMl == null ? "No target entered" : `≤ ${fluidAllowanceMl} ml/day`,
      status: evaluateNutrientTarget(weeklyFluidTotal / 7, requirements, "fluid"),
    },
    {
      nutrient: "fluid",
      label: "Personal fluid allowance",
      total: fluidAllowanceMl === null ? "Not set" : `${fluidAllowanceMl.toLocaleString("en-GB", { maximumFractionDigits: 0 })} ml/day`,
      average: fluidAllowanceMl === null ? "Not set" : `${fluidAllowanceMl.toLocaleString("en-GB", { maximumFractionDigits: 0 })} ml/day`,
      requirement: "—",
      status: null,
    },
  ];


  const visibleWeeklySummaryRows = weeklySummaryRows.filter(row => isPersonalisedNutrientVisible(savedDiet, row.nutrient));

  // Extend existing meal totals with saved snack snapshots; never refresh historical nutrition.
  function snackQuality(day?: Day) {
    return snackSummary(snackAccount.snacks, day ? getCurrentWeekDate(days.indexOf(day)) : undefined);
  }
  function incompleteSnacks(day: Day | undefined, key: SnackNutrient) {
    return Boolean(snackAccount.loading || snackAccount.error || snackQuality(day)[key].missing);
  }
  function hasPlannedMeals(day?: Day) {
    return (day ? [day] : days).some(d => mealTypes.some(meal => getRecipe(plannerMeals ?? {}, d, meal)));
  }
  // Estimates are usable numbers. Missing contributions affect certainty,
  // but a known amount above an upper limit is already a definite exceedance.
  function assessedNutrientStatus(day: Day | undefined, key: SnackNutrient, actual: number, _limit?: number | null): Status {
    if (key === "fat" || key === "fibre") return "pending";
    if (!hasPlannedMeals(day) && snackQuality(day)[key].value === null) return "pending";
    return evaluateNutrientTarget(actual, requirements, key, incompleteSnacks(day, key));
  }
  function totalNutrientStatus(day: Day | undefined, key: SnackNutrient): Status {
    return assessedNutrientStatus(day, key, day ? dayTotals[day][key] : dailyAverage[key]);
  }
  // Show known contributions even if another snack lacks this nutrient.
  // An asterisk flags estimates or partial totals; it never implies completeness.
  function flaggedNutrient(text: string, key: SnackNutrient, day?: Day) {
    const quality = snackQuality(day)[key];
    if (quality.missing && !quality.known && !(day ? [day] : days).some(d => mealTypes.some(meal => getRecipe(plannerMeals ?? {}, d, meal)))) return "Not available*";
    return `${text}${quality.estimated || incompleteSnacks(day, key) ? "*" : ""}`;
  }
  function formatDayNutrient(day: Day, key: NutrientKey, unit: "g" | "mg" | "kcal" | "salt") {
    const value = dayTotals[day][key];
    return flaggedNutrient(unit === "salt" ? formatSalt(value) : formatNutrient(value, unit), key, day);
  }
  function formatAverageNutrient(key: NutrientKey, unit: "g" | "mg" | "kcal" | "salt") {
    const value = dailyAverage[key];
    return flaggedNutrient(unit === "salt" ? formatSalt(value) : formatNutrient(value, unit), key);
  }
  function formatSnackNutrient(key: SnackNutrient, unit: "g" | "mg" | "kcal" | "salt", day?: Day) {
    const quality = snackQuality(day)[key];
    if (quality.value === null) return "—";
    const value = quality.value / (day ? 1 : 7);
    return flaggedNutrient(unit === "salt" ? formatSalt(value) : formatNutrient(value, unit), key, day);
  }
  function nutrientLabel(label: string, _key: SnackNutrient, _day?: Day) {
    return <>{label}</>;
  }
  function renderSnackBreakdown(day?: Day, mobile = false) {
    return <div className={mobile ? "mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-200 pt-3 text-xs sm:text-sm" : "min-w-0 space-y-1.5 text-left text-xs"}>
      {nutrientRows.filter(row => isPersonalisedNutrientVisible(savedDiet, row.key)).map(({ key, label, unit }) => <div key={key} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
        <span className="text-slate-500">{nutrientLabel(mobile && key === "carbohydrates" ? "Carbs" : label, key, day)}</span>
        <strong className="min-w-0 break-words text-right text-slate-900">{formatSnackNutrient(key, unit, day)}</strong>
      </div>)}
    </div>;
  }

  weeklySummaryRows.forEach((row, index) => {
    const key = snackNutrients[index];
    if (!key) return;
    row.total = flaggedNutrient(row.total, key);
    row.average = flaggedNutrient(row.average, key);
    row.status = totalNutrientStatus(undefined, key);
  });

  function getDailyStatusForDay(day?: Day): Status {
    if (!hasPlannedMeals(day) && snackNutrients.every(key => snackQuality(day)[key].value === null)) return "pending";
    return getDailyStatus(day ? dayTotals[day] : dailyAverage, requirements, key => incompleteSnacks(day, key));
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
            ref={pdfOptionsDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pdf-options-title"
            aria-describedby="pdf-options-description"
            tabIndex={-1}
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
                <p id="pdf-options-description" className="mt-1 text-sm leading-5 text-slate-600">
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
          html,
          body {
            min-height: 0 !important;
            height: auto !important;
            overflow: visible !important;
          }

          body {
            background: white !important;
          }

          .nutrition-print-main {
            min-height: 0 !important;
            padding: 0 !important;
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
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .nutrition-print-page > * {
            display: none !important;
          }

          .nutrition-print-page > .contents,
          .nutrition-print-page > .contents > #nutrition-main-summary-content {
            display: contents !important;
          }

          .nutrition-print-summary-desktop {
            display: block !important;
          }

          .nutrition-print-page.pdf-show-weekly-summary .nutrition-print-summary,
          .nutrition-print-page.pdf-show-about .nutrition-print-summary,
          .nutrition-print-page.pdf-show-daily-breakdown > .nutrition-print-grid,
          .nutrition-print-page.pdf-show-fluid > .nutrition-print-fluid,
          .nutrition-print-page.pdf-show-about .nutrition-print-about {
            display: block !important;
          }

          .nutrition-print-page:not(.pdf-show-weekly-summary):not(.pdf-show-about) .nutrition-print-summary,
          .nutrition-print-page:not(.pdf-show-daily-breakdown) .nutrition-print-grid,
          .nutrition-print-page:not(.pdf-show-fluid) .nutrition-print-fluid,
          .nutrition-print-page:not(.pdf-show-about) .nutrition-print-about,
          .nutrition-print-page.pdf-show-about:not(.pdf-show-weekly-summary) .nutrition-print-summary-desktop,
          .nutrition-print-page.pdf-show-about:not(.pdf-show-weekly-summary) .nutrition-print-summary > .mb-5,
          .nutrition-print-page.pdf-show-about:not(.pdf-show-weekly-summary) .nutrition-print-summary > .grid > div:first-child {
            display: none !important;
          }

          .nutrition-print-card {
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
          }

          /* Replace the on-screen seven-day grid with readable print tables. */
          .nutrition-print-grid {
            width: 100% !important;
            max-width: none !important;
            overflow: visible !important;
          }

          .nutrition-print-grid > .overflow-x-auto {
            display: none !important;
          }

          .nutrition-print-daily-report {
            display: block !important;
          }

          .nutrition-print-daily-table {
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
          }

          .nutrition-print-daily-table th,
          .nutrition-print-daily-table td {
            border: 1px solid #cbd5e1 !important;
            padding: 3px !important;
            vertical-align: top !important;
            overflow-wrap: anywhere !important;
            font-size: 7pt !important;
          }

          .nutrition-print-daily-table th:first-child {
            width: 18mm !important;
          }

          .nutrition-print-daily-table th:nth-child(2) {
            width: 48mm !important;
          }

          .nutrition-print-day {
            margin-bottom: 5mm !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .nutrition-print-daily-table tr {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .nutrition-print-summary {
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

          .nutrition-print-summary td,
          .nutrition-print-summary th {
            overflow-wrap: anywhere !important;
          }

          .nutrition-print-summary aside {
            margin-top: 16px !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
        html[data-theme="dark"] .nutrition-pdf-button {
          background-color: #e0f2fe !important;
          border-color: #bae6fd !important;
          color: #082f49 !important;
        }

        html[data-theme="dark"] .nutrition-pdf-button:hover {
          background-color: #bae6fd !important;
        }

        html[data-theme="dark"] .nutrition-main-summary-toggle {
          background-color: #263b4c !important;
          border-color: #40566a !important;
          color: #edf4fb !important;
        }

        html[data-theme="dark"] .nutrition-main-summary-toggle:hover {
          background-color: #30495c !important;
        }

        @media screen and (min-width: 768px) {
          .nutrition-week-table .nutrition-meal-column { width: 88px; }
          .nutrition-week-table th, .nutrition-week-table td { padding-left: 6px; padding-right: 6px; }
          .nutrition-week-table .text-xs { font-size: 11px; }
          .nutrition-week-table .nutrition-nutrient-line > :first-child { min-width: 0; overflow-wrap: anywhere; }
          .nutrition-week-table .nutrition-nutrient-line > :last-child { flex-shrink: 0; white-space: nowrap; }
        }
        @media screen and (min-width: 768px) and (max-width: 1399px) {
          .nutrition-week-table .nutrition-nutrient-line { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; }
          .nutrition-week-table .nutrition-nutrient-line > :last-child { justify-self: end; }
        }

        .nutrition-pdf-shimmer {
          animation: nutrition-pdf-shimmer 2.6s ease-in-out infinite;
          opacity: 0.9;
        }

        @keyframes nutrition-pdf-shimmer {
          0%, 52% {
            transform: translateX(-180%) skewX(-20deg);
          }
          68%, 100% {
            transform: translateX(260%) skewX(-20deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .nutrition-pdf-shimmer {
            animation: none;
          }
        }
      `}</style>

      <main className="nutrition-print-main min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-5 md:px-6 md:py-6">
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
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-pink-600 shadow-sm ring-1 ring-pink-100">
                        <MealIcon type={meal} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-pink-700">
                          {meal}
                        </p>
                        <h3 className="mt-0.5 break-words font-bold leading-snug text-slate-900">
                          {recipe?.name ?? "No meal planned"}
                        </h3>
                      </div>
                    </div>

                    {recipe && (
                      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-200 pt-3 text-xs sm:text-sm">
                        <div className="flex min-w-0 items-center justify-between gap-2">
                          <span className="text-slate-500">Energy</span>
                          <strong className="shrink-0 text-slate-900">{formatNutrient(totals.calories, "kcal")}</strong>
                        </div>
                        <div className="flex min-w-0 items-center justify-between gap-2">
                          <span className="text-slate-500">Protein</span>
                          <strong className="shrink-0 text-slate-900">{formatNutrient(totals.protein, "g")}</strong>
                        </div>
                        <div className="flex min-w-0 items-center justify-between gap-2">
                          <span className="text-slate-500">Carbs</span>
                          <strong className="shrink-0 text-slate-900">{formatNutrient(totals.carbohydrates, "g")}</strong>
                        </div>
                        <div className="flex min-w-0 items-center justify-between gap-2">
                          <span className="text-slate-500">Fat</span>
                          <strong className="shrink-0 text-slate-900">{formatNutrient(totals.fat, "g")}</strong>
                        </div>
                        <div className="flex min-w-0 items-center justify-between gap-2">
                          <span className="text-slate-500">Fibre</span>
                          <strong className="shrink-0 text-slate-900">{formatNutrient(totals.fibre, "g")}</strong>
                        </div>
                        <div className="flex min-w-0 items-center justify-between gap-2">
                          <span className="text-slate-500">Salt</span>
                          <strong className="shrink-0 text-slate-900">{formatSalt(totals.sodium)}</strong>
                        </div>
                        <div className="flex min-w-0 items-center justify-between gap-2">
                          <span className="text-slate-500">Potassium</span>
                          <strong className="shrink-0 text-slate-900">{formatNutrient(totals.potassium, "mg")}</strong>
                        </div>
                        <div className="flex min-w-0 items-center justify-between gap-2">
                          <span className="text-slate-500">Phosphorus</span>
                          <strong className="shrink-0 text-slate-900">{formatNutrient(totals.phosphate, "mg")}</strong>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4"><h3 className="font-bold text-slate-900">Snacks</h3>{renderSnackBreakdown(selectedDay, true)}</section>
            <div className="nutrition-mobile-daily-total mt-4 rounded-2xl bg-slate-50 p-4">
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

              <div className="mt-3 grid grid-cols-1 gap-y-2 text-xs sm:text-sm">
                {isPersonalisedNutrientVisible(savedDiet, "calories") && (<div title={getStatusText(totalNutrientStatus(selectedDay, "calories"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                  <span className="min-w-0 text-slate-500">{nutrientLabel("Energy", "calories", selectedDay)}</span>
                  <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                    <NutritionStatusDot status={totalNutrientStatus(selectedDay, "calories")} />
                    {formatDayNutrient(selectedDay, "calories", "kcal")}
                  </span>
                </div>)}

                {isPersonalisedNutrientVisible(savedDiet, "protein") && (<div title={getStatusText(totalNutrientStatus(selectedDay, "protein"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                  <span className="min-w-0 text-slate-500">{nutrientLabel("Protein", "protein", selectedDay)}</span>
                  <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                    <NutritionStatusDot status={totalNutrientStatus(selectedDay, "protein")} />
                    {formatDayNutrient(selectedDay, "protein", "g")}
                  </span>
                </div>)}

                {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<div title={getStatusText(totalNutrientStatus(selectedDay, "carbohydrates"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                  <span className="min-w-0 text-slate-500">{nutrientLabel("Carbohydrate", "carbohydrates", selectedDay)}</span>
                  <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                    <NutritionStatusDot status={totalNutrientStatus(selectedDay, "carbohydrates")} />
                    {formatDayNutrient(selectedDay, "carbohydrates", "g")}
                  </span>
                </div>)}

                {isPersonalisedNutrientVisible(savedDiet, "fat") && (<div title={getStatusText(totalNutrientStatus(selectedDay, "fat"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                  <span className="min-w-0 text-slate-500">{nutrientLabel("Fat", "fat", selectedDay)}</span>
                  <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                    <NutritionStatusDot status={totalNutrientStatus(selectedDay, "fat")} />
                    {formatDayNutrient(selectedDay, "fat", "g")}
                  </span>
                </div>)}

                {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<div title={getStatusText(totalNutrientStatus(selectedDay, "fibre"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                  <span className="min-w-0 text-slate-500">{nutrientLabel("Fibre", "fibre", selectedDay)}</span>
                  <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                    <NutritionStatusDot status={totalNutrientStatus(selectedDay, "fibre")} />
                    {formatDayNutrient(selectedDay, "fibre", "g")}
                  </span>
                </div>)}

                {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<div title={getStatusText(totalNutrientStatus(selectedDay, "sodium"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                  <span className="min-w-0 text-slate-500">{nutrientLabel("Salt (g)", "sodium", selectedDay)}</span>
                  <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                    <NutritionStatusDot status={totalNutrientStatus(selectedDay, "sodium")} />
                    {formatDayNutrient(selectedDay, "sodium", "salt")}
                  </span>
                </div>)}

                {isPersonalisedNutrientVisible(savedDiet, "potassium") && (<div title={getStatusText(totalNutrientStatus(selectedDay, "potassium"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                  <span className="min-w-0 text-slate-500">{nutrientLabel("Potassium", "potassium", selectedDay)}</span>
                  <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                    <NutritionStatusDot status={totalNutrientStatus(selectedDay, "potassium")} />
                    {formatDayNutrient(selectedDay, "potassium", "mg")}
                  </span>
                </div>)}

                {isPersonalisedNutrientVisible(savedDiet, "phosphate") && (<div title={getStatusText(totalNutrientStatus(selectedDay, "phosphate"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                  <span className="min-w-0 text-slate-500">{nutrientLabel("Phosphorus", "phosphate", selectedDay)}</span>
                  <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                    <NutritionStatusDot status={totalNutrientStatus(selectedDay, "phosphate")} />
                    {formatDayNutrient(selectedDay, "phosphate", "mg")}
                  </span>
                </div>)}


              </div>
            </div>

            {/* MOBILE FLUID INTAKE: follows the selected day, like the meal and daily-total cards above. */}
            {isPersonalisedNutrientVisible(savedDiet, "fluid") && (<section className="nutrition-mobile-fluid mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-pink-700">Fluid intake</p>
                  <p className="mt-1 text-sm text-slate-500">Meals + drinks recorded</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-slate-900">
                    {formatFluid(totalFluidForDayIndex(days.indexOf(selectedDay)))} ml
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{selectedDay}</p>
                </div>
              </div>
              {fluidAllowanceMl !== null && (
                <p className="mt-3 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">
                  Personal allowance saved in My Diet: {fluidAllowanceMl.toLocaleString("en-GB", { maximumFractionDigits: 0 })} ml/day.
                </p>
              )}
            </section>)}
          </section>

          {/* DESKTOP WEEKLY GRID */}
          <section className="nutrition-print-grid nutrition-print-card mb-7 hidden overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 md:block">
            <div className="nutrition-print-daily-report hidden">
              {days.map((day) => {


                return (
                  <section key={day} className="nutrition-print-day">
                    <h3 className="mb-2 text-base font-bold text-slate-900">{day}</h3>
                    <table className="nutrition-print-daily-table">
                      <thead>
                        <tr className="bg-slate-100 text-left">
                          <th>Meal</th>
                          <th>Planned recipe</th>
                          {isPersonalisedNutrientVisible(savedDiet, "calories") && (<th>Energy</th>)}
                          {isPersonalisedNutrientVisible(savedDiet, "protein") && (<th>Protein</th>)}
                          {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<th>Carbohydrate</th>)}
                          {isPersonalisedNutrientVisible(savedDiet, "fat") && (<th>Fat</th>)}
                          {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<th>Fibre</th>)}
                          {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<th>Salt</th>)}
                          {isPersonalisedNutrientVisible(savedDiet, "potassium") && (<th>Potassium</th>)}
                          {isPersonalisedNutrientVisible(savedDiet, "phosphate") && (<th>Phosphorus</th>)}

                        </tr>
                      </thead>
                      <tbody>
                        {mealTypes.map((meal) => {
                          const recipe = getRecipe(plannerMeals, day, meal);
                          const totals = getMealTotals(recipe);

                          return (
                            <tr key={`${day}-${meal}`}>
                              <th className="text-left">{meal}</th>
                              <td>{recipe?.name ?? "No meal planned"}</td>
                              {isPersonalisedNutrientVisible(savedDiet, "calories") && (<td>{recipe ? formatNutrient(totals.calories, "kcal") : "—"}</td>)}
                              {isPersonalisedNutrientVisible(savedDiet, "protein") && (<td>{recipe ? formatNutrient(totals.protein, "g") : "—"}</td>)}
                              {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<td>{recipe ? formatNutrient(totals.carbohydrates, "g") : "—"}</td>)}
                              {isPersonalisedNutrientVisible(savedDiet, "fat") && (<td>{recipe ? formatNutrient(totals.fat, "g") : "—"}</td>)}
                              {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<td>{recipe ? formatNutrient(totals.fibre, "g") : "—"}</td>)}
                              {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<td>{recipe ? formatSalt(totals.sodium) : "—"}</td>)}
                              {isPersonalisedNutrientVisible(savedDiet, "potassium") && (<td>{recipe ? formatPotassiumMg(totals.potassium) : "—"}</td>)}
                              {isPersonalisedNutrientVisible(savedDiet, "phosphate") && (<td>{recipe ? formatNutrient(totals.phosphate, "mg") : "—"}</td>)}

                            </tr>
                          );
                        })}
                        <tr><th className="text-left">Snacks</th><td>All planned snacks</td>{nutrientRows.filter(row => isPersonalisedNutrientVisible(savedDiet, row.key)).map(({key, unit}) => <td key={key}>{formatSnackNutrient(key, unit, day)}</td>)}</tr>
                        <tr className="bg-green-50 font-bold">
                          <th className="text-left">Daily total</th>
                          <td>All planned meals and snacks</td>
                          {isPersonalisedNutrientVisible(savedDiet, "calories") && (<td>{formatDayNutrient(day, "calories", "kcal")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "protein") && (<td>{formatDayNutrient(day, "protein", "g")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<td>{formatDayNutrient(day, "carbohydrates", "g")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "fat") && (<td>{formatDayNutrient(day, "fat", "g")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<td>{formatDayNutrient(day, "fibre", "g")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<td>{formatDayNutrient(day, "sodium", "salt")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "potassium") && (<td>{formatDayNutrient(day, "potassium", "mg")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "phosphate") && (<td>{formatDayNutrient(day, "phosphate", "mg")}</td>)}

                        </tr>
                      </tbody>
                    </table>

                  </section>
                );
              })}

              <section className="nutrition-print-day">
                <h3 className="mb-2 text-base font-bold text-slate-900">Daily averages</h3>
                <table className="nutrition-print-daily-table">
                  <thead>
                    <tr className="bg-slate-100 text-left">
                      <th>Meal</th>
                      <th>Planned recipe</th>
                      {isPersonalisedNutrientVisible(savedDiet, "calories") && (<th>Energy</th>)}
                      {isPersonalisedNutrientVisible(savedDiet, "protein") && (<th>Protein</th>)}
                      {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<th>Carbohydrate</th>)}
                      {isPersonalisedNutrientVisible(savedDiet, "fat") && (<th>Fat</th>)}
                      {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<th>Fibre</th>)}
                      {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<th>Salt</th>)}
                      {isPersonalisedNutrientVisible(savedDiet, "potassium") && (<th>Potassium</th>)}
                      {isPersonalisedNutrientVisible(savedDiet, "phosphate") && (<th>Phosphorus</th>)}

                    </tr>
                  </thead>
                  <tbody>
                    {mealTypes.map((meal) => {

                      const average = emptyTotals();

                      days.forEach((day) => {
                        addTotals(average, getMealTotals(getRecipe(plannerMeals, day, meal)));
                      });
                      (Object.keys(average) as NutrientKey[]).forEach((key) => {
                        average[key] /= 7;
                      });


                      return (
                        <tr key={`average-${meal}`}>
                          <th className="text-left">{meal}</th>
                          <td>Weekly average per {meal.toLowerCase()}</td>
                          {isPersonalisedNutrientVisible(savedDiet, "calories") && (<td>{formatNutrient(average.calories, "kcal")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "protein") && (<td>{formatNutrient(average.protein, "g")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<td>{formatNutrient(average.carbohydrates, "g")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "fat") && (<td>{formatNutrient(average.fat, "g")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<td>{formatNutrient(average.fibre, "g")}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<td>{formatSalt(average.sodium)}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "potassium") && (<td>{formatPotassiumMg(average.potassium)}</td>)}
                          {isPersonalisedNutrientVisible(savedDiet, "phosphate") && (<td>{formatNutrient(average.phosphate, "mg")}</td>)}

                        </tr>
                      );
                    })}
                    <tr className="bg-blue-50 font-bold">
                      <th className="text-left">Daily total</th>
                      <td>Average across the week</td>
                      {isPersonalisedNutrientVisible(savedDiet, "calories") && (<td>{formatAverageNutrient("calories", "kcal")}</td>)}
                      {isPersonalisedNutrientVisible(savedDiet, "protein") && (<td>{formatAverageNutrient("protein", "g")}</td>)}
                      {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<td>{formatAverageNutrient("carbohydrates", "g")}</td>)}
                      {isPersonalisedNutrientVisible(savedDiet, "fat") && (<td>{formatAverageNutrient("fat", "g")}</td>)}
                      {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<td>{formatAverageNutrient("fibre", "g")}</td>)}
                      {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<td>{formatAverageNutrient("sodium", "salt")}</td>)}
                      {isPersonalisedNutrientVisible(savedDiet, "potassium") && (<td>{formatAverageNutrient("potassium", "mg")}</td>)}
                      {isPersonalisedNutrientVisible(savedDiet, "phosphate") && (<td>{formatAverageNutrient("phosphate", "mg")}</td>)}

                    </tr>
                  </tbody>
                </table>
              </section>
            </div>

            <div className="overflow-x-auto">
              <table className="nutrition-week-table w-full table-fixed border-collapse">
                <colgroup><col className="nutrition-meal-column" /><col span={8} /></colgroup>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-3 py-4 text-left text-sm font-bold text-slate-700">
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
                              <div className="min-w-0 space-y-1.5 text-left text-xs">
                                {isPersonalisedNutrientVisible(savedDiet, "calories") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Energy</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.calories, "kcal")}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "protein") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Protein</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.protein, "g")}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Carbohydrate</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.carbohydrates, "g")}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "fat") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Fat</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.fat, "g")}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Fibre</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.fibre, "g")}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Salt (g)</span>
                                  <strong className="text-slate-900">
                                    {formatSalt(totals.sodium)}
                                  </strong>
                                </div>)}

                                <div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Potassium</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.potassium, "mg")}
                                  </strong>
                                </div>

                                <div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Phosphorus</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(totals.phosphate, "mg")}
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
                        <div className="min-w-0 space-y-1.5 text-left text-xs">
                          {(() => {


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


                            return (
                              <>
                                {isPersonalisedNutrientVisible(savedDiet, "calories") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Energy</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.calories, "kcal")}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "protein") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Protein</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.protein, "g")}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Carbohydrate</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.carbohydrates, "g")}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "fat") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Fat</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.fat, "g")}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Fibre</span>
                                  <strong className="text-slate-900">
                                    {formatNutrient(average.fibre, "g")}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                  <span className="text-slate-500">Salt (g)</span>
                                  <strong className="text-slate-900">
                                    {formatSalt(average.sodium)}
                                  </strong>
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "potassium") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
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
                                </div>)}

                                {isPersonalisedNutrientVisible(savedDiet, "phosphate") && (<div className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
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
                                </div>)}


                              </>
                            );
                          })()}
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr className="border-b border-slate-200">
                    <td className="px-5 py-5 align-top"><span className="font-bold text-slate-900">Snacks</span></td>
                    {days.map(day => <td key={day} className="px-2 py-5 align-top text-center">{renderSnackBreakdown(day)}</td>)}
                    <td className="nutrition-weekly-average border-l-2 border-blue-200 bg-blue-50 px-2 py-5 align-top">{renderSnackBreakdown()}</td>
                  </tr>
                  <tr className="bg-slate-50">
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
                          <div className="min-w-0 space-y-1.5 text-left text-xs">
                            {(() => {


                              return (
                                <>
                                  {isPersonalisedNutrientVisible(savedDiet, "calories") && (<div title={getStatusText(totalNutrientStatus(day, "calories"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                    <span className="min-w-0 text-slate-500">{nutrientLabel("Energy", "calories", day)}</span>
                                    <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                      <NutritionStatusDot status={totalNutrientStatus(day, "calories")} />
                                      {formatDayNutrient(day, "calories", "kcal")}
                                    </span>
                                  </div>)}

                                  {isPersonalisedNutrientVisible(savedDiet, "protein") && (<div title={getStatusText(totalNutrientStatus(day, "protein"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                    <span className="min-w-0 text-slate-500">{nutrientLabel("Protein", "protein", day)}</span>
                                    <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                      <NutritionStatusDot status={totalNutrientStatus(day, "protein")} />
                                      {formatDayNutrient(day, "protein", "g")}
                                    </span>
                                  </div>)}

                                  {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<div title={getStatusText(totalNutrientStatus(day, "carbohydrates"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                    <span className="min-w-0 text-slate-500">{nutrientLabel("Carbohydrate", "carbohydrates", day)}</span>
                                    <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                      <NutritionStatusDot status={totalNutrientStatus(day, "carbohydrates")} />
                                      {formatDayNutrient(day, "carbohydrates", "g")}
                                    </span>
                                  </div>)}

                                  {isPersonalisedNutrientVisible(savedDiet, "fat") && (<div title={getStatusText(totalNutrientStatus(day, "fat"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                    <span className="min-w-0 text-slate-500">{nutrientLabel("Fat", "fat", day)}</span>
                                    <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                      <NutritionStatusDot status={totalNutrientStatus(day, "fat")} />
                                      {formatDayNutrient(day, "fat", "g")}
                                    </span>
                                  </div>)}

                                  {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<div title={getStatusText(totalNutrientStatus(day, "fibre"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                    <span className="min-w-0 text-slate-500">{nutrientLabel("Fibre", "fibre", day)}</span>
                                    <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                      <NutritionStatusDot status={totalNutrientStatus(day, "fibre")} />
                                      {formatDayNutrient(day, "fibre", "g")}
                                    </span>
                                  </div>)}

                                  {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<div title={getStatusText(totalNutrientStatus(day, "sodium"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                    <span className="min-w-0 text-slate-500">{nutrientLabel("Salt (g)", "sodium", day)}</span>
                                    <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                      <NutritionStatusDot status={totalNutrientStatus(day, "sodium")} />
                                      {formatDayNutrient(day, "sodium", "salt")}
                                    </span>
                                  </div>)}

                                  {isPersonalisedNutrientVisible(savedDiet, "potassium") && (<div title={getStatusText(totalNutrientStatus(day, "potassium"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                    <span className="min-w-0 text-slate-500">{nutrientLabel("Potassium", "potassium", day)}</span>
                                    <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                      <NutritionStatusDot status={totalNutrientStatus(day, "potassium")} />
                                      {formatDayNutrient(day, "potassium", "mg")}
                                    </span>
                                  </div>)}

                                  {isPersonalisedNutrientVisible(savedDiet, "phosphate") && (<div title={getStatusText(totalNutrientStatus(day, "phosphate"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                    <span className="min-w-0 text-slate-500">{nutrientLabel("Phosphorus", "phosphate", day)}</span>
                                    <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                      <NutritionStatusDot status={totalNutrientStatus(day, "phosphate")} />
                                      {formatDayNutrient(day, "phosphate", "mg")}
                                    </span>
                                  </div>)}


                                </>
                              );
                            })()}
                          </div>
                        </td>
                      );
                    })}

                    <td className="nutrition-weekly-average border-l-2 border-blue-200 bg-blue-50 px-2 py-5 align-top">
                      <div className="min-w-0 space-y-1.5 text-left text-xs">
                        {(() => {


                          return (
                            <>
                              {isPersonalisedNutrientVisible(savedDiet, "calories") && (<div title={getStatusText(totalNutrientStatus(undefined, "calories"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                <span className="min-w-0 text-slate-500">{nutrientLabel("Energy", "calories")}</span>
                                <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                  <NutritionStatusDot status={totalNutrientStatus(undefined, "calories")} />
                                  {formatAverageNutrient("calories", "kcal")}
                                </span>
                              </div>)}

                              {isPersonalisedNutrientVisible(savedDiet, "protein") && (<div title={getStatusText(totalNutrientStatus(undefined, "protein"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                <span className="min-w-0 text-slate-500">{nutrientLabel("Protein", "protein")}</span>
                                <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                  <NutritionStatusDot status={totalNutrientStatus(undefined, "protein")} />
                                  {formatAverageNutrient("protein", "g")}
                                </span>
                              </div>)}

                              {isPersonalisedNutrientVisible(savedDiet, "carbohydrates") && (<div title={getStatusText(totalNutrientStatus(undefined, "carbohydrates"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                <span className="min-w-0 text-slate-500">{nutrientLabel("Carbohydrate", "carbohydrates")}</span>
                                <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                  <NutritionStatusDot status={totalNutrientStatus(undefined, "carbohydrates")} />
                                  {formatAverageNutrient("carbohydrates", "g")}
                                </span>
                              </div>)}

                              {isPersonalisedNutrientVisible(savedDiet, "fat") && (<div title={getStatusText(totalNutrientStatus(undefined, "fat"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                <span className="min-w-0 text-slate-500">{nutrientLabel("Fat", "fat")}</span>
                                <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                  <NutritionStatusDot status={totalNutrientStatus(undefined, "fat")} />
                                  {formatAverageNutrient("fat", "g")}
                                </span>
                              </div>)}

                              {isPersonalisedNutrientVisible(savedDiet, "fibre") && (<div title={getStatusText(totalNutrientStatus(undefined, "fibre"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                <span className="min-w-0 text-slate-500">{nutrientLabel("Fibre", "fibre")}</span>
                                <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                  <NutritionStatusDot status={totalNutrientStatus(undefined, "fibre")} />
                                  {formatAverageNutrient("fibre", "g")}
                                </span>
                              </div>)}

                              {isPersonalisedNutrientVisible(savedDiet, "sodium") && (<div title={getStatusText(totalNutrientStatus(undefined, "sodium"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                <span className="min-w-0 text-slate-500">{nutrientLabel("Salt (g)", "sodium")}</span>
                                <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                  <NutritionStatusDot status={totalNutrientStatus(undefined, "sodium")} />
                                  {formatAverageNutrient("sodium", "salt")}
                                </span>
                              </div>)}

                              {isPersonalisedNutrientVisible(savedDiet, "potassium") && (<div title={getStatusText(totalNutrientStatus(undefined, "potassium"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                <span className="min-w-0 text-slate-500">{nutrientLabel("Potassium", "potassium")}</span>
                                <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                  <NutritionStatusDot status={totalNutrientStatus(undefined, "potassium")} />
                                  {formatAverageNutrient("potassium", "mg")}
                                </span>
                              </div>)}

                              {isPersonalisedNutrientVisible(savedDiet, "phosphate") && (<div title={getStatusText(totalNutrientStatus(undefined, "phosphate"))} className="nutrition-nutrient-line flex min-w-0 items-center justify-between gap-1">
                                <span className="min-w-0 text-slate-500">{nutrientLabel("Phosphorus", "phosphate")}</span>
                                <span className="flex shrink-0 items-center justify-end gap-1 whitespace-nowrap font-semibold text-slate-900">
                                  <NutritionStatusDot status={totalNutrientStatus(undefined, "phosphate")} />
                                  {formatAverageNutrient("phosphate", "mg")}
                                </span>
                              </div>)}


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

          {isPersonalisedNutrientVisible(savedDiet, "fluid") && (<section className="nutrition-print-fluid nutrition-print-card mb-6 hidden w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-600 dark:bg-slate-800 md:block">
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
                            <p className="text-lg font-extrabold text-slate-900 dark:text-white">{formatFluid(total)} ml</p>
                            <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-300">{day}</p>
                            <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-300">Meals {formatFluid(meals)} ml · Drinks {drinks.toLocaleString("en-GB", { maximumFractionDigits: 0 })} ml</p>
                          </div>
                        </td>
                      );
                    })}
                    <td className="border-l-2 border-slate-200 bg-slate-50 px-2 py-4 text-center align-top dark:border-slate-600 dark:bg-slate-700">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">Weekly daily average</p>
                      <p className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">{formatFluid(Math.round(weeklyFluidTotal / 7))} ml/day</p>
                    </td>
                  </tr>
                  {fluidAllowanceMl !== null && (
                    <tr>
                      <td colSpan={9} className="px-2 pt-2 text-xs leading-5 text-slate-500 dark:text-slate-300">
                        Personal allowance saved in My Diet: {fluidAllowanceMl.toLocaleString("en-GB", { maximumFractionDigits: 0 })} ml/day. This is your saved setting, not a target recommended by RenalPlan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>)}

          <div className="contents">
            <button
              type="button"
              id="nutrition-main-summary-toggle"
              aria-controls="nutrition-main-summary-content"
              aria-expanded={mainSummaryOpen}
              onClick={() => setMainSummaryOpen((open) => !open)}
              className="nutrition-main-summary-toggle nutrition-print-hidden mb-3 flex w-full items-center justify-between rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-left text-base font-bold text-green-900 shadow-sm transition hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 md:hidden"
            >
              <span>Main Summary</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`h-5 w-5 transition-transform ${mainSummaryOpen ? "rotate-180" : ""}`}
              >
                <path d="m5 7.5 5 5 5-5" />
              </svg>
            </button>

            <div
              id="nutrition-main-summary-content"
              className={mainSummaryOpen ? "contents" : "hidden md:contents"}
            >
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

            <div className="grid gap-5 xl:grid-cols-[minmax(0,800px)_minmax(320px,360px)] xl:justify-start">
              <div className="min-w-0">
                <div className="nutrition-print-summary-desktop hidden overflow-x-auto md:block">
                  <table className="w-full max-w-[800px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-left">
                        <th className="px-3 py-3 font-bold text-slate-700">Nutrient</th>
                        <th className="px-3 py-3 font-bold text-slate-700">Weekly total</th>
                        <th className="px-3 py-3 font-bold text-slate-700">Daily average</th>
                        <th className="px-2 py-3 font-bold text-slate-700">Daily target</th>
                        <th className="px-2 py-3 font-bold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleWeeklySummaryRows.map((row) => (
                        <tr key={row.label} className="border-b border-slate-100 last:border-b-0">
                          <td className="px-3 py-3 font-semibold text-slate-900">{row.label}</td>
                          <td className="px-3 py-3 text-slate-700">{row.total}</td>
                          <td className="px-3 py-3 text-slate-700">{row.average}</td>
                          <td className="px-2 py-3 text-slate-700">{row.requirement}</td>
                          <td className="px-2 py-3"><NutritionStatusLabel status={row.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="nutrition-print-hidden divide-y divide-slate-200 md:hidden">
                  {visibleWeeklySummaryRows.map((row) => (
                    <article key={row.label} className="py-2.5 first:pt-0 last:pb-0">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                        <div className="min-w-0">
                          <h3 className="break-words text-sm font-semibold leading-5 text-slate-900">{row.label}</h3>
                          {row.status && <NutritionStatusLabel status={row.status} />}
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] leading-4 text-slate-500">Daily average</div>
                          <div className="text-sm font-bold leading-5 text-slate-900">{row.average}</div>
                        </div>
                      </div>
                      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-xs leading-4">
                        <span className="min-w-0 break-words">
                          <span className="text-slate-500">Weekly: </span>
                          <span className="font-medium text-slate-700">{row.total}</span>
                        </span>
                        <span className="min-w-0 break-words text-slate-600">
                          <span className="text-slate-500">Target: </span>
                          <span className="font-medium text-slate-700">{row.requirement}</span>
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <aside className="nutrition-print-about h-full rounded-2xl bg-green-50 p-4">
                {!showLoginOverlay && (
                <div className="nutrition-print-hidden mb-4 lg:hidden">
                  <button
                    type="button"
                    onClick={(event) => {
                      pdfOptionsReturnFocusRef.current = event.currentTarget;
                      setShowPdfOptions(true);
                    }}
                    className="nutrition-pdf-button relative w-full overflow-hidden rounded-xl border border-sky-200 bg-sky-100 px-4 py-2.5 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-sky-200"
                  >
                    <span className="relative z-10">🖨️ Print / Save as PDF</span>
                    <span
                      aria-hidden="true"
                      className="nutrition-pdf-shimmer pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/95 to-transparent"
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
                  red means it exceeds the saved limit. Energy and carbohydrate ranges use Below target, Within target or Exceeds target; amber indicates below the minimum. Individual meal
                  figures are shown for information only and are not judged
                  against the full daily allowance. Potassium is displayed
                  in mg from food data, phosphorus in mg and salt in g.
                </p>
              </aside>
            </div>
          </section>


          <p className="nutrition-print-hidden mx-auto mt-5 max-w-5xl text-center text-xs leading-5 text-slate-500">
            RenalPlan nutrition figures are intended as a
            planning aid and should not replace advice from your
            renal or healthcare team. Calculations follow the recorded source mappings,
            quantity conversions and approved estimation assumptions; they are not
            measured plate values. Clinical suitability, dietary guidance and qualitative
            classifications remain pending qualified renal dietitian review. A dash means nutrition is unavailable or incomplete, never zero. Affected daily and weekly totals cannot be assessed against your goals. These estimates do not establish personal dietary suitability.
          </p>
            </div>
          </div>
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


