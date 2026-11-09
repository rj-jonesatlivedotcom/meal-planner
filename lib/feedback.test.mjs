import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
import { createHash, randomUUID } from "node:crypto";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url), root = new URL("../", import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), "utf8");
const compile = text => ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
const shared = { exports: {} };
vm.runInNewContext(compile(read("lib/feedback.ts")), { exports: shared.exports });
const { validateFeedback, feedbackThanks } = shared.exports;
const input = { category: "Suggestion", message: "Synthetic feedback verification", rating: 4, email: "feedback-test@example.com", website: "" };

function harness(options = {}) {
  const calls = { rpc: [], notifications: [], statuses: [], logs: [], cookies: [] };
  const env = { NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "server-secret", RESEND_API_KEY: "email-secret", RESEND_FROM_EMAIL: "RenalPlan <hello@renalplan.com>", NODE_ENV: "production", ...options.env };
  const admin = { rpc: async (name,args) => { calls.rpc.push({name,args}); return options.storage ?? {data:"synthetic-id",error:null}; },
    from: name => ({update: data => ({eq: async (key,id) => { calls.statuses.push({name,data,key,id}); if(options.statusThrows) throw Error("private provider details"); return {error:options.statusError ?? null}; }})}) };
  const store = { get: () => options.noCookie ? undefined : { value:"23d479db-6783-4669-bfd4-05c92ef6668b" }, set: (...args) => calls.cookies.push(args) };
  const exports = {};
  vm.runInNewContext(compile(read("app/api/feedback/route.ts")), { exports, Response, Request, URL, Buffer, AbortSignal,
    process:{env}, console:{error:(...args)=>calls.logs.push(args)},
    fetch:async (url,init) => { calls.notifications.push({url,init,body:JSON.parse(init.body)}); if(options.mailThrows) throw Error("secret provider response"); return options.mailResponse ?? Response.json({id:"synthetic-mail-id"}); },
    require:name => {
      if(name==="node:crypto") return {createHash,randomUUID};
      if(name==="next/headers") return {cookies:async()=>store};
      if(name==="@supabase/supabase-js") return {createClient:(_url,key,config)=>{assert.equal(key,env.SUPABASE_SERVICE_ROLE_KEY);assert.equal(config.auth.persistSession,false);return admin;}};
      if(name==="@/lib/supabase/server") return {createClient:async()=>({auth:{getUser:async()=>options.auth ?? {data:{user:null},error:{name:"AuthSessionMissingError"}}}})};
      if(name==="@/lib/feedback") return shared.exports;
      throw Error("Unexpected dependency: "+name);
    },
  });
  const post = (body=input, init={}) => exports.POST(new Request("https://www.renalplan.com/api/feedback", {
    method:"POST",headers:{origin:"https://www.renalplan.com","Content-Type":"application/json",...init.headers},body:typeof body==="string"?body:JSON.stringify(body),
  }));
  return {...exports,calls,post};
}

