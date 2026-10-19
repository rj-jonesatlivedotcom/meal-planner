"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { snapshotForQuantity, snackNutrients, type PlannedSnack } from "@/lib/foodSnacks";
import type { foodAccount } from "@/lib/foodAccount";
import { notifyFoodAccount } from "@/lib/useFoodAccount";

export function SnackValues({ snack }: { snack: PlannedSnack }) {
  return <dl className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700 dark:text-slate-200">
    {snackNutrients.map(key => {
      const nutrient = snack.snapshot.nutrients[key];
      return <div key={key}><dt className="inline">{key === "phosphate" ? "Phosphorus" : key === "calories" ? "Energy" : key.charAt(0).toUpperCase() + key.slice(1)}: </dt><dd className="inline font-semibold">{nutrient.value === null ? "Not available" : `${Math.round(nutrient.value * 10) / 10} ${key === "calories" ? "kcal" : ["sodium", "potassium", "phosphate"].includes(key) ? "mg" : "g"}`}{nutrient.kind === "estimated" && <span className="ml-1 font-bold text-amber-800 dark:text-amber-300">ESTIMATE</span>}</dd></div>;
    })}
  </dl>;
}
function SnackRow({ snack, repository }: { snack: PlannedSnack; repository?: ReturnType<typeof foodAccount> | null }) {
  const [amount, setAmount] = useState(String(snack.quantity));
  const [editing, setEditing] = useState(false), [error, setError] = useState("");
  const [saving, setSaving] = useState(false), busy = useRef(false);
  async function change(remove = false) {
    if (!repository || busy.current) return;
    busy.current = true; setSaving(true);
    try {
      if (remove) await repository.remove(snack.id);
      else await repository.save({ ...snack, quantity: Number(amount), snapshot: snapshotForQuantity(snack.snapshot, Number(amount)) });
      notifyFoodAccount(); setEditing(false); setError("");
    } catch { setError("Unable to update this snack. Please try again."); }
    finally { busy.current = false; setSaving(false); }
  }
  return <div className="border-t border-slate-100 dark:border-slate-700 py-3">
    <p className="break-words text-sm font-bold text-slate-900 dark:text-slate-100">{snack.name}</p>
    <p className="text-xs text-slate-600 dark:text-slate-300">{snack.quantity}{snack.snapshot.unit} · {snack.snapshot.basis} · planned</p>
    <SnackValues snack={snack} />
    <details className="mt-2 text-xs text-slate-600 dark:text-slate-300"><summary className="cursor-pointer">Nutritional source</summary><p className="mt-1 break-words">{snack.snapshot.source}</p></details>
    {repository && <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
      {editing ? <><input aria-label={`Quantity for ${snack.name}`} type="number" min="0.01" max="100000" step="any" value={amount} onChange={e => setAmount(e.target.value)} className="w-24 rounded border bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-slate-100" /><button disabled={saving} onClick={() => void change()} className="rounded border px-2 py-2">Save quantity</button></> : <button disabled={saving} onClick={() => { setAmount(String(snack.quantity)); setEditing(true); }} className="rounded border px-2 py-2">Edit quantity</button>}
      <button disabled={saving} onClick={() => void change(true)} className="rounded px-2 py-2 text-rose-700 dark:text-rose-300">Remove</button>
    </div>}
    {error && <p role="alert" className="mt-1 text-xs text-rose-700 dark:text-rose-300">{error}</p>}
  </div>;
}
export default function PlannerSnacks({ date, snacks, repository, error, report = false }: { date: string; snacks: readonly PlannedSnack[]; repository?: ReturnType<typeof foodAccount> | null; error?: string; report?: boolean }) {
  const selected = snacks.filter(s => s.planned_on === date);
  return <section className="rounded-2xl bg-white dark:bg-slate-800 p-3 text-left text-slate-900 dark:text-slate-100">
    <h3 className="text-sm font-extrabold">Snacks</h3>
    {error && <p role="alert" className="mt-1 text-xs text-rose-700 dark:text-rose-300">{error} Totals may be incomplete.</p>}
    {selected.map(snack => <SnackRow key={`${snack.id}:${snack.quantity}`} snack={snack} repository={report ? null : repository} />)}
    {!selected.length && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">No snacks planned.</p>}
    {!report && <Link href="/FoodCheck" className="mt-2 inline-block text-xs font-bold text-orange-700 dark:text-orange-300 underline">Add food from Food Check</Link>}
  </section>;
}
