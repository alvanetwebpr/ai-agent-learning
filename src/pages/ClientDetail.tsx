import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useClientStore, useCampaignStore, useUIStore } from '../store'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { StatusPill } from '../components/ui/StatusPill'
import { Modal } from '../components/ui/Modal'
import { ClientForm } from '../components/forms/ClientForm'
import type { Client } from '../types/entities'

function ProfileSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</h3>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  )
}

export function ClientDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const client = useClientStore((s) => s.clients.find((c) => c.id === id))
  const updateClient = useClientStore((s) => s.updateClient)
  const deleteClient = useClientStore((s) => s.deleteClient)
  const campaigns = useCampaignStore((s) => s.campaigns.filter((c) => c.clientId === id))
  const addToast = useUIStore((s) => s.addToast)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  if (!client) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Client not found.</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/clients')}>Back to Clients</Button>
      </div>
    )
  }

  const handleUpdate = (data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    updateClient(client.id, data)
    setShowEdit(false)
    addToast('Client updated successfully')
  }

  const handleDelete = () => {
    deleteClient(client.id)
    navigate('/clients')
    addToast('Client deleted')
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
            style={{ backgroundColor: client.accentColor }}
          >
            {client.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
              <StatusPill status={client.status} />
            </div>
            <p className="text-sm text-gray-500">{client.industry}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon="edit" onClick={() => setShowEdit(true)}>Edit</Button>
          <Button variant="danger" icon="delete" onClick={() => setShowDelete(true)}>Delete</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Brand Profile</h2>
          <div className="flex flex-col gap-4">
            <ProfileSection label="Tone of Voice">
              {client.brandProfile.tone || <span className="text-gray-400">Not set</span>}
            </ProfileSection>
            <ProfileSection label="Target Audience">
              {client.brandProfile.targetAudience || <span className="text-gray-400">Not set</span>}
            </ProfileSection>
            <ProfileSection label="Psychographic Profile">
              {client.brandProfile.psychographic || <span className="text-gray-400">Not set</span>}
            </ProfileSection>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Competitive & Legal</h2>
          <div className="flex flex-col gap-4">
            <ProfileSection label="Competitive Landscape">
              {client.brandProfile.competitiveLandscape || <span className="text-gray-400">Not set</span>}
            </ProfileSection>
            <ProfileSection label="Legal Constraints">
              {client.brandProfile.legalConstraints || <span className="text-gray-400">Not set</span>}
            </ProfileSection>
            <ProfileSection label="No-Go Topics">
              {client.brandProfile.noGoTopics.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {client.brandProfile.noGoTopics.map((topic) => (
                    <span key={topic} className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
                      {topic}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-400">None specified</span>
              )}
            </ProfileSection>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Campaigns ({campaigns.length})</h2>
        {campaigns.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-400">No campaigns for this client.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
                className="flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50"
              >
                <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                <StatusPill status={campaign.status} />
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Client" wide>
        <ClientForm initial={client} onSubmit={handleUpdate} onCancel={() => setShowEdit(false)} />
      </Modal>

      <Modal open={showDelete} onClose={() => setShowDelete(false)} title="Delete Client">
        <p className="mb-4 text-sm text-gray-600">
          Are you sure you want to delete <strong>{client.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
