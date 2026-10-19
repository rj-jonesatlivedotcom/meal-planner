import { CURATED_MINERALS, type CofidMinerals, type Mineral, type MineralResults, type PreparationBasis } from "./curatedMinerals";
import type { UsdaFood } from "./usdaData";
import type { ReferenceResolution } from "./referenceMatching";

export type CategoryProduct = {
  product_name?: string; product_name_en?: string; categories_tags?: string[]; categories?: string;
  ingredients_text?: string; additives_tags?: string[]; data_sources?: string;
  generic_name?: string;
  nutriments?: Record<string, unknown>;
};
type Rule = {
  id: string; approved: Readonly<Record<Mineral, boolean>>;
  reference: { source: "CoFID 2021" | "USDA"; code: string; description: string };
  explanation: string;
};
// Reviewed category references, 19 October 2026. Numerical values are loaded from
// existing CoFID records / the server-side USDA API, never generated from names.
export const FOOD_CATEGORY_RULES: readonly Rule[] = [
  { id: "plain-digestive", approved: { potassium: true, phosphorus: true },
    reference: { source: "CoFID 2021", code: "11-799", description: "Biscuits, digestive, plain" },
    explanation: "Plain digestive comparison; flour, raising agents and branded formulations may differ. Ingredient details may be incomplete." },
  { id: "cream-sandwich-biscuit", approved: { potassium: true, phosphorus: true },
    reference: { source: "CoFID 2021", code: "11-813", description: "Biscuits, sandwich, cream" },
    explanation: "Comparable filled biscuit, including its filling. Flavouring, flour and filling proportions may differ." },
  { id: "canned-tomatoes", approved: { potassium: true, phosphorus: true },
    reference: { source: "CoFID 2021", code: "13-530", description: "Tomatoes, canned, whole contents" },
    explanation: "Canned tomatoes including juice, not drained. Ingredient transcriptions may be incomplete; branded varieties may differ." },
  { id: "chicken-vegetable-soup", approved: { potassium: true, phosphorus: true },
    reference: { source: "USDA", code: "171546", description: "Soup, chicken and vegetable, canned, ready-to-serve" },
    explanation: "Complete ready-to-serve chicken, vegetable and broth comparison. Chicken, vegetable and starch proportions differ between soups; no dilution or ingredient-weight calculation is assumed." },
];
export const CATEGORY_USDA_IDS = FOOD_CATEGORY_RULES.filter(r => r.reference.source === "USDA").map(r => Number(r.reference.code));
const number = (value: unknown): number | null => {
  if (typeof value !== "number" && !(typeof value === "string" && /^\d+(?:\.\d+)?$/.test(value.trim()))) return null;
  const n = Number(value); return Number.isFinite(n) && n >= 0 ? n : null;
};
function description(p: CategoryProduct) { return `${p.product_name ?? p.product_name_en ?? ""} ${(p.categories_tags ?? []).join(" ")} ${p.categories ?? ""}`.toLowerCase(); }
function profile(p: CategoryProduct, bounds: readonly [string, number, number][]) {
  // Product-type gates, not accuracy/confidence scores. Require all four macros;
  // absent/contradictory nutrition cannot establish a category comparison.
  return bounds.every(([key, min, max]) => { const n = number(p.nutriments?.[key + "_100g"]); return n !== null && n >= min && n <= max; });
}
export function categoryRule(p: CategoryProduct): Rule | undefined {
  const name = description(p), ingredients = (p.ingredients_text ?? "").toLowerCase();
  if (/\b(digestive|digestives)\b/.test(name) && !/chocolat|cocoa|oat|cream|filled|sandwich|gluten.free|protein.enriched/.test(name + " " + ingredients) &&
      profile(p, [["energy-kcal",380,550],["proteins",3,12],["fat",10,30],["carbohydrates",45,80]])) return FOOD_CATEGORY_RULES[0];
  if (/biscuit|cookie/.test(name) && /sandwich|filled|cream|oreo/.test(name) && !/coated|gluten.free|protein.enriched/.test(name) &&
      /wheat/.test(ingredients) && /sugar/.test(ingredients) &&
      profile(p, [["energy-kcal",400,550],["proteins",2,8],["fat",15,30],["carbohydrates",50,80]])) return FOOD_CATEGORY_RULES[1];
  if (/tomato/.test(name) && /canned|tinned/.test(name) && !/soup|sauce|paste|puree|purée|dried|concentrat|beans|chilli|chili|roasted/.test(name) &&
      !/meat|chicken|cheese|oil|potassium chloride/.test(ingredients) &&
      profile(p, [["energy-kcal",10,40],["proteins",0.5,2.5],["fat",0,1],["carbohydrates",1,8]])) return FOOD_CATEGORY_RULES[2];
  if (/soup/.test(name) && /chicken/.test(name) && /vegetable|\bveg\b/.test(name) &&
      !/cream|condensed|dried|powder|noodle|rice|cheese/.test(name + " " + ingredients) &&
      /water/.test(ingredients) && /chicken/.test(ingredients) && /carrot|potato|pea/.test(ingredients) &&
      profile(p, [["energy-kcal",20,85],["proteins",1,6],["fat",0,3],["carbohydrates",2,12]])) return FOOD_CATEGORY_RULES[3];
}

