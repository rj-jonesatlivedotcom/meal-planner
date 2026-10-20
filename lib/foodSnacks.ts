import type { ReviewedEstimate } from "@/app/FoodCheck/curatedMinerals";

export const snackNutrients = ["calories", "protein", "carbohydrates", "fat", "fibre", "sodium", "potassium", "phosphate"] as const;
export type SnackNutrient = typeof snackNutrients[number];
export type NutrientValue = { value: number | null; kind: "reported" | "estimated" | "unavailable"; sourceState?: string; sourceValueMg?: number | null;
  rangeMg?: { lower: number; upper: number }; estimate?: ReviewedEstimate; additiveUncertainty?: string };
export type SnackNutrition = Record<SnackNutrient, NutrientValue>;
export type NaturalUnit = {
  unit: "biscuits" | "tins" | "bars" | "bags" | "pots" | "units" | "cones" | "servings";
  amount: number; referenceUnit: "g" | "ml"; basis: string;
  approximate: boolean; source: string;
};
export type QuantityEntry = { amount: number; unit: string };
export type FoodSnapshot = {
  version: 1; unit: "g" | "ml"; basis: string;
  reference: SnackNutrition; nutrients: SnackNutrition; source: string;
  naturalUnit?: NaturalUnit;
  entry?: QuantityEntry;
};
export type PlannedSnack = { id: string; user_id: string; planned_on: string; barcode: string; name: string; quantity: number; snapshot: FoodSnapshot };
export type SavedFood = { user_id: string; barcode: string; name: string; favourite: boolean; last_scanned_at: string | null };

