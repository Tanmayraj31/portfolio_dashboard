import { NextResponse } from "next/server";

import {
  buildPortfolioRows,
  calculatePortfolioSummary,
  calculateSectorSummaries,
} from "@/lib/calculations";
import { getMarketDataForHoldings } from "@/lib/market-data";
import { holdings } from "@/lib/portfolio-data";
import type {
  MarketDataStatus,
  MarketDataSummary,
  PortfolioApiResponse,
  PortfolioRow,
  PortfolioSummary,
} from "@/lib/types";

const emptySummary: PortfolioSummary = {
  totalInvestment: 0,
  totalPresentValue: null,
  totalGainLoss: null,
  totalGainLossPercent: null,
};

function isLiveMarketDataSource(source: string) {
  return source.startsWith("yahoo-finance:");
}

function isFallbackMarketDataSource(source: string) {
  return source === "fallback-static";
}

function getMarketDataSummary(rows: PortfolioRow[]): MarketDataSummary {
  return rows.reduce<MarketDataSummary>(
    (summary, row) => {
      if (isLiveMarketDataSource(row.marketDataSource)) {
        summary.live += 1;
      } else if (isFallbackMarketDataSource(row.marketDataSource)) {
        summary.fallback += 1;
      } else {
        summary.unavailable += 1;
      }

      return summary;
    },
    {
      total: rows.length,
      live: 0,
      fallback: 0,
      unavailable: 0,
    },
  );
}

function getMarketDataStatus(
  marketDataSummary: MarketDataSummary,
): MarketDataStatus {
  if (marketDataSummary.total === 0 || marketDataSummary.unavailable > 0) {
    return "unavailable";
  }

  if (marketDataSummary.live === marketDataSummary.total) {
    return "fully-live";
  }

  if (marketDataSummary.fallback === marketDataSummary.total) {
    return "fully-fallback";
  }

  return "partial-fallback";
}

function getMarketDataWarning(
  marketDataStatus: MarketDataStatus,
  marketDataSummary: MarketDataSummary,
) {
  if (marketDataStatus === "fully-live") {
    return "Live Yahoo Finance market data is available for all holdings.";
  }

  if (marketDataStatus === "fully-fallback") {
    return `Yahoo Finance market data is unavailable. Fallback values are being used for all ${marketDataSummary.total} holdings.`;
  }

  if (marketDataStatus === "unavailable") {
    return "Some market data could not be prepared. The portfolio response is using available values where possible.";
  }

  return `Live Yahoo Finance market data is available for ${marketDataSummary.live} of ${marketDataSummary.total} holdings. Fallback values are being used for ${marketDataSummary.fallback} holdings.`;
}

export async function GET() {
  try {
    const lastUpdated = new Date().toISOString();
    const marketDataBySymbol = await getMarketDataForHoldings(holdings);
    const rows = buildPortfolioRows(holdings, marketDataBySymbol);
    const sectors = calculateSectorSummaries(rows);
    const summary = calculatePortfolioSummary(rows);
    const marketDataSummary = getMarketDataSummary(rows);
    const marketDataStatus = getMarketDataStatus(marketDataSummary);

    const response: PortfolioApiResponse = {
      rows,
      sectors,
      summary,
      lastUpdated,
      marketDataStatus,
      marketDataSummary,
      warning: getMarketDataWarning(marketDataStatus, marketDataSummary),
    };

    return NextResponse.json(response);
  } catch {
    const response: PortfolioApiResponse = {
      rows: [],
      sectors: [],
      summary: emptySummary,
      lastUpdated: new Date().toISOString(),
      marketDataStatus: "unavailable",
      marketDataSummary: {
        total: holdings.length,
        live: 0,
        fallback: 0,
        unavailable: holdings.length,
      },
      warning:
        "Unable to prepare portfolio data right now. Please try again shortly.",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
