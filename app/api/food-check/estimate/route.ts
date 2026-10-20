import { createClient } from "@/lib/supabase/server";
import { usdaClient } from "@/app/FoodCheck/usda.server";
import { createReferenceSearch, type ReferenceCache } from "@/app/FoodCheck/referenceSearch.server";
import type { CategoryProduct } from "@/app/FoodCheck/categoryMinerals";

export const runtime = "nodejs";
const cache: ReferenceCache = new Map();
export async function POST(request: Request) {
  const client = await createClient();
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) return Response.json({ error: "Sign in to look up food comparisons." }, { status: 401 });
  let body;
  try {
    const text = await request.text();
    if (text.length > 20000) return Response.json({ error: "Product description is too large." }, { status: 413 });
    body = JSON.parse(text);
  } catch { return Response.json({ error: "Invalid product description." }, { status: 400 }); }
  if (!body?.product || typeof body.product !== "object" || Array.isArray(body.product) || !["as-sold", "dry", "prepared"].includes(body.basis) || !["g", "ml"].includes(body.unit))
    return Response.json({ error: "A product and preparation basis are required." }, { status: 400 });
  const p = body.product;
  const string = (value: unknown, max: number) => typeof value === "string" ? value.slice(0, max) : "";
  const product: CategoryProduct = {
    product_name: string(p.product_name ?? p.product_name_en, 240), generic_name: string(p.generic_name, 240), categories: string(p.categories, 1000),
    product_name_en: string(p.product_name_en, 240),
    ingredients_text: string(p.ingredients_text, 6000), categories_tags: Array.isArray(p.categories_tags) ? p.categories_tags.filter((s: unknown) => typeof s === "string").slice(0, 40) : [],
    nutrition_basis: string(p.nutrition_basis, 240),
    additives_tags: Array.isArray(p.additives_tags) ? p.additives_tags.filter((s: unknown) => typeof s === "string").slice(0, 40) : [],
    nutriments: Object.fromEntries(["energy-kcal_100g", "proteins_100g", "fat_100g", "carbohydrates_100g"].map(key => [key, p.nutriments?.[key]])),
  };
  const resolve = createReferenceSearch({ cache,
    cofid: async term => {
      // Usually one page. Rank all matches, not the first 40 food codes.
      const rows = [];
      for (let offset = 0; offset < 4000; offset += 500) {
        const { data, error } = await client.from("cofid_foods")
          .select("food_code,food_name,energy_kcal,protein_g,fat_g,carbohydrate_g,potassium_mg,phosphorus_mg")
          .ilike("food_name", `%${term}%`).order("food_code").range(offset, offset + 499);
        if (error) throw error;
        rows.push(...(data ?? []));
        if (!data || data.length < 500) return rows;
      }
      // Never silently rank a truncated subset.
      throw new Error("Reference search is too broad");
    },
    usda: query => usdaClient.search(query, ["SR Legacy", "Foundation", "Survey (FNDDS)"]),
  });
  return Response.json(await resolve(product, body.basis, body.unit), { headers: { "Cache-Control": "private, no-store" } });
}
