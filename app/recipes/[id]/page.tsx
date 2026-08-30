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

type PendingSlot = {
  day: string;
  meal: string;
};

type RecipeSource = {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  linkText?: string;
};

function getRecipeSource(recipe: typeof recipes[number]): RecipeSource | null {
  const source = (recipe as typeof recipe & {
    source?: RecipeSource;
  }).source;

  if (!source) {
    return null;
  }

  if (source.name?.toLowerCase().startsWith("kidney care uk")) {
    return {
      ...source,
      logo: "/images/kidneycareuk.svg",
    };
  }

  return source;
}

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

  const [pendingSlot, setPendingSlot] =
    useState<PendingSlot | null>(
      null
    );

  const [isFavourite, setIsFavourite] =
    useState(false);

  function loadFavouriteStatus() {
    if (!recipe) {
      setIsFavourite(false);
      return;
    }

    try {
      const saved =
        localStorage.getItem(
          "meal-planner-favourites"
        );

      if (!saved) {
        setIsFavourite(false);
        return;
      }

      const favourites =
        JSON.parse(saved);

      setIsFavourite(
        Array.isArray(favourites) &&
          favourites.includes(recipe.id)
      );
    } catch {
      setIsFavourite(false);
    }
  }

  function toggleFavourite() {
    if (!recipe) {
      return;
    }

    try {
      const saved =
        localStorage.getItem(
          "meal-planner-favourites"
        );

      const favourites = saved
        ? JSON.parse(saved)
        : [];

      const currentFavourites =
        Array.isArray(favourites)
          ? favourites
          : [];

      const nextFavourites =
        currentFavourites.includes(recipe.id)
          ? currentFavourites.filter(
              (id: string) => id !== recipe.id
            )
          : [...currentFavourites, recipe.id];

      localStorage.setItem(
        "meal-planner-favourites",
        JSON.stringify(nextFavourites)
      );

      setIsFavourite(
        nextFavourites.includes(recipe.id)
      );

      window.dispatchEvent(
        new Event("meal-planner-favourites-updated")
      );
    } catch {
      // Ignore storage errors.
    }
  }

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
   * Check whether the Planner sent us
   * here with a specific slot to fill.
   */
  function loadPendingSlot() {
    const saved =
      localStorage.getItem(
        "planner-pending-slot"
      );

    if (!saved) {
      setPendingSlot(null);
      return;
    }

    try {
      const slot =
        JSON.parse(saved);

      if (
        slot?.day &&
        slot?.meal &&
        days.includes(slot.day) &&
        mealTypes.includes(slot.meal)
      ) {
        setPendingSlot({
          day: slot.day,
          meal: slot.meal,
        });
      } else {
        setPendingSlot(null);

        localStorage.removeItem(
          "planner-pending-slot"
        );
      }
    } catch {
      setPendingSlot(null);

      localStorage.removeItem(
        "planner-pending-slot"
      );
    }
  }

  /*
   * Load planner locations and any
   * pending Planner slot.
   */
  function loadPlannerStatus() {
    if (!recipe) {
      return;
    }

    setPlacements(
      getRecipePlacements()
    );

    loadPendingSlot();
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
    loadFavouriteStatus();

    window.addEventListener(
      "weekly-planner-updated",
      loadPlannerStatus
    );

    window.addEventListener(
      "meal-planner-favourites-updated",
      loadFavouriteStatus
    );

    window.addEventListener(
      "storage",
      loadPlannerStatus
    );

    window.addEventListener(
      "storage",
      loadFavouriteStatus
    );

    return () => {
      window.removeEventListener(
        "weekly-planner-updated",
        loadPlannerStatus
      );

      window.removeEventListener(
        "meal-planner-favourites-updated",
        loadFavouriteStatus
      );

      window.removeEventListener(
        "storage",
        loadPlannerStatus
      );

      window.removeEventListener(
        "storage",
        loadFavouriteStatus
      );
    };
  }, [recipe?.id]);

  /*
   * Add this recipe directly to the
   * Planner slot selected before coming
   * to Recipes.
   */
  function addToPendingSlot() {
    if (!recipe || !pendingSlot) {
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

    planner[pendingSlot.day][
      pendingSlot.meal
    ] = recipe.id;

    localStorage.setItem(
      "weekly-planner",
      JSON.stringify(
        planner
      )
    );

    localStorage.removeItem(
      "planner-pending-slot"
    );

    setPendingSlot(null);

    setPlacements(
      getRecipePlacements()
    );

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

    window.location.href = "/planner";
  }

  /*
   * Open the Planner.
   */
  function openPlanner() {
    if (pendingSlot) {
      addToPendingSlot();
      return;
    }

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
   * Normal Add to Planner workflow.
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

    planner[plannerDay][
      plannerMeal
    ] = recipe.id;

    localStorage.setItem(
      "weekly-planner",
      JSON.stringify(
        planner
      )
    );

    setPlacements(
      getRecipePlacements()
    );

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

    setShowPlanner(false);

    window.location.href = "/planner";
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
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-4 sm:pb-24 sm:pt-6">

      {/* Desktop recipe detail */}
      <div className="hidden lg:block">

        <div className="mb-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center rounded-lg px-1 py-1 text-sm font-semibold text-slate-600 transition hover:text-orange-600"
          >
            ← Back
          </button>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-[1.05fr_0.95fr]">

            <div className="relative min-h-[470px]">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col p-10">
              <div className="mb-5 flex items-start justify-between gap-6">
                <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                  {getDefaultMealType(recipe.code ?? "")}
                </span>

                <button
                  type="button"
                  onClick={toggleFavourite}
                  aria-pressed={isFavourite}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    isFavourite
                      ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {isFavourite
                    ? "★ Favourite"
                    : "☆ Favourite"}
                </button>

              </div>

              <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
                {recipe.name}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                {recipe.description}
              </p>

              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <div className="grid grid-cols-3 divide-x divide-y divide-slate-200">

                  <div className="px-3 py-4 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-orange-500">Time</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">{recipe.cookingTime}</div>
                  </div>

                  <div className="px-3 py-4 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-orange-500">Calories</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">{recipe.nutrition.calories}</div>
                  </div>

                  <div className="px-3 py-4 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-orange-500">Protein</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">{recipe.nutrition.protein}</div>
                  </div>

                  <div className="px-3 py-4 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-orange-500">Sodium</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">{recipe.nutrition.sodium}</div>
                  </div>

                  <div className="px-3 py-4 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-orange-500">Potassium</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">{recipe.potassium}</div>
                  </div>

                  <div className="px-3 py-4 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-orange-500">Phosphate</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">{recipe.phosphate}</div>
                  </div>

                  <div className="px-3 py-4 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-orange-500">Purines</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">{recipe.purines}</div>
                  </div>

                </div>
              </div>

              <button
                type="button"
                onClick={openPlanner}
                className="mt-auto w-full rounded-xl bg-green-700 px-5 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-green-800"
              >
                {placements.length > 0
                  ? "📅 Add Another to Planner"
                  : "📅 Add to Planner"}
              </button>
            </div>

          </div>
        </section>

        <section className="mt-8 grid grid-cols-2 gap-8">

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-2xl font-extrabold text-slate-900">
              Ingredients
            </h2>

            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                >
                  <span className="mt-1 text-orange-500">•</span>
                  <span className="text-base leading-7 text-slate-700">
                    <strong className="font-semibold text-slate-900">
                      {ingredient.quantity}
                    </strong>{" "}
                    {ingredient.item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-xl bg-slate-50 p-4">
              <h3 className="mb-1 text-sm font-bold text-slate-900">Equipment</h3>
              <p className="text-sm leading-6 text-slate-600">{recipe.equipment}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-2xl font-extrabold text-slate-900">
              Method
            </h2>

            <ol className="space-y-4">
              {recipe.method.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-extrabold text-orange-600">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-base leading-7 text-slate-700">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

        </section>

        <section className="mt-8 grid grid-cols-2 gap-8">

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-2xl font-extrabold text-slate-900">
              Nutrition
            </h2>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs text-slate-500">Calories</span><strong>{recipe.nutrition.calories}</strong></div>
              <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs text-slate-500">Protein</span><strong>{recipe.nutrition.protein}</strong></div>
              <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs text-slate-500">Carbohydrates</span><strong>{recipe.nutrition.carbohydrates}</strong></div>
              <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs text-slate-500">Fat</span><strong>{recipe.nutrition.fat}</strong></div>
              <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs text-slate-500">Fibre</span><strong>{recipe.nutrition.fibre}</strong></div>
              <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs text-slate-500">Sodium</span><strong>{recipe.nutrition.sodium}</strong></div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-2xl font-extrabold text-slate-900">
              Dietary Guide
            </h2>

            <div className="space-y-3">
              <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                🥔 <strong>Potassium:</strong> {recipe.potassium}
              </p>
              <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                🧀 <strong>Phosphate:</strong> {recipe.phosphate}
              </p>
              <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                🍖 <strong>Purines:</strong> {recipe.purines}
              </p>
              {recipe.dietaryNote && (
                <p className="text-sm leading-6 text-slate-600">{recipe.dietaryNote}</p>
              )}
            </div>
          </div>

        </section>

        {/* Source */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-5 text-2xl font-extrabold text-slate-900">
            Source
          </h2>

          {getRecipeSource(recipe)?.url ? (
            <a
              href={getRecipeSource(recipe)?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-xl bg-slate-50 p-5 transition hover:bg-slate-100"
            >
              {getRecipeSource(recipe)?.name?.toLowerCase().startsWith("kidney planner original") ? (
                <span
                  aria-label="GOV.UK"
                  className="flex h-14 w-[120px] shrink-0 items-center justify-center bg-slate-900 px-3 text-2xl font-bold tracking-tight text-white"
                >
                  GOV.UK
                </span>
              ) : getRecipeSource(recipe)?.logo ? (
                <Image
                  src={getRecipeSource(recipe)?.logo ?? ""}
                  alt={`${getRecipeSource(recipe)?.name ?? "Source"} logo`}
                  width={120}
                  height={60}
                  className="h-14 w-auto object-contain"
                />
              ) : null}

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-500">
                  Recipe source
                </p>
                <p className="mt-1 text-base font-bold text-slate-900 group-hover:text-orange-600">
                  {getRecipeSource(recipe)?.name ?? "View source recipe"}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {getRecipeSource(recipe)?.description ??
                    "View the original recipe on the source website"}{" "}
                  {getRecipeSource(recipe)?.linkText
                    ? `• ${getRecipeSource(recipe)?.linkText}`
                    : "↗"}
                </p>
              </div>
            </a>
          ) : (
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-base font-semibold text-slate-900">
                Source reference to be added
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                The source information for this recipe will be added when available.
              </p>
            </div>
          )}
        </section>

      </div>

      <div className="lg:hidden">
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-4 sm:pb-24 sm:pt-6">

      {/* Back to Recipes */}
      <div className="mb-4 sm:mb-5">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center rounded-lg px-1 py-1 text-sm font-semibold text-slate-600 transition hover:text-orange-600"
        >
          ← Back
        </button>
      </div>

      {/* Recipe image */}
      <Image
        src={recipe.image}
        alt={recipe.name}
        width={1200}
        height={700}
        className="mb-4 h-44 w-full rounded-xl object-cover sm:mb-6 sm:h-80"
      />

      {/* Title */}
      <h1 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
        {recipe.name}
      </h1>

      <button
        type="button"
        onClick={toggleFavourite}
        aria-pressed={isFavourite}
        className={`mb-4 rounded-xl px-4 py-2 text-sm font-semibold transition ${
          isFavourite
            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        {isFavourite
          ? "★ Favourite"
          : "☆ Favourite"}
      </button>

      {/* Description */}
      <p className="mb-4 text-base leading-snug sm:mb-6 sm:text-lg sm:leading-normal">
        {recipe.description}
      </p>

      {/* Recipe summary */}
      <div className="mb-6 grid grid-cols-3 gap-2 sm:mb-8 sm:gap-4">

        <div className="rounded-lg border p-2 text-center sm:p-4">

          <div className="text-lg sm:text-2xl">
            ⏱️
          </div>

          <strong className="block text-[11px] leading-tight sm:text-base">
            Cooking Time
          </strong>

          <p className="mt-1 text-xs sm:text-base">
            {recipe.cookingTime}
          </p>

        </div>

        <div className="rounded-lg border p-2 text-center sm:p-4">

          <div className="text-lg sm:text-2xl">
            🔥
          </div>

          <strong className="block text-[11px] leading-tight sm:text-base">
            Calories
          </strong>

          <p className="mt-1 text-xs sm:text-base">
            {recipe.calories}
          </p>

        </div>

        <div className="rounded-lg border p-2 text-center sm:p-4">

          <div className="text-lg sm:text-2xl">
            💪
          </div>

          <strong className="block text-[11px] leading-tight sm:text-base">
            Protein
          </strong>

          <p className="mt-1 text-xs sm:text-base">
            {recipe.protein}
          </p>

        </div>

        <div className="rounded-lg border p-2 text-center sm:p-4">

          <div className="text-lg sm:text-2xl">
            🧂
          </div>

          <strong className="block text-[11px] leading-tight sm:text-base">
            Sodium
          </strong>

          <p className="mt-1 text-xs sm:text-base">
            {recipe.nutrition.sodium}
          </p>

        </div>

      </div>

      {/* Equipment */}
      <h2 className="mb-2 mt-5 text-xl font-bold sm:mt-6">
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

        <p>
          Sodium:{" "}
          {recipe.nutrition.sodium}
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

      {/* Source */}
      <h2 className="mb-2 mt-8 text-xl font-bold">
        Source
      </h2>

      {getRecipeSource(recipe)?.url ? (
        <a
          href={getRecipeSource(recipe)?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-lg border p-4 transition hover:bg-slate-50"
        >
          {getRecipeSource(recipe)?.name?.toLowerCase().startsWith("kidney planner original") ? (
            <span
              aria-label="GOV.UK"
              className="flex h-12 w-[100px] shrink-0 items-center justify-center bg-slate-900 px-2 text-xl font-bold tracking-tight text-white"
            >
              GOV.UK
            </span>
          ) : getRecipeSource(recipe)?.logo ? (
            <Image
              src={getRecipeSource(recipe)?.logo ?? ""}
              alt={`${getRecipeSource(recipe)?.name ?? "Source"} logo`}
              width={100}
              height={50}
              className="h-12 w-auto object-contain"
            />
          ) : null}

          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-500">
              Recipe source
            </p>
            <p className="mt-1 text-base font-bold text-slate-900">
              {getRecipeSource(recipe)?.name ?? "View source recipe"} ↗
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {getRecipeSource(recipe)?.description ??
                "View the original recipe on the source website"}
              {getRecipeSource(recipe)?.linkText
                ? ` • ${getRecipeSource(recipe)?.linkText}`
                : ""}
            </p>
          </div>
        </a>
      ) : (
        <div className="rounded-lg border p-4">
          <p className="font-semibold text-slate-900">
            Source reference to be added
          </p>
          <p className="mt-1 text-sm text-slate-600">
            The source information for this recipe will be added when available.
          </p>
        </div>
      )}

      {/* Back to Recipes */}
      <div className="mt-8">

        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          ← Back
        </button>

      </div>

      </main>

      {/* Floating Add to Planner button */}
      <div className="fixed bottom-4 right-4 z-40 lg:hidden">

        <button
          type="button"
          onClick={openPlanner}
          className="rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-green-800"
        >
          {placements.length > 0
            ? "📅 Add Another to Planner"
            : "📅 Add to Planner"}
        </button>

      </div>

    </div>

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
                  className="w-full rounded-xl bg-green-700 px-4 py-3 font-bold text-white transition hover:bg-green-800"
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