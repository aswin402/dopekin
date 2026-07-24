import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import { 
  MessageSquare, Video, Globe, Users, Sparkles, ArrowRight, Activity, Heart 
} from 'lucide-react';
import type { Twin } from '../../../types/twin';
import { getVibeStyles } from '../constants';

interface TwinCardProps {
  twin: Twin;
  isFirst: boolean;
}

export function TwinCard({ twin, isFirst }: TwinCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Video play interrupted:', err);
        });
      }
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  const isFree = twin.price.toLowerCase().includes('free');
  const displayPrice = isFree ? 'FREE' : twin.price.replace('/mo', ' /MO');
  const vibeStyle = getVibeStyles(twin.vibe);
  const VibeIcon = vibeStyle.icon;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full aspect-[3/4.3] bg-zinc-950 rounded-2xl relative group overflow-hidden border transition-all duration-500 hover:translate-y-[-6px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)] ${
        isFirst 
          ? 'border-[var(--y)] shadow-[0_0_25px_rgba(255,231,1,0.15)]' 
          : 'border-white/5 hover:border-white/15'
      }`}
    >
      {/* Video Loop (plays on hover) */}
      {twin.videoUrl && (
        <video
          ref={videoRef}
          src={twin.videoUrl}
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 ${
            isHovered ? "opacity-100 scale-102" : "opacity-0 scale-100"
          }`}
        />
      )}
      
      {/* Static Cover Image */}
      <img 
        src={twin.avatarUrl} 
        alt={twin.name} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 z-0 ${
          isHovered && twin.videoUrl ? "opacity-0 scale-105" : "opacity-100 group-hover:scale-105"
        }`}
      />
      
      {/* Gradient Overlay for bottom text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-90 z-10" />

      {/* Top Left Badges */}
      <div className="absolute top-3 left-3 flex gap-1.5 z-20 font-mono text-[8px] font-bold select-none">
        {isFirst && (
          <span className="px-2 py-0.5 rounded-full bg-[var(--y)] text-[var(--blk)] uppercase tracking-wider animate-pulse">
            LIVE
          </span>
        )}
        <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[#f5f5f5]/90 uppercase tracking-wider backdrop-blur-sm">
          {displayPrice}
        </span>
      </div>

      {/* Floating buttons on top-right */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
        <Link
          to={`/chat?twin=${twin.id}`}
          className="w-8 h-8 rounded-full bg-black/50 border border-white/10 hover:border-[var(--y)] hover:bg-[var(--y)] hover:text-[var(--blk)] text-[#f5f5f5] flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-90"
          title="Chat"
        >
          <MessageSquare className="w-4 h-4" />
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`w-8 h-8 rounded-full border text-[#f5f5f5] flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-90 ${
            isLiked 
              ? 'bg-[var(--y)] border-[var(--y)] text-[var(--blk)]' 
              : 'bg-black/50 border-white/10 hover:border-[var(--y)] hover:bg-[var(--y)] hover:text-[var(--blk)]'
          }`}
          title="Like"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        <Link
          to={`/chat?twin=${twin.id}&call=true`}
          className="w-8 h-8 rounded-full bg-black/50 border border-white/10 hover:border-[var(--y)] hover:bg-[var(--y)] hover:text-[var(--blk)] text-[#f5f5f5] flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-90"
          title="Video Call"
        >
          <Video className="w-4 h-4" />
        </Link>
      </div>

      {/* Bottom Left Info */}
      <div className="absolute bottom-4 left-4 right-14 flex flex-col gap-1.5 z-20 text-left">
        {/* Online Indicator */}
        <div className="flex items-center gap-1 text-[8px] font-mono font-bold text-[var(--success)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
          <span className="tracking-widest">ONLINE</span>
        </div>
        
        {/* Twin Name */}
        <h3 className="font-heading font-black text-lg sm:text-xl text-white uppercase flex items-center gap-1 tracking-wide leading-tight select-none">
          <span>{twin.name}</span>
          <span className="text-[var(--y)] text-sm">✓</span>
        </h3>
        
        {/* Personality Badge Pill */}
        <div className="flex">
          <span className={`flex items-center gap-1.5 text-[9px] font-mono font-bold px-2.5 py-1 rounded-md border backdrop-blur-sm uppercase tracking-wider ${vibeStyle.bg}`}>
            <VibeIcon className="w-3.5 h-3.5" />
            <span>{twin.vibe}</span>
          </span>
        </div>
      </div>

      {/* Bottom Right Wave circle button */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="w-8 h-8 rounded-full bg-zinc-900/80 border border-white/10 hover:border-[var(--y)] hover:bg-[var(--y)] hover:text-black flex items-center justify-center text-[var(--y)] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-90">
          <div className="flex gap-0.5 items-center">
            <span className="w-0.5 h-2 bg-current rounded-full" />
            <span className="w-0.5 h-3.5 bg-current rounded-full animate-pulse" />
            <span className="w-0.5 h-2.5 bg-current rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface TwinShowcaseProps {
  twins?: Twin[];
}

export function TwinShowcase({ twins: propTwins }: TwinShowcaseProps) {
  const navigate = useNavigate();
  const storeTwins = useAppStore((state) => state.twins);
  const twins = propTwins || storeTwins;

  return (
    <section className="flex flex-col gap-6 mt-0">
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
        <div className="flex flex-col gap-2 items-start text-left">
          <div className="flex items-center gap-2 text-[var(--y)] text-[9px] font-mono font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--y)] animate-pulse" />
            <span>Featured AI Twins</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase text-[#f5f5f5] tracking-tight leading-[0.95]">
            Meet Our Featured <br />
            <span className="text-[var(--y)] drop-shadow-[0_0_15px_rgba(255,231,1,0.25)]">AI Twins</span>
            <span className="inline-flex items-center justify-center bg-zinc-900 border border-white/10 p-1.5 rounded-lg ml-3 text-[var(--y)] align-middle">
              <Sparkles className="w-4 h-4 fill-current" />
            </span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[#f5f5f5]/60 mt-1 max-w-md leading-relaxed font-body">
            Handpicked AI Twins with unique personalities, voices, and stories. Find your perfect match.
          </p>
        </div>

        <button 
          onClick={() => navigate('/discover')}
          className="flex items-center gap-3 bg-zinc-950 border border-white/10 hover:border-white/20 text-[#f5f5f5] hover:text-[var(--y)] font-bold text-xs uppercase tracking-widest py-3 px-5 rounded-full transition-all cursor-pointer group shrink-0 self-start md:self-end"
        >
          <span>View All Twins</span>
          <div className="w-6 h-6 rounded-full bg-[var(--y)] text-[var(--blk)] flex items-center justify-center transition-all group-hover:scale-105 shrink-0">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Featured Twins Grid */}
      <div className="mt-2 pt-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-6">
          {twins.map((twin, idx) => (
            <TwinCard key={twin.id} twin={twin} isFirst={idx === 0} />
          ))}
        </div>
      </div>

      {/* Stats card banner */}
      <div className="w-full mt-10 p-6 md:py-8 md:px-12 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, val: '10K+', label: 'AI Twins Created' },
            { icon: MessageSquare, val: '2.5M+', label: 'Conversations' },
            { icon: Globe, val: '150+', label: 'Countries' },
            { icon: Activity, val: '99.9%', label: 'Uptime' }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center gap-4 justify-start pl-4 md:pl-0">
                <Icon className="w-8 h-8 text-[var(--y)] shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl font-heading font-black tracking-tight text-[#f5f5f5] leading-none">
                    {stat.val}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/40 mt-1.5 leading-none font-body">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
