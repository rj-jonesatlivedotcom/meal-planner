"use client";
import { displayQuantity, quantityEquivalent, type FoodSnapshot, type QuantityEntry } from "@/lib/foodSnacks";

export default function QuantityFields({ snapshot, value, onChange, label = "Quantity", showSource = false }: {
  snapshot: FoodSnapshot; value: QuantityEntry; onChange: (value: QuantityEntry) => void; label?: string; showSource?: boolean;
}) {
  let equivalent: number | null = null;
  try { equivalent = quantityEquivalent(snapshot, value); } catch { /* An unfinished entry is not a zero amount. */ }
  const natural = snapshot.naturalUnit;
  return <div className="min-w-0">
    <div className="flex flex-wrap items-end gap-2">
      <label className="max-w-full text-sm">{label}<input aria-label={label} type="number" min="0.01" max="100000" step={value.unit === snapshot.unit || value.unit === "tins" ? "any" : "1"}
        value={value.amount ? displayQuantity(value.amount) : ""} onChange={e => onChange({ ...value, amount: Number(e.target.value) })}
        className="mt-1 block w-24 max-w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" /></label>
      <label className="max-w-full text-sm">Unit<select aria-label={`${label} unit`} value={value.unit} onChange={e => {
        const unit = e.target.value;
        const amount = equivalent === null ? value.amount : unit === snapshot.unit ? equivalent : equivalent / natural!.amount;
        onChange({ amount, unit });
      }} className="mt-1 block max-w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
        {natural && <option value={natural.unit}>{natural.unit}{natural.approximate ? " (approx.)" : ""}</option>}
        <option value={snapshot.unit}>{snapshot.unit === "g" ? "grams" : "millilitres"}</option>
      </select></label>
      {equivalent !== null && <output aria-live="polite" className="pb-2 text-sm text-slate-700 dark:text-slate-200">{value.unit !== snapshot.unit && natural?.approximate ? "Approximately " : ""}{Number(equivalent.toFixed(2))}{snapshot.unit}</output>}
    </div>
    {showSource && natural && value.unit !== snapshot.unit && <p className="mt-1 break-words text-xs text-slate-500 dark:text-slate-400">{natural.source}</p>}
    {!natural && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">An individual item weight is unavailable. Enter {snapshot.unit === "g" ? "grams" : "millilitres"} from the pack.</p>}
  </div>;
}
