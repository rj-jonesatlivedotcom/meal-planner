import { scaleMineral, type MineralResults, type PreparationBasis } from "./curatedMinerals";

export type BarcodePortion = {
  amount: number | null;
  unit: "g" | "ml";
  basis: PreparationBasis;
  label: string;
  referenceLabel: string;
  limitation: string;
  wholePack?: { amount: number; label: string };
};

type ProductQuantity = {
  quantity?: unknown;
  nutrition_data_per?: unknown;
  nutrition_data_prepared?: unknown;
  product_name?: unknown;
  serving_size?: unknown;
  serving_quantity?: unknown;
  serving_quantity_unit?: unknown;
};

// Only the reviewed larger products opt into manufacturer-serving defaults.
// Snack bars/bags keep one eating unit; USDA reference portions never replace UK labels.
function manufacturerServing(code: string, product: ProductQuantity, pack: BarcodePortion): BarcodePortion {
  if (!["5000295141599", "5000157024671"].includes(code) || !pack.amount || pack.basis !== "as-sold" || pack.unit !== "g") return pack;
  const label = typeof product.serving_size === "string" ? product.serving_size.trim() : "";
  const match = /\b(?:serving|portion|can)\b.*\((\d+(?:\.\d+)?)\s*g\)$/i.exec(label);
  if (!match) return pack;
  const amount = Number(match[1]);
  if (!Number.isFinite(amount) || amount <= 0 || amount > pack.amount) return pack;
  if (product.serving_quantity !== undefined && product.serving_quantity !== null) {
    const supplied = typeof product.serving_quantity === "number" || typeof product.serving_quantity === "string" && /^\d+(?:\.\d+)?$/.test(product.serving_quantity.trim()) ? Number(product.serving_quantity) : NaN;
    if (!Number.isFinite(supplied) || Math.abs(supplied - amount) > 0.01 || product.serving_quantity_unit !== "g") return pack;
  }
  return { ...pack, amount, label: `Manufacturer serving (${amount}g)`, wholePack: { amount: pack.amount, label: pack.label } };
}

// Exact-barcode label evidence from the existing research. Prepared yield is the
// manufacturer's stated 435g, NOT dry 85g or a calculated 85g + 365ml yield.
const verified = {
  "5000159553834": { dry: 30, amount: 30, basis: "as-sold", label: "Whole bar (30g)" },
  "5000295141599": { dry: 350, amount: 350, basis: "as-sold", label: "Whole pack (350g)" },
  "5000157024671": { dry: 415, amount: 415, basis: "as-sold", label: "Whole can with sauce (415g)" },
  "4061464935198": { dry: 85, amount: 435, basis: "prepared", label: "Whole prepared bowl (435g; 85g dry pack)" },
} as const;

export function barcodePortion(code: string, product: ProductQuantity): BarcodePortion {
  const quantity = typeof product.quantity === "string" ? product.quantity.trim() : "";
  const single = quantity.match(/^(\d+(?:\.\d+)?)\s*(kg|g|ml|l)$/i);
  const multi = quantity.match(/^(?:(\d+(?:\.\d+)?)\s*g\s*\()?\s*(\d+)\s*[x×]\s*(\d+(?:\.\d+)?)\s*(g|ml)\)?$/i);
  const known = verified[code as keyof typeof verified];
  const isVolume = /(?:ml|l)$/i.test(quantity) || multi?.[4].toLowerCase() === "ml" || product.nutrition_data_per === "100ml";
  const unit = isVolume ? "ml" : "g";
  const prepared = known?.basis === "prepared" || product.nutrition_data_prepared === "on";
  const basis: PreparationBasis = prepared ? "prepared" : "as-sold";
  const referenceLabel = `Per 100${unit}${prepared ? " prepared" : ""}`;
  const fallback = (limitation: string): BarcodePortion => ({ amount: null, unit, basis, label: referenceLabel, referenceLabel, limitation });
  if (product.nutrition_data_per === "100ml" && (single && /^(g|kg)$/i.test(single[2]) || multi?.[4].toLowerCase() === "g"))
    return fallback("Nutrition is per 100ml but the pack quantity is a mass. No mass/volume conversion has been made.");
  if (isVolume && product.nutrition_data_per !== "100ml")
    return { ...fallback("Pack quantity is a volume; the source nutrition mass/volume basis is unconfirmed. No pack conversion has been made."), referenceLabel: "Per 100g as recorded (volume basis unconfirmed)", label: "Per 100g as recorded (volume basis unconfirmed)" };
  if (known && !/[x×]/i.test(quantity)) {
    const supplied = single ? Number(single[1]) * (/^kg$/i.test(single[2]) ? 1000 : 1)
      : /^\d+(?:\.\d+)?$/.test(quantity) ? Number(quantity) : null;
    if (supplied !== null && supplied !== known.dry)
      return fallback("The source quantity differs from the reviewed pack. Showing the source reference values until the pack quantity is verified.");
    if (quantity && supplied === null) return fallback("The current pack quantity cannot be verified against the reviewed quantity.");
    if (prepared && known.basis !== "prepared") return fallback("The prepared serving weight is not verified.");
    return manufacturerServing(code, product, { amount: known.amount, unit: "g", basis: known.basis, label: known.label, referenceLabel, limitation: "" });
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
    // Range support remains available in the helper, but is dormant in this UI.
    rangeMg: undefined,
  }])) as MineralResults;
  return result;
}
