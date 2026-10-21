import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const tick=()=>new Promise(resolve=>setImmediate(resolve));
test('an edit during shared account loading stays current and does not leave consumers permanently unready',async()=>{
 let state, effect, resolve, stored={foodAllergies:['Peanuts']};const events=new Map(),exports={};
 const pending=new Promise(done=>resolve=done);const client={auth:{getUser:async()=>({data:{user:{id:'owner'}}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})}};
 const jsx=(type,props)=>({type,props});
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('./MyDietProvider.tsx',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020}}).outputText,{
 exports,setTimeout,window:{addEventListener:(name,fn)=>events.set(name,fn),removeEventListener(){}},require:name=>{
  if(name==='react')return {createContext:()=>({Provider:'provider'}),useContext(){},useEffect:fn=>effect=fn,useState:initial=>{state??=initial;return [state,value=>state=typeof value==='function'?value(state):value];}};
  if(name==='react/jsx-runtime')return {jsx,jsxs:jsx};
  if(name==='@/lib/supabase/client')return {createClient:()=>client};
  if(name==='@/lib/myDiet')return {loadRequirements:()=>pending,readStoredRequirements:()=>stored,hasPendingRequirementsSave:()=>false};throw Error(name);
 }});
 exports.MyDietProvider({children:null});const cleanup=effect();await tick();events.get('meal-planner-requirements-updated')();assert.equal(state.ready,false);
 resolve({requirements:{foodAllergies:['Milk']},error:null});await tick();assert.equal(state.ready,true);assert.deepEqual(state.requirements.foodAllergies,['Peanuts']);cleanup();
});
