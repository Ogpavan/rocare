import { NavLink } from 'react-router-dom'

import { sidebarLinks } from '@/config/sidebar-links'
import { cn } from '@/lib/utils'

type AppSidebarProps = {
  isCollapsed: boolean
  isOpen: boolean
  onClose: () => void
}

export function AppSidebar({ isCollapsed, isOpen, onClose }: AppSidebarProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar overlay"
        className={cn(
          'fixed bottom-0 left-0 right-0 top-[70px] z-30 cursor-pointer bg-[#464855]/30 transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed bottom-0 left-0 top-[70px] z-40 flex w-[120px] flex-col border-r bg-card admin-nav-shadow transition-transform duration-200 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0',
        )}
      >
        <nav className="sidebar-scrollbar flex-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'group relative flex min-h-[114px] cursor-pointer flex-col items-center justify-center gap-3 border-b px-3 text-center text-[13px] font-normal leading-5 text-muted-foreground transition-colors',
                    'hover:bg-muted hover:text-foreground',
                    isActive &&
                      'bg-[#fbfbfd] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:bg-primary before:content-[""] after:absolute after:bottom-0 after:-right-[6px] after:top-0 after:z-10 after:w-[3px] after:bg-primary after:content-[""]',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={29}
                      strokeWidth={1.45}
                      className={cn('text-[#697386] transition-colors', isActive && 'text-primary')}
                    />
                    <span className="max-w-[92px] text-balance">{link.label}</span>
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
