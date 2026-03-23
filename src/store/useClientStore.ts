import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import type { Client } from '../types/entities'

interface ClientStore {
  clients: Client[]
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateClient: (id: string, updates: Partial<Client>) => void
  deleteClient: (id: string) => void
  getClient: (id: string) => Client | undefined
}

export const useClientStore = create<ClientStore>()(
  persist(
    (set, get) => ({
      clients: [],
      addClient: (data) => {
        const now = new Date().toISOString()
        set((s) => ({
          clients: [...s.clients, { ...data, id: nanoid(), createdAt: now, updatedAt: now }],
        }))
      },
      updateClient: (id, updates) =>
        set((s) => ({
          clients: s.clients.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
          ),
        })),
      deleteClient: (id) =>
        set((s) => ({ clients: s.clients.filter((c) => c.id !== id) })),
      getClient: (id) => get().clients.find((c) => c.id === id),
    }),
    { name: 'makai-clients' }
  )
)
