import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Search, Compass, Trash2, Heart } from 'lucide-react';
import type { Twin } from '../../types/twin';

interface DiscoverTwinCardProps {
  twin: Twin;
  likedTwins: string[];
  toggleLike: (id: string) => void;
  setTwinToDelete: (id: string) => void;
  vibeData: { emoji: string; text: string };
  personalizationHook: string;
}

function DiscoverTwinCard({ 
  twin, 
  likedTwins, 
  toggleLike, 
  setTwinToDelete, 
  vibeData, 
  personalizationHook 
}: DiscoverTwinCardProps) {
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    <Link 
      to={`/chat?twin=${twin.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full aspect-[3/4] bg-black border border-[var(--border)] rounded-2xl flex flex-col relative group overflow-hidden transition-all duration-300 hover:translate-y-[-6px] hover:scale-[1.02] hover:border-[var(--border2)] shrink-0 text-left cursor-pointer"
    >
      {/* Hover Video Loop */}
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

      {/* Cover Image */}
      <img 
        src={twin.avatarUrl} 
        alt={twin.name} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 z-0 ${
          isHovered && twin.videoUrl ? "opacity-0 scale-105" : "opacity-100 group-hover:scale-105"
        }`}
      />

      {/* Bottom Dark Gradient Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black via-black/75 to-transparent opacity-95 transition-opacity z-10" />

      {/* Online Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-[9px] font-bold text-white uppercase tracking-wider select-none z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>Online</span>
      </div>

      {/* Favorite Heart Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleLike(twin.id);
        }}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-zinc-400 hover:text-red-500 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer z-30"
        title="Favorite Companion"
      >
        <Heart className={`w-4 h-4 transition-colors ${likedTwins.includes(twin.id) ? 'fill-red-500 text-red-500' : 'text-zinc-400'}`} />
      </button>

      {/* Custom Delete Icon */}
      {twin.isCustom && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTwinToDelete(twin.id);
          }}
          className="absolute top-3 right-12 w-8 h-8 rounded-full bg-red-500/85 hover:bg-red-600 text-white transition-colors z-30 cursor-pointer flex items-center justify-center"
          title="Delete Custom Twin"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Overlaid Text Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col gap-1 text-left">
        <h3 className="font-heading font-black text-lg text-white tracking-tight flex items-center gap-2">
          <span>{twin.name}</span>
          {twin.isCustom && (
            <span className="text-[7px] bg-[var(--y)]/15 text-[var(--y)] px-1.5 py-0.5 rounded uppercase font-mono tracking-wider border border-[var(--y)]/20">Custom</span>
          )}
        </h3>
        
        {/* Vibe line */}
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wide text-[var(--y)] mt-0.5">
          <span>{vibeData.emoji}</span>
          <span>{vibeData.text}</span>
        </div>

        {/* Personalization hook */}
        <p className="text-[11px] text-zinc-300 font-body mt-1 leading-relaxed line-clamp-2">
          {personalizationHook}
        </p>
      </div>
    </Link>
  );
}

