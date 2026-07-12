import { formatCurrency, formatPercent } from "@/lib/formatters";
import type { PortfolioSummary } from "@/lib/types";

type SummaryCardsProps = {
  summary: PortfolioSummary;
};

function getToneClass(value: number | null | undefined) {
  if (value === null || value === undefined || value === 0) {
    return "text-white";
  }

  return value > 0 ? "text-emerald-300" : "text-rose-300";
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      label: "Total Investment",
      value: formatCurrency(summary.totalInvestment),
      toneClass: "text-white",
    },
    {
      label: "Current Value",
      value: formatCurrency(summary.totalPresentValue),
      toneClass: "text-white",
    },
    {
      label: "Total Gain/Loss",
      value: formatCurrency(summary.totalGainLoss),
      toneClass: getToneClass(summary.totalGainLoss),
    },
    {
      label: "Gain/Loss %",
      value: formatPercent(summary.totalGainLossPercent),
      toneClass: getToneClass(summary.totalGainLossPercent),
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <article
          className="rounded-md border border-slate-700 bg-slate-900 p-5 shadow-sm shadow-slate-950"
          key={card.label}
        >
          <p className="text-sm font-medium text-slate-400 ">{card.label}</p>
          <p className={`mt-3 text-2xl font-semibold ${card.toneClass}`}>
            {card.value}
          </p>
        </article>
      ))}
    </section>
  );
}
