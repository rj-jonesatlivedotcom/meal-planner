import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] px-5 py-8 text-[#2f3a32]">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-[#58735d] hover:underline"
        >
          ← Back to Family Meal Planner
        </Link>

        <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Why Family Meal Planner exists
          </h1>

          <p className="mb-6 leading-7">
            Planning meals can be difficult for anyone, but for someone on
            dialysis it can be particularly challenging. There can be a lot of{" "}
            <strong>dietary restrictions</strong> to think about when deciding
            what to cook. 🤔
          </p>

          <p className="mb-6 leading-7">
            Trying to work out whether a meal is suitable — while also making
            sure it&apos;s something the whole family will actually enjoy —
            can make the weekly shop something you dread. 😩
          </p>

          <p className="mb-6 leading-7">
            <strong>That&apos;s why I created Family Meal Planner.</strong>
          </p>

          <p className="mb-6 leading-7">
            <strong>
              The aim is to make planning family meals and doing the weekly shop
              easier. 😊
            </strong>
          </p>

          <p className="mb-6 leading-7">
            Each recipe provides information about its{" "}
            <strong>potassium, phosphate</strong> and{" "}
            <strong>purine</strong> levels, allowing you to consider the
            nutritional suitability of a meal{" "}
            <strong>before deciding what to cook</strong>.
          </p>

          <p className="mb-8 leading-7">
            The meals are designed to be generally{" "}
            <strong>kidney-conscious family meals</strong>, rather than
            separate &quot;dialysis food&quot; that the rest of the family has
            to eat.
          </p>

          <hr className="my-8 border-[#e4e9e2]" />

          <h2 className="mb-4 text-2xl font-bold">The idea</h2>

          <div className="mb-6 rounded-2xl bg-[#f4f7f2] p-5">
            <p className="text-lg font-semibold leading-8">
              Browse the meals → check the nutritional information → choose your
              meals → generate your shopping list.
            </p>
          </div>

          <p className="mb-6 leading-7">
            Once you&apos;ve chosen your meals, the planner automatically
            creates a shopping list containing the ingredients you need.
          </p>

          <p className="mb-8 leading-7">
            It&apos;s simply a tool to make the everyday job of{" "}
            <strong>
              thinking about meals, checking their nutritional information,
              planning them and doing the shopping
            </strong>{" "}
            a little easier.
          </p>

          <p className="mb-8 leading-7">
            It started as something I needed for{" "}
            <strong>my own family</strong>. Now I&apos;m building it into
            something that might help other families in the same situation too.
          </p>

          <hr className="my-8 border-[#e4e9e2]" />

          <h2 className="mb-4 text-2xl font-bold">Dietary information</h2>

          <p className="text-sm leading-6 text-[#5d665f]">
            The nutritional information on this website is provided for
            planning purposes and is not medical or dietary advice. Renal
            dietary requirements can vary from person to person. If you are on
            dialysis or have other specific dietary requirements, please follow
            the advice given by your healthcare team or renal dietitian.
          </p>
        </section>
      </div>
    </main>
  );
}