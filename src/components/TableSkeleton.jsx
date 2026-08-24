export default function TableSkeleton({ rows = 8 }) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink-700">
      <div className="border-b border-ink-700 bg-ink-800/60 px-4 py-3">
        <div className="h-3 w-40 animate-pulse rounded bg-ink-700" />
      </div>
      <div className="divide-y divide-ink-700/60">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3.5">
            <div className="h-6 w-6 animate-pulse rounded-full bg-ink-700" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-32 animate-pulse rounded bg-ink-700" />
              <div className="h-2.5 w-16 animate-pulse rounded bg-ink-700/70" />
            </div>
            <div className="h-3 w-16 animate-pulse rounded bg-ink-700" />
            <div className="h-3 w-12 animate-pulse rounded bg-ink-700" />
            <div className="h-3 w-20 animate-pulse rounded bg-ink-700" />
            <div className="h-8 w-24 animate-pulse rounded bg-ink-700/70" />
          </div>
        ))}
      </div>
    </div>
  )
}
