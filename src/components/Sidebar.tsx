import { NavLink } from 'react-router-dom';
import { Home, Compass, MessageSquare, Plus, Tag, Rss, Menu } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { HamsterIcon } from './HamsterIcon';

export function Sidebar() {
  const chats = useAppStore((state) => state.chats);

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
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/chat', label: 'Chat', icon: MessageSquare, badge: totalUnread > 0 ? totalUnread : undefined },
    { to: '/feed', label: 'Feed', icon: Rss },
    { to: '/pricing', label: 'Pricing', icon: Tag },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 hover:w-60 bg-black border-r border-[var(--border)] flex flex-col justify-between z-50 transition-all duration-300 ease-in-out group hidden lg:flex overflow-hidden">
      
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
          <NavLink 
            to="/landing" 
            className="flex items-center h-12 rounded-xl transition-all duration-200 hover:bg-white/5 px-2 overflow-hidden"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--y)] text-[var(--blk)] flex items-center justify-center font-heading font-black text-lg shadow-[0_0_15px_rgba(255,231,1,0.3)] shrink-0">
              <HamsterIcon className="w-5 h-5 fill-current" />
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-heading font-black text-base text-[var(--y)] ml-3 tracking-tighter uppercase whitespace-nowrap">
              DopeKin
            </span>
          </NavLink>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col gap-2 p-2 mt-2 w-full">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center justify-between h-11 rounded-xl text-sm font-medium transition-all duration-200 px-3.5 overflow-hidden shrink-0 ${
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

      {/* Bottom Actions Section */}
      <div className="p-2 w-full flex flex-col gap-3 shrink-0">
        {/* Creator Studio CTA */}
        <NavLink
          to="/create"
          className={({ isActive }) =>
            `flex items-center h-12 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 border-2 border-[var(--y)] overflow-hidden shrink-0 ${
              isActive
                ? 'bg-[var(--y)] text-[var(--blk)] shadow-[var(--brutal)] px-3.5 justify-start'
                : 'bg-transparent text-[var(--y)] hover:bg-[var(--y)] hover:text-[var(--blk)] hover:shadow-[var(--brutal)] px-3.5 justify-start'
            }`
          }
        >
          <Plus className="w-5 h-5 shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4 whitespace-nowrap font-mono text-xs uppercase tracking-wider font-bold">
            Create Twin
          </span>
        </NavLink>

        {/* Status indicator */}
        <div className="flex items-center h-10 px-3 font-mono text-[10px] text-[var(--muted2)] border-t border-white/5 pt-3 overflow-hidden shrink-0">
          <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4 whitespace-nowrap">
            CREATOR OS // ONLINE
          </span>
        </div>
      </div>
      
    </aside>
  );
}
