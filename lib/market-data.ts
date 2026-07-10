import type { Holding, MarketData } from "./types";

export function getMarketDataForHoldings(holdings: Holding[]) {
  const updatedAt = new Date().toISOString();

  return holdings.reduce<Record<string, MarketData>>((marketData, holding) => {
    marketData[holding.symbol] = {
      cmp: holding.purchasePrice,
      peRatio: null,
      latestEarnings: null,
      source: "fallback-static",
      updatedAt,
    };

    return marketData;
  }, {});
}
