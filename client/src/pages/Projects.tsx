import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Project } from "@shared/schema";
import { Plus, Search, Code, Smartphone, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects?.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-slate-400">Manage and monitor your development projects.</p>
          </div>
          <Button className="bg-replit-blue hover:bg-blue-600 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-700 border-slate-600 pl-10 text-sm text-slate-100 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-replit-card border-slate-600 animate-pulse">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-600 rounded-lg"></div>
                    <div>
                      <div className="w-24 h-5 bg-slate-600 rounded mb-1"></div>
                      <div className="w-16 h-3 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-4 bg-slate-700 rounded mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="w-16 h-5 bg-slate-600 rounded"></div>
                  <div className="w-20 h-4 bg-slate-700 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map((project) => {
            const ProjectIcon = getProjectIcon(project.technologies);
            
            return (
              <Card key={project.id} className="bg-replit-card border-slate-600 hover:border-slate-500 transition-colors duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-replit-blue rounded-lg flex items-center justify-center">
                        <ProjectIcon className="text-white" size={20} />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                        <p className="text-slate-400 text-sm">
                          {project.memberCount} member{project.memberCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                    {project.description || "No description provided"}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${getStatusColor(project.status)} border-0`}>
                      {project.status.replace("_", " ")}
                    </Badge>
                    <span className="text-slate-400 text-xs">
                      Updated {formatTimeAgo(project.lastUpdated)}
                    </span>
                  </div>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {filteredProjects?.length === 0 && !isLoading && (
        <Card className="bg-replit-card border-slate-600">
          <CardContent className="py-12 text-center">
            <div className="text-slate-400 mb-4">
              <Search size={48} className="mx-auto mb-4" />
              <p className="text-lg">No projects found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
