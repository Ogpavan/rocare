# ROCARE Agent Guide

This project is a React + Vite + TypeScript admin dashboard for an RO Management System. It currently includes the base UI shell, dashboard layout, top navbar, compact sidebar, theme, reusable UI primitives, routing, and dummy-data pages for all sidebar sections. Do not add backend/API integration unless explicitly requested.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS v4 using `@tailwindcss/vite`
- shadcn/ui-style local primitives in `src/components/ui`
- lucide-react
- react-router-dom
- recharts
- @tanstack/react-table
- react-hook-form
- zod
- @hookform/resolvers
- sonner
- @fontsource/inter
- clsx
- tailwind-merge
- class-variance-authority

## Current Scope

The app is an admin dashboard shell only.

Implemented:

- `DashboardLayout` with fixed 120px tile sidebar and sticky top navbar
- top navbar is fixed across the full viewport and visually sits above the sidebar; sidebar starts below the 70px navbar
- navbar hamburger appears before search on all breakpoints and smoothly toggles the sidebar; desktop content padding animates with the sidebar
- responsive mobile sidebar overlay
- centered navbar brand
- sidebar navigation with icon-over-label tiles and right-side active accent
- dashboard cards and chart using dummy data
- Customers page with dummy customer records, client-side search/filter, desktop table, and mobile cards
- RO Units page with dummy unit records, client-side search/filter, and responsive cards. Do not use a table layout for RO Units unless explicitly requested.
- Service Requests page with dummy request records, readable table layout, status tabs, priority filter, and direct actions.
- AMC / Warranty page with dummy contract records, readable table layout, status/type filters, renewal-first cards, and direct actions.
- Technicians page with dummy technician records, availability filters, responsive cards, workload details, and direct actions.
- Inventory page with dummy stock records, readable table, stock filter, and reorder actions.
- Payments page with dummy payment records, readable table, status filter, and receipt actions.
- Reports page with dummy KPI cards and a simple chart.
- Settings page with simple company, alert, user, and security preferences.
- Inter font setup
- shadcn-compatible `components.json`
- path alias `@/* -> src/*`

Not implemented:

- forms, tables, workflows, CRUD, auth, backend, or API calls
- dark theme
- Material UI or Ant Design

## Design Direction

Reference style: old premium compact admin dashboard similar to Pixinvent Modern.

Use:

- app background: `#f4f5fa`
- card background: white
- primary accent: `#ff4961`
- secondary accent: `#2ed8a3`
- text: `#464855`
- muted text: `#6b6f82`
- border: `#e4e7ed`
- card radius: 6px to 8px
- soft admin-template shadow
- compact spacing and moderate font weights
- thin lucide line icons, usually `strokeWidth={1.75}`
- sidebar style: narrow white vertical tiles, icon centered above label, dividers between items, active item with right border accent

Avoid:

- dark theme
- oversized rounded corners
- marketing-style landing sections
- decorative gradients/orbs
- unrelated feature expansion
- full CRUD pages without user approval

## Source Map

- `src/main.tsx` imports Inter fonts and mounts React.
- `src/App.tsx` renders app routes and the Sonner toaster.
- `src/index.css` contains Tailwind v4 theme tokens and global styles.
- `src/routes/AppRoutes.tsx` defines `BrowserRouter`, layout route, dashboard route, and coming-soon placeholder routes.
- `src/layouts/DashboardLayout.tsx` composes `AppSidebar`, `TopNavbar`, and route outlet.
- `src/components/layout/AppSidebar.tsx` renders sidebar navigation.
- `src/components/layout/TopNavbar.tsx` renders the compact admin top bar.
- `src/config/sidebar-links.ts` is the single source of truth for sidebar labels, paths, and lucide icons.
- `src/pages/Dashboard.tsx` contains dummy dashboard cards, chart, and activity list.
- `src/pages/Customers.tsx` contains the dummy-data customer list page.
- `src/pages/RoUnits.tsx` contains the dummy-data RO unit list page.
- `src/pages/ServiceRequests.tsx` contains the dummy-data service request workflow page.
- `src/pages/AmcWarranty.tsx` contains the dummy-data AMC / Warranty renewal page.
- `src/pages/Technicians.tsx` contains the dummy-data technician dispatch page.
- `src/pages/Inventory.tsx` contains the dummy-data stock page.
- `src/pages/Payments.tsx` contains the dummy-data payment page.
- `src/pages/Reports.tsx` contains the dummy-data reports page.
- `src/pages/Settings.tsx` contains simple settings UI.
- `src/pages/ComingSoon.tsx` is used for non-built pages.
- `src/lib/utils.ts` exports the `cn` helper.
- `src/components/ui/button.tsx` and `src/components/ui/card.tsx` are local shadcn-style primitives.

## Sidebar Links

- Dashboard: `/dashboard`
- Customers: `/customers`
- RO Units: `/ro-units`
- Service Requests: `/service-requests`
- AMC / Warranty: `/amc-warranty`
- Technicians: `/technicians`
- Inventory: `/inventory`
- Payments: `/payments`
- Reports: `/reports`
- Settings: `/settings`

All sidebar links are currently built with dummy UI and dummy data only.

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Agent Notes

- Prefer editing existing shell components rather than creating new layout systems.
- Keep future feature work inside `src/pages`, `src/components`, and route/config files that match the current structure.
- When adding shadcn/ui components, keep them in `src/components/ui` and use `@/lib/utils`.
- Keep dashboard data dummy until the user asks for real integrations.
- Preserve the compact tile sidebar and the exact color palette unless the user requests a redesign.
- Keep features very simple and obvious. The expected users may not be highly computer-literate, so screens should be understandable on the first attempt, with plain labels, direct actions, minimal steps, and no hidden complexity.
