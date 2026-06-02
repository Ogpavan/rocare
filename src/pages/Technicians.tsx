import { useMemo, useState } from 'react'
import {
  ChevronDown,
  Trash2,
  Download,
  MapPin,
  Phone,
  Plus,
  Search,
  UserCog,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type TechnicianStatus = 'Available' | 'On Job' | 'Off Duty'

type Technician = {
  id: string
  name: string
  phone: string
  area: string
  skill: string
  status: TechnicianStatus
  todayJobs: number
  completedJobs: number
  rating: number
  nextVisit: string
  currentTask: string
}

const technicians: Technician[] = [
  {
    id: 'TECH-101',
    name: 'Rahul Sen',
    phone: '+91 90077 11223',
    area: 'Salt Lake, Rajarhat',
    skill: 'RO service, TDS check',
    status: 'Available',
    todayJobs: 3,
    completedJobs: 2,
    rating: 4.8,
    nextVisit: 'Today, 3:30 PM',
    currentTask: 'Ready for next assignment',
  },
  {
    id: 'TECH-102',
    name: 'Sourav Dey',
    phone: '+91 90112 88445',
    area: 'New Town',
    skill: 'Filter change, leakage',
    status: 'On Job',
    todayJobs: 4,
    completedJobs: 1,
    rating: 4.6,
    nextVisit: 'Today, 5:00 PM',
    currentTask: 'At Priya Singh service visit',
  },
  {
    id: 'TECH-103',
    name: 'Bikash Paul',
    phone: '+91 94322 77110',
    area: 'Dum Dum, Lake Town',
    skill: 'Membrane, pump repair',
    status: 'On Job',
    todayJobs: 2,
    completedJobs: 1,
    rating: 4.7,
    nextVisit: 'Tomorrow, 11:00 AM',
    currentTask: 'Membrane replacement in Dum Dum',
  },
  {
    id: 'TECH-104',
    name: 'Anirban Roy',
    phone: '+91 98302 11990',
    area: 'Barasat',
    skill: 'Installation, no water flow',
    status: 'Available',
    todayJobs: 2,
    completedJobs: 2,
    rating: 4.5,
    nextVisit: 'No pending visit',
    currentTask: 'Ready for next assignment',
  },
  {
    id: 'TECH-105',
    name: 'Imran Ali',
    phone: '+91 97488 33120',
    area: 'Howrah',
    skill: 'General service',
    status: 'Off Duty',
    todayJobs: 0,
    completedJobs: 0,
    rating: 4.4,
    nextVisit: 'Tomorrow, 10:00 AM',
    currentTask: 'Off duty today',
  },
]

const statusOptions: Array<TechnicianStatus | 'All'> = ['All', 'Available', 'On Job', 'Off Duty']

const technicianTableHeaders = [
  'Code',
  'Technician',
  'Phone',
  'Area',
  'Actions',
]

export function Technicians() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<TechnicianStatus | 'All'>('All')

  const filteredTechnicians = useMemo(() => {
    const query = search.trim().toLowerCase()

    return technicians.filter((technician) => {
      const matchesStatus = status === 'All' || technician.status === status
      const matchesSearch =
        query.length === 0 ||
        [technician.id, technician.name, technician.phone, technician.area, technician.skill]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchesStatus && matchesSearch
    })
  }, [search, status])

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">
            Technicians
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Button type="button" variant="outline" className="w-full sm:w-auto">
            <Download size={16} strokeWidth={1.75} />
            Export
          </Button>
          <Button type="button" className="w-full sm:w-auto">
            <Plus size={16} strokeWidth={1.75} />
            Add Technician
          </Button>
        </div>
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-[15px] font-medium">Technician List</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              Showing {filteredTechnicians.length} of {technicians.length} technicians
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
              onChange={(event) => setStatus(event.target.value as TechnicianStatus | 'All')}
              className="h-10 rounded-md border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'All' ? 'All Status' : option}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTechnicians.length > 0 ? (
            <>
              <TechniciansTable technicians={filteredTechnicians} />
              <TechniciansCards technicians={filteredTechnicians} />
            </>
          ) : (
            <div className="grid min-h-[220px] place-items-center rounded-md border bg-muted/35 px-4 text-center">
              <div>
                <p className="font-semibold text-foreground">No technicians found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try another name, area, skill, or status.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function TechniciansTable({ technicians: tableTechnicians }: { technicians: Technician[] }) {
  return (
    <div className="hidden overflow-x-auto rounded-md border lg:block">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="bg-muted">
          <tr>
            {technicianTableHeaders.map((header) => (
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
          {tableTechnicians.map((technician) => (
            <tr key={technician.id} className="bg-card transition-colors hover:bg-muted/55">
              <td className="border-b px-4 py-4 font-medium text-muted-foreground">{technician.id}</td>
              <td className="border-b px-4 py-4">
                <p className="font-semibold text-foreground">{technician.name}</p>
              </td>
              <td className="border-b px-4 py-4 text-muted-foreground">{technician.phone}</td>
              <td className="border-b px-4 py-4 text-muted-foreground">{technician.area}</td>
              <td className="border-b px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="outline">
                    <Phone size={15} strokeWidth={1.75} />
                    Call
                  </Button>
                  <Button type="button" size="sm" variant="secondary">
                    <UserCog size={15} strokeWidth={1.75} />
                    Assign
                  </Button>
                  <Button type="button" size="sm" variant="outline" className="text-primary hover:text-primary">
                    <Trash2 size={15} strokeWidth={1.75} />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TechniciansCards({ technicians: cardTechnicians }: { technicians: Technician[] }) {
  const [expandedTechnicianId, setExpandedTechnicianId] = useState<string | null>(null)

  return (
    <div className="space-y-3 lg:hidden">
      {cardTechnicians.map((technician) => {
        const isExpanded = expandedTechnicianId === technician.id

        return (
          <div
            key={technician.id}
            className={cn(
              'rounded-md border p-4',
              technician.status === 'Available' && 'border-[#c8f3e4] bg-[#f3fdf9]',
              technician.status === 'On Job' && 'border-[#ffe2b8] bg-[#fffbf2]',
              technician.status === 'Off Duty' && 'border-[#e4e7ed] bg-[#f8f8fb]',
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/70 pb-3">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-foreground">{technician.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-card/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {technician.id}
                  </span>
                  <TechnicianStatusBadge status={technician.status} />
                </div>
              </div>
              <span
                className={cn(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-md',
                  technician.status === 'Available' && 'bg-[#ecfbf6] text-secondary',
                  technician.status === 'On Job' && 'bg-[#fff6e7] text-[#ff9f43]',
                  technician.status === 'Off Duty' && 'bg-muted text-muted-foreground',
                )}
              >
                <UserCog size={18} strokeWidth={1.75} />
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <TechnicianQuickFact icon={Phone} label="Phone" value={technician.phone} />
              <TechnicianQuickFact icon={MapPin} label="Area" value={technician.area} />
            </div>

            <button
              type="button"
              onClick={() => setExpandedTechnicianId(isExpanded ? null : technician.id)}
              className="mt-3 flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border bg-card/75 px-3 py-2 text-left transition-colors hover:bg-card"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {isExpanded ? 'Hide details' : 'Details'}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-foreground">
                  {technician.currentTask}
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
                  <TechnicianInfoLine icon={UserCog} label="Skill" text={technician.skill} strong />
                  <TechnicianInfoLine icon={Plus} label="Next Visit" text={technician.nextVisit} />
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="rounded-md bg-muted/70 px-2 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Jobs
                      </p>
                      <p className="mt-1 font-semibold text-foreground">{technician.todayJobs}</p>
                    </div>
                    <div className="rounded-md bg-muted/70 px-2 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Done
                      </p>
                      <p className="mt-1 font-semibold text-foreground">{technician.completedJobs}</p>
                    </div>
                    <div className="rounded-md bg-muted/70 px-2 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Rating
                      </p>
                      <p className="mt-1 font-semibold text-foreground">{technician.rating}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button type="button" size="sm" variant="outline" className="w-full">
                    <Phone size={15} strokeWidth={1.75} />
                    Call
                  </Button>
                  <Button type="button" size="sm" variant="secondary" className="w-full">
                    <UserCog size={15} strokeWidth={1.75} />
                    Assign
                  </Button>
                  <Button type="button" size="sm" variant="outline" className="w-full text-primary hover:text-primary">
                    <Trash2 size={15} strokeWidth={1.75} />
                    Delete
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

function TechnicianQuickFact({
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

function TechnicianInfoLine({
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

function TechnicianStatusBadge({ status }: { status: TechnicianStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-md px-2.5 py-1 text-xs font-semibold',
        status === 'Available' && 'bg-[#ecfbf6] text-secondary',
        status === 'On Job' && 'bg-[#fff6e7] text-[#ff9f43]',
        status === 'Off Duty' && 'bg-muted text-muted-foreground',
      )}
    >
      {status}
    </span>
  )
}
