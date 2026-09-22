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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    async function loadRequirements() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(Boolean(user));
      setAuthChecked(true);

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
    if (!isLoggedIn) {
      return;
    }

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

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-white px-4 py-3 sm:px-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl md:max-w-[1400px]">
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-sm font-semibold text-slate-500">
              Loading…
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-white px-4 py-3 sm:px-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl md:max-w-[1400px]">
          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="pointer-events-none select-none blur-[2px] opacity-55" aria-hidden="true">
              <div className="p-4 sm:p-6">
                <div className="h-8 w-56 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-100" />
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="h-56 rounded-2xl bg-purple-50" />
                  <div className="h-56 rounded-2xl bg-purple-50" />
                  <div className="h-56 rounded-2xl bg-purple-50" />
                  <div className="h-56 rounded-2xl bg-purple-50" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-white/20 p-4">
              <div className="w-full max-w-md rounded-3xl bg-white/95 p-7 text-center shadow-2xl ring-1 ring-slate-200">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                  🔒
                </div>

                <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
                  My Diet is a Premium feature
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Log in to your RenalPlan account to set your dietary requirements
                  and get personalised recipes and nutrition information.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href="/login"
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

                <p className="mt-4 text-xs text-slate-500">
                  Your personalised settings are saved to your account.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-3 sm:px-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl md:max-w-[1400px]">
        <section className="max-w-[1400px] rounded-3xl border border-purple-100/60 bg-purple-50/25 p-3 shadow-sm sm:p-4">
          <div>
           
            <p className="text-0.8g font-extrabold text-slate-900 sm:text-xl">
              Set your dietary requirements and we will use them to select
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
                htmlFor="salt-limit"
                className="block text-base font-extrabold text-slate-900"
              >
                Daily salt limit
              </label>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                Choose the daily limit you want the planner to work with.
              </p>

              <select
                id="salt-limit"
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
                <option value={1200}>3 g per day</option>
                <option value={1600}>4 g per day</option>
                <option value={2000}>5 g per day</option>
                <option value={2400}>6 g per day</option>
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
                <option value="Low">Low — under 400 mg per meal</option>
                <option value="Moderate">Moderate — 400–650 mg per meal</option>
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
                  Set the carbohydrate range you want RenalPlan to use
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
            These settings help RenalPlan select recipes based on the
            nutrition information stored for each meal. They are a planning
            aid and do not replace advice from your renal dietitian or
            healthcare team.
          </p>
        </section>
      </div>
    </main>
  );
}




