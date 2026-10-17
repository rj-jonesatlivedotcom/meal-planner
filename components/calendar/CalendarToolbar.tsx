"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { buildCalendar, calendarDefaults, calendarNamespace, calendarPreferences, formatWeek, type CalendarPreferences } from "@/lib/calendar";
import { currentMonday, type WeeklyPlan } from "@/lib/weeklyPlans";
import { flushWeeklyPageWrites } from "@/lib/weeklyPageStorage";
import { recipes } from "@/data/RecipeData";

type Props = { plan: WeeklyPlan; shift: (days: number) => void; thisWeek: () => void; readPlan: () => WeeklyPlan | null };
const button = "rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-slate-600 dark:hover:bg-slate-800";

export default function CalendarToolbar(props: Props) {
  const [panel, setPanel] = useState<"connect" | "times" | null>(null);
  const isThisWeek = props.plan.weekStart === currentMonday();
  return <>
    <nav aria-label="Planner week" className="mx-auto flex w-full max-w-[1448px] flex-wrap items-center gap-2 px-4 py-2 text-slate-800 dark:text-slate-100 md:px-6">
      <button type="button" className={button} aria-label="Previous week" onClick={() => props.shift(-7)}>←</button>
      <span className="text-sm font-bold tabular-nums" aria-live="polite">{formatWeek(props.plan.weekStart)}</span>
      <button type="button" className={button} aria-label="Next week" onClick={() => props.shift(7)}>→</button>
      {isThisWeek ? <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">This week</span>
        : <button type="button" className={button} onClick={props.thisWeek}>This week</button>}
      <div className="ml-auto flex gap-2">
        <button type="button" className={button} onClick={() => setPanel("connect")}>Connect calendar</button>
        <button type="button" className={button} onClick={() => setPanel("times")}>Meal times</button>
      </div>
    </nav>
    {panel && <CalendarPanel {...props} initialPanel={panel} onClose={() => setPanel(null)} />}
  </>;
}

