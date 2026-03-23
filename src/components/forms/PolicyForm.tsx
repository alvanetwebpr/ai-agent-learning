import { useState } from 'react'
import type { Policy } from '../../types/entities'
import { PolicyType, PolicyStatus } from '../../types/enums'
import { Input, Textarea } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

type PolicyFormData = Omit<Policy, 'id' | 'createdAt' | 'updatedAt'>

interface PolicyFormProps {
  initial?: Policy
  onSubmit: (data: PolicyFormData) => void
  onCancel: () => void
}

export function PolicyForm({ initial, onSubmit, onCancel }: PolicyFormProps) {
  const [title, setTitle] = useState(initial?.title || '')
  const [type, setType] = useState<string>(initial?.type || PolicyType.AIUse)
  const [content, setContent] = useState(initial?.content || '')
  const [mandatory, setMandatory] = useState(initial?.mandatory ?? false)
  const [requireReacceptance, setRequireReacceptance] = useState(initial?.requireReacceptance ?? false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      type: type as Policy['type'],
      status: initial?.status || PolicyStatus.Draft,
      content,
      version: initial?.version || 1,
      mandatory,
      requireReacceptance,
      publishedAt: initial?.publishedAt || null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Policy Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Select
        label="Policy Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        options={Object.values(PolicyType).map((t) => ({ value: t, label: t }))}
      />
      <Textarea label="Content" value={content} onChange={(e) => setContent(e.target.value)} rows={6} required />

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={mandatory} onChange={(e) => setMandatory(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary-500" />
          Mandatory
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={requireReacceptance} onChange={(e) => setRequireReacceptance(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary-500" />
          Require Re-acceptance on Update
        </label>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Update Policy' : 'Create Policy'}</Button>
      </div>
    </form>
  )
}
