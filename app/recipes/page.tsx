"use client";

import { useEffect, useRef, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { recipes } from "../../data/recipes";

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [hasSelectedMeals, setHasSelectedMeals] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "Chicken",
    "Beef",
    "Pork",
    "Fish",
    "Vegetarian",
  ];

  useEffect(() => {
    function updateShoppingStatus() {
      const saved = localStorage.getItem("shopping-data");

      if (!saved) {
        setHasSelectedMeals(false);
        return;
      }

      try {
        const data = JSON.parse(saved);

        setHasSelectedMeals(
          (data.selectedRecipes ?? []).length > 0
        );
      } catch {
        setHasSelectedMeals(false);
      }
    }

    updateShoppingStatus();

    window.addEventListener(
      "shopping-list-updated",
      updateShoppingStatus
    );

    window.addEventListener(
      "storage",
      updateShoppingStatus
    );

    return () => {
      window.removeEventListener(
        "shopping-list-updated",
        updateShoppingStatus
      );

      window.removeEventListener(
        "storage",
        updateShoppingStatus
      );
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    }

    if (showFilters) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [showFilters]);

  function clearAllMeals() {
    const saved = localStorage.getItem("shopping-data");

    let data = {
      selectedRecipes: [] as string[],
      shoppingList: [],
      checkedItems: [],
      people: 1,
    };

    if (saved) {
      try {
        data = {
          ...data,
          ...JSON.parse(saved),
        };
      } catch {
        // Use default data if saved data is invalid.
      }
    }

    localStorage.setItem(
      "shopping-data",
      JSON.stringify({
        ...data,
        selectedRecipes: [],
        shoppingList: [],
        checkedItems: [],
      })
    );

    setHasSelectedMeals(false);

    window.dispatchEvent(
      new Event("shopping-list-updated")
    );
  }

  const searchWords = searchText
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const dietaryRank: Record<string, number> = {
    Low: 1,
    Moderate: 2,
    Higher: 3,
  };

  const getMinutes = (value: string) => {
    const match = value.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  const getCalories = (value: string) => {
    const match = value.replace(/,/g, "").match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  const filteredRecipes = recipes
    .filter((recipe) => {
      const matchesCategory =
        selectedCategory === "All" ||
        recipe.category === selectedCategory;

      const matchesSearch =
        searchWords.length === 0 ||
        searchWords.every((word) => {
          return (
            recipe.name.toLowerCase().includes(word) ||
            recipe.description.toLowerCase().includes(word) ||
            recipe.equipment.toLowerCase().includes(word) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.item.toLowerCase().includes(word)
            )
          );
        });

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "time-asc":
          return (
            getMinutes(a.cookingTime) -
            getMinutes(b.cookingTime)
          );

        case "time-desc":
          return (
            getMinutes(b.cookingTime) -
            getMinutes(a.cookingTime)
          );

        case "calories-asc":
          return (
            getCalories(a.calories) -
            getCalories(b.calories)
          );

        case "calories-desc":
          return (
            getCalories(b.calories) -
            getCalories(a.calories)
          );

        case "potassium-asc":
          return (
            dietaryRank[a.potassium] -
            dietaryRank[b.potassium]
          );

        case "phosphate-asc":
          return (
            dietaryRank[a.phosphate] -
            dietaryRank[b.phosphate]
          );

        case "purines-asc":
          return (
            dietaryRank[a.purines] -
            dietaryRank[b.purines]
          );

        default:
          return 0;
      }
    });

  const searchDisplay = searchText.trim();

  let helperText = "";

  if (searchDisplay) {
    helperText = `${filteredRecipes.length} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    } matching "${searchDisplay}"`;
  } else if (selectedCategory !== "All") {
    helperText = `${filteredRecipes.length} ${selectedCategory.toLowerCase()} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    }`;
  } else {
    helperText = `${filteredRecipes.length} recipes`;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-3xl font-bold mb-6">
        Family Recipes
      </h1>

      {/* Search and Clear All */}
      <div className="mb-8">

        <div className="flex items-center justify-between gap-4">

          {/* Search & Sort */}
          <div
            ref={filterRef}
            className="relative"
          >

            <button
              type="button"
              onClick={() =>
                setShowFilters((current) => !current)
              }
              className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold shadow-sm hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              🔎 Search & Sort

              <span className="text-sm">
                {showFilters ? "▲" : "▼"}
              </span>
            </button>

            {showFilters && (
              <div className="relative mt-4 md:absolute md:left-0 md:top-full md:z-20 md:mt-4 md:w-[min(900px,calc(100vw-3rem))] rounded-xl border border-gray-200 bg-white p-5 shadow-lg">

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

                  {/* Search */}
                  <div className="col-span-2 md:col-span-1">

                    <label className="block mb-2 font-semibold text-gray-800">
                      Search
                    </label>

                    <input
                      type="text"
                      placeholder="Meals or ingredients..."
                      value={searchText}
                      onChange={(e) =>
                        setSearchText(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                  {/* Meal type */}
                  <div>

                    <label className="block mb-2 font-semibold text-gray-800">
                      Meal type
                    </label>

                    <select
                      value={selectedCategory}
                      onChange={(e) =>
                        setSelectedCategory(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                    </select>

                  </div>

                  {/* Sort */}
                  <div>

                    <label className="block mb-2 font-semibold text-gray-800">
                      Sort by
                    </label>

                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="default">
                        Default order
                      </option>

                      <option value="time-asc">
                        ⏱️ Cooking time — shortest first
                      </option>

                      <option value="time-desc">
                        ⏱️ Cooking time — longest first
                      </option>

                      <option value="calories-asc">
                        🔥 Calories — lowest first
                      </option>

                      <option value="calories-desc">
                        🔥 Calories — highest first
                      </option>

                      <option value="potassium-asc">
                        🥔 Potassium — lowest first
                      </option>

                      <option value="phosphate-asc">
                        🧀 Phosphate — lowest first
                      </option>

                      <option value="purines-asc">
                        🍖 Purines — lowest first
                      </option>
                    </select>

                  </div>

                </div>

                <div className="mt-4 flex items-center justify-between">

  {(searchText ||
    selectedCategory !== "All" ||
    sortBy !== "default") ? (
    <button
      type="button"
      onClick={() => {
        setSearchText("");
        setSelectedCategory("All");
        setSortBy("default");
      }}
      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
    >
      Clear filters
    </button>
  ) : (
    <div />
  )}

  <button
    type="button"
    onClick={() => setShowFilters(false)}
    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm text-black"
  >
    Done
  </button>

</div>

              </div>
            )}

          </div>

          {/* Clear All */}
          {hasSelectedMeals && (
            <button
              type="button"
              onClick={clearAllMeals}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm text-black whitespace-nowrap"
            >
              🗑️ Clear All
            </button>
          )}

        </div>

        <p className="mt-4 text-sm text-slate-500">
          {helperText}
        </p>

      </div>

      {/* Recipes */}
      {filteredRecipes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">

          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}

        </div>
      ) : (
        <div className="py-16 text-center">

          <div className="text-5xl mb-4">
            😕
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            No recipes found
          </h2>

          <p className="mt-3 text-slate-500">
            Try changing your search or filters.
          </p>

        </div>
      )}

    </main>
  );
}