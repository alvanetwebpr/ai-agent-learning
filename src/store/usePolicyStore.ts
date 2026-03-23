import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import type { Policy, PolicyAcceptance } from '../types/entities'

interface PolicyStore {
  policies: Policy[]
  acceptances: PolicyAcceptance[]

  addPolicy: (data: Omit<Policy, 'id' | 'createdAt' | 'updatedAt'>) => void
  updatePolicy: (id: string, updates: Partial<Policy>) => void
  deletePolicy: (id: string) => void
  publishPolicy: (id: string) => void
  archivePolicy: (id: string) => void

  addAcceptance: (data: Omit<PolicyAcceptance, 'id'>) => void
}

export const usePolicyStore = create<PolicyStore>()(
  persist(
    (set) => ({
      policies: [],
      acceptances: [],

      addPolicy: (data) => {
        const now = new Date().toISOString()
        set((s) => ({
          policies: [...s.policies, { ...data, id: nanoid(), createdAt: now, updatedAt: now }],
        }))
      },
      updatePolicy: (id, updates) =>
        set((s) => ({
          policies: s.policies.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        })),
      deletePolicy: (id) =>
        set((s) => ({
          policies: s.policies.filter((p) => p.id !== id),
          acceptances: s.acceptances.filter((a) => a.policyId !== id),
        })),
      publishPolicy: (id) =>
        set((s) => ({
          policies: s.policies.map((p) =>
            p.id === id
              ? { ...p, status: 'Published' as const, publishedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
              : p
          ),
        })),
      archivePolicy: (id) =>
        set((s) => ({
          policies: s.policies.map((p) =>
            p.id === id
              ? { ...p, status: 'Archived' as const, updatedAt: new Date().toISOString() }
              : p
          ),
        })),

      addAcceptance: (data) =>
        set((s) => ({
          acceptances: [...s.acceptances, { ...data, id: nanoid() }],
        })),
    }),
    { name: 'makai-policies' }
  )
)
