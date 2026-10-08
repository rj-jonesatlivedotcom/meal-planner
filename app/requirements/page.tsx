"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type RequirementLevel = "Any" | "Low" | "Moderate";
type CkdStage = "stage3" | "stage4" | "stage5" | "dialysis" | "custom";

type Requirements = {
  ckdStage: CkdStage;
  sodiumLimit: number | null;
  proteinMinG: number | null;
  proteinMaxG: number | null;
  potassiumLimitMg: number | null;
  phosphateLimitMg: number | null;
  potassium: RequirementLevel;
  phosphate: RequirementLevel;
  purines: RequirementLevel;
  carbohydrateMin: number | null;
  carbohydrateMax: number | null;
  fluidLimitMl: number | null;
};

const REQUIREMENTS_STORAGE_KEY = "meal-planner-requirements";

const defaultRequirements: Requirements = {
  ckdStage: "custom",
  sodiumLimit: null,
  proteinMinG: null,
  proteinMaxG: null,
  potassiumLimitMg: null,
  phosphateLimitMg: null,
  potassium: "Any",
  phosphate: "Any",
  purines: "Any",
  carbohydrateMin: null,
  carbohydrateMax: null,
  fluidLimitMl: null,
};

type StagePreset = {
  saltG: number;
  proteinMinGPerKg: number | null;
  proteinMaxGPerKg: number | null;
  potassiumLimitMmol: number | null;
  phosphateLimitMg: number | null;
  proteinNote: string;
};

const stagePresets: Record<Exclude<CkdStage, "custom">, StagePreset> = {
  stage3: {
    saltG: 5,
    proteinMinGPerKg: null,
    proteinMaxGPerKg: null,
    potassiumLimitMmol: null,
    phosphateLimitMg: null,
    proteinNote: "Enter the daily protein amount or range provided by your renal team. Stage guidance can vary with individual circumstances.",
  },
  stage4: {
    saltG: 5,
    proteinMinGPerKg: null,
    proteinMaxGPerKg: null,
    potassiumLimitMmol: 70,
    phosphateLimitMg: 1000,
    proteinNote: "Enter the daily protein amount or range provided by your renal team. Stage guidance can vary with individual circumstances.",
  },
  stage5: {
    saltG: 5,
    proteinMinGPerKg: null,
    proteinMaxGPerKg: null,
    potassiumLimitMmol: 70,
    phosphateLimitMg: 1000,
    proteinNote: "Enter the daily protein amount or range provided by your renal team. Stage guidance can vary with individual circumstances.",
  },
  dialysis: {
    saltG: 5,
    proteinMinGPerKg: null,
    proteinMaxGPerKg: null,
    potassiumLimitMmol: 70,
    phosphateLimitMg: 1000,
    proteinNote: "Enter the daily protein amount or range provided by your renal team. Stage guidance can vary with individual circumstances.",
  },
};

const MG_PER_MMOL_POTASSIUM = 39.1;
const MG_PER_MMOL_PHOSPHORUS = 31.0;

function mmolToPotassiumMg(mmol: number | null) {
  return mmol === null ? null : Math.round(mmol * MG_PER_MMOL_POTASSIUM);
}

function phosphorusMgToMmol(mg: number | null) {
  return mg === null ? null : Number((mg / MG_PER_MMOL_PHOSPHORUS).toFixed(1));
}



