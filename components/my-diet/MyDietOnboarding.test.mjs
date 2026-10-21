import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const plain = value => JSON.parse(JSON.stringify(value));
const tick = () => new Promise(resolve => setImmediate(resolve));
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done; }); return { promise, resolve }; };

// Exercise the component's real event handlers with deterministic hook state, without a browser or account writes.
function harness(initial = {}, save) {
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
      if (name === '@/lib/myDietOnboarding') return load('../../lib/myDietOnboarding.ts');
      throw new Error(`Unexpected import ${name}`);
    };
    vm.runInNewContext(code, { exports, require }); return exports;
  }
  const model = load('../../lib/myDiet.ts'), flow = load('../../lib/myDietOnboarding.ts');
  const Component = load('./MyDietOnboarding.tsx').default;
  const props = { initialRequirements: { ...model.defaultRequirements, ...initial },
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

test('welcome uses the waving Henle asset, optional name and accessible progress', async () => {
  const h = harness();
  assert.equal(h.find(n => n.type === 'img').props.src, '/images/henle-hello.png');
  assert.ok(h.button("Let's go!"));
  assert.doesNotMatch(h.text(), /We'll choose what|Your choices save when/);
  assert.match(h.text(), /Step 1 of 5/);
  assert.equal(h.button('Back').props.disabled, true);
  assert.ok(h.nodes().some(n => n.props?.['aria-current'] === 'step'));
  h.change('name', 'Alex'); await h.submit();
  assert.equal(h.saves[0].preferredName, 'Alex');
  assert.equal(h.saves[0].onboardingStatus, 'in_progress');
  assert.equal(h.saves[0].onboardingStep, 2);
  await h.click('Back'); assert.equal(h.input('name').props.value, 'Alex');
});

test('monitoring includes energy, is independent of targets and retains existing restrictions', async () => {
  const h = harness({ onboardingStatus: 'in_progress', onboardingStep: 2, potassium: 'Low', proteinMinG: 50 });
  for (const value of ['potassium', 'calories']) {
    h.find(n => n.type === 'input' && n.props.type === 'checkbox' && n.props.value === value).props.onChange({ target: { checked: true } }); h.render();
  }
  assert.ok(h.nodes().some(n => n.type === 'details'));
  await h.submit(); const saved = h.saves[0];
  assert.deepEqual(saved.monitoredNutrients, ['potassium', 'calories']);
  assert.equal(saved.potassium, 'Low'); assert.equal(saved.potassiumLimitMg, null);
  assert.equal(saved.proteinMinG, 50); assert.equal(saved.ckdStage, 'custom');
  await h.click('Back');
  assert.equal(h.find(n => n.type === 'input' && n.props.value === 'calories').props.checked, true);
});

test('guidance preserves exact existing targets and units; notes never impose restrictions', async () => {
  const h = harness({ onboardingStatus: 'in_progress', onboardingStep: 3, ckdStage: 'stage4', sodiumLimit: 2300,
    proteinMinG: 51.5, proteinMaxG: 70, potassiumLimitMg: 2737, phosphate: 'Moderate' });
  assert.equal(h.input('sodiumLimit').props.value, 5.75);
  h.change('advice', 'My existing advice, recorded as written.'); h.change('proteinMaxG', '80');
  await h.submit(); const saved = h.saves[0];
  assert.equal(saved.sodiumLimit, 2300); assert.equal(saved.proteinMinG, 51.5); assert.equal(saved.proteinMaxG, 80);
  assert.equal(saved.potassiumLimitMg, 2737); assert.equal(saved.phosphate, 'Moderate'); assert.equal(saved.ckdStage, 'stage4');
  assert.equal(saved.fluidLimitMl, null);
});

test('unticking nutrients hides their Step 3 fields without erasing targets, and re-enabling restores them', async () => {
  const h=harness({onboardingStatus:'in_progress',onboardingStep:2,monitoredNutrients:['protein'],proteinMaxG:70,potassiumLimitMg:2737});
  const toggle=checked=>{h.find(n=>n.type==='input'&&n.props.type==='checkbox'&&n.props.value==='protein').props.onChange({target:{checked}});h.render();};
  toggle(false);await h.submit();assert.equal(h.nodes().some(n=>n.props?.id==='guide-proteinMaxG'),false);assert.equal(h.saves[0].proteinMaxG,70);assert.match(h.text(),/Inactive targets retained/);
  await h.click('Back');toggle(true);await h.submit();assert.equal(h.input('proteinMaxG').props.value,70);assert.equal(h.nodes().some(n=>n.props?.id==='guide-potassiumLimitMg'),false);
});

test('accepting no Step 2 choices makes the empty selection explicit and retains old targets as inactive', async()=>{
  const h=harness({onboardingStatus:'in_progress',onboardingStep:2,monitoredNutrients:null,sodiumLimit:2000});await h.submit();assert.deepEqual(h.saves[0].monitoredNutrients,[]);assert.equal(h.saves[0].sodiumLimit,2000);assert.equal(h.nodes().some(n=>n.props?.id==='guide-sodiumLimit'),false);
});

test('allergy answers stay separate from dislikes and existing favourites; skip retains entries', async () => {
  const h = harness({ onboardingStatus: 'in_progress', onboardingStep: 4, preferredName: 'Alex', sodiumLimit: 1600 });
  assert.equal(h.find(n => n.type === 'input' && n.props.value === 'unanswered').props.checked, true);
  h.answerAllergy('none'); assert.deepEqual(h.drafts.at(-1).foodAllergies, []);
  h.answerAllergy('listed'); h.change('allergies', 'Egg, Milk\nEgg');
  h.change('dislikes', 'Mushrooms, olives');
  h.answerAllergy('unanswered'); assert.equal(h.drafts.at(-1).foodAllergies, null);
  h.answerAllergy('listed'); assert.equal(h.input('allergies').props.value, 'Egg, Milk\nEgg');
  const favourites = h.find(n => n.type === 'a' && n.props.href === '/recipes?view=favourites');
  assert.equal(favourites.props.target, '_blank');
  await h.click('Skip for now');
  assert.deepEqual(h.saves[0].foodAllergies, ['Egg', 'Milk']); assert.deepEqual(h.saves[0].dislikedFoods, ['Mushrooms', 'olives']);
  assert.equal(h.saves[0].sodiumLimit, 1600); assert.equal(h.saves[0].preferredName, 'Alex');
  assert.equal(h.saves[0].onboardingStatus, 'skipped'); assert.equal(h.saves[0].onboardingStep, 4); assert.equal(h.exits(), 1);
});

test('summary accurately distinguishes monitoring-only, unanswered questions and explicit no allergies', () => {
  const h = harness({ onboardingStatus: 'in_progress', onboardingStep: 5, monitoredNutrients: ['potassium', 'calories'], foodAllergies: [] });
  assert.match(h.text(), /Monitoring — no target entered/); assert.match(h.text(), /No numerical targets entered/);
  assert.match(h.text(), /None reported/); assert.match(h.text(), /Not provided/);
  assert.doesNotMatch(h.text(), /Your setup is saved/);
  const unanswered = harness({ onboardingStatus: 'in_progress', onboardingStep: 5 });
  assert.match(unanswered.text(), /Not answered/); assert.doesNotMatch(unanswered.text(), /None reported/);
});

test('Continue waits for account success and duplicate submissions do not create duplicate saves', async () => {
  const pending = deferred(), h = harness({}, () => pending.promise);
  await h.submit(); await h.submit();
  assert.equal(h.saves.length, 1); assert.match(h.text(), /Step 1 of 5/);
  assert.equal(h.find(n => n.type === 'fieldset').props.disabled, true);
  pending.resolve(); await tick(); h.render(); assert.match(h.text(), /Step 2 of 5/);
});

test('missing database fields show failure, preserve draft and allow clearly unsaved review', async () => {
  const h = harness({}, async () => { throw { code: 'PGRST204' }; });
  h.change('name', 'Alex'); await h.submit();
  assert.match(h.text(), /Account saving isn't available yet/); assert.match(h.text(), /Step 1 of 5/); assert.equal(h.exits(), 0);
  assert.equal(h.drafts.at(-1).preferredName, 'Alex'); assert.equal(h.drafts.at(-1).onboardingStatus, 'in_progress');
  await h.click('Continue reviewing without account saving');
  assert.match(h.text(), /Step 2 of 5/); assert.match(h.text(), /setup is not complete/i); assert.equal(h.saves.length, 1);
  await h.click('Back'); assert.equal(h.input('name').props.value, 'Alex');
});

test('a failed accepted step can be retried successfully without losing entries', async () => {
  let attempts = 0;
  const h = harness({}, async () => { if (++attempts === 1) throw { code: '23514' }; });
  h.change('name', 'Alex'); await h.submit(); assert.match(h.text(), /These choices couldn't be saved/);
  await h.submit(); assert.match(h.text(), /Step 2 of 5/); assert.equal(h.saves[1].preferredName, 'Alex');
  assert.ok(!h.nodes().some(node => node.props?.role === 'alert'));
});

test('failed completion never exits or opens the saved completion screen', async () => {
    const h = harness({ onboardingStatus: 'in_progress', onboardingStep: 5 }, async () => { throw new Error('offline'); });
    await h.submit();
    assert.equal(h.exits(), 0); assert.match(h.text(), /has not been marked complete/);
    assert.doesNotMatch(h.text(), /Your setup is saved/); assert.equal(h.drafts.at(-1).onboardingStatus, 'in_progress');
});

test('unsaved preview continues through every step without retrying saves; Back retains answers', async () => {
  const h = harness({}, async () => { throw { code: 'PGRST204' }; });
  h.change('name', 'Alex'); await h.submit();
  await h.click('Continue reviewing without account saving');
  assert.match(h.text(), /Step 2 of 5/); assert.match(h.text(), /Unsaved preview/);
  await h.submit(); assert.match(h.text(), /Step 3 of 5/);
  h.change('advice', 'Keep this note');
  await h.submit(); assert.match(h.text(), /Step 4 of 5/);
  h.answerAllergy('none'); h.change('dislikes', 'Olives');
  await h.submit(); assert.match(h.text(), /Step 5 of 5/);
  assert.equal(h.saves.length, 1);
  assert.match(h.text(), /Alex/); assert.match(h.text(), /Keep this note/); assert.match(h.text(), /Olives/);
  await h.click('Back'); assert.equal(h.input('dislikes').props.value, 'Olives');
  await h.click('Back'); assert.equal(h.input('advice').props.value, 'Keep this note');
  assert.match(h.text(), /Unsaved preview/);
  await h.submit(); await h.submit(); await h.submit();
  assert.equal(h.saves.length, 1);
  assert.equal(h.exits(), 0); assert.match(h.text(), /setup is not complete/i);
  assert.doesNotMatch(h.text(), /You're all set/);
  await h.click('Return to My Diet'); assert.equal(h.exits(), 1);
  assert.ok(h.drafts.every(draft => draft.onboardingStatus !== 'completed'));
});

test('preview Skip and exploration never retry account saving or claim completion', async () => {
  for (const action of ['Skip for now', 'Explore without saving']) {
    const h = harness({}, async () => { throw { code: 'PGRST204' }; });
    await h.submit(); await h.click('Continue reviewing without account saving');
    await h.submit(); await h.submit(); await h.submit();
    assert.equal(h.find(node => node.type === 'form').props.noValidate, true);
    if (action === 'Skip for now') await h.click(action); else await h.submit();
    assert.equal(h.saves.length, 1);
    assert.doesNotMatch(h.text(), /Your setup is saved/);
    if (action === 'Explore without saving') { assert.match(h.text(), /setup is not complete/i); await h.click('Return to My Diet'); }
    assert.equal(h.exits(), 1);
  }
});

test('Skip and Return leave after failed saving and preserve entries without declaring completion', async () => {
  for (const label of ['Skip for now', 'Return to My Diet', 'Return to My Diet with unsaved answers']) {
    const h = harness({}, async () => { throw { code: 'PGRST204' }; });
    h.change('name', 'Alex'); await h.submit(); await h.click(label);
    assert.equal(h.exits(), 1); assert.equal(h.drafts.at(-1).preferredName, 'Alex');
    assert.equal(h.drafts.at(-1).onboardingStatus, label === 'Skip for now' ? 'skipped' : 'in_progress');
  }
});

test('exit remains available during a pending save and ignores late navigation callbacks', async () => {
  for (const label of ['Skip for now', 'Return to My Diet']) {
    const pending = deferred(), h = harness({ onboardingStatus: 'in_progress', onboardingStep: 5 }, () => pending.promise);
    await h.submit();
    assert.notEqual(h.button(label).props.disabled, true);
    await h.click(label); assert.equal(h.exits(), 1);
    pending.resolve(); await tick(); h.render();
    assert.equal(h.exits(), 1); assert.doesNotMatch(h.text(), /Your setup is saved/);
  }
});

test('Skip and Return are not blocked by invalid or partially entered optional answers', async () => {
  for (const label of ['Skip for now', 'Return to My Diet']) {
    const h = harness({ onboardingStatus: 'in_progress', onboardingStep: 4, proteinMinG: 80, proteinMaxG: 50 }, async () => { throw new Error('offline'); });
    h.answerAllergy('listed'); h.change('dislikes', 'Olives');
    await h.click(label); assert.equal(h.exits(), 1);
    assert.equal(h.drafts.at(-1).dislikedFoods[0], 'Olives');
    assert.equal(h.drafts.at(-1).proteinMinG, 80);
  }
});

test('Finish acknowledges completion only after success and offers equally prominent Recipes and Planner links', async () => {
  const pending = deferred(), h = harness({ onboardingStatus: 'in_progress', onboardingStep: 5 }, () => pending.promise);
  await h.submit(); assert.equal(h.exits(), 0); assert.doesNotMatch(h.text(), /Your setup is saved/);
  assert.equal(h.drafts.at(-1).onboardingStatus, 'in_progress'); assert.equal(h.saves[0].onboardingStatus, 'completed');
  pending.resolve(); await tick(); h.render(); assert.match(h.text(), /Your setup is saved/);
  const links = h.nodes().filter(n => n.type === 'a');
  assert.deepEqual(links.map(n => n.props.href), ['/recipes', '/planner']);
  assert.equal(links[0].props.className, links[1].props.className);
  assert.equal(h.exits(), 0);
  assert.equal(h.find(n => n.type === 'img').props.src, '/images/henle-celebrate.png');
});

test('target validation rejects invalid ranges without inventing values; blank targets remain null', () => {
  const h = harness(), base = h.model.defaultRequirements;
  assert.equal(h.flow.withTarget(base, 'sodiumLimit', '5').sodiumLimit, 2000);
  assert.equal(h.flow.withTarget(base, 'proteinMinG', '').proteinMinG, null);
  assert.match(h.flow.validateOnboardingTargets({ ...base, proteinMinG: 70, proteinMaxG: 50 }), /must not exceed/);
  assert.match(h.flow.validateOnboardingTargets({ ...base, fluidLimitMl: -1 }), /zero or more/);
  assert.equal(h.flow.validateOnboardingTargets({ ...base, proteinMinG: 0 }), null);
  assert.equal(h.flow.createOnboardingDraft({ ...base, onboardingStatus: 'completed', onboardingStep: 5 }).onboardingStep, 1);
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
