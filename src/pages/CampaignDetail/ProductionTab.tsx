import { useState } from 'react'
import { useCampaignStore, useUIStore } from '../../store'
import { VideoStage } from '../../types/enums'
import { VIDEO_STAGES } from '../../lib/constants'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { EmptyState } from '../../components/ui/EmptyState'
import { Input, Textarea } from '../../components/ui/Input'
import clsx from 'clsx'

interface ProductionTabProps {
  campaignId: string
}

export function ProductionTab({ campaignId }: ProductionTabProps) {
  const productions = useCampaignStore((s) => s.videoProductions.filter((v) => v.campaignId === campaignId))
  const addVideoProduction = useCampaignStore((s) => s.addVideoProduction)
  const updateVideoProduction = useCampaignStore((s) => s.updateVideoProduction)
  const addToast = useUIStore((s) => s.addToast)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    addVideoProduction({ campaignId, title, stage: VideoStage.Concept, notes })
    setShowForm(false)
    setTitle('')
    setNotes('')
    addToast('Video production created')
  }

  const handleStageChange = (id: string, stage: string) => {
    updateVideoProduction(id, { stage: stage as typeof VideoStage[keyof typeof VideoStage] })
    addToast(`Stage updated to ${stage}`)
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Video Productions</h3>
        <Button size="sm" icon="add" onClick={() => setShowForm(true)}>Add Production</Button>
      </div>

      {productions.length === 0 ? (
        <EmptyState icon="videocam" title="No video productions" description="Add a video production to track its progress through the pipeline." />
      ) : (
        <div className="flex flex-col gap-4">
          {productions.map((prod) => {
            const currentIndex = VIDEO_STAGES.indexOf(prod.stage as typeof VIDEO_STAGES[number])
            return (
              <Card key={prod.id}>
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{prod.title}</h4>
                  <select
                    value={prod.stage}
                    onChange={(e) => handleStageChange(prod.id, e.target.value)}
                    className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700"
                  >
                    {VIDEO_STAGES.map((stage) => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3 flex gap-1 overflow-x-auto">
                  {VIDEO_STAGES.map((stage, i) => (
                    <div
                      key={stage}
                      className={clsx(
                        'flex-1 rounded py-1.5 text-center text-[10px] font-medium transition-colors',
                        i <= currentIndex
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      )}
                      title={stage}
                    >
                      <span className="hidden md:inline">{stage}</span>
                      <span className="md:hidden">{i + 1}</span>
                    </div>
                  ))}
                </div>

                {prod.notes && (
                  <p className="text-xs text-gray-500">{prod.notes}</p>
                )}
              </Card>
            )
          })}
        </div>
      )}

      <Modal open={showForm} onClose={() => setShowForm(false)} title="New Video Production">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input label="Production Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Production details, location, etc." />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
