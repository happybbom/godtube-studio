import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { User } from "@shared/schema";
import { Plus, Search, Mail, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Team() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const filteredUsers = users?.filter(user =>
    (user.firstname?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (user.lastname?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (user.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (user.username?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-replit-blue/20 text-replit-blue";
      case "manager":
        return "bg-replit-purple/20 text-replit-purple";
      case "developer":
        return "bg-replit-green/20 text-replit-green";
      case "member":
        return "bg-slate-500/20 text-slate-400";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  const getInitials = (firstname: string, lastname: string) => {
    const firstInitial = firstname?.charAt(0) || '';
    const lastInitial = lastname?.charAt(0) || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
    //return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  };

  const getAvatarColor = (index: number) => {
    const colors = ["bg-replit-blue", "bg-replit-purple", "bg-replit-green", "bg-replit-orange"];
    return colors[index % colors.length];
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Team</h1>
            <p className="text-slate-400">Manage your team members and their permissions.</p>
          </div>
          <Button className="bg-replit-blue hover:bg-blue-600 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-700 border-slate-600 pl-10 text-sm text-slate-100 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Team Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-replit-card border-slate-600 animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-600 rounded-full"></div>
                  <div>
                    <div className="w-24 h-5 bg-slate-600 rounded mb-1"></div>
                    <div className="w-32 h-4 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="w-16 h-5 bg-slate-600 rounded"></div>
                  <div className="w-6 h-6 bg-slate-600 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers?.map((user, index) => (
            <Card key={user.id} className="bg-replit-card border-slate-600 hover:border-slate-500 transition-colors duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${getAvatarColor(index)} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-medium">
                        {getInitials(user.firstname, user.lastname)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        {user.firstname} {user.lastname}
                      </CardTitle>
                      <p className="text-slate-400 text-sm">@{user.username}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Mail size={14} className="text-slate-400" />
                  <span className="text-slate-300 text-sm">{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={`${getRoleColor(user.role)} border-0 capitalize`}>
                    {user.role}
                  </Badge>
                  <span className="text-slate-400 text-xs">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredUsers?.length === 0 && !isLoading && (
        <Card className="bg-replit-card border-slate-600">
          <CardContent className="py-12 text-center">
            <div className="text-slate-400 mb-4">
              <Search size={48} className="mx-auto mb-4" />
              <p className="text-lg">No team members found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
