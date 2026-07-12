"use client";

import { useMemo, useState } from "react";

import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/lib/formatters";
import type { PortfolioRow } from "@/lib/types";

type PortfolioTableProps = {
  rows: PortfolioRow[];
  onRefresh: () => void;
  warning?: string;
};

const PAGE_SIZE = 10;

function getToneClass(value: number | null | undefined) {
  if (value === null || value === undefined || value === 0) {
    return "text-slate-300";
  }

  return value > 0 ? "text-emerald-300" : "text-rose-300";
}

export function PortfolioTable({
  rows,
  onRefresh,
  warning,
}: PortfolioTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedRows = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;

    return rows.slice(startIndex, startIndex + PAGE_SIZE);
  }, [safeCurrentPage, rows]);

  const firstVisibleRow =
    rows.length === 0 ? 0 : (safeCurrentPage - 1) * PAGE_SIZE + 1;
  const lastVisibleRow = Math.min(safeCurrentPage * PAGE_SIZE, rows.length);

  return (
    <section className="min-w-0 rounded-md border border-slate-700 bg-slate-900 shadow-sm shadow-slate-950">
      <div className="flex flex-col gap-3 border-b border-slate-700 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Holdings</h2>
          <p className="mt-1 text-sm text-slate-400">
            Showing {firstVisibleRow}-{lastVisibleRow} of {rows.length} holdings
            loaded from /api/portfolio.
          </p>
          {warning ? (
            <p className="mt-2 max-w-3xl text-xs font-medium text-amber-300">
              {warning}
            </p>
          ) : null}
        </div>

        <button
          className="rounded-md border border-cyan-500 bg-cyan-950 px-3 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-900"
          type="button"
          onClick={onRefresh}
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1280px] border-collapse text-left text-sm">
          <thead className="bg-slate-800 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-5 py-3 font-semibold">Stock</th>
              <th className="px-5 py-3 font-semibold">Sector</th>
              <th className="px-5 py-3 font-semibold">Symbol</th>
              <th className="px-5 py-3 font-semibold">Purchase Price</th>
              <th className="px-5 py-3 font-semibold">Qty</th>
              <th className="px-5 py-3 font-semibold">Investment</th>
              <th className="px-5 py-3 font-semibold">Portfolio %</th>
              <th className="px-5 py-3 font-semibold">CMP</th>
              <th className="px-5 py-3 font-semibold">Present Value</th>
              <th className="px-5 py-3 font-semibold">Gain/Loss</th>
              <th className="px-5 py-3 font-semibold">Gain/Loss %</th>
              <th className="px-5 py-3 font-semibold">P/E Ratio</th>
              <th className="px-5 py-3 font-semibold">Latest Earnings</th>
              <th className="px-5 py-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {paginatedRows.map((row) => (
              <tr className="hover:bg-slate-800" key={row.id}>
                <td className="px-5 py-4 font-medium text-white">
                  {row.name}
                </td>
                <td className="px-5 py-4 text-slate-300">{row.sector}</td>
                <td className="px-5 py-4 font-medium text-cyan-200">
                  {row.symbol}
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {formatCurrency(row.purchasePrice)}
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {formatNumber(row.quantity)}
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {formatCurrency(row.investment)}
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {formatPercent(row.portfolioPercent)}
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {formatCurrency(row.cmp)}
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {formatCurrency(row.presentValue)}
                </td>
                <td
                  className={`px-5 py-4 font-semibold ${getToneClass(
                    row.gainLoss,
                  )}`}
                >
                  {formatCurrency(row.gainLoss)}
                </td>
                <td
                  className={`px-5 py-4 font-semibold ${getToneClass(
                    row.gainLossPercent,
                  )}`}
                >
                  {formatPercent(row.gainLossPercent)}
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {formatNumber(row.peRatio)}
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {formatNumber(row.latestEarnings)}
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {row.marketDataSource}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-700 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-400">
          Page {safeCurrentPage} of {totalPages}
        </p>

        <div className="flex items-center gap-2">
          <button
            className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 font-medium text-slate-100 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={safeCurrentPage === 1}
            onClick={() => setCurrentPage(Math.max(1, safeCurrentPage - 1))}
          >
            Previous
          </button>

          <button
            className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 font-medium text-slate-100 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={safeCurrentPage === totalPages}
            onClick={() =>
              setCurrentPage(Math.min(totalPages, safeCurrentPage + 1))
            }
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
