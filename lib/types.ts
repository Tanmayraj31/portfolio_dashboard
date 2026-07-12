export type Holding = {
  id: string;
  sector: string;
  name: string;
  symbol: string;
  purchasePrice: number;
  quantity: number;
};

export type MarketData = {
  cmp: number | null;
  peRatio: number | null;
  latestEarnings: number | null;
  source: string;
  updatedAt: string;
};

export type PortfolioRow = Holding & {
  investment: number;
  portfolioPercent: number;
  cmp: number | null;
  presentValue: number | null;
  gainLoss: number | null;
  gainLossPercent: number | null;
  peRatio: number | null;
  latestEarnings: number | null;
  marketDataSource: string;
};

export type SectorSummary = {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number | null;
  gainLoss: number | null;
  gainLossPercent: number | null;
};

export type PortfolioSummary = {
  totalInvestment: number;
  totalPresentValue: number | null;
  totalGainLoss: number | null;
  totalGainLossPercent: number | null;
};

export type MarketDataStatus =
  | "fully-live"
  | "partial-fallback"
  | "fully-fallback"
  | "unavailable";

export type MarketDataSummary = {
  total: number;
  live: number;
  fallback: number;
  unavailable: number;
};

export type PortfolioApiResponse = {
  rows: PortfolioRow[];
  sectors: SectorSummary[];
  summary: PortfolioSummary;
  lastUpdated: string;
  marketDataStatus: MarketDataStatus;
  marketDataSummary: MarketDataSummary;
  warning?: string;
};
