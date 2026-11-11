// Synthetic, loopback-only service. No production or test-project credentials.
export const serviceURL = 'http://127.0.0.1:54329';
export const appURL = 'http://127.0.0.1:3100';
export const testEnvironment = {
  NEXT_PUBLIC_SUPABASE_URL: serviceURL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_browser_fixture',
  NEXT_PUBLIC_RENALPLAN_DATED_TEST: '0',
  NEXT_PUBLIC_RENALPLAN_DATED_PRODUCTION: '0',
  NEXT_PUBLIC_RENALPLAN_DATED_LOCAL_LIVE: '0',
  NEXT_PUBLIC_VERCEL_ENV: '',
  VERCEL_ENV: '',
  NEXT_TELEMETRY_DISABLED: '1',
};
