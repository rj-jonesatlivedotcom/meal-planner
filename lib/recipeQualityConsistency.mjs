// Lexical consistency screening: candidates require editorial judgement.
// Component names and collective terms are recognised; no nutrient conclusions are inferred.
const anchors=[
[/yoghurt|yogurt/i,/yoghurt|yogurt/], [/breadcrumb/i,/crumb/],
[/cabbage|carrot|courgette|cauliflower|spinach|leek|onion|mushroom|cucumber|lettuce|radish|daikon/i,/cabbage|carrot|courgette|cauliflower|spinach|leek|onion|mushroom|cucumber|lettuce|radish|daikon|salad|vegetable|slaw/],

[/bread|pitta|baguette|bagel|muffin/i,/bread|pitta|baguette|bagel|muffin|toast|crouton/],
[/mayonnaise/i,/mayonnaise|mayo|dressing/], [/shallot/i,/shallot|aromatics/], [/coriander.*seed/i,/coriander|spice/], [/beef/i,/beef|steak|sirloin|meat/], [/barley/i,/barley|grain|pilaf/],

[/egg[- ]free.*pasta/i,/pasta/], [/egg white/i,/egg|white/], [/egg|^Eggs, chicken/i,/egg/],
[/chicken|turkey|pork|lamb|beef/i,/chicken|turkey|pork|lamb|beef|meat|kofta|keema/],
[/cod|salmon|haddock|hake/i,/cod|salmon|haddock|hake|fish/], [/tuna/i,/tuna|fish/],
[/gluten/i,/gluten|seitan/], [/tofu/i,/tofu/], [/cream cheese/i,/cream cheese|spread/], [/cheddar|mozzarella|feta|ricotta|parmesan|cottage cheese/i,/cheese|cheddar|mozzarella|feta|ricotta|parmesan/],
[/cornflour/i,/cornflour|starch/], [/cornmeal/i,/cornmeal|polenta/], [/masa harina/i,/masa|cornmeal/], [/flour/i,/flour|dough|batter|dry ingredients/],
[/rice.*noodle|noodle/i,/noodle/], [/rice/i,/rice/], [/pasta|cannelloni|vermicelli/i,/pasta|cannelloni|vermicelli/], [/bread|pitta|baguette|bagel|muffin/i,/bread|pitta|baguette|bagel|muffin|toast|crouton/], [/tortilla|wrap/i,/tortilla|wrap/],
[/coconut/i,/coconut/], [/milk/i,/milk/], [/cream/i,/cream/], [/yoghurt|yogurt/i,/yoghurt|yogurt/], [/oil/i,/oil|dressing/], [/butter/i,/butter/],
[/beansprout/i,/sprout/], [/green bean/i,/bean|vegetable/], [/bean|lentil|chickpea|black-eyed pea/i,/bean|lentil|chickpea|black-eyed pea|pulse/],
[/walnut|peanut|almond/i,/walnut|peanut|almond|nut|groundnut/], [/pumpkin seed/i,/seed/], [/sesame seed/i,/sesame|seed/],
[/soy sauce/i,/soy|marinade|sauce/], [/fish sauce/i,/fish sauce|marinade|sauce/], [/vinegar/i,/vinegar|dressing|pickle/], [/sugar/i,/sugar/], [/salt/i,/salt|season/], [/water/i,/water|liquid|stock|broth/],
[/pepper.*(red|green)|red.*pepper|green.*pepper|bell pepper/i,/pepper|vegetable/], [/black pepper/i,/pepper|season|spice/],
[/coriander.*leaves|fresh coriander/i,/coriander|herb/], [/chiv|parsley|basil|mint|oregano|rosemary|thyme/i,/chiv|parsley|basil|mint|oregano|rosemary|thyme|herb/],
[/cumin|turmeric|paprika|cinnamon|cardamom|clove|fennel|allspice|cayenne|nutmeg|caraway|saffron|mustard seed|ginger.*ground|ground ginger/i,/cumin|turmeric|paprika|cinnamon|cardamom|clove|fennel|allspice|cayenne|nutmeg|caraway|saffron|mustard|ginger|spice/],
[/lemon|lime/i,/lemon|lime|citrus|dressing/], [/tomato/i,/tomato|vegetable/], [/cabbage|carrot|courgette|cauliflower|spinach|leek|onion|mushroom|cucumber|lettuce|radish|daikon/i,/cabbage|carrot|courgette|cauliflower|spinach|leek|onion|mushroom|cucumber|lettuce|radish|daikon|salad|vegetable|slaw/],
[/apple|pear|blueberr|strawberr|raspberr|pineapple|raisin|apricot|orange/i,/apple|pear|blueberr|strawberr|raspberr|pineapple|raisin|apricot|orange|fruit|berr/],
[/oat/i,/oat|porridge/], [/cornflake|wheat biscuit/i,/cornflake|biscuit|cereal/], [/couscous/i,/couscous/], [/bulgur/i,/bulgur/], [/barley/i,/barley/], [/quinoa/i,/quinoa/], [/potato/i,/potato/], [/plantain/i,/plantain/], [/avocado/i,/avocado/], [/sweetcorn/i,/sweetcorn|corn/], [/peas/i,/pea|vegetable/],
[/garlic/i,/garlic|aromatics/], [/ginger/i,/ginger|aromatics/], [/lemongrass/i,/lemongrass|aromatics/], [/galangal/i,/galangal|aromatics/], [/chilli/i,/chilli|spice/], [/curry leaves/i,/curry leaves|spice/], [/yeast/i,/yeast/], [/tamarind/i,/tamarind/], [/pastry/i,/pastry|filo/], [/honey/i,/honey/], [/maple/i,/maple|syrup/], [/marmalade|jam/i,/jam|marmalade/], [/bacon|ham/i,/bacon|ham/]
];

