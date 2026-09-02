import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      <section className="bg-gradient-to-b from-white to-green-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[1320px]">

          {/* BACK LINK */}
          <Link
            href="/"
            className="text-lg font-semibold text-green-700"
          >
            ← Back to Meal Planner
          </Link>


          {/* PAGE TITLE */}
          <div className="mt-8 text-center">

            <h1 className="text-5xl font-extrabold tracking-tight">
              About Meal Planner
            </h1>

          </div>


          {/* WHY IT WAS CREATED */}
          <section className="mt-10 rounded-3xl bg-green-50 p-6 shadow-sm sm:p-8">

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


          {/* DIETARY NOTE */}
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-xl font-bold">
              A note about dietary needs
            </h2>

            <p className="mt-2 text-base leading-relaxed text-slate-700">
              Dietary needs can vary from person to person. Meal Planner is
              intended as a practical planning aid and does not replace
              advice from your renal team or dietitian.
            </p>

          </section>


          {/* BACK BUTTON */}
          <div className="mt-10 text-center">

            <Link
              href="/"
              className="inline-block rounded-2xl bg-green-700 px-8 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-green-800"
            >
              Back to Meal Planner
            </Link>

          </div>


          {/* VERSION */}
          <div className="mt-6 text-right text-sm text-slate-500">
            Version 2.1.1

          </div>

        </div>
      </section>

    </main>
  );
}