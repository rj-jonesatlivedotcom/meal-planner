import { calendarPublicFeedOrigin } from "./supabase/config";

/** A public feed alias never serves the application or authenticated APIs. */
export function calendarFeedHostPolicy(request: Request): "feed" | "reject" | null {
  const origin = calendarPublicFeedOrigin();
  if (!origin) return null;
  const url = new URL(request.url);
  const host = request.headers.get("host") ?? url.host;
  if (host !== new URL(origin).host) return null;
  return ["GET", "HEAD"].includes(request.method) && !url.search &&
    /^\/api\/calendar\/feed\/[A-Za-z0-9_-]{43}$/.test(url.pathname) ? "feed" : "reject";
}
