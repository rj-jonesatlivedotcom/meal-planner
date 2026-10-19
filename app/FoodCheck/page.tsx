"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createBarcodeScanner } from "./barcodeScanner";
import { scrollToFoodCheckResults } from "./resultScrolling";

type CofidRow = Record<string, unknown>;

type Food = {
  id: string;
  name: string;
  category: string;
  code: string;
  description: string;
  energyKj: number | null;
  energyKcal: number | null;
  protein: number | null;
  carbohydrate: number | null;
  sugars: number | null;
  fat: number | null;
  saturates: number | null;
  fibre: number | null;
  salt: number | null;
  sodium: number | null;
  potassium: number | null;
  phosphorus: number | null;
  calcium: number | null;
  magnesium: number | null;
  iron: number | null;
  zinc: number | null;
  source: string;
  imageUrl?: string;
};

function optionalNumberValue(
  row: CofidRow,
  ...keys: string[]
): number | null {
  for (const key of keys) {
    const value = row[key];

    if (typeof value === "number" || (typeof value === "string" && /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim()))) {
      const number = Number(value);

      if (Number.isFinite(number)) {
        return number;
      }
    }
  }

  return null;
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

    energyKj: optionalNumberValue(
      row,
      "energy_kj",
      "energy_kj_100g",
      "energy_kj_per_100g"
    ),

    energyKcal: optionalNumberValue(
      row,
      "energy_kcal",
      "energy_kcal_100g",
      "energy_kcal_per_100g"
    ),

    protein: optionalNumberValue(
      row,
      "protein_g",
      "protein"
    ),

    carbohydrate: optionalNumberValue(
      row,
      "carbohydrate_g",
      "carbohydrates_g",
      "carbohydrate"
    ),

    sugars: optionalNumberValue(
      row,
      "sugars_g",
      "sugar_g",
      "sugars"
    ),

    fat: optionalNumberValue(
      row,
      "fat_g",
      "fat"
    ),

    saturates: optionalNumberValue(
      row,
      "saturates_g",
      "saturated_fat_g",
      "saturates"
    ),

    fibre: optionalNumberValue(
      row,
      "fibre_g",
      "fiber_g",
      "fibre"
    ),

    salt: optionalNumberValue(
      row,
      "salt_g",
      "salt"
    ),

    sodium: optionalNumberValue(
      row,
      "sodium_mg",
      "sodium"
    ),

    potassium: optionalNumberValue(
      row,
      "potassium_mg",
      "potassium"
    ),

    phosphorus: optionalNumberValue(
      row,
      "phosphorus_mg",
      "phosphorus",
      "phosphate_mg",
      "phosphate"
    ),

    calcium: optionalNumberValue(
      row,
      "calcium_mg",
      "calcium"
    ),

    magnesium: optionalNumberValue(
      row,
      "magnesium_mg",
      "magnesium"
    ),

    iron: optionalNumberValue(
      row,
      "iron_mg",
      "iron"
    ),

    zinc: optionalNumberValue(
      row,
      "zinc_mg",
      "zinc"
    ),
    source: "CoFID 2021",
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

  const [barcode, setBarcode] = useState("");
  const [barcodeLoading, setBarcodeLoading] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannerError, setScannerError] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerSessionRef = useRef<ReturnType<typeof createBarcodeScanner> | null>(null);
  const scannerRequestedRef = useRef(false);
  const barcodeLookupBusyRef = useRef(false);
  const lookupBarcodeRef = useRef(lookupBarcode);

  const [userChecked, setUserChecked] =
    useState(false);

  const [signedIn, setSignedIn] =
    useState(false);

  const nutritionRef =
    useRef<HTMLDivElement | null>(null);

  const resultsRef = useRef<HTMLElement | null>(null);
  const resultsListRef = useRef<HTMLDivElement | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const [scrollRequest, setScrollRequest] = useState<{
    target: "results" | "nutrition" | "feedback" | null;
    revision: number;
  }>({ target: null, revision: 0 });
  const handledScrollRef = useRef(0);

  function requestResultsScroll(target: typeof scrollRequest.target) {
    setScrollRequest(previous => ({ target, revision: previous.revision + 1 }));
  }

  useEffect(() => {
    if (!scrollRequest.target || searching || barcodeLoading || scannerOpen ||
        handledScrollRef.current === scrollRequest.revision) return;
    const target = scrollRequest.target === "results" ? resultsRef.current
      : scrollRequest.target === "nutrition" ? selectedFood && nutritionRef.current
      : error && feedbackRef.current;
    if (!target) return;
    const frame = window.requestAnimationFrame(() => {
      handledScrollRef.current = scrollRequest.revision;
      if (scrollRequest.target === "results" && resultsListRef.current) {
        resultsListRef.current.scrollTop = 0;
      }
      scrollToFoodCheckResults(target);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [scrollRequest, searching, barcodeLoading, scannerOpen, selectedFood, error]);

  const searchDebounceRef =
    useRef<number | null>(null);

  const searchRequestRef =
    useRef(0);

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

  async function performSearch(termOverride?: string) {
    if (!signedIn) {
      return;
    }

    const term = (termOverride ?? search).trim();
    const requestId = ++searchRequestRef.current;
    requestResultsScroll(null);

    setSelectedFood(null);
    setError("");

    if (!term) {
      setResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);

    /*
     * Search each word independently rather than requiring the exact
     * phrase to appear in the database in the same order.
     *
     * For example:
     *   "chicken curry"
     * will find:
     *   "Curry, chicken"
     *
     * We then keep only foods containing every search word and rank
     * the closest matches first.
     */
    const searchTerms = Array.from(
      new Set(
        term
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .map((word) => word.trim())
          .filter(Boolean)
      )
    );

    try {
      const queries = await Promise.all(
        searchTerms.map((searchTerm) =>
          supabase
            .from("cofid_foods")
            .select("*")
            .ilike(
              "food_name",
              `%${searchTerm}%`
            )
            .limit(200)
        )
      );

      const failedQuery = queries.find(
        (queryResult) => queryResult.error
      );

      if (failedQuery?.error) {
        console.error(
          "CoFID search failed:",
          failedQuery.error
        );

        if (requestId === searchRequestRef.current) {
          setError(
            "We couldn't search the food database. Please try again."
          );

          setResults([]);
          requestResultsScroll("feedback");
        }
        return;
      }

      /*
       * Combine the results from all word searches. A food must contain
       * every search term, but the terms can appear in any order.
       */
      const rowsById = new Map<string, CofidRow>();

      for (const queryResult of queries) {
        for (const row of queryResult.data ?? []) {
          const code = textValue(
            row,
            "food_code",
            "code"
          );

          const id =
            code ||
            textValue(
              row,
              "food_name",
              "name"
            );

          if (id && !rowsById.has(id)) {
            rowsById.set(id, row);
          }
        }
      }

      const matchingRows = Array.from(
        rowsById.values()
      ).filter((row) => {
        const foodName = textValue(
          row,
          "food_name",
          "name"
        ).toLowerCase();

        return searchTerms.every((searchTerm) =>
          foodName.includes(searchTerm)
        );
      });

      /*
       * Rank the matches so the most natural results appear first:
       * 1. Exact phrase match
       * 2. Name starts with the full search
       * 3. All words present, with fewer extra characters preferred
       * 4. Alphabetical order
       */
      const normalisedTerm = term
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

      matchingRows.sort((a, b) => {
        const nameA = textValue(
          a,
          "food_name",
          "name"
        ).toLowerCase();

        const nameB = textValue(
          b,
          "food_name",
          "name"
        ).toLowerCase();

        const normalisedA = nameA
          .replace(/[^a-z0-9]+/g, " ")
          .trim();

        const normalisedB = nameB
          .replace(/[^a-z0-9]+/g, " ")
          .trim();

        const score = (name: string, normalisedName: string) => {
          let value = 0;

          if (normalisedName === normalisedTerm) {
            value += 1000;
          }

          if (normalisedName.startsWith(normalisedTerm)) {
            value += 500;
          }

          if (name.includes(term.toLowerCase())) {
            value += 250;
          }

          value -= Math.max(
            0,
            normalisedName.length - normalisedTerm.length
          );

          return value;
        };

        const scoreDifference =
          score(nameB, normalisedB) -
          score(nameA, normalisedA);

        if (scoreDifference !== 0) {
          return scoreDifference;
        }

        return nameA.localeCompare(nameB);
      });

      if (requestId === searchRequestRef.current) {
        setResults(
          matchingRows
            .slice(0, 50)
            .map(mapFood)
        );
        requestResultsScroll("results");
      }
    } catch (searchError) {
      console.error(
        "CoFID search failed:",
        searchError
      );

      if (requestId === searchRequestRef.current) {
        setError(
          "We couldn't search the food database. Please try again."
        );

        setResults([]);
        requestResultsScroll("feedback");
      }
    } finally {
      if (requestId === searchRequestRef.current) {
        setSearching(false);
      }
    }
  }

  /*
   * ---------------------------------------------------------
   * BARCODE LOOKUP
   * ---------------------------------------------------------
   */

  function stopScanner() {
    scannerRequestedRef.current = false;
    scannerSessionRef.current?.stop();
    setScannerOpen(false);
  }

  async function lookupBarcode(value: string) {
    if (barcodeLookupBusyRef.current) return;
    const code = value.replace(/\D/g, "");

    if (!code) {
      setError("Please enter a valid barcode.");
      requestResultsScroll("feedback");
      return;
    }

    const requestId = ++searchRequestRef.current;
    requestResultsScroll(null);
    if (searchDebounceRef.current !== null) {
      window.clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = null;
    }
    setSearching(false);
    barcodeLookupBusyRef.current = true;
    stopScanner();
    setBarcode(code);
    setBarcodeLoading(true);
    setError("");
    setSelectedFood(null);
    setResults([]);

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (requestId !== searchRequestRef.current) return;
      if (response.status === 404) {
        setError(
          "We couldn't find that barcode in the Open Food Facts database. Try entering the barcode again or search for the food by name."
        );
        requestResultsScroll("feedback");
        return;
      }

      if (!response.ok) {
        throw new Error("Barcode lookup failed");
      }

      const payload = await response.json();
      if (requestId !== searchRequestRef.current) return;
      const product = payload?.product;

      if (payload?.status !== 1 || !product) {
        setError(
          "We couldn't find that barcode in the Open Food Facts database. Try entering the barcode again or search for the food by name."
        );
        requestResultsScroll("feedback");
        return;
      }

      const n = product.nutriments ?? {};
      const optionalNumeric = (value: unknown): number | null => {
        if (typeof value !== "number" && !(typeof value === "string" && /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim()))) {
          return null;
        }

        const number = Number(value);
        return Number.isFinite(number) ? number : null;
      };

      const productName =
        product.product_name ||
        product.product_name_en ||
        "Scanned product";

      const food: Food = {
        id: `barcode-${code}`,
        name: productName,
        category:
          product.categories ||
          product.categories_en ||
          "Packaged food",
        code,
        description:
          product.brands
            ? `${product.brands} · Barcode ${code}`
            : `Barcode ${code}`,
        energyKj: optionalNumeric(n["energy-kj_100g"]),
        energyKcal: optionalNumeric(
          n["energy-kcal_100g"] ?? n["energy-kcal"]
        ),
        protein: optionalNumeric(n.proteins_100g),
        carbohydrate: optionalNumeric(n.carbohydrates_100g),
        sugars: optionalNumeric(n.sugars_100g),
        fat: optionalNumeric(n.fat_100g),
        saturates: optionalNumeric(
          n["saturated-fat_100g"] ?? n.saturated_fat_100g
        ),
        fibre: optionalNumeric(n.fiber_100g ?? n.fibers_100g),
        salt: optionalNumeric(n.salt_100g),
        sodium: optionalNumeric(n.sodium_100g) === null ? null : optionalNumeric(n.sodium_100g)! * 1000,
        potassium: optionalNumeric(n.potassium_100g) === null
          ? null
          : optionalNumeric(n.potassium_100g)! * 1000,
        phosphorus: optionalNumeric(n.phosphorus_100g) === null
          ? null
          : optionalNumeric(n.phosphorus_100g)! * 1000,
        calcium: optionalNumeric(n.calcium_100g) === null ? null : optionalNumeric(n.calcium_100g)! * 1000,
        magnesium: optionalNumeric(n.magnesium_100g) === null ? null : optionalNumeric(n.magnesium_100g)! * 1000,
        iron: optionalNumeric(n.iron_100g) === null ? null : optionalNumeric(n.iron_100g)! * 1000,
        zinc: optionalNumeric(n.zinc_100g) === null ? null : optionalNumeric(n.zinc_100g)! * 1000,
        source: "Open Food Facts",
        imageUrl: product.image_front_url || product.image_url || undefined,
      };

      // Share post-render nutrition scrolling with normal food selection.
      selectFood(food);
    } catch (lookupError) {
      if (requestId !== searchRequestRef.current) return;
      console.error("Barcode lookup failed:", lookupError);
      setError(
        "We couldn't check that barcode right now. Please try again or search for the food by name."
      );
      requestResultsScroll("feedback");
    } finally {
      barcodeLookupBusyRef.current = false;
      setBarcodeLoading(false);
    }
  }

  function startScanner() {
    if (scannerRequestedRef.current || barcodeLookupBusyRef.current) return;
    scannerRequestedRef.current = true;
    setScannerError("");
    setError("");
    setScannerOpen(true);
  }

  useEffect(() => {
    lookupBarcodeRef.current = lookupBarcode;
  });

  useEffect(() => {
    if (!scannerOpen || !videoRef.current) return;
    const session = createBarcodeScanner(
      videoRef.current,
      (value) => {
        scannerRequestedRef.current = false;
        setScannerOpen(false);
        void lookupBarcodeRef.current(value);
      },
      (message) => {
        scannerRequestedRef.current = false;
        setScannerError(message);
        setScannerOpen(false);
      },
    );
    scannerSessionRef.current = session;
    void session.start();
    return () => {
      session.stop();
      if (scannerSessionRef.current === session) scannerSessionRef.current = null;
    };
  }, [scannerOpen]);

  useEffect(() => {
    const closeCamera = () => {
      scannerRequestedRef.current = false;
      scannerSessionRef.current?.stop();
      setScannerOpen(false);
    };
    const onVisibilityChange = () => {
      if (document.hidden) closeCamera();
    };
    window.addEventListener("pagehide", closeCamera);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("pagehide", closeCamera);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scannerSessionRef.current?.stop();
      if (searchDebounceRef.current !== null) {
        window.clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * SELECT FOOD
   * ---------------------------------------------------------
   */

  function selectFood(food: Food) {
    setSelectedFood(food);

    requestResultsScroll("nutrition");
  }

  /*
   * ---------------------------------------------------------
   * FORMAT NUMBERS
   * ---------------------------------------------------------
   */

  function formatNumber(value: number | null) {
    if (value === null || !Number.isFinite(value)) {
      return "—";
    }

    if (Number.isInteger(value)) {
      return value.toString();
    }

    return value
      .toFixed(1)
      .replace(/\.0$/, "");
  }

  function displayNutrient(value: number | null, unit: string) {
    return value === null ? "Not available" : `${formatNumber(value)} ${unit}`;
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
   * LOGGED-IN PAGE
   * ---------------------------------------------------------
   */

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
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

            <section className="food-check-search-card relative overflow-hidden rounded-[28px] border border-green-100 bg-white shadow-sm">

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

              <div className="relative z-10 px-4 py-5 sm:px-8 sm:py-7">

                {/* SEARCH BAR */}

                <div className="flex gap-2">

                  <div className="relative min-w-0 flex-1">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-green-600">
                      ⌕
                    </span>

                    <input
                      value={search}
                      onChange={(e) => {
                        const nextSearch = e.target.value;

                        setSearch(nextSearch);
                        setSelectedFood(null);

                        if (searchDebounceRef.current !== null) {
                          window.clearTimeout(searchDebounceRef.current);
                          searchDebounceRef.current = null;
                        }

                        // Invalidate any search that is still running.
                        searchRequestRef.current += 1;
                        requestResultsScroll(null);

                        if (nextSearch.trim().length < 2) {
                          setResults([]);
                          setSearching(false);
                          return;
                        }

                        searchDebounceRef.current = window.setTimeout(() => {
                          searchDebounceRef.current = null;
                          void performSearch(nextSearch);
                        }, 300);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (searchDebounceRef.current !== null) {
                            window.clearTimeout(searchDebounceRef.current);
                            searchDebounceRef.current = null;
                          }

                          void performSearch();
                        }
                      }}
                      placeholder="Search for a food..."
                      className="h-14 w-full rounded-2xl border-2 border-green-500 bg-white pl-12 pr-4 text-base font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const gtag = (window as typeof window & {
                        gtag?: (...args: any[]) => void;
                      }).gtag;

                      if (gtag) {
                        gtag("event", "food_check_used");
                      }

                      if (searchDebounceRef.current !== null) {
                        window.clearTimeout(searchDebounceRef.current);
                        searchDebounceRef.current = null;
                      }

                      void performSearch();
                    }}
                    disabled={searching}
                    className="h-14 shrink-0 rounded-2xl bg-green-600 px-5 font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
                  >
                    {searching
                      ? "Searching..."
                      : "Search"}
                  </button>

                </div>

                {/* BARCODE TOOLS */}

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="food-check-barcode-card rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="shrink-0 text-2xl">▥</div>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-bold text-blue-950">Scan barcode</h2>
                        <p className="mt-1 break-words text-sm leading-5 text-slate-600">
                          
                        </p>
                        <button
                          type="button"
                          onClick={startScanner}
                          disabled={scannerOpen || barcodeLoading}
                          className="mt-3 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
                        >
                          Open camera
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="food-check-barcode-card rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="shrink-0 text-2xl">⌨</div>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-bold text-blue-950">Enter barcode</h2>
                        <p className="mt-1 break-words text-sm leading-5 text-slate-600">
                          
                        </p>
                        <div className="mt-3 flex min-w-0 flex-col gap-2 sm:flex-row">
                          <input
                            value={barcode}
                            onChange={(event) => setBarcode(event.target.value.replace(/\D/g, ""))}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                void lookupBarcode(barcode);
                              }
                            }}
                            inputMode="numeric"
                            placeholder="e.g. 5000159484695"
                            className="min-w-0 w-full flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-auto"
                          />
                          <button
                            type="button"
                            onClick={() => void lookupBarcode(barcode)}
                            disabled={barcodeLoading || !barcode}
                            className="w-full shrink-0 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                          >
                            {barcodeLoading ? "Checking..." : "Check"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {scannerError && (
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    {scannerError}
                  </div>
                )}

                {scannerOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
                      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                        <div>
                          <h2 className="font-extrabold text-blue-950">Scan barcode</h2>
                          <p className="text-sm text-slate-500">Position the barcode inside the frame.</p>
                        </div>
                        <button
                          type="button"
                          onClick={stopScanner}
                          className="rounded-xl px-3 py-2 font-bold text-slate-600 hover:bg-slate-100"
                        >
                          Close
                        </button>
                      </div>
                      <div className="relative bg-black p-3">
                        <video
                          ref={videoRef}
                          className="aspect-video w-full rounded-2xl object-cover"
                          muted
                          autoPlay
                          playsInline
                        />
                        <div className="pointer-events-none absolute inset-x-10 top-1/2 h-20 -translate-y-1/2 rounded-xl border-2 border-green-400" />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </section>

            {/* =================================================
                SEARCH RESULTS
                DIRECTLY UNDER BARCODE BUTTONS
                ================================================= */}

            <section ref={resultsRef} className="food-check-results-card mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

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

              <div ref={resultsListRef} className="max-h-[520px] overflow-y-auto divide-y divide-slate-100">

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
              <div ref={feedbackRef} className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
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

            <div className="food-check-nutrition-card overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

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
                            {selectedFood.source}
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
                            selectedFood.energyKj !== null
                              ? `${formatNumber(
                                  selectedFood.energyKj
                                )} kJ`
                              : "Not available"
                          }
                          secondary={
                            selectedFood.energyKcal !== null
                              ? `${formatNumber(
                                  selectedFood.energyKcal
                                )} kcal`
                              : "Not available"
                          }
                        />

                        <NutritionRow
                          label="Protein"
                          value={displayNutrient(selectedFood.protein, "g")}
                        />

                        <NutritionRow
                          label="Carbohydrate"
                          value={displayNutrient(selectedFood.carbohydrate, "g")}
                        />

                        <NutritionRow
                          label="of which sugars"
                          value={displayNutrient(selectedFood.sugars, "g")}
                          muted
                        />

                        <NutritionRow
                          label="Fat"
                          value={displayNutrient(selectedFood.fat, "g")}
                        />

                        <NutritionRow
                          label="of which saturates"
                          value={displayNutrient(selectedFood.saturates, "g")}
                          muted
                        />

                        <NutritionRow
                          label="Fibre"
                          value={displayNutrient(selectedFood.fibre, "g")}
                        />

                      </div>

                      {/* RENAL / ADDITIONAL */}

                      <div className="space-y-2">

                        <NutritionRow
                          label="Salt"
                          value={displayNutrient(selectedFood.salt, "g")}
                          emphasis="red"
                        />

                        <NutritionRow
                          label="Sodium"
                          value={displayNutrient(selectedFood.sodium, "mg")}
                          emphasis="blue"
                        />

                        <NutritionRow
                          label="Potassium"
                          value={
                            selectedFood.potassium === null
                              ? "Not available"
                              : `${formatNumber(selectedFood.potassium)} mg`
                          }
                          emphasis="green"
                        />

                        <NutritionRow
                          label="Phosphorus"
                          value={
                            selectedFood.phosphorus === null
                              ? "Not available"
                              : `${formatNumber(selectedFood.phosphorus)} mg`
                          }
                          emphasis="orange"
                        />

                        <NutritionRow
                          label="Calcium"
                          value={displayNutrient(selectedFood.calcium, "mg")}
                          emphasis="blue"
                        />

                        <NutritionRow
                          label="Magnesium"
                          value={displayNutrient(selectedFood.magnesium, "mg")}
                          emphasis="blue"
                        />

                        <NutritionRow
                          label="Iron"
                          value={displayNutrient(selectedFood.iron, "mg")}
                          emphasis="blue"
                        />

                        <NutritionRow
                          label="Zinc"
                          value={displayNutrient(selectedFood.zinc, "mg")}
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

                          <h3 className="text-sm font-semibold leading-6 text-blue-950">
                            Nutritional information source
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {selectedFood.source === "CoFID 2021"
                              ? "McCance and Widdowson's Composition of Foods Integrated Dataset (CoFID), 2021."
                              : "Open Food Facts"}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {selectedFood.source === "CoFID 2021"
                              ? "Values are presented per 100g of edible portion."
                              : "Nutritional information comes from the Open Food Facts product database and is displayed per 100g. Product information may be incomplete or contributed by users. 'Not available' does not mean zero."}
                          </p>
                          <a
                            href={selectedFood.source === "CoFID 2021"
                              ? "https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid"
                              : "https://world.openfoodfacts.org/product/" + selectedFood.code}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-sm font-bold text-blue-700 hover:underline"
                          >
                            {selectedFood.source === "CoFID 2021"
                              ? "Find out more about CoFID 2021 ?"
                              : "View product on Open Food Facts"}
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

      {!signedIn && (
        <div className="fixed inset-x-0 bottom-0 top-[64px] z-[40] flex items-center justify-center bg-white/20 p-4 backdrop-blur-[2px] md:top-[88px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="food-check-login-title"
            className="food-check-login-modal w-full max-w-md rounded-3xl bg-white/95 p-7 text-center shadow-2xl ring-1 ring-slate-200"
          >
            <div className="food-check-login-icon mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
              🔒
            </div>

            <h2
              id="food-check-login-title"
              className="food-check-login-title mt-4 text-2xl font-extrabold text-slate-900"
            >
              Log in to use Food Check
            </h2>

            <p className="food-check-login-description mt-3 text-sm leading-6 text-slate-600">
              Log in to your RenalPlan account to search foods, scan barcodes and view detailed nutritional information.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="/auth/login"
                className="rounded-2xl bg-[#0B3B75] px-4 py-3 text-center font-bold text-white transition hover:bg-[#082E5C]"
              >
                Log in
              </a>

              <a
                href="/signup"
                className="rounded-2xl bg-orange-500 px-4 py-3 text-center font-bold text-white transition hover:bg-orange-600"
              >
                Create account
              </a>
            </div>

            <p className="food-check-login-footnote mt-4 text-xs text-slate-500">
              Your Food Check access is available with your RenalPlan account.
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* Keep Food Check's restricted-access popup consistent with the
           My Diet and Nutrition popups while preserving the mobile
           navigation fix. */
        html[data-theme="dark"] .food-check-login-modal {
          background-color: #172838 !important;
          border-color: #526575 !important;
          color: #f1f5f9 !important;
        }

        html[data-theme="dark"] .food-check-login-icon {
          background-color: #202f3b !important;
        }

        html[data-theme="dark"] .food-check-login-title {
          color: #f8fafc !important;
        }

        html[data-theme="dark"] .food-check-login-description {
          color: #d7e2eb !important;
        }

        html[data-theme="dark"] .food-check-login-footnote {
          color: #aab8c5 !important;
        }
      `}</style>
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
      "border-slate-100 bg-white text-blue-950",

    blue:
      "border-slate-100 bg-white text-blue-950",

    green:
      "border-slate-100 bg-white text-blue-950",

    orange:
      "border-slate-100 bg-white text-blue-950",
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
