import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const plain = value => JSON.parse(JSON.stringify(value));
const tick = () => new Promise(resolve => setImmediate(resolve));
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done; }); return { promise, resolve }; };

// Exercise the component's real event handlers with deterministic hook state, without a browser or account writes.
function harness(initial = {}, save, initialStep) {
  const states = [], saves = [], drafts = [], modules = new Map(); let cursor = 0, exits = 0;
  const hooks = {
    useState(initialValue) { const index = cursor++; if (!(index in states)) states[index] = typeof initialValue === 'function' ? initialValue() : initialValue;
      return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }]; },
    useRef(value) { return hooks.useState(() => ({ current: value }))[0]; }, useEffect() {}, useId: () => 'guide',
  };
  const jsx = (type, props) => ({ type, props });
  function load(path) {
    if (modules.has(path)) return modules.get(path);
    const exports = {}; modules.set(path, exports);
    const filename = new URL(path, import.meta.url);
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    } }).outputText;
    const require = name => {
      if (name === 'react') return hooks;
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' };
      if (name === 'next/image' || name === 'next/link') return { __esModule: true, default: name === 'next/image' ? 'img' : 'a' };
      if (name === './MyDietOnboarding.module.css') return { __esModule: true, default: { layout: 'onboarding-layout', mascot: 'onboarding-mascot' } };
      if (name === '@/lib/myDiet') return load('../../lib/myDiet.ts');
      if (name === './myDiet') return load('../../lib/myDiet.ts');
      if (name === '@/lib/myDietReferences' || name === './myDietReferences') return load('../../lib/myDietReferences.ts');
      if (name === '@/lib/myDietOnboarding') return load('../../lib/myDietOnboarding.ts');
      throw new Error(`Unexpected import ${name}`);
    };
    vm.runInNewContext(code, { exports, require }); return exports;
  }
  const model = load('../../lib/myDiet.ts'), flow = load('../../lib/myDietOnboarding.ts');
  const Component = load('./MyDietOnboarding.tsx').default;
  const props = { initialStep, initialRequirements: { ...model.defaultRequirements, onboardingVersion: 2, ...initial },
    onDraftChange: draft => drafts.push(plain(draft)), onSave: async next => { saves.push(plain(next)); if (save) await save(next); },
    onExit: () => { exits++; } };
  let tree;
  const render = () => { cursor = 0; tree = Component(props); return tree; };
  function nodes(node) {
    if (arguments.length === 0) node = tree;
    if (!node || typeof node !== 'object') return [];
    if (Array.isArray(node)) return node.flatMap(child => nodes(child));
    return [node, ...nodes(node.props?.children)];
  }
  function text(node) {
    if (arguments.length === 0) node = tree;
    if (node == null || typeof node === 'boolean') return '';
    if (Array.isArray(node)) return node.map(text).join('');
    return typeof node === 'object' ? text(node.props?.children) : String(node);
  }
  const find = predicate => { const result = nodes().find(predicate); assert.ok(result, 'expected rendered control'); return result; };
  const button = label => find(node => node.type === 'button' && text(node) === label);
  const input = id => find(node => node.props?.id === `guide-${id}`);
  async function submit() { find(node => node.type === 'form').props.onSubmit({ preventDefault() {} }); await tick(); render(); }
  async function click(label) { button(label).props.onClick(); await tick(); render(); }
  function change(id, value) { input(id).props.onChange({ target: { value } }); render(); }
  function answerAllergy(value) { find(node => node.type === 'input' && node.props.type === 'radio' && node.props.value === value).props.onChange(); render(); }
  render();
  return { model, flow, render, nodes, text, find, button, input, submit, click, change, answerAllergy,
    saves, drafts, exits: () => exits };
}


function stage(h, value) { h.find(n => n.type === 'input' && n.props.name === 'guide-stage' && n.props.value === value).props.onChange(); h.render(); }
function select(h, values) { for (const value of values) { h.find(n => n.type === 'input' && n.props.type === 'checkbox' && n.props.value === value).props.onChange({target:{checked:true}}); h.render(); } }
function reference(h, nutrient) { h.find(n => n.type === 'input' && n.props.name === 'guide-target-' + nutrient && n.props.value === 'reference').props.onChange(); h.render(); }

