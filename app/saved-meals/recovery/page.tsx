"use client";

import Link from "next/link";
import { datedPlannerEnabled } from "@/lib/supabase/config";

export default function SavedMealsRecoveryPage() {
  return <main className="mx-auto max-w-4xl px-4 py-6 text-slate-900 dark:text-slate-100">
    <h1 className="text-2xl font-bold">Recover saved meals</h1>
    <p className="mt-3">Your original plans and saved changes are kept. Use the week arrows to find a week, then review any available saved changes before applying them.</p>
    {!datedPlannerEnabled() && <p className="mt-3">Weekly recovery is not enabled here. Your existing meal plan remains available in the Planner.</p>}
    <Link href="/planner" className="mt-5 inline-block rounded-lg border px-4 py-2 font-semibold">Return to Planner</Link>
  </main>;
}
