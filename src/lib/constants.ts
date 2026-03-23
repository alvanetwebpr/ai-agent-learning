import { VideoStage } from '../types/enums'

export const NAV_ITEMS = [
  { icon: 'dashboard', label: 'Dashboard', path: '/' },
  { icon: 'people', label: 'Clients', path: '/clients' },
  { icon: 'campaign', label: 'Campaigns', path: '/campaigns' },
  { icon: 'shield', label: 'Governance', path: '/governance' },
] as const

export const VIDEO_STAGES: VideoStage[] = [
  VideoStage.Concept,
  VideoStage.Scripted,
  VideoStage.PreProduction,
  VideoStage.InProduction,
  VideoStage.PostProduction,
  VideoStage.Review,
  VideoStage.Approved,
  VideoStage.Delivered,
]

export const CLIENT_COLORS = [
  '#8b5cf6',
  '#d946ef',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#3b82f6',
  '#ec4899',
]

export const MANDATORY_QUESTIONS = [
  {
    key: 'humanTension' as const,
    label: 'Human Tension',
    placeholder: 'What is the unresolved human truth this brand must address?',
  },
  {
    key: 'strategicObjective' as const,
    label: 'Strategic Objective',
    placeholder: 'What specific behavior or belief must change?',
  },
  {
    key: 'ecosystemRole' as const,
    label: 'Ecosystem Role',
    placeholder: 'How does this idea serve the broader brand ecosystem?',
  },
  {
    key: 'channelIntegration' as const,
    label: 'Channel Integration',
    placeholder: 'How does this idea live and breathe across all channels?',
  },
]
