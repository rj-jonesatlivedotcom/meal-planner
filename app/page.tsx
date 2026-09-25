import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Set Your Diet",
    description: "Tell us about your dietary requirements.",
    href: "/requirements",
    cardClass: "border-violet-100 bg-violet-50/50",
    numberClass: "bg-violet-300",
    iconClass: "bg-violet-50 text-violet-500",
    icon: (
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
        <circle cx="32" cy="20" r="9" fill="currentColor" />
        <path
          d="M15 49c0-9 7.6-15 17-15s17 6 17 15"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Choose Meals",
    description: "Browse recipes that fit your needs.",
    href: "/recipes",
    cardClass: "border-green-100 bg-green-50/50",
    numberClass: "bg-green-300",
    iconClass: "bg-green-50 text-green-500",
    icon: (
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
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
  },
  {
    number: "3",
    title: "Plan Your Week",
    description: "Build your weekly meal plan.",
    href: "/planner",
    cardClass: "border-orange-100 bg-orange-50/50",
    numberClass: "bg-orange-300",
    iconClass: "bg-orange-50 text-orange-500",
    icon: (
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
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
  },
  {
    number: "4",
    title: "Check Nutrition",
    description: "See your potassium, phosphate, sodium and more.",
    href: "/nutrition",
    cardClass: "border-pink-100 bg-pink-50/50",
    numberClass: "bg-pink-300",
    iconClass: "bg-pink-50 text-pink-500",
    icon: (
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
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
  },
  {
    number: "5",
    title: "Shop",
    description: "Your shopping list is created automatically.",
    href: "/shopping",
    cardClass: "border-blue-100 bg-blue-50/50",
    numberClass: "bg-blue-300",
    iconClass: "bg-blue-50 text-blue-500",
    icon: (
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
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
  },
];

const benefits = [
  {
    title: "Tasty, varied recipes",
    text: "Meals you'll actually enjoy.",
    iconClass: "bg-green-50 text-green-500",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <path
          d="M38 8C24 9 13 16 10 29c-1 5 1 9 1 9s4-2 8-5c7-5 12-13 19-25Z"
          fill="currentColor"
        />
        <path
          d="M10 38c5-9 11-15 21-20"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Renal diet friendly",
    text: "Built around kidney-friendly eating.",
    iconClass: "bg-pink-50 text-pink-500",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <path
          d="M24 39S8 29 8 17c0-5 3-9 8-9 4 0 7 3 8 6 1-3 4-6 8-6 5 0 8 4 8 9 0 12-16 22-16 22Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "Save time",
    text: "Plan, check and shop in minutes.",
    iconClass: "bg-blue-50 text-blue-500",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M24 14v11l7 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Built for you",
    text: "Simple, clear and easy to use.",
    iconClass: "bg-violet-50 text-violet-500",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <circle cx="24" cy="15" r="7" fill="currentColor" />
        <path
          d="M10 39c0-8 6-13 14-13s14 5 14 13"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative h-[300px] min-h-0 overflow-hidden bg-white sm:h-auto sm:min-h-[380px] lg:min-h-[390px]">

        <div
          className="absolute inset-0 bg-[length:auto_300px] bg-[66%_top] bg-no-repeat sm:bg-cover sm:bg-[74%_center] lg:bg-[78%_center]"
          style={{
            backgroundImage: "url('/images/hero-background.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/25 via-[38%] to-transparent lg:via-[46%]" />

        <div className="relative mx-auto flex h-full min-h-0 max-w-[1600px] items-start px-5 py-7 sm:h-auto sm:min-h-[380px] sm:items-center sm:px-10 sm:py-7 lg:min-h-[390px] lg:px-16 xl:px-24">

          <div className="w-full max-w-[720px]">

            <h1 className="max-w-[350px] text-[2.25rem] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#12396b] sm:max-w-none sm:text-5xl lg:text-[3.65rem] xl:text-[3.9rem]">
              <span className="block">
                Plan kidney-friendly
              </span>

              <span className="block">
                <span className="text-[#12396b]">meals </span>
                <span className="text-[#079447]">
                  with confidence.
                </span>
              </span>
            </h1>

            <p className="mt-5 hidden max-w-[340px] text-[0.98rem] leading-[1.55] text-[#17385f] sm:block sm:max-w-[590px] sm:text-lg lg:text-[1.08rem]">
              Choose meals that fit your dietary requirements,
              <br className="hidden sm:block" />
              see your weekly nutrition at a glance, and get your
              <br className="hidden sm:block" />
              shopping list automatically.
            </p>

            {/* =====================================================
                HERO BUTTONS
                Explore now = RenalPlan Green
                Create account = RenalPlan Blue
            ===================================================== */}
            <div className="hidden sm:mt-6 sm:flex sm:w-full sm:max-w-none sm:flex-row sm:gap-3">

              <Link
                href="/recipes"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#078f43] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#067b3a] hover:shadow-lg sm:w-auto sm:px-6"
              >
                Explore now
                <span className="text-lg">→</span>
              </Link>

              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#12396b] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg sm:w-auto sm:px-6"
              >
                Create account
                <span className="text-lg">→</span>
              </Link>

            </div>





          </div>

          <div
            className="absolute right-5 top-7 hidden w-[225px] rotate-[-4deg] rounded-[28%_20%_25%_18%] bg-[#dff5e6] px-5 py-4 text-center text-[1.35rem] font-semibold leading-[1.02] text-[#12396b] shadow-sm lg:block xl:right-16"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            Healthy meals
            <br />
            <span className="text-[#078f43]">
              Brighter days ♡
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================
          FIVE STEP JOURNEY
      ========================================================= */}
      <section className="px-4 py-4 sm:px-8 lg:px-10 lg:py-5">
        <div className="mx-auto max-w-[1450px] rounded-3xl bg-[#f2f8fd] px-4 py-4 sm:px-6 lg:px-7 lg:py-5">

          <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#12396b] sm:text-[1.75rem]">
            Your journey in 5 simple steps
          </h2>

          <div className="mt-4 hidden lg:grid lg:grid-cols-5 lg:gap-4 xl:gap-5">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">

                <Link
                  href={step.href}
                  className={`group block min-h-[150px] rounded-2xl border p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${step.cardClass}`}
                >
                  <div className="flex items-start justify-between">

                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${step.numberClass}`}
                    >
                      {step.number}
                    </span>

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${step.iconClass}`}
                    >
                      {step.icon}
                    </div>

                  </div>

                  <h3 className="mt-2 text-base font-bold text-slate-900 xl:text-[1.02rem]">
                    {step.title}
                  </h3>

                  <p className="mt-1 max-w-[190px] text-xs leading-snug text-slate-700 xl:text-[0.8rem]">
                    {step.description}
                  </p>

                </Link>

                {index < steps.length - 1 && (
                  <span
                    className="pointer-events-none absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-3xl font-light text-green-600 xl:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}

              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 lg:hidden">
            {steps.map((step) => (
              <Link
                key={step.title}
                href={step.href}
                className={`flex items-center gap-3 rounded-2xl border p-3 shadow-sm ${step.cardClass}`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${step.numberClass}`}
                >
                  {step.number}
                </span>

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${step.iconClass}`}
                >
                  {step.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-700">
                    {step.description}
                  </p>
                </div>

              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          PERSONALISE RENALPLAN
      ========================================================= */}
      <section className="bg-white px-4 py-7 sm:px-8 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1400px]">

          <div className="text-center">

            <h2 className="text-[2rem] leading-tight font-extrabold tracking-tight text-[#12396b] sm:text-4xl lg:text-[3rem]">
              Make{" "}
              <span className="text-[#12396b]">Renal</span>
              <span className="text-[#079447]">Plan</span>{" "}
              personal to you
            </h2>

            <p className="mx-auto mt-3 max-w-[340px] text-[0.98rem] leading-relaxed text-[#17385f] sm:max-w-none sm:text-lg">
              RenalPlan is free to explore. Create an account and unlock a smarter, more personalised way to plan your week.
            </p>

          </div>

          <div className="mt-5 grid gap-4 lg:mt-6 lg:grid-cols-2">

            {/* =====================================================
                EXPLORE FOR FREE
            ===================================================== */}
            <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-[#eefbf3] to-[#f7fcf8] px-5 py-5 sm:px-7 sm:py-7">

              <div className="relative z-10 max-w-full sm:max-w-[48%]">

                <h3 className="text-2xl font-extrabold tracking-tight text-[#079447] sm:text-3xl">
                  Explore for free
                </h3>

                <p className="mt-1 text-base font-bold text-[#12396b] sm:text-lg">
                  No account needed.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  Browse our kidney-friendly recipes, explore nutrition information, build your weekly meal plan and create your shopping list.
                </p>

                <Link
                  href="/recipes"
                  className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#078f43] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#067b3a] hover:shadow-lg sm:w-auto"
                >
                  Explore now
                  <span className="text-lg">→</span>
                </Link>

                <p className="mt-3 text-sm font-bold text-[#12396b]">
                  It&apos;s yours to explore.
                </p>

              </div>

              {/* =================================================
                  REAL RENALPLAN SCREENSHOTS
              ================================================= */}
              <div className="absolute bottom-[-30px] right-[-35px] hidden h-[270px] w-[58%] sm:block">

                {/* Recipes screenshot behind */}
                <div className="absolute right-2 top-2 w-[76%] rotate-[4deg] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                  <img
                    src="/renalplan-recipes-preview-tight.png"
                    alt="RenalPlan recipes"
                    className="block h-auto w-full"
                  />
                </div>

                {/* Planner screenshot in front */}
                <div className="absolute bottom-0 left-0 z-10 w-[82%] -rotate-[3deg] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <img
                    src="/renalplan-planner-preview-tight.png"
                    alt="RenalPlan weekly planner"
                    className="block h-auto w-full"
                  />
                </div>

              </div>

            </div>

            {/* =====================================================
                RENALPLAN STARTS WORKING AROUND YOU
            ===================================================== */}
            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-[#eef7ff] to-[#f7fbff] px-5 py-5 sm:min-h-[380px] sm:px-7 sm:py-7">

              <div className="relative z-20 max-w-full sm:max-w-[52%]">

                <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-3xl">
                  Then{" "}
                  <span className="text-[#12396b]">Renal</span>
                  <span className="text-[#079447]">Plan</span>{" "}
                  starts working around you.
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  Create an account to unlock personalised features that make meal planning even easier.
                </p>

                <Link
                  href="/signup"
                  className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#12396b] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg sm:w-auto"
                >
                  Create account
                  <span className="text-lg">→</span>
                </Link>

                <p className="mt-3 text-xs text-slate-500">
                  Free to explore. Personalised when you sign in.
                </p>

              </div>

              {/* =================================================
                  REAL RENALPLAN ACCOUNT SCREENS
                  Layered on the right of the panel
              ================================================= */}
              <div className="absolute bottom-[-45px] right-[-35px] hidden h-[315px] w-[58%] sm:block">

                {/* Requirements - rear */}
                <div className="absolute right-[8%] top-[-8px] z-0 w-[78%] rotate-[4deg] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                  <img
                    src="/images/renalplan_requirements_cropped.png"
                    alt="RenalPlan dietary requirements"
                    className="block h-auto w-full"
                  />
                </div>

                {/* Nutrition - middle */}
                <div className="absolute bottom-[28px] right-[2%] z-10 w-[78%] rotate-[-3deg] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <img
                    src="/images/renalplan_nutrition_cropped.png"
                    alt="RenalPlan weekly nutrition"
                    className="block h-auto w-full"
                  />
                </div>

                {/* My Account - front */}
                <div className="absolute bottom-[-8px] left-[-2%] z-20 w-[70%] rotate-[2deg] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  <img
                    src="/images/renalplan_account_cropped.png"
                    alt="RenalPlan My Account"
                    className="block h-auto w-full"
                  />
                </div>

              </div>

            </div>

          </div>

          {/* Account feature showcase */}
          <h2 className="mx-auto mt-7 max-w-[340px] text-center text-[1.65rem] leading-tight font-extrabold tracking-tight text-[#12396b] sm:max-w-none sm:text-3xl lg:text-[2.15rem]">
            What you get with your{" "}
            <span className="text-[#12396b]">Renal</span>
            <span className="text-[#079447]">Plan</span>{" "}
            account
          </h2>

          <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-3">

            <div className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:gap-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl text-blue-600 sm:h-12 sm:w-12 sm:text-2xl">
                🎯
              </div>

              <div>
                <h3 className="font-bold text-[#12396b]">
                  Set your requirements
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Tell RenalPlan about your dietary requirements so your meal planning can be tailored to you.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl border border-green-100 bg-green-50/70 p-4 sm:gap-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl text-green-600 sm:h-12 sm:w-12 sm:text-2xl">
                🍴
              </div>

              <div>
                <h3 className="font-bold text-[#12396b]">
                  Find meals that fit
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  See recipes that match your requirements, so you don&apos;t have to work through everything yourself.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl border border-pink-100 bg-pink-50/70 p-4 sm:gap-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-xl text-pink-500 sm:h-12 sm:w-12 sm:text-2xl">
                ♡
              </div>

              <div>
                <h3 className="font-bold text-[#12396b]">
                  Save your favourites
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Keep track of the meals you love and build your own collection of go-to meals.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 sm:gap-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl text-orange-500 sm:h-12 sm:w-12 sm:text-2xl">
                👥
              </div>

              <div>
                <h3 className="font-bold text-[#12396b]">
                  Plan for your household
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Set the number of people you&apos;re cooking for and make your meal planning work for your household.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 sm:gap-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xl text-violet-600 sm:h-12 sm:w-12 sm:text-2xl">
                ◇
              </div>

              <div>
                <h3 className="font-bold text-[#12396b]">
                  Pick for Me
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Let RenalPlan help take the guesswork out of planning your week.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:gap-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl text-blue-600 sm:h-12 sm:w-12 sm:text-2xl">
                ▥
              </div>

              <div>
                <h3 className="font-bold text-[#12396b]">
                  Personalised Nutrition Report
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  See the nutritional picture of your planned week, with daily totals, averages and a printable or PDF report for your nutritionist or renal consultant.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          PERSONAL JOURNEY CTA
      ========================================================= */}
      <div className="hidden sm:block">
        <section
          id="signup"
          className="border-t border-green-50 bg-gradient-to-b from-[#f4fbf7] to-white px-4 py-4 sm:px-8 lg:px-10 lg:py-5"
        >
          <div className="mx-auto max-w-[1400px]">

            <div className="relative flex flex-col items-center text-center">

              <h2 className="max-w-[350px] text-[1.75rem] leading-tight font-extrabold tracking-tight text-[#12396b] sm:max-w-none sm:text-3xl lg:text-[2rem]">
                Plan{" "}
                <span className="text-[#079447]">→</span>{" "}
                Shop{" "}
                <span className="text-[#079447]">→</span>{" "}
                Cook
                <br />
                with{" "}
                <span className="text-[#12396b]">Renal</span>
                <span className="text-[#079447]">Plan</span>.
              </h2>

              <Link
                href="/signup"
                className="mt-5 inline-flex w-full max-w-[350px] items-center justify-center gap-3 rounded-xl bg-[#12396b] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg sm:w-auto sm:max-w-none"
              >
                Create account
                <span className="text-lg">
                  →
                </span>
              </Link>

            </div>

          </div>
        </section>
      </div>

      {/* =========================================================
          ABOUT
      ========================================================= */}
      <div className="mx-auto max-w-[1400px] px-5 pb-4 text-right sm:px-8 lg:px-12">
        <Link
          href="/about"
          className="text-2xl font-semibold text-slate-700 transition hover:text-[#078f43]"
        >
          About{" "}
          <span className="font-bold">
            <span className="text-[#12396b]">
              Renal
            </span>
            <span className="text-[#078f43]">
              Plan
            </span>
          </span>
        </Link>
      </div>

    </main>
  );
}

/* =========================================================
   NUTRITION BAR
========================================================= */
function NutritionBar({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div>
      <div className="mb-0.5 flex items-center justify-between gap-2">
        <span className="text-slate-600">
          {label}
        </span>

        <span className="font-semibold text-slate-800">
          {value}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-green-500"
          style={{ width }}
        />
      </div>
    </div>
  );
}