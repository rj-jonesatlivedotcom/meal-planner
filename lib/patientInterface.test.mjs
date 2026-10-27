import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import test from 'node:test';
import assert from 'node:assert/strict';

const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const source = path => ts.createSourceFile(path, read(path), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
function load(text, require) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(text, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
  } }).outputText, { exports, require });
  return exports;
}
function find(node, predicate, result = []) {
  if (!node || typeof node !== 'object') return result;
  if (Array.isArray(node)) node.forEach(child => find(child, predicate, result));
  else { if (predicate(node)) result.push(node); find(node.props?.children, predicate, result); }
  return result;
}

test('retired nutrient selections fall back without changing saved data', () => {
  const { normalizePlannerNutrient } = load(read('lib/plannerNutrients.ts'), () => ({}));
  for (const value of ['Purines', 'purines', null, undefined, 'unsupported']) {
    assert.equal(normalizePlannerNutrient(value), 'Calories');
  }
  for (const value of ['Calories', 'Protein', 'Carbohydrate', 'Sodium', 'Potassium', 'Phosphorus']) {
    assert.equal(normalizePlannerNutrient(value), value);
  }
  assert.match(read('app/recipes/page.tsx'), /validSortOptions/);
  assert.doesNotMatch(read('app/recipes/page.tsx'), /purines-asc/);
});

test('active website JSX has no purine labels, tooltips, options or direct purine output', () => {
  const paths = ['app', 'components'].flatMap(root => fs.readdirSync(new URL('../' + root, import.meta.url), { recursive: true })
    .filter(path => path.endsWith('.tsx') && !/ - Copy\.tsx$/.test(path) && !path.split(/[\\/]/).some(part => part.startsWith('backup')))
    .map(path => root + '/' + path));
  for (const path of paths) {
    const ast = source(path);
    function visit(node) {
      if (ts.isJsxText(node) || ts.isJsxAttribute(node)) {
        assert.doesNotMatch(node.getText(ast), /purin/i, path);
      }
      if (ts.isJsxExpression(node) && node.expression && !/<\w/.test(node.expression.getText(ast))) {
        assert.doesNotMatch(node.expression.getText(ast), /\.purines\b|["']purines["']/i, path);
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
  }
  assert.doesNotMatch(read('lib/nutritionEvidence.ts'), /purin/i);
});

test('mobile account is icon-only and appearance is the last control', () => {
  const text = read('components/Navbar.tsx');
  const mobile = text.slice(text.indexOf('{open && ('));
  assert.match(mobile, /href="\/account"\s+aria-label="My Account"/);
  assert.doesNotMatch(mobile, /<span>My Account<\/span>/);
  assert.match(mobile, /<ThemeToggle mobile[^>]* \/>\s*<\/div>\s*<\/nav>/);
  assert.equal((mobile.match(/<ThemeToggle mobile/g) ?? []).length, 1);
  assert.doesNotMatch(mobile, /border-t border-slate-200 pt-3/);
});

test('normal pages never expose version comparisons or interrupted-change JSON', () => {
  const jsx = (type, props) => ({ type, props });
  const owner = { kind: 'guest', id: 'test' }, weekStart = '2026-10-19';
  const state = { owner, weekStart, status: 'ready', plan: { owner, weekStart } };
  let consumed = 0;
  for (const path of ['/planner', '/saved-meals/recovery']) {
    let hook = 0;
    const context = { getSnapshot: () => state, subscribe() {} };
    const pending = [{ journal: `renalplan:weekly-ui:guest:test:${weekStart}:pending-change:1`, value: { meals: 'preserved' } }];
    const mod = load(read('components/calendar/DatedPlannerBoundary.tsx') + '\nexport { PlannerRuntime };', name => {
      if (name === 'react') return {
        useState: initial => [hook++ === 3 ? pending : typeof initial === 'function' ? initial() : initial, () => {}],
        useEffect() {}, useSyncExternalStore: () => state,
      };
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
      if (name === 'next/navigation') return { usePathname: () => path };
      if (name === '@/lib/weeklyPlanContext') return { createWeeklyPlanContext: () => context };
      if (name === '@/lib/weeklyPlans') return { currentMonday: () => weekStart };
      if (name === '@/lib/weeklyPageStorage') return { retainReviewedWeeklyChange: () => consumed++ };
      return {};
    });
    const tree = mod.PlannerRuntime({ children: 'Planner content' });
    const imports = find(tree, node => typeof node.type === 'function' && node.type.name === 'ExistingPlan');
    const recoveries = find(tree, node => node.type === 'summary' && node.props.children === 'Recover unsaved meals');
    assert.equal(imports.length, path === '/planner' ? 0 : 1);
    assert.equal(recoveries.length, 0);
    assert.equal(find(tree, node => node.type === 'pre').length, 0);
    assert.equal(find(tree, node => typeof node.type === 'function' && node.type.name === 'WeekConflictReview').length, 0);
    assert.equal(consumed, 0, 'rendering must not consume recovery records');
  }
  // Recovery was deliberately removed from My Account; About retains the entry point.
  assert.doesNotMatch(read('app/account/page.tsx'), /href="\/saved-meals\/recovery"/);
  assert.match(read('app/about/page.tsx'), /href="\/saved-meals\/recovery"/);
});

test('mobile week columns fix arrows in place and action buttons span the row edges', () => {
  const text = read('components/calendar/CalendarToolbar.tsx');
  assert.match(text, /@media \(max-width: 1023px\)/);
  assert.match(text, /grid-template-columns: 44px minmax\(0, 1fr\) 44px/);
  assert.match(text, /\.planner-week \{ display: flex; align-items: center; gap: 8px/);
  assert.match(text, /\.planner-actions \{ display: flex; align-items: center; gap: 8px; margin-left: auto/);
  assert.match(text, /\.planner-actions \{ width: 100%; justify-content: space-between/);
  assert.match(text, /\.planner-actions button \{ min-height: 44px/);
});
