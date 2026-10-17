import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function config(env) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('./supabase/config.ts', import.meta.url), 'utf8'),
    {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText, {exports,process:{env},URL});
  return exports;
}
const preview = {NODE_ENV:'production',VERCEL_ENV:'preview',NEXT_PUBLIC_VERCEL_ENV:'preview',NEXT_PUBLIC_RENALPLAN_DATED_TEST:'1',VERCEL_URL:'renalplan-synthetic.vercel.app',NEXT_PUBLIC_RENALPLAN_CALENDAR_TEST_KEY:'sb_publishable_synthetic'};
test('preview uses only Calendar Test and dedicated cookies',()=>{
  const c=config({...preview,NEXT_PUBLIC_SUPABASE_URL:'https://production.example',NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:'wrong'});
  assert.equal(c.datedPlannerEnabled(),true);
  assert.equal(c.supabaseConfiguration().url,c.CALENDAR_TEST_ORIGIN);
  assert.equal(c.supabaseConfiguration().cookieOptions.name,'renalplan-calendar-test-auth');
  assert.equal(c.calendarPreviewOrigin(),'https://renalplan-synthetic.vercel.app');
  assert.equal(c.calendarSubscriptionsEnabled(),false);
});
test('missing preview opt-in or dedicated key fails closed',()=>{
  assert.throws(()=>config({...preview,NEXT_PUBLIC_RENALPLAN_DATED_TEST:'0'}).supabaseConfiguration());
  assert.throws(()=>config({...preview,NEXT_PUBLIC_RENALPLAN_CALENDAR_TEST_KEY:undefined}).supabaseConfiguration());
});
test('production cannot activate calendar even with stale preview flags',()=>{
  const c=config({...preview,VERCEL_ENV:'production'});
  assert.equal(c.datedPlannerEnabled(),false); assert.equal(c.calendarPreviewOrigin(),null); assert.equal(c.calendarSubscriptionsEnabled(),false);
});
test('deployment origin rejects untrusted values',()=>{
  for(const host of ['evil.example','renalplan.vercel.app/evil','renalplan.vercel.app:443','renalplan.vercel.app@evil.example'])
    assert.equal(config({...preview,VERCEL_URL:host}).calendarPreviewOrigin(),null);
});
test('synthetic browser session helper remains development only',()=>{
  assert.match(fs.readFileSync(new URL('../app/calendar-test/page.tsx',import.meta.url),'utf8'),/process.env.NODE_ENV !== "development"/);
});

test('feed alias is opt-in, preview-only and distinct from the protected application',()=>{
  const feed='https://renalplan-feed-synthetic.vercel.app';
  assert.equal(config({...preview,RENALPLAN_CALENDAR_PUBLIC_FEED_ORIGIN:feed}).calendarPublicFeedOrigin(),feed);
  for(const value of [undefined,'http://renalplan-feed.vercel.app','https://evil.example','https://renalplan-synthetic.vercel.app',feed+'/'])
    assert.equal(config({...preview,RENALPLAN_CALENDAR_PUBLIC_FEED_ORIGIN:value}).calendarPublicFeedOrigin(),null);
  assert.equal(config({...preview,VERCEL_ENV:'production',RENALPLAN_CALENDAR_PUBLIC_FEED_ORIGIN:feed}).calendarPublicFeedOrigin(),null);
});

test('hosted subscriptions require both the approved logging exception and feed-only alias',()=>{
  const accepted={...preview,RENALPLAN_CALENDAR_RESTRICTED_LOGS_ACCEPTED:'1',RENALPLAN_CALENDAR_PUBLIC_FEED_ORIGIN:'https://renalplan-feed-synthetic.vercel.app'};
  assert.equal(config(accepted).calendarSubscriptionsEnabled(),true);
  assert.equal(config({...accepted,RENALPLAN_CALENDAR_RESTRICTED_LOGS_ACCEPTED:'0'}).calendarSubscriptionsEnabled(),false);
  assert.equal(config({...accepted,RENALPLAN_CALENDAR_PUBLIC_FEED_ORIGIN:undefined}).calendarSubscriptionsEnabled(),false);
  assert.equal(config({...accepted,VERCEL_ENV:'production'}).calendarSubscriptionsEnabled(),false);
});
