import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Home, Compass, MessageSquare, Plus, Rss, Menu, Heart, 
  Crown, ChevronDown, HelpCircle, LogOut 
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { HamsterIcon } from './HamsterIcon';

export function Sidebar() {
  const chats = useAppStore((state) => state.chats);
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  // Calculate unread count (mocked based on chats where last message is from twin)
  const totalUnread = Object.keys(chats).reduce((acc, twinId) => {
    const messages = chats[twinId] || [];
    if (messages.length > 0 && messages[messages.length - 1].sender === 'ai') {
      return acc + 1;
    }
    return acc;
  }, 0);

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/chat', label: 'Chats', icon: MessageSquare, badge: totalUnread > 0 ? totalUnread : 12 },
    { to: '/explore?filter=favorites', label: 'Favorites', icon: Heart },
    { to: '/explore', label: 'Discover', icon: Compass },
    { to: '/feed', label: 'Episodes', icon: Rss },
    { to: '/create', label: 'Create', icon: Plus },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 hover:w-60 bg-black border-r border-[var(--border)] flex flex-col justify-between z-50 transition-all duration-300 ease-in-out group hidden lg:flex overflow-y-auto scrollbar-none">
      
      <div className="flex flex-col w-full">
        {/* Top Header Block: Hamburger Menu */}
        <div className="h-16 border-b border-[var(--border)] flex items-center justify-start px-5 shrink-0">
          <Menu className="w-6 h-6 text-[#f5f5f5]/70 group-hover:text-[var(--y)] transition-colors shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-mono font-bold tracking-widest text-white/30 uppercase ml-4 whitespace-nowrap">
            Navigation
          </span>
        </div>

        {/* Brand Block / Hamster Highlight */}
        <div className="p-2 border-b border-white/5 shrink-0">
          <div 
            className="flex items-center h-12 px-2 overflow-hidden select-none"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--y)] text-[var(--blk)] flex items-center justify-center font-heading font-black text-lg shadow-[0_0_15px_rgba(255,231,1,0.3)] shrink-0">
              <HamsterIcon className="w-5 h-5 fill-current" />
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-heading font-black text-base text-[var(--y)] ml-3 tracking-tighter uppercase whitespace-nowrap">
              DopeKin
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col gap-1 p-2 mt-2 w-full">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={idx}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center justify-between h-10 rounded-xl text-sm font-medium transition-all duration-200 px-3.5 overflow-hidden shrink-0 ${
                    isActive
                      ? 'bg-[var(--y)] text-[var(--blk)] font-bold shadow-[var(--brutal)] border border-[var(--blk)]'
                      : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center min-w-0">
                  <div className="relative flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 shrink-0" />
                    {/* Collapsed badge notifications */}
                    {link.badge !== undefined && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-black group-hover:opacity-0 transition-opacity duration-200">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4 whitespace-nowrap font-mono text-xs uppercase tracking-wider font-bold">
                    {link.label}
                  </span>
                </div>

                <div className="hidden group-hover:flex items-center gap-1.5 shrink-0 animate-in fade-in duration-300">
                  {link.badge !== undefined && (
                    <span className="bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                      {link.badge}
                    </span>
                  )}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-2 w-full flex flex-col gap-3 shrink-0 border-t border-white/5 mt-auto pt-3 pb-4">
        {/* 1. DopeKin Premium Card */}
        <div className="hidden group-hover:flex flex-col gap-2 p-3 bg-zinc-900/60 border border-[var(--y)]/20 rounded-2xl mx-1 text-left">
          <div className="flex items-center gap-1.5 text-[var(--y)] font-heading font-black text-[10px] tracking-wider uppercase">
            <Crown className="w-4 h-4 fill-current animate-pulse" />
            <span>DopeKin Premium</span>
          </div>
          <p className="text-[10px] text-zinc-400 font-body leading-tight">
            Unlimited chats, calls and more.
          </p>
          <Link 
            to="/pricing"
            className="w-full py-1.5 text-center bg-[var(--y)] text-black text-[10px] font-black uppercase rounded-lg hover:scale-102 active:scale-98 transition-all"
          >
            Upgrade Now
          </Link>
        </div>
        {/* Collapsed Premium Icon */}
        <Link 
          to="/pricing"
          className="flex group-hover:hidden items-center justify-center h-10 w-10 rounded-xl bg-zinc-900/60 border border-[var(--y)]/20 hover:border-[var(--y)] text-[var(--y)] mx-auto transition-all hover:scale-105 shrink-0"
          title="DopeKin Premium"
        >
          <Crown className="w-4 h-4 fill-current animate-pulse" />
        </Link>

        {/* 2. Weekly Usage Stats (Only shown when expanded) */}
        <div className="hidden group-hover:flex flex-col gap-2.5 p-3 rounded-2xl bg-zinc-900/20 border border-white/5 mx-1 text-left font-mono text-[9px] text-zinc-400">
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
            className="text-center text-[8px] font-bold text-zinc-500 hover:text-white uppercase tracking-wider mt-1 block"
          >
            View All Usage
          </Link>
        </div>

        {/* 3. User Profile Card */}
        <div className="p-1.5 rounded-xl hover:bg-white/5 transition-colors mx-1 cursor-pointer flex items-center justify-between group/profile">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-full border border-[var(--y)] shrink-0 bg-zinc-950 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                alt="Alex profile" 
                className="w-full h-full object-cover" 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-black" />
            </div>
            <div className="hidden group-hover:flex flex-col min-w-0 text-left">
              <span className="text-xs font-bold text-white truncate">Alex Morgan</span>
              <span className="text-[9px] text-[var(--y)] font-mono font-bold tracking-widest uppercase">Premium</span>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-500 hidden group-hover:block" />
        </div>

        <div className="hidden group-hover:flex items-center justify-between border-t border-white/5 pt-2.5 px-2 text-zinc-500">
          <div title="Help & Support">
            <HelpCircle className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          </div>
          <div className="flex items-center gap-0.5 text-[9px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ONLINE</span>
          </div>
          <div title="Log Out" onClick={() => { setUser(null); navigate('/'); }} className="cursor-pointer">
            <LogOut className="w-4 h-4 hover:text-red-400 transition-colors" />
          </div>
        </div>
      </div>
      
    </aside>
  );
}
