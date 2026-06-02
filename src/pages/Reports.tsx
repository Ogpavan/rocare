import { BarChart3, CalendarClock, Download, IndianRupee, TrendingUp, Wrench, type LucideIcon } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Button } from '@/components/ui/button'

const reportData = [
  { month: 'Jan', revenue: 220, services: 42 },
  { month: 'Feb', revenue: 260, services: 51 },
  { month: 'Mar', revenue: 310, services: 56 },
  { month: 'Apr', revenue: 285, services: 49 },
  { month: 'May', revenue: 360, services: 64 },
  { month: 'Jun', revenue: 420, services: 72 },
]

export function Reports() {
  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">Reports</h1>
        </div>
        <Button type="button" variant="outline"><Download size={16} strokeWidth={1.75} />Export Report</Button>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <ReportCard title="Revenue" value="₹4.2L" icon={IndianRupee} />
        <ReportCard title="Services" value="72" icon={Wrench} />
        <ReportCard title="Renewals" value="18" icon={CalendarClock} />
        <ReportCard title="Growth" value="+12%" icon={TrendingUp} />
      </section>

      <section className="rounded-md border bg-card p-5 admin-card-shadow">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[15px] font-semibold text-foreground">Monthly Report</p>
            <p className="mt-2 text-sm text-muted-foreground">Dummy revenue and service count.</p>
          </div>
          <BarChart3 size={22} strokeWidth={1.75} className="text-primary" />
        </div>
        <div className="mt-5 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData}>
              <CartesianGrid stroke="#e4e7ed" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#6b6f82', fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#6b6f82', fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderColor: '#e4e7ed', borderRadius: 6 }} />
              <Bar dataKey="revenue" fill="#ff4961" radius={[4, 4, 0, 0]} />
              <Bar dataKey="services" fill="#2ed8a3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}

function ReportCard({ title, value, icon: Icon }: { title: string; value: string; icon: LucideIcon }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border bg-card p-4 admin-card-shadow sm:p-5">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">{value}</p>
      </div>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#fff1f3] text-primary sm:h-11 sm:w-11">
        <Icon size={20} strokeWidth={1.75} />
      </span>
    </div>
  )
}
