import { defineConfig } from '@playwright/test';
import { appURL, serviceURL, testEnvironment } from './tests/e2e/environment';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: appURL,
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    serviceWorkers: 'block',
  },
  projects: [
    { name: 'mobile-light', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, colorScheme: 'light' } },
    { name: 'small-mobile-dark', use: { viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true, colorScheme: 'dark' } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 }, colorScheme: 'light' } },
  ],
  webServer: [
    { command: 'node tests/e2e/service.mjs', url: `${serviceURL}/health`, reuseExistingServer: false },
    {
      command: process.env.CI ? 'node node_modules/next/dist/bin/next start -H 127.0.0.1 -p 3100' : 'node node_modules/next/dist/bin/next dev -H 127.0.0.1 -p 3100',
      url: appURL,
      env: testEnvironment,
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
});
