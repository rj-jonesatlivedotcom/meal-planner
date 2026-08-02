import Link from "next/link";

type RecipeCardProps = {
  recipe: {
    id: string;
    code: string;
    emoji: string;
    name: string;
    description: string;
    cookingTime: string;
    calories: string;
    protein: string;
    equipment: string;
  };
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="border rounded-lg p-5 hover:shadow-md cursor-pointer">

        <div className="text-sm text-gray-500">
          {recipe.code}
        </div>

        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>{recipe.emoji}</span>
          {recipe.name}
        </h2>

        <p className="mt-3">
          {recipe.description}
        </p>

        <div className="mt-4">
          ⏱️ {recipe.cookingTime}
        </div>

        <div>
          🔥 {recipe.calories}
        </div>

        <div>
          💪 {recipe.protein}
        </div>

        <div className="mt-4 text-right font-semibold">
          View Recipe →
        </div>

      </div>
    </Link>
  );
}