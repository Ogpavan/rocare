import { useMemo, useState } from 'react'
import {
  ChevronDown,
  CheckCircle2,
  Clock,
  Download,
  MapPin,
  Phone,
  Plus,
  Search,
  ShieldAlert,
  UserCog,
  Wrench,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type RequestStatus = 'New' | 'Assigned' | 'In Progress' | 'Done'
type RequestPriority = 'High' | 'Medium' | 'Low'

type ServiceRequest = {
  id: string
  issue: string
  customer: string
  phone: string
  area: string
  roUnit: string
  requestDate: string
  visitTime: string
  technician: string
  priority: RequestPriority
  status: RequestStatus
  note: string
}

const requests: ServiceRequest[] = [
  {
    id: 'SR-5001',
    issue: 'Water taste is bad',
    customer: 'Priya Singh',
    phone: '+91 91234 55678',
    area: 'New Town',
    roUnit: 'Kent Supreme Plus',
    requestDate: '02 Jun 2026',
    visitTime: 'Today, 11:30 AM',
    technician: 'Sourav',
    priority: 'High',
    status: 'Assigned',
    note: 'Customer says water has smell after filter change.',
  },
  {
    id: 'SR-5002',
    issue: 'No water flow',
    customer: 'Sanjay Das',
    phone: '+91 93300 44551',
    area: 'Barasat',
    roUnit: 'AO Smith Z8',
    requestDate: '02 Jun 2026',
    visitTime: 'Today, 2:00 PM',
    technician: 'Anirban',
    priority: 'High',
    status: 'New',
    note: 'Machine powers on but outlet has no water.',
  },
  {
    id: 'SR-5003',
    issue: 'Regular service due',
    customer: 'Amit Sharma',
    phone: '+91 98765 43210',
    area: 'Salt Lake',
    roUnit: 'Aquaguard RO Max',
    requestDate: '01 Jun 2026',
    visitTime: 'Tomorrow, 10:00 AM',
    technician: 'Rahul',
    priority: 'Medium',
    status: 'In Progress',
    note: 'Routine AMC visit with TDS check.',
  },
  {
    id: 'SR-5004',
    issue: 'Filter replacement',
    customer: 'Ramesh Gupta',
    phone: '+91 99887 77665',
    area: 'Dum Dum',
    roUnit: 'Pureit Copper+ Mineral',
    requestDate: '31 May 2026',
    visitTime: '04 Jun 2026, 4:00 PM',
    technician: 'Bikash',
    priority: 'Medium',
    status: 'Assigned',
    note: 'Membrane life is low. Carry membrane and sediment filter.',
  },
  {
    id: 'SR-5005',
    issue: 'Leakage fixed',
    customer: 'Neha Verma',
    phone: '+91 90909 11880',
    area: 'Rajarhat',
    roUnit: 'Livpure Smart Touch',
    requestDate: '29 May 2026',
    visitTime: 'Completed',
    technician: 'Rahul',
    priority: 'Low',
    status: 'Done',
    note: 'Pipe connector replaced and checked.',
  },
]

const statusOptions: Array<RequestStatus | 'All'> = [
  'All',
  'New',
  'Assigned',
  'In Progress',
  'Done',
]

const priorityOptions: Array<RequestPriority | 'All'> = ['All', 'High', 'Medium', 'Low']

export function ServiceRequests() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<RequestStatus | 'All'>('All')
  const [priority, setPriority] = useState<RequestPriority | 'All'>('All')

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase()

    return requests.filter((request) => {
      const matchesStatus = status === 'All' || request.status === status
      const matchesPriority = priority === 'All' || request.priority === priority
      const matchesSearch =
        query.length === 0 ||
        [
          request.id,
          request.issue,
          request.customer,
          request.phone,
          request.area,
          request.roUnit,
          request.technician,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchesStatus && matchesPriority && matchesSearch
    })
  }, [priority, search, status])

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">
            Service Requests
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Button type="button" variant="outline" className="w-full sm:w-auto">
            <Download size={16} strokeWidth={1.75} />
            Export
          </Button>
          <Button type="button" className="w-full sm:w-auto">
            <Plus size={16} strokeWidth={1.75} />
            New Request
          </Button>
        </div>
      </section>

      <section className="space-y-4">
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
                onChange={(event) => setStatus(event.target.value as RequestStatus | 'All')}
                className="h-10 min-w-0 rounded-md border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 lg:hidden"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 'All' ? 'All Status' : option}
                  </option>
                ))}
              </select>
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value as RequestPriority | 'All')}
                className="h-10 min-w-0 rounded-md border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 'All' ? 'All Priorities' : `${option} Priority`}
                  </option>
                ))}
              </select>
            </div>
            <label className="relative block sm:w-[340px]">
              <Search
                size={17}
                strokeWidth={1.75}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search request, customer, area"
                className="h-10 w-full rounded-md border bg-card pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {filteredRequests.length} of {requests.length} requests
        </p>

        {filteredRequests.length > 0 ? (
          <>
            <RequestsTable requests={filteredRequests} />
            <RequestsCards requests={filteredRequests} />
          </>
        ) : (
          <div className="grid min-h-[220px] place-items-center rounded-md border bg-muted/35 px-4 text-center">
            <div>
              <p className="font-semibold text-foreground">No service requests found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another customer name, area, issue, status, or priority.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

type RequestsTableProps = {
  requests: ServiceRequest[]
}

function RequestsTable({ requests: tableRequests }: RequestsTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-md border bg-card admin-card-shadow lg:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
          <thead className="bg-muted">
            <tr>
              {['Request', 'Customer', 'Visit Time', 'Technician', 'Priority', 'Status', 'Note', 'Actions'].map(
                (header) => (
                  <th
                    key={header}
                    className="border-b px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {tableRequests.map((request) => (
              <tr key={request.id} className="transition-colors hover:bg-muted/45">
                <td className="border-b px-4 py-4 align-top">
                  <div className="flex gap-3">
                    <span
                      className={cn(
                        'grid h-10 w-10 shrink-0 place-items-center rounded-md',
                        request.status === 'Done' && 'bg-[#ecfbf6] text-secondary',
                        request.status !== 'Done' &&
                          request.priority === 'High' &&
                          'bg-[#fff1f3] text-primary',
                        request.status !== 'Done' &&
                          request.priority === 'Medium' &&
                          'bg-[#fff6e7] text-[#ff9f43]',
                        request.status !== 'Done' &&
                          request.priority === 'Low' &&
                          'bg-muted text-muted-foreground',
                      )}
                    >
                      <Wrench size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{request.issue}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{request.id}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{request.roUnit}</p>
                    </div>
                  </div>
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <p className="font-semibold text-foreground">{request.customer}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone size={13} strokeWidth={1.75} />
                    {request.phone}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={13} strokeWidth={1.75} />
                    {request.area}
                  </p>
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <p className="flex items-center gap-2 font-semibold text-foreground">
                    <Clock size={15} strokeWidth={1.75} className="text-primary" />
                    {request.visitTime}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Requested: {request.requestDate}</p>
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <p className="flex items-center gap-2 font-medium text-foreground">
                    <UserCog size={15} strokeWidth={1.75} className="text-muted-foreground" />
                    {request.technician}
                  </p>
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <PriorityBadge priority={request.priority} />
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <StatusBadge status={request.status} />
                </td>
                <td className="max-w-[260px] border-b px-4 py-4 align-top">
                  <p className="leading-5 text-muted-foreground">{request.note}</p>
                </td>
                <td className="border-b px-4 py-4 align-top">
                  <div className="flex flex-col gap-2">
                    <Button type="button" size="sm" variant="outline" className="justify-start">
                      <Phone size={15} strokeWidth={1.75} />
                      Call
                    </Button>
                    <Button type="button" size="sm" variant="secondary" className="justify-start">
                      <UserCog size={15} strokeWidth={1.75} />
                      Assign
                    </Button>
                    <Button type="button" size="sm" className="justify-start">
                      {request.status === 'Done' ? (
                        <CheckCircle2 size={15} strokeWidth={1.75} />
                      ) : (
                        <ShieldAlert size={15} strokeWidth={1.75} />
                      )}
                      {request.status === 'Done' ? 'Closed' : 'Close'}
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

function RequestsCards({ requests: cardRequests }: RequestsTableProps) {
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null)

  return (
    <div className="space-y-3 lg:hidden">
      {cardRequests.map((request) => {
        const isExpanded = expandedRequestId === request.id

        return (
          <div
            key={request.id}
            className={cn(
              'rounded-md border p-4',
              request.status === 'New' && 'border-[#ffd0d7] bg-[#fff6f7]',
              request.status === 'Assigned' && 'border-[#cfeaff] bg-[#f4faff]',
              request.status === 'In Progress' && 'border-[#ffe2b8] bg-[#fffbf2]',
              request.status === 'Done' && 'border-[#c8f3e4] bg-[#f3fdf9]',
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/70 pb-3">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-foreground">{request.issue}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-card/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {request.id}
                  </span>
                  <StatusBadge status={request.status} />
                </div>
              </div>
              <span
                className={cn(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-md',
                  request.status === 'New' && 'bg-[#fff1f3] text-primary',
                  request.status === 'Assigned' && 'bg-[#edf7ff] text-[#1e9ff2]',
                  request.status === 'In Progress' && 'bg-[#fff6e7] text-[#ff9f43]',
                  request.status === 'Done' && 'bg-[#ecfbf6] text-secondary',
                )}
              >
                <Wrench size={18} strokeWidth={1.75} />
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <RequestQuickFact icon={UserCog} label="Customer" value={request.customer} />
              <RequestQuickFact icon={MapPin} label="Area" value={request.area} />
            </div>

            <button
              type="button"
              onClick={() => setExpandedRequestId(isExpanded ? null : request.id)}
              className="mt-3 flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border bg-card/75 px-3 py-2 text-left transition-colors hover:bg-card"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {isExpanded ? 'Hide details' : 'Details'}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-foreground">
                  Visit: {request.visitTime}
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
                  <MobileInfoLine icon={Phone} label="Phone" text={request.phone} />
                  <MobileInfoLine icon={Wrench} label="RO Unit" text={request.roUnit} strong />
                </div>

                <div className="mt-3 grid gap-2 rounded-md border bg-card/75 p-3 text-sm">
                  <MobileInfoLine icon={Clock} label="Visit Time" text={request.visitTime} strong />
                  <MobileInfoLine icon={UserCog} label="Technician" text={request.technician} />
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Priority
                    </span>
                    <PriorityBadge priority={request.priority} />
                  </div>
                </div>

                <p className="mt-3 rounded-md border bg-card/75 px-3 py-2 text-sm leading-6 text-muted-foreground">
                  {request.note}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button type="button" size="sm" variant="outline" className="w-full">
                    <Phone size={15} strokeWidth={1.75} />
                    Call
                  </Button>
                  <Button type="button" size="sm" variant="secondary" className="w-full">
                    <UserCog size={15} strokeWidth={1.75} />
                    Assign
                  </Button>
                  <Button type="button" size="sm" className="w-full">
                    {request.status === 'Done' ? (
                      <CheckCircle2 size={15} strokeWidth={1.75} />
                    ) : (
                      <ShieldAlert size={15} strokeWidth={1.75} />
                    )}
                    {request.status === 'Done' ? 'Done' : 'Close'}
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

function RequestQuickFact({
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

function MobileInfoLine({
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

type StatusBadgeProps = {
  status: RequestStatus
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-md px-2.5 py-1 text-xs font-semibold',
        status === 'New' && 'bg-[#fff1f3] text-primary',
        status === 'Assigned' && 'bg-[#edf7ff] text-[#1e9ff2]',
        status === 'In Progress' && 'bg-[#fff6e7] text-[#ff9f43]',
        status === 'Done' && 'bg-[#ecfbf6] text-secondary',
      )}
    >
      {status}
    </span>
  )
}

type PriorityBadgeProps = {
  priority: RequestPriority
}

function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-md px-2.5 py-1 text-xs font-semibold',
        priority === 'High' && 'bg-[#fff1f3] text-primary',
        priority === 'Medium' && 'bg-[#fff6e7] text-[#ff9f43]',
        priority === 'Low' && 'bg-muted text-muted-foreground',
      )}
    >
      {priority}
    </span>
  )
}
