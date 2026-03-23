import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import type { Campaign, Brief, CreativeJob, EstimateJob, VideoProduction, AILog } from '../types/entities'

interface CampaignStore {
  campaigns: Campaign[]
  briefs: Brief[]
  creativeJobs: CreativeJob[]
  estimateJobs: EstimateJob[]
  videoProductions: VideoProduction[]
  aiLogs: AILog[]

  addCampaign: (data: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  getCampaign: (id: string) => Campaign | undefined

  addBrief: (data: Omit<Brief, 'id' | 'createdAt'>) => void
  deleteBrief: (id: string) => void

  addCreativeJob: (data: Omit<CreativeJob, 'id' | 'createdAt'>) => void
  updateCreativeJob: (id: string, updates: Partial<CreativeJob>) => void
  deleteCreativeJob: (id: string) => void

  addEstimateJob: (data: Omit<EstimateJob, 'id' | 'createdAt'>) => void
  updateEstimateJob: (id: string, updates: Partial<EstimateJob>) => void
  deleteEstimateJob: (id: string) => void

  addVideoProduction: (data: Omit<VideoProduction, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateVideoProduction: (id: string, updates: Partial<VideoProduction>) => void
  deleteVideoProduction: (id: string) => void

  addAILog: (data: Omit<AILog, 'id' | 'createdAt'>) => void
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    (set, get) => ({
      campaigns: [],
      briefs: [],
      creativeJobs: [],
      estimateJobs: [],
      videoProductions: [],
      aiLogs: [],

      addCampaign: (data) => {
        const now = new Date().toISOString()
        set((s) => ({
          campaigns: [...s.campaigns, { ...data, id: nanoid(), createdAt: now, updatedAt: now }],
        }))
      },
      updateCampaign: (id, updates) =>
        set((s) => ({
          campaigns: s.campaigns.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
          ),
        })),
      deleteCampaign: (id) =>
        set((s) => ({
          campaigns: s.campaigns.filter((c) => c.id !== id),
          briefs: s.briefs.filter((b) => b.campaignId !== id),
          creativeJobs: s.creativeJobs.filter((j) => j.campaignId !== id),
          estimateJobs: s.estimateJobs.filter((e) => e.campaignId !== id),
          videoProductions: s.videoProductions.filter((v) => v.campaignId !== id),
          aiLogs: s.aiLogs.filter((l) => l.campaignId !== id),
        })),
      getCampaign: (id) => get().campaigns.find((c) => c.id === id),

      addBrief: (data) =>
        set((s) => ({
          briefs: [...s.briefs, { ...data, id: nanoid(), createdAt: new Date().toISOString() }],
        })),
      deleteBrief: (id) =>
        set((s) => ({ briefs: s.briefs.filter((b) => b.id !== id) })),

      addCreativeJob: (data) =>
        set((s) => ({
          creativeJobs: [...s.creativeJobs, { ...data, id: nanoid(), createdAt: new Date().toISOString() }],
        })),
      updateCreativeJob: (id, updates) =>
        set((s) => ({
          creativeJobs: s.creativeJobs.map((j) => (j.id === id ? { ...j, ...updates } : j)),
        })),
      deleteCreativeJob: (id) =>
        set((s) => ({ creativeJobs: s.creativeJobs.filter((j) => j.id !== id) })),

      addEstimateJob: (data) =>
        set((s) => ({
          estimateJobs: [...s.estimateJobs, { ...data, id: nanoid(), createdAt: new Date().toISOString() }],
        })),
      updateEstimateJob: (id, updates) =>
        set((s) => ({
          estimateJobs: s.estimateJobs.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),
      deleteEstimateJob: (id) =>
        set((s) => ({ estimateJobs: s.estimateJobs.filter((e) => e.id !== id) })),

      addVideoProduction: (data) => {
        const now = new Date().toISOString()
        set((s) => ({
          videoProductions: [...s.videoProductions, { ...data, id: nanoid(), createdAt: now, updatedAt: now }],
        }))
      },
      updateVideoProduction: (id, updates) =>
        set((s) => ({
          videoProductions: s.videoProductions.map((v) =>
            v.id === id ? { ...v, ...updates, updatedAt: new Date().toISOString() } : v
          ),
        })),
      deleteVideoProduction: (id) =>
        set((s) => ({ videoProductions: s.videoProductions.filter((v) => v.id !== id) })),

      addAILog: (data) =>
        set((s) => ({
          aiLogs: [...s.aiLogs, { ...data, id: nanoid(), createdAt: new Date().toISOString() }],
        })),
    }),
    { name: 'makai-campaigns' }
  )
)