function CalendarPanel({ plan, readPlan, initialPanel, onClose }: Props & { initialPanel: "connect" | "times"; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const running = useRef(false);
  const [tab, setTab] = useState(initialPanel);
  const [preferences, setPreferences] = useState<CalendarPreferences>({ ...calendarDefaults });
  const [saved, setSaved] = useState<CalendarPreferences>({ ...calendarDefaults });
  const [revision, setRevision] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [subscription, setSubscription] = useState({ active: false, generation: 0 });
  const [url, setUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [provider, setProvider] = useState("Google");
  const guest = plan.owner.kind === "guest";
  const storageKey = `renalplan:calendar-preferences:guest:${encodeURIComponent(plan.owner.id)}`;
  const ownerId = plan.owner.id;

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      if (guest) {
        const raw = localStorage.getItem(storageKey);
        const value = raw ? calendarPreferences(JSON.parse(raw)) : { ...calendarDefaults };
        if (!controller.signal.aborted) { setPreferences(value); setSaved(value); setReady(true); }
        return;
      }
      const result = await fetch("/api/calendar/settings", { cache: "no-store", signal: controller.signal, headers: { "X-RenalPlan-Owner": ownerId } });
      const body = await result.json();
      if (!result.ok) throw new Error(body.error);
      if (controller.signal.aborted) return;
      setPreferences(body.preferences); setSaved(body.preferences); setRevision(body.revision); setUpdatedAt(body.updatedAt); setReady(true);
      const response = await fetch("/api/calendar/subscription", { cache: "no-store", signal: controller.signal, headers: { "X-RenalPlan-Owner": ownerId } });
      const status = await response.json();
      if (!response.ok) throw new Error(status.error);
      if (!controller.signal.aborted) setSubscription(status);
    })().catch(error => { if (!controller.signal.aborted) setMessage(error instanceof Error ? error.message : "Calendar settings unavailable"); });
    return () => controller.abort();
  }, [guest, ownerId, storageKey]);

  async function run(action: () => Promise<void>) {
    if (running.current) return;
    running.current = true;
    setBusy(true); setMessage("");
    try { await action(); } catch (error) { setMessage(error instanceof Error ? error.message : "Calendar request failed"); }
    finally { running.current = false; setBusy(false); }
  }
  async function request(path: string, method: string, body: unknown) {
    const response = await fetch(`/api/calendar/${path}`, { method, cache: "no-store", headers: { "Content-Type": "application/json", "X-RenalPlan-Owner": ownerId }, body: JSON.stringify(body) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Calendar request failed");
    return data;
  }
  function save(event: FormEvent) {
    event.preventDefault();
    void run(async () => {
      const value = calendarPreferences(preferences);
      if (guest) { localStorage.setItem(storageKey, JSON.stringify(value)); setSaved(value); }
      else {
        const data = await request("settings", "PUT", { revision, preferences: value });
        setRevision(data.revision); setUpdatedAt(data.updatedAt); setSaved(data.preferences); setPreferences(data.preferences);
      }
      setMessage("Meal times and reminders saved.");
    });
  }
  function download() {
    void run(async () => {
      await flushWeeklyPageWrites();
      const current = readPlan();
      if (!current || current.owner.kind !== plan.owner.kind || current.owner.id !== ownerId || current.weekStart !== plan.weekStart) throw new Error("Selected account or week changed. Reopen the calendar controls.");
      const content = buildCalendar({ namespace: await calendarNamespace(`${guest ? "guest:" : ""}${ownerId}`),
        weeks: [{ weekStart: current.weekStart, planner: current.planner, revision: current.baseRevision ?? 0, updatedAt: new Date().toISOString() }],
        preferences: saved, recipes, settingsRevision: revision ?? 0, settingsUpdatedAt: updatedAt ?? undefined });
      const href = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
      const link = document.createElement("a"); link.href = href; link.download = `RenalPlan-${current.weekStart}.ics`; link.click();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
      setMessage("Selected week exported. Downloads are snapshots; subscribe for future updates.");
    });
  }
  const field = <K extends keyof CalendarPreferences,>(key: K, value: CalendarPreferences[K]) => setPreferences(p => ({ ...p, [key]: value }));
  return <dialog ref={dialog} aria-labelledby="calendar-title" onCancel={event => { event.preventDefault(); if (!busy) onClose(); }}
    className="m-auto max-h-[90dvh] w-[min(94vw,38rem)] overflow-auto rounded-2xl border border-slate-200 bg-white p-5 text-slate-800 shadow-xl backdrop:bg-slate-950/40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100">
    <header className="mb-4 flex items-center justify-between gap-3">
      <h2 id="calendar-title" className="text-lg font-bold">{tab === "times" ? "Meal times & reminders" : "Connect your calendar"}</h2>
      <button type="button" disabled={busy} onClick={onClose} className={button} aria-label="Close calendar settings">×</button>
    </header>
    <div className="mb-4 flex gap-2"><button type="button" className={button} aria-pressed={tab === "connect"} onClick={() => setTab("connect")}>Connect calendar</button><button type="button" className={button} aria-pressed={tab === "times"} onClick={() => setTab("times")}>Meal times</button></div>
    {message && <p role="status" className="mb-3 rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800">{message}</p>}
    {!ready && !message && <p role="status">Loading calendar settings…</p>}
    {tab === "times" ? <form onSubmit={save} className="space-y-4">
      <fieldset disabled={!ready || busy} className="space-y-4 disabled:opacity-60">
        <div className="grid grid-cols-3 gap-3">{(["breakfastTime", "lunchTime", "dinnerTime"] as const).map((key, i) => <label key={key} className="text-sm font-semibold">{["Breakfast", "Lunch", "Dinner"][i]}<input type="time" required value={preferences[key]} onChange={e => field(key, e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent p-2" /></label>)}</div>
        <label className="block text-sm font-semibold">Time zone<input required value={preferences.timezone} onChange={e => field("timezone", e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-transparent p-2" /><span className="text-xs font-normal">IANA name, for example Europe/London. Daylight saving is applied automatically.</span></label>
        {([['mealEnabled', 'mealMinutes', 'Meal reminder'], ['preparationEnabled', 'preparationMinutes', 'Preparation reminder']] as const).map(([enabled, minutes, label]) => <div key={enabled} className="flex flex-wrap items-center gap-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={preferences[enabled]} onChange={e => field(enabled, e.target.checked)} />{label}</label>
          <input type="number" aria-label={`${label} minutes before`} min={0} max={10080} step={1} required value={preferences[minutes]} onChange={e => field(minutes, Number(e.target.value))} className="w-20 rounded-lg border border-slate-300 bg-transparent p-1.5" /><span>minutes before</span>
        </div>)}
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={preferences.shoppingEnabled} onChange={e => field("shoppingEnabled", e.target.checked)} />Shopping reminder before the planned week</label>
        <div className="flex gap-2"><label className="text-sm">Day<select value={preferences.shoppingWeekday} onChange={e => field("shoppingWeekday", Number(e.target.value))} className="ml-2 rounded-lg border border-slate-300 bg-white p-2 text-slate-800">{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, i) => <option value={i + 1} key={day}>{day}</option>)}</select></label><label className="text-sm">Time<input type="time" required value={preferences.shoppingTime} onChange={e => field("shoppingTime", e.target.value)} className="ml-2 rounded-lg border border-slate-300 bg-transparent p-2" /></label></div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Calendar blocks last 30 minutes. Preparation alerts use your chosen lead time; advance-preparation alerts require verified recipe metadata and are not generated. Calendar apps control refresh and alert delivery.</p>
        <button type="submit" className={button}>Save meal times</button>
      </fieldset>
    </form> : <div className="space-y-4 text-sm">
      <div><p className="mb-2 font-semibold">{formatWeek(plan.weekStart)}</p><button type="button" className={button} disabled={!ready || busy} onClick={download}>Download this week (.ics)</button></div>
      {guest ? <p>Sign in to subscribe to all your saved weeks. Guest plans can be downloaded above.</p> : <>
        <p>A read-only subscription includes all saved dated weeks. Anyone with its private link can view meal names and dates. Keep it private; regenerating or revoking stops the old link. Previously downloaded copies cannot be recalled.</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Calendar Test only. Google, Outlook and Apple need a publicly reachable HTTPS feed. Production remains disabled.</p>
        <div className="flex flex-wrap gap-2"><button type="button" disabled={!ready || busy} className={button} onClick={() => void run(async () => { const data = await request("subscription", "POST", { generation: subscription.generation }); setSubscription(data); setUrl(data.url); })}>{subscription.active ? "Regenerate private link" : "Create private link"}</button>
          {subscription.active && <button type="button" disabled={busy} className={button} onClick={() => void run(async () => { const data = await request("subscription", "DELETE", { generation: subscription.generation }); setSubscription(data); setUrl(""); setMessage("Subscription revoked. The previous link no longer works."); })}>Revoke link</button>}</div>
        {url && <label className="block text-xs font-semibold">Private subscription URL (shown only now)<input readOnly value={url} onFocus={e => e.target.select()} className="my-1 w-full rounded-lg border border-slate-300 bg-transparent p-2 text-xs font-normal" /><button type="button" className={button} onClick={() => void run(async () => { await navigator.clipboard.writeText(url); setMessage("Private link copied."); })}>Copy link</button></label>}
        <div className="flex flex-wrap gap-2">{["Google", "Outlook", "Apple"].map(name => <button key={name} type="button" className={button} aria-pressed={provider === name} onClick={() => setProvider(name)}>{name} Calendar</button>)}</div>
        {provider === "Google" && <p>Open <a className="underline" href="https://calendar.google.com/" target="_blank" rel="noopener noreferrer">Google Calendar</a> in a desktop browser. Beside Other calendars, choose + → From URL. Paste the private HTTPS link and choose Add calendar.</p>}
        {provider === "Outlook" && <p>Open <a className="underline" href="https://outlook.live.com/calendar/" target="_blank" rel="noopener noreferrer">Outlook Calendar</a>. Choose Add calendar → Subscribe from web. Paste the private HTTPS link, name the calendar and import it. Use Subscribe, rather than uploading the snapshot file.</p>}
        {provider === "Apple" && <p>On iPhone/iPad, open Settings → Apps → Calendar → Calendar Accounts → Add Account → Other → Add Subscribed Calendar (older iOS: Settings → Calendar → Accounts). Paste the HTTPS link and keep SSL enabled. On Mac, Calendar → File → New Calendar Subscription.</p>}
        <p className="text-xs text-slate-500 dark:text-slate-400">A subscription refreshes on the provider’s schedule, not immediately. Removing a meal publishes its event as cancelled. A downloaded file is a one-time snapshot.</p>
      </>}
    </div>}
  </dialog>;
}
