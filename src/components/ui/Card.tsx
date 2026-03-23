import clsx from 'clsx'
import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  padding?: boolean
}

export function Card({ children, hover, padding = true, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-gray-100 bg-white shadow-sm',
        hover && 'cursor-pointer transition-shadow hover:shadow-md',
        padding && 'p-4 md:p-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
