import YahooFinance from "yahoo-finance2";

import { getCachedMarketData, setCachedMarketData } from "./cache";
import type { Holding, MarketData } from "./types";

const yahooFinance = new YahooFinance();
const MARKET_DATA_CACHE_TTL_MS = 60 * 1000;

const yahooSymbolOverrides: Record<string, string> = {
  "532174": "ICICIBANK.NS",
  "544252": "BAJAJHFL.NS",
  "542651": "KPITTECH.NS",
  "544028": "TATATECH.NS",
  "544107": "BLSE.NS",
  "532790": "TANLA.NS",
  "532540": "TATACONSUM.NS",
  "500331": "PIDILITIND.NS",
  "500400": "TATAPOWER.NS",
  "542323": "KPIGREEN.NS",
  "532667": "SUZLON.NS",
  "542851": "GENSOL.NS",
  "543517": "HARIOMPIPE.NS",
  "542652": "POLYCAB.NS",
  "543318": "CLEAN.NS",
  "506401": "DEEPAKNTR.NS",
  "541557": "FINEORG.NS",
  "533282": "GRAVITA.NS",
  "540719": "SBILIFE.NS",
};

function toYahooSymbol(symbol: string) {
  if (/^\d+$/.test(symbol)) {
    return `${symbol}.BO`;
  }

  return `${symbol}.NS`;
}

function getYahooSymbolCandidates(symbol: string) {
  const candidates = [yahooSymbolOverrides[symbol], toYahooSymbol(symbol)];

  return candidates.filter(
    (candidate, index): candidate is string =>
      Boolean(candidate) && candidates.indexOf(candidate) === index,
  );
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
    price >= holding.purchasePrice * 0.001 &&
    price <= holding.purchasePrice * 20
  );
}

async function getMarketDataForHolding(
  holding: Holding,
  updatedAt: string,
): Promise<[string, MarketData]> {
  const cachedMarketData = getCachedMarketData(holding.symbol);

  if (cachedMarketData) {
    return [holding.symbol, cachedMarketData];
  }

  const yahooSymbols = getYahooSymbolCandidates(holding.symbol);

  for (const yahooSymbol of yahooSymbols) {
    try {
      const quote = await yahooFinance.quote(yahooSymbol);

      if (
        typeof quote.regularMarketPrice !== "number" ||
        !isReasonableMarketPrice(quote.regularMarketPrice, holding)
      ) {
        continue;
      }

      const marketData: MarketData = {
        cmp: quote.regularMarketPrice,
        peRatio: quote.trailingPE ?? null,
        latestEarnings: null,
        source: `yahoo-finance:${yahooSymbol}`,
        updatedAt,
      };

      setCachedMarketData(holding.symbol, marketData, MARKET_DATA_CACHE_TTL_MS);

      return [holding.symbol, marketData];
    } catch {
      continue;
    }
  }

  const fallbackMarketData = getFallbackMarketData(holding, updatedAt);

  setCachedMarketData(
    holding.symbol,
    fallbackMarketData,
    MARKET_DATA_CACHE_TTL_MS,
  );

  return [holding.symbol, fallbackMarketData];
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
