import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { HamsterIcon } from '@/components/HamsterIcon';
import { useState } from 'react';
import { X, Home, Compass, MessageSquare, Radio, Tag, Plus, Rss } from 'lucide-react';

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const mobileLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/chat', label: 'Chat', icon: MessageSquare },
    { to: '/feed', label: 'Feed', icon: Rss },
    { to: '/live', label: 'Live Stream', icon: Radio },
    { to: '/pricing', label: 'Pricing', icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[#f5f5f5] font-body relative overflow-x-hidden">
      {/* Top sticky Navbar */}
      <Navbar onToggleMobileMenu={toggleMobileMenu} />

      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="lg:pl-16 pt-16 lg:pt-0 pb-16 lg:pb-0 min-h-screen flex flex-col">
        <main className="flex-1 w-full max-w-[var(--content-max-width)] mx-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Bottom Nav for mobile */}
      <MobileNav />

      {/* Mobile Drawer Menu (Slide-out menu when clicking hamburger in TopNav) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col h-full w-[260px] bg-black border-r border-[var(--border)] p-5">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-heading font-black text-[var(--y)] flex items-center gap-1.5">
                <HamsterIcon className="w-5 h-5 fill-current" />
                <span>DopeKin</span>
              </span>
              <button 
                onClick={toggleMobileMenu} 
                className="p-1 text-[#f5f5f5]/70 hover:text-white hover:bg-white/5 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {mobileLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[var(--y)] text-[var(--blk)] font-bold shadow-[var(--brutal)] border border-[var(--blk)]'
                          : 'text-[#f5f5f5]/75 hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <NavLink
                to="/create"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-transparent text-[var(--y)] border-2 border-[var(--y)] text-sm font-bold uppercase tracking-wide"
              >
                <Plus className="w-5 h-5" />
                <span>Create Twin</span>
              </NavLink>
              <div className="text-[10px] text-[#f5f5f5]/30 font-mono text-center">
                CREATOR OS // MOBILE MODE
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default RootLayout;
