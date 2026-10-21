import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function fixture(save) {
 const states=[];let cursor=0;const saves=[];
 const jsx=(type,props)=>({type,props});
 const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('./MyAllergies.tsx',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020}}).outputText,{exports,require:name=>{
  if(name==='react')return {useState:initial=>{const i=cursor++;if(!(i in states))states[i]=initial;return [states[i],value=>states[i]=value];}};
  if(name==='react/jsx-runtime')return {jsx,jsxs:jsx};
  if(name==='@/lib/myDietOnboarding')return {parseFoodList:text=>[...new Set(text.split(/[,\n]/).map(s=>s.trim()).filter(Boolean))]};
  throw Error(name);
 }});
 let tree;const original={foodAllergies:['Milk'],proteinMaxG:70,monitoredNutrients:['protein']};
 const render=()=>{cursor=0;tree=exports.default({requirements:original,onSave:async next=>{saves.push(next);return save(next)}})};
 function nodes(n=tree){if(!n||typeof n!=='object')return [];if(Array.isArray(n))return n.flatMap(nodes);return [n,...nodes(n.props?.children??null)];}
 function text(n){if(n==null)return '';if(Array.isArray(n))return n.map(text).join('');return typeof n==='object'?text(n.props?.children):String(n);}
 const button=name=>nodes().find(n=>n.type==='button'&&text(n)===name);
 const click=async name=>{assert.ok(button(name));button(name).props.onClick();await tick();render();};
 render();return {render,nodes,button,click,saves,text:()=>text(tree)};
}
test('editing allergies submits the complete existing settings and closes only after confirmed success',async()=>{
 const h=fixture(async()=>true);await h.click('Edit Allergies');h.nodes().find(n=>n.type==='textarea').props.onChange({target:{value:'Peanuts, Milk'}});h.render();await h.click('Save allergies');
 assert.deepEqual([...h.saves[0].foodAllergies],['Peanuts','Milk']);assert.equal(h.saves[0].proteinMaxG,70);assert.deepEqual(h.saves[0].monitoredNutrients,['protein']);assert.ok(h.button('Edit Allergies'));
});
test('failed allergy editing retains text and stays open for retry without declaring a save',async()=>{
 const h=fixture(async()=>false);await h.click('Edit Allergies');h.nodes().find(n=>n.type==='textarea').props.onChange({target:{value:'Sesame'}});h.render();await h.click('Save allergies');
 assert.match(h.text(),/Not saved to your account/);assert.equal(h.nodes().find(n=>n.type==='textarea').props.value,'Sesame');assert.ok(h.button('Save allergies'));
});
