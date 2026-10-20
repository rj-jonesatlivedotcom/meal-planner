export const USDA_DATASETS = ["Branded", "Foundation", "Survey (FNDDS)", "SR Legacy"] as const;
export type UsdaFood = {
  fdcId: number;
  description: string;
  dataset: string;
  unit: "g" | "ml" | "unknown";
  preparation: "dry" | "prepared" | "unspecified";
  completeProductUnclear: boolean;
  componentDescriptions?: string[];
  potassiumMg: number | null;
  phosphorusMg: number | null;
  macros?: { energyKcal: number | null; protein: number | null; fat: number | null; carbohydrate: number | null };
  ingredients: string | null;
  brand: string | null;
  barcode: string | null;
  marketCountry: string | null;
  dataSource: string | null;
  serving: { amount: number | null; unit: string | null; description: string | null };
  portions: { grams: number | null; description: string }[];
  volumeBasis?: { grams: number; millilitres: number; evidence: string };
  provenance: { nutrient: string; derivation: string | null; source: string | null; zeroMayBeRounded: boolean }[];
  publicationDate: string | null;
  url: string;
};
type Row = Record<string, unknown>;
const object = (value: unknown): Row => value && typeof value === "object" ? value as Row : {};
const text = (value: unknown): string | null => typeof value === "string" && value.trim() ? value.trim() : null;
function number(value: unknown): number | null {
  if (typeof value !== "number" && !(typeof value === "string" && /^\d+(?:\.\d+)?$/.test(value.trim()))) return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

// USDA foodNutrients are already normalised to a 100g/100ml basis. Never use
// labelNutrients (per serving) as though they were foodNutrients. See FDC docs.
export function parseUsdaFood(value: unknown): UsdaFood | null {
  const row = object(value), id = number(row.fdcId), description = text(row.description), dataset = text(row.dataType);
  if (!id || !Number.isSafeInteger(id) || !description || !dataset || !(USDA_DATASETS as readonly string[]).includes(dataset)) return null;
  const servingUnit = text(row.servingSizeUnit)?.toLowerCase() ?? null;
  const unit = dataset !== "Branded" ? "g" : servingUnit === "g" || servingUnit === "ml" ? servingUnit : "unknown";
  const rawPortions = Array.isArray(row.foodPortions) ? row.foodPortions : [];
  const portions = rawPortions.map(p => { const item = object(p); return { grams: number(item.gramWeight), description: text(item.portionDescription ?? item.modifier) ?? "" }; });
  // A reference's own measured portion converts that reference, never the
  // branded product's density. Ambiguous cups, ounces by weight and counts do not.
  // USDA portion fields: https://fdc.nal.usda.gov/portal-data/external/dataDictionary
  // U.S. fluid ounce: NIST SP 811, Appendix B.8 (29.57353 mL).
  let volumeBasis: UsdaFood["volumeBasis"];
  for (const raw of rawPortions) {
    const item = object(raw), measure = object(item.measureUnit), grams = number(item.gramWeight);
    const description = text(item.portionDescription ?? item.modifier) ?? "";
    const explicit = /\b(\d+(?:\.\d+)?)\s*(ml|millilit(?:er|re)s?|l|lit(?:er|re)s?|fl\.?\s*oz|fluid ounces?)\b/i.exec(description);
    const measureName = text(measure.name) ?? text(measure.abbreviation) ?? "";
    const structured = /^(ml|millilit(?:er|re)s?|l|lit(?:er|re)s?|fl\.?\s*oz|fluid ounces?)$/i.test(measureName);
    const amount = structured ? number(item.amount) : explicit ? Number(explicit[1]) : number(item.amount);
    const unit = (structured ? measureName : explicit?.[2] ?? description).toLowerCase();
    const multiplier = /^(ml|millilit(?:er|re)s?)$/.test(unit) ? 1 : /^(l|lit(?:er|re)s?)$/.test(unit) ? 1000
      : /^(fl\.?\s*oz|fluid ounces?)$/.test(unit) && dataset !== "Branded" ? 29.57353 : null;
    if (grams && amount && multiplier) { volumeBasis = { grams, millilitres: amount * multiplier, evidence: `${grams}g per ${amount} ${unit}${description ? ` (${description})` : ""}` }; break; }
  }
  const provenance: UsdaFood["provenance"] = [];
  function macro(id: number, unit: string): number | null {
    for (const entry of Array.isArray(row.foodNutrients) ? row.foodNutrients : []) {
      const n = object(entry), nutrient = object(n.nutrient);
      if (Number(nutrient.id ?? n.nutrientId) === id && String(nutrient.unitName ?? n.unitName).toLowerCase() === unit)
        return number(n.amount ?? n.value);
    }
    return null;
  }
  function mineral(nutrientId: number, nutrientNumber: string): number | null {
    for (const entry of Array.isArray(row.foodNutrients) ? row.foodNutrients : []) {
      const n = object(entry), nutrient = object(n.nutrient);
      if (Number(nutrient.id ?? n.nutrientId) !== nutrientId && String(nutrient.number ?? n.nutrientNumber) !== nutrientNumber) continue;
      const raw = number(n.amount ?? n.value);
      const unitName = String(nutrient.unitName ?? n.unitName ?? "").toLowerCase();
      const factor = unitName === "mg" ? 1 : unitName === "g" ? 1000 : ["ug", "µg", "μg", "mcg"].includes(unitName) ? 0.001 : null;
      const derivation = object(n.foodNutrientDerivation);
      const source = object(derivation.foodNutrientSource);
      provenance.push({ nutrient: nutrientNumber === "306" ? "Potassium" : "Phosphorus", derivation: text(derivation.description ?? n.derivationDescription), source: text(source.description ?? n.foodNutrientSourceDescription), zeroMayBeRounded: dataset === "Branded" && raw === 0 });
      return raw === null || factor === null ? null : raw * factor;
    }
    return null;
  }
  return {
    fdcId: id, description, dataset, unit, potassiumMg: mineral(1092, "306"), phosphorusMg: mineral(1091, "305"),
    macros: { energyKcal: macro(1008, "kcal") ?? macro(2047, "kcal") ?? macro(2048, "kcal"), protein: macro(1003, "g"), fat: macro(1004, "g"), carbohydrate: macro(1005, "g") },
    preparation: /\b(water added|prepared|cooked|ready.to.serve)\b/i.test(description) ? "prepared" : /\b(dry|raw|dehydrated)\b/i.test(description) ? "dry" : "unspecified",
    componentDescriptions: (Array.isArray(row.inputFoods) ? row.inputFoods : []).map(f => text(object(f).ingredientDescription ?? object(f).foodDescription)).filter((s): s is string => s !== null),
    completeProductUnclear: portions.some(p => /without (?:flavo[u]?r packet|seasoning|sauce)/i.test(p.description)),
    ingredients: text(row.ingredients), brand: text(row.brandName ?? row.brandOwner), barcode: text(row.gtinUpc),
    marketCountry: text(row.marketCountry), dataSource: text(row.dataSource),
    serving: { amount: number(row.servingSize), unit: servingUnit, description: text(row.householdServingFullText) },
    portions, ...(volumeBasis ? { volumeBasis } : {}),
    provenance, publicationDate: text(row.publicationDate), url: `https://fdc.nal.usda.gov/food-details/${id}/nutrients`,
  };
}
