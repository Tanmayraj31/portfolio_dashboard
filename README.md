# Dynamic Portfolio Dashboard

A full-stack portfolio dashboard built for the 8byte / Octa Byte AI case study.

The app displays stock holdings from the provided Excel sheet, calculates portfolio values, groups holdings by sector, and enriches rows with market data where available.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js API Routes
- yahoo-finance2

## Features

- Portfolio summary cards for investment, current value, gain/loss, and gain/loss percentage
- Holdings table with purchase price, quantity, investment, portfolio percentage, CMP, present value, gain/loss, P/E ratio, and latest earnings
- Sector-wise summary
- Gain/loss color indicators
- 15-second frontend polling
- Server-side market data fetching
- 60-second in-memory cache for market data
- Fallback values when live market data is unavailable
- Responsive table with pagination

## Project Structure

```txt
app/
  api/portfolio/route.ts   Portfolio API route
  page.tsx                 Dashboard page
components/                Dashboard UI components
lib/
  portfolio-data.ts        Static holdings from Excel
  market-data.ts           Yahoo Finance and fallback logic
  cache.ts                 In-memory market data cache
  calculations.ts          Portfolio and sector calculations
  formatters.ts            Currency, number, and percent formatting
  types.ts                 TypeScript data types
docs/                      Planning and completion notes
```

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## API

The dashboard uses:

```txt
GET /api/portfolio
```

The API returns:

- portfolio rows
- sector summaries
- total summary
- last updated timestamp
- market data status
- market data warning when fallback values are used

## Market Data Strategy

Holdings are stored as static typed data from the Excel sheet. Derived values are calculated in code.

Live CMP and P/E ratio are fetched server-side through `yahoo-finance2` when possible. Yahoo Finance is unofficial, so the app uses fallback values and clear warnings when data is missing or invalid.

Market data is cached in memory for 60 seconds. The frontend refreshes every 15 seconds, but the backend does not call Yahoo Finance on every refresh while cache entries are valid.

## Known Limitations

- Yahoo Finance access is unofficial and may fail or return incomplete data.
- Latest earnings is currently shown as `N/A` when not available from the quote response.
- Cache is in-memory, so it resets when the server restarts.
- The Excel data is converted into static TypeScript data; there is no upload/import flow yet.

## Future Improvements

- Use a reliable paid financial data API
- Add Redis or another shared cache
- Add tests for calculation and API logic
- Add Excel upload/import support
- Add search, filters, and sorting
- Deploy on Vercel
