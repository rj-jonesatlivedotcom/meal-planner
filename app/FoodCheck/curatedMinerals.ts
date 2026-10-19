import type { UsdaFood } from "./usdaData";
export type Mineral = "potassium" | "phosphorus";
export type PreparationBasis = "as-sold" | "dry" | "prepared" | "unknown";
export type EstimateReference = { label: string; url: string; foodCode?: string; description?: string };
export type ReviewedEstimate = {
  method: "comparable-food" | "component-calculation";
  basis: PreparationBasis;
  completeProduct: boolean;
  explanation: string;
  references: readonly EstimateReference[];
} & ({ kind: "single"; valueMg: number } | { kind: "range"; lowerMg: number; upperMg: number });

export type CuratedMapping = {
  barcode: string;
  product: string;
  source: "CoFID 2021";
  sourceBasis: PreparationBasis;
  match: { code: string; description: string; basis: PreparationBasis } | null;
  approved: Readonly<Record<Mineral, boolean>>;
  questionableZero: Readonly<Record<Mineral, boolean>>;
  explanation: string;
  references: readonly string[];
  estimates?: Partial<Record<Mineral, ReviewedEstimate>>;
  basisDescription?: string;
  preparationTips?: { approved: boolean; items: readonly string[]; references: readonly string[] };
  usdaMatches?: Partial<Record<Mineral, { fdcId: number; description: string; basis: PreparationBasis; completeProduct: boolean; explanation: string; questionableZero?: boolean }>>;
  usdaReview?: { retrieved: string; fdcIds: readonly number[]; potassium: "Approve" | "Revise" | "Hold"; phosphorus: "Approve" | "Revise" | "Hold"; notes: string };
};

