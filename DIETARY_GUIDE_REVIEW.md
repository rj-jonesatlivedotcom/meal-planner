# Dietary Guide validation

Reviewed 18 October 2026. Historical card: `0fb7477:app/recipes/[id]/page.tsx` displayed dietaryNote. Original wording: `0fb7477:data/recipes.ts`; later recipe-specific wording: `e39569c^:data/RecipeData/{breakfasts,lunches,dinners}.ts`. The older collection contains retired recipes, so matching by name or transferring notes between similar dishes was avoided. Current recipe identity, ingredients, quantities, method and servings are the basis for each decision.

The display uses a separate reviewed catalog; recipes, nutrition, existing dietaryNote and clinical-review flags are unchanged. No purine bands, overall suitability judgments, numerical reductions or claims that leaching is accounted for in calculations were restored. Catalog fingerprints invalidate advice after ingredient, quantity, method or serving changes.

Boiling guidance is limited to L028�L030, D023 and D040, whose methods boil and drain potatoes. L025�L027 explicitly retain their microwave/oven method. General boiling/discarding-water support: https://kidneycareuk.org/get-support/healthy-diet-support/cooking-with-kidney-disease/eating-potatoes-with-ckd/ . Additive label checks: https://www.nbt.nhs.uk/our-services/a-z-services/nutrition-dietetics/nutrition-dietetics-patient-information-kidney-disease/eating-well-lower-blood-potassium-phosphate-levels . No additional preparation steps are prescribed.

## Recipes where historical advice was not reused

These receive: �Use the ingredient amounts and serving size shown when planning this meal. Compare the nutrition information with your saved My Diet targets and any advice from your renal team.�

