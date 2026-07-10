# Dynamic Portfolio Dashboard - Requirements And Implementation Plan

## 1. Project Context

This project is a technical assignment for the Full Stack role at 8byte / Octa Byte AI Pvt Ltd.

The assignment asks for a full-stack portfolio dashboard that displays stock holdings from the provided Excel sheet and enriches them with dynamic market data.

The candidate, Tanmay Raj, has experience with React.js, Node.js, Express.js, JavaScript, REST APIs, MongoDB, Redis, Docker, CI/CD, and AWS. He has basic React experience but no prior Next.js experience. The implementation plan should therefore use Next.js in a simple, explainable way and avoid unnecessary framework complexity.

Important note from the assignment: the company says not to use AI-generated code blindly because Tanmay will need to explain the full implementation in interview. Any agent helping with this project should prioritize teaching, explanation, review, and phase-by-phase understanding. Do not rush through large code dumps.

## 2. Source Files

### Assignment PDF
Path:

```txt
C:\Users\Tanmay\Downloads\9E4CFEB1_6312189665.pdf
```

Extracted assignment title:

```txt
Case Study: Dynamic Portfolio Dashboard with React.Js, TypeScript, Tailwind & Node.Js
```

### Excel Dataset
Path:

```txt
C:\Users\Tanmay\Downloads\E555815F_58D029050B.xlsx
```

The Excel contains portfolio holdings grouped by sectors such as:

- Financial Sector
- Tech Sector
- Consumer
- Power
- Pipe Sector
- Others

Important columns found in the Excel include:

- Particulars / stock name
- Purchase Price
- Quantity
- Investment
- Portfolio %
- NSE/BSE code
- CMP
- Present value
- Gain/Loss
- Gain/Loss %
- Market cap
- P/E ratio
- Latest earnings
- Revenue
- EBITDA
- PAT
- CFO
- Free cash flow
- Debt to equity
- Book value
- Growth metrics
- Stage / exit notes

For the assignment MVP, only the required table columns need to be implemented first.

## 3. Assignment Requirements

Build a dynamic portfolio dashboard using:

- Frontend: Next.js / React.js
- Language: TypeScript
- Styling: Tailwind CSS
- Backend: Node.js, preferably through Next.js API routes for simplicity
- Data fetching: fetch, Axios, or similar
- Optional libraries: react-table, recharts
- Deployment: Vercel or Netlify
- Source control: GitHub

## 4. Core Functional Requirements

### 4.1 Portfolio Table

Display holdings in a table with these columns:

- Stock name / Particulars
- Purchase price
- Quantity
- Investment = purchase price * quantity
- Portfolio % = investment / total investment
- NSE/BSE code
- CMP, fetched from market data source
- Present value = CMP * quantity
- Gain/Loss = present value - investment
- P/E ratio
- Latest earnings

### 4.2 Dynamic Updates

CMP, present value, and gain/loss should update automatically at regular intervals.

The assignment suggests refreshing every 15 seconds.

Frontend polling can happen every 15 seconds, but backend market data should be cached to avoid excessive external calls.

### 4.3 Visual Indicators

Gain/Loss values should be color-coded:

- Green for gains
- Red for losses
- Neutral color for zero or unavailable values

### 4.4 Sector Grouping

Stocks should be grouped by sector.

Each sector should show summary values:

- Total investment
- Total present value
- Gain/Loss
- Gain/Loss %

### 4.5 Error Handling

The app should handle API failures gracefully:

- Show useful error messages
- Avoid crashing the UI
- Preserve last successful data if possible
- Show fallback values such as `N/A` when market data is unavailable

### 4.6 API Strategy

The assignment explicitly notes that Yahoo Finance and Google Finance do not provide simple official public APIs for the required data.

The implementation must acknowledge this and propose a practical solution:

- Use an unofficial Yahoo Finance source/package/API for CMP, or a server-side fetch/scrape strategy
- Use a Google Finance scrape/fallback strategy for P/E and latest earnings, or explain limitations
- Use caching, throttling, or batching to avoid rate limiting
- Keep external fetching on the server side, not directly in browser code

## 5. Recommended Architecture

Use a simple Next.js application where API routes act as the Node.js backend.

Recommended file structure:

```txt
app/
  page.tsx
  api/
    portfolio/
      route.ts
components/
  DashboardHeader.tsx
  SummaryCards.tsx
  PortfolioTable.tsx
  SectorSummary.tsx
  LoadingState.tsx
  ErrorState.tsx
lib/
  portfolio-data.ts
  types.ts
  calculations.ts
  market-data.ts
  cache.ts
  formatters.ts
```

