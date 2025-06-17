import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";
import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react";

export default function Analytics() {
  const [period, setPeriod] = useState("30");

  // Sample data for different charts
  const performanceData = [
    { month: "Jan", projects: 12, deployments: 45, issues: 8 },
    { month: "Feb", projects: 15, deployments: 52, issues: 6 },
    { month: "Mar", projects: 18, deployments: 48, issues: 12 },
    { month: "Apr", projects: 22, deployments: 61, issues: 4 },
    { month: "May", projects: 25, deployments: 58, issues: 9 },
    { month: "Jun", projects: 28, deployments: 67, issues: 5 },
  ];

  const technologyData = [
    { name: "React", value: 35, color: "hsl(217, 91%, 60%)" },
    { name: "Node.js", value: 28, color: "hsl(142, 76%, 36%)" },
    { name: "Python", value: 20, color: "hsl(262, 83%, 58%)" },
    { name: "TypeScript", value: 17, color: "hsl(32, 95%, 44%)" },
  ];

  const trafficData = [
    { day: "Mon", visitors: 1200, pageViews: 3400 },
    { day: "Tue", visitors: 1100, pageViews: 3100 },
    { day: "Wed", visitors: 1350, pageViews: 3800 },
    { day: "Thu", visitors: 1250, pageViews: 3500 },
    { day: "Fri", visitors: 1400, pageViews: 4200 },
    { day: "Sat", visitors: 900, pageViews: 2100 },
    { day: "Sun", visitors: 850, pageViews: 1900 },
  ];

  const StatCard = ({ title, value, change, changeType, icon: Icon }: {
    title: string;
    value: string;
    change: string;
    changeType: "positive" | "negative";
    icon: any;
  }) => (
    <Card className="bg-replit-card border-slate-600">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            <div className="flex items-center mt-2">
              {changeType === "positive" ? (
                <TrendingUp className="text-replit-green mr-1" size={16} />
              ) : (
                <TrendingDown className="text-red-400 mr-1" size={16} />
              )}
              <span className={`text-sm font-medium ${
                changeType === "positive" ? "text-replit-green" : "text-red-400"
              }`}>
                {change}
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-replit-blue rounded-lg flex items-center justify-center">
            <Icon className="text-white" size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
            <p className="text-slate-400">Detailed insights into your project performance and metrics.</p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-slate-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value="156"
          change="+12%"
          changeType="positive"
          icon={Target}
        />
        <StatCard
          title="Active Users"
          value="89"
          change="+8%"
          changeType="positive"
          icon={Activity}
        />
        <StatCard
          title="Success Rate"
          value="94.2%"
          change="+2.1%"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="Error Rate"
          value="1.2%"
          change="-0.5%"
          changeType="positive"
          icon={TrendingDown}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Overview */}
        <Card className="bg-replit-card border-slate-600">
          <CardHeader>
            <CardTitle className="text-white">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#334155",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                      color: "#f1f5f9"
                    }}
                  />
                  <Bar dataKey="projects" fill="hsl(217, 91%, 60%)" name="Projects" />
                  <Bar dataKey="deployments" fill="hsl(142, 76%, 36%)" name="Deployments" />
                  <Bar dataKey="issues" fill="hsl(0, 84%, 60%)" name="Issues" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Technology Usage */}
        <Card className="bg-replit-card border-slate-600">
          <CardHeader>
            <CardTitle className="text-white">Technology Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={technologyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {technologyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#334155",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                      color: "#f1f5f9"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {technologyData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-300 text-sm">{item.name}</span>
                  <span className="text-slate-400 text-sm">({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Analytics */}
      <Card className="bg-replit-card border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Weekly Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#334155",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                    color: "#f1f5f9"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="hsl(217, 91%, 60%)" 
                  strokeWidth={3}
                  name="Visitors"
                />
                <Line 
                  type="monotone" 
                  dataKey="pageViews" 
                  stroke="hsl(262, 83%, 58%)" 
                  strokeWidth={3}
                  name="Page Views"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
