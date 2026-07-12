import { formatCurrency, formatPercent } from "@/lib/formatters";
import type { SectorSummary as SectorSummaryType } from "@/lib/types";

type SectorSummaryProps = {
  sectors: SectorSummaryType[];
};

function getToneClass(value: number | null | undefined) {
  if (value === null || value === undefined || value === 0) {
    return "text-slate-300";
  }

  return value > 0 ? "text-emerald-300" : "text-rose-300";
}

export function SectorSummary({ sectors }: SectorSummaryProps) {
  return (
    <aside className="rounded-md border border-slate-700 bg-slate-900 p-5 shadow-sm shadow-slate-950">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">
            Sector Summary
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {sectors.length} sectors grouped by backend calculations.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {sectors.map((sector) => (
          <div
            className="rounded-md border border-slate-700 bg-slate-800 p-4"
            key={sector.sector}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-white">{sector.sector}</p>
                <p className="mt-1 text-xs text-slate-400">
                  Gain/Loss {formatPercent(sector.gainLossPercent)}
                </p>
              </div>
              <p
                className={`text-sm font-semibold ${getToneClass(
                  sector.gainLoss,
                )}`}
              >
                {formatCurrency(sector.gainLoss)}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Investment</p>
                <p className="mt-1 font-medium text-slate-100">
                  {formatCurrency(sector.totalInvestment)}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Present Value</p>
                <p className="mt-1 font-medium text-slate-100">
                  {formatCurrency(sector.totalPresentValue)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
