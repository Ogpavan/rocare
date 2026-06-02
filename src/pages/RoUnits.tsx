import { useMemo, useState } from 'react'
import {
  CalendarClock,
  Download,
  Droplets,
  Gauge,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  User,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type UnitStatus = 'Active' | 'Service Due' | 'Warranty Ending'

type RoUnit = {
  id: string
  serialNo: string
  model: string
  brand: string
  customer: string
  area: string
  installDate: string
  lastService: string
  nextService: string
  filterStatus: string
  warranty: string
  status: UnitStatus
}

const roUnits: RoUnit[] = [
  {
    id: 'RO-2101',
    serialNo: 'AQM-92831',
    model: 'RO Max 12L',
    brand: 'Aquaguard',
    customer: 'Amit Sharma',
    area: 'Salt Lake',
    installDate: '12 Jan 2025',
    lastService: '18 May 2026',
    nextService: '18 Jun 2026',
    filterStatus: 'Good',
    warranty: 'AMC till Dec 2026',
    status: 'Active',
  },
  {
    id: 'RO-2102',
    serialNo: 'KNT-55201',
    model: 'Supreme Plus',
    brand: 'Kent',
    customer: 'Priya Singh',
    area: 'New Town',
    installDate: '04 Aug 2024',
    lastService: '02 Apr 2026',
    nextService: '04 Jun 2026',
    filterStatus: 'Filter change due',
    warranty: 'AMC till Aug 2026',
    status: 'Service Due',
  },
  {
    id: 'RO-2103',
    serialNo: 'PRT-11908',
    model: 'Copper+ Mineral',
    brand: 'Pureit',
    customer: 'Ramesh Gupta',
    area: 'Dum Dum',
    installDate: '21 Jun 2025',
    lastService: '22 Mar 2026',
    nextService: '08 Jun 2026',
    filterStatus: 'Low membrane life',
    warranty: 'Ends in 14 days',
    status: 'Warranty Ending',
  },
  {
    id: 'RO-2104',
    serialNo: 'LVP-77120',
    model: 'Smart Touch',
    brand: 'Livpure',
    customer: 'Neha Verma',
    area: 'Rajarhat',
    installDate: '15 Feb 2026',
    lastService: '29 May 2026',
    nextService: '29 Jul 2026',
    filterStatus: 'Good',
    warranty: 'Warranty till Feb 2027',
    status: 'Active',
  },
  {
    id: 'RO-2105',
    serialNo: 'AOS-34018',
    model: 'Z8 Water Saver',
    brand: 'AO Smith',
    customer: 'Sanjay Das',
    area: 'Barasat',
    installDate: '19 Sep 2024',
    lastService: '14 Apr 2026',
    nextService: '03 Jun 2026',
    filterStatus: 'Pre-filter due',
    warranty: 'AMC till Sep 2026',
    status: 'Service Due',
  },
]

const statusOptions: Array<UnitStatus | 'All'> = [
  'All',
  'Active',
  'Service Due',
  'Warranty Ending',
]

export function RoUnits() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<UnitStatus | 'All'>('All')

  const filteredUnits = useMemo(() => {
    const query = search.trim().toLowerCase()

    return roUnits.filter((unit) => {
      const matchesStatus = status === 'All' || unit.status === status
      const matchesSearch =
        query.length === 0 ||
        [unit.id, unit.serialNo, unit.brand, unit.model, unit.customer, unit.area]
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
            RO Units
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Track installed RO machines, service dates, filter condition, and warranty status.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline">
            <Download size={16} strokeWidth={1.75} />
            Export
          </Button>
          <Button type="button">
            <Plus size={16} strokeWidth={1.75} />
            Add RO Unit
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Showing {filteredUnits.length} of {roUnits.length} RO units
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative block sm:w-[340px]">
              <Search
                size={17}
                strokeWidth={1.75}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search serial, customer, area"
                className="h-10 w-full rounded-md border bg-card pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as UnitStatus | 'All')}
              className="h-10 rounded-md border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        {filteredUnits.length > 0 ? (
          <UnitsCards units={filteredUnits} />
        ) : (
          <div className="grid min-h-[220px] place-items-center rounded-md border bg-muted/35 px-4 text-center">
            <div>
              <p className="font-semibold text-foreground">No RO units found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another serial number, customer name, area, or status.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

type UnitsProps = {
  units: RoUnit[]
}

function UnitsCards({ units }: UnitsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {units.map((unit) => (
        <div key={unit.id} className="rounded-md border bg-card p-4 transition-colors hover:bg-muted/35">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 gap-3">
              <span
                className={cn(
                  'grid h-12 w-12 shrink-0 place-items-center rounded-md',
                  unit.status === 'Active' && 'bg-[#ecfbf6] text-secondary',
                  unit.status === 'Service Due' && 'bg-[#fff1f3] text-primary',
                  unit.status === 'Warranty Ending' && 'bg-[#fff6e7] text-[#ff9f43]',
                )}
              >
                <Droplets size={24} strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">{unit.brand}</p>
                <p className="mt-1 truncate text-sm text-muted-foreground">{unit.model}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">Serial: {unit.serialNo}</p>
              </div>
            </div>
            <StatusBadge status={unit.status} />
          </div>

          <div className="mt-4 rounded-md border bg-muted/45 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Next Service
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-foreground">{unit.nextService}</p>
              <Wrench size={21} strokeWidth={1.75} className="text-primary" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Last service: <span className="font-semibold text-foreground">{unit.lastService}</span>
            </p>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <InfoLine icon={User} label="Customer" text={unit.customer} />
            <InfoLine icon={MapPin} label="Area" text={unit.area} />
            <InfoLine icon={CalendarClock} label="Installed" text={unit.installDate} />
            <InfoLine icon={Gauge} label="Unit ID" text={unit.id} />
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <HealthPill icon={Droplets} label="Filter" text={unit.filterStatus} tone={getFilterTone(unit)} />
            <HealthPill icon={ShieldCheck} label="Warranty" text={unit.warranty} tone={getWarrantyTone(unit)} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline">
              View
            </Button>
            <Button type="button" size="sm" variant="secondary">
              Service
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

type HealthPillProps = {
  icon: LucideIcon
  label: string
  text: string
  tone: 'good' | 'warn' | 'danger'
}

function HealthPill({ icon: Icon, label, text, tone }: HealthPillProps) {
  return (
    <div
      className={cn(
        'rounded-md border px-3 py-2',
        tone === 'good' && 'border-[#c8f3e4] bg-[#ecfbf6]',
        tone === 'warn' && 'border-[#ffe2b8] bg-[#fff6e7]',
        tone === 'danger' && 'border-[#ffd0d7] bg-[#fff1f3]',
      )}
    >
      <div className="flex items-center gap-2">
        <Icon
          size={15}
          strokeWidth={1.75}
          className={cn(
            tone === 'good' && 'text-secondary',
            tone === 'warn' && 'text-[#ff9f43]',
            tone === 'danger' && 'text-primary',
          )}
        />
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-1 text-sm font-semibold text-foreground">{text}</p>
    </div>
  )
}

function getFilterTone(unit: RoUnit) {
  if (unit.filterStatus.toLowerCase().includes('low')) {
    return 'danger'
  }

  if (unit.filterStatus.toLowerCase().includes('due')) {
    return 'warn'
  }

  return 'good'
}

function getWarrantyTone(unit: RoUnit) {
  if (unit.warranty.toLowerCase().includes('ends')) {
    return 'warn'
  }

  return 'good'
}

type StatusBadgeProps = {
  status: UnitStatus
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-md px-2.5 py-1 text-xs font-semibold',
        status === 'Active' && 'bg-[#ecfbf6] text-secondary',
        status === 'Service Due' && 'bg-[#fff1f3] text-primary',
        status === 'Warranty Ending' && 'bg-[#fff6e7] text-[#ff9f43]',
      )}
    >
      {status}
    </span>
  )
}
