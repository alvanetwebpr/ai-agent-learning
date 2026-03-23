import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { Toasts } from '../ui/Toasts'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export function AppShell() {
  const { isMobile } = useBreakpoint()

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={isMobile ? 'flex flex-1 flex-col' : 'ml-16 flex flex-1 flex-col'}>
        <TopBar />
        <main className={`flex-1 p-4 md:p-6 ${isMobile ? 'pb-20' : ''}`}>
          <Outlet />
        </main>
      </div>
      <Toasts />
    </div>
  )
}
