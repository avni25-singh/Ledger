const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'gainers', label: 'Gainers' },
  { id: 'losers', label: 'Losers' },
]

export default function FilterBar({ active, onChange }) {
  return (
    <div className="flex gap-1.5 rounded-md border border-ink-600 bg-ink-800 p-1">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          aria-pressed={active === f.id}
          className={`rounded px-3 py-1.5 text-xs font-medium transition ${
            active === f.id
              ? 'bg-amber-500/15 text-amber-400'
              : 'text-mist-300 hover:text-mist-100'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
