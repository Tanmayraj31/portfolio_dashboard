import YahooFinance from "yahoo-finance2";

import type { Holding, MarketData } from "./types";

const yahooFinance = new YahooFinance();

function toYahooSymbol(symbol: string) {
  if (/^\d+$/.test(symbol)) {
    return `${symbol}.BO`;
  }

  return `${symbol}.NS`;
}

function getFallbackMarketData(holding: Holding, updatedAt: string): MarketData {
  return {
    cmp: holding.purchasePrice,
    peRatio: null,
    latestEarnings: null,
    source: "fallback-static",
    updatedAt,
  };
}

function isReasonableMarketPrice(price: number, holding: Holding) {
  return (
    Number.isFinite(price) &&
    price > 0 &&
    price >= holding.purchasePrice * 0.05 &&
    price <= holding.purchasePrice * 20
  );
}

async function getMarketDataForHolding(
  holding: Holding,
  updatedAt: string,
): Promise<[string, MarketData]> {
  try {
    const quote = await yahooFinance.quote(toYahooSymbol(holding.symbol));

    if (
      typeof quote.regularMarketPrice !== "number" ||
      !isReasonableMarketPrice(quote.regularMarketPrice, holding)
    ) {
      return [holding.symbol, getFallbackMarketData(holding, updatedAt)];
    }

    return [
      holding.symbol,
      {
        cmp: quote.regularMarketPrice,
        peRatio: quote.trailingPE ?? null,
        latestEarnings: null,
        source: "yahoo-finance",
        updatedAt,
      },
    ];
  } catch {
    return [holding.symbol, getFallbackMarketData(holding, updatedAt)];
  }
}

export async function getMarketDataForHoldings(holdings: Holding[]) {
  const updatedAt = new Date().toISOString();
  const marketDataEntries = await Promise.all(
    holdings.map((holding) => getMarketDataForHolding(holding, updatedAt)),
  );

  return marketDataEntries.reduce<Record<string, MarketData>>(
    (marketData, [symbol, data]) => {
      marketData[symbol] = data;

      return marketData;
    },
    {},
  );
}
