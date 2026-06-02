import { useMemo, useState } from 'react'
import { Download, IndianRupee, Phone, Plus, Receipt, Search } from 'lucide-react'

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
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Track paid, pending, and overdue customer payments.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline"><Download size={16} strokeWidth={1.75} />Export</Button>
          <Button type="button"><Plus size={16} strokeWidth={1.75} />Add Payment</Button>
        </div>
      </section>
      <section className="space-y-4">
        <Toolbar search={search} onSearch={setSearch} value={status} onChange={(value) => setStatus(value as PaymentStatus | 'All')} />
        <p className="text-sm text-muted-foreground">Showing {filteredPayments.length} of {payments.length} payments</p>
        {filteredPayments.length > 0 ? <PaymentsTable payments={filteredPayments} /> : <EmptyState />}
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
    <div className="overflow-hidden rounded-md border bg-card admin-card-shadow">
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

function PaymentBadge({ status }: { status: PaymentStatus }) {
  return <span className={cn('inline-flex rounded-md px-2.5 py-1 text-xs font-semibold', status === 'Paid' && 'bg-[#ecfbf6] text-secondary', status === 'Pending' && 'bg-[#fff6e7] text-[#ff9f43]', status === 'Overdue' && 'bg-[#fff1f3] text-primary')}>{status}</span>
}

function EmptyState() {
  return <div className="grid min-h-[220px] place-items-center rounded-md border bg-muted/35 px-4 text-center"><div><p className="font-semibold text-foreground">No payments found</p><p className="mt-2 text-sm text-muted-foreground">Try another search or status.</p></div></div>
}
