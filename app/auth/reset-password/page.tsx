"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function prepareResetSession() {
      try {
        /*
         * Supabase PKCE password-reset links return an auth code
         * to the redirect URL. Exchange that code for a session.
         */
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            console.error(
              "Password reset code exchange error:",
              exchangeError
            );

            if (!cancelled) {
              setError(
                "This password reset link is invalid or has expired. Please request a new one."
              );
              setReady(false);
            }

            return;
          }

          /*
           * Remove the one-time code from the browser address bar
           * after it has been exchanged successfully.
           */
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!cancelled) {
          if (session) {
            setReady(true);
          } else {
            setError(
              "We couldn't verify this password reset link. Please request a new one."
            );
            setReady(false);
          }
        }
      } catch (err) {
        console.error("Password reset session error:", err);

        if (!cancelled) {
          setError(
            "We couldn't verify this password reset link. Please request a new one."
          );
          setReady(false);
        }
      }
    }

    void prepareResetSession();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  async function handleUpdatePassword(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Your password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Your password has been changed successfully.");
    setLoading(false);

    window.setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  }

  if (!ready) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            RenalPlan
          </h1>

          <p className="mt-2 text-center text-gray-600">
            Reset your password
          </p>

          {!error && (
            <p className="mt-6 text-center text-gray-600">
              Checking your password reset link...
            </p>
          )}

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
              {error}
            </div>
          )}

          {error && (
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Request a new reset link
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          RenalPlan
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Choose a new password
        </p>

        <form
          onSubmit={handleUpdatePassword}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter a new password"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm new password
            </label>

            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Enter the password again"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating password..." : "Set new password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Back to log in
          </button>
        </div>
      </div>
    </main>
  );
}