import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source=fs.readFileSync(new URL('./useFoodAccount.ts',import.meta.url),'utf8');
const compile=s=>ts.transpileModule(s,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
function harness(authResult,readError=false){let cursor=0;const states=[],reads=[];const client={auth:{getUser:async()=>authResult}};const hooks={useState(value){const i=cursor++;if(!(i in states))states[i]=value;return [states[i],v=>states[i]=v];},useRef:value=>hooks.useState({current:value})[0],useMemo:f=>f(),useCallback:f=>f,useEffect(){}};const exports={};vm.runInNewContext(compile(source),{exports,require:name=>name==='react'?hooks:name==='./supabase/client'?{createClient:()=>client}:{foodAccount:(_,owner)=>({snacks:async()=>{reads.push(owner);if(readError)throw Error('read failed');return [];},foods:async()=>{reads.push(owner);if(readError)throw Error('read failed');return [];}})}});return {reads,render(){cursor=0;return exports.useFoodAccount('2026-10-19','2026-10-25');}};}
test('expected missing session is an empty guest state, not an error or database read',async()=>{
 for(const error of [null,{name:'AuthSessionMissingError'}]){const h=harness({data:{user:null},error});await h.render().refresh();const result=h.render();assert.equal(result.owner,null);assert.equal(result.error,'');assert.equal(result.loading,false);assert.equal(result.snacks.length,0);assert.equal(result.repository,null);assert.equal(h.reads.length,0);}
});
test('authenticated database failures and real authentication errors still report unavailable foods',async()=>{
 for(const [response,readError] of [[{data:{user:{id:'test-owner'}},error:null},true],[{data:{user:null},error:{name:'AuthRetryableFetchError'}},false]]){const h=harness(response,readError);await h.render().refresh();assert.match(h.render().error,/Saved foods or snacks are unavailable/);assert.equal(h.render().loading,false);}
});
test('authenticated successful reads still load through the owner-scoped repository',async()=>{const h=harness({data:{user:{id:'test-owner'}},error:null});await h.render().refresh();assert.deepEqual(h.reads,['test-owner']);assert.equal(h.render().owner,'test-owner');assert.equal(h.render().error,'');});
test('display-only product cleanup preserves casing, punctuation and original input',()=>{const exports={};vm.runInNewContext(compile(fs.readFileSync(new URL('./foodDisplay.ts',import.meta.url),'utf8')),{exports});const original='  ACME\n  B12 & iPhone-brand 500g  ';assert.equal(exports.displayFoodName(original),'ACME B12 & iPhone-brand 500g');assert.equal(original,'  ACME\n  B12 & iPhone-brand 500g  ');});
