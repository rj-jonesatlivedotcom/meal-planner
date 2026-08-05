import Image from "next/image";
import Link from "next/link";

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
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer">

        <Image
          src={recipe.image}
          alt={recipe.name}
          width={600}
          height={400}
          className="w-full h-52 object-cover"
        />

        <div className="p-5">

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
            <span>💪 {recipe.protein}</span>
          </div>

          <div className="mt-5 text-right font-semibold text-orange-600">
            View Recipe →
          </div>

        </div>
      </div>
    </Link>
  );
}