import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "My Requirements",
    description: (
      <>
        Tell us about your dietary
        <br />
        restrictions.
      </>
    ),
    href: "/requirements",
    cardClass: "border-violet-100 bg-violet-50/40",
    numberClass: "bg-violet-300",
    iconClass: "bg-violet-50 text-violet-400",
    icon: (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
        <circle cx="32" cy="21" r="9" fill="currentColor" />
        <path
          d="M15 48c0-9.5 7.6-15 17-15s17 5.5 17 15"
          fill="currentColor"
        />
      </svg>
    ),
    arrowClass: "bg-violet-300",
  },
  {
    number: "2",
    title: "Recipes",
    description: (
      <>
        Browse kidney-friendly recipes that match your requirements
        <br className="hidden xl:block" />
        {" "}
      </>
    ),
    href: "/recipes",
    cardClass: "border-green-100 bg-green-50/40",
    numberClass: "bg-green-300",
    iconClass: "bg-green-50 text-green-500",
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
    arrowClass: "bg-green-300",
  },
  {
    number: "3",
    title: "Weekly Planner",
    description: (
      <>
        Plan your week's meal to fit
        <br className="hidden xl:block" />
        {" "}your nutritional goals.
      </>
    ),
    href: "/planner",
    cardClass: "border-orange-100 bg-orange-50/40",
    numberClass: "bg-orange-300",
    iconClass: "bg-orange-50 text-orange-400",
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
    arrowClass: "bg-orange-300",
  },
  {
    number: "4",
    title: "Nutrition",
    description: (
      <>
        Check the nutritional details
        <br className="hidden xl:block" />
        {" "}of your weekly plan.
      </>
    ),
    href: "/nutrition",
    cardClass: "border-pink-100 bg-pink-50/40",
    numberClass: "bg-pink-300",
    iconClass: "bg-pink-50 text-pink-400",
    icon: (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
        <path
          d="M8 52h48"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M14 46V30h8v16M28 46V16h8v30M42 46V24h8v22"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    ),
    arrowClass: "bg-pink-300",
  },
  {
    number: "5",
    title: "Shopping List",
    description: (
      <>
        Your shopping list is automatically generated.
        <br className="hidden xl:block" />
        {" "}
      </>
    ),
    href: "/shopping",
    cardClass: "border-blue-100 bg-blue-50/40",
    numberClass: "bg-blue-300",
    iconClass: "bg-blue-50 text-blue-400",
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
    arrowClass: "bg-blue-300",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-white"
      >
        {/* Desktop hero image */}
        <div
          className="absolute inset-0 hidden bg-cover bg-[65%_center] lg:block"
          style={{
            backgroundImage: "url('/images/background.png')",
          }}
        />

        {/* Mobile hero image: full-width image with a soft white text-safe area on the left */}
        <div
          className="absolute inset-0 bg-cover bg-center lg:hidden"
          style={{
            backgroundImage: "url('/images/mobile-background.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 via-55% to-transparent lg:hidden" />
        <div className="absolute inset-0 hidden lg:block lg:bg-gradient-to-r lg:from-white/80 lg:via-white/45 lg:to-transparent" />

        {/* Mobile hero: clean text area with a small food image, rather than text over the photograph */}
        <div className="relative z-10 mx-auto flex min-h-[235px] max-w-[1400px] items-center px-5 py-1 sm:px-10 lg:min-h-[295px] lg:px-12 lg:py-6 xl:px-16">
          <div className="w-[62%] max-w-[250px] sm:w-[430px] sm:max-w-[430px] lg:w-full lg:max-w-[700px]">
            <div className="relative z-10 w-full max-w-[250px] sm:max-w-[430px] lg:max-w-[700px]">
              <p className="text-[1.65rem] font-bold text-green-700 sm:text-3xl lg:text-3xl">
                Welcome to
              </p>

              <h1 className="mt-0.5 text-[2rem] font-extrabold leading-none tracking-tight text-slate-900 sm:text-5xl lg:text-[4.25rem]">
                Meal Planner
              </h1>

              <div className="mt-2 max-w-[240px] sm:max-w-[400px] text-slate-800 lg:mt-4 lg:max-w-[620px]">
                <p className="text-[1rem] leading-snug sm:text-xl lg:text-[1.1rem]">
                  
                </p>
                <p className="mt-2 text-[0.95rem] leading-tight sm:text-xl lg:text-[1.1rem]">
                  Meal Planner helps you plan your week's meals, check nutritional values and create your shopping list — all according to your dietary requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FIVE-STEP USER JOURNEY */}
      <section className="px-4 py-4 sm:px-8 sm:py-5 lg:px-10 xl:px-12">
        {/* Mobile */}
        <div className="mx-auto max-w-[700px] lg:hidden">
          <div className="flex flex-col gap-1">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <Link
                  href={step.href}
                  className={`group flex min-h-[92px] w-full items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${step.cardClass}`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${step.numberClass}`}
                  >
                    {step.number}
                  </span>

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${step.iconClass}`}
                  >
                    {step.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-[1.12rem] font-bold leading-tight text-slate-900">
                      {step.title}
                    </h2>
                    <p className="mt-1 text-[0.78rem] leading-snug text-slate-800">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-semibold leading-none text-white shadow-sm transition group-hover:translate-x-1 ${step.arrowClass}`}
                    aria-hidden="true"
                  >
                    →
                  </div>
                </Link>

              </div>
            ))}
          </div>
        </div>

        {/* Desktop — kept as the established desktop layout */}
        <div className="mx-auto hidden max-w-[1500px] grid-cols-1 gap-4 lg:grid lg:grid-cols-5 lg:gap-4 xl:gap-5">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <Link
                href={step.href}
                className={`group flex h-[82px] w-full items-center gap-3 rounded-xl border px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:h-[88px] sm:px-4 lg:h-full lg:min-h-[220px] lg:flex-col lg:items-stretch lg:gap-0 lg:rounded-2xl lg:px-4 lg:py-5 xl:px-5 2xl:min-h-[230px] ${step.cardClass}`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 lg:items-start lg:justify-between">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white lg:h-10 lg:w-10 lg:text-base ${step.numberClass}`}
                  >
                    {step.number}
                  </span>

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full lg:h-20 lg:w-20 ${step.iconClass}`}
                  >
                    {step.icon}
                  </div>
                </div>

                <div className="min-w-0 flex-1 lg:mt-4">
                  <h2 className="text-[1.08rem] font-bold leading-tight text-slate-900 lg:text-[1.35rem] xl:text-[1.4rem]">
                    {step.title}
                  </h2>

                  <p className="mt-0.5 text-[0.74rem] leading-snug text-slate-800 lg:mt-2 lg:text-[0.9rem] xl:text-[0.95rem]">
                    {step.description}
                  </p>

                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold leading-none text-white shadow-sm transition group-hover:translate-x-1 lg:mt-auto lg:ml-auto lg:h-10 lg:w-10 lg:text-2xl ${step.arrowClass}`}
                    aria-hidden="true"
                  >
                    →
                  </div>
                </div>
              </Link>

              {index < steps.length - 1 && (
                <div
                  className="pointer-events-none absolute -right-6 top-1/2 z-10 hidden -translate-y-1/2 text-4xl font-light text-green-700 lg:block"
                  aria-hidden="true"
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT LINK */}
      <div className="mx-auto max-w-[1320px] px-4 pb-4 text-right sm:px-8 lg:px-10 xl:px-12">
        <Link
          href="/about"
          className="text-sm font-semibold text-green-700 hover:text-green-800"
        >
          About Meal Planner
        </Link>
      </div>

    </main>
  );
}