| Code | Recipe | Reason |
| --- | --- | --- |
| B004 | Egg White & Chive Toast (egg-white-chive-toast) | Optional buttering advice is not supported by the current measured-butter method. |
| B006 | Cinnamon French Toast with Jam (cinnamon-french-toast-with-jam) | Only generic target-comparison wording was available. |
| B007 | Egg, Tomato & Onion Buttered Toast (egg-tomato-onion-buttered-toast) | Optional buttering advice is not supported by the current measured-butter method. |
| B008 | Marmalade & Butter Breakfast Toast (jam-butter-breakfast-toast) | Optional buttering advice is not supported by the current measured-butter method. |
| B011 | Blueberry & Apple Toast (blueberry-apple-toast) | Only generic target-comparison wording was available. |
| B012 | Cinnamon Apple Toast (cinnamon-apple-toast) | Optional buttering advice is not supported by the current measured-butter method. |
| B013 | Strawberry & Cream Cheese Toast (strawberry-cream-cheese-toast) | Only generic target-comparison wording was available. |
| B024 | Boiled Egg & Soldiers (boiled-egg-soldiers) | Optional buttering advice is not supported by the current measured-butter method. |
| B042 | Three-Egg Cheese Omelette (three-egg-cheese-omelette) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| B043 | Three-Egg Mushroom Omelette (three-egg-mushroom-omelette) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| B045 | Mixed Berry Overnight Oats (mixed-berry-overnight-oats) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| B046 | Apple & Cinnamon Overnight Oats (apple-cinnamon-overnight-oats) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| B047 | Peanut Butter & Greek Yoghurt Overnight Oats (peanut-butter-greek-yoghurt-overnight-oats) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| B048 | Blueberry & Cottage Cheese Overnight Oats (blueberry-cottage-cheese-overnight-oats) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| L002 | Egg & Lettuce Sandwich (egg-lettuce-sandwich) | Only generic target-comparison wording was available. |
| L007 | Egg & Lettuce Sandwich with Chives (ham-lettuce-sandwich) | Historical note mentions ham, absent from current ingredients; current method also omits the listed eggs. |
| L009 | Chicken & Lettuce Wrap (chicken-lettuce-wrap) | Only generic target-comparison wording was available. |
| L012 | Chicken & Cucumber Wrap (chicken-cucumber-wrap) | Only generic target-comparison wording was available. |
| L013 | Chicken & Pepper Pasta (chicken-pepper-pasta) | Only generic target-comparison wording was available. |
| L014 | Creamy Chicken Pasta (creamy-chicken-pasta) | Only generic target-comparison wording was available. |
| L017 | Chicken & Onion Pasta (chicken-onion-pasta) | Only generic target-comparison wording was available. |
| L018 | Chicken & Mushroom Pasta (chicken-mushroom-pasta) | Only generic target-comparison wording was available. |
| L020 | Chicken Fried Rice (chicken-fried-rice) | Only generic target-comparison wording was available. |
| L021 | Egg & Pepper Rice Bowl (egg-pepper-rice-bowl) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| L022 | Chicken & Onion Rice Bowl (chicken-onion-rice-bowl) | Only generic target-comparison wording was available. |
| L024 | Chicken & Noodle Bowl (chicken-noodle-bowl) | Only generic target-comparison wording was available. |
| L031 | Chicken & Pepper Omelette (chicken-pepper-omelette) | Only generic target-comparison wording was available. |
| L032 | Mushroom & Chive Omelette (mushroom-chive-omelette) | Only generic target-comparison wording was available. |
| L034 | Chicken & Pepper Toastie (chicken-pepper-toastie) | Current method does not explicitly cook listed raw chicken; do not restore preparation-related or reassuring advice. |
| L036 | Chicken & Apple Sandwich (chicken-apple-sandwich) | Only generic target-comparison wording was available. |
| L038 | Chicken & Cream Cheese Wrap (chicken-cream-cheese-wrap) | Current method does not explicitly cook listed raw chicken; do not restore preparation-related or reassuring advice. |
| L040 | Chicken & Onion Pasta Salad (chicken-onion-pasta-salad) | Only generic target-comparison wording was available. |
| L041 | Chicken & Leek Couscous Bowl (chicken-leek-couscous-bowl) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| L042 | Turkey & Cucumber Pitta (turkey-cucumber-pitta) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| L044 | Egg & Leek Rice Bowl (egg-leek-rice-bowl) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| L045 | Chicken & Carrot Noodle Salad (chicken-carrot-noodle-salad) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| L046 | Turkey & Apple Couscous Salad (turkey-apple-couscous-salad) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| L047 | Cod & Cucumber Pasta Salad (cod-cucumber-pasta-salad) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| L048 | Chicken & Leek Toasted Pitta (chicken-leek-toasted-pitta) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D005 | Lemon Salmon with Rice & Cabbage (lemon-salmon-rice) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| D014 | Chicken & Sweetcorn Rice Bowl (chicken-sweetcorn-rice-bowl) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| D015 | Turkey, Rice & Roasted Peppers (turkey-rice-roasted-peppers) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| D032 | Cod, Pepper & Lemon Rice (cod-pepper-lemon-rice) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| D033 | Beef, Cabbage & Rice (beef-cabbage-rice) | Historical nutrient comparison, classification or broad description is insufficient for specific advice without further review. |
| D041 | Chicken & Leek Couscous with Lemon (chicken-leek-couscous-lemon) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D042 | Turkey Meatballs with Herb Rice (turkey-meatballs-herb-rice) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D043 | Cod with Herby Noodles & Cucumber (cod-herby-noodles-cucumber) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D044 | Pork Medallions with Apple & Leek (pork-apple-leek-rice) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D045 | Chicken & Carrot Noodle Stir-Fry (chicken-carrot-noodle-stir-fry) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D046 | Beef Meatballs with Couscous & Peppers (beef-meatballs-couscous-peppers) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D047 | Haddock with Lemon Rice & Leeks (haddock-lemon-rice-leeks) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D048 | Chicken & Pear Rice Bowl (chicken-pear-rice-bowl) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D049 | Pork & Carrot Couscous Skillet (pork-carrot-couscous-skillet) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D050 | Cod & Leek Pasta Bake (cod-leek-pasta-bake) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D051 | Turkey & Apple Noodle Bowl (turkey-apple-noodle-bowl) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |
| D052 | Chicken Herb Meatballs with Rice (chicken-herb-meatballs-rice) | Historical text describes calculation provenance or planning bands, not reusable recipe advice. |

## Retained or adapted guidance

Only the supported portions of historical notes were retained. Ingredient and portion reminders reflect current quantities; optional buttering, outdated classifications and source disclosures are omitted from guide text.

