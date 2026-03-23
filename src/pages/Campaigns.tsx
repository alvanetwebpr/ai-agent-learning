import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClientStore, useCampaignStore, useUIStore } from '../store'
import { CampaignStatus } from '../types/enums'
import { Button } from '../components/ui/Button'
import { StatusPill } from '../components/ui/StatusPill'
import { ScoreBadge } from '../components/ui/ScoreBadge'
import { Modal } from '../components/ui/Modal'
import { EmptyState } from '../components/ui/EmptyState'
import { CampaignForm } from '../components/forms/CampaignForm'
import { Card } from '../components/ui/Card'
import type { Campaign } from '../types/entities'
import clsx from 'clsx'

const FILTERS = ['All', ...Object.values(CampaignStatus)] as const

export function Campaigns() {
  const navigate = useNavigate()
  const clients = useClientStore((s) => s.clients)
  const campaigns = useCampaignStore((s) => s.campaigns)
  const addCampaign = useCampaignStore((s) => s.addCampaign)
  const addToast = useUIStore((s) => s.addToast)
  const [filter, setFilter] = useState<string>('All')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = filter === 'All' ? campaigns : campaigns.filter((c) => c.status === filter)
  const getClientName = (id: string) => clients.find((c) => c.id === id)?.name || 'Unknown'

  const handleCreate = (data: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => {
    addCampaign(data)
    setShowCreate(false)
    addToast('Campaign created successfully')
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
        <Button icon="add" onClick={() => setShowCreate(true)}>New Campaign</Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              filter === f
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="campaign"
          title="No campaigns found"
          description={filter === 'All' ? 'Create your first campaign to get started.' : `No campaigns with status "${filter}".`}
          action={filter === 'All' ? <Button icon="add" onClick={() => setShowCreate(true)}>New Campaign</Button> : undefined}
        />
      ) : (
        <Card padding={false}>
          <div className="divide-y divide-gray-50">
            {filtered.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
                className="flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-50 md:px-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-xs text-gray-500">{getClientName(campaign.clientId)}</p>
                </div>
                <StatusPill status={campaign.status} />
                <ScoreBadge score={campaign.creativeHookScore} size="sm" />
                <span className="hidden text-xs text-gray-400 md:block">
                  {new Date(campaign.updatedAt).toLocaleDateString()}
                </span>
                <span className="material-icons-outlined text-[18px] text-gray-300">chevron_right</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Campaign" wide>
        <CampaignForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
      </Modal>
    </div>
  )
}
