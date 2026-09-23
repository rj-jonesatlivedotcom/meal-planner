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

  function updateRequirement<K extends keyof Requirements>(
    key: K,
    value: Requirements[K]
  ) {
    const nextRequirements = {
      ...requirements,
      [key]: value,
    } as Requirements;

    setRequirements(nextRequirements);

    if (isLoggedIn) {
      void saveRequirements(nextRequirements);
      return;
    }

    syncRequirementsToLocalStorage(nextRequirements);
  }

  async function saveRequirements(nextRequirements: Requirements) {
    setSaveStatus("saving");

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        syncRequirementsToLocalStorage(nextRequirements);
        setSaveStatus("saved");
        return;
      }

      const { error } = await supabase.from("user_requirements").upsert(
        {
          user_id: user.id,
          sodium_limit: nextRequirements.sodiumLimit,
          potassium: nextRequirements.potassium,
          phosphate: nextRequirements.phosphate,
          purines: nextRequirements.purines,
          carbohydrate_min: nextRequirements.carbohydrateMin,
          carbohydrate_max: nextRequirements.carbohydrateMax,
        },
        { onConflict: "user_id" }
      );

      if (error) {
        throw error;
      }

      syncRequirementsToLocalStorage(nextRequirements);
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }

  return (
    <>
      <main className="min-h-screen bg-white px-4 py-3 sm:px-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl md:max-w-[1400px]">
          <section className="max-w-[1400px] rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
            <div className="border-b border-slate-200/80 pb-5">
              <p className="text-lg font-extrabold leading-7 text-slate-900 sm:text-xl">
                Set your dietary requirements and we will use them to select
                suitable recipes.
              </p>

              <div className="mt-4">
                {saveStatus === "saving" && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-[#0B3B75]">
                    Saving…
                  </span>
                )}

                {saveStatus === "saved" && (
                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
                    ✓ Your preferences are saved
                  </span>
                )}

                {saveStatus === "error" && (
                  <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600">
                    Unable to save your requirements. Please try again.
                  </span>
                )}

                {saveStatus === "idle" && (
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                    Your preferences
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-4">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Your renal requirements
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Choose the limits RenalPlan should use when selecting suitable
                  recipes for you.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4 transition-shadow hover:shadow-sm sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <label
                        htmlFor="salt-limit"
                        className="block text-base font-extrabold text-slate-900"
                      >
                        Daily salt limit
                      </label>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Choose the daily limit you want the planner to work
                        with.
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-[#0B3B75]">
                      Salt
                    </span>
                  </div>

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
                    className="mt-4 min-h-11 w-full rounded-xl border border-blue-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-[#0B3B75] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Any">Any</option>
                    <option value={1200}>3 g per day</option>
                    <option value={1600}>4 g per day</option>
                    <option value={2000}>5 g per day</option>
                    <option value={2400}>6 g per day</option>
                  </select>
                </div>

                <div className="rounded-2xl border border-green-100 bg-green-50/40 p-4 transition-shadow hover:shadow-sm sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <label
                        htmlFor="potassium"
                        className="block text-base font-extrabold text-slate-900"
                      >
                        Potassium
                      </label>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Set the highest recipe level you want shown.
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                      Renal
                    </span>
                  </div>

                  <select
                    id="potassium"
                    value={requirements.potassium}
                    onChange={(event) =>
                      updateRequirement(
                        "potassium",
                        event.target.value as RequirementLevel
                      )
                    }
                    className="mt-4 min-h-11 w-full rounded-xl border border-green-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  >
                    <option>Any</option>
                    <option value="Low">Low — under 400 mg per meal</option>
                    <option value="Moderate">
                      Moderate — 400–650 mg per meal
                    </option>
                  </select>
                </div>

                <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-4 transition-shadow hover:shadow-sm sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <label
                        htmlFor="phosphate"
                        className="block text-base font-extrabold text-slate-900"
                      >
                        Phosphate
                      </label>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Set the highest recipe level you want shown.
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-700">
                      Renal
                    </span>
                  </div>

                  <select
                    id="phosphate"
                    value={requirements.phosphate}
                    onChange={(event) =>
                      updateRequirement(
                        "phosphate",
                        event.target.value as RequirementLevel
                      )
                    }
                    className="mt-4 min-h-11 w-full rounded-xl border border-purple-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  >
                    <option>Any</option>
                    <option>Low</option>
                    <option>Moderate</option>
                  </select>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-4 transition-shadow hover:shadow-sm sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <label
                        htmlFor="purines"
                        className="block text-base font-extrabold text-slate-900"
                      >
                        Purines
                      </label>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Set the highest recipe level you want shown.
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700">
                      Dietary
                    </span>
                  </div>

                  <select
                    id="purines"
                    value={requirements.purines}
                    onChange={(event) =>
                      updateRequirement(
                        "purines",
                        event.target.value as RequirementLevel
                      )
                    }
                    className="mt-4 min-h-11 w-full rounded-xl border border-orange-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  >
                    <option>Any</option>
                    <option>Low</option>
                    <option>Moderate</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-4">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Carbohydrate target
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Set the range RenalPlan should use when selecting recipes.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-4 sm:p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="carbohydrate-min"
                      className="block text-sm font-bold text-slate-900"
                    >
                      Minimum
                    </label>

                    <div className="mt-2 flex items-center gap-2">
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
                        className="min-h-11 w-full rounded-xl border border-blue-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-[#0B3B75] focus:ring-2 focus:ring-blue-100"
                      />

                      <span className="text-sm font-bold text-slate-600">
                        g
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="carbohydrate-max"
                      className="block text-sm font-bold text-slate-900"
                    >
                      Maximum
                    </label>

                    <div className="mt-2 flex items-center gap-2">
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
                        className="min-h-11 w-full rounded-xl border border-blue-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-[#0B3B75] focus:ring-2 focus:ring-blue-100"
                      />

                      <span className="text-sm font-bold text-slate-600">
                        g
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-blue-100 bg-white/70 px-4 py-3">
                  <p className="text-xs leading-5 text-slate-500">
                    Your carbohydrate target should reflect the guidance you
                    have received from your healthcare or dietetic team.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                ✓
              </div>

              <p className="text-xs leading-5 text-slate-600">
                These settings help RenalPlan select recipes based on the
                nutrition information stored for each meal. They are a
                planning aid and do not replace advice from your renal
                dietitian or healthcare team.
              </p>
            </div>
          </section>
        </div>
      </main>

      {!isLoggedIn && (
        <div className="fixed inset-0 z-[40] flex items-center justify-center bg-white/10 px-4 backdrop-blur-[2px]">
          <section className="relative w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-transparent shadow-sm md:max-w-[1400px]">
            <div
              className="pointer-events-none select-none blur-[2px] opacity-55"
              aria-hidden="true"
            >
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
                  Log in to view My Diet
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Log in to your RenalPlan account to set your dietary
                  requirements and get personalised recipes and nutrition
                  information.
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

                <p className="mt-4 text-xs text-slate-500">
                  Your personalised settings are saved to your account.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}