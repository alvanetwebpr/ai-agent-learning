import { useState } from 'react'
import type { Campaign } from '../../types/entities'
import { CampaignStatus } from '../../types/enums'
import { Input, Textarea } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { MANDATORY_QUESTIONS } from '../../lib/constants'
import { useClientStore } from '../../store'

type CampaignFormData = Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>

interface CampaignFormProps {
  initial?: Campaign
  onSubmit: (data: CampaignFormData) => void
  onCancel: () => void
}

export function CampaignForm({ initial, onSubmit, onCancel }: CampaignFormProps) {
  const clients = useClientStore((s) => s.clients)
  const [name, setName] = useState(initial?.name || '')
  const [clientId, setClientId] = useState(initial?.clientId || clients[0]?.id || '')
  const [status, setStatus] = useState<string>(initial?.status || CampaignStatus.Draft)
  const [hookScore, setHookScore] = useState<string>(initial?.creativeHookScore?.toString() || '')
  const [questions, setQuestions] = useState(
    initial?.mandatoryQuestions || {
      humanTension: '',
      strategicObjective: '',
      ecosystemRole: '',
      channelIntegration: '',
    }
  )
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const missing = MANDATORY_QUESTIONS.filter((q) => !questions[q.key].trim()).map((q) => q.label)
    if (missing.length > 0) {
      setErrors(missing)
      return
    }
    onSubmit({
      name,
      clientId,
      status: status as Campaign['status'],
      creativeHookScore: hookScore ? Number(hookScore) : null,
      mandatoryQuestions: questions,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Campaign Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Select
          label="Client"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          options={clients.map((c) => ({ value: c.id, label: c.name }))}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={Object.values(CampaignStatus).map((s) => ({ value: s, label: s }))}
        />
        <Input
          label="Creative Hook Score (0-10)"
          type="number"
          min="0"
          max="10"
          value={hookScore}
          onChange={(e) => setHookScore(e.target.value)}
          placeholder="Optional"
        />
      </div>

      <hr className="border-gray-100" />
      <h3 className="text-sm font-semibold text-gray-700">
        4 Mandatory AI Questions
        <span className="ml-1 text-xs font-normal text-red-500">* Required</span>
      </h3>

      {errors.length > 0 && (
        <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700">
          Missing: {errors.join(', ')}
        </div>
      )}

      {MANDATORY_QUESTIONS.map((q) => (
        <Textarea
          key={q.key}
          label={q.label}
          placeholder={q.placeholder}
          value={questions[q.key]}
          onChange={(e) => {
            setQuestions({ ...questions, [q.key]: e.target.value })
            setErrors(errors.filter((err) => err !== q.label))
          }}
        />
      ))}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Update Campaign' : 'Create Campaign'}</Button>
      </div>
    </form>
  )
}
