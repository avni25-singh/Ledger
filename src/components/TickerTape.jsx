import { formatCurrency, formatPercent } from '../utils/format'

export default function TickerTape({ coins }) {
  if (!coins.length) return <div className="h-10 border-b border-ink-700 bg-ink-950" />

  // Duplicate the list so the CSS animation can loop seamlessly at -50%.
  const items = [...coins, ...coins]

  return (
    <div className="relative overflow-hidden border-b border-ink-700 bg-ink-950">
      <div className="flex w-max animate-ticker gap-8 whitespace-nowrap py-2.5">
        {items.map((coin, i) => {
          const up = coin.price_change_percentage_24h >= 0
          return (
            <div key={`${coin.id}-${i}`} className="flex items-center gap-2 px-2 font-mono text-xs">
              <span className="font-medium text-mist-200">{coin.symbol.toUpperCase()}</span>
              <span className="text-mist-100">{formatCurrency(coin.current_price)}</span>
              <span className={up ? 'text-teal-500' : 'text-rose-500'}>
                {formatPercent(coin.price_change_percentage_24h)}
              </span>
            </div>
          )
        })}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  )
}
