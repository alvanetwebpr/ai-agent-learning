import { useState } from 'react'
import { useCampaignStore, useUIStore } from '../../store'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { ScoreBadge } from '../../components/ui/ScoreBadge'
import { Modal } from '../../components/ui/Modal'
import { EmptyState } from '../../components/ui/EmptyState'
import { CreativeJobForm } from '../../components/forms/CreativeJobForm'
import { EstimateForm } from '../../components/forms/EstimateForm'
import type { CreativeJob, EstimateJob } from '../../types/entities'

interface CreativeTabProps {
  campaignId: string
}

export function CreativeTab({ campaignId }: CreativeTabProps) {
  const jobs = useCampaignStore((s) => s.creativeJobs.filter((j) => j.campaignId === campaignId))
  const estimates = useCampaignStore((s) => s.estimateJobs.filter((e) => e.campaignId === campaignId))
  const addCreativeJob = useCampaignStore((s) => s.addCreativeJob)
  const addEstimateJob = useCampaignStore((s) => s.addEstimateJob)
  const addToast = useUIStore((s) => s.addToast)
  const [showJobForm, setShowJobForm] = useState(false)
  const [showEstimateForm, setShowEstimateForm] = useState(false)

  const handleAddJob = (data: Omit<CreativeJob, 'id' | 'createdAt'>) => {
    addCreativeJob(data)
    setShowJobForm(false)
    addToast('Job created')
  }

  const handleAddEstimate = (data: Omit<EstimateJob, 'id' | 'createdAt'>) => {
    addEstimateJob(data)
    setShowEstimateForm(false)
    addToast('Estimate created')
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Creative Jobs</h3>
          <Button size="sm" icon="add" onClick={() => setShowJobForm(true)}>Add Job</Button>
        </div>
        {jobs.length === 0 ? (
          <EmptyState icon="work" title="No jobs yet" description="Add creative, strategy, or digital jobs to this campaign." />
        ) : (
          <Card padding={false}>
            <div className="divide-y divide-gray-50">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-500">
                      {job.department} · {job.assignedTo || 'Unassigned'} · Due {job.dueDate || 'TBD'}
                    </p>
                  </div>
                  <StatusPill status={job.priority} />
                  <StatusPill status={job.status} />
                  <ScoreBadge score={job.hookScore} size="sm" />
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Estimates</h3>
          <Button size="sm" variant="secondary" icon="add" onClick={() => setShowEstimateForm(true)}>Create Estimate</Button>
        </div>
        {estimates.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-400">No estimates for this campaign.</p>
        ) : (
          estimates.map((est) => (
            <Card key={est.id} className="mb-3">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{est.title}</h4>
                  <StatusPill status={est.status} className="mt-1" />
                </div>
                <p className="text-lg font-semibold text-gray-900">${est.total.toLocaleString()}</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-500">
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-right">Qty</th>
                    <th className="pb-2 text-right">Unit Price</th>
                    <th className="pb-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {est.lineItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50">
                      <td className="py-2 text-gray-700">{item.description}</td>
                      <td className="py-2 text-right text-gray-600">{item.quantity}</td>
                      <td className="py-2 text-right text-gray-600">${item.unitPrice.toLocaleString()}</td>
                      <td className="py-2 text-right font-medium text-gray-900">${item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          ))
        )}
      </div>

      <Modal open={showJobForm} onClose={() => setShowJobForm(false)} title="New Job" wide>
        <CreativeJobForm campaignId={campaignId} onSubmit={handleAddJob} onCancel={() => setShowJobForm(false)} />
      </Modal>
      <Modal open={showEstimateForm} onClose={() => setShowEstimateForm(false)} title="New Estimate" wide>
        <EstimateForm campaignId={campaignId} onSubmit={handleAddEstimate} onCancel={() => setShowEstimateForm(false)} />
      </Modal>
    </div>
  )
}
