import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { 
  Search, Compass, MessageSquare, PhoneCall, Play, 
  ChevronDown, Flame, Zap, Shield, Sparkles, HelpCircle 
} from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const twins = useAppStore((state) => state.twins);
  
  // Filtering & Search State
  const [searchVal, setSearchVal] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Video hover refs
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleMouseEnter = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch((err) => console.log('Video play error:', err));
    }
  };

  const handleMouseLeave = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // Filter companions
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

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'models', label: 'Models' },
    { value: 'musicians', label: 'Musicians' },
    { value: 'athletes', label: 'Athletes' },
    { value: 'comedians', label: 'Comedians' },
    { value: 'creators', label: 'Creators' },
  ];

  const faqs = [
    {
      q: 'What is DopeKin?',
      a: 'DopeKin is a premium AI companion platform allowing users to discover, interact, and customize digital twins. These companions can engage in real-time text chats, realistic voice dialogues, and live Face-to-Face video calls tailored to your energy and mood.'
    },
    {
      q: 'Are the conversations and video calls private?',
      a: 'Yes, absolutely. Privacy and security are our top priorities. All text chat logs, voice conversations, and video streams are completely encrypted end-to-end, private to your account, and never shared or sold.'
    },
    {
      q: 'Can I design and train my own AI companion?',
      a: 'Yes! Using our Creator Studio, you can configure unique personality settings, define specific background stories, select voice model styles, and train a customized digital twin to behave exactly how you envision.'
    },
    {
      q: 'How does the Live Video Call FaceTime feature work?',
      a: 'Our platform uses high-fidelity real-time streaming technology. Once you click "Call" on any companion card, it establishes a live facsimile video call with low latency, voice syncing, and dynamic subtitle overlays so it feels exactly like calling a real friend.'
    },
    {
      q: 'Is there a limit on how many messages or calls I can make?',
      a: 'Free trial users receive daily tokens to test chats and calls. For unlimited high-priority streaming, custom twin voice cloning, and priority server access, you can upgrade to our Pro or Elite plans in the Pricing page.'
    },
    {
      q: 'Do I need to install any external apps to use DopeKin?',
      a: 'No installation required! DopeKin is a fully responsive web application that runs flawlessly in any modern desktop or mobile browser.'
    }
  ];

  return (
    <div className="flex flex-col gap-12 animate-fade-up px-4 md:px-6 py-6 pb-24 text-left max-w-7xl mx-auto">
      
      {/* 1. NEW RELEASE HERO BANNER (Candy Shorts Inspired) */}
      <div className="relative w-full rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[3/1] lg:aspect-[4/1] bg-gradient-to-r from-purple-900/60 via-pink-900/50 to-zinc-950 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Abstract shapes & overlay glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,235,31,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        {/* Banner Content */}
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

        {/* Floating companion assets teaser block on right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden sm:flex items-center justify-end pr-10 pointer-events-none overflow-hidden opacity-85">
          <div className="flex gap-4 transform rotate-12 translate-x-12 translate-y-6">
            {twins.slice(0, 3).map((twin, i) => (
              <div 
                key={twin.id}
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
            ))}
          </div>
        </div>
      </div>

      {/* 2. CIRCULAR STORY AVATARS (New Experiences) */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-[var(--y)]" />
          <span>New Experiences</span>
        </h3>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-3 scrollbar-none scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6">
          {twins.map((twin) => (
            <Link 
              key={twin.id} 
              to={`/chat?twin=${twin.id}`}
              className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-[var(--border)] to-zinc-800 group-hover:from-[var(--y)] group-hover:to-pink-500 transition-all duration-300 transform group-hover:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-black bg-zinc-950">
                  <img 
                    src={twin.avatarUrl} 
                    alt={twin.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Story online indicator */}
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" />
              </div>
              <span className="text-[11px] font-bold text-zinc-300 group-hover:text-[var(--y)] transition-colors">
                {twin.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. FEATURED LIVE VIDEO LOOPS ROW */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-[var(--y)]" />
          <span>Live Streams</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {twins.slice(0, 4).map((twin) => (
            <div 
              key={`live-${twin.id}`}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(twin.id)}
              onMouseLeave={() => handleMouseLeave(twin.id)}
              onClick={() => navigate(`/chat?twin=${twin.id}&call=true`)}
            >
              {/* Static Cover Image */}
              <img 
                src={twin.avatarUrl} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
              />
              
              {/* Silent Loop Video */}
              <video 
                ref={(el) => { videoRefs.current[twin.id] = el; }}
                src={twin.videoUrl}
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* LIVE Badge */}
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600/90 text-white font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse-glow">
                <span className="w-1 h-1 rounded-full bg-white" />
                LIVE
              </div>

              {/* Title & Overlay */}
              <div className="absolute bottom-2 left-3 text-left">
                <span className="text-xs font-heading font-black uppercase tracking-tight text-white block">
                  {twin.name}
                </span>
                <span className="text-[9px] text-[var(--y)] font-mono font-bold tracking-widest uppercase">
                  {twin.profession}
                </span>
              </div>

              {/* Watch Now Button on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/40 backdrop-blur-[2px]">
                <span className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-[var(--y)] text-black text-[10px] font-extrabold uppercase shadow-lg scale-95 group-hover:scale-100 transition-transform">
                  <Play className="w-3 h-3 fill-current" />
                  Call Live
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MAIN CHARACTER EXPLORER CATALOG */}
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <h3 className="text-xl font-heading font-black uppercase text-white tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-[var(--y)]" />
              <span>DopeKin Companions</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Explore high-fidelity digital clones and start interacting.</p>
          </div>

          {/* Search Input bar */}
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search companion details..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full h-10 bg-zinc-900/80 border border-white/10 rounded-full pl-10 pr-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[var(--y)] font-body"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-white/30" />
          </div>
        </div>

        {/* Categories Selector list */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                activeCategory === cat.value
                  ? 'bg-[var(--y)] text-[var(--blk)] border-[var(--blk)] font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Character Catalog Grid */}
        {filteredTwins.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredTwins.map((twin, idx) => (
              <div 
                key={twin.id}
                className="bg-zinc-950 border border-white/5 rounded-2xl flex flex-col relative group overflow-hidden transition-all duration-300 hover:translate-y-[-6px] hover:border-white/15"
              >
                {/* 3:4 Aspect Ratio Image wrapper */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl bg-zinc-900">
                  <img 
                    src={twin.avatarUrl} 
                    alt={twin.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Status tags */}
                  <div className="absolute top-2 left-2 flex gap-1 z-20">
                    {idx % 3 === 0 ? (
                      <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white text-[8px] font-black uppercase tracking-wider">
                        + New
                      </span>
                    ) : idx % 3 === 1 ? (
                      <span className="px-2 py-0.5 rounded-md bg-[var(--y)] text-black text-[8px] font-black uppercase tracking-wider">
                        Series
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[8px] font-black uppercase tracking-wider">
                        New Episodes
                      </span>
                    )}
                  </div>

                  {/* Interactive hover actions overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 gap-3 opacity-0 group-hover:opacity-100 transition-all z-20 bg-black/50 backdrop-blur-[2px]">
                    <Link 
                      to={`/chat?twin=${twin.id}`}
                      className="flex items-center justify-center gap-1.5 bg-[var(--y)] text-black font-extrabold text-[10px] uppercase w-32 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] border border-black"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat Now</span>
                    </Link>
                    <Link 
                      to={`/chat?twin=${twin.id}&call=true`}
                      className="flex items-center justify-center gap-1.5 bg-black border border-[var(--y)] text-[var(--y)] font-extrabold text-[10px] uppercase w-32 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[3px_3px_0px_rgba(255,235,31,0.2)]"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Live Call</span>
                    </Link>
                  </div>
                </div>

                {/* Name & description Block */}
                <div className="p-3.5 flex flex-col gap-1 z-10 bg-zinc-950">
                  <div className="flex justify-between items-center">
                    <h4 className="font-heading font-black text-sm text-white">
                      {twin.name}, {21 + (idx % 5)}
                    </h4>
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      {twin.vibe}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-body leading-relaxed line-clamp-2 h-7">
                    {twin.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 border border-dashed border-white/10 rounded-2xl text-center flex flex-col items-center gap-4">
            <Search className="w-12 h-12 text-white/20 animate-pulse" />
            <h3 className="text-lg font-bold">No companions match search</h3>
            <p className="text-xs text-zinc-400 max-w-sm">
              Try adjusting your query or selecting another category filter.
            </p>
          </div>
        )}
      </div>

      {/* 5. INTERACTIVE CREATOR CTA BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(255,235,31,0.06),transparent_35%)]" />
        
        <div className="flex flex-col gap-2 max-w-xl text-left z-10">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-[var(--y)]/10 text-[var(--y)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--y)] uppercase">Creator Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-white leading-none tracking-tight">
            Create Your Own <span className="text-[var(--y)]">AI Twin</span>
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-body">
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

      {/* 6. FAQ ACCORDION SECTION */}
      <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full pt-4">
        <div className="text-center flex flex-col items-center gap-2">
          <div className="p-1.5 rounded-full bg-zinc-900 text-zinc-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-heading font-black uppercase text-white tracking-tight">
            DopeKin AI FAQ
          </h3>
          <p className="text-xs text-zinc-400">Got questions about digital twins, security, or voice cloning? We've got answers.</p>
        </div>

        <div className="flex flex-col gap-2 w-full mt-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index}
                className="border border-white/5 rounded-2xl bg-zinc-950 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 flex items-center justify-between gap-4 text-left font-bold text-sm text-zinc-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-[var(--y)]' : ''}`} />
                </button>
                
                {/* Smooth expand details */}
                <div 
                  className={`transition-all duration-300 ease-in-out px-4 overflow-hidden ${
                    isOpen ? 'max-h-48 pb-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xs text-zinc-400 leading-relaxed font-body">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. SEO SEO TEXT CONTENT */}
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

      {/* 8. FOOTER */}
      <footer className="border-t border-white/5 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-6 w-full text-zinc-500 font-mono text-[10px]">
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-[var(--y)]" />
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
