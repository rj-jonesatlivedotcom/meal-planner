import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import test from 'node:test';
import assert from 'node:assert/strict';
const read=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('retired empty-week popup stays off in both dated and legacy modes',()=>{
 const source=ts.createSourceFile('planner.tsx',read('app/planner/page.tsx'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 let expression;function visit(node){if(ts.isVariableDeclaration(node)&&node.name.getText(source)==='showEmptyPlannerPrompt')expression=node.initializer.getText(source);ts.forEachChild(node,visit);}visit(source);
 assert(expression);for(const dated of [true,false])for(const empty of [true,false])for(const dismissed of [true,false]) {
  const value=vm.runInNewContext(expression,{datedPlannerEnabled:()=>dated,plannerIsCompletelyEmpty:empty,selectedDayIsEmpty:false,emptyPlannerPromptDismissed:dismissed});
  assert.equal(value,false);
 }
});
function toolbar(weekStart){
 const exports={},jsx=(type,props)=>({type,props});
 vm.runInNewContext(ts.transpileModule(read('components/calendar/CalendarToolbar.tsx'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,
  {exports,require:name=>name==='react'?{useState:()=>[null,()=>{}]}:name==='react/jsx-runtime'?{jsx,jsxs:jsx}:name==='@/lib/weeklyPlans'?{currentMonday:()=> '2026-10-12'}:name==='@/lib/calendar'?{formatWeek:v=>v}:{}});
 return exports.default({plan:{weekStart},shift(){},thisWeek(){},readPlan(){}});
}
function find(node,predicate,result=[]){if(!node||typeof node!=='object')return result;if(Array.isArray(node))node.forEach(n=>find(n,predicate,result));else{if(predicate(node))result.push(node);find(node.props?.children,predicate,result);}return result;}
test('This week navigation is absent on the current week and present on other weeks',()=>{
 const matches=tree=>find(tree,node=>node.type==='button'&&node.props.children==='This week');
 assert.equal(matches(toolbar('2026-10-12')).length,0);assert.equal(matches(toolbar('2026-10-19')).length,1);
});
test('existing carbohydrate controls occupy the sixth nutrient grid position without duplication',()=>{
 const text=read('app/requirements/page.tsx'),source=ts.createSourceFile('requirements.tsx',text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);let grid;
 function visit(node){if(ts.isJsxElement(node)&&node.openingElement.attributes.getText(source).includes('grid gap-4 md:grid-cols-2'))grid=node;ts.forEachChild(node,visit);}visit(source);
 assert(grid);const cards=grid.children.filter(ts.isJsxElement);assert.equal(cards.length,6);
 assert(cards[4].getText(source).includes('toggleAdvice("fluid")'));assert(cards[5].getText(source).includes('toggleAdvice("carbohydrate")'));
 assert.equal((text.match(/value=\{requirements.carbohydrateMin/g)||[]).length,1);
 assert.equal((text.match(/value=\{requirements.carbohydrateMax/g)||[]).length,1);
 assert.equal((text.match(/>Daily carbohydrate<\/span>/g)||[]).length,1);
});
