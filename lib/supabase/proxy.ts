import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfiguration, datedPlannerEnabled, calendarOnlyFetch, calendarApplicationOrigin } from "./config";
import { calendarFeedHostPolicy } from "../calendarFeedHost";

export async function updateSession(request: NextRequest) {
  const feedPolicy = calendarFeedHostPolicy(request);
  if (feedPolicy === "reject") return new NextResponse(null, { status: 404, headers: { "Cache-Control": "no-store" } });
  // Capability validation stays in the feed handler. Do not refresh or attach
  // an account's cookies on the separate public hostname.
  if (feedPolicy === "feed") return NextResponse.next({ request });
  const config = supabaseConfiguration();
  const previewOrigin = calendarApplicationOrigin();
  if (datedPlannerEnabled() && (process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "production"
    ? !previewOrigin || request.headers.get("host") !== new URL(previewOrigin).host
    // next dev -H 0.0.0.0 uses the bind address in nextUrl, even for loopback requests.
    : !/^(?:127\.0\.0\.1|localhost)(?::\d+)?$/i.test(request.headers.get("host") ?? ""))) {
    return new NextResponse("Calendar request host rejected", { status: 403 });
  }
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    config.url,
    config.key,
    {
      cookieOptions: config.cookieOptions,
      ...(datedPlannerEnabled() ? { global: { fetch: calendarOnlyFetch } } : {}),
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getClaims();

  return supabaseResponse;
}




