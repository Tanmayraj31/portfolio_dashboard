"use client";

import { useCallback, useEffect, useState } from "react";

import { SummaryCards } from "@/components/SummaryCards";
import type { PortfolioApiResponse } from "@/lib/types";

function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(value));
}

export function PortfolioDashboard() {
  const [data, setData] = useState<PortfolioApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/portfolio");

      if (!response.ok) {
        throw new Error("Portfolio API request failed.");
      }

      const portfolioData = (await response.json()) as PortfolioApiResponse;
      setData(portfolioData);
    } catch {
      setError("Unable to load portfolio data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadPortfolio();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadPortfolio]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Dynamic portfolio dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">
              Portfolio Overview
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Track investment value, market movement, sector exposure, and
              gain/loss using portfolio data from the provided Excel sheet.
            </p>
          </div>
          <div className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            Last updated: {formatDateTime(data?.lastUpdated)}
          </div>
        </header>

        {loading ? (
          <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-700">
              Loading portfolio data...
            </p>
          </section>
        ) : error ? (
          <section className="rounded-md border border-rose-200 bg-rose-50 p-6 shadow-sm">
            <p className="text-sm font-medium text-rose-800">{error}</p>
            <button
              className="mt-4 rounded-md border border-rose-300 bg-white px-3 py-2 text-sm font-medium text-rose-800"
              type="button"
              onClick={loadPortfolio}
            >
              Retry
            </button>
          </section>
        ) : data ? (
          <>
            <SummaryCards summary={data.summary} />

            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-950">
                    API Connection Check
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    The frontend is now reading portfolio data from
                    /api/portfolio.
                  </p>
                </div>
                <button
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
                  type="button"
                  onClick={loadPortfolio}
                >
                  Refresh
                </button>
              </div>

              <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
                <div className="rounded-md border border-slate-100 bg-slate-50 p-4">
                  <p className="text-slate-500">Holdings loaded</p>
                  <p className="mt-1 text-lg font-semibold text-slate-950">
                    {data.rows.length}
                  </p>
                </div>
                <div className="rounded-md border border-slate-100 bg-slate-50 p-4">
                  <p className="text-slate-500">Sectors loaded</p>
                  <p className="mt-1 text-lg font-semibold text-slate-950">
                    {data.sectors.length}
                  </p>
                </div>
                <div className="rounded-md border border-slate-100 bg-slate-50 p-4">
                  <p className="text-slate-500">API warning</p>
                  <p className="mt-1 font-medium text-slate-700">
                    {data.warning ?? "None"}
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