| Code | Recipe | Validated guide |
| --- | --- | --- |
| B001 | Scrambled Egg & Tomato Toast | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B002 | Apple & Honey Porridge | This serving uses 50 g oats and 200 ml milk, with apple and honey. Oats, milk and apple contribute potassium and phosphorus; use the listed portions when comparing this breakfast with your My Diet targets. |
| B003 | Egg, Tomato & Onion Toast | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B005 | Egg, Pepper & Onion Toast | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B009 | Savoury Oats with Egg, Tomato & Pepper | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B010 | Apple & Honey French Toast | Apple contributes potassium, while milk and egg contribute phosphorus. Check the bread ingredient list for added phosphates. |
| B014 | Egg & Pepper Breakfast Wrap | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B015 | Apple & Cinnamon Pancakes | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B016 | Blueberry Yoghurt Toast | This serving includes 100 g yoghurt and 75 g blueberries. Yoghurt contributes potassium and phosphorus; check the yoghurt and bread ingredient lists for added phosphates. |
| B017 | Egg & Chive Breakfast Muffin | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B018 | Strawberry & Maple Pancakes | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B019 | Apple & Cream Cheese Bagel | Apple contributes potassium and cream cheese contributes phosphorus. Check the cream cheese and bagel ingredient lists for added phosphates, as products vary by brand. |
| B020 | Egg & Apple Breakfast Wrap | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B021 | Scrambled Egg & Mushroom Toast | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B022 | Cornflakes, Toast & Jam | Nutrient values depend on the cereal and bread used. Use the listed 30 g cornflakes and 50 ml milk when comparing this serving with your My Diet targets. |
| B023 | Egg, Onion & Pepper Wrap | Tortillas vary by brand. Check the ingredient list for added phosphates when choosing the wrap for this recipe. |
| B025 | Blueberry & Cream Cheese Toast | Cream cheese contributes phosphorus. Check the ingredient list for added phosphates, as products vary by brand. |
| B026 | Mushroom & Egg Breakfast Muffin | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B027 | Strawberry & Apple French Toast | Strawberries, apple and milk contribute potassium; milk and egg contribute phosphorus. Keep to the listed fruit and milk portions when comparing this breakfast with your My Diet targets. |
| B028 | Apple & Yoghurt Toast | This serving uses 100 g yoghurt and 100 g apple. Yoghurt contributes potassium and phosphorus; check the yoghurt and bread ingredient lists for added phosphates. |
| B029 | Egg & Tomato Breakfast Muffin | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B030 | Blueberry & Apple Pancakes | Apple and blueberries contribute potassium, while milk and egg contribute phosphorus. Use the listed fruit and milk portions when planning this breakfast. |
| B031 | Back Bacon & Egg Breakfast Muffin | This recipe uses one rasher of back bacon. Keep to that portion and check the product label for salt, as brands vary. |
| B032 | Plain Pancakes with Jam | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B033 | Egg, Tomato & Pepper Toast | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B034 | Strawberry & Apple Pancakes | Strawberries and apple contribute potassium, while milk and egg contribute phosphorus. Use the listed fruit and milk portions when planning this breakfast. |
| B035 | Boiled Egg, Chive & Cream Cheese Toast | Cream cheese and bread vary by brand. Check their ingredient lists for added phosphates. |
| B036 | Back Bacon & Tomato Toast | This recipe uses one rasher of back bacon. Keep to that portion and check the product label for salt, as brands vary. |
| B037 | Egg & Pepper Breakfast Muffin | Includes 50 g liquid egg whites to increase protein; the recorded nutrition totals include this ingredient. Compare the serving with your own My Diet targets. |
| B038 | Egg White & Herb Breakfast Muffin | This recipe uses two egg whites without cheese or processed meat. Compare the full serving with your My Diet targets. |
| B039 | Egg, Tomato & Onion Breakfast Wrap | Check the tortilla and cream cheese ingredient lists for added phosphates, as products vary by brand. |
| B040 | Apple & Blueberry French Toast | Apple and blueberries contribute potassium, while milk and egg contribute phosphorus. Use the listed fruit and milk portions when planning this breakfast. |
| B041 | Three-Egg Plain Omelette | This omelette uses three eggs, with butter and parsley, without cheese or processed meat. Compare the full three-egg serving with your My Diet targets. |
| B044 | Three-Egg Ham Omelette | Ham products vary by brand. Check the label for the 25 g portion used in this omelette. |
| B049 | Cornflakes & Milk | Use the listed 30 g cereal and 125 ml milk when comparing this breakfast with your My Diet targets. Cereal brands can differ from the generic values used here. |
| B050 | Weetabix & Milk | Use the listed two wheat biscuits and 125 ml milk when comparing this breakfast with your My Diet targets. Cereal brands can differ from the generic values used here. |
| L001 | Chicken & Lettuce Sandwich | Chicken provides protein. This serving uses 75 g raw chicken; compare the full sandwich with your My Diet targets. |
| L003 | Tuna & Lettuce Sandwich | The tuna is canned in brine. Use the listed drained portion and check the product label for salt, as brands vary. |
| L004 | Chicken & Cucumber Sandwich | Chicken provides protein. This serving uses 75 g raw chicken; compare the full sandwich with your My Diet targets. |
| L005 | Egg Mayo Sandwich | Egg is the main protein source. The serving includes two eggs and 25 g mayonnaise; use these portions when planning your lunch. |
| L006 | Chicken & Red Pepper Sandwich | Chicken provides protein. This serving uses 70 g raw chicken; compare the full sandwich with your My Diet targets. |
| L008 | Chicken & Cream Cheese Sandwich | Chicken provides protein and cream cheese contributes phosphorus. Check the cream cheese ingredient list for added phosphates. |
| L010 | Tuna Mayo Wrap | The tuna is canned in brine. Use the listed drained portion and check the product label for salt, as brands vary. |
| L011 | Egg & Chive Wrap | Egg is the main protein source. Check the tortilla ingredient list for added phosphates. |
| L015 | Tuna & Pepper Pasta | The tuna is canned in brine. Use the listed drained portion and check the product label for salt, as brands vary. |
| L016 | Egg & Cream Cheese Pasta | Egg provides protein and cream cheese contributes phosphorus. Check the cream cheese ingredient list for added phosphates. |
| L019 | Tuna & Cream Cheese Pasta | The tuna is canned in brine. Use the listed drained portion and check the product label for salt, as brands vary. |
| L023 | Tuna & Egg Rice Bowl | The tuna is canned in brine. Use the listed drained portion and check the product label for salt, as brands vary. |
| L025 | Chicken Jacket Potato | The 200 g potato is microwaved, then finished in an oven or air fryer. It is not boiled and drained. If you have a potassium limit, compare the full serving with your My Diet targets. |
| L026 | Tuna Jacket Potato | The 200 g potato is microwaved, then finished in an oven or air fryer. It is not boiled and drained. If you have a potassium limit, compare the full serving with your My Diet targets. |
| L027 | Egg Mayo Jacket Potato | The 200 g potato is microwaved, then finished in an oven or air fryer. It is not boiled and drained. If you have a potassium limit, compare the full serving with your My Diet targets. |
| L028 | Chicken Potato Hash | The method boils the potatoes and drains away the cooking water. This can help lower potassium, but does not remove it all. Keep to the listed potato portion and compare the full serving with your My Diet targets. |
| L029 | Egg & Potato Hash | The method boils the potatoes and drains away the cooking water. This can help lower potassium, but does not remove it all. Keep to the listed potato portion and compare the full serving with your My Diet targets. |
| L030 | Tuna Potato Salad | The method boils the potatoes and drains away the cooking water. This can help lower potassium, but does not remove it all. Keep to the listed potato portion and compare the full serving with your My Diet targets. |
| L033 | Egg & Pepper Toast | Egg is the main protein source. This serving uses two eggs with toast and pepper; compare the full serving with your My Diet targets. |
| L035 | Tuna & Cucumber Toastie | The tuna is canned in brine. Use the listed drained portion and check the product label for salt, as brands vary. |
| L037 | Egg & Cucumber Sandwich | Egg is the main protein source. This serving uses two eggs with bread, cucumber and mayonnaise; compare the full serving with your My Diet targets. |
| L039 | Tuna & Cream Cheese Wrap | The tuna is canned in brine. Use the listed drained portion and check the product label for salt, as brands vary. |
| L043 | Tuna & Sweetcorn Pasta Salad | The tuna is canned in brine. Use the listed drained portion and check the product label for salt, as brands vary. |
| D001 | Lemon & Herb Chicken with Rice | Chicken provides protein and contributes phosphorus. This serving uses 70 g chicken with rice and vegetables; keep to the listed portions. |
| D002 | Rosemary Turkey with Rice & Vegetables | Turkey provides protein and contributes phosphorus. This serving uses 60 g turkey with rice and vegetables; keep to the listed portions. |
| D003 | Herb-Grilled Pork with Rice & Vegetables | Pork provides protein and contributes phosphorus. This serving uses 80 g pork with rice and vegetables; keep to the listed portions. |
| D004 | Lemon Cod with Rice & Cabbage | Cod provides protein. Rice and cabbage form the main accompaniment; compare the full serving with your My Diet targets. |
| D006 | Paprika Beef with Rice & Cabbage | Beef provides protein and contributes phosphorus. Use the listed 100 g mince portion when planning this dinner. |
| D007 | Creamy Egg & Cheddar Pasta with Cabbage | Cheddar contributes phosphorus. Keep to the listed 20 g cheese portion alongside the eggs, pasta and cabbage. |
| D008 | Paprika Chicken with Rice & Peppers | Chicken provides protein and rice is the main carbohydrate source. Paprika flavours the dish without a prepared sauce. |
| D009 | Creamy Pork & Herb Pasta | Pork provides protein and contributes phosphorus. Keep to the listed pork and cream portions when planning this pasta dinner. |
| D010 | Egg, Cheddar & Cauliflower Rice Bowl | Cheddar contributes phosphorus. Keep to the listed 20 g cheese portion alongside the eggs, rice and cauliflower. |
| D011 | Creamy Chicken & Mushroom Rice | Chicken and mushrooms add savoury flavour without a prepared sauce. Keep to the listed cream portion when planning this dinner. |
| D012 | Turkey & Sweetcorn Pasta | The recipe uses a measured 100 g turkey portion with pasta, sweetcorn and cabbage. Parsley, pepper and lemon provide seasoning without added salt. |
| D013 | Lemon Cod with Pasta & Peppers | Cod provides protein, with pasta and vegetables as the accompaniment. Lemon, parsley and pepper provide seasoning without added salt. |
| D016 | Pork & Apple Rice Bowl | Apple adds sweetness to the pork and rice without added sugar. Pork provides protein; use the listed portions when planning this dinner. |
| D017 | Creamy Chicken & Cabbage Pasta | Cabbage adds volume to this chicken pasta. Keep to the listed 40 ml cream portion when comparing the full meal with your My Diet targets. |
| D018 | Cod, Sweetcorn & Rice | Cod provides protein and rice is the main carbohydrate source. Lemon, parsley and pepper provide seasoning without added salt. |
| D019 | Egg & Vegetable Pasta | This is an egg-based dinner without meat or fish. Use the listed pasta and vegetable portions when planning the full meal. |
| D020 | Chicken & Apple Couscous-Style Rice | Apple adds sweetness, while herbs, lemon and pepper flavour the chicken and rice without added salt. |
| D021 | Chicken, Herb & Sweetcorn Rice | Chicken provides protein, with rice and vegetables. Thyme and pepper provide seasoning without added salt. |
| D022 | Beef & Pepper Pasta | Beef provides protein, while pepper, onion and oregano add flavour without added salt. |
| D023 | Herb Cod with Potatoes & Cabbage | The method boils the potatoes and drains away the cooking water. This can help lower potassium, but does not remove it all. Keep to the listed potato portion and compare the full serving with your My Diet targets. |
| D024 | Creamy Cheese & Egg Pasta | Egg and cheese provide protein without meat or fish. Keep to the listed 25 g Cheddar and 100 ml milk when planning this pasta dinner. |
| D025 | Pork, Apple & Cabbage | Apple adds sweetness to pork and cabbage, with rosemary for flavour instead of a prepared sauce. |
| D026 | Creamy Chicken & Pepper Pasta | Chicken, pepper, onion and thyme flavour this pasta. Keep to the listed 50 ml cream portion when planning the meal. |
| D027 | Cod, Sweetcorn & Herb Pasta | Lemon and herbs flavour the cod and pasta instead of a prepared sauce. |
| D028 | Egg, Cabbage & Sweetcorn Rice | This egg-based rice dinner uses cabbage and sweetcorn, with pepper for seasoning and no added salt. |
| D029 | Pork & Pepper Pasta | Pork provides protein, with rosemary and pepper for flavour. Use the listed pasta and pork portions when planning the meal. |
| D030 | Pork & Apple Cabbage Skillet | Apple adds sweetness to pork and cabbage, with rosemary for flavour. Include the listed rice portion when planning the full meal. |
| D031 | Lemon Chicken & Herb Pasta | Chicken provides protein, with lemon and parsley for flavour instead of added salt. |
| D034 | Cheesy Egg & Vegetable Rice | This egg-based rice dinner includes Cheddar for flavour. Keep to the listed 20 g cheese portion when planning the meal. |
| D035 | Chicken, Cabbage & Herb Rice | Chicken and rice are paired with cabbage and rosemary. Use the listed butter portion when planning the full meal. |
| D036 | Cod & Cabbage Pasta | Cod provides protein, with cabbage and lemon for flavour. Use the listed pasta portion when planning the full meal. |
| D037 | Pepper Beef & Rice | Beef provides protein, with pepper, onion and oregano for flavour instead of a prepared sauce. |
| D038 | Pork & Apple Herb Pasta | Apple adds sweetness to pork and pasta, with rosemary for flavour. |
| D039 | Egg, Cauliflower & Herb Pasta | This egg-based pasta dinner uses cauliflower and parsley without meat or fish. Use the listed portions when planning the full meal. |
| D040 | Cod & Sweetcorn Potato Bake | The method boils the potatoes and drains away the cooking water. This can help lower potassium, but does not remove it all. Keep to the listed potato portion and compare the full serving with your My Diet targets. |
