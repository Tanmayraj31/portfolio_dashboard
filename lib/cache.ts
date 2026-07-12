import type { MarketData } from "./types";

type MarketDataCacheEntry = {
  value: MarketData;
  expiresAt: number;
};

const marketDataCache = new Map<string, MarketDataCacheEntry>();

export function getCachedMarketData(symbol: string): MarketData | null {
  const entry = marketDataCache.get(symbol);

  if (!entry) {
     console.log("CACHE MISS:", symbol);
    return null;
  }

  if (Date.now() > entry.expiresAt) {
     console.log("CACHE Expired:", symbol);
    marketDataCache.delete(symbol);
    return null;
  }
   console.log("CACHE HIt:", symbol);
  return entry.value;
}

export function setCachedMarketData(
  symbol: string,
  marketData: MarketData,
  ttlMs: number,
) {
  marketDataCache.set(symbol, {
    value: marketData,
    expiresAt: Date.now() + ttlMs,
  });
}
