import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function fixture() {
  const values = new Map(), events = [], exports = {};
  const storage = { getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
  const code = ts.transpileModule(fs.readFileSync(new URL('./myDiet.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { exports, window: { localStorage: storage, dispatchEvent: e => events.push(e.type) },
    Event: class { constructor(type) { this.type = type; } } });
  return { model: exports, values, events };
}
const plain = value => JSON.parse(JSON.stringify(value));
test('inactive nutrient projection preserves stored targets, restores them when re-enabled and retains legacy behaviour', () => {
  const {model}=fixture(); const saved={...model.defaultRequirements,sodiumLimit:2000,proteinMaxG:70,potassium:'Low',potassiumLimitMg:2737,monitoredNutrients:['calories']};
  const active=model.activeRequirements(saved); assert.equal(active.sodiumLimit,null); assert.equal(active.proteinMaxG,null); assert.equal(active.potassiumLimitMg,null); assert.equal(active.potassium,'Any');
  assert.equal(saved.potassiumLimitMg,2737); assert.equal(saved.potassium,'Low');
  const restored=model.activeRequirements({...saved,monitoredNutrients:['potassium']}); assert.equal(restored.potassiumLimitMg,2737); assert.equal(restored.potassium,'Low');
  assert.equal(model.activeRequirements({...saved,monitoredNutrients:null}).sodiumLimit,2000);
  assert.equal(model.requirementsToRow(saved,'owner').protein_max_g,70);
});
const legacyRow = { ckd_stage: 'stage4', sodium_limit: 2000, protein_min_g: 51.5, protein_max_g: 70,
  potassium_limit_mg: 2737, phosphate_limit_mg: 1000, potassium: 'Low', phosphate: 'Moderate', purines: 'Any',
  carbohydrate_min: null, carbohydrate_max: 180, fluid_limit_ml: 1500 };

test('existing units, decimal values, nulls and restrictions round-trip; uninstalled columns are omitted', () => {
  const { model } = fixture();
  const row = model.requirementsToRow(model.requirementsFromRow(legacyRow), 'owner');
  const { user_id, updated_at, ...settings } = row;
  assert.equal(user_id, 'owner'); assert.ok(Date.parse(updated_at));
  assert.deepEqual(plain(settings), legacyRow);
  assert.equal('onboarding_status' in row, false);
  assert.equal('monitored_nutrients' in row, false);
  assert.equal(model.requirementsFromRow({ ckd_stage: null }).ckdStage, 'custom');
  assert.equal(model.defaultRequirements.sodiumLimit, null);
});

test('all new fields round-trip on the same record; unanswered and explicitly no allergies differ', () => {
  const { model } = fixture();
  const additions = { preferred_name: 'Alex', monitored_nutrients: ['protein', 'potassium'], dietary_advice: 'Advice recorded by user',
    food_allergies: null, disliked_foods: ['Mushrooms'], onboarding_version: 1, onboarding_status: 'in_progress', onboarding_step: 3 };
  const settings = model.requirementsFromRow({ ...legacyRow, ...additions });
  assert.equal(settings.foodAllergies, null);
  const row = model.requirementsToRow({ ...settings, foodAllergies: [] }, 'owner');
  for (const [key, value] of Object.entries(additions)) {
    assert.deepEqual(plain(row[key]), key === 'food_allergies' ? [] : value);
  }
  for (const status of ['not_started', 'in_progress', 'skipped', 'completed']) {
    assert.equal(model.requirementsToRow({ ...settings, onboardingStatus: status }, 'owner').onboarding_status, status);
  }
  assert.equal('favourites' in row, false);
});

test('dashboard hydration preserves all settings, extension fields, update events and pending edits', () => {
  const { model, values, events } = fixture();
  const settings = { ...model.requirementsFromRow(legacyRow), foodAllergies: ['Egg'], futureField: 'retain' };
  model.syncRequirementsToLocalStorage(settings);
  model.cacheAccountRequirements(model.requirementsFromRow({ ...legacyRow, protein_min_g: 55 }));
  assert.equal(model.readStoredRequirements().proteinMinG, 55);
  assert.equal(model.readStoredRequirements().futureField, 'retain');
  assert.deepEqual(plain(model.readStoredRequirements().foodAllergies), ['Egg']);
  assert.equal(model.readStoredRequirements().fluidLimitMl, 1500);
  model.syncRequirementsToLocalStorage({ ...settings, proteinMinG: 63 }, true);
  const eventCount = events.length;
  const current = model.cacheAccountRequirements(model.requirementsFromRow(legacyRow));
  assert.equal(current.proteinMinG, 63);
  assert.equal(values.get(model.REQUIREMENTS_PENDING_SAVE_KEY), 'true');
  assert.equal(events.length, eventCount);
  assert.ok(events.every(event => event === 'meal-planner-requirements-updated'));
});

test('an edit made during an account read wins over the late response', async () => {
  const { model } = fixture();
  let resolve;
  const response = new Promise(done => { resolve = done; });
  const query = { select: columns => { assert.equal(columns, '*'); return query; },
    eq: (column, owner) => { assert.equal(column, 'user_id'); assert.equal(owner, 'owner'); return query; },
    maybeSingle: () => response };
  const reading = model.loadRequirements({ from: table => { assert.equal(table, 'user_requirements'); return query; } }, 'owner');
  model.syncRequirementsToLocalStorage({ ...model.defaultRequirements, sodiumLimit: 1600 }, true);
  resolve({ data: legacyRow, error: null });
  const { requirements, error } = await reading;
  assert.equal(error, null);
  assert.equal(model.cacheAccountRequirements(requirements).sodiumLimit, 1600);
});

test('monitoring without targets preserves nulls and explicit qualitative restrictions', () => {
  const { model } = fixture();
  const settings = { ...model.defaultRequirements, monitoredNutrients: [...model.monitoredNutrients], potassium: 'Low' };
  const before = JSON.stringify(settings);
  for (const nutrient of model.monitoredNutrients) assert.equal(model.isMonitoringWithoutTarget(settings, nutrient), true);
  assert.equal(model.hasConfiguredRequirements(settings), true);
  assert.equal(model.isMonitoringWithoutTarget({ ...settings, proteinMinG: 0 }, 'protein'), false);
  assert.equal(model.isMonitoringWithoutTarget({ ...settings, carbohydrateMax: 0 }, 'carbohydrate'), false);
  assert.equal(model.isMonitoringWithoutTarget({ ...settings, monitoredNutrients: [] }, 'potassium'), false);
  assert.equal(model.monitoringWithoutTargetLabel, 'Monitoring — no target entered');
  assert.equal(JSON.stringify(settings), before);
});

test('existing accounts stay ineligible even with no settings; rollout is explicit and timezone-qualified', () => {
  const { model } = fixture(), cutoff = '2026-11-01T00:00:00Z';
  assert.equal(model.isNewAccountEligibleForOnboarding('2026-10-20T00:00:00Z', cutoff), false);
  assert.equal(model.isNewAccountEligibleForOnboarding('2026-11-01T00:00:00Z', cutoff), true);
  assert.equal(model.isNewAccountEligibleForOnboarding('2026-11-02T00:00:00Z'), false);
  assert.equal(model.isNewAccountEligibleForOnboarding('invalid', cutoff), false);
  assert.equal(model.isNewAccountEligibleForOnboarding(cutoff, '2026-11-01'), false);
  assert.equal(model.hasConfiguredRequirements(model.defaultRequirements), false);
});

test('completion stays unacknowledged while pending and after failure, then persists after success', async () => {
  const { model } = fixture();
  const current = { ...model.requirementsFromRow(legacyRow), onboardingStatus: 'in_progress', onboardingVersion: 1, onboardingStep: 5 };
  const completed = { ...current, onboardingStatus: 'completed' };
  model.syncRequirementsToLocalStorage(current);
  model.syncRequirementsToLocalStorage(completed, true);
  assert.equal(model.readStoredRequirements().onboardingStatus, 'in_progress');
  const failure = new Error('save failed');
  const client = result => ({ from: table => {
    assert.equal(table, 'user_requirements');
    return { upsert: async (row, options) => {
      assert.equal(row.user_id, 'owner'); assert.equal(options.onConflict, 'user_id');
      assert.equal(row.onboarding_status, 'completed'); assert.equal(row.onboarding_step, 5);
      return result;
    } };
  } });
  await assert.rejects(model.persistRequirements(client({ error: failure }), 'owner', completed), /save failed/);
  assert.equal(model.readStoredRequirements().onboardingStatus, 'in_progress');
  assert.equal(model.hasPendingRequirementsSave(), true);
  await model.persistRequirements(client({ error: null }), 'owner', completed);
  // As in the page's serialized queue, only its newest successful save acknowledges the cache.
  model.syncRequirementsToLocalStorage(completed);
  assert.equal(model.readStoredRequirements().onboardingStatus, 'completed');
  assert.equal(model.hasPendingRequirementsSave(), false);
});

test('a malformed local cache does not prevent loading settings', () => {
  const { model, values } = fixture();
  values.set(model.REQUIREMENTS_STORAGE_KEY, '{bad');
  assert.equal(model.readStoredRequirements(), null);
  assert.equal(model.cacheAccountRequirements(model.requirementsFromRow(legacyRow)).proteinMinG, 51.5);
});
