"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "./supabase/client";
import { foodAccount } from "./foodAccount";
import type { PlannedSnack, SavedFood } from "./foodSnacks";
export const FOOD_ACCOUNT_UPDATED = "renalplan-food-account-updated";
export function notifyFoodAccount() { window.dispatchEvent(new Event(FOOD_ACCOUNT_UPDATED)); }

export function useFoodAccount(from?: string, to?: string) {
  const client = useMemo(() => createClient(), []);
  const [owner, setOwner] = useState<string | null>(null);
  const [foods, setFoods] = useState<SavedFood[]>([]);
  const [snacks, setSnacks] = useState<PlannedSnack[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const generation = useRef(0);
  const refresh = useCallback(async () => {
    const token = ++generation.current;
    setLoading(true);
    try {
      const { data, error: authError } = await client.auth.getUser();
      if (token !== generation.current) return;
      // A signed-out browser normally has no session; that is not a failed read.
      if (authError && !(authError.name === "AuthSessionMissingError" && !data.user)) throw authError;
      const id = data.user?.id ?? null;
      setOwner(id);
      if (!id) { setFoods([]); setSnacks([]); setError(""); return; }
      const repository = foodAccount(client, id);
      const rows = from && to ? await repository.snacks(from, to) : await repository.foods();
      if (token !== generation.current) return;
      if (from && to) setSnacks(rows as PlannedSnack[]); else setFoods(rows as SavedFood[]);
      setError("");
    } catch { if (token === generation.current) { setFoods([]); setSnacks([]); setError("Saved foods or snacks are unavailable. Please try again."); } }
    finally { if (token === generation.current) setLoading(false); }
  }, [client, from, to]);
  useEffect(() => {
    void refresh();
    const { data } = client.auth.onAuthStateChange(() => {
      ++generation.current; setOwner(null); setFoods([]); setSnacks([]);
      // Leave the auth callback before calling Supabase again.
      queueMicrotask(() => { void refresh(); });
    });
    const reload = () => { void refresh(); };
    window.addEventListener(FOOD_ACCOUNT_UPDATED, reload);
    window.addEventListener("focus", reload);
    return () => { ++generation.current; data.subscription.unsubscribe(); window.removeEventListener(FOOD_ACCOUNT_UPDATED, reload); window.removeEventListener("focus", reload); };
  }, [client, refresh]);
  const repository = useMemo(() => owner ? foodAccount(client, owner) : null, [client, owner]);
  const scopedSnacks = useMemo(() => snacks.filter(snack => (!from || snack.planned_on >= from) && (!to || snack.planned_on <= to)), [snacks, from, to]);
  return { owner, foods, snacks: scopedSnacks, error, loading, refresh, repository };
}
