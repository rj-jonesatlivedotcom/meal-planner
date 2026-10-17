import { createClient as createPublicClient } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";
import { datedPlannerEnabled, supabaseConfiguration, calendarOnlyFetch } from "./supabase/config";
import { calendarHandlers } from "./calendarApi";
import { recipes } from "@/data/RecipeData";

export const calendarServer = calendarHandlers({
  enabled: datedPlannerEnabled,
  account: createClient,
  publicClient: () => {
    if (!datedPlannerEnabled()) throw new Error("Calendar routes are disabled");
    const config = supabaseConfiguration();
    return createPublicClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }, global: { fetch: calendarOnlyFetch } });
  },
  recipes,
});
