import { Link } from 'react-router-dom'
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export function TopBar() {
  const breadcrumbs = useBreadcrumbs()
  const { isMobile } = useBreakpoint()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      <nav className="flex items-center gap-1.5 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.path} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-gray-300">/</span>}
            {i < breadcrumbs.length - 1 ? (
              <Link to={crumb.path} className="text-gray-400 hover:text-gray-600 no-underline">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-900">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {!isMobile && (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-64 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3">
            <span className="material-icons-outlined text-[18px] text-gray-400">search</span>
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 border-0 bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400"
            />
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <span className="material-icons-outlined text-[20px]">notifications</span>
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-700">
            AE
          </div>
        </div>
      )}
    </header>
  )
}
