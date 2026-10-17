import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function policy(origin='https://renalplan-feed-synthetic.vercel.app') {
  const exports={};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('./calendarFeedHost.ts',import.meta.url),'utf8'),
    {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,
    {exports,URL,require:()=>({calendarPublicFeedOrigin:()=>origin})});
  return exports.calendarFeedHostPolicy;
}
const feedHost='https://renalplan-feed-synthetic.vercel.app';
const path='/api/calendar/feed/'+'a'.repeat(43);
test('public feed hostname accepts GET and HEAD only for an exact feed URL',()=>{
  for(const method of ['GET','HEAD']) assert.equal(policy()(new Request(feedHost+path,{method})),'feed');
  for(const method of ['POST','PUT','DELETE','OPTIONS']) assert.equal(policy()(new Request(feedHost+path,{method})),'reject');
});
test('public feed hostname rejects application, account and management routes',()=>{
  for(const pathname of ['/','/planner','/account','/auth/login','/calendar-test','/api/calendar/settings','/api/calendar/subscription',path+'/extra',path+'?trace=1','/api/calendar/feed/invalid'])
    assert.equal(policy()(new Request(feedHost+pathname)),'reject');
});
test('feed hostname cannot be selected by spoofing forwarded headers',()=>{
  assert.equal(policy()(new Request('https://evil.example'+path,{headers:{'x-forwarded-host':new URL(feedHost).host}})),null);
});
test('protected application hostname retains normal auth handling',()=>{
  assert.equal(policy()(new Request('https://renalplan-app-synthetic.vercel.app/planner')),null);
  assert.equal(policy(null)(new Request(feedHost+path)),null);
});
