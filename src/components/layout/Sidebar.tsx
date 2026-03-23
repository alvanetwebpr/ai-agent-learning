import { useLocation, useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../../lib/constants'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import clsx from 'clsx'

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 bg-white">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={clsx(
              'flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-colors',
              isActive(item.path)
                ? 'text-primary-600'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            <span className="material-icons-outlined text-[22px]">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    )
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center border-r border-gray-200 bg-white py-4">
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-sm font-bold text-white">
        M
      </div>
      <nav className="flex flex-1 flex-col items-center gap-2">
        {NAV_ITEMS.map((item) => (
          <div key={item.path} className="group relative">
            <button
              onClick={() => navigate(item.path)}
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                isActive(item.path)
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              )}
            >
              <span className="material-icons-outlined text-[22px]">{item.icon}</span>
            </button>
            <div className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {item.label}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
