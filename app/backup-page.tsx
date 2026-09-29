"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const freeSteps = [
  {
    number: "1",
    title: "Choose Meals",
    description: "Browse our kidney-friendly recipes that fit your needs.",
    href: "/recipes",
    cardClass: "border-green-100 bg-green-50/60",
    numberClass: "bg-emerald-400",
    iconClass: "bg-green-50 text-emerald-600",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <path d="M8 14c10-3 18-1 24 5v34c-6-6-14-8-24-5V14Z" fill="white" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M56 14c-10-3-18-1-24 5v34c6-6 14-8 24-5V14Z" fill="white" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M32 19v34" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Plan Your Week",
    description: "Build your weekly meal plan with ease.",
    href: "/planner",
    cardClass: "border-orange-100 bg-orange-50/60",
    numberClass: "bg-orange-400",
    iconClass: "bg-orange-50 text-orange-500",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <rect x="10" y="14" width="44" height="40" rx="5" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M20 9v11M44 9v11M10 26h44" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M21 34h6M37 34h6M21 44h6M37 44h6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Shop",
    description: "Your shopping list is created automatically.",
    href: "/shopping",
    cardClass: "border-blue-100 bg-blue-50/60",
    numberClass: "bg-blue-400",
    iconClass: "bg-blue-50 text-blue-600",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <path d="M13 18h7l4 28h27l6-21H22" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="29" cy="54" r="4" fill="currentColor" />
        <circle cx="48" cy="54" r="4" fill="currentColor" />
        <path d="M31 27h18M32 34h15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
    iconClass: "bg-violet-100 text-violet-600",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <circle cx="24" cy="15" r="7" fill="currentColor" />
        <path d="M10 40c0-8 6-13 14-13s14 5 14 13" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Nutrition",
    badge: "Premium",
    text: "See your weekly nutrition summary with totals, averages and a printable report.",
    href: "/nutrition",
    iconClass: "bg-pink-100 text-pink-600",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <path d="M7 40h34" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M12 36V22h6v14M21 36V12h6v24M30 36V18h6v18" fill="none" stroke="currentColor" strokeWidth="3.5" />
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
        <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="m28 28 11 11" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
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
        <path d="M24 39S8 29 8 17c0-5 3-9 8-9 4 0 7 3 8 6 1-3 4-6 8-6 5 0 8 4 8 9 0 12-16 22-16 22Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Pick for Me",
    text: "Let RenalPlan create a weekly meal plan for you.",
    href: "/planner",
    iconClass: "bg-indigo-100 text-indigo-600",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <path d="m24 7 16 17-16 17L8 24 24 7Z" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Household Quantities",
    text: "Choose the number of people you are cooking for and adjust quantities automatically.",
    href: "/planner",
    iconClass: "bg-emerald-100 text-emerald-600",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <circle cx="17" cy="16" r="6" fill="currentColor" />
        <circle cx="31" cy="16" r="6" fill="currentColor" />
        <path d="M6 38c0-7 4-11 11-11s11 4 11 11M20 38c0-7 4-11 11-11s11 4 11 11" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const meals = [
  ["Monday", "Porridge", "Chicken salad", "Beef pasta"],
  ["Tuesday", "Scrambled eggs", "Tuna wrap", "Chicken curry"],
  ["Wednesday", "Toast & eggs", "Ham sandwich", "Fish & chips"],
  ["Thursday", "Porridge", "Chicken wrap", "Sausage & mash"],
];

function RenalPlanDemo() {
  const [step, setStep] = useState(0);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    const sequence = [
      { at: 0, step: 0 },
      { at: 3000, step: 1 },
      { at: 5600, step: 2 },
      { at: 7900, step: 3 },
      { at: 11200, step: 4 },
      { at: 14500, step: 0 },
    ];

    let timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      timers.forEach(clearTimeout);
      timers = sequence.map(({ at, step: nextStep }) =>
        setTimeout(() => {
          setStep(nextStep);
          setRolling(nextStep === 2);
        }, at),
      );
    };

    run();
    const loop = setInterval(run, 14500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, []);

  const status = useMemo(() => {
    if (step === 0) return "Set your dietary requirement";
    if (step === 1) return "Choose your meals — or let RenalPlan pick them for you";
    if (step === 2) return "RenalPlan is choosing appropriate meals…";
    if (step === 3) return "Your personalised week is ready";
    return "Your nutrition and shopping are ready too";
  }, [step]);

  return (
    <section className="px-4 py-7 sm:px-8 lg:px-10 lg:py-9">
      <div className="mx-auto max-w-[1450px] overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_18px_60px_rgba(18,57,107,0.10)]">
        <div className="bg-gradient-to-r from-[#f1f9ff] via-white to-[#f3fbf6] px-5 py-7 text-center sm:px-8 lg:py-9">
          <span className="inline-flex rounded-full bg-[#d9ecff] px-4 py-1.5 text-xs font-extrabold tracking-wide text-[#1266c3]">
            SEE RENALPLAN IN ACTION
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-extrabold tracking-tight text-[#12396b] sm:text-3xl lg:text-4xl">
            From your requirements to a personalised week
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Tell RenalPlan what you need, then let it do the planning for you.
          </p>
        </div>

        <div className="px-3 pb-5 sm:px-6 sm:pb-7 lg:px-10 lg:pb-9">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">
            <div className="flex h-9 items-center gap-2 border-b border-slate-200 bg-white px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
              <div className="ml-3 h-5 flex-1 rounded-full bg-slate-100" />
            </div>

            <div className="relative min-h-[360px] bg-gradient-to-br from-slate-50 via-white to-blue-50/50 p-4 sm:min-h-[390px] sm:p-6">
              {step === 0 && (
                <DietScene />
              )}

              {(step === 1 || step === 2 || step === 3) && (
                <PlannerScene rolling={rolling} populated={step >= 3} />
              )}

              {step === 4 && <OutcomeScene />}
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="min-h-[28px] text-sm font-semibold text-[#12396b] transition-all duration-500 sm:text-base">
              {status}
            </p>
            <div className="mt-3 flex justify-center gap-2" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((item) => (
                <span
                  key={item}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    item === step ? "w-7 bg-[#078f43]" : "w-2 bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DietScene() {
  return (
    <div className="mx-auto max-w-4xl animate-[renalDemoFade_.6s_ease-out]">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#078f43]">My Diet</p>
            <h3 className="mt-1 text-xl font-extrabold text-[#12396b] sm:text-2xl">Your dietary requirements</h3>
          </div>
          <div className="rounded-xl bg-[#eef8f2] px-3 py-2 text-xs font-bold text-[#078f43]">Personalised</div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-[#078f43] bg-[#effbf5] p-4 shadow-sm animate-[renalDemoPulse_.9s_ease-out]">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#078f43] text-sm font-bold text-white">✓</span>
              <div>
                <p className="font-bold text-[#12396b]">Low potassium</p>
                <p className="text-xs text-slate-500">RenalPlan will use this when planning meals.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 opacity-55">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-300 text-sm text-slate-300">✓</span>
              <p className="font-semibold text-slate-400">Other dietary requirements</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <span className="rounded-lg bg-[#078f43] px-5 py-2.5 text-xs font-bold text-white shadow-sm">Save requirements</span>
        </div>
      </div>
    </div>
  );
}

function PlannerScene({ rolling, populated }: { rolling: boolean; populated: boolean }) {
  return (
    <div className="mx-auto max-w-5xl animate-[renalDemoFade_.6s_ease-out]">
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#078f43]">Weekly Planner</p>
            <h3 className="mt-1 text-xl font-extrabold text-[#12396b]">Your week</h3>
          </div>
          <div className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-300 ${rolling ? "bg-orange-100 text-orange-600 shadow-[0_0_24px_rgba(249,115,22,0.22)]" : "bg-[#eef8f2] text-[#078f43]"}`}>
            <span className={rolling ? "animate-[renalDiceRoll_.85s_linear_infinite] text-xl" : "text-xl"}>🎲</span>
            {rolling ? "Picking for you…" : "Pick for Me"}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {meals.map(([day, breakfast, lunch, dinner], index) => (
            <div key={day} className={`rounded-xl border bg-slate-50 p-2.5 transition-all duration-500 ${populated ? "border-green-200 bg-green-50/40" : "border-slate-200"}`}>
              <p className="mb-2 text-xs font-extrabold text-[#12396b]">{day}</p>
              <MealSlot label="Breakfast" meal={populated ? breakfast : ""} delay={index * 120} />
              <MealSlot label="Lunch" meal={populated ? lunch : ""} delay={index * 120 + 80} />
              <MealSlot label="Dinner" meal={populated ? dinner : ""} delay={index * 120 + 160} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MealSlot({ label, meal, delay }: { label: string; meal: string; delay: number }) {
  return (
    <div
      className="mb-1.5 min-h-[44px] rounded-lg border border-white bg-white p-2 shadow-sm"
      style={meal ? { animation: `renalMealIn .45s ease-out ${delay}ms both` } : undefined}
    >
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
      {meal ? (
        <p className="mt-0.5 text-[11px] font-semibold leading-tight text-[#12396b]">{meal}</p>
      ) : (
        <div className="mt-1 h-2 w-16 rounded-full bg-slate-100" />
      )}
    </div>
  );
}

function OutcomeScene() {
  return (
    <div className="mx-auto max-w-5xl animate-[renalDemoFade_.6s_ease-out]">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#078f43]">Nutrition</p>
              <h3 className="mt-1 text-lg font-extrabold text-[#12396b]">Your weekly summary</h3>
            </div>
            <span className="rounded-full bg-[#eef8f2] px-3 py-1 text-[10px] font-bold text-[#078f43]">Ready</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[["Potassium", "Low"], ["Phosphate", "Good"], ["Salt", "On track"]].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="mx-auto h-9 w-9 rounded-full bg-[#078f43]/15" />
                <p className="mt-2 text-[10px] font-bold text-slate-400">{label}</p>
                <p className="mt-0.5 text-xs font-extrabold text-[#12396b]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#078f43]">Shopping List</p>
              <h3 className="mt-1 text-lg font-extrabold text-[#12396b]">Ready for the shop</h3>
            </div>
            <span className="text-xl">🛒</span>
          </div>
          <div className="mt-5 space-y-2">
            {["Chicken breast", "White rice", "Iceberg lettuce", "Low-fat sausages"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2" style={{ animation: `renalMealIn .4s ease-out ${index * 90}ms both` }}>
                <span className="h-2.5 w-2.5 rounded-full bg-[#078f43]" />
                <span className="text-xs font-semibold text-[#12396b]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


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
          0%, 100% {
            transform: translateY(0) rotate(-4deg);
          }
          50% {
            transform: translateY(-7px) rotate(-3deg);
          }
        }

        @keyframes renalArrow {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.65;
          }
          50% {
            transform: translateX(5px);
            opacity: 1;
          }
        }

        @keyframes renalPulse {
          0%, 100% {
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

        @keyframes renalDemoFade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes renalDemoPulse {
          0% { transform: scale(1); }
          45% { transform: scale(1.025); }
          100% { transform: scale(1); }
        }

        @keyframes renalDiceRoll {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(95deg) scale(1.12); }
          50% { transform: rotate(190deg) scale(0.94); }
          75% { transform: rotate(285deg) scale(1.10); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes renalMealIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
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
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-cover bg-[72%_center] bg-no-repeat lg:bg-[76%_center]"
          style={{ backgroundImage: "url('/images/hero-background.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/55 via-[42%] to-transparent lg:via-[47%]" />

        <div className="relative mx-auto flex min-h-[350px] max-w-[1600px] items-center px-6 py-8 sm:px-10 lg:min-h-[370px] lg:px-16 xl:px-24">
          <div className="w-full max-w-[720px] renal-fade-up">
            <h1 className="max-w-[760px] text-[2.45rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#12396b] sm:text-5xl lg:text-[3.65rem]">
              <span className="block">Plan kidney-friendly</span>
              <span className="block">
                meals <span className="text-[#079447]">with confidence.</span>
              </span>
            </h1>

            <p className="mt-4 max-w-[620px] text-base leading-[1.45] text-[#17385f] sm:text-lg lg:text-[1.08rem]">
              Choose meals that fit your dietary requirements, see your weekly
              nutrition at a glance, and get your shopping list automatically.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/recipes"
                className="renal-fade-up inline-flex items-center justify-center gap-3 rounded-xl bg-[#078f43] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#067b3a] hover:shadow-lg"
              >
                Explore recipes
                <span className="text-lg">→</span>
              </Link>

              <Link
                href="/signup"
                className="renal-fade-up inline-flex items-center justify-center gap-3 rounded-xl bg-[#12396b] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg"
              >
                Create free account
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>

          <div
            className="renal-float absolute right-5 top-6 hidden w-[205px] rotate-[-4deg] rounded-[28%_20%_25%_18%] bg-[#dff5e6] px-4 py-3 text-center text-[1.2rem] font-semibold leading-[1.02] text-[#12396b] shadow-sm lg:block xl:right-16"
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

      {/* FREE JOURNEY */}
      <section className="px-4 py-3 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1450px] rounded-3xl bg-gradient-to-r from-[#effbf5] to-[#f8fcfa] px-5 py-5 shadow-sm sm:px-7 lg:px-8 lg:py-5">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_2fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#d5f5e5] px-4 py-1.5 text-xs font-extrabold tracking-wide text-[#078f43]">
                FREE FOR EVERYONE
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#12396b] sm:text-3xl">
                Your journey in 3 simple steps
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#17385f] sm:text-base">
                Explore RenalPlan for free. No account needed.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {freeSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative renal-fade-up"
                  style={{ animationDelay: `${index * 140 + 180}ms` }}
                >
                  <Link
                    href={step.href}
                    className={`group block min-h-[128px] rounded-2xl border p-3.5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${step.cardClass}`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${step.numberClass}`}
                      >
                        {step.number}
                      </span>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${step.iconClass}`}
                      >
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="mt-2 font-bold text-[#12396b]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-snug text-slate-700">
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

      <RenalPlanDemo />

      {/* ACCOUNT / PREMIUM FEATURES */}
      <section className="px-4 py-3 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1450px] rounded-3xl bg-gradient-to-br from-[#eef7ff] to-[#f8fbff] px-5 py-5 shadow-sm sm:px-7 lg:px-8 lg:py-6">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_2fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#d9ecff] px-4 py-1.5 text-xs font-extrabold tracking-wide text-[#1266c3]">
                WITH A RENALPLAN ACCOUNT
              </span>

              <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[#12396b] sm:text-3xl lg:text-[2.05rem]">
                Unlock more with your free{" "}
                <span className="text-[#079447]">RenalPlan</span> account
              </h2>

              <p className="mt-2 max-w-[430px] text-sm leading-relaxed text-slate-700 sm:text-base">
                Create a free account to personalise your experience and
                unlock extra features that make meal planning even easier.
              </p>

              <Link
                href="/signup"
                className="mt-4 inline-flex items-center justify-center gap-3 rounded-xl bg-[#12396b] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg"
              >
                Create free account
                <span className="text-lg">→</span>
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {accountFeatures.map((feature, index) => (
                <Link
                  key={feature.title}
                  style={{ animationDelay: `${index * 110 + 120}ms` }}
                  href={feature.href}
                  className="renal-fade-up group rounded-2xl border border-white/80 bg-white/75 p-3.5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${feature.iconClass}`}
                    >
                      {feature.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-[#12396b]">
                          {feature.title}
                        </h3>

                        {feature.badge && (
                          <span className="renal-pulse rounded-full bg-[#ffb15c] px-2 py-0.5 text-[10px] font-bold text-white">
                            {feature.badge}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-[11px] leading-relaxed text-slate-600 sm:text-xs">
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

      {/* CLOSING CTA */}
      <section className="border-t border-green-50 bg-gradient-to-b from-[#f4fbf7] to-white px-4 py-7 sm:px-8 lg:px-10 lg:py-8">
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
            className="mt-4 inline-flex items-center justify-center gap-3 rounded-xl bg-[#12396b] px-8 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2f59] hover:shadow-lg"
          >
            Create free account
            <span className="text-lg">→</span>
          </Link>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer className="border-t border-slate-100 bg-white px-5 py-5 sm:px-8 lg:px-12">
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
