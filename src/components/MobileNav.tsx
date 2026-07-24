import { NavLink } from 'react-router-dom';
import { Home, Compass, MessageSquare, Plus, Tag } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function MobileNav() {
  const chats = useAppStore((state) => state.chats);
  const totalUnread = Object.keys(chats).reduce((acc, twinId) => {
    const messages = chats[twinId] || [];
    if (messages.length > 0 && messages[messages.length - 1].sender === 'ai') {
      return acc + 1;
    }
    return acc;
  }, 0);

  const items = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/discover', label: 'Discover', icon: Compass },
    { to: '/create', label: 'Create', icon: Plus, isCenter: true },
    { to: '/chat', label: 'Chat', icon: MessageSquare, badge: totalUnread > 0 ? totalUnread : undefined },
    { to: '/pricing', label: 'Pricing', icon: Tag },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-[var(--border)] flex items-center justify-around z-40 lg:hidden px-2">
      {items.map((item) => {
        const Icon = item.icon;
        if (item.isCenter) {
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-center w-12 h-12 rounded-full border-2 border-[var(--blk)] -mt-6 transition-all shadow-[var(--brutal)] ${
                  isActive
                    ? 'bg-[var(--y)] text-[var(--blk)]'
                    : 'bg-zinc-900 text-[var(--y)]'
                }`
              }
            >
              <Icon className="w-6 h-6" />
            </NavLink>
          );
        }

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full py-2 relative transition-all ${
                isActive ? 'text-[var(--y)]' : 'text-[#f5f5f5]/60'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium tracking-wide uppercase font-body">
              {item.label}
            </span>
            {item.badge !== undefined && (
              <span className="absolute top-1.5 right-6 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
