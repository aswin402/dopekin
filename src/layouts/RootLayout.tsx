import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import DopeIcon from '@/assets/DopeIcon.svg';
import { 
  Menu, X, Home, Compass, MessageSquare, Plus, Rss, 
  ChevronDown, Crown, HelpCircle, LogOut 
} from 'lucide-react';

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const chats = useAppStore((state) => state.chats);
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  // Calculate unread count
  const totalUnread = Object.keys(chats).reduce((acc, twinId) => {
    const messages = chats[twinId] || [];
    if (messages.length > 0 && messages[messages.length - 1].sender === 'ai') {
      return acc + 1;
    }
    return acc;
  }, 0);

  // Labels are fully uppercase to match reference Image 1
  const mobileLinks = [
    { to: '/', label: 'HOME', icon: Home },
    { to: '/discover', label: 'DISCOVER', icon: Compass },
    { to: '/chat', label: 'CHAT', icon: MessageSquare, badge: totalUnread > 0 ? totalUnread : undefined },
    { to: '/create', label: 'CREATE TWIN', icon: Plus },
    { to: '/feed', label: 'FEED', icon: Rss },
  ];

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] flex flex-col font-body">
      {/* Top Nav for mobile */}
      <Navbar onToggleMobileMenu={toggleMobileMenu} />

      <div className="flex flex-1 pt-16 lg:pt-0">
        {/* Left Sidebar for desktop */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Bottom Nav for mobile */}
      <MobileNav />

      {/* Mobile Drawer Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-300"
        />
      )}

      {/* Mobile Drawer Menu (Slide-out menu matching Image 1) */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 bottom-0 w-[290px] bg-black border-r border-zinc-900 z-50 lg:hidden flex flex-col overflow-y-auto animate-in slide-in-from-left duration-300">
          
          {/* 1. Top Header Block: Hamburger Menu & Navigation Title */}
          <div className="h-16 border-b border-zinc-900/60 flex items-center justify-between px-5 shrink-0 select-none">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-[#f5f5f5]/70 mr-4" />
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
                Navigation
              </span>
            </div>
            {/* Close button indicator */}
            <button 
              onClick={toggleMobileMenu}
              className="p-1 text-zinc-500 hover:text-white rounded-lg cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Brand Block / Hamster Highlight */}
          <div className="p-2 border-b border-zinc-900/60 shrink-0">
            <div className="flex items-center h-12 px-3 overflow-hidden select-none">
              <img src={DopeIcon} className="w-8 h-8 object-contain mr-3" alt="Dopekin Logo" />
              <span className="font-heading font-black text-base text-[var(--y)] tracking-tighter uppercase">
                DopeKin
              </span>
            </div>
          </div>

          {/* 3. Navigation Links List */}
          <div className="flex flex-col gap-1 p-2 mt-2 w-full">
            {mobileLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={idx}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between h-10 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 px-3.5 shrink-0 ${
                      isActive
                        ? 'bg-[var(--y)] text-[var(--blk)] shadow-[var(--brutal)] border border-[var(--blk)]'
                        : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:bg-white/5'
                    }`
                  }
                >
                  <div className="flex items-center min-w-0">
                    <Icon className="w-5 h-5 shrink-0 mr-4" />
                    <span>{link.label}</span>
                  </div>

                  {link.badge !== undefined && (
                    <span className="bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* 4. Bottom Section Widgets & Profile Card */}
          <div className="p-2 w-full flex flex-col gap-3 shrink-0 border-t border-zinc-900/60 mt-auto pt-3 pb-4">
            {/* DopeKin Premium Card */}
            <div className="flex flex-col gap-2 p-3 bg-zinc-900/60 border border-[var(--y)]/20 rounded-2xl mx-1 text-left">
              <div className="flex items-center gap-1.5 text-[var(--y)] font-heading font-black text-[10px] tracking-wider uppercase">
                <Crown className="w-4 h-4 fill-current animate-pulse" />
                <span>DopeKin Premium</span>
              </div>
              <p className="text-[10px] text-zinc-400 font-body leading-tight">
                Unlimited chats, calls and more.
              </p>
              <Link 
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-1.5 text-center bg-[var(--y)] text-black text-[10px] font-black uppercase rounded-lg hover:scale-102 active:scale-98 transition-all"
              >
                Upgrade Now
              </Link>
            </div>

            {/* Weekly Usage Stats */}
            <div className="flex flex-col gap-2.5 p-3 rounded-2xl bg-zinc-900/20 border border-white/5 mx-1 text-left font-mono text-[9px] text-zinc-400">
              <div className="flex justify-between items-center text-zinc-500 font-bold uppercase text-[8px]">
                <span>Weekly Usage</span>
                <span>May 12 - May 18</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Messages</span>
                  <span className="font-bold text-white">2,450 / 5,000</span>
                </div>
                <div className="w-full h-1 bg-zinc-950 border border-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: '49%' }} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Voice Calls</span>
                  <span className="font-bold text-white">420 / 1,000 mins</span>
                </div>
                <div className="w-full h-1 bg-zinc-950 border border-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '42%' }} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Video Calls</span>
                  <span className="font-bold text-white">120 / 300 mins</span>
                </div>
                <div className="w-full h-1 bg-zinc-950 border border-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--y)]" style={{ width: '40%' }} />
                </div>
              </div>

              <Link 
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-[8px] font-bold text-zinc-500 hover:text-white uppercase tracking-wider mt-1 block"
              >
                View All Usage
              </Link>
            </div>

            {/* User Profile Card */}
            <div className="p-1.5 rounded-xl hover:bg-white/5 transition-colors mx-1 cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-8 h-8 rounded-full border border-[var(--y)] shrink-0 bg-zinc-950 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                    alt="Alex profile" 
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-black" />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="text-xs font-bold text-white truncate">Alex Morgan</span>
                  <span className="text-[9px] text-[var(--y)] font-mono font-bold tracking-widest uppercase">Premium</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </div>

            {/* Footer Items */}
            <div className="flex items-center justify-between border-t border-white/5 pt-2.5 px-2 text-zinc-500">
              <div title="Help & Support" className="cursor-pointer" onClick={() => alert("Contact support at support@dopekin.com")}>
                <HelpCircle className="w-4 h-4 hover:text-white transition-colors" />
              </div>
              <div className="flex items-center gap-0.5 text-[9px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ONLINE</span>
              </div>
              <div title="Log Out" onClick={() => { setUser(null); setMobileMenuOpen(false); navigate('/'); }} className="cursor-pointer">
                <LogOut className="w-4 h-4 hover:text-red-400 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RootLayout;
