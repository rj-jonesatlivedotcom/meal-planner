"use client";

import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import CategoryFilter from "@/components/CategoryFilter";
import RecipeSearch from "@/components/RecipeSearch";
import { recipes } from "../../data/recipes";

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const categories = [
    "All",
    "Chicken",
    "Beef",
    "Pork",
    "Fish",
    "Vegetarian",
  ];

  const searchWords = searchText
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const filteredRecipes = recipes.filter((recipe) => {
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
  });

  let helperText = "";

  const searchDisplay = searchText.trim();

  if (selectedCategory === "All" && searchDisplay === "") {
    helperText = `${recipes.length} recipes`;
  } else if (selectedCategory !== "All" && searchDisplay === "") {
    helperText = `${filteredRecipes.length} ${selectedCategory.toLowerCase()} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    }`;
  } else if (selectedCategory === "All" && searchDisplay !== "") {
    helperText = `${filteredRecipes.length} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    } matching "${searchDisplay}"`;
  } else {
    helperText = `${filteredRecipes.length} ${selectedCategory.toLowerCase()} recipe${
      filteredRecipes.length === 1 ? "" : "s"
    } matching "${searchDisplay}"`;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-3xl font-bold mb-6">
        Family Recipes
      </h1>

      <div className="mb-8">

        {/* Desktop */}
        <div className="hidden md:block">

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="mt-4">
            {showSearch ? (
              <div className="max-w-[500px] w-full">
                <RecipeSearch
                  searchText={searchText}
                  onSearchChange={setSearchText}
                  onClose={() => setShowSearch(false)}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-2xl hover:scale-110 transition"
                title="Search recipes"
              >
                🔍
              </button>
            )}
          </div>

        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-3">

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="w-full">
            {showSearch ? (
              <RecipeSearch
                searchText={searchText}
                onSearchChange={setSearchText}
                onClose={() => setShowSearch(false)}
              />
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-2xl hover:scale-110 transition"
                title="Search recipes"
              >
                🔍
              </button>
            )}
          </div>

        </div>

        {/* Helper text */}
        <p className="mt-4 text-sm text-slate-500">
          {helperText}
        </p>

      </div>

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
            Try searching for another meal or ingredient.
          </p>

        </div>
      )}

    </main>
  );
}