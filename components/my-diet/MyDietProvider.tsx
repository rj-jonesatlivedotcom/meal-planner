"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { loadRequirements, readStoredRequirements, hasPendingRequirementsSave, type Requirements } from "@/lib/myDiet";

const DietContext = createContext<{ requirements: Requirements | null; ready: boolean; error: boolean }>({ requirements: null, ready: false, error: false });

/** One read of the existing owned My Diet row, shared by all recipe imagery. */
export function MyDietProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ requirements: null as Requirements | null, ready: false, error: false });
  useEffect(() => {
    let stopped = false, version = 0, localRevision = 0;
    const client = createClient();
    async function refresh() {
      const request = ++version, revision = localRevision;
      try {
        const { data: { user }, error: authError } = await client.auth.getUser();
        if (authError && authError.name !== "AuthSessionMissingError") throw authError;
        const result = user ? await loadRequirements(client, user.id) : { requirements: null, error: null };
        if (result.error) throw result.error;
        if (!stopped && request === version) setState({
          requirements: user && (hasPendingRequirementsSave() || revision !== localRevision) ? readStoredRequirements() ?? result.requirements : result.requirements,
          ready: true, error: false,
        });
      } catch {
        if (!stopped && request === version) setState({ requirements: readStoredRequirements(), ready: true, error: true });
      }
    }
    function localChange() { ++localRevision; setState(current => ({ ...current, requirements: readStoredRequirements() })); }
    function storage(event: StorageEvent) { if (!event.key || event.key === "meal-planner-requirements") localChange(); }
    window.addEventListener("meal-planner-requirements-updated", localChange);
    window.addEventListener("storage", storage);
    window.addEventListener("focus", refresh);
    const { data: { subscription } } = client.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") { ++version; setState({ requirements: null, ready: true, error: false }); }
      else if (event === "SIGNED_IN" || event === "USER_UPDATED") { setState(current => ({ ...current, ready: false })); setTimeout(() => { if (!stopped) void refresh(); }, 0); }
    });
    void refresh();
    return () => { stopped = true; subscription.unsubscribe(); window.removeEventListener("meal-planner-requirements-updated", localChange); window.removeEventListener("storage", storage); window.removeEventListener("focus", refresh); };
  }, []);
  return <DietContext.Provider value={state}>{children}</DietContext.Provider>;
}
export const useMyDiet = () => useContext(DietContext);
