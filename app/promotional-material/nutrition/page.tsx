"use client";

import Link from "next/link";

export default function NutritionInfoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f2fbf6] via-white to-white px-4 py-8 text-slate-900 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#168052] transition hover:opacity-75">
          <span aria-hidden="true">←</span> Back to RenalPlan
        </Link>
        <section className="mt-7 overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm sm:mt-10">
          <div className="bg-gradient-to-br from-[#e8f8ef] to-[#f5fcf8] px-6 py-8 sm:px-10 sm:py-12">
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold tracking-wide text-[#168052]">MEASURE · PREMIUM</span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-5xl">Understand the nutrition in your week</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">The Nutrition page brings your planned meals together into a weekly overview, helping you see totals and averages rather than looking at each meal in isolation.</p>
          </div>
          <div className="px-6 py-7 sm:px-10 sm:py-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-green-100 bg-green-50/60 p-5"><div className="text-2xl" aria-hidden="true">📊</div><h2 className="mt-3 text-lg font-bold text-[#12396b]">Review weekly totals</h2><p className="mt-2 text-sm leading-relaxed text-slate-700">See weekly nutrition totals and daily averages for the meals you have planned.</p></div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5"><div className="text-2xl" aria-hidden="true">🖨️</div><h2 className="mt-3 text-lg font-bold text-[#12396b]">Keep a printable summary</h2><p className="mt-2 text-sm leading-relaxed text-slate-700">Generate a printable nutrition summary to help you review your week or discuss it with your care team.</p></div>
            </div>
            <div className="mt-7 rounded-2xl bg-slate-50 p-5 sm:p-6"><h2 className="text-xl font-extrabold text-[#12396b]">How do I get access?</h2><p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">Nutrition is part of RenalPlan Premium’s Measure experience. Start with a free account for the core recipe and meal-planning tools, then explore Premium for weekly nutrition insights and the wider personalised experience.</p><p className="mt-3 text-xs leading-relaxed text-slate-500">Nutrition summaries are planning aids, not medical advice. Follow the individual guidance provided by your renal dietitian or healthcare team.</p></div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#12396b] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0d2f59]">Create your free account <span aria-hidden="true">→</span></Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-[#12396b] transition hover:bg-slate-50">Already have an account? Sign in</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
