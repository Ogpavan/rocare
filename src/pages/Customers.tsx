import { useMemo, useState } from 'react'
import {
  CalendarClock,
  Download,
  Droplets,
  IndianRupee,
  MapPin,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  Wrench,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type CustomerStatus = 'Active' | 'Service Due' | 'AMC Expiring'

type Customer = {
  id: string
  name: string
  phone: string
  area: string
  roUnit: string
  lastService: string
  nextService: string
  technician: string
  amcStatus: string
  dueAmount: number
  status: CustomerStatus
}

const customers: Customer[] = [
  {
    id: 'CUS-1001',
    name: 'Amit Sharma',
    phone: '+91 98765 43210',
    area: 'Salt Lake',
    roUnit: 'Aquaguard RO Max',
    lastService: '18 May 2026',
    nextService: '18 Jun 2026',
    technician: 'Rahul',
    amcStatus: 'Active till Dec 2026',
    dueAmount: 0,
    status: 'Active',
  },
  {
    id: 'CUS-1002',
    name: 'Priya Singh',
    phone: '+91 91234 55678',
    area: 'New Town',
    roUnit: 'Kent Supreme',
    lastService: '02 Apr 2026',
    nextService: '04 Jun 2026',
    technician: 'Sourav',
    amcStatus: 'Active till Aug 2026',
    dueAmount: 450,
    status: 'Service Due',
  },
  {
    id: 'CUS-1003',
    name: 'Ramesh Gupta',
    phone: '+91 99887 77665',
    area: 'Dum Dum',
    roUnit: 'Pureit Copper+',
    lastService: '22 Mar 2026',
    nextService: '08 Jun 2026',
    technician: 'Bikash',
    amcStatus: 'Expires in 14 days',
    dueAmount: 1200,
    status: 'AMC Expiring',
  },
  {
    id: 'CUS-1004',
    name: 'Neha Verma',
    phone: '+91 90909 11880',
    area: 'Rajarhat',
    roUnit: 'Livpure Smart',
    lastService: '29 May 2026',
    nextService: '29 Jul 2026',
    technician: 'Rahul',
    amcStatus: 'Active till Jan 2027',
    dueAmount: 0,
    status: 'Active',
  },
  {
    id: 'CUS-1005',
    name: 'Sanjay Das',
    phone: '+91 93300 44551',
    area: 'Barasat',
    roUnit: 'AO Smith Z8',
    lastService: '14 Apr 2026',
    nextService: '03 Jun 2026',
    technician: 'Anirban',
    amcStatus: 'Active till Sep 2026',
    dueAmount: 650,
    status: 'Service Due',
  },
]

const statusOptions: Array<CustomerStatus | 'All'> = [
  'All',
  'Active',
  'Service Due',
  'AMC Expiring',
]

const customerTableHeaders = ['Customer', 'Phone', 'Area', 'RO Unit', 'Next Service', 'Status', 'AMC', 'Due']

export function Customers() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<CustomerStatus | 'All'>('All')

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return customers.filter((customer) => {
      const matchesStatus = status === 'All' || customer.status === status
      const matchesSearch =
        query.length === 0 ||
        [customer.name, customer.phone, customer.area, customer.roUnit, customer.id]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchesStatus && matchesSearch
    })
  }, [search, status])

  const totalDue = customers.reduce((sum, customer) => sum + customer.dueAmount, 0)
  const serviceDue = customers.filter((customer) => customer.status === 'Service Due').length
  const amcExpiring = customers.filter((customer) => customer.status === 'AMC Expiring').length

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">
            Customers
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Find customer details, service dates, AMC status, and pending payment in one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline">
            <Download size={16} strokeWidth={1.75} />
            Export
          </Button>
          <Button type="button">
            <Plus size={16} strokeWidth={1.75} />
            Add Customer
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Total Customers" value={customers.length.toString()} icon={Users} />
        <SummaryCard title="Service Due" value={serviceDue.toString()} icon={Wrench} tone="primary" />
        <SummaryCard title="AMC Expiring" value={amcExpiring.toString()} icon={ShieldCheck} tone="warning" />
        <SummaryCard title="Payment Due" value={`₹${totalDue}`} icon={IndianRupee} tone="secondary" />
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-[15px] font-medium">Customer List</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              Showing {filteredCustomers.length} of {customers.length} customers
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative block sm:w-[320px]">
              <Search
                size={17}
                strokeWidth={1.75}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, phone, area"
                className="h-10 w-full rounded-md border bg-card pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as CustomerStatus | 'All')}
              className="h-10 rounded-md border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length > 0 ? (
            <>
              <CustomersTable customers={filteredCustomers} />
              <CustomersCards customers={filteredCustomers} />
            </>
          ) : (
            <div className="grid min-h-[220px] place-items-center rounded-md border bg-muted/35 px-4 text-center">
              <div>
                <p className="font-semibold text-foreground">No customers found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try another name, phone number, area, or status.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

type SummaryCardProps = {
  title: string
  value: string
  icon: typeof Users
  tone?: 'default' | 'primary' | 'secondary' | 'warning'
}

function SummaryCard({ title, value, icon: Icon, tone = 'default' }: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
        </div>
        <span
          className={cn(
            'grid h-11 w-11 place-items-center rounded-md',
            tone === 'default' && 'bg-muted text-muted-foreground',
            tone === 'primary' && 'bg-[#fff1f3] text-primary',
            tone === 'secondary' && 'bg-[#ecfbf6] text-secondary',
            tone === 'warning' && 'bg-[#fff6e7] text-[#ff9f43]',
          )}
        >
          <Icon size={22} strokeWidth={1.75} />
        </span>
      </CardContent>
    </Card>
  )
}

