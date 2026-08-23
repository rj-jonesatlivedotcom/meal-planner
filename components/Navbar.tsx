"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* DESKTOP NAVIGATION */}
      <div className="sticky top-0 z-50 hidden w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-sm md:block">

        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">

          {/* BRAND */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900"
          >
            <span className="text-xl">🍴</span>
            <span>Meal Planner</span>
          </Link>

          {/* NAVIGATION */}
          <nav className="ml-10 flex h-full items-center gap-1">

            <Link
              href="/"
              className={`flex h-full items-center rounded-lg px-4 text-sm font-bold transition ${
                pathname === "/"
                  ? "text-orange-600"
                  : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              Home
            </Link>

            <Link
              href="/recipes"
              className={`flex h-full items-center rounded-lg px-4 text-sm font-bold transition ${
                pathname.startsWith("/recipes")
                  ? "text-orange-600"
                  : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              Recipes
            </Link>

            <Link
              href="/planner"
              className={`flex h-full items-center rounded-lg px-4 text-sm font-bold transition ${
                pathname.startsWith("/planner")
                  ? "text-orange-600"
                  : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              Planner
            </Link>

            <Link
              href="/shopping"
              className={`flex h-full items-center rounded-lg px-4 text-sm font-bold transition ${
                pathname.startsWith("/shopping")
                  ? "text-orange-600"
                  : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              Shopping List
            </Link>

          </nav>

        </div>

      </div>

      {/* MOBILE NAVIGATION — UNCHANGED */}
      <div className="absolute right-5 top-5 z-50 md:hidden">

        {/* HAMBURGER BUTTON */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-xl bg-white/90 shadow-sm backdrop-blur-sm"
        >
          <span
            className={`block h-1 w-7 rounded-full bg-green-700 transition ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />

          <span
            className={`block h-1 w-7 rounded-full bg-green-700 transition ${
              open ? "opacity-0" : ""
            }`}
          />

          <span
            className={`block h-1 w-7 rounded-full bg-green-700 transition ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>

        {/* MENU */}
        {open && (
          <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">

            {/* HOME */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-lg font-semibold text-slate-900 hover:bg-green-50"
            >
              🏠 Home
            </Link>

            {/* WEEKLY PLANNER */}
            <Link
              href="/planner"
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-lg font-semibold text-slate-900 hover:bg-blue-50"
            >
              📅 Weekly Planner
            </Link>

            {/* RECIPES */}
            <a
              href="/recipes"
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-lg font-semibold text-slate-900 hover:bg-green-50"
            >
              📖 Recipes
            </a>

            {/* SHOPPING LIST */}
            <Link
              href="/shopping"
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-lg font-semibold text-slate-900 hover:bg-orange-50"
            >
              🛒 Shopping List
            </Link>

            {/* ABOUT */}
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-lg font-semibold text-slate-900 hover:bg-green-50"
            >
              ℹ️ About Meal Planner
            </Link>

          </div>
        )}

      </div>
    </>
  );
}