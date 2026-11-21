import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {catalogue,evaluate,read,restoreRecipeBeforePhotoFileCleanup} from './recipeCorrectionTestSupport.mjs';
const cleanup=JSON.parse(read('data/RecipeData/evidence/photo-file-cleanup-2026-11-21.json'));
const plain=x=>JSON.parse(JSON.stringify(x));
test('52 PNG conversions and six lunch replacements use verified standard WebPs with no obsolete public files',()=>{
 assert.equal(cleanup.recipes.length,58);let before=0,after=0;
 for(const r of cleanup.recipes){
  const current=catalogue.find(x=>x.code===r.code);assert.equal(current.image,r.after);
  assert.equal(r.after,'/images/recipes/'+r.code+'.webp');
  assert.equal(fs.existsSync(new URL('../public'+r.before,import.meta.url)),false,r.before);
  const b=fs.readFileSync(new URL('../public'+r.after,import.meta.url));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');
  assert.equal(createHash('sha256').update(b).digest('hex'),r.outputSha256,r.code);assert.equal(b.length,r.afterBytes);
  if(r.code.startsWith('D')){assert.ok(r.afterBytes<r.beforeBytes);before+=r.beforeBytes;after+=r.afterBytes;}
  else assert.equal(r.outputSha256,r.inputSha256,r.code+' current lunch photo preserved');
 }
 assert.ok(after<before);
 assert.equal(fs.readdirSync(new URL('../public/images/recipes/',import.meta.url)).filter(x=>/\.png$/i.test(x)).length,0);
 for(const r of catalogue)assert.ok(fs.existsSync(new URL('../public'+r.image,import.meta.url)),r.code);
});
test('image-path cleanup preserves all recipe IDs, page links, nutrition, ingredients and methods',()=>{
 let checked=0;
 for(const file of ['breakfasts','lunches','dinners','rangeAdditions']){
  const source=execFileSync('git',['show',cleanup.baselineCommit+':data/RecipeData/'+file+'.ts'],{encoding:'utf8',maxBuffer:1e7});
  for(const list of Object.values(evaluate(source)).filter(Array.isArray))for(const before of list){
   const current=catalogue.find(r=>r.code===before.code);assert.equal(current.id,before.id);
   assert.deepEqual(plain(restoreRecipeBeforePhotoFileCleanup(current)),plain(before),before.code);checked++;
  }
 }
 assert.equal(checked,317);
 const current=plain(catalogue.find(r=>r.code==='D001'));current.image='/images/recipes/unapproved.webp';
 assert.throws(()=>restoreRecipeBeforePhotoFileCleanup(current));
});
test('every removed PNG and versioned URL permanently redirects to its existing standard WebP',async()=>{
 const config=evaluate(read('next.config.ts'),{process,require:name=>{assert.equal(name,'./data/RecipeData/evidence/photo-file-cleanup-2026-11-21.json');return {default:cleanup};}}).default;
 const redirects=await config.redirects();
 for(const r of cleanup.recipes){const matches=redirects.filter(x=>x.source===r.before);assert.equal(matches.length,1);assert.equal(matches[0].destination,r.after);assert.equal(matches[0].permanent,true);}
 assert.equal(new Set(redirects.map(r=>r.source)).size,redirects.length);
});