type FoodInput = {
  energyKcal: number | null; protein: number | null; carbohydrate: number | null; fat: number | null;
  fibre: number | null; sodium: number | null; potassium: number | null; phosphorus: number | null;
  minerals?: Record<"potassium" | "phosphorus", { valueMg: number | null; provenance: string; basis?: string; rangeMg?: { lower: number; upper: number }; estimate?: ReviewedEstimate; additiveUncertainty?: string; sourceState?: string; sourceValueMg?: number | null }>;
};
export function localFoodDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function foodSnapshot(food: FoodInput, unit: "g" | "ml", basis: string, source: string, naturalUnit?: NaturalUnit): FoodSnapshot {
  const fields = { calories: food.energyKcal, protein: food.protein, carbohydrates: food.carbohydrate, fat: food.fat, fibre: food.fibre, sodium: food.sodium, potassium: food.potassium, phosphate: food.phosphorus };
  const reference = Object.fromEntries(snackNutrients.map(key => {
    const mineral = key === "potassium" ? food.minerals?.potassium : key === "phosphate" ? food.minerals?.phosphorus : undefined;
    const range = mineral?.rangeMg;
    const validRange = range && Number.isFinite(range.lower) && Number.isFinite(range.upper) && range.lower >= 0 && range.upper > range.lower;
    const raw = mineral?.basis && mineral.basis !== basis ? null
      : mineral ? range ? validRange && mineral.provenance === "estimated" ? range.upper : null : mineral.valueMg : fields[key];
    const value = typeof raw === "number" && Number.isFinite(raw) && raw >= 0 ? raw : null;
    return [key, { value, kind: value === null ? "unavailable" : mineral?.provenance === "estimated" ? "estimated" : "reported",
      ...(mineral?.sourceState ? { sourceState: mineral.sourceState, sourceValueMg: mineral.sourceValueMg } : {}),
      ...(validRange ? { rangeMg: { ...range } } : {}),
      ...(mineral?.estimate ? { estimate: mineral.estimate } : {}),
      ...(mineral?.additiveUncertainty ? { additiveUncertainty: mineral.additiveUncertainty } : {}) }];
  })) as SnackNutrition;
  return { version: 1, unit, basis, reference, nutrients: reference, source, ...(naturalUnit ? { naturalUnit } : {}) };
}
export function validNaturalUnit(value: unknown, unit: string, basis: string): value is NaturalUnit {
  const n = value as NaturalUnit;
  return Boolean(n && ["biscuits", "tins", "bars", "bags", "pots", "units", "cones", "servings"].includes(n.unit) &&
    Number.isFinite(n.amount) && n.amount > 0 && n.amount <= 100000 && n.referenceUnit === unit && n.basis === basis &&
    typeof n.approximate === "boolean" && typeof n.source === "string" && n.source.length <= 2000);
}
export function initialQuantityEntry(snapshot: FoodSnapshot, quantity: number | null): QuantityEntry {
  const natural = snapshot.naturalUnit;
  if (snapshot.entry) return { ...snapshot.entry };
  if (natural && validNaturalUnit(natural, snapshot.unit, snapshot.basis) && quantity !== null) {
    const count = quantity / natural.amount;
    // Preserve exact manufacturer servings rather than silently rounding a count.
    if (Math.abs(count * 2 - Math.round(count * 2)) < 0.000001) return { amount: count, unit: natural.unit };
  }
  return { amount: quantity ?? 0, unit: snapshot.unit };
}
export function displayQuantity(value: number): number { return Number(value.toFixed(6)); }
export function quantityEquivalent(snapshot: FoodSnapshot, entry: QuantityEntry): number {
  if (!Number.isFinite(entry.amount) || entry.amount <= 0) throw new Error("Choose a valid quantity");
  if (entry.unit === snapshot.unit) return entry.amount;
  const n = snapshot.naturalUnit;
  if (!n || !validNaturalUnit(n, snapshot.unit, snapshot.basis) || entry.unit !== n.unit) throw new Error("This unit has no verified conversion");
  return entry.amount * n.amount;
}
export function snapshotForEntry(snapshot: FoodSnapshot, entry: QuantityEntry) {
  const quantity = quantityEquivalent(snapshot, entry);
  return { quantity, snapshot: snapshotForQuantity({ ...snapshot, entry }, quantity) };
}
export function snackQuantityLabel(snack: PlannedSnack): string {
  const e = snack.snapshot.entry, n = snack.snapshot.naturalUnit;
  return e && e.unit !== snack.snapshot.unit && n && validNaturalUnit(n, snack.snapshot.unit, snack.snapshot.basis)
    ? `${Number(e.amount.toFixed(4))} ${e.unit} (${n.approximate ? "approximately " : ""}${Number(snack.quantity.toFixed(2))}${snack.snapshot.unit})`
    : `${Number(snack.quantity.toFixed(2))}${snack.snapshot.unit}`;
}
export function snapshotForQuantity(snapshot: FoodSnapshot, quantity: number): FoodSnapshot {
  if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 100000) throw new Error("Choose a valid quantity");
  const n = snapshot.naturalUnit;
  const entry = snapshot.entry ? { ...snapshot.entry, amount: quantity / (snapshot.entry.unit === snapshot.unit ? 1 : n!.amount) } : undefined;
  const approximate = entry && entry.unit !== snapshot.unit && n?.approximate;
  return { ...snapshot, ...(entry ? { entry } : {}), nutrients: Object.fromEntries(snackNutrients.map(key => [key, {
    ...snapshot.reference[key], kind: approximate && snapshot.reference[key].value !== null ? "estimated" : snapshot.reference[key].kind,
    value: snapshot.reference[key].value === null ? null : snapshot.reference[key].value! * quantity / 100,
    ...(snapshot.reference[key].rangeMg ? { rangeMg: {
      lower: snapshot.reference[key].rangeMg!.lower * quantity / 100,
      upper: snapshot.reference[key].rangeMg!.upper * quantity / 100,
    } } : {}),
  }])) as SnackNutrition };
}
export function validFoodSnapshot(value: unknown): value is FoodSnapshot {
  const s = value as FoodSnapshot;
  return Boolean(s && s.version === 1 && ["g", "ml"].includes(s.unit) && ["as-sold", "dry", "prepared"].includes(s.basis) &&
    (!s.naturalUnit || validNaturalUnit(s.naturalUnit, s.unit, s.basis)) &&
    (!s.entry || Number.isFinite(s.entry.amount) && s.entry.amount > 0 &&
      (s.entry.unit === s.unit || s.naturalUnit && s.entry.unit === s.naturalUnit.unit)) &&
    typeof s.source === "string" && [s.reference, s.nutrients].every(values => values && snackNutrients.every(key => {
      const n = values[key];
      return n && (n.kind === "unavailable" ? n.value === null : ["reported", "estimated"].includes(n.kind) && typeof n.value === "number" && Number.isFinite(n.value) && n.value >= 0);
    })));
}
export function snackSummary(snacks: readonly PlannedSnack[], date?: string) {
  const selected = snacks.filter(s => !date || s.planned_on === date);
  return Object.fromEntries(snackNutrients.map(key => {
    const values = selected.map(s => s.snapshot.nutrients[key]);
    const known = values.filter(n => n.value !== null);
    return [key, { value: known.length ? known.reduce((sum, n) => sum + n.value!, 0) : null,
      known: known.length, missing: values.length - known.length, estimated: known.some(n => n.kind === "estimated") }];
  })) as Record<SnackNutrient, { value: number | null; known: number; missing: number; estimated: boolean }>;
}
export function snackTotalLabel(text: string, quality: ReturnType<typeof snackSummary>[SnackNutrient], hasMeals: boolean) {
  if (quality.missing && !quality.known && !hasMeals) return "Not available (incomplete)";
  return `${text}${quality.estimated ? "*" : ""}${quality.missing ? " (incomplete)" : ""}`;
}

