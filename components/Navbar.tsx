"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function KidneyLogo() {
  return (
    <img
      src="/icons/meal-planner-kidney-tick.png"
      alt="Meal Planner kidney-friendly logo"
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
    | "nutrition";
}) {
  const colour =
    type === "requirements"
      ? "text-purple-600"
      : type === "recipes"
        ? "text-green-700"
        : type === "planner"
          ? "text-orange-600"
          : type === "nutrition"
            ? "text-emerald-700"
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
  const pathname = usePathname();
  const router = useRouter();

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

  const pageHeader: {
    icon:
      | "requirements"
      | "recipes"
      | "planner"
      | "shopping"
      | "nutrition";
    title: string;
    subtitle: string;
  } | null =
    pathname.startsWith("/recipes")
      ? {
          icon: "recipes",
          title: "Recipes",
          subtitle:
            "Browse delicious kidney-friendly recipes.",
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
                "See the nutritional details of your weekly plan.",
            }
          : pathname.startsWith("/shopping")
            ? {
                icon: "shopping",
                title: "Shopping List",
                subtitle:
                  "Your ingredients, organised by category.",
              }
            : pathname.startsWith("/requirements")
              ? {
                  icon: "requirements",
                  title: "My Requirements",
                  subtitle:
                    "Tell us what matters to you.",
                }
              : null;

  const navItems = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/requirements",
      label: "My Requirements",
      active: pathname.startsWith("/requirements"),
    },
    {
      href: "/recipes",
      label: "Recipes",
      active: pathname.startsWith("/recipes"),
    },
    {
      href: "/planner",
      label: "Weekly Planner",
      active: pathname.startsWith("/planner"),
    },
    {
      href: "/nutrition",
      label: "Nutrition",
      active: pathname.startsWith("/nutrition"),
    },
    {
      href: "/shopping",
      label: "Shopping List",
      active: pathname.startsWith("/shopping"),
    },
  ];

  return (
    <header className="relative z-50 w-full border-b border-slate-200/80 bg-white shadow-sm">
      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:block">
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
                    Meal Planner
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
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-2 flex shrink-0 items-center gap-3">
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
      <div className="md:hidden">
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
                    Meal Planner
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
                {item.label}
              </Link>
            ))}

            <div className="mt-2 flex gap-3 border-t border-slate-200 pt-3">
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