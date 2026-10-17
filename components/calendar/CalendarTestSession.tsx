"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { datedPlannerEnabled, supabaseConfiguration, calendarOnlyFetch } from "@/lib/supabase/config";
import { createClient as createIsolatedClient, type Session } from "@supabase/supabase-js";

/** Synthetic sessions on the isolated development origin only; production is 404. */
export default function CalendarTestSession() {
  const [status, setStatus] = useState("Ready");
  const [busy, setBusy] = useState(false);
  async function run(action: () => Promise<string>) {
    if (!datedPlannerEnabled() || busy) return;
    setBusy(true);
    try { setStatus(await action()); }
    catch (error) { setStatus(error instanceof Error ? error.message : "Test sign-in failed"); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto max-w-3xl space-y-4 p-6">
    <h1 className="text-xl font-bold">Calendar Test synthetic sessions</h1>
    <p>Development only. Sessions belong to Calendar Test. No production account is used.</p>
    {(["A", "B"] as const).map(label => <div key={label} className="flex gap-3">
      <button disabled={busy} onClick={() => void run(async () => {
        const config = supabaseConfiguration();
        // Create independently: signing out the app would revoke the saved test
        // account and prevent a genuine A -> B -> A account-switch test.
        const isolated = createIsolatedClient(config.url, config.key, {
          auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false,
            storageKey: `renalplan-calendar-test-ephemeral-${crypto.randomUUID()}` },
          global: { fetch: calendarOnlyFetch },
        });
        const { data, error } = await isolated.auth.signInAnonymously();
        if (error || !data.session) throw error ?? new Error("No test session");
        const installed = await createClient().auth.setSession(data.session);
        if (installed.error) throw installed.error;
        sessionStorage.setItem(`renalplan-calendar-test-session-${label}`, JSON.stringify(data.session));
        return `Signed in as ${label}: ${data.session.user.id}`;
      })}>Create test account {label}</button>
      <button disabled={busy} onClick={() => void run(async () => {
        const raw = sessionStorage.getItem(`renalplan-calendar-test-session-${label}`);
        if (!raw) throw new Error(`Create test account ${label} first`);
        const saved = JSON.parse(raw) as Session;
        const { data, error } = await createClient().auth.setSession(saved);
        if (error || !data.session) throw error ?? new Error("Test session unavailable");
        sessionStorage.setItem(`renalplan-calendar-test-session-${label}`, JSON.stringify(data.session));
        return `Signed in as ${label}: ${data.session.user.id}`;
      })}>Use test account {label}</button>
    </div>)}
    <button disabled={busy} onClick={() => void run(async () => {
      const { error } = await createClient().auth.signOut();
      if (error) throw error;
      return "Signed out";
    })}>Sign out test session</button>
    <button disabled={busy} onClick={() => void run(async () => {
      const config = supabaseConfiguration();
      for (const label of ["A", "B"]) {
        const key = `renalplan-calendar-test-session-${label}`, raw = sessionStorage.getItem(key);
        if (!raw) continue;
        const isolated = createIsolatedClient(config.url, config.key, {
          auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false,
            storageKey: `renalplan-calendar-test-ephemeral-${crypto.randomUUID()}` },
          global: { fetch: calendarOnlyFetch },
        });
        const { error } = await isolated.auth.setSession(JSON.parse(raw) as Session);
        if (!error) {
          const result = await isolated.auth.signOut();
          if (result.error) throw result.error;
        }
        sessionStorage.removeItem(key);
      }
      await createClient().auth.signOut();
      return "All synthetic test sessions signed out";
    })}>End all synthetic test sessions</button>
    <p role="status">{status}</p>
    <Link className="block underline" href="/planner">Open Planner</Link>
  </main>;
}
