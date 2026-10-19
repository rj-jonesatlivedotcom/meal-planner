export const snackNutrients = ["calories", "protein", "carbohydrates", "fat", "fibre", "sodium", "potassium", "phosphate"] as const;
export type SnackNutrient = typeof snackNutrients[number];
export type NutrientValue = { value: number | null; kind: "reported" | "estimated" | "unavailable" };
export type SnackNutrition = Record<SnackNutrient, NutrientValue>;
export type FoodSnapshot = {
  version: 1; unit: "g" | "ml"; basis: string;
  reference: SnackNutrition; nutrients: SnackNutrition; source: string;
};
export type PlannedSnack = { id: string; user_id: string; planned_on: string; barcode: string; name: string; quantity: number; snapshot: FoodSnapshot };
export type SavedFood = { user_id: string; barcode: string; name: string; favourite: boolean; last_scanned_at: string | null };

type FoodInput = {
  energyKcal: number | null; protein: number | null; carbohydrate: number | null; fat: number | null;
  fibre: number | null; sodium: number | null; potassium: number | null; phosphorus: number | null;
  minerals?: Record<"potassium" | "phosphorus", { valueMg: number | null; provenance: string; rangeMg?: unknown }>;
};
export function localFoodDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function foodSnapshot(food: FoodInput, unit: "g" | "ml", basis: string, source: string): FoodSnapshot {
  const fields = { calories: food.energyKcal, protein: food.protein, carbohydrates: food.carbohydrate, fat: food.fat, fibre: food.fibre, sodium: food.sodium, potassium: food.potassium, phosphate: food.phosphorus };
  const reference = Object.fromEntries(snackNutrients.map(key => {
    const mineral = key === "potassium" ? food.minerals?.potassium : key === "phosphate" ? food.minerals?.phosphorus : undefined;
    const raw = mineral ? mineral.rangeMg ? null : mineral.valueMg : fields[key];
    const value = typeof raw === "number" && Number.isFinite(raw) && raw >= 0 ? raw : null;
    return [key, { value, kind: value === null ? "unavailable" : mineral?.provenance === "estimated" ? "estimated" : "reported" }];
  })) as SnackNutrition;
  return { version: 1, unit, basis, reference, nutrients: reference, source };
}
export function snapshotForQuantity(snapshot: FoodSnapshot, quantity: number): FoodSnapshot {
  if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 100000) throw new Error("Choose a valid quantity");
  return { ...snapshot, nutrients: Object.fromEntries(snackNutrients.map(key => [key, {
    ...snapshot.reference[key], value: snapshot.reference[key].value === null ? null : snapshot.reference[key].value! * quantity / 100,
  }])) as SnackNutrition };
}
export function validFoodSnapshot(value: unknown): value is FoodSnapshot {
  const s = value as FoodSnapshot;
  return Boolean(s && s.version === 1 && ["g", "ml"].includes(s.unit) && ["as-sold", "dry", "prepared"].includes(s.basis) &&
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
  return `${text}${quality.estimated ? " ESTIMATE" : ""}${quality.missing ? " (incomplete)" : ""}`;
}
