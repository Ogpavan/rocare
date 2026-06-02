import type { ReactNode } from 'react'
import { Bell, Building2, Save, ShieldCheck, UserCog, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Settings() {
  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">Settings</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Keep basic company, alert, and user preferences easy to update.</p>
        </div>
        <Button type="button"><Save size={16} strokeWidth={1.75} />Save Settings</Button>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SettingsCard icon={Building2} title="Company Details">
          <TextField label="Company Name" value="ROCARE Services" />
          <TextField label="Phone Number" value="+91 90000 11111" />
          <TextField label="Service City" value="Kolkata" />
        </SettingsCard>
        <SettingsCard icon={Bell} title="Alerts">
          <ToggleRow label="Service due reminder" checked />
          <ToggleRow label="AMC renewal reminder" checked />
          <ToggleRow label="Low stock alert" checked />
        </SettingsCard>
        <SettingsCard icon={UserCog} title="Users">
          <ToggleRow label="Technician can close service" checked />
          <ToggleRow label="Admin approval for discount" checked={false} />
          <ToggleRow label="Show customer phone numbers" checked />
        </SettingsCard>
        <SettingsCard icon={ShieldCheck} title="Security">
          <ToggleRow label="Require login every day" checked />
          <ToggleRow label="Allow export reports" checked />
          <ToggleRow label="Send payment receipt SMS" checked />
        </SettingsCard>
      </section>
    </div>
  )
}

function SettingsCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="rounded-md border bg-card p-5 admin-card-shadow">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-[#fff1f3] text-primary">
          <Icon size={20} strokeWidth={1.75} />
        </span>
        <p className="text-[15px] font-semibold text-foreground">{title}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function TextField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <input defaultValue={value} className="mt-2 h-10 w-full rounded-md border bg-card px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
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
