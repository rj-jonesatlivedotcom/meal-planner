export const CALENDAR_TEST_ORIGIN = "https://pyevnakjpgwvylqmpqat.supabase.co";

/** Disabled in every production build. No normal credentials are a test fallback. */
export function datedPlannerEnabled() {
  return process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_RENALPLAN_DATED_TEST === "1";
}

export function supabaseConfiguration() {
  if (datedPlannerEnabled()) {
    const key = process.env.NEXT_PUBLIC_RENALPLAN_CALENDAR_TEST_KEY;
    if (!key?.startsWith("sb_publishable_")) throw new Error("Explicit Calendar Test publishable key required");
    return { url: CALENDAR_TEST_ORIGIN, key, cookieOptions: { name: "renalplan-calendar-test-auth" } };
  }
  return { url: process.env.NEXT_PUBLIC_SUPABASE_URL!, key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, cookieOptions: undefined };
}

/** Independent transport boundary, not merely a hidden UI control. */
export function calendarOnlyFetch(input: RequestInfo | URL, init?: RequestInit) {
  const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
  if (url.origin !== CALENDAR_TEST_ORIGIN) throw new Error("Dated Planner rejected a non-test destination");
  return fetch(input, { ...init, redirect: "error", signal: init?.signal ?? AbortSignal.timeout(20000) });
}
