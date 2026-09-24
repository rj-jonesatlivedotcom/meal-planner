"use client";

import { useEffect, useRef, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { recipes } from "../../data/RecipeData";
import {
  getStoredRequirements,
  recipeMatchesRequirements,
  type Requirements,
} from "@/lib/recipeRequirements";
import { createClient } from "@/lib/supabase/client";

export default function RecipesPage() {
  const [selectedMealType, setSelectedMealType] = useState("All");
  const [selectedProtein, setSelectedProtein] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFavourites, setShowFavourites] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [requirements, setRequirements] =
    useState<Requirements | null>(null);
  const [favouriteRecipeIds, setFavouriteRecipeIds] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [favouritesLoaded, setFavouritesLoaded] = useState(false);

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
    "Lamb",
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
    Lamb: "🐑",
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
      const params = new URLSearchParams(window.location.search);
      const plannerMeal = params.get("meal");
      const favouritesParam = params.get("favourites");
      const favouritesViewParam = params.get("view");

      // My Account opens this page with /recipes?view=favourites.
      // Keep support for the older /recipes?favourites=true link as well.
      let openFavourites =
        favouritesViewParam === "favourites" ||
        favouritesParam === "true";

      try {
        if (sessionStorage.getItem("open-my-favourites") === "true") {
          openFavourites = true;
          sessionStorage.removeItem("open-my-favourites");
        }
      } catch {
        // Ignore storage errors.
      }

      if (openFavourites) {
        plannerFilterRef.current = false;
        setSelectedMealType("All");
        setSelectedProtein("All");
        setShowFavourites(true);
        setSearchText("");
        setSortBy("default");

        setFiltersLoaded(true);
        return;
      }

      if (
        plannerMeal &&
        validMealTypes.includes(plannerMeal)
      ) {
        plannerFilterRef.current = true;
        setSelectedMealType(plannerMeal);
        setSelectedProtein("All");
        setShowFavourites(false);
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
      setShowFavourites(false);
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
          showFavourites,
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
    showFavourites,
    searchText,
    sortBy,
  ]);

  useEffect(() => {
    setRequirements(getStoredRequirements());

    function handleRequirementsUpdated() {
      setRequirements(getStoredRequirements());
    }

    window.addEventListener(
      "meal-planner-requirements-updated",
      handleRequirementsUpdated
    );

    return () => {
      window.removeEventListener(
        "meal-planner-requirements-updated",
        handleRequirementsUpdated
      );
    };
  }, []);

  useEffect(() => {
    const supabase = createClient();

    async function loadUserFavourites() {
      setFavouritesLoaded(false);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsLoggedIn(false);
        setUserId(null);
        setFavouriteRecipeIds([]);
        setShowFavourites(false);
        setFavouritesLoaded(true);
        return;
      }

      setIsLoggedIn(true);
      setUserId(user.id);

      const { data, error } = await supabase
        .from("user_favourites")
        .select("recipe_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Unable to load favourites:", error);
        setFavouriteRecipeIds([]);
      } else {
        setFavouriteRecipeIds(
          (data ?? []).map((row) => row.recipe_id)
        );
      }

      setFavouritesLoaded(true);
    }

    loadUserFavourites();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUserFavourites();
    });

    function handleFavouritesUpdated() {
      loadUserFavourites();
    }

    window.addEventListener(
      "meal-planner-favourites-updated",
      handleFavouritesUpdated
    );

    return () => {
      subscription.unsubscribe();
      window.removeEventListener(
        "meal-planner-favourites-updated",
        handleFavouritesUpdated
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

  function getProteinType(recipe: (typeof recipes)[number]) {
    const category = recipe.category?.toLowerCase() ?? "";

    const ingredientText = recipe.ingredients
      .map((ingredient) => ingredient.item.toLowerCase())
      .join(" ");

    if (category === "lamb" || ingredientText.includes("lamb")) {
      return "Lamb";
    }

    if (
      category === "fish" ||
      ingredientText.includes("salmon") ||
      ingredientText.includes("tuna") ||
      ingredientText.includes("cod") ||
      ingredientText.includes("haddock") ||
      ingredientText.includes("mackerel") ||
      ingredientText.includes("trout")
    ) {
      return "Fish";
    }

    if (
      category === "pork" ||
      ingredientText.includes("pork")
    ) {
      return "Pork";
    }

    if (
      category === "beef" ||
      ingredientText.includes("beef")
    ) {
      return "Beef";
    }

    if (
      category === "chicken" ||
      ingredientText.includes("chicken")
    ) {
      return "Chicken";
    }

    if (category === "vegetarian") {
      return "Vegetarian";
    }

    return category;
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
        getProteinType(recipe) === selectedProtein;

      const matchesFavourite =
        !showFavourites ||
        favouriteRecipeIds.includes(recipe.id);

      const matchesRequirements =
        recipeMatchesRequirements(
          recipe,
          requirements
        );

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
        matchesFavourite &&
        matchesRequirements &&
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

  function handleFavouriteChange(
    recipeId: string,
    isFavourite: boolean
  ) {
    setFavouriteRecipeIds((current) => {
      if (isFavourite) {
        return current.includes(recipeId)
          ? current
          : [...current, recipeId];
      }

      return current.filter((id) => id !== recipeId);
    });
  }

  const searchDisplay = searchText.trim();

  // Live count of recipes that match the user's My Diet requirements.
  // This deliberately ignores search/filter controls so the green bar
  // always tells the user how many recipes are available for their diet.
  const requirementsMatchedRecipes = recipes.filter((recipe) =>
    recipeMatchesRequirements(recipe, requirements)
  );

  const requirementsMatchCount =
    requirementsMatchedRecipes.length;

  const mealTypeCounts = {
    All: requirementsMatchCount,
    Breakfast: requirementsMatchedRecipes.filter(
      (recipe) => getMealType(recipe) === "Breakfast"
    ).length,
    Lunch: requirementsMatchedRecipes.filter(
      (recipe) => getMealType(recipe) === "Lunch"
    ).length,
    Dinner: requirementsMatchedRecipes.filter(
      (recipe) => getMealType(recipe) === "Dinner"
    ).length,
  };

  let helperText = "";

  if (searchDisplay) {
    helperText = `${filteredRecipes.length} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    } matching "${searchDisplay}"`;
  } else if (selectedProtein !== "All") {
    helperText = `${filteredRecipes.length} ${selectedProtein.toLowerCase()} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    }`;
  } else {
    helperText = `${filteredRecipes.length} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    }`;
  }

  function handleMealTypeChange(mealType: string) {
    setSelectedMealType(mealType);
    setShowFavourites(false);
  }

  function handleFavouriteToggle() {
    if (!isLoggedIn) return;

    setShowFavourites((current) => !current);
    setSelectedMealType("All");
    setSelectedProtein("All");
    setSearchText("");
    setSortBy("default");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-5 md:px-6 md:py-6">
      <div className="mx-auto max-w-7xl md:max-w-[1400px]">

        {/* =====================================================
            DESKTOP SEARCH / FILTER CONTROLS
            ===================================================== */}
        <div className="mb-4 hidden md:block">
          <div className="flex flex-row items-center gap-3">

            {/* Expanded search */}
            <div className="relative min-w-0 flex-1">
              <span
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-700"
                aria-hidden="true"
              >
                ⌕
              </span>

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search recipes..."
                aria-label="Search recipes"
                className="h-14 w-full rounded-xl border border-blue-200 bg-white pl-12 pr-4 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Filters & Sort */}
            <div ref={filterRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() =>
                  setShowFilters((current) => !current)
                }
                className="flex h-14 w-[210px] items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 font-semibold text-slate-900 shadow-sm transition hover:bg-blue-50"
              >
                <span aria-hidden="true">☷</span>
                Filters &amp; Sort
                <span
                  className="text-sm"
                  aria-hidden="true"
                >
                  {showFilters ? "▲" : "▼"}
                </span>
              </button>

              {showFilters && (
                <div className="absolute left-0 top-full z-30 mt-3 w-[min(900px,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    {/* Meal type */}
                    <div>
                      <label className="mb-2 block font-semibold text-slate-800">
                        Meal type
                      </label>

                      <select
                        value={selectedMealType}
                        onChange={(e) =>
                          setSelectedMealType(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                      <label className="mb-2 block font-semibold text-slate-800">
                        Protein
                      </label>

                      <select
                        value={selectedProtein}
                        onChange={(e) =>
                          setSelectedProtein(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
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

                    {/* Favourites */}
                    <div>
                      <label className="mb-2 block font-semibold text-slate-800">
                        Show
                      </label>

                      <select
                        value={
                          showFavourites
                            ? "Favourites"
                            : "All"
                        }
                        onChange={(e) => {
                          if (!isLoggedIn) return;

                          setShowFavourites(
                            e.target.value === "Favourites"
                          );
                        }}
                        disabled={
                          !isLoggedIn || !favouritesLoaded
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <option value="All">
                          All recipes
                        </option>

                        <option value="Favourites">
                          My favourites
                        </option>
                      </select>
                    </div>

                    {/* Sort */}
                    <div className="md:col-span-3">
                      <label className="mb-2 block font-semibold text-slate-800">
                        Sort by
                      </label>

                      <select
                        value={sortBy}
                        onChange={(e) =>
                          setSortBy(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="default">
                          Recommended
                        </option>

                        <option value="time-asc">
                          Cooking time — shortest first
                        </option>

                        <option value="time-desc">
                          Cooking time — longest first
                        </option>

                        <option value="calories-asc">
                          Calories — lowest first
                        </option>

                        <option value="calories-desc">
                          Calories — highest first
                        </option>

                        <option value="potassium-asc">
                          Potassium — lowest first
                        </option>

                        <option value="phosphate-asc">
                          Phosphate — lowest first
                        </option>

                        <option value="purines-asc">
                          Purines — lowest first
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {(
                      searchText ||
                      selectedMealType !== "All" ||
                      selectedProtein !== "All" ||
                      showFavourites ||
                      sortBy !== "default"
                    ) ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchText("");
                          setSelectedMealType("All");
                          setSelectedProtein("All");
                          setShowFavourites(false);
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
                      onClick={() =>
                        setShowFilters(false)
                      }
                      className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* My Favourites */}
            <button
              type="button"
              onClick={handleFavouriteToggle}
              disabled={
                !isLoggedIn || !favouritesLoaded
              }
              className={`flex h-14 w-[215px] shrink-0 items-center justify-center gap-2 rounded-xl border px-5 font-semibold shadow-sm transition ${
                showFavourites
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-orange-300 bg-white text-orange-600 hover:bg-orange-50"
              } ${
                !isLoggedIn || !favouritesLoaded
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <span className="text-2xl leading-none">
                ♥
              </span>
              My Favourites
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE SEARCH / FILTER CONTROLS
            RESTORED TO THE PREVIOUS MOBILE LAYOUT
            ===================================================== */}
        <div className="mb-4 md:hidden">
          <div className="flex items-center gap-3">

            <div
              ref={filterRef}
              className="relative shrink-0"
            >
              <button
                type="button"
                onClick={() =>
                  setShowFilters((current) => !current)
                }
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold shadow-sm transition hover:bg-gray-50"
              >
                🔎 Search &amp; Sort
                <span className="text-sm">
                  {showFilters ? "▲" : "▼"}
                </span>
              </button>

              {showFilters && (
                <div className="absolute left-0 top-full z-30 mt-4 w-[calc(100vw-2rem)] max-w-[500px] rounded-xl border border-gray-200 bg-white p-5 shadow-lg">

                  <div className="grid grid-cols-1 gap-4">

                    {/* Search */}
                    <div>
                      <label className="mb-2 block font-semibold text-gray-800">
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
                      <label className="mb-2 block font-semibold text-gray-800">
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
                      <label className="mb-2 block font-semibold text-gray-800">
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

                    {/* Favourites */}
                    <div>
                      <label className="mb-2 block font-semibold text-gray-800">
                        Show
                      </label>

                      <select
                        value={
                          showFavourites
                            ? "Favourites"
                            : "All"
                        }
                        onChange={(e) => {
                          if (!isLoggedIn) return;

                          setShowFavourites(
                            e.target.value ===
                              "Favourites"
                          );
                        }}
                        disabled={
                          !isLoggedIn ||
                          !favouritesLoaded
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <option value="All">
                          🍽️ All recipes
                        </option>

                        <option value="Favourites">
  ♥ Favourites
</option>
                      </select>
                    </div>

                    {/* Sort */}
                    <div>
                      <label className="mb-2 block font-semibold text-gray-800">
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

                    {(
                      searchText ||
                      selectedMealType !== "All" ||
                      selectedProtein !== "All" ||
                      showFavourites ||
                      sortBy !== "default"
                    ) ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchText("");
                          setSelectedMealType("All");
                          setSelectedProtein("All");
                          setShowFavourites(false);
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
                      onClick={() =>
                        setShowFilters(false)
                      }
                      className="rounded-lg bg-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-400"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile favourites */}
            <button
              type="button"
              onClick={handleFavouriteToggle}
              disabled={
                !isLoggedIn || !favouritesLoaded
              }
              aria-label={showFavourites ? "Show all recipes" : "Show my favourites"}
              title={showFavourites ? "Show all recipes" : "Show my favourites"}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-xl shadow-sm transition ${
                showFavourites
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-orange-300 bg-orange-50 text-orange-600 hover:bg-orange-100"
              } ${
                !isLoggedIn || !favouritesLoaded
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <span className="leading-none" aria-hidden="true">
                {showFavourites ? "♥" : "♡"}
              </span>
            </button>
          </div>

          {/* Mobile helper text */}
          <p className="mt-4 text-sm text-slate-500">
            {helperText}
          </p>
        </div>

        {/* =====================================================
            DESKTOP REQUIREMENTS BAR
            ===================================================== */}
        <div className="mb-4 hidden rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 md:flex md:items-center md:justify-between md:gap-4 md:px-5">

          {/* Requirement count */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white shadow-sm">
              ✓
            </div>

            <div className="min-w-0">
              <div className="font-bold text-green-700">
                {requirementsMatchCount} recipes match your requirements
              </div>

              <div className="text-sm text-slate-500">
                Showing recipes based on your My Diet settings. Adjust your requirements to see more recipes.
              </div>
            </div>
          </div>

          {/* Meal type quick filters */}
          <div className="flex shrink-0 items-center gap-2">
            {mealTypes.map((mealType) => {
              const active =
                selectedMealType === mealType;

              return (
                <button
                  key={mealType}
                  type="button"
                  onClick={() =>
                    handleMealTypeChange(mealType)
                  }
                  className={`rounded-xl border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition ${
                    active
                      ? "border-green-700 bg-green-700 text-white shadow-sm"
                      : "border-blue-200 bg-white text-slate-800 hover:bg-blue-50"
                  }`}
                >
                  {mealType} (
                  {
                    mealTypeCounts[
                      mealType as keyof typeof mealTypeCounts
                    ]
                  }
                  )
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            RECIPES
            ===================================================== */}
        {filteredRecipes.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                favouriteRecipeIds={favouriteRecipeIds}
                userId={userId}
                onFavouriteChange={handleFavouriteChange}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mb-4 text-5xl">
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
      </div>
    </main>
  );
}