import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <section className="max-w-5xl mx-auto text-center">

        <h1 className="text-5xl font-bold mb-4">
          Family Meal Planner
        </h1>

        <p className="text-lg text-slate-600 mb-12">
          Plan your meals, browse recipes and generate shopping lists.
        </p>


        <div className="grid md:grid-cols-3 gap-6">


          {/* Recipes */}
          <Link
            href="/recipes"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-4">
              📖 Recipes
            </h2>

            <p className="mb-6 text-slate-600">
              Browse all family recipes.
            </p>

            <div className="bg-blue-600 text-white rounded-lg py-3">
              Open Recipes
            </div>
          </Link>



          {/* Meal Planner */}
          <Link
            href="/planner"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-4">
              🗓️ Meal Planner
            </h2>

            <p className="mb-6 text-slate-600">
              Plan this week's meals.
            </p>

            <div className="bg-green-600 text-white rounded-lg py-3">
              Open Planner
            </div>
          </Link>



          {/* Shopping List */}
          <Link
            href="/shopping"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-4">
              🛒 Shopping List
            </h2>

            <p className="mb-6 text-slate-600">
              Generate your shopping list automatically.
            </p>

            <div className="bg-orange-500 text-white rounded-lg py-3">
              View List
            </div>
          </Link>


        </div>

      </section>
    </main>
  );
}