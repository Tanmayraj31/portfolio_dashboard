# Wave Completion Notes

## Status

Wave 1 is completed through Phase 1.2.

Wave 2 is completed through Phase 2.3.

Completed:

- Phase 1.1: Scaffolded the Next.js project.
- Phase 1.2: Replaced the default starter page with a static dashboard layout shell.
- Phase 2.1: Added TypeScript types for portfolio data.
- Phase 2.2: Converted the main Excel portfolio block into static raw holdings data.
- Phase 2.3: Added formatting helpers for currency, numbers, and percentages.

Validation completed:

- Run `npm run lint`.
- Confirm static holdings count and total investment.

Validation result:

```txt
holdings: 26
total investment: 1543060
npm run lint: passed
```

Recommended commit after Wave 2:

```txt
feat: add portfolio data model
```

## Project Location

```txt
C:\Users\Tanmay\OneDrive\Desktop\Dynamic Dashboard\portfolio-dashboard
```

The app is running locally at:

```txt
http://localhost:3000
```

## Git Strategy

Use one clean commit per phase or meaningful checkpoint.

Recommended commit style:

```txt
feat: add dashboard layout shell
feat: add portfolio data model
feat: add portfolio calculations
feat: add portfolio api route
```

Current branch was initially `master`; if not already renamed, use:

```powershell
git branch -M main
```

Before commits:

```powershell
git status
git diff
npm run lint
```

## What Was Created By `create-next-app`

Important files:

```txt
app/
  page.tsx
  layout.tsx
  globals.css

public/
package.json
tsconfig.json
next.config.ts
```

## Key Next.js Concepts Explained

### `app/page.tsx`

This is the home page route.

When the browser opens:

```txt
http://localhost:3000
```

Next.js renders:

```txt
app/page.tsx
```

### `app/layout.tsx`

This wraps all pages in the app.

It contains:

- `<html>`
- `<body>`
- global font setup
- app-wide layout wrapper

### `app/globals.css`

This contains global CSS and Tailwind setup.

Tailwind utility classes work because this stylesheet is imported by `app/layout.tsx`.

### File-Based Routing

In Next.js App Router:

```txt
app/page.tsx
```

means:

```txt
/
```

Later:

```txt
app/api/portfolio/route.ts
```

will mean:

```txt
/api/portfolio
```

This is how the same Next.js project can contain both frontend pages and backend API routes.

## Phase 1.2 - Dashboard Layout Shell

File changed:

```txt
app/page.tsx
```

The default Next.js starter UI was removed.

The page now contains:

- Dashboard header
- Last updated placeholder
- Summary cards
- Sector summary section
- Holdings table
- Refresh button placeholder
- Green/red gain-loss visual indicators
- Responsive layout using Tailwind CSS

## Current `app/page.tsx` Structure

The page currently has three temporary arrays:

```ts
const summaryCards = [...]
const sectors = [...]
const sampleRows = [...]
```

These are temporary static values used only to design the UI shell.

They will later be replaced by API-backed data from:

```txt
GET /api/portfolio
```

## Temporary Data In The Layout

### `summaryCards`

Used to render the top summary cards:

- Total Investment
- Current Value
- Total Gain/Loss
- Gain/Loss %

Each card has:

```ts
{
  label: string;
  value: string;
  tone: string;
}
```

### `sectors`

Used to render the sector summary cards.

Each sector has:

```ts
{
  name: string;
  investment: string;
  value: string;
  gainLoss: string;
}
```

### `sampleRows`

Used to render the preview holdings table.

Each sample row has:

```ts
{
  name: string;
  sector: string;
  symbol: string;
  purchasePrice: string;
  quantity: string;
  cmp: string;
  gainLoss: string;
}
```

## Helper Function

The page includes:

```ts
function getToneClass(tone: string) {
  if (tone === "positive") {
    return "text-emerald-700";
  }

  if (tone === "negative") {
    return "text-rose-700";
  }

  return "text-slate-950";
}
```

Purpose:

- Return green class for positive values.
- Return red class for negative values.
- Return neutral dark class otherwise.

This keeps color logic separate from JSX.

## React Concepts Covered

### One Main Component Return

The page component has one main return:

```tsx
export default function Home() {
  return (
    <main>
      ...
    </main>
  );
}
```

### Return Inside `.map()`

There are inner returns inside `.map()` callbacks:

```tsx
{sectors.map((sector) => {
  const isGain = sector.gainLoss.startsWith("+");

  return (
    <div key={sector.name}>
      ...
    </div>
  );
})}
```

Explanation:

- The outer `return` belongs to the React component.
- The inner `return` belongs to the `.map()` callback function.
- `.map()` returns one JSX block for each item in the array.
- React can render arrays of JSX elements.

This is normal React, not only Next.js.

### Explicit vs Implicit Return In `.map()`

Implicit return:

```tsx
items.map((item) => (
  <div>{item.name}</div>
))
```

Explicit return:

```tsx
items.map((item) => {
  const isGain = item.value > 0;
  return <div>{item.name}</div>;
})
```

Use explicit return when extra logic is needed before returning JSX.

## Layout Decisions

### Main Page Container

The page uses:

```tsx
<main className="min-h-screen bg-slate-50 text-slate-950">
```

Meaning:

- `min-h-screen`: at least full screen height
- `bg-slate-50`: light dashboard background
- `text-slate-950`: default dark text

