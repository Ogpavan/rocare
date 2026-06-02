import {
  Bell,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

const profileDetails = [
  { label: 'Full Name', value: 'Amit Kumar', icon: User },
  { label: 'Email', value: 'amit.kumar@rocare.local', icon: Mail },
  { label: 'Phone', value: '+91 98765 00000', icon: Phone },
  { label: 'Branch', value: 'Kolkata Central', icon: MapPin },
]

export function Profile() {
  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-[28px]">
            Profile
          </h1>
        </div>
        <Button type="button">
          <User size={16} strokeWidth={1.75} />
          Edit Profile
        </Button>
      </section>

      <section className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="rounded-md border bg-card p-5 text-center admin-card-shadow">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-md bg-[#eef2ff] text-2xl font-semibold text-foreground">
            AK
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Amit Kumar</h2>
          <p className="mt-1 text-sm text-muted-foreground">Admin User</p>
          <div className="mt-4 inline-flex rounded-md bg-[#ecfbf6] px-3 py-1 text-xs font-semibold text-secondary">
            Active
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 text-left">
            <ProfileStat label="Role" value="Admin" />
            <ProfileStat label="Access" value="Full" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-md border bg-card p-5 admin-card-shadow">
            <p className="text-[15px] font-semibold text-foreground">Basic Details</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {profileDetails.map((detail) => (
                <ProfileDetail key={detail.label} {...detail} />
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ProfileAction
              icon={KeyRound}
              title="Password"
              text="Last changed 28 May 2026"
              action="Change"
            />
            <ProfileAction
              icon={Bell}
              title="Notifications"
              text="Service and payment alerts enabled"
              action="Manage"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-muted/45 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  )
}

function ProfileDetail({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof User
}) {
  return (
    <div className="flex items-start gap-3 rounded-md border bg-muted/35 px-3 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-card text-primary">
        <Icon size={17} strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  )
}

function ProfileAction({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon: typeof User
  title: string
  text: string
  action: string
}) {
  return (
    <div className="rounded-md border bg-card p-4 admin-card-shadow">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#fff1f3] text-primary">
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{text}</p>
        </div>
      </div>
      <Button type="button" size="sm" variant="outline" className="mt-4 w-full">
        <ShieldCheck size={15} strokeWidth={1.75} />
        {action}
      </Button>
    </div>
  )
}
