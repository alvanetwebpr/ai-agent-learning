import { useState } from 'react'
import type { Client } from '../../types/entities'
import { ClientStatus } from '../../types/enums'
import { Input, Textarea } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { CLIENT_COLORS } from '../../lib/constants'

type ClientFormData = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>

interface ClientFormProps {
  initial?: Client
  onSubmit: (data: ClientFormData) => void
  onCancel: () => void
}

export function ClientForm({ initial, onSubmit, onCancel }: ClientFormProps) {
  const [name, setName] = useState(initial?.name || '')
  const [industry, setIndustry] = useState(initial?.industry || '')
  const [status, setStatus] = useState<string>(initial?.status || ClientStatus.Prospect)
  const [accentColor, setAccentColor] = useState(initial?.accentColor || CLIENT_COLORS[0])
  const [tone, setTone] = useState(initial?.brandProfile.tone || '')
  const [targetAudience, setTargetAudience] = useState(initial?.brandProfile.targetAudience || '')
  const [psychographic, setPsychographic] = useState(initial?.brandProfile.psychographic || '')
  const [competitiveLandscape, setCompetitiveLandscape] = useState(initial?.brandProfile.competitiveLandscape || '')
  const [legalConstraints, setLegalConstraints] = useState(initial?.brandProfile.legalConstraints || '')
  const [noGoTopics, setNoGoTopics] = useState(initial?.brandProfile.noGoTopics.join(', ') || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      industry,
      status: status as Client['status'],
      accentColor,
      brandProfile: {
        tone,
        targetAudience,
        psychographic,
        competitiveLandscape,
        legalConstraints,
        noGoTopics: noGoTopics.split(',').map((t) => t.trim()).filter(Boolean),
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Client Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={Object.values(ClientStatus).map((s) => ({ value: s, label: s }))}
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Brand Color</label>
          <div className="flex gap-2">
            {CLIENT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setAccentColor(color)}
                className={`h-8 w-8 rounded-full border-2 ${
                  accentColor === color ? 'border-gray-900' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />
      <h3 className="text-sm font-semibold text-gray-700">Brand Profile</h3>

      <Textarea label="Tone of Voice" value={tone} onChange={(e) => setTone(e.target.value)} placeholder="How does this brand speak?" />
      <Textarea label="Target Audience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="Demographics and target market" />
      <Textarea label="Psychographic Profile" value={psychographic} onChange={(e) => setPsychographic(e.target.value)} placeholder="Values, interests, lifestyle" />
      <Textarea label="Competitive Landscape" value={competitiveLandscape} onChange={(e) => setCompetitiveLandscape(e.target.value)} placeholder="Key competitors and differentiators" />
      <Textarea label="Legal Constraints" value={legalConstraints} onChange={(e) => setLegalConstraints(e.target.value)} placeholder="Regulatory requirements and restrictions" />
      <Input label="No-Go Topics (comma separated)" value={noGoTopics} onChange={(e) => setNoGoTopics(e.target.value)} placeholder="Politics, Religion, etc." />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Update Client' : 'Create Client'}</Button>
      </div>
    </form>
  )
}
