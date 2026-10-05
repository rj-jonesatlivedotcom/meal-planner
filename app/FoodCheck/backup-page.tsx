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
  source: string;
  imageUrl?: string;
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
  const scannerStreamRef = useRef<MediaStream | null>(null);
  const scannerTimerRef = useRef<number | null>(null);

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

        setError(
          "We couldn't search the food database. Please try again."
        );

        setResults([]);
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

      setResults(
        matchingRows
          .slice(0, 50)
          .map(mapFood)
      );
    } catch (searchError) {
      console.error(
        "CoFID search failed:",
        searchError
      );

      setError(
        "We couldn't search the food database. Please try again."
      );

      setResults([]);
    } finally {
      setSearching(false);
    }
  }

  /*
   * ---------------------------------------------------------
   * BARCODE LOOKUP
   * ---------------------------------------------------------
   */

  function stopScanner() {
    if (scannerTimerRef.current !== null) {
      window.clearTimeout(scannerTimerRef.current);
      scannerTimerRef.current = null;
    }

    scannerStreamRef.current?.getTracks().forEach((track) => track.stop());
    scannerStreamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setScannerOpen(false);
  }

  async function lookupBarcode(value: string) {
    const code = value.replace(/\D/g, "");

    if (!code) {
      setError("Please enter a valid barcode.");
      return;
    }

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

      if (!response.ok) {
        throw new Error("Barcode lookup failed");
      }

      const payload = await response.json();
      const product = payload?.product;

      if (payload?.status !== 1 || !product) {
        setError(
          "We couldn't find that barcode in the Open Food Facts database. Try entering the barcode again or search for the food by name."
        );
        return;
      }

      const n = product.nutriments ?? {};
      const numeric = (value: unknown) => {
        const number = Number(value);
        return Number.isFinite(number) ? number : 0;
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
        energyKj: numeric(n["energy-kj_100g"]),
        energyKcal: numeric(
          n["energy-kcal_100g"] ?? n["energy-kcal"]
        ),
        protein: numeric(n.proteins_100g),
        carbohydrate: numeric(n.carbohydrates_100g),
        sugars: numeric(n.sugars_100g),
        fat: numeric(n.fat_100g),
        saturates: numeric(
          n["saturated-fat_100g"] ?? n.saturated_fat_100g
        ),
        fibre: numeric(n.fiber_100g ?? n.fibers_100g),
        salt: numeric(n.salt_100g),
        sodium: numeric(n.sodium_100g) * 1000,
        potassium: numeric(n.potassium_100g) * 1000,
        phosphorus: numeric(n.phosphorus_100g) * 1000,
        calcium: numeric(n.calcium_100g) * 1000,
        magnesium: numeric(n.magnesium_100g) * 1000,
        iron: numeric(n.iron_100g) * 1000,
        zinc: numeric(n.zinc_100g) * 1000,
        source: "Open Food Facts",
        imageUrl: product.image_front_url || product.image_url || undefined,
      };

      // Use the same selection handler as a normal search result so that
      // mobile automatically scrolls to the nutrition result.
      selectFood(food);
    } catch (lookupError) {
      console.error("Barcode lookup failed:", lookupError);
      setError(
        "We couldn't check that barcode right now. Please try again or search for the food by name."
      );
    } finally {
      setBarcodeLoading(false);
      stopScanner();
    }
  }

  async function startScanner() {
    setScannerError("");
    setError("");

    /*
     * Camera access requires a secure browser context.
     * localhost is treated as secure by browsers, but a local
     * network address such as 192.168.x.x is not.
     */
    if (
      !window.isSecureContext &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      setScannerError(
        "Camera scanning needs a secure connection (HTTPS). The local 192.168.x.x test address cannot access your camera. Please test the scanner on the live RenalPlan site, or enter the barcode manually."
      );
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setScannerError(
        "Camera access is not available in this browser. Please enter the barcode manually instead."
      );
      return;
    }

    if (!("BarcodeDetector" in window)) {
      setScannerError(
        "Barcode scanning is not supported by this browser. Please enter the barcode manually instead."
      );
      return;
    }

    try {
      const BarcodeDetectorClass = (
        window as typeof window & {
          BarcodeDetector: new (options?: {
            formats?: string[];
          }) => {
            detect: (
              source: HTMLVideoElement
            ) => Promise<Array<{ rawValue?: string }>>;
          };
        }
      ).BarcodeDetector;

      const detector = new BarcodeDetectorClass({
        formats: [
          "ean_13",
          "ean_8",
          "upc_a",
          "upc_e",
          "code_128",
        ],
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      scannerStreamRef.current = stream;
      setScannerOpen(true);

      window.setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
        void videoRef.current.play();
      }, 50);

      const scan = async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) {
          scannerTimerRef.current = window.setTimeout(scan, 200);
          return;
        }

        try {
          const detected = await detector.detect(videoRef.current);
          const value = detected.find((item) => item.rawValue)?.rawValue;

          if (value) {
            setBarcode(value);
            await lookupBarcode(value);
            return;
          }
        } catch (scanError) {
          console.error("Barcode scan failed:", scanError);
        }

        scannerTimerRef.current = window.setTimeout(scan, 200);
      };

      scannerTimerRef.current = window.setTimeout(scan, 300);
    } catch (cameraError) {
      console.error("Unable to start barcode scanner:", cameraError);

      const errorName =
        cameraError instanceof DOMException
          ? cameraError.name
          : "";

      if (errorName === "NotAllowedError" || errorName === "PermissionDeniedError") {
        setScannerError(
          "Camera access was blocked. Please allow camera permission for RenalPlan in your browser settings, then try again."
        );
      } else if (errorName === "NotFoundError") {
        setScannerError(
          "No camera was found on this device. You can enter the barcode manually instead."
        );
      } else if (errorName === "SecurityError") {
        setScannerError(
          "Your browser blocked camera access because this page is not using a secure connection. Please use the HTTPS RenalPlan site or enter the barcode manually."
        );
      } else {
        setScannerError(
          "We couldn't access your camera. Please allow camera access or enter the barcode manually."
        );
      }
    }
  }

  useEffect(() => {
    return () => {
      if (scannerTimerRef.current !== null) {
        window.clearTimeout(scannerTimerRef.current);
      }
      scannerStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

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

                {/* BARCODE TOOLS */}

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="food-check-barcode-card rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="shrink-0 text-2xl">▥</div>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-bold text-blue-950">Scan barcode</h2>
                        <p className="mt-1 break-words text-sm leading-5 text-slate-600">
                          Use your camera to scan a product barcode.
                        </p>
                        <button
                          type="button"
                          onClick={() => void startScanner()}
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
                          Enter the barcode from a product package.
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

            <section className="food-check-results-card mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

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

      {!signedIn && (
        <div className="fixed inset-x-0 bottom-0 top-[64px] z-[40] flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-[1px] md:top-[88px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="food-check-login-title"
            className="w-full max-w-[480px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl"
          >
            <div className="px-7 py-8 text-center sm:px-9 sm:py-9">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl">
                🔒
              </div>

              <h2
                id="food-check-login-title"
                className="mt-5 text-2xl font-extrabold tracking-tight text-[#12396b] sm:text-3xl"
              >
                Log in to use Food Check
              </h2>

              <p className="mx-auto mt-3 max-w-md text-base leading-7 text-slate-600">
                Log in to your RenalPlan account to search foods, scan barcodes and view detailed nutritional information.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href="/auth/login"
                  className="rounded-xl bg-[#174a86] px-5 py-3.5 font-bold text-white transition hover:bg-[#123d70]"
                >
                  Log in
                </a>

                <a
                  href="/signup"
                  className="rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white transition hover:bg-orange-600"
                >
                  Create account
                </a>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Your Food Check access is available with your RenalPlan account.
              </p>
            </div>
          </div>
        </div>
      )}
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