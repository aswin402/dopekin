import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Search, Compass, MessageSquare, PhoneCall, Trash2 } from 'lucide-react';

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const twins = useAppStore((state) => state.twins);
  const deleteTwin = useAppStore((state) => state.deleteTwin);

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [searchVal, setSearchVal] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('popular');
  const [twinToDelete, setTwinToDelete] = useState<string | null>(null);

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

    return matchesSearch && matchesCategory;
  });

  const sortedTwins = [...filteredTwins].sort((a, b) => {
    if (sortBy === 'newest') {
      // Custom twins first, then default
      if (a.isCustom && !b.isCustom) return -1;
      if (!a.isCustom && b.isCustom) return 1;
      return 0;
    }
    // Mock popular sort
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

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black uppercase text-[#f5f5f5] tracking-tight flex items-center gap-2">
            <Compass className="w-8 h-8 text-[var(--y)]" />
            <span>Seed Directory</span>
          </h1>
          <p className="text-sm text-[#f5f5f5]/60 mt-1">Browse pre-seeded agents or activate custom trained digital clones.</p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[#f5f5f5]/40 uppercase font-bold">Sort By</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-black border border-[var(--border)] rounded-lg text-xs font-bold text-[#f5f5f5] px-3 py-1.5 focus:outline-none focus:border-[var(--y)] font-mono"
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

      {/* Twins Grid */}
      {sortedTwins.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedTwins.map((twin) => (
            <div 
              key={twin.id}
              className="p-3 bg-black border border-[var(--border)] rounded-2xl flex flex-col relative group overflow-hidden transition-all duration-300 hover:translate-y-[-6px] hover:border-[var(--border2)]"
            >
              {/* Aspect Ratio 3:4 */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-black">
                <img 
                  src={twin.avatarUrl} 
                  alt={twin.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1.5 z-20">
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/90 text-white text-[9px] font-extrabold uppercase animate-pulse-glow">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    Live
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/60 text-[#f5f5f5]/90 text-[9px] font-bold">
                    {twin.price}
                  </span>
                </div>

                {/* Custom Delete Icon */}
                {twin.isCustom && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setTwinToDelete(twin.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition-colors z-30"
                    title="Delete Custom Twin"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {/* Hover Quick Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/40 backdrop-blur-[2px]">
                  <Link 
                    to={`/chat?twin=${twin.id}`}
                    className="flex items-center gap-1.5 bg-[var(--y)] text-[var(--blk)] font-bold text-xs uppercase px-4 py-2 rounded-lg hover:scale-105 active:scale-95 transition-transform"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </Link>
                  <Link 
                    to={`/chat?twin=${twin.id}&call=true`}
                    className="flex items-center gap-1.5 bg-black border border-[var(--y)] text-[var(--y)] font-bold text-xs uppercase px-4 py-2 rounded-lg hover:scale-105 active:scale-95 transition-transform"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </Link>
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-3 px-1 flex flex-col gap-0.5">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-black text-base flex items-center gap-1">
                    <span>{twin.name}</span>
                    {twin.isCustom && (
                      <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-[#f5f5f5]/60 font-mono">Trained</span>
                    )}
                  </h3>
                  <span className="text-[10px] text-[#f5f5f5]/40 uppercase font-mono font-semibold">{twin.fans}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#f5f5f5]/60 font-body">
                  <span>{twin.profession}</span>
                  <span className="text-[var(--y)] font-semibold">{twin.vibe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 border border-dashed border-white/10 rounded-2xl text-center flex flex-col items-center gap-4">
          <Search className="w-12 h-12 text-[#f5f5f5]/20 animate-pulse" />
          <h3 className="text-xl font-bold">No twins found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
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
              Are you sure you want to delete this custom twin? This action is permanent and will clear all message logs and vocal configurations.
            </p>
            <div className="flex gap-3 justify-end mt-2">
              <button 
                onClick={() => setTwinToDelete(null)}
                className="px-4 py-2 rounded-lg bg-transparent border border-white/20 hover:bg-white/5 text-sm font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDeleteConfirm(twinToDelete)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors text-sm cursor-pointer"
              >
                Delete Seed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ExplorePage;
