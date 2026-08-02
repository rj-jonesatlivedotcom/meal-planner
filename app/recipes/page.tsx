import RecipeCard from "@/components/RecipeCard";
import { recipes } from "../../data/recipes";

export default function RecipesPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Family Recipes
      </h1>

      <div className="grid gap-4 md:grid-cols-2">

        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}

      </div>

    </main>
  );
}