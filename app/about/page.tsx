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
            <img
              src="/images/sidney/sidney.png"
              alt="Sidney the Kidney"
              className="mx-auto w-48 object-contain"
            />

            <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
              About Meal Planner
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-slate-700">
              Meal Planner is designed to make planning and preparing
              kidney-friendly meals simpler.
            </p>
          </div>

          <div className="mt-10 space-y-6">

            <section className="rounded-3xl bg-green-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">
                What is Meal Planner?
              </h2>

              <p className="mt-3 text-lg leading-relaxed text-slate-800">
                Meal Planner brings recipes, meal planning and shopping
                together in one simple place, helping you decide what to
                eat and what you need to buy.
              </p>
            </section>

            <section className="rounded-3xl bg-blue-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">
                Meet Sidney
              </h2>

              <p className="mt-3 text-lg leading-relaxed text-slate-800">
                Sidney the Kidney is here to make the experience a little
                friendlier and help guide you around Meal Planner.
              </p>
            </section>

            <section className="rounded-3xl bg-orange-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">
                Our aim
              </h2>

              <p className="mt-3 text-lg leading-relaxed text-slate-800">
                Keep meal planning straightforward, practical and easy to
                use — so you can spend less time worrying about what to cook
                and more time enjoying your food.
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