import { useState } from 'react'
import { useCampaignStore, useUIStore } from '../../store'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ScoreBadge } from '../../components/ui/ScoreBadge'
import { Modal } from '../../components/ui/Modal'
import { EmptyState } from '../../components/ui/EmptyState'
import { BriefForm } from '../../components/forms/BriefForm'
import { MANDATORY_QUESTIONS } from '../../lib/constants'
import type { Brief, Campaign } from '../../types/entities'

interface StrategyTabProps {
  campaign: Campaign
}

export function StrategyTab({ campaign }: StrategyTabProps) {
  const briefs = useCampaignStore((s) => s.briefs.filter((b) => b.campaignId === campaign.id))
  const addBrief = useCampaignStore((s) => s.addBrief)
  const addToast = useUIStore((s) => s.addToast)
  const [showForm, setShowForm] = useState(false)

  const handleAddBrief = (data: Omit<Brief, 'id' | 'createdAt'>) => {
    addBrief(data)
    setShowForm(false)
    addToast('Brief created')
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <Card>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">4 Mandatory AI Questions</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {MANDATORY_QUESTIONS.map((q) => (
            <div key={q.key} className="rounded-lg bg-gray-50 p-3">
              <p className="mb-1 text-xs font-semibold text-primary-600">{q.label}</p>
              <p className="text-sm text-gray-700">{campaign.mandatoryQuestions[q.key] || 'Not answered'}</p>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Briefs</h3>
          <Button size="sm" icon="add" onClick={() => setShowForm(true)}>Add Brief</Button>
        </div>
        {briefs.length === 0 ? (
          <EmptyState icon="description" title="No briefs yet" description="Add a strategic brief to guide this campaign." />
        ) : (
          <div className="flex flex-col gap-3">
            {briefs.map((brief) => (
              <Card key={brief.id}>
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{brief.title}</h4>
                    <p className="mt-1 text-sm text-gray-600">{brief.content}</p>
                    <p className="mt-2 text-xs text-gray-400">{new Date(brief.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="ml-3 flex items-center gap-1">
                    <span className="text-xs text-gray-500">Validation</span>
                    <ScoreBadge score={brief.validationScore} size="sm" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)} title="New Brief" wide>
        <BriefForm campaignId={campaign.id} onSubmit={handleAddBrief} onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
  )
}
