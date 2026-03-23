import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  icon?: string
  children?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors disabled:opacity-50',
        {
          'bg-primary-500 text-white hover:bg-primary-600': variant === 'primary',
          'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50': variant === 'secondary',
          'text-gray-500 hover:bg-gray-100 hover:text-gray-700': variant === 'ghost',
          'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
        },
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-9 px-4 text-sm': size === 'md',
        },
        className
      )}
      {...props}
    >
      {icon && <span className="material-icons-outlined text-[18px]">{icon}</span>}
      {children}
    </button>
  )
}
