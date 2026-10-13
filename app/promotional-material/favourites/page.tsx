"use client";

import Link from "next/link";

export default function FavouritesInfoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff5f7] via-white to-white px-4 py-8 text-slate-900 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1266c3] transition hover:opacity-75">
          <span aria-hidden="true">←</span> Back to RenalPlan
        </Link>
        <section className="mt-7 overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm sm:mt-10">
          <div className="bg-gradient-to-br from-[#fff0f3] to-[#fff9fa] px-6 py-8 sm:px-10 sm:py-12">
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold tracking-wide text-rose-600">SAVE YOUR GO-TOS</span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-5xl">Keep the recipes you love close at hand</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">Found a recipe you want to make again? Favourites helps you keep your go-to meals together so they are easier to find when you plan what to eat.</p>
          </div>
          <div className="px-6 py-7 sm:px-10 sm:py-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-5"><div className="text-2xl" aria-hidden="true">♥</div><h2 className="mt-3 text-lg font-bold text-[#12396b]">Save your favourites</h2><p className="mt-2 text-sm leading-relaxed text-slate-700">Keep a personal collection of recipes you enjoy, instead of searching for them each time.</p></div>
              <div className="rounded-2xl border border-green-100 bg-green-50/60 p-5"><div className="text-2xl" aria-hidden="true">📅</div><h2 className="mt-3 text-lg font-bold text-[#12396b]">Make planning easier</h2><p className="mt-2 text-sm leading-relaxed text-slate-700">Return to trusted meal ideas when you are putting together your week.</p></div>
            </div>
            <div className="mt-7 rounded-2xl bg-slate-50 p-5 sm:p-6"><h2 className="text-xl font-extrabold text-[#12396b]">How do I get access?</h2><p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">Saving favourites is part of RenalPlan Premium. A free account gives you access to the core recipe and meal-planning experience, and lets you get started with RenalPlan. You can explore Premium when you are ready to save favourites and use other advanced features.</p></div>
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
