"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { buildCalendar, calendarDefaults, calendarNamespace, calendarPreferences, formatWeek, type CalendarPreferences } from "@/lib/calendar";
import { currentMonday, type WeeklyPlan } from "@/lib/weeklyPlans";
import { flushWeeklyPageWrites } from "@/lib/weeklyPageStorage";
import { recipes } from "@/data/RecipeData";
import { liveCalendarEnabled } from "@/lib/supabase/config";

type Props = { plan: WeeklyPlan; shift: (days: number) => void; thisWeek: () => void; readPlan: () => WeeklyPlan | null; children?: ReactNode };
type MobileControls = Pick<Props, "shift" | "thisWeek"> & { week: string; openPanel: (panel: "connect" | "times") => void };
const MobileCalendarContext = createContext<MobileControls | null>(null);
// Unmodified provider artwork, served locally (no third-party image requests):
// Google: https://www.gstatic.com/calendar/images/manifest/logo_2020q4_192.png
// Outlook: https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/brand-icons/product/svg/outlook_48x1.svg
// Apple: https://help.apple.com/assets/5FDCF2DFB5CA140B5620CEC5/5FDCF2E0B5CA140B5620CECC/en_US/941b3852f089696217cabe420c7a459f.png
const button = "rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-slate-600 dark:hover:bg-slate-800";

export default function CalendarToolbar(props: Props) {
  const [panel, setPanel] = useState<"connect" | "times" | null>(null);
  const isThisWeek = props.plan.weekStart === currentMonday();
  return <MobileCalendarContext.Provider value={{ shift: props.shift, thisWeek: props.thisWeek, week: formatWeek(props.plan.weekStart), openPanel: setPanel }}>
    <style jsx>{`
      .planner-toolbar { display: flex; align-items: center; gap: 8px; width: 100%; max-width: 1448px; margin: 0 auto; padding: 8px 24px; }
      .planner-week { display: flex; align-items: center; gap: 8px; }
      .planner-week-label { display: flex; align-items: center; justify-content: center; width: 224px; min-height: 40px; text-align: center; font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; }
      .planner-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
      @media (max-width: 1023px) {
        .planner-toolbar { --planner-return-width: clamp(72px, 22vw, 96px); position: relative; flex-direction: column; align-items: stretch; padding: 8px 16px; }
        .planner-week { display: grid; grid-template-columns: 44px minmax(0, 1fr) 44px; }
        .planner-week-label { width: auto; min-width: 0; min-height: 44px; }
        .planner-week-arrow { width: 44px; height: 44px; padding-left: 0; padding-right: 0; }
        .planner-this-week { position: absolute; bottom: 8px; left: 16px; width: var(--planner-return-width); min-height: 44px; }
        .planner-actions { width: 100%; justify-content: space-between; margin-left: 0; }
        .planner-toolbar:has(.planner-this-week) .planner-actions { padding-left: calc(var(--planner-return-width) + 8px); }
        .planner-actions button { min-height: 44px; }
        .planner-actions button, .planner-this-week { padding: 6px clamp(4px, 1.6vw, 8px); font-size: clamp(11px, 3.2vw, 14px); white-space: nowrap; }
      }
      @media (max-width: 767px) {
        .planner-toolbar[data-mobile-planner="true"] { display: none; }
      }
    `}</style>
    <nav aria-label="Planner week" data-mobile-planner={props.children ? "true" : undefined} className="planner-toolbar text-slate-800 dark:text-slate-100">
      <div className="planner-week">
        <button type="button" className={`${button} planner-week-arrow`} aria-label="Previous week" onClick={() => props.shift(-7)}>&#8592;</button>
        <span className="planner-week-label" aria-live="polite">{formatWeek(props.plan.weekStart)}</span>
        <button type="button" className={`${button} planner-week-arrow`} aria-label="Next week" onClick={() => props.shift(7)}>&#8594;</button>
        {!isThisWeek && <button type="button" className={`${button} planner-this-week`} onClick={props.thisWeek}>This week</button>}
      </div>
      <div className="planner-actions">
        <button type="button" className={button} onClick={() => setPanel("connect")}>Add to calendar</button>
        <button type="button" className={button} onClick={() => setPanel("times")}>Meal times</button>
      </div>
    </nav>
    {props.children}
    {panel && <CalendarPanel {...props} initialPanel={panel} onClose={() => setPanel(null)} />}
  </MobileCalendarContext.Provider>;
}

