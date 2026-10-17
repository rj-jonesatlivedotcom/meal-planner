// Actual Auth -> Next route -> Calendar Test database -> ICS checks.
// No .env.local, privileged key, persisted session or printed private URL.
import fs from 'node:fs';
import { createServerClient } from '@supabase/ssr';
import { calendarTestConfiguration, calendarTestFetch } from './calendar-test-environment.mjs';

const { url, key } = calendarTestConfiguration(process.env);
const origin = 'http://127.0.0.1:4330';
const clients = [], checks = [], failures = [];
const requireCheck = (value, label) => { if (!value) throw new Error(label); };
const resultsPath = new URL('./calendar-subscription-api-results.json', import.meta.url);
const preferences = { timezone:'Europe/London', breakfastTime:'08:00', lunchTime:'13:00', dinnerTime:'18:00',
 mealEnabled:true, mealMinutes:15, preparationEnabled:true, preparationMinutes:30, shoppingEnabled:true, shoppingWeekday:6, shoppingTime:'10:00' };

async function check(label, run) {
 try { await run(); checks.push(label); console.log('PASS: ' + label); }
 catch { failures.push(label); throw new Error(label); }
}
async function identity() {
 const jar = new Map();
 const client = createServerClient(url,key,{ cookieOptions:{name:'renalplan-calendar-test-auth'},
  global:{fetch:calendarTestFetch}, cookies:{getAll:()=>[...jar].map(([name,value])=>({name,value})),setAll:values=>values.forEach(({name,value})=>{if(value)jar.set(name,value);else jar.delete(name);})} });
 const fixture={client,jar,id:null,subscription:null}; clients.push(fixture);
 const {data,error}=await client.auth.signInAnonymously({options:{data:{test_fixture:'calendar-subscription-activation'}}});
 requireCheck(!error && data.user && data.session,'Synthetic sign-in failed'); fixture.id=data.user.id;
 return fixture;
}
async function api(fixture,path,method='GET',body,owner=fixture?.id) {
 const target=new URL(path,origin); requireCheck(target.origin===origin,'Non-local API request rejected');
 return fetch(target,{method,redirect:'error',signal:AbortSignal.timeout(20000),
  headers:{Origin:origin,'Content-Type':'application/json',...(fixture?{Cookie:[...fixture.jar].map(([name,value])=>`${name}=${value}`).join('; '),'X-RenalPlan-Owner':owner}:{})},
  ...(body===undefined?{}:{body:JSON.stringify(body)})});
}
async function json(fixture,path,method,body,status=200,owner) {
 const response=await api(fixture,path,method,body,owner);
 if(response.status!==status) console.error(`Unexpected ${method ?? 'GET'} ${path} status ${response.status}; expected ${status}`);
 requireCheck(response.status===status,'Unexpected API response status'); return response.json();
}
async function feed(link,status=200) {
 const target=new URL(link); requireCheck(target.origin===origin && /^\/api\/calendar\/feed\/[\w-]{43}$/.test(target.pathname),'Unexpected private URL target');
 const response=await api(null,target.pathname); requireCheck(response.status===status,'Unexpected feed status');
 const text=await response.text(); if(status!==200)requireCheck(!text.includes('VEVENT'),'Rejected link exposed a calendar');
 return text.replace(/\r\n /g,'');
}
const events = text => text.split('BEGIN:VEVENT\r\n').slice(1).map(value=>value.split('END:VEVENT')[0]);
const event = (text,date,slot) => events(text).find(value=>value.includes(`-${date}-${slot}@calendar.renalplan`));
const uid = text => text.match(/^UID:(.*)$/m)?.[1];
async function save(fixture,week,revision,planner) {
 const response=await fixture.client.rpc('rp_save_week',{p_week_start:week,p_expected_revision:revision,p_planner:planner,
  p_meal_people:{Monday:{Breakfast:1}},p_household_people:3,p_shopping_state:{checkedItems:['Synthetic private shopping item'],legacy:{}}});
 requireCheck(!response.error,'Weekly fixture save failed'); return response.data;
}
let a,b,initial,latest,link,firstFeed;
try {
 a=await identity(); b=await identity();
 await check('actual SSR auth cookies authenticate settings requests',async()=>{
  requireCheck(a.jar.size>0 && b.jar.size>0,'SSR cookies not written');
  initial=await json(a,'/api/calendar/settings'); requireCheck(initial.revision===null,'New account preferences not empty');
 });
 await check('authenticated calendar preferences save approved defaults',async()=>{
  latest=await json(a,'/api/calendar/settings','PUT',{revision:null,preferences}); requireCheck(latest.revision===1,'Preferences revision');
 });
 await check('save distinct meals in London autumn and spring clock-change weeks',async()=>{
  await save(a,'2026-10-19',null,{Monday:{Breakfast:'apple-honey-porridge'},Sunday:{Dinner:'scrambled-egg-tomato-toast'}});
  await save(a,'2026-03-23',null,{Monday:{Breakfast:'apple-honey-porridge'},Sunday:{Breakfast:'apple-honey-porridge'}});
 });
 await check('authenticated subscription creation returns a private link',async()=>{
  a.subscription=await json(a,'/api/calendar/subscription','POST',{generation:0}); link=a.subscription.url;
  requireCheck(a.subscription.active && a.subscription.generation===1 && typeof link==='string','Subscription creation');
 });
 await check('valid unauthenticated subscription URL retrieves all saved weeks as ICS',async()=>{
  firstFeed=await feed(link); requireCheck(firstFeed.startsWith('BEGIN:VCALENDAR\r\n'),'Missing calendar header');
  requireCheck(events(firstFeed).length===44,'Expected both saved weeks and cancellation slots');
  requireCheck(event(firstFeed,'2026-10-19','breakfast')?.includes('SUMMARY:Apple & Honey Porridge'),'Correct recipe title');
  requireCheck(!firstFeed.includes('Synthetic private shopping item') && !firstFeed.includes(a.id),'Private fields leaked');
 });
 await check('London DST times are correct across both March and October changes',async()=>{
  for(const [date,slot,time] of [['2026-03-23','breakfast','20260323T080000Z'],['2026-03-29','breakfast','20260329T070000Z'],
   ['2026-10-19','breakfast','20261019T070000Z'],['2026-10-25','dinner','20261025T180000Z']])
   requireCheck(event(firstFeed,date,slot)?.includes('DTSTART:'+time),'Incorrect London event time');
 });
 await check('approved meal, preparation and preceding-Saturday shopping reminders appear',async()=>{
  const meal=event(firstFeed,'2026-10-19','breakfast'),shopping=events(firstFeed).find(e=>e.includes('-2026-10-19-shopping@'));
  requireCheck(meal.includes('TRIGGER:-PT15M') && meal.includes('TRIGGER:-PT30M'),'Meal/preparation reminders');
  requireCheck(shopping.includes('DTSTART:20261017T090000Z'),'Shopping reminder timing');
 });
 await check('account B cannot read A plans, preferences or subscription status',async()=>{
  const plans=await b.client.from('user_weekly_meal_plans').select('week_start').eq('user_id',a.id);
  const settings=await b.client.from('user_calendar_settings').select('revision').eq('user_id',a.id);
  requireCheck(!plans.error && plans.data.length===0 && !settings.error && settings.data.length===0,'RLS owner isolation');
  const status=await json(b,'/api/calendar/subscription'); requireCheck(!status.active && status.generation===0,'Cross-account subscription status');
  await json(b,'/api/calendar/settings','GET',undefined,409,a.id);
 });
 await check('direct client plan writes remain denied',async()=>{
  const response=await a.client.from('user_weekly_meal_plans').update({household_people:8}).eq('user_id',a.id);
  requireCheck(response.error?.code==='42501','Direct write unexpectedly allowed');
 });
 await check('stale plan save returns PT409 and explicitly reviewed retry preserves newest data',async()=>{
  await save(a,'2026-10-19',1,{Monday:{Breakfast:'scrambled-egg-tomato-toast'},Sunday:{Dinner:'scrambled-egg-tomato-toast'}});
  const stale=await a.client.rpc('rp_save_week',{p_week_start:'2026-10-19',p_expected_revision:1,p_planner:{},p_meal_people:{},p_household_people:1,p_shopping_state:{checkedItems:[],legacy:{}}});
  requireCheck(stale.error?.code==='PT409','Stale write not rejected');
  const fresh=await a.client.from('user_weekly_meal_plans').select('*').eq('week_start','2026-10-19').single();
  requireCheck(fresh.data.revision===2 && fresh.data.planner.Monday.Breakfast==='scrambled-egg-tomato-toast','Stale write changed saved plan');
  const retry=await save(a,'2026-10-19',fresh.data.revision,fresh.data.planner); requireCheck(retry.revision===3,'Reviewed retry failed');
 });
 await check('meal changes update feed titles while preserving date-slot UIDs',async()=>{
  const changed=await feed(link),before=event(firstFeed,'2026-10-19','breakfast'),after=event(changed,'2026-10-19','breakfast');
  requireCheck(uid(before)===uid(after) && after.includes('SUMMARY:Scrambled Egg & Tomato Toast'),'Stable changed event');
  requireCheck(after.includes('SEQUENCE:4'),'Feed sequence did not reflect plan/settings revisions');
 });
 await check('configurable meal time and disabled optional reminders update the same event',async()=>{
  latest=await json(a,'/api/calendar/settings','PUT',{revision:1,preferences:{...preferences,breakfastTime:'08:30',preparationEnabled:false,shoppingEnabled:false}});
  const changed=await feed(link),meal=event(changed,'2026-10-19','breakfast'),shopping=events(changed).find(e=>e.includes('-2026-10-19-shopping@'));
  requireCheck(meal.includes('DTSTART:20261019T073000Z') && !meal.includes('TRIGGER:-PT30M') && meal.includes('TRIGGER:-PT15M'),'Changed time/reminders');
  requireCheck(shopping.includes('STATUS:CANCELLED'),'Disabled shopping reminder not cancelled');
 });
 await check('stale preferences produce HTTP409 and saved preferences remain recoverable',async()=>{
  await json(a,'/api/calendar/settings','PUT',{revision:1,preferences},409);
  const saved=await json(a,'/api/calendar/settings'); requireCheck(saved.revision===2 && saved.preferences.breakfastTime==='08:30','Conflict replaced preferences');
 });
 await check('Clear Week publishes cancelled meal events with unchanged identifiers',async()=>{
  await save(a,'2026-10-19',3,{});
  const changed=await feed(link),meal=event(changed,'2026-10-19','breakfast');
  requireCheck(meal.includes('STATUS:CANCELLED') && uid(meal)===uid(event(firstFeed,'2026-10-19','breakfast')),'Cancellation identity');
 });
 await check('token regeneration invalidates old URL and preserves event identities',async()=>{
  const old=link; a.subscription=await json(a,'/api/calendar/subscription','POST',{generation:1}); link=a.subscription.url;
  await feed(old,404); const changed=await feed(link);
  requireCheck(uid(event(changed,'2026-03-23','breakfast'))===uid(event(firstFeed,'2026-03-23','breakfast')),'Rotation changed event UID');
 });
 await check('stale concurrent subscription change is rejected with HTTP409',async()=>{
  await json(a,'/api/calendar/subscription','POST',{generation:1},409);
  requireCheck((await feed(link)).includes('VEVENT'),'Stale rotation invalidated current link');
 });
 await check('revocation removes private calendar access immediately',async()=>{
  a.subscription=await json(a,'/api/calendar/subscription','DELETE',{generation:2});
  requireCheck(a.subscription.active===false && a.subscription.generation===3,'Revocation status');
  await feed(link,404);
 });
 await check('invalid and unknown links return empty404 without private calendar data',async()=>{
  for(const path of ['/api/calendar/feed/invalid','/api/calendar/feed/'+ 'A'.repeat(43)]){
   const response=await api(null,path);requireCheck(response.status===404 && (await response.text())==='','Invalid link response');
  }
 });
 await check('sign-out removes authenticated management access',async()=>{
  const result=await a.client.auth.signOut();requireCheck(!result.error,'Sign-out failed');
  const response=await api(a,'/api/calendar/settings');requireCheck(response.status===401,'Signed-out access allowed');
 });
} catch {
 console.error('FAILED: ' + (failures.at(-1) ?? 'synthetic identity setup'));
 process.exitCode=1;
} finally {
 let cleanup=true;
 for(const fixture of clients){
  try {
   const user=await fixture.client.auth.getUser();
   if(user.data.user){
    const status=await json(fixture,'/api/calendar/subscription');
    if(status.active)await json(fixture,'/api/calendar/subscription','DELETE',{generation:status.generation});
    const signedOut=await fixture.client.auth.signOut();if(signedOut.error)cleanup=false;
   }
  }catch{cleanup=false;}
 }
 fs.writeFileSync(resultsPath,JSON.stringify({project:'RenalPlan Calendar Test',projectRef:'pyevnakjpgwvylqmpqat',checksPassed:checks.length,checks,failures,
  syntheticUserIds:clients.map(f=>f.id).filter(Boolean),subscriptionsRevokedAndSessionsSignedOut:cleanup},null,2)+'\n');
 console.log('Safe result register written; private URLs and session credentials were not persisted.');
 if(!cleanup)process.exitCode=1;
}
