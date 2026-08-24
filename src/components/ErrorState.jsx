export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-rose-500/20 bg-rose-500/[0.04] px-6 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-rose-500">Connection error</p>
      <p className="max-w-sm text-sm text-mist-300">{message}</p>
      <button
        onClick={onRetry}
        className="mt-1 rounded-md border border-ink-600 bg-ink-800 px-4 py-2 text-xs font-medium text-mist-200 transition hover:border-amber-500/50 hover:text-amber-400"
      >
        Try again
      </button>
    </div>
  )
}
