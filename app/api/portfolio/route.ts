import { NextResponse } from "next/server";

import {
  buildPortfolioRows,
  calculatePortfolioSummary,
  calculateSectorSummaries,
} from "@/lib/calculations";
import { getMarketDataForHoldings } from "@/lib/market-data";
import { holdings } from "@/lib/portfolio-data";
import type { PortfolioApiResponse } from "@/lib/types";

export async function GET() {
  const lastUpdated = new Date().toISOString();
  const marketDataBySymbol = await getMarketDataForHoldings(holdings);
  const rows = buildPortfolioRows(holdings, marketDataBySymbol);
  const sectors = calculateSectorSummaries(rows);
  const summary = calculatePortfolioSummary(rows);

  const response: PortfolioApiResponse = {
    rows,
    sectors,
    summary,
    lastUpdated,
    warning:
      "Using Yahoo Finance market data when available and fallback values when unavailable.",
  };

  return NextResponse.json(response);
}
