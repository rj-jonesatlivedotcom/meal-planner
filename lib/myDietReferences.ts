import type { CkdStage, MonitoredNutrient, Requirements } from "./myDiet";

// Moved unchanged from My Diet's existing stagePresets. No new clinical figures.
export const stagePresets = {
  stage3: { saltG: 5, proteinMinGPerKg: null, proteinMaxGPerKg: null, potassiumLimitMmol: null, phosphateLimitMg: null },
  stage4: { saltG: 5, proteinMinGPerKg: null, proteinMaxGPerKg: null, potassiumLimitMmol: 70, phosphateLimitMg: 1000 },
  stage5: { saltG: 5, proteinMinGPerKg: null, proteinMaxGPerKg: null, potassiumLimitMmol: 70, phosphateLimitMg: 1000 },
  dialysis: { saltG: 5, proteinMinGPerKg: null, proteinMaxGPerKg: null, potassiumLimitMmol: 70, phosphateLimitMg: 1000 },
} as const satisfies Record<Exclude<CkdStage, "custom">, unknown>;

export const kidneyStages = [
  { value: "stage3", label: "CKD Stage 3" },
  { value: "stage4", label: "CKD Stage 4" },
  { value: "stage5", label: "CKD Stage 5" },
  { value: "dialysis", label: "Dialysis" },
  { value: "nonrenal", label: "No kidney condition / other health goals" },
  { value: "unsure", label: "I'm not sure" },
] as const;
export type KidneyStageChoice = typeof kidneyStages[number]["value"];

export function kidneyStageChoice(requirements: Requirements): KidneyStageChoice {
  return requirements.ckdStage === "custom" ? requirements.nutrientTargetSettings?.kidneyCategory ?? "unsure" : requirements.ckdStage;
}

export function withKidneyStage(requirements: Requirements, choice: KidneyStageChoice): Requirements {
  // Stage changes only select applicable references. Accepting one is a separate, explicit action.
  return { ...requirements, ckdStage: choice === "nonrenal" || choice === "unsure" ? "custom" : choice,
    nutrientTargetSettings: { ...requirements.nutrientTargetSettings,
      kidneyCategory: choice === "nonrenal" || choice === "unsure" ? choice : undefined } };
}

export function nutrientReference(requirements: Requirements, nutrient: MonitoredNutrient): { values: Partial<Requirements>; label: string } | null {
  if (requirements.ckdStage === "custom") return null;
  const preset = stagePresets[requirements.ckdStage];
  if (nutrient === "sodium") return { values: { sodiumLimit: Math.round(preset.saltG * 400) }, label: `Salt maximum: ${preset.saltG} g/day` };
  if (nutrient === "potassium" && preset.potassiumLimitMmol !== null) {
    const mg = Math.round(preset.potassiumLimitMmol * 39.1);
    return { values: { potassiumLimitMg: mg }, label: `Potassium maximum: ${mg.toLocaleString("en-GB")} mg/day (${preset.potassiumLimitMmol} mmol/day)` };
  }
  if (nutrient === "phosphate" && preset.phosphateLimitMg !== null)
    return { values: { phosphateLimitMg: preset.phosphateLimitMg }, label: `Phosphorus maximum: ${preset.phosphateLimitMg.toLocaleString("en-GB")} mg/day` };
  return null;
}

export function acceptNutrientReference(requirements: Requirements, nutrient: MonitoredNutrient): Requirements {
  const reference = nutrientReference(requirements, nutrient);
  if (!reference) return requirements;
  return { ...requirements, ...reference.values, nutrientTargetSettings: { ...requirements.nutrientTargetSettings,
    sources: { ...requirements.nutrientTargetSettings?.sources, [nutrient]: "reference" } } };
}
