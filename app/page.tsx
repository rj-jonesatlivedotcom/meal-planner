"use client";

import Link from "next/link";

const freeSteps = [
  {
    number: "1",
    title: "Choose Meals",
    description: "Browse our kidney-friendly recipes that fit your needs.",
    href: "/recipes",
    cardClass: "border-green-100 bg-green-50/60",
    numberClass: "bg-emerald-500",
    iconClass: "bg-green-50 text-emerald-600",
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
          d="M56 14c-10-3-18-1-24 5v34c6-6 14-8-24-5V14Z"
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
    number: "2",
    title: "Plan Your Week",
    description: "Build your weekly meal plan with ease.",
    href: "/planner",
    cardClass: "border-orange-100 bg-orange-50/60",
    numberClass: "bg-orange-500",
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
    number: "3",
    title: "Shop",
    description: "Your shopping list is created automatically.",
    href: "/shopping",
    cardClass: "border-blue-100 bg-blue-50/60",
    numberClass: "bg-blue-500",
    iconClass: "bg-blue-50 text-blue-600",
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

const accountFeatures = [
  {
    title: "My Diet",
    badge: "Premium",
    text: "Set your dietary requirements so RenalPlan can personalise your meals.",
    href: "/requirements",
    iconClass: "bg-blue-100 text-blue-600",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <circle cx="24" cy="15" r="7" fill="currentColor" />
        <path
          d="M10 40c0-8 6-13 14-13s14 5 14 13"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "Nutrition",
    badge: "Premium",
    text: "See your weekly nutrition summary with totals, averages and a printable report.",
    href: "/nutrition",
    iconClass: "bg-blue-100 text-blue-600",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <path
          d="M7 40h34"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          d="M12 36V22h6v14M21 36V12h6v24M30 36V18h6v18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        />
      </svg>
    ),
  },
  {
    title: "Food Check",
    badge: "Premium",
    text: "Check the nutritional information for individual foods quickly and easily.",
    href: "/food-check",
    iconClass: "bg-blue-100 text-blue-600",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <circle
          cx="20"
          cy="20"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          d="m28 28 11 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Favourites",
    text: "Save your favourite recipes and access them whenever you want.",
    href: "/favourites",
    iconClass: "bg-rose-100 text-rose-500",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <path
          d="M24 39S8 29 8 17c0-5 3-9 8-9 4 0 7 3 8 6 1-3 4-6 8-6 5 0 8 4 8 9 0 12-16 22-16 22Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const benefits = [
  "Kidney-friendly recipes",
  "Easy meal planning",
  "Automatic shopping lists",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <style jsx global>{`
        @keyframes renalFadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes renalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes renalFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-4deg);
          }
          50% {
            transform: translateY(-7px) rotate(-3deg);
          }
        }

        @keyframes renalArrow {
          0%,
          100% {
            transform: translateX(0);
            opacity: 0.65;
          }
          50% {
            transform: translateX(5px);
            opacity: 1;
          }
        }

        @keyframes renalPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }

        .renal-fade-up {
          animation: renalFadeUp 0.7s ease-out both;
        }

        .renal-fade-in {
          animation: renalFadeIn 0.8s ease-out both;
        }

        .renal-float {
          animation: renalFloat 4.5s ease-in-out infinite;
        }

        .renal-arrow {
          animation: renalArrow 1.7s ease-in-out infinite;
        }

        .renal-pulse {
          animation: renalPulse 2.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .renal-fade-up,
          .renal-fade-in,
          .renal-float,
          .renal-arrow,
          .renal-pulse {
            animation: none !important;
          }

          html {
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-cover bg-[72%_center] bg-no-repeat lg:bg-[76%_center]"
          style={{
            backgroundImage: "url('/images/hero-background.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/55 via-[42%] to-transparent lg:via-[47%]" />

        <div className="relative mx-auto flex min-h-[560px] max-w-[1600px] items-center px-5 py-10 sm:min-h-[500px] sm:px-10 sm:py-12 lg:min-h-[420px] lg:px-16 xl:px-24">
          <div className="w-full max-w-[720px] renal-fade-up">
            <h1 className="max-w-[760px] text-[2.7rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#12396b] sm:text-5xl lg:text-[4.05rem]">
              <span className="block">Plan kidney-friendly</span>
              <span className="block">
                meals{" "}
                <span className="text-[#079447]">
                  with confidence.
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-[620px] text-base leading-[1.48] text-[#17385f] sm:mt-6 sm:text-lg lg:text-[1.18rem]">
              Browse kidney-friendly recipes, or create a free account to
              personalise RenalPlan to your dietary requirements.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
              <Link
                href="/recipes"
                className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-xl bg-[#078f43] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#067b3a] hover:shadow-lg"
              >
                Explore recipes
                <span className="text-lg">→</span>
              </Link>

              <Link
                href="/signup"
                className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-xl bg-[#12396b] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg"
              >
                Create free account
                <span className="text-lg">→</span>
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-7 sm:max-w-[650px] sm:gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-1.5 text-left text-[11px] font-semibold leading-tight text-[#17385f] sm:items-center sm:gap-2 sm:text-sm"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#079447] text-[11px] font-extrabold text-white sm:h-6 sm:w-6">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="renal-float absolute right-5 top-8 hidden w-[225px] rotate-[-4deg] rounded-[28%_20%_25%_18%] bg-[#dff5e6] px-5 py-4 text-center text-[1.35rem] font-semibold leading-[1.02] text-[#12396b] shadow-sm lg:block xl:right-16"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            Healthy meals
            <br />
            <span className="text-[#078f43]">Brighter days ♡</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          MOBILE SHOWCASE VIDEO
          Dedicated mobile video.
          Enlarged on mobile so the actual screen recording is easier
          to see, while keeping the desktop video completely separate.
      ========================================================= */}
      <section
        className="px-2 py-7 sm:px-8 sm:py-8 lg:hidden"
        aria-label="See RenalPlan in action"
      >
        <div className="mx-auto w-full max-w-[760px]">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#12396b]">
              See Renal<span className="text-[#079447]">Plan</span> in action
            </h2>

            <p className="mx-auto mt-2 max-w-[520px] text-sm leading-relaxed text-[#17385f]">
              From your dietary requirements to your weekly shop — all in one
              place.
            </p>
          </div>

          <div className="relative mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-[#102b4d] shadow-lg">
            <div className="aspect-[9/16] w-full">
              <video
                className="block h-full w-full object-contain object-center"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="RenalPlan mobile showcase showing dietary requirements, weekly planning, nutrition and shopping list features"
              >
                <source
                  src="/videos/RenalPlan_Mobile_Showcase_FINAL_v10_CLEAN.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video element.
              </video>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          FREE JOURNEY
      ========================================================= */}
      <section className="px-4 py-4 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1450px] rounded-3xl bg-gradient-to-r from-[#effbf5] to-[#f8fcfa] px-5 py-6 shadow-sm sm:px-7 lg:px-8 lg:py-7">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_2fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#d5f5e5] px-4 py-1.5 text-xs font-extrabold tracking-wide text-[#078f43]">
                FREE FOR EVERYONE
              </span>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#12396b] sm:text-3xl">
                Your journey in 3 simple steps
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[#17385f] sm:text-base">
                Explore RenalPlan for free. No account needed.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {freeSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative renal-fade-up"
                  style={{
                    animationDelay: `${index * 140 + 180}ms`,
                  }}
                >
                  <Link
                    href={step.href}
                    className={`group block min-h-[150px] rounded-2xl border p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${step.cardClass}`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${step.numberClass}`}
                      >
                        {step.number}
                      </span>

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${step.iconClass}`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    <h3 className="mt-3 font-bold text-[#12396b]">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-xs leading-snug text-slate-700">
                      {step.description}
                    </p>
                  </Link>

                  {index < freeSteps.length - 1 && (
                    <span
                      className="renal-arrow pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-3xl font-light text-[#079447] md:block"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACCOUNT / PREMIUM FEATURES
      ========================================================= */}
      <section className="px-4 py-4 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1450px] rounded-3xl bg-gradient-to-br from-[#eef7ff] to-[#f8fbff] px-5 py-6 shadow-sm sm:px-7 lg:px-8 lg:py-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_2fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#d9ecff] px-4 py-1.5 text-xs font-extrabold tracking-wide text-[#1266c3]">
                WITH A RENALPLAN ACCOUNT
              </span>

              <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-3xl lg:text-[2.25rem]">
                Get more with a free{" "}
                <span className="text-[#079447]">RenalPlan</span> account
              </h2>

              <p className="mt-3 max-w-[430px] text-sm leading-relaxed text-slate-700 sm:text-base">
                Personalise RenalPlan to your needs and unlock extra features
                that make meal planning even easier.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {accountFeatures.map((feature, index) => (
                <Link
                  key={feature.title}
                  style={{
                    animationDelay: `${index * 110 + 120}ms`,
                  }}
                  href={feature.href}
                  className="renal-fade-up group rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${feature.iconClass}`}
                    >
                      {feature.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-[#12396b]">
                          {feature.title}
                        </h3>

                        {feature.badge && (
                          <span className="rounded-full bg-[#ffb15c] px-2.5 py-0.5 text-[10px] font-bold text-white">
                            {feature.badge}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESKTOP SHOWCASE VIDEO
          Kept completely unchanged.
      ========================================================= */}
      <section
        className="hidden px-4 py-6 sm:px-8 lg:block lg:px-10 lg:py-8"
        aria-label="See RenalPlan in action"
      >
        <div className="mx-auto max-w-[1450px] overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <video
            className="block h-auto w-full"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="RenalPlan showcase showing dietary requirements, weekly planning, nutrition and shopping list features"
          >
            <source
              src="/videos/RenalPlan_Showcase_Final_AMENDED.mp4"
              type="video/mp4"
            />
            Your browser does not support the video element.
          </video>
        </div>
      </section>

      {/* =========================================================
          CLOSING CTA
      ========================================================= */}
      <section className="border-t border-green-50 bg-gradient-to-b from-[#f4fbf7] to-white px-4 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="renal-fade-up mx-auto max-w-[1400px] text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-4xl">
            Plan <span className="text-[#079447]">→</span> Shop{" "}
            <span className="text-[#079447]">→</span> Cook
            <br />
            with <span className="text-[#12396b]">Renal</span>
            <span className="text-[#079447]">Plan</span>.
          </h2>

          <Link
            href="/signup"
            className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-[#12396b] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg"
          >
            Create free account
            <span className="text-lg">→</span>
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-slate-100 bg-white px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div>
            <div className="text-lg font-bold">
              <span className="text-[#12396b]">Renal</span>
              <span className="text-[#079447]">Plan</span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Kidney-friendly meals made easier
            </p>
          </div>

          <div className="text-sm text-slate-600">
            <span>Do you have any questions or need help? </span>

            <a
              href="mailto:hello@renalplan.com"
              className="font-semibold text-[#079447] transition hover:text-[#067b3a]"
            >
              Contact us
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}