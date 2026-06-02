import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarClock, IndianRupee, Phone, ShieldCheck, UserCog } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { customers, serviceTimelines } from '@/data/customers'

export function CustomerServiceTimeline() {
  const navigate = useNavigate()
  const { customerId } = useParams()
  const customer = customers.find((item) => item.id === customerId)
  const entries = customer ? serviceTimelines[customer.id] ?? [] : []

  if (!customer) {
    return (
      <div className="space-y-5">
        <Button type="button" variant="outline" onClick={() => navigate('/customers')}>
          <ArrowLeft size={16} strokeWidth={1.75} />
          Back to Customers
        </Button>
        <Card>
          <CardContent className="grid min-h-[260px] place-items-center p-5 text-center">
            <div>
              <p className="font-semibold text-foreground">Customer not found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Please select a customer from the customer list.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Button type="button" variant="outline" onClick={() => navigate('/customers')}>
            <ArrowLeft size={16} strokeWidth={1.75} />
            Back
          </Button>
          <h1 className="mt-4 text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">
            Service Timeline
          </h1>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Customer" value={customer.name} subText={customer.id} icon={UserCog} />
        <InfoCard title="Phone" value={customer.phone} subText={customer.area} icon={Phone} />
        <InfoCard title="RO Unit" value={customer.roUnit} subText={customer.amcStatus} icon={ShieldCheck} />
        <InfoCard title="Next Service" value={customer.nextService} subText={`Last: ${customer.lastService}`} icon={CalendarClock} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-[15px] font-medium">Horizontal Service Timeline</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Showing {entries.length} completed service records.
          </p>
        </CardHeader>
        <CardContent>
          {entries.length > 0 ? (
            <>
              <div className="rounded-md border bg-muted/20 p-4">
                <div className="overflow-x-auto pb-2">
                  <div className="flex min-w-max items-start py-4">
                    {entries.map((entry, index) => (
                      <div key={entry.id} className="w-[280px]">
                        <div className="flex items-center">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                            {index + 1}
                          </span>
                          {index < entries.length - 1 ? (
                            <span className="h-px flex-1 bg-border" />
                          ) : null}
                        </div>
                        <div className="mt-4 mr-4 rounded-md border bg-card p-4 transition-colors hover:bg-muted/35">
                          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                            {entry.date}
                          </p>
                          <p className="mt-2 font-semibold text-foreground">{entry.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {entry.id} | {entry.technician}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">{entry.notes}</p>
                          <p className="mt-3 inline-flex rounded-md bg-[#ecfbf6] px-2.5 py-1 text-xs font-semibold text-secondary">
                            {entry.amount > 0 ? `₹${entry.amount}` : 'AMC'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 overflow-x-auto rounded-md border">
                <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                  <thead className="bg-muted">
                    <tr>
                      {['Date', 'Service', 'Technician', 'Amount', 'Notes'].map((header) => (
                        <th
                          key={header}
                          className="border-b px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="bg-card transition-colors hover:bg-muted/55">
                        <td className="border-b px-4 py-4">
                          <p className="font-medium text-foreground">{entry.date}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{entry.id}</p>
                        </td>
                        <td className="border-b px-4 py-4 font-semibold text-foreground">{entry.title}</td>
                        <td className="border-b px-4 py-4 text-muted-foreground">{entry.technician}</td>
                        <td className="border-b px-4 py-4">
                          <span className="inline-flex items-center gap-1 font-semibold text-secondary">
                            {entry.amount > 0 ? (
                              <IndianRupee size={14} strokeWidth={1.75} />
                            ) : null}
                            {entry.amount > 0 ? entry.amount : 'AMC'}
                          </span>
                        </td>
                        <td className="border-b px-4 py-4 text-muted-foreground">{entry.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="grid min-h-[260px] place-items-center rounded-md border bg-muted/35 px-4 text-center">
              <div>
                <p className="font-semibold text-foreground">No service timeline found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Completed service records will appear here.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function InfoCard({
  title,
  value,
  subText,
  icon: Icon,
}: {
  title: string
  value: string
  subText: string
  icon: typeof UserCog
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 truncate font-semibold text-foreground">{value}</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{subText}</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-[#fff1f3] text-primary">
          <Icon size={22} strokeWidth={1.75} />
        </span>
      </CardContent>
    </Card>
  )
}
