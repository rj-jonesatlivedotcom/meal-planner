import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const read = path => fs.readFileSync(new URL(path, import.meta.url), 'utf8');
const css = read('../components/recipe-design.module.css');
const luminance = hex => {
  const [r, g, b] = hex.match(/../g).map(value => parseInt(value, 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return .2126 * r + .7152 * g + .0722 * b;
};
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) /
  (Math.min(luminance(a), luminance(b)) + .05);

test('recipe button and calorie colours meet AA in light/dark and hover states', () => {
  for (const selector of ['.primary {', '.primary:hover:not(:disabled) {']) {
    const colour = css.slice(css.indexOf(selector)).match(/background: #([0-9a-f]{6})/)[1];
    assert.ok(contrast('ffffff', colour) >= 4.5, `${selector}: ${contrast('ffffff', colour)}`);
  }
  for (const rule of css.matchAll(/\.nutrition \[data-nutrient="Calories"\] \{([^}]+)\}/g)) {
    const [, background] = rule[1].match(/--(?:tile|dark)-bg:#?\s*#?([0-9a-f]{6})/);
    const [, ink] = rule[1].match(/--(?:tile|dark)-ink:#?\s*#?([0-9a-f]{6})/);
    assert.ok(contrast(background, ink) >= 4.5);
  }
});

test('Signup is noindex and Privacy has distinct metadata and its own canonical', () => {
  const metadata = path => {
    const exports = {};
    vm.runInNewContext(ts.transpileModule(read(path), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText, { exports });
    return exports.metadata;
  };
  const signup = metadata('../app/signup/layout.tsx');
  const privacy = metadata('../app/privacy/layout.tsx');
  assert.equal(signup.robots.index, false);
  assert.equal(signup.robots.follow, true);
  assert.equal(privacy.alternates.canonical, 'https://www.renalplan.com/privacy');
  assert.notEqual(signup.title, privacy.title);
  assert.notEqual(signup.description, privacy.description);
});

test('demo autoplay waits for loading and respects changes to reduced motion', () => {
  const source = read('../app/page.tsx');
  const ast = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const hook = ast.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === 'useDemoMotion');
  let state, paused = true, plays = 0, preferenceListener;
  const effects = [], pending = [];
  let index;
  const video = { pause() { paused = true; }, play() { paused = false; plays++; return Promise.resolve(); } };
  const preference = { matches: true, addEventListener(_, fn) { preferenceListener = fn; }, removeEventListener() {} };
  const exports = {};
  vm.runInNewContext(ts.transpileModule(`${hook.getText(ast)}; exports.render = useDemoMotion;`, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
  }).outputText, {
    exports, window: { matchMedia: () => preference },
    useRef: () => ({ current: video }),
    useState: initial => [state ??= initial, value => { state = value; }],
    useEffect: (callback, dependencies) => {
      const slot = index++;
      if (!effects[slot] || dependencies.some((value, i) => value !== effects[slot][i])) {
        effects[slot] = dependencies;
        pending.push(callback);
      }
    },
  });
  const render = enabled => { index = 0; const result = exports.render(enabled); pending.splice(0).forEach(fn => fn()); return result; };
  assert.equal(render(false).autoPlay, false);
  preference.matches = false; preferenceListener();
  assert.equal(render(false).autoPlay, false);
  assert.equal(plays, 0);
  assert.equal(render(true).autoPlay, true);
  assert.equal(paused, false);
  preference.matches = true; preferenceListener();
  assert.equal(render(true).autoPlay, false);
  assert.equal(paused, true);
});
