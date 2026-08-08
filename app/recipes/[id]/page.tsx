import Image from "next/image";
import { recipes } from "@/data/recipes";
import RecipeActions from "@/components/RecipeActions";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recipe = recipes.find(
    (item) => item.id === id
  );

  if (!recipe) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">
          Recipe not found
        </h1>
      </main>
    );
  }

  return (
    <main className="p-6 pb-28 max-w-3xl mx-auto">

      {/* Title */}
      <Image
        src={recipe.image}
        alt={recipe.name}
        width={1200}
        height={700}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">
  {recipe.name}
</h1>

      {/* Description */}
      <p className="text-lg mb-6">
        {recipe.description}
      </p>

      {/* Recipe summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl">⏱️</div>
          <strong>Cooking Time</strong>
          <p>{recipe.cookingTime}</p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl">🔥</div>
          <strong>Calories</strong>
          <p>{recipe.calories}</p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl">💪</div>
          <strong>Protein</strong>
          <p>{recipe.protein}</p>
        </div>

      </div>

      {/* Equipment */}
      <h2 className="text-xl font-bold mt-6 mb-2">
        🔎 Equipment
      </h2>

      <p className="mb-6">
        {recipe.equipment}
      </p>

      {/* Ingredients */}
      <h2 className="text-xl font-bold mt-6 mb-2">
        🥘 Ingredients
      </h2>

      <ul className="list-disc ml-6 space-y-1">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.item} - {ingredient.quantity}
          </li>
        ))}
      </ul>

      {/* Method */}
      <h2 className="text-xl font-bold mt-8 mb-2">
        👨‍🍳 Method
      </h2>

      <ol className="list-decimal ml-6 space-y-2">
        {recipe.method.map((step, index) => (
          <li key={index}>
            {step}
          </li>
        ))}
      </ol>

      {/* Nutrition */}
      <h2 className="text-xl font-bold mt-8 mb-2">
        📊 Nutrition
      </h2>

      <div className="border rounded-lg p-4">
        <p>Calories: {recipe.nutrition.calories}</p>
        <p>Protein: {recipe.nutrition.protein}</p>
        <p>Carbohydrates: {recipe.nutrition.carbohydrates}</p>
        <p>Fat: {recipe.nutrition.fat}</p>
        <p>Fibre: {recipe.nutrition.fibre}</p>
      </div>

      {/* Dietary Guide */}
      <h2 className="text-xl font-bold mt-8 mb-2">
        🥗 Dietary Guide
      </h2>

      <div className="border rounded-lg p-4 space-y-2">
        <p>
          🥔 <strong>Potassium:</strong> {recipe.potassium}
        </p>

        <p>
          🧀 <strong>Phosphate:</strong> {recipe.phosphate}
        </p>

        <p>
          🍖 <strong>Purines:</strong> {recipe.purines}
        </p>

        {recipe.dietaryNote && (
          <p className="mt-3 text-sm text-gray-600">
            {recipe.dietaryNote}
          </p>
        )}
      </div>

      <RecipeActions recipeId={recipe.id} />

    </main>
  );
}