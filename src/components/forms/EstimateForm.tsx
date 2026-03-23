import { useState } from 'react'
import type { EstimateJob, EstimateLineItem } from '../../types/entities'
import { EstimateStatus } from '../../types/enums'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { nanoid } from 'nanoid'

type EstimateFormData = Omit<EstimateJob, 'id' | 'createdAt'>

interface EstimateFormProps {
  campaignId: string
  onSubmit: (data: EstimateFormData) => void
  onCancel: () => void
}

export function EstimateForm({ campaignId, onSubmit, onCancel }: EstimateFormProps) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<string>(EstimateStatus.Draft)
  const [lineItems, setLineItems] = useState<Omit<EstimateLineItem, 'estimateJobId'>[]>([
    { id: nanoid(), description: '', quantity: 1, unitPrice: 0, total: 0 },
  ])

  const updateLineItem = (id: string, field: string, value: string | number) => {
    setLineItems((items) =>
      items.map((item) => {
        if (item.id !== id) return item
        const updated = { ...item, [field]: value }
        if (field === 'quantity' || field === 'unitPrice') {
          updated.total = Number(updated.quantity) * Number(updated.unitPrice)
        }
        return updated
      })
    )
  }

  const addLineItem = () => {
    setLineItems([...lineItems, { id: nanoid(), description: '', quantity: 1, unitPrice: 0, total: 0 }])
  }

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id))
    }
  }

  const grandTotal = lineItems.reduce((sum, item) => sum + item.total, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      campaignId,
      title,
      status: status as EstimateJob['status'],
      lineItems: lineItems.map((item) => ({ ...item, estimateJobId: '' })),
      total: grandTotal,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Estimate Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}
          options={Object.values(EstimateStatus).map((s) => ({ value: s, label: s }))} />
      </div>

      <h3 className="text-sm font-semibold text-gray-700">Line Items</h3>
      <div className="flex flex-col gap-2">
        {lineItems.map((item) => (
          <div key={item.id} className="flex items-end gap-2">
            <div className="flex-1">
              <Input placeholder="Description" value={item.description} onChange={(e) => updateLineItem(item.id, 'description', e.target.value)} />
            </div>
            <div className="w-20">
              <Input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value))} />
            </div>
            <div className="w-28">
              <Input type="number" placeholder="Unit $" value={item.unitPrice} onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value))} />
            </div>
            <div className="w-24 text-right text-sm font-medium text-gray-700">
              ${item.total.toLocaleString()}
            </div>
            <button type="button" onClick={() => removeLineItem(item.id)} className="mb-1 text-gray-400 hover:text-red-500">
              <span className="material-icons-outlined text-[18px]">close</span>
            </button>
          </div>
        ))}
      </div>
      <Button type="button" variant="ghost" size="sm" icon="add" onClick={addLineItem}>Add Line Item</Button>

      <div className="border-t border-gray-100 pt-3 text-right">
        <span className="text-sm text-gray-500">Total: </span>
        <span className="text-lg font-semibold text-gray-900">${grandTotal.toLocaleString()}</span>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Create Estimate</Button>
      </div>
    </form>
  )
}
