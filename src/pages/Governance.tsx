import { useState } from 'react'
import { usePolicyStore, useUIStore } from '../store'
import { Tabs } from '../components/ui/Tabs'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { StatusPill } from '../components/ui/StatusPill'
import { Modal } from '../components/ui/Modal'
import { EmptyState } from '../components/ui/EmptyState'
import { PolicyForm } from '../components/forms/PolicyForm'
import { DataTable } from '../components/ui/DataTable'
import type { Policy } from '../types/entities'

const TABS = [
  { key: 'policies', label: 'Policies', icon: 'policy' },
  { key: 'acceptance', label: 'Acceptance Log', icon: 'fact_check' },
]

export function Governance() {
  const policies = usePolicyStore((s) => s.policies)
  const acceptances = usePolicyStore((s) => s.acceptances)
  const addPolicy = usePolicyStore((s) => s.addPolicy)
  const updatePolicy = usePolicyStore((s) => s.updatePolicy)
  const publishPolicy = usePolicyStore((s) => s.publishPolicy)
  const archivePolicy = usePolicyStore((s) => s.archivePolicy)
  const deletePolicy = usePolicyStore((s) => s.deletePolicy)
  const addToast = useUIStore((s) => s.addToast)

  const [activeTab, setActiveTab] = useState('policies')
  const [showCreate, setShowCreate] = useState(false)
  const [editPolicy, setEditPolicy] = useState<Policy | null>(null)

  const activePolicies = policies.filter((p) => p.status !== 'Archived')
  const archivedPolicies = policies.filter((p) => p.status === 'Archived')

  const handleCreate = (data: Omit<Policy, 'id' | 'createdAt' | 'updatedAt'>) => {
    addPolicy(data)
    setShowCreate(false)
    addToast('Policy created')
  }

  const handleUpdate = (data: Omit<Policy, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editPolicy) return
    const newVersion = editPolicy.status === 'Published' ? editPolicy.version + 1 : editPolicy.version
    updatePolicy(editPolicy.id, { ...data, version: newVersion })
    setEditPolicy(null)
    addToast('Policy updated')
  }

  const handlePublish = (id: string) => {
    publishPolicy(id)
    addToast('Policy published')
  }

  const handleArchive = (id: string) => {
    archivePolicy(id)
    addToast('Policy archived')
  }

  const getPolicyName = (policyId: string) => policies.find((p) => p.id === policyId)?.title || 'Unknown'

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Governance</h1>
        <Button icon="add" onClick={() => setShowCreate(true)}>Create Policy</Button>
      </div>

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'policies' && (
        <div className="flex flex-col gap-6 pt-4">
          {activePolicies.length === 0 ? (
            <EmptyState icon="policy" title="No policies" description="Create your first governance policy." />
          ) : (
            <Card padding={false}>
              <div className="divide-y divide-gray-50">
                {activePolicies.map((policy) => (
                  <div key={policy.id} className="flex items-center gap-3 px-4 py-3 md:px-5">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-gray-900">{policy.title}</p>
                        {policy.mandatory && (
                          <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">REQUIRED</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{policy.type} · v{policy.version}</p>
                    </div>
                    <StatusPill status={policy.status} />
                    <div className="flex gap-1">
                      {policy.status === 'Draft' && (
                        <Button size="sm" variant="ghost" icon="publish" onClick={() => handlePublish(policy.id)}>
                          Publish
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" icon="edit" onClick={() => setEditPolicy(policy)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" icon="archive" onClick={() => handleArchive(policy.id)}>
                        Archive
                      </Button>
                      {policy.status === 'Draft' && (
                        <Button size="sm" variant="ghost" icon="delete" onClick={() => { deletePolicy(policy.id); addToast('Policy deleted') }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {archivedPolicies.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-500">Archived Policies</h3>
              <Card padding={false}>
                <div className="divide-y divide-gray-50">
                  {archivedPolicies.map((policy) => (
                    <div key={policy.id} className="flex items-center gap-3 px-4 py-3 opacity-60">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-gray-600">{policy.title}</p>
                        <p className="text-xs text-gray-400">{policy.type} · v{policy.version}</p>
                      </div>
                      <StatusPill status="Archived" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {activeTab === 'acceptance' && (
        <div className="pt-4">
          {acceptances.length === 0 ? (
            <EmptyState icon="fact_check" title="No acceptances" description="Policy acceptance records will appear here." />
          ) : (
            <Card padding={false}>
              <DataTable
                columns={[
                  { key: 'policy', header: 'Policy', render: (a) => <span className="font-medium text-gray-900">{getPolicyName(a.policyId)}</span> },
                  { key: 'user', header: 'User', render: (a) => a.userName },
                  { key: 'version', header: 'Version', render: (a) => `v${a.version}` },
                  { key: 'date', header: 'Accepted', render: (a) => new Date(a.acceptedAt).toLocaleDateString() },
                  { key: 'ip', header: 'IP Address', render: (a) => <span className="font-mono text-xs text-gray-400">{a.ipAddress}</span> },
                ]}
                data={acceptances}
                keyExtractor={(a) => a.id}
              />
            </Card>
          )}
        </div>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Policy" wide>
        <PolicyForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
      </Modal>

      <Modal open={!!editPolicy} onClose={() => setEditPolicy(null)} title="Edit Policy" wide>
        {editPolicy && (
          <PolicyForm initial={editPolicy} onSubmit={handleUpdate} onCancel={() => setEditPolicy(null)} />
        )}
      </Modal>
    </div>
  )
}
