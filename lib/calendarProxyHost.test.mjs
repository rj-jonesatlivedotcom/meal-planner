import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function proxy(environment) {
  const exports = {};
  class Response {
    constructor(body, options) { this.status = options.status; }
    static next() { return { status: 200 }; }
  }
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('./supabase/proxy.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, { exports, URL, process: { env: { VERCEL_ENV: environment } }, require: name => {
    if (name === 'next/server') return { NextResponse: Response };
    if (name === '@supabase/ssr') return { createServerClient: () => ({ auth: { getClaims: async () => ({}) } }) };
    if (name === '../calendarFeedHost') return { calendarFeedHostPolicy: () => null };
    return { supabaseConfiguration: () => ({}), datedPlannerEnabled: () => true,
      calendarApplicationOrigin: () => environment === 'production' ? 'https://www.renalplan.com'
        : environment === 'preview' ? 'https://example.vercel.app' : null };
  } });
  return host => exports.updateSession({ headers: new Headers(host ? { host } : {}),
    nextUrl: { hostname: '0.0.0.0' }, cookies: { getAll: () => [] } });
}

test('local requests validate the incoming host rather than the Next.js bind address', async () => {
  for (const host of ['localhost:3000', '127.0.0.1:3000', 'localhost', 'LOCALHOST:3000'])
    assert.equal((await proxy(undefined)(host)).status, 200);
  for (const host of ['evil.example:3000', '0.0.0.0:3000', 'localhost.evil.example', 'evil@localhost', null])
    assert.equal((await proxy(undefined)(host)).status, 403);
});

test('hosted canonical-host restrictions remain unchanged', async () => {
  for (const environment of ['production', 'preview']) {
    for (const host of ['localhost:3000', '127.0.0.1:3000', 'evil.example'])
      assert.equal((await proxy(environment)(host)).status, 403);
    assert.equal((await proxy(environment)(environment === 'production' ? 'www.renalplan.com' : 'example.vercel.app')).status, 200);
  }
});
