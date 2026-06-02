import { useMemo, useState } from 'react'
import { Download, PackagePlus, Search, Truck, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'

type InventoryItem = {
  id: string
  name: string
  category: string
  stock: number
  reorderLevel: number
  supplier: string
  lastRestock: string
  status: StockStatus
}

const inventoryItems: InventoryItem[] = [
  { id: 'INV-101', name: 'RO Membrane', category: 'Filter', stock: 8, reorderLevel: 10, supplier: 'Aqua Parts Co.', lastRestock: '21 May 2026', status: 'Low Stock' },
  { id: 'INV-102', name: 'Sediment Filter', category: 'Filter', stock: 32, reorderLevel: 15, supplier: 'Pure Supply', lastRestock: '25 May 2026', status: 'In Stock' },
  { id: 'INV-103', name: 'Booster Pump', category: 'Motor', stock: 0, reorderLevel: 5, supplier: 'FlowTech', lastRestock: '10 May 2026', status: 'Out of Stock' },
  { id: 'INV-104', name: 'TDS Meter', category: 'Tool', stock: 12, reorderLevel: 4, supplier: 'Service Tools', lastRestock: '18 May 2026', status: 'In Stock' },
  { id: 'INV-105', name: 'Pipe Connector Kit', category: 'Fitting', stock: 6, reorderLevel: 8, supplier: 'Aqua Parts Co.', lastRestock: '14 May 2026', status: 'Low Stock' },
]

const statusOptions: Array<StockStatus | 'All'> = ['All', 'In Stock', 'Low Stock', 'Out of Stock']

export function Inventory() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StockStatus | 'All'>('All')

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    return inventoryItems.filter((item) => {
      const matchesStatus = status === 'All' || item.status === status
      const matchesSearch =
        query.length === 0 ||
        [item.id, item.name, item.category, item.supplier].join(' ').toLowerCase().includes(query)

      return matchesStatus && matchesSearch
    })
  }, [search, status])

  return (
    <div className="space-y-5">
      <PageHeader
        title="Inventory"
        primaryLabel="Add Item"
        primaryIcon={PackagePlus}
      />

      <section className="space-y-4">
        <Toolbar
          search={search}
          onSearch={setSearch}
          placeholder="Search item, category, supplier"
          value={status}
          onChange={(value) => setStatus(value as StockStatus | 'All')}
          options={statusOptions}
        />
        <p className="text-sm text-muted-foreground">
          Showing {filteredItems.length} of {inventoryItems.length} items
        </p>
        {filteredItems.length > 0 ? <InventoryTable items={filteredItems} /> : <EmptyState text="No inventory items found" />}
      </section>
    </div>
  )
}

function InventoryTable({ items }: { items: InventoryItem[] }) {
  return (
    <div className="overflow-hidden rounded-md border bg-card admin-card-shadow">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-muted">
            <tr>
              {['Item', 'Category', 'Stock', 'Reorder At', 'Supplier', 'Last Restock', 'Status', 'Actions'].map((header) => (
                <th key={header} className="border-b px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-muted/45">
                <td className="border-b px-4 py-4">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.id}</p>
                </td>
                <td className="border-b px-4 py-4 text-muted-foreground">{item.category}</td>
                <td className="border-b px-4 py-4 font-semibold text-foreground">{item.stock}</td>
                <td className="border-b px-4 py-4 text-muted-foreground">{item.reorderLevel}</td>
                <td className="border-b px-4 py-4 text-muted-foreground">{item.supplier}</td>
                <td className="border-b px-4 py-4 text-muted-foreground">{item.lastRestock}</td>
                <td className="border-b px-4 py-4"><StockBadge status={item.status} /></td>
                <td className="border-b px-4 py-4">
                  <Button type="button" size="sm" variant={item.status === 'In Stock' ? 'outline' : 'default'}>
                    <Truck size={15} strokeWidth={1.75} />
                    Reorder
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StockBadge({ status }: { status: StockStatus }) {
  return (
    <span className={cn('inline-flex rounded-md px-2.5 py-1 text-xs font-semibold', status === 'In Stock' && 'bg-[#ecfbf6] text-secondary', status === 'Low Stock' && 'bg-[#fff6e7] text-[#ff9f43]', status === 'Out of Stock' && 'bg-[#fff1f3] text-primary')}>
      {status}
    </span>
  )
}

function PageHeader({ title, primaryLabel, primaryIcon: PrimaryIcon }: { title: string; primaryLabel: string; primaryIcon: LucideIcon }) {
  return (
    <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">{title}</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline"><Download size={16} strokeWidth={1.75} />Export</Button>
        <Button type="button"><PrimaryIcon size={16} strokeWidth={1.75} />{primaryLabel}</Button>
      </div>
    </section>
  )
}

function Toolbar({ search, onSearch, placeholder, value, onChange, options }: { search: string; onSearch: (value: string) => void; placeholder: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative block sm:w-[360px]">
        <Search size={17} strokeWidth={1.75} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder={placeholder} className="h-10 w-full rounded-md border bg-card pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" />
      </label>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 rounded-md border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="grid min-h-[220px] place-items-center rounded-md border bg-muted/35 px-4 text-center">
      <div>
        <p className="font-semibold text-foreground">{text}</p>
        <p className="mt-2 text-sm text-muted-foreground">Try another search or filter.</p>
      </div>
    </div>
  )
}
