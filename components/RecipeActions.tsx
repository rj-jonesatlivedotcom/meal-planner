"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { recipes } from "@/data/recipes";

type Props = {
  recipeId: string;
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

function getDefaultMealType(
  recipeCode: string
) {
  const firstLetter =
    recipeCode?.charAt(0).toUpperCase();

  if (firstLetter === "B") {
    return "Breakfast";
  }

  if (firstLetter === "L") {
    return "Lunch";
  }

  return "Dinner";
}

export default function RecipeActions({
  recipeId,
}: Props) {
  const [added, setAdded] =
    useState(false);

  const [showPlanner, setShowPlanner] =
    useState(false);

  const recipe = recipes.find(
    (item) =>
      item.id === recipeId
  );

  const recipeCode =
    recipe?.code ?? "";

  const [plannerDay, setPlannerDay] =
    useState("Monday");

  const [plannerMeal, setPlannerMeal] =
    useState(
      getDefaultMealType(
        recipeCode
      )
    );

  useEffect(() => {
    function loadShoppingStatus() {
      const saved =
        localStorage.getItem(
          "shopping-data"
        );

      if (!saved) {
        setAdded(false);
        return;
      }

      try {
        const data =
          JSON.parse(saved);

        setAdded(
          (
            data.selectedRecipes ??
            []
          ).includes(recipeId)
        );
      } catch {
        setAdded(false);
      }
    }

    loadShoppingStatus();

    window.addEventListener(
      "shopping-list-updated",
      loadShoppingStatus
    );

    return () => {
      window.removeEventListener(
        "shopping-list-updated",
        loadShoppingStatus
      );
    };
  }, [recipeId]);

  function toggleRecipe() {
    const saved =
      localStorage.getItem(
        "shopping-data"
      );

    const data = saved
      ? JSON.parse(saved)
      : {
          selectedRecipes: [],
          shoppingList: [],
          checkedItems: [],
          people: 1,
        };

    const selectedRecipes =
      data.selectedRecipes ?? [];

    if (
      selectedRecipes.includes(
        recipeId
      )
    ) {
      data.selectedRecipes =
        selectedRecipes.filter(
          (id: string) =>
            id !== recipeId
        );

      setAdded(false);
    } else {
      data.selectedRecipes = [
        ...selectedRecipes,
        recipeId,
      ];

      setAdded(true);
    }

    localStorage.setItem(
      "shopping-data",
      JSON.stringify(data)
    );

    window.dispatchEvent(
      new Event(
        "shopping-list-updated"
      )
    );
  }

  function openPlanner() {
    setPlannerMeal(
      getDefaultMealType(
        recipeCode
      )
    );

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

    /*
     * Make sure every day has all
     * three meal slots.
     */
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

    /*
     * Add recipe to selected slot.
     */
    planner[plannerDay][
      plannerMeal
    ] = recipeId;

    /*
     * Save Planner.
     */
    localStorage.setItem(
      "weekly-planner",
      JSON.stringify(
        planner
      )
    );

    /*
     * Make sure recipe is also in
     * the Shopping List.
     */
    const shoppingSaved =
      localStorage.getItem(
        "shopping-data"
      );

    const shoppingData =
      shoppingSaved
        ? JSON.parse(
            shoppingSaved
          )
        : {
            selectedRecipes: [],
            shoppingList: [],
            checkedItems: [],
            people: 1,
          };

    const selectedRecipes =
      shoppingData.selectedRecipes ??
      [];

    if (
      !selectedRecipes.includes(
        recipeId
      )
    ) {
      shoppingData.selectedRecipes =
        [
          ...selectedRecipes,
          recipeId,
        ];
    }

    localStorage.setItem(
      "shopping-data",
      JSON.stringify(
        shoppingData
      )
    );

    /*
     * Tell Planner and Shopping List
     * that something changed.
     */
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

    /*
     * Return to Weekly Planner.
     *
     * Use normal browser navigation so
     * the recipe page is definitely left.
     */
    window.location.href = "/planner";
  }

  return (
    <>
      {/* Back Button */}
      <Link
        href="/recipes"
        className="
          fixed
          bottom-4
          left-4
          z-50
          w-12
          h-12
          rounded-lg
          border
          border-gray-300
          bg-white
          shadow
          hover:bg-gray-100
          transition
          flex
          items-center
          justify-center
          text-xl
        "
      >
        ←
      </Link>

      {/* Action Buttons */}
      <div
        className="
          fixed
          bottom-4
          right-4
          z-50
          flex
          items-center
          gap-2
        "
      >

        {/* Add to Planner */}
        <button
          type="button"
          onClick={
            openPlanner
          }
          className="
            px-4
            h-10
            rounded-lg
            bg-orange-500
            hover:bg-orange-600
            text-white
            text-sm
            font-semibold
            shadow
            transition
          "
        >
          📅 Add to Planner
        </button>

        {/* Shopping List */}
        <button
          type="button"
          onClick={
            toggleRecipe
          }
          className={`
            px-4
            h-10
            rounded-lg
            text-white
            text-sm
            font-semibold
            shadow
            transition
            ${
              added
                ? "bg-green-600 hover:bg-green-700"
                : "bg-orange-500 hover:bg-orange-600"
            }
          `}
        >
          {added
            ? "😊 Added"
            : "🛒 Add to list"}
        </button>

      </div>

      {/* Planner popup */}
      {showPlanner && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-md
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
          >

            {/* Header */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-gray-200
                px-5
                py-4
              "
            >

              <div>

                <h2
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Add to Planner
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  {recipe?.name ??
                    "Choose when to eat it"}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowPlanner(
                    false
                  )
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-xl
                  text-slate-500
                  hover:bg-slate-100
                "
                aria-label="Close"
              >
                ×
              </button>

            </div>

            {/* Controls */}
            <div
              className="
                space-y-5
                p-5
              "
            >

              {/* Day */}
              <div>

                <label
                  htmlFor="recipe-planner-day"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
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
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-base
                    text-slate-900
                  "
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
              <div>

                <label
                  htmlFor="recipe-planner-meal"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
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
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-base
                    text-slate-900
                  "
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

              {/* Add */}
              <button
                type="button"
                onClick={
                  addToPlanner
                }
                className="
                  w-full
                  rounded-xl
                  bg-orange-500
                  px-4
                  py-3
                  font-bold
                  text-white
                  transition
                  hover:bg-orange-600
                "
              >
                Add to Planner
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}