export function inspectRecipeConsistency(recipe,guideText){
 const method=recipe.method.join(' ').toLowerCase();
 const ingredientCandidates=recipe.ingredients.filter(i=>{
  const anchor=anchors.find(([pattern])=>pattern.test(i.item));
  if(anchor?.[1].test(method))return false;
  const component=i.quantity.match(/\(([^;]+);/i)?.[1];
  if(component&&method.includes('all '+component+' ingredients'))return false;
  if(/vinegar/i.test(i.item)&&/mix the dipping sauce ingredients/.test(method))return false;
  if(/pepper|turmeric|cayenne/i.test(i.item)&&/spices|seasonings/.test(method))return false;
  return true;
 }).map(i=>i.item);
 const issues=[];
 if(!recipe.method.length||recipe.method.some(s=>!s.trim()))issues.push('Empty method');
 if(recipe.method.some(s=>/\b(and|then|until|with)\s*$/.test(s)))issues.push('Unfinished method sentence');
 if(/where specified|pans or trays specified|saucepan or frying pan/.test(recipe.equipment))issues.push('Placeholder equipment');
 if(/thermometer|75\s*(?:\u00b0?c| c)/i.test(method)&&!/probe|thermometer/i.test(recipe.equipment))issues.push('Thermometer missing from equipment');
 if(/\b(?:oven|bake|roast)\b/i.test(method)&&!/oven/i.test(recipe.equipment))issues.push('Oven missing from equipment');
 if(/\b(?:steam|steamer)\b/i.test(method)&&!/steam/i.test(recipe.equipment))issues.push('Steamer missing from equipment');
 if(recipe.ingredients.some(i=>/liquid egg white/i.test(i.item))&&/beat the egg/.test(method)&&/crack (?:in the egg|the egg into the (?:pan|clear space))/.test(method))issues.push('Beaten egg later cracked into pan');
 if(!/^[0-9]+ (?:mins|minutes)(?:, plus [0-9-]+ hours fermentation)?$/.test(recipe.cookingTime))issues.push('Unrecognised duration');
 if(!recipe.ingredients.some(i=>/\brice\b/i.test(i.item)&&!/flour|noodle/.test(i.item))&&/check that a grain is tender|grains stay separate/.test(method))issues.push('Grain technique without grain rice');
 if(guideText&&/main (?:potassium|phosphorus) contributor|keep its portion separate/.test(guideText))issues.push('Unsupported or generic guide phrase');
 const cookedWeightCandidates=recipe.ingredients.filter(i=>/grilled|baked|boiled/i.test(i.item)&&!/(?:cooked|drained|boiled) (?:edible )?weight/i.test(i.quantity)).map(i=>i.item);
 return{code:recipe.code,ingredientCandidates,issues,cookedWeightCandidates};
}
