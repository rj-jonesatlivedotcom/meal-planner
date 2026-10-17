import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { webcrypto, createHash } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
const modules = new Map();
function load(name) {
  if (modules.has(name)) return modules.get(name);
  const exports = {}; modules.set(name, exports);
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL(name + '.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText,
    { exports, require: load, Intl, Date, TextEncoder, crypto: webcrypto });
  return exports;
}
const c = load('./calendar'), w = load('./weeklyPlans');
const plan = w.emptyWeeklyPlan({ kind: 'account', id: 'owner-a' }, '2026-10-19');
plan.planner.Monday.Breakfast = 'B001'; plan.planner.Sunday.Dinner = 'D001';
const namespace = 'a'.repeat(64);
const input = extra => ({ namespace, weeks: [{ weekStart: plan.weekStart, planner: plan.planner, revision: 3, updatedAt: '2026-10-17T12:00:00Z' }],
 preferences: { ...c.calendarDefaults }, recipes: [{ id: 'B001', name: 'Porridge' }, { id: 'D001', name: 'Dinner' }], ...extra });
const events = text => text.split('BEGIN:VEVENT\r\n').slice(1).map(s => s.split('END:VEVENT')[0]);

test('UK week ranges, including month and year boundaries', () => {
 assert.equal(c.formatWeek('2026-10-19'), '19–25 October 2026');
 assert.equal(c.formatWeek('2026-10-26'), '26 October–1 November 2026');
 assert.equal(c.formatWeek('2026-12-28'), '28 December 2026–3 January 2027');
 assert.equal(c.shortCalendarDate('2026-10-19'), '19 Oct');
});
test('London timezone follows the clock change within one week', () => {
 const data = c.buildCalendar(input());
 assert(data.includes('DTSTART:20261019T070000Z'));
 assert(data.includes('DTSTART:20261025T180000Z'));
 assert.equal(events(data).length, 3);
});
test('shopping reminder defaults to Saturday before the planned week at 10am London', () => {
 const event = events(c.buildCalendar(input())).find(s => s.includes('-shopping@'));
 assert(event.includes('DTSTART:20261017T090000Z'));
 assert(event.includes('TRIGGER:-PT0M'));
});
test('DST gaps fail explicitly; ambiguous times use the earlier occurrence', () => {
 assert.throws(() => c.zonedInstant('2026-03-29', '01:30', 'Europe/London'), /does not exist/);
 assert.equal(c.zonedInstant('2026-10-25', '01:30', 'Europe/London').toISOString(), '2026-10-25T00:30:00.000Z');
});
test('stable meal identity survives recipe changes and token-independent rebuilds', () => {
 const before = events(c.buildCalendar(input()))[0];
 const copy = JSON.parse(JSON.stringify(input())); copy.weeks[0].planner.Monday.Breakfast = 'D001'; copy.weeks[0].revision++;
 const after = events(c.buildCalendar(copy))[0];
 assert.equal(before.match(/UID:(.*)/)[1], after.match(/UID:(.*)/)[1]);
 assert(after.includes('SUMMARY:Dinner')); assert(after.includes('SEQUENCE:4'));
});
test('subscription publishes empty-slot and clear-week cancellations; snapshot omits them', () => {
 const data = c.buildCalendar(input({ subscription: true }));
 assert.equal(events(data).length, 22); assert.equal((data.match(/STATUS:CANCELLED/g) ?? []).length, 19);
 const copy = JSON.parse(JSON.stringify(input({ subscription: true })));
 copy.weeks[0].planner = w.emptyWeeklyPlan(plan.owner, plan.weekStart).planner;
 assert.equal((c.buildCalendar(copy).match(/STATUS:CANCELLED/g) ?? []).length, 22);
});
test('all saved weeks appear without copying meals into any other week', () => {
 const data = input(); data.weeks.push({ ...data.weeks[0], weekStart: '2026-10-26' });
 const text = c.buildCalendar(data); assert.equal(events(text).length, 6);
 assert(text.includes('20261026T080000Z')); assert(text.includes('20261101T180000Z'));
});
test('optional alarms, shopping time and timezone can be changed independently', () => {
 const data = input(); Object.assign(data.preferences, { mealEnabled: false, preparationEnabled: false, shoppingEnabled: false });
 const text = c.buildCalendar(data); assert(!text.includes('VALARM')); assert.equal(events(text).length, 2);
});
test('normal meal/preparation alarms have approved lead times; no invented advance metadata', () => {
 const text = c.buildCalendar(input()); assert.equal((text.match(/TRIGGER:-PT15M/g) ?? []).length, 2);
 assert.equal((text.match(/TRIGGER:-PT30M/g) ?? []).length, 2);
 assert(!text.includes('advance')); assert(!text.includes('potassium')); assert(!text.includes('household'));
});
test('RFC text escaping, UTF-8 byte folding and CRLF prevent injected properties', () => {
 const name = 'é'.repeat(95) + ',;\\\r\nATTENDEE:evil';
 const text = c.buildCalendar(input({ recipes: [{ id: 'B001', name }] }));
 assert(text.split('\r\n').every(line => Buffer.byteLength(line, 'utf8') <= 75));
 assert(!text.includes('\r\nATTENDEE:')); assert(text.includes('\\,\\;\\\\\\nATTENDEE:evil'));
 assert(!text.replace(/\r\n/g, '').includes('\n'));
});
test('preferences preserve existing Sunday settings; never silently replace them with new defaults', () => {
 const row = { timezone: 'Europe/London', breakfast_time: '08:00:00', lunch_time: '13:00:00', dinner_time: '18:00:00',
 preparation_reminders_enabled: false, preparation_reminder_minutes: 50, shopping_reminders_enabled: true, shopping_reminder_weekday: 7, shopping_reminder_time: '16:00:00' };
 const result = c.preferencesFromRow(row); assert.equal(result.shoppingWeekday, 7); assert.equal(result.shoppingTime, '16:00'); assert.equal(result.preparationMinutes, 50);
});
for (const change of [{ mealMinutes: 1.5 }, { shoppingWeekday: 8 }, { breakfastTime: '25:00' }, { timezone: 'not/a-zone' }, { mealEnabled: 'yes' }, { other: 1 }])
 test('invalid preferences rejected: ' + JSON.stringify(change), () => assert.throws(() => c.calendarPreferences({ ...c.calendarDefaults, ...change })));
test('account namespaces are deterministic SHA256 and isolated', async () => {
 assert.equal(await c.calendarNamespace('owner-a'), createHash('sha256').update('owner-a').digest('hex'));
 assert.notEqual(await c.calendarNamespace('owner-a'), await c.calendarNamespace('owner-b'));
 assert.match(await c.calendarNamespace('owner-a'), /^[a-f0-9]{64}$/);
});