// K/P approvals explicitly authorised for Cheddar, Heinz and Ripple.
// Bramwell's and preparation tips remain unapproved.
// Comparable CoFID values are read from existing records. Other reviewed results
// must document their complete-product derivation and nutrient-specific references.
export const CURATED_MINERALS: readonly CuratedMapping[] = [
  {
    barcode: "5000295141599",
    product: "Cathedral City Extra Mature Cheddar, 350g block",
    usdaReview: { retrieved: "2026-10-19", fdcIds: [328637, 2607935], potassium: "Approve", phosphorus: "Approve", notes: "Retain UK CoFID 75/505 mg per 100g. USDA Foundation cheddar 328637 reports K77/P458, supporting the same scale. Branded vintage Cathedral City 2607935 has a label-derived K zero and no P; it is a different maturity/formulation and is not confirmation of zero. Recommendations only; neither estimate is enabled." },
    source: "CoFID 2021",
    sourceBasis: "as-sold",
    match: { code: "12-346", description: "Cheese, Cheddar, English", basis: "as-sold" },
    approved: { potassium: true, phosphorus: true },
    questionableZero: { potassium: false, phosphorus: false },
    explanation: "Comparable natural Cheddar block; preliminary review candidate, not a branded-product measurement.",
    references: ["outputs/COFID_KP_PROOF_OF_CONCEPT.md"],
  },
  {
    barcode: "5000157024671",
    product: "Heinz Beanz in a rich tomato sauce, 415g",
    usdaReview: { retrieved: "2026-10-19", fdcIds: [175182, 1624816], potassium: "Approve", phosphorus: "Approve", notes: "Retain UK CoFID K272/P88 mg per 100g, including sauce. USDA SR Legacy vegetarian baked beans 175182 reports K224/P74; different sauce/bean proportions. Heinz branded 1624816 is a chipotle/smoke formulation and lacks K/P, so it is not substituted. Recommendations only." },
    source: "CoFID 2021",
    sourceBasis: "as-sold",
    match: { code: "13-532", description: "Baked beans, canned in tomato sauce", basis: "as-sold" },
    approved: { potassium: true, phosphorus: true },
    questionableZero: { potassium: false, phosphorus: false },
    explanation: "Canned beans with all tomato sauce included, not drained. Preliminary review candidate.",
    references: ["outputs/COFID_KP_PROOF_OF_CONCEPT.md"],
  },
  {
    barcode: "5000159553834",
    product: "Galaxy Ripple, 30g bar",
    usdaReview: { retrieved: "2026-10-19", fdcIds: [167587], potassium: "Approve", phosphorus: "Approve", notes: "Retain UK CoFID milk chocolate K451/P224 mg per 100g as a ballpark category estimate. USDA SR Legacy 167587 reports K372/P208, analytically derived, with similar fat/protein. No exact Galaxy Ripple branded result in the focused USDA search. Cocoa/milk ratios and incomplete OFF ingredients remain limitations; the P zero stays flagged. Recommendations only." },
    source: "CoFID 2021",
    sourceBasis: "as-sold",
    match: { code: "17-648", description: "Chocolate, milk", basis: "as-sold" },
    approved: { potassium: true, phosphorus: true },
    questionableZero: { potassium: false, phosphorus: true },
    explanation: "Food-category comparison with generic milk chocolate. Ripple's ingredient transcription is incomplete and its reported phosphorus zero is questionable; cocoa/milk proportions and emulsifiers may differ. Not a manufacturer measurement.",
    references: ["outputs/COFID_KP_PROOF_OF_CONCEPT.md"],
  },
  {
    barcode: "4061464935198",
    product: "Bramwells Express Chicken Flavour Noodle Bowl, 85g",
    usdaReview: { retrieved: "2026-10-19", fdcIds: [171615, 2709152], potassium: "Hold", phosphorus: "Hold", notes: "USDA SR Legacy 171615 chicken ramen dry reports K183/P115 mg per 100g but lists an 81g package without flavor packet and a separate 6g packet portion. This does not establish complete Bramwells seasoning mineral contributions. FNDDS 2709152 water-added ramen reports K27/P17 and 66kcal per 100g, unlike Bramwells 91kcal/100g prepared; its dilution/seasoning cannot be silently adopted. Branded comparisons found potassium carbonate and/or sodium tripolyphosphate, or omitted K/P. Hold both until a complete seasoned comparator or packet mineral data is available; do not apply dry noodles alone to the 435g bowl." },
    source: "CoFID 2021",
    sourceBasis: "prepared",
    basisDescription: "Per 100g prepared as directed, including all noodles, seasoning and retained water. The label states 435g per prepared bowl; the dry pack weighs 85g.",
    match: null,
    approved: { potassium: false, phosphorus: false },
    questionableZero: { potassium: false, phosphorus: false },
    // Label photos checked 2026-10-19: noodles (87%), palm oil, iodised salt
    // (potassium iodate), seasoning incl. disodium 5'-ribonucleotides, vegetables/chilli.
    // No explicit phosphate salt listed; additive quantities/minerals are unknown.
    // K/P absent in OFF. Photo says add vegetable/seasoning sachet and 365ml boiling
    // water, stand 3 minutes, stir; no draining. Nutrition is made up as directed,
    // per 100g / 435g bowl. Do not infer yield from 85g + 365ml or use dry values.
    // Existing CoFID noodle rows are egg/rice noodles or chicken-noodle soup;
    // none matches this fried instant-noodle/seasoning preparation. No estimate.
    // Further component review, 2026-10-19: 87% of 85g = 73.95g noodle component,
    // not 73.95g flour. Palm oil/starch/salt shares inside it are unknown; the other
    // 11.05g includes seasoning/vegetables/chilli with no separate quantities.
    // CoFID 11-719 (egg noodles raw, K378/P187) and 11-716 (white pasta raw,
    // K232/P179 mg/100g) are not interchangeable with that fried noodle component.
    // CoFID 17-850 chicken-noodle soup powder K250/P250 also has different proportions.
    // DOST-FNRI PhilFCT A204, chicken instant noodles raw: K283/P114 mg/100g,
    // fat17.5/protein10.5g. This is a useful comparator, not validated bounds:
    // no matched ingredient/seasoning specification or prepared yield is provided.
    // Its sodium2910mg/100g differs from this label (3.15g salt per prepared bowl).
    // Cross-product min/max or noodles-only totals cannot bound the complete bowl.
    // Neither K nor P currently supports a single value or justified range.
    // WHO fortification example: 34mg KIO3/kg salt at 20mg iodine/kg; K is only
    // part of KIO3. This illustrates a small contribution, not this product's dose.
    // Do not infer significant potassium from iodate or calculate a product total.
    preparationTips: {
      approved: false,
      items: [
        "The label directs you to add the separate vegetable and seasoning sachet. Leaving it out would reduce added salt, but the change in sodium, potassium or phosphorus cannot be quantified here.",
        "The recipe retains the cooking water. If you choose to discard broth, less liquid is consumed, but the noodles still retain water; any mineral reduction is unknown.",
        "Potassium iodate is used in the iodised salt. Its presence alone does not establish a high potassium content.",
        "The main figures include all supplied edible components prepared as directed; these optional changes do not alter the displayed nutrition.",
      ],
      references: [
        "https://images.openfoodfacts.org/images/products/406/146/493/5198/ingredients_en.17.full.jpg",
        "https://cdn.who.int/media/docs/default-source/micronutrients/gff-part-4-en.pdf?sfvrsn=cdd21d48_2",
      ],
    },
    explanation: "No comparable CoFID instant-noodle entry. Prepared bowl includes seasoning and retained water; dry egg noodles and dilute chicken-noodle soup are unsuitable substitutes.",
    references: [
      "https://world.openfoodfacts.org/api/v2/product/4061464935198.json",
      "https://images.openfoodfacts.org/images/products/406/146/493/5198/ingredients_en.17.full.jpg",
      "https://images.openfoodfacts.org/images/products/406/146/493/5198/nutrition_en.14.full.jpg",
      "https://www.aldi.co.uk/product/bramwells-express-chicken-flavour-noodle-bowl-000000000520122002",
      "https://i.fnri.dost.gov.ph/fct/library/report/3166",
      "https://cdn.who.int/media/docs/default-source/micronutrients/gff-part-4-en.pdf?sfvrsn=cdd21d48_2",
    ],
  },
];

