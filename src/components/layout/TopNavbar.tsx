import {
  Bell,
  Globe2,
  Mail,
  Menu,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

type TopNavbarProps = {
  onMenuClick: () => void
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const navigate = useNavigate()

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b bg-card/95 backdrop-blur admin-nav-shadow">
      <div className="relative flex h-[70px] items-center justify-between px-4 sm:px-6 lg:px-7">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Toggle sidebar"
            onClick={onMenuClick}
          >
            <Menu size={19} strokeWidth={1.75} />
          </Button>
          <Button type="button" variant="ghost" size="icon" aria-label="Search">
            <Search size={19} strokeWidth={1.75} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Filters"
          >
            <SlidersHorizontal size={18} strokeWidth={1.75} />
          </Button>
        </div>

        <NavBrand />

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Language"
          >
            <Globe2 size={18} strokeWidth={1.75} />
          </Button>
          <Button type="button" variant="ghost" size="icon" aria-label="Notifications">
            <Bell size={18} strokeWidth={1.75} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Messages"
          >
            <Mail size={18} strokeWidth={1.75} />
          </Button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="ml-1 grid h-9 w-9 cursor-pointer place-items-center rounded-md border bg-[#eef2ff] text-xs font-semibold text-foreground shadow-sm"
            aria-label="User profile"
          >
            AK
          </button>
        </div>
      </div>
    </header>
  )
}

function NavBrand() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-3 sm:flex">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-sm font-bold text-white shadow-sm">
        RO
      </span>
      <span className="text-[19px] font-semibold tracking-normal text-foreground">ROCARE</span>
    </div>
  )
}
