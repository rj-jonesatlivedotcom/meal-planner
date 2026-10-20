"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "@/components/recipe-design.module.css";
import RecipeCard from "@/components/RecipeCard";
import { recipes } from "../../data/RecipeData";
import { createClient } from "@/lib/supabase/client";

export default function RecipesPage() {
  const [selectedMealType, setSelectedMealType] = useState("All");
  const [selectedProtein, setSelectedProtein] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFavourites, setShowFavourites] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [favouriteRecipeIds, setFavouriteRecipeIds] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [favouritesLoaded, setFavouritesLoaded] = useState(false);

  // Desktop and mobile controls are both mounted in the DOM; keep their
  // refs separate so the hidden layout cannot make visible-panel clicks look
  // like outside clicks.
  const desktopFilterRef = useRef<HTMLDivElement>(null);
  const mobileFilterRef = useRef<HTMLDivElement>(null);
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

  // Restore Recipes-page filters when returning from an individual recipe.
  // Explicit Planner and My Account links take priority over saved state.
  useEffect(() => {
    const validMealTypes = ["Breakfast", "Lunch", "Dinner"];
    const validSortOptions = [
      "default",
      "time-asc",
      "time-desc",
      "calories-asc",
      "calories-desc",
      "potassium-asc",
      "phosphate-asc",
    ];
    const validProteinTypes = [
      "All",
      "Chicken",
      "Beef",
      "Pork",
      "Lamb",
      "Fish",
      "Vegetarian",
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

      // A meal type supplied by the Weekly Planner takes priority over the
      // user's previous browse state, and is consumed after this visit.
      if (plannerMeal && validMealTypes.includes(plannerMeal)) {
        plannerFilterRef.current = true;
        setSelectedMealType(plannerMeal);
        setSelectedProtein("All");
        setShowFavourites(false);
        setSearchText("");
        setSortBy("default");

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

      // Normal Recipes-page visits restore the last-used filters instead of
      // resetting them. This keeps meal type, protein, favourites, search and
      // sort selections when a user opens a recipe and comes back.
      let savedFilters: {
        selectedMealType?: unknown;
        selectedProtein?: unknown;
        showFavourites?: unknown;
        searchText?: unknown;
        sortBy?: unknown;
      } | null = null;

      try {
        const stored = sessionStorage.getItem("recipes-filters");
        if (stored) {
          savedFilters = JSON.parse(stored);
        }
      } catch {
        // Ignore missing or malformed saved state and use defaults.
      }

      if (savedFilters) {
        setSelectedMealType(
          typeof savedFilters.selectedMealType === "string" &&
            (savedFilters.selectedMealType === "All" ||
              validMealTypes.includes(savedFilters.selectedMealType))
            ? savedFilters.selectedMealType
            : "All"
        );
        setSelectedProtein(
          typeof savedFilters.selectedProtein === "string" &&
            validProteinTypes.includes(savedFilters.selectedProtein)
            ? savedFilters.selectedProtein
            : "All"
        );
        setShowFavourites(savedFilters.showFavourites === true);
        setSearchText(
          typeof savedFilters.searchText === "string"
            ? savedFilters.searchText
            : ""
        );
        setSortBy(
          typeof savedFilters.sortBy === "string" &&
            validSortOptions.includes(savedFilters.sortBy)
            ? savedFilters.sortBy
            : "default"
        );
      } else {
        setSelectedMealType("All");
        setSelectedProtein("All");
        setShowFavourites(false);
        setSearchText("");
        setSortBy("default");
      }
    } catch {
      // Ignore invalid URL or storage data and allow the page to load.
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

  // Remember where the user was on the Recipes page when opening a recipe,
  // then restore that exact position when they come back.
  useEffect(() => {
    function saveRecipesScrollPosition(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!link) {
        return;
      }

      const href = link.getAttribute("href") ?? "";

      // Only save the position when leaving the Recipes page for a recipe.
      // Do not interfere with signup, account, filter, or other links.
      if (href.startsWith("/recipes/")) {
        try {
          sessionStorage.setItem(
            "recipes-scroll-position",
            String(window.scrollY)
          );
        } catch {
          // Ignore storage errors.
        }
      }
    }

    document.addEventListener("click", saveRecipesScrollPosition);

    return () => {
      document.removeEventListener("click", saveRecipesScrollPosition);
    };
  }, []);

  // Restore the previous Recipes-page position after the page has rendered.
  useEffect(() => {
    if (!filtersLoaded) {
      return;
    }

    let savedPosition: number | null = null;

    try {
      const stored = sessionStorage.getItem("recipes-scroll-position");

      if (stored !== null) {
        const parsed = Number(stored);
        if (Number.isFinite(parsed)) {
          savedPosition = parsed;
        }
        sessionStorage.removeItem("recipes-scroll-position");
      }
    } catch {
      // Ignore storage errors.
    }

    if (savedPosition === null) {
      return;
    }

    const position = savedPosition;

    // Wait for the recipe cards to be laid out before restoring the scroll.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: position,
          behavior: "instant",
        });
      });
    });
  }, [filtersLoaded]);

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
      const target = event.target as Node;
      const clickedInsideDesktop =
        desktopFilterRef.current?.contains(target) ?? false;
      const clickedInsideMobile =
        mobileFilterRef.current?.contains(target) ?? false;

      if (!clickedInsideDesktop && !clickedInsideMobile) {
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

    // Treat a recipe as vegetarian when its ingredients contain no meat
    // or fish. This includes meat-free breakfasts, egg dishes, dairy dishes,
    // and vegetable-based meals even when their category is not labelled
    // exactly "vegetarian".
    const nonVegetarianIngredients = /\b(chicken|turkey|duck|beef|pork|lamb|mutton|bacon|ham|sausage|salami|pepperoni|prosciutto|meat|fish|salmon|tuna|cod|haddock|mackerel|trout|sardine|anchovy|herring|pollock|tilapia|seafood|prawn|shrimp|crab|lobster|mussel|clam|oyster|scallop|squid|octopus)\b/i;

    if (!nonVegetarianIngredients.test(ingredientText)) {
      return "Vegetarian";
    }

    return category;
  }

  const searchWords = searchText
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  // Missing values sort last, independently of the unreviewed clinical labels.
  const nutrientAmount = (value: string | undefined) => {
    const match = value?.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
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

      const searchableText = [
        recipe.name,
        recipe.description,
        recipe.equipment,
        recipe.category,
        ...recipe.ingredients.map((ingredient) => ingredient.item),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\\s+/g, " ")
        .trim();

      const matchesSearch =
        searchWords.length === 0 ||
        searchWords.every((word) => {
          const normalizedWord = word
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, " ")
            .trim();

          if (!normalizedWord) return true;

          // Allow simple singular/plural variation (e.g. wrap/wraps,
          // tomato/tomatoes) while still requiring each meaningful term.
          const variants = [normalizedWord];
          if (normalizedWord.endsWith("ies") && normalizedWord.length > 4) {
            variants.push(`${normalizedWord.slice(0, -3)}y`);
          } else if (
            normalizedWord.endsWith("s") &&
            normalizedWord.length > 3
          ) {
            variants.push(normalizedWord.slice(0, -1));
          } else {
            variants.push(`${normalizedWord}s`);
          }

          return variants.some((variant) =>
            searchableText.includes(variant)
          );
        });

      return (
        matchesMealType &&
        matchesProtein &&
        matchesFavourite &&
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
          return nutrientAmount(a.nutrition.potassium) - nutrientAmount(b.nutrition.potassium);

        case "phosphate-asc":
          return nutrientAmount(a.nutrition.phosphate) - nutrientAmount(b.nutrition.phosphate);

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

  // Keep the green results count in sync with the actual recipe browsing
  // filters. My Diet is assessed against daily nutrition totals, not per recipe.
  const filteredRecipeCount = filteredRecipes.length;

  // Meal-type button counts reflect search/protein/favourites selections,
  // but do not depend on the currently selected meal type.
  const recipesMatchingBrowseFilters = recipes.filter((recipe) => {
    const matchesProtein =
      selectedProtein === "All" ||
      getProteinType(recipe) === selectedProtein;
    const matchesFavourite =
      !showFavourites || favouriteRecipeIds.includes(recipe.id);
    const searchableText = [
      recipe.name,
      recipe.description,
      recipe.equipment,
      recipe.category,
      ...recipe.ingredients.map((ingredient) => ingredient.item),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const matchesSearch =
      searchWords.length === 0 ||
      searchWords.every((word) => {
        const normalizedWord = word.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        if (!normalizedWord) return true;
        const variants = [normalizedWord];
        if (normalizedWord.endsWith("ies") && normalizedWord.length > 4) {
          variants.push(`${normalizedWord.slice(0, -3)}y`);
        } else if (normalizedWord.endsWith("s") && normalizedWord.length > 3) {
          variants.push(normalizedWord.slice(0, -1));
        } else {
          variants.push(`${normalizedWord}s`);
        }
        return variants.some((variant) => searchableText.includes(variant));
      });

    return matchesProtein && matchesFavourite && matchesSearch;
  });

  const mealTypeCounts = {
    All: recipesMatchingBrowseFilters.length,
    Breakfast: recipesMatchingBrowseFilters.filter(
      (recipe) => getMealType(recipe) === "Breakfast"
    ).length,
    Lunch: recipesMatchingBrowseFilters.filter(
      (recipe) => getMealType(recipe) === "Lunch"
    ).length,
    Dinner: recipesMatchingBrowseFilters.filter(
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
    <main className={`${styles.discovery} min-h-screen bg-[#f8f7f2] px-4 py-5 md:px-6 md:py-6 dark:bg-[#111b16]`}>
      <div className="mx-auto max-w-7xl md:max-w-[1400px]">
        <header className="mb-6 pt-2 sm:mb-8 sm:pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-green-700 dark:text-green-300">The RenalPlan kitchen</p>
          <h1 className={styles.discoveryTitle}>Good food. Something for every day.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">Find your next favourite, explore the nutrition and make it part of your week.</p>
        </header>
        <nav aria-label="Recipe categories" className={styles.categories}>
          {mealTypes.map((mealType) => (
            <button key={mealType} type="button" aria-pressed={selectedMealType === mealType}
              onClick={() => handleMealTypeChange(mealType)}
              className={`min-h-11 rounded-full px-1 text-xs font-semibold transition ${selectedMealType === mealType ? "bg-green-700 !text-white" : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-200"}`}>
              {mealType}
            </button>
          ))}
        </nav>

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
            <div ref={desktopFilterRef} className="relative shrink-0">
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
                <div className="absolute right-0 top-full z-30 mt-3 w-[min(900px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
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

                        <option value="potassium-asc">Potassium (mg) — lowest first</option>

                        <option value="phosphate-asc">Phosphorus (mg) — lowest first</option>


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
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-rose-700 bg-rose-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:border-rose-800 hover:bg-rose-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
                        aria-label="Clear all recipe filters and search"
                      >
                        <span aria-hidden="true">✕</span>
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
              ref={mobileFilterRef}
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
                <div className="absolute left-0 top-full z-30 mt-4 w-[calc(100vw-60px)] max-w-[calc(100vw-60px)] rounded-xl border border-gray-200 bg-white p-5 shadow-lg">

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

                        <option value="potassium-asc">Potassium (mg) — lowest first</option>

                        <option value="phosphate-asc">Phosphorus (mg) — lowest first</option>


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
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-rose-700 bg-rose-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:border-rose-800 hover:bg-rose-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
                        aria-label="Clear all recipe filters and search"
                      >
                        <span aria-hidden="true">✕</span>
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
            DESKTOP RECIPE COUNT BAR
            ===================================================== */}
        <div className="mb-4 hidden rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 md:flex md:items-center md:justify-between md:gap-4 md:px-5">

          {/* Requirement count */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white shadow-sm">
              ✓
            </div>

            <div className="min-w-0">
              <div className="font-bold text-green-700">
                {filteredRecipeCount} {filteredRecipeCount === 1 ? "recipe" : "recipes"} found with your current filters
              </div>

              <div className="text-sm text-slate-500">
                Results update as you search, filter by meal type or protein, choose favourites, or change the sort order.
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
                      ? "border-green-700 bg-green-700 !text-white shadow-sm"
                      : "border-blue-200 bg-white text-slate-800 hover:bg-blue-50"
                  }`}
                  style={
                    active
                      ? { color: "#ffffff", WebkitTextFillColor: "#ffffff" }
                      : undefined
                  }
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredRecipes.map((recipe, index) => (
              <Fragment key={recipe.id}>
                <RecipeCard
                  recipe={recipe}
                  favouriteRecipeIds={favouriteRecipeIds}
                  userId={userId}
                  onFavouriteChange={handleFavouriteChange}
                />

                {/* Gentle signup CTA after the first row of recipes for visitors */}
                {!isLoggedIn && index === 5 && (
                  <div className="col-span-full rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-blue-50 px-6 py-5 shadow-sm">
                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                      <div>
                        <h2 className="text-lg font-extrabold text-slate-900">
                          Found some meals you like?
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                          Create a free RenalPlan account and start planning your week.
                        </p>
                      </div>

                      <Link
                        href="/signup"
                        className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#0B3B75] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#082E5C]"
                      >
                        Create free account
                      </Link>
                    </div>
                  </div>
                )}
              </Fragment>
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
