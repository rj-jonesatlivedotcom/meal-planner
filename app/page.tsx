import Link from "next/link";
import HomeMenu from "@/components/HomeMenu";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* HERO */}
      <section
        className="relative min-h-[305px] overflow-hidden bg-cover bg-center pb-0 md:min-h-[350px]"
        style={{
          backgroundImage: "url('/images/background.png')",
        }}
      >

        {/* LIGHT OVERLAY FOR READABILITY */}
        <div className="absolute inset-0 bg-white/35" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto min-h-[305px] max-w-6xl px-5 pb-2 pt-10 sm:px-8 sm:pt-12 md:min-h-[350px] md:pb-10 md:pt-10">

          {/* HERO TEXT */}
          <div className="relative z-20 w-[68%] md:w-1/2">

            <p className="text-2xl font-bold text-green-700 sm:text-3xl">
              Welcome to
            </p>

            <h1 className="mt-1 text-6xl font-extrabold leading-[0.95] tracking-tight text-slate-900 sm:text-7xl">
              Meal
              <br />
              Planner
            </h1>

            <p className="mt-5 text-lg font-semibold leading-snug text-slate-800 sm:mt-6 sm:text-2xl sm:leading-relaxed">
              Kidney-friendly recipes
              <br className="hidden sm:block" />
              {" "}that make healthy eating simple.
            </p>

          </div>

        </div>

        {/* HAMBURGER MENU */}
        <HomeMenu />

      </section>


      {/* MAIN NAVIGATION */}
      <section className="px-5 py-4 sm:px-8 sm:py-6">

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">

          {/* WEEKLY PLANNER */}
          <Link
            href="/planner"
            className="group flex min-h-[130px] items-center gap-5 rounded-3xl bg-blue-50 px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:min-h-[270px] md:flex-col md:items-start md:gap-4 md:px-7 md:py-7"
          >

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-200 text-5xl">
              📅
            </div>

            <div className="min-w-0 flex-1 md:flex-none">

              <h2 className="text-3xl font-bold text-slate-900">
                Weekly Planner
              </h2>

              <p className="mt-1 text-lg leading-snug text-slate-800">
                Plan your breakfasts, lunches and dinners for the week ahead.
              </p>

            </div>

          </Link>


          {/* RECIPES */}
          <Link
            href="/recipes"
            className="group flex min-h-[130px] items-center gap-5 rounded-3xl bg-green-50 px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:min-h-[270px] md:flex-col md:items-start md:gap-4 md:px-7 md:py-7"
          >

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-green-200 text-5xl">
              📖
            </div>

            <div className="min-w-0 flex-1 md:flex-none">

              <h2 className="text-3xl font-bold text-slate-900">
                Recipes
              </h2>

              <p className="mt-1 text-lg leading-snug text-slate-800">
                Browse delicious kidney-friendly recipes with nutrition info,
                cooking times and more.
              </p>

            </div>

          </Link>


          {/* SHOPPING LIST */}
          <Link
            href="/shopping"
            className="group flex min-h-[130px] items-center gap-5 rounded-3xl bg-orange-50 px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:min-h-[270px] md:flex-col md:items-start md:gap-4 md:px-7 md:py-7"
          >

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-orange-200 text-5xl">
              🛒
            </div>

            <div className="min-w-0 flex-1 md:flex-none">

              <h2 className="text-3xl font-bold text-slate-900">
                Shopping List
              </h2>

              <p className="mt-1 text-lg leading-snug text-slate-800">
                Your ingredients, combined and ready to go. No duplicates!
              </p>

            </div>

          </Link>

        </div>

      </section>

      {/* BOTTOM INFORMATION */}
      <section className="px-5 pb-8 sm:px-8">

        <div className="mx-auto flex max-w-5xl items-center gap-5 rounded-3xl bg-green-50 px-6 py-6 shadow-sm sm:px-8">

          <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-green-700 text-4xl text-green-700 sm:flex">
            ✓
          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Plan smart. Eat well. Feel your best.
            </h2>

            <p className="mt-1 text-base leading-relaxed text-slate-800 sm:text-lg">
              Kidney-friendly recipes with nutrition information to help you
              plan meals that suit your needs.
            </p>

          </div>

          <div className="ml-auto hidden text-5xl text-green-700 sm:block">
            ♡
          </div>

        </div>

      </section>


      {/* ABOUT LINK */}
      <div className="pb-10 text-center">

        <Link
          href="/about"
          className="text-lg font-semibold text-green-700 underline underline-offset-4"
        >
          About Meal Planner →
        </Link>

      </div>

    </main>
  );
}