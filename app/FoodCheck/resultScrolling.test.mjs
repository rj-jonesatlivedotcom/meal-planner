import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const compile = s => ts.transpileModule(s, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
function harness(top, { height = 812, offset = 0, header = 'relative', bottom = 76 } = {}) {
  const calls = [];
  const context = { exports: {}, document: { querySelector: () => ({ getBoundingClientRect: () => ({ bottom }) }) },
    window: { scrollY: 200, innerHeight: height, visualViewport: { offsetTop: offset, height },
      getComputedStyle: () => ({ position: header }), scrollTo: v => calls.push(v) } };
  vm.runInNewContext(compile(fs.readFileSync(new URL('./resultScrolling.ts', import.meta.url), 'utf8')), context);
  context.exports.scrollToFoodCheckResults({ getBoundingClientRect: () => ({ top, height: 500 }) });
  return calls;
}
test('mobile scroll positions content with a 16px gap', () => assert.equal(harness(900)[0].top, 1084));
test('desktop content already visible does not jump', () => assert.equal(harness(180, { height: 1000 }).length, 0));
test('content above viewport is brought back into view', () => assert.equal(harness(-100)[0].top, 84));
test('fixed and sticky navigation are cleared', () => {
  for (const header of ['fixed', 'sticky']) assert.equal(harness(900, { header, bottom: 88 })[0].top, 996);
});
test('iOS visual viewport offset is accounted for', () => assert.equal(harness(900, { height: 400, offset: 70 })[0].top, 1014));
test('negative document positions are clamped', () => assert.equal(harness(-400)[0].top, 0));
const page = fs.readFileSync(new URL('./page.tsx', import.meta.url), 'utf8');
const begin = page.indexOf('  useEffect(() => {\n    if (!scrollRequest.target');
const end = page.indexOf('\n\n  const searchDebounceRef', begin);
const effect = page.slice(begin, end);
function effectHarness(overrides = {}) {
  const frames = new Map(), scrolls = []; let cleanup;
  const target = {};
  const context = { scrollRequest: { target: 'results', revision: 1 }, searching: false, barcodeLoading: false, scannerOpen: false,
    handledScrollRef: { current: 0 }, resultsRef: { current: target }, nutritionRef: { current: target }, feedbackRef: { current: target },
    resultsListRef: { current: { scrollTop: 300 } }, selectedFood: {}, error: '',
    scrollToFoodCheckResults: t => scrolls.push(t), useEffect: fn => { cleanup = fn(); },
    window: { requestAnimationFrame: fn => { frames.set(1, fn); return 1; }, cancelAnimationFrame: id => frames.delete(id) }, ...overrides };
  const run = () => vm.runInNewContext(compile(effect), context);
  run(); return { context, frames, scrolls, cleanup: () => cleanup?.(), run };
}
test('scroll waits for post-commit frame and resets nested list once', () => {
  const h = effectHarness(); assert.equal(h.scrolls.length, 0); h.frames.get(1)();
  assert.equal(h.scrolls.length, 1); assert.equal(h.context.resultsListRef.current.scrollTop, 0);
  h.frames.clear(); h.run(); assert.equal(h.frames.size, 0);
});
for (const state of [{ searching: true }, { barcodeLoading: true }, { scannerOpen: true }, { selectedFood: null, scrollRequest: { target: 'nutrition', revision: 1 } }]) {
  test('no premature scroll: ' + JSON.stringify(state), () => assert.equal(effectHarness(state).frames.size, 0));
}
test('effect cleanup cancels stale queued frame', () => { const h = effectHarness(); h.cleanup(); assert.equal(h.frames.size, 0); });
test('repeated searches can each schedule a new scroll', () => {
  const h = effectHarness(); h.frames.get(1)(); h.context.scrollRequest = { target: 'results', revision: 2 }; h.run(); h.frames.get(1)(); assert.equal(h.scrolls.length, 2);
});
test('validation feedback targets its own rendered section', () => {
  const h = effectHarness({ error: 'Not found', scrollRequest: { target: 'feedback', revision: 1 } });
  h.frames.get(1)(); assert.equal(h.scrolls[0], h.context.feedbackRef.current);
});
function searchHarness() {
  const source = ts.createSourceFile('page.tsx', page, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let fn; const visit = node => { if (ts.isFunctionDeclaration(node) && node.name?.text === 'performSearch') fn = node.getText(source); ts.forEachChild(node, visit); }; visit(source);
  const requests = [], pending = [], values = [];
  const context = { signedIn: true, search: '', searchRequestRef: { current: 0 }, requestResultsScroll: t => requests.push(t),
    setSelectedFood() {}, setError() {}, setResults: r => values.push(r), setSearching() {}, console: { error() {} },
    supabase: { from: () => ({ select: () => ({ ilike: () => ({ limit: () => new Promise(resolve => pending.push(resolve)) }) }) }) },
    textValue: v => v ?? '', mapFood: row => row };
  vm.runInNewContext(compile(fn), context);
  return { context, requests, pending, values, search: context.performSearch };
}
test('CoFID no-match feedback is queued only after async completion', async () => {
  const h = searchHarness(); const pending = h.search('apple'); assert.deepEqual(h.requests, [null]);
  h.pending.shift()({ data: [], error: null }); await pending;
  assert.deepEqual(h.requests, [null, 'results']); assert.equal(h.values.at(-1).length, 0);
});
test('CoFID failures target feedback rather than an empty result', async () => {
  const h = searchHarness(); const pending = h.search('apple');
  h.pending.shift()({ data: null, error: new Error('offline') }); await pending;
  assert.deepEqual(h.requests, [null, 'feedback']);
});
test('superseded text responses cannot schedule stale scrolling', async () => {
  const h = searchHarness(); const first = h.search('apple'), second = h.search('pear');
  h.pending.shift()({ data: [], error: null }); await first; assert.deepEqual(h.requests, [null, null]);
  h.pending.shift()({ data: [], error: null }); await second; assert.deepEqual(h.requests, [null, null, 'results']);
});
test('blank searches do not target unrelated content', async () => {
  const h = searchHarness(); await h.search(' '); assert.deepEqual(h.requests, [null]); assert.equal(h.pending.length, 0);
});
