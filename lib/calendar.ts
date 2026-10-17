import { WEEK_DAYS, MEAL_SLOTS, dateForSlot, requireMonday, type WeeklyMeals } from "./weeklyPlans";

export type CalendarPreferences = {
  timezone: string; breakfastTime: string; lunchTime: string; dinnerTime: string;
  mealEnabled: boolean; mealMinutes: number; preparationEnabled: boolean; preparationMinutes: number;
  shoppingEnabled: boolean; shoppingWeekday: number; shoppingTime: string;
};
export const calendarDefaults: CalendarPreferences = {
  timezone: "Europe/London", breakfastTime: "08:00", lunchTime: "13:00", dinnerTime: "18:00",
  mealEnabled: true, mealMinutes: 15, preparationEnabled: true, preparationMinutes: 30,
  shoppingEnabled: true, shoppingWeekday: 6, shoppingTime: "10:00",
};
export function calendarPreferences(value: unknown): CalendarPreferences {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid calendar preferences");
  const source = value as Record<string, unknown>;
  if (Object.keys(source).sort().join() !== Object.keys(calendarDefaults).sort().join()) throw new Error("Unexpected calendar preference fields");
  const p = source as CalendarPreferences;
  if (typeof p.timezone !== "string") throw new Error("Choose a valid time zone");
  new Intl.DateTimeFormat("en-GB", { timeZone: p.timezone }).format();
  for (const field of ["breakfastTime", "lunchTime", "dinnerTime", "shoppingTime"] as const)
    if (typeof p[field] !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(p[field])) throw new Error("Enter times as HH:mm");
  for (const field of ["mealEnabled", "preparationEnabled", "shoppingEnabled"] as const)
    if (typeof p[field] !== "boolean") throw new Error("Invalid reminder setting");
  for (const field of ["mealMinutes", "preparationMinutes", "shoppingWeekday"] as const)
    if (!Number.isInteger(p[field]) || p[field] < (field === "shoppingWeekday" ? 1 : 0) || p[field] > (field === "shoppingWeekday" ? 7 : 10080)) throw new Error("Reminder value out of range");
  return { ...p };
}
export function preferencesFromRow(row: Record<string, unknown> | null) {
  if (!row) return { ...calendarDefaults };
  return calendarPreferences({ timezone: row.timezone,
    breakfastTime: String(row.breakfast_time).slice(0, 5), lunchTime: String(row.lunch_time).slice(0, 5), dinnerTime: String(row.dinner_time).slice(0, 5),
    mealEnabled: row.meal_reminders_enabled ?? true, mealMinutes: row.meal_reminder_minutes ?? 15,
    preparationEnabled: row.preparation_reminders_enabled, preparationMinutes: row.preparation_reminder_minutes,
    shoppingEnabled: row.shopping_reminders_enabled, shoppingWeekday: row.shopping_reminder_weekday,
    shoppingTime: String(row.shopping_reminder_time).slice(0, 5) });
}
export function formatWeek(week: string) {
  const start = new Date(`${requireMonday(week)}T12:00Z`), end = new Date(`${dateForSlot(week, "Sunday")}T12:00Z`);
  const month = (d: Date) => d.toLocaleDateString("en-GB", { month: "long", timeZone: "UTC" });
  if (start.getUTCFullYear() !== end.getUTCFullYear()) return `${start.getUTCDate()} ${month(start)} ${start.getUTCFullYear()}–${end.getUTCDate()} ${month(end)} ${end.getUTCFullYear()}`;
  return `${start.getUTCDate()}${start.getUTCMonth() === end.getUTCMonth() ? "" : ` ${month(start)}`}–${end.getUTCDate()} ${month(end)} ${end.getUTCFullYear()}`;
}
export function shortCalendarDate(date: string) {
  return new Date(`${date}T12:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

/** Wall times are resolved using the IANA zone. Ambiguous autumn times use the
 * earlier occurrence; nonexistent spring times fail explicitly, never shift silently. */
export function zonedInstant(date: string, time: string, timezone: string): Date {
  const target = Date.parse(`${date}T${time}:00Z`);
  if (!Number.isFinite(target)) throw new Error("Invalid event date/time");
  const formatter = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
  const wall = (ms: number) => {
    const parts = formatter.formatToParts(new Date(ms));
    const get = (name: string) => parts.find(part => part.type === name)!.value;
    return Date.parse(`${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}Z`);
  };
  const offsets = new Set([-2, -1, 0, 1, 2].map(days => { const ms = target + days * 86400000; return wall(ms) - ms; }));
  const matches = [...offsets].map(offset => target - offset).filter(ms => wall(ms) === target).sort((a, b) => a - b);
  if (!matches.length) throw new Error(`The local time ${time} on ${date} does not exist in ${timezone}. Choose another meal time.`);
  return new Date(matches[0]);
}
export type CalendarWeek = { weekStart: string; planner: WeeklyMeals; revision: number; updatedAt: string };
export type CalendarRecipe = { id: string; name: string };
export async function calendarNamespace(ownerId: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ownerId));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}
const escapeText = (text: string) => text.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
function fold(line: string) {
  let out = "", length = 0;
  for (const char of line) {
    const size = new TextEncoder().encode(char).length;
    if (length + size > 75) { out += "\r\n "; length = 1; }
    out += char; length += size;
  }
  return out;
}
/** Full snapshot with cancelled empty-slot tombstones for subscription updates.
 * Only meal names/dates appear: no clinical preferences, quantities or nutrients. */
export function buildCalendar(input: {
  namespace: string; weeks: CalendarWeek[]; preferences: CalendarPreferences;
  recipes: readonly CalendarRecipe[]; subscription?: boolean; settingsRevision?: number; settingsUpdatedAt?: string;
}) {
  const p = calendarPreferences(input.preferences), names = new Map(input.recipes.map(recipe => [recipe.id, recipe.name]));
  if (!/^[a-f0-9]{64}$/.test(input.namespace)) throw new Error("Invalid calendar identity");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//RenalPlan//Meal Planner//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:RenalPlan meals"];
  for (const week of input.weeks) {
    requireMonday(week.weekStart);
    const updated = new Date(Math.max(Date.parse(week.updatedAt), Date.parse(input.settingsUpdatedAt ?? week.updatedAt)));
    if (!Number.isFinite(updated.getTime()) || !Number.isSafeInteger(week.revision) || week.revision < 0) throw new Error("Invalid calendar revision");
    const sequence = Math.min(2147483647, week.revision + (input.settingsRevision ?? 0));
    const event = (key: string, date: string, time: string, name: string, cancelled: boolean, shopping = false) => {
      if (cancelled && !input.subscription) return;
      const start = cancelled ? new Date(`${date}T12:00:00Z`) : zonedInstant(date, time, p.timezone);
      lines.push("BEGIN:VEVENT", `UID:${input.namespace}-${key}@calendar.renalplan`, `DTSTAMP:${stamp(updated)}`, `LAST-MODIFIED:${stamp(updated)}`, `SEQUENCE:${sequence}`,
        `DTSTART:${stamp(start)}`, `DTEND:${stamp(new Date(start.getTime() + 30 * 60000))}`, `SUMMARY:${escapeText(name)}`, "CLASS:PRIVATE", "TRANSP:TRANSPARENT", `STATUS:${cancelled ? "CANCELLED" : "CONFIRMED"}`);
      const alarm = (minutes: number, description: string) => lines.push("BEGIN:VALARM", "ACTION:DISPLAY", `TRIGGER:-PT${minutes}M`, `DESCRIPTION:${escapeText(description)}`, "END:VALARM");
      if (!cancelled) {
        if (shopping) alarm(0, "Shopping for the planned week");
        else {
          if (p.mealEnabled) alarm(p.mealMinutes, name);
          if (p.preparationEnabled) alarm(p.preparationMinutes, `Prepare ${name}`);
        }
      }
      lines.push("END:VEVENT");
    };
    for (const day of WEEK_DAYS) for (const slot of MEAL_SLOTS) {
      const date = dateForSlot(week.weekStart, day), id = week.planner[day]?.[slot];
      event(`${date}-${slot.toLowerCase()}`, date, p[`${slot.toLowerCase()}Time` as "breakfastTime" | "lunchTime" | "dinnerTime"], id ? (names.get(id) ?? `Planned ${slot.toLowerCase()}`) : `Cancelled ${slot.toLowerCase()}`, !id);
    }
    const shoppingDate = new Date(`${week.weekStart}T12:00Z`);
    shoppingDate.setUTCDate(shoppingDate.getUTCDate() - (8 - p.shoppingWeekday));
    const hasMeals = WEEK_DAYS.some(day => MEAL_SLOTS.some(slot => week.planner[day]?.[slot]));
    event(`${week.weekStart}-shopping`, shoppingDate.toISOString().slice(0, 10), p.shoppingTime, `Shopping for ${formatWeek(week.weekStart)}`, !p.shoppingEnabled || !hasMeals, true);
  }
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}
