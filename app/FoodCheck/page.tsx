"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type CofidRow = Record<string, unknown>;

type Food = {
  id: string;
  name: string;
  category: string;
  code: string;
  description: string;
  energyKj: number;
  energyKcal: number;
  protein: number;
  carbohydrate: number;
  sugars: number;
  fat: number;
  saturates: number;
  fibre: number;
  salt: number;
  sodium: number;
  potassium: number;
  phosphorus: number;
  calcium: number;
  magnesium: number;
  iron: number;
  zinc: number;
};

function numberValue(
  row: CofidRow,
  ...keys: string[]
): number {
  for (const key of keys) {
    const value = row[key];

    if (
      value !== null &&
      value !== undefined &&
      value !== ""
    ) {
      const number = Number(value);

      if (Number.isFinite(number)) {
        return number;
      }
    }
  }

  return 0;
}

function textValue(
  row: CofidRow,
  ...keys: string[]
): string {
  for (const key of keys) {
    const value = row[key];

    if (value !== null && value !== undefined) {
      const text = String(value).trim();

      if (text) {
        return text;
      }
    }
  }

  return "";
}

function mapFood(row: CofidRow): Food {
  const code = textValue(
    row,
    "food_code",
    "code"
  );

  return {
    id:
      code ||
      Math.random()
        .toString(36)
        .slice(2),

    name:
      textValue(
        row,
        "food_name",
        "name"
      ) || "Unnamed food",

    category:
      textValue(
        row,
        "food_group",
        "category",
        "food_category"
      ) || "Food",

    code,

    description:
      textValue(
        row,
        "description",
        "food_description"
      ) || "CoFID 2021 food entry",

    energyKj: numberValue(
      row,
      "energy_kj",
      "energy_kj_100g",
      "energy_kj_per_100g"
    ),

    energyKcal: numberValue(
      row,
      "energy_kcal",
      "energy_kcal_100g",
      "energy_kcal_per_100g"
    ),

    protein: numberValue(
      row,
      "protein_g",
      "protein"
    ),

    carbohydrate: numberValue(
      row,
      "carbohydrate_g",
      "carbohydrates_g",
      "carbohydrate"
    ),

    sugars: numberValue(
      row,
      "sugars_g",
      "sugar_g",
      "sugars"
    ),

    fat: numberValue(
      row,
      "fat_g",
      "fat"
    ),

    saturates: numberValue(
      row,
      "saturates_g",
      "saturated_fat_g",
      "saturates"
    ),

    fibre: numberValue(
      row,
      "fibre_g",
      "fiber_g",
      "fibre"
    ),

    salt: numberValue(
      row,
      "salt_g",
      "salt"
    ),

    sodium: numberValue(
      row,
      "sodium_mg",
      "sodium"
    ),

    potassium: numberValue(
      row,
      "potassium_mg",
      "potassium"
    ),

    phosphorus: numberValue(
      row,
      "phosphorus_mg",
      "phosphorus",
      "phosphate_mg",
      "phosphate"
    ),

    calcium: numberValue(
      row,
      "calcium_mg",
      "calcium"
    ),

    magnesium: numberValue(
      row,
      "magnesium_mg",
      "magnesium"
    ),

    iron: numberValue(
      row,
      "iron_mg",
      "iron"
    ),

    zinc: numberValue(
      row,
      "zinc_mg",
      "zinc"
    ),
  };
}

