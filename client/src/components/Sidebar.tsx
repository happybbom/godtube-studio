import { Link, useLocation } from "wouter";
import { Search, Home, Folder, Users, BarChart3, Database, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const navigationItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/projects", icon: Folder, label: "Projects" },
    { href: "/team", icon: Users, label: "Team" },
    { href: "/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/storage", icon: Database, label: "Storage" },
  ];

  const handleNavigation = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside className={`w-64 bg-replit-sidebar border-r border-slate-700 ${mobile ? '' : 'h-screen'}`}>
      <div className="p-6 h-full flex flex-col">
        {!mobile && (
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-replit-blue rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">R</span>
            </div>
            <span className="text-xl font-bold text-white">ReplitDash</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-700 border-slate-600 pl-10 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-replit-blue focus:border-transparent"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2 flex-1">
          {navigationItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={handleNavigation}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 ${
                    isActive ? "bg-slate-700 text-white" : ""
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        {!mobile && (
          <div className="border-t border-slate-600 pt-4">
            <Link href="/settings">
              <a
                onClick={handleNavigation}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 ${
                  location === "/settings" ? "bg-slate-700 text-white" : ""
                }`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </a>
            </Link>
            <div className="flex items-center space-x-3 px-3 py-2 mt-2">
              <div className="w-8 h-8 bg-replit-purple rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">JD</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">John Doe</div>
                <div className="text-xs text-slate-400">john@example.com</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
