import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      <section className="bg-gradient-to-b from-white to-green-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-4xl">

          <Link
            href="/"
            className="text-lg font-semibold text-green-700"
          >
            ← Back to Meal Planner
          </Link>

          <div className="mt-8 text-center">

            <h1 className="text-5xl font-extrabold tracking-tight">
              About Meal Planner
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-slate-700">
              Meal Planner is designed to make planning and preparing
              kidney-friendly meals simpler, more practical and less stressful.
            </p>

          </div>

          <div className="mt-10 space-y-6">

            <section className="rounded-3xl bg-green-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">
                Why Meal Planner was created
              </h2>

              <p className="mt-3 text-lg leading-relaxed text-slate-800">
                Meal Planner was created by Richard Jones, a dialysis patient
                who found that planning a weekly food shop could be surprisingly
                difficult. Finding meals that fitted the dietary restrictions
                of a kidney-friendly diet, while also finding food that the
                whole family could enjoy, often meant spending a lot of time
                checking ingredients and working out what to buy.
              </p>

              <p className="mt-3 text-lg leading-relaxed text-slate-800">
                The idea behind Meal Planner is simple: make that process
                easier. By bringing recipes, weekly meal planning and shopping
                together in one place, the aim is to make it easier to plan
                meals that fit the dietary requirements without having to
                prepare a completely separate menu for the rest of the family.
              </p>
            </section>

            <section className="rounded-3xl bg-blue-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">
                What is Meal Planner?
              </h2>

              <p className="mt-3 text-lg leading-relaxed text-slate-800">
                Meal Planner brings recipes, meal planning and shopping
                together in one simple place, helping you decide what to
                eat and what you need to buy.
              </p>
            </section>

            <section className="rounded-3xl bg-orange-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">
                Our aim
              </h2>

              <p className="mt-3 text-lg leading-relaxed text-slate-800">
                Keep meal planning straightforward, practical and easy to
                use — so you can spend less time worrying about what to cook
                and more time enjoying your food with the people around you.
              </p>
            </section>

            <section className="rounded-3xl bg-purple-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">
                A practical approach
              </h2>

              <p className="mt-3 text-lg leading-relaxed text-slate-800">
                Meal Planner is built around everyday food and realistic
                family meals. The goal is not to make food complicated, but
                to provide useful recipes and planning tools that can help
                make the weekly shop and meal planning a little easier.
              </p>

              <p className="mt-3 text-lg leading-relaxed text-slate-800">
                Dietary needs can vary from person to person, so Meal Planner
                is intended as a practical planning aid rather than a
                substitute for advice from your renal team or dietitian.
              </p>
            </section>

          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-block rounded-2xl bg-green-700 px-8 py-4 text-lg font-bold text-white shadow-sm"
            >
              Back to Meal Planner
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}