### 5.1 Request Flow

```txt
Browser UI
  -> calls GET /api/portfolio
    -> API route loads static portfolio holdings
    -> market-data service fetches or reuses cached market data
    -> calculations service computes investment, present value, gain/loss, sector summaries
    -> API returns enriched portfolio response
  -> frontend renders summary cards, sector summaries, and table
  -> frontend polls again after 15 seconds
```

### 5.2 Why This Architecture Is Good For Tanmay

This architecture maps well to Tanmay's resume:

- React.js skills transfer to Next.js components
- Node.js backend experience maps to API routes and service functions
- REST API experience maps to `/api/portfolio`
- Redis/caching experience maps to in-memory cache now and Redis as a possible future improvement
- Rate limiting and security experience can be discussed in the README/interview
- TypeScript is already listed in skills, and this project gives practical use

## 6. Implementation Waves And Phases

## Wave 0 - Requirement Understanding And Project Decisions

Goal: understand the assignment fully and make practical technical decisions before coding.

### Phase 0.1 - Read And Summarize Requirements

Tasks:

- Read the assignment PDF.
- Read the Excel file structure.
- Identify the minimum required columns.
- Identify optional columns that can be ignored for MVP.
- Confirm final deliverables: GitHub repo, deployment link, Loom video, technical challenges document.

Output:

- Clear written summary of requirements.
- Agreement that MVP focuses on required columns and sector grouping.

Tanmay checkpoint:

- Tanmay should be able to explain what the app does in 2-3 minutes.

### Phase 0.2 - Decide MVP Scope

Tasks:

- Decide that MVP includes table, sector grouping, summary cards, polling, cache, and error handling.
- Decide optional features only after MVP: chart, search, sorting.
- Decide to use Next.js API routes as backend to keep deployment simpler.

Output:

- Final MVP feature list.
- Final optional feature list.

Tanmay checkpoint:

- Tanmay should explain why we are not overbuilding the project.

### Phase 0.3 - Decide Market Data Strategy

Tasks:

- Research or select a practical data source for CMP.
- Decide fallback behavior if Yahoo/Google data fails.
- Plan caching duration.
- Decide how to explain Google Finance limitations honestly.

Recommended strategy:

- Keep static holdings from Excel.
- Fetch CMP from a server-side market data function.
- Keep fallback CMP from Excel or seeded market data if live fetch fails.
- Use fallback values for P/E and latest earnings if scraping is unreliable.
- Explain in README that production-grade usage would require a paid reliable financial API.

Output:

- Market data strategy written in README later.

Tanmay checkpoint:

- Tanmay should explain why unofficial finance APIs are risky and why caching is needed.

## Wave 1 - Project Foundation

Goal: create a working Next.js + TypeScript + Tailwind project and understand the file structure.

### Phase 1.1 - Scaffold Next.js App

Tasks:

- Create a Next.js project with TypeScript and Tailwind.
- Use App Router.
- Confirm local dev server runs.
- Remove unnecessary starter content.

Expected commands may include:

```txt
npx create-next-app@latest . --typescript --tailwind --eslint --app
npm run dev
```

Output:

- App opens locally.
- Basic page renders.

Tanmay checkpoint:

- Tanmay should understand the difference between `app/page.tsx`, components, and API routes.

### Phase 1.2 - Create Basic Dashboard Layout

Tasks:

- Create a simple dashboard page.
- Add header/title.
- Add placeholders for summary cards, sector summary, and portfolio table.
- Use Tailwind for spacing, typography, responsive layout.

Output:

- Static dashboard shell visible in browser.

Tanmay checkpoint:

- Tanmay should explain how JSX and Tailwind classes build the UI.

### Phase 1.3 - Set Up Project Hygiene

Tasks:

- Confirm TypeScript compiles.
- Confirm lint command works.
- Add `.env.example` if external API config is needed.
- Keep commits small if using Git.

Output:

- Clean project baseline.

Tanmay checkpoint:

- Tanmay should know how to run dev, lint, and build commands.

## Wave 2 - Data Modeling And Static Portfolio Data

Goal: convert the Excel data into a clean TypeScript data model.

### Phase 2.1 - Define Types

Create types such as:

```ts
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
};
```

Tasks:

- Add `lib/types.ts`.
- Keep types simple and explainable.
- Avoid too many abstractions.

Output:

- Type definitions for holdings, market data, portfolio rows, and sector summaries.

