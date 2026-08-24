import { useCallback, useEffect, useMemo, useState } from 'react'
import { getMarkets, ApiError } from './api/coingecko'
import { useDebounce } from './hooks/useDebounce'
import { useInterval } from './hooks/useInterval'
import { formatCompactNumber, formatPercent } from './utils/format'

import Header from './components/Header'
import TickerTape from './components/TickerTape'
import StatCard from './components/StatCard'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import CoinTable from './components/CoinTable'
import CoinDetailChart from './components/CoinDetailChart'
import TableSkeleton from './components/TableSkeleton'
import ErrorState from './components/ErrorState'
import EmptyState from './components/EmptyState'

const REFRESH_INTERVAL_MS = 60_000

export default function App() {
  const [coins, setCoins] = useState([])
  const [status, setStatus] = useState('loading') // loading | error | ready
  const [errorMessage, setErrorMessage] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState({ key: 'market_cap_rank', direction: 'asc' })
  const [selectedId, setSelectedId] = useState(null)

  const fetchCoins = useCallback(async ({ isBackground = false } = {}) => {
    isBackground ? setIsRefreshing(true) : setStatus('loading')
    try {
      const data = await getMarkets({ perPage: 100 })
      setCoins(data)
      setStatus('ready')
      setErrorMessage('')
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Something went wrong loading market data.'
      setErrorMessage(message)
      if (!isBackground) setStatus('error')
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchCoins()
  }, [fetchCoins])

  // Poll for fresh prices in the background without showing a full-page loader.
  useInterval(() => fetchCoins({ isBackground: true }), status === 'ready' ? REFRESH_INTERVAL_MS : null)

  const filteredCoins = useMemo(() => {
    let result = coins

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.trim().toLowerCase()
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q))
    }

    if (filter === 'gainers') result = result.filter((c) => c.price_change_percentage_24h > 0)
    if (filter === 'losers') result = result.filter((c) => c.price_change_percentage_24h < 0)

    const sorted = [...result].sort((a, b) => {
      const dir = sort.direction === 'asc' ? 1 : -1
      const av = a[sort.key] ?? -Infinity
      const bv = b[sort.key] ?? -Infinity
      return av > bv ? dir : av < bv ? -dir : 0
    })

    return sorted
  }, [coins, debouncedQuery, filter, sort])

  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'desc' },
    )
  }

  const stats = useMemo(() => {
    if (!coins.length) return null
    const totalMarketCap = coins.reduce((sum, c) => sum + (c.market_cap || 0), 0)
    const avgChange = coins.reduce((sum, c) => sum + (c.price_change_percentage_24h || 0), 0) / coins.length
    const topGainer = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)[0]
    const topLoser = [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)[0]
    return { totalMarketCap, avgChange, topGainer, topLoser }
  }, [coins])

  const selectedCoin = coins.find((c) => c.id === selectedId) || null
  const topMovers = useMemo(() => [...coins].sort((a, b) => b.market_cap - a.market_cap).slice(0, 15), [coins])

  return (
    <div className="min-h-screen bg-ink-900">
      <Header lastUpdated={lastUpdated} isRefreshing={isRefreshing} onRefresh={() => fetchCoins()} />
      <TickerTape coins={topMovers} />

      <main className="mx-auto max-w-7xl px-6 py-6">
        {status === 'error' && <ErrorState message={errorMessage} onRetry={() => fetchCoins()} />}

        {status === 'loading' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[76px] animate-pulse rounded-lg border border-ink-700 bg-ink-800/60" />
              ))}
            </div>
            <TableSkeleton />
          </div>
        )}

        {status === 'ready' && (
          <div className="space-y-6">
            {stats && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="Total Market Cap" value={formatCompactNumber(stats.totalMarketCap)} tone="accent" />
                <StatCard
                  label="Avg 24h Change"
                  value={formatPercent(stats.avgChange)}
                  tone={stats.avgChange >= 0 ? 'up' : 'down'}
                />
                <StatCard
                  label="Top Gainer"
                  value={stats.topGainer.symbol.toUpperCase()}
                  tone="up"
                  sub={formatPercent(stats.topGainer.price_change_percentage_24h)}
                />
                <StatCard
                  label="Top Loser"
                  value={stats.topLoser.symbol.toUpperCase()}
                  tone="down"
                  sub={formatPercent(stats.topLoser.price_change_percentage_24h)}
                />
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <SearchBar value={query} onChange={setQuery} />
                  <FilterBar active={filter} onChange={setFilter} />
                  <span className="ml-auto font-mono text-xs text-mist-400">{filteredCoins.length} assets</span>
                </div>

                {filteredCoins.length === 0 ? (
                  <EmptyState query={debouncedQuery} />
                ) : (
                  <CoinTable
                    coins={filteredCoins}
                    sort={sort}
                    onSort={handleSort}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                )}
              </div>

              <div className="lg:sticky lg:top-6 lg:self-start">
                <CoinDetailChart coin={selectedCoin} />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-6 py-8 text-center text-xs text-mist-400">
        Market data from{' '}
        <a
          href="https://www.coingecko.com"
          target="_blank"
          rel="noreferrer"
          className="text-mist-300 underline decoration-ink-600 underline-offset-2 hover:text-amber-400"
        >
          CoinGecko
        </a>
        . Refreshes automatically every 60 seconds.
      </footer>
    </div>
  )
}
