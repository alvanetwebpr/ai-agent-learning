import clsx from 'clsx'

const STATUS_STYLES: Record<string, string> = {
  Draft: 'bg-gray-100 text-gray-600',
  Active: 'bg-green-50 text-green-700',
  'On Hold': 'bg-amber-50 text-amber-700',
  Complete: 'bg-primary-50 text-primary-700',
  Closed: 'bg-red-50 text-red-700',
  Published: 'bg-green-50 text-green-700',
  Archived: 'bg-gray-100 text-gray-500',
  Pending: 'bg-yellow-50 text-yellow-700',
  'In Progress': 'bg-blue-50 text-blue-700',
  Review: 'bg-purple-50 text-purple-700',
  Done: 'bg-green-50 text-green-700',
  Sent: 'bg-blue-50 text-blue-700',
  Approved: 'bg-green-50 text-green-700',
  Rejected: 'bg-red-50 text-red-700',
  Prospect: 'bg-blue-50 text-blue-700',
  Inactive: 'bg-gray-100 text-gray-500',
  Low: 'bg-gray-100 text-gray-600',
  Medium: 'bg-yellow-50 text-yellow-700',
  High: 'bg-orange-50 text-orange-700',
  Urgent: 'bg-red-50 text-red-700',
}

interface StatusPillProps {
  status: string
  className?: string
}

export function StatusPill({ status, className }: StatusPillProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        STATUS_STYLES[status] || 'bg-gray-100 text-gray-600',
        className
      )}
    >
      {status}
    </span>
  )
}
