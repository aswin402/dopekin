import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { 
  Search, Bell, Users, Clock, MessageSquare, Flame, 
  ChevronRight, Play, Heart, Phone, Video, Sparkles, Shield
} from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const twins = useAppStore((state) => state.twins);
  
  // Search input state
  const [searchVal, setSearchVal] = useState('');

  // Local state to mock adding/removing favorites
  const [favorites, setFavorites] = useState<string[]>(['vale', 'rina', 'aiko']);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  // Find twin helper
  const getTwin = (id: string) => twins.find(t => t.id === id) || twins[0];

  return (
    <div className="flex flex-col gap-8 animate-fade-up px-4 md:px-6 py-6 pb-24 text-left max-w-7xl mx-auto">
      
      {/* HEADER SECTION: GREETINGS & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight flex items-center gap-2">
            <span>Good evening, Alex</span>
            <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-body">What would you like to do today?</p>
        </div>

        {/* Search & Notifications Controls */}
        <div className="flex items-center gap-4 shrink-0">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs md:w-64">
            <input
              type="text"
              placeholder="Search companions..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full h-10 bg-zinc-900/80 border border-white/10 rounded-full pl-10 pr-12 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[var(--y)] font-body"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-white/30" />
            <kbd className="absolute right-3.5 top-3 px-1.5 py-0.5 rounded bg-zinc-950 border border-white/10 text-[8px] text-zinc-500 font-mono font-bold uppercase pointer-events-none">
              ⌘ K
            </kbd>
          </form>

          {/* Notifications button */}
          <button 
            onClick={() => navigate('/pricing')}
            className="relative w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-md border-2 border-black">
              8
            </span>
          </button>
        </div>
      </div>

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

      {/* 1. CYBERPUNK SUMMER PROMO BANNER */}
      <div className="relative w-full rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[3/1] lg:aspect-[4/1] bg-gradient-to-r from-purple-900/60 via-pink-900/50 to-zinc-950 border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,235,31,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-y-0 left-6 sm:left-12 flex flex-col justify-center gap-2 max-w-md z-20">
          <div className="flex items-center gap-2">
            <span className="bg-rose-500 text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full animate-pulse-glow">
              NEW RELEASE
            </span>
            <span className="text-[10px] text-zinc-400 font-bold tracking-wider font-mono">
              DOPEKIN SHORTS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black uppercase text-white leading-none tracking-tight">
            CYBERPUNK <span className="text-[var(--y)]">SUMMER</span>
          </h2>
          <p className="text-xs text-zinc-400 leading-snug line-clamp-2 max-w-xs">
            Step into the neon metropolis and watch your favorite twins interact in autonomous mini-episodes.
          </p>
          <button 
            onClick={() => navigate('/feed')}
            className="mt-2 w-fit h-9 px-5 rounded-full bg-[var(--y)] text-[var(--blk)] font-bold text-xs uppercase tracking-wider shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[0.5px] transition-transform border border-black flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Now</span>
          </button>
        </div>

        {/* Three portrait overlays from screenshot */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden sm:flex items-center justify-end pr-10 pointer-events-none overflow-hidden opacity-85 z-10">
          <div className="flex gap-4 transform rotate-12 translate-x-12 translate-y-6">
            {['serena', 'sarang', 'aiko'].map((id, i) => {
              const twin = getTwin(id);
              return (
                <div 
                  key={id}
                  className="w-24 h-36 lg:w-28 lg:h-40 rounded-xl overflow-hidden border border-white/20 shadow-2xl relative shrink-0"
                  style={{ transform: `translateY(${i * -12}px)` }}
                >
                  <img 
                    src={twin.avatarUrl} 
                    alt="" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              );
            })}
          </div>
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

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
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
                className="w-52 bg-zinc-950 border border-white/5 rounded-2xl flex flex-col shrink-0 relative group overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:border-white/15"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

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

                  {/* Hover play buttons (Stacked vertically to fit w-52 card) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all z-20 bg-black/50 backdrop-blur-[2px] p-2">
                    <Link 
                      to={`/chat?twin=${twin.id}`}
                      className="flex items-center justify-center gap-1.5 bg-[var(--y)] text-black font-extrabold text-[10px] uppercase w-36 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] border border-black"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat</span>
                    </Link>
                    <Link 
                      to={`/chat?twin=${twin.id}&call=true`}
                      className="flex items-center justify-center gap-1.5 bg-black border border-[var(--y)] text-[var(--y)] font-extrabold text-[10px] uppercase w-36 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[2px_2px_0px_rgba(255,235,31,0.2)]"
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
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DOUBLE SECTION ROW: FAVORITES & NEW COMPANIONS */}
      <div className="grid md:grid-cols-2 gap-8 pt-4">
        {/* Your Favorites */}
        <div className="flex flex-col gap-3.5 text-left">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-mono font-black uppercase text-zinc-400 tracking-wider">
              Your Favorites
            </h4>
            <span className="text-[9px] font-bold text-zinc-500 uppercase cursor-pointer hover:text-white" onClick={() => navigate('/explore?filter=favorites')}>View all</span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {favorites.map((favId) => {
              const twin = getTwin(favId);
              return (
                <Link 
                  key={favId}
                  to={`/chat?twin=${favId}`}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <div className="relative w-12 h-12 rounded-full p-[2px] bg-zinc-900 group-hover:bg-[var(--y)] transition-all">
                    <img src={twin.avatarUrl} alt="" className="w-full h-full rounded-full object-cover border border-black" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black" />
                  </div>
                  <span className="text-[10px] text-zinc-300 font-bold group-hover:text-white truncate max-w-12">{twin.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* New Companions */}
        <div className="flex flex-col gap-3.5 text-left">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-mono font-black uppercase text-zinc-400 tracking-wider">
              New Companions
            </h4>
            <span className="text-[9px] font-bold text-zinc-500 uppercase cursor-pointer hover:text-white" onClick={() => navigate('/explore')}>View all</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {['etherik', 'sarang', 'aiko', 'cody', 'vale'].map((newId, idx) => {
              const twin = getTwin(newId);
              return (
                <Link 
                  key={idx}
                  to={`/chat?twin=${newId}`}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <div className="relative w-12 h-12 rounded-full p-[2px] bg-zinc-900 group-hover:bg-purple-500 transition-all">
                    <img src={twin.avatarUrl} alt="" className="w-full h-full rounded-full object-cover border border-black" />
                    <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-[7px] font-extrabold px-1 rounded uppercase tracking-wider scale-90">NEW</span>
                  </div>
                  <span className="text-[10px] text-zinc-300 font-bold group-hover:text-white truncate max-w-12">{twin.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* DOUBLE SECTION ROW: RECENT CALLS & LATEST EPISODES */}
      <div className="grid lg:grid-cols-2 gap-8 pt-4">
        {/* Recent Calls */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
              Recent Calls
            </h3>
            <span className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer" onClick={() => navigate('/landing')}>View all</span>
          </div>

          <div className="flex flex-col gap-3 bg-zinc-950 border border-white/5 rounded-2xl p-4 font-body">
            {[
              { id: 'serena', type: 'Video Call', time: 'Yesterday', duration: '14 min', icon: Video },
              { id: 'cody', type: 'Voice Call', time: 'Yesterday', duration: '22 min', icon: Phone },
              { id: 'rina', type: 'Video Call', time: '2 days ago', duration: '18 min', icon: Video }
            ].map((call, idx) => {
              const twin = getTwin(call.id);
              const CallIcon = call.icon;
              return (
                <div key={idx} className="flex items-center justify-between gap-4 p-1 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-white/10 overflow-hidden shrink-0 bg-zinc-950">
                      <img src={twin.avatarUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-white text-xs">{twin.name}</span>
                      <span className="text-[9px] text-zinc-500 font-mono mt-0.5">{call.type} • {call.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-zinc-400 font-mono">{call.duration}</span>
                    <button 
                      onClick={() => navigate(`/chat?twin=${call.id}&call=true`)}
                      className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 hover:border-[var(--y)] hover:bg-[var(--y)] hover:text-black flex items-center justify-center text-zinc-400 transition-all cursor-pointer"
                    >
                      <CallIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest Episodes */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
              Latest Episodes
            </h3>
            <span className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer" onClick={() => navigate('/feed')}>View all</span>
          </div>

          <div className="flex flex-col gap-3 bg-zinc-950 border border-white/5 rounded-2xl p-4 font-body">
            {[
              { title: 'Cyberpunk Summer', episode: 'Episode 5', cast: 'Serena & Rina', isNew: true },
              { title: 'Midnight Talks', episode: 'Episode 3', cast: 'Cody', isNew: false },
              { title: 'Office Secrets', episode: 'Episode 2', cast: 'Aiko', isNew: false }
            ].map((ep, idx) => {
              return (
                <div key={idx} className="flex items-center justify-between gap-4 p-1 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-10 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shrink-0 relative flex items-center justify-center text-[10px] font-bold text-zinc-500 font-mono">
                      EP {idx + 1}
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs">{ep.title}</span>
                        {ep.isNew && (
                          <span className="text-[7px] font-mono font-black bg-rose-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">New</span>
                        )}
                      </div>
                      <span className="text-[9px] text-zinc-500 font-mono mt-0.5">{ep.episode} • {ep.cast}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/feed')}
                    className="h-8 px-4 bg-[var(--y)] text-black text-[10px] font-black uppercase rounded-lg hover:scale-102 active:scale-98 transition-all border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer shrink-0"
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
