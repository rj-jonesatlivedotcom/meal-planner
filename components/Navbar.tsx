"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute right-5 top-5 z-50">

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
  );
}