"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
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
  const [checking, setChecking] = useState(true);
  const [ready, setReady] = useState(false);

  // Prevent the one-time recovery code being processed more than once.
  const recoveryStarted = useRef(false);

  useEffect(() => {
    if (recoveryStarted.current) {
      return;
    }

    recoveryStarted.current = true;

    let cancelled = false;

    async function prepareResetSession() {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");

        /*
         * ------------------------------------------------------------
         * 1. PKCE recovery flow
         * ------------------------------------------------------------
         *
         * Supabase password-reset links can arrive with:
         *
         * ?code=...
         *
         * The code is single-use, so we must only exchange it once.
         */

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
              setChecking(false);
              setReady(false);
            }

            return;
          }

          /*
           * The code has now been exchanged successfully.
           * Remove it from the address bar so it cannot be
           * accidentally processed again.
           */

          if (!cancelled) {
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
          }
        }

        /*
         * ------------------------------------------------------------
         * 2. Hash-token recovery flow
         * ------------------------------------------------------------
         *
         * Also support older/implicit Supabase recovery links that
         * contain access_token and refresh_token in the URL hash.
         */

        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );

        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const recoveryType = hashParams.get("type");

        if (
          accessToken &&
          refreshToken &&
          recoveryType === "recovery"
        ) {
          const { error: sessionError } =
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

          if (sessionError) {
            console.error(
              "Password reset session error:",
              sessionError
            );

            if (!cancelled) {
              setError(
                "This password reset link is invalid or has expired. Please request a new one."
              );
              setChecking(false);
              setReady(false);
            }

            return;
          }

          /*
           * Remove the recovery tokens from the address bar.
           */

          if (!cancelled) {
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
          }
        }

        /*
         * ------------------------------------------------------------
         * 3. Check for an active Supabase session
         * ------------------------------------------------------------
         */

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (cancelled) {
          return;
        }

        if (session) {
          setReady(true);
          setChecking(false);
          return;
        }

        /*
         * ------------------------------------------------------------
         * 4. Listen for Supabase recovery events
         * ------------------------------------------------------------
         */

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          if (cancelled) {
            return;
          }

          if (
            event === "PASSWORD_RECOVERY" ||
            event === "SIGNED_IN"
          ) {
            if (session) {
              setReady(true);
              setChecking(false);
              subscription.unsubscribe();
            }
          }
        });

        /*
         * Give Supabase a short amount of time to finish processing
         * the recovery session.
         */

        window.setTimeout(async () => {
          if (cancelled) {
            return;
          }

          const {
            data: { session: latestSession },
          } = await supabase.auth.getSession();

          if (cancelled) {
            return;
          }

          if (latestSession) {
            setReady(true);
          } else {
            setError(
              "We couldn't verify this password reset link. Please request a new one."
            );
            setReady(false);
          }

          setChecking(false);
          subscription.unsubscribe();
        }, 2000);
      } catch (err) {
        console.error("Password reset session error:", err);

        if (!cancelled) {
          setError(
            "We couldn't verify this password reset link. Please request a new one."
          );
          setReady(false);
          setChecking(false);
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
      setError(
        "Your password must be at least 6 characters long."
      );
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

  /*
   * ------------------------------------------------------------
   * Checking reset link
   * ------------------------------------------------------------
   */

  if (checking) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            RenalPlan
          </h1>

          <p className="mt-2 text-center text-gray-600">
            Reset your password
          </p>

          <p className="mt-6 text-center text-gray-600">
            Checking your password reset link...
          </p>
        </div>
      </main>
    );
  }

  /*
   * ------------------------------------------------------------
   * Invalid / expired reset link
   * ------------------------------------------------------------
   */

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

          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
            {error}
          </div>

          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Request a new reset link
          </button>
        </div>
      </main>
    );
  }

  /*
   * ------------------------------------------------------------
   * Set new password
   * ------------------------------------------------------------
   */

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
              onChange={(event) =>
                setPassword(event.target.value)
              }
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
            {loading
              ? "Updating password..."
              : "Set new password"}
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