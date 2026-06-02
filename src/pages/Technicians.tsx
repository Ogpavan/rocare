import { useMemo, useState } from 'react'
import {
  BadgeCheck,
  CalendarClock,
  Download,
  MapPin,
  Phone,
  Plus,
  Search,
  Star,
  UserCog,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
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
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            See who is free, who is on a visit, and who can take the next service request.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline">
            <Download size={16} strokeWidth={1.75} />
            Export
          </Button>
          <Button type="button">
            <Plus size={16} strokeWidth={1.75} />
            Add Technician
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStatus(option)}
                className={cn(
                  'h-9 rounded-md border bg-card px-3 text-sm font-medium text-muted-foreground transition-colors',
                  status === option && 'border-primary bg-accent text-primary',
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <label className="relative block sm:w-[360px]">
            <Search
              size={17}
              strokeWidth={1.75}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, phone, area, skill"
              className="h-10 w-full rounded-md border bg-card pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {filteredTechnicians.length} of {technicians.length} technicians
        </p>

        {filteredTechnicians.length > 0 ? (
          <TechnicianCards technicians={filteredTechnicians} />
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
      </section>
    </div>
  )
}

function TechnicianCards({ technicians: cardTechnicians }: { technicians: Technician[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cardTechnicians.map((technician) => (
        <div
          key={technician.id}
          className="rounded-md border bg-card p-4 transition-colors hover:bg-muted/35"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 gap-3">
              <span
                className={cn(
                  'grid h-12 w-12 shrink-0 place-items-center rounded-md',
                  technician.status === 'Available' && 'bg-[#ecfbf6] text-secondary',
                  technician.status === 'On Job' && 'bg-[#fff6e7] text-[#ff9f43]',
                  technician.status === 'Off Duty' && 'bg-muted text-muted-foreground',
                )}
              >
                <UserCog size={24} strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">{technician.name}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">{technician.id}</p>
                <p className="mt-1 truncate text-sm text-muted-foreground">{technician.skill}</p>
              </div>
            </div>
            <StatusBadge status={technician.status} />
          </div>

          <div className="mt-4 rounded-md border bg-muted/45 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Current Work
            </p>
            <p className="mt-2 text-base font-semibold text-foreground">{technician.currentTask}</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarClock size={14} strokeWidth={1.75} className="text-primary" />
              Next visit: <span className="font-semibold text-foreground">{technician.nextVisit}</span>
            </p>
          </div>

          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <InfoLine icon={Phone} label="Phone" text={technician.phone} />
            <InfoLine icon={MapPin} label="Area" text={technician.area} />
            <InfoLine icon={Wrench} label="Jobs Today" text={`${technician.completedJobs}/${technician.todayJobs} done`} />
            <InfoLine icon={Star} label="Rating" text={`${technician.rating}/5`} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <SmallMetric icon={BadgeCheck} label="Done" value={technician.completedJobs.toString()} />
            <SmallMetric icon={Wrench} label="Pending" value={(technician.todayJobs - technician.completedJobs).toString()} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline">
              <Phone size={15} strokeWidth={1.75} />
              Call
            </Button>
            <Button type="button" size="sm" variant="secondary">
              <MapPin size={15} strokeWidth={1.75} />
              Route
            </Button>
            <Button type="button" size="sm">
              <UserCog size={15} strokeWidth={1.75} />
              Assign
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

type InfoLineProps = {
  icon: LucideIcon
  label: string
  text: string
}

function InfoLine({ icon: Icon, label, text }: InfoLineProps) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-muted-foreground" />
      <p className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-foreground">{text}</span>
      </p>
    </div>
  )
}

function SmallMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-md border bg-muted/45 px-3 py-2">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        <Icon size={14} strokeWidth={1.75} />
        {label}
      </div>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: TechnicianStatus }) {
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
