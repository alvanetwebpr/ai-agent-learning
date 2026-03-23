import { useState } from 'react'
import type { CreativeJob } from '../../types/entities'
import { Department, JobStatus, JobPriority } from '../../types/enums'
import { Input, Textarea } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

type JobFormData = Omit<CreativeJob, 'id' | 'createdAt'>

interface CreativeJobFormProps {
  campaignId: string
  initial?: CreativeJob
  onSubmit: (data: JobFormData) => void
  onCancel: () => void
}

export function CreativeJobForm({ campaignId, initial, onSubmit, onCancel }: CreativeJobFormProps) {
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [department, setDepartment] = useState<string>(initial?.department || Department.Creative)
  const [status, setStatus] = useState<string>(initial?.status || JobStatus.Pending)
  const [priority, setPriority] = useState<string>(initial?.priority || JobPriority.Medium)
  const [assignedTo, setAssignedTo] = useState(initial?.assignedTo || '')
  const [dueDate, setDueDate] = useState(initial?.dueDate || '')
  const [hookScore, setHookScore] = useState<string>(initial?.hookScore?.toString() || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      campaignId,
      title,
      description,
      department: department as CreativeJob['department'],
      status: status as CreativeJob['status'],
      priority: priority as CreativeJob['priority'],
      assignedTo,
      dueDate,
      hookScore: hookScore ? Number(hookScore) : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Department" value={department} onChange={(e) => setDepartment(e.target.value)}
          options={Object.values(Department).map((d) => ({ value: d, label: d }))} />
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}
          options={Object.values(JobStatus).map((s) => ({ value: s, label: s }))} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}
          options={Object.values(JobPriority).map((p) => ({ value: p, label: p }))} />
        <Input label="Assigned To" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <Input label="Hook Score (0-10)" type="number" min="0" max="10" value={hookScore} onChange={(e) => setHookScore(e.target.value)} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Update Job' : 'Create Job'}</Button>
      </div>
    </form>
  )
}
