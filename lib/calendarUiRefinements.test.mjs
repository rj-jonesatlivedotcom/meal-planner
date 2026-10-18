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

test('week label reserves fixed space and optional calendar action uses patient-facing wording',()=>{
 for(const week of ['2026-10-12','2026-12-28']) {
  const tree=toolbar(week),label=find(tree,n=>n.type==='span'&&n.props['aria-live']==='polite')[0];
  assert.equal(label.props.className,'planner-week-label');
  assert.match(read('components/calendar/CalendarToolbar.tsx'), /width: 224px; min-height: 40px/);
  assert.equal(find(tree,n=>n.type==='button'&&n.props.children==='Add to calendar').length,1);
 }
 assert(!read('components/calendar/CalendarToolbar.tsx').includes('Connect calendar'));
});

function calendarPanel(provider=null,guest=false){
 const exports={},jsx=(type,props)=>({type,props});let state=0;
 const overrides={5:{active:true,generation:1},7:true,10:provider};
 vm.runInNewContext(ts.transpileModule(read('components/calendar/CalendarToolbar.tsx')+'\nexport {CalendarPanel};',{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,
  {exports,require:name=>name==='react'?{useState:value=>[Object.hasOwn(overrides,state)?overrides[state++ ]:(state++,value),()=>{}],useRef:()=>({current:null}),useEffect:()=>{}}:name==='react/jsx-runtime'?{jsx,jsxs:jsx}:name==='@/lib/calendar'?{calendarDefaults:{},formatWeek:v=>v}:name==='@/lib/supabase/config'?{liveCalendarEnabled:()=>false}:{}});
 return exports.CalendarPanel({plan:{owner:{kind:guest?'guest':'account',id:'synthetic'},weekStart:'2026-10-19'},readPlan(){},initialPanel:'connect',onClose(){}});
}
test('provider cards preserve logo proportions, and instructions appear only after choosing',()=>{
 const initial=calendarPanel();
 assert.equal(find(initial,n=>n.type==='img').length,3);
 for(const logo of find(initial,n=>n.type==='img')){assert(logo.props.className.includes('object-contain'));assert.equal(logo.props.alt,'');assert(logo.props.src.startsWith('/calendar-brands/'));}
 assert.equal(find(initial,n=>n.type==='section').length,0);
 for(const name of ['Google','Outlook','Apple']){
  const tree=calendarPanel(name);
  assert.equal(find(tree,n=>n.type==='section'&&n.props['aria-label']===name+' Calendar setup').length,1);
  assert.equal(find(tree,n=>n.type==='button'&&n.props.children==='Revoke link').length,1);
 }
 const details=find(initial,n=>n.type==='details')[0];assert(details);assert(!details.props.open);
 assert.equal(find(initial,n=>n.type==='button'&&n.props.children==='Download this week (.ics)').length,1);
 assert.equal(find(initial,n=>n.type==='button'&&n.props.children==='Meal times').length,1);
 assert.equal(find(calendarPanel('Google',true),n=>n.type==='button'&&n.props.children==='Revoke link').length,0);
});

test('provider artwork is bundled locally as small image files',()=>{
 for(const file of ['google.png','outlook.svg','apple.png']){
  const bytes=fs.readFileSync(new URL('../public/calendar-brands/'+file,import.meta.url));
  assert(bytes.length>0&&bytes.length<200000);
  if(file.endsWith('.png')) assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  else assert(bytes.toString().includes('<svg'));
 }
});
