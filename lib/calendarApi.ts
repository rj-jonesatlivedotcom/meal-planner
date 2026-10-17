import { createHash, randomBytes } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildCalendar, calendarPreferences, preferencesFromRow, type CalendarRecipe, type CalendarWeek } from "./calendar";

const json = (value: unknown, status = 200) => Response.json(value, { status, headers: { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" } });
const digest = (value: string) => createHash("sha256").update(value).digest("hex");
type Ports = { enabled: () => boolean; account: () => Promise<SupabaseClient>; publicClient: () => SupabaseClient; recipes: readonly CalendarRecipe[] };
const revision = (value: unknown, nullable = true): value is number | null =>
  (nullable && value === null) || (typeof value === "number" && Number.isSafeInteger(value) && value >= 0);
/** Injected ports keep route tests independent of cookies, network and credentials. */
export function calendarHandlers(ports: Ports) {
  async function accountRequest(request: Request, kind: "settings" | "subscription") {
    if (!ports.enabled()) return new Response(null, { status: 404 });
    const mutation = request.method !== "GET";
    if (mutation && request.headers.get("origin") !== new URL(request.url).origin) return json({ error: "Request origin rejected" }, 403);
    try {
      const client = await ports.account();
      const { data: auth, error: authError } = await client.auth.getUser();
      if (authError || !auth.user) return json({ error: "Sign in to manage your calendar" }, 401);
      if (request.headers.get("x-renalplan-owner") !== auth.user.id) return json({ error: "Account changed. Reopen calendar settings." }, 409);
      if (kind === "settings" && request.method === "GET") {
        const { data, error } = await client.from("user_calendar_settings").select("*").eq("user_id", auth.user.id).maybeSingle();
        if (error) throw error;
        return json({ preferences: preferencesFromRow(data), revision: data?.revision ?? null, updatedAt: data?.updated_at ?? null });
      }
      if (kind === "settings" && request.method === "PUT") {
        const body = await request.json();
        if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "Invalid calendar request" }, 400);
        if (!revision(body.revision)) return json({ error: "Invalid preferences revision" }, 400);
        let preferences;
        try { preferences = calendarPreferences(body.preferences); }
        catch { return json({ error: "Invalid calendar preferences. Check time zone, times and reminder values." }, 400); }
        const { data, error } = await client.rpc("rp_save_calendar_preferences", { p_expected_revision: body.revision, p_preferences: preferences });
        if (error) return rpcError(error);
        return json({ preferences: preferencesFromRow(data), revision: data.revision, updatedAt: data.updated_at });
      }
      if (kind === "subscription") {
        if (!["GET", "POST", "DELETE"].includes(request.method)) return new Response(null, { status: 405 });
        const body = mutation ? await request.json() : {};
        if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "Invalid calendar request" }, 400);
        if (mutation && !revision(body.generation, false)) return json({ error: "Invalid subscription generation" }, 400);
        // Raw token exists only in this response and the owner's explicit copy UI.
        // It is never stored in the database, localStorage or logs.
        const token = request.method === "POST" ? randomBytes(32).toString("base64url") : null;
        const { data, error } = await client.rpc("rp_calendar_subscription", {
          p_action: request.method === "GET" ? "status" : token ? "rotate" : "revoke",
          p_expected_generation: mutation ? body.generation : null, p_token_hash: token ? digest(token) : null,
        });
        if (error) return rpcError(error);
        return json({ ...data, ...(token ? { url: `${new URL(request.url).origin}/api/calendar/feed/${token}` } : {}) });
      }
      return new Response(null, { status: 405 });
    } catch (error) {
      if (error instanceof SyntaxError) return json({ error: "Invalid calendar request" }, 400);
      return json({ error: "Calendar Test migration or connection is unavailable. No settings were replaced." }, 503);
    }
  }
  async function feed(token: string) {
    if (!ports.enabled()) return new Response(null, { status: 404 });
    if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return new Response(null, { status: 404 });
    try {
      const { data, error } = await ports.publicClient().rpc("rp_calendar_feed", { p_token_hash: digest(token) });
      if (error) return new Response("Calendar temporarily unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
      if (!data) return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });
      const body = buildCalendar({ namespace: data.namespace, weeks: data.weeks as CalendarWeek[], preferences: preferencesFromRow(data.settings),
        recipes: ports.recipes, subscription: true, settingsRevision: data.settings?.revision ?? 0, settingsUpdatedAt: data.settings?.updated_at });
      return new Response(body, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'inline; filename="RenalPlan.ics"',
        "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex, nofollow" } });
    } catch { return new Response("Calendar could not be generated. Review meal times and calendar settings.", { status: 503, headers: { "Cache-Control": "no-store" } }); }
  }
  return { accountRequest, feed };
}
function rpcError(error: { code?: string }) {
  if (error.code === "PT409") return json({ error: "Another session changed these settings. Close and reopen to review the saved version." }, 409);
  if (["22023", "23514", "22P02", "22007", "22008", "22003"].includes(error.code ?? "")) return json({ error: "Invalid calendar setting. Review the values and try again." }, 400);
  return json({ error: "Calendar Test migration or connection is unavailable. No settings were replaced." }, 503);
}
