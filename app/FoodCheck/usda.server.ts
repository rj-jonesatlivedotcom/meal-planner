import "server-only";
import { parseUsdaFood, USDA_DATASETS, type UsdaFood } from "./usdaData";

type Status = "ok" | "unconfigured" | "rate-limited" | "unavailable";
type Result<T> = { status: Status; data: T | null };

// No credentials in URLs, cache keys, logs or returned data. Only this server
// module reads the key. Search produces evidence, never automatic matches.
export function createUsdaClient(options: {
  apiKey?: () => string | undefined;
  fetcher?: typeof fetch;
  now?: () => number;
  timeoutMs?: number;
} = {}) {
  const fetcher = options.fetcher ?? fetch, now = options.now ?? Date.now;
  const cache = new Map<string, { expires: number; result: Result<unknown> }>();
  const pending = new Map<string, Promise<Result<unknown>>>();
  let rateLimitedUntil = 0;
  async function request(path: string, body?: object): Promise<Result<unknown>> {
    const key = (options.apiKey?.() ?? process.env.USDA_FDC_API_KEY)?.trim();
    if (!key || key === "DEMO_KEY") return { status: "unconfigured", data: null };
    const cacheKey = path + JSON.stringify(body ?? null), cached = cache.get(cacheKey);
    if (cached && cached.expires > now()) return cached.result;
    if (rateLimitedUntil > now()) return { status: "rate-limited", data: null };
    if (pending.has(cacheKey)) return pending.get(cacheKey)!;
    const work = (async (): Promise<Result<unknown>> => {
      let result: Result<unknown>;
      try {
        const response = await fetcher(`https://api.nal.usda.gov/fdc/v1/${path}`, {
          method: body ? "POST" : "GET", headers: { "X-Api-Key": key, Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}) },
          ...(body ? { body: JSON.stringify(body) } : {}),
          signal: AbortSignal.timeout(options.timeoutMs ?? 8000),
          // The bounded process cache handles success, errors and concurrent calls.
          cache: "no-store",
        });
        if (response.status === 429) {
          const retry = Number(response.headers.get("retry-after"));
          rateLimitedUntil = now() + (Number.isFinite(retry) && retry > 0 ? Math.min(retry, 3600) : 300) * 1000;
          result = { status: "rate-limited", data: null };
        } else result = response.ok ? { status: "ok", data: await response.json() } : { status: "unavailable", data: null };
      } catch { result = { status: "unavailable", data: null }; }
      if (cache.size >= 100) cache.delete(cache.keys().next().value!);
      cache.set(cacheKey, { expires: now() + (result.status === "ok" ? 86400000 : 60000), result });
      return result;
    })();
    pending.set(cacheKey, work);
    try { return await work; } finally { pending.delete(cacheKey); }
  }
  return {
    async food(id: number): Promise<Result<UsdaFood>> {
      if (!Number.isSafeInteger(id) || id <= 0) return { status: "unavailable", data: null };
      const result = await request(`food/${id}`);
      const data = result.status === "ok" ? parseUsdaFood(result.data) : null;
      return { status: result.status === "ok" && !data ? "unavailable" : result.status, data };
    },
    async search(query: string, datasets: readonly string[] = USDA_DATASETS): Promise<Result<UsdaFood[]>> {
      const clean = query.trim();
      if (!clean || clean.length > 120 || datasets.some(d => !(USDA_DATASETS as readonly string[]).includes(d))) return { status: "unavailable", data: null };
      const result = await request("foods/search", { query: clean, dataType: [...datasets], pageSize: 10 });
      const foods = (result.data as { foods?: unknown[] } | null)?.foods;
      return { status: result.status, data: result.status === "ok" && Array.isArray(foods) ? foods.map(parseUsdaFood).filter((f): f is UsdaFood => f !== null) : null };
    },
  };
}

export const usdaClient = createUsdaClient();
