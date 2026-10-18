"use client";

import { useRef, useState } from "react";
import { requireMonday } from "@/lib/weeklyPlans";

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
