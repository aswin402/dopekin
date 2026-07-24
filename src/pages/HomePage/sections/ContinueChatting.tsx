import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Twin } from '../../../types/twin';
import { useAppStore } from '../../../store/useAppStore';

export interface RecentChatCard {
  id: string;
  name: string;
  status: 'Online' | 'Away' | 'Offline' | string;
  msg: string;
}

export interface ContinueChattingProps {
  chats?: RecentChatCard[];
  twins?: Twin[];
}

const DEFAULT_CHATS: RecentChatCard[] = [
  { id: 'serena', name: 'Serena', status: 'Online', msg: 'Good morning! Ready for today? ☀️' },
  { id: 'cody', name: 'Cody', status: 'Online', msg: 'That was an awesome conversation!' },
  { id: 'rina', name: 'Rina', status: 'Away', msg: "Can't wait to talk again later 💕" },
  { id: 'aiko', name: 'Aiko', status: 'Offline', msg: 'Here is the summary of what we talked about.' },
];

export function ContinueChatting({ chats = DEFAULT_CHATS, twins: twinsProp }: ContinueChattingProps) {
  const storeTwins = useAppStore((state) => state.twins);
  const twins = twinsProp || storeTwins;

  const getTwin = (id: string) => twins.find((t) => t.id === id) || twins[0];

  return (
    <div className="flex flex-col gap-4 min-w-0">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
          Continue Chatting
        </h3>
        <Link
          to="/chat"
          className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-0.5"
        >
          <span>View all</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Cards List */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {chats.map((card) => {
          const twin = getTwin(card.id);
          return (
            <div
              key={card.id}
              className="w-44 bg-zinc-950 border border-white/5 rounded-2xl flex flex-col shrink-0 relative overflow-hidden group hover:border-white/15 transition-all duration-300 hover:translate-y-[-4px]"
            >
              {/* Card Image */}
              <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl bg-zinc-900">
                <img
                  src={twin?.avatarUrl}
                  alt={card.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/5 text-[9px] text-zinc-300 font-bold uppercase tracking-wider">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      card.status === 'Online'
                        ? 'bg-emerald-500'
                        : card.status === 'Away'
                        ? 'bg-amber-500 animate-pulse'
                        : 'bg-zinc-500'
                    }`}
                  />
                  <span>{card.status}</span>
                </div>
              </div>

              {/* Details & Button */}
              <div className="p-3 flex flex-col gap-1 z-10 bg-zinc-950">
                <h4 className="font-heading font-black text-sm text-white text-left">
                  {card.name}
                </h4>
                <p className="text-[10px] text-zinc-400 font-body leading-relaxed line-clamp-1 h-4 text-left">
                  "{card.msg}"
                </p>
                <Link
                  to={`/chat?twin=${card.id}`}
                  className="mt-2.5 w-full py-1.5 text-center bg-zinc-900 border border-white/5 hover:bg-[var(--y)] hover:text-black hover:border-black text-[10px] font-black uppercase rounded-lg transition-all"
                >
                  Resume Chat
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContinueChatting;
