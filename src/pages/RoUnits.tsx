import { useMemo, useState } from 'react'
import {
  Download,
  Plus,
  Search,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

const unitTableHeaders = [
  'Unit',
  'Customer',
  'Area',
  'Installed',
  'Service Dates',
  'Filter',
  'Warranty',
  'Status',
  'Actions',
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

      <Card>
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-[15px] font-medium">RO Unit List</CardTitle>
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
        </CardHeader>
        <CardContent>
          {filteredUnits.length > 0 ? (
            <UnitsTable units={filteredUnits} />
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
        </CardContent>
      </Card>
    </div>
  )
}

type UnitsProps = {
  units: RoUnit[]
}

function UnitsTable({ units }: UnitsProps) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full min-w-[1060px] border-collapse text-left text-sm">
        <thead className="bg-muted">
          <tr>
            {unitTableHeaders.map((header) => (
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
          {units.map((unit) => (
            <tr key={unit.id} className="bg-card transition-colors hover:bg-muted/55">
              <td className="border-b px-4 py-4">
                <p className="font-semibold text-foreground">{unit.brand}</p>
                <p className="mt-1 text-xs text-muted-foreground">{unit.model}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  {unit.id} | Serial: {unit.serialNo}
                </p>
              </td>
              <td className="border-b px-4 py-4 font-medium text-foreground">{unit.customer}</td>
              <td className="border-b px-4 py-4 text-muted-foreground">{unit.area}</td>
              <td className="border-b px-4 py-4 text-muted-foreground">{unit.installDate}</td>
              <td className="border-b px-4 py-4">
                <p className="font-medium text-foreground">Next: {unit.nextService}</p>
                <p className="mt-1 text-xs text-muted-foreground">Last: {unit.lastService}</p>
              </td>
              <td className="border-b px-4 py-4">
                <span className={cn('font-semibold', getFilterClass(unit))}>{unit.filterStatus}</span>
              </td>
              <td className="border-b px-4 py-4">
                <span className={cn('font-semibold', getWarrantyClass(unit))}>{unit.warranty}</span>
              </td>
              <td className="border-b px-4 py-4">
                <StatusBadge status={unit.status} />
              </td>
              <td className="border-b px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="outline">
                    View
                  </Button>
                  <Button type="button" size="sm" variant="secondary">
                    Service
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

function getFilterClass(unit: RoUnit) {
  if (unit.filterStatus.toLowerCase().includes('low')) {
    return 'text-primary'
  }

  if (unit.filterStatus.toLowerCase().includes('due')) {
    return 'text-[#ff9f43]'
  }

  return 'text-secondary'
}

function getWarrantyClass(unit: RoUnit) {
  if (unit.warranty.toLowerCase().includes('ends')) {
    return 'text-[#ff9f43]'
  }

  return 'text-secondary'
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
