export default function Header({ lastUpdated, isRefreshing, onRefresh }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-700 px-6 py-5">
      <div className="flex items-center gap-3">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="7" fill="#131A22" stroke="#28333F" />
          <path d="M8 20L13 12L18 17L24 9" stroke="#FFB454" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <h1 className="font-display text-lg font-semibold tracking-tight text-mist-100">Ledger</h1>
          <p className="text-xs text-mist-300">Live market dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-mist-300">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isRefreshing ? 'bg-amber-500 animate-pulseDot' : 'bg-teal-500'}`}
            aria-hidden="true"
          />
          <span className="font-mono">
            {isRefreshing ? 'Updating…' : lastUpdated ? `Synced ${lastUpdated}` : 'Connecting…'}
          </span>
        </div>
        <button
          onClick={onRefresh}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-1.5 text-xs font-medium text-mist-200 transition hover:border-amber-500/50 hover:text-amber-400"
        >
          Refresh
        </button>
      </div>
    </header>
  )
}
