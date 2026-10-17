import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfiguration, datedPlannerEnabled, calendarOnlyFetch } from "./config";

export async function createClient() {
  const cookieStore = await cookies();
  const config = supabaseConfiguration();

  return createServerClient(
    config.url,
    config.key,
    {
      cookieOptions: config.cookieOptions,
      ...(datedPlannerEnabled() ? { global: { fetch: calendarOnlyFetch } } : {}),
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Cookie writes can fail in Server Components.
            // The Proxy handles session refresh.
          }
        },
      },
    }
  );
}




