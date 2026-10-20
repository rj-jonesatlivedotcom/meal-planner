import { scaleMineral, type MineralResults, type PreparationBasis } from "./curatedMinerals";
import type { NaturalUnit } from "@/lib/foodSnacks";
import { foodState, identifyFood } from "./referenceMatching";
import { reviewedLabelBasis } from "./reviewedLabelBasis";

export type BarcodePortion = {
  amount: number | null;
  unit: "g" | "ml";
  basis: PreparationBasis;
  label: string;
  referenceLabel: string;
  limitation: string;
  wholePack?: { amount: number; label: string };
  naturalUnit?: NaturalUnit;
};

type ProductQuantity = {
  quantity?: unknown;
  nutrition_data_per?: unknown;
  nutrition_data_prepared?: unknown;
  product_name?: unknown;
  product_name_en?: string;
  serving_size?: unknown;
  serving_quantity?: unknown;
  serving_quantity_unit?: unknown;
  categories_tags?: string[];
  nutriments?: Record<string, unknown>;
  ingredients_text?: string;
  nutrition_basis?: string;
};

// Manufacturer servings have priority for every product, not selected barcodes.
function manufacturerServing(product: ProductQuantity, pack: BarcodePortion): BarcodePortion {
  if (pack.unit !== "g" || pack.referenceLabel.includes("unconfirmed")) return pack;
  const label = typeof product.serving_size === "string" ? product.serving_size.trim() : "";
  const weights = [...label.matchAll(/\b(\d+(?:[.,]\d+)?)\s*g\b/gi)];
  if (weights.length > 1 || !weights.length && (label || product.serving_quantity_unit !== "g")) return pack;
  const amount = weights.length ? Number(weights[0][1].replace(",", ".")) : Number(product.serving_quantity);
  if (!Number.isFinite(amount) || amount <= 0 || amount > 100000 || pack.amount && amount > pack.amount) return pack;
  const state = foodState({ product_name: typeof product.product_name === "string" ? product.product_name : undefined,
    product_name_en: product.product_name_en,
    categories_tags: product.categories_tags, ingredients_text: product.ingredients_text, nutrition_basis: product.nutrition_basis }, pack.basis);
  if (/drained/i.test(label) && state.contents !== "drained" || /prepared|cooked|with milk|with water/i.test(label) && pack.basis !== "prepared") return pack;
  if (pack.basis === "prepared" && !/prepared|cooked/i.test(label)) return pack;
  if (product.serving_quantity !== undefined && product.serving_quantity !== null) {
    const supplied = typeof product.serving_quantity === "number" || typeof product.serving_quantity === "string" && /^\d+(?:\.\d+)?$/.test(product.serving_quantity.trim()) ? Number(product.serving_quantity) : NaN;
    if (!Number.isFinite(supplied) || Math.abs(supplied - amount) > 0.01 || product.serving_quantity_unit !== "g") return pack;
  }
  return { ...pack, amount, label: `Manufacturer serving (${amount}g${pack.basis === "dry" ? " dry" : state.contents === "drained" ? " drained" : ""})`,
    limitation: "", wholePack: pack.amount && pack.amount !== amount ? { amount: pack.amount, label: pack.label } : undefined };
}

// Exact-barcode label evidence from the existing research. Prepared yield is the
// manufacturer's stated 435g, NOT dry 85g or a calculated 85g + 365ml yield.
const verified = {
  "5000159553834": { dry: 30, amount: 30, basis: "as-sold", label: "Whole bar (30g)" },
  "5000295141599": { dry: 350, amount: 350, basis: "as-sold", label: "Whole pack (350g)" },
  "5000157024671": { dry: 415, amount: 415, basis: "as-sold", label: "Whole can with sauce (415g)" },
  "4061464935198": { dry: 85, amount: 435, basis: "prepared", label: "Whole prepared bowl (435g; 85g dry pack)" },
} as const;

