import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CalendarClock,
  ChevronDown,
  Download,
  Droplets,
  History,
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
import { Popup } from '@/components/ui/popup'
import { customers, type Customer, type CustomerStatus } from '@/data/customers'
import { cn } from '@/lib/utils'

const statusOptions: Array<CustomerStatus | 'All'> = [
  'All',
  'Active',
  'Service Due',
  'AMC Expiring',
]

const customerTableHeaders = [
  'Customer',
  'Phone',
  'Area',
  'RO Unit',
  'Next Service',
  'Status',
  'AMC',
  'Due',
  'Actions',
]

export function Customers() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<CustomerStatus | 'All'>('All')
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)

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
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Button type="button" variant="outline" className="w-full sm:w-auto">
            <Download size={16} strokeWidth={1.75} />
            Export
          </Button>
          <Button type="button" className="w-full sm:w-auto" onClick={() => setIsAddCustomerOpen(true)}>
            <Plus size={16} strokeWidth={1.75} />
            Add Customer
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
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
              <CustomersTable
                customers={filteredCustomers}
                onViewTimeline={(customerId) => navigate(`/customers/${customerId}/timeline`)}
              />
              <CustomersCards
                customers={filteredCustomers}
                onViewTimeline={(customerId) => navigate(`/customers/${customerId}/timeline`)}
              />
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
      <Popup
        open={isAddCustomerOpen}
        title="Add Customer"
        description="Enter basic customer, RO, service, and AMC details."
        onClose={() => setIsAddCustomerOpen(false)}
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setIsAddCustomerOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => setIsAddCustomerOpen(false)}>
              Save Customer
            </Button>
          </>
        }
      >
        <AddCustomerForm />
      </Popup>
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
      <CardContent className="flex items-center justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">{value}</p>
        </div>
        <span
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-md sm:h-11 sm:w-11',
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

type CustomerListProps = {
  customers: Customer[]
  onViewTimeline: (customerId: string) => void
}

function CustomersTable({ customers: tableCustomers, onViewTimeline }: CustomerListProps) {
  return (
    <div className="hidden overflow-x-auto rounded-md border lg:block">
      <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
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
              <td className="border-b px-4 py-4">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onViewTimeline(customer.id)}
                >
                  <History size={15} strokeWidth={1.75} />
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CustomersCards({ customers: cardCustomers, onViewTimeline }: CustomerListProps) {
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null)

  return (
    <div className="space-y-3 lg:hidden">
      {cardCustomers.map((customer) => {
        const isExpanded = expandedCustomerId === customer.id

        return (
          <div
            key={customer.id}
            className={cn(
              'rounded-md border p-4',
              customer.status === 'Active' && 'border-[#c8f3e4] bg-[#f3fdf9]',
              customer.status === 'Service Due' && 'border-[#ffd0d7] bg-[#fff6f7]',
              customer.status === 'AMC Expiring' && 'border-[#ffe2b8] bg-[#fffbf2]',
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/70 pb-3">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-foreground">{customer.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-card/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {customer.id}
                  </span>
                  <StatusBadge status={customer.status} />
                </div>
              </div>
              <span
                className={cn(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-md',
                  customer.status === 'Active' && 'bg-[#ecfbf6] text-secondary',
                  customer.status === 'Service Due' && 'bg-[#fff1f3] text-primary',
                  customer.status === 'AMC Expiring' && 'bg-[#fff6e7] text-[#ff9f43]',
                )}
              >
                <Users size={18} strokeWidth={1.75} />
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <QuickFact icon={Phone} label="Phone" value={customer.phone} />
              <QuickFact icon={MapPin} label="Area" value={customer.area} />
            </div>

            <button
              type="button"
              onClick={() => setExpandedCustomerId(isExpanded ? null : customer.id)}
              className="mt-3 flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border bg-card/75 px-3 py-2 text-left transition-colors hover:bg-card"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {isExpanded ? 'Hide details' : 'Details'}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-foreground">
                  Next service: {customer.nextService}
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
                <div className="mt-3 grid gap-2 text-sm">
                  <InfoLine icon={Droplets} label="RO Unit" text={customer.roUnit} strong />
                </div>
                <div className="mt-3 grid gap-2 rounded-md border bg-card/75 p-3 text-sm">
                  <InfoLine icon={CalendarClock} label="Next Service" text={customer.nextService} strong />
                  <InfoLine icon={UserCheck} label="Technician" text={customer.technician} />
                  <InfoLine icon={ShieldCheck} label="AMC" text={customer.amcStatus} strong />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => onViewTimeline(customer.id)}
                  >
                    <History size={15} strokeWidth={1.75} />
                    View
                  </Button>
                  <Button type="button" size="sm" variant="secondary" className="w-full">
                    Call
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

function QuickFact({
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

function AddCustomerForm() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Customer Name" />
        <FormField label="Phone Number" />
        <FormField label="Area" />
        <FormField label="Address" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="RO Brand / Model" />
        <FormField label="Installation Date" type="date" />
        <FormField label="Next Service Date" type="date" />
        <label className="block">
          <span className="text-sm font-medium text-muted-foreground">Customer Status</span>
          <select className="mt-2 h-10 w-full rounded-md border bg-card px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15">
            <option>Active</option>
            <option>Service Due</option>
            <option>AMC Expiring</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="AMC / Warranty" />
        <FormField label="Due Amount" type="number" />
      </div>
    </div>
  )
}

function FormField({
  label,
  type = 'text',
}: {
  label: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        className="mt-2 h-10 w-full rounded-md border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
    </label>
  )
}

type InfoLineProps = {
  icon: typeof Phone
  label: string
  text: string
  strong?: boolean
}

function InfoLine({ icon: Icon, label, text, strong = false }: InfoLineProps) {
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
