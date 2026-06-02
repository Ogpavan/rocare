import {
  PhoneCall,
  RefreshCw,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const revenueData = [
  { day: 'Mon', current: 5000, previous: 7000 },
  { day: 'Tue', current: 10000, previous: 15000 },
  { day: 'Wed', current: 4000, previous: 6000 },
  { day: 'Thu', current: 14500, previous: 10500 },
  { day: 'Fri', current: 8000, previous: 3000 },
  { day: 'Sat', current: 18500, previous: 11500 },
  { day: 'Sun', current: 8000, previous: 4000 },
  { day: 'Mon', current: 20000, previous: 10000 },
]

const products = [
  { name: 'Aquaguard RO', value: 2245 },
  { name: 'Membrane Filter', value: 1850 },
  { name: 'Sediment Filter', value: 1550 },
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.68fr)_minmax(260px,0.68fr)]">
        <RevenueCard />
        <RingCard title="Hit Rate" change="-12%" value={82} />
        <RingCard title="Deals" change="-55%" value={76} limit="152/200" variant="primary" />
        <MetricTile label="Order Value" value="₹ 88,568" icon={Trophy} iconColor="text-secondary" />
        <MetricTile label="Calls" value="3,568" icon={PhoneCall} iconColor="text-primary" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(260px,0.55fr)_minmax(260px,0.55fr)_minmax(0,1.6fr)]">
        <EmailCard />
        <ProductsCard />
        <AverageDealCard />
      </section>
    </div>
  )
}

function RevenueCard() {
  return (
    <Card className="min-h-[444px] xl:row-span-2">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-[15px] font-medium">Revenue</CardTitle>
          <div className="mt-6 grid grid-cols-2 gap-10">
            <div>
              <p className="text-sm text-muted-foreground">Current week</p>
              <p className="mt-2 text-2xl font-normal text-primary">₹82,124</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Previous week</p>
              <p className="mt-2 text-2xl font-normal text-muted-foreground">₹52,502</p>
            </div>
          </div>
        </div>
        <RefreshCw size={16} strokeWidth={1.65} className="mt-1 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-[278px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ left: -18, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid stroke="#e4e7ed" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={{ stroke: '#c9ced8' }}
                tickLine={false}
                tick={{ fill: '#555966', fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                domain={[0, 20000]}
                ticks={[0, 5000, 10000, 15000, 20000]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#555966', fontSize: 12 }}
              />
              <Tooltip
                cursor={{ stroke: '#e4e7ed' }}
                contentStyle={{
                  borderColor: '#e4e7ed',
                  borderRadius: 6,
                  boxShadow: '0 8px 18px rgba(69, 65, 78, 0.12)',
                }}
              />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="#bfc2c8"
                strokeDasharray="8 6"
                strokeWidth={4}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#ff4961"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

type RingCardProps = {
  title: string
  change: string
  value: number
  limit?: string
  variant?: 'default' | 'primary'
}

function RingCard({ title, change, value, limit, variant = 'default' }: RingCardProps) {
  const isPrimary = variant === 'primary'

  return (
    <Card
      className={cn(
        'min-h-[310px] overflow-hidden border-0',
        isPrimary ? 'honeycomb-bg-primary text-white' : 'honeycomb-bg',
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className={cn('text-[15px] font-medium', isPrimary && 'text-white')}>
            {title}
          </CardTitle>
          <span className={cn('text-sm text-primary', isPrimary && 'text-white')}>{change}</span>
        </div>
        <div className="flex items-center gap-5">
          {limit ? <span className="text-sm font-medium">{limit}</span> : null}
          <RefreshCw size={16} strokeWidth={1.65} className={isPrimary ? 'text-white' : 'text-muted-foreground'} />
        </div>
      </CardHeader>
      <CardContent className="grid place-items-center pb-8 pt-2">
        <div className="relative grid h-[188px] w-[188px] place-items-center">
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={isPrimary ? 'rgba(255,255,255,0.2)' : '#edf0f5'}
              strokeWidth="5"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              pathLength="100"
              stroke={isPrimary ? '#ffffff' : '#ff4961'}
              strokeDasharray={`${isPrimary ? value : 72} 100`}
              strokeLinecap="butt"
              strokeWidth="5"
            />
            {!isPrimary ? (
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                pathLength="100"
                stroke="#2ed8a3"
                strokeDasharray="10 100"
                strokeDashoffset="-72"
                strokeLinecap="butt"
                strokeWidth="5"
              />
            ) : null}
          </svg>
          <span className={cn('text-[30px] font-medium text-primary', isPrimary && 'text-white')}>
            {value}%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

type MetricTileProps = {
  label: string
  value: string
  icon: LucideIcon
  iconColor: string
}

function MetricTile({ label, value, icon: Icon, iconColor }: MetricTileProps) {
  return (
    <Card className="min-h-[100px]">
      <CardContent className="flex h-full items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-xl font-normal text-foreground">{value}</p>
        </div>
        <Icon size={42} strokeWidth={1.65} className={iconColor} />
      </CardContent>
    </Card>
  )
}

function EmailCard() {
  return (
    <Card className="min-h-[184px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[15px] font-medium">Emails</CardTitle>
        <RefreshCw size={16} strokeWidth={1.65} className="text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <ProgressRow label="Open rate" value="89%" progressClass="bg-primary" width="w-[89%]" />
        <ProgressRow label="Sent" value="310/500" progressClass="bg-secondary" width="w-[62%]" />
      </CardContent>
    </Card>
  )
}

type ProgressRowProps = {
  label: string
  value: string
  progressClass: string
  width: string
}

function ProgressRow({ label, value, progressClass, width }: ProgressRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-muted-foreground">{value}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={cn('h-full rounded-full', progressClass, width)} />
      </div>
    </div>
  )
}

function ProductsCard() {
  return (
    <Card className="min-h-[184px] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[15px] font-medium">Top Products</CardTitle>
        <button type="button" className="text-sm font-medium text-[#1e9ff2]">
          Show all
        </button>
      </CardHeader>
      <CardContent className="p-0">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center justify-between border-t px-7 py-3 text-sm"
          >
            <span className="font-semibold text-muted-foreground">{product.name}</span>
            <span className="text-muted-foreground">{product.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function AverageDealCard() {
  return (
    <Card className="min-h-[184px]">
      <CardHeader className="pb-0 text-center">
        <CardTitle className="text-[15px] font-medium">Average Deal Size</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 pt-4 sm:grid-cols-[1fr_1px_1fr] sm:items-center">
        <DealValue change="-30%" value="₹12,536" label="Per rep" changeClass="text-primary" />
        <div className="hidden h-[78px] bg-border sm:block" />
        <DealValue change="12%" value="₹18,548" label="Per team" changeClass="text-secondary" />
      </CardContent>
    </Card>
  )
}

type DealValueProps = {
  change: string
  value: string
  label: string
  changeClass: string
}

function DealValue({ change, value, label, changeClass }: DealValueProps) {
  return (
    <div className="text-center">
      <p className={cn('text-xs font-bold', changeClass)}>{change}</p>
      <p className="mt-3 text-[38px] font-normal leading-none text-foreground">{value}</p>
      <p className="mt-3 text-sm font-medium text-[#91a0ad]">{label}</p>
    </div>
  )
}
