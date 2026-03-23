import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClientStore, useUIStore } from '../store'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { StatusPill } from '../components/ui/StatusPill'
import { Modal } from '../components/ui/Modal'
import { EmptyState } from '../components/ui/EmptyState'
import { ClientForm } from '../components/forms/ClientForm'
import type { Client } from '../types/entities'

export function Clients() {
  const navigate = useNavigate()
  const clients = useClientStore((s) => s.clients)
  const addClient = useClientStore((s) => s.addClient)
  const addToast = useUIStore((s) => s.addToast)
  const [showCreate, setShowCreate] = useState(false)

  const handleCreate = (data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    addClient(data)
    setShowCreate(false)
    addToast('Client created successfully')
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
        <Button icon="add" onClick={() => setShowCreate(true)}>Add Client</Button>
      </div>

      {clients.length === 0 ? (
        <EmptyState
          icon="people"
          title="No clients yet"
          description="Add your first client to get started with brand profiles and campaigns."
          action={<Button icon="add" onClick={() => setShowCreate(true)}>Add Client</Button>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Card key={client.id} hover onClick={() => navigate(`/clients/${client.id}`)}>
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: client.accentColor }}
                >
                  {client.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-gray-900">{client.name}</h3>
                    <StatusPill status={client.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">{client.industry}</p>
                  {client.brandProfile.tone && (
                    <p className="mt-2 line-clamp-2 text-xs text-gray-400">{client.brandProfile.tone}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Client" wide>
        <ClientForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
      </Modal>
    </div>
  )
}
