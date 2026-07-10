import { NextResponse } from "next/server";

import {
  buildPortfolioRows,
  calculatePortfolioSummary,
  calculateSectorSummaries,
} from "@/lib/calculations";
import { getMarketDataForHoldings } from "@/lib/market-data";
import { holdings } from "@/lib/portfolio-data";
import type { PortfolioApiResponse } from "@/lib/types";

export function GET() {
  const lastUpdated = new Date().toISOString();
  const marketDataBySymbol = getMarketDataForHoldings(holdings);
  const rows = buildPortfolioRows(holdings, marketDataBySymbol);
  const sectors = calculateSectorSummaries(rows);
  const summary = calculatePortfolioSummary(rows);

  const response: PortfolioApiResponse = {
    rows,
    sectors,
    summary,
    lastUpdated,
    warning: "Using fallback market data until live market fetching is added.",
  };

  return NextResponse.json(response);
}