### Responsive Container

The inner wrapper uses:

```tsx
mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8
```

Purpose:

- Center content.
- Limit max width on large screens.
- Use responsive padding on different screen sizes.

### Header

The header uses responsive flex:

```tsx
flex flex-col ... md:flex-row
```

Meaning:

- Mobile: stacked layout.
- Medium screens and above: horizontal layout.

### Main Dashboard Grid

The sector summary and holdings table use:

```tsx
grid gap-6 lg:grid-cols-[360px_1fr]
```

Meaning:

- Mobile: one column.
- Large screens: left column is 360px, right column takes remaining width.

### Responsive Table

The table is wrapped in:

```tsx
<div className="overflow-x-auto">
```

The table uses:

```tsx
min-w-[760px]
```

Purpose:

- Financial tables have many columns.
- On mobile, the table scrolls horizontally instead of becoming unreadable.

## Interview Explanation For This Wave

If asked why the UI was built before the backend:

```txt
I first created a static dashboard shell to define the visual structure and understand what data the API needs to provide. This helped shape the API contract: summary totals, sector summaries, holdings rows, and updated timestamp. After that, the plan is to replace the temporary static data with typed portfolio data, calculation utilities, and a backend API route.
```

If asked whether this is final data:

```txt
No. The arrays in page.tsx are temporary layout data. The final version will get data from /api/portfolio, where the backend prepares calculated and enriched portfolio data.
```

If asked why we are not using separate frontend/backend folders:

```txt
Next.js supports both frontend pages and backend API routes in one project. For a 3-day assignment this reduces setup, avoids CORS and two deployments, and still gives a real Node.js backend through API routes.
```

## What Is Temporary

Temporary in `app/page.tsx`:

- `summaryCards`
- `sectors`
- `sampleRows`
- fake Refresh button behavior
- fake Last updated text

These will be replaced or connected in later waves.

## What Is Intended To Stay

The general dashboard structure should remain:

- Header
- Summary cards
- Sector summary
- Holdings table
- Gain/loss color indicators
- Responsive table layout

## Wave 2 - Data Modeling And Static Portfolio Data

Files created:

```txt
lib/types.ts
lib/portfolio-data.ts
lib/formatters.ts
```

### `lib/types.ts`

This file defines the shape of the app data.

Important types added:

```txt
Holding
MarketData
PortfolioRow
SectorSummary
PortfolioSummary
PortfolioApiResponse
```

Purpose:

- Make the portfolio data predictable.
- Help TypeScript catch mistakes early.
- Define the API response shape before the API route is built.

### `lib/portfolio-data.ts`

This file contains the static raw holdings extracted from the provided Excel file.

It includes 26 holdings from the main grouped portfolio block:

- Financial Sector
- Tech Sector
- Consumer
- Power
- Pipe Sector
- Others

Each holding stores only raw input fields:

```txt
id
sector
name
symbol
purchasePrice
quantity
```

Important decision:

Do not hardcode derived fields in this file.

These values are intentionally not stored in `portfolio-data.ts`:

```txt
investment
portfolio %
present value
gain/loss
gain/loss %
```

They will be calculated in Wave 3.

### `lib/formatters.ts`

This file contains display helpers:

```txt
formatCurrency
formatNumber
formatPercent
```

Purpose:

- Keep display formatting separate from calculations.
- Use Indian number formatting through `Intl.NumberFormat("en-IN")`.
- Show `N/A` when a value is `null` or `undefined`.

Example:

```txt
1543060 -> ₹15,43,060
0.0313 -> 3.13%
null -> N/A
```

## Wave 2 Interview Explanation

If asked why `portfolio-data.ts` was created instead of reading Excel on every server start:

```txt
The Excel file is the input source for the assignment, but the MVP does not need an Excel upload or import feature. I converted the required rows into typed static data so deployment stays simple and the core dashboard can focus on calculations, market data enrichment, caching, and UI rendering. In a production version, I would add an import flow to parse uploaded Excel files.
```

If asked what belongs in `portfolio-data.ts`:

```txt
Only raw values from the portfolio: stock name, sector, symbol/code, purchase price, and quantity. Anything derived, such as investment or gain/loss, should be calculated in code.
```

If asked what the `lib` folder is:

```txt
The `lib` folder contains reusable project logic and data. It is not strictly frontend or backend. Files from `lib` can be imported by frontend components or backend API routes, but backend-only files like market-data fetching should only be used from API routes.
```

## Current Temporary UI Note

`app/page.tsx` still uses temporary static arrays:

```txt
summaryCards
sectors
sampleRows
```

These were created in Wave 1 only for the dashboard shell.

They will be replaced later by API-backed data from:

```txt
GET /api/portfolio
```

## Next Wave

Next is Wave 3: Calculation Layer.

Planned files:

```txt
lib/calculations.ts
```

Wave 3 goals:

- Calculate investment.
- Calculate present value when CMP is available.
- Calculate gain/loss and gain/loss percentage.
- Calculate total investment and portfolio percentage.
- Group rows by sector.
- Calculate sector summaries.

Core formulas:

```txt
investment = purchasePrice * quantity
portfolioPercent = investment / totalInvestment
presentValue = cmp * quantity
gainLoss = presentValue - investment
gainLossPercent = gainLoss / investment
```

After Wave 3, proceed to:

```txt
Wave 4: Backend API route
Wave 5: Connect frontend to API
```
