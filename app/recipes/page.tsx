"use client";

import { useEffect, useRef, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { recipes } from "../../data/recipes";

export default function RecipesPage() {
  const [selectedMealType, setSelectedMealType] = useState("All");
  const [selectedProtein, setSelectedProtein] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [filtersLoaded, setFiltersLoaded] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const plannerFilterRef = useRef(false);

  const mealTypes = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
  ];

  const proteins = [
    "All",
    "Chicken",
    "Beef",
    "Pork",
    "Fish",
    "Vegetarian",
  ];

  const mealTypeIcons: Record<string, string> = {
    All: "🍽️",
    Breakfast: "🥣",
    Lunch: "🥪",
    Dinner: "🍽️",
  };

  const proteinIcons: Record<string, string> = {
    All: "🍽️",
    Chicken: "🍗",
    Beef: "🥩",
    Pork: "🐷",
    Fish: "🐟",
    Vegetarian: "🥕",
  };

  // Apply the Recipes-page state from the current URL.
  // A Weekly Planner link such as /recipes?meal=Dinner supplies
  // temporary meal context. A normal /recipes visit must always
  // start clean.
  useEffect(() => {
    const validMealTypes = [
      "Breakfast",
      "Lunch",
      "Dinner",
    ];

    try {
      const plannerMeal = new URLSearchParams(
        window.location.search
      ).get("meal");

      if (
        plannerMeal &&
        validMealTypes.includes(plannerMeal)
      ) {
        plannerFilterRef.current = true;
        setSelectedMealType(plannerMeal);
        setSelectedProtein("All");
        setSearchText("");
        setSortBy("default");

        // Consume the planner meal once so the URL becomes plain /recipes.
        const url = new URL(window.location.href);
        url.searchParams.delete("meal");
        window.history.replaceState(
          {},
          "",
          `${url.pathname}${url.search}${url.hash}`
        );

        setFiltersLoaded(true);
        return;
      }

      // A normal visit to /recipes should always start with clean filters.
      plannerFilterRef.current = true;
      setSelectedMealType("All");
      setSelectedProtein("All");
      setSearchText("");
      setSortBy("default");

      try {
        sessionStorage.removeItem("recipes-filters");
      } catch {
        // Ignore storage errors.
      }
    } catch {
      // Ignore invalid URL data.
    }

    setFiltersLoaded(true);
  }, []);

  // Save the current recipe filters so they survive
  // opening a recipe and pressing the Android Back button.
  useEffect(() => {
    if (!filtersLoaded) {
      return;
    }

    // A meal type supplied by the Weekly Planner is temporary context,
    // not a user-selected Recipes-page filter. Do not save it.
    if (plannerFilterRef.current) {
      plannerFilterRef.current = false;
      return;
    }

    try {
      sessionStorage.setItem(
        "recipes-filters",
        JSON.stringify({
          selectedMealType,
          selectedProtein,
          searchText,
          sortBy,
        })
      );
    } catch {
      // Ignore storage errors.
    }
  }, [
    filtersLoaded,
    selectedMealType,
    selectedProtein,
    searchText,
    sortBy,
  ]);

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

  function getMealType(recipe: (typeof recipes)[number]) {
    const code = recipe.code?.toUpperCase() ?? "";

    if (code.startsWith("B")) {
      return "Breakfast";
    }

    if (code.startsWith("L")) {
      return "Lunch";
    }

    if (code.startsWith("D")) {
      return "Dinner";
    }

    return "Other";
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
      const recipeMealType = getMealType(recipe);

      const matchesMealType =
        selectedMealType === "All" ||
        recipeMealType === selectedMealType;

      const matchesProtein =
        selectedProtein === "All" ||
        recipe.category === selectedProtein;

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

      return (
        matchesMealType &&
        matchesProtein &&
        matchesSearch
      );
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

        default: {
          // Keep the recipe data order untouched, but make the
          // default browse order feel natural: Breakfast → Lunch → Dinner.
          const mealOrder: Record<string, number> = {
            Breakfast: 1,
            Lunch: 2,
            Dinner: 3,
            Other: 4,
          };

          return (
            mealOrder[getMealType(a)] -
            mealOrder[getMealType(b)]
          );
        }
      }
    });

  const searchDisplay = searchText.trim();

  let helperText = "";

  if (searchDisplay) {
    helperText = `${filteredRecipes.length} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    } matching "${searchDisplay}"`;
  } else if (
    selectedMealType !== "All" &&
    selectedProtein !== "All"
  ) {
    helperText = `${filteredRecipes.length} ${selectedMealType.toLowerCase()} ${
      selectedProtein.toLowerCase()
    } recipe${filteredRecipes.length === 1 ? "" : "s"}`;
  } else if (selectedMealType !== "All") {
    helperText = `${filteredRecipes.length} ${selectedMealType.toLowerCase()} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    }`;
  } else if (selectedProtein !== "All") {
    helperText = `${filteredRecipes.length} ${selectedProtein.toLowerCase()} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    }`;
  } else {
    helperText = `${filteredRecipes.length} recipes`;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      {/* Page heading */}
      <div className="relative mb-3">
        <h1 className="text-2xl sm:text-3xl font-bold whitespace-nowrap">
          Recipes
        </h1>
      </div>

      {/* Search and filters */}
      <div className="mb-4">

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

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                  {/* Search */}
                  <div>

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
                      value={selectedMealType}
                      onChange={(e) =>
                        setSelectedMealType(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {mealTypes.map((mealType) => (
                        <option
                          key={mealType}
                          value={mealType}
                        >
                          {mealTypeIcons[mealType]} {mealType}
                        </option>
                      ))}
                    </select>

                  </div>

                  {/* Protein */}
                  <div>

                    <label className="block mb-2 font-semibold text-gray-800">
                      Protein
                    </label>

                    <select
                      value={selectedProtein}
                      onChange={(e) =>
                        setSelectedProtein(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {proteins.map((protein) => (
                        <option
                          key={protein}
                          value={protein}
                        >
                          {proteinIcons[protein]} {protein}
                        </option>
                      ))}
                    </select>

                  </div>

                  {/* Sort */}
                  <div className="md:col-span-3">

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
                    selectedMealType !== "All" ||
                    selectedProtein !== "All" ||
                    sortBy !== "default") ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchText("");
                        setSelectedMealType("All");
                        setSelectedProtein("All");
                        setSortBy("default");

                        try {
                          sessionStorage.removeItem(
                            "recipes-filters"
                          );
                        } catch {
                          // Ignore storage errors.
                        }
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

        </div>

        <p className="mt-4 text-sm text-slate-500">
          {helperText}
        </p>

      </div>

      {/* Recipes */}
      {filteredRecipes.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4">

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