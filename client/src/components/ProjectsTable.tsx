import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Plus, MoreVertical, Code, Smartphone } from "lucide-react";

export function ProjectsTable() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-replit-green/20 text-replit-green";
      case "in_progress":
        return "bg-replit-orange/20 text-replit-orange";
      case "completed":
        return "bg-replit-blue/20 text-replit-blue";
      case "paused":
        return "bg-slate-500/20 text-slate-400";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  const getProjectIcon = (technologies: string[] | null) => {
    if (!technologies || technologies.length === 0) return Code;
    if (technologies.some(tech => tech.toLowerCase().includes("native") || tech.toLowerCase().includes("mobile"))) {
      return Smartphone;
    }
    return Code;
  };

  const generateAvatars = (count: number) => {
    const colors = ["bg-replit-purple", "bg-replit-blue", "bg-replit-green", "bg-replit-orange"];
    const initials = ["J", "S", "M", "A", "B", "C"];
    
    return Array.from({ length: Math.min(count, 3) }, (_, i) => ({
      color: colors[i % colors.length],
      initial: initials[i % initials.length],
    }));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  if (isLoading) {
    return (
      <Card className="bg-replit-card border-slate-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Recent Projects</CardTitle>
            <Button disabled className="bg-replit-blue hover:bg-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 animate-pulse">
                <div className="w-10 h-10 bg-slate-600 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-600 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-slate-700 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-replit-card border-slate-600 overflow-hidden">
      <CardHeader className="border-b border-slate-600">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Recent Projects</CardTitle>
          <Button className="bg-replit-blue hover:bg-blue-600 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Project
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Members
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-600">
              {projects?.map((project) => {
                const ProjectIcon = getProjectIcon(project.technologies);
                const avatars = generateAvatars(project.memberCount);
                
                return (
                  <tr key={project.id} className="hover:bg-slate-700 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-replit-blue rounded-lg flex items-center justify-center mr-3">
                          <ProjectIcon className="text-white" size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{project.name}</div>
                          <div className="text-sm text-slate-400">
                            {project.technologies?.join(" • ") || "No technologies specified"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={`${getStatusColor(project.status)} border-0`}>
                        {project.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex -space-x-2">
                        {avatars.map((avatar, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 ${avatar.color} rounded-full border-2 border-replit-card flex items-center justify-center`}
                          >
                            <span className="text-xs font-medium text-white">{avatar.initial}</span>
                          </div>
                        ))}
                        {project.memberCount > 3 && (
                          <div className="w-6 h-6 bg-slate-600 rounded-full border-2 border-replit-card flex items-center justify-center">
                            <span className="text-xs font-medium text-white">+{project.memberCount - 3}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-300">
                      {formatTimeAgo(project.lastUpdated)}
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-slate-400 hover:text-white transition-colors duration-200">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
