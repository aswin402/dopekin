import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import type { Twin } from '../../../types/twin';
import { 
  MessageSquare, Trash2, MoreVertical, PlusCircle, Sparkles, UserCheck 
} from 'lucide-react';

interface MyAvatarsProps {
  onCreateClick: () => void;
}

export function MyAvatars({ onCreateClick }: MyAvatarsProps) {
  const navigate = useNavigate();
  const twins = useAppStore((state) => state.twins);
  const deleteTwin = useAppStore((state) => state.deleteTwin);
  
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const customTwins = twins.filter(t => t.isCustom);
  const stockTwins = twins.filter(t => !t.isCustom);

  const handleChat = (twinId: string) => {
    navigate(`/chat?twin=${twinId}`);
  };

  const handleDelete = (twinId: string) => {
    if (confirm("Are you sure you want to delete this custom twin? This action is irreversible.")) {
      deleteTwin(twinId);
      setActiveMenu(null);
    }
  };

  const AvatarCard = ({ twin }: { twin: Twin }) => (
    <div className="bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden group hover:border-[var(--y)] transition-all duration-300 relative flex flex-col h-[320px]">
      <div className="relative flex-1 overflow-hidden bg-zinc-900">
        <img 
          src={twin.avatarUrl} 
          alt={twin.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Custom badge */}
        {twin.isCustom && (
          <span className="absolute top-3 left-3 bg-[var(--y)] text-[var(--blk)] font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--blk)] shadow-[1px_1px_0px_rgba(0,0,0,1)] z-10">
            Trained Clone
          </span>
        )}

        {/* Action Menu Trigger */}
        <div className="absolute top-3 right-3 z-20">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === twin.id ? null : twin.id);
            }}
            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {activeMenu === twin.id && (
            <div className="absolute right-0 mt-1.5 w-32 bg-black border border-white/10 rounded-lg shadow-2xl p-1 z-30 animate-in fade-in slide-in-from-top-2 duration-100">
              <button 
                onClick={() => handleChat(twin.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#f5f5f5] hover:bg-[var(--y)] hover:text-black rounded transition-colors text-left cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
              {twin.isCustom && (
                <button 
                  onClick={() => handleDelete(twin.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors text-left cursor-pointer border-t border-white/5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-zinc-950 flex flex-col justify-between border-t border-white/5">
        <div>
          <h3 className="font-heading font-black text-base text-white tracking-tight flex items-center gap-1.5">
            {twin.name}
          </h3>
          <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
            {twin.profession} • {twin.fans || '0 FANS'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 pb-10" onClick={() => setActiveMenu(null)}>
      {/* Top Banner Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient(var(--y)/3% 50% 50% 50%) pointer-events-none" />
        <div className="z-10">
          <h2 className="text-xl font-heading font-black uppercase text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--y)]" />
            <span>Digital Twin Hub</span>
          </h2>
          <p className="text-xs text-[#f5f5f5]/50 mt-1">
            Deploy your visual avatars and manage custom cognitive clone profiles.
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--y)] hover:bg-[var(--y)]/90 text-black text-xs font-black uppercase tracking-wider rounded-xl border border-black shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[1px] transition-all cursor-pointer z-10"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create a Visual Avatar</span>
        </button>
      </div>

      {/* Custom Twins Section */}
      {customTwins.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-mono font-black uppercase text-[var(--y)] tracking-widest flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            <span>My Trained Digital Clones ({customTwins.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {customTwins.map((twin) => (
              <AvatarCard key={twin.id} twin={twin} />
            ))}
          </div>
        </div>
      )}

      {/* Stock AI Avatars Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-mono font-black uppercase text-zinc-400 tracking-widest">
          Stock AI Avatars ({stockTwins.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stockTwins.map((twin) => (
            <AvatarCard key={twin.id} twin={twin} />
          ))}
        </div>
      </div>
    </div>
  );
}
