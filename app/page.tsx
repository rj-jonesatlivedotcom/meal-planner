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
      <section className="relative min-h-[360px] overflow-hidden bg-white sm:min-h-[380px] lg:min-h-[390px]">

        {/* Clean full-width hero photograph */}
        <div
          className="absolute inset-0 bg-cover bg-[72%_center] bg-no-repeat sm:bg-[74%_center] lg:bg-[78%_center]"
          style={{
            backgroundImage: "url('/images/hero-background.png')",
          }}
        />

        {/* Much lighter text-safe gradient.
            The previous version was too white and washed out the photograph. */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/25 via-[38%] to-transparent lg:via-[46%]" />

        <div className="relative mx-auto flex min-h-[360px] max-w-[1600px] items-center px-5 py-7 sm:min-h-[380px] sm:px-10 lg:min-h-[390px] lg:px-16 xl:px-24">

          <div className="w-full max-w-[720px]">

            <h1 className="text-[2.55rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#12396b] sm:text-5xl lg:text-[3.65rem] xl:text-[3.9rem]">
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

            <p className="mt-5 max-w-[590px] text-base leading-[1.5] text-[#17385f] sm:text-lg lg:text-[1.08rem]">
              Choose meals that fit your dietary requirements,
              <br className="hidden sm:block" />
              see your weekly nutrition at a glance, and get your
              <br className="hidden sm:block" />
              shopping list automatically.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/requirements"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#078f43] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#067b3a] hover:shadow-lg sm:px-8"
              >
                Get Started!
                <span className="text-lg">→</span>
              </Link>

              <Link
                href="/recipes"
                className="inline-flex items-center justify-center rounded-xl border-2 border-[#a9c9e8] bg-white/95 px-7 py-3.5 text-sm font-bold text-[#12396b] transition hover:bg-white sm:px-8"
              >
                Explore Recipes
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-700 sm:text-sm">
              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[11px] font-bold text-white">
                  ✓
                </span>
                Easy to use
              </span>

              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[11px] font-bold text-white">
                  ✓
                </span>
                Renal diet focused
              </span>

              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[11px] font-bold text-white">
                  ✓
                </span>
                Save time
              </span>
            </div>
          </div>

          {/* Handwritten message remains webpage text, not part of photograph */}
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

          {/* Desktop */}
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

                {/* Green arrows between the five cards */}
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

          {/* Mobile */}
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
      <section className="bg-white px-5 py-8 sm:px-8 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#12396b] sm:text-4xl lg:text-[3rem]">
              Make <span className="text-[#12396b]">Renal</span><span className="text-[#079447]">Plan</span> personal to you
            </h2>
            <p className="mt-2 text-base text-[#17385f] sm:text-lg">
              RenalPlan is free to explore. Create an account and unlock a smarter, more personalised way to plan your week.
            </p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {/* Explore for free */}
            <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-[#eefbf3] to-[#f7fcf8] px-6 py-6 sm:px-7 sm:py-7">
              <div className="relative z-10 max-w-[52%] sm:max-w-[48%]">
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
                  className="mt-5 inline-flex items-center gap-3 rounded-xl bg-[#078f43] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#067b3a] hover:shadow-lg"
                >
                  Explore now
                  <span className="text-lg">→</span>
                </Link>
                <p className="mt-3 text-sm font-bold text-[#12396b]">
                  It&apos;s yours to explore.
                </p>
              </div>

              {/* Recipe preview cards */}
              <div className="absolute bottom-[-20px] right-[-20px] hidden h-[225px] w-[52%] sm:block sm:h-[245px]">
                <div className="absolute left-1/2 top-5 h-[185px] w-[72%] -translate-x-1/2 rotate-[5deg] rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                  <div className="h-[92px] rounded-xl bg-gradient-to-br from-orange-100 via-orange-50 to-green-100" />
                  <div className="px-1.5 pt-2">
                    <div className="h-2.5 w-24 rounded-full bg-slate-200" />
                    <div className="mt-2 h-2 w-32 rounded-full bg-slate-100" />
                    <div className="mt-3 flex gap-1.5">
                      <span className="h-4 w-12 rounded-full bg-green-50" />
                      <span className="h-4 w-12 rounded-full bg-blue-50" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-2 h-[190px] w-[78%] rotate-[-3deg] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <div className="h-[94px] rounded-xl bg-gradient-to-br from-orange-100 via-red-50 to-yellow-50" />
                  <div className="px-1.5 pt-2">
                    <div className="h-2.5 w-28 rounded-full bg-slate-300" />
                    <div className="mt-2 h-2 w-36 rounded-full bg-slate-100" />
                    <div className="mt-3 flex gap-1.5">
                      <span className="h-4 w-12 rounded-full bg-green-50" />
                      <span className="h-4 w-12 rounded-full bg-blue-50" />
                      <span className="h-4 w-12 rounded-full bg-yellow-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RenalPlan starts working around you */}
            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-[#eef7ff] to-[#f7fbff] px-6 py-6 sm:px-7 sm:py-7">
              <div className="relative z-10 max-w-[56%] sm:max-w-[54%]">
                <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-3xl">
                  Then <span className="text-[#12396b]">Renal</span><span className="text-[#079447]">Plan</span> starts working around you.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  Create an account to unlock personalised features that make meal planning even easier.
                </p>
                <Link
                  href="/signup"
                  className="mt-5 inline-flex items-center gap-3 rounded-xl bg-[#12396b] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg"
                >
                  Create your free account
                  <span className="text-lg">→</span>
                </Link>
                <p className="mt-3 text-xs text-slate-500">
                  Free to explore. Personalised when you sign in.
                </p>
              </div>

              {/* My Diet preview */}
              <div className="absolute bottom-[-8px] right-[-12px] hidden w-[42%] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:block">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-extrabold text-[#12396b]">My Diet</span>
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5 text-[10px]">
                    <span className="font-semibold text-slate-600">Sodium</span>
                    <span className="rounded bg-white px-2 py-1 text-slate-700 shadow-sm">Moderate⌄</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-green-50 px-2 py-1.5 text-[10px]">
                    <span className="font-semibold text-slate-600">Potassium</span>
                    <span className="rounded bg-white px-2 py-1 text-slate-700 shadow-sm">Low⌄</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-green-50 px-2 py-1.5 text-[10px]">
                    <span className="font-semibold text-slate-600">Phosphate</span>
                    <span className="rounded bg-white px-2 py-1 text-slate-700 shadow-sm">Low⌄</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5 text-[10px]">
                    <span className="font-semibold text-slate-600">Purines</span>
                    <span className="rounded bg-white px-2 py-1 text-slate-700 shadow-sm">Moderate⌄</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-blue-50 px-2 py-1.5 text-[10px]">
                    <span className="font-semibold text-slate-600">Number of people</span>
                    <span className="rounded bg-white px-2 py-1 text-slate-700 shadow-sm">2⌄</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account feature showcase */}
          <h2 className="mt-8 text-center text-2xl font-extrabold tracking-tight text-[#12396b] sm:text-3xl lg:text-[2.15rem]">
            What you get with your <span className="text-[#12396b]">Renal</span><span className="text-[#079447]">Plan</span> account
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-600">🎯</div>
              <div>
                <h3 className="font-bold text-[#12396b]">Set your requirements</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">Tell RenalPlan about your dietary requirements so your meal planning can be tailored to you.</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-green-100 bg-green-50/70 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">🍴</div>
              <div>
                <h3 className="font-bold text-[#12396b]">Find meals that fit</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">See recipes that match your requirements, so you don&apos;t have to work through everything yourself.</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-pink-100 bg-pink-50/70 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-2xl text-pink-500">♡</div>
              <div>
                <h3 className="font-bold text-[#12396b]">Save your favourites</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">Keep track of the meals you love and build your own collection of go-to meals.</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-2xl text-orange-500">👥</div>
              <div>
                <h3 className="font-bold text-[#12396b]">Plan for your household</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">Set the number of people you&apos;re cooking for and make your meal planning work for your household.</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-violet-100 bg-violet-50/70 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-100 text-2xl text-violet-600">◇</div>
              <div>
                <h3 className="font-bold text-[#12396b]">Pick for Me</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">Let RenalPlan help take the guesswork out of planning your week.</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-600">▥</div>
              <div>
                <h3 className="font-bold text-[#12396b]">Personalised Nutrition Report</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">See the nutritional picture of your planned week, including daily totals and averages.</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-pink-100 bg-pink-50/70 p-5 sm:col-span-2 lg:col-span-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-2xl text-pink-500">▣</div>
              <div>
                <h3 className="font-bold text-[#12396b]">Printable report</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">Create a printable or PDF version of your Nutrition Report to take to your nutritionist or renal consultant.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PERSONAL JOURNEY CTA
      ========================================================= */}
      <section className="border-t border-green-50 bg-gradient-to-b from-[#f4fbf7] to-white px-5 py-7 sm:px-8 lg:px-10 lg:py-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative flex flex-col items-center text-center">
            <div className="mb-3 hidden w-full items-center justify-between gap-5 lg:flex">
              <div className="rotate-[-3deg] rounded-[28%_20%_25%_18%] bg-[#dff5e6] px-6 py-3 text-left text-xl font-semibold leading-[1.02] text-[#12396b] shadow-sm" style={{ fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive' }}>
                Same great recipes.
                <br />
                <span className="text-[#078f43]">A more personal you.</span>
              </div>

              <div className="rotate-[2deg] rounded-[28%_20%_25%_18%] bg-[#dff5e6] px-6 py-3 text-right text-xl font-semibold leading-[1.02] text-[#12396b] shadow-sm" style={{ fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive' }}>
                Small changes
                <br />
                <span className="text-[#078f43]">A healthier tomorrow ♡</span>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-[#12396b] sm:text-3xl lg:text-[2rem]">
              Your week. Your requirements. Your <span className="text-[#12396b]">Renal</span><span className="text-[#079447]">Plan</span>.
            </h2>
            <p className="mt-2 text-sm text-[#17385f] sm:text-base">
              Set your requirements → Choose your meals → Build your week →  Understand your nutrition → Shop 
            </p>

            <Link
              href="/signup"
              className="mt-4 inline-flex items-center gap-3 rounded-xl bg-[#12396b] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg"
            >
              Create your free account
              <span className="text-lg">→</span>
            </Link>

            <div className="mt-7 grid w-full gap-4 text-sm text-[#17385f] sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <span className="text-xl text-[#079447]">◒</span>
                Kidney-friendly recipes
              </div>
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <span className="text-xl text-[#079447]">♥</span>
                Designed for real life
              </div>
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <span className="text-xl text-[#079447]">◷</span>
                Save time and reduce stress
              </div>
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <span className="text-xl text-[#079447]">♟</span>
                Join a growing community
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ABOUT
      ========================================================= */}
      <div className="mx-auto max-w-[1400px] px-5 pb-4 text-right sm:px-8 lg:px-12">
        <Link
          href="/about"
          className="text-xs font-semibold text-slate-700 transition hover:text-[#078f43]"
        >
          About{" "}
          <span className="font-bold">
            <span className="text-[#12396b]">Renal</span>
            <span className="text-[#078f43]">Plan</span>
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
        <span className="text-slate-600">{label}</span>
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