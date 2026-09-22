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
      <main className="min-h-screen bg-slate-50 px-5 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-slate-600">Loading your account...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            My Account
          </h1>

          <p className="mt-2 text-base text-slate-600">
            Manage your RenalPlan account and personal features.
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-extrabold text-slate-900">
                Account
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Your RenalPlan account details.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-500">
                Email address
              </p>

              <p className="mt-1 break-all text-base font-semibold text-slate-900">
                {email}
              </p>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-extrabold text-slate-900">
                My RenalPlan
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Quick access to your personal RenalPlan features.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/requirements"
                className="group rounded-2xl border border-slate-200 p-5 transition hover:border-green-300 hover:bg-green-50"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-2xl">
                  🥗
                </div>

                <h3 className="text-lg font-bold text-green-700">
                  My Diet
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Manage your dietary requirements and preferences.
                </p>
              </Link>

              <Link
                href="/recipes?view=favourites"
                className="group rounded-2xl border border-orange-200 p-5 transition hover:border-orange-400 hover:bg-orange-50"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-2xl">
                  ⭐
                </div>

                <h3 className="text-lg font-bold text-orange-600">
                  My Favourites
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  View the recipes you have saved as favourites.
                </p>

                <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wide text-orange-600">
                  Premium
                </span>
              </Link>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-extrabold text-slate-900">
                Account Settings
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Manage your account.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/auth/reset-password"
                className="flex items-center justify-between rounded-xl border border-slate-200 px-5 py-4 transition hover:border-[#0B3B75] hover:bg-slate-50"
              >
                <div>
                  <p className="font-bold text-[#0B3B75]">
                    Change password
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    Update your RenalPlan password.
                  </p>
                </div>

                <span className="text-xl text-[#0B3B75]">→</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-5 py-4 text-left transition hover:border-[#0B3B75] hover:bg-slate-50"
              >
                <div>
                  <p className="font-bold text-[#0B3B75]">Log out</p>

                  <p className="mt-1 text-sm text-slate-600">
                    Sign out of your RenalPlan account.
                  </p>
                </div>

                <span className="text-xl text-[#0B3B75]">→</span>
              </button>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-extrabold text-slate-900">
                Subscription
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Your RenalPlan subscription will be managed here.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Current plan
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-slate-900">
                    Free
                  </p>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                    You are currently using the free version of RenalPlan.
                  </p>
                </div>

                <div className="rounded-xl bg-[#0B3B75] px-5 py-3 text-center text-sm font-bold text-white">
                  Premium coming soon
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-extrabold text-slate-900">
                Payment & Billing
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Payment and subscription management will appear here when
                RenalPlan Premium launches.
              </p>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300 p-5">
              <p className="text-sm leading-6 text-slate-600">
                When Premium subscriptions are introduced, this section will
                allow you to manage your subscription and payment details
                securely through our payment provider.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
