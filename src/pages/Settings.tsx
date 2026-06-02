import { useState } from 'react'
import {
  Bell,
  Building2,
  CreditCard,
  Droplets,
  MapPin,
  Plus,
  Save,
  Settings2,
  UserCog,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type SettingsTab = {
  id: string
  label: string
  icon: LucideIcon
}

const settingsTabs: SettingsTab[] = [
  { id: 'general', label: 'General', icon: Building2 },
  { id: 'areas', label: 'Areas', icon: MapPin },
  { id: 'ro-units', label: 'RO Units', icon: Droplets },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'technicians', label: 'Technicians', icon: UserCog },
  { id: 'payments', label: 'Payments', icon: CreditCard },
]

const areas = [
  { code: 'AREA-01', name: 'Salt Lake', city: 'Kolkata', status: 'Active' },
  { code: 'AREA-02', name: 'New Town', city: 'Kolkata', status: 'Active' },
  { code: 'AREA-03', name: 'Dum Dum', city: 'Kolkata', status: 'Active' },
  { code: 'AREA-04', name: 'Barasat', city: 'Kolkata', status: 'Inactive' },
]

const roModels = [
  { code: 'RO-01', brand: 'Aquaguard', model: 'RO Max 12L', serviceGap: '30 days' },
  { code: 'RO-02', brand: 'Kent', model: 'Supreme Plus', serviceGap: '45 days' },
  { code: 'RO-03', brand: 'Pureit', model: 'Copper+ Mineral', serviceGap: '45 days' },
]

const services = [
  { code: 'SRV-01', name: 'Regular Service', charge: 'Rs. 350', duration: '45 min' },
  { code: 'SRV-02', name: 'Filter Change', charge: 'Rs. 650', duration: '60 min' },
  { code: 'SRV-03', name: 'Installation', charge: 'Rs. 900', duration: '90 min' },
]

const technicianRoles = [
  { code: 'ROLE-01', name: 'Senior Technician', canAssign: 'Yes', canClose: 'Yes' },
  { code: 'ROLE-02', name: 'Technician', canAssign: 'No', canClose: 'Yes' },
  { code: 'ROLE-03', name: 'Helper', canAssign: 'No', canClose: 'No' },
]

const paymentModes = [
  { code: 'PAY-01', name: 'Cash', receipt: 'Required', status: 'Active' },
  { code: 'PAY-02', name: 'UPI', receipt: 'Auto', status: 'Active' },
  { code: 'PAY-03', name: 'Bank Transfer', receipt: 'Manual', status: 'Active' },
]

export function Settings() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">
            Settings
          </h1>
        </div>
        <Button type="button">
          <Save size={16} strokeWidth={1.75} />
          Save Settings
        </Button>
      </section>

      <section className="space-y-4">
        <Card>
          <CardContent className="p-2">
            <div className="flex gap-2 overflow-x-auto">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-md px-4 text-sm font-medium text-muted-foreground transition-colors',
                    activeTab === tab.id && 'bg-accent text-primary',
                    activeTab !== tab.id && 'hover:bg-muted',
                  )}
                >
                  <tab.icon size={16} strokeWidth={1.75} />
                  {tab.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        {activeTab === 'general' && <GeneralSettings />}
        {activeTab === 'areas' && (
          <MasterTable
            title="Area Master"
            actionLabel="Add Area"
            headers={['Code', 'Area Name', 'City', 'Status']}
            rows={areas.map((area) => [area.code, area.name, area.city, area.status])}
          />
        )}
        {activeTab === 'ro-units' && (
          <MasterTable
            title="RO Unit Master"
            actionLabel="Add RO Model"
            headers={['Code', 'Brand', 'Model', 'Service Gap']}
            rows={roModels.map((unit) => [unit.code, unit.brand, unit.model, unit.serviceGap])}
          />
        )}
        {activeTab === 'services' && (
          <MasterTable
            title="Service Master"
            actionLabel="Add Service"
            headers={['Code', 'Service Name', 'Default Charge', 'Duration']}
            rows={services.map((service) => [
              service.code,
              service.name,
              service.charge,
              service.duration,
            ])}
          />
        )}
        {activeTab === 'technicians' && (
          <MasterTable
            title="Technician Role Master"
            actionLabel="Add Role"
            headers={['Code', 'Role', 'Can Assign', 'Can Close Job']}
            rows={technicianRoles.map((role) => [
              role.code,
              role.name,
              role.canAssign,
              role.canClose,
            ])}
          />
        )}
        {activeTab === 'payments' && (
          <MasterTable
            title="Payment Master"
            actionLabel="Add Payment Mode"
            headers={['Code', 'Payment Mode', 'Receipt', 'Status']}
            rows={paymentModes.map((mode) => [mode.code, mode.name, mode.receipt, mode.status])}
          />
        )}
      </section>
    </div>
  )
}

function GeneralSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[15px] font-medium">
            <Building2 size={17} strokeWidth={1.75} className="text-primary" />
            Company Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <TextField label="Company Name" value="ROCARE Services" />
          <TextField label="Phone Number" value="+91 90000 11111" />
          <TextField label="Service City" value="Kolkata" />
          <TextField label="GST Number" value="19ABCDE1234F1Z5" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[15px] font-medium">
            <Settings2 size={17} strokeWidth={1.75} className="text-primary" />
            Default Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <ToggleRow label="Auto-generate customer code" checked />
          <ToggleRow label="Auto-generate service request code" checked />
          <ToggleRow label="Require payment receipt" checked />
          <ToggleRow label="Allow technician to close service" checked />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[15px] font-medium">
            <Bell size={17} strokeWidth={1.75} className="text-primary" />
            Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <ToggleRow label="Service due reminder" checked />
          <ToggleRow label="AMC renewal reminder" checked />
          <ToggleRow label="Payment due reminder" checked />
          <ToggleRow label="Technician visit reminder" checked={false} />
        </CardContent>
      </Card>
    </div>
  )
}

type MasterTableProps = {
  title: string
  actionLabel: string
  headers: string[]
  rows: string[][]
}

function MasterTable({ title, actionLabel, headers, rows }: MasterTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="text-[15px] font-medium">{title}</CardTitle>
        </div>
        <Button type="button" size="sm">
          <Plus size={15} strokeWidth={1.75} />
          {actionLabel}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-muted">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="border-b px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                  >
                    {header}
                  </th>
                ))}
                <th className="border-b px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="bg-card transition-colors hover:bg-muted/55">
                  {row.map((cell, index) => (
                    <td
                      key={`${row[0]}-${cell}`}
                      className={cn(
                        'border-b px-4 py-4',
                        index === 0 && 'font-medium text-muted-foreground',
                        index === 1 && 'font-semibold text-foreground',
                        index > 1 && 'text-muted-foreground',
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                  <td className="border-b px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button type="button" size="sm" variant="outline" className="text-primary hover:text-primary">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function TextField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <input
        defaultValue={value}
        className="mt-2 h-10 w-full rounded-md border bg-card px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
    </label>
  )
}

function ToggleRow({ label, checked }: { label: string; checked: boolean }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-md border bg-muted/35 px-3 py-3">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input type="checkbox" defaultChecked={checked} className="h-4 w-4 accent-[#ff4961]" />
    </label>
  )
}
