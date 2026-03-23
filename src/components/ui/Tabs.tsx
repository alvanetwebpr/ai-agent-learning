import clsx from 'clsx'

interface Tab {
  key: string
  label: string
  icon?: string
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (key: string) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={clsx(
            'flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
            active === tab.key
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          )}
        >
          {tab.icon && (
            <span className="material-icons-outlined text-[18px]">{tab.icon}</span>
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
