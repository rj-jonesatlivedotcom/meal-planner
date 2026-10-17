import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { randomUUID } from 'node:crypto';
export function fixture(enabled=true) {
 const modules=new Map(),values=new Map(),events=[];
 const storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k),get length(){return values.size;},key:i=>[...values.keys()][i]??null};
 const env={NODE_ENV:'development',NEXT_PUBLIC_RENALPLAN_DATED_TEST:enabled?'1':'0'};
 function load(name){if(name==='react')return {useState:fn=>[fn()]};if(modules.has(name))return modules.get(name);const exports={};modules.set(name,exports);vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL(name+'.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports,require:load,process:{env},localStorage:storage,window:{dispatchEvent:e=>events.push(e)},Event:class{constructor(type){this.type=type;}},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail;}},crypto:{randomUUID},Intl,Date,Map,Set});return exports;}
 return {load,storage,values,events,env};
}
export const week='2026-10-19',next='2026-10-26',owner={kind:'guest',id:'test-device'};
export async function setup(){const f=fixture(),{createWeeklyPlanContext}=f.load('./weeklyPlanContext'),{createWeeklyPlanStore}=f.load('./weeklyPlanStore');const context=createWeeklyPlanContext(week,{request:async(_key,fn)=>fn()});await context.setOwner(owner,createWeeklyPlanStore({owner,storage:f.storage}));const bridge=f.load('./weeklyPageStorage');bridge.attachWeeklyPages(context);return {...f,context,bridge};}
