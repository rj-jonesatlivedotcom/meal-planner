import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

export const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
export function evaluate(source, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText, {exports,...globals});
  return exports;
}
export const quantities = evaluate(read('lib/recipeQuantities.ts'));
export const catalogue = ['breakfasts','lunches','dinners'].flatMap(name => evaluate(read(`data/RecipeData/${name}.ts`))[name]);
// Check the authorised discovery metadata before reconstructing historical audit stages.
const discoveryReview = JSON.parse(read('data/recipeDiscoveryReview.json'));
export const catalogueBeforeDiscoveryReview = catalogue.map(recipe => {
  const record = discoveryReview.recipes.find(r => r.code === recipe.code);
  if (!record) return recipe;
  const previous = { ...recipe };
  for (const field of record.changedFields) {
    if (JSON.stringify(recipe[field]) !== JSON.stringify(record.after[field])) throw Error(recipe.code + ' differs from the discovery review: ' + field);
    if (Object.hasOwn(record.before, field)) previous[field] = record.before[field];
    else delete previous[field];
  }
  return previous;
});
// Verify the cooking corrections before reconstructing the earlier audit stage.
const cookingReview = JSON.parse(read('data/recipeCookingReview.json'));
export const catalogueBeforeCookingReview = catalogueBeforeDiscoveryReview.map(recipe => {
  const record = cookingReview.recipes.find(r => r.code === recipe.code);
  if (!record) return recipe;
  for (const field of record.changedFields) {
    if (JSON.stringify(recipe[field]) !== JSON.stringify(record.after[field])) {
      throw Error(recipe.code + ' differs from the cooking review: ' + field);
    }
  }
  return { ...recipe, ...record.before };
});
// Historical stage tests inspect the exact earlier stage, after checking every
// subsequent editorial property against its explicit before/after record.
const finalEditorial = JSON.parse(read('data/recipeQualityReview.json'));
export const catalogueBeforeFinalEditorial = catalogueBeforeCookingReview.map(recipe => {
  const record = finalEditorial.recipes.find(r => r.code === recipe.code);
  if (!record) return recipe;
  for (const field of record.changedFields) {
    if (JSON.stringify(recipe[field]) !== JSON.stringify(record.after[field])) {
      throw Error(recipe.code + ' differs from the final editorial record: ' + field);
    }
  }
  return { ...recipe, ...record.before };
});
// Earlier stage-preservation tests use the recorded pre-resolution recipes.
// Assert the exact authorised result first: this must never hide later drift.
export const nutritionResolution = JSON.parse(read('data/RecipeData/evidence/nutrition-gap-resolution.json'));
export const catalogueBeforeNutritionResolution = catalogueBeforeFinalEditorial.map(recipe => {
  const record = nutritionResolution.recipes.find(r => r.code === recipe.code);
  if (!record) return recipe;
  if (JSON.stringify(recipe) !== JSON.stringify(record.after)) throw Error(recipe.code + ' differs from the audited nutrition resolution');
  return record.before;
});
export function shoppingHarness(source = read('app/shopping/page.tsx')) {
  const ast = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const helpers = ast.statements.filter(n=>ts.isVariableStatement(n)||(ts.isFunctionDeclaration(n)&&n.name?.text!=='ShoppingPage')).map(n=>n.getText(ast)).join('\n');
  let effect;
  function visit(n) {
    if(ts.isCallExpression(n)&&n.expression.getText(ast)==='useEffect'&&n.arguments[0]?.getText(ast).includes('const combined: ShoppingItem[]'))effect=n.arguments[0].getText(ast);
    ts.forEachChild(n,visit);
  }
  visit(ast);
  if(!effect)throw Error('Shopping effect not found');
  const exported = helpers+'\nexports.helpers={parseQuantity,formatQuantity,normaliseUnit,normaliseIngredient,combineQuantity,normaliseShoppingQuantity,recipeServings,finaliseShoppingQuantity};';
  const loaded=evaluate(exported,quantities);
  function run(recipes, counts = {}, checked = []) {
    let list,remaining;
    evaluate(helpers+'\n('+effect+')();',{
      ...quantities,loaded:true,recipes,selectedRecipes:recipes.map(r=>r.id),plannerCounts:counts,
      setShoppingList:value=>list=value,setCheckedItems:fn=>remaining=fn(checked),
    });
    return {list:JSON.parse(JSON.stringify(list)),checked:JSON.parse(JSON.stringify(remaining))};
  }
  return {...loaded.helpers,run};
}
export function nutritionHarness(recipes) {
  const source=read('app/nutrition/page.tsx'),ast=ts.createSourceFile('page.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const names=['getNutritionNumber','getRecipe','getDayTotals','getMealTotals','addTotals'];
  const pieces=ast.statements.filter(n=>(ts.isFunctionDeclaration(n)&&names.includes(n.name?.text))||(ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>d.name.getText(ast)==='emptyTotals'))).map(n=>n.getText(ast));
  return evaluate(pieces.join('\n')+'\nexports.getMealTotals=getMealTotals;exports.getDayTotals=getDayTotals;', {recipes,mealTypes:['Breakfast','Lunch','Dinner']});
}
