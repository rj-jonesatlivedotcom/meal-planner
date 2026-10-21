"use client";
import { useState } from "react";
import type { Requirements } from "@/lib/myDiet";
import { parseFoodList } from "@/lib/myDietOnboarding";

export default function MyAllergies({ requirements, onSave, disabled }: {
  requirements: Requirements; onSave: (next: Requirements) => Promise<boolean>; disabled?: boolean;
}) {
  const [editing, setEditing] = useState(false), [text, setText] = useState("");
  const [answer, setAnswer] = useState<"unanswered" | "none" | "listed">("unanswered");
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  async function save() {
    const foods = answer === "listed" ? parseFoodList(text) : answer === "none" ? [] : null;
    if (answer === "listed" && !foods?.length) { setError("Enter an allergy or choose another answer."); return; }
    setBusy(true); setError("");
    try { if (await onSave({ ...requirements, foodAllergies: foods })) setEditing(false); else setError("Not saved to your account. Your changes are kept here; please retry."); }
    catch { setError("Not saved to your account. Your changes are kept here; please retry."); }
    finally { setBusy(false); }
  }
  return <section aria-labelledby="my-allergies-heading" className="mt-5 rounded-2xl border border-red-200 bg-red-50/40 p-4 dark:border-red-800 dark:bg-slate-900">
    <h2 id="my-allergies-heading" className="text-xl font-extrabold text-red-800 dark:text-red-200">My Allergies</h2>
    {requirements.foodAllergies?.length ? <ul className="my-3 flex flex-wrap gap-2">{requirements.foodAllergies.map(allergy => <li key={allergy} className="rounded-full border border-red-300 bg-white px-3 py-1 text-sm font-bold text-red-800 dark:bg-slate-800 dark:text-red-200">{allergy}</li>)}</ul> : <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">No allergies recorded{requirements.foodAllergies == null ? " — not answered" : " — none reported"}.</p>}
    <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Matching recipes and uncertain ingredient compositions are excluded from MyChef. Existing planner meals are flagged, never removed.</p>
    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">Matching cannot guarantee recipe safety. Check packaging, ingredients and cross-contact information each time.</p>
    {!editing ? <button type="button" disabled={disabled} className="mt-3 min-h-11 rounded-xl border border-red-300 px-4 text-sm font-bold text-red-800 dark:text-red-200" onClick={() => {
      setText((requirements.foodAllergies ?? []).join(", ")); setAnswer(requirements.foodAllergies == null ? "unanswered" : requirements.foodAllergies.length ? "listed" : "none"); setError(""); setEditing(true);
    }}>{requirements.foodAllergies?.length ? "Edit Allergies" : "Add or edit allergies"}</button> : <div className="mt-3 space-y-3">
      <fieldset disabled={busy} className="space-y-2"><legend className="mb-2 text-sm font-bold">Your food allergies</legend>
        {([['unanswered', "I'll answer later"], ['none', 'No known food allergies'], ['listed', 'I have food allergies']] as const).map(([value,label]) => <label key={value} className="flex min-h-11 items-center gap-2 text-sm"><input type="radio" name="my-allergy-answer" checked={answer===value} onChange={() => setAnswer(value)} />{label}</label>)}
        {answer === "listed" && <label className="block text-sm font-semibold">Allergies (separate with commas or new lines)<textarea value={text} onChange={event => setText(event.target.value)} rows={2} className="mt-2 block min-h-11 w-full rounded-xl border border-red-300 bg-white p-3 text-slate-900 dark:bg-slate-800 dark:text-slate-100" /></label>}
      </fieldset>
      {error && <p role="alert" className="text-sm font-bold text-red-800 dark:text-red-200">{error}</p>}
      <div className="flex gap-2"><button type="button" disabled={busy} onClick={() => void save()} style={{ color: "white" }} className="min-h-11 rounded-xl bg-red-800 px-4 text-sm font-bold text-white">{busy ? "Saving…" : "Save allergies"}</button><button type="button" disabled={busy} onClick={() => setEditing(false)} className="min-h-11 px-4 text-sm font-bold">Cancel</button></div>
    </div>}
  </section>;
}
