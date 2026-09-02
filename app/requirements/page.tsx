"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type RequirementLevel = "Any" | "Low" | "Moderate";

type Requirements = {
  sodiumLimit: number | null;
  potassium: RequirementLevel;
  phosphate: RequirementLevel;
  purines: RequirementLevel;
  carbohydrateMin: number | null;
  carbohydrateMax: number | null;
};

const REQUIREMENTS_STORAGE_KEY = "meal-planner-requirements";

const defaultRequirements: Requirements = {
  sodiumLimit: 1500,
  potassium: "Any",
  phosphate: "Any",
  purines: "Any",
  carbohydrateMin: null,
  carbohydrateMax: null,
};

function syncRequirementsToLocalStorage(
  requirements: Requirements
) {
  try {
    window.localStorage.setItem(
      REQUIREMENTS_STORAGE_KEY,
      JSON.stringify(requirements)
    );

    window.dispatchEvent(
      new Event("meal-planner-requirements-updated")
    );
  } catch {
    // Ignore local storage errors.
  }
}

export default function RequirementsPage() {
  const [requirements, setRequirements] =
    useState<Requirements>(defaultRequirements);

  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  useEffect(() => {
    async function loadRequirements() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
  try {
    const saved = window.localStorage.getItem(
      REQUIREMENTS_STORAGE_KEY
    );

    if (saved) {
      const savedRequirements: Requirements = JSON.parse(saved);
      setRequirements(savedRequirements);
    }
  } catch {
    // Keep the default requirements if local storage is unavailable or invalid.
  }

  return;
}

      const { data, error } = await supabase
        .from("user_requirements")
        .select(
          "sodium_limit, potassium, phosphate, purines, carbohydrate_min, carbohydrate_max"
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (error || !data) {
        return;
      }

      const loadedRequirements: Requirements = {
        sodiumLimit: data.sodium_limit,
        potassium: data.potassium as RequirementLevel,
        phosphate: data.phosphate as RequirementLevel,
        purines: data.purines as RequirementLevel,
        carbohydrateMin: data.carbohydrate_min,
        carbohydrateMax: data.carbohydrate_max,
      };

      setRequirements(loadedRequirements);

      // Keep the existing Recipes and Weekly Planner
      // requirement system in sync with Supabase.
      syncRequirementsToLocalStorage(
        loadedRequirements
      );
    }

    loadRequirements();
  }, []);

  async function saveRequirements(
    nextRequirements: Requirements
  ) {
    setSaveStatus("saving");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
  syncRequirementsToLocalStorage(nextRequirements);
  setSaveStatus("saved");
  return;
}

    const { error } = await supabase
      .from("user_requirements")
      .upsert(
        {
          user_id: user.id,
          sodium_limit: nextRequirements.sodiumLimit,
          potassium: nextRequirements.potassium,
          phosphate: nextRequirements.phosphate,
          purines: nextRequirements.purines,
          carbohydrate_min: nextRequirements.carbohydrateMin,
          carbohydrate_max: nextRequirements.carbohydrateMax,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      setSaveStatus("error");
      return;
    }

    // Keep Supabase and the existing local requirement
    // system in sync so Recipes and Weekly Planner
    // immediately use the newly saved requirements.
    syncRequirementsToLocalStorage(
      nextRequirements
    );

    setSaveStatus("saved");
  }

  function updateRequirement<K extends keyof Requirements>(
    key: K,
    value: Requirements[K]
  ) {
    const nextRequirements: Requirements = {
      ...requirements,
      [key]: value,
    };

    setRequirements(nextRequirements);

    // Update the local requirement state immediately so
    // Recipes and Weekly Planner respond without waiting
    // for the database request to finish.
    syncRequirementsToLocalStorage(
      nextRequirements
    );

    void saveRequirements(nextRequirements);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-3 sm:px-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl md:max-w-[1400px]">
        <section className="max-w-[1400px] rounded-3xl border border-purple-100/60 bg-purple-50/25 p-3 shadow-sm sm:p-4">
          <div>
            <p className="text-lg font-extrabold text-slate-900 sm:text-xl">
              Tell Meal Planner what matters to you
            </p>
            <p className="mt-0.5 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Set your dietary requirements and we'll use them when selecting
              suitable recipes.
            </p>
          </div>

          <div className="mt-5 min-h-5">
            {saveStatus === "saving" && (
              <span className="text-sm font-semibold text-slate-500">
                Saving…
              </span>
            )}

            {saveStatus === "saved" && (
              <span className="text-sm font-semibold text-green-700">
                ✓ Saved
              </span>
            )}

            {saveStatus === "error" && (
              <span className="text-sm font-semibold text-red-600">
                Unable to save your requirements. Please try again.
              </span>
            )}
          </div>

          <div className="mt-2.5 grid gap-2.5 md:grid-cols-2">
            <div className="rounded-2xl border border-purple-100/50 bg-purple-50/30 p-3 sm:p-3.5">
              <label
                htmlFor="sodium-limit"
                className="block text-base font-extrabold text-slate-900"
              >
                Daily sodium limit
              </label>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                Choose the daily limit you want the planner to work with.
              </p>

              <select
                id="sodium-limit"
                value={
                  requirements.sodiumLimit === null
                    ? "Any"
                    : requirements.sodiumLimit
                }
                onChange={(event) =>
                  updateRequirement(
                    "sodiumLimit",
                    event.target.value === "Any"
                      ? null
                      : Number(event.target.value)
                  )
                }
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option value="Any">Any</option>
                <option value={1500}>1,500 mg per day</option>
                <option value={1800}>1,800 mg per day</option>
                <option value={2000}>2,000 mg per day</option>
                <option value={2300}>2,300 mg per day</option>
              </select>
            </div>

            <div className="rounded-2xl border border-purple-100/50 bg-purple-50/30 p-3 sm:p-3.5">
              <label
                htmlFor="potassium"
                className="block text-base font-extrabold text-slate-900"
              >
                Potassium
              </label>

              <p className="mt-1 text-xs leading-5 text-slate-600">
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
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>Any</option>
                <option>Low</option>
                <option>Moderate</option>
              </select>
            </div>

            <div className="rounded-2xl border border-purple-100/50 bg-purple-50/30 p-3 sm:p-3.5">
              <label
                htmlFor="phosphate"
                className="block text-base font-extrabold text-slate-900"
              >
                Phosphate
              </label>

              <p className="mt-1 text-xs leading-5 text-slate-600">
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
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>Any</option>
                <option>Low</option>
                <option>Moderate</option>
              </select>
            </div>

            <div className="rounded-2xl border border-purple-100/50 bg-purple-50/30 p-3 sm:p-3.5">
              <label
                htmlFor="purines"
                className="block text-base font-extrabold text-slate-900"
              >
                Purines
              </label>

              <p className="mt-1 text-xs leading-5 text-slate-600">
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
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>Any</option>
                <option>Low</option>
                <option>Moderate</option>
              </select>
            </div>

            <div className="rounded-2xl border border-purple-100/50 bg-purple-50/30 p-3 sm:p-3.5 md:col-span-2">
              <div className="border-b border-purple-200/60 pb-3">
                <label className="block text-base font-extrabold text-slate-900">
                  Carbohydrate per meal
                </label>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Set the carbohydrate range you want Meal Planner to use
                  when selecting recipes.
                </p>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="carbohydrate-min"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    Minimum
                  </label>

                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id="carbohydrate-min"
                      type="number"
                      min="0"
                      step="1"
                      value={
                        requirements.carbohydrateMin === null
                          ? ""
                          : requirements.carbohydrateMin
                      }
                      onChange={(event) =>
                        updateRequirement(
                          "carbohydrateMin",
                          event.target.value === ""
                            ? null
                            : Number(event.target.value)
                        )
                      }
                      placeholder="No minimum"
                      className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                    <span className="text-sm font-semibold text-slate-600">
                      g
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="carbohydrate-max"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    Maximum
                  </label>

                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id="carbohydrate-max"
                      type="number"
                      min="0"
                      step="1"
                      value={
                        requirements.carbohydrateMax === null
                          ? ""
                          : requirements.carbohydrateMax
                      }
                      onChange={(event) =>
                        updateRequirement(
                          "carbohydrateMax",
                          event.target.value === ""
                            ? null
                            : Number(event.target.value)
                        )
                      }
                      placeholder="No maximum"
                      className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                    <span className="text-sm font-semibold text-slate-600">
                      g
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Your carbohydrate target should reflect the guidance you
                have received from your healthcare or dietetic team.
              </p>
            </div>
          </div>

          <p className="mt-5 rounded-2xl bg-slate-100 p-3 text-xs leading-5 text-slate-500">
            These settings help Meal Planner select recipes based on the
            nutrition information stored for each meal. They are a planning
            aid and do not replace advice from your renal dietitian or
            healthcare team.
          </p>
        </section>
      </div>
    </main>
  );
}