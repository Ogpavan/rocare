import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { AppSidebar } from '@/components/layout/AppSidebar'
import { TopNavbar } from '@/components/layout/TopNavbar'
import { cn } from '@/lib/utils'

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const handleMenuClick = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      setSidebarCollapsed((current) => !current)
      return
    }

    setSidebarOpen(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavbar onMenuClick={handleMenuClick} />
      <AppSidebar
        isCollapsed={sidebarCollapsed}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div
        className={cn(
          'min-h-screen pt-[70px] transition-[padding] duration-200 ease-out',
          sidebarCollapsed ? 'lg:pl-0' : 'lg:pl-[120px]',
        )}
      >
        <main className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
