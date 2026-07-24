import { X } from 'lucide-react';
import type { Twin } from '../../../types/twin';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export interface ProfileSidebarProps {
  showProfile?: boolean;
  activeTwin?: Twin;
  onClose: () => void;
}

export function ProfileSidebar({
  showProfile = true,
  activeTwin,
  onClose,
}: ProfileSidebarProps) {
  if (!showProfile) return null;

  return (
    <div className="w-80 border-l border-zinc-900 bg-black shrink-0 flex flex-col overflow-y-auto p-4 z-20 absolute inset-y-0 right-0 md:relative md:flex animate-in slide-in-from-right duration-300">
      
      {/* Close button overlay for mobile/small screens */}
      <div className="flex md:hidden justify-between items-center mb-4 border-b border-zinc-900/50 pb-2">
        <span className="text-xs font-mono font-black uppercase text-zinc-500">Twin Profile</span>
        <button 
          onClick={onClose}
          className="p-1 text-zinc-400 hover:text-white rounded-lg bg-zinc-950 border border-white/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Image View */}
      <div className="relative w-36 h-36 aspect-square bg-zinc-950 overflow-hidden rounded-full border border-white/10 mx-auto shrink-0 shadow-lg">
        <img 
          src={activeTwin?.avatarUrl} 
          alt={activeTwin?.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>

      {/* Twin Details info */}
      <div className="mt-4 flex flex-col gap-1.5 text-left">
        <h3 className="font-heading font-black text-xl text-white tracking-tight uppercase flex items-center gap-2">
          <span>{activeTwin?.name}</span>
          {activeTwin?.isCustom && (
            <span className="text-[7px] bg-[var(--y)]/10 text-[var(--y)] px-1.5 py-0.5 rounded uppercase font-mono tracking-wider">Custom</span>
          )}
        </h3>
        <p className="text-xs text-zinc-400 font-body leading-relaxed">
          {activeTwin?.bio}
        </p>

        {/* Social media connections */}
        <div className="flex gap-2.5 mt-3">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 hover:border-[var(--y)] hover:text-[var(--y)] flex items-center justify-center text-zinc-400 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(255,231,1,0.15)]"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a 
            href="https://tiktok.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 hover:border-[var(--y)] hover:text-[var(--y)] flex items-center justify-center text-zinc-400 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(255,231,1,0.15)]"
          >
            <TiktokIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Dynamic Sleek About Me List */}
      <div className="border-t border-zinc-900 pt-5 mt-5 flex flex-col gap-4 text-left">
        <h4 className="text-xs font-mono font-black uppercase text-zinc-500 tracking-wider">
          About me:
        </h4>
        <div className="flex flex-col gap-3 font-body text-sm">
          <div className="flex justify-between items-center py-1.5 border-b border-zinc-900/50">
            <span className="text-zinc-500">Profession</span>
            <span className="font-extrabold text-[#f5f5f5]">{activeTwin?.profession}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-zinc-900/50">
            <span className="text-zinc-500">Vibe</span>
            <span className="font-extrabold text-[var(--y)]">{activeTwin?.vibe}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-zinc-900/50">
            <span className="text-zinc-500">Fans/Reach</span>
            <span className="font-extrabold text-[#f5f5f5]">{activeTwin?.fans}</span>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <span className="text-zinc-500">Access Tier</span>
            <span className="font-extrabold text-[#f5f5f5]">{activeTwin?.price}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
