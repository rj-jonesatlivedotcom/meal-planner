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

    window.addEventListener(
      "storage",
      loadShoppingStatus
    );

    return () => {
      window.removeEventListener(
        "shopping-list-updated",
        loadShoppingStatus
      );

      window.removeEventListener(
        "storage",
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
        // Use default data if saved data is invalid.
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
    <div className="flex h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">

      {/* Small recipe image */}
      <Link
        href={`/recipes/${recipe.id}`}
        className="shrink-0"
      >
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={120}
          height={120}
          className="w-28 h-full min-h-[150px] object-cover"
        />
      </Link>

      {/* Recipe information */}
      <div className="flex flex-1 flex-col p-4 min-w-0">

        <Link href={`/recipes/${recipe.id}`}>
          <h2 className="text-lg font-bold text-slate-900 hover:text-orange-600 transition">
            {recipe.name}
          </h2>

          <p className="mt-1 text-sm text-slate-600 line-clamp-2">
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
        <div className="mt-auto pt-4 flex items-center justify-between gap-2">

          <button
            type="button"
            onClick={toggleShoppingList}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
              onShoppingList
                ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {onShoppingList
              ? "😊 Added"
              : "🛒 Add to list"}
          </button>

          <Link
            href={`/recipes/${recipe.id}`}
            className="font-semibold text-orange-600 text-sm whitespace-nowrap hover:text-orange-700"
          >
            View Recipe →
          </Link>

        </div>

      </div>

    </div>
  );
}