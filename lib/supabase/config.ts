export const CALENDAR_TEST_ORIGIN = "https://pyevnakjpgwvylqmpqat.supabase.co";

/** Preview opt-in is compiled by Next; production deployments remain disabled. */
export function datedPlannerEnabled() {
  if (process.env.VERCEL_ENV === "production") return false;
  return process.env.NEXT_PUBLIC_RENALPLAN_DATED_TEST === "1" &&
    (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview");
}

/** Canonical deployment origin supplied by Vercel, never by request headers. */
export function calendarPreviewOrigin() {
  if (process.env.VERCEL_ENV !== "preview" || !datedPlannerEnabled()) return null;
  const host = process.env.VERCEL_URL;
  return host && /^[a-z0-9][a-z0-9-]*\.vercel\.app$/.test(host) ? `https://${host}` : null;
}

/** Public bearer links stay disabled until hosting-level path logging is resolved. */
export function calendarSubscriptionsEnabled() {
  return datedPlannerEnabled() && process.env.NODE_ENV === "development";
}

export function supabaseConfiguration() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" && !datedPlannerEnabled())
    throw new Error("Preview requires explicit Calendar Test configuration");
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
