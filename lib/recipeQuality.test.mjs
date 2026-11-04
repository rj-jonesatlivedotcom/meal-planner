import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import {renderToStaticMarkup} from 'react-dom/server';
import {catalogue,evaluate,read} from './recipeCorrectionTestSupport.mjs';
const audit=JSON.parse(read('data/recipeQualityReview.json'));
const guides=JSON.parse(read('data/dietaryGuides.json'));
const baseline=['breakfasts','lunches','dinners'].flatMap(c=>evaluate(execFileSync('git',['show',audit.baselineCommit+':data/RecipeData/'+c+'.ts'],{encoding:'utf8',maxBuffer:1e7}))[c]);
const plain=x=>JSON.parse(JSON.stringify(x));
const by=code=>catalogue.find(r=>r.code===code);
const sha=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const allowed=['method','equipment','description','nutritionBasis','cookingTime'];
const protectedFields=r=>Object.fromEntries(Object.entries(r).filter(([k])=>!allowed.includes(k)));

test('all 310 recipes preserve every protected field and match the exact editorial record',()=>{
 assert.equal(catalogue.length,310);assert.equal(new Set(catalogue.map(r=>r.id)).size,310);assert.equal(new Set(catalogue.map(r=>r.code)).size,310);
 assert.deepEqual(['Breakfast','Lunch','Dinner'].map(c=>catalogue.filter(r=>r.category===c).length),[60,125,125]);
 assert.deepEqual(audit.allowedRecipeFields,allowed);
 for(const r of catalogue){const previous=baseline.find(x=>x.id===r.id),record=audit.recipes.find(x=>x.id===r.id);assert.deepEqual(plain(protectedFields(r)),plain(protectedFields(previous)),r.code);const changed=allowed.filter(k=>JSON.stringify(r[k])!==JSON.stringify(previous[k]));assert.deepEqual(changed,record?.changedFields??[],r.code);if(record){assert.equal(sha(protectedFields(r)),record.protectedFieldsSha256);for(const key of changed){assert.deepEqual(plain(r[key]),record.after[key]);assert.deepEqual(plain(previous[key]),record.before[key]);}}}
});

test('the single structured review covers all recipes and every lexical candidate has an editorial decision',()=>{
 const report=audit.consistency;assert.equal(report.recipeCount,310);assert.equal(report.uniqueIds,310);assert.equal(report.uniqueCodes,310);assert.equal(report.results.length,310);
 for(const r of report.results){assert.ok(by(r.code));if(r.ingredientCandidates.length)assert.ok(report.manualCandidateDecisions.some(x=>x.code===r.code),r.code);for(const issue of r.issues){assert.equal(issue,'Unrecognised duration');assert.ok(report.manualDurationDecisions.some(x=>x.code===r.code));}}
 assert.equal(report.results.filter(x=>x.cookedWeightCandidates.length).length,24);
});

test('named defects are corrected while useful timings, preparation and food temperatures remain',()=>{
 const method=c=>by(c).method.join(' ');
 assert.match(method('B003'),/pour the beaten egg mixture/);assert.doesNotMatch(method('B003'),/crack the egg into the clear space|yolk is cooked/);
 assert.match(method('B009'),/pour in the beaten egg mixture/);assert.doesNotMatch(method('B009'),/crack in the egg/);
 assert.match(method('B005'),/Pour the beaten egg mixture over the vegetables/);
 const apple=by('B002').method.find(s=>s.includes('diced apple into'));assert.doesNotMatch(apple,/cereal|thicken|gritty/);assert.match(method('B002'),/oats are soft and creamy/);
 assert.match(by('L001').equipment,/Frying pan/i);assert.match(by('L001').equipment,/thermometer/i);assert.doesNotMatch(method('L001'),/oil|smok/i);assert.match(method('L001'),/75.C for at least 30 seconds/);
 assert.match(method('L007'),/eggs in a saucepan/);assert.match(method('L007'),/sliced eggs and lettuce/);assert.equal(by('L007').cookingTime,'15 mins');assert.doesNotMatch(by('D073').equipment,/Rolling pin/);assert.doesNotMatch(by('B002').equipment,/Mixing bowl/);
 assert.match(method('L036'),/Core and thinly slice the apple/);assert.match(method('D025'),/vegetable oil/);assert.match(method('D044'),/dried thyme/);
 assert.doesNotMatch(method('L049'),/minutes and(?:\s|$)/);assert.doesNotMatch(method('L063'),/Leave some texture where/);
 for(const code of ['L028','L029','L030','D023','D040'])assert.match(method(code),/drain|discard/i);
 for(const code of ['L061','D069','D071','D073'])assert.match(method(code),/75\s*(?:\u00b0?C| C).*30 seconds/);
 for(const r of catalogue){assert.doesNotMatch(r.method.join(' '),/extra bread, dips or toppings|Transfer the complete portion to a plate or bowl|pans or trays specified/);assert.doesNotMatch(r.equipment,/where specified|saucepan or frying pan/);}
});