function syncRequirementsToLocalStorage(requirements: Requirements) {
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
    "idle" | "saving" | "saved"
  >("idle");

  const [openAdvice, setOpenAdvice] = useState<string | null>(null);

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
            const savedRequirements = JSON.parse(saved) as Partial<Requirements>;
            setRequirements({
              ...defaultRequirements,
              ...savedRequirements,
            });
          }
        } catch {
          // Keep the default requirements.
        }

        return;
      }

      const { data, error } = await supabase
        .from("user_requirements")
        .select(
          "sodium_limit, potassium, phosphate, purines, carbohydrate_min, carbohydrate_max, fluid_limit_ml, ckd_stage, protein_min_g, protein_max_g, potassium_limit_mg, phosphate_limit_mg"
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (error || !data) {
        return;
      }

      const loadedRequirements: Requirements = {
        ckdStage:
          (data.ckd_stage as CkdStage | null) ?? "custom",
        sodiumLimit: data.sodium_limit ?? null,
        proteinMinG: data.protein_min_g ?? null,
        proteinMaxG: data.protein_max_g ?? null,
        potassiumLimitMg: data.potassium_limit_mg ?? null,
        phosphateLimitMg: data.phosphate_limit_mg ?? null,
        potassium: data.potassium as RequirementLevel,
        phosphate: data.phosphate as RequirementLevel,
        purines: data.purines as RequirementLevel,
        carbohydrateMin: data.carbohydrate_min ?? null,
        carbohydrateMax: data.carbohydrate_max ?? null,
        fluidLimitMl: data.fluid_limit_ml ?? null,
      };

      setRequirements(loadedRequirements);
      syncRequirementsToLocalStorage(loadedRequirements);
    }

    loadRequirements();
  }, []);

  function trackDietUpdate(key: string) {
    if (typeof window === "undefined") return;

    const gtag = (window as typeof window & {
      gtag?: (...args: any[]) => void;
    }).gtag;

    if (gtag) {
      gtag("event", "diet_updated", {
        changed_requirement: key,
      });
    }
  }

  function stageAdviceLabel() {
    switch (requirements.ckdStage) {
      case "stage3":
        return "CKD Stage 3";
      case "stage4":
        return "CKD Stage 4";
      case "stage5":
        return "CKD Stage 5";
      case "dialysis":
        return "CKD Stage 5 — on dialysis";
      default:
        return "your selected CKD stage";
    }
  }

  function nutrientAdvice(key: string) {
    const stage = stageAdviceLabel();

    switch (key) {
      case "salt":
        return `For ${stage}, keeping salt intake low is important. The starting figure is below 5 g salt per day. Your renal team may give you a different target based on your blood pressure, fluid status and overall health.`;
      case "protein":
        if (requirements.ckdStage === "stage3") {
          return `For ${stage}, BDA guidance describes protein around 0.75–1.0 g/kg ideal body weight per day. RenalPlan leaves the actual daily figure blank so you can enter the amount or range given by your renal team.`;
        }
        if (requirements.ckdStage === "stage4" || requirements.ckdStage === "stage5") {
          return `For ${stage}, protein requirements need to be individualised. UK renal guidance commonly uses around 0.8–1.0 g/kg ideal body weight per day, but your renal team may recommend something different. Enter their daily target.`;
        }
        if (requirements.ckdStage === "dialysis") {
          return `For ${stage}, protein needs are generally higher because dialysis can increase protein losses. UK renal guidance commonly uses around 1.1–1.4 g/kg ideal body weight per day for haemodialysis, but the exact target depends on your dialysis treatment and renal team.`;
        }
        return "Protein needs are individual. Enter the daily amount or range provided by your renal team rather than relying on CKD stage alone.";
      case "potassium":
        if (requirements.ckdStage === "stage3") {
          return `For ${stage}, potassium is usually not restricted unless your blood potassium is raised. BDA advises against unnecessary early potassium restriction because fruit, vegetables and other potassium-containing foods can be part of a healthy diet.`;
        }
        return `For ${stage}, potassium restriction is not automatically required just because of CKD stage. If your blood potassium remains high and your renal team has advised restriction, a commonly used dietary range is 50–70 mmol/day (about 1,955–2,737 mg/day).`;
      case "phosphate":
        if (requirements.ckdStage === "stage3") {
          return `For ${stage}, phosphate is usually not restricted unless your blood phosphate is raised or your renal team has advised you to do so. Avoiding phosphate additives can still be helpful.`;
        }
        return `For ${stage}, phosphate restriction is individualised and may be advised when blood phosphate is raised. Your renal team may also consider your diet and phosphate binders. The starting figure here is only a preset and can be changed or removed.`;
      case "fluid":
        return `Fluid requirements are highly individual and are not determined by CKD stage alone. Your allowance may depend on kidney function, urine output, dialysis and your fluid status. Enter the amount given by your renal team.`;
      case "purines":
        return "Purine restriction is not a CKD-stage requirement. If you have gout or raised uric acid and have been advised to reduce purines, this setting can help. BDA describes dietary purine reduction as an adjunct to medical treatment, not a replacement for it.";
      case "carbohydrate":
        return "There is no single carbohydrate target for everyone. If you have diabetes, the amount and timing of carbohydrate may need to be individualised with your diabetes team, particularly if you use insulin or medicines that can cause low blood glucose. Spreading carbohydrate across the day can help some people manage blood glucose.";
      default:
        return "";
    }
  }

  function toggleAdvice(key: string) {
    setOpenAdvice((current) => (current === key ? null : key));
  }

  function updateRequirement<K extends keyof Requirements>(
    key: K,
    value: Requirements[K]
  ) {
    const nextRequirements = {
      ...requirements,
      [key]: value,
    } as Requirements;

    setRequirements(nextRequirements);
    trackDietUpdate(String(key));

    if (isLoggedIn) {
      void saveRequirements(nextRequirements);
    } else {
      syncRequirementsToLocalStorage(nextRequirements);
    }
  }

  function applyStage(stage: Exclude<CkdStage, "custom">) {
    const preset = stagePresets[stage];

    const nextRequirements: Requirements = {
      ...requirements,
      ckdStage: stage,
      sodiumLimit: Math.round(preset.saltG * 400),
      proteinMinG: preset.proteinMinGPerKg,
      proteinMaxG: preset.proteinMaxGPerKg,
      potassiumLimitMg: mmolToPotassiumMg(preset.potassiumLimitMmol),
      phosphateLimitMg: preset.phosphateLimitMg,
      // These are editable starting presets, not medical prescriptions.
      // Potassium/phosphate restrictions can be changed or removed to match
      // the user's renal-team advice and blood results.
      potassium: preset.potassiumLimitMmol === null ? "Any" : "Low",
      phosphate: preset.phosphateLimitMg === null ? "Any" : "Low",
    };

    setRequirements(nextRequirements);
    trackDietUpdate("ckd_stage");

    if (isLoggedIn) {
      void saveRequirements(nextRequirements);
    } else {
      syncRequirementsToLocalStorage(nextRequirements);
    }
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

      const { error } = await supabase
        .from("user_requirements")
        .upsert(
          {
            user_id: user.id,
            ckd_stage: nextRequirements.ckdStage,
            sodium_limit: nextRequirements.sodiumLimit,
            protein_min_g: nextRequirements.proteinMinG,
            protein_max_g: nextRequirements.proteinMaxG,
            potassium_limit_mg: nextRequirements.potassiumLimitMg,
            phosphate_limit_mg: nextRequirements.phosphateLimitMg,
            potassium: nextRequirements.potassium,
            phosphate: nextRequirements.phosphate,
            purines: nextRequirements.purines,
            carbohydrate_min: nextRequirements.carbohydrateMin,
            carbohydrate_max: nextRequirements.carbohydrateMax,
            fluid_limit_ml: nextRequirements.fluidLimitMl,
          },
          {
            onConflict: "user_id",
          }
        );

      if (error) throw error;

      syncRequirementsToLocalStorage(nextRequirements);
      setSaveStatus("saved");
    } catch {
      // Keep the page usable even if the account save fails.
      setSaveStatus("idle");
    }
  }

  if (!authChecked) return null;

  return (
    <>
      <main className="renal-requirements-page min-h-screen bg-white px-4 py-3 sm:px-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl md:max-w-[1400px]">
          <section className="max-w-[1400px] rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">

            <div className="border-b border-slate-200/80 pb-5">
              <p className="text-lg font-extrabold leading-7 text-slate-900 sm:text-xl">
                Tell RenalPlan about your daily dietary requirements.
              </p>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Choose the CKD stage you have been given and RenalPlan will enter
                suggested daily figures. You can change any figure to the amount
                recommended by your renal team.
              </p>

              {saveStatus === "saving" && (
                <p className="mt-3 text-xs font-semibold text-[#0B3B75]">
                  Saving…
                </p>
              )}

            </div>

            {/* CKD STAGE */}
            <div className="mt-6 rounded-2xl border border-green-100 bg-green-50/40 p-4 sm:p-5">
              <h2 className="text-xl font-extrabold text-slate-900">
                What stage of CKD have you been diagnosed with?
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Selecting a stage fills the daily requirements below with
                suggested starting figures. You can change them at any time.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {([
                  ["stage3", "CKD Stage 3"],
                  ["stage4", "CKD Stage 4"],
                  ["stage5", "CKD Stage 5"],
                  ["dialysis", "CKD Stage 5 — on dialysis"],
                ] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => applyStage(value)}
                    className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-extrabold transition ${
                      requirements.ckdStage === value
                        ? "border-green-500 bg-green-100 text-green-900 ring-2 ring-green-200"
                        : "border-slate-300 bg-white text-slate-800 hover:border-green-400"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => updateRequirement("ckdStage", "custom")}
                className={`mt-3 min-h-11 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                  requirements.ckdStage === "custom"
                    ? "border-[#0B3B75] bg-blue-50 text-[#0B3B75]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                I don't want to use a CKD stage — set my own requirements
              </button>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                These are starting figures only. Your renal team may give you
                different targets based on your blood results, treatment and
                individual needs. You can change any figure below.
              </p>
            </div>

            {/* DAILY REQUIREMENTS */}
            <div className="mt-7">
              <div className="mb-4">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Your daily requirements
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  These are the daily targets RenalPlan will use. The CKD stage
                  fills suggested figures for you, and you can change any of them.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">

                {/* SALT */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4 sm:p-5">
                  <button
                    type="button"
                    onClick={() => toggleAdvice("salt")}
                    className="flex w-full items-center justify-between gap-3 text-left"
                    aria-expanded={openAdvice === "salt"}
                  >
                    <span className="text-base font-extrabold text-slate-900">Salt</span>
                    <span className="shrink-0 text-xs font-bold text-slate-500">
                      {openAdvice === "salt" ? "Hide advice" : "Advice"}
                    </span>
                  </button>
                  {openAdvice === "salt" && (
                    <div className="renal-advice-panel mt-3 rounded-xl border border-slate-200 bg-white/70 px-3 py-3 text-xs leading-5 text-slate-600">
                      {nutrientAdvice("salt")}
                    </div>
                  )}
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Daily maximum.
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={
                        requirements.sodiumLimit === null
                          ? ""
                          : Number((requirements.sodiumLimit / 400).toFixed(2))
                      }
                      onChange={(e) =>
                        updateRequirement(
                          "sodiumLimit",
                          e.target.value === ""
                            ? null
                            : Math.round(Number(e.target.value) * 400)
                        )
                      }
                      placeholder="No restriction"
                      className="min-h-11 w-full rounded-xl border border-blue-200 bg-white px-4 text-sm font-semibold"
                    />
                    <span className="shrink-0 text-sm font-bold text-slate-700">
                      g/day
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    BDA/NKF guidance for people with CKD recommends less than
                    5 g salt per day. The CKD stage presets therefore start at
                    5 g/day; change this if your renal team has given you a
                    different target.
                  </p>
                </div>

                {/* PROTEIN */}
                <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4 sm:p-5">
                  <button
                    type="button"
                    onClick={() => toggleAdvice("protein")}
                    className="flex w-full items-center justify-between gap-3 text-left"
                    aria-expanded={openAdvice === "protein"}
                  >
                    <span className="text-base font-extrabold text-slate-900">Protein</span>
                    <span className="shrink-0 text-xs font-bold text-slate-500">
                      {openAdvice === "protein" ? "Hide advice" : "Advice"}
                    </span>
                  </button>
                  {openAdvice === "protein" && (
                    <div className="renal-advice-panel mt-3 rounded-xl border border-slate-200 bg-white/70 px-3 py-3 text-xs leading-5 text-slate-600">
                      {nutrientAdvice("protein")}
                    </div>
                  )}
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Daily amount or range. Enter the figure provided by your renal team.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700">
                        Minimum
                      </label>
                      <div className="mt-1 flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={requirements.proteinMinG ?? ""}
                          onChange={(e) =>
                            updateRequirement(
                              "proteinMinG",
                              e.target.value === "" ? null : Number(e.target.value)
                            )
                          }
                          placeholder="No minimum"
                          className="min-h-11 w-full rounded-xl border border-rose-200 bg-white px-3 text-sm font-semibold"
                        />
                        <span className="text-xs font-bold text-slate-600">g</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">
                        Maximum
                      </label>
                      <div className="mt-1 flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={requirements.proteinMaxG ?? ""}
                          onChange={(e) =>
                            updateRequirement(
                              "proteinMaxG",
                              e.target.value === "" ? null : Number(e.target.value)
                            )
                          }
                          placeholder="No maximum"
                          className="min-h-11 w-full rounded-xl border border-rose-200 bg-white px-3 text-sm font-semibold"
                        />
                        <span className="text-xs font-bold text-slate-600">g</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    {requirements.ckdStage === "stage3"
                      ? "BDA guidance for CKD 1–3 is 0.75–1.0 g/kg ideal body weight/day, with 1.0 g/kg/day as the aim."
                      : requirements.ckdStage === "stage4" || requirements.ckdStage === "stage5"
                        ? "UK Kidney Association guidance recommends 0.8–1.0 g/kg ideal body weight/day for Stage 4–5 CKD not on dialysis."
                        : requirements.ckdStage === "dialysis"
                          ? "UK Kidney Association guidance is higher on dialysis and differs by dialysis type. These figures are a starting range only."
                          : "Enter the daily protein target supplied by your renal team."}
                  </p>
                </div>

                {/* POTASSIUM */}
                <div className="rounded-2xl border border-green-100 bg-green-50/40 p-4 sm:p-5">
                  <button
                    type="button"
                    onClick={() => toggleAdvice("potassium")}
                    className="flex w-full items-center justify-between gap-3 text-left"
                    aria-expanded={openAdvice === "potassium"}
                  >
                    <span className="text-base font-extrabold text-slate-900">Potassium</span>
                    <span className="shrink-0 text-xs font-bold text-slate-500">
                      {openAdvice === "potassium" ? "Hide advice" : "Advice"}
                    </span>
                  </button>
                  {openAdvice === "potassium" && (
                    <div className="renal-advice-panel mt-3 rounded-xl border border-slate-200 bg-white/70 px-3 py-3 text-xs leading-5 text-slate-600">
                      {nutrientAdvice("potassium")}
                    </div>
                  )}
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Daily maximum, where a potassium restriction has been advised.
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={
                        requirements.potassiumLimitMg === null
                          ? ""
                          : Number(
                              (requirements.potassiumLimitMg / MG_PER_MMOL_POTASSIUM).toFixed(1)
                            )
                      }
                      onChange={(e) =>
                        updateRequirement(
                          "potassiumLimitMg",
                          e.target.value === ""
                            ? null
                            : Math.round(Number(e.target.value) * MG_PER_MMOL_POTASSIUM)
                        )
                      }
                      placeholder="No restriction"
                      className="min-h-11 w-full rounded-xl border border-green-200 bg-white px-4 text-sm font-semibold"
                    />
                    <span className="shrink-0 text-sm font-bold text-slate-700">
                      mmol/day
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    {requirements.potassiumLimitMg === null
                      ? "No restriction set"
                      : `≈ ${(requirements.potassiumLimitMg / MG_PER_MMOL_POTASSIUM).toFixed(1)} mmol/day`}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {requirements.potassiumLimitMg === null
                      ? "No potassium restriction is set for this preset. If your renal team has advised a limit, enter it here."
                      : <>The preset is <span className="font-semibold">70 mmol/day</span> (about <span className="font-semibold">2,737 mg/day</span>). The commonly used restricted range is 50–70 mmol/day. You can change or remove this figure to match your renal team's advice.</>}
                  </p>
                </div>

                {/* PHOSPHATE */}
                <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-4 sm:p-5">
                  <button
                    type="button"
                    onClick={() => toggleAdvice("phosphate")}
                    className="flex w-full items-center justify-between gap-3 text-left"
                    aria-expanded={openAdvice === "phosphate"}
                  >
                    <span className="text-base font-extrabold text-slate-900">Phosphate / phosphorus</span>
                    <span className="shrink-0 text-xs font-bold text-slate-500">
                      {openAdvice === "phosphate" ? "Hide advice" : "Advice"}
                    </span>
                  </button>
                  {openAdvice === "phosphate" && (
                    <div className="renal-advice-panel mt-3 rounded-xl border border-slate-200 bg-white/70 px-3 py-3 text-xs leading-5 text-slate-600">
                      {nutrientAdvice("phosphate")}
                    </div>
                  )}
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Daily maximum, where a phosphate restriction has been advised.
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={
                        requirements.phosphateLimitMg === null
                          ? ""
                          : requirements.phosphateLimitMg
                      }
                      onChange={(e) =>
                        updateRequirement(
                          "phosphateLimitMg",
                          e.target.value === ""
                            ? null
                            : Math.max(0, Math.round(Number(e.target.value)))
                        )
                      }
                      placeholder="No restriction"
                      className="min-h-11 w-full rounded-xl border border-purple-200 bg-white px-4 text-sm font-semibold"
                    />
                    <span className="shrink-0 text-sm font-bold text-slate-700">
                      mg/day
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    {requirements.phosphateLimitMg === null
                      ? "No restriction set"
                      : `≈ ${(requirements.phosphateLimitMg / MG_PER_MMOL_PHOSPHORUS).toFixed(1)} mmol/day`}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Dietary phosphorus/phosphate is entered in mg/day. The equivalent is
                    shown in mmol/day for reference. This is a starting preset only;
                    your renal team may give you a different target or no restriction.
                  </p>
                </div>

                {/* FLUID */}
                <div className="rounded-2xl border border-cyan-100 bg-cyan-50/40 p-4 sm:p-5">
                  <button
                    type="button"
                    onClick={() => toggleAdvice("fluid")}
                    className="flex w-full items-center justify-between gap-3 text-left"
                    aria-expanded={openAdvice === "fluid"}
                  >
                    <span className="text-base font-extrabold text-slate-900">Fluid</span>
                    <span className="shrink-0 text-xs font-bold text-slate-500">
                      {openAdvice === "fluid" ? "Hide advice" : "Advice"}
                    </span>
                  </button>
                  {openAdvice === "fluid" && (
                    <div className="renal-advice-panel mt-3 rounded-xl border border-slate-200 bg-white/70 px-3 py-3 text-xs leading-5 text-slate-600">
                      {nutrientAdvice("fluid")}
                    </div>
                  )}
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Daily maximum.
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="10000"
                      step="50"
                      value={requirements.fluidLimitMl ?? ""}
                      onChange={(e) =>
                        updateRequirement(
                          "fluidLimitMl",
                          e.target.value === ""
                            ? null
                            : Math.max(0, Math.min(10000, Math.round(Number(e.target.value))))
                        )
                      }
                      placeholder="No restriction"
                      className="min-h-11 w-full rounded-xl border border-cyan-200 bg-white px-4 text-sm font-semibold"
                    />
                    <span className="shrink-0 text-sm font-bold text-slate-700">
                      ml/day
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Enter the allowance given by your renal team.
                  </p>
                </div>

                {/* PURINES */}
                <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-4 sm:p-5">
                  <button
                    type="button"
                    onClick={() => toggleAdvice("purines")}
                    className="flex w-full items-center justify-between gap-3 text-left"
                    aria-expanded={openAdvice === "purines"}
                  >
                    <span className="text-base font-extrabold text-slate-900">Purines</span>
                    <span className="shrink-0 text-xs font-bold text-slate-500">
                      {openAdvice === "purines" ? "Hide advice" : "Advice"}
                    </span>
                  </button>
                  {openAdvice === "purines" && (
                    <div className="renal-advice-panel mt-3 rounded-xl border border-slate-200 bg-white/70 px-3 py-3 text-xs leading-5 text-slate-600">
                      {nutrientAdvice("purines")}
                    </div>
                  )}
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    If you have been advised to limit purines, choose the level recommended by your healthcare team.
                  </p>

                  <select
                    value={requirements.purines}
                    onChange={(e) =>
                      updateRequirement(
                        "purines",
                        e.target.value as RequirementLevel
                      )
                    }
                    className="mt-4 min-h-11 w-full rounded-xl border border-orange-200 bg-white px-4 text-sm font-semibold"
                  >
                    <option value="Any">No restriction</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CARBOHYDRATE */}
            <div className="mt-7">
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => toggleAdvice("carbohydrate")}
                  className="flex w-full items-center justify-between gap-3 text-left"
                  aria-expanded={openAdvice === "carbohydrate"}
                >
                  <span className="text-xl font-extrabold text-slate-900">Daily carbohydrate</span>
                  <span className="shrink-0 text-xs font-bold text-slate-500">
                    {openAdvice === "carbohydrate" ? "Hide advice" : "Advice"}
                  </span>
                </button>
                {openAdvice === "carbohydrate" && (
                  <div className="renal-advice-panel mt-3 rounded-xl border border-slate-200 bg-white/70 px-3 py-3 text-xs leading-5 text-slate-600">
                    {nutrientAdvice("carbohydrate")}
                  </div>
                )}
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  These are daily totals, not per-meal limits.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-4 sm:p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-bold text-slate-900">
                      Minimum per day
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={requirements.carbohydrateMin ?? ""}
                        onChange={(e) =>
                          updateRequirement(
                            "carbohydrateMin",
                            e.target.value === "" ? null : Number(e.target.value)
                          )
                        }
                        placeholder="No minimum"
                        className="min-h-11 w-full rounded-xl border border-blue-200 bg-white px-4 text-sm font-semibold"
                      />
                      <span className="text-sm font-bold text-slate-600">g</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900">
                      Maximum per day
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={requirements.carbohydrateMax ?? ""}
                        onChange={(e) =>
                          updateRequirement(
                            "carbohydrateMax",
                            e.target.value === "" ? null : Number(e.target.value)
                          )
                        }
                        placeholder="No maximum"
                        className="min-h-11 w-full rounded-xl border border-blue-200 bg-white px-4 text-sm font-semibold"
                      />
                      <span className="text-sm font-bold text-slate-600">g</span>
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

            {/* DISCLAIMER */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                ✓
              </div>

              <p className="text-xs leading-5 text-slate-600">
                Your dietary requirements are individual to you. Requirements
                for salt, potassium, phosphate, protein, fluid and other
                nutrients can vary depending on your kidney function, blood
                results, treatment and other health conditions. Please speak to
                your renal dietitian or consultant for advice on the
                requirements that are right for you. RenalPlan is a planning
                aid and does not replace advice from your renal healthcare team.
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

            <div className="renal-login-modal-backdrop absolute inset-0 flex items-center justify-center bg-white/20 p-4">

              <div className="renal-login-modal-card w-full max-w-md rounded-3xl bg-white/95 p-7 text-center shadow-2xl ring-1 ring-slate-200">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                  🔒
                </div>

                <h1 className="renal-login-modal-title mt-4 text-2xl font-extrabold text-slate-900">
                  Log in to view My Diet
                </h1>

                <p className="renal-login-modal-description mt-3 text-sm leading-6 text-slate-600">
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

                <p className="renal-login-modal-footnote mt-4 text-xs text-slate-500">
                  Your personalised settings are saved to your account.
                </p>

              </div>

            </div>
          </section>
        </div>
      )}
      <style jsx global>{`
        html[data-theme="dark"] .renal-requirements-page {
          background: #0b1722 !important;
          color: #f1f5f9;
        }

        html[data-theme="dark"] .renal-requirements-page > div > section {
          background: #142330 !important;
          border-color: #33475a !important;
        }

        html[data-theme="dark"] .renal-requirements-page h2,
        html[data-theme="dark"] .renal-requirements-page h3,
        html[data-theme="dark"] .renal-requirements-page label,
        html[data-theme="dark"] .renal-requirements-page .text-slate-900,
        html[data-theme="dark"] .renal-requirements-page .text-slate-800,
        html[data-theme="dark"] .renal-requirements-page .text-slate-700 {
          color: #f1f5f9 !important;
        }

        html[data-theme="dark"] .renal-requirements-page .text-slate-600 {
          color: #cbd5e1 !important;
        }

        html[data-theme="dark"] .renal-requirements-page .text-slate-500 {
          color: #94a3b8 !important;
        }

        html[data-theme="dark"] .renal-requirements-page .border-slate-200,
        html[data-theme="dark"] .renal-requirements-page .border-slate-200\/80 {
          border-color: #33475a !important;
        }

        html[data-theme="dark"] .renal-requirements-page .renal-advice-panel {
          background: #0f1d29 !important;
          border-color: #40576a !important;
          color: #cbd5e1 !important;
        }

        html[data-theme="dark"] .renal-requirements-page .bg-white,
        html[data-theme="dark"] .renal-requirements-page .bg-white\/80,
        html[data-theme="dark"] .renal-requirements-page .bg-white\/70,
        html[data-theme="dark"] .renal-requirements-page .bg-white\/60 {
          background: #1a2b39 !important;
        }

        html[data-theme="dark"] .renal-requirements-page select,
        html[data-theme="dark"] .renal-requirements-page input {
          background: #0f1d29 !important;
          color: #f8fafc !important;
          border-color: #41576a !important;
          color-scheme: dark;
        }

        html[data-theme="dark"] .renal-requirements-page select option {
          background: #0f1d29;
          color: #f8fafc;
        }

        html[data-theme="dark"] .renal-requirements-page .bg-blue-50\/40,
        html[data-theme="dark"] .renal-requirements-page .bg-blue-50\/30,
        html[data-theme="dark"] .renal-requirements-page .bg-green-50\/40,
        html[data-theme="dark"] .renal-requirements-page .bg-green-50\/30,
        html[data-theme="dark"] .renal-requirements-page .bg-rose-50\/40,
        html[data-theme="dark"] .renal-requirements-page .bg-purple-50\/40,
        html[data-theme="dark"] .renal-requirements-page .bg-cyan-50\/40,
        html[data-theme="dark"] .renal-requirements-page .bg-orange-50\/40,
        html[data-theme="dark"] .renal-requirements-page .bg-slate-50 {
          background: #192c3a !important;
        }

        html[data-theme="dark"] .renal-requirements-page .border-blue-100,
        html[data-theme="dark"] .renal-requirements-page .border-blue-200,
        html[data-theme="dark"] .renal-requirements-page .border-green-100,
        html[data-theme="dark"] .renal-requirements-page .border-green-200,
        html[data-theme="dark"] .renal-requirements-page .border-rose-100,
        html[data-theme="dark"] .renal-requirements-page .border-rose-200,
        html[data-theme="dark"] .renal-requirements-page .border-purple-100,
        html[data-theme="dark"] .renal-requirements-page .border-purple-200,
        html[data-theme="dark"] .renal-requirements-page .border-cyan-100,
        html[data-theme="dark"] .renal-requirements-page .border-cyan-200,
        html[data-theme="dark"] .renal-requirements-page .border-orange-100,
        html[data-theme="dark"] .renal-requirements-page .border-orange-200 {
          border-color: #40576a !important;
        }

        html[data-theme="dark"] .renal-requirements-page .text-green-700,
        html[data-theme="dark"] .renal-requirements-page .text-green-900,
        html[data-theme="dark"] .renal-requirements-page .text-blue-900 {
          color: #a7f3d0 !important;
        }

        html[data-theme="dark"] .renal-requirements-page button.border-green-500.bg-green-100 {
          background: #123b31 !important;
          border-color: #6ee7b7 !important;
          color: #d1fae5 !important;
          box-shadow: 0 0 0 2px rgba(110, 231, 183, 0.2) !important;
        }

        html[data-theme="dark"] .renal-requirements-page button.border-green-500.bg-green-100:hover {
          background: #16483b !important;
        }

        html[data-theme="dark"] .renal-requirements-page button.bg-white {
          background: #172a38 !important;
          color: #f1f5f9 !important;
          border-color: #41576a !important;
        }

        html[data-theme="dark"] .renal-requirements-page .bg-blue-50,
        html[data-theme="dark"] .renal-requirements-page .bg-green-100,
        html[data-theme="dark"] .renal-requirements-page .bg-blue-50 {
          background: #173447 !important;
        }

        html[data-theme="dark"] .renal-login-modal-backdrop {
          background: rgba(5, 15, 25, 0.42) !important;
        }

        html[data-theme="dark"] .renal-login-modal-card {
          background: #172635 !important;
          border-color: #33475a !important;
          color: #f8fafc !important;
        }

        html[data-theme="dark"] .renal-login-modal-title {
          color: #f8fafc !important;
        }

        html[data-theme="dark"] .renal-login-modal-description {
          color: #cbd5e1 !important;
        }

        html[data-theme="dark"] .renal-login-modal-footnote {
          color: #94a3b8 !important;
        }
      `}</style>
    </>
  );
}