export default function FoodCheckPage() {
  const supabase = createClient();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] =
    useState<Food | null>(null);

  const [searching, setSearching] =
    useState(false);

  const [error, setError] = useState("");

  const [userChecked, setUserChecked] =
    useState(false);

  const [signedIn, setSignedIn] =
    useState(false);

  const nutritionRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * ---------------------------------------------------------
   * CHECK LOGIN STATUS
   * ---------------------------------------------------------
   */

  useEffect(() => {
    let cancelled = false;

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      setSignedIn(Boolean(user));
      setUserChecked(true);
    }

    void checkUser();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  /*
   * ---------------------------------------------------------
   * SEARCH
   * ---------------------------------------------------------
   */

  async function performSearch() {
    if (!signedIn) {
      return;
    }

    const term = search.trim();

    setSelectedFood(null);
    setError("");

    if (!term) {
      setResults([]);
      return;
    }

    setSearching(true);

    const { data, error } = await supabase
      .from("cofid_foods")
      .select("*")
      .ilike(
        "food_name",
        `%${term}%`
      )
      .order("food_name", {
        ascending: true,
      })
      .limit(50);

    if (error) {
      console.error(
        "CoFID search failed:",
        error
      );

      setError(
        "We couldn't search the food database. Please try again."
      );

      setResults([]);
    } else {
      setResults(
        (data ?? []).map(mapFood)
      );
    }

    setSearching(false);
  }

  /*
   * ---------------------------------------------------------
   * SELECT FOOD
   * ---------------------------------------------------------
   */

  function selectFood(food: Food) {
    setSelectedFood(food);

    /*
     * On mobile, nutrition is below the results.
     * Automatically move the user to it.
     *
     * On desktop, nutrition is already visible on
     * the right-hand side, so don't move the page.
     */
    if (
      typeof window !== "undefined" &&
      window.innerWidth < 1024
    ) {
      window.setTimeout(() => {
        nutritionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }
  }

  /*
   * ---------------------------------------------------------
   * FORMAT NUMBERS
   * ---------------------------------------------------------
   */

  function formatNumber(value: number) {
    if (!Number.isFinite(value)) {
      return "—";
    }

    if (Number.isInteger(value)) {
      return value.toString();
    }

    return value
      .toFixed(1)
      .replace(/\.0$/, "");
  }

  /*
   * ---------------------------------------------------------
   * WAIT FOR LOGIN CHECK
   * ---------------------------------------------------------
   */

  if (!userChecked) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-[1500px] px-4 py-10 lg:px-8">
          <div className="flex min-h-[420px] items-center justify-center rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
                🔎
              </div>

              <p className="mt-4 font-semibold text-slate-600">
                Loading Food Check...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * LOGGED OUT
   * ---------------------------------------------------------
   */

  if (!signedIn) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-[900px] px-4 py-10 lg:px-8 lg:py-14">
          <section className="overflow-hidden rounded-[28px] border border-green-100 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 px-6 py-12 text-center sm:px-10 sm:py-16">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                🔎
              </div>

              <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
                Food Check
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-lg leading-7 text-slate-600">
                Search the CoFID 2021 database and view
                detailed nutritional information for
                thousands of UK foods.
              </p>

              <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-blue-100 bg-blue-50 px-5 py-5">
                <p className="font-bold text-blue-950">
                  Please log in to use Food Check.
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Your Food Check database is available
                  to logged-in RenalPlan users.
                </p>

                <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="/auth/login"
                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-900 transition hover:bg-slate-50"
                  >
                    Log in
                  </a>

                  <a
                    href="/signup"
                    className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * LOGGED-IN PAGE
   * ---------------------------------------------------------
   */

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1500px] px-4 py-5 lg:px-8 lg:py-6">

        {/* =================================================
            DESKTOP TWO-COLUMN LAYOUT

            LEFT:
            Search
            Barcode buttons
            Search results
            100g information

            RIGHT:
            Nutrition information
            ================================================= */}

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">

          {/* =================================================
              LEFT COLUMN
              ================================================= */}

          <div className="min-w-0">

            {/* SEARCH CARD */}

            <section className="relative overflow-hidden rounded-[28px] border border-green-100 bg-white shadow-sm">

              {/* Background image */}

              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=85"
                  alt=""
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-white/94" />

                <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 via-white/95 to-blue-50/90" />
              </div>

              <div className="relative z-10 px-6 py-6 sm:px-8 sm:py-7">

                {/* SEARCH BAR */}

                <div className="flex gap-2">

                  <div className="relative min-w-0 flex-1">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-green-600">
                      ⌕
                    </span>

                    <input
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setSelectedFood(null);
                        setResults([]);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          void performSearch();
                        }
                      }}
                      placeholder="Search for a food..."
                      className="h-14 w-full rounded-2xl border-2 border-green-500 bg-white pl-12 pr-4 text-base font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      void performSearch()
                    }
                    disabled={searching}
                    className="h-14 shrink-0 rounded-2xl bg-green-600 px-5 font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
                  >
                    {searching
                      ? "Searching..."
                      : "Search"}
                  </button>

                </div>

                {/* BARCODE BUTTONS */}

                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
                    <div className="flex items-start gap-3">

                      <div className="text-2xl">
                        ▥
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-bold text-blue-950">
                            Scan barcode
                          </h2>

                          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">
                            Coming soon
                          </span>
                        </div>

                        <p className="mt-1 text-sm leading-5 text-slate-600">
                          Scan a product barcode to
                          find nutritional information.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
                    <div className="flex items-start gap-3">

                      <div className="text-2xl">
                        ⌨
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-bold text-blue-950">
                            Enter barcode
                          </h2>

                          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">
                            Coming soon
                          </span>
                        </div>

                        <p className="mt-1 text-sm leading-5 text-slate-600">
                          Enter a product barcode to
                          search for a specific item.
                        </p>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* =================================================
                SEARCH RESULTS
                DIRECTLY UNDER BARCODE BUTTONS
                ================================================= */}

            <section className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-200 px-6 py-5">

                <h2 className="text-2xl font-extrabold text-blue-950">
                  Search results
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  {search.trim()
                    ? searching
                      ? "Searching the CoFID 2021 database..."
                      : `Found ${results.length} result${
                          results.length === 1
                            ? ""
                            : "s"
                        } for "${search}"`
                    : "Search for a food above."}
                </p>

              </div>

              <div className="max-h-[520px] overflow-y-auto divide-y divide-slate-100">

                {!search.trim() ? (
                  <div className="flex min-h-[260px] items-center justify-center px-6 text-center">
                    <div className="max-w-sm">

                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
                        🔎
                      </div>

                      <h3 className="mt-4 text-xl font-extrabold text-blue-950">
                        Search for a food
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Try searching for chicken,
                        egg, potato, milk or another
                        food.
                      </p>

                    </div>
                  </div>

                ) : searching ? (

                  <div className="flex min-h-[260px] items-center justify-center px-6 text-center">
                    <div>

                      <div className="text-3xl">
                        ⏳
                      </div>

                      <p className="mt-3 font-semibold text-slate-600">
                        Searching...
                      </p>

                    </div>
                  </div>

                ) : results.length === 0 ? (

                  <div className="flex min-h-[260px] items-center justify-center px-6 text-center">
                    <div>

                      <div className="text-4xl">
                        🔎
                      </div>

                      <h3 className="mt-3 font-bold text-blue-950">
                        No foods found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try a different food or
                        search term.
                      </p>

                    </div>
                  </div>

                ) : (

                  results.map((food) => {
                    const active =
                      selectedFood?.id === food.id;

                    return (
                      <button
                        key={food.id}
                        type="button"
                        onClick={() =>
                          selectFood(food)
                        }
                        className={`flex w-full items-center gap-4 p-4 text-left transition ${
                          active
                            ? "bg-green-50"
                            : "bg-white hover:bg-slate-50"
                        }`}
                      >

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
                          🍽️
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="font-bold text-blue-950">
                            {food.name}
                          </div>

                          <div className="mt-1 text-sm text-slate-500">
                            {food.category}
                          </div>

                          {food.code && (
                            <div className="mt-1 text-xs text-slate-400">
                              {food.code}
                            </div>
                          )}

                        </div>

                        <div className="text-2xl text-blue-700">
                          ›
                        </div>

                      </button>
                    );
                  })

                )}

              </div>
            </section>

            {/* =================================================
                100G INFORMATION
                ================================================= */}

            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 shadow-sm">

              <div className="flex items-start gap-3">

                <span className="text-lg">
                  ⓘ
                </span>

                <div>

                  <strong className="text-blue-950">
                    Nutritional information is shown per 100 g.
                  </strong>

                  <span className="ml-1 text-blue-800">
                    This allows foods to be compared
                    consistently, even when packaging
                    uses different portion sizes.
                  </span>

                </div>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
                {error}
              </div>
            )}

          </div>

          {/* =================================================
              RIGHT COLUMN — NUTRITION
              ================================================= */}

          <section
            ref={nutritionRef}
            className="min-w-0 scroll-mt-6"
          >

            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

              {!selectedFood ? (

                <div className="flex min-h-[620px] items-center justify-center px-8 text-center">

                  <div className="max-w-md">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl">
                      🍽️
                    </div>

                    <h2 className="mt-5 text-2xl font-extrabold text-blue-950">
                      Nutrition information
                    </h2>

                    <p className="mt-2 leading-6 text-slate-600">
                      Search for a food and select it
                      from the results to see its
                      nutritional information per
                      100 g.
                    </p>

                  </div>

                </div>

              ) : (

                <>

                  {/* FOOD HEADING */}

                  <div className="border-b border-slate-200 p-6">

                    <div className="flex flex-col gap-5 sm:flex-row">

                      <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-2xl bg-green-50 text-6xl sm:w-36">
                        🍽️
                      </div>

                      <div className="min-w-0 flex-1">

                        <h2 className="text-2xl font-extrabold leading-tight text-blue-950">
                          {selectedFood.name}
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-blue-700">
                          {selectedFood.category}
                        </p>

                        {selectedFood.code && (
                          <p className="mt-2 text-sm text-slate-600">
                            Food code:{" "}
                            {selectedFood.code}
                          </p>
                        )}

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {selectedFood.description}
                        </p>

                        <div className="mt-4 inline-block rounded-xl bg-blue-50 px-4 py-3 text-sm">
                          <div className="font-bold text-blue-900">
                            Source
                          </div>

                          <div className="mt-1 text-blue-700">
                            CoFID 2021
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* NUTRITION */}

                  <div className="p-6">

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">

                      <h3 className="text-xl font-extrabold text-blue-900">
                        Nutritional information per 100 g
                      </h3>

                    </div>

                    <div className="mt-4 grid gap-5 md:grid-cols-2">

                      {/* MAIN NUTRIENTS */}

                      <div className="space-y-2">

                        <NutritionRow
                          label="Energy"
                          value={
                            selectedFood.energyKj
                              ? `${formatNumber(
                                  selectedFood.energyKj
                                )} kJ`
                              : "—"
                          }
                          secondary={
                            selectedFood.energyKcal
                              ? `${formatNumber(
                                  selectedFood.energyKcal
                                )} kcal`
                              : undefined
                          }
                        />

                        <NutritionRow
                          label="Protein"
                          value={`${formatNumber(
                            selectedFood.protein
                          )} g`}
                        />

                        <NutritionRow
                          label="Carbohydrate"
                          value={`${formatNumber(
                            selectedFood.carbohydrate
                          )} g`}
                        />

                        <NutritionRow
                          label="of which sugars"
                          value={`${formatNumber(
                            selectedFood.sugars
                          )} g`}
                          muted
                        />

                        <NutritionRow
                          label="Fat"
                          value={`${formatNumber(
                            selectedFood.fat
                          )} g`}
                        />

                        <NutritionRow
                          label="of which saturates"
                          value={`${formatNumber(
                            selectedFood.saturates
                          )} g`}
                          muted
                        />

                        <NutritionRow
                          label="Fibre"
                          value={`${formatNumber(
                            selectedFood.fibre
                          )} g`}
                        />

                      </div>

                      {/* RENAL / ADDITIONAL */}

                      <div className="space-y-2">

                        <NutritionRow
                          label="Salt"
                          value={`${formatNumber(
                            selectedFood.salt
                          )} g`}
                          emphasis="red"
                        />

                        <NutritionRow
                          label="Sodium"
                          value={`${formatNumber(
                            selectedFood.sodium
                          )} mg`}
                          emphasis="blue"
                        />

                        <NutritionRow
                          label="Potassium"
                          value={`${formatNumber(
                            selectedFood.potassium
                          )} mg`}
                          emphasis="green"
                        />

                        <NutritionRow
                          label="Phosphorus"
                          value={`${formatNumber(
                            selectedFood.phosphorus
                          )} mg`}
                          emphasis="orange"
                        />

                        <NutritionRow
                          label="Calcium"
                          value={`${formatNumber(
                            selectedFood.calcium
                          )} mg`}
                          emphasis="blue"
                        />

                        <NutritionRow
                          label="Magnesium"
                          value={`${formatNumber(
                            selectedFood.magnesium
                          )} mg`}
                          emphasis="blue"
                        />

                        <NutritionRow
                          label="Iron"
                          value={`${formatNumber(
                            selectedFood.iron
                          )} mg`}
                          emphasis="blue"
                        />

                        <NutritionRow
                          label="Zinc"
                          value={`${formatNumber(
                            selectedFood.zinc
                          )} mg`}
                          emphasis="blue"
                        />

                      </div>

                    </div>

                    {/* SOURCE */}

                    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                      <div className="flex items-start gap-3">

                        <div className="text-xl text-blue-700">
                          ⓘ
                        </div>

                        <div>

                          <p className="text-sm font-semibold leading-6 text-blue-950">
                            Source: McCance and
                            Widdowson&apos;s
                            Composition of Foods
                            Integrated Dataset
                            (CoFID), 2021.
                          </p>

                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            Values are presented per
                            100 g of edible portion.
                          </p>

                          <a
                            href="https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-sm font-bold text-blue-700 hover:underline"
                          >
                            Find out more about
                            CoFID 2021 →
                          </a>

                        </div>

                      </div>

                    </div>

                  </div>

                </>

              )}

            </div>

          </section>

        </section>

      </div>
    </main>
  );
}

