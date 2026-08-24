export default function StatCard({ label, value, tone = 'default', sub }) {
  const toneClass = {
    default: 'text-mist-100',
    up: 'text-teal-500',
    down: 'text-rose-500',
    accent: 'text-amber-500',
  }[tone]

  return (
    <div className="rounded-lg border border-ink-700 bg-ink-800/60 px-4 py-3.5">
      <p className="text-[11px] uppercase tracking-wider text-mist-400">{label}</p>
      <p className={`mt-1.5 font-mono text-xl font-semibold ${toneClass}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-mist-400">{sub}</p>}
    </div>
  )
}
