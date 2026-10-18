import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as crypto from 'node:crypto';
const modules = new Map();
function load(name) {
 if (name === 'node:crypto') return crypto;
 if (modules.has(name)) return modules.get(name);
 const exports = {}; modules.set(name, exports);
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL(name + '.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText,
 { exports, require: load, Response, Request, URL, Intl, Date, TextEncoder, crypto: crypto.webcrypto });
 return exports;
}
const { calendarHandlers } = load('./calendarApi'), { calendarDefaults } = load('./calendar');
const owner = 'synthetic-owner', origin = 'http://127.0.0.1:4330';
function fixture(overrides = {}) {
 const calls = [], tokens = new Map(); let generation = 0, hash = null, active = false, signedIn = true, enabled = true;
 const client = { auth: { getUser: async () => ({ data: { user: signedIn ? { id: owner } : null }, error: null }) },
 from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }) }),
 rpc: async (name, args) => {
 calls.push({ name, args });
 if (name === 'rp_calendar_feed') return { data: active && args.p_token_hash === hash ? { namespace: 'a'.repeat(64), weeks: [], settings: null } : null, error: null };
 if (name === 'rp_calendar_subscription') {
   if (args.p_action !== 'status') {
     if (args.p_expected_generation !== generation) return { error: { code: 'PT409' } };
     generation++; active = args.p_action === 'rotate'; if (active) { hash = args.p_token_hash; tokens.set(hash, true); }
   }
   return { data: { active, generation }, error: null };
 }
 return { error: { code: 'PT409' } };
 }};
 const handlers = calendarHandlers({ enabled: () => enabled, account: async () => client, publicClient: () => client, recipes: [], ...overrides });
 const req = (method='GET', data, extra={}) => new Request(origin + '/api/calendar/subscription', { method, headers: { origin, 'x-renalplan-owner': owner, 'content-type': 'application/json', ...extra }, ...(data ? { body: JSON.stringify(data) } : {}) });
 return { handlers, req, calls, tokens, disable: () => { enabled = false; }, signOut: () => { signedIn = false; } };
}

test('preview blocks bearer creation and feed lookup before sending a token upstream',async()=>{
 const f=fixture({subscriptionsEnabled:()=>false});
 assert.equal((await f.handlers.accountRequest(f.req('POST',{generation:0}),'subscription')).status,503);
 assert.equal((await f.handlers.feed('a'.repeat(43))).status,404);
 assert.equal(f.calls.length,0);
});

test('HTTPS preview uses canonical deployment origin and rejects host substitution',async()=>{
 const trusted='https://renalplan-synthetic.vercel.app', f=fixture({trustedOrigin:()=>trusted});
 const request=new Request(trusted+'/api/calendar/subscription',{method:'POST',headers:{host:new URL(trusted).host,origin:trusted,'x-renalplan-owner':owner,'content-type':'application/json'},body:JSON.stringify({generation:0})});
 const response=await f.handlers.accountRequest(request,'subscription');
 assert.equal(response.status,200);assert.equal(new URL((await response.json()).url).origin,trusted);
 assert.equal((await f.handlers.accountRequest(f.req('POST',{generation:1},{host:'evil.example'}),'subscription')).status,403);
});

test('production links use the fixed website origin and reject foreign management hosts',async()=>{
 const trusted='https://www.renalplan.com',f=fixture({trustedOrigin:()=>trusted,subscriptionsEnabled:()=>true});
 const request=new Request(trusted+'/api/calendar/subscription',{method:'POST',headers:{host:'www.renalplan.com',origin:trusted,'x-renalplan-owner':owner,'content-type':'application/json'},body:JSON.stringify({generation:0})});
 const response=await f.handlers.accountRequest(request,'subscription');
 assert.equal(response.status,200);assert.equal(new URL((await response.json()).url).origin,trusted);
 assert.equal((await f.handlers.accountRequest(f.req('POST',{generation:1},{host:'renalplan-synthetic.vercel.app'}),'subscription')).status,403);
 assert.equal((await f.handlers.accountRequest(f.req('POST',{generation:1},{host:'www.renalplan.com',origin:'https://evil.example'}),'subscription')).status,403);
});

