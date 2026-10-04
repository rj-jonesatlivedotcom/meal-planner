"use client";
import RenalPlan from "@/components/RenalPlan";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function KidneyLogo() {
  return (
    <img
      src="/icons/meal-planner-kidney-tick.png"
      alt="RenalPlan kidney-friendly logo"
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
        className={`flex shrink-0 items-center justify-center rounded-xl border border-slate-300 text-slate-900 transition hover:bg-slate-100 ${
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

  const navItems = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
      premium: false,
    },
    {
      href: "/recipes",
      label: "Recipes",
      active: pathname.startsWith("/recipes"),
      premium: false,
    },
    {
      href: "/planner",
      label: "Weekly Planner",
      active: pathname.startsWith("/planner"),
      premium: false,
    },
    {
      href: "/shopping",
      label: "Shopping List",
      active: pathname.startsWith("/shopping"),
      premium: false,
    },
    {
      href: "/requirements",
      label: "My Diet",
      active: pathname.startsWith("/requirements"),
      premium: true,
    },
    {
      href: "/nutrition",
      label: "Nutrition",
      active: pathname.startsWith("/nutrition"),
      premium: true,
    },
    {
      href: "/FoodCheck",
      label: "Food Check",
      active: pathname.startsWith("/FoodCheck"),
      premium: true,
    },
  ];

  return (
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

          <nav className="ml-auto flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-12 items-center whitespace-nowrap rounded-lg px-3 text-[15px] font-bold transition lg:px-3.5 ${
                  item.active
                    ? "text-green-700"
                    : "text-slate-900 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <span className="flex flex-col items-center justify-center leading-none">
                  <span>{item.label}</span>
                  {item.premium && (
                    <span className="mt-1 rounded-full bg-orange-300 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
                      Premium
                    </span>
                  )}
                </span>
              </Link>
            ))}

            {loggedIn && (
              <Link
                href="/account"
                aria-label="My Account"
                className={`flex min-h-12 items-center gap-2 whitespace-nowrap rounded-lg px-3 text-[15px] font-bold transition lg:px-3.5 ${
                  pathname.startsWith("/account")
                    ? "text-green-700"
                    : "text-slate-900 hover:bg-green-50 hover:text-green-700"
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
            {loggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-slate-300 px-5 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl bg-green-700 px-5 py-3 text-base font-bold text-white transition hover:bg-green-800"
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
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-lg font-semibold ${
                  item.active
                    ? "bg-green-50 text-green-700"
                    : "text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span>{item.label}</span>
                  {item.premium && (
                    <span className="rounded-full bg-orange-300 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
                      Premium
                    </span>
                  )}
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
              {loggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-center font-semibold text-slate-900"
                >
                  Log out
                </button>
              ) : (
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
  );
}