Tanmay checkpoint:

- Tanmay should explain why TypeScript types help prevent mistakes.

### Phase 2.2 - Create Static Holdings Data

Tasks:

- Extract required holdings from Excel.
- Create `lib/portfolio-data.ts`.
- Store only required raw input fields: sector, name, symbol, purchase price, quantity.
- Do not hardcode derived fields like investment or gain/loss.

Output:

- Static holdings array ready for calculations.

Tanmay checkpoint:

- Tanmay should explain which fields are raw inputs and which are derived.

### Phase 2.3 - Add Formatting Helpers

Tasks:

- Create number/currency/percentage formatting helpers.
- Use `Intl.NumberFormat` where appropriate.
- Keep formatting separate from calculations.

Output:

- `formatCurrency`, `formatNumber`, `formatPercent` helpers.

Tanmay checkpoint:

- Tanmay should explain why formatting should not be mixed with business logic.

## Wave 3 - Calculation Layer

Goal: compute portfolio values in reusable pure functions.

### Phase 3.1 - Investment And Value Calculations

Tasks:

- Create `lib/calculations.ts`.
- Implement investment calculation.
- Implement present value calculation.
- Implement gain/loss calculation.
- Implement gain/loss percentage calculation.
- Handle null CMP safely.

Output:

- Pure calculation functions with predictable outputs.

Tanmay checkpoint:

- Tanmay should manually calculate one row and match it with code output.

### Phase 3.2 - Portfolio Percentage

Tasks:

- Calculate total investment.
- Calculate each holding's percentage weight.
- Avoid division by zero.

Output:

- Each portfolio row has `portfolioPercent`.

Tanmay checkpoint:

- Tanmay should explain why portfolio percentage depends on total investment.

### Phase 3.3 - Sector Grouping

Tasks:

- Group rows by sector.
- Calculate sector total investment.
- Calculate sector total present value.
- Calculate sector gain/loss and gain/loss percentage.

Output:

- `SectorSummary[]` from portfolio rows.

Tanmay checkpoint:

- Tanmay should explain `reduce` and grouping logic clearly.

## Wave 4 - Backend API Layer

Goal: expose portfolio data through a backend endpoint.

### Phase 4.1 - Create Portfolio API Route

Tasks:

- Create `app/api/portfolio/route.ts`.
- Return JSON response containing:
  - rows
  - sector summaries
  - total summary
  - last updated timestamp

Output:

- Browser can visit `/api/portfolio` and see JSON.

Tanmay checkpoint:

- Tanmay should explain what an API route is and how it differs from a React component.

### Phase 4.2 - Create Market Data Service

Tasks:

- Create `lib/market-data.ts`.
- Implement a function such as `getMarketDataForHoldings`.
- Return CMP, P/E ratio, and latest earnings per symbol.
- Use fallback values if live fetch is not available.
- Keep external API logic isolated from route handler.

Output:

- API can enrich holdings with market data.

Tanmay checkpoint:

- Tanmay should explain why external fetching is hidden inside a service module.

### Phase 4.3 - Add Cache

Tasks:

- Create `lib/cache.ts`.
- Implement simple in-memory cache with TTL.
- Cache market data by symbol.
- Use a TTL such as 60 seconds.

Output:

- Repeated API calls reuse cached market data when valid.

Tanmay checkpoint:

- Tanmay should explain cache hit, cache miss, TTL, and why polling every 15 seconds should not mean external fetch every 15 seconds.

### Phase 4.4 - Add Error Handling

Tasks:

- Wrap market data fetches in try/catch.
- Return fallback values where possible.
- Include a warning or source field if fallback was used.
- API should not crash due to one failed stock symbol.

Output:

- Stable API behavior even with partial external failures.

Tanmay checkpoint:

- Tanmay should explain graceful degradation.

## Wave 5 - Frontend Dashboard UI

Goal: render API data into a clean and responsive dashboard.

### Phase 5.1 - Fetch Portfolio Data On Client

Tasks:

- Create a client component for dashboard data fetching.
- Use `useEffect` for initial fetch.
- Use `useState` for data, loading, error, and refreshing states.

Output:

- Frontend shows API data from `/api/portfolio`.

Tanmay checkpoint:

- Tanmay should explain `useEffect`, `useState`, and async fetch flow.

### Phase 5.2 - Build Summary Cards

Tasks:

- Show total investment.
- Show current value.
- Show total gain/loss.
- Show gain/loss percentage.
- Color-code gain/loss card.

Output:

