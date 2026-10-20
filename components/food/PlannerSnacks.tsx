"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { initialQuantityEntry, snapshotForEntry, snackQuantityLabel, snackNutrients, type PlannedSnack } from "@/lib/foodSnacks";
import QuantityFields from "./QuantityFields";
import { barcodePortion } from "@/app/FoodCheck/barcodePortions";
import type { foodAccount } from "@/lib/foodAccount";
import { notifyFoodAccount } from "@/lib/useFoodAccount";

export const mobileMealCardClass = "relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 ring-1 ring-orange-100";
export const mobileMealHeadingClass = "min-w-0 text-lg font-bold leading-none text-slate-800";

export function SnackValues({ snack, keys = snackNutrients }: { snack: PlannedSnack; keys?: readonly typeof snackNutrients[number][] }) {
  return <dl className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700 dark:text-slate-200">
    {keys.map(key => {
      const nutrient = snack.snapshot.nutrients[key];
      const displayValue = nutrient.value === null ? null : key === "calories" ? Math.round(nutrient.value) : nutrient.kind === "estimated" && ["potassium", "phosphate"].includes(key)
        ? nutrient.value > 0 && nutrient.value < 1 ? Number(nutrient.value.toPrecision(1)) : Math.round(nutrient.value)
        : Math.round(nutrient.value * 10) / 10;
      return <div key={key}><dt className="inline">{key === "phosphate" ? "Phosphorus" : key === "calories" ? "Energy" : key.charAt(0).toUpperCase() + key.slice(1)}: </dt><dd className="inline font-semibold">{displayValue === null ? "Not available" : `${displayValue} ${key === "calories" ? "kcal" : ["sodium", "potassium", "phosphate"].includes(key) ? "mg" : "g"}`}{nutrient.kind === "estimated" && <span className="ml-1 font-bold text-amber-800 dark:text-amber-300">*</span>}</dd></div>;
    })}
  </dl>;
}
function SnackRow({ snack, repository, compact = false, mobile = false }: { snack: PlannedSnack; repository?: ReturnType<typeof foodAccount> | null; compact?: boolean; mobile?: boolean }) {
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
  if (compact) return <div className="min-w-0">
    <div className="flex min-w-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
      <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm dark:bg-amber-900/40">🍽️</span>
      <span className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-800 dark:text-slate-100" title={snack.name}>{snack.name}</span>
      {repository && <button type="button" disabled={saving} onClick={() => void change(true)} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600" aria-label={`Remove ${snack.name}`} title={`Remove ${snack.name}`}>×</button>}
    </div>
    {error && <p role="alert" className="mt-1 text-xs text-rose-700 dark:text-rose-300">{error}</p>}
  </div>;
  return <div className={mobile ? "min-w-0 space-y-2 border-t border-orange-100 pt-3" : "my-2 min-w-0 rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-900/40"}>
    <p className={mobile ? "break-words text-base font-medium leading-5 text-slate-900" : "break-words text-sm font-bold text-slate-900 dark:text-slate-100"}>{snack.name}</p>
    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">{snackQuantityLabel(snack)} · planned</p>
    <dl className="mt-2 grid grid-cols-3 gap-2 text-xs">
      {(["calories", "potassium", "phosphate"] as const).map(key => {
        const n = snack.snapshot.nutrients[key];
        const value = n.value === null ? "Not available" : `${n.value > 0 && n.value < 1 ? Number(n.value.toPrecision(1)) : Math.round(n.value)} ${key === "calories" ? "kcal" : "mg"}`;
        return <div key={key} className="min-w-0"><dt className="whitespace-nowrap text-[10px] text-slate-500 dark:text-slate-400">{key === "calories" ? "Energy" : key === "potassium" ? "Potassium" : "Phosphorus"}</dt><dd className="mt-0.5 font-bold text-slate-900 dark:text-slate-100">{value}{n.kind === "estimated" ? "*" : ""}</dd></div>;
      })}
    </dl>
    <details className="mt-2 text-xs text-slate-600 dark:text-slate-300"><summary className="cursor-pointer font-semibold">View nutrition</summary>
      <SnackValues snack={snack} keys={["protein", "carbohydrates", "fat", "fibre", "sodium"]} />
    </details>
    {repository && <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
      {editing ? <><QuantityFields snapshot={unitSnapshot} value={entry} onChange={setEntry} label={`Quantity for ${snack.name}`} /><button disabled={saving} onClick={() => void change()} className="rounded border px-2 py-2">Save quantity</button></> : <button disabled={saving} onClick={() => void editQuantity()} className="rounded border px-2 py-2">Edit quantity</button>}
      <button disabled={saving} onClick={() => void change(true)} className="rounded px-2 py-2 text-rose-700 dark:text-rose-300">Remove</button>
    </div>}
    {error && <p role="alert" className="mt-1 text-xs text-rose-700 dark:text-rose-300">{error}</p>}
  </div>;
}
export default function PlannerSnacks({ date, snacks, repository, error, report = false, hideHeading = false, compact = false, mobile = false }: { date: string; snacks: readonly PlannedSnack[]; repository?: ReturnType<typeof foodAccount> | null; error?: string; report?: boolean; hideHeading?: boolean; compact?: boolean; mobile?: boolean }) {
  const selected = snacks.filter(s => s.planned_on === date);
  if (mobile) return <section aria-label="Snacks" className="min-w-0 text-left">
    {selected.length ? <div className={mobileMealCardClass}>
      <div className="min-w-0 space-y-3 p-3">
        <h3 className={mobileMealHeadingClass}>Snacks</h3>
        {selected.map(snack => <SnackRow key={`${snack.id}:${snack.quantity}`} snack={snack} repository={report ? null : repository} mobile />)}
        {!report && <Link href="/FoodCheck" className="inline-flex min-h-8 items-center text-xs font-bold text-orange-700 underline">+ Add snack</Link>}
      </div>
    </div> : <Link href="/FoodCheck" className="planner-empty-slot planner-mobile-empty group transition hover:border-orange-400">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-2xl text-orange-600 shadow-sm transition group-hover:scale-105">+</span>
      <span className="planner-mobile-empty-copy"><strong>Add snacks</strong><span>No snacks planned. Add food from Food Check</span></span>
      <svg viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m3 3 7 7-7 7" /></svg>
    </Link>}
    {error && <p role="alert" className="mt-1 text-xs text-rose-700 dark:text-rose-300">{error} Totals may be incomplete.</p>}
  </section>;
  return <section aria-label="Snacks" className={compact ? "min-w-0 space-y-2 p-2 text-left" : "rounded-2xl bg-white dark:bg-slate-800 p-3 text-left text-slate-900 dark:text-slate-100"}>
    {!hideHeading && <h3 className="text-sm font-extrabold">Snacks</h3>}
    {error && <p role="alert" className="mt-1 text-xs text-rose-700 dark:text-rose-300">{error} Totals may be incomplete.</p>}
    {selected.map(snack => <SnackRow key={`${snack.id}:${snack.quantity}`} snack={snack} repository={report ? null : repository} compact={compact} />)}
    {!selected.length && !compact && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">No snacks planned.</p>}
    {!report && <Link href="/FoodCheck" className={compact ? "flex min-h-8 items-center gap-1 rounded-lg px-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-900/20" : "mt-2 inline-block text-xs font-bold text-orange-700 dark:text-orange-300 underline"}>{compact ? "+ Add snack" : "Add food from Food Check"}</Link>}
  </section>;
}
