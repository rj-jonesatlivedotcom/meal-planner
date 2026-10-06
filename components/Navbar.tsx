"use client";
import RenalPlan from "@/components/RenalPlan";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function KidneyLogo() {
  return (
    <Image
      src="/icons/meal-planner-kidney-tick.png"
      alt="RenalPlan kidney-friendly logo"
      width={64}
      height={64}
      sizes="56px"
      className="h-14 w-12 shrink-0 object-contain sm:h-16 sm:w-14"
      aria-hidden="true"
    />
  );
}

function PageIcon({
  type,
}: {
  type:
    | "requirements"
    | "recipes"
    | "planner"
    | "shopping"
    | "nutrition"
    | "foodcheck";
}) {
  const colour =
    type === "requirements"
      ? "text-purple-600"
      : type === "recipes"
        ? "text-green-700"
        : type === "planner"
          ? "text-orange-600"
          : type === "nutrition"
            ? "text-pink-600"
            : "text-blue-600";

  return (
    <svg
      viewBox="0 0 48 48"
      className={`h-8 w-8 ${colour}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "requirements" && (
        <>
          <circle cx="24" cy="16" r="6" />
          <path d="M12 38c0-7 5-12 12-12s12 5 12 12" />
        </>
      )}

      {type === "recipes" && (
        <>
          <path d="M8 10.5c5-2 10-1.2 16 2v25c-6-3.2-11-4-16-2Z" />
          <path d="M40 10.5c-5-2-10-1.2-16 2v25c6-3.2 11-4 16-2Z" />
          <path d="M24 12.5v25" />
        </>
      )}

      {type === "planner" && (
        <>
          <rect x="8" y="10" width="32" height="30" rx="4" />
          <path d="M15 7v7M33 7v7M8 19h32" />
          <path d="M16 25h4M28 25h4M16 32h4M28 32h4" />
        </>
      )}

      {type === "nutrition" && (
        <>
          <path d="M8 39h32" />
          <path d="M12 35V22h6v13" />
          <path d="M21 35V13h6v22" />
          <path d="M30 35V18h6v17" />
        </>
      )}

      {type === "foodcheck" && (
        <>
          <circle cx="21" cy="21" r="10" />
          <path d="m28.5 28.5 9 9" />
          <path d="M17 21h8M21 17v8" />
        </>
      )}

      {type === "shopping" && (
        <>
          <path d="M8 11h5l4 20h20l4-14H15" />
          <circle cx="20" cy="37" r="2.5" />
          <circle cx="34" cy="37" r="2.5" />
        </>
      )}
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme;
    if (currentTheme === "dark" || currentTheme === "light") {
      setTheme(currentTheme);
    }

    const observer = new MutationObserver(() => {
      const nextTheme = document.documentElement.dataset.theme;
      if (nextTheme === "dark" || nextTheme === "light") {
        setTheme(nextTheme);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const supabase = createClient();

    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setLoggedIn(!!user);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    setLoggedIn(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  async function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem("renalplan-theme", nextTheme);
    } catch {
      // The current page theme still changes if localStorage is unavailable.
    }

    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const { error } = await supabase.auth.updateUser({
        data: { renalplan_theme: nextTheme },
      });
      if (error) {
        console.error("Could not save RenalPlan theme preference:", error.message);
      }
    }
  }

  function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
    return (
      <button
        type="button"
        onClick={() => void toggleTheme()}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className={`flex shrink-0 items-center justify-center rounded-lg transition ${theme === "dark" ? "text-slate-100/90 hover:bg-white/10 hover:text-green-300" : "text-slate-800 hover:bg-green-50 hover:text-green-700"} ${
          mobile ? "h-12 w-12" : "h-12 w-12"
        }`}
      >
        {theme === "dark" ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />
          </svg>
        )}
      </button>
    );
  }

  const pageHeader: {
    icon:
      | "requirements"
      | "recipes"
      | "planner"
      | "shopping"
      | "nutrition"
    | "foodcheck";
    title: string;
    subtitle: string;
  } | null =
    pathname.startsWith("/recipes")
      ? {
          icon: "recipes",
          title: "Recipes",
          subtitle:
            "Browse kidney-friendly recipes.",
        }
      : pathname.startsWith("/planner")
        ? {
            icon: "planner",
            title: "Weekly Planner",
            subtitle: "Plan your meals for the week.",
          }
        : pathname.startsWith("/nutrition")
          ? {
              icon: "nutrition",
              title: "Nutrition",
              subtitle:
                "Nutritional details of your plan.",
            }
          : pathname.startsWith("/FoodCheck")
            ? {
                icon: "foodcheck",
                title: "Food Check",
                subtitle:
                  "Check nutritional information.",
              }
          : pathname.startsWith("/shopping")
            ? {
                icon: "shopping",
                title: "Shopping List",
                subtitle:
                  "Your ingredients",
              }
            : pathname.startsWith("/requirements")
              ? {
                  icon: "requirements",
                  title: "My Diet",
                  subtitle:
                    "Tell us what matters to you.",
                }
              : null;

  const loggedOutNavItems = [
    { href: "/", label: "Home", active: pathname === "/", premium: false },
    { href: "/recipes", label: "Recipes", active: pathname.startsWith("/recipes"), premium: false },
    { href: "/planner", label: "Weekly Planner", active: pathname.startsWith("/planner"), premium: false },
    { href: "/shopping", label: "Shopping List", active: pathname.startsWith("/shopping"), premium: false },
    { href: "/requirements", label: "My Diet", active: pathname.startsWith("/requirements"), premium: true },
    { href: "/nutrition", label: "Nutrition", active: pathname.startsWith("/nutrition"), premium: true },
    { href: "/FoodCheck", label: "Food Check", active: pathname.startsWith("/FoodCheck"), premium: true },
  ];

  const loggedInNavItems = [
    { href: "/", label: "Home", active: pathname === "/", premium: false },
    { href: "/requirements", label: "My Diet", active: pathname.startsWith("/requirements"), premium: true },
    { href: "/recipes", label: "Recipes", active: pathname.startsWith("/recipes"), premium: false },
    { href: "/planner", label: "Planner", active: pathname.startsWith("/planner"), premium: false },
    { href: "/nutrition", label: "Nutrition", active: pathname.startsWith("/nutrition"), premium: true },
    { href: "/shopping", label: "Shopping List", active: pathname.startsWith("/shopping"), premium: false },
    { href: "/FoodCheck", label: "Food Check", active: pathname.startsWith("/FoodCheck"), premium: true },
  ];

  const navItems = loggedIn ? loggedInNavItems : loggedOutNavItems;

  return (
    <>
      <style jsx>{`
        @keyframes renalplan-glimmer {
          0%, 55% { transform: translateX(-140%) rotate(18deg); opacity: 0; }
          65% { opacity: 1; }
          85% { transform: translateX(140%) rotate(18deg); opacity: 0; }
          100% { transform: translateX(140%) rotate(18deg); opacity: 0; }
        }

        @keyframes renalplan-sparkle {
          0%, 70%, 100% { transform: scale(1) rotate(0deg); opacity: .75; }
          80% { transform: scale(1.18) rotate(12deg); opacity: 1; }
          90% { transform: scale(.92) rotate(-8deg); opacity: .9; }
        }

        .renalplan-mychef {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .renalplan-mychef::after {
          content: "";
          position: absolute;
          inset: -45% -25%;
          width: 34%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.65),
            rgba(255,255,255,.95),
            transparent
          );
          transform: translateX(-140%) rotate(18deg);
          animation: renalplan-glimmer 3.2s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .renalplan-mychef-sparkle {
          animation: renalplan-sparkle 2.2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .renalplan-mychef::after,
          .renalplan-mychef-sparkle {
            animation: none;
          }
        }
      `}</style>

      <header className="relative z-50 w-full border-b border-slate-200/80 bg-white shadow-sm">
      {/* DESKTOP NAVIGATION */}
      <div className="hidden lg:block">
        <div className="mx-auto flex min-h-[82px] max-w-[1500px] items-center gap-8 px-8 lg:px-10">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-3"
          >
            {pageHeader ? (
              <>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl">
                  <PageIcon type={pageHeader.icon} />
                </div>

                <div className="leading-tight">
                  <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {pageHeader.title}
                  </div>

                  <div className="mt-1 text-base text-slate-600">
                    {pageHeader.subtitle}
                  </div>
                </div>
              </>
            ) : (
              <>
                <KidneyLogo />

                <div className="leading-tight">
                  <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                    <RenalPlan />
                  
                  </div>

                  <div className="mt-1 text-base text-slate-600">
                    Kidney-friendly meals made easier
                  </div>
                </div>
              </>
            )}
          </Link>

          <div className="ml-auto flex min-w-0 flex-1 items-center justify-center">
            {loggedIn && pathname.startsWith("/planner") && (

              <button
                type="button"
                onClick={() => router.push("/planner?mychef=1")}
                aria-label="MyChef - let MyChef plan your week"
                className={`renalplan-mychef relative mr-0 flex min-h-11 items-center gap-2 rounded-full border px-4 text-[15px] font-extrabold shadow-sm transition ${
                  theme === "dark"
                    ? "border-orange-500/70 bg-orange-700 text-white hover:bg-orange-600"
                    : "border-orange-500 bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                <span className="relative z-10 text-lg leading-none" aria-hidden="true">👨‍🍳</span>
                <span className="relative z-10">MyChef</span>
                <span className="renalplan-mychef-sparkle relative z-10 text-base leading-none" aria-hidden="true">✦</span>
              </button>
            )}
          </div>

          <nav className="flex shrink-0 items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`relative flex min-h-12 items-center whitespace-nowrap px-2.5 text-[15px] font-bold transition lg:px-3 ${
                  item.premium && !loggedIn
                    ? theme === "dark"
                      ? "text-red-300 hover:text-red-200"
                      : "text-slate-500 hover:text-slate-700"
                    : item.active
                      ? theme === "dark"
                        ? "text-green-300 after:absolute after:inset-x-2 after:bottom-1 after:h-0.5 after:rounded-full after:bg-green-400"
                        : "text-green-700 after:absolute after:inset-x-2 after:bottom-1 after:h-0.5 after:rounded-full after:bg-green-600"
                      : theme === "dark"
                        ? "text-slate-100/90 hover:text-green-300"
                        : "text-slate-800 hover:text-green-700"
                }`}
              >
                <span className="flex items-center justify-center gap-1.5 leading-none">
                  <span className={theme === "dark" && item.premium && !loggedIn ? "!text-red-300" : undefined}>{item.label}</span>
                  {item.premium && !loggedIn && (
                    <span
                      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center ${theme === "dark" ? "text-red-300" : "text-slate-500"}`}
                      aria-hidden="true"
                      title="Log in to access"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="5" y="10" width="14" height="10" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      </svg>
                    </span>
                  )}
                </span>
              </Link>
            ))}

            {loggedIn && (
              <Link
                href="/account"
                aria-label="My Account"
                className={`relative flex min-h-12 items-center gap-2 whitespace-nowrap px-2.5 text-[15px] font-bold transition lg:px-3 ${
                  pathname.startsWith("/account")
                    ? theme === "dark"
                      ? "text-green-300 after:absolute after:inset-x-2 after:bottom-1 after:h-0.5 after:rounded-full after:bg-green-400"
                      : "text-green-700 after:absolute after:inset-x-2 after:bottom-1 after:h-0.5 after:rounded-full after:bg-green-600"
                    : theme === "dark"
                      ? "text-slate-100/90 hover:text-green-300"
                      : "text-slate-800 hover:text-green-700"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
                </svg>
                <span>My Account</span>
              </Link>
            )}
          </nav>

          <div className="ml-2 flex shrink-0 items-center gap-3">
            <ThemeToggle />
            {loggedIn ? null : (
              <>
                <Link
                  href="/auth/login"
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${theme === "dark" ? "text-slate-100/90 hover:bg-white/10 hover:text-green-300" : "text-slate-800 hover:bg-green-50 hover:text-green-700"}`}
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-[#067b3a] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#056b32]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="lg:hidden">
        <div className="flex min-h-[76px] items-center justify-between px-5">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
          >
            {pageHeader ? (
              <>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl">
                  <PageIcon type={pageHeader.icon} />
                </div>

                <div className="min-w-0 leading-tight">
                  <div className="text-xl font-extrabold tracking-tight text-slate-900">
                    {pageHeader.title}
                  </div>

                  <div className="mt-1 text-sm text-slate-600">
                    {pageHeader.subtitle}
                  </div>
                </div>
              </>
            ) : (
              <>
                <KidneyLogo />

                <div className="min-w-0 leading-tight">
                  <div className="text-xl font-extrabold tracking-tight text-slate-900">
                    <RenalPlan />
                  </div>

                  <div className="mt-1 text-sm text-slate-600">
                    Kidney-friendly meals made easier
                  </div>
                </div>
              </>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={
              open ? "Close menu" : "Open menu"
            }
            aria-expanded={open}
            className="flex h-12 w-12 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl text-green-700 transition hover:bg-green-50"
          >
            <span
              className={`block h-1 w-8 rounded-full bg-current transition ${
                open
                  ? "translate-y-2 rotate-45"
                  : ""
              }`}
            />

            <span
              className={`block h-1 w-8 rounded-full bg-current transition ${
                open ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-1 w-8 rounded-full bg-current transition ${
                open
                  ? "-translate-y-2 -rotate-45"
                  : ""
              }`}
            />
          </button>
        </div>

        {open && (
          <nav className="border-t border-slate-200 bg-white px-5 pb-4 pt-2 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-lg font-semibold ${
                  item.premium && !loggedIn
                    ? `${theme === "dark" ? "text-red-300 hover:bg-red-500/10 hover:text-red-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`
                    : item.active
                      ? "bg-green-50 text-green-700"
                      : "text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className={theme === "dark" && item.premium && !loggedIn ? "!text-red-300" : undefined}>{item.label}</span>
                    {item.premium && !loggedIn && (
                      <span
                        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center ${theme === "dark" ? "text-red-300" : "text-slate-500"}`}
                        aria-hidden="true"
                        title="Log in to access"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="5" y="10" width="14" height="10" rx="2" />
                          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                        </svg>
                      </span>
                    )}
                  </span>
                </span>
              </Link>
            ))}

            {loggedIn && (
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-semibold ${
                  pathname.startsWith("/account")
                    ? "bg-green-50 text-green-700"
                    : "text-slate-900 hover:bg-slate-50"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
                </svg>
                <span>My Account</span>
              </Link>
            )}

            <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
              <span className="text-sm font-semibold text-slate-600">{theme === "dark" ? "Dark mode" : "Light mode"}</span>
              <ThemeToggle mobile />
              {loggedIn ? null : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-center font-semibold text-slate-900"
                  >
                    Log in
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-xl bg-green-700 px-4 py-3 text-center font-bold text-white"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
    </>
  );
}




