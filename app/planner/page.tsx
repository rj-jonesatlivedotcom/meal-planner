"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { recipes } from "@/data/RecipeData";
import { createClient } from "@/lib/supabase/client";
import { getStoredRequirements, recipeMatchesRequirements, type Requirements } from "@/lib/recipeRequirements";

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

type FluidEntry = {
  id: string;
  date: string;
  drink: string;
  amountMl: number;
  createdAt: string;
};

const FLUID_LOG_STORAGE_KEY = "renalplan-fluid-log-v1";

function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readFluidLog(): FluidEntry[] {
  try {
    const value = localStorage.getItem(FLUID_LOG_STORAGE_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((entry) =>
      entry && typeof entry.id === "string" && typeof entry.date === "string" &&
      typeof entry.drink === "string" && Number.isFinite(Number(entry.amountMl))
    ) : [];
  } catch {
    return [];
  }
}


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
  const [isDiceRolling, setIsDiceRolling] =
    useState(false);

  const [requirements, setRequirements] =
    useState<Requirements | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [premiumPrompt, setPremiumPrompt] =
    useState<"pick" | "people" | null>(null);
  const [accountSyncReady, setAccountSyncReady] = useState(false);
  const [accountUserId, setAccountUserId] = useState<string | null>(null);
  const [fluidModalOpen, setFluidModalOpen] = useState(false);
  const [fluidEntries, setFluidEntries] = useState<FluidEntry[]>([]);
  const [fluidDate, setFluidDate] = useState(getLocalDateKey());
  const [fluidDrink, setFluidDrink] = useState("Water");
  const [fluidCustomDrink, setFluidCustomDrink] = useState("");
  const [fluidAmount, setFluidAmount] = useState("200");
  const [fluidAllowanceMl, setFluidAllowanceMl] = useState<number | null>(null);

  useEffect(() => {
    setFluidEntries(readFluidLog());
    let cancelled = false;
    async function loadCloudFluidLog() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || cancelled) return;
        const { data, error } = await supabase
          .from("user_fluid_entries")
          .select("id, consumed_on, drink, amount_ml, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true });
        if (error || cancelled || !data) return;
        const cloudEntries: FluidEntry[] = data.map((row: { id: string; consumed_on: string; drink: string; amount_ml: number; created_at: string }) => ({
          id: row.id, date: row.consumed_on, drink: row.drink, amountMl: row.amount_ml, createdAt: row.created_at,
        }));
        const localEntries = readFluidLog();
        const byId = new Map<string, FluidEntry>();
        [...cloudEntries, ...localEntries].forEach((entry) => byId.set(entry.id, entry));
        const merged = [...byId.values()];
        setFluidEntries(merged);
        localStorage.setItem(FLUID_LOG_STORAGE_KEY, JSON.stringify(merged));
        const localOnly = localEntries.filter((entry) => !cloudEntries.some((cloud) => cloud.id === entry.id));
        if (localOnly.length) {
          await supabase.from("user_fluid_entries").upsert(localOnly.map((entry) => ({
            id: entry.id, user_id: user.id, consumed_on: entry.date, drink: entry.drink, amount_ml: entry.amountMl, created_at: entry.createdAt,
          })), { onConflict: "id" });
        }
      } catch { /* Browser storage remains available if cloud sync is unavailable. */ }
    }
    void loadCloudFluidLog();
    try {
      const saved = localStorage.getItem("meal-planner-requirements");
      if (saved) {
        const parsed = JSON.parse(saved);
        const allowance = Number(parsed?.fluidLimitMl);
        setFluidAllowanceMl(parsed?.fluidLimitMl != null && Number.isFinite(allowance) ? allowance : null);
      }
    } catch { /* Keep the allowance unset if saved settings are unreadable. */ }
    const reloadFluid = () => setFluidEntries(readFluidLog());
    const reloadRequirements = () => {
      try {
        const saved = localStorage.getItem("meal-planner-requirements");
        const parsed = saved ? JSON.parse(saved) : {};
        const allowance = Number(parsed?.fluidLimitMl);
        setFluidAllowanceMl(parsed?.fluidLimitMl != null && Number.isFinite(allowance) ? allowance : null);
      } catch { setFluidAllowanceMl(null); }
    };
    window.addEventListener("renalplan-fluid-log-updated", reloadFluid);
    window.addEventListener("meal-planner-requirements-updated", reloadRequirements);
    window.addEventListener("storage", reloadFluid);
    return () => {
      cancelled = true;
      window.removeEventListener("renalplan-fluid-log-updated", reloadFluid);
      window.removeEventListener("meal-planner-requirements-updated", reloadRequirements);
      window.removeEventListener("storage", reloadFluid);
    };
  }, []);

  function saveFluidEntries(nextEntries: FluidEntry[]) {
    const previousEntries = fluidEntries;
    setFluidEntries(nextEntries);
    localStorage.setItem(FLUID_LOG_STORAGE_KEY, JSON.stringify(nextEntries));
    window.dispatchEvent(new Event("renalplan-fluid-log-updated"));
    void (async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const retainedIds = new Set(nextEntries.map((entry) => entry.id));
        const removedIds = previousEntries.filter((entry) => !retainedIds.has(entry.id)).map((entry) => entry.id);
        if (removedIds.length) {
          await supabase.from("user_fluid_entries").delete().eq("user_id", user.id).in("id", removedIds);
        }
        if (nextEntries.length) {
          await supabase.from("user_fluid_entries").upsert(nextEntries.map((entry) => ({
            id: entry.id, user_id: user.id, consumed_on: entry.date, drink: entry.drink, amount_ml: entry.amountMl, created_at: entry.createdAt,
          })), { onConflict: "id" });
        }
      } catch { /* Keep the local log; cloud sync can retry on a later save. */ }
    })();
  }

  function addFluidEntry() {
    const amount = Number(fluidAmount);
    const drink = fluidDrink === "Other" ? fluidCustomDrink.trim() : fluidDrink;
    if (!drink || !Number.isFinite(amount) || amount <= 0 || amount > 10000) return;
    const entry: FluidEntry = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => { const random = Math.random() * 16 | 0; return (char === "x" ? random : (random & 0x3 | 0x8)).toString(16); }),
      date: fluidDate,
      drink,
      amountMl: Math.round(amount),
      createdAt: new Date().toISOString(),
    };
    saveFluidEntries([...fluidEntries, entry]);
    setFluidAmount("200");
    setFluidCustomDrink("");
    setFluidDrink("Water");
  }

  function fluidTotalForDate(date: string) {
    return fluidEntries.filter((entry) => entry.date === date).reduce((sum, entry) => sum + Number(entry.amountMl || 0), 0);
  }


  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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
    }

    void checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const plannerInitialisedRef = useRef(false);
  const accountHydratedRef = useRef(false);

  useEffect(() => {
    if (!authChecked || !plannerInitialisedRef.current) return;

    let cancelled = false;

    async function syncAccountPlanner() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        setAccountUserId(null);
        localStorage.removeItem("planner-recipe-add-pending");
        setAccountSyncReady(true);
        accountHydratedRef.current = true;
        return;
      }

      setAccountUserId(user.id);

      const { data, error } = await supabase
        .from("user_meal_plans")
        .select("planner, meal_people, household_people")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load saved meal plan:", error);
        setAccountSyncReady(true);
        accountHydratedRef.current = true;
        return;
      }

      const localPlanner = plannerMeals ?? createEmptyPlanner();
      const localMealPeople = mealPeople ?? createEmptyMealPeople();
      const localHasMeals = days.some((day) =>
        mealTypes.some((meal) => Boolean(localPlanner[day]?.[meal]))
      );

      // Recipe cards and recipe-detail pages save the chosen slot locally before
      // navigating here. Treat that explicit change as newer than the saved account
      // plan, otherwise account hydration can immediately overwrite the new meal.
      const recipeAddPending =
        localStorage.getItem("planner-recipe-add-pending") === "true";

      if (recipeAddPending) {
        const { error: saveError } = await supabase
          .from("user_meal_plans")
          .upsert({
            user_id: user.id,
            planner: localPlanner,
            meal_people: localMealPeople,
            household_people: getHouseholdPeople(),
          }, { onConflict: "user_id" });

        if (saveError) {
          console.error("Unable to save recipe added from recipe page:", saveError);
          // Keep the marker so a later Planner load can retry rather than
          // silently reverting the user's explicit recipe selection.
        } else {
          localStorage.removeItem("planner-recipe-add-pending");
        }

        if (!cancelled) {
          accountHydratedRef.current = true;
          setAccountSyncReady(true);
        }
        return;
      }

      if (data) {
        const remotePlanner = (data.planner ?? createEmptyPlanner()) as PlannerMeals;
        const remoteMealPeople = (data.meal_people ?? createEmptyMealPeople()) as MealPeople;
        const remoteHasMeals = days.some((day) =>
          mealTypes.some((meal) => Boolean(remotePlanner[day]?.[meal]))
        );

        const remotePeople =
          typeof data.household_people === "number" && data.household_people > 0
            ? data.household_people
            : getHouseholdPeople();

        // If this browser already contains a real plan and the account does not,
        // keep the local plan and make it the account's first saved plan.
        // Otherwise, the saved account plan is the source of truth and is restored.
        if (localHasMeals && !remoteHasMeals) {
          const { error: saveError } = await supabase
            .from("user_meal_plans")
            .upsert({
              user_id: user.id,
              planner: localPlanner,
              meal_people: localMealPeople,
              household_people: getHouseholdPeople(),
            }, { onConflict: "user_id" });

          if (saveError) {
            console.error("Unable to save existing local meal plan:", saveError);
          }
        } else {
          const shoppingSaved = localStorage.getItem("shopping-data");
          let shoppingData: ShoppingData = {
            selectedRecipes: [],
            shoppingList: [],
            checkedItems: [],
            people: remotePeople,
            plannerRecipes: [],
            manualRecipes: [],
            plannerCounts: {},
          };

          if (shoppingSaved) {
            try {
              shoppingData = { ...shoppingData, ...JSON.parse(shoppingSaved) };
            } catch {
              // Keep defaults.
            }
          }

          localStorage.setItem(
            "shopping-data",
            JSON.stringify({ ...shoppingData, people: remotePeople })
          );

          setPlannerMeals(remotePlanner);
          setMealPeople(remoteMealPeople);
        }
      } else {
        // No account plan exists yet. Save the planner that was already loaded
        // from this browser instead of saving an empty planner.
        const { error: saveError } = await supabase
          .from("user_meal_plans")
          .upsert({
            user_id: user.id,
            planner: localPlanner,
            meal_people: localMealPeople,
            household_people: getHouseholdPeople(),
          }, { onConflict: "user_id" });

        if (saveError) {
          console.error("Unable to create saved meal plan:", saveError);
        }
      }

      if (!cancelled) {
        accountHydratedRef.current = true;
        setAccountSyncReady(true);
      }
    }

    void syncAccountPlanner();

    return () => {
      cancelled = true;
    };
  }, [authChecked, plannerMeals, mealPeople]);

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

    if (
      Math.abs(deltaX) < 50 ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    const currentIndex =
      days.indexOf(selectedDay);

    if (deltaX < 0) {
      if (currentIndex < days.length - 1) {
        setSelectedDay(days[currentIndex + 1]);
      }
    } else {
      if (currentIndex > 0) {
        setSelectedDay(days[currentIndex - 1]);
      }
    }
  }

  useEffect(() => {
    setRequirements(getStoredRequirements());

    const handleRequirementsUpdated = () => {
      setRequirements(getStoredRequirements());
    };

    window.addEventListener(
      "meal-planner-requirements-updated",
      handleRequirementsUpdated
    );

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

    plannerInitialisedRef.current = true;

    return () => {
      window.removeEventListener(
        "meal-planner-requirements-updated",
        handleRequirementsUpdated
      );
    };
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

    if (accountSyncReady && accountUserId && accountHydratedRef.current) {
      const supabase = createClient();
      const householdPeople = getHouseholdPeople();

      void supabase
        .from("user_meal_plans")
        .upsert({
          user_id: accountUserId,
          planner: plannerMeals,
          meal_people: mealPeople,
          household_people: householdPeople,
        }, { onConflict: "user_id" })
        .then(({ error }) => {
          if (error) {
            console.error("Unable to save meal plan:", error);
          }
        });
    }

    window.dispatchEvent(
      new Event("weekly-planner-updated")
    );
  }, [plannerMeals, mealPeople, accountSyncReady, accountUserId]);

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

    const pool = unusedRecipes;

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

  function animatePickForMe(replaceAll = false) {
    if (isDiceRolling) return;

    setShowPickConfirm(false);
    setIsDiceRolling(true);

    window.setTimeout(() => {
      pickForMe(replaceAll);
      setIsDiceRolling(false);
    }, 1200);
  }

  function startPickForMe() {
    if (!authChecked || !isLoggedIn) {
      setPremiumPrompt("pick");
      return;
    }

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

    if (!hasEmptySlots) {
      setShowPickConfirm(true);
      return;
    }

    animatePickForMe();
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

      const matchesMeal =
        meal === "Breakfast"
          ? code.startsWith("B")
          : meal === "Lunch"
            ? code.startsWith("L")
            : meal === "Dinner"
              ? code.startsWith("D")
              : false;

      return (
        matchesMeal &&
        recipeMatchesRequirements(
          recipe,
          requirements
        )
      );
    });
  }

  type NutritionView =
    | "Calories"
    | "Protein"
    | "Sodium"
    | "Potassium"
    | "Phosphate"
    | "Purines"
    | "Fluid";

  const [nutritionView, setNutritionView] =
    useState<NutritionView>("Fluid");

  function getNutritionNumber(
    value: string
  ) {
    const match = value.match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  function formatSalt(sodiumMg: number): string {
  const saltGrams = (sodiumMg * 2.5) / 1000;
  return `${saltGrams.toFixed(1)} g`;
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

  function getDateForPlannerDay(day: string): string {
    const today = new Date();
    const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const weekday = monday.getDay();
    monday.setDate(monday.getDate() + (weekday === 0 ? -6 : 1 - weekday));
    const dayIndex = days.indexOf(day);
    monday.setDate(monday.getDate() + Math.max(0, dayIndex));
    return getLocalDateKey(monday);
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

  function getDailySodiumTotal(day: string) {
    const meals = getDayMealRecipes(day);

    const values = mealTypes
      .map((meal) => meals[meal as keyof typeof meals])
      .filter(Boolean)
      .map((recipe) =>
        getNutritionNumber(recipe!.nutrition.sodium)
      );

    if (values.length === 0) {
      return null;
    }

    return values.reduce(
      (total, value) => total + value,
      0
    );
  }

  function getDailySodiumStatus(day: string) {
    const total = getDailySodiumTotal(day);

    if (total === null || requirements?.sodiumLimit === null) {
      return "No limit";
    }

    const limit = requirements?.sodiumLimit;

if (limit === null || limit === undefined) {
  return "No limit";
}

if (total <= limit * 0.75) {
      return "Low";
    }

    if (total <= limit) {
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
    if (nutritionView === "Fluid") {
      const date = getDateForPlannerDay(day);
      const total = fluidTotalForDate(date);
      return (
        <button type="button"
          onMouseDown={(event) => { event.stopPropagation(); setFluidDate(date); setFluidModalOpen(true); }}
          onPointerDown={(event) => { event.stopPropagation(); setFluidDate(date); setFluidModalOpen(true); }}
          onTouchStart={(event) => { event.stopPropagation(); setFluidDate(date); setFluidModalOpen(true); }}
          onClick={(event) => { event.stopPropagation(); setFluidDate(date); setFluidModalOpen(true); }}
          className="relative z-[999] pointer-events-auto isolate min-w-[82px] cursor-pointer rounded-2xl border border-sky-400/70 bg-gradient-to-br from-slate-800 to-slate-900 px-3 py-3 text-sm font-extrabold !text-white shadow-md shadow-slate-950/20 hover:border-sky-300 hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
          aria-label={`${day}: ${total} ml recorded fluid. Open fluid tracker`} title={`${day}: ${total} ml recorded. Click to manage drinks`}>
          {total.toLocaleString()} ml
          <span className="mt-1 block text-[10px] font-bold tracking-wide text-sky-300">＋ LOG DRINKS</span>
        </button>
      );
    }

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

    const dailySodiumStatus =
      nutritionView === "Sodium"
        ? getDailySodiumStatus(day)
        : null;

    const breakfastColour =
      getNutritionSegmentClass(breakfast);

    const lunchColour =
      getNutritionSegmentClass(lunch);

    const dinnerColour =
      getNutritionSegmentClass(dinner);

    if (!desktop) {
      if (nutritionView === "Sodium") {
        const mobileStatus = dailySodiumStatus ?? "No limit";
        const mobileStatusColour =
          mobileStatus === "High"
            ? "#ef4444"
            : mobileStatus === "Moderate"
              ? "#f59e0b"
              : mobileStatus === "Low"
                ? "#16a34a"
                : "#94a3b8";

        return (
          <span
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-sm ring-1 ring-slate-200/90"
            style={{
              background: `conic-gradient(from -90deg, ${breakfastColour} 0deg 118deg, #ffffff 118deg 122deg, ${lunchColour} 122deg 238deg, #ffffff 238deg 242deg, ${dinnerColour} 242deg 358deg, #ffffff 358deg 360deg)`,
            }}
            aria-label={`${day} Salt: daily total ${getDailySodiumTotal(day) !== null ? formatSalt(getDailySodiumTotal(day)!) : "no meals"}, ${mobileStatus.toLowerCase()}`}
            title={`${day} Salt: daily total ${getDailySodiumTotal(day) !== null ? formatSalt(getDailySodiumTotal(day)!) : "no meals"}, ${mobileStatus.toLowerCase()}`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[7px] font-extrabold uppercase leading-none shadow-inner" style={{ color: mobileStatusColour }}>
              {mobileStatus === "No limit" ? "—" : mobileStatus}
            </span>
          </span>
        );
      }

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

    if (nutritionView === "Sodium") {
      overallStatus = dailySodiumStatus ?? "No limit";
    } else if (ratings.includes("High")) {
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
        aria-label={
          nutritionView === "Sodium"
            ? `${day} Salt: daily total ${getDailySodiumTotal(day) !== null ? formatSalt(getDailySodiumTotal(day)!) : "no meals"}, ${overallStatus.toLowerCase()}`
            : `${day} ${nutritionView}: breakfast ${breakfast.toLowerCase()}, lunch ${lunch.toLowerCase()}, dinner ${dinner.toLowerCase()}`
        }
        title={
          nutritionView === "Sodium"
            ? `${day} Salt: daily total ${getDailySodiumTotal(day) !== null ? formatSalt(getDailySodiumTotal(day)!) : "no meals"}, ${overallStatus.toLowerCase()}`
            : `${day} ${nutritionView}: breakfast ${breakfast.toLowerCase()}, lunch ${lunch.toLowerCase()}, dinner ${dinner.toLowerCase()}`
        }
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

            {nutritionView === "Sodium" &&
              getDailySodiumTotal(day) !== null && (
                <span className="mt-0.5 text-[8px] font-semibold text-slate-400">
                  {formatSalt(getDailySodiumTotal(day)!)}
                </span>
              )}
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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/40 px-4 py-8">
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/40 px-4 py-5 md:px-6 md:py-6">

      <div className="mx-auto max-w-7xl md:max-w-[1400px]">

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
                  title={`${day}${isSelected ? " — selected planner day" : ""}`}
                  className={`relative min-w-0 rounded-xl px-1 py-2.5 text-[11px] font-bold transition ${
                    isSelected
                      ? "bg-emerald-600 text-white ring-2 ring-emerald-300 shadow-sm"
                      : "bg-white text-slate-600 ring-1 ring-black/5 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  {day.slice(0, 3)}
                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className="mx-auto mt-1 block h-1 w-1 rounded-full bg-white"
                    />
                  )}
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

          <section className="overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-200/80">

            <div className="space-y-3 p-3">

              {/* BREAKFAST */}

              {mobileBreakfast ? (

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 ring-1 ring-orange-100">

                  <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 p-3">

                    <span className="flex min-w-0 items-center gap-2 text-lg font-bold leading-none text-slate-800">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-orange-600 shadow-sm ring-1 ring-orange-100">
                        <MealIcon type="Breakfast" />
                      </span>
                      Breakfast
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        if (!authChecked || !isLoggedIn) {
                          setPremiumPrompt("people");
                          return;
                        }

                        setPeoplePicker({
                          day: selectedDay,
                          meal: "Breakfast",
                        });
                      }}
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
                          className="h-25 w-40 rounded-xl object-cover shadow-sm"
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

                    <span className="flex min-w-0 items-center gap-2 text-lg font-bold leading-none text-slate-800">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-orange-600 shadow-sm ring-1 ring-orange-100">
                        <MealIcon type="Lunch" />
                      </span>
                      Lunch
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        if (!authChecked || !isLoggedIn) {
                          setPremiumPrompt("people");
                          return;
                        }

                        setPeoplePicker({
                          day: selectedDay,
                          meal: "Lunch",
                        });
                      }}
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
                          className="h-25 w-40 rounded-xl object-cover shadow-sm"
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

                    <span className="flex min-w-0 items-center gap-2 text-lg font-bold leading-none text-slate-800">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-orange-600 shadow-sm ring-1 ring-orange-100">
                        <MealIcon type="Dinner" />
                      </span>
                      Dinner
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        if (!authChecked || !isLoggedIn) {
                          setPremiumPrompt("people");
                          return;
                        }

                        setPeoplePicker({
                          day: selectedDay,
                          meal: "Dinner",
                        });
                      }}
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
                          className="h-25 w-40 rounded-xl object-cover shadow-sm"
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
                  onChange={(event) => {
                    setNutritionView(event.target.value as NutritionView);
                    if (event.target.value === "Fluid") {
                      setFluidDate(getLocalDateKey());
                      setFluidModalOpen(true);
                    }
                  }}
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
                    Salt
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
                  <option value="Fluid">Fluid (tap to log drinks)</option>
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

          <section className="overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-200/80">

            {/* WEEK HEADER */}

            <div className="grid grid-cols-[120px_repeat(7,minmax(0,1fr))] border-b border-emerald-100 bg-emerald-50">

              <div className="flex items-center bg-emerald-50 px-4 py-2">

                <span className="text-[11px] font-bold uppercase tracking-wider text-green-700">
                  Meals
                </span>

              </div>

              {days.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-center border-l border-emerald-100 bg-emerald-50 py-2"
                >
                  <span className="text-sm font-extrabold tracking-[0.08em] text-green-700">
                    {day.slice(0, 3)}
                  </span>
                </div>
              ))}

            </div>

            {/* BREAKFAST ROW */}

            <div className="grid grid-cols-[120px_repeat(7,minmax(0,1fr))] border-b border-slate-100">

              <div className="flex items-start border-r border-emerald-100 bg-emerald-50 px-4 py-4">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm ring-1 ring-orange-100">
                    <MealIcon type="Breakfast" />
                  </div>

                  <h2 className="mt-2 text-base font-extrabold tracking-tight text-slate-900">
                    Breakfast
                  </h2>

                  <p className="mt-1 max-w-[90px] text-xs leading-5 text-slate-500">
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

                      <div className="relative flex h-[176px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-orange-200">

                        <div className="relative px-2 pt-2">
  <Link
    href={`/recipes/${recipe.id}`}
    className="block w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
    aria-label={`View ${recipe.name} recipe`}
  >
    <img
      src={recipe.image}
      alt={recipe.name}
      className="h-[88px] w-full rounded-xl object-cover shadow-sm ring-1 ring-black/5"
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
    className="absolute bottom-1.5 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs font-medium leading-none text-slate-400 shadow-sm ring-1 ring-black/5 transition hover:bg-white hover:text-red-600"
    aria-label={`Remove ${recipe.name}`}
    title={`Remove ${recipe.name}`}
  >
    ×
  </button>
</div>

                        <button
                          type="button"
                          onClick={() => {
                            if (!authChecked || !isLoggedIn) {
                              setPremiumPrompt("people");
                              return;
                            }

                            setPeoplePicker({
                              day,
                              meal: "Breakfast",
                            });
                          }}
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


                        <div className="flex flex-1 items-center justify-center border-t border-slate-100 px-2 pb-2 pt-2 text-center">

                          <h3 className="line-clamp-2 pr-8 text-sm font-bold leading-5 text-slate-900">
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

            <div className="grid grid-cols-[120px_repeat(7,minmax(0,1fr))] border-b border-slate-100">

              <div className="flex items-start border-r border-emerald-100 bg-emerald-50 px-4 py-4">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm ring-1 ring-orange-100">
                    <MealIcon type="Lunch" />
                  </div>

                  <h2 className="mt-2 text-base font-extrabold tracking-tight text-slate-900">
                    Lunch
                  </h2>

                  <p className="mt-1 max-w-[90px] text-xs leading-5 text-slate-500">
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

                      <div className="relative flex h-[176px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-orange-200">

                        <div className="relative flex justify-center px-2 pt-2">

                          <Link
                            href={`/recipes/${recipe.id}`}
                            className="rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            aria-label={`View ${recipe.name} recipe`}
                          >
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="h-[100px] w-full rounded-xl object-cover shadow-sm ring-1 ring-black/5"
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
                            className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs font-medium leading-none text-slate-400 shadow-sm ring-1 ring-black/5 transition hover:bg-white hover:text-red-600"
                            aria-label={`Remove ${recipe.name}`}
                            title={`Remove ${recipe.name}`}
                          >
                            ×
                          </button>

                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (!authChecked || !isLoggedIn) {
                              setPremiumPrompt("people");
                              return;
                            }

                            setPeoplePicker({
                              day,
                              meal: "Lunch",
                            });
                          }}
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

                        <div className="flex flex-1 items-center justify-center border-t border-slate-100 px-2 pb-2 pt-2 text-center">

                          <h3 className="line-clamp-2 pr-8 text-sm font-bold leading-5 text-slate-900">
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

            <div className="grid grid-cols-[120px_repeat(7,minmax(0,1fr))]">

              <div className="flex items-start border-r border-emerald-100 bg-emerald-50 px-4 py-4">

                <div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm ring-1 ring-orange-100">
                    <MealIcon type="Dinner" />
                  </div>

                  <h2 className="mt-2 text-base font-extrabold tracking-tight text-slate-900">
                    Dinner
                  </h2>

                  <p className="mt-1 max-w-[90px] text-xs leading-5 text-slate-500">
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

                      <div className="relative flex h-[176px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-orange-200">

                        <div className="relative flex justify-center px-2 pt-2">

                          <Link
                            href={`/recipes/${recipe.id}`}
                            className="rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            aria-label={`View ${recipe.name} recipe`}
                          >
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="h-[100px] w-full rounded-xl object-cover shadow-sm ring-1 ring-black/5"
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
                            className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs font-medium leading-none text-slate-400 shadow-sm ring-1 ring-black/5 transition hover:bg-white hover:text-red-600"
                            aria-label={`Remove ${recipe.name}`}
                            title={`Remove ${recipe.name}`}
                          >
                            ×
                          </button>

                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (!authChecked || !isLoggedIn) {
                              setPremiumPrompt("people");
                              return;
                            }

                            setPeoplePicker({
                              day,
                              meal: "Dinner",
                            });
                          }}
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

                        <div className="flex flex-1 items-center justify-center border-t border-slate-100 px-2 pb-2 pt-2 text-center">

                          <h3 className="line-clamp-2 pr-8 text-sm font-bold leading-5 text-slate-900">
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

            <div className="planner-nutrition-row grid grid-cols-[120px_repeat(7,minmax(0,1fr))] border-t border-slate-200 bg-slate-50/70">

              <div className="planner-nutrition-label flex items-center justify-center border-r border-slate-100 bg-slate-50/70 px-3 py-4">

                <div className="flex flex-col items-center gap-1.5">

                  <h2 className="planner-nutrition-heading text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500 text-center">
                    Daily Nutrition
                  </h2>

                  <select
                    value={nutritionView}
                    onChange={(event) => {
                      setNutritionView(event.target.value as NutritionView);
                      if (event.target.value === "Fluid") {
                        setFluidDate(getLocalDateKey());
                        setFluidModalOpen(true);
                      }
                    }}
                    className="planner-nutrition-select w-full rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-bold text-slate-700 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    aria-label="Choose daily nutrition"
                  >
                    <option value="Calories">
                      Calories
                    </option>
                    <option value="Protein">
                      Protein
                    </option>
                    <option value="Sodium">
                      Salt
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
                    <option value="Fluid">Fluid (tap to log drinks)</option>
                  </select>

                  <div className="planner-nutrition-legend mt-2 flex flex-col gap-1 text-[9px] font-semibold text-slate-500">
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
                  className="planner-nutrition-cell flex min-h-[118px] items-center justify-center border-l border-slate-100 px-1 py-3"
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

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-stretch">

          <div className="order-1 flex w-full min-w-0 self-stretch items-stretch gap-3 md:order-3 md:w-auto md:flex-1 md:justify-end md:self-stretch">

            <button
              type="button"
              onClick={startPickForMe}
              disabled={isDiceRolling}
              style={{ backgroundColor: "#ff6b00", color: "#000000", borderColor: "#ff6b00" }}
              className={`group flex h-[120px] min-h-[120px] min-w-0 flex-1 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-orange-500 !bg-orange-500 px-3 py-4 text-sm font-bold !text-black shadow-sm transition hover:-translate-y-0.5 hover:border-orange-600 hover:!bg-orange-500 hover:!text-black hover:shadow-lg md:w-[130px] md:flex-none md:px-4 md:py-4 md:text-base ${
                isDiceRolling
                  ? "cursor-wait !bg-orange-500 !text-black shadow-lg ring-4 ring-orange-200/70"
                  : "hover:-translate-y-0.5"
              }`}
              aria-label={isDiceRolling ? "Picking meals for you" : "Pick for Me"}
            >
              <span
                className={`inline-flex text-xl leading-none transition-transform md:text-2xl ${
                  isDiceRolling
                    ? "animate-spin scale-125"
                    : "group-hover:rotate-12"
                }`}
                aria-hidden="true"
              >
                🎲
              </span>
              <span className="ml-1.5">
                {isDiceRolling ? "Picking..." : "Pick for Me"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="flex h-[120px] min-h-[120px] min-w-0 flex-1 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-emerald-500 bg-emerald-400 px-2 py-4 text-sm font-bold text-black shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-600 hover:bg-emerald-400 hover:text-black hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-slate-400 dark:bg-slate-800 dark:text-white dark:hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:text-white md:w-[130px] md:flex-none md:px-4 md:py-4 md:text-base"
            >
              <span className="inline-flex text-xl leading-none md:text-2xl" aria-hidden="true">🗑️</span>
              <span className="whitespace-nowrap">Clear Week</span>
            </button>

          </div>

          <Link
            href="/shopping"
            className="group order-2 flex w-full items-center justify-between rounded-3xl bg-white p-4 text-left shadow-md ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:bg-green-50/70 hover:ring-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 md:order-1 md:w-[36%] md:flex-none md:p-5"
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

          <Link
            href="/nutrition"
            aria-label="Go to Nutrition"
            className="group order-3 flex w-full items-center justify-between rounded-3xl bg-sky-50 p-4 text-left text-slate-900 shadow-md ring-1 ring-sky-200 transition duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-lg hover:ring-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-600 dark:hover:bg-slate-700 md:order-2 md:w-[30%] md:flex-none md:p-5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-xl dark:bg-slate-700">📊</span>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 md:text-lg">Go to Nutrition</h2>
                <p className="mt-0.5 text-xs leading-5 text-slate-700 dark:text-slate-300 md:text-sm">Review your weekly nutrition and fluid intake.</p>
              </div>
            </div>
            <span className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xl font-bold text-sky-700 transition group-hover:translate-x-1 group-hover:bg-sky-600 group-hover:text-white dark:bg-slate-700 dark:text-sky-300 dark:group-hover:bg-sky-600 dark:group-hover:text-white" aria-hidden="true">→</span>
          </Link>



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

      {/* PREMIUM LOGIN PROMPT */}
      {premiumPrompt && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl">
              {premiumPrompt === "pick" ? "🎲" : "👥"}
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              {premiumPrompt === "pick"
                ? "Pick for Me is a Premium feature"
                : "Choose the number of people"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Log in to your RenalPlan account to use this Premium feature.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPremiumPrompt(null)}
                className="rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-200"
              >
                Cancel
              </button>

              <a
                href="/login"
                className="rounded-2xl bg-blue-600 px-4 py-3 text-center font-bold text-white transition hover:bg-blue-700"
              >
                Log in
              </a>
            </div>

            <a
              href="/signup"
              className="mt-3 block text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              Create an account
            </a>
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
                  animatePickForMe(true)
                }
                disabled={isDiceRolling}
                className={`rounded-2xl bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600 ${
                  isDiceRolling ? "cursor-wait opacity-80" : ""
                }`}
              >
                <span
                  className={`mr-2 inline-block ${
                    isDiceRolling ? "animate-spin" : ""
                  }`}
                  aria-hidden="true"
                >
                  🎲
                </span>
                {isDiceRolling ? "Picking..." : "Pick for Me"}
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

              {requirements && (
                <div className="mb-4 rounded-2xl bg-purple-50 p-4 text-sm leading-6 text-purple-900 ring-1 ring-purple-100">
                  Showing recipes that match your saved requirements.
                </div>
              )}

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

                {getMealRecipes(picker.meal).length === 0 && (
                  <div className="col-span-full rounded-2xl bg-slate-50 p-5 text-center text-sm leading-6 text-slate-500">
                    There are no recipes for this meal that meet your saved requirements.
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      )}

      {fluidModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="fluid-tracker-title">
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="fluid-tracker-title" className="text-xl font-extrabold text-slate-900">Fluid Tracker</h2>
                <p className="mt-1 text-sm text-slate-500">Record drinks against the date consumed.</p>
              </div>
              <button type="button" onClick={() => setFluidModalOpen(false)} aria-label="Close fluid tracker" className="rounded-full bg-slate-100 px-3 py-2 text-lg font-bold text-slate-600 hover:bg-slate-200">×</button>
            </div>
            <label className="mt-5 block text-sm font-bold text-slate-700">Date
              <input type="date" value={fluidDate} onChange={(event) => setFluidDate(event.target.value)} className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900" />
            </label>
            <div className="mt-4 rounded-2xl bg-slate-800 p-4 ring-1 ring-slate-700">
              <p className="text-sm font-semibold !text-slate-100">Actual drinks recorded</p>
              <p className="mt-1 text-3xl font-extrabold !text-white">{fluidTotalForDate(fluidDate).toLocaleString()} <span className="text-base !text-slate-200">ml</span></p>
              {fluidAllowanceMl !== null && <><p className="mt-2 text-xs font-medium !text-slate-200">Personal daily allowance: {fluidAllowanceMl.toLocaleString()} ml</p><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-600"><div className={`h-full rounded-full ${fluidTotalForDate(fluidDate) > fluidAllowanceMl ? "bg-rose-500" : "bg-sky-600"}`} style={{ width: `${fluidAllowanceMl > 0 ? Math.min(100, fluidTotalForDate(fluidDate) / fluidAllowanceMl * 100) : fluidTotalForDate(fluidDate) > 0 ? 100 : 0}%` }} /></div></>}
              <p className="mt-2 text-xs leading-5 !text-slate-300">This is a record of intake, not a recommendation to drink more. Follow your renal team's fluid guidance.</p>
            </div>
            <h3 className="mt-5 text-sm font-extrabold text-slate-800">Add a drink</h3>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <label className="text-sm font-semibold text-slate-700">Drink
                <select value={fluidDrink} onChange={(event) => setFluidDrink(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900">
                  <option>Water</option><option>Tea</option><option>Coffee</option><option>Milk</option><option>Juice</option><option>Soft drink</option><option>Soup</option><option>Other</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">Amount (ml)
                <input type="number" min="1" max="10000" step="1" inputMode="numeric" value={fluidAmount} onChange={(event) => setFluidAmount(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900" />
              </label>
            </div>
            {fluidDrink === "Other" && <label className="mt-3 block text-sm font-semibold text-slate-700">Description<input value={fluidCustomDrink} onChange={(event) => setFluidCustomDrink(event.target.value)} placeholder="Describe the drink" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900" /></label>}
            <button type="button" onClick={addFluidEntry} disabled={!Number.isFinite(Number(fluidAmount)) || Number(fluidAmount) <= 0 || Number(fluidAmount) > 10000 || (fluidDrink === "Other" && !fluidCustomDrink.trim())} className="mt-3 w-full rounded-xl bg-sky-700 px-4 py-3 font-bold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50">+ Add drink</button>
            <h3 className="mt-6 text-sm font-extrabold text-slate-800">Drinks on {fluidDate}</h3>
            <div className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-100">
              {fluidEntries.filter((entry) => entry.date === fluidDate).length === 0 ? <p className="p-4 text-sm text-slate-500">No drinks recorded for this date yet.</p> : fluidEntries.filter((entry) => entry.date === fluidDate).map((entry) => <div key={entry.id} className="flex items-center justify-between gap-3 p-3"><div><p className="font-bold text-slate-800">{entry.drink}</p><p className="text-xs text-slate-500">{new Date(entry.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p></div><div className="flex items-center gap-3"><span className="text-sm font-bold text-slate-800">{entry.amountMl} ml</span><button type="button" onClick={() => saveFluidEntries(fluidEntries.filter((item) => item.id !== entry.id))} className="rounded-lg px-2 py-1 text-sm font-bold text-rose-600 hover:bg-rose-50" aria-label={`Remove ${entry.drink}, ${entry.amountMl} ml`}>Remove</button></div></div>)}
            </div>
            <button type="button" onClick={() => setFluidModalOpen(false)} className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 font-bold text-slate-700 hover:bg-slate-50">Done</button>
          </div>
        </div>
      )}

    </main>
  );
}




