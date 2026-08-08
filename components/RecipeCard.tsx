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

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [onShoppingList, setOnShoppingList] = useState(false);

  useEffect(() => {
    function loadShoppingStatus() {
      const saved = localStorage.getItem("shopping-data");

      if (!saved) {
        setOnShoppingList(false);
        return;
      }

      try {
        const data = JSON.parse(saved);

        setOnShoppingList(
          (data.selectedRecipes ?? []).includes(recipe.id)
        );
      } catch {
        setOnShoppingList(false);
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
  }, [recipe.id]);

  function toggleShoppingList() {
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
        // Use default data if saved data is invalid
      }
    }

    const selectedRecipes = data.selectedRecipes ?? [];

    const updatedSelectedRecipes = selectedRecipes.includes(recipe.id)
      ? selectedRecipes.filter(
          (recipeId: string) => recipeId !== recipe.id
        )
      : [...selectedRecipes, recipe.id];

    localStorage.setItem(
      "shopping-data",
      JSON.stringify({
        ...data,
        selectedRecipes: updatedSelectedRecipes,
      })
    );

    setOnShoppingList(
      updatedSelectedRecipes.includes(recipe.id)
    );

    window.dispatchEvent(
      new Event("shopping-list-updated")
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-200">

      <Link href={`/recipes/${recipe.id}`}>
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={600}
          height={400}
          className="w-full h-52 object-cover"
          priority={recipe.id === "chicken-curry"}
        />

        <div className="p-5 flex-1">

          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>{recipe.emoji}</span>
            <span>{recipe.name}</span>
          </h2>

          <p className="mt-3 text-gray-700">
            {recipe.description}
          </p>

          <div className="mt-5 flex justify-between text-sm text-gray-600">
            <span>⏱️ {recipe.cookingTime}</span>
            <span>🔥 {recipe.calories}</span>
          </div>

        </div>
      </Link>

      <div className="mt-auto px-5 pb-4 flex items-center justify-between gap-2">

        <button
          type="button"
          onClick={toggleShoppingList}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            onShoppingList
              ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {onShoppingList
            ? "✓ On list · Remove"
            : "🛒 Add to list"}
        </button>

        <Link
          href={`/recipes/${recipe.id}`}
          className="font-semibold text-orange-600 whitespace-nowrap"
        >
          View Recipe →
        </Link>

      </div>

    </div>
  );
}