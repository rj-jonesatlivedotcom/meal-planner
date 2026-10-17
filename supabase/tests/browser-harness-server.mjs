import http from 'node:http';
import fs from 'node:fs';
import ts from 'typescript';
import { calendarTestConfiguration, calendarTestFetch } from './calendar-test-environment.mjs';
const {url,key}=calendarTestConfiguration(process.env);
const health=await calendarTestFetch(url+'/auth/v1/settings',{headers:{apikey:key}});
if(!health.ok)throw Error('Calendar Test credentials failed verification; server not started');
const allowed=new Set(['weeklyPlans','weeklyPlanStore','weeklyPlanAccount','weeklyPlanContext','weeklyPlanMigration']);
const csp=`default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; connect-src 'self' ${url}; base-uri 'none'; frame-ancestors 'none'`;
const server=http.createServer((req,res)=>{
  res.setHeader('Content-Security-Policy',csp);res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  if(req.headers.host!=='127.0.0.1:4319'){res.writeHead(403);return res.end();}
  const path=new URL(req.url,'http://127.0.0.1:4319').pathname;
  if(path==='/'){res.setHeader('Content-Type','text/html');return res.end(`<!doctype html><meta charset="utf-8"><title>Calendar Test isolated harness</title><h1>Calendar Test — isolated harness</h1><p>Origin 127.0.0.1:4319. No production connection, cookies or app storage.</p><button id="local">Run browser safeguards</button><button id="hold">Hold cross-tab lock</button><button id="release">Release lock</button><button id="compete">Request competing lock</button><button id="identity">Create synthetic Calendar Test identities</button><button id="migration">Run real migration checks</button><button id="logout">Sign out test sessions</button><pre id="results" role="status">Ready</pre><script type="module" src="/harness.js"></script>`);}
  if(path==='/config'){res.setHeader('Content-Type','application/json');return res.end(JSON.stringify({url,key}));}
  if(path==='/harness.js'){res.setHeader('Content-Type','text/javascript');return res.end(fs.readFileSync(new URL('./browser-harness.js',import.meta.url),'utf8'));}
  const name=path.match(/^\/lib\/(\w+)\.js$/)?.[1];
  if(name&&allowed.has(name)){res.setHeader('Content-Type','text/javascript');const source=fs.readFileSync(new URL('../../lib/'+name+'.ts',import.meta.url),'utf8');return res.end(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ES2020,target:ts.ScriptTarget.ES2020}}).outputText.replace(/from "\.\/(\w+)"/g,'from "/lib/$1.js"'));}
  res.writeHead(404);res.end();
});
server.listen(4319,'127.0.0.1',()=>console.log('Isolated Calendar Test harness ready at http://127.0.0.1:4319'));
