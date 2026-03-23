import { useLocation } from 'react-router-dom'

interface Breadcrumb {
  label: string
  path: string
}

const ROUTE_LABELS: Record<string, string> = {
  '': 'Dashboard',
  clients: 'Clients',
  campaigns: 'Campaigns',
  governance: 'Governance',
}

export function useBreadcrumbs(): Breadcrumb[] {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  const crumbs: Breadcrumb[] = [{ label: 'MAKAI', path: '/' }]

  let currentPath = ''
  for (const segment of segments) {
    currentPath += `/${segment}`
    const label = ROUTE_LABELS[segment] || segment
    crumbs.push({ label, path: currentPath })
  }

  return crumbs
}
