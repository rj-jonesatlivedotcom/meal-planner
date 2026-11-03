import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {catalogue,evaluate,read} from './recipeCorrectionTestSupport.mjs';
const audit=JSON.parse(read('data/recipeEditorialReview.json')),guides=JSON.parse(read('data/dietaryGuides.json'));
const baseline=['breakfasts','lunches','dinners'].flatMap(n=>evaluate(execFileSync('git',['show',audit.baselineCommit+':data/RecipeData/'+n+'.ts'],{encoding:'utf8',maxBuffer:10*1024*1024}))[n]);
const sha=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const protectedPart=r=>{const {method,...other}=r;return other;};
const diet=evaluate(read('lib/recipeDiets.ts'));
const categoryReview=JSON.parse(read('data/recipeDietCategoryReview.json'));
test('all 310 method revisions retain every protected field and match the recorded source and final hashes',()=>{
 assert.equal(audit.recipes.length,310);assert.equal(baseline.length,310);
 for(const r of catalogue){const before=baseline.find(x=>x.code===r.code),record=audit.recipes.find(x=>x.code===r.code);const priorCategories={...r,primaryDietCategory:before.primaryDietCategory,dietCategories:before.dietCategories};assert.deepEqual(JSON.parse(JSON.stringify(protectedPart(priorCategories))),JSON.parse(JSON.stringify(protectedPart(before))),r.code);assert.equal(sha(protectedPart(priorCategories)),record.protectedFieldsSha256);assert.equal(sha(r.method),record.expandedMethodSha256);assert.equal(sha(before.method),record.originalMethodSha256);assert.ok(record.originalInstructionNumbersRetained);assert.ok(r.method.length>=3);assert.ok(guides[r.id].text.length>1500,r.code);assert.ok(guides[r.id].references.length>=4);}
});
test('diet names constrain category search rather than matching vegetarian-rennet cheese in meat recipes',()=>{
 for(const [label,count]of Object.entries(categoryReview.fullCatalogueCounts)){assert.equal(catalogue.filter(r=>diet.matchesDietFilter(r,label)).length,count,label);assert.ok(catalogue.filter(r=>diet.matchesDietSearch(r,label)).every(r=>r.dietCategories?.includes(label)),label);}
 assert.equal(diet.matchesDietSearch({dietCategories:[]},'vegetarian cheese'),false);assert.equal(diet.matchesDietSearch({dietCategories:['Keto']},'ketogenic chicken'),true);assert.equal(catalogue.filter(r=>diet.matchesDietFilter(r,'Not categorised')).length,0);assert.equal(catalogue.filter(r=>diet.matchesDietFilter(r,'All')).length,310);
 assert.equal((read('app/recipes/page.tsx').match(/recipeDietSearchTerms\(recipe\)/g)||[]).length,2,'cards and meal counts must both search diet labels');
});
test('method details stay in the cooking phase and do not apply dumpling or porridge techniques to the wrong food',()=>{
 const method=c=>catalogue.find(r=>r.code===c).method.join(' ');
 assert.ok(method('B001').indexOf('broad strokes')<method('B001').indexOf('Spoon the warm tomato'));
 assert.doesNotMatch(method('L058'),/fish|flakes|Fold the sides in first/);assert.doesNotMatch(method('B051'),/loosening it with a fork/);assert.match(method('L028'),/discard|drain/);assert.match(method('L001'),/Rinse the produce/);assert.match(method('L001'),/75°C for at least 30 seconds/);
 assert.doesNotMatch(method('L084'),/unmixed egg white/);assert.doesNotMatch(method('D083'),/unmixed egg white/);assert.doesNotMatch(catalogue.find(r=>r.code==='L115').method.find(s=>s.includes('Whisk in the cornmeal')),/unmixed egg white/);
 const guide=guides[catalogue.find(r=>r.code==='D117').id].text;assert.doesNotMatch(guide,/wheat gluten for seitan.*supplies starch|pear\b/);assert.doesNotMatch(guides[catalogue.find(r=>r.code==='B051').id].text,/Compare the labels on walnut/);
 const cereal=guides[catalogue.find(r=>r.code==='B049').id].text;assert.doesNotMatch(cereal,/stock cube/);assert.match(cereal,/Fluid: The milk served with the cereal/);
 const whites=guides[catalogue.find(r=>r.code==='B004').id].text;assert.doesNotMatch(whites,/combination of whole egg and egg white/);
});
test('all 310 guides render into distinct titled sections and stale recipe revisions hide their source links',()=>{
 const guideFunctions=evaluate(read('lib/dietaryGuides.ts'),{require:()=>({default:guides})});
 for(const r of catalogue){const sections=guideFunctions.getDietaryGuideSections(guideFunctions.getDietaryGuide(r));assert.ok(sections.length>=8,r.code);assert.equal(new Set(sections.map(s=>s.title)).size,sections.length,r.code);for(const title of ['Protein','Carbohydrates','Potassium','Phosphorus','Cooking and adaptations'])assert.ok(sections.some(s=>s.title===title),r.code+' '+title);assert.ok(guideFunctions.getDietaryGuideReferences(r).length>=4);assert.equal(guideFunctions.getDietaryGuideReferences({...r,method:['Unreviewed replacement method.']}).length,0);}
});
