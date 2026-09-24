"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AccountPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function loadAccount() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      setEmail(user.email ?? "");
      setLoading(false);
    }

    loadAccount();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-8 sm:py-9">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-slate-600">Loading your account...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:py-9">
      <div className="mx-auto max-w-6xl">

        {/* TWO-COLUMN ACCOUNT LAYOUT */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">

          {/* LEFT COLUMN — ACCOUNT */}
          <section>
            <div className="mb-3">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[1.75rem]">
                My Account
              </h1>

              <p className="mt-1 text-base leading-6 text-slate-600 sm:text-lg">
                Manage your account and security.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

              {/* EMAIL */}
              <div className="px-5 py-5 sm:px-6">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">
                      Email address
                    </p>

                    <p className="mt-1 break-all text-base font-bold text-slate-900 sm:text-lg">
                      {email}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 text-sm font-bold text-[#174A7E] sm:text-base"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* CHANGE PASSWORD */}
              <Link
                href="/auth/reset-password"
                className="group flex items-center gap-4 border-t border-slate-200 px-5 py-4 transition hover:bg-slate-50 sm:px-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#174A7E]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                    />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <path d="M12 14v2" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-base font-extrabold text-[#174A7E] sm:text-lg">
                    Change password
                  </p>

                  <p className="mt-0.5 text-sm leading-5 text-slate-600 sm:text-base">
                    Update your RenalPlan password.
                  </p>
                </div>

                <span className="shrink-0 text-2xl font-light text-[#174A7E] transition-transform group-hover:translate-x-1">
                  ›
                </span>
              </Link>

              {/* SECURITY & DATA PROTECTION */}
              <Link
                href="/privacy"
                className="group flex items-center gap-4 border-t border-slate-200 px-5 py-4 transition hover:bg-slate-50 sm:px-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#174A7E]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M12 3l7 3v5c0 4.7-3 8.1-7 10-4-1.9-7-5.3-7-10V6l7-3z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-base font-extrabold text-[#174A7E] sm:text-lg">
                    Security &amp; Data Protection
                  </p>

                  <p className="mt-0.5 text-sm leading-5 text-slate-600 sm:text-base">
                    Learn how your account and personal information are
                    protected.
                  </p>
                </div>

                <span className="shrink-0 text-2xl font-light text-[#174A7E] transition-transform group-hover:translate-x-1">
                  ›
                </span>
              </Link>

              {/* DELETE ACCOUNT */}
              <button
                type="button"
                onClick={() => {
                  alert(
                    "Account deletion will be available here once the secure account deletion process has been connected."
                  );
                }}
                className="group flex w-full items-center gap-4 border-t border-slate-200 px-5 py-4 text-left transition hover:bg-red-50 sm:px-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M4 7h16" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M6 7l1 13h10l1-13" />
                    <path d="M9 7V4h6v3" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-base font-extrabold text-red-600 sm:text-lg">
                    Delete account
                  </p>

                  <p className="mt-0.5 text-sm leading-5 text-slate-600 sm:text-base">
                    Permanently delete your RenalPlan account and associated
                    personal data.
                  </p>
                </div>

                <span className="shrink-0 text-2xl font-light text-red-500 transition-transform group-hover:translate-x-1">
                  ›
                </span>
              </button>
            </div>
          </section>

          {/* RIGHT COLUMN — MY RENALPLAN */}
          <section>
            <div className="mb-3">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[1.75rem]">
                My RenalPlan
              </h1>

              <p className="mt-1 text-base leading-6 text-slate-600 sm:text-lg">
                Quick access to your personal RenalPlan features.
              </p>
            </div>

            <div className="space-y-3">

              {/* MY DIET */}
              <Link
                href="/requirements"
                className="group flex items-center gap-4 rounded-2xl border border-green-300 bg-green-50/60 px-5 py-4 transition hover:border-green-400 hover:bg-green-50 sm:px-6"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 20c.8-3.4 3.3-5.2 7-5.2s6.2 1.8 7 5.2" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-extrabold text-green-700 sm:text-lg">
                    My Diet
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-600 sm:text-base">
                    Manage your dietary requirements and preferences.
                  </p>
                </div>

                <span className="shrink-0 text-2xl font-light text-green-600 transition-transform group-hover:translate-x-1">
                  ›
                </span>
              </Link>

              {/* MY FAVOURITES */}
              <Link
                href="/recipes?view=favourites"
                className="group flex items-center gap-4 rounded-2xl border border-orange-300 bg-orange-50/60 px-5 py-4 transition hover:border-orange-400 hover:bg-orange-50 sm:px-6"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-red-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                    aria-hidden="true"
                  >
                    <path d="M20.8 8.8c0 5.5-8.8 10-8.8 10s-8.8-4.5-8.8-10A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6z" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-extrabold text-orange-600 sm:text-lg">
                    My Favourites
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-600 sm:text-base">
                    Save and quickly access your favourite recipes.
                  </p>
                </div>

                <span className="shrink-0 text-2xl font-light text-orange-600 transition-transform group-hover:translate-x-1">
                  ›
                </span>
              </Link>

              {/* PREMIUM INFORMATION */}
              <div className="rounded-2xl border border-orange-300 bg-orange-50/60 px-5 py-5 sm:px-6">
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-7 w-7"
                      aria-hidden="true"
                    >
                      <path d="M3 8l3 3 3-6 3 6 3-6 3 6 3-3-2 11H5L3 8z" />
                      <path d="M5 19h14" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-orange-600 sm:text-lg">
                      Premium coming soon
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base">
                      RenalPlan Premium will be introduced in the future.
                      When Premium launches, a subscription will be required
                      to continue using RenalPlan&apos;s personal account
                      features.
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                      We&apos;ll let you know when it&apos;s available.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* MOBILE LOGOUT */}
        <section className="mt-5 pb-5 md:hidden">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm transition hover:border-blue-300 hover:bg-slate-50"
          >
            <div>
              <p className="text-base font-extrabold text-[#174A7E]">
                Log out
              </p>

              <p className="mt-0.5 text-sm leading-5 text-slate-600">
                Sign out of your RenalPlan account.
              </p>
            </div>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#174A7E]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
              </svg>
            </span>
          </button>
        </section>

      </div>
    </main>
  );
}