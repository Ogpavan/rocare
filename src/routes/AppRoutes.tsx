import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { sidebarLinks } from '@/config/sidebar-links'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { AmcWarranty } from '@/pages/AmcWarranty'
import { ComingSoon } from '@/pages/ComingSoon'
import { Customers } from '@/pages/Customers'
import { CustomerServiceTimeline } from '@/pages/CustomerServiceTimeline'
import { Dashboard } from '@/pages/Dashboard'
import { Inventory } from '@/pages/Inventory'
import { Payments } from '@/pages/Payments'
import { Profile } from '@/pages/Profile'
import { Reports } from '@/pages/Reports'
import { RoUnits } from '@/pages/RoUnits'
import { ServiceRequests } from '@/pages/ServiceRequests'
import { Settings } from '@/pages/Settings'
import { Technicians } from '@/pages/Technicians'

export function AppRoutes() {
  const builtRoutes = new Set([
    '/dashboard',
    '/customers',
    '/ro-units',
    '/service-requests',
    '/amc-warranty',
    '/technicians',
    '/inventory',
    '/payments',
    '/profile',
    '/reports',
    '/settings',
  ])
  const placeholderLinks = sidebarLinks.filter((link) => !builtRoutes.has(link.path))

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:customerId/timeline" element={<CustomerServiceTimeline />} />
          <Route path="/ro-units" element={<RoUnits />} />
          <Route path="/service-requests" element={<ServiceRequests />} />
          <Route path="/amc-warranty" element={<AmcWarranty />} />
          <Route path="/technicians" element={<Technicians />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          {placeholderLinks.map((link) => (
            <Route
              key={link.path}
              path={link.path}
              element={<ComingSoon title={link.label} />}
            />
          ))}
          <Route path="*" element={<ComingSoon title="Page" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