/* ============================================================
   NUTRITION ROW
   ============================================================ */

function NutritionRow({
  label,
  value,
  secondary,
  muted = false,
  emphasis,
}: {
  label: string;
  value: string;
  secondary?: string;
  muted?: boolean;
  emphasis?:
    | "red"
    | "blue"
    | "green"
    | "orange";
}) {
  const emphasisClasses = {
    red:
      "bg-red-50 border-red-100 text-red-700",

    blue:
      "bg-blue-50 border-blue-100 text-blue-800",

    green:
      "bg-green-50 border-green-100 text-green-700",

    orange:
      "bg-orange-50 border-orange-100 text-orange-700",
  };

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3 ${
        emphasis
          ? emphasisClasses[emphasis]
          : muted
          ? "border-slate-100 bg-slate-50"
          : "border-slate-100 bg-white"
      }`}
    >

      <span
        className={`text-sm ${
          muted
            ? "pl-3 text-slate-500"
            : emphasis
            ? "font-semibold"
            : "font-semibold text-blue-950"
        }`}
      >
        {label}
      </span>

      <div className="text-right">

        <div
          className={`font-bold ${
            muted
              ? "text-slate-600"
              : emphasis
              ? ""
              : "text-blue-950"
          }`}
        >
          {value}
        </div>

        {secondary && (
          <div className="text-xs font-medium text-slate-500">
            {secondary}
          </div>
        )}

      </div>

    </div>
  );
}