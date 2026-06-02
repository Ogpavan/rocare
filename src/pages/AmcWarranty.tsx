import { useMemo, useState } from 'react'
import {
  Bell,
  CalendarClock,
  ChevronDown,
  Download,
  IndianRupee,
  MapPin,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShieldX,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ContractStatus = 'Active' | 'Renew Soon' | 'Expired'
type ContractType = 'AMC' | 'Warranty'

type Contract = {
  id: string
  type: ContractType
  customer: string
  phone: string
  area: string
  roUnit: string
  startDate: string
  endDate: string
  daysLeft: number
  visitsLeft: number
  amount: number
  status: ContractStatus
}

const contracts: Contract[] = [
  {
    id: 'AMC-3001',
    type: 'AMC',
    customer: 'Amit Sharma',
    phone: '+91 98765 43210',
    area: 'Salt Lake',
    roUnit: 'Aquaguard RO Max',
    startDate: '18 Dec 2025',
    endDate: '18 Dec 2026',
    daysLeft: 199,
    visitsLeft: 3,
    amount: 2400,
    status: 'Active',
  },
  {
    id: 'AMC-3002',
    type: 'AMC',
    customer: 'Priya Singh',
    phone: '+91 91234 55678',
    area: 'New Town',
    roUnit: 'Kent Supreme Plus',
    startDate: '04 Aug 2025',
    endDate: '04 Aug 2026',
    daysLeft: 63,
    visitsLeft: 1,
    amount: 2200,
    status: 'Active',
  },
  {
    id: 'WRN-1203',
    type: 'Warranty',
    customer: 'Ramesh Gupta',
    phone: '+91 99887 77665',
    area: 'Dum Dum',
    roUnit: 'Pureit Copper+ Mineral',
    startDate: '21 Jun 2025',
    endDate: '16 Jun 2026',
    daysLeft: 14,
    visitsLeft: 0,
    amount: 0,
    status: 'Renew Soon',
  },
  {
    id: 'WRN-1204',
    type: 'Warranty',
    customer: 'Neha Verma',
    phone: '+91 90909 11880',
    area: 'Rajarhat',
    roUnit: 'Livpure Smart Touch',
    startDate: '15 Feb 2026',
    endDate: '15 Feb 2027',
    daysLeft: 258,
    visitsLeft: 2,
    amount: 0,
    status: 'Active',
  },
  {
    id: 'AMC-3005',
    type: 'AMC',
    customer: 'Sanjay Das',
    phone: '+91 93300 44551',
    area: 'Barasat',
    roUnit: 'AO Smith Z8',
    startDate: '19 Sep 2025',
    endDate: '31 May 2026',
    daysLeft: 0,
    visitsLeft: 0,
    amount: 2600,
    status: 'Expired',
  },
]

const statusOptions: Array<ContractStatus | 'All'> = ['All', 'Active', 'Renew Soon', 'Expired']
const typeOptions: Array<ContractType | 'All'> = ['All', 'AMC', 'Warranty']

export function AmcWarranty() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<ContractStatus | 'All'>('All')
  const [type, setType] = useState<ContractType | 'All'>('All')

  const filteredContracts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return contracts.filter((contract) => {
      const matchesStatus = status === 'All' || contract.status === status
      const matchesType = type === 'All' || contract.type === type
      const matchesSearch =
        query.length === 0 ||
        [
          contract.id,
          contract.customer,
          contract.phone,
          contract.area,
          contract.roUnit,
          contract.type,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchesStatus && matchesType && matchesSearch
    })
  }, [search, status, type])

  const urgentContracts = contracts.filter((contract) => contract.status !== 'Active')

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">
            AMC / Warranty
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline">
            <Download size={16} strokeWidth={1.75} />
            Export
          </Button>
          <Button type="button">
            <Plus size={16} strokeWidth={1.75} />
            Add Plan
          </Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="hidden flex-wrap gap-2 lg:flex">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatus(option)}
                  className={cn(
                    'h-9 cursor-pointer rounded-md border bg-card px-3 text-sm font-medium text-muted-foreground transition-colors',
                    status === option && 'border-primary bg-accent text-primary',
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3 lg:contents">
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value as ContractStatus | 'All')}
                  className="h-10 min-w-0 rounded-md border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 lg:hidden"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === 'All' ? 'All Status' : option}
                    </option>
                  ))}
                </select>
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value as ContractType | 'All')}
                  className="h-10 min-w-0 rounded-md border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                >
                  {typeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === 'All' ? 'All Types' : option}
                    </option>
                  ))}
                </select>
              </div>
              <label className="relative block sm:w-[330px]">
                <Search
                  size={17}
                  strokeWidth={1.75}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customer, phone, unit"
                  className="h-10 w-full rounded-md border bg-card pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </label>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {filteredContracts.length} of {contracts.length} plans
          </p>

          {filteredContracts.length > 0 ? (
            <>
              <ContractsTable contracts={filteredContracts} />
              <ContractsCards contracts={filteredContracts} />
            </>
          ) : (
            <div className="grid min-h-[220px] place-items-center rounded-md border bg-muted/35 px-4 text-center">
              <div>
                <p className="font-semibold text-foreground">No plans found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try another customer, unit, type, or status.
                </p>
              </div>
            </div>
          )}
        </div>

        <aside className="order-first space-y-4 lg:order-none">
          <div className="rounded-md border bg-card p-4 admin-card-shadow">
            <p className="text-[15px] font-semibold text-foreground">Renew First</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Call these customers first. Their cover has expired or is ending soon.
            </p>
          </div>
          {urgentContracts.map((contract) => (
            <RenewalCard key={contract.id} contract={contract} />
          ))}
        </aside>
      </section>
    </div>
  )
}

