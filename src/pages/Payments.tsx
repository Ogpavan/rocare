import { useMemo, useState } from 'react'
import { CalendarClock, ChevronDown, Download, IndianRupee, Phone, Plus, Receipt, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type PaymentStatus = 'Paid' | 'Pending' | 'Overdue'

type Payment = {
  id: string
  customer: string
  phone: string
  purpose: string
  amount: number
  mode: string
  date: string
  status: PaymentStatus
}

const payments: Payment[] = [
  { id: 'PAY-701', customer: 'Amit Sharma', phone: '+91 98765 43210', purpose: 'AMC Renewal', amount: 2400, mode: 'UPI', date: '01 Jun 2026', status: 'Paid' },
  { id: 'PAY-702', customer: 'Priya Singh', phone: '+91 91234 55678', purpose: 'Service Visit', amount: 450, mode: 'Cash', date: '02 Jun 2026', status: 'Pending' },
  { id: 'PAY-703', customer: 'Ramesh Gupta', phone: '+91 99887 77665', purpose: 'Filter Replacement', amount: 1200, mode: 'UPI', date: '29 May 2026', status: 'Overdue' },
  { id: 'PAY-704', customer: 'Neha Verma', phone: '+91 90909 11880', purpose: 'Installation', amount: 1800, mode: 'Card', date: '28 May 2026', status: 'Paid' },
]

const statusOptions: Array<PaymentStatus | 'All'> = ['All', 'Paid', 'Pending', 'Overdue']

export function Payments() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<PaymentStatus | 'All'>('All')

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase()
    return payments.filter((payment) => {
      const matchesStatus = status === 'All' || payment.status === status
      const matchesSearch = query.length === 0 || [payment.id, payment.customer, payment.phone, payment.purpose, payment.mode].join(' ').toLowerCase().includes(query)
      return matchesStatus && matchesSearch
    })
  }, [search, status])

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">Payments</h1>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Button type="button" variant="outline" className="w-full sm:w-auto"><Download size={16} strokeWidth={1.75} />Export</Button>
          <Button type="button" className="w-full sm:w-auto"><Plus size={16} strokeWidth={1.75} />Add Payment</Button>
        </div>
      </section>
      <section className="space-y-4">
        <Toolbar search={search} onSearch={setSearch} value={status} onChange={(value) => setStatus(value as PaymentStatus | 'All')} />
        <p className="text-sm text-muted-foreground">Showing {filteredPayments.length} of {payments.length} payments</p>
        {filteredPayments.length > 0 ? (
          <>
            <PaymentsTable payments={filteredPayments} />
            <PaymentsCards payments={filteredPayments} />
          </>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  )
}

