import type {
  Holding,
  MarketData,
  PortfolioRow,
  PortfolioSummary,
  SectorSummary,
} from "./types";

type MarketDataBySymbol = Record<string, MarketData>;

export function calculateInvestment(purchasePrice: number, quantity: number) {
  return purchasePrice * quantity;
}

export function calculatePresentValue(cmp: number | null, quantity: number) {
  if (cmp === null) {
    return null;
  }

  return cmp * quantity;
}

export function calculateGainLoss(
  presentValue: number | null,
  investment: number,
) {
  if (presentValue === null) {
    return null;
  }

  return presentValue - investment;
}

export function calculateGainLossPercent(
  gainLoss: number | null,
  investment: number,
) {
  if (gainLoss === null || investment === 0) {
    return null;
  }

  return gainLoss / investment;
}

export function calculateTotalInvestment(holdings: Holding[]) {
  return holdings.reduce((total, holding) => {
    return total + calculateInvestment(holding.purchasePrice, holding.quantity);
  }, 0);
}

export function calculatePortfolioPercent(
  investment: number,
  totalInvestment: number,
) {
  if (totalInvestment === 0) {
    return 0;
  }

  return investment / totalInvestment;
}

export function buildPortfolioRows(
  holdings: Holding[],
  marketDataBySymbol: MarketDataBySymbol,
): PortfolioRow[] {
  const totalInvestment = calculateTotalInvestment(holdings);

  return holdings.map((holding) => {
    const investment = calculateInvestment(
      holding.purchasePrice,
      holding.quantity,
    );
    const marketData = marketDataBySymbol[holding.symbol];
    const cmp = marketData?.cmp ?? null;
    const presentValue = calculatePresentValue(cmp, holding.quantity);
    const gainLoss = calculateGainLoss(presentValue, investment);

    return {
      ...holding,
      investment,
      portfolioPercent: calculatePortfolioPercent(investment, totalInvestment),
      cmp,
      presentValue,
      gainLoss,
      gainLossPercent: calculateGainLossPercent(gainLoss, investment),
      peRatio: marketData?.peRatio ?? null,
      latestEarnings: marketData?.latestEarnings ?? null,
      marketDataSource: marketData?.source ?? "unavailable",
    };
  });
}

export function calculateSectorSummaries(
  rows: PortfolioRow[],
): SectorSummary[] {
  const summariesBySector = rows.reduce<Record<string, SectorSummary>>(
    (summaries, row) => {
      const currentSummary = summaries[row.sector] ?? {
        sector: row.sector,
        totalInvestment: 0,
        totalPresentValue: 0,
        gainLoss: 0,
        gainLossPercent: null,
      };

      const totalInvestment = currentSummary.totalInvestment + row.investment;
      const totalPresentValue =
        (currentSummary.totalPresentValue ?? 0) + (row.presentValue ?? 0);
      const gainLoss = totalPresentValue - totalInvestment;

      summaries[row.sector] = {
        sector: row.sector,
        totalInvestment,
        totalPresentValue,
        gainLoss,
        gainLossPercent: calculateGainLossPercent(gainLoss, totalInvestment),
      };

      return summaries;
    },
    {},
  );

  return Object.values(summariesBySector);
}

export function calculatePortfolioSummary(
  rows: PortfolioRow[],
): PortfolioSummary {
  const totalInvestment = rows.reduce((total, row) => {
    return total + row.investment;
  }, 0);

  const totalPresentValue = rows.reduce((total, row) => {
    return total + (row.presentValue ?? 0);
  }, 0);

  const totalGainLoss = totalPresentValue - totalInvestment;

  return {
    totalInvestment,
    totalPresentValue,
    totalGainLoss,
    totalGainLossPercent: calculateGainLossPercent(
      totalGainLoss,
      totalInvestment,
    ),
  };
}
