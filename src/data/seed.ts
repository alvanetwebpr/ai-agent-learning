import { useClientStore } from '../store/useClientStore'
import { useCampaignStore } from '../store/useCampaignStore'
import { usePolicyStore } from '../store/usePolicyStore'
import { mockClients } from './mock-clients'
import { mockCampaigns, mockBriefs, mockCreativeJobs, mockEstimateJobs, mockVideoProductions, mockAILogs } from './mock-campaigns'
import { mockPolicies, mockAcceptances } from './mock-policies'

export function seedIfEmpty() {
  const clientStore = useClientStore.getState()
  if (clientStore.clients.length === 0) {
    useClientStore.setState({ clients: mockClients })
  }

  const campaignStore = useCampaignStore.getState()
  if (campaignStore.campaigns.length === 0) {
    useCampaignStore.setState({
      campaigns: mockCampaigns,
      briefs: mockBriefs,
      creativeJobs: mockCreativeJobs,
      estimateJobs: mockEstimateJobs,
      videoProductions: mockVideoProductions,
      aiLogs: mockAILogs,
    })
  }

  const policyStore = usePolicyStore.getState()
  if (policyStore.policies.length === 0) {
    usePolicyStore.setState({
      policies: mockPolicies,
      acceptances: mockAcceptances,
    })
  }
}