test("guest submission stores validated fields and sends through Resend to the existing mailbox",async()=>{
  const h=harness(),r=await h.post(); assert.equal(r.status,200); assert.equal((await r.json()).message,feedbackThanks);
  const saved=h.calls.rpc[0];assert.equal(saved.name,"submit_feedback");assert.equal(saved.args.p_user_id,null);assert.equal(saved.args.p_email,input.email);
  assert.match(saved.args.p_rate_key,/^[a-f0-9]{64}$/);assert.doesNotMatch(JSON.stringify(saved),/\bip\b|23d479db/);
  const mail=h.calls.notifications[0];assert.equal(mail.url,"https://api.resend.com/emails");assert.equal(mail.body.to[0],"hello@renalplan.com");assert.equal(mail.body.from,"RenalPlan <hello@renalplan.com>");assert.equal(mail.body.reply_to,input.email);
  assert.equal(mail.init.headers["Idempotency-Key"],"feedback/synthetic-id");assert.equal(h.calls.statuses[0].data.notification_status,"sent");
});
test("authenticated submission uses only the server-verified account identity",async()=>{
  const h=harness({auth:{data:{user:{id:"verified-account"}},error:null}});assert.equal((await h.post()).status,200);
  assert.equal(h.calls.rpc[0].args.p_user_id,"verified-account");assert.equal(h.calls.rpc[0].args.p_email,null);
  assert.equal(h.calls.notifications[0].body.reply_to,undefined);
  assert.equal((await h.post({...input,user_id:"forged-account"})).status,400);assert.equal(h.calls.rpc.length,1);
});
test("invalid fields, malformed bodies and oversized input are rejected before storage",async()=>{
  for(const body of [{...input,category:"Other"},{...input,message:"  "},{...input,message:"x".repeat(5001)},{...input,rating:0},{...input,rating:5.5},{...input,rating:"4"},{...input,email:"not-email"},{...input,email:"a@b.com\r\nBcc: private"},{...input,website:4},"{",[],null]) {
    const h=harness();assert.equal((await h.post(body)).status,400);assert.equal(h.calls.rpc.length,0);
  }
  assert.equal((await harness().post("x".repeat(24001))).status,413);
  assert.ok(validateFeedback({category:"General Feedback",message:"hello"}));
});
test("same-origin JSON checks, honeypot and missing guest cookie prevent unwanted writes",async()=>{
  for(const headers of [{origin:"https://attacker.example"},{"sec-fetch-site":"cross-site"}]) {const h=harness();assert.equal((await h.post(input,{headers})).status,403);assert.equal(h.calls.rpc.length,0);}
  assert.equal((await harness().post(input,{headers:{"Content-Type":"text/plain"}})).status,415);
  const bot=harness();assert.equal((await bot.post({...input,website:"spam"})).status,200);assert.equal(bot.calls.rpc.length,0);assert.equal(bot.calls.notifications.length,0);
  assert.equal((await harness({noCookie:true}).post()).status,400);
});
test("durable database rate limits return 429 without sending a notification",async()=>{
  const h=harness({storage:{data:null,error:{code:"P0001"}}});const r=await h.post();assert.equal(r.status,429);assert.equal(r.headers.get("Retry-After"),"900");assert.equal(h.calls.notifications.length,0);
});
test("storage/auth failures remain generic and never leak feedback, email, keys or provider errors",async()=>{
  for(const options of [{storage:{data:null,error:{message:"private database error"}}},{auth:{data:{user:null},error:{name:"NetworkError"}}},{env:{RESEND_API_KEY:""}}]) {
    const h=harness(options),r=await h.post();assert.equal(r.status,503);const output=JSON.stringify(h.calls.logs)+await r.text();
    for(const sensitive of [input.message,input.email,"server-secret","email-secret","private database error"]) assert.ok(!output.includes(sensitive));
    assert.equal(h.calls.notifications.length,0);
  }
});
test("notification failures after storage retain success and record a private failure status",async()=>{
  for(const options of [{mailResponse:Response.json({error:"private email details"},{status:500})},{mailThrows:true},{statusThrows:true}]) {
    const h=harness(options),r=await h.post();assert.equal(r.status,200);assert.equal((await r.json()).message,feedbackThanks);assert.equal(h.calls.rpc.length,1);
    if(!options.statusThrows) assert.equal(h.calls.statuses[0].data.notification_status,"failed");
    assert.doesNotMatch(JSON.stringify(h.calls.logs),/Synthetic feedback|feedback-test@|private email|secret provider/);
  }
});
test("bootstrap sets a short-lived HTTP-only feedback cookie and returns no personal information",async()=>{
  const h=harness({noCookie:true}),r=await h.GET();assert.deepEqual(await r.json(),{signedIn:false});assert.equal(r.headers.get("Cache-Control"),"no-store");
  const [name,value,options]=h.calls.cookies[0];assert.equal(name,"renalplan-feedback-visitor");assert.match(value,/^[a-f0-9-]{36}$/);assert.equal(options.httpOnly,true);assert.equal(options.secure,true);assert.equal(options.sameSite,"strict");assert.equal(options.maxAge,86400);
});
test("migration denies public table reads/writes and RPC access, with atomic privacy-preserving limits",()=>{
  const sql=read("supabase/migrations/20261109123456_feedback_submissions.sql");
  for(const table of ["feedback_submissions","feedback_rate_limits"]) {
    assert.ok(sql.includes(`alter table public.${table} enable row level security`));
    assert.ok(sql.includes(`revoke all on table public.${table} from public, anon, authenticated`));
  }
  assert.match(sql,/security invoker set search_path = ''/);assert.match(sql,/pg_advisory_xact_lock/);assert.match(sql,/\(60, 10\), \(3600, 60\), \(900, 3\)/);
  assert.match(sql,/revoke all on function public.submit_feedback[^;]+from public, anon, authenticated/);
});
test("both home footers have one matching Feedback link and Account places it before Delete Account",()=>{
  const home=ts.createSourceFile("home.tsx",read("app/page.tsx"),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);let footers=0;
  function visit(node){if(ts.isJsxElement(node)&&node.openingElement.tagName.getText(home)==="footer") {footers++;assert.equal((node.getText(home).match(/href="\/feedback"/g)||[]).length,1);}ts.forEachChild(node,visit);}visit(home);assert.equal(footers,2);
  const account=read("app/account/page.tsx");assert.ok(account.indexOf('href="/feedback"')<account.indexOf('{/* DELETE ACCOUNT */}'));
});
test("Chinese discovery lives inside both cuisine controls and its SEO landing page remains",()=>{
  const source=read("app/recipes/page.tsx");assert.doesNotMatch(source,/Explore kidney-friendly Chinese recipes/);
  assert.equal((source.match(/htmlFor="recipe-cuisine-/g)||[]).length,2);assert.equal((source.match(/href="\/kidney-friendly-chinese-recipes"/g)||[]).length,2);
  assert.ok(source.indexOf('href="/kidney-friendly-chinese-recipes"')>source.indexOf('{showFilters && ('));
  assert.match(read("app/kidney-friendly-chinese-recipes/page.tsx"),/alternates: \{ canonical: url \}/);
});
test("feedback form reuses responsive surfaces, native accessible fields and theme styles",()=>{
  const React=require("react"),exports={};const hooks={...React,useEffect(){},useRef:()=>({current:null})};
  vm.runInNewContext(compile(read("app/feedback/FeedbackForm.tsx")),{exports,require:name=>name==="react"?hooks:name==="@/lib/feedback"?shared.exports:require(name)});
  // Render hooks through React; effect is suppressed to keep this a pure initial view.
  const html=renderToStaticMarkup(React.createElement(exports.default));
  assert.match(html,/aria-busy="false"/);assert.match(html,/rows="5"/);assert.match(html,/maxLength="5000"/i);assert.equal((html.match(/type="radio"/g)||[]).length,5);
  assert.match(html,/aria-hidden="true"/);assert.match(html,/tabIndex="-1"/i);assert.match(html,/dark:bg-slate-800 dark:text-slate-100/);assert.match(html,/w-full.*sm:w-auto/);
  assert.match(html,/style="color:#fff"/); // Preserve contrast against the unlayered global button colour reset.
});