type ContractsProps = {
  contracts: Contract[]
}

function ContractsTable({ contracts: tableContracts }: ContractsProps) {
  return (
    <div className="hidden overflow-hidden rounded-md border bg-card admin-card-shadow lg:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
          <thead className="bg-muted">
            <tr>
              {['Plan', 'Customer', 'RO Unit', 'End Date', 'Visits', 'Amount', 'Status', 'Actions'].map((header) => (
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
            {tableContracts.map((contract) => (
              <tr key={contract.id} className="transition-colors hover:bg-muted/45">
                <td className="border-b px-4 py-4 align-top">
                  <div className="flex gap-3">
                    <PlanIcon status={contract.status} />
                    <div>
                      <p className="font-semibold text-foreground">{contract.type}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{contract.id}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Start: {contract.startDate}</p>
                    </div>
                  </div>
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <p className="font-semibold text-foreground">{contract.customer}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone size={13} strokeWidth={1.75} />
                    {contract.phone}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={13} strokeWidth={1.75} />
                    {contract.area}
                  </p>
                </td>
                <td className="border-b px-4 py-4 align-top text-muted-foreground">{contract.roUnit}</td>
                <td className="border-b px-4 py-4 align-top">
                  <p className="font-semibold text-foreground">{contract.endDate}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {contract.daysLeft > 0 ? `${contract.daysLeft} days left` : 'Expired'}
                  </p>
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <p className="font-semibold text-foreground">{contract.visitsLeft}</p>
                  <p className="mt-1 text-xs text-muted-foreground">visits left</p>
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <p className="flex items-center gap-1 font-semibold text-foreground">
                    <IndianRupee size={14} strokeWidth={1.75} />
                    {contract.amount}
                  </p>
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <StatusBadge status={contract.status} />
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <div className="flex flex-col gap-2">
                    <Button type="button" size="sm" variant="outline" className="justify-start">
                      <Phone size={15} strokeWidth={1.75} />
                      Call
                    </Button>
                    <Button type="button" size="sm" variant="secondary" className="justify-start">
                      <Bell size={15} strokeWidth={1.75} />
                      Reminder
                    </Button>
                    <Button type="button" size="sm" className="justify-start">
                      <ShieldCheck size={15} strokeWidth={1.75} />
                      Renew
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ContractsCards({ contracts: cardContracts }: ContractsProps) {
  const [expandedContractId, setExpandedContractId] = useState<string | null>(null)

  return (
    <div className="space-y-3 lg:hidden">
      {cardContracts.map((contract) => {
        const isExpanded = expandedContractId === contract.id

        return (
          <div
            key={contract.id}
            className={cn(
              'rounded-md border p-4',
              contract.status === 'Active' && 'border-[#c8f3e4] bg-[#f3fdf9]',
              contract.status === 'Renew Soon' && 'border-[#ffe2b8] bg-[#fffbf2]',
              contract.status === 'Expired' && 'border-[#ffd0d7] bg-[#fff6f7]',
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/70 pb-3">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-foreground">{contract.customer}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-card/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {contract.id}
                  </span>
                  <span className="rounded bg-card/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {contract.type}
                  </span>
                  <StatusBadge status={contract.status} />
                </div>
              </div>
              <PlanIcon status={contract.status} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <ContractQuickFact icon={Phone} label="Phone" value={contract.phone} />
              <ContractQuickFact icon={MapPin} label="Area" value={contract.area} />
            </div>

            <button
              type="button"
              onClick={() => setExpandedContractId(isExpanded ? null : contract.id)}
              className="mt-3 flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border bg-card/75 px-3 py-2 text-left transition-colors hover:bg-card"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {isExpanded ? 'Hide details' : 'Details'}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-foreground">
                  Ends: {contract.endDate}
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
                  <ContractInfoLine icon={ShieldCheck} label="RO Unit" text={contract.roUnit} strong />
                </div>

                <div className="mt-3 grid gap-2 rounded-md border bg-card/75 p-3 text-sm">
                  <ContractInfoLine icon={CalendarClock} label="Start Date" text={contract.startDate} />
                  <ContractInfoLine icon={CalendarClock} label="End Date" text={contract.endDate} strong />
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Visits Left
                    </span>
                    <span className="font-semibold text-foreground">{contract.visitsLeft}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Amount
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-foreground">
                      <IndianRupee size={14} strokeWidth={1.75} />
                      {contract.amount}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button type="button" size="sm" variant="outline" className="w-full">
                    <Phone size={15} strokeWidth={1.75} />
                    Call
                  </Button>
                  <Button type="button" size="sm" variant="secondary" className="w-full">
                    <Bell size={15} strokeWidth={1.75} />
                    Remind
                  </Button>
                  <Button type="button" size="sm" className="w-full">
                    <ShieldCheck size={15} strokeWidth={1.75} />
                    Renew
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

function RenewalCard({ contract }: { contract: Contract }) {
  return (
    <div className="rounded-md border bg-card p-4 admin-card-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <PlanIcon status={contract.status} />
          <div>
            <p className="font-semibold text-foreground">{contract.customer}</p>
            <p className="mt-1 text-xs text-muted-foreground">{contract.roUnit}</p>
          </div>
        </div>
        <StatusBadge status={contract.status} />
      </div>
      <div className="mt-4 rounded-md bg-muted px-3 py-2">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <CalendarClock size={15} strokeWidth={1.75} className="text-primary" />
          {contract.endDate}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {contract.daysLeft > 0 ? `${contract.daysLeft} days left` : 'Already expired'}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button type="button" size="sm" variant="outline" className="w-full">
          <Phone size={15} strokeWidth={1.75} />
          Call
        </Button>
        <Button type="button" size="sm" className="w-full">
          <ShieldCheck size={15} strokeWidth={1.75} />
          Renew
        </Button>
      </div>
    </div>
  )
}

function PlanIcon({ status }: { status: ContractStatus }) {
  return (
    <span
      className={cn(
        'grid h-10 w-10 shrink-0 place-items-center rounded-md',
        status === 'Active' && 'bg-[#ecfbf6] text-secondary',
        status === 'Renew Soon' && 'bg-[#fff6e7] text-[#ff9f43]',
        status === 'Expired' && 'bg-[#fff1f3] text-primary',
      )}
    >
      {status === 'Expired' ? (
        <ShieldX size={20} strokeWidth={1.75} />
      ) : (
        <ShieldCheck size={20} strokeWidth={1.75} />
      )}
    </span>
  )
}

function ContractQuickFact({
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

function ContractInfoLine({
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

function StatusBadge({ status }: { status: ContractStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-md px-2.5 py-1 text-xs font-semibold',
        status === 'Active' && 'bg-[#ecfbf6] text-secondary',
        status === 'Renew Soon' && 'bg-[#fff6e7] text-[#ff9f43]',
        status === 'Expired' && 'bg-[#fff1f3] text-primary',
      )}
    >
      {status}
    </span>
  )
}
