"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
      <svg viewBox="0 0 64 64" className="h-5 w-5 sm:h-9 sm:w-9" aria-hidden="true">
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
    number: "2",
    title: "Plan Your Week",
    description: "Build your weekly meal plan with ease.",
    href: "/planner",
    cardClass: "border-orange-100 bg-orange-50/60",
    numberClass: "bg-orange-500",
    iconClass: "bg-orange-50 text-orange-500",
    icon: (
      <svg viewBox="0 0 64 64" className="h-5 w-5 sm:h-9 sm:w-9" aria-hidden="true">
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
      <svg viewBox="0 0 64 64" className="h-5 w-5 sm:h-9 sm:w-9" aria-hidden="true">
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
    href: "/promotional-material/my-diet",
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
    href: "/promotional-material/nutrition",
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
    href: "/promotional-material/food-check",
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
    badge: "Premium",
    text: "Save your favourite recipes and access them whenever you want.",
    href: "/promotional-material/favourites",
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

const featureDetails: Record<
  string,
  { eyebrow: string; heading: string; description: string; bullets: string[] }
> = {
  "My Diet": {
    eyebrow: "PERSONALISE YOUR EXPERIENCE",
    heading: "Your diet. Your requirements.",
    description:
      "Tell RenalPlan about your dietary requirements and goals, so your meal-planning experience can be tailored around what matters to you.",
    bullets: [
      "Keep your dietary requirements together in one place.",
      "Set the nutrition goals that matter to your plan.",
      "Help guide meal choices around your personal needs.",
    ],
  },
  Nutrition: {
    eyebrow: "UNDERSTAND YOUR WEEK",
    heading: "See the bigger nutritional picture.",
    description:
      "Review your planned meals with a weekly nutrition summary that helps you understand totals, daily averages and how your plan compares with your goals.",
    bullets: [
      "Review weekly totals and daily averages.",
      "See key nutrients in an easy-to-read summary.",
      "Print a weekly nutrition report for reference.",
    ],
  },
  "Food Check": {
    eyebrow: "MAKE INFORMED FOOD CHOICES",
    heading: "Check a food before it goes in your basket.",
    description:
      "Look up nutritional information for individual foods and make more informed choices when planning meals or shopping.",
    bullets: [
      "Check nutritional information for individual foods.",
      "Use the information to help compare options.",
      "Make food choices with your dietary needs in mind.",
    ],
  },
  Favourites: {
    eyebrow: "SAVE TIME NEXT TIME",
    heading: "Keep your go-to meals close.",
    description:
      "Save recipes you love, so you can find them again without having to search through the full recipe collection.",
    bullets: [
      "Save recipes you want to make again.",
      "Build a personal collection of go-to meals.",
      "Make future meal planning quicker and easier.",
    ],
  },
};

const benefits = [
  "Kidney-friendly recipes",
  "Easy meal planning",
  "Automatic shopping lists",
];

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const foodCheckVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = foodCheckVideoRef.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
      video.play().catch(() => {
        // Some browsers may still block autoplay. The video remains usable
        // without controls if the browser requires a user gesture.
      });
    };

    tryPlay();

    return () => {
      video.pause();
    };
  }, []);

  return (
    <main className="renal-homepage min-h-screen overflow-hidden bg-white text-slate-900">
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
      <section className="renal-home-hero relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-cover bg-[72%_center] bg-no-repeat lg:bg-[76%_center]"
          style={{
            backgroundImage: "url('/images/hero-background.png')",
          }}
        />

        <div className="renal-home-hero-overlay absolute inset-0 bg-gradient-to-r from-white/90 via-white/55 via-[42%] to-transparent lg:via-[47%]" />

        <div className="relative mx-auto flex min-h-[560px] max-w-[1600px] items-center px-5 py-10 sm:min-h-[500px] sm:px-10 sm:py-12 lg:min-h-[420px] lg:px-16 xl:px-24">
          <div className="w-full max-w-[720px] renal-fade-up">
            <h1 className="renal-home-hero-title max-w-[760px] text-[2.7rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#12396b] sm:text-5xl lg:text-[4.05rem]">
              <span className="block">Plan kidney-friendly</span>
              <span className="block">
                meals{" "}
                <span className="text-[#079447]">
                  with confidence.
                </span>
              </span>
            </h1>

            <p className="renal-home-hero-copy mt-5 max-w-[620px] text-base leading-[1.48] text-[#17385f] sm:mt-6 sm:text-lg lg:text-[1.18rem]">
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

            <div className="mt-6 flex flex-wrap items-start gap-x-4 gap-y-2 sm:mt-7 sm:max-w-[650px] sm:gap-x-5">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="renal-home-benefit flex items-start gap-1.5 text-left text-[11px] font-semibold leading-tight text-[#17385f] sm:items-center sm:gap-2 sm:text-sm"
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
            <h2 className="renal-home-section-title text-3xl font-extrabold leading-tight tracking-tight text-[#12396b]">
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
          DESKTOP SHOWCASE VIDEO
      ========================================================= */}
      <section
        className="hidden px-4 py-6 sm:px-8 lg:block lg:px-10 lg:py-8"
        aria-label="See RenalPlan in action"
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-5 text-center">
            <h2 className="renal-home-section-title text-3xl font-extrabold leading-tight tracking-tight text-[#12396b]">
              See Renal<span className="text-[#079447]">Plan</span> in action
            </h2>
            <p className="renal-home-section-copy mx-auto mt-2 max-w-[520px] text-sm leading-relaxed text-[#17385f] sm:text-base">
              From your dietary requirements to your weekly shop — all in one place.
            </p>
          </div>
          <div className="renal-home-video-frame overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <video
            className="block h-auto w-full object-contain"
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
        </div>
      </section>

      {/* =========================================================
          FREE JOURNEY
      ========================================================= */}
      <section className="renal-home-free-section px-4 py-4 sm:px-8 lg:px-10">
        <div className="renal-home-free-panel mx-auto max-w-[1450px] rounded-3xl bg-gradient-to-r from-[#effbf5] to-[#f8fcfa] px-5 py-6 shadow-sm sm:px-7 lg:px-8 lg:py-7">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_2fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#d5f5e5] px-4 py-1.5 text-xs font-extrabold tracking-wide text-[#078f43]">
                FREE FOR EVERYONE
              </span>

              <h2 className="renal-home-section-title mt-3 text-2xl font-extrabold tracking-tight text-[#12396b] sm:text-3xl">
                Your journey in 3 simple steps
              </h2>

              <p className="renal-home-section-copy mt-2 text-sm leading-relaxed text-[#17385f] sm:text-base">
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
                    className={`group block min-h-0 rounded-2xl border p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:min-h-[150px] sm:p-4 ${step.cardClass}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`renal-home-step-number flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm ${step.numberClass}`}
                        >
                          {step.number}
                        </span>
                        <h3 className="renal-home-card-title text-sm font-bold leading-tight text-[#12396b] sm:text-base">
                          {step.title}
                        </h3>
                      </div>

                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${step.iconClass}`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    <p className="renal-home-card-copy mt-1 hidden text-xs leading-snug text-slate-700 sm:block">
                      {step.description}
                    </p>
                  </Link>

                  {index < freeSteps.length - 1 && (
                    <span
                      className="renal-arrow pointer-events-none absolute -bottom-5 left-1/2 z-10 -translate-x-1/2 rotate-90 text-2xl font-light text-[#079447] md:-right-3 md:bottom-auto md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:rotate-0 md:text-3xl"
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
          FOOD CHECK PROMOTION
          Wider/taller demo with benefits alongside the video.
      ========================================================= */}
      <section className="renal-home-food-check px-4 py-5 sm:px-8 lg:px-10 lg:py-7">
        <div className="mx-auto max-w-[1450px]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-[#21445f] dark:bg-[#0c1b27]">
            <div className="grid items-stretch gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:p-9">

              {/* Copy */}
              <div className="order-1 flex h-full flex-col lg:order-1">
                <p className="text-xs font-extrabold tracking-[0.14em] text-[#079447] dark:text-[#45e08a]">
                  FOOD CHECK
                </p>

                <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-slate-800 dark:text-white sm:text-4xl lg:text-[2.65rem]">
                  Check food{" "}
                  <span className="block text-[#079447] dark:text-[#45e08a]">before you buy it.</span>
                </h2>

                <p className="mt-4 max-w-[590px] text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base lg:text-lg">
                  See a food in the supermarket? RenalPlan gives you three simple
                  ways to find it and check its nutritional information — so you
                  can make a more informed choice.
                </p>

                <div className="mt-6 max-w-[610px] space-y-3">
                  <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-[#29475c] dark:bg-[#122738]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#079447] text-sm font-extrabold text-white">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800 dark:text-white">
                        Scan a barcode
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                        Quickly scan the barcode on a food packet.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-[#29475c] dark:bg-[#122738]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#079447] text-sm font-extrabold text-white">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800 dark:text-white">
                        Enter a barcode
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                        If scanning isn't practical, enter the barcode number manually.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-[#29475c] dark:bg-[#122738]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#079447] text-sm font-extrabold text-white">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800 dark:text-white">
                        Search for a food
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                        Can't find a barcode? Search for the food by name instead.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/promotional-material/food-check"
                  className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-3 rounded-xl bg-[#078f43] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#067b3a] hover:shadow-lg"
                >
                  Discover Food Check <span className="text-lg">→</span>
                </Link>

                <div className="mt-auto max-w-[610px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-[#29475c] dark:bg-[#122738]">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#079447] dark:text-[#45e08a]">
                    Nutritional reference
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                    RenalPlan uses McCance and Widdowson’s
                    <span className="font-semibold text-slate-700 dark:text-slate-200"> Composition of Foods Integrated Dataset (CoFID) 2021</span>
                    {" "}as a key reference for food nutrient values.
                  </p>
                  <a
                    href="https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-bold text-[#1266c3] hover:underline dark:text-[#7db9ff]"
                  >
                    View the CoFID 2021 reference →
                  </a>
                </div>
              </div>

              {/* Video */}
              <div className="order-2 lg:order-2">
                <div className="mx-auto w-full max-w-[390px] lg:max-w-[430px]">
                  <div className="mb-3 flex items-center justify-center">
                    <span className="rounded-full bg-slate-100 px-5 py-2 text-xs font-extrabold tracking-wide text-emerald-600 shadow-sm dark:bg-[#102b3c] dark:text-[#45e08a]">
                      SEE IT IN ACTION
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-[#29475c] dark:bg-[#061018]">
                    <video
                      ref={foodCheckVideoRef}
                      className="block h-auto w-full"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      aria-label="RenalPlan Food Check barcode scanning demonstration"
                    >
                      <source src="/videos/RenalPlan_Barcode.mp4" type="video/mp4" />
                      Your browser does not support the video element.
                    </video>
                  </div>

                  <div className="mt-3 flex justify-center">
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-[11px] font-bold text-slate-600 shadow-sm dark:border-[#29475c] dark:bg-[#102b3c] dark:text-slate-200">
                      Scan → Check → Choose
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACCOUNT / PREMIUM FEATURES
      ========================================================= */}
      <section className="renal-home-account-section px-4 py-4 sm:px-8 lg:px-10">
        <div className="renal-home-account-panel mx-auto max-w-[1450px] rounded-3xl bg-gradient-to-br from-[#eef7ff] to-[#f8fbff] px-5 py-6 shadow-sm sm:px-7 lg:px-8 lg:py-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_2fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#d9ecff] px-4 py-1.5 text-xs font-extrabold tracking-wide text-[#1266c3]">
                WITH A RENALPLAN ACCOUNT
              </span>

              <h2 className="renal-home-section-title mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-3xl lg:text-[2.25rem]">
                Get more with a free{" "}
                <span><span className="text-[#1266c3]">Renal</span><span className="text-[#079447]">Plan</span></span> account
              </h2>

              <p className="renal-home-section-copy mt-3 max-w-[430px] text-sm leading-relaxed text-slate-700 sm:text-base">
                Personalise RenalPlan to your needs and unlock extra features
                that make meal planning even easier.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {accountFeatures.map((feature, index) => (
                <button
                  key={feature.title}
                  type="button"
                  style={{
                    animationDelay: `${index * 110 + 120}ms`,
                  }}
                  onClick={() => setSelectedFeature(feature.title)}
                  aria-haspopup="dialog"
                  className="renal-home-feature-card renal-fade-up group w-full rounded-2xl border border-white/80 bg-white/80 p-4 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1266c3] focus-visible:ring-offset-2 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${feature.iconClass}`}
                    >
                      {feature.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="renal-home-card-title font-bold text-[#12396b]">
                          {feature.title}
                        </h3>

                        {feature.badge && (
                          <span className="rounded-full bg-[#ffb15c] px-2.5 py-0.5 text-[10px] font-bold text-white">
                            {feature.badge}
                          </span>
                        )}
                        <span className="ml-auto text-lg text-[#1266c3] transition group-hover:translate-x-0.5" aria-hidden="true">
                          →
                        </span>
                      </div>

                      <p className="renal-home-card-copy mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CLOSING CTA
      ========================================================= */}
      <section className="renal-home-cta border-t border-green-50 bg-gradient-to-b from-[#f4fbf7] to-white px-4 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="renal-fade-up mx-auto max-w-[1400px] text-center">
          <h2 className="renal-home-section-title text-3xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-4xl">
            Check <span className="text-[#079447]">→</span> Plan{" "}
            <span className="text-[#079447]">→</span> Shop
            <br />
            with <span className="text-[#12396b]">Renal</span>
            <span className="text-[#079447]">Plan</span>
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
      <footer className="renal-home-footer border-t border-slate-100 bg-white px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div>
            <div className="text-lg font-bold">
              <span className="text-[#12396b]">Renal</span>
              <span className="text-[#079447]">Plan</span>
            </div>

            <Link
              href="/privacy"
              className="mt-1 inline-block text-sm font-semibold text-[#12396b] transition hover:text-[#079447]"
            >
              Security &amp; Data Protection
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-slate-600 sm:items-end sm:text-right">
            <Link href="/about" className="font-semibold transition hover:opacity-80">
              <span className="renal-home-about-label">About </span><span className="text-[#12396b]">Renal</span>
              <span className="text-[#079447]">Plan</span>
            </Link>

            <span>
              <span>Do you have any questions or need help? </span>
              <a
                href="mailto:hello@renalplan.com"
                className="font-semibold text-[#079447] transition hover:text-[#067b3a]"
              >
                Contact us
              </a>
            </span>
          </div>
        </div>
      </footer>

      {selectedFeature && featureDetails[selectedFeature] && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#071a30]/65 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedFeature(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="renal-feature-modal-title"
            aria-describedby="renal-feature-modal-description"
            className="relative max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-6 pb-7 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setSelectedFeature(null)}
              aria-label="Close feature information"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl leading-none text-slate-600 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1266c3]"
            >
              ×
            </button>

            <div className="pr-10">
              <p className="text-xs font-extrabold tracking-[0.14em] text-[#078f43]">
                {featureDetails[selectedFeature].eyebrow}
              </p>
              <h2
                id="renal-feature-modal-title"
                className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-3xl"
              >
                {featureDetails[selectedFeature].heading}
              </h2>
            </div>

            <p
              id="renal-feature-modal-description"
              className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base"
            >
              {featureDetails[selectedFeature].description}
            </p>

            <ul className="mt-5 space-y-3">
              {featureDetails[selectedFeature].bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dff5e8] text-xs font-extrabold text-[#078f43]" aria-hidden="true">
                    ✓
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#078f43] px-5 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#067b3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#078f43] focus-visible:ring-offset-2"
              >
                Create Your Free Account
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#12396b]/20 bg-white px-5 py-3 text-center text-sm font-bold text-[#12396b] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1266c3] focus-visible:ring-offset-2"
              >
                Sign In
              </Link>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">
              Close this window to keep exploring the homepage.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}