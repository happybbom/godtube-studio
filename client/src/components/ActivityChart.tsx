import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function ActivityChart() {
  const [period, setPeriod] = useState("7");
  
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["/api/chart-data", period],
    queryFn: async () => {
      const response = await fetch(`/api/chart-data?days=${period}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch chart data");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <Card className="lg:col-span-2 bg-replit-card border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Activity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-replit-blue mx-auto mb-3"></div>
              <p className="text-slate-400">Loading chart data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2 bg-replit-card border-slate-600">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Activity Overview</CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                dataKey="date" 
                stroke="#94a3b8"
                fontSize={12}
              />
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
                dataKey="projects" 
                stroke="hsl(217, 91%, 60%)" 
                strokeWidth={2}
                name="Projects"
              />
              <Line 
                type="monotone" 
                dataKey="deployments" 
                stroke="hsl(142, 76%, 36%)" 
                strokeWidth={2}
                name="Deployments"
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="hsl(262, 83%, 58%)" 
                strokeWidth={2}
                name="Active Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