- Dashboard top section gives quick portfolio overview.

Tanmay checkpoint:

- Tanmay should explain props passed into summary card component.

### Phase 5.3 - Build Portfolio Table

Tasks:

- Render all required columns.
- Format money and percentages.
- Color-code gain/loss.
- Show `N/A` for missing values.
- Ensure table is responsive using horizontal scroll on small screens.

Output:

- Required assignment table is complete.

Tanmay checkpoint:

- Tanmay should explain how rows are mapped into table rows.

### Phase 5.4 - Build Sector Summary

Tasks:

- Render sector-level summaries.
- Show total investment, present value, and gain/loss per sector.
- Optionally make each sector collapsible only if time allows.

Output:

- Sector grouping requirement is satisfied.

Tanmay checkpoint:

- Tanmay should explain how backend sector data becomes UI.

### Phase 5.5 - Add Loading And Error States

Tasks:

- Show loading skeleton or loading text during initial fetch.
- Show error message if API fails.
- Show retry button if time allows.

Output:

- App feels stable and user-friendly.

Tanmay checkpoint:

- Tanmay should explain why loading and error states matter in async apps.

## Wave 6 - Dynamic Updates

Goal: implement live refresh behavior.

### Phase 6.1 - Poll Every 15 Seconds

Tasks:

- Add `setInterval` inside `useEffect`.
- Refresh portfolio data every 15 seconds.
- Show last updated timestamp.

Output:

- CMP, present value, and gain/loss refresh periodically.

Tanmay checkpoint:

- Tanmay should explain interval setup and cleanup.

### Phase 6.2 - Prevent UI Flicker

Tasks:

- Distinguish initial loading from background refreshing.
- Keep old data visible while refreshing.
- Show subtle refreshing indicator.

Output:

- Smooth refresh experience.

Tanmay checkpoint:

- Tanmay should explain why we do not clear the table on every refresh.

### Phase 6.3 - Verify Cache Behavior

Tasks:

- Log or inspect cache behavior during development.
- Confirm frontend polling does not hammer external services.
- Remove noisy logs before final submission.

Output:

- Demonstrable caching strategy.

Tanmay checkpoint:

- Tanmay should explain this clearly in the Loom video.

## Wave 7 - Optional Enhancements After MVP

Goal: improve presentation only after all required features work.

### Phase 7.1 - Sorting Or Filtering

Possible tasks:

- Add search by stock name.
- Add filter by sector.
- Add sort by gain/loss or portfolio percentage.

Only do this if the core app is complete.

### Phase 7.2 - Chart

Possible chart:

- Sector allocation pie/donut chart
- Gain/loss by sector bar chart

Use Recharts if added.

Keep chart simple and explainable.

### Phase 7.3 - UI Polish

Tasks:

- Improve spacing.
- Ensure mobile responsiveness.
- Add clear empty/fallback states.
- Check color contrast.

Do not overdesign. This is a dashboard, not a marketing landing page.

## Wave 8 - Testing, Review, And Quality Checks

Goal: make sure the project is reliable and interview-ready.

### Phase 8.1 - Manual Testing

Test:

- App loads successfully.
- API route returns JSON.
- Table values match calculations.
- Gain/loss colors are correct.
- Sector summaries are correct.
- Polling refreshes data.
- App handles API failures.
- App works on mobile width.

### Phase 8.2 - Build Verification

Commands:

```txt
npm run lint
npm run build
```

Fix all reasonable TypeScript/lint/build errors.

### Phase 8.3 - Code Review With Tanmay

Before final submission, Tanmay should walk through:

- Project structure
- Data model
- API route
- Market data service
- Cache logic
- Calculation functions
- Frontend fetch logic
- Polling logic
- Main UI components

Do not proceed to deployment until Tanmay can explain the flow.

## Wave 9 - Documentation And Deployment

Goal: complete the submission package.

### Phase 9.1 - README

README should include:

- Project overview
- Tech stack
- Features
- Setup instructions
- Environment variables if any
- API strategy
- Caching strategy
- Known limitations
- Future improvements

### Phase 9.2 - Challenges Document

Create a short PDF or Word doc explaining challenges and solutions.

Suggested challenges:

- Learning Next.js with limited prior experience
- Converting Excel portfolio structure into app data
- Handling derived financial calculations accurately
- Finance data APIs are unofficial/unreliable
- Avoiding excessive external requests through caching
- Handling partial API failures gracefully
- Implementing live updates without UI flicker
- Making the table responsive

### Phase 9.3 - Deployment

