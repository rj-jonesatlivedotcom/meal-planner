"use client";

import Link from "next/link";
import Image from "next/image";
import { recipes } from "@/data/RecipeData";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const freeSteps = [
  {
    number: "1",
    title: "Choose Meals",
    description: "Browse our kidney-friendly recipes that fit your needs.",
    href: "/recipes",
    cardClass: "border-green-100 bg-green-50/60",
    numberClass: "bg-emerald-500",
    iconClass: "bg-green-50 text-emerald-600",
    icon: (
      <svg viewBox="0 0 64 64" className="h-5 w-5 sm:h-9 sm:w-9" aria-hidden="true">
        <path
          d="M8 14c10-3 18-1 24 5v34c-6-6-14-8-24-5V14Z"
          fill="white"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M56 14c-10-3-18-1-24 5v34c6-6 14-8 24-5V14Z"
          fill="white"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M32 19v34"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Plan Your Week",
    description: "Build your weekly meal plan with ease.",
    href: "/planner",
    cardClass: "border-orange-100 bg-orange-50/60",
    numberClass: "bg-orange-500",
    iconClass: "bg-orange-50 text-orange-500",
    icon: (
      <svg viewBox="0 0 64 64" className="h-5 w-5 sm:h-9 sm:w-9" aria-hidden="true">
        <rect
          x="10"
          y="14"
          width="44"
          height="40"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M20 9v11M44 9v11M10 26h44"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M21 34h6M37 34h6M21 44h6M37 44h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Shop",
    description: "Your shopping list is created automatically.",
    href: "/shopping",
    cardClass: "border-blue-100 bg-blue-50/60",
    numberClass: "bg-blue-500",
    iconClass: "text-blue-600",
    icon: (
      <svg viewBox="0 0 64 64" className="h-5 w-5 sm:h-9 sm:w-9" aria-hidden="true">
        <path
          d="M13 18h7l4 28h27l6-21H22"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="29" cy="54" r="4" fill="currentColor" />
        <circle cx="48" cy="54" r="4" fill="currentColor" />
        <path
          d="M31 27h18M32 34h15"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const accountFeatures = [
  {
    title: "My Diet",
    badge: "Free Account",
    text: "Set your dietary requirements so RenalPlan can personalise your meals.",
    href: "/promotional-material/my-diet",
    iconClass: "bg-blue-100 text-blue-600",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <circle cx="24" cy="15" r="7" fill="currentColor" />
        <path
          d="M10 40c0-8 6-13 14-13s14 5 14 13"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "Nutrition",
    badge: "Free Account",
    text: "See your weekly nutrition summary with totals, averages and a printable report.",
    href: "/promotional-material/nutrition",
    iconClass: "bg-blue-100 text-blue-600",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <path
          d="M7 40h34"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          d="M12 36V22h6v14M21 36V12h6v24M30 36V18h6v18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        />
      </svg>
    ),
  },
  {
    title: "Food Check",
    badge: "Free Account",
    text: "Check the nutritional information for individual foods quickly and easily.",
    href: "/promotional-material/food-check",
    iconClass: "bg-blue-100 text-blue-600",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <circle
          cx="20"
          cy="20"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          d="m28 28 11 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Favourites",
    badge: "Free Account",
    text: "Save your favourite recipes and access them whenever you want.",
    href: "/promotional-material/favourites",
    iconClass: "bg-rose-100 text-rose-500",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <path
          d="M24 39S8 29 8 17c0-5 3-9 8-9 4 0 7 3 8 6 1-3 4-6 8-6 5 0 8 4 8 9 0 12-16 22-16 22Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const featureDetails: Record<
  string,
  { eyebrow: string; heading: string; description: string; bullets: string[] }
> = {
  "My Diet": {
    eyebrow: "PERSONALISE YOUR EXPERIENCE",
    heading: "Your diet. Your requirements.",
    description:
      "Tell RenalPlan about your dietary requirements and goals, so your meal-planning experience can be tailored around what matters to you.",
    bullets: [
      "Keep your dietary requirements together in one place.",
      "Set the nutrition goals that matter to your plan.",
      "Help guide meal choices around your personal needs.",
    ],
  },
  Nutrition: {
    eyebrow: "UNDERSTAND YOUR WEEK",
    heading: "See the bigger nutritional picture.",
    description:
      "Review your planned meals with a weekly nutrition summary that helps you understand totals, daily averages and how your plan compares with your goals.",
    bullets: [
      "Review weekly totals and daily averages.",
      "See key nutrients in an easy-to-read summary.",
      "Print a weekly nutrition report for reference.",
    ],
  },
  "Food Check": {
    eyebrow: "MAKE INFORMED FOOD CHOICES",
    heading: "Check a food before it goes in your basket.",
    description:
      "Look up nutritional information for individual foods and make more informed choices when planning meals or shopping.",
    bullets: [
      "Check nutritional information for individual foods.",
      "Use the information to help compare options.",
      "Make food choices with your dietary needs in mind.",
    ],
  },
  Favourites: {
    eyebrow: "SAVE TIME NEXT TIME",
    heading: "Keep your go-to meals close.",
    description:
      "Save recipes you love, so you can find them again without having to search through the full recipe collection.",
    bullets: [
      "Save recipes you want to make again.",
      "Build a personal collection of go-to meals.",
      "Make future meal planning quicker and easier.",
    ],
  },
};

const benefits = [
  "Kidney-friendly recipes",
  "Easy meal planning",
  "Automatic shopping lists",
];

function ShowcaseVideo({ mobile }: { mobile: boolean }) {
  const [shouldRender, setShouldRender] = useState<boolean | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setShouldRender(mobile ? !mediaQuery.matches : mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [mobile]);

  useEffect(() => {
    if (shouldRender !== true || shouldLoad) return;

    // The showcase is below the hero and is intentionally not downloaded
    // during the initial page load. Start the video after the visitor begins
    // interacting with the page, keeping the visual space reserved above it.
    const loadVideo = () => setShouldLoad(true);

    window.addEventListener("scroll", loadVideo, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", loadVideo);
    };
  }, [shouldRender, shouldLoad]);

  if (shouldRender !== true) return null;

  if (!shouldLoad) {
    return (
      <div
        className={
          mobile
            ? "h-full w-full bg-[#102b4d]"
            : "aspect-video w-full bg-[#102b4d]"
        }
      />
    );
  }

  return (
    <video
      className={mobile ? "block h-full w-full object-contain object-center" : "block h-auto w-full object-contain"}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={
        mobile
          ? "RenalPlan mobile showcase showing dietary requirements, weekly planning, nutrition and shopping list features"
          : "RenalPlan showcase showing dietary requirements, weekly planning, nutrition and shopping list features"
      }
    >
      <source
        src={
          mobile
            ? "/videos/RenalPlan_Mobile_Showcase_FINAL_v10_CLEAN.mp4"
            : "/videos/RenalPlan_Showcase_Final_AMENDED.mp4"
        }
        type="video/mp4"
      />
      Your browser does not support the video element.
    </video>
  );
}

function LazyFoodCheckVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    videoRef.current?.play().catch(() => {
      // Some browsers may still block autoplay. The video remains usable
      // without controls if the browser requires a user gesture.
    });
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      className="block aspect-[9/16] h-auto w-full object-contain"
      autoPlay={shouldLoad}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      aria-label="RenalPlan Food Check barcode scanning demonstration"
    >
      {shouldLoad && (
        <source src="/videos/RenalPlan_Barcode.mp4" type="video/mp4" />
      )}
      Your browser does not support the video element.
    </video>
  );
}

function LoggedInHome() {
  const [journeyOpen, setJourneyOpen] = useState(true);
  const [planner, setPlanner] = useState<
    Record<string, Record<string, string | null>>
  >({});
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const [shoppingCount, setShoppingCount] = useState(0);
  const [requirementsSet, setRequirementsSet] = useState(false);
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    try {
      const saved = localStorage.getItem("renalplan-home-journey-open");
      if (saved === "false") {
        setJourneyOpen(false);
      }
    } catch {
      // Keep the journey expanded if localStorage is unavailable.
    }
  }, []);

  function readLocalData() {
    try {
      const savedPlanner = localStorage.getItem("weekly-planner");
      if (savedPlanner) {
        const parsed = JSON.parse(savedPlanner);
        setPlanner(parsed && typeof parsed === "object" ? parsed : {});
      } else {
        setPlanner({});
      }
    } catch {
      setPlanner({});
    }

    try {
      const savedShopping = localStorage.getItem("shopping-data");
      if (savedShopping) {
        const parsed = JSON.parse(savedShopping);
        setShoppingCount(
          Array.isArray(parsed?.shoppingList) ? parsed.shoppingList.length : 0,
        );
      } else {
        setShoppingCount(0);
      }
    } catch {
      setShoppingCount(0);
    }

    try {
      const savedRequirements = localStorage.getItem(
        "meal-planner-requirements",
      );
      if (savedRequirements) {
        const parsed = JSON.parse(savedRequirements);
        const meaningful =
          parsed &&
          (parsed.potassium !== "Any" ||
            parsed.phosphate !== "Any" ||
            parsed.purines !== "Any" ||
            parsed.sodiumLimit !== null ||
            parsed.carbohydrateMin !== null ||
            parsed.carbohydrateMax !== null ||
            parsed.fluidLimitMl !== null);
        setRequirementsSet(Boolean(meaningful));
      } else {
        setRequirementsSet(false);
      }
    } catch {
      setRequirementsSet(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadAccountData() {
      readLocalData();

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        setFavouriteIds([]);
        setLoaded(true);
        return;
      }

      const [{ data: favourites, error: favouritesError }, { data: requirements }] =
        await Promise.all([
          supabase
            .from("user_favourites")
            .select("recipe_id")
            .eq("user_id", user.id),
          supabase
            .from("user_requirements")
            .select(
              "sodium_limit, potassium, phosphate, purines, carbohydrate_min, carbohydrate_max, fluid_limit_ml",
            )
            .eq("user_id", user.id)
            .maybeSingle(),
        ]);

      if (cancelled) return;

      if (favouritesError) {
        // Favourites are non-critical to loading the Dashboard. Fall back to
        // the browser copy used by the Recipes experience so a Supabase
        // hiccup cannot crash the page in development or leave the user
        // staring at a red error overlay.
        try {
          const saved = localStorage.getItem("meal-planner-favourites");
          const localFavourites = saved ? JSON.parse(saved) : [];
          setFavouriteIds(Array.isArray(localFavourites) ? localFavourites : []);
        } catch {
          setFavouriteIds([]);
        }
      } else {
        const accountFavouriteIds = Array.isArray(favourites)
          ? favourites
              .map((item) => item.recipe_id)
              .filter((recipeId): recipeId is string => typeof recipeId === "string")
          : [];

        setFavouriteIds(accountFavouriteIds);

        try {
          localStorage.setItem(
            "meal-planner-favourites",
            JSON.stringify(accountFavouriteIds),
          );
        } catch {
          // Keep the Dashboard usable if browser storage is unavailable.
        }
      }

      if (requirements) {
        const meaningful =
          requirements.potassium !== "Any" ||
          requirements.phosphate !== "Any" ||
          requirements.purines !== "Any" ||
          requirements.sodium_limit !== null ||
          requirements.carbohydrate_min !== null ||
          requirements.carbohydrate_max !== null ||
          requirements.fluid_limit_ml !== null;
        setRequirementsSet(Boolean(meaningful));

        try {
          localStorage.setItem(
            "meal-planner-requirements",
            JSON.stringify({
              sodiumLimit: requirements.sodium_limit,
              potassium: requirements.potassium,
              phosphate: requirements.phosphate,
              purines: requirements.purines,
              carbohydrateMin: requirements.carbohydrate_min,
              carbohydrateMax: requirements.carbohydrate_max,
              fluidLimitMl: requirements.fluid_limit_ml,
            }),
          );
        } catch {
          // Keep the dashboard usable if local storage is unavailable.
        }
      }

      setLoaded(true);
    }

    void loadAccountData();

    const refresh = () => readLocalData();
    window.addEventListener("weekly-planner-updated", refresh);
    window.addEventListener("shopping-list-updated", refresh);
    window.addEventListener("meal-planner-requirements-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("weekly-planner-updated", refresh);
      window.removeEventListener("shopping-list-updated", refresh);
      window.removeEventListener("meal-planner-requirements-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  function toggleJourney() {
    setJourneyOpen((current) => {
      const next = !current;

      try {
        localStorage.setItem("renalplan-home-journey-open", String(next));
      } catch {
        // Ignore storage errors.
      }

      return next;
    });
  }

  function parseValue(value: string | undefined) {
    if (!value) return 0;
    const match = value.match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  function findRecipe(id: string | null | undefined) {
    if (!id) return null;
    return recipes.find((recipe) => recipe.id === id) ?? null;
  }

  const plannedSlots = days.flatMap((day) =>
    mealTypes.map((meal) => ({
      day,
      meal,
      recipe: findRecipe(planner?.[day]?.[meal]),
    })),
  );

  const plannedMeals = plannedSlots.filter((slot) => Boolean(slot.recipe)).length;

  const [todayName, setTodayName] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    const todayIndex = (new Date().getDay() + 6) % 7;
    const currentDay = days[todayIndex];
    setTodayName(currentDay);
    setSelectedDay(currentDay);
  }, []);

  const viewingDay = selectedDay || todayName;
  const viewingSlots = plannedSlots.filter((slot) => slot.day === viewingDay);
  const viewingMealCount = viewingSlots.filter((slot) => Boolean(slot.recipe)).length;

  const todaySlots = plannedSlots.filter((slot) => slot.day === todayName);
  const todayMealCount = todaySlots.filter((slot) => Boolean(slot.recipe)).length;

  const viewingNutrition = viewingSlots.reduce(
    (totals, slot) => {
      if (!slot.recipe) return totals;
      totals.calories += parseValue(slot.recipe.nutrition?.calories);
      totals.protein += parseValue(slot.recipe.nutrition?.protein);
      totals.potassium += parseValue(slot.recipe.nutrition?.potassium);
      totals.phosphate += parseValue(slot.recipe.nutrition?.phosphate);
      totals.salt += parseValue(slot.recipe.nutrition?.salt);
      return totals;
    },
    { calories: 0, protein: 0, potassium: 0, phosphate: 0, salt: 0 },
  );

  const hasViewingNutrition = viewingMealCount > 0;

  const favouriteRecipes = favouriteIds
    .map((id) => findRecipe(id))
    .filter((recipe): recipe is NonNullable<typeof recipe> => Boolean(recipe))
    .slice(0, 4);

  const plannedIds = new Set(
    plannedSlots
      .map((slot) => slot.recipe?.id)
      .filter((id): id is string => Boolean(id)),
  );

  function matchesRequirement(
    recipeLevel: string | undefined,
    requirement: string | undefined,
  ) {
    if (!requirement || requirement === "Any") return true;
    const rank: Record<string, number> = { Low: 1, Moderate: 2, High: 3 };
    return (rank[recipeLevel ?? "High"] ?? 3) <= (rank[requirement] ?? 3);
  }

  let requirementFilters: {
    sodiumLimit: number | null;
    potassium: string;
    phosphate: string;
    purines: string;
    carbohydrateMin: number | null;
    carbohydrateMax: number | null;
  } = {
    sodiumLimit: null,
    potassium: "Any",
    phosphate: "Any",
    purines: "Any",
    carbohydrateMin: null,
    carbohydrateMax: null,
  };

  try {
    const savedRequirements = localStorage.getItem(
      "meal-planner-requirements",
    );
    if (savedRequirements) {
      requirementFilters = {
        ...requirementFilters,
        ...JSON.parse(savedRequirements),
      };
    }
  } catch {
    // Keep broad recommendation filters.
  }

  const recommendedRecipe =
    recipes.find((recipe) => {
      if (plannedIds.has(recipe.id) || favouriteIds.includes(recipe.id)) {
        return false;
      }

      if (!matchesRequirement(recipe.potassium, requirementFilters.potassium)) {
        return false;
      }
      if (!matchesRequirement(recipe.phosphate, requirementFilters.phosphate)) {
        return false;
      }
      if (!matchesRequirement(recipe.purines, requirementFilters.purines)) {
        return false;
      }

      const sodium = parseValue(recipe.nutrition?.sodium);
      if (
        requirementFilters.sodiumLimit !== null &&
        sodium > requirementFilters.sodiumLimit
      ) {
        return false;
      }

      const carbohydrates = parseValue(recipe.nutrition?.carbohydrates);
      if (
        requirementFilters.carbohydrateMin !== null &&
        carbohydrates < requirementFilters.carbohydrateMin
      ) {
        return false;
      }
      if (
        requirementFilters.carbohydrateMax !== null &&
        carbohydrates > requirementFilters.carbohydrateMax
      ) {
        return false;
      }

      return true;
    }) ?? null;

  const journeySteps = [
    {
      number: "1",
      title: "My Diet",
      description: "Set your dietary requirements.",
      href: "/requirements",
      colour: "green",
      status: requirementsSet ? "Complete" : "Set up My Diet",
    },
    {
      number: "2",
      title: "Plan your week",
      description: "Choose meals or let RenalPlan pick for you.",
      href: "/planner",
      colour: "blue",
      status: plannedMeals > 0 ? `${plannedMeals} of 21 meals` : "Start planning",
    },
    {
      number: "3",
      title: "Check nutrition",
      description: "See how your planned week measures up.",
      href: "/nutrition",
      colour: "amber",
      status: plannedMeals > 0 ? "View nutrition" : "Ready when planned",
    },
    {
      number: "4",
      title: "Shopping list",
      description: "Everything you need from your plan.",
      href: "/shopping",
      colour: "purple",
      status: shoppingCount > 0 ? `${shoppingCount} items` : "Builds from your plan",
    },
    {
      number: "5",
      title: "Food Check",
      description: "Check food while you're shopping.",
      href: "/FoodCheck",
      colour: "rose",
      status: "Open Food Check",
    },
  ];

  const colourClasses: Record<
    string,
    { card: string; number: string; icon: string; button: string }
  > = {
    green: {
      card: "border-green-100 bg-green-50/70",
      number: "bg-emerald-500",
      icon: "bg-white text-emerald-600",
      button: "border-emerald-200 text-emerald-700 hover:bg-emerald-50",
    },
    blue: {
      card: "border-blue-100 bg-blue-50/70",
      number: "bg-blue-500",
      icon: "bg-white text-blue-600",
      button: "border-blue-200 text-blue-700 hover:bg-blue-50",
    },
    amber: {
      card: "border-amber-100 bg-amber-50/80",
      number: "bg-amber-500",
      icon: "bg-white text-amber-600",
      button: "border-amber-200 text-amber-700 hover:bg-amber-50",
    },
    purple: {
      card: "border-violet-100 bg-violet-50/75",
      number: "bg-violet-600",
      icon: "bg-white text-violet-700",
      button: "border-violet-200 text-violet-700 hover:bg-violet-50",
    },
    rose: {
      card: "border-rose-100 bg-rose-50/75",
      number: "bg-rose-500",
      icon: "bg-white text-rose-600",
      button: "border-rose-200 text-rose-700 hover:bg-rose-50",
    },
  };

  function JourneyIcon({ index }: { index: number }) {
    if (index === 0) {
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="7" r="3" />
          <path d="M5 20c0-3.8 3.1-6.2 7-6.2s7 2.4 7 6.2" />
        </svg>
      );
    }
    if (index === 1) {
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
          <path d="M7 3v4M17 3v4M3.5 9.5h17" />
          <path d="M8 13h2M14 13h2M8 16.5h2M14 16.5h2" />
        </svg>
      );
    }
    if (index === 2) {
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20V10M10 20V6M16 20V3M22 20H2" />
        </svg>
      );
    }
    if (index === 3) {
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 5h3l2.2 11h9.8l2-8H6.5" />
          <circle cx="10" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5M7.5 10.5h6M10.5 7.5v6" />
      </svg>
    );
  }

  function DashboardArrow() {
    return <span aria-hidden="true">→</span>;
  }

  return (
    <main className="renal-homepage renal-dashboard min-h-screen bg-[#f7fbff] px-4 pb-10 text-slate-900 sm:px-8 lg:px-10">
      <style jsx global>{`
        @keyframes renalDashboardRise {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes renalDashboardShimmer {
          0% {
            transform: translateX(-120%);
          }
          55%,
          100% {
            transform: translateX(220%);
          }
        }

        @keyframes renalDashboardGlow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(6, 123, 58, 0);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(6, 123, 58, 0.07);
          }
        }

        .renal-dashboard-reveal {
          animation: renalDashboardRise 0.55s ease-out both;
        }

        .renal-dashboard > div > section:nth-of-type(3) > div:nth-child(2) {
          animation-delay: 80ms;
        }

        .renal-dashboard > div > section:nth-of-type(3) > div:nth-child(3) {
          animation-delay: 160ms;
        }

        .renal-dashboard > div > section:nth-of-type(4) > div:nth-child(2) {
          animation-delay: 220ms;
        }

        .renal-dashboard-progress {
          position: relative;
          overflow: hidden;
        }

        .renal-dashboard-progress::after {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 32%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          transform: translateX(-120%);
          animation: renalDashboardShimmer 3.8s ease-in-out 0.8s infinite;
          pointer-events: none;
        }

        .renal-dashboard-encourage {
          animation: renalDashboardGlow 3.4s ease-in-out 1.2s infinite;
        }

        html[data-theme="dark"] .renal-dashboard {
          background: #0d1a24 !important;
          color: #edf2f7 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-surface {
          background: #162b3a !important;
          border-color: #29475c !important;
          color: #edf2f7 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-muted {
          color: #cbd5e1 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-heading {
          color: #f8fafc !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-link {
          color: #93c5fd !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-link:hover {
          color: #bfdbfe !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-card {
          background: #1b3040 !important;
          border-color: #29475c !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-soft {
          background: #122738 !important;
          border-color: #29475c !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-recipe {
          background: #142733 !important;
          border-color: #29475c !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-recommendation {
          background: #162b3a !important;
          border-color: #355163 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-week-badge {
          background: #123326 !important;
          border-color: #275a43 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-mychef {
          background: #132b36 !important;
          border-color: #2d6750 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-mychef:hover {
          background: #173540 !important;
          border-color: #3b8968 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-mychef p {
          color: #edf2f7 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-mychef p:first-child {
          color: #78e6a6 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-food-illustration {
          background: linear-gradient(135deg, #122b3d, #162b3a, #13232e) !important;
          border-color: #31516a !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-food-illustration p {
          color: #cbd5e1 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-day-complete,
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-diet-set {
          background: #173c2b !important;
          color: #9bf0bb !important;
        }
        html[data-theme="dark"] .renal-dashboard .text-slate-500 {
          color: #aebdca !important;
        }
        html[data-theme="dark"] .renal-dashboard .text-slate-600 {
          color: #c6d1da !important;
        }
        html[data-theme="dark"] .renal-dashboard .text-slate-700 {
          color: #dbe4ea !important;
        }
        html[data-theme="dark"] .renal-dashboard .text-slate-800,
        html[data-theme="dark"] .renal-dashboard .text-slate-900 {
          color: #f1f5f9 !important;
        }
        html[data-theme="dark"] .renal-dashboard .bg-white,
        html[data-theme="dark"] .renal-dashboard .bg-white\/70,
        html[data-theme="dark"] .renal-dashboard .bg-white\/78,
        html[data-theme="dark"] .renal-dashboard .bg-white\/80,
        html[data-theme="dark"] .renal-dashboard .bg-white\/90 {
          background: #162b3a !important;
        }
        html[data-theme="dark"] .renal-dashboard .bg-slate-50 {
          background: #122738 !important;
        }
        html[data-theme="dark"] .renal-dashboard .bg-slate-100 {
          background: #1b3344 !important;
        }
        html[data-theme="dark"] .renal-dashboard .bg-blue-50,
        html[data-theme="dark"] .renal-dashboard .bg-blue-50\/60,
        html[data-theme="dark"] .renal-dashboard .bg-green-50,
        html[data-theme="dark"] .renal-dashboard .bg-green-50\/70,
        html[data-theme="dark"] .renal-dashboard .bg-amber-50,
        html[data-theme="dark"] .renal-dashboard .bg-amber-50\/80,
        html[data-theme="dark"] .renal-dashboard .bg-rose-50,
        html[data-theme="dark"] .renal-dashboard .bg-rose-50\/75,
        html[data-theme="dark"] .renal-dashboard .bg-violet-50,
        html[data-theme="dark"] .renal-dashboard .bg-violet-50\/75 {
          background: #1b3040 !important;
        }
        html[data-theme="dark"] .renal-dashboard .bg-green-100 {
          background: #173c2b !important;
        }
        html[data-theme="dark"] .renal-dashboard .bg-amber-100 {
          background: #4a351a !important;
        }
        html[data-theme="dark"] .renal-dashboard .text-green-700,
        html[data-theme="dark"] .renal-dashboard .text-emerald-700 {
          color: #78e6a6 !important;
        }
        html[data-theme="dark"] .renal-dashboard .text-amber-700 {
          color: #ffd080 !important;
        }
        html[data-theme="dark"] .renal-dashboard .text-violet-700 {
          color: #c6b4ff !important;
        }
        html[data-theme="dark"] .renal-dashboard .text-rose-500,
        html[data-theme="dark"] .renal-dashboard .text-rose-700 {
          color: #ff9eae !important;
        }
        html[data-theme="dark"] .renal-dashboard .border-slate-200,
        html[data-theme="dark"] .renal-dashboard .border-slate-300,
        html[data-theme="dark"] .renal-dashboard .border-blue-100,
        html[data-theme="dark"] .renal-dashboard .border-green-100,
        html[data-theme="dark"] .renal-dashboard .border-green-200 {
          border-color: #355163 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-journey-card {
          background: #1b3040 !important;
          border-color: #3b596b !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-journey-card > div:first-child > span:first-child {
          background: #122738 !important;
          color: #f1f5f9 !important;
          box-shadow: inset 0 0 0 1px #355163;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-journey-card h3 {
          color: #f1f5f9 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-journey-button {
          background: #122738 !important;
          border-color: #466275 !important;
          color: #e2e8f0 !important;
        }
        html[data-theme="dark"] .renal-dashboard .renal-dashboard-journey-button:hover {
          background: #1a3446 !important;
        }
        @keyframes renalDashboardBadgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.035); }
        }
        .renal-dashboard-week-badge {
          animation: renalDashboardBadgePulse 3.8s ease-in-out 1s infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .renal-dashboard-reveal,
          .renal-dashboard-progress::after,
          .renal-dashboard-encourage,
          .renal-dashboard-week-badge {
            animation: none !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1450px] pt-6 sm:pt-8 lg:pt-10">
        {/* WELCOME */}
        <section className="renal-dashboard-surface renal-dashboard-reveal relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-[#effaf6] via-[#f6fbff] to-white shadow-sm">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d7f5e6]/70 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#dbeafe]/50 blur-3xl" aria-hidden="true" />

          <div className="relative grid gap-6 px-5 py-6 sm:px-8 sm:py-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-9 lg:py-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-extrabold tracking-[0.18em] text-[#067b3a]">WELCOME BACK</p>
                {requirementsSet ? (
                  <span className="renal-dashboard-diet-set rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-extrabold text-[#067b3a]">MY DIET SET</span>
                ) : (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-extrabold text-amber-700">ONE SMALL STEP TO START</span>
                )}
              </div>

              <h1 className="renal-dashboard-heading mt-3 max-w-[700px] text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-[#12396b] sm:text-5xl lg:text-[3.35rem]">
                Your <span className="text-[#1266c3]">Renal</span><span className="text-[#067b3a]">Plan</span> is ready.
              </h1>

              <p className="renal-dashboard-muted mt-3 max-w-[670px] text-base leading-relaxed text-[#355270] sm:text-lg">
                {plannedMeals > 0
                  ? `${plannedMeals} of 21 meals are planned this week. You've already done some of the hard work.`
                  : requirementsSet
                    ? "Your diet is set. Start building a week of meals that works for you."
                    : "Start with My Diet and we&apos;ll help shape the recipes and nutrition information around your choices."}
              </p>

              <Link
                href="/planner"
                className="renal-dashboard-mychef group mt-5 block max-w-[720px] rounded-2xl border border-emerald-100 bg-white/70 px-4 py-3.5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#067b3a] focus-visible:ring-offset-2 sm:px-5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 shadow-sm transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7.4 13.2c-1.7-.8-2.7-2.1-2.7-3.8 0-2.5 2.1-4.5 4.6-4.5 1 0 1.9.3 2.7.9.8-2 2.3-3.2 4.5-3.2s3.8 1.2 4.5 3.2c.8-.6 1.7-.9 2.7-.9 2.5 0 4.6 2 4.6 4.5 0 1.7-1 3-2.7 3.8" fill="currentColor" opacity="0.14"/>
                      <path d="M7.4 13.2c-1.7-.8-2.7-2.1-2.7-3.8 0-2.5 2.1-4.5 4.6-4.5 1 0 1.9.3 2.7.9.8-2 2.3-3.2 4.5-3.2s3.8 1.2 4.5 3.2c.8-.6 1.7-.9 2.7-.9 2.5 0 4.6 2 4.6 4.5 0 1.7-1 3-2.7 3.8"/>
                      <path d="M6.2 13.2h19.6v5.5H6.2z"/>
                      <path d="M6.2 18.7h19.6M8.8 22h14.4"/>
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#067b3a]">MYCHEF</p>
                      <span className="text-sm font-extrabold text-[#067b3a] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
                    </div>
                    <p className="renal-dashboard-heading mt-1 text-sm font-extrabold text-[#12396b] sm:text-base">Let MyChef curate your week.</p>
                    <p className="renal-dashboard-muted mt-1 text-sm leading-relaxed text-[#355270]">MyChef can choose meals that fit your saved dietary requirements, so you can build a complete week without having to work it all out yourself.</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="renal-dashboard-card rounded-3xl border border-white/90 bg-white/78 p-5 shadow-md backdrop-blur sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1266c3]">YOUR WEEK AT A GLANCE</p>
                  <p className="mt-1 text-sm font-semibold text-[#355270]">A little progress is still progress.</p>
                </div>
                <div className="renal-dashboard-week-badge flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#f0faf5] text-center ring-1 ring-green-100">
                  <div>
                    <p className="text-lg font-extrabold leading-none text-[#067b3a]">{plannedMeals}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-[#4a657f]">of 21</p>
                  </div>
                </div>
              </div>

              <div className="renal-dashboard-progress mt-5 h-3 rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-[#067b3a] via-[#1ba866] to-[#1266c3] transition-all duration-700" style={{ width: `${Math.round((plannedMeals / 21) * 100)}%` }} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-green-50 px-3 py-3 text-center">
                  <p className="text-lg font-extrabold text-[#067b3a]">{plannedMeals}</p>
                  <p className="mt-0.5 text-[11px] font-bold text-slate-500">Meals planned</p>
                </div>
                <div className="rounded-2xl bg-rose-50 px-3 py-3 text-center">
                  <p className="text-lg font-extrabold text-rose-500">{favouriteIds.length}</p>
                  <p className="mt-0.5 text-[11px] font-bold text-slate-500">Favourites</p>
                </div>
                <div className="rounded-2xl bg-violet-50 px-3 py-3 text-center">
                  <p className="text-lg font-extrabold text-violet-700">{shoppingCount}</p>
                  <p className="mt-0.5 text-[11px] font-bold text-slate-500">Shop items</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#1266c3]">TODAY · {todayName || "Your day"}</p>
                  <p className="mt-1 text-sm font-bold text-[#12396b]">{todayMealCount}/3 meals planned</p>
                </div>
                {todayMealCount === 3 ? (
                  <span className="renal-dashboard-day-complete rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-extrabold text-[#067b3a]">DAY COMPLETE ✓</span>
                ) : (
                  <span className="text-xs font-extrabold text-[#1266c3]">Keep going →</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        {journeyOpen ? (
          <section className="renal-dashboard-surface renal-dashboard-reveal mt-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h2 className="renal-dashboard-heading text-2xl font-extrabold tracking-tight text-[#12396b] sm:text-3xl">
                  Your <span className="text-[#1266c3]">Renal</span><span className="text-[#067b3a]">Plan</span> journey
                </h2>
                <p className="renal-dashboard-muted mt-1 text-sm text-slate-600 sm:text-base">
                  Follow these simple steps from your diet to the supermarket.
                </p>
              </div>
              <button
                type="button"
                onClick={toggleJourney}
                aria-expanded={true}
                aria-controls="renalplan-journey"
                className="shrink-0 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-[#12396b] transition hover:bg-slate-50"
              >
                Hide journey
              </button>
            </div>

            <div id="renalplan-journey" className="mt-5 grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {journeySteps.map((step, index) => {
                const styles = colourClasses[step.colour];
                return (
                  <div key={step.number} className={`renal-dashboard-journey-card flex h-full flex-col rounded-2xl border p-4 ${styles.card}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white ${styles.number}`}>
                        {step.number}
                      </span>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${styles.icon}`}>
                        <JourneyIcon index={index} />
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-extrabold leading-tight text-[#12396b]">{step.title}</h3>
                    <p className="renal-dashboard-muted mt-1 flex-1 text-sm leading-relaxed text-slate-600">{step.description}</p>
                    <Link
                      href={step.href}
                      className={`renal-dashboard-journey-button mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl border bg-white/70 px-3 py-2 text-sm font-bold transition ${styles.button}`}
                    >
                      {step.status} →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <button
            type="button"
            onClick={toggleJourney}
            aria-expanded={false}
            aria-controls="renalplan-journey"
            className="renal-dashboard-surface mt-5 flex min-h-14 w-full items-center justify-between rounded-2xl border border-blue-100 bg-white px-5 py-3 text-left shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
          >
            <span className="font-bold text-[#12396b]">
              Your <span className="text-[#1266c3]">Renal</span><span className="text-[#067b3a]">Plan</span> journey
            </span>
            <span className="shrink-0 text-sm font-bold text-[#1266c3]">Show journey →</span>
          </button>
        )}

        {/* WEEK / NUTRITION / FOOD CHECK */}
        <section className="mt-4 grid items-stretch gap-4 xl:grid-cols-[1.25fr_0.9fr_0.9fr]">
          <div className="renal-dashboard-surface renal-dashboard-card renal-dashboard-reveal rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-5 h-full flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="renal-dashboard-heading text-2xl font-extrabold tracking-tight text-[#12396b]">This week&apos;s plan</h2>
                <p className="renal-dashboard-muted mt-1 text-sm text-slate-600">
                  <strong className="text-[#067b3a]">{plannedMeals}</strong> of 21 meals planned
                </p>
              </div>
              <Link href="/planner" className="renal-dashboard-link rounded-xl border border-blue-200 px-3 py-2 text-sm font-bold text-[#1266c3] transition hover:-translate-y-0.5 hover:shadow-sm">View planner →</Link>
            </div>

            <div className="renal-dashboard-progress mt-4 h-3 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-[#067b3a] transition-all duration-700" style={{ width: `${Math.round((plannedMeals / 21) * 100)}%` }} />
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1.5" aria-label="Choose a day to view">
              {days.map((day) => {
                const count = mealTypes.filter((meal) => Boolean(findRecipe(planner?.[day]?.[meal]))).length;
                const selected = day === viewingDay;
                const isToday = day === todayName;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    aria-pressed={selected}
                    aria-label={`${day}: ${count} of 3 meals planned${isToday ? ", today" : ""}`}
                    className="text-center outline-none"
                  >
                    <span className={`renal-dashboard-muted text-[10px] font-bold uppercase tracking-wide sm:text-xs ${selected ? "text-[#1266c3]" : "text-slate-500"}`}>{day.slice(0, 3)}</span>
                    <span className={`mx-auto mt-1 flex h-9 w-9 items-center justify-center rounded-xl text-xs font-extrabold transition duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-[#1266c3] focus-visible:ring-offset-2 ${selected ? "bg-[#12396b] text-white ring-2 ring-[#93c5fd]/60" : count === 3 ? "bg-green-100 text-green-700" : count > 0 ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
                      {count}/3
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="renal-dashboard-encourage mt-5 rounded-2xl border border-green-100 bg-green-50/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#067b3a]">VIEWING · {viewingDay || "Your day"}</p>
                  <p className="mt-1 text-sm font-semibold text-[#12396b]">{viewingMealCount}/3 meals planned</p>
                </div>
                <Link href="/planner" className="shrink-0 rounded-xl bg-[#067b3a] px-3 py-2 text-xs font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#056b32]">Open planner →</Link>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {viewingSlots.filter((slot) => slot.recipe).length > 0 ? (
                viewingSlots.filter((slot) => slot.recipe).map((slot) => (
                  <Link key={`${slot.day}-${slot.meal}`} href="/planner" className="renal-dashboard-soft flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:border-blue-200 hover:bg-blue-50/30">
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold uppercase tracking-wide text-[#1266c3]">{slot.meal}</p>
                      <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{slot.recipe?.name}</p>
                    </div>
                    <DashboardArrow />
                  </Link>
                ))
              ) : plannedMeals > 0 ? (
                <div className="renal-dashboard-soft rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center">
                  <p className="font-bold text-[#12396b]">Nothing planned for {viewingDay || "this day"} yet.</p>
                  <p className="renal-dashboard-muted mt-1 text-sm text-slate-600">Open your planner to add a meal.</p>
                </div>
              ) : (
                <div className="renal-dashboard-soft rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center">
                  <p className="font-bold text-[#12396b]">Your week is waiting.</p>
                  <p className="renal-dashboard-muted mt-1 text-sm text-slate-600">Start adding meals to see your plan here.</p>
                </div>
              )}
            </div>
          </div>

          <div className="renal-dashboard-surface renal-dashboard-card renal-dashboard-reveal h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="renal-dashboard-heading text-2xl font-extrabold tracking-tight text-[#12396b]">Nutrition for {viewingDay || "today"}</h2>
                <p className="renal-dashboard-muted mt-1 text-sm leading-relaxed text-slate-600">Total from all meals planned for {viewingDay || "this day"}.</p>
              </div>
              <Link href="/nutrition" className="renal-dashboard-link shrink-0 text-sm font-bold text-[#1266c3]">View details →</Link>
            </div>

            {hasViewingNutrition ? (
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <div className="renal-dashboard-soft rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold text-slate-500">Energy</p>
                  <p className="mt-1 text-lg font-extrabold text-[#12396b]">{viewingNutrition.calories} kcal</p>
                </div>
                <div className="renal-dashboard-soft rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold text-slate-500">Protein</p>
                  <p className="mt-1 text-lg font-extrabold text-[#12396b]">{viewingNutrition.protein.toFixed(1).replace(/\.0$/, "")} g</p>
                </div>
                <div className="renal-dashboard-soft rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold text-slate-500">Potassium</p>
                  <p className="mt-1 text-lg font-extrabold text-[#12396b]">{viewingNutrition.potassium} mg</p>
                </div>
                <div className="renal-dashboard-soft rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold text-slate-500">Phosphate</p>
                  <p className="mt-1 text-lg font-extrabold text-[#12396b]">{viewingNutrition.phosphate} mg</p>
                </div>
                <div className="renal-dashboard-soft col-span-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold text-slate-500">Salt</p>
                  <p className="mt-1 text-lg font-extrabold text-[#12396b]">{viewingNutrition.salt.toFixed(2).replace(/\.00$/, "")} g</p>
                </div>
              </div>
            ) : (
              <div className="renal-dashboard-soft mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                <p className="font-bold text-[#12396b]">Plan a meal for {viewingDay || "this day"} first.</p>
                <p className="renal-dashboard-muted mt-1 text-sm text-slate-600">Your totals will appear here.</p>
              </div>
            )}
          </div>

          <div className="renal-dashboard-surface renal-dashboard-reveal rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 h-full flex flex-col">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1266c3]">FOOD CHECK</p>
            <h2 className="renal-dashboard-heading mt-2 text-2xl font-extrabold tracking-tight text-[#12396b]">Checking something in the supermarket?</h2>
            <p className="renal-dashboard-muted mt-2 text-sm leading-relaxed text-slate-600">Use Food Check to look up a food while you shop.</p>

            <div className="renal-dashboard-food-illustration mt-4 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 px-4 py-3">
              <div className="flex items-center justify-center">
                <svg viewBox="0 0 420 155" className="h-[125px] w-full" role="img" aria-label="Illustration of a smartphone scanning a food barcode">
                  <defs>
                    <linearGradient id="rpPhone" x1="0" x2="1">
                      <stop offset="0%" stopColor="#12396b" />
                      <stop offset="100%" stopColor="#1266c3" />
                    </linearGradient>
                    <linearGradient id="rpScan" x1="0" x2="1">
                      <stop offset="0%" stopColor="#067b3a" stopOpacity="0" />
                      <stop offset="50%" stopColor="#21c77a" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#067b3a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect x="70" y="10" width="94" height="135" rx="18" fill="url(#rpPhone)" opacity="0.12"/>
                  <rect x="74" y="8" width="94" height="135" rx="18" fill="white" stroke="#9fc8ed" strokeWidth="3"/>
                  <rect x="84" y="24" width="74" height="95" rx="10" fill="#f1f7ff"/>
                  <circle cx="121" cy="17" r="2.3" fill="#9fc8ed"/>
                  <rect x="93" y="35" width="56" height="18" rx="6" fill="#dcecff"/>
                  <path d="M98 44h46" stroke="#1266c3" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
                  <rect x="94" y="63" width="54" height="34" rx="6" fill="white" stroke="#c9deef" strokeWidth="2"/>
                  <path d="M101 74v12M105 71v18M110 75v9M114 70v20M119 74v12M124 71v18M129 76v8M134 69v21M140 74v12" stroke="#12396b" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M94 100h54" stroke="#b8d7f1" strokeWidth="3" strokeLinecap="round"/>
                  <g transform="translate(208 30)">
                    <path d="M22 12h98l14 18v64H8V30L22 12Z" fill="#fffdf7" stroke="#d8cda9" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M8 30h126" stroke="#d8cda9" strokeWidth="3"/>
                    <rect x="40" y="42" width="60" height="16" rx="8" fill="#dff5e8"/>
                    <path d="M51 50h38" stroke="#067b3a" strokeWidth="3" strokeLinecap="round"/>
                    <rect x="37" y="68" width="62" height="25" rx="4" fill="#f8fbff" stroke="#c9deef" strokeWidth="2"/>
                    <path d="M44 75v11M48 73v15M53 76v9M57 72v17M62 75v11M67 73v15M73 76v9M78 72v17M83 74v13M88 76v9" stroke="#12396b" strokeWidth="2.3" strokeLinecap="round"/>
                  </g>
                  <path d="M166 76C190 76 201 76 222 76" stroke="#21c77a" strokeWidth="7" strokeLinecap="round" opacity="0.18"/>
                  <path d="M166 76C190 76 201 76 222 76" stroke="url(#rpScan)" strokeWidth="3.5" strokeLinecap="round"/>
                  <circle cx="178" cy="76" r="4" fill="#067b3a" opacity="0.22"/>
                </svg>
              </div>
              <p className="mt-0.5 text-center text-xs font-semibold text-[#355270]">Scan a product and check it before it goes in your basket.</p>
            </div>

            <div className="mt-4 space-y-2.5">
              <Link href="/FoodCheck" className="flex items-center justify-between rounded-xl bg-[#1266c3] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0d5aa8]"><span>Scan a barcode</span><DashboardArrow /></Link>
              <Link href="/FoodCheck" className="renal-dashboard-soft flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-[#1266c3]"><span>Enter a barcode number</span><DashboardArrow /></Link>
              <Link href="/FoodCheck" className="renal-dashboard-soft flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-[#1266c3]"><span>Search the database</span><DashboardArrow /></Link>
            </div>
          </div>
        </section>

        {/* FAVOURITES + RECOMMENDATION */}
        <section className="mt-5 grid items-start gap-5 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="renal-dashboard-surface rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="renal-dashboard-heading flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[#12396b]">
                <span className="text-rose-500" aria-hidden="true">♥</span> Your favourites
              </h2>
              <Link href="/recipes?favourites=true" className="renal-dashboard-link text-sm font-bold text-[#1266c3]">View all favourites →</Link>
            </div>

            {favouriteRecipes.length > 0 ? (
              <div className="mt-5 grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {favouriteRecipes.map((recipe) => (
                  <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="renal-dashboard-recipe group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    {recipe.image ? (
                      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                        <Image src={recipe.image} alt={recipe.name} width={640} height={480} sizes="(max-width: 640px) 50vw, 240px" className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
                      </div>
                    ) : null}
                    <div className="p-3">
                      <p className="font-bold leading-tight text-[#12396b]">{recipe.name}</p>
                      <p className="renal-dashboard-muted mt-1 text-xs text-slate-500">K {recipe.nutrition?.potassium ?? "—"} · P {recipe.nutrition?.phosphate ?? "—"}</p>
                      <p className="renal-dashboard-muted text-xs text-slate-500">Salt {recipe.nutrition?.salt ?? "—"}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="renal-dashboard-soft mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center">
                <p className="font-bold text-[#12396b]">No favourites yet.</p>
                <p className="renal-dashboard-muted mt-1 text-sm text-slate-600">Save recipes you love and they&apos;ll appear here.</p>
                <Link href="/recipes" className="mt-4 inline-flex rounded-xl bg-[#067b3a] px-4 py-2.5 text-sm font-bold text-white">Find a recipe →</Link>
              </div>
            )}
          </div>

          <div className="renal-dashboard-recommendation renal-dashboard-reveal rounded-3xl border border-green-100 bg-gradient-to-br from-[#effbf5] to-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#067b3a]">JUST FOR YOU</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#12396b]">Recommended for you</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {requirementsSet ? "A recipe chosen around your saved dietary settings and current plan." : "Set your My Diet preferences and RenalPlan can make recommendations around them."}
            </p>

            {recommendedRecipe ? (
              <Link href={`/recipes/${recommendedRecipe.id}`} className="renal-dashboard-recipe mt-5 block overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                {recommendedRecipe.image ? (
                  <Image src={recommendedRecipe.image} alt={recommendedRecipe.name} width={720} height={520} sizes="(max-width: 1024px) 100vw, 420px" className="aspect-[4/3] w-full object-cover" />
                ) : null}
                <div className="p-4">
                  <p className="font-extrabold text-[#12396b]">{recommendedRecipe.name}</p>
                  <p className="mt-1 text-xs font-semibold text-[#067b3a]">Fits your current settings</p>
                  <p className="mt-2 text-xs text-slate-500">K {recommendedRecipe.nutrition?.potassium ?? "—"} · P {recommendedRecipe.nutrition?.phosphate ?? "—"} · Salt {recommendedRecipe.nutrition?.salt ?? "—"}</p>
                </div>
              </Link>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-green-200 bg-white/70 px-4 py-7 text-center">
                <p className="font-bold text-[#12396b]">Ready for inspiration?</p>
                <p className="mt-1 text-sm text-slate-600">Open the Planner and let RenalPlan pick for you.</p>
                <Link href="/planner" className="mt-4 inline-flex rounded-xl bg-[#067b3a] px-4 py-2.5 text-sm font-bold text-white">Open Planner →</Link>
              </div>
            )}
          </div>
        </section>

        {/* Dashboard ends here: navigation and the journey already provide global actions. */}

        {!loaded && (
          <p className="sr-only" aria-live="polite">Loading your RenalPlan dashboard.</p>
        )}
      </div>
    </main>
  );
}

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setLoggedIn(!!user);
    }

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loggedIn) {
    return <LoggedInHome />;
  }

  return (
    <main className="renal-homepage min-h-screen overflow-hidden bg-white text-slate-900">
      <style jsx global>{`
        @keyframes renalFadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes renalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes renalFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-4deg);
          }
          50% {
            transform: translateY(-7px) rotate(-3deg);
          }
        }

        @keyframes renalArrow {
          0%,
          100% {
            transform: translateX(0);
            opacity: 0.65;
          }
          50% {
            transform: translateX(5px);
            opacity: 1;
          }
        }

        @keyframes renalPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }

        @keyframes renalSignupShimmer {
          0%,
          58% {
            transform: translateX(0);
          }
          78%,
          100% {
            transform: translateX(280%);
          }
        }

        .renal-home-signup-shimmer {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .renal-home-signup-shimmer::after {
          content: "";
          position: absolute;
          inset: 0 auto 0 -55%;
          width: 55%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(0);
          animation: renalSignupShimmer 4.8s ease-in-out 1.2s infinite;
          pointer-events: none;
          z-index: 1;
        }

        .renal-home-signup-shimmer > * {
          position: relative;
          z-index: 2;
        }

        .renal-fade-up {
          animation: renalFadeUp 0.7s ease-out both;
        }

        .renal-fade-in {
          animation: renalFadeIn 0.8s ease-out both;
        }

        .renal-float {
          animation: renalFloat 4.5s ease-in-out infinite;
        }

        .renal-arrow {
          animation: renalArrow 1.7s ease-in-out infinite;
        }

        .renal-pulse {
          animation: renalPulse 2.8s ease-in-out infinite;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-brand-renal {
          color: #93c5fd !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-brand-plan {
          color: #86efac !important;
        }

        /* Homepage Food Check promotion: light by default, dark only when RenalPlan
           itself is in dark mode. Do not use Tailwind dark: variants here because the
           site's theme is controlled by html[data-theme], not the device preference. */
        html[data-theme="dark"] .renal-homepage .renal-home-food-check > div > div {
          background: #0c1b27 !important;
          border-color: #21445f !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-food-check .border-slate-200 {
          border-color: #29475c !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-food-check .bg-slate-50 {
          background: #122738 !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-food-check h2 {
          color: #ffffff !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-food-check h2 span {
          color: #45e08a !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-food-check p {
          color: #cbd5e1 !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-food-check .text-slate-800,
        html[data-theme="dark"] .renal-homepage .renal-home-food-check .text-slate-700 {
          color: #edf2f7 !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-food-check .text-slate-600 {
          color: #cbd5e1 !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-food-check .text-[#067b3a] {
          color: #45e08a !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-food-check .text-[#1266c3] {
          color: #7db9ff !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-food-check a[href="/promotional-material/food-check"] {
          color: #ffffff !important;
        }

        /* Homepage benefit statements: blue in light mode, light in dark mode. */
        .renal-homepage .renal-home-benefit,
        .renal-homepage .renal-home-benefit > span:last-child {
          color: #12396b !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-benefit,
        html[data-theme="dark"] .renal-homepage .renal-home-benefit > span:last-child {
          color: #edf2f7 !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-feature-card {
          border-color: #29475c;
          background: #1b3040;
        }

        html[data-theme="dark"] .renal-homepage .renal-home-feature-card:hover {
          background: #21394b;
        }

        /* Feature pop-ups: use the same lighter RenalPlan palette as the navbar. */
        html[data-theme="dark"] .renal-homepage .renal-feature-modal {
          background: #162b3a !important;
          border-color: #29475c !important;
          color: #e6f0f7 !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-feature-modal-title {
          color: #93c5fd !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-feature-modal-eyebrow {
          color: #86efac !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-feature-modal-description,
        html[data-theme="dark"] .renal-homepage .renal-feature-modal-list {
          color: #d5e2ec !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-feature-modal-close {
          background: #21394b !important;
          color: #e6f0f7 !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-feature-modal-signin,
        html.dark .renal-homepage .renal-feature-modal-signin,
        body.dark .renal-homepage .renal-feature-modal-signin {
          border-color: #93c5fd !important;
          background: #93c5fd !important;
          color: #93c5fd !important;
          opacity: 1 !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-feature-modal-signin:hover,
        html.dark .renal-homepage .renal-feature-modal-signin:hover,
        body.dark .renal-homepage .renal-feature-modal-signin:hover {
          background: #bfdbfe !important;
          color: #93c5fd !important;
        }

        html[data-theme="dark"] .renal-homepage .renal-feature-modal-bullet {
          background: #dff5e8 !important;
          color: #078f43 !important;
        }


        @media (prefers-reduced-motion: reduce) {
          .renal-fade-up,
          .renal-fade-in,
          .renal-float,
          .renal-arrow,
          .renal-pulse,
          .renal-home-signup-shimmer::after {
            animation: none !important;
          }

          html {
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="renal-home-hero relative overflow-hidden bg-white">
        <Image
          src="/images/hero-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="absolute inset-0 object-cover object-[72%_center] lg:object-[76%_center]"
        />

        <div className="renal-home-hero-overlay absolute inset-0 bg-gradient-to-r from-white/90 via-white/55 via-[42%] to-transparent lg:via-[47%]" />

        <div className="relative mx-auto flex min-h-[560px] max-w-[1600px] items-center px-5 py-10 sm:min-h-[500px] sm:px-10 sm:py-12 lg:min-h-[420px] lg:px-16 xl:px-24">
          <div className="w-full max-w-[720px] renal-fade-up">
            <h1 className="renal-home-hero-title max-w-[760px] text-[2.7rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#12396b] sm:text-5xl lg:text-[4.05rem]">
              <span className="block">Plan kidney-friendly</span>
              <span className="block">
                meals{" "}
                <span className="text-[#067b3a]">
                  with confidence.
                </span>
              </span>
            </h1>

            <p className="renal-home-hero-copy mt-5 max-w-[620px] text-base leading-[1.48] text-[#17385f] sm:mt-6 sm:text-lg lg:text-[1.18rem]">
              Browse kidney-friendly recipes, or create a free account to
              personalise <span className="renal-home-brand-renal text-[#12396b]">Renal</span><span className="renal-home-brand-plan text-[#067b3a]">Plan</span> to your dietary requirements.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
              <Link
                href="/recipes"
                className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-xl bg-[#067b3a] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#067b3a] hover:shadow-lg"
              >
                Explore recipes
                <span className="text-lg">→</span>
              </Link>

              <Link
                href="/signup"
                className="renal-home-signup-shimmer inline-flex min-h-[56px] items-center justify-center gap-3 rounded-xl bg-[#12396b] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg"
              >
                Create free account
                <span className="text-lg">→</span>
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-7 sm:flex sm:max-w-[650px] sm:gap-x-5">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="renal-home-benefit flex min-w-0 flex-col items-center gap-1.5 text-center text-xs font-semibold leading-tight sm:flex-row sm:items-center sm:gap-2 sm:text-left sm:text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#079447] text-[12px] font-extrabold text-white">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="renal-float absolute right-5 top-8 hidden w-[225px] rotate-[-4deg] rounded-[28%_20%_25%_18%] bg-[#dff5e6] px-5 py-4 text-center text-[1.35rem] font-semibold leading-[1.02] text-[#12396b] shadow-sm lg:block xl:right-16"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            Healthy meals
            <br />
            <span className="text-[#067b3a]">Brighter days ♡</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          MOBILE SHOWCASE VIDEO
          Dedicated mobile video.
          Enlarged on mobile so the actual screen recording is easier
          to see, while keeping the desktop video completely separate.
      ========================================================= */}
      <section
        className="px-2 py-7 sm:px-8 sm:py-8 lg:hidden"
        aria-label="See RenalPlan in action"
      >
        <div className="mx-auto w-full max-w-[760px]">
          <div className="text-center">
            <h2 className="renal-home-section-title text-3xl font-extrabold leading-tight tracking-tight text-[#12396b]">
              See <span className="renal-home-brand-renal">Renal</span><span className="renal-home-brand-plan text-[#067b3a]">Plan</span> in action
            </h2>

            <p className="mx-auto mt-2 max-w-[520px] text-sm leading-relaxed text-[#17385f]">
              From your dietary requirements to your weekly shop — all in one
              place.
            </p>
          </div>

          <div className="relative mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-[#102b4d] shadow-lg">
            <div className="aspect-[9/16] w-full">
              <ShowcaseVideo mobile />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          DESKTOP SHOWCASE VIDEO
      ========================================================= */}
      <section
        className="hidden px-4 py-6 sm:px-8 lg:block lg:px-10 lg:py-8"
        aria-label="See RenalPlan in action"
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-5 text-center">
            <h2 className="renal-home-section-title text-3xl font-extrabold leading-tight tracking-tight text-[#12396b]">
              See <span className="renal-home-brand-renal">Renal</span><span className="renal-home-brand-plan text-[#067b3a]">Plan</span> in action
            </h2>
            <p className="renal-home-section-copy mx-auto mt-2 max-w-[520px] text-sm leading-relaxed text-[#17385f] sm:text-base">
              From your dietary requirements to your weekly shop — all in one place.
            </p>
          </div>
          <div className="renal-home-video-frame overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
            <ShowcaseVideo mobile={false} />
          </div>
        </div>
      </section>

      {/* =========================================================
          FREE JOURNEY
      ========================================================= */}
      <section className="renal-home-free-section px-4 py-4 sm:px-8 lg:px-10">
        <div className="renal-home-free-panel mx-auto max-w-[1450px] rounded-3xl bg-gradient-to-r from-[#effbf5] to-[#f8fcfa] px-5 py-6 shadow-sm sm:px-7 lg:px-8 lg:py-7">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_2fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#d5f5e5] px-4 py-1.5 text-xs font-extrabold tracking-wide text-[#067b3a]">
                FREE FOR EVERYONE
              </span>

              <h2 className="renal-home-section-title mt-3 text-2xl font-extrabold tracking-tight text-[#12396b] sm:text-3xl">
                Your journey in 3 simple steps
              </h2>

              <p className="renal-home-section-copy mt-2 text-sm leading-relaxed text-[#17385f] sm:text-base">
                Explore RenalPlan for free. No account needed.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {freeSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative renal-fade-up"
                  style={{
                    animationDelay: `${index * 140 + 180}ms`,
                  }}
                >
                  <Link
                    href={step.href}
                    className={`group block min-h-0 rounded-2xl border p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:min-h-[150px] sm:p-4 ${step.cardClass}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`renal-home-step-number flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm ${step.numberClass}`}
                        >
                          {step.number}
                        </span>
                        <h3 className="renal-home-card-title text-sm font-bold leading-tight text-[#12396b] sm:text-base">
                          {step.title}
                        </h3>
                      </div>

                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${step.iconClass}`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    <p className="renal-home-card-copy mt-1 hidden text-xs leading-snug text-slate-700 sm:block">
                      {step.description}
                    </p>
                  </Link>

                  {index < freeSteps.length - 1 && (
                    <span
                      className="renal-arrow pointer-events-none absolute -bottom-5 left-1/2 z-10 -translate-x-1/2 rotate-90 text-2xl font-light text-[#067b3a] md:-right-3 md:bottom-auto md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:rotate-0 md:text-3xl"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOD CHECK PROMOTION
          Wider/taller demo with benefits alongside the video.
      ========================================================= */}
      <section className="renal-home-food-check px-4 py-5 sm:px-8 lg:px-10 lg:py-7">
        <div className="mx-auto max-w-[1450px]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid items-stretch gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:p-9">

              {/* Copy */}
              <div className="order-1 flex h-full flex-col lg:order-1">
                <p className="text-xs font-extrabold tracking-[0.14em] text-[#067b3a]">
                  FOOD CHECK
                </p>

                <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-slate-800 sm:text-4xl lg:text-[2.65rem]">
                  Check food{" "}
                  <span className="block text-[#067b3a]">before you buy it.</span>
                </h2>

                <p className="mt-4 max-w-[590px] text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
                  See a food in the supermarket? <span className="renal-home-brand-renal text-slate-800">Renal</span><span className="renal-home-brand-plan text-[#067b3a]">Plan</span> gives you three simple
                  ways to find it and check its nutritional information — so you
                  can make a more informed choice.
                </p>

                <div className="mt-6 max-w-[610px]">
                  <div className="flex items-start gap-3 border-b border-slate-200 py-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#079447] text-sm font-extrabold text-white">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">
                        Scan a barcode
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        Quickly scan the barcode on a food packet.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-b border-slate-200 py-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#079447] text-sm font-extrabold text-white">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">
                        Enter a barcode
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        If scanning isn't practical, enter the barcode number manually.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 py-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#079447] text-sm font-extrabold text-white">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">
                        Search for a food
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        Can't find a barcode? Search for the food by name instead.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/promotional-material/food-check"
                  className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-3 rounded-xl bg-[#067b3a] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#067b3a] hover:shadow-lg"
                >
                  Discover Food Check <span className="text-lg">→</span>
                </Link>

                <div className="mt-auto max-w-[610px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#067b3a]">
                    Nutritional reference
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    RenalPlan uses McCance and Widdowson’s
                    <span className="font-semibold text-slate-700"> Composition of Foods Integrated Dataset (CoFID) 2021</span>
                    {" "}as a key reference for food nutrient values.
                  </p>
                  <a
                    href="https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-bold text-[#1266c3] hover:underline"
                  >
                    View the CoFID 2021 reference →
                  </a>
                </div>
              </div>

              {/* Video */}
              <div className="order-2 lg:order-2">
                <div className="mx-auto w-full max-w-[390px] lg:max-w-[430px]">

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    <LazyFoodCheckVideo />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACCOUNT / PREMIUM FEATURES
      ========================================================= */}
      <section className="renal-home-account-section px-4 py-4 sm:px-8 lg:px-10">
        <div className="renal-home-account-panel mx-auto max-w-[1450px] rounded-3xl bg-gradient-to-br from-[#eef7ff] to-[#f8fbff] px-5 py-6 shadow-sm sm:px-7 lg:px-8 lg:py-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_2fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#d9ecff] px-4 py-1.5 text-xs font-extrabold tracking-wide text-[#1266c3]">
                WITH A RENALPLAN ACCOUNT
              </span>

              <h2 className="renal-home-section-title mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-3xl lg:text-[2.25rem]">
                Get more with a free{" "}
                <span><span className="renal-home-brand-renal text-[#1266c3]">Renal</span><span className="renal-home-brand-plan text-[#067b3a]">Plan</span></span> account
              </h2>

              <p className="renal-home-section-copy mt-3 max-w-[430px] text-sm leading-relaxed text-slate-700 sm:text-base">
                Personalise <span className="renal-home-brand-renal text-[#12396b]">Renal</span><span className="renal-home-brand-plan text-[#067b3a]">Plan</span> to your needs and unlock extra features
                that make meal planning even easier.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {accountFeatures.map((feature, index) => (
                <button
                  key={feature.title}
                  type="button"
                  style={{
                    animationDelay: `${index * 110 + 120}ms`,
                  }}
                  onClick={() => setSelectedFeature(feature.title)}
                  aria-haspopup="dialog"
                  className="renal-home-feature-card renal-fade-up group w-full rounded-2xl border border-white/80 bg-white/80 p-4 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1266c3] focus-visible:ring-offset-2 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${feature.iconClass}`}
                    >
                      {feature.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="renal-home-card-title font-bold text-[#12396b] dark:text-[#93c5fd]">
                          {feature.title}
                        </h3>

                        {feature.badge && (
                          <span className="rounded-full bg-[#ffb15c] px-2.5 py-0.5 text-[10px] font-bold text-[#12396b]">
                            {feature.badge}
                          </span>
                        )}
                        <span className="ml-auto text-lg text-[#1266c3] transition group-hover:translate-x-0.5 dark:text-[#7db9ff]" aria-hidden="true">
                          →
                        </span>
                      </div>

                      <p className="renal-home-card-copy mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CLOSING CTA
      ========================================================= */}
      <section className="renal-home-cta border-t border-green-50 bg-gradient-to-b from-[#f4fbf7] to-white px-4 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="renal-fade-up mx-auto max-w-[1400px] text-center">
          <h2 className="renal-home-section-title text-3xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-4xl">
            Plan <span className="text-[#067b3a]">→</span> Shop{" "}
            <span className="text-[#067b3a]">→</span> Relax
            <br />
            with <span className="renal-home-brand-renal text-[#12396b]">Renal</span>
            <span className="renal-home-brand-plan text-[#067b3a]">Plan</span>
          </h2>

          <Link
            href="/signup"
            className="renal-home-signup-shimmer mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-[#12396b] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg"
          >
            Create free account
            <span className="text-lg">→</span>
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="renal-home-footer border-t border-slate-100 bg-white px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div>
            <div className="text-lg font-bold">
              <span className="renal-home-brand-renal text-[#12396b]">Renal</span>
              <span className="renal-home-brand-plan text-[#067b3a]">Plan</span>
            </div>

            <Link
              href="/privacy"
              className="mt-1 inline-block text-sm font-semibold text-[#1266c3] transition hover:text-[#067b3a] hover:underline"
            >
              Security and Data Protection
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-slate-600 sm:items-end sm:text-right">
            <Link href="/about" className="font-semibold transition hover:opacity-80">
              <span className="renal-home-about-label">About </span><span className="renal-home-brand-renal text-[#12396b]">Renal</span>
              <span className="renal-home-brand-plan text-[#067b3a]">Plan</span>
            </Link>

            <span>
              <span>Do you have any questions or need help? </span>
              <a
                href="mailto:hello@renalplan.com"
                className="font-semibold text-[#067b3a] transition hover:text-[#067b3a]"
              >
                Contact us
              </a>
            </span>
          </div>
        </div>
      </footer>

      {selectedFeature && featureDetails[selectedFeature] && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#071a30]/65 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedFeature(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="renal-feature-modal-title"
            aria-describedby="renal-feature-modal-description"
            className="renal-feature-modal relative max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-transparent bg-white p-6 pb-7 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setSelectedFeature(null)}
              aria-label="Close feature information"
              className="renal-feature-modal-close absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl leading-none text-slate-600 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7db9ff]"
            >
              ×
            </button>

            <div className="pr-10">
              <p className="renal-feature-modal-eyebrow text-xs font-extrabold tracking-[0.14em] text-[#067b3a]">
                {featureDetails[selectedFeature].eyebrow}
              </p>
              <h2
                id="renal-feature-modal-title"
                className="renal-feature-modal-title mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-3xl"
              >
                {featureDetails[selectedFeature].heading}
              </h2>
            </div>

            <p
              id="renal-feature-modal-description"
              className="renal-feature-modal-description mt-4 text-sm leading-relaxed text-slate-700 sm:text-base"
            >
              {featureDetails[selectedFeature].description}
            </p>

            <ul className="mt-5 space-y-3">
              {featureDetails[selectedFeature].bullets.map((bullet) => (
                <li key={bullet} className="renal-feature-modal-list flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                  <span className="renal-feature-modal-bullet mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dff5e8] text-xs font-extrabold text-[#067b3a]" aria-hidden="true">
                    ✓
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#067b3a] px-5 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#067b3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#078f43] focus-visible:ring-offset-2"
              >
                Create Your Free Account
              </Link>
              <Link
                href="/auth/login"
                className="renal-feature-modal-signin inline-flex min-h-12 items-center justify-center rounded-xl border border-[#1266c3]/30 bg-white px-5 py-3 text-center text-sm font-bold text-[#1266c3] transition hover:bg-[#eff6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7db9ff] focus-visible:ring-offset-2 text-[#93c5fd]"
              >
                Sign In
              </Link>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
              Close this window to keep exploring the homepage.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}