function CustomersTable({ customers: tableCustomers }: CustomersCardsProps) {
  return (
    <div className="hidden overflow-hidden rounded-md border lg:block">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-muted">
          <tr>
            {customerTableHeaders.map((header) => (
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
          {tableCustomers.map((customer) => (
            <tr key={customer.id} className="bg-card transition-colors hover:bg-muted/55">
              <td className="border-b px-4 py-4">
                <p className="font-semibold text-foreground">{customer.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{customer.id}</p>
              </td>
              <td className="border-b px-4 py-4 text-muted-foreground">{customer.phone}</td>
              <td className="border-b px-4 py-4 text-muted-foreground">{customer.area}</td>
              <td className="border-b px-4 py-4 text-muted-foreground">{customer.roUnit}</td>
              <td className="border-b px-4 py-4">
                <p className="font-medium text-foreground">{customer.nextService}</p>
                <p className="mt-1 text-xs text-muted-foreground">Last: {customer.lastService}</p>
              </td>
              <td className="border-b px-4 py-4">
                <StatusBadge status={customer.status} />
              </td>
              <td className="border-b px-4 py-4 text-muted-foreground">{customer.amcStatus}</td>
              <td className="border-b px-4 py-4">
                <span className={cn('font-semibold', customer.dueAmount > 0 ? 'text-primary' : 'text-secondary')}>
                  {customer.dueAmount > 0 ? `₹${customer.dueAmount}` : 'Paid'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type CustomersCardsProps = {
  customers: Customer[]
}

function CustomersCards({ customers: cardCustomers }: CustomersCardsProps) {
  return (
    <div className="space-y-3 lg:hidden">
      {cardCustomers.map((customer) => (
        <div key={customer.id} className="rounded-md border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-foreground">{customer.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{customer.id}</p>
            </div>
            <StatusBadge status={customer.status} />
          </div>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <InfoLine icon={Phone} text={customer.phone} />
            <InfoLine icon={MapPin} text={customer.area} />
            <InfoLine icon={Droplets} text={customer.roUnit} />
            <InfoLine icon={CalendarClock} text={`Next service: ${customer.nextService}`} />
            <InfoLine icon={UserCheck} text={`Technician: ${customer.technician}`} />
            <InfoLine icon={ShieldCheck} text={customer.amcStatus} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline">
              View
            </Button>
            <Button type="button" size="sm" variant="secondary">
              Call
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

type InfoLineProps = {
  icon: typeof Phone
  text: string
}

function InfoLine({ icon: Icon, text }: InfoLineProps) {
  return (
    <p className="flex items-center gap-2">
      <Icon size={15} strokeWidth={1.75} className="text-muted-foreground" />
      <span>{text}</span>
    </p>
  )
}

type StatusBadgeProps = {
  status: CustomerStatus
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-md px-2.5 py-1 text-xs font-semibold',
        status === 'Active' && 'bg-[#ecfbf6] text-secondary',
        status === 'Service Due' && 'bg-[#fff1f3] text-primary',
        status === 'AMC Expiring' && 'bg-[#fff6e7] text-[#ff9f43]',
      )}
    >
      {status}
    </span>
  )
}
