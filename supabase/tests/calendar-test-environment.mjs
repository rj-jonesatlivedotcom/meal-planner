// Deliberately no .env.local loading or production fallbacks.
export const CALENDAR_TEST_URL = 'https://pyevnakjpgwvylqmpqat.supabase.co';

export function calendarTestConfiguration(env) {
  if (env.RENALPLAN_CALENDAR_TEST_URL && env.RENALPLAN_CALENDAR_TEST_URL !== CALENDAR_TEST_URL) {
    throw new Error('Calendar tests refuse an unrecognised project');
  }
  const key = env.RENALPLAN_CALENDAR_TEST_PUBLISHABLE_KEY;
  if (!key?.startsWith('sb_publishable_')) throw new Error('Calendar Test publishable key required; no production fallback');
  return { url: CALENDAR_TEST_URL, key };
}

export function calendarTestFetch(input, init) {
  const target = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
  if (target.origin !== CALENDAR_TEST_URL) throw new Error('Calendar test request outside approved project');
  return fetch(input, { ...init, redirect: 'error', signal: AbortSignal.timeout(20000) });
}
