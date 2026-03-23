import { useNavigate } from 'react-router-dom'
import { useClientStore, useCampaignStore } from '../store'
import { Card } from '../components/ui/Card'
import { StatusPill } from '../components/ui/StatusPill'
import { ScoreBadge } from '../components/ui/ScoreBadge'

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string | number; color: string }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
          <span className="material-icons-outlined text-[20px] text-white">{icon}</span>
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </Card>
  )
}

export function Dashboard() {
  const navigate = useNavigate()
  const clients = useClientStore((s) => s.clients)
  const campaigns = useCampaignStore((s) => s.campaigns)
  const creativeJobs = useCampaignStore((s) => s.creativeJobs)
  const estimateJobs = useCampaignStore((s) => s.estimateJobs)

  const activeCampaigns = campaigns.filter((c) => c.status === 'Active')
  const activeJobs = creativeJobs.filter((j) => j.status === 'In Progress' || j.status === 'Review')
  const pendingEstimates = estimateJobs.filter((e) => e.status === 'Draft' || e.status === 'Sent')
  const recentCampaigns = [...campaigns].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5)

  const getClientName = (clientId: string) => clients.find((c) => c.id === clientId)?.name || 'Unknown'

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon="campaign" label="Active Campaigns" value={activeCampaigns.length} color="bg-primary-500" />
        <StatCard icon="people" label="Total Clients" value={clients.length} color="bg-cyan-500" />
        <StatCard icon="work" label="Active Jobs" value={activeJobs.length} color="bg-green-500" />
        <StatCard icon="receipt_long" label="Pending Estimates" value={pendingEstimates.length} color="bg-amber-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Recent Campaigns</h2>
          <div className="flex flex-col gap-3">
            {recentCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
                className="flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-xs text-gray-500">{getClientName(campaign.clientId)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill status={campaign.status} />
                  <ScoreBadge score={campaign.creativeHookScore} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Active Jobs</h2>
            <div className="flex flex-col gap-3">
              {activeJobs.slice(0, 5).map((job) => (
                <div key={job.id} className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-500">{job.department} · {job.assignedTo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusPill status={job.priority} />
                    <StatusPill status={job.status} />
                  </div>
                </div>
              ))}
              {activeJobs.length === 0 && (
                <p className="py-4 text-center text-sm text-gray-400">No active jobs</p>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Client Roster</h2>
            <div className="flex flex-col gap-2">
              {clients.slice(0, 5).map((client) => (
                <div
                  key={client.id}
                  onClick={() => navigate(`/clients/${client.id}`)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                    style={{ backgroundColor: client.accentColor }}
                  >
                    {client.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{client.name}</p>
                    <p className="text-xs text-gray-500">{client.industry}</p>
                  </div>
                  <StatusPill status={client.status} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
