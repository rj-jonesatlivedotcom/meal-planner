import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfiguration, datedPlannerEnabled, calendarOnlyFetch } from "./config";

export async function updateSession(request: NextRequest) {
  const config = supabaseConfiguration();
  if (datedPlannerEnabled() && !["127.0.0.1", "localhost"].includes(request.nextUrl.hostname)) {
    return new NextResponse("Calendar Test mode is available only on loopback", { status: 403 });
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




