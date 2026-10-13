"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Applies the signed-in user's saved appearance preference throughout the site.
 * Supabase user metadata is the cross-device source of truth; localStorage is
 * a fast fallback while the session is being checked.
 */
export default function ThemeSync() {
  useEffect(() => {
    let active = true;
    const supabase = createClient();

    function applyTheme(value: unknown) {
      const theme = value === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      try {
        localStorage.setItem("renalplan-theme", theme);
      } catch {
        // The app can still use the current document theme.
      }
    }

    try {
      const localTheme = localStorage.getItem("renalplan-theme");
      if (localTheme === "dark" || localTheme === "light") {
        applyTheme(localTheme);
      }
    } catch {
      // Ignore unavailable localStorage.
    }

    async function loadSavedTheme() {
      const { data, error } = await supabase.auth.getUser();
      if (!active || error) return;
      if (data.user) {
        applyTheme(data.user.user_metadata?.renalplan_theme);
      } else {
        applyTheme("light");
      }
    }

    void loadSavedTheme();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          applyTheme(session.user.user_metadata?.renalplan_theme);
        } else {
          applyTheme("light");
        }
      }
    );

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