export type OtherMineral = "calcium" | "magnesium" | "iron" | "zinc";
export function questionableMineralZeros(p: CategoryProduct): Partial<Record<Mineral | OtherMineral, string>> {
  const flags: Partial<Record<Mineral | OtherMineral, string>> = {};
  const fields = ["potassium", "phosphorus", "calcium", "magnesium", "iron", "zinc"] as const;
  // Source-aware abstention: a cluster of unverified OFF mineral zeros,
  // not a blanket assumption that every zero or every food must be mineral-rich.
  const name = description(p), ingredients = (p.ingredients_text ?? "").toLowerCase();
  if (!/chicken|vegetable|milk|cheese|chocolat|biscuit|digestive|wafer|cornet/.test(name + " " + ingredients) ||
      (number(p.nutriments?.proteins_100g) ?? 0) <= 1 || /producers|manufacturer/i.test(p.data_sources ?? "") ||
      fields.filter(key => number(p.nutriments?.[key + "_100g"]) === 0).length < 3) return flags;
  for (const key of fields) if (number(p.nutriments?.[key + "_100g"]) === 0)
    flags[key] = "Unverified Open Food Facts zero in a cluster of mineral zeros for a food containing protein; not established as a measured zero.";
  return flags;
}
export function additiveConcern(p: CategoryProduct, nutrient: Mineral): string | null {
  const text = `${p.ingredients_text ?? ""} ${(p.additives_tags ?? []).join(" ")}`.toLowerCase();
  if (nutrient === "potassium" && /potassium|\be(?:340|501|508|515|525)(?:i{1,3})?\b/.test(text))
    return "Potassium salts are listed, but their quantity is unknown; the generic comparison cannot account for them.";
  if (nutrient === "phosphorus" && /phosphat|phosphoric|\be(?:338|339|340|341|343|442|450|451|452|1410|1412|1413|1414|1442)(?:i{1,3})?\b/.test(text))
    return "Phosphorus-containing additives are listed, but their quantity is unknown; the generic comparison cannot account for them.";
  return null;
}

