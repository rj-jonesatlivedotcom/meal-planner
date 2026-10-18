export const CALENDAR_TEST_ORIGIN = "https://pyevnakjpgwvylqmpqat.supabase.co";
export const CALENDAR_PRODUCTION_ORIGIN = "https://yyxjeukraeibxxloaors.supabase.co";
export const CALENDAR_WEBSITE_ORIGIN = "https://www.renalplan.com";

/** Separate build-time opt-in. Never set this while preparing a release. */
export function productionCalendarEnabled() {
  return process.env.NEXT_PUBLIC_RENALPLAN_DATED_PRODUCTION === "1" &&
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" &&
    process.env.NODE_ENV === "production" &&
    (process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production");
}

/** Explicit loopback development opt-in; ignored by every hosted build. */
export function localLiveCalendarEnabled() {
  return process.env.NODE_ENV === "development" && !process.env.VERCEL_ENV &&
    process.env.NEXT_PUBLIC_RENALPLAN_DATED_LOCAL_LIVE === "1";
}
export function liveCalendarEnabled() {
  return productionCalendarEnabled() || localLiveCalendarEnabled();
}

export function calendarGuestStorageKey() {
  return liveCalendarEnabled() ? "renalplan-calendar-guest" : "renalplan-calendar-test-guest";
}

/** Both opt-ins default off; the Test flag can never activate production. */
export function datedPlannerEnabled() {
  if (liveCalendarEnabled()) return true;
  if (process.env.VERCEL_ENV === "production") return false;
  return process.env.NEXT_PUBLIC_RENALPLAN_DATED_TEST === "1" &&
    (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview");
}

/** Fixed canonical origin; request/forwarded headers cannot choose it. */
export function calendarApplicationOrigin() {
  return localLiveCalendarEnabled() ? null : productionCalendarEnabled() ? CALENDAR_WEBSITE_ORIGIN : calendarPreviewOrigin();
}

/** Canonical deployment origin supplied by Vercel, never by request headers. */
export function calendarPreviewOrigin() {
  if (process.env.VERCEL_ENV !== "preview" || !datedPlannerEnabled()) return null;
  const host = process.env.VERCEL_URL;
  return host && /^[a-z0-9][a-z0-9-]*\.vercel\.app$/.test(host) ? `https://${host}` : null;
}

/** Optional feed-only alias; never repurpose the protected application origin. */
export function calendarPublicFeedOrigin() {
  if (localLiveCalendarEnabled()) return CALENDAR_WEBSITE_ORIGIN;
  const appOrigin = calendarPreviewOrigin();
  const value = process.env.RENALPLAN_CALENDAR_PUBLIC_FEED_ORIGIN;
  if (!appOrigin || !value || !/^https:\/\/[a-z0-9][a-z0-9-]*\.vercel\.app$/.test(value) || value === appOrigin) return null;
  return value;
}

/** Hosted opt-in records the owner's restricted-platform-log exception. */
export function calendarSubscriptionsEnabled() {
  if (productionCalendarEnabled()) return process.env.RENALPLAN_CALENDAR_RESTRICTED_LOGS_ACCEPTED === "1";
  return datedPlannerEnabled() && (process.env.NODE_ENV === "development" ||
    (process.env.RENALPLAN_CALENDAR_RESTRICTED_LOGS_ACCEPTED === "1" && !!calendarPublicFeedOrigin()));
}

export function supabaseConfiguration() {
  if (liveCalendarEnabled()) {
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL !== CALENDAR_PRODUCTION_ORIGIN ||
      !key?.startsWith("sb_publishable_") || key === process.env.NEXT_PUBLIC_RENALPLAN_CALENDAR_TEST_KEY)
      throw new Error("Explicit production Supabase configuration required");
    // Preserve existing account cookies; never use the Calendar Test namespace.
    return { url: CALENDAR_PRODUCTION_ORIGIN, key, cookieOptions: undefined };
  }
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
  const expected = liveCalendarEnabled() ? supabaseConfiguration().url : CALENDAR_TEST_ORIGIN;
  if (url.origin !== expected || url.username || url.password) throw new Error("Dated Planner rejected an unexpected destination");
  return fetch(input, { ...init, redirect: "error", signal: init?.signal ?? AbortSignal.timeout(20000) });
}
