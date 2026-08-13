"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type RecipeCardProps = {
  recipe: {
    id: string;
    code: string;
    emoji: string;
    image: string;
    name: string;
    description: string;
    cookingTime: string;
    calories: string;
    protein: string;
    equipment: string;
  };
};

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

function getShortDay(day: string) {
  return day.slice(0, 3);
}

type Placement = {
  day: string;
  meal: string;
};

type PendingSlot = {
  day: string;
  meal: string;
};

export default function RecipeCard({
  recipe,
}: RecipeCardProps) {
  const [showSidney, setShowSidney] =
    useState(false);

  const [sidneyMessage, setSidneyMessage] =
    useState("");

  const [showPlanner, setShowPlanner] =
    useState(false);

  const [placements, setPlacements] =
    useState<Placement[]>([]);

  const [plannerDay, setPlannerDay] =
    useState("Monday");

  const [plannerMeal, setPlannerMeal] =
    useState(
      getDefaultMealType(recipe.code)
    );

  const [pendingSlot, setPendingSlot] =
    useState<PendingSlot | null>(null);

  const sidneyMessages = [
    "Excellent!",
    "Enjoy!",
    "Tasty!",
    "Lovely!",
    "Great Choice!",
    "Yum!",
    "Delicious!",
    "Wow!",
    "Brilliant!",
    "Nice!",
  ];

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
            recipe.id
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

  function loadPlannerStatus() {
    setPlacements(
      getRecipePlacements()
    );
  }

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
        slot?.meal
      ) {
        setPendingSlot({
          day: slot.day,
          meal: slot.meal,
        });

        setPlannerDay(
          slot.day
        );

        setPlannerMeal(
          slot.meal
        );
      }
    } catch {
      setPendingSlot(null);
    }
  }

  useEffect(() => {
    loadPlannerStatus();
    loadPendingSlot();

    window.addEventListener(
      "weekly-planner-updated",
      loadPlannerStatus
    );

    window.addEventListener(
      "storage",
      loadPlannerStatus
    );

    return () => {
      window.removeEventListener(
        "weekly-planner-updated",
        loadPlannerStatus
      );

      window.removeEventListener(
        "storage",
        loadPlannerStatus
      );
    };
  }, [recipe.id]);

  function addToPendingSlot() {
    if (!pendingSlot) {
      return false;
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

    const randomMessage =
      sidneyMessages[
        Math.floor(
          Math.random() *
            sidneyMessages.length
        )
      ];

    setSidneyMessage(
      randomMessage
    );

    setShowSidney(true);

    window.setTimeout(() => {
      setShowSidney(false);
    }, 1500);

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

    return true;
  }

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
          recipe.code
        )
      );
    }

    setShowPlanner(true);
  }

  function addToPlanner() {
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

    const updatedPlacements =
      getRecipePlacements();

    setPlacements(
      updatedPlacements
    );

    const randomMessage =
      sidneyMessages[
        Math.floor(
          Math.random() *
            sidneyMessages.length
        )
      ];

    setSidneyMessage(
      randomMessage
    );

    setShowSidney(true);

    window.setTimeout(() => {
      setShowSidney(false);
    }, 1500);

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
  }

  function removeFromPlanner() {
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

  function getPlannerButtonText() {
    if (pendingSlot) {
      return `${getShortDay(
        pendingSlot.day
      )} • ${pendingSlot.meal}`;
    }

    if (placements.length === 0) {
      return "Add to Planner";
    }

    if (placements.length === 1) {
      return `${getShortDay(
        placements[0].day
      )} • ${placements[0].meal}`;
    }

    return `${placements.length} places`;
  }

  return (
    <div className="relative flex h-full overflow-visible rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">

      {/* Recipe image */}
      <Link
        href={`/recipes/${recipe.id}`}
        className="shrink-0"
      >
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={120}
          height={120}
          className="h-full min-h-[150px] w-28 rounded-l-xl object-cover"
        />
      </Link>

      {/* Recipe information */}
      <div className="flex min-w-0 flex-1 flex-col p-4">

        <Link
          href={`/recipes/${recipe.id}`}
        >
          <h2 className="text-lg font-bold text-slate-900 transition hover:text-orange-600">
            {recipe.name}
          </h2>

          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
            {recipe.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">

            <span>
              ⏱️ {recipe.cookingTime}
            </span>

            <span>
              🔥 {recipe.calories}
            </span>

          </div>
        </Link>

        {/* Bottom controls */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">

          <div className="relative min-w-0 flex-1">

            <button
              type="button"
              onClick={
                openPlanner
              }
              className={`inline-flex h-9 max-w-full items-center justify-center whitespace-nowrap rounded-lg px-2.5 text-xs font-semibold transition sm:px-3 sm:text-sm ${
                pendingSlot
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : placements.length > 0
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              <span className="mr-1">
                📅
              </span>

              {/* Short label on mobile */}
              <span className="sm:hidden">
                {pendingSlot
                  ? `${getShortDay(
                      pendingSlot.day
                    )} • ${
                      pendingSlot.meal
                    }`
                  : placements.length ===
                    0
                  ? "Plan"
                  : getPlannerButtonText()}
              </span>

              {/* Full label on desktop */}
              <span className="hidden sm:inline">
                {getPlannerButtonText()}
              </span>
            </button>

            {/* Sidney */}
            {showSidney && (
              <div className="pointer-events-none absolute left-0 top-full z-50 mt-1 flex items-start gap-1">

                <img
                  src="/images/sidney/sidney-recipes.png"
                  alt="Sidney"
                  className="h-20 w-20 object-contain"
                />

                <div className="relative mt-1 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-lg">

                  <div className="absolute left-[-6px] top-3 h-0 w-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-white" />

                  {sidneyMessage}

                </div>

              </div>
            )}

          </div>

          <Link
            href={`/recipes/${recipe.id}`}
            className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap px-1 text-xs font-semibold text-orange-600 hover:text-orange-700 sm:px-2 sm:text-sm"
          >
            View Recipe →
          </Link>

        </div>

      </div>

      {/* Planner popup */}
      {showPlanner && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center">

          <div className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-xl">

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

              <div className="border-t border-gray-200 pt-4">

                <h3 className="mb-3 text-sm font-bold text-slate-700">
                  Add another placement
                </h3>

                <div className="mb-4">

                  <label
                    htmlFor={`planner-day-${recipe.id}`}
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Day
                  </label>

                  <select
                    id={`planner-day-${recipe.id}`}
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

                <div className="mb-4">

                  <label
                    htmlFor={`planner-meal-${recipe.id}`}
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Meal
                  </label>

                  <select
                    id={`planner-meal-${recipe.id}`}
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
                  className="w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600"
                >
                  Add to Planner
                </button>

              </div>

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

    </div>
  );
}