Recommended deployment:

- Vercel, because it supports Next.js easily.

Tasks:

- Push code to GitHub.
- Connect repo to Vercel.
- Add environment variables if needed.
- Verify deployed app works.
- Verify API route works in deployed environment.

### Phase 9.4 - Loom Video Preparation

Suggested Loom structure:

1. Introduce the assignment and goal.
2. Show the dashboard quickly.
3. Explain project structure.
4. Explain data model and Excel mapping.
5. Explain API route and market data strategy.
6. Explain caching and why it matters.
7. Explain calculations.
8. Explain frontend table and sector grouping.
9. Explain dynamic refresh.
10. Mention challenges and improvements.

Keep the video clear and honest. Do not claim external APIs are perfect if fallbacks were used.

## 7. Three-Day Execution Timeline

## Day 1 - Foundation And MVP Data Flow

Target outcome: app runs locally and shows portfolio data from API.

Tasks:

- Wave 0: requirement decisions
- Wave 1: project setup and dashboard shell
- Wave 2: types and static holdings data
- Wave 3: calculation layer
- Wave 4.1: basic API route
- Wave 5.1: frontend fetch from API

End-of-day checkpoint:

- Local app displays static calculated portfolio rows.
- Tanmay understands Next.js basics, types, data flow, and calculations.

## Day 2 - Dynamic Data, Grouping, And UI

Target outcome: dashboard satisfies core assignment requirements.

Tasks:

- Wave 4.2: market data service
- Wave 4.3: cache
- Wave 4.4: error handling
- Wave 5.2: summary cards
- Wave 5.3: portfolio table
- Wave 5.4: sector summary
- Wave 6: polling every 15 seconds

End-of-day checkpoint:

- App has table, sector grouping, dynamic refresh, color-coded gain/loss, and basic error handling.
- Tanmay can explain API flow and polling/caching logic.

## Day 3 - Polish, Documentation, Deployment

Target outcome: submission-ready project.

Tasks:

- Wave 7: optional enhancements only if time permits
- Wave 8: testing and build verification
- Wave 9.1: README
- Wave 9.2: challenges document
- Wave 9.3: deploy to Vercel
- Wave 9.4: Loom prep

End-of-day checkpoint:

- GitHub repo is ready.
- Deployment link works.
- README is complete.
- Challenges document is complete.
- Loom explanation can be recorded confidently.

## 8. Collaboration Rules For Future Agents

Any future agent working on this project should follow these rules:

1. Do not generate large unexplained code blocks.
2. Work one phase at a time.
3. After each phase, explain:
   - What changed
   - Why it was needed
   - Which requirement it satisfies
   - What Tanmay should understand before moving forward
4. Prefer simple, maintainable code over clever abstractions.
5. Keep the project interview-friendly.
6. Do not skip error handling and caching; they are important differentiators.
7. Avoid adding optional features before the required MVP works.
8. Keep external API limitations honest in README and Loom prep.
9. Ensure Tanmay can explain every file before submission.
10. Run `npm run lint` and `npm run build` before final deployment.

## 9. Key Interview Explanation Points

Tanmay should be prepared to explain:

- Why Next.js was used
- How App Router works at a basic level
- How `/api/portfolio` works as backend
- How static Excel data is modeled
- Why derived fields are calculated instead of hardcoded
- How sector grouping works
- How frontend polling works
- Why interval cleanup is necessary
- Why caching is needed
- What happens if market data fetching fails
- Limitations of Yahoo/Google Finance unofficial access
- How this could be improved in production

## 10. Production Improvements To Mention

If asked how to improve the project in a real production environment:

- Use a reliable paid financial data API
- Add Redis instead of in-memory cache
- Add request rate limiting
- Add background jobs for market data refresh
- Add persistent database for user portfolios
- Add authentication
- Add portfolio upload/import flow
- Add better observability and logs
- Add unit tests for calculation functions
- Add integration tests for API routes
- Add WebSockets or Server-Sent Events instead of polling

## 11. Definition Of Done

The project is complete when:

- Next.js app runs locally.
- Portfolio data from Excel is represented in the app.
- API route returns enriched portfolio data.
- Dashboard displays required table columns.
- Sector grouping and summaries work.
- Gain/loss values are color-coded.
- Dashboard refreshes every 15 seconds.
- Market data strategy includes caching and graceful fallback.
- README is complete.
- Challenges document is complete.
- App is deployed on Vercel or Netlify.
- GitHub repo link is ready.
- Tanmay can explain all major files and flows.
