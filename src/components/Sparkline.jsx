import { Line, LineChart, ResponsiveContainer } from 'recharts'

export default function Sparkline({ data, positive }) {
  if (!data?.length) return <div className="h-8 w-24" />

  const points = data.map((price, i) => ({ i, price }))
  const stroke = positive ? '#3FD6C0' : '#FF6B6B'

  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <Line type="monotone" dataKey="price" stroke={stroke} strokeWidth={1.5} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