function baseBarcodePortion(code: string, product: ProductQuantity): BarcodePortion {
  const quantity = typeof product.quantity === "string" ? product.quantity.trim() : "";
  const single = quantity.match(/^(\d+(?:\.\d+)?)\s*(kg|g|ml|l)$/i);
  const multi = quantity.match(/^(?:(\d+(?:\.\d+)?)\s*g\s*\()?\s*(\d+)\s*[x×]\s*(\d+(?:\.\d+)?)\s*(g|ml)\)?$/i);
  const known = verified[code as keyof typeof verified];
  const isVolume = /(?:ml|l)$/i.test(quantity) || multi?.[4].toLowerCase() === "ml" || product.nutrition_data_per === "100ml";
  const unit = isVolume ? "ml" : "g";
  const prepared = known?.basis === "prepared" || product.nutrition_data_prepared === "on";
  const state = foodState({ product_name: typeof product.product_name === "string" ? product.product_name : undefined,
    product_name_en: product.product_name_en,
    categories_tags: product.categories_tags, ingredients_text: product.ingredients_text, nutrition_basis: product.nutrition_basis });
  const basis: PreparationBasis = prepared ? "prepared" : state.preparation === "dry" ? "dry" : "as-sold";
  const referenceLabel = `Per 100${unit}${prepared ? " prepared" : basis === "dry" ? " dry" : state.contents === "drained" ? " drained" : ""}`;
  const fallback = (limitation: string): BarcodePortion => ({ amount: null, unit, basis, label: referenceLabel, referenceLabel, limitation });
  if (product.nutrition_data_per === "100ml" && (single && /^(g|kg)$/i.test(single[2]) || multi?.[4].toLowerCase() === "g"))
    return fallback("Nutrition is per 100ml but the pack quantity is a mass. No mass/volume conversion has been made.");
  if (isVolume && product.nutrition_data_per !== "100ml")
    return { ...fallback("Pack quantity is a volume; the source nutrition mass/volume basis is unconfirmed. No pack conversion has been made."), referenceLabel: "Per 100g as recorded (volume basis unconfirmed)", label: "Per 100g as recorded (volume basis unconfirmed)" };
  if (state.contents === "drained") {
    const drained = /\bdrained(?: weight)?\s*[:(]?\s*(\d+(?:\.\d+)?)\s*g\b/i.exec(quantity);
    if (!drained) return fallback("Nutrition is for drained contents; the pack's total weight cannot be used as a drained weight. Enter drained grams or use a declared drained serving.");
    const amount = Number(drained[1]);
    if (!(amount > 0) || single && amount > Number(single[1])) return fallback("The drained weight is not verified.");
    return { amount, unit, basis, label: `Whole drained contents (${amount}g)`, referenceLabel, limitation: "" };
  }
  if (known && !/[x×]/i.test(quantity)) {
    const supplied = single ? Number(single[1]) * (/^kg$/i.test(single[2]) ? 1000 : 1)
      : /^\d+(?:\.\d+)?$/.test(quantity) ? Number(quantity) : null;
    if (supplied !== null && supplied !== known.dry)
      return fallback("The source quantity differs from the reviewed pack. Showing the source reference values until the pack quantity is verified.");
    if (quantity && supplied === null) return fallback("The current pack quantity cannot be verified against the reviewed quantity.");
    if (prepared && known.basis !== "prepared") return fallback("The prepared serving weight is not verified.");
    return { amount: known.amount, unit: "g", basis: known.basis, label: known.label, referenceLabel, limitation: "" };
  }
  const namedCount = typeof product.product_name === "string" ? /\b(\d+)\s*(?:pk|pack)\b/i.exec(product.product_name) : null;
  if (!multi && single && namedCount && !prepared && Number(namedCount[1]) > 0) {
    const amount = Number(single[1]) * (/^(kg|l)$/i.test(single[2]) ? 1000 : 1) / Number(namedCount[1]);
    if (Number.isFinite(amount) && amount > 0) return { amount, unit, basis, label: `One pack unit (${amount}${unit}; declared ${namedCount[1]}-pack)`, referenceLabel, limitation: "" };
  }
  if (!multi && typeof product.product_name === "string" && /multipack|\b\d+\s*(?:pk|pack)\b/i.test(product.product_name))
    return fallback("The individual multipack unit weight is not verified. Showing reference values only.");
  if (prepared) return fallback("Prepared serving weight is not verified. Dry pack weight cannot be used with prepared nutrition.");
  if (multi) {
    const count = Number(multi[2]), amount = Number(multi[3]);
    if (count > 0 && Number.isSafeInteger(count) && Number.isFinite(amount) && amount > 0 &&
        (!multi[1] || Math.abs(Number(multi[1]) - count * amount) < 0.01))
      return { amount, unit: multi[4].toLowerCase() as "g" | "ml", basis, label: `One unit (${amount}${multi[4].toLowerCase()}; multipack of ${count})`, referenceLabel, limitation: "" };
  }
  if (single && !/[x×]/i.test(quantity)) {
    const amount = Number(single[1]) * (/^(kg|l)$/i.test(single[2]) ? 1000 : 1);
    if (Number.isFinite(amount) && amount > 0)
      return { amount, unit, basis, label: `Whole pack (${amount}${unit})`, referenceLabel, limitation: "" };
  }
  return fallback("An individual pack or eating-unit quantity is not verified. Showing reference values only.");
}

export function barcodePortion(code: string, product: ProductQuantity): BarcodePortion {
  product = reviewedLabelBasis(code, product);
  const base = baseBarcodePortion(code, product);
  let pack = manufacturerServing(product, base);
  if (pack.referenceLabel.includes("unconfirmed")) return pack;
  const name = `${product.product_name ?? ""} ${(product.categories_tags ?? []).join(" ")}`.toLowerCase();
  const identity = identifyFood({ product_name: typeof product.product_name === "string" ? product.product_name : undefined,
    product_name_en: product.product_name_en,
    categories_tags: product.categories_tags, ingredients_text: product.ingredients_text, nutriments: product.nutriments });
  const serving = typeof product.serving_size === "string" ? product.serving_size : "";
  const servingMatch = /^(\d+(?:\.\d+)?)\s+(biscuits?|cookies?|bars?|bags?|pots?)\s*\((\d+(?:\.\d+)?)\s*g\)$/i.exec(serving);
  const declared = product.serving_quantity;
  const servingConsistent = declared === undefined || declared === null ||
    (Number(declared) === Number(servingMatch?.[3]) && product.serving_quantity_unit === "g");
  let natural: NaturalUnit | undefined;
  const make = (unit: NaturalUnit["unit"], amount: number, source: string, approximate = false): NaturalUnit =>
    ({ unit, amount, referenceUnit: pack.unit, basis: pack.basis, source, approximate });
  // A total pack weight does not establish one normal eating portion.
  if (pack === base && pack.amount && pack.amount > 100 && pack.basis !== "prepared" &&
      !/^One (?:unit|pack unit)/.test(pack.label) && !verified[code as keyof typeof verified] &&
      !/soup|tomato|beans/.test(name)) {
    pack = { ...pack, amount: 100, label: `Grams entry (100${pack.unit}${pack.basis === "dry" ? " dry" : ""}; adjust quantity)`,
      wholePack: { amount: pack.amount, label: pack.label }, limitation: "No reliable serving is supplied. Enter the amount you intend to eat; the whole pack is available separately." };
  }
  if (pack.basis === "as-sold" && pack.unit === "g" && servingMatch && servingConsistent &&
      Number(servingMatch[1]) > 0 && Number(servingMatch[3]) > 0 && (!pack.amount || Number(servingMatch[3]) <= pack.amount)) {
    const noun = servingMatch[2].toLowerCase();
    natural = make(/biscuit|cookie/.test(noun) ? "biscuits" : /bar/.test(noun) ? "bars" : /bag/.test(noun) ? "bags" : "pots",
      Number(servingMatch[3]) / Number(servingMatch[1]), `Open Food Facts package serving: ${serving}`);
  }
  const quantity = typeof product.quantity === "string" ? product.quantity.trim() : "";
  const countedPack = /^(\d+(?:\.\d+)?)\s*g\s*\(\s*(\d+)\s+(biscuits?|cookies?)\s*\)$/i.exec(quantity);
  if (!natural && countedPack && pack.unit === "g" && pack.basis === "as-sold" && Number(countedPack[1]) > 0 && Number(countedPack[2]) > 0)
    natural = make("biscuits", Number(countedPack[1]) / Number(countedPack[2]), `Declared pack weight and count: ${quantity}`);
  if (!natural && pack.amount) {
    if ((/canned|tinned/.test(name) && /soup|tomato|beans/.test(name) || code === "5000157024671") && pack.basis === "as-sold" && pack.unit === "g")
      natural = make("tins", pack.wholePack?.amount ?? pack.amount, `Declared whole pack: ${quantity || pack.label}; include all contents`);
    else if (/crisp|chips/.test(name) && !pack.wholePack && !pack.label.startsWith("Grams entry")) natural = make("bags", pack.amount, `Verified individual pack: ${pack.label}`);
    else if ((/\bbar\b|chocolate/.test(name) || /\bbar\b/i.test(pack.label)) && !/biscuit|digestive|cookie|cereal/.test(name) && pack.amount <= 100 && !pack.wholePack && !pack.label.startsWith("Grams entry")) natural = make("bars", pack.amount, `Verified individual bar: ${pack.label}`);
    else if (/noodle|\bpot\b/.test(name) && pack.basis === "prepared") natural = make("pots", pack.amount, `Verified complete prepared product: ${pack.label}`);
  }
  // A documented comparable portion is an approximation, never a fabricated pack count.
  const kcal = Number(product.nutriments?.["energy-kcal_100g"]);
  const scalarServing = /^\s*(\d+(?:\.\d+)?)\s*g\s*$/i.exec(serving);
  if (!natural && scalarServing && pack.unit === "g" && pack.basis !== "prepared" &&
      Number(scalarServing[1]) > 0 && (!pack.amount || Number(scalarServing[1]) <= pack.amount) &&
      (declared === undefined || declared === null || Number(declared) === Number(scalarServing[1]) && product.serving_quantity_unit === "g")) {
    const amount = Number(scalarServing[1]);
    if (identity?.family === "chocolate-digestive" && amount >= 12 && amount <= 22)
      natural = make("biscuits", amount, `Approximate biscuit weight using the declared ${serving} serving. Comparable chocolate digestives use a 17g biscuit (https://www.tesco.com/groceries/en-GB/products/254924572). Individual count is not supplied.`, true);
    else if (identity?.family === "coated-biscuit")
      natural = make("bars", amount, `Approximate biscuit-bar weight using the declared ${serving} serving; individual count is not supplied.`, true);
    else natural = make("servings", amount, `Declared serving: ${serving}. ${identity?.family === "empty-cone" ? "Cone count/individual cone weight is not supplied; this is a serving, not an assumed cone count." : "No individual item count has been assumed."}`);
  }
  if (!natural && /\b(digestive|digestives)\b/.test(name) && !/chocolat|oat|cream|filled|gluten.free/.test(name) && kcal >= 380 && kcal <= 550)
    natural = make("biscuits", 14.7, "Approximate comparable biscuit weight: McVitie's Original Digestive, 14.7g per biscuit (https://www.mcvities.ch/produkte/digestive-the-original/). This product's individual weight is not supplied.", true);
  if (!natural || !Number.isFinite(natural.amount) || natural.amount <= 0) return pack;
  if ((natural.unit === "biscuits" || natural.unit === "servings" || !pack.amount) && !pack.label.startsWith("Manufacturer serving")) {
    const wholePack = pack.wholePack ?? (pack.amount ? { amount: pack.amount, label: pack.label } : undefined);
    const noun = natural.unit === "biscuits" ? "biscuit" : natural.unit === "bars" ? "bar" : "serving";
    return { ...pack, naturalUnit: natural, amount: natural.amount, label: `One ${noun} (${natural.approximate ? "approximately " : ""}${natural.amount}g)`,
      wholePack, limitation: natural.approximate ? natural.source : "" };
  }
  return { ...pack, naturalUnit: natural };
}

const nutrientFields = ["energyKj", "energyKcal", "protein", "carbohydrate", "sugars", "fat", "saturates", "fibre", "salt", "sodium", "potassium", "phosphorus", "calcium", "magnesium", "iron", "zinc"] as const;
type Nutrition = Record<typeof nutrientFields[number], number | null> & { minerals?: MineralResults };

// Return a display copy; source values, approval flags and preparation tips are unchanged.
export function portionNutrition<T extends Nutrition>(food: T, portion?: BarcodePortion): T {
  if (!portion?.amount) return food;
  const result = { ...food };
  for (const key of nutrientFields) result[key] = food[key] === null ? null : food[key] * portion.amount / 100;
  if (food.minerals) result.minerals = Object.fromEntries(Object.entries(food.minerals).map(([key, mineral]) => [key, {
    ...mineral,
    valueMg: mineral.provenance === "reported" && mineral.valueMg !== null ? mineral.valueMg * portion.amount! / 100
      : portion.unit === "g" ? scaleMineral(mineral, portion.amount!, portion.basis) : null,
    rangeMg: portion.unit === "g" && portion.basis === mineral.basis && mineral.rangeMg
      ? { lower: mineral.rangeMg.lower * portion.amount! / 100, upper: mineral.rangeMg.upper * portion.amount! / 100 } : undefined,
  }])) as MineralResults;
  return result;
}
