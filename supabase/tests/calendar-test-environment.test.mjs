import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarTestConfiguration, calendarTestFetch, CALENDAR_TEST_URL } from './calendar-test-environment.mjs';
test('calendar tests cannot use normal app configuration as a fallback', () => {
  assert.throws(() => calendarTestConfiguration({ NEXT_PUBLIC_SUPABASE_URL: 'https://production.example', NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_example' }));
});
test('calendar tests reject alternate projects and privileged keys', () => {
  assert.throws(() => calendarTestConfiguration({ RENALPLAN_CALENDAR_TEST_URL: 'https://production.example', RENALPLAN_CALENDAR_TEST_PUBLISHABLE_KEY: 'sb_publishable_example' }));
  assert.throws(() => calendarTestConfiguration({ RENALPLAN_CALENDAR_TEST_PUBLISHABLE_KEY: 'sb_secret_example' }));
});
test('calendar tests target only the approved project', () => {
  assert.equal(calendarTestConfiguration({ RENALPLAN_CALENDAR_TEST_PUBLISHABLE_KEY: 'sb_publishable_example' }).url, CALENDAR_TEST_URL);
  assert.throws(() => calendarTestFetch('https://production.example/rest/v1/user_meal_plans'));
});
