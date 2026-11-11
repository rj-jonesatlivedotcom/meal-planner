import { randomUUID } from 'node:crypto';
import { test as base, expect, type Page, type TestInfo } from '@playwright/test';
import { appURL, serviceURL } from './environment';

type Account = { id: string; token: string; headers: { Authorization: string } };
export const test = base.extend<{ account: Account }>({
  account: [async ({ context }, use, info) => {
    const id = `e2e-${randomUUID()}`;
    const theme = info.project.use.colorScheme === 'dark' ? 'dark' : 'light';
    if (info.project.name === 'small-mobile-dark') {
      await context.addInitScript(() => {
        document.addEventListener('DOMContentLoaded', () => { document.documentElement.style.fontSize = '200%'; });
      });
    }
    const expires = Math.floor(Date.now() / 1000) + 3600;
    const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url');
    const token = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: id, aud: 'authenticated', exp: expires, iat: expires - 3600, role: 'authenticated', theme })}.${Buffer.from('fixture-signature').toString('base64url')}`;
    const user = { id, user_metadata: { renalplan_theme: theme } };
    const session = { access_token: token, refresh_token: 'fixture-refresh-token', token_type: 'bearer', expires_in: 3600, expires_at: expires, user };
    await context.addCookies([{ name: 'sb-127-auth-token', value: `base64-${encode(session)}`, url: appURL }]);
    const unexpected: string[] = [];
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if ([appURL, serviceURL].includes(url.origin)) return route.continue();
      // Existing Vercel reporting scripts are blocked, never loaded in tests.
      if (url.origin === 'https://va.vercel-scripts.com') return route.abort();
      unexpected.push(url.origin);
      return route.abort();
    });
    await use({ id, token, headers: { Authorization: `Bearer ${token}` } });
    expect(unexpected, 'Browser must stay on the local app and synthetic service').toEqual([]);
  }, { auto: true }],
});
export { expect };

export async function checkLayout(page: Page) {
  const width = page.viewportSize()!.width;
  try {
    await expect.poll(() => page.evaluate(viewportWidth => document.documentElement.scrollWidth - viewportWidth, width), { message: 'Page must fit the configured viewport without horizontal scrolling' }).toBeLessThanOrEqual(1);
  } catch (error) {
    const elements = await page.locator('body *').evaluateAll((nodes, viewportWidth) => nodes
      .filter(node => node.getBoundingClientRect().right > viewportWidth + 1)
      .slice(0, 15).map(node => ({ tag: node.tagName, class: node.className, right: node.getBoundingClientRect().right })), width);
    await test.info().attach('overflow-elements', { body: JSON.stringify(elements, null, 2), contentType: 'application/json' });
    throw error;
  }
}

export async function capture(page: Page, info: TestInfo, name: string) {
  await checkLayout(page);
  const path = info.outputPath(`${name}.png`);
  await page.screenshot({ path, fullPage: true });
  await info.attach(name, { path, contentType: 'image/png' });
}

test.afterEach(async ({ page }) => {
  await checkLayout(page);
});

test.beforeEach(async ({ page }) => {
  page.on('pageerror', error => { throw error; });
});
