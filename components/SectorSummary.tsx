import { formatCurrency, formatPercent } from "@/lib/formatters";
import type { SectorSummary as SectorSummaryType } from "@/lib/types";

type SectorSummaryProps = {
  sectors: SectorSummaryType[];
};

function getToneClass(value: number | null | undefined) {
  if (value === null || value === undefined || value === 0) {
    return "text-slate-600";
  }

  return value > 0 ? "text-emerald-700" : "text-rose-700";
}

export function SectorSummary({ sectors }: SectorSummaryProps) {
  return (
    <aside className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-950">
            Sector Summary
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {sectors.length} sectors grouped by backend calculations.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {sectors.map((sector) => (
          <div
            className="rounded-md border border-slate-100 bg-slate-50 p-4"
            key={sector.sector}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-slate-900">{sector.sector}</p>
                <p className="mt-1 text-xs text-slate-500">
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
                <p className="text-slate-500">Investment</p>
                <p className="mt-1 font-medium text-slate-900">
                  {formatCurrency(sector.totalInvestment)}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Present Value</p>
                <p className="mt-1 font-medium text-slate-900">
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
