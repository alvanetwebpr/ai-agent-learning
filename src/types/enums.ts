export const CampaignStatus = {
  Draft: 'Draft',
  Active: 'Active',
  OnHold: 'On Hold',
  Complete: 'Complete',
  Closed: 'Closed',
} as const
export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus]

export const VideoStage = {
  Concept: 'Concept',
  Scripted: 'Scripted',
  PreProduction: 'Pre-Production',
  InProduction: 'In Production',
  PostProduction: 'Post-Production',
  Review: 'Review',
  Approved: 'Approved',
  Delivered: 'Delivered',
} as const
export type VideoStage = (typeof VideoStage)[keyof typeof VideoStage]

export const PolicyStatus = {
  Draft: 'Draft',
  Published: 'Published',
  Archived: 'Archived',
} as const
export type PolicyStatus = (typeof PolicyStatus)[keyof typeof PolicyStatus]

export const PolicyType = {
  AIUse: 'AI Use',
  AcceptableUse: 'Acceptable Use',
  DataPrivacy: 'Data Privacy',
  ClientConfidentiality: 'Client Confidentiality',
  IPOwnership: 'IP & Ownership',
  ThirdPartyIntegration: 'Third-Party Integration',
} as const
export type PolicyType = (typeof PolicyType)[keyof typeof PolicyType]

export const UserRole = {
  OwnerAdmin: 'Owner/Admin',
  Director: 'Director',
  AccountExecutive: 'Account Executive',
  StrategyDigital: 'Strategy & Digital',
  Creative: 'Creative',
  IT: 'IT',
} as const
export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export const JobStatus = {
  Pending: 'Pending',
  InProgress: 'In Progress',
  Review: 'Review',
  Done: 'Done',
} as const
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]

export const JobPriority = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
  Urgent: 'Urgent',
} as const
export type JobPriority = (typeof JobPriority)[keyof typeof JobPriority]

export const Department = {
  Creative: 'Creative',
  Strategy: 'Strategy',
  Digital: 'Digital',
  Production: 'Production',
} as const
export type Department = (typeof Department)[keyof typeof Department]

export const EstimateStatus = {
  Draft: 'Draft',
  Sent: 'Sent',
  Approved: 'Approved',
  Rejected: 'Rejected',
} as const
export type EstimateStatus = (typeof EstimateStatus)[keyof typeof EstimateStatus]

export const ClientStatus = {
  Active: 'Active',
  Inactive: 'Inactive',
  Prospect: 'Prospect',
} as const
export type ClientStatus = (typeof ClientStatus)[keyof typeof ClientStatus]
