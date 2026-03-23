import { useState } from 'react'
import { useCampaignStore } from '../../store'
import { Card } from '../../components/ui/Card'
import { StatusPill } from '../../components/ui/StatusPill'
import { ScoreBadge } from '../../components/ui/ScoreBadge'
import { EmptyState } from '../../components/ui/EmptyState'
import clsx from 'clsx'

interface LogTabProps {
  campaignId: string
}

export function LogTab({ campaignId }: LogTabProps) {
  const logs = useCampaignStore((s) => s.aiLogs.filter((l) => l.campaignId === campaignId))
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (logs.length === 0) {
    return (
      <div className="pt-4">
        <EmptyState icon="smart_toy" title="No AI interactions" description="AI interactions for this campaign will be logged here." />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 pt-4">
      <h3 className="text-sm font-semibold text-gray-700">AI Interaction Log</h3>
      {logs.map((log) => (
        <Card key={log.id}>
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
          >
            <span className={clsx(
              'material-icons-outlined text-[18px]',
              log.flagged ? 'text-red-500' : 'text-primary-400'
            )}>
              {log.flagged ? 'flag' : 'smart_toy'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">{log.prompt.slice(0, 80)}...</p>
              <p className="text-xs text-gray-500">
                {log.module} · {log.department} · {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
            <StatusPill status={log.validationStatus} />
            <ScoreBadge score={log.hookScore} size="sm" />
            <span className="material-icons-outlined text-[18px] text-gray-300">
              {expandedId === log.id ? 'expand_less' : 'expand_more'}
            </span>
          </div>

          {expandedId === log.id && (
            <div className="mt-3 border-t border-gray-100 pt-3">
              <div className="mb-3">
                <p className="mb-1 text-xs font-semibold uppercase text-gray-500">Prompt</p>
                <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">{log.prompt}</p>
              </div>
              <div className="mb-3">
                <p className="mb-1 text-xs font-semibold uppercase text-gray-500">Output</p>
                <p className="whitespace-pre-wrap rounded-lg bg-primary-50 p-3 text-sm text-gray-700">{log.output}</p>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Model: {log.model}</span>
                <span>Hook Score: {log.hookScore ?? 'N/A'}</span>
                <span>Validation: {log.validationStatus}</span>
                {log.flagged && <span className="text-red-500">Flagged</span>}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
