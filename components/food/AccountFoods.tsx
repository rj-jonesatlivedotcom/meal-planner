"use client";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { foodAccount } from "@/lib/foodAccount";
import { localFoodDate, initialQuantityEntry, snapshotForEntry, type FoodSnapshot, type SavedFood } from "@/lib/foodSnacks";
import QuantityFields from "./QuantityFields";
import foodActionStyles from "./FoodActions.module.css";
import resultStyles from "./FoodResult.module.css";
import { notifyFoodAccount, type useFoodAccount } from "@/lib/useFoodAccount";
type Account = ReturnType<typeof useFoodAccount>;

export function MyFoods({ account, onOpen }: { account: Account; onOpen: (barcode: string, add: boolean) => void }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  async function change(action: "favourite" | "remove" | "clear", food?: SavedFood) {
    if (!account.repository || busy) return;
    setBusy(true);
    try { await account.repository.library(action, food?.barcode, food?.name, food ? !food.favourite : undefined); notifyFoodAccount(); setMessage(""); }
    catch { setMessage("Unable to update My Foods. Please try again."); }
    finally { setBusy(false); }
  }
  const favourites = account.foods.filter(f => f.favourite);
  const recent = account.foods.filter(f => f.last_scanned_at).slice(0, 30);
  function visibleFoods(foods: SavedFood[]) {
    const query = search.trim().toLocaleLowerCase();
    const scannedAt = (food: SavedFood) => Date.parse(food.last_scanned_at ?? "") || 0;
    return foods.filter(food => `${food.name} ${food.barcode}`.toLocaleLowerCase().includes(query))
      .sort((a, b) => {
        const byName = a.name.localeCompare(b.name, "en", { sensitivity: "base", numeric: true });
        if (sort === "name-asc") return byName;
        if (sort === "name-desc") return -byName;
        return (sort === "oldest" ? scannedAt(a) - scannedAt(b) : scannedAt(b) - scannedAt(a)) || byName;
      });
  }
  const shownFavourites = visibleFoods(favourites);
  const shownRecent = visibleFoods(recent);
  function row(food: SavedFood) {
    return <li key={food.barcode} className="flex flex-wrap items-center gap-2 border-t border-slate-100 dark:border-slate-700 py-2 text-sm">
      <button type="button" className="min-w-0 flex-1 text-left font-semibold text-slate-900 dark:text-slate-100" onClick={() => onOpen(food.barcode, false)}>{food.name}</button>
      <button type="button" disabled={busy} aria-label={`${food.favourite ? "Unfavourite" : "Favourite"} ${food.name}`} aria-pressed={food.favourite} onClick={() => void change("favourite", food)} className="rounded-lg border px-2 py-2">{food.favourite ? "★" : "☆"}</button>
      <button type="button" className="rounded-lg border px-2 py-2 font-semibold" onClick={() => onOpen(food.barcode, true)}>Add to Planner</button>
      <button type="button" disabled={busy} className="rounded-lg px-2 py-2 text-rose-700 dark:text-rose-300" onClick={() => void change("remove", food)}>Remove</button>
    </li>;
  }
  return <details className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3">
    <summary className="cursor-pointer font-bold text-slate-900 dark:text-slate-100">My Foods · {favourites.length} favourites · {recent.length} recent</summary>
    {!account.owner && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Sign in to save your foods.</p>}
    {(account.error || message) && <p role="alert" className="mt-2 text-sm text-rose-700 dark:text-rose-300">{message || account.error} <button onClick={() => void account.refresh()} className="underline">Try again</button></p>}
    <div className={foodActionStyles.libraryControls}>
      <label>Search My Foods<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Food name or barcode" className={foodActionStyles.libraryField} /></label>
      <label>Sort My Foods<select value={sort} onChange={e => setSort(e.target.value)} className={foodActionStyles.libraryField}>
        <option value="recent">Most recent first</option><option value="oldest">Oldest first</option><option value="name-asc">Name A–Z</option><option value="name-desc">Name Z–A</option>
      </select></label>
    </div>
    <h3 className="mt-3 text-sm font-bold text-slate-800 dark:text-slate-200">Favourites</h3>
    {shownFavourites.length ? <ul>{shownFavourites.map(row)}</ul> : <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{favourites.length ? "No matching favourites." : "No favourites yet."}</p>}
    <div className="mt-3 flex items-center justify-between gap-2"><h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Recently scanned</h3><button type="button" disabled={busy || !recent.length} onClick={() => void change("clear")} className="text-sm underline">Clear recent history</button></div>
    {shownRecent.length ? <ul>{shownRecent.map(row)}</ul> : <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{recent.length ? "No matching recent foods." : "No recent scans."}</p>}
  </details>;
}

export function AddSnack({ owner, barcode, name, snapshot, quantity, open, onClose }: {
  owner: string; barcode: string; name: string; snapshot: FoodSnapshot; quantity: number | null; open: boolean; onClose?: () => void;
}) {
  const [date, setDate] = useState(localFoodDate);
  const [entry, setEntry] = useState(() => initialQuantityEntry(snapshot, quantity));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const busy = useRef(false), id = useRef<string | null>(null);
  if (!open) return null;
  async function save() {
    if (busy.current) return;
    busy.current = true; setSaving(true); setMessage("");
    try {
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Choose a planner date.");
      const scaled = snapshotForEntry(snapshot, entry);
      id.current ??= crypto.randomUUID();
      await foodAccount(createClient(), owner).save({ id: id.current, user_id: owner, planned_on: date, barcode, name, ...scaled });
      notifyFoodAccount(); setMessage(`Added to planned Snacks for ${date}.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to add this snack."); }
    finally { busy.current = false; setSaving(false); }
  }
  return <div className={resultStyles.plannerForm}>
    <h3><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 2v6m10-6v6M3 11h18m-13 4h3m3 0h3m-9 3h3" /></svg>Add to Planner</h3>
    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Complete product, including supplied sauce or seasoning · {snapshot.basis} · planned, not recorded as eaten.</p>
    <div className={resultStyles.plannerFields}>
      <label className="text-sm">Date<input aria-label="Snack planner date" type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block rounded-lg border bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-slate-100" /></label>
      <QuantityFields snapshot={snapshot} value={entry} onChange={setEntry} label="Quantity" />
    </div>
    <div className={resultStyles.formActions}><button type="button" disabled={saving || Boolean(message.startsWith("Added to"))} onClick={() => void save()} className={`${foodActionStyles.primary} ${resultStyles.confirm}`}>{saving ? "Adding…" : "Confirm addition"}</button>{onClose && <button type="button" disabled={saving} onClick={onClose} className="rounded-xl border px-4 py-2">Close</button>}</div>
    {message && <p role="status" className="mt-3 text-sm text-slate-700 dark:text-slate-200">{message}</p>}
  </div>;
}
