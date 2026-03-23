import { useUIStore } from '../../store'
import clsx from 'clsx'

export function Toasts() {
  const toasts = useUIStore((s) => s.toasts)
  const removeToast = useUIStore((s) => s.removeToast)

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 md:bottom-6 md:right-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-lg',
            {
              'bg-green-600 text-white': toast.type === 'success',
              'bg-red-600 text-white': toast.type === 'error',
              'bg-primary-600 text-white': toast.type === 'info',
            }
          )}
        >
          <span className="material-icons-outlined text-[18px]">
            {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
          </span>
          {toast.message}
          <button onClick={() => removeToast(toast.id)} className="ml-2 opacity-70 hover:opacity-100">
            <span className="material-icons-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  )
}
