import type { Campaign } from '../types/entities'

export function validateMandatoryQuestions(
  questions: Campaign['mandatoryQuestions']
): { valid: boolean; missing: string[] } {
  const missing: string[] = []
  if (!questions.humanTension.trim()) missing.push('Human Tension')
  if (!questions.strategicObjective.trim()) missing.push('Strategic Objective')
  if (!questions.ecosystemRole.trim()) missing.push('Ecosystem Role')
  if (!questions.channelIntegration.trim()) missing.push('Channel Integration')
  return { valid: missing.length === 0, missing }
}
