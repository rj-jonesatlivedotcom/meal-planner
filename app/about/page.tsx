import Link from "next/link";
import RenalPlan from "@/components/RenalPlan";

export default function About() {
  return (
    <main className="about-page min-h-screen bg-white text-slate-900">
      <p className="mx-auto max-w-6xl px-6 pt-4 text-sm"><Link href="/saved-meals/recovery" className="font-semibold text-green-700 underline">Recover saved meals</Link></p>

      <style>{`
        /* About page dark mode — RenalPlan uses html[data-theme="dark"], not Tailwind's .dark class. */
        html[data-theme="dark"] .about-page {
          background: var(--background) !important;
          color: var(--foreground) !important;
        }

        html[data-theme="dark"] .about-page > section {
          background: linear-gradient(to bottom, #101820, #122b24) !important;
        }

        html[data-theme="dark"] .about-page .bg-green-50 {
          background-color: #163126 !important;
        }

        html[data-theme="dark"] .about-page .bg-orange-50 {
          background-color: #35291d !important;
        }

        html[data-theme="dark"] .about-page .bg-slate-50 {
          background-color: #202e3a !important;
        }

        html[data-theme="dark"] .about-page .bg-amber-50 {
          background-color: #403719 !important;
        }

        html[data-theme="dark"] .about-page .bg-red-50 {
          background-color: #401f24 !important;
        }

        html[data-theme="dark"] .about-page .border-green-100 {
          border-color: #285743 !important;
        }

        html[data-theme="dark"] .about-page .text-slate-900,
        html[data-theme="dark"] .about-page .text-slate-800 {
          color: #edf2f7 !important;
        }

        html[data-theme="dark"] .about-page .text-slate-700,
        html[data-theme="dark"] .about-page .text-slate-600 {
          color: #c0ccd6 !important;
        }

        html[data-theme="dark"] .about-page .text-slate-500 {
          color: #aebbc7 !important;
        }

        html[data-theme="dark"] .about-page .text-green-700 {
          color: #86efac !important;
        }

        html[data-theme="dark"] .about-page .hover\\:text-green-900:hover {
          color: #bbf7d0 !important;
        }
      `}</style>
      <section className="bg-gradient-to-b from-white to-green-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[1240px]">

          {/* BACK LINK */}
          <Link
            href="/"
            className="text-lg font-semibold text-green-700"
          >
            ← Back to <RenalPlan />
          </Link>

          {/* PAGE TITLE */}
          <div className="mt-8 mb-2 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              About <RenalPlan />
            </h1>
          </div>

          {/* WHY IT WAS CREATED */}
          <section className="mt-6 rounded-3xl border border-green-100 bg-green-50 p-6 shadow-sm sm:p-8">
            <p className="text-lg leading-relaxed text-slate-800">
              <RenalPlan /> was created by Richard Jones, a dialysis patient
              diagnosed with chronic kidney disease (CKD). Following his
              diagnosis, Richard was handed various printouts about salt,
              potassium and phosphate, and sent on his way with little
              understanding of how to shop for food or prepare meals that would
              satisfy the seemingly conflicting dietary advice. The information
              left him struggling to work out what he could eat, leading to
              confusion, frustration and, at times, a feeling of hopelessness.
            </p>

            <p className="mt-3 text-lg leading-relaxed text-slate-800">
              Determined to find a way to feed himself and his family healthily,
              while keeping within budget, Richard realised he needed a practical
              system of his own. <RenalPlan /> evolved from what began as a
              simple family spreadsheet into a tool designed to make food
              choices and weekly meal planning easier.
            </p>

            <p className="mt-3 text-lg leading-relaxed text-slate-800">
              The idea was simple: make the process easier for others, too. By
              bringing nutritious recipes, weekly meal planning and an automatic
              shopping list together in one place, <RenalPlan /> aims to help
              people facing similar challenges plan meals for themselves and
              their families with greater confidence.
            </p>
          </section>

          {/* NUTRITION SOURCES AND METHODOLOGY */}
          <section id="nutrition-sources-methodology" className="mt-6 scroll-mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8" aria-labelledby="nutrition-methodology-heading">
            <h2 id="nutrition-methodology-heading" className="text-2xl font-bold">Nutrition Sources &amp; Methodology</h2>
            <div className="mt-5 space-y-5 text-base leading-7 text-slate-700">
              <div>
                <h3 className="text-lg font-bold">Food composition sources</h3>
                <p className="mt-2">The principal source is McCance and Widdowson&apos;s <a className="font-semibold text-green-700 underline" href="https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid" target="_blank" rel="noreferrer">Composition of Foods Integrated Dataset (CoFID) 2021</a>. Selected gaps are supplemented with identified records from the historical <a className="font-semibold text-green-700 underline" href="https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28asc.zip">USDA Standard Reference 28 dataset</a>.</p>
                <p className="mt-2">The lemongrass and galangal calculations also use fresh-weight composition from Table S5 of <a className="font-semibold text-green-700 underline" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10189170/" target="_blank" rel="noreferrer">Suttisansanee and colleagues, Heliyon (2023)</a>. The recipe calculation records identify the food matches, source cells and any conversions used.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">Quantities and servings</h3>
                <p className="mt-2">Each ingredient&apos;s nutrient values per 100 g or 100 ml are scaled to its listed quantity, added together and divided by the recipe&apos;s serving count. Raw, cooked and drained weights follow the ingredient descriptions. Household measures use recorded weight conversions where needed. Totals are rounded for display after summing the ingredient contributions.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">Estimates and preparation</h3>
                <p className="mt-2">The figures are ingredient-based estimates. Brands, edible portions and cooking methods can differ from the matched food records. Cooking-water losses, oil left in the pan and changes in cooked weight are only reflected where the calculation has a recorded basis for them. A preparation tip in a Dietary Guide does not itself alter the nutrition figures.</p>
                <p className="mt-2">Source-reported zeros, trace entries and missing values are kept distinct. Missing nutrients display as unavailable and are excluded from target assessments. Source-match assumptions and estimated quantity conversions remain in each recipe&apos;s nutrition details. Countable fluid follows the recorded liquid or semi-liquid allowance; ingredient water is not used as a measured final broth volume.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">Recipe calculation details</h3>
                <p className="mt-2">These calculation records show the ingredients, quantities and sources used for the following recipes:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li><a className="text-green-700 underline" href="/evidence/nutrition/L061.json" download>Lemongrass chicken noodle salad</a></li>
                  <li><a className="text-green-700 underline" href="/evidence/nutrition/L062.json" download>Bánh mì-inspired chicken baguette</a></li>
                  <li><a className="text-green-700 underline" href="/evidence/nutrition/D069.json" download>Chicken teriyaki-style rice bowl</a></li>
                  <li><a className="text-green-700 underline" href="/evidence/nutrition/D071.json" download>Red-curry-style chicken with rice</a></li>
                  <li><a className="text-green-700 underline" href="/evidence/nutrition/D072.json" download>Lemongrass pork with rice noodles</a></li>
                  <li><a className="text-green-700 underline" href="/evidence/nutrition/D073.json" download>Chicken laksa-inspired noodle bowl</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
              <h3 className="text-xl font-bold text-slate-900">
                Understanding your nutrition results
              </h3>
              <p className="mt-2 text-base leading-7 text-slate-700">
                <RenalPlan /> compares your planned nutrition with the goals
                and limits set in <strong>My Diet</strong>. The colours help
                you see at a glance how your plan compares with those personal
                targets:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-4">
                  <p className="font-bold text-green-700">🟢 Green — on target</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    Your result is within the target set for that nutrient.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4">
                  <p className="font-bold text-red-700">🔴 Red — over target</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    Your result is above the target or limit set for that
                    nutrient.
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                These colours relate to your own settings, not a universal
                renal diet. Check that your targets reflect the advice from
                your renal team or dietitian.
              </p>
            </div>
          </section>

          {/* DIETARY GUIDANCE */}
          <section className="mt-6 rounded-3xl bg-orange-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">
              Dietary guidance
            </h2>

            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Some recipes include additional preparation guidance in the
              Dietary Guide. This is separate from the calculated nutrient
              figures.
            </p>

            <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-base leading-7 text-slate-700">
                <strong>Example:</strong> potatoes should be peeled, cut into
                pieces, boiled and the cooking water discarded when following
                a lower-potassium preparation method.
              </p>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Recipe-specific guidance is included where it is relevant to the
              ingredients or preparation method. It does not change the
              calculated nutrient values for the recipe.
            </p>
          </section>

          {/* IMPORTANT NOTE */}
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">
              A note about individual dietary needs
            </h2>

            <p className="mt-2 text-base leading-relaxed text-slate-700">
              Dietary needs can vary from person to person. There is no single
              &quot;renal diet&quot; that is appropriate for everyone. Your
              requirements may depend on factors including kidney function,
              dialysis treatment, blood results and advice from your renal
              team.
            </p>

            <p className="mt-3 text-base leading-relaxed text-slate-700">
              <RenalPlan /> is intended as a practical planning aid and does
              not replace advice from your renal team or dietitian.
            </p>
          </section>

          {/* BACK BUTTON */}
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-block rounded-2xl bg-green-700 px-8 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-green-800"
            >
              Back to <RenalPlan />
            </Link>
          </div>

          {/* VERSION */}
          <div className="mt-6 text-right text-sm text-slate-500">
            Version 3.2.0
          </div>

        </div>
      </section>
    </main>
  );
}
