import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const production = {
  NODE_ENV:'production', VERCEL_ENV:'production', NEXT_PUBLIC_VERCEL_ENV:'production',
  NEXT_PUBLIC_RENALPLAN_DATED_PRODUCTION:'1',
  NEXT_PUBLIC_SUPABASE_URL:'https://yyxjeukraeibxxloaors.supabase.co',
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:'sb_publishable_synthetic_production',
};
function config(env) {
  const exports = {}, requests = [];
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('./supabase/config.ts',import.meta.url),'utf8'),
    {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,
    {exports,process:{env},URL,AbortSignal,fetch:(...args)=>{requests.push(args);return Promise.resolve();}});
  return {c:exports,requests};
}

test('production remains off by default and ignores stale Test flags',()=>{
  for (const flag of [undefined,'0']) {
    const {c}=config({...production,NEXT_PUBLIC_RENALPLAN_DATED_PRODUCTION:flag,NEXT_PUBLIC_RENALPLAN_DATED_TEST:'1'});
    assert.equal(c.datedPlannerEnabled(),false);
    assert.equal(c.calendarSubscriptionsEnabled(),false);
  }
});
test('explicit production opt-in uses the exact production project and existing cookies',()=>{
  const {c}=config(production);
  assert.equal(c.datedPlannerEnabled(),true);
  assert.equal(c.supabaseConfiguration().url,c.CALENDAR_PRODUCTION_ORIGIN);
  assert.equal(c.supabaseConfiguration().cookieOptions,undefined);
  assert.equal(c.calendarGuestStorageKey(),'renalplan-calendar-guest');
  assert.equal(c.calendarApplicationOrigin(),'https://www.renalplan.com');
  assert.equal(c.calendarPreviewOrigin(),null);
  assert.equal(c.calendarPublicFeedOrigin(),null);
});
test('compiled browser and server production flags agree',()=>{
  for (const VERCEL_ENV of ['production',undefined])
    assert.equal(config({...production,VERCEL_ENV}).c.datedPlannerEnabled(),true);
  for (const env of [{VERCEL_ENV:'preview'},{VERCEL_ENV:'development'},{NEXT_PUBLIC_VERCEL_ENV:'preview'},{NODE_ENV:'development'}])
    assert.equal(config({...production,...env}).c.productionCalendarEnabled(),false);
});
test('production configuration rejects missing keys, Test credentials and foreign projects',()=>{
  for (const url of [undefined,'https://pyevnakjpgwvylqmpqat.supabase.co','https://evil.example',production.NEXT_PUBLIC_SUPABASE_URL+'/'])
    assert.throws(()=>config({...production,NEXT_PUBLIC_SUPABASE_URL:url}).c.supabaseConfiguration());
  for (const key of [undefined,'sb_secret_synthetic','legacy-unverified'])
    assert.throws(()=>config({...production,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:key}).c.supabaseConfiguration());
  assert.throws(()=>config({...production,NEXT_PUBLIC_RENALPLAN_CALENDAR_TEST_KEY:production.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}).c.supabaseConfiguration());
});
test('production transport rejects other destinations before networking and disables redirects',async()=>{
  const {c,requests}=config(production);
  for (const target of ['https://pyevnakjpgwvylqmpqat.supabase.co/rest/v1','https://evil.example/rest/v1','https://user@yyxjeukraeibxxloaors.supabase.co/rest/v1'])
    assert.throws(()=>c.calendarOnlyFetch(target));
  assert.equal(requests.length,0);
  await c.calendarOnlyFetch(production.NEXT_PUBLIC_SUPABASE_URL+'/rest/v1');
  assert.equal(requests.length,1);
  assert.equal(requests[0][1].redirect,'error');
});
test('production subscriptions require the logging policy opt-in and ignore Preview feed aliases',()=>{
  assert.equal(config(production).c.calendarSubscriptionsEnabled(),false);
  const {c}=config({...production,RENALPLAN_CALENDAR_RESTRICTED_LOGS_ACCEPTED:'1',RENALPLAN_CALENDAR_PUBLIC_FEED_ORIGIN:'https://synthetic.vercel.app'});
  assert.equal(c.calendarSubscriptionsEnabled(),true);
  assert.equal(c.calendarPublicFeedOrigin(),null);
});
test('Preview retains the fixed Test destination even with a stray production flag',()=>{
  const {c}=config({...production,VERCEL_ENV:'preview',NEXT_PUBLIC_VERCEL_ENV:'preview',NEXT_PUBLIC_RENALPLAN_DATED_TEST:'1',NEXT_PUBLIC_RENALPLAN_CALENDAR_TEST_KEY:'sb_publishable_synthetic_test'});
  assert.equal(c.supabaseConfiguration().url,c.CALENDAR_TEST_ORIGIN);
  assert.equal(c.supabaseConfiguration().cookieOptions.name,'renalplan-calendar-test-auth');
  assert.equal(c.calendarGuestStorageKey(),'renalplan-calendar-test-guest');
  assert.throws(()=>c.calendarOnlyFetch(production.NEXT_PUBLIC_SUPABASE_URL));
});

test('explicit local live mode retains live cookies and HTTPS links but cannot activate hosted environments',()=>{
 const env={...production,NODE_ENV:'development',VERCEL_ENV:undefined,NEXT_PUBLIC_VERCEL_ENV:undefined,NEXT_PUBLIC_RENALPLAN_DATED_PRODUCTION:undefined,NEXT_PUBLIC_RENALPLAN_DATED_LOCAL_LIVE:'1'};
 const {c}=config(env);
 assert.equal(c.datedPlannerEnabled(),true);assert.equal(c.productionCalendarEnabled(),false);
 assert.equal(c.supabaseConfiguration().url,c.CALENDAR_PRODUCTION_ORIGIN);
 assert.equal(c.supabaseConfiguration().cookieOptions,undefined);
 assert.equal(c.calendarApplicationOrigin(),null);
 assert.equal(c.calendarPublicFeedOrigin(),'https://www.renalplan.com');
 assert.throws(()=>c.calendarOnlyFetch(c.CALENDAR_TEST_ORIGIN+'/rest/v1'));
 for(const extra of [{NODE_ENV:'production'},{VERCEL_ENV:'preview'},{VERCEL_ENV:'production'}])assert.equal(config({...env,...extra}).c.localLiveCalendarEnabled(),false);
});