test('the dated editorial guide review retains its exact historical text and source references',()=>{
 const installation=JSON.parse(read('data/dietaryGuideInstallation.json'));
 const historicalGuides=JSON.parse(execFileSync('git',['show',installation.baselineCommit+':data/dietaryGuides.json'],{encoding:'utf8',maxBuffer:1e7}));
 const previous=JSON.parse(execFileSync('git',['show',audit.baselineCommit+':data/dietaryGuides.json'],{encoding:'utf8',maxBuffer:1e7}));
 for(const r of catalogue){const entry=historicalGuides[r.id],prior=previous[r.id],change=audit.guideChanges.find(x=>x.id===r.id);assert.deepEqual(entry.references,prior.references);assert.deepEqual(entry.guidanceReferences,prior.guidanceReferences);assert.equal(entry.text,change?change.after:prior.text);if(change)assert.equal(change.before,prior.text);}
});

test('D069 D071 and D073 retain complete estimates and pending flags with accessible exact source calculations',()=>{
 const evidence=JSON.parse(read('data/RecipeData/evidence/nutrition-gap-resolution.json'));
 for(const code of ['L061','L062','D069','D071','D072','D073']){const r=by(code),original=evidence.recipes.find(x=>x.code===code),download=JSON.parse(read('public/evidence/nutrition/'+code+'.json'));assert.deepEqual(plain(r.nutrition),original.after.nutrition);assert.deepEqual(plain(r.nutritionIncomplete),[]);assert.equal(r.conditionalProxyPending,true);assert.equal(r.clinicalReviewPending,true);assert.equal(r.nutritionBasis,'CoFID/USDA ingredient-input estimate');assert.deepEqual(download.lines,original.lines);assert.deepEqual(download.unroundedTotals,original.unroundedTotals);assert.deepEqual(download.ingredients,plain(r.ingredients));assert.deepEqual(download.nutrition,plain(r.nutrition));}
 assert.equal(by('D073').fluidMl,undefined);
});

test('About provides one central methodology section and adds no additional disclaimer block',()=>{
 const source=read('app/about/page.tsx'),before=execFileSync('git',['show',audit.baselineCommit+':app/about/page.tsx'],{encoding:'utf8'});
 const note=s=>s.slice(s.indexOf('          {/* IMPORTANT NOTE */}'),s.indexOf('          {/* BACK BUTTON */}')).split('          {/* SOURCES */}')[0].trim();
 assert.equal(note(source),note(before));
 const About=evaluate(source,{require:name=>{if(name==='react/jsx-runtime')return jsxRuntime;if(name==='next/link')return{default:({href,children,...props})=>React.createElement('a',{href,...props},children)};if(name==='@/components/RenalPlan')return{default:()=>React.createElement('span',null,'RenalPlan')};throw Error(name);}}).default;
 const html=renderToStaticMarkup(React.createElement(About));assert.equal((html.match(/id="nutrition-sources-methodology"/g)||[]).length,1);assert.match(html,/Nutrition Sources &amp; Methodology/);assert.match(html,/CoFID/);assert.match(html,/Standard Reference 28/);assert.match(html,/Table S5/);assert.match(html,/Raw, cooked and drained weights/);
 const page=read('app/recipes/[id]/page.tsx');assert.match(page,/href="\/about#nutrition-sources-methodology"/);assert.doesNotMatch(page,/getDietaryGuideReferences|<summary>Sources<\/summary>/);assert.doesNotMatch(page,/getNutritionEvidenceText|About this nutrition information|About these diet categories/);
 for(const code of ['L061','L062','D069','D071','D072','D073'])assert.ok(html.includes('/evidence/nutrition/'+code+'.json'));
});
