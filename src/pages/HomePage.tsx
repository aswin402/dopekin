import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { 
  Users, Clock, MessageSquare, Flame, 
  ChevronRight, Play, Heart, Phone, Sparkles, Shield,
  Music, Dumbbell, Laugh, Video, Zap
} from 'lucide-react';

// Helper to parse fan count strings (e.g. "15.9M FANS" -> 15900000)
const getFansCount = (fansStr: string | null | undefined): number => {
  if (!fansStr || typeof fansStr !== 'string') return 0;
  const clean = fansStr.toUpperCase().replace('FANS', '').trim();
  if (clean.includes('M')) {
    return parseFloat(clean.replace('M', '')) * 1_000_000;
  }
  if (clean.includes('K')) {
    return parseFloat(clean.replace('K', '')) * 1_000;
  }
  return parseFloat(clean) || 0;
};

const getCategoryIcon = (category: string, vibe?: string) => {
  if (vibe) {
    const vibeLower = vibe.toLowerCase();
    if (vibeLower.includes('energetic')) {
      return <Zap className="w-3.5 h-3.5 text-[var(--y)] shrink-0" />;
    }
  }
  switch (category) {
    case 'musicians':
      return <Music className="w-3.5 h-3.5 text-[var(--y)] shrink-0" />;
    case 'models':
      return <Sparkles className="w-3.5 h-3.5 text-[var(--y)] shrink-0" />;
    case 'athletes':
      return <Dumbbell className="w-3.5 h-3.5 text-[var(--y)] shrink-0" />;
    case 'comedians':
      return <Laugh className="w-3.5 h-3.5 text-[var(--y)] shrink-0" />;
    case 'creators':
    default:
      return <Video className="w-3.5 h-3.5 text-[var(--y)] shrink-0" />;
  }
};

const BADGES = ['🔥 Hot', '📈 Trending', '⭐ Rising'];
const BADGE_COLORS = [
  'bg-rose-500/10 text-rose-400 border border-rose-500/25',
  'bg-amber-500/10 text-amber-400 border border-amber-500/25',
  'bg-indigo-500/10 text-indigo-400 border border-indigo-500/25'
];

