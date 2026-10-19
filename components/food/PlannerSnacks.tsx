"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { initialQuantityEntry, snapshotForEntry, snackQuantityLabel, snackNutrients, type PlannedSnack } from "@/lib/foodSnacks";
import QuantityFields from "./QuantityFields";
import { barcodePortion } from "@/app/FoodCheck/barcodePortions";
import type { foodAccount } from "@/lib/foodAccount";
import { notifyFoodAccount } from "@/lib/useFoodAccount";

export function SnackValues({ snack }: { snack: PlannedSnack }) {
  return <dl className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700 dark:text-slate-200">
    {snackNutrients.map(key => {
      const nutrient = snack.snapshot.nutrients[key];
      const displayValue = nutrient.value === null ? null : nutrient.kind === "estimated" && ["potassium", "phosphate"].includes(key)
        ? nutrient.value > 0 && nutrient.value < 1 ? Number(nutrient.value.toPrecision(1)) : Math.round(nutrient.value)
        : Math.round(nutrient.value * 10) / 10;
      return <div key={key}><dt className="inline">{key === "phosphate" ? "Phosphorus" : key === "calories" ? "Energy" : key.charAt(0).toUpperCase() + key.slice(1)}: </dt><dd className="inline font-semibold">{displayValue === null ? "Not available" : `${displayValue} ${key === "calories" ? "kcal" : ["sodium", "potassium", "phosphate"].includes(key) ? "mg" : "g"}`}{nutrient.kind === "estimated" && <span className="ml-1 font-bold text-amber-800 dark:text-amber-300">ESTIMATE</span>}</dd></div>;
    })}
  </dl>;
}
function SnackRow({ snack, repository }: { snack: PlannedSnack; repository?: ReturnType<typeof foodAccount> | null }) {
  const [unitSnapshot, setUnitSnapshot] = useState(snack.snapshot);
  const [entry, setEntry] = useState(() => initialQuantityEntry(snack.snapshot, snack.quantity));
  const [editing, setEditing] = useState(false), [error, setError] = useState("");
  const [saving, setSaving] = useState(false), busy = useRef(false);
  async function editQuantity() {
    if (busy.current) return;
    setEntry(initialQuantityEntry(unitSnapshot, snack.quantity)); setEditing(true); setError("");
    if (unitSnapshot.naturalUnit) return;
    busy.current = true; setSaving(true);
    try {
      // Read current unit evidence only. Historical reference nutrition is never replaced.
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(snack.barcode)}.json?fields=product_name,quantity,serving_size,serving_quantity,serving_quantity_unit,nutrition_data_per,nutrition_data_prepared,categories_tags,nutriments`, { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error("Unit lookup unavailable");
      const payload = await response.json();
      if (payload.status !== 1 || !payload.product) throw new Error("Unit lookup unavailable");
      const portion = barcodePortion(snack.barcode, payload.product);
      if (portion.naturalUnit && portion.basis === snack.snapshot.basis && portion.unit === snack.snapshot.unit) {
        const updated = { ...snack.snapshot, naturalUnit: { ...portion.naturalUnit, approximate: true,
          source: `Current package-unit comparison for a historical entry; original unit weight was not recorded. ${portion.naturalUnit.source}` } };
        setUnitSnapshot(updated); setEntry(initialQuantityEntry(updated, snack.quantity));
      }
    } catch { setError("Individual-unit details could not be loaded. You can still edit the quantity in grams or millilitres."); }
    finally { busy.current = false; setSaving(false); }
  }
  async function change(remove = false) {
    if (!repository || busy.current) return;
    busy.current = true; setSaving(true);
    try {
      if (remove) await repository.remove(snack.id);
      else await repository.save({ ...snack, ...snapshotForEntry(unitSnapshot, entry) });
      notifyFoodAccount(); setEditing(false); setError("");
    } catch { setError("Unable to update this snack. Please try again."); }
    finally { busy.current = false; setSaving(false); }
  }
  return <div className="border-t border-slate-100 dark:border-slate-700 py-3">
    <p className="break-words text-sm font-bold text-slate-900 dark:text-slate-100">{snack.name}</p>
    <p className="text-xs text-slate-600 dark:text-slate-300">{snackQuantityLabel(snack)} · {snack.snapshot.basis} · planned</p>
    <SnackValues snack={snack} />
    <details className="mt-2 text-xs text-slate-600 dark:text-slate-300"><summary className="cursor-pointer">Nutritional source</summary><p className="mt-1 break-words">{snack.snapshot.source}</p></details>
    {repository && <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
      {editing ? <><QuantityFields snapshot={unitSnapshot} value={entry} onChange={setEntry} label={`Quantity for ${snack.name}`} /><button disabled={saving} onClick={() => void change()} className="rounded border px-2 py-2">Save quantity</button></> : <button disabled={saving} onClick={() => void editQuantity()} className="rounded border px-2 py-2">Edit quantity</button>}
      <button disabled={saving} onClick={() => void change(true)} className="rounded px-2 py-2 text-rose-700 dark:text-rose-300">Remove</button>
    </div>}
    {error && <p role="alert" className="mt-1 text-xs text-rose-700 dark:text-rose-300">{error}</p>}
  </div>;
}
export default function PlannerSnacks({ date, snacks, repository, error, report = false, hideHeading = false }: { date: string; snacks: readonly PlannedSnack[]; repository?: ReturnType<typeof foodAccount> | null; error?: string; report?: boolean; hideHeading?: boolean }) {
  const selected = snacks.filter(s => s.planned_on === date);
  return <section aria-label="Snacks" className="rounded-2xl bg-white dark:bg-slate-800 p-3 text-left text-slate-900 dark:text-slate-100">
    {!hideHeading && <h3 className="text-sm font-extrabold">Snacks</h3>}
    {error && <p role="alert" className="mt-1 text-xs text-rose-700 dark:text-rose-300">{error} Totals may be incomplete.</p>}
    {selected.map(snack => <SnackRow key={`${snack.id}:${snack.quantity}`} snack={snack} repository={report ? null : repository} />)}
    {!selected.length && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">No snacks planned.</p>}
    {!report && <Link href="/FoodCheck" className="mt-2 inline-block text-xs font-bold text-orange-700 dark:text-orange-300 underline">Add food from Food Check</Link>}
  </section>;
}
