const summaryCards = [
  { label: "Total Investment", value: "₹15,43,060", tone: "neutral" },
  { label: "Current Value", value: "₹15,91,410", tone: "neutral" },
  { label: "Total Gain/Loss", value: "+₹48,350", tone: "positive" },
  { label: "Gain/Loss %", value: "+3.13%", tone: "positive" },
  { label: "new label", value: "500", tone: "negative" },
];

const sectors = [
  { name: "Financial Sector", investment: "₹3,28,450", value: "₹3,86,329", gainLoss: "+₹57,879" },
  { name: "Tech Sector", investment: "₹3,37,820", value: "₹3,19,697", gainLoss: "-₹18,123" },
  { name: "Consumer", investment: "₹2,63,565", value: "₹2,77,959", gainLoss: "+₹14,394" },
  { name: "Power", investment: "₹1,58,860", value: "₹1,38,974", gainLoss: "-₹19,886" },
];

const sampleRows = [
  {
    name: "HDFC Bank",
    sector: "Financial Sector",
    symbol: "HDFCBANK",
    purchasePrice: "₹1,490",
    quantity: "50",
    cmp: "₹1,700.15",
    gainLoss: "+₹10,508",
  },
  {
    name: "KPIT Tech",
    sector: "Tech Sector",
    symbol: "542651",
    purchasePrice: "₹672",
    quantity: "61",
    cmp: "₹1,293.10",
    gainLoss: "+₹37,887",
  },
  {
    name: "Dmart",
    sector: "Consumer",
    symbol: "DMART",
    purchasePrice: "₹3,777",
    quantity: "27",
    cmp: "₹3,451.10",
    gainLoss: "-₹8,799",
  },
  {
    name: "Dmart",
    sector: "Consumer",
    symbol: "DMART",
    purchasePrice: "₹3,777",
    quantity: "27",
    cmp: "₹3,451.10",
    gainLoss: "-₹8,799",
  },
];

function getToneClass(tone: string) {
  if (tone === "positive") {
    return "text-emerald-700";
  }

  if (tone === "negative") {
    return "text-rose-700";
  }

  return "text-slate-950";
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto bg-green-200 flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
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
            Last updated: Pending API integration
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <article
              key={card.label}
              className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className={`mt-3 text-2xl font-semibold ${getToneClass(card.tone)}`}>
                {card.value}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-950">
                Sector Summary
              </h2>
              <span className="text-xs font-medium text-slate-500">MVP</span>
            </div>

            <div className="mt-5 space-y-4">
              {sectors.map((sector) => {
                const isGain = sector.gainLoss.startsWith("+");

                return (
                  <div
                    key={sector.name}
                    className="rounded-md border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-slate-900">{sector.name}</p>
                      <p
                        className={`text-sm font-semibold ${
                          isGain ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {sector.gainLoss}
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-slate-500">Investment</p>
                        <p className="mt-1 font-medium text-slate-900">
                          {sector.investment}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Present Value</p>
                        <p className="mt-1 font-medium text-slate-900">
                          {sector.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="rounded-md border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Holdings
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Static layout preview. API-backed data comes in the next waves.
                </p>
              </div>
              <button className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700">
                Refresh
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Stock</th>
                    <th className="px-5 py-3 font-semibold">Sector</th>
                    <th className="px-5 py-3 font-semibold">Symbol</th>
                    <th className="px-5 py-3 font-semibold">Purchase Price</th>
                    <th className="px-5 py-3 font-semibold">Qty</th>
                    <th className="px-5 py-3 font-semibold">CMP</th>
                    <th className="px-5 py-3 font-semibold">Gain/Loss</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sampleRows.map((row) => {
                    const isGain = row.gainLoss.startsWith("+");

                    return (
                      <tr key={row.name}>
                        <td className="px-5 py-4 font-medium text-slate-950">
                          {row.name}
                        </td>
                        <td className="px-5 py-4 text-slate-600">{row.sector}</td>
                        <td className="px-5 py-4 text-slate-600">{row.symbol}</td>
                        <td className="px-5 py-4 text-slate-600">
                          {row.purchasePrice}
                        </td>
                        <td className="px-5 py-4 text-slate-600">{row.quantity}</td>
                        <td className="px-5 py-4 text-slate-600">{row.cmp}</td>
                        <td
                          className={`px-5 py-4 font-semibold ${
                            isGain ? "text-emerald-700" : "text-rose-700"
                          }`}
                        >
                          {row.gainLoss}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
