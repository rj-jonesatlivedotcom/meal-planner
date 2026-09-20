import Link from "next/link";
import RenalPlan from "@/components/RenalPlan";

export default function About() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
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

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
              How <RenalPlan /> is created, how nutrition figures are
              calculated, and how the dietary guidance is presented.
            </p>
          </div>

          {/* WHY IT WAS CREATED */}
          <section className="mt-10 rounded-3xl border border-green-100 bg-green-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">
              Why <RenalPlan /> was created
            </h2>

            <p className="mt-3 text-lg leading-relaxed text-slate-800">
              <RenalPlan /> was created by Richard Jones, a dialysis patient
              who found that planning a weekly food shop could be surprisingly
              difficult. Finding meals that fitted the dietary restrictions of
              a kidney-friendly diet, while also finding food that the whole
              family could enjoy, often meant spending a lot of time checking
              ingredients and working out what to buy.
            </p>

            <p className="mt-3 text-lg leading-relaxed text-slate-800">
              The idea is simple: make that process
              easier. By bringing recipes, weekly meal planning and shopping
              together in one place, the aim is to make it easier to plan
              meals that fit the dietary requirements without having to
              prepare a completely separate menu for the rest of the family.
            </p>
          </section>

          {/* HOW NUTRITION IS CALCULATED */}
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">
              How the nutrition figures are calculated
            </h2>

            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Each <RenalPlan /> recipe is calculated for one adult serving.
              Nutrition values are calculated from the exact quantities of the
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

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Calories",
                "Protein",
                "Carbohydrates",
                "Fat",
                "Fibre",
                "Sodium",
                "Salt",
                "Potassium",
                "Phosphate",
              ].map((nutrient) => (
                <div
                  key={nutrient}
                  className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800"
                >
                  {nutrient}
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Where CoFID records a nutrient as a trace value or as present
              without a reliable quantitative value, that limitation is
              respected rather than replacing it with an invented figure.
            </p>
          </section>

          {/* POTASSIUM */}
          <section className="mt-6 rounded-3xl bg-green-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">
              Potassium
            </h2>

            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Potassium is calculated from the recipe ingredients and shown
              as the amount per serving. <RenalPlan /> then applies its own
              recipe-level traffic-light bands to help users compare meals
              when planning a week.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-2xl">🟢</div>
                <h3 className="mt-2 font-bold">Lower</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Up to 310 mg per serving
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-2xl">🟡</div>
                <h3 className="mt-2 font-bold">Moderate</h3>
                <p className="mt-1 text-sm text-slate-600">
                  311–470 mg per serving
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-2xl">🔴</div>
                <h3 className="mt-2 font-bold">Higher</h3>
                <p className="mt-1 text-sm text-slate-600">
                  More than 470 mg per serving
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              These are <strong>RenalPlan recipe-planning bands</strong>, not
              universal NHS thresholds. UK renal guidance recognises that
              potassium requirements and restrictions vary between individuals
              and that the estimated potassium content of dishes is useful
              when coding renal menus.
            </p>
          </section>

          {/* PHOSPHATE */}
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">
              Phosphate
            </h2>

            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Phosphate is calculated from the recipe ingredients and shown as
              the amount per serving. <RenalPlan /> uses the same simple
              traffic-light approach to help users see the relative phosphate
              content of meals.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-green-50 p-5">
                <div className="text-2xl">🟢</div>
                <h3 className="mt-2 font-bold">Lower</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Up to 250 mg per serving
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-5">
                <div className="text-2xl">🟡</div>
                <h3 className="mt-2 font-bold">Moderate</h3>
                <p className="mt-1 text-sm text-slate-600">
                  251–300 mg per serving
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-5">
                <div className="text-2xl">🔴</div>
                <h3 className="mt-2 font-bold">Higher</h3>
                <p className="mt-1 text-sm text-slate-600">
                  More than 300 mg per serving
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              These are <strong>RenalPlan recipe-planning bands</strong>.
              They should not be interpreted as a universal clinical
              phosphate target. Renal dietary requirements vary between
              individuals.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-5">
              <h3 className="font-bold text-slate-900">
                Phosphate and processed foods
              </h3>
              <p className="mt-2 text-base leading-7 text-slate-700">
                Phosphate occurs naturally in foods such as meat, fish, eggs
                and dairy products, but phosphate additives are also used in
                many processed foods. Added phosphate is more readily absorbed
                by the body than naturally occurring phosphate and can make a
                significant contribution to phosphate intake.
              </p>
              <p className="mt-3 text-base leading-7 text-slate-700">
                Where possible, choose fresh or minimally processed foods and
                check ingredient lists for additives containing
                <strong> &quot;phos&quot;</strong>, such as phosphates,
                diphosphates, triphosphates and polyphosphates. Your renal
                dietitian can advise you on how this fits with your individual
                dietary needs.
              </p>
            </div>
          </section>

          {/* PURINES */}
          <section className="mt-6 rounded-3xl bg-green-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">
              Purines
            </h2>

            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Purine information is provided as an <strong>additional dietary
              reference</strong> for people who may also need to manage their
              purine intake, for example those living with gout or
              hyperuricaemia. It is separate from RenalPlan&apos;s core renal
              indicators for potassium, phosphate and sodium.
            </p>

            <p className="mt-3 text-base leading-7 text-slate-700">
              Purines are naturally occurring substances found in many foods.
              When the body breaks them down, they produce uric acid. Some foods
              contain considerably more purines than others.
            </p>

            <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Our purine source
              </h3>
              <p className="mt-2 text-base leading-7 text-slate-700">
                RenalPlan uses published food-composition data from
                <strong> Kaneko et al. (2014)</strong>, who measured total
                purine and purine-base content in a wide range of common
                foodstuffs. The study was specifically undertaken to support
                nutritional therapy for gout and hyperuricaemia.
              </p>
              <a
                href="https://www.jstage.jst.go.jp/article/bpb/37/5/37_b13-00967/_html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-green-700 underline underline-offset-2 hover:text-green-900"
              >
                Kaneko et al. (2014) — published study ↗
              </a>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-2xl">🟢</div>
                <h3 className="mt-2 font-bold">Lower</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Less than 100 mg per 100g
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-2xl">🟡</div>
                <h3 className="mt-2 font-bold">Moderate</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  100–200 mg per 100g
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-2xl">🔴</div>
                <h3 className="mt-2 font-bold">Higher</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  More than 200 mg per 100g
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Kaneko et al. report five food-level categories: very low
              (&lt;50 mg/100g), low (50–100 mg/100g), moderate
              (100–200 mg/100g), high (200–300 mg/100g) and very high
              (&gt;300 mg/100g). RenalPlan combines these into three simpler
              planning bands: Lower, Moderate and Higher.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              These are <strong>RenalPlan planning bands</strong>, not clinical
              thresholds and not a recommendation that every renal patient
              should restrict purines. If you have gout, hyperuricaemia or
              another condition requiring dietary purine management, follow the
              advice provided by your healthcare professional.
            </p>
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

          {/* TRAFFIC LIGHTS */}
          <section className="mt-6 rounded-3xl bg-slate-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">
              Understanding the traffic lights
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5">
                <div className="text-3xl">🟢</div>
                <h3 className="mt-2 font-bold">Lower</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Lower relative content within the RenalPlan planning bands.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <div className="text-3xl">🟡</div>
                <h3 className="mt-2 font-bold">Moderate</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A moderate amount within the RenalPlan planning bands.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <div className="text-3xl">🔴</div>
                <h3 className="mt-2 font-bold">Higher</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A higher amount within the RenalPlan planning bands.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              The traffic lights are designed to make weekly meal planning
              easier. They are not intended to tell an individual person how
              often they should eat a particular food.
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