function Toolbar({ search, onSearch, value, onChange }: { search: string; onSearch: (value: string) => void; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative block sm:w-[360px]">
        <Search size={17} strokeWidth={1.75} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search customer, payment, purpose" className="h-10 w-full rounded-md border bg-card pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" />
      </label>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 rounded-md border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15">
        {statusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  )
}

function PaymentsTable({ payments: tablePayments }: { payments: Payment[] }) {
  return (
    <div className="hidden overflow-hidden rounded-md border bg-card admin-card-shadow lg:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead className="bg-muted"><tr>{['Payment', 'Customer', 'Purpose', 'Amount', 'Mode', 'Date', 'Status', 'Actions'].map((header) => <th key={header} className="border-b px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{header}</th>)}</tr></thead>
          <tbody>
            {tablePayments.map((payment) => (
              <tr key={payment.id} className="transition-colors hover:bg-muted/45">
                <td className="border-b px-4 py-4"><p className="font-semibold text-foreground">{payment.id}</p></td>
                <td className="border-b px-4 py-4"><p className="font-semibold text-foreground">{payment.customer}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Phone size={13} strokeWidth={1.75} />{payment.phone}</p></td>
                <td className="border-b px-4 py-4 text-muted-foreground">{payment.purpose}</td>
                <td className="border-b px-4 py-4"><p className="flex items-center gap-1 font-semibold text-foreground"><IndianRupee size={14} strokeWidth={1.75} />{payment.amount}</p></td>
                <td className="border-b px-4 py-4 text-muted-foreground">{payment.mode}</td>
                <td className="border-b px-4 py-4 text-muted-foreground">{payment.date}</td>
                <td className="border-b px-4 py-4"><PaymentBadge status={payment.status} /></td>
                <td className="border-b px-4 py-4"><Button type="button" size="sm" variant="outline"><Receipt size={15} strokeWidth={1.75} />Receipt</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PaymentsCards({ payments: cardPayments }: { payments: Payment[] }) {
  const [expandedPaymentId, setExpandedPaymentId] = useState<string | null>(null)

  return (
    <div className="space-y-3 lg:hidden">
      {cardPayments.map((payment) => {
        const isExpanded = expandedPaymentId === payment.id

        return (
          <div
            key={payment.id}
            className={cn(
              'rounded-md border p-4',
              payment.status === 'Paid' && 'border-[#c8f3e4] bg-[#f3fdf9]',
              payment.status === 'Pending' && 'border-[#ffe2b8] bg-[#fffbf2]',
              payment.status === 'Overdue' && 'border-[#ffd0d7] bg-[#fff6f7]',
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/70 pb-3">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-foreground">{payment.customer}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-card/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {payment.id}
                  </span>
                  <PaymentBadge status={payment.status} />
                </div>
              </div>
              <span
                className={cn(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-md',
                  payment.status === 'Paid' && 'bg-[#ecfbf6] text-secondary',
                  payment.status === 'Pending' && 'bg-[#fff6e7] text-[#ff9f43]',
                  payment.status === 'Overdue' && 'bg-[#fff1f3] text-primary',
                )}
              >
                <IndianRupee size={18} strokeWidth={1.75} />
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <PaymentQuickFact icon={Phone} label="Phone" value={payment.phone} />
              <PaymentQuickFact icon={IndianRupee} label="Amount" value={`₹${payment.amount}`} />
            </div>

            <button
              type="button"
              onClick={() => setExpandedPaymentId(isExpanded ? null : payment.id)}
              className="mt-3 flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border bg-card/75 px-3 py-2 text-left transition-colors hover:bg-card"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {isExpanded ? 'Hide details' : 'Details'}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-foreground">
                  {payment.purpose}
                </span>
              </span>
              <ChevronDown
                size={16}
                strokeWidth={1.75}
                className={cn('shrink-0 text-muted-foreground transition-transform', isExpanded && 'rotate-180')}
              />
            </button>

            {isExpanded ? (
              <>
                <div className="mt-3 grid gap-2 rounded-md border bg-card/75 p-3 text-sm">
                  <PaymentInfoLine icon={Receipt} label="Purpose" text={payment.purpose} strong />
                  <PaymentInfoLine icon={CalendarClock} label="Date" text={payment.date} />
                  <PaymentInfoLine icon={IndianRupee} label="Mode" text={payment.mode} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button type="button" size="sm" variant="outline" className="w-full">
                    <Phone size={15} strokeWidth={1.75} />
                    Call
                  </Button>
                  <Button type="button" size="sm" className="w-full">
                    <Receipt size={15} strokeWidth={1.75} />
                    Receipt
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

function PaymentQuickFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone
  label: string
  value: string
}) {
  return (
    <div className="min-w-0 rounded-md border bg-card/70 px-3 py-2">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        <Icon size={13} strokeWidth={1.75} />
        {label}
      </div>
      <p className="mt-1 truncate text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}

function PaymentInfoLine({
  icon: Icon,
  label,
  text,
  strong = false,
}: {
  icon: typeof Phone
  label: string
  text: string
  strong?: boolean
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-muted-foreground" />
      <p className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </span>
        <span className={cn('mt-0.5 block truncate', strong ? 'font-semibold text-foreground' : 'text-foreground')}>
          {text}
        </span>
      </p>
    </div>
  )
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
  return <span className={cn('inline-flex rounded-md px-2.5 py-1 text-xs font-semibold', status === 'Paid' && 'bg-[#ecfbf6] text-secondary', status === 'Pending' && 'bg-[#fff6e7] text-[#ff9f43]', status === 'Overdue' && 'bg-[#fff1f3] text-primary')}>{status}</span>
}

function EmptyState() {
  return <div className="grid min-h-[220px] place-items-center rounded-md border bg-muted/35 px-4 text-center"><div><p className="font-semibold text-foreground">No payments found</p><p className="mt-2 text-sm text-muted-foreground">Try another search or status.</p></div></div>
}