export type CofidMinerals = {
  food_code: string;
  food_name: string;
  potassium_mg: number | null;
  phosphorus_mg: number | null;
};
export type MineralResult = {
  sourceState?: "reported" | "missing" | "questionable";
  reason?: string;
  categoryId?: string;
  sourceValueMg: number | null;
  valueMg: number | null;
  provenance: "reported" | "estimated" | "unavailable";
  basis: PreparationBasis;
  match?: NonNullable<CuratedMapping["match"]>;
  rangeMg?: { lower: number; upper: number };
  estimate?: ReviewedEstimate;
  comparisonNote?: string;
};
export type MineralResults = Record<Mineral, MineralResult>;
const minerals = ["potassium", "phosphorus"] as const;
const valid = (n: number | null): n is number => typeof n === "number" && Number.isFinite(n) && n >= 0;

// Bounds need a documented derivation, not an arbitrary margin. Scientific support
// is reviewed before approval; runtime checks also reject incomplete/invalid records.
export function validEstimate(estimate: ReviewedEstimate, basis: PreparationBasis): boolean {
  return estimate.completeProduct === true && basis !== "unknown" && estimate.basis === basis &&
    ["comparable-food", "component-calculation"].includes(estimate.method) &&
    Boolean(estimate.explanation.trim()) && estimate.references.length > 0 &&
    estimate.references.every(r => r.label.trim() && /^https:\/\//.test(r.url)) &&
    (estimate.kind === "single" ? valid(estimate.valueMg) : estimate.kind === "range" &&
      valid(estimate.lowerMg) && valid(estimate.upperMg) && estimate.lowerMg < estimate.upperMg);
}

export async function resolveCuratedMinerals(
  barcode: string,
  reported: Record<Mineral, number | null>,
  loadCofid: (code: string) => Promise<CofidMinerals | null>,
  options: {
    basis?: PreparationBasis;
    mappings?: readonly CuratedMapping[];
    singleOnly?: boolean;
    unit?: "g" | "ml";
    loadUsda?: (fdcId: number) => Promise<UsdaFood | null>;
    questionableZero?: Partial<Record<Mineral, boolean>>;
  } = {},
): Promise<MineralResults> {
  const mapping = (options.mappings ?? CURATED_MINERALS).find(m => m.barcode === barcode);
  const basis = options.basis ?? mapping?.sourceBasis ?? "unknown";
  const results = {} as MineralResults;
  for (const nutrient of minerals) {
    const raw = reported[nutrient];
    const questionable = raw === 0 && Boolean(mapping?.questionableZero[nutrient] || options.questionableZero?.[nutrient]);
    const usable = valid(raw) && !questionable;
    results[nutrient] = {
      sourceValueMg: raw,
      sourceState: questionable ? "questionable" : usable ? "reported" : "missing",
      valueMg: usable ? raw : null,
      provenance: usable ? "reported" : "unavailable",
      basis,
    };
  }
  // CoFID reference values here are per 100g, never per 100ml. Reported OFF
  // values remain available on their own source basis without density guesses.
  if (options.unit === "ml") return results;
  for (const nutrient of minerals) {
    const estimate = mapping?.estimates?.[nutrient];
    if (mapping?.approved[nutrient] && basis === mapping.sourceBasis && results[nutrient].provenance === "unavailable" &&
        estimate && (!options.singleOnly || estimate.kind === "single") && validEstimate(estimate, basis)) {
      results[nutrient] = { ...results[nutrient], provenance: "estimated", estimate,
        valueMg: estimate.kind === "single" ? estimate.valueMg : null,
        ...(estimate.kind === "range" ? { rangeMg: { lower: estimate.lowerMg, upper: estimate.upperMg } } : {}),
      };
    }
  }
  const match = mapping?.match;
  if (!mapping || basis === "unknown" || basis !== mapping.sourceBasis) return results;

  // Prefer the existing UK comparison. USDA is an optional, explicitly curated
  // fallback, never a name-based match or a requirement for a CoFID estimate.
  if (match && basis === match.basis && minerals.some(n => !mapping.estimates?.[n] && mapping.approved[n] && results[n].provenance === "unavailable")) {
    let row: CofidMinerals | null = null;
    try { row = await loadCofid(match.code); } catch { /* Keep the OFF result. */ }
    if (row?.food_code === match.code && row.food_name === match.description) {
      for (const nutrient of minerals) {
        const value = row[`${nutrient}_mg`];
        if (!mapping.estimates?.[nutrient] && mapping.approved[nutrient] && results[nutrient].provenance === "unavailable" && valid(value)) {
          results[nutrient] = { ...results[nutrient], valueMg: value, provenance: "estimated", match, comparisonNote: mapping.explanation };
        }
      }
    }
  }
  const loaded = new Map<number, UsdaFood | null>();
  for (const nutrient of minerals) {
    const candidate = mapping.usdaMatches?.[nutrient];
    if (!mapping.approved[nutrient] || results[nutrient].provenance !== "unavailable" || !candidate?.completeProduct || candidate.basis !== basis || !options.loadUsda) continue;
    if (!loaded.has(candidate.fdcId)) {
      try { loaded.set(candidate.fdcId, await options.loadUsda(candidate.fdcId)); } catch { loaded.set(candidate.fdcId, null); }
    }
    const food = loaded.get(candidate.fdcId);
    if (!food || food.fdcId !== candidate.fdcId || food.description !== candidate.description || food.unit !== "g" || food.completeProductUnclear ||
        food.preparation !== "unspecified" && food.preparation !== basis) continue;
    const value = nutrient === "potassium" ? food.potassiumMg : food.phosphorusMg;
    if (!valid(value) || value === 0 && candidate.questionableZero) continue;
    results[nutrient] = { ...results[nutrient], provenance: "estimated", valueMg: value, estimate: {
      kind: "single", valueMg: value, method: "comparable-food", basis, completeProduct: true,
      explanation: candidate.explanation,
      references: [{ label: `USDA FoodData Central FDC ID ${food.fdcId} (${food.dataset})`, url: food.url, description: food.description }],
    } };
  }
  return results;
}

// Portion mass must use the same preparation basis. Never convert dry/prepared weights.
export function scaleMineral(result: MineralResult, grams: number, basis: PreparationBasis): number | null {
  if (!valid(result.valueMg) || !Number.isFinite(grams) || grams < 0 ||
      basis === "unknown" || basis !== result.basis) return null;
  return result.valueMg * grams / 100;
}

export function scaleMineralRange(result: MineralResult, grams: number, basis: PreparationBasis): MineralResult["rangeMg"] | null {
  const range = result.rangeMg;
  if (!range || !valid(range.lower) || !valid(range.upper) || range.lower >= range.upper ||
      !Number.isFinite(grams) || grams < 0 || basis === "unknown" || basis !== result.basis) return null;
  return { lower: range.lower * grams / 100, upper: range.upper * grams / 100 };
}

export function formatMineral(result: MineralResult, format: (n: number) => string): string {
  const range = result.rangeMg;
  // Round range endpoints outwards so display never narrows the supported bounds.
  if (result.provenance === "estimated" && range && valid(range.lower) && valid(range.upper) && range.lower < range.upper)
    return `Estimated ${Math.floor(range.lower)}–${Math.ceil(range.upper)} mg`;
  if (result.valueMg === null) return "Not available";
  const value = result.provenance === "estimated"
    ? result.valueMg > 0 && result.valueMg < 1 ? Number(result.valueMg.toPrecision(1)) : Math.round(result.valueMg)
    : result.valueMg;
  const text = result.provenance === "estimated" && value > 0 && value < 1 ? String(value) : format(value);
  return `${result.provenance === "estimated" ? "Estimated " : ""}${text} mg`;
}

export function mineralSourceExplanation(results?: MineralResults, portion?: { amount: number | null; label: string }): string {
  if (!results) return "";
  const categoryEstimates = minerals.filter(n => results[n].categoryId && results[n].provenance === "estimated");
  const categoryText = categoryEstimates.map((n, index) => {
    const result = results[n], ref = result.estimate!.references[0];
    const combined = categoryEstimates.length === 2 && results[categoryEstimates[0]].categoryId === results[categoryEstimates[1]].categoryId;
    if (index === 1 && combined) return "";
    return `${combined ? "Potassium and phosphorus" : n === "potassium" ? "Potassium" : "Phosphorus"}: Estimated using ${ref.label} for ${ref.description}${ref.foodCode ? `, food code ${ref.foodCode}` : ""}${portion?.amount ? `, adjusted to ${portion.label}` : ", per 100g"}. ${result.estimate!.explanation} Actual branded-product values may differ.`;
  }).filter(Boolean);
  const unavailableText = minerals.filter(n => results[n].provenance === "unavailable" && results[n].reason)
    .map(n => `${n === "potassium" ? "Potassium" : "Phosphorus"}: Not available. ${results[n].reason}`);
  const estimates = minerals.filter(n => results[n].provenance === "estimated" && results[n].match);
  const combined = estimates.length === 2 && results[estimates[0]].match?.code === results[estimates[1]].match?.code;
  return estimates.map((n, index) => {
    const match = results[n].match!;
    if (index === 1 && combined) return "";
    const label = combined
      ? "Potassium and phosphorus" : n === "potassium" ? "Potassium" : "Phosphorus";
    const values = (combined ? estimates : [n]).map(key => `${key}: ${formatMineral(results[key], String)}`).join("; ");
    const scaled = portion?.amount ? ` Adjusted to ${portion.label} (reference value × ${portion.amount}/100): ${(combined ? estimates : [n]).map(key => `${key} approximately ${Math.round(results[key].valueMg! * portion.amount! / 100)} mg`).join("; ")}.` : "";
    return `${label}: Estimated using CoFID 2021 data for ${match.description}, food code ${match.code}. ${values} per 100g.${scaled} This is a comparable food, not a measurement of the scanned product. Actual values may differ. ${results[n].comparisonNote ?? ""}`;
  }).filter(Boolean).concat(minerals.filter(n => results[n].provenance === "estimated" && results[n].estimate && !results[n].categoryId).map(n => {
    const estimate = results[n].estimate!;
    const references = estimate.references.map(r => `${r.label}${r.description ? `, ${r.description}` : ""}${r.foodCode ? `, food code ${r.foodCode}` : ""}`).join("; ");
    const scaled = portion?.amount && results[n].valueMg !== null ? ` Adjusted to ${portion.label} (reference × ${portion.amount}/100): approximately ${Math.round(results[n].valueMg! * portion.amount / 100)} mg.` : "";
    return `${n === "potassium" ? "Potassium" : "Phosphorus"}: ${formatMineral(results[n], String)} per 100g, using a ${estimate.method === "component-calculation" ? "component calculation" : "comparable food"} for the complete product.${scaled} Sources: ${references}. ${estimate.explanation} This is not a manufacturer measurement. Actual values may differ.`;
  }), categoryText, unavailableText).join(" ");
}

export function singleMineralText(result: MineralResult, format: (n: number) => string): string {
  if (result.rangeMg || result.valueMg === null) return "Not available";
  return formatMineral(result, format).replace(/^Estimated /, "");
}

export function isSingleEstimate(result?: MineralResult): boolean {
  return result?.provenance === "estimated" && result.valueMg !== null && !result.rangeMg;
}

export function mineralSourceReferences(results?: MineralResults): EstimateReference[] {
  return [...new Map(minerals.flatMap(n => results?.[n].provenance === "estimated"
    ? results[n].estimate?.references ?? [] : []).map(r => [r.url, r])).values()];
}

export function foodPreparationTips(barcode: string, mappings = CURATED_MINERALS): readonly string[] {
  const tips = mappings.find(m => m.barcode === barcode)?.preparationTips;
  return tips?.approved ? tips.items : [];
}

export function foodBasisDescription(barcode: string): string {
  return CURATED_MINERALS.find(m => m.barcode === barcode)?.basisDescription ?? "";
}
