import { useEffect, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getMarketChart, ApiError } from '../api/coingecko'
import { formatCurrency } from '../utils/format'

const RANGES = [
  { label: '24H', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
]

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { price, timestamp } = payload[0].payload
  return (
    <div className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-xs shadow-lg">
      <p className="text-mist-400">{new Date(timestamp).toLocaleString()}</p>
      <p className="mt-0.5 font-mono font-semibold text-amber-400">{formatCurrency(price)}</p>
    </div>
  )
}

export default function CoinDetailChart({ coin }) {
  const [days, setDays] = useState(7)
  const [series, setSeries] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | error | ready

  useEffect(() => {
    if (!coin) return
    let cancelled = false
    setStatus('loading')

    getMarketChart(coin.id, days)
      .then((data) => {
        if (cancelled) return
        setSeries(data)
        setStatus('ready')
      })
      .catch((err) => {
        if (cancelled) return
        setStatus('error')
        console.error(err instanceof ApiError ? err.message : err)
      })

    return () => {
      cancelled = true
    }
  }, [coin, days])

  if (!coin) {
    return (
      <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed border-ink-600 text-center">
        <p className="text-sm text-mist-400">Select a coin from the table to see its price history.</p>
      </div>
    )
  }

  const positive = coin.price_change_percentage_24h >= 0

  return (
    <div className="rounded-lg border border-ink-700 bg-ink-800/40 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt="" width={32} height={32} className="rounded-full" />
          <div>
            <p className="font-display font-semibold text-mist-100">{coin.name}</p>
            <p className="font-mono text-xs text-mist-400">{coin.symbol.toUpperCase()}/USD</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-semibold text-mist-100">{formatCurrency(coin.current_price)}</p>
          <p className={`font-mono text-sm ${positive ? 'text-teal-500' : 'text-rose-500'}`}>
            {positive ? '+' : ''}
            {coin.price_change_percentage_24h?.toFixed(2)}% (24h)
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-1.5">
        {RANGES.map((r) => (
          <button
            key={r.days}
            onClick={() => setDays(r.days)}
            className={`rounded px-2.5 py-1 text-xs font-medium transition ${
              days === r.days ? 'bg-amber-500/15 text-amber-400' : 'text-mist-400 hover:text-mist-100'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="mt-3 h-64">
        {status === 'loading' && (
          <div className="flex h-full items-center justify-center text-sm text-mist-400">Loading chart…</div>
        )}
        {status === 'error' && (
          <div className="flex h-full items-center justify-center text-sm text-rose-500">
            Couldn't load price history. Try a different range.
          </div>
        )}
        {status === 'ready' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFB454" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#FFB454" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(ts) =>
                  new Date(ts).toLocaleDateString(undefined, days <= 1 ? { hour: '2-digit' } : { month: 'short', day: 'numeric' })
                }
                stroke="#5C6B79"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                minTickGap={40}
              />
              <YAxis
                domain={['auto', 'auto']}
                stroke="#5C6B79"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => formatCurrency(v, { compact: true })}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="price" stroke="#FFB454" strokeWidth={2} fill="url(#priceFill)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
