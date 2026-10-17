"use client";

import { useRef, useState } from "react";
import { requireMonday, type WeeklyPlan } from "@/lib/weeklyPlans";

export function MigrationFeedback({ status, message }: {
  status: "idle" | "working" | "success" | "error"; message: string;
}) {
  if (status === "idle") return null;
  return <p role={status === "error" ? "alert" : "status"} aria-live="polite"
    className={`mt-3 text-sm ${status === "error" ? "text-red-800" : "text-slate-700"}`}>{message}</p>;
}

/** Not mounted on operational pages. Dates are explicitly chosen, never inferred. */
export function LegacyWeekAssignment({ onImport }: { onImport: (monday: string) => Promise<void> }) {
  const [week, setWeek] = useState("");
  const [feedback, setFeedback] = useState<{ status: "idle" | "working" | "success" | "error"; message: string }>({ status: "idle", message: "" });
  const busy = useRef(false);
  return <section aria-label="Assign existing plan to a week" className="rounded-xl border border-slate-200 p-4">
    <h2 className="font-bold text-slate-900">Choose a week for your existing plan</h2>
    <p className="mt-2 text-sm text-slate-600">Your old plan has no saved date. Choose its Monday. An existing dated plan will not be overwritten.</p>
    <form onSubmit={async event => {
      event.preventDefault();
      if (busy.current) return;
      try {
        requireMonday(week); busy.current = true;
        setFeedback({ status: "working", message: "Preserving the original and importing this week…" });
        await onImport(week);
        setFeedback({ status: "success", message: "Plan imported. The original has been preserved." });
      } catch (error) {
        setFeedback({ status: "error", message: error instanceof Error ? error.message : "Import failed. Keep the original and retry after review." });
      } finally { busy.current = false; }
    }}>
      <label className="mt-3 block text-sm font-semibold">Week beginning (Monday)
        <input type="date" required value={week} disabled={feedback.status === "working"}
          onChange={event => { setWeek(event.target.value); setFeedback({ status: "idle", message: "" }); }}
          className="mt-1 block rounded-lg border border-slate-300 p-2" />
      </label>
      <button type="submit" disabled={feedback.status === "working" || feedback.status === "success"}
        className="mt-3 rounded-lg bg-sky-100 px-4 py-2 font-semibold text-sky-950 disabled:opacity-50">Import existing plan</button>
    </form>
    <MigrationFeedback {...feedback} />
  </section>;
}

/** Caller must key this control by owner/week/review revision so a changed review
 * replaces the control. Both versions are shown; nothing resolves on mounting.
 */
export function WeekConflictReview({ local, remote, reviewedLocalRaw, onResolve }: {
  local: WeeklyPlan; remote: WeeklyPlan | null; reviewedLocalRaw?: string | null;
  onResolve: (choice: WeeklyPlan | null, revision: number | null, raw?: string | null) => Promise<void>;
}) {
  const [feedback, setFeedback] = useState<{ status: "idle" | "working" | "success" | "error"; message: string }>({ status: "idle", message: "" });
  const busy = useRef(false);
  if (remote && (remote.weekStart !== local.weekStart || remote.owner.id !== local.owner.id || remote.owner.kind !== local.owner.kind)) {
    return <MigrationFeedback status="error" message="The account or week does not match. Reload this review." />;
  }
  async function resolve(choice: WeeklyPlan | null) {
    if (busy.current) return;
    busy.current = true;
    try {
      setFeedback({ status: "working", message: "Checking the reviewed version and preserving both drafts…" });
      await onResolve(choice, remote?.baseRevision ?? null, reviewedLocalRaw);
      setFeedback({ status: "success", message: "Conflict resolved. The previous drafts remain recoverable." });
    } catch (error) {
      setFeedback({ status: "error", message: error instanceof Error ? error.message : "The plan changed again. Reload the review." });
    } finally { busy.current = false; }
  }
  const disabled = feedback.status === "working" || feedback.status === "success";
  return <section aria-label="Review conflicting week" className="rounded-xl border border-slate-200 p-4">
    <h2 className="font-bold text-slate-900">Review changes for {local.weekStart}</h2>
    <p className="mt-2 text-sm text-slate-600">Choose the version to continue with. Both drafts will be preserved before your choice is applied.</p>
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      {[{ label: "Your local draft", plan: local }, { label: "Saved account version", plan: remote }].map(({ label, plan }) =>
        <details key={label} open className="min-w-0 rounded-lg bg-slate-50 p-3"><summary className="font-semibold">{label}</summary>
          <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap break-words text-xs">{plan ? JSON.stringify({ meals: plan.planner, people: plan.mealPeople, householdPeople: plan.householdPeople, checkedItems: plan.shopping.checkedItems }, null, 2) : "No saved account week"}</pre>
        </details>)}
    </div>
    <div className="mt-3 flex flex-wrap gap-3">
      <button disabled={disabled} onClick={() => void resolve(local)} className="rounded-lg bg-sky-100 px-3 py-2 font-semibold text-sky-950 disabled:opacity-50">Keep my local changes</button>
      <button disabled={disabled} onClick={() => void resolve(null)} className="rounded-lg border border-slate-300 px-3 py-2 font-semibold disabled:opacity-50">Use saved account version</button>
    </div>
    <MigrationFeedback {...feedback} />
  </section>;
}
