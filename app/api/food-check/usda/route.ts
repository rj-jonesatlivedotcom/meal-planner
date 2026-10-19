import { CURATED_MINERALS } from "@/app/FoodCheck/curatedMinerals";
import { usdaClient } from "@/app/FoodCheck/usda.server";

export const runtime = "nodejs";

// Fixed reviewed references only: no public proxy for arbitrary USDA searches.
// Returning reference evidence does not approve an estimate for the Food Check UI.
export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("fdcId") ?? "";
  if (!/^\d{1,10}$/.test(raw)) return Response.json({ food: null }, { status: 400 });
  const id = Number(raw);
  const reviewed = CURATED_MINERALS.some(mapping => mapping.usdaReview?.fdcIds.includes(id) ||
    Object.values(mapping.usdaMatches ?? {}).some(match => match?.fdcId === id));
  if (!reviewed) return Response.json({ food: null }, { status: 404 });
  const result = await usdaClient.food(id);
  return Response.json({ food: result.data, status: result.status }, {
    status: result.status === "ok" ? 200 : result.status === "rate-limited" ? 429 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