export function HomePage() {
  const navigate = useNavigate();
  const twins = useAppStore((state) => state.twins);

  const banners = useMemo(() => [
    {
      id: 'special-offers',
      tag: 'SPECIAL OFFER',
      tagClass: 'bg-amber-500 text-black font-extrabold',
      title: 'UNLOCK',
      highlightText: 'VIP PASS',
      description: 'Get unlimited messaging, priority access to new companion releases, and custom photo generation.',
      btnText: 'Claim 50% Off',
      btnIcon: <Sparkles className="w-3.5 h-3.5 fill-current" />,
      bgGradient: 'bg-gradient-to-r from-amber-950/70 via-yellow-950/40 to-zinc-950',
      radialGradient: 'radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.15), transparent 45%)',
      twinIds: ['vale', 'cody', 'serena'],
      action: () => navigate('/pricing')
    },
    {
      id: 'new-release',
      tag: 'NEW RELEASE',
      tagClass: 'bg-rose-500 text-white animate-pulse-glow',
      title: 'CYBERPUNK',
      highlightText: 'SUMMER',
      description: 'Step into the neon metropolis and watch your favorite twins interact in autonomous mini-episodes.',
      btnText: 'Watch Now',
      btnIcon: <Play className="w-3.5 h-3.5 fill-current" />,
      bgGradient: 'bg-gradient-to-r from-purple-900/60 via-pink-900/50 to-zinc-950',
      radialGradient: 'radial-gradient(circle at 70% 30%, rgba(255, 235, 31, 0.15), transparent 45%)',
      twinIds: ['serena', 'sarang', 'aiko'],
      action: () => navigate('/feed')
    },
    {
      id: 'trending',
      tag: 'TRENDING NOW',
      tagClass: 'bg-indigo-500 text-white font-extrabold',
      title: 'MEET THE RISING',
      highlightText: 'STARS',
      description: 'Interact with the most active and highly rated digital twins of the week. Find your perfect connection.',
      btnText: 'Chat Now',
      btnIcon: <MessageSquare className="w-3.5 h-3.5 fill-current" />,
      bgGradient: 'bg-gradient-to-r from-indigo-900/60 via-blue-950/50 to-zinc-950',
      radialGradient: 'radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.15), transparent 45%)',
      twinIds: ['sarang', 'aiko', 'serena'],
      action: () => navigate('/explore')
    },
    {
      id: 'trending-feed',
      tag: 'TRENDING FEED',
      tagClass: 'bg-emerald-500 text-black font-extrabold',
      title: 'HOT ON THE',
      highlightText: 'FEED',
      description: 'Stay updated with selfies, diaries, and stories shared directly by the twins on the community feed.',
      btnText: 'Explore Feed',
      btnIcon: <ChevronRight className="w-3.5 h-3.5" />,
      bgGradient: 'bg-gradient-to-r from-teal-900/60 via-emerald-950/50 to-zinc-950',
      radialGradient: 'radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.15), transparent 45%)',
      twinIds: ['aiko', 'vale', 'sarang'],
      action: () => navigate('/feed')
    }
  ], [navigate]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // Swipe gesture tracking (touch and mouse drag)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setSlideDirection('next');
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    } else if (isRightSwipe) {
      setSlideDirection('prev');
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Avoid triggering swipe/drag if clicking interactive elements like buttons
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;
    
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStart !== null) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      
      if (isLeftSwipe) {
        setSlideDirection('next');
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      } else if (isRightSwipe) {
         setSlideDirection('prev');
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentSlide, isHovered, banners.length]);

  const trendingCompanions = useMemo(() => {
    return [...twins]
      .sort((a, b) => getFansCount(b.fans) - getFansCount(a.fans))
      .slice(0, 3);
  }, [twins]);



  // Local state to mock adding/removing favorites
  const [favorites, setFavorites] = useState<string[]>(['vale', 'rina', 'aiko']);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Find twin helper
  const getTwin = (id: string) => twins.find(t => t.id === id) || twins[0];

  // Feature toggle to hide top dashboard metrics & quick access rows for now (can be enabled later)
  const SHOW_TOP_DASHBOARD_SECTIONS = false;

  return (
    <div className="flex flex-col gap-8 animate-fade-up px-4 md:px-6 py-6 pb-24 text-left w-full mx-auto">
      {SHOW_TOP_DASHBOARD_SECTIONS && (
        <>
          {/* METRICS / STAT CARDS ROW */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-2xl font-heading font-black text-white leading-none">5</span>
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Active Companions</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-2xl font-heading font-black text-white leading-none">2h 35m</span>
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Time Spent Today</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-2xl font-heading font-black text-white leading-none">12</span>
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Conversations Today</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl flex flex-col justify-between gap-2.5">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 text-[var(--y)] font-mono font-bold text-[10px] tracking-wider uppercase">
                  <Flame className="w-4 h-4 text-[var(--y)] fill-current animate-pulse" />
                  <span>14 Day Streak</span>
                </div>
                <span className="text-[9px] text-zinc-500 font-bold font-mono">Keep it going!</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-950 border border-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500" style={{ width: '70%' }} />
              </div>
            </div>
          </div>

          {/* YOUR FAVORITES (BIG HORIZONTAL ROW) */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
                Your Favorites
              </h3>
              <span 
                className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer font-mono" 
                onClick={() => navigate('/explore?filter=favorites')}
              >
                View all
              </span>
            </div>
            
            <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
              {favorites.map((favId) => {
                const twin = getTwin(favId);
                return (
                  <Link 
                    key={favId}
                    to={`/chat?twin=${favId}`}
                    className="flex flex-col items-center gap-2.5 group cursor-pointer shrink-0"
                  >
                    <div className="relative w-28 h-28 rounded-full p-[4px] bg-zinc-900 border border-white/5 group-hover:bg-[var(--y)] group-hover:border-[var(--y)] transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(255,231,1,0.35)]">
                      <img 
                        src={twin.avatarUrl} 
                        alt={twin.name} 
                        className="w-full h-full rounded-full object-cover border-2 border-black" 
                      />
                      <span className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full border-2 border-black shadow-md" />
                    </div>
                    <span className="text-xs md:text-sm text-zinc-300 font-extrabold group-hover:text-white tracking-wide transition-colors mt-1.5 truncate max-w-[7rem]">
                      {twin.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CONTINUE CHATTING SLIDER */}
          <div className="flex flex-col gap-4 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
                Continue Chatting
              </h3>
              <Link to="/chat" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-0.5">
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cards List */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
              {[
                { id: 'serena', name: 'Serena', status: 'Online', msg: 'Good morning! Ready for today? ☀️' },
                { id: 'cody', name: 'Cody', status: 'Online', msg: 'That was an awesome conversation!' },
                { id: 'rina', name: 'Rina', status: 'Away', msg: 'Can\'t wait to talk again later 💕' },
                { id: 'aiko', name: 'Aiko', status: 'Offline', msg: 'Here is the summary of what we talked about.' }
              ].map((card) => {
                const twin = getTwin(card.id);
                return (
                  <div 
                    key={card.id}
                    className="w-44 bg-zinc-950 border border-white/5 rounded-2xl flex flex-col shrink-0 relative overflow-hidden group hover:border-white/15 transition-all duration-300 hover:translate-y-[-4px]"
                  >
                    {/* Card Image */}
                    <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl bg-zinc-900">
                      <img 
                        src={twin.avatarUrl} 
                        alt={card.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/5 text-[9px] text-zinc-300 font-bold uppercase tracking-wider">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          card.status === 'Online' ? 'bg-emerald-500' : card.status === 'Away' ? 'bg-amber-500 animate-pulse' : 'bg-zinc-500'
                        }`} />
                        <span>{card.status}</span>
                      </div>
                    </div>

                    {/* Details & Button */}
                    <div className="p-3 flex flex-col gap-1 z-10 bg-zinc-950">
                      <h4 className="font-heading font-black text-sm text-white text-left">{card.name}</h4>
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
        </>
      )}

      {/* ANIMATED ROTATING PROMO BANNER */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="group relative w-full rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[3/1] lg:aspect-[4/1] border border-white/10 shadow-2xl transition-all duration-700 ease-in-out select-none cursor-grab active:cursor-grabbing"
      >
        {/* Layered background gradients for smooth cross-fading */}
        {banners.map((banner, index) => (
          <div
            key={`bg-${banner.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${banner.bgGradient} ${
              currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        ))}
        
        {/* Layered radial glow overlays for smooth cross-fading */}
        {banners.map((banner, index) => (
          <div
            key={`glow-${banner.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ 
              backgroundImage: banner.radialGradient 
            }} 
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10" />

        {/* Content Wrapper for Left Text */}
        <div 
          key={`text-${currentSlide}`}
          className={`absolute inset-y-0 left-6 sm:left-12 flex flex-col justify-center gap-2 max-w-[85%] sm:max-w-md z-20 pointer-events-none ${
            slideDirection === 'next' ? 'animate-scroll-next-text' : 'animate-scroll-prev-text'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${banners[currentSlide].tagClass}`}>
              {banners[currentSlide].tag}
            </span>
            <span className="text-[10px] text-zinc-400 font-bold tracking-wider font-mono">
              DOPEKIN SPECIALS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black uppercase text-white leading-none tracking-tight">
            {banners[currentSlide].title} <span className="text-[var(--y)]">{banners[currentSlide].highlightText}</span>
          </h2>
          <p className="text-xs text-zinc-400 leading-snug line-clamp-2 max-w-xs sm:max-w-sm">
            {banners[currentSlide].description}
          </p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              banners[currentSlide].action();
            }}
            className="mt-2 w-fit h-9 px-5 rounded-full bg-[var(--y)] text-[var(--blk)] font-bold text-xs uppercase tracking-wider shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[0.5px] transition-transform border border-black flex items-center gap-1.5 cursor-pointer pointer-events-auto"
          >
            {banners[currentSlide].btnIcon}
            <span>{banners[currentSlide].btnText}</span>
          </button>
        </div>

        {/* Three portrait overlays from screenshot */}
        <div 
          key={`images-${currentSlide}`}
          className={`absolute right-0 top-0 bottom-0 w-1/2 hidden sm:flex items-center justify-end pr-10 pointer-events-none overflow-hidden opacity-85 z-10 ${
            slideDirection === 'next' ? 'animate-scroll-next-images' : 'animate-scroll-prev-images'
          }`}
        >
          <div className="flex gap-4 transform rotate-12 translate-x-12 translate-y-6">
            {banners[currentSlide].twinIds.map((id, i) => {
              const twin = getTwin(id);
              return (
                <div 
                  key={id}
                  className="w-24 h-36 lg:w-28 lg:h-40 rounded-xl overflow-hidden border border-white/20 shadow-2xl relative shrink-0 transition-transform duration-500 hover:scale-105"
                  style={{ transform: `translateY(${i * -12}px)` }}
                >
                  <img 
                    src={twin.avatarUrl} 
                    alt="" 
                    draggable="false"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide Indicator dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                if (index !== currentSlide) {
                  setSlideDirection(index > currentSlide ? 'next' : 'prev');
                  setCurrentSlide(index);
                }
              }}
              className={`relative h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index ? 'w-6 bg-[var(--y)]' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* NEW COMPANIONS (BIG HORIZONTAL ROW) */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
            New Companions
          </h3>
          <span 
            className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer font-mono" 
            onClick={() => navigate('/explore')}
          >
            View all
          </span>
        </div>
        
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {['etherik', 'sarang', 'aiko', 'cody', 'vale'].map((newId, idx) => {
            const twin = getTwin(newId);
            return (
              <Link 
                key={idx}
                to={`/chat?twin=${newId}`}
                className="flex flex-col items-center gap-2.5 group cursor-pointer shrink-0"
              >
                <div className="relative w-28 h-28 rounded-full p-[4px] bg-zinc-900 border border-white/5 group-hover:bg-purple-500 group-hover:border-purple-500 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <img 
                    src={twin.avatarUrl} 
                    alt={twin.name} 
                    className="w-full h-full rounded-full object-cover border-2 border-black" 
                  />
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-black shadow-md">
                    NEW
                  </span>
                </div>
                <span className="text-xs md:text-sm text-zinc-300 font-extrabold group-hover:text-white tracking-wide transition-colors mt-1.5 truncate max-w-[7rem]">
                  {twin.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* RECOMMENDED FOR YOU GRID */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
            Recommended for you
          </h3>
          <Link to="/explore" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-0.5">
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-4 overflow-x-auto pb-2 scrollbar-none scroll-smooth justify-center sm:justify-start">
          {[
            { id: 'vale', vibe: '🎭 Confident • Empathetic', desc: 'You both like fashion' },
            { id: 'sarang', vibe: '💃 Playful • Creative', desc: 'You both like K-pop' },
            { id: 'carlos', vibe: '🔥 Ambitious • Smart', desc: 'You both like tech' },
            { id: 'ben', vibe: '🕹️ Energetic • Friendly', desc: 'You both play games' }
          ].map((item) => {
            const twin = getTwin(item.id);
            const isFav = favorites.includes(item.id);
            return (
              <div 
                key={item.id}
                className="w-full sm:w-60 max-w-sm sm:max-w-none bg-zinc-950 border border-white/5 rounded-2xl flex flex-col shrink-0 relative group overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:border-white/15"
              >
                {/* 3:4 Aspect Ratio Image/Video wrapper */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl bg-zinc-900">
                  {twin.videoUrl ? (
                    <video 
                      src={twin.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  ) : (
                    <img 
                      src={twin.avatarUrl} 
                      alt={twin.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  )}
                  {/* Status Tag */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/5 text-[9px] text-zinc-300 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Online</span>
                  </div>

                  {/* Favorite Heart Button */}
                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3 right-3 z-30 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/5 hover:border-white/20 transition-all text-zinc-400 hover:text-white cursor-pointer active:scale-90"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-zinc-400'}`} />
                  </button>

                  {/* Hover play buttons (Stacked vertically to fit w-60 card) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all z-20 bg-black/50 backdrop-blur-[2px] p-2">
                    <Link 
                      to={`/chat?twin=${twin.id}&call=true`}
                      className="flex items-center justify-center gap-1.5 bg-black border border-[var(--y)] text-[var(--y)] font-extrabold text-[10px] uppercase w-44 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[2px_2px_0px_rgba(255,235,31,0.2)]"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </Link>
                  </div>
                </div>

                {/* Info box */}
                <div className="p-3.5 flex flex-col gap-1 z-10 bg-zinc-950 text-left">
                  <h4 className="font-heading font-black text-sm text-white">
                    {twin.name}
                  </h4>
                  <span className="text-[9px] font-bold text-[var(--y)] tracking-wide uppercase">
                    {item.vibe}
                  </span>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FEATURED TWINS SECTION */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
            Featured Twins
          </h3>
          <Link to="/explore" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-0.5">
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {twins.map((twin) => (
            <Link 
              key={twin.id}
              to={`/chat?twin=${twin.id}`}
              onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.play().catch(err => console.log('Playback prevented', err));
                }
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}
              className="w-full sm:w-72 max-w-sm sm:max-w-none aspect-[3/4] bg-black border border-[var(--border)] rounded-2xl flex flex-col relative group overflow-hidden transition-all duration-300 hover:translate-y-[-6px] hover:scale-[1.02] hover:border-[var(--border2)] shrink-0 text-left cursor-pointer"
            >
              {/* Card Media (Image/Video) */}
              <div className="absolute inset-0 w-full h-full bg-zinc-900">
                {twin.videoUrl ? (
                  <video 
                    src={twin.videoUrl}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <img 
                    src={twin.avatarUrl} 
                    alt={twin.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>

              {/* Bottom Dark Gradient Mask */}
              <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black via-black/75 to-transparent opacity-95 transition-opacity" />

              {/* Vibe Badge in Top Right Corner */}
              <div className="absolute top-3 right-3 z-20">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[var(--y)] border border-[var(--y)]/30 text-[9px] font-black uppercase tracking-wider">
                  {getCategoryIcon(twin.category, twin.vibe)}
                  <span>{twin.vibe}</span>
                </span>
              </div>

              {/* Overlaid Text Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col gap-1 text-left">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-heading font-black text-lg text-white flex items-center gap-1.5">
                    <span>{twin.name}</span>
                    {twin.isCustom && (
                      <span className="text-[7px] bg-white/10 px-1.5 py-0.5 rounded text-[#f5f5f5]/60 font-mono font-normal">Trained</span>
                    )}
                  </h4>
                </div>
                <span className="text-[11px] text-zinc-400 font-semibold font-mono uppercase tracking-wider">
                  {twin.profession} • {twin.fans}
                </span>
                <p className="text-xs text-zinc-300 font-body leading-relaxed line-clamp-2 mt-1">
                  {twin.bio}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* DOUBLE SECTION ROW: RECENT CHATS & LATEST FEEDS */}
      <div className="grid lg:grid-cols-2 gap-8 pt-4">
        {/* Trending Companions */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
              Trending Companions
            </h3>
            <Link to="/explore" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer font-mono">View all</Link>
          </div>

          <div className="flex-1 flex flex-col justify-between gap-4 bg-zinc-950 border border-white/5 rounded-3xl p-6 font-body">
            {trendingCompanions.map((twin, idx) => {
              return (
                <div key={twin.id} className="flex items-center justify-between gap-4 p-1.5 rounded-2xl hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden shrink-0 bg-zinc-950 relative">
                      <img src={twin.avatarUrl} alt={twin.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-sm text-white truncate">{twin.name}</span>
                        <span className={`text-[8px] font-mono font-black px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${BADGE_COLORS[idx] || BADGE_COLORS[2]}`}>
                          {BADGES[idx] || '⭐ Rising'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-body truncate mt-0.5 max-w-[15rem] sm:max-w-[20rem]">
                        {twin.profession} • <span className="text-[var(--y)] font-semibold">{twin.vibe}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0 font-mono">
                    <span className="text-[10px] text-zinc-500 font-bold hidden sm:inline">{twin.fans}</span>
                    <Link 
                      to={`/chat?twin=${twin.id}`}
                      className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 hover:border-[var(--y)] hover:bg-[var(--y)] hover:text-black flex items-center justify-center text-zinc-400 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Latest Feeds */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
              Latest Feeds
            </h3>
            <span className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer font-mono" onClick={() => navigate('/feed')}>View all</span>
          </div>

          <div className="flex-1 flex flex-col justify-between gap-4 bg-zinc-950 border border-white/5 rounded-3xl p-6 font-body">
            {[
              { title: 'Cyberpunk Summer', description: 'Behind the scenes with Serena and Rina.', cast: 'Serena & Rina', isNew: true },
              { title: 'Midnight Talks', description: 'Late night crypto insights and banter.', cast: 'Cody', isNew: false },
              { title: 'Office Secrets', description: 'Preparing for the next major showcase.', cast: 'Aiko', isNew: false }
            ].map((feed, idx) => {
              return (
                <div key={idx} className="flex items-center justify-between gap-4 p-1.5 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-20 h-14 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl overflow-hidden shrink-0 relative flex flex-col items-center justify-center text-[10px] font-black text-zinc-600 font-mono">
                      <span>FEED</span>
                      <span className="text-[8px] opacity-60">#{idx + 1}</span>
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-sm text-white truncate">{feed.title}</span>
                        {feed.isNew && (
                          <span className="text-[7px] font-mono font-black bg-rose-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">New</span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 font-body truncate mt-0.5 max-w-[15rem] sm:max-w-[20rem]">
                        {feed.description}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/feed')}
                    className="h-10 px-5 bg-[var(--y)] text-black text-xs font-black uppercase rounded-lg hover:scale-102 active:scale-98 transition-all border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer shrink-0"
                  >
                    Watch
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CREATOR STUDIO UPGRADE BOX */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(255,235,31,0.06),transparent_35%)]" />
        
        <div className="flex flex-col gap-2 max-w-xl text-left z-10 font-body">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-[var(--y)]/10 text-[var(--y)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--y)] uppercase">Creator Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-white leading-none tracking-tight">
            Create Your Own <span className="text-[var(--y)]">AI Twin</span>
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Shape their voice, personality attributes, backstory, and appearance. Submit them to our seed directory or lock them as your personal assistant.
          </p>
        </div>

        <button 
          onClick={() => navigate('/create')}
          className="h-10 px-6 rounded-full bg-[var(--y)] text-[var(--blk)] font-extrabold text-xs uppercase tracking-wider shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[0.5px] transition-transform border border-black z-10 shrink-0 cursor-pointer"
        >
          Create Companion
        </button>
      </div>

      {/* SEO & FOOTER */}
      <div className="border-t border-white/5 pt-12 flex flex-col gap-8 text-left">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-heading font-black uppercase text-white tracking-tight">
              Personalized AI Conversations
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-body">
              Whether looking for a lighthearted chat, a professional brainstorm, or a supportive friend to decompress after work, DopeKin twins are trained to adapt to your energy. Every conversation learns from your inputs to make dialogue naturally responsive and empathetic over time.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-heading font-black uppercase text-white tracking-tight">
              Real-Time FaceTime Calls
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-body">
              Unlike generic, text-only chat apps, Auren technology powers full low-latency live video streaming. With our advanced facial sync and custom voice clones, you can call your companions FaceTime-style directly in your browser.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-heading font-black uppercase text-white tracking-tight">
              Safe, Encrypted & Secure
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-body">
              Your safety and data privacy are secure with Auren encryption standards. All chats, call logs, and training models are fully isolated, guaranteeing that your personal discussions and customized digital twins remain strictly private.
            </p>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/5 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-6 w-full text-zinc-500 font-mono text-[10px]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[var(--y)]" />
          <span className="font-bold text-zinc-400">DopeKin AI Platform</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
          <span className="hover:text-zinc-400 cursor-pointer">Contact Support</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-zinc-500" />
          <span>MIT Licensed © 2026</span>
        </div>
      </footer>

    </div>
  );
}
export default HomePage;
