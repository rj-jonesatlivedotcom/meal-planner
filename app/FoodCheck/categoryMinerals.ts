import { CURATED_MINERALS, type CofidMinerals, type Mineral, type MineralResults, type PreparationBasis } from "./curatedMinerals";
import type { UsdaFood } from "./usdaData";
import { identifyFood, type ReferenceResolution } from "./referenceMatching";
import { reviewedLabelBasis, type PreparationYield } from "./reviewedLabelBasis";

export type CategoryProduct = {
  product_name?: string; product_name_en?: string; categories_tags?: string[]; categories?: string;
  ingredients_text?: string; additives_tags?: string[]; data_sources?: string;
  generic_name?: string;
  nutrition_basis?: string;
  preparationYield?: PreparationYield;
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
      !/meat|chicken|cheese|oil/.test(ingredients) &&
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
  if (!identifyFood(p) || !name.trim() && !ingredients.trim() ||
      (number(p.nutriments?.proteins_100g) ?? 0) <= 0 || /producers|manufacturer/i.test(p.data_sources ?? "") ||
      fields.filter(key => number(p.nutriments?.[key + "_100g"]) === 0).length < 3) return flags;
  for (const key of fields) if (number(p.nutriments?.[key + "_100g"]) === 0)
    flags[key] = "Unverified Open Food Facts zero in a cluster of mineral zeros for an identified food containing protein; not established as a measured zero.";
  return flags;
}
export function additiveConcern(p: CategoryProduct, nutrient: Mineral): string | null {
  const text = `${p.ingredients_text ?? ""} ${(p.additives_tags ?? []).join(" ")}`.toLowerCase();
  // Identity only, never a quantity or absorption calculation. E-number names:
  // https://www.gov.uk/government/publications/approved-additives-and-e-numbers/approved-additives-and-e-numbers
  const pattern = nutrient === "potassium"
    ? /potassium(?:[ -]+[a-z]+){0,2}|acesulfa?me[ -]+k\b|\be[ -]?(?:202|212|224|228|249|252|261|283|303|326|332|336|337|340|351|357|402|501|508|515|522|525|536|555|577|622|628|632|950)(?:[ivx]+)?\b/g
    : /(?:[a-z]+[ -]+)?(?:[a-z]*phosphat[a-z]*|phosphoric acid|lecithin[s]?|ribonucleotide[s]?|guanylate[s]?|inosinate[s]?)|\be[ -]?(?:322|338|339|340|341|343|442|450|451|452|541|626|627|628|629|630|631|632|633|634|635|1410|1412|1413|1414|1442)(?:[ivx]+)?\b/g;
  const found = [...new Set(text.match(pattern) ?? [])];
  if (!found.length) return null;
  return `${nutrient === "potassium" ? "Potassium" : "Phosphorus"}-containing additive listed: ${found.join(", ")}. Actual ${nutrient} may be significantly higher than the baseline estimate. The additive quantity is unknown; its contribution is not calculated or included in the reference range.`;
}

export async function resolveCategoryMinerals(code: string, p: CategoryProduct, current: MineralResults,
  loadCofid: (code: string) => Promise<CofidMinerals | null>,
  options: { basis: PreparationBasis; unit: "g" | "ml"; loadUsda?: (id: number) => Promise<UsdaFood | null>;
    searchReferences?: (product: CategoryProduct, basis: PreparationBasis, unit: "g" | "ml") => Promise<ReferenceResolution | null> },
): Promise<MineralResults> {
  p = reviewedLabelBasis(code, p);
  const results = { potassium: { ...current.potassium }, phosphorus: { ...current.phosphorus } };
  for (const key of ["potassium", "phosphorus"] as const) {
    const concern = additiveConcern(p, key);
    if (concern) results[key].additiveUncertainty = concern;
  }
  // Approved comparisons stay first; a reviewed hold may allow a new search,
  // without authorising the previously rejected reference.
  if (CURATED_MINERALS.some(mapping => mapping.barcode === code && !mapping.allowReferenceSearch)) return results;
  const rule = categoryRule(p);
  const wanted = (["potassium", "phosphorus"] as const).filter(key => results[key].provenance === "unavailable");
  if (!wanted.length) return results;
  if (options.searchReferences) {
    let resolution: ReferenceResolution | null = null;
    try { resolution = await options.searchReferences(p, options.basis, options.unit); } catch { /* Existing reviewed comparisons remain a fallback. */ }
    if (resolution) {
      for (const key of wanted) {
        const candidate = resolution.matches[key];
        const value = key === "potassium" ? candidate?.potassiumMg : candidate?.phosphorusMg;
        if (candidate && typeof value === "number" && Number.isFinite(value) && value >= 0 && options.unit === "g" && options.basis !== "unknown") {
          const references = [...new Map([candidate, ...(resolution.comparables?.[key] ?? [])].map(c => [c.source + c.code, c])).values()]
            .filter(c => { const n = key === "potassium" ? c.potassiumMg : c.phosphorusMg; return typeof n === "number" && Number.isFinite(n) && n >= 0; });
          const values = references.map(c => (key === "potassium" ? c.potassiumMg : c.phosphorusMg)!);
          const lower = Math.min(...values), upper = Math.max(...values);
          const range = lower < upper;
          results[key] = { ...results[key], valueMg: upper, provenance: "estimated", categoryId: `reference-search:${key}:${references.map(c => c.source + c.code).join(":")}`, reason: undefined,
            ...(range ? { rangeMg: { lower, upper } } : {}),
            estimate: { ...(range ? { kind: "range", lowerMg: lower, upperMg: upper } : { kind: "single", valueMg: upper }), method: "comparable-food", basis: options.basis, completeProduct: true,
              explanation: `${resolution.note || "Generic complete-food comparison; ingredients and formulations may differ."} ${range ? `Observed comparable-reference range: ${lower}–${upper} mg per 100g; derived from the minimum and maximum of the listed references on the same preparation basis. These are not guaranteed bounds for this branded product. The upper endpoint is used for numerical planning.` : "Single-value baseline estimate; no supported reference range is available."}`,
              references: references.map(c => ({ label: c.source === "USDA" ? `USDA FoodData Central FDC ID ${c.code}` : c.source,
                foodCode: c.source !== "USDA" ? c.code : undefined, description: c.description, url: c.url,
                valueMg: (key === "potassium" ? c.potassiumMg : c.phosphorusMg)!, basis: options.basis,
                ...(c.original ? { originalValueMg: key === "potassium" ? c.original.potassiumMg : c.original.phosphorusMg,
                  originalBasis: c.original.basis, factor: c.original.factor } : {}) })) } };
        } else results[key].reason = resolution.reasons[key] ?? "No suitable reference nutrient was available.";
      }
      if (wanted.every(key => results[key].provenance !== "unavailable")) return results;
    }
  }
  if (!rule || options.unit !== "g" || options.basis !== "as-sold") {
    for (const key of wanted) results[key].reason ??= options.searchReferences
      ? "The reference search is temporarily unavailable; no comparison has been assumed."
      : "No approved comparable food for this product type and preparation basis.";
    return results;
  }
  const eligible = wanted.filter(key => rule.approved[key] && results[key].provenance === "unavailable");
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
