import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex bg-replit-dark">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-replit-sidebar transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-replit-blue rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">R</span>
                  </div>
                  <span className="text-xl font-bold text-white">ReplitDash</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <Sidebar mobile onNavigate={closeMobileMenu} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="bg-replit-sidebar border-b border-slate-700 px-6 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-replit-blue rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">R</span>
              </div>
              <span className="text-xl font-bold text-white">ReplitDash</span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-slate-300 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
