export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mist-400"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or symbol…"
        aria-label="Search coins"
        className="w-full rounded-md border border-ink-600 bg-ink-800 py-2 pl-9 pr-3 text-sm text-mist-100 placeholder:text-mist-400 outline-none transition focus:border-amber-500/60"
      />
    </div>
  )
}
