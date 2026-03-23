import { useState } from 'react'
import type { Brief } from '../../types/entities'
import { Input, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'

type BriefFormData = Omit<Brief, 'id' | 'createdAt'>

interface BriefFormProps {
  campaignId: string
  onSubmit: (data: BriefFormData) => void
  onCancel: () => void
}

export function BriefForm({ campaignId, onSubmit, onCancel }: BriefFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [validationScore, setValidationScore] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      campaignId,
      title,
      content,
      validationScore: validationScore ? Number(validationScore) : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Brief Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea label="Brief Content" value={content} onChange={(e) => setContent(e.target.value)} rows={6} required />
      <Input label="Validation Score (0-10)" type="number" min="0" max="10" value={validationScore} onChange={(e) => setValidationScore(e.target.value)} />
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Create Brief</Button>
      </div>
    </form>
  )
}
