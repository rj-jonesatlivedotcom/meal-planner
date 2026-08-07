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

  const search = searchText.toLowerCase().trim();

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" ||
      recipe.category === selectedCategory;

    const matchesSearch =
      search === "" ||
      recipe.name.toLowerCase().includes(search) ||
      recipe.description.toLowerCase().includes(search) ||
      recipe.equipment.toLowerCase().includes(search) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.item.toLowerCase().includes(search)
      );

    return matchesCategory && matchesSearch;
  });

  let helperText = "";

  if (selectedCategory === "All" && search === "") {
    helperText = `${recipes.length} recipes`;
  } else if (selectedCategory !== "All" && search === "") {
    helperText = `${filteredRecipes.length} ${selectedCategory.toLowerCase()} recipe${filteredRecipes.length === 1 ? "" : "s"}`;
  } else if (selectedCategory === "All" && search !== "") {
    helperText = `${filteredRecipes.length} recipe${filteredRecipes.length === 1 ? "" : "s"} matching "${searchText}"`;
  } else {
    helperText = `${filteredRecipes.length} ${selectedCategory.toLowerCase()} recipe${filteredRecipes.length === 1 ? "" : "s"} matching "${searchText}"`;
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
                title="Search meals or ingredients"
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
            <RecipeSearch
              searchText={searchText}
              onSearchChange={setSearchText}
              onClose={() => {}}
            />
          </div>

        </div>

      </div>

      <p className="mb-4 text-sm text-gray-500">
        {helperText}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>

    </main>
  );
}