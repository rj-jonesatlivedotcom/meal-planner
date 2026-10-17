import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfiguration, datedPlannerEnabled, calendarOnlyFetch } from "./config";

export function createClient() {
  const config = supabaseConfiguration();
  return createBrowserClient(
    config.url,
    config.key,
    { cookieOptions: config.cookieOptions, ...(datedPlannerEnabled() ? { global: { fetch: calendarOnlyFetch } } : {}) }
  );
}




