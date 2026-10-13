"use client";

import Link from "next/link";

export default function FoodCheckInfoPage() {
  return (
    <>
      <style jsx global>{`
        html[data-theme="dark"] .food-check-page {
          background: #0b1722 !important;
          color: #edf4fa !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-panel {
          border-color: #29475c !important;
          background: #132737 !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-hero {
          background: linear-gradient(135deg, #173552 0%, #142b3d 100%) !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-hero h1 {
          color: #dbeafe !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-hero p {
          color: #cbd9e6 !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-premium {
          background: #d9ecff !important;
          color: #1266c3 !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-card {
          border-color: #315875 !important;
          background: #172f42 !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-card.green {
          border-color: #2d664b !important;
          background: #17352a !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-card h2 {
          color: #e8f2ff !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-card p {
          color: #cbd9e6 !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-access {
          background: #172b3a !important;
          border: 1px solid #29475c !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-access h2 {
          color: #e8f2ff !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-access p {
          color: #cbd9e6 !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-disclaimer {
          color: #94a9bb !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-signin {
          border-color: #3a556a !important;
          background: #172b3a !important;
          color: #dbeafe !important;
        }

        html[data-theme="dark"] .food-check-page .food-check-signin:hover {
          background: #20384a !important;
        }
      `}</style>

    <main className="food-check-page min-h-screen bg-gradient-to-b from-[#f3f9ff] via-white to-white px-4 py-8 text-slate-900 sm:px-8 sm:py-12">
      <div className="mx-auto w-full max-w-[1600px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1266c3] transition hover:opacity-75"
        >
          <span aria-hidden="true">←</span> Back to RenalPlan
        </Link>

        <section className="food-check-panel mt-7 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm sm:mt-10">
          <div className="food-check-hero bg-gradient-to-br from-[#e7f3ff] to-[#f4fbff] px-6 py-8 sm:px-10 sm:py-12">
            <span className="food-check-premium inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold tracking-wide text-[#1266c3]">
              RENALPLAN PREMIUM
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-5xl">
              Make a more informed food choice with Food Check
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Want to check an individual food before you buy it or add it to a meal?
              Food Check is designed to make food information easier to explore in one place.
            </p>
          </div>

          <div className="px-6 py-7 sm:px-10 sm:py-10">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="food-check-card rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <div className="text-2xl" aria-hidden="true">📷</div>
                <h2 className="mt-3 text-lg font-bold text-[#12396b]">Scan a barcode</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Use your phone camera to scan a food barcode and quickly find its nutritional information.
                </p>
              </div>

              <div className="food-check-card green rounded-2xl border border-green-100 bg-green-50/60 p-5">
                <div className="text-2xl" aria-hidden="true">🔢</div>
                <h2 className="mt-3 text-lg font-bold text-[#12396b]">Enter a barcode number</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Enter the barcode manually when scanning isn't practical.
                </p>
              </div>

              <div className="food-check-card rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <div className="text-2xl" aria-hidden="true">🔎</div>
                <h2 className="mt-3 text-lg font-bold text-[#12396b]">Search the food database</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Search for a food by name and explore the nutritional information available.
                </p>
              </div>
            </div>

            <div className="food-check-access mt-7 rounded-2xl bg-slate-50 p-5 sm:p-6">
              <h2 className="text-xl font-extrabold text-[#12396b]">How do I get access?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                Food Check is a Premium feature. You can create a free RenalPlan account to get full access
                to Food Check and all of the other advanced features.
              </p>
              <p className="food-check-disclaimer mt-3 text-xs leading-relaxed text-slate-500">
                RenalPlan provides food information to support your planning; it does not replace advice
                from your renal dietitian or healthcare team.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#12396b] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0d2f59]"
              >
                Create your free account <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/auth/login"
                className="food-check-signin inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-[#12396b] transition hover:bg-slate-50"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
