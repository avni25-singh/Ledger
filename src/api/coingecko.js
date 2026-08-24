const BASE_URL = 'https://api.coingecko.com/api/v3'

/**
 * Thrown for any failed request so the UI layer can branch on a single
 * error type instead of inspecting fetch internals.
 */
export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path) {
  let response
  try {
    response = await fetch(`${BASE_URL}${path}`)
  } catch {
    throw new ApiError('Network request failed. Check your connection and try again.')
  }

  if (response.status === 429) {
    throw new ApiError('Rate limit reached. Wait a few seconds and try again.', 429)
  }
  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}.`, response.status)
  }
  return response.json()
}

/**
 * Top coins by market cap, including 24h/7d change and a 7-day sparkline.
 * @param {{ vsCurrency?: string, perPage?: number, page?: number }} params
 */
export function getMarkets({ vsCurrency = 'usd', perPage = 100, page = 1 } = {}) {
  const query = new URLSearchParams({
    vs_currency: vsCurrency,
    order: 'market_cap_desc',
    per_page: String(perPage),
    page: String(page),
    sparkline: 'true',
    price_change_percentage: '1h,24h,7d',
  })
  return request(`/coins/markets?${query.toString()}`)
}

/**
 * Historical price series for a single coin, used to draw the detail chart.
 * @param {string} id CoinGecko coin id, e.g. "bitcoin"
 * @param {number} days lookback window in days
 */
export async function getMarketChart(id, days = 7) {
  const query = new URLSearchParams({ vs_currency: 'usd', days: String(days) })
  const data = await request(`/coins/${id}/market_chart?${query.toString()}`)
  // Normalize [timestamp, price] pairs into chart-friendly objects.
  return data.prices.map(([timestamp, price]) => ({ timestamp, price }))
}
