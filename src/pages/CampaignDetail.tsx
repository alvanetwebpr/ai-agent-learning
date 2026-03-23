import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useClientStore, useCampaignStore, useUIStore } from '../store'
import { Button } from '../components/ui/Button'
import { StatusPill } from '../components/ui/StatusPill'
import { ScoreBadge } from '../components/ui/ScoreBadge'
import { Tabs } from '../components/ui/Tabs'
import { Modal } from '../components/ui/Modal'
import { CampaignForm } from '../components/forms/CampaignForm'
import { CreativeTab } from './CampaignDetail/CreativeTab'
import { StrategyTab } from './CampaignDetail/StrategyTab'
import { ProductionTab } from './CampaignDetail/ProductionTab'
import { LogTab } from './CampaignDetail/LogTab'
import type { Campaign } from '../types/entities'

const TABS = [
  { key: 'creative', label: 'Creative', icon: 'palette' },
  { key: 'strategy', label: 'Strategy', icon: 'psychology' },
  { key: 'production', label: 'Production', icon: 'videocam' },
  { key: 'log', label: 'Log & History', icon: 'history' },
]

export function CampaignDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const campaign = useCampaignStore((s) => s.campaigns.find((c) => c.id === id))
  const updateCampaign = useCampaignStore((s) => s.updateCampaign)
  const deleteCampaign = useCampaignStore((s) => s.deleteCampaign)
  const client = useClientStore((s) => s.clients.find((c) => c.id === campaign?.clientId))
  const addToast = useUIStore((s) => s.addToast)
  const [activeTab, setActiveTab] = useState('creative')
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  if (!campaign) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Campaign not found.</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/campaigns')}>Back to Campaigns</Button>
      </div>
    )
  }

  const handleUpdate = (data: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => {
    updateCampaign(campaign.id, data)
    setShowEdit(false)
    addToast('Campaign updated')
  }

  const handleDelete = () => {
    deleteCampaign(campaign.id)
    navigate('/campaigns')
    addToast('Campaign deleted')
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">{campaign.name}</h1>
            <StatusPill status={campaign.status} />
            <ScoreBadge score={campaign.creativeHookScore} />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {client?.name || 'Unknown Client'} · Updated {new Date(campaign.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon="edit" onClick={() => setShowEdit(true)}>Edit</Button>
          <Button variant="danger" icon="delete" onClick={() => setShowDelete(true)}>Delete</Button>
        </div>
      </div>

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'creative' && <CreativeTab campaignId={campaign.id} />}
      {activeTab === 'strategy' && <StrategyTab campaign={campaign} />}
      {activeTab === 'production' && <ProductionTab campaignId={campaign.id} />}
      {activeTab === 'log' && <LogTab campaignId={campaign.id} />}

      <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Campaign" wide>
        <CampaignForm initial={campaign} onSubmit={handleUpdate} onCancel={() => setShowEdit(false)} />
      </Modal>

      <Modal open={showDelete} onClose={() => setShowDelete(false)} title="Delete Campaign">
        <p className="mb-4 text-sm text-gray-600">
          Are you sure you want to delete <strong>{campaign.name}</strong>? All associated jobs, briefs, estimates, and logs will also be deleted.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
