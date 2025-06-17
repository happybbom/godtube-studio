import { useQuery } from "@tanstack/react-query";
import { MetricsCard } from "@/components/MetricsCard";
import { ActivityChart } from "@/components/ActivityChart";
import { RecentActivity } from "@/components/RecentActivity";
import { ProjectsTable } from "@/components/ProjectsTable";
import { FolderOpen, Users, TrendingUp, Clock } from "lucide-react";
import { Metrics } from "@shared/schema";

export default function Dashboard() {
  const { data: metrics, isLoading } = useQuery<Metrics>({
    queryKey: ["/api/metrics"],
  });

  const formatResponseTime = (milliseconds: number) => {
    if (milliseconds < 1000) return `${milliseconds}ms`;
    return `${(milliseconds / 1000).toFixed(1)}s`;
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          // Loading skeleton
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-replit-card rounded-xl p-6 border border-slate-600 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-600 rounded-lg"></div>
                <div className="w-8 h-4 bg-slate-600 rounded"></div>
              </div>
              <div className="w-16 h-8 bg-slate-600 rounded mb-1"></div>
              <div className="w-24 h-4 bg-slate-700 rounded"></div>
            </div>
          ))
        ) : (
          <>
            <MetricsCard
              title="Active Projects"
              value={metrics?.activeProjects || 0}
              change="+12%"
              changeType="positive"
              icon={FolderOpen}
              iconColor="bg-replit-blue"
            />
            <MetricsCard
              title="Team Members"
              value={metrics?.totalMembers || 0}
              change="+8%"
              changeType="positive"
              icon={Users}
              iconColor="bg-replit-purple"
            />
            <MetricsCard
              title="Success Rate"
              value={`${metrics?.successRate || 0}%`}
              change="+15%"
              changeType="positive"
              icon={TrendingUp}
              iconColor="bg-replit-green"
            />
            <MetricsCard
              title="Avg Response Time"
              value={formatResponseTime(metrics?.avgResponseTime || 0)}
              change="-3%"
              changeType="negative"
              icon={Clock}
              iconColor="bg-replit-orange"
            />
          </>
        )}
      </div>

      {/* Projects Table */}
      <div className="mb-8">
        <ProjectsTable />
      </div>

      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivityChart />
        <RecentActivity />
      </div>

    </div>
  );
}
