import {
  BarChart3,
  Boxes,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  ShieldCheck,
  UserCog,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export type SidebarLink = {
  label: string
  path: string
  icon: LucideIcon
}

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Customers',
    path: '/customers',
    icon: Users,
  },
  {
    label: 'RO Units',
    path: '/ro-units',
    icon: Package,
  },
  {
    label: 'Service Requests',
    path: '/service-requests',
    icon: Wrench,
  },
  {
    label: 'AMC / Warranty',
    path: '/amc-warranty',
    icon: ShieldCheck,
  },
  {
    label: 'Technicians',
    path: '/technicians',
    icon: UserCog,
  },
  {
    label: 'Inventory',
    path: '/inventory',
    icon: Boxes,
  },
  {
    label: 'Payments',
    path: '/payments',
    icon: CreditCard,
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: BarChart3,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
]