export function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const twins = useAppStore((state) => state.twins);
  const deleteTwin = useAppStore((state) => state.deleteTwin);

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';
  const filterParam = searchParams.get('filter') || '';

  const [searchVal, setSearchVal] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('popular');
  const [twinToDelete, setTwinToDelete] = useState<string | null>(null);

  // Stateful favorite system
  const [likedTwins, setLikedTwins] = useState<string[]>(['vale', 'sarang']);

  // Synchronize URL params with local state
  useEffect(() => {
    setSearchVal(queryParam);
  }, [queryParam]);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSearchParams((prev) => {
      if (cat === 'all') {
        prev.delete('category');
      } else {
        prev.set('category', cat);
      }
      return prev;
    });
  };

  const handleSearchChange = (val: string) => {
    setSearchVal(val);
    setSearchParams((prev) => {
      if (!val) {
        prev.delete('q');
      } else {
        prev.set('q', val);
      }
      return prev;
    });
  };

  const toggleLike = (id: string) => {
    setLikedTwins((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter and Sort twins
  const filteredTwins = twins.filter((twin) => {
    const matchesSearch = 
      twin.name.toLowerCase().includes(searchVal.toLowerCase()) || 
      twin.profession.toLowerCase().includes(searchVal.toLowerCase()) ||
      twin.bio.toLowerCase().includes(searchVal.toLowerCase()) ||
      twin.vibe.toLowerCase().includes(searchVal.toLowerCase());
      
    const matchesCategory = 
      activeCategory === 'all' || 
      twin.category === activeCategory;

    // Filter by user's actual liked list if favorites filter is selected
    const matchesFilter = filterParam !== 'favorites' || likedTwins.includes(twin.id);

    return matchesSearch && matchesCategory && matchesFilter;
  });

  const sortedTwins = [...filteredTwins].sort((a, b) => {
    if (sortBy === 'newest') {
      if (a.isCustom && !b.isCustom) return -1;
      if (!a.isCustom && b.isCustom) return 1;
      return 0;
    }
    return 0;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'models', label: 'Models' },
    { value: 'musicians', label: 'Musicians' },
    { value: 'athletes', label: 'Athletes' },
    { value: 'comedians', label: 'Comedians' },
    { value: 'creators', label: 'Creators' },
  ];

  const handleDeleteConfirm = (id: string) => {
    deleteTwin(id);
    setTwinToDelete(null);
  };

  const getVibeIconAndText = (id: string, vibe: string) => {
    switch (id) {
      case 'vale':
        return { emoji: '🎭', text: 'MAGNETIC • AUTHENTIC' };
      case 'serena':
        return { emoji: '🌿', text: 'WARM • EMPATHIC' };
      case 'aiko':
        return { emoji: '💼', text: 'FOCUSED • ATTENTIVE' };
      case 'etherik':
        return { emoji: '🧬', text: 'ANALYTICAL • CHARISMATIC' };
      case 'kaia':
        return { emoji: '🎮', text: 'FIERY • SKILLED' };
      case 'luna':
        return { emoji: '🔮', text: 'MYSTERIOUS • ENCHANTING' };
      case 'jax':
        return { emoji: '🎸', text: 'REBELLIOUS • ELECTRIC' };
      case 'maya':
        return { emoji: '✨', text: 'PLAYFUL • WITTY' };
      case 'alex':
        return { emoji: '💪', text: 'HIGH ENERGY • MOTIVATED' };
      case 'sarang':
        return { emoji: '💃', text: 'CHARMING • BRIGHT' };
      case 'carlos':
        return { emoji: '🔥', text: 'SATIRICAL • SHARP' };
      case 'cody':
        return { emoji: '⚡', text: 'COMPETITIVE • FAST' };
      case 'senpai':
        return { emoji: '🌸', text: 'COOL • PROTECTIVE' };
      case 'claire':
        return { emoji: '📚', text: 'THOUGHTFUL • COZY' };
      case 'marco':
        return { emoji: '🍷', text: 'PASSIONATE • CULINARY' };
      case 'leo':
        return { emoji: '☕', text: 'GENTLE • REASSURING' };
      case 'chloe':
        return { emoji: '👠', text: 'CHIC • TRENDSETTING' };
      case 'marina':
        return { emoji: '🌊', text: 'ETHEREAL • FREE-SPIRITED' };
      case 'sam':
        return { emoji: '📷', text: 'GENUINE • CHARMING' };
      case 'dr-elena':
        return { emoji: '🧠', text: 'CALM • INSIGHTFUL' };
      case 'rio':
        return { emoji: '✈️', text: 'ADVENTUROUS • ENERGETIC' };
      case 'drake':
        return { emoji: '🦇', text: 'DARK • INTRIGUING' };
      case 'hannah':
        return { emoji: '🏡', text: 'DEVOTED • SWEET' };
      case 'noah':
        return { emoji: '☕', text: 'FLIRTY • UNPREDICTABLE' };
      default:
        return { emoji: '✨', text: vibe.toUpperCase() };
    }
  };

  const getPersonalizationHook = (id: string) => {
    switch (id) {
      case 'vale':
        return 'You both like indie acoustic tunes';
      case 'serena':
        return 'You both like wellness';
      case 'aiko':
        return 'You both like productivity';
      case 'etherik':
        return 'You both like tech & AI';
      case 'kaia':
        return 'You both love esports';
      case 'luna':
        return 'You both like astrology';
      case 'jax':
        return 'You both love rock music';
      case 'maya':
        return 'You both like design';
      case 'alex':
        return 'You both like workouts';
      case 'sarang':
        return 'You both like K-pop';
      case 'carlos':
        return 'You both like comedy';
      case 'cody':
        return 'You both play games';
      case 'senpai':
        return 'You both love anime';
      case 'claire':
        return 'You both love reading';
      case 'marco':
        return 'You both love fine dining';
      case 'leo':
        return 'Comforting companion';
      case 'chloe':
        return 'You both love fashion';
      case 'marina':
        return 'You both love ocean vibes';
      case 'sam':
        return 'You both like photography';
      case 'dr-elena':
        return 'Mindfulness coach';
      case 'rio':
        return 'You both love traveling';
      case 'drake':
        return 'Gothic mystery writer';
      case 'hannah':
        return 'Devoted home designer';
      case 'noah':
        return 'Magnetic coffee partner';
      default:
        return 'Recommended companion';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-up px-4 md:px-6 py-6 pb-24 text-left w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-heading font-black uppercase text-[#f5f5f5] tracking-tight flex items-center gap-2">
            <Compass className="w-8 h-8 text-[var(--y)]" />
            <span>{filterParam === 'favorites' ? 'My Favorites' : 'Seed Directory'}</span>
          </h1>
          <p className="text-sm text-[#f5f5f5]/60 mt-1">
            {filterParam === 'favorites' 
              ? 'Your handpicked premium AI companions and active twins.' 
              : 'Browse pre-seeded agents or activate custom trained digital clones.'}
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[#f5f5f5]/40 uppercase font-bold">Sort By</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-black border border-[var(--border)] rounded-lg text-xs font-bold text-[#f5f5f5] px-3 py-1.5 focus:outline-none focus:border-[var(--y)] font-mono cursor-pointer"
          >
            <option value="popular">POPULARITY</option>
            <option value="newest">NEW SEEDS</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search companions by name, profession, bio, or vibe..."
          value={searchVal}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full h-11 bg-black border border-[var(--border)] rounded-lg pl-10 pr-4 text-sm text-[#f5f5f5] placeholder-[#f5f5f5]/30 focus:outline-none focus:border-[var(--y)] font-body"
        />
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#f5f5f5]/30" />
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat.value
                ? 'bg-[var(--y)] text-[var(--blk)] border-2 border-[var(--blk)] shadow-[2px_2px_0px_rgba(255,231,1,0.2)]'
                : 'bg-black text-[#f5f5f5]/65 border border-[var(--border)] hover:bg-zinc-900 hover:text-[#f5f5f5]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Twins Grid Container */}
      {sortedTwins.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 xl:gap-10 w-full">
          {sortedTwins.map((twin) => {
            const vibeData = getVibeIconAndText(twin.id, twin.vibe);
            const personalizationHook = getPersonalizationHook(twin.id);
            return (
              <DiscoverTwinCard 
                key={twin.id}
                twin={twin}
                likedTwins={likedTwins}
                toggleLike={toggleLike}
                setTwinToDelete={setTwinToDelete}
                vibeData={vibeData}
                personalizationHook={personalizationHook}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-16 border border-dashed border-white/10 rounded-2xl text-center flex flex-col items-center gap-4">
          <Search className="w-12 h-12 text-[#f5f5f5]/20 animate-pulse" />
          <h3 className="text-xl font-bold">No twins found</h3>
          <p className="text-sm text-muted-foreground max-w-sm font-body">
            We couldn't find any twins matching "{searchVal}". Try filtering by another category or checking your spelling.
          </p>
        </div>
      )}

      {/* Deletion confirmation modal */}
      {twinToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border-2 border-red-500/50 p-6 rounded-2xl max-w-sm w-full shadow-2xl flex flex-col gap-4 animate-zoom-in">
            <h3 className="text-xl font-heading font-bold text-red-500 uppercase">Confirm Deletion</h3>
            <p className="text-sm text-[#f5f5f5]/70 leading-relaxed font-body">
              Are you sure you want to permanently delete this custom trained twin? This action cannot be undone and all active chat history will be lost.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setTwinToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-white font-bold text-xs uppercase transition-all hover:bg-white/5 active:scale-95 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDeleteConfirm(twinToDelete)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase transition-all hover:bg-red-750 active:scale-95 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiscoverPage;
