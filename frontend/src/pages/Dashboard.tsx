import { Link } from 'react-router-dom';
import { FileStack, CheckCircle2, Clock, HardDrive, TrendingUp, Zap } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import StatusBadge from '../components/StatusBadge';
import { mockStats, mockDocuments, recentActivity } from '../data/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Dashboard</h1>
        <p className="text-base text-text-secondary mt-2">Overview of your document intelligence pipeline</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 stagger-children">
        <StatsCard
          title="Total Documents"
          value={mockStats.totalDocuments}
          icon={<FileStack className="w-5 h-5" />}
          trend={{ value: 12, positive: true }}
        />
        <StatsCard
          title="Processed"
          value={mockStats.processedDocuments}
          icon={<CheckCircle2 className="w-5 h-5" />}
          trend={{ value: 8, positive: true }}
        />
        <StatsCard
          title="Pending"
          value={mockStats.pendingDocuments}
          icon={<Clock className="w-5 h-5" />}
        />
        <StatsCard
          title="Storage Used"
          value={`${mockStats.storageUsedMB} MB`}
          icon={<HardDrive className="w-5 h-5" />}
        />
        <StatsCard
          title="Success Rate"
          value={`${mockStats.successRate}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 2.1, positive: true }}
        />
        <StatsCard
          title="Avg. Processing"
          value={mockStats.avgProcessingTime}
          icon={<Zap className="w-5 h-5" />}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 xl:gap-8">
        {/* Recent Documents */}
        <div className="lg:col-span-3 enterprise-card p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-text-primary tracking-tight">Recent Documents</h2>
            <Link
              to="/documents"
              className="text-sm text-primary-500 hover:text-primary-400 font-medium transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
                  <th className="text-left py-4 px-2 text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">Type</th>
                  <th className="text-left py-4 px-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-2 text-xs font-semibold text-text-muted uppercase tracking-wider hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-white/5 hover:bg-surface-800/50 transition-colors cursor-pointer group">
                    <td className="py-4 px-2">
                      <p className="font-medium text-text-primary group-hover:text-primary-400 transition-colors truncate max-w-[220px]">
                        {doc.name}
                      </p>
                    </td>
                    <td className="py-4 px-2 hidden md:table-cell">
                      <span className="text-text-secondary capitalize">{doc.type}</span>
                    </td>
                    <td className="py-4 px-2">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="py-4 px-2 text-text-muted hidden sm:table-cell">
                      {new Date(doc.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 enterprise-card p-6 md:p-8">
          <h2 className="text-lg font-bold text-text-primary tracking-tight mb-8">Activity Feed</h2>
          <div className="space-y-8">
            {recentActivity.map((activity, idx) => (
              <div key={activity.id} className="relative flex items-start gap-4 group">
                {/* Timeline connector */}
                {idx !== recentActivity.length - 1 && (
                  <div className="absolute left-[5px] top-6 bottom-[-24px] w-px bg-white/10" />
                )}
                
                <div className={`mt-1.5 w-3 h-3 rounded-full flex-shrink-0 z-10 shadow-[0_0_10px_currentColor] ${
                  activity.action === 'Failed' ? 'bg-error-500 text-error-500' :
                  activity.action === 'Processed' || activity.action === 'Classified' ? 'bg-primary-500 text-primary-500' :
                  'bg-blue-400 text-blue-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary leading-relaxed">
                    <span className="font-semibold">{activity.action}</span>{' '}
                    <span className="text-text-secondary">{activity.document}</span>
                  </p>
                  <p className="text-xs text-text-muted mt-1.5 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
