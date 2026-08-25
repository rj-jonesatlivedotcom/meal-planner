"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { recipes } from "@/data/recipes";

type RequirementLevel = "Any" | "Low" | "Moderate";

type Requirements = {
  sodiumLimit: number | null;
  potassium: RequirementLevel;
  phosphate: RequirementLevel;
  purines: RequirementLevel;
};

const STORAGE_KEY = "meal-planner-requirements";

const defaultRequirements: Requirements = {
  sodiumLimit: 1500,
  potassium: "Any",
  phosphate: "Any",
  purines: "Any",
};

const levelRank: Record<"Low" | "Moderate" | "High", number> = {
  Low: 1,
  Moderate: 2,
  High: 3,
};

function matchesLevel(
  recipeLevel: "Low" | "Moderate" | "High",
  requirement: RequirementLevel
) {
  if (requirement === "Any") return true;

  return levelRank[recipeLevel] <= levelRank[requirement];
}

function getSodiumNumber(value: string) {
  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

export default function RequirementsPage() {
  const [requirements, setRequirements] =
    useState<Requirements>(defaultRequirements);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Requirements>;

        setRequirements({
          ...defaultRequirements,
          ...parsed,
        });
      }
    } catch {
      // Keep the default requirements if saved data cannot be read.
    }
  }, []);

  function updateRequirement<K extends keyof Requirements>(
    key: K,
    value: Requirements[K]
  ) {
    setRequirements((current) => ({
      ...current,
      [key]: value,
    }));
    setSaved(false);
  }

  function saveRequirements() {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(requirements)
    );
    setSaved(true);
  }

  const suitableRecipes = useMemo(() => {
    /*
     * Sodium is a daily requirement. For recipe matching we use one third
     * of the user's daily limit as a practical meal-planning guide.
     * This is not intended to replace an individually prescribed diet.
     */
    const mealSodiumGuide =
      requirements.sodiumLimit === null
        ? null
        : requirements.sodiumLimit / 3;

    return recipes.filter((recipe) => {
      const sodium = getSodiumNumber(recipe.nutrition.sodium);

      return (
        (mealSodiumGuide === null || sodium <= mealSodiumGuide) &&
        matchesLevel(recipe.potassium, requirements.potassium) &&
        matchesLevel(recipe.phosphate, requirements.phosphate) &&
        matchesLevel(recipe.purines, requirements.purines)
      );
    });
  }, [requirements]);

  const breakfastRecipes = suitableRecipes.filter((recipe) =>
    recipe.code.toUpperCase().startsWith("B")
  );
  const lunchRecipes = suitableRecipes.filter((recipe) =>
    recipe.code.toUpperCase().startsWith("L")
  );
  const dinnerRecipes = suitableRecipes.filter((recipe) =>
    recipe.code.toUpperCase().startsWith("D")
  );

  const mealSodiumGuide =
    requirements.sodiumLimit === null
      ? null
      : Math.round(requirements.sodiumLimit / 3);

  return (
    <main className="min-h-screen bg-purple-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl bg-purple-50/80 p-5 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-green-700">
              Personalise your planner
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              My Requirements
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
              Tell us which dietary requirements matter to you. We’ll use
              them to find recipes in the existing recipe collection that
              best fit what you have selected.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={saveRequirements}
              className="min-h-12 rounded-xl bg-green-700 px-6 text-base font-extrabold text-white transition hover:bg-green-800"
            >
              Save my requirements
            </button>

            {saved && (
              <span className="text-sm font-semibold text-green-700">
                Requirements saved.
              </span>
            )}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-purple-100 bg-purple-100/40 p-5">
              <label
                htmlFor="sodium-limit"
                className="block text-lg font-extrabold text-slate-900"
              >
                Daily sodium limit
              </label>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Choose the daily limit you want the planner to work with.
              </p>

              <select
                id="sodium-limit"
                value={requirements.sodiumLimit === null ? "Any" : requirements.sodiumLimit}
                onChange={(event) =>
                  updateRequirement(
                    "sodiumLimit",
                    event.target.value === "Any"
                      ? null
                      : Number(event.target.value)
                  )
                }
                className="mt-4 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option value="Any">Any</option>
                <option value={1500}>1,500 mg per day</option>
                <option value={1800}>1,800 mg per day</option>
                <option value={2000}>2,000 mg per day</option>
                <option value={2300}>2,300 mg per day</option>
              </select>

              <p className="mt-3 text-sm text-slate-500">
                {mealSodiumGuide === null ? (
                  <>No sodium limit selected.</>
                ) : (
                  <>
                    Meal-planning guide: about{" "}
                    <strong>{mealSodiumGuide} mg</strong> per meal.
                  </>
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-100/40 p-5">
              <label
                htmlFor="potassium"
                className="block text-lg font-extrabold text-slate-900"
              >
                Potassium
              </label>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Set the highest recipe level you want shown.
              </p>

              <select
                id="potassium"
                value={requirements.potassium}
                onChange={(event) =>
                  updateRequirement(
                    "potassium",
                    event.target.value as RequirementLevel
                  )
                }
                className="mt-4 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>Any</option>
                <option>Low</option>
                <option>Moderate</option>
              </select>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-100/40 p-5">
              <label
                htmlFor="phosphate"
                className="block text-lg font-extrabold text-slate-900"
              >
                Phosphate
              </label>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Set the highest recipe level you want shown.
              </p>

              <select
                id="phosphate"
                value={requirements.phosphate}
                onChange={(event) =>
                  updateRequirement(
                    "phosphate",
                    event.target.value as RequirementLevel
                  )
                }
                className="mt-4 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>Any</option>
                <option>Low</option>
                <option>Moderate</option>
              </select>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-100/40 p-5">
              <label
                htmlFor="purines"
                className="block text-lg font-extrabold text-slate-900"
              >
                Purines
              </label>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Set the highest recipe level you want shown.
              </p>

              <select
                id="purines"
                value={requirements.purines}
                onChange={(event) =>
                  updateRequirement(
                    "purines",
                    event.target.value as RequirementLevel
                  )
                }
                className="mt-4 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>Any</option>
                <option>Low</option>
                <option>Moderate</option>
              </select>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Recipes that fit your requirements
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  These results are drawn directly from the existing recipe
                  collection.
                </p>
              </div>

              <span className="text-sm font-bold text-slate-500">
                {suitableRecipes.length} suitable{" "}
                {suitableRecipes.length === 1 ? "recipe" : "recipes"}
              </span>
            </div>

            {suitableRecipes.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
                No recipes currently meet all of the selected requirements.
                Try relaxing one of the filters.
              </div>
            ) : (
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {[
                  ["Breakfast", breakfastRecipes],
                  ["Lunch", lunchRecipes],
                  ["Dinner", dinnerRecipes],
                ].map(([meal, mealRecipes]) => (
                  <div
                    key={meal as string}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {meal as string}
                    </h3>

                    <div className="mt-3 space-y-2">
                      {(mealRecipes as typeof recipes).map((recipe) => (
                        <Link
                          key={recipe.id}
                          href={`/recipes/${recipe.id}`}
                          className="block rounded-xl bg-white p-3 shadow-sm transition hover:bg-green-50"
                        >
                          <div className="font-bold text-slate-900">
                            {recipe.name}
                          </div>
                          <div className="mt-1 text-xs font-semibold text-slate-500">
                            {[
                              requirements.sodiumLimit !== null
                                ? `Sodium ${recipe.nutrition.sodium}`
                                : null,
                              requirements.potassium !== "Any"
                                ? `Potassium ${recipe.potassium}`
                                : null,
                              requirements.phosphate !== "Any"
                                ? `Phosphate ${recipe.phosphate}`
                                : null,
                              requirements.purines !== "Any"
                                ? `Purines ${recipe.purines}`
                                : null,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </div>
                        </Link>
                      ))}

                      {(mealRecipes as typeof recipes).length === 0 && (
                        <p className="text-sm text-slate-500">
                          No matching recipes yet.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="mt-8 rounded-2xl bg-slate-100 p-4 text-xs leading-5 text-slate-500">
            The recipe matching here is a planning aid based on the nutrition
            information stored for each recipe. It is not medical advice and
            does not replace an individual renal-diet prescription.
          </p>
        </section>
      </div>
    </main>
  );
}