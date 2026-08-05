"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  recipeId: string;
};

export default function RecipeActions({ recipeId }: Props) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shopping-data");

    if (!saved) return;

    const data = JSON.parse(saved);

    setAdded(data.selectedRecipes?.includes(recipeId));
  }, [recipeId]);

  function toggleRecipe() {
    const saved = localStorage.getItem("shopping-data");

    const data = saved
      ? JSON.parse(saved)
      : {
          selectedRecipes: [],
          shoppingList: [],
          checkedItems: [],
          people: 1,
        };

    if (data.selectedRecipes.includes(recipeId)) {
      data.selectedRecipes = data.selectedRecipes.filter(
        (id: string) => id !== recipeId
      );
      setAdded(false);
    } else {
      data.selectedRecipes.push(recipeId);
      setAdded(true);
    }

    localStorage.setItem(
      "shopping-data",
      JSON.stringify(data)
    );
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

      {/* Add Button */}
      <button
        onClick={toggleRecipe}
        className={`
          fixed
          bottom-4
          right-4
          z-50
          px-4
          h-12
          rounded-lg
          text-white
          font-medium
          shadow
          transition
          ${
            added
              ? "bg-green-600 hover:bg-green-700"
              : "bg-orange-500 hover:bg-orange-600"
          }
        `}
      >
        {added ? "✅ Added" : "🛒 Add"}
      </button>
    </>
  );
}