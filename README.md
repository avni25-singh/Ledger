# Ledger — Live Crypto Market Dashboard

A real-time cryptocurrency dashboard built with React and the CoinGecko API. Search and filter 100 coins by market cap, sort any column, and drill into a per-coin price chart across 24h/7d/30d/90d ranges — all backed by live data that auto-refreshes every 60 seconds.

**[Live demo →](https://ledger-40ncjtpjh-avni25-singhs-projects.vercel.app/)** &nbsp;·&nbsp; **[Repo →](https://github.com/avni25-singh/Ledger)**

Ledger is a fast, responsive crypto market dashboard for tracking live prices, market trends, and coin performance in one focused view.

<!-- Add a screenshot or GIF here once deployed, e.g.: -->
<!-- ![Dashboard screenshot](./docs/screenshot.png) -->

## Features


## Tech stack

| Layer      | Choice                                  |
| ---------- | ---------------------------------------- |
| Framework  | React 18 + Vite                          |
| Styling    | Tailwind CSS (custom token system)       |
| Charts     | Recharts                                 |
| Data       | CoinGecko public REST API                |
| Fonts      | Space Grotesk, IBM Plex Mono, Inter      |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build
npm run preview   # preview the production build locally
```

No environment variables or API keys are needed — CoinGecko's `/coins/markets` and `/coins/{id}/market_chart` endpoints are public.

## Project structure

```
src/
├── api/
│   └── coingecko.js       # fetch wrapper + typed ApiError for all requests
├── components/
│   ├── Header.jsx          # logo, sync status, manual refresh
│   ├── TickerTape.jsx      # scrolling top-movers strip
│   ├── StatCard.jsx        # summary metric card
│   ├── SearchBar.jsx       # debounced search input
│   ├── FilterBar.jsx       # all / gainers / losers toggle
│   ├── CoinTable.jsx       # sortable market table
│   ├── Sparkline.jsx       # inline 7d mini chart
│   ├── CoinDetailChart.jsx # selected coin's full price chart
│   ├── TableSkeleton.jsx   # loading state
│   ├── ErrorState.jsx      # network error + retry
│   └── EmptyState.jsx      # no search results
├── hooks/
│   ├── useDebounce.js      # debounce a fast-changing value
│   └── useInterval.js      # stable setInterval for polling
├── utils/
│   └── format.js           # currency / percent / compact-number formatting
├── App.jsx                  # state, data fetching, layout composition
└── main.jsx                 # React entry point
```

## Design notes

The visual direction borrows from financial terminal displays — a dark navy surface, monospaced tabular figures for anything numeric, and an amber accent standing in for old phosphor-CRT trading screens, rather than the generic dark-mode-plus-neon look. The scrolling ticker tape at the top is the signature element, echoing a physical stock ticker while doubling as a live top-movers view.

## Possible extensions


## Deploying

This is a static Vite build, so it deploys to Vercel or Netlify with zero config:

```bash
npm run build   # outputs to /dist
```

Push the repo to GitHub, then import it in [Vercel](https://vercel.com/new) or [Netlify](https://app.netlify.com/start) — both auto-detect the Vite build command and output directory.

## License

MIT