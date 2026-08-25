import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "My Requirements",
    description: (
      <>
        Tell us what you need to manage.
        <br />
        You choose what matters to you.
      </>
    ),
    href: "/requirements",
    cardClass: "border-violet-100 bg-violet-50/60",
    numberClass: "bg-violet-600",
    iconClass: "bg-violet-100 text-violet-600",
    icon: (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
        <circle cx="32" cy="21" r="9" fill="currentColor" />
        <path
          d="M15 48c0-9.5 7.6-15 17-15s17 5.5 17 15"
          fill="currentColor"
        />
      </svg>
    ),
    arrowClass: "bg-violet-600",
  },
  {
    number: "2",
    title: "Recipes",
    description: (
      <>
        Browse kidney-friendly recipes that match your requirements
        <br className="hidden xl:block" />
        {" "}or discover ideas.
      </>
    ),
    href: "/recipes",
    cardClass: "border-green-100 bg-green-50/60",
    numberClass: "bg-green-700",
    iconClass: "bg-green-100 text-green-700",
    icon: (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
        <path
          d="M8 14c10-3 18-1 24 5v34c-6-6-14-8-24-5V14Z"
          fill="white"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M56 14c-10-3-18-1-24 5v34c6-6 14-8 24-5V14Z"
          fill="white"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M32 19v34"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
    arrowClass: "bg-green-700",
  },
  {
    number: "3",
    title: "Weekly Planner",
    description: (
      <>
        Choose your meals, plan your week and check how they fit
        <br className="hidden xl:block" />
        {" "}your nutritional goals.
      </>
    ),
    href: "/planner",
    cardClass: "border-orange-100 bg-orange-50/60",
    numberClass: "bg-orange-500",
    iconClass: "bg-orange-100 text-orange-500",
    icon: (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
        <rect
          x="10"
          y="14"
          width="44"
          height="40"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M20 9v11M44 9v11M10 26h44"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M21 34h6M37 34h6M21 44h6M37 44h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
    arrowClass: "bg-orange-500",
  },
  {
    number: "4",
    title: "Shopping List",
    description: (
      <>
        Get your shopping list automatically from the meals you’ve
        <br className="hidden xl:block" />
        {" "}planned.
      </>
    ),
    href: "/shopping",
    cardClass: "border-blue-100 bg-blue-50/60",
    numberClass: "bg-blue-600",
    iconClass: "bg-blue-100 text-blue-600",
    icon: (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
        <path
          d="M13 18h7l4 28h27l6-21H22"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="29" cy="54" r="4" fill="currentColor" />
        <circle cx="48" cy="54" r="4" fill="currentColor" />
        <path
          d="M31 27h18M32 34h15"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
    arrowClass: "bg-blue-600",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/background.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/55 to-white/10 md:from-white/45 md:via-white/25 md:to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[205px] max-w-[1400px] items-center px-5 py-4 sm:px-10 md:min-h-[295px] md:px-12 md:py-6 lg:px-16">
          <div className="w-full max-w-[700px]">
            <p className="text-2xl font-bold text-green-700 sm:text-3xl">
              Welcome to
            </p>

            <h1 className="mt-1 text-[2.5rem] font-extrabold leading-none tracking-tight text-slate-900 sm:text-5xl md:text-[4.25rem]">
              Meal Planner
            </h1>

            <p className="mt-3 max-w-[720px] text-[0.95rem] leading-snug text-slate-800 sm:text-xl md:mt-4 md:text-[1.1rem]">
              Meal planning when you have dietary restrictions can be difficult.
              <br className="hidden md:block" />
              Meal Planner helps you find suitable meals, check nutrition values,
              <br className="hidden lg:block" />
              plan your meals for the week ahead, and get your shopping list -
              <br className="hidden lg:block" />
              all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* FOUR-STEP USER JOURNEY */}
      <section className="px-5 py-4 sm:px-8 sm:py-5 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-5 md:grid-cols-4 md:gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <Link
                href={step.href}
                className={`group flex h-[82px] min-h-0 w-full flex-col rounded-xl border px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:h-[90px] sm:px-4 md:h-full md:min-h-[225px] md:rounded-2xl md:px-5 md:py-6 lg:px-6 xl:min-h-[235px] ${step.cardClass}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${step.numberClass}`}
                  >
                    {step.number}
                  </span>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full md:h-20 md:w-20 ${step.iconClass}`}
                  >
                    {step.icon}
                  </div>
                </div>

                <div className="mt-1 min-w-0 md:mt-4 md:flex-1">
                  <h2 className="text-[1.1rem] font-bold leading-tight text-slate-900 md:text-[1.3rem] lg:text-[1.45rem]">
                    {step.title}
                  </h2>

                  <p className="mt-1 max-w-[88%] text-[0.78rem] leading-tight text-slate-800 md:mt-2 md:max-w-none md:text-[0.9rem] lg:text-[0.95rem]">
                    {step.description}
                  </p>

                  <div
                    className={`absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-xl font-semibold leading-none text-white shadow-sm transition group-hover:translate-x-1 md:static md:mt-auto md:ml-auto md:h-10 md:w-10 md:text-2xl ${step.arrowClass}`}
                    aria-hidden="true"
                  >
                    →
                  </div>
                </div>
              </Link>

              {index < steps.length - 1 && (
                <div
                  className="pointer-events-none absolute -right-6 top-1/2 z-10 hidden -translate-y-1/2 text-4xl font-light text-green-700 md:block"
                  aria-hidden="true"
                >
                  →
                </div>
              )}

              {index < steps.length - 1 && (
                <div
                  className="flex h-4 items-center justify-center text-3xl font-bold leading-none text-green-700 sm:h-5 md:hidden"
                  aria-hidden="true"
                >
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}