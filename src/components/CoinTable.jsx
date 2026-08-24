import { formatCompactNumber, formatCurrency, formatPercent } from '../utils/format'
import Sparkline from './Sparkline'

const COLUMNS = [
  { key: 'market_cap_rank', label: '#', align: 'left' },
  { key: 'name', label: 'Coin', align: 'left' },
  { key: 'current_price', label: 'Price', align: 'right' },
  { key: 'price_change_percentage_24h', label: '24h', align: 'right' },
  { key: 'price_change_percentage_7d_in_currency', label: '7d', align: 'right' },
  { key: 'market_cap', label: 'Market Cap', align: 'right' },
  { key: 'sparkline', label: 'Last 7 Days', align: 'right' },
]

export default function CoinTable({ coins, sort, onSort, selectedId, onSelect }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-ink-700">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink-700 bg-ink-800/60 text-left">
            {COLUMNS.map((col) => {
              const sortable = col.key !== 'sparkline' && col.key !== 'name'
              const isActive = sort.key === col.key
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-mist-400 ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {sortable ? (
                    <button
                      onClick={() => onSort(col.key)}
                      className={`inline-flex items-center gap-1 transition hover:text-mist-100 ${
                        isActive ? 'text-amber-400' : ''
                      }`}
                    >
                      {col.label}
                      {isActive && <span aria-hidden="true">{sort.direction === 'asc' ? '↑' : '↓'}</span>}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const change24h = coin.price_change_percentage_24h
            const change7d = coin.price_change_percentage_7d_in_currency
            const selected = coin.id === selectedId
            return (
              <tr
                key={coin.id}
                onClick={() => onSelect(coin.id)}
                className={`cursor-pointer border-b border-ink-700/60 last:border-0 transition hover:bg-ink-800/40 ${
                  selected ? 'bg-amber-500/[0.06]' : ''
                }`}
              >
                <td className="px-4 py-3 font-mono text-xs text-mist-400">{coin.market_cap_rank ?? '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <img src={coin.image} alt="" width={20} height={20} className="rounded-full" loading="lazy" />
                    <div>
                      <p className="font-medium text-mist-100">{coin.name}</p>
                      <p className="text-xs text-mist-400">{coin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono font-tabular text-mist-100">
                  {formatCurrency(coin.current_price)}
                </td>
                <td className={`px-4 py-3 text-right font-mono font-tabular ${change24h >= 0 ? 'text-teal-500' : 'text-rose-500'}`}>
                  {formatPercent(change24h)}
                </td>
                <td className={`px-4 py-3 text-right font-mono font-tabular ${change7d >= 0 ? 'text-teal-500' : 'text-rose-500'}`}>
                  {formatPercent(change7d)}
                </td>
                <td className="px-4 py-3 text-right font-mono font-tabular text-mist-200">
                  {formatCompactNumber(coin.market_cap)}
                </td>
                <td className="px-4 py-3">
                  <Sparkline data={coin.sparkline_in_7d?.price} positive={change7d >= 0} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
