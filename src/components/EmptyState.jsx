export default function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-ink-600 px-6 py-16 text-center">
      <p className="text-sm text-mist-200">No coins match "{query}"</p>
      <p className="text-xs text-mist-400">Try a different name or symbol.</p>
    </div>
  )
}
