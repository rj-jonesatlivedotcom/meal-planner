import Link from "next/link";
import RenalPlan from "@/components/RenalPlan";

export default function About() {
  return (
    <main className="about-page min-h-screen bg-white text-slate-900">

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

          {/* HOW NUTRITION IS CALCULATED */}
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">
              How the nutrition figures are calculated
            </h2>

            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Each <RenalPlan /> recipe is calculated for one adult serving.
              Nutrition values are calculated from the quantities of the
              ingredients used in the recipe.
            </p>

            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              The primary food-composition source used is
              McCance and Widdowson&apos;s <strong>Composition of Foods
              Integrated Dataset (CoFID) 2021</strong>. CoFID provides nutrient
              values for foods, generally expressed per 100g. The ingredient
              quantity used in each recipe is converted to the appropriate
              amount for one serving.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Where CoFID records a nutrient as a trace value or as present
              without a reliable quantitative value, that limitation is
              respected rather than replacing it with an invented figure.
            </p>

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

          {/* SOURCES */}
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">
              Sources and references
            </h2>

            <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
              <div>
                <h3 className="font-bold">
                  McCance and Widdowson&apos;s Composition of Foods Integrated
                  Dataset (CoFID) 2021
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Primary UK food-composition dataset used for the
                  ingredient-level nutrition calculations.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
                  <a
                    href="https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline underline-offset-2 hover:text-green-900"
                  >
                    CoFID 2021 dataset page ↗
                  </a>
                  <a
                    href="https://assets.publishing.service.gov.uk/media/60538e66d3bf7f03249bac58/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline underline-offset-2 hover:text-green-900"
                  >
                    CoFID 2021 user guide (PDF) ↗
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-bold">
                  British Dietetic Association — Renal Suitable menu coding
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Used as clinical context for renal menu planning and the
                  importance of estimating potassium content in dishes.
                </p>
                <a
                  href="https://www.bda.uk.com/practice-and-education/resources-for-practice/the-nutrition-and-hydration-digest/menu-coding-therapeutic-diets-and-patient-groups/therapeutic-diets.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-green-700 underline underline-offset-2 hover:text-green-900"
                >
                  BDA Therapeutic Diets — Renal Suitable ↗
                </a>
              </div>

              <div>
                <h3 className="font-bold">
                  British Dietetic Association — Nutrition analysis and food labelling
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Supporting reference for nutritional analysis and the use of
                  food-composition data when calculating nutrient values.
                </p>
                <a
                  href="https://www.bda.uk.com/practice-and-education/nutrition-and-dietetic-practice/the-nutrition-and-hydration-digest/nutrition-analysis-and-food-labelling.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-green-700 underline underline-offset-2 hover:text-green-900"
                >
                  BDA Nutrition Analysis and Food Labelling ↗
                </a>
              </div>

              <div>
                <h3 className="font-bold">
                  Kaneko et al. (2014) — Total Purine and Purine Base Content of
                  Common Foodstuffs for Facilitating Nutritional Therapy for Gout
                  and Hyperuricemia
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Primary published source used for the food-level purine
                  classification. The study measured total purine content in
                  common foodstuffs and provides the five published purine
                  categories described above.
                </p>
                <a
                  href="https://www.jstage.jst.go.jp/article/bpb/37/5/37_b13-00967/_html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-green-700 underline underline-offset-2 hover:text-green-900"
                >
                  Kaneko et al. — full study ↗
                </a>
              </div>

              <div>
                <h3 className="font-bold">
                  EMEESY renal dietetic information
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Used as supporting renal-diet guidance, including potassium
                  and phosphate food guidance and lower-potassium preparation
                  advice.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
                  <a
                    href="https://www.emeesykidney.nhs.uk/professionals/dietetic-information/114-dietetic-information/167-how-much-potassium-is-in-the-food-i-eat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline underline-offset-2 hover:text-green-900"
                  >
                    EMEESY — Potassium guidance ↗
                  </a>
                  <a
                    href="https://www.emeesykidney.nhs.uk/professionals/dietetic-information/114-dietetic-information/168-lowering-phosphate-in-diet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline underline-offset-2 hover:text-green-900"
                  >
                    EMEESY — Phosphate guidance ↗
                  </a>
                </div>
              </div>
            </div>
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
