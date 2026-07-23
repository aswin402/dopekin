import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Search, Compass, Trash2, Heart } from 'lucide-react';

export function ExplorePage() {
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
        return { emoji: '🎭', text: 'CONFIDENT • EMPATHETIC' };
      case 'serena':
        return { emoji: '🌿', text: 'WARM • EMPATHETIC' };
      case 'aiko':
        return { emoji: '💼', text: 'FOCUSED • ATTENTIVE' };
      case 'cody':
        return { emoji: '⚡', text: 'WITTY • FAST' };
      case 'sarang':
        return { emoji: '💃', text: 'PLAYFUL • CREATIVE' };
      case 'carlos':
        return { emoji: '🔥', text: 'AMBITIOUS • SMART' };
      case 'ben':
        return { emoji: '🕹️', text: 'ENERGETIC • FRIENDLY' };
      case 'etherik':
        return { emoji: '🧬', text: 'ANALYTICAL • DEEP' };
      default:
        return { emoji: '✨', text: vibe.toUpperCase() };
    }
  };

  const getPersonalizationHook = (id: string) => {
    switch (id) {
      case 'vale':
        return 'You both like fashion';
      case 'serena':
        return 'You both like wellness';
      case 'aiko':
        return 'You both like productivity';
      case 'cody':
        return 'You both like crypto';
      case 'sarang':
        return 'You both like K-pop';
      case 'carlos':
        return 'You both like comedy';
      case 'ben':
        return 'You both play games';
      case 'etherik':
        return 'You both like tech';
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

      {/* Search Input for mobile / secondary */}
      <div className="relative w-full md:hidden">
        <input
          type="text"
          placeholder="Filter seeds..."
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-12 w-full">
          {sortedTwins.map((twin) => {
            const vibeData = getVibeIconAndText(twin.id, twin.vibe);
            return (
              <Link 
                key={twin.id}
                to={`/chat?twin=${twin.id}`}
                className="w-full max-w-[270px] mx-auto bg-zinc-950 border border-white/5 rounded-[24px] flex flex-col relative group overflow-hidden transition-all duration-300 hover:translate-y-[-6px] hover:border-white/10 hover:shadow-xl shrink-0 cursor-pointer"
              >
                {/* Aspect Ratio 3:4 */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                  <img 
                    src={twin.avatarUrl} 
                    alt={twin.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Online Badge Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-[9px] font-bold text-white uppercase tracking-wider select-none">
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
                </div>

                {/* Text Info */}
                <div className="p-4.5 pb-4 flex flex-col text-left">
                  <h3 className="font-heading font-black text-lg text-white tracking-tight flex items-center gap-2">
                    <span>{twin.name}</span>
                    {twin.isCustom && (
                      <span className="text-[7px] bg-[var(--y)]/10 text-[var(--y)] px-1.5 py-0.5 rounded uppercase font-mono tracking-wider">Custom</span>
                    )}
                  </h3>
                  
                  {/* Vibe line */}
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wide text-[var(--y)] mt-1">
                    <span>{vibeData.emoji}</span>
                    <span>{vibeData.text}</span>
                  </div>

                  {/* Personalization hook */}
                  <p className="text-[11px] text-zinc-500 font-body mt-1.5 leading-relaxed">
                    {getPersonalizationHook(twin.id)}
                  </p>
                </div>
              </Link>
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

export default ExplorePage;