export function MobileCalendarTile() {
  const controls = useContext(MobileCalendarContext);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLButtonElement>(null);
  const id = useId();
  function close() { setOpen(false); trigger.current?.focus(); }
  useEffect(() => {
    if (!open) return;
    first.current?.focus();
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); setOpen(false); trigger.current?.focus(); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <div ref={root} className="mobile-calendar-slot" onBlur={event => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
  }}>
    <style jsx>{`
      .mobile-calendar-slot { position: relative; min-width: 0; }
      .mobile-calendar-popover { position: absolute; z-index: 100; top: calc(100% + 12px); left: 50%; transform: translateX(-50%); width: min(380px, calc(100vw - 40px)); padding: 12px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #10243e; box-shadow: 0 14px 35px #14263b26; }
      .mobile-calendar-popover::before { content: ""; position: absolute; top: -8px; left: calc(50% - 8px); width: 16px; height: 16px; transform: rotate(45deg); background: white; border-left: 1px solid #e2e8f0; border-top: 1px solid #e2e8f0; }
      .mobile-calendar-week { display: grid; grid-template-columns: 40px minmax(0, 1fr) 40px; gap: 6px; align-items: center; padding-bottom: 10px; }
      .mobile-calendar-week span { font-size: 13px; font-weight: 700; text-align: center; }
      .mobile-calendar-week button { min-height: 44px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 20px; }
      .mobile-calendar-action { display: flex; align-items: center; gap: 12px; min-height: 46px; width: 100%; padding: 9px 4px; border-top: 1px solid #e2e8f0; text-align: left; font-size: 14px; }
      .mobile-calendar-action svg { width: 21px; height: 21px; flex-shrink: 0; }
      .mobile-calendar-action span:last-child { margin-left: auto; color: #64748b; font-size: 22px; }
      button { cursor: pointer; }
      button:focus-visible { outline: 2px solid #0284c7; outline-offset: 2px; }
      button:active { background-color: #f1f5f9; }
    `}</style>
    <button ref={trigger} type="button" className="planner-mobile-tile planner-mobile-calendar" disabled={!controls}
      aria-expanded={open} aria-controls={id} aria-haspopup="dialog" onClick={() => setOpen(value => !value)}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 11h18m-13 4h1m3 0h1m3 0h1M8 18h1m3 0h1" /></svg>
      <span>Calendar <span aria-hidden="true">⌄</span></span>
    </button>
    {open && controls && <div id={id} role="dialog" aria-label="Calendar controls" className="mobile-calendar-popover">
      <div className="mobile-calendar-week">
        <button ref={first} type="button" aria-label="Previous week" onClick={() => controls.shift(-7)}>&#8592;</button>
        <span aria-live="polite">{controls.week}</span>
        <button type="button" aria-label="Next week" onClick={() => controls.shift(7)}>&#8594;</button>
      </div>
      <button type="button" className="mobile-calendar-action" onClick={() => { close(); controls.thisWeek(); }}><span aria-hidden="true">↶</span><span>This week</span><span aria-hidden="true">›</span></button>
      <button type="button" className="mobile-calendar-action" onClick={() => { close(); controls.openPanel("connect"); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 11h18" /></svg><span>Add to calendar</span><span aria-hidden="true">›</span></button>
      <button type="button" className="mobile-calendar-action" onClick={() => { close(); controls.openPanel("times"); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></svg><span>Meal times</span><span aria-hidden="true">›</span></button>
    </div>}
  </div>;
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
  const [provider, setProvider] = useState<string | null>(null);
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
      <h2 id="calendar-title" className="text-lg font-bold">{tab === "times" ? "Meal times & reminders" : "Add to calendar"}</h2>
      <button type="button" disabled={busy} onClick={onClose} className={button} aria-label="Close calendar settings">×</button>
    </header>
    <div className="mb-4 flex gap-2"><button type="button" className={button} aria-pressed={tab === "connect"} onClick={() => setTab("connect")}>Add to calendar</button><button type="button" className={button} aria-pressed={tab === "times"} onClick={() => setTab("times")}>Meal times</button></div>
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
      <p className="text-base text-slate-600 dark:text-slate-300">Choose where you&apos;d like to see your planned meals.</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Choose a calendar">
        {["Google", "Outlook", "Apple"].map(name => <button key={name} type="button" aria-pressed={provider === name} onClick={() => setProvider(name)}
          className={`flex min-h-32 flex-col items-center justify-center gap-3 rounded-2xl border-2 p-4 text-center font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${provider === name ? "border-emerald-600 bg-emerald-50 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-950 dark:text-emerald-100" : "border-slate-200 bg-white text-slate-800 hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-emerald-400 dark:hover:bg-emerald-950"}`}>
          <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white p-2">
            {/* Official artwork is kept unmodified and served locally, without third-party requests. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/calendar-brands/${name === "Google" ? "google.png" : name === "Outlook" ? "outlook.svg" : "apple.png"}`} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
          </span>
          <span>{name} Calendar</span>
        </button>)}
      </div>
      <p>Your calendar can update automatically when you change your meal plan.</p>
      {guest && <p className="rounded-xl bg-emerald-50 p-3 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">Sign in to use automatic updates. You can download this week&apos;s meals below without signing in.</p>}
      {provider && <section aria-label={`${provider} Calendar setup`} className="space-y-3 rounded-xl border border-emerald-200 p-4 dark:border-emerald-800">
        <h3 className="font-bold">Add your meals to {provider} Calendar</h3>
        {guest ? <p>After signing in, select your calendar here to create a link and see the setup steps.</p> : <>
          <p>Create your calendar link below, copy it, then follow these steps.</p>
        <div className="flex flex-wrap gap-2"><button type="button" disabled={!ready || busy} className={button} onClick={() => void run(async () => { const data = await request("subscription", "POST", { generation: subscription.generation }); setSubscription(data); setUrl(data.url); })}>{subscription.active ? "Regenerate private link" : "Create private link"}</button>
          {subscription.active && <button type="button" disabled={busy} className={button} onClick={() => void run(async () => { const data = await request("subscription", "DELETE", { generation: subscription.generation }); setSubscription(data); setUrl(""); setMessage("Subscription revoked. The previous link no longer works."); })}>Revoke link</button>}</div>
        {url && <label className="block text-xs font-semibold">Private subscription URL (shown only now)<input readOnly value={url} onFocus={e => e.target.select()} className="my-1 w-full rounded-lg border border-slate-300 bg-transparent p-2 text-xs font-normal" /><button type="button" className={button} onClick={() => void run(async () => { await navigator.clipboard.writeText(url); setMessage("Private link copied."); })}>Copy link</button></label>}
        {provider === "Google" && <p>Open <a className="underline" href="https://calendar.google.com/" target="_blank" rel="noopener noreferrer">Google Calendar</a> in a desktop browser. Beside Other calendars, choose + → From URL. Paste the copied calendar link and choose Add calendar.</p>}
        {provider === "Outlook" && <p>Open <a className="underline" href="https://outlook.live.com/calendar/" target="_blank" rel="noopener noreferrer">Outlook Calendar</a>. Choose Add calendar → Subscribe from web. Paste the copied calendar link, name the calendar and import it. Use Subscribe, rather than uploading the snapshot file.</p>}
        {provider === "Apple" && <p>On iPhone/iPad, open Settings → Apps → Calendar → Calendar Accounts → Add Account → Other → Add Subscribed Calendar (older iOS: Settings → Calendar → Accounts). Paste your calendar link and keep SSL enabled. On Mac, Calendar → File → New Calendar Subscription.</p>}
        </>}
      </section>}
      <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
        <button type="button" className="text-sm font-semibold text-emerald-700 underline underline-offset-4 disabled:opacity-50 dark:text-emerald-300" disabled={!ready || busy} onClick={download}>Download this week (.ics)</button>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{formatWeek(plan.weekStart)}. A one-time copy; it won&apos;t update automatically.</p>
      </div>
      <details className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        <summary className="cursor-pointer font-semibold">Privacy &amp; technical details</summary>
        <div className="mt-3 space-y-2">
          <p>A read-only subscription includes all saved dated weeks. Anyone with its private link can view meal names and dates. Keep it private; regenerating or revoking stops the old link. Previously downloaded copies cannot be recalled.</p>
          <p>{liveCalendarEnabled() ? "Keep your private calendar link secure. Revoke it here to stop future access." : "Calendar Test only. Google, Outlook and Apple need a publicly reachable HTTPS feed. Production remains disabled."}</p>
          <p>Subscriptions update on your calendar provider&apos;s schedule, not immediately. Removing a meal publishes its event as cancelled. A downloaded file is a one-time snapshot.</p>
          {!guest && subscription.active && !provider && <p>Select your calendar above to manage or revoke its private link.</p>}
        </div>
      </details>

    </div>}
  </dialog>;
}