test('private links use the configured feed origin while management stays same-origin',async()=>{
 const feed='https://renalplan-feed-synthetic.vercel.app',f=fixture({feedOrigin:()=>feed});
 const response=await f.handlers.accountRequest(f.req('POST',{generation:0}),'subscription');
 assert.equal(response.status,200);assert.equal(new URL((await response.json()).url).origin,feed);
 assert.equal((await f.handlers.accountRequest(f.req('POST',{generation:1},{origin:feed}),'subscription')).status,403);
});
test('production gate rejects every calendar operation before constructing any client', async () => {
 const f=fixture(); f.disable(); assert.equal((await f.handlers.accountRequest(f.req(), 'settings')).status,404);
 assert.equal((await f.handlers.feed('a'.repeat(43))).status,404); assert.equal(f.calls.length,0);
});
test('unauthenticated users cannot manage subscriptions or settings', async () => {
 const f=fixture(); f.signOut(); assert.equal((await f.handlers.accountRequest(f.req(), 'subscription')).status,401); assert.equal(f.calls.length,0);
});
test('cross-origin mutation and switched-account requests are rejected', async () => {
 const f=fixture(); assert.equal((await f.handlers.accountRequest(f.req('POST',{generation:0},{origin:'https://evil.example'}),'subscription')).status,403);
 assert.equal((await f.handlers.accountRequest(f.req('POST',{generation:0},{'x-renalplan-owner':'other'}),'subscription')).status,409);
 assert.equal(f.calls.length,0);
});
test('internal localhost normalization accepts the real loopback Host and retains it in private links', async () => {
 const f=fixture();
 const request=new Request('http://localhost:4330/api/calendar/subscription',{method:'POST',headers:{host:'127.0.0.1:4330',origin,'x-renalplan-owner':owner,'content-type':'application/json'},body:JSON.stringify({generation:0})});
 const response=await f.handlers.accountRequest(request,'subscription'); assert.equal(response.status,200);
 const body=await response.json(); assert.equal(new URL(body.url).origin,origin);
});
test('untrusted and forwarded hosts cannot change calendar link destinations',async()=>{
 const f=fixture(); const rejected=await f.handlers.accountRequest(f.req('POST',{generation:0},{host:'evil.example'}),'subscription');
 assert.equal(rejected.status,403); assert.equal(f.calls.length,0);
 const valid=await f.handlers.accountRequest(f.req('POST',{generation:0},{host:'127.0.0.1:4330','x-forwarded-host':'evil.example'}),'subscription');
 assert.equal(valid.status,200); assert.equal(new URL((await valid.json()).url).origin,origin);
});
test('random raw token is returned once; only a SHA256 hash reaches the RPC', async () => {
 const f=fixture(), response=await f.handlers.accountRequest(f.req('POST',{generation:0}),'subscription'), body=await response.json();
 assert.equal(response.status,200); const token=body.url.split('/').at(-1); assert.match(token,/^[A-Za-z0-9_-]{43}$/);
 assert.equal(f.calls[0].args.p_token_hash,crypto.createHash('sha256').update(token).digest('hex'));
 assert(!JSON.stringify(f.calls).includes(token)); assert.equal((await f.handlers.feed(token)).status,200);
 const status=await (await f.handlers.accountRequest(f.req(),'subscription')).json(); assert(!('url' in status));
});
test('revocation and regeneration immediately invalidate the old capability', async () => {
 const f=fixture(); const first=await (await f.handlers.accountRequest(f.req('POST',{generation:0}),'subscription')).json(); const a=first.url.split('/').at(-1);
 const next=await (await f.handlers.accountRequest(f.req('POST',{generation:1}),'subscription')).json(); const b=next.url.split('/').at(-1);
 assert.notEqual(a,b); assert.equal((await f.handlers.feed(a)).status,404); assert.equal((await f.handlers.feed(b)).status,200);
 assert.equal((await f.handlers.accountRequest(f.req('DELETE',{generation:2}),'subscription')).status,200);
 assert.equal((await f.handlers.feed(b)).status,404);
});
test('concurrent stale token/settings changes return 409 without retry or replacement', async () => {
 const f=fixture(); await f.handlers.accountRequest(f.req('POST',{generation:0}),'subscription');
 assert.equal((await f.handlers.accountRequest(f.req('POST',{generation:0}),'subscription')).status,409);
 assert.equal((await f.handlers.accountRequest(f.req('PUT',{revision:1,preferences:calendarDefaults}),'settings')).status,409);
});
test('malformed tokens fail before public database lookup', async () => {
 const f=fixture(); for (const token of ['', 'secret', '../', 'a'.repeat(44)]) assert.equal((await f.handlers.feed(token)).status,404);
 assert.equal(f.calls.length,0);
});
test('feed is non-cacheable calendar data with protective response headers', async () => {
 const f=fixture(), result=await (await f.handlers.accountRequest(f.req('POST',{generation:0}),'subscription')).json();
 const response=await f.handlers.feed(result.url.split('/').at(-1));
 assert.match(response.headers.get('content-type'),/^text\/calendar/); assert.match(response.headers.get('cache-control'),/no-store/);
 assert.equal(response.headers.get('referrer-policy'),'no-referrer'); assert.equal(response.headers.get('x-content-type-options'),'nosniff');
 assert.match(await response.text(),/^BEGIN:VCALENDAR\r\n/);
});
test('invalid settings and generation values do not reach a write RPC', async () => {
 const f=fixture(); assert.equal((await f.handlers.accountRequest(f.req('POST',{generation:-1}),'subscription')).status,400);
 assert.equal((await f.handlers.accountRequest(f.req('PUT',{revision:null,preferences:{...calendarDefaults,mealMinutes:0.1}}),'settings')).status,400);
 assert.equal(f.calls.length,0);
});
