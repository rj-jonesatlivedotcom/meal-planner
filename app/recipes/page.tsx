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

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-3xl font-bold mb-6">
        Family Recipes
      </h1>

      <div className="mb-6">

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between">

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {!showSearch && (
            <button
              onClick={() => setShowSearch(true)}
              className="text-2xl hover:scale-110 transition"
              title="Search recipes"
            >
              🔍
            </button>
          )}

        </div>

        {showSearch && (
          <div className="hidden md:flex justify-end mt-3">
            <RecipeSearch
              searchText={searchText}
              onSearchChange={setSearchText}
              onClose={() => setShowSearch(false)}
            />
          </div>
        )}

        {/* Mobile */}
        <div className="md:hidden space-y-3">

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <RecipeSearch
            searchText={searchText}
            onSearchChange={setSearchText}
            onClose={() => {}}
          />

        </div>

      </div>

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