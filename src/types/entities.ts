import {
  CampaignStatus,
  VideoStage,
  PolicyStatus,
  PolicyType,
  JobStatus,
  JobPriority,
  Department,
  EstimateStatus,
  ClientStatus,
} from './enums'

export interface Client {
  id: string
  name: string
  industry: string
  status: ClientStatus
  accentColor: string
  brandProfile: {
    tone: string
    targetAudience: string
    psychographic: string
    competitiveLandscape: string
    legalConstraints: string
    noGoTopics: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface Campaign {
  id: string
  clientId: string
  name: string
  status: CampaignStatus
  mandatoryQuestions: {
    humanTension: string
    strategicObjective: string
    ecosystemRole: string
    channelIntegration: string
  }
  creativeHookScore: number | null
  createdAt: string
  updatedAt: string
}

export interface Brief {
  id: string
  campaignId: string
  title: string
  content: string
  validationScore: number | null
  createdAt: string
}

export interface CreativeJob {
  id: string
  campaignId: string
  title: string
  description: string
  department: Department
  status: JobStatus
  priority: JobPriority
  assignedTo: string
  dueDate: string
  hookScore: number | null
  createdAt: string
}

export interface EstimateJob {
  id: string
  campaignId: string
  title: string
  status: EstimateStatus
  lineItems: EstimateLineItem[]
  total: number
  createdAt: string
}

export interface EstimateLineItem {
  id: string
  estimateJobId: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface VideoProduction {
  id: string
  campaignId: string
  title: string
  stage: VideoStage
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Asset {
  id: string
  campaignId: string
  name: string
  type: string
  url: string
  createdAt: string
}

export interface AILog {
  id: string
  campaignId: string
  module: string
  department: Department
  prompt: string
  output: string
  hookScore: number | null
  validationStatus: 'Pending' | 'Valid' | 'Invalid'
  flagged: boolean
  model: string
  createdAt: string
}

export interface Policy {
  id: string
  title: string
  type: PolicyType
  status: PolicyStatus
  content: string
  version: number
  mandatory: boolean
  requireReacceptance: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface PolicyAcceptance {
  id: string
  policyId: string
  userId: string
  userName: string
  version: number
  acceptedAt: string
  ipAddress: string
}

export interface AuditLog {
  id: string
  entityType: string
  entityId: string
  action: string
  userId: string
  userName: string
  module: string
  campaignId: string | null
  piiFlag: boolean
  phiFlag: boolean
  details: string
  createdAt: string
}