test('Sidney introduces a four-step journey using the existing character and accessible labels', async () => {
  const h=harness(); assert.equal(h.find(n=>n.type==='img').props.src,'/images/henle-hello.png');
  assert.equal(h.find(n=>n.type==='img').props.alt,'Sidney the Kidney waving hello');
  assert.match(h.text(),/Hello! I'm Sidney/);assert.match(h.text(),/Step 1 of 4/);
  assert.ok(h.nodes().some(n=>n.props?.['aria-label']==='A note from Sidney'));
  assert.equal(h.button('Back').props.disabled,true);assert.ok(h.nodes().some(n=>n.props?.['aria-current']==='step'));
  h.change('name','Alex');await h.submit();assert.equal(h.saves[0].preferredName,'Alex');assert.equal(h.saves[0].onboardingStep,2);
  assert.equal(h.nodes().filter(n=>n.type==='input'&&n.props.type==='radio').length,6);
  await h.click('Back');assert.equal(h.input('name').props.value,'Alex');
});

for(const [ckdStage,k,p] of [['stage3',null,null],['stage4',2737,1000],['stage5',2737,1000],['dialysis',2737,1000]])test(ckdStage+' reuses exact existing references, without automatic targets',async()=>{
 const h=harness({},undefined,2);stage(h,ckdStage);await h.submit();select(h,['sodium','potassium','phosphate']);await h.submit();
 assert.equal(h.saves.at(-1).sodiumLimit,null);assert.equal(h.saves.at(-1).potassiumLimitMg,null);
 assert.match(h.text(),/Salt maximum: 5 g\/day/);reference(h,'sodium');
 if(k!==null){assert.match(h.text(),/2,737 mg\/day.*70 mmol\/day/);reference(h,'potassium');reference(h,'phosphate');}
 else {assert.ok(h.input('potassiumLimitMg'));assert.ok(h.input('phosphateLimitMg'));}
 await h.submit();const saved=h.saves.at(-1);assert.equal(saved.sodiumLimit,2000);assert.equal(saved.potassiumLimitMg,k);assert.equal(saved.phosphateLimitMg,p);assert.equal(saved.onboardingStatus,'completed');
});

test('CKD4 mixes potassium reference with a personal protein range and keeps notes/allergies/preferences',async()=>{
 const existing={ckdStage:'stage4',monitoredNutrients:['potassium','protein'],proteinMinG:51.5,proteinMaxG:70,foodAllergies:['Egg'],dislikedFoods:['Olives'],dietaryAdvice:'My existing advice',potassium:'Moderate'};
 const h=harness(existing,undefined,4);reference(h,'potassium');h.change('proteinMaxG','80');await h.submit();const saved=h.saves[0];
 assert.equal(saved.potassiumLimitMg,2737);assert.equal(saved.proteinMinG,51.5);assert.equal(saved.proteinMaxG,80);
 assert.deepEqual(saved.foodAllergies,['Egg']);assert.deepEqual(saved.dislikedFoods,['Olives']);assert.equal(saved.dietaryAdvice,existing.dietaryAdvice);assert.equal(saved.potassium,'Moderate');
 assert.equal(saved.nutrientTargetSettings.sources.potassium,'reference');assert.equal(saved.nutrientTargetSettings.sources.protein,'personal');
});

test('CKD5 personal targets override the displayed reference and survive stage changes',async()=>{
 const h=harness({ckdStage:'stage5',monitoredNutrients:['sodium','potassium'],sodiumLimit:1600,potassiumLimitMg:2100,proteinMinG:55},undefined,4);
 assert.equal(h.input('sodiumLimit').props.value,4);assert.equal(h.input('potassiumLimitMg').props.value,2100);
 h.change('potassiumLimitMg','2200');await h.click('Back');await h.click('Back');stage(h,'stage3');await h.submit();await h.submit();
 assert.equal(h.input('potassiumLimitMg').props.value,2200);assert.equal(h.input('sodiumLimit').props.value,4);await h.submit();
 assert.equal(h.saves.at(-1).proteinMinG,55);assert.equal(h.saves.at(-1).potassiumLimitMg,2200);
});

for(const choice of ['nonrenal','unsure'])test(choice+' has no CKD references and supports energy/carbohydrate targets',async()=>{
 const h=harness({},undefined,2);stage(h,choice);await h.submit();select(h,['calories','carbohydrate']);await h.submit();
 assert.doesNotMatch(h.text(),/Use RenalPlan's reference/);h.change('energyMinKcal','1800');h.change('energyMaxKcal','2200');h.change('carbohydrateMin','100');h.change('carbohydrateMax','250');await h.submit();
 const saved=h.saves.at(-1);assert.equal(saved.ckdStage,'custom');assert.equal(saved.nutrientTargetSettings.kidneyCategory,choice);assert.equal(saved.sodiumLimit,null);assert.equal(saved.potassiumLimitMg,null);
 assert.equal(saved.nutrientTargetSettings.energyMinKcal,1800);assert.equal(saved.carbohydrateMax,250);
});

test('one selected nutrient is reported with no numerical target and no separate monitoring mode',async()=>{
 const h=harness({monitoredNutrients:[]},undefined,3);select(h,['potassium']);await h.submit();
 assert.deepEqual(h.saves[0].monitoredNutrients,['potassium']);assert.ok(h.input('potassiumLimitMg'));assert.equal(h.nodes().some(n=>n.props?.id==='guide-proteinMinG'),false);
 assert.match(h.text(),/No target entered/);assert.doesNotMatch(h.text(),/monitoring only|just monitor|Yes.*limit/i);await h.submit();assert.equal(h.saves.at(-1).potassiumLimitMg,null);
});

test('unselecting nutrients preserves saved numbers and selecting them restores their fields',async()=>{
 const h=harness({monitoredNutrients:['protein'],proteinMinG:50,proteinMaxG:80},undefined,3);
 const toggle=checked=>{h.find(n=>n.type==='input'&&n.props.value==='protein').props.onChange({target:{checked}});h.render();};
 toggle(false);await h.submit();assert.equal(h.nodes().some(n=>n.props?.id==='guide-proteinMaxG'),false);assert.equal(h.saves.at(-1).proteinMaxG,80);
 await h.click('Back');toggle(true);await h.submit();assert.equal(h.input('proteinMaxG').props.value,80);
});

test('the final summary is visible before completion and gives minimum/maximum units',()=>{
 const h=harness({preferredName:'Alex',ckdStage:'stage3',monitoredNutrients:['protein'],proteinMinG:50,proteinMaxG:80},undefined,4);
 assert.match(h.text(),/Your setup at a glance/);assert.match(h.text(),/Alex.*CKD Stage 3/);assert.match(h.text(),/Protein minimum: 50 g\/day; Protein maximum: 80 g\/day/);
 assert.doesNotMatch(h.text(),/Your setup is saved/);assert.equal(h.nodes().some(n=>n.type==='details'),false);
});

test('invalid ranges block completion; blank and zero targets remain valid',async()=>{
 const h=harness({monitoredNutrients:['protein'],proteinMinG:80,proteinMaxG:50},undefined,4);await h.submit();assert.equal(h.saves.length,0);assert.match(h.text(),/must not exceed/);
 h.change('proteinMinG','0');h.change('proteinMaxG','');await h.submit();assert.equal(h.saves[0].proteinMinG,0);assert.equal(h.saves[0].proteinMaxG,null);
});

test('old five-step drafts resume safely in the four-step wizard without changing saved answers',()=>{
 for(const [oldStep,next] of [[1,1],[2,3],[3,4],[4,4],[5,4]]){
 const h=harness({onboardingVersion:1,onboardingStatus:'in_progress',onboardingStep:oldStep,preferredName:'Alex',foodAllergies:['Milk'],proteinMinG:55});
 assert.match(h.text(),new RegExp('Step '+next+' of 4'));assert.equal(h.flow.createOnboardingDraft({...h.model.defaultRequirements,onboardingVersion:1,onboardingStatus:'in_progress',onboardingStep:oldStep}).onboardingVersion,2);
 }
 const h=harness({onboardingStatus:'completed',onboardingStep:4});assert.match(h.text(),/Step 1 of 4/);
});

test('Continue waits for saving, duplicate submissions cannot write twice, and Back preserves answers',async()=>{
 const pending=deferred(),h=harness({},()=>pending.promise);h.change('name','Alex');await h.submit();await h.submit();assert.equal(h.saves.length,1);assert.match(h.text(),/Step 1 of 4/);
 assert.equal(h.find(n=>n.type==='fieldset').props.disabled,true);pending.resolve();await tick();h.render();assert.match(h.text(),/Step 2 of 4/);await h.click('Back');assert.equal(h.input('name').props.value,'Alex');
});

test('failed saves preserve answers and allow retry without falsely completing',async()=>{
 let attempts=0;const h=harness({},async()=>{if(++attempts===1)throw{code:'PGRST204'};});h.change('name','Alex');await h.submit();assert.match(h.text(),/Account saving isn't available yet/);assert.match(h.text(),/Step 1 of 4/);
 await h.submit();assert.equal(h.saves.at(-1).preferredName,'Alex');assert.match(h.text(),/Step 2 of 4/);
 const failure=harness({},async()=>{throw Error('offline')},4);await failure.submit();assert.doesNotMatch(failure.text(),/Your setup is saved/);assert.equal(failure.exits(),0);
});

test('unsaved preview traverses four steps and never acknowledges an account save',async()=>{
 const h=harness({},async()=>{throw{code:'PGRST204'}});h.change('name','Alex');await h.submit();await h.click('Continue reviewing without account saving');stage(h,'nonrenal');await h.submit();select(h,['calories']);await h.submit();h.change('energyMaxKcal','2200');
 assert.match(h.text(),/Step 4 of 4/);assert.match(h.text(),/Alex/);await h.click('Back');await h.submit();assert.equal(h.input('energyMaxKcal').props.value,2200);await h.submit();assert.equal(h.saves.length,1);assert.match(h.text(),/setup is not complete/i);await h.click('Return to My Diet');assert.equal(h.exits(),1);
});

test('Skip and Return stay available during failed/invalid saves and late responses cannot complete the wizard',async()=>{
 for(const action of ['Skip for now','Return to My Diet']){
 const pending=deferred(),h=harness({monitoredNutrients:['protein'],proteinMinG:80,proteinMaxG:50},()=>pending.promise,4);await h.submit();assert.match(h.text(),/must not exceed/);await h.click(action);assert.equal(h.exits(),1);assert.equal(h.drafts.at(-1).proteinMinG,80);pending.resolve();await tick();h.render();assert.doesNotMatch(h.text(),/Your setup is saved/);
 }
 const pending=deferred(),h=harness({},()=>pending.promise,4);await h.submit();await h.click('Return to My Diet');pending.resolve();await tick();h.render();assert.doesNotMatch(h.text(),/Your setup is saved/);
});

test('Finish waits for success before celebrating and offers the existing destination links',async()=>{
 const pending=deferred(),h=harness({},()=>pending.promise,4);await h.submit();assert.equal(h.saves[0].onboardingStatus,'completed');assert.equal(h.drafts.at(-1).onboardingStatus,'in_progress');assert.doesNotMatch(h.text(),/Your setup is saved/);
 pending.resolve();await tick();h.render();assert.match(h.text(),/Your setup is saved/);assert.equal(h.find(n=>n.type==='img').props.src,'/images/henle-celebrate.png');const links=h.nodes().filter(n=>n.type==='a');assert.deepEqual(links.map(n=>n.props.href),['/recipes','/planner']);assert.equal(links[0].props.className,links[1].props.className);
});

function pageSaveHarness(persist, userId = 'owner') {
  const source = fs.readFileSync(new URL('../../app/requirements/page.tsx', import.meta.url), 'utf8');
  const ast = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let save;
  function visit(node) { if (ts.isFunctionDeclaration(node) && node.name?.text === 'saveRequirements') save = node.getText(ast); ts.forEachChild(node, visit); }
  visit(ast); assert.ok(save);
  const cache = [], exports = {}, context = { exports, saveVersionRef: { current: 0 }, saveQueueRef: { current: Promise.resolve() },
    loadedAccountRef: { current: 'owner' }, syncRequirementsToLocalStorage: (value, pending = false) => cache.push({ value, pending }),
    setSaveStatus() {}, setSaveError() {}, createClient: () => ({ auth: { getUser: async () => ({ data: { user: userId ? { id: userId } : null } }) } }),
    persistRequirements: persist };
  vm.runInNewContext(ts.transpileModule(`${save}\nexports.save = saveRequirements`, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText, context);
  return { save: exports.save, cache };
}

test('the actual page save queue reports database failures instead of acknowledging completion', async () => {
  const h = pageSaveHarness(async () => { throw { code: '42703' }; });
  const outcome = await h.save({ onboardingStatus: 'completed' }, true);
  assert.equal(outcome.ok, false); assert.equal(outcome.error.code, '42703');
  assert.equal(h.cache.length, 1); assert.equal(h.cache[0].pending, true);
});

test('a rejected next-step save keeps the visible current step in the pending cache', async () => {
  const h = pageSaveHarness(async () => { throw { code: 'PGRST204' }; });
  const current = { preferredName: 'Alex', onboardingStatus: 'in_progress', onboardingStep: 1 };
  const result = await h.save({ ...current, onboardingStep: 2 }, true, current);
  assert.equal(result.ok, false);
  assert.equal(h.cache[0].value.onboardingStep, 1);
  assert.equal(h.cache[0].value.preferredName, 'Alex');
});

test('the actual My Diet exit handler closes the wizard and explains that pending answers are retained', () => {
  const source = fs.readFileSync(new URL('../../app/requirements/page.tsx', import.meta.url), 'utf8');
  const ast = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let close;
  function visit(node) { if (ts.isFunctionDeclaration(node) && node.name?.text === 'closeOnboarding') close = node.getText(ast); ts.forEachChild(node, visit); }
  visit(ast); assert.ok(close);
  const exports = {}, shown = [], warnings = [];
  vm.runInNewContext(ts.transpileModule(`${close}\nexports.close = closeOnboarding`, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText,
    { exports, setShowOnboarding: value => shown.push(value), hasPendingRequirementsSave: () => true,
      setSaveError: message => warnings.push(message), window: { requestAnimationFrame: callback => callback() },
      guidedSetupButtonRef: { current: { focus() {} } } });
  exports.close();
  assert.deepEqual(shown, [false]); assert.match(warnings[0], /unsaved answers are kept in this browser/);
});

test('the actual page save queue rejects signed-out or switched accounts before writing', async () => {
  for (const user of [null, 'different-owner']) {
    let writes = 0;
    const h = pageSaveHarness(async () => { writes++; }, user);
    const outcome = await h.save({ onboardingStatus: 'completed' }, true);
    assert.equal(outcome.ok, false); assert.equal(writes, 0);
  }
});

test('the actual page save queue serializes writes and only acknowledges the newest save', async () => {
  const pending = deferred(), writes = [];
  const h = pageSaveHarness(async (_client, _owner, value) => { writes.push(value.preferredName); if (writes.length === 1) await pending.promise; });
  const first = h.save({ preferredName: 'First' }, true); await tick();
  const second = h.save({ preferredName: 'Second' }, true); await tick();
  assert.deepEqual(writes, ['First']); pending.resolve();
  assert.equal((await first).ok, false); assert.equal((await second).ok, true);
  assert.deepEqual(writes, ['First', 'Second']);
  assert.deepEqual(h.cache.filter(entry => !entry.pending).map(entry => entry.value.preferredName), ['Second']);
});