export async function resolveCategoryMinerals(code: string, p: CategoryProduct, current: MineralResults,
  loadCofid: (code: string) => Promise<CofidMinerals | null>,
  options: { basis: PreparationBasis; unit: "g" | "ml"; loadUsda?: (id: number) => Promise<UsdaFood | null>;
    searchReferences?: (product: CategoryProduct, basis: PreparationBasis, unit: "g" | "ml") => Promise<ReferenceResolution | null> },
): Promise<MineralResults> {
  // Reviewed barcode overrides, including explicit holds, always take precedence.
  if (CURATED_MINERALS.some(mapping => mapping.barcode === code)) return current;
  const results = { potassium: { ...current.potassium }, phosphorus: { ...current.phosphorus } };
  const rule = categoryRule(p);
  const wanted = (["potassium", "phosphorus"] as const).filter(key => results[key].provenance === "unavailable");
  if (!wanted.length) return results;
  if (options.searchReferences) {
    let resolution: ReferenceResolution | null = null;
    try { resolution = await options.searchReferences(p, options.basis, options.unit); } catch { /* Existing reviewed comparisons remain a fallback. */ }
    if (resolution) {
      for (const key of wanted) {
        const candidate = resolution.matches[key], concern = additiveConcern(p, key);
        const value = key === "potassium" ? candidate?.potassiumMg : candidate?.phosphorusMg;
        if (!concern && candidate && typeof value === "number" && Number.isFinite(value) && value >= 0 && options.unit === "g" && options.basis !== "unknown") {
          results[key] = { ...results[key], valueMg: value, provenance: "estimated", categoryId: `reference-search:${candidate.source}:${candidate.code}`, reason: undefined,
            estimate: { kind: "single", valueMg: value, method: "comparable-food", basis: options.basis, completeProduct: true,
              explanation: resolution.note || "Generic complete-food comparison; ingredients and formulations may differ.",
              references: [{ label: candidate.source === "USDA" ? `USDA FoodData Central FDC ID ${candidate.code}` : "CoFID 2021",
                foodCode: candidate.source === "CoFID 2021" ? candidate.code : undefined, description: candidate.description, url: candidate.url }] } };
        } else results[key].reason = concern ?? resolution.reasons[key] ?? "No suitable reference nutrient was available.";
      }
      return results;
    }
  }
  if (!rule || options.unit !== "g" || options.basis !== "as-sold") {
    for (const key of wanted) results[key].reason = options.searchReferences
      ? "The reference search is temporarily unavailable; no comparison has been assumed."
      : "No approved comparable food for this product type and preparation basis.";
    return results;
  }
  const eligible = wanted.filter(key => {
    const concern = additiveConcern(p, key);
    if (concern) results[key].reason = concern;
    return rule.approved[key] && !concern;
  });
  if (!eligible.length) return results;
  const ref = rule.reference;
  try {
    const cofid = ref.source === "CoFID 2021" ? await loadCofid(ref.code) : null;
    const usda = ref.source === "USDA" ? await options.loadUsda?.(Number(ref.code)) : null;
    const validCofid = cofid?.food_code === ref.code && cofid.food_name === ref.description;
    const validUsda = usda?.fdcId === Number(ref.code) && usda.description === ref.description &&
      usda.unit === "g" && usda.dataset === "SR Legacy" && !usda.completeProductUnclear && usda.preparation === "prepared";
    for (const key of eligible) {
      const value = validCofid ? cofid![`${key}_mg`] : validUsda ? key === "potassium" ? usda!.potassiumMg : usda!.phosphorusMg : null;
      if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
        results[key].reason = "The comparable reference nutrient could not be loaded; no value has been assumed."; continue;
      }
      results[key] = { ...results[key], valueMg: value, provenance: "estimated", categoryId: rule.id, reason: undefined,
        estimate: { kind: "single", valueMg: value, method: "comparable-food", basis: "as-sold", completeProduct: true,
          explanation: rule.explanation,
          references: [{ label: ref.source === "USDA" ? `USDA FoodData Central FDC ID ${ref.code}` : "CoFID 2021",
            foodCode: ref.source === "CoFID 2021" ? ref.code : undefined, description: ref.description,
            url: ref.source === "USDA" ? `https://fdc.nal.usda.gov/food-details/${ref.code}/nutrients` : "https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid" }] },
      };
    }
  } catch { for (const key of eligible) results[key].reason = "The comparable reference is temporarily unavailable."; }
  return results;
}
