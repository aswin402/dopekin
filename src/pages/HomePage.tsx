import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { 
  MessageSquare, ChevronRight, Video, Brain, Radio, 
  Globe, Shield, Play, Users, Send, Sparkles, ArrowRight, Activity,
  Heart, Music, Star
} from 'lucide-react';
import { HamsterIcon } from '../components/HamsterIcon';
import type { Twin } from '../types/twin';

const SHOWCASE_TWINS = [
  {
    name: 'Serena',
    video: new URL('../assets/Avatars/potrait videos/serina-mac.mp4', import.meta.url).href,
    image: new URL('../assets/Avatars/9_16 Ratio Images/05_Serena_C4.png', import.meta.url).href,
  },
  {
    name: 'Sarang',
    video: new URL('../assets/Avatars/potrait videos/sarang_mac.mp4', import.meta.url).href,
    image: new URL('../assets/Avatars/9_16 Ratio Images/02_Sarang_Sleevless.png', import.meta.url).href,
  },
  {
    name: 'Aiko',
    video: new URL('../assets/Avatars/Intro Videos/Aiko  3.mp4', import.meta.url).href,
    image: new URL('../assets/Avatars/9_16 Ratio Images/03_Aiko_V2.png', import.meta.url).href,
  },
  {
    name: 'Etherik',
    video: new URL('../assets/Avatars/potrait videos/etherik_mac.mp4', import.meta.url).href,
    image: new URL('../assets/Avatars/9_16 Ratio Images/01_Etherik.png', import.meta.url).href,
  }
];

const NOTIFICATION_CAMPAIGNS = [
  {
    twinId: 'vale',
    name: 'Vale',
    title: 'Custom Twin Ready',
    message: 'Want to design your own custom AI Twin?',
    actionText: 'Create Now',
    link: '/create'
  },
  {
    twinId: 'sarang',
    name: 'Sarang',
    title: 'Companion Match',
    message: 'Find a companion that matches your energy',
    actionText: 'Explore',
    link: '/explore'
  },
  {
    twinId: 'aiko',
    name: 'Aiko',
    title: 'Live Call Request',
    message: 'Aiko wants to start a live video call',
    actionText: 'Accept Call',
    link: '/chat?twin=aiko&call=true'
  },
  {
    twinId: 'etherik',
    name: 'Etherik',
    title: 'Create Avatar',
    message: 'Design a unique AI companion backstory',
    actionText: 'Build Twin',
    link: '/create'
  }
];

const getVibeStyles = (vibe: string) => {
  const v = vibe.toLowerCase();
  if (v.includes('magnetic') || v.includes('intense')) {
    return { bg: 'bg-rose-500/20 border-rose-500/30 text-rose-400', icon: Heart };
  }
  if (v.includes('warm') || v.includes('empathic') || v.includes('charming') || v.includes('bright')) {
    return { bg: 'bg-amber-400/20 border-amber-400/30 text-amber-300', icon: Sparkles };
  }
  if (v.includes('focused') || v.includes('attentive') || v.includes('analytical')) {
    return { bg: 'bg-sky-400/20 border-sky-400/30 text-sky-300', icon: Brain };
  }
  if (v.includes('witty') || v.includes('fast') || v.includes('energetic')) {
    return { bg: 'bg-emerald-400/20 border-emerald-400/30 text-emerald-300', icon: Activity };
  }
  if (v.includes('techno') || v.includes('satirical')) {
    return { bg: 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-300', icon: Music };
  }
  return { bg: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300', icon: Star };
};

interface TwinCardProps {
  twin: Twin;
  isFirst: boolean;
}

function TwinCard({ twin, isFirst }: TwinCardProps) {
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

      {/* Floating buttons on top-right as shown in user image */}
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

export function HomePage() {
  const navigate = useNavigate();
  const twins = useAppStore((state) => state.twins);
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [showNotificationText, setShowNotificationText] = useState(true);
  const [campaignIndex, setCampaignIndex] = useState(0);
  const [showFloatingWidget, setShowFloatingWidget] = useState(false);
  const [showWidgetBody, setShowWidgetBody] = useState(true);

  const notificationIntervalRef = useRef<any>(null);
  const notificationTimeoutRef = useRef<any>(null);

  const startNotificationRotation = () => {
    if (notificationIntervalRef.current) clearInterval(notificationIntervalRef.current);
    notificationIntervalRef.current = setInterval(() => {
      setCampaignIndex((prev) => (prev + 1) % NOTIFICATION_CAMPAIGNS.length);
      setShowWidgetBody(true);
      setShowNotificationText(true);
    }, 12000);
  };

  const handleDecline = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowWidgetBody(false);
    setShowNotificationText(false);
    
    if (notificationIntervalRef.current) {
      clearInterval(notificationIntervalRef.current);
      notificationIntervalRef.current = null;
    }
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    notificationTimeoutRef.current = setTimeout(() => {
      setCampaignIndex((prev) => (prev + 1) % NOTIFICATION_CAMPAIGNS.length);
      setShowWidgetBody(true);
      setShowNotificationText(true);
      startNotificationRotation();
    }, 6000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % SHOWCASE_TWINS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingWidget(true);
      } else {
        setShowFloatingWidget(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    startNotificationRotation();
    return () => {
      if (notificationIntervalRef.current) clearInterval(notificationIntervalRef.current);
      if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
    };
  }, []);

  const faqs = [
    {
      q: 'What is a DopeKin digital twin?',
      a: 'A digital twin is a high-fidelity AI replication of a creator\'s voice, personality, and visual appearance. They can chat, voice call via FaceTime, and broadcast live streams autonomously based on the creator\'s uploaded cognitive data.'
    },
    {
      q: 'How does FaceTime with AI work?',
      a: 'FaceTime calls are powered by advanced low-latency text-to-speech voice synthesis and real-time facial synchronization. When you call an avatar, they respond verbally on-the-fly, creating a seamless and lifelike conversation.'
    },
    {
      q: 'Can my twin remember past conversations?',
      a: 'Yes. Every premium digital twin has integrated cognitive memory. They remember details you share across sessions, evolving and growing closer to you over time.'
    },
    {
      q: 'Is DopeKin safe and private?',
      a: 'Absolutely. We prioritize user privacy and data encryption. All message logs and biometrics are strictly secured, and we do not sell your personal training data to third parties.'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      alert(`Subscribed successfully with: ${newsletterEmail}`);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="w-full flex flex-col gap-12 md:gap-16 lg:gap-24">
      
      {/* 1. HERO SECTION */}
      <section className="grid lg:grid-cols-12 gap-12 items-center pt-12 md:pt-12 lg:pt-16 pb-8 lg:pb-12">
        {/* Left Column: Heading and Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
          
          {/* Top Tag Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border2)] bg-yellow-500/5 text-[var(--y)] text-[9px] font-mono font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--y)] animate-ping" />
            <span>Face-to-Face AI Video Calls</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[0.95] text-[#f5f5f5] uppercase select-none">
            <span>There's a</span> <br />
            <span className="text-[var(--y)] drop-shadow-[0_0_15px_rgba(255,231,1,0.25)]">Companion</span> <br />
            <span>for Every Mood</span>
          </h1>
          
          <p className="text-xs sm:text-sm md:text-base text-[#f5f5f5]/60 max-w-md leading-relaxed font-body">
            Every companion brings a different energy. Pick one and start interacting. It's all about what feels right to you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button 
              onClick={() => navigate('/create')}
              className="flex items-center gap-2 bg-[var(--y)] hover:bg-[var(--y2)] text-[var(--blk)] font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl border border-[var(--blk)] shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[1px] transition-all cursor-pointer"
            >
              <HamsterIcon className="w-4 h-4 fill-current shrink-0" />
              <span>Create Your Twin</span>
            </button>
            
            <button 
              onClick={() => navigate('/explore')}
              className="flex items-center gap-1.5 bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all cursor-pointer"
            >
              <span>Explore Twins</span>
              <span className="text-[var(--y)] font-semibold text-xs ml-0.5">➔</span>
            </button>
          </div>

          {/* Social Proof Connection block */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5 w-full justify-center lg:justify-start">
            <div className="flex -space-x-2.5 overflow-hidden">
              {[
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
              ].map((src, i) => (
                <img 
                  key={i} 
                  src={src} 
                  alt="User Connection" 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover" 
                />
              ))}
            </div>
            <div className="flex flex-col text-left font-mono text-[10px]">
              <span className="font-extrabold text-[#f5f5f5] leading-none">2.4M+</span>
              <span className="text-white/40 uppercase mt-0.5">Happy connections</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Showcase Phone Mockups */}
        <div className="lg:col-span-7 flex justify-center items-center w-full relative pt-6 lg:pt-0">
          {/* Radial yellow glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--y)]/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex items-start justify-center w-full max-w-2xl relative select-none">
            {/* Phone 1: Active Live Video Call (Left) */}
            {(() => {
              const currentTwin = SHOWCASE_TWINS[showcaseIndex];
              const nextIndex = (showcaseIndex + 1) % SHOWCASE_TWINS.length;
              const nextTwin = SHOWCASE_TWINS[nextIndex];
              
              return (
                <>
                  <div className="w-[240px] xs:w-[280px] sm:w-[300px] md:w-[320px] aspect-[9/18.5] rounded-[42px] bg-zinc-950 border-4 border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-between p-5 z-20 shrink-0 transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-[1.02] group/phone1">
                    {/* Live Video Loop */}
                    <video 
                      key={currentTwin.video}
                      src={currentTwin.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="absolute inset-0 w-full h-full object-cover z-0 group-hover/phone1:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/35 opacity-95 z-10" />

                    {/* Video Call Header */}
                    <div className="flex items-center justify-between w-full z-20 relative select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#f5f5f5]/90 uppercase">LIVE CALL</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-white/50 bg-black/40 px-2.5 py-0.5 rounded-full">02:14</span>
                    </div>

                    {/* Audio Controls, Captions & FaceTime controls overlay */}
                    <div className="flex flex-col gap-4 z-20 relative mt-auto">


                      {/* FaceTime call control bar */}
                      <div className="bg-black/80 border border-white/10 p-2.5 rounded-3xl flex items-center justify-center gap-4 backdrop-blur-md shadow-2xl">
                        {/* Mic toggle */}
                        <button className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white/80 flex items-center justify-center transition-all cursor-pointer">
                          <span className="text-xs">🎙️</span>
                        </button>
                        {/* Camera toggle */}
                        <button className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white/80 flex items-center justify-center transition-all cursor-pointer">
                          <span className="text-xs">📹</span>
                        </button>
                        {/* Hang up decline button */}
                        <button className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all animate-pulse cursor-pointer">
                          <span className="text-xs">📞</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Phone 2: Outgoing Call Connection Screen (Right) */}
                  <div className="w-[210px] xs:w-[250px] sm:w-[270px] md:w-[290px] aspect-[9/18.5] rounded-[42px] bg-zinc-950 border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-between p-5 z-10 shrink-0 transform rotate-3 hover:rotate-0 transition-all duration-500 -ml-16 mt-14 xs:-ml-20 xs:mt-16 md:-ml-24 md:mt-20 hover:scale-[1.02] group/phone2">
                    {/* Outgoing video loop background */}
                    <video 
                      key={nextTwin.video}
                      src={nextTwin.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="absolute inset-0 w-full h-full object-cover z-0 filter blur-[2px] opacity-70 group-hover/phone2:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 z-10" />
                    
                    {/* Incoming / Connecting Status */}
                    <div className="flex flex-col items-center justify-center gap-2 mt-12 w-full z-20 relative text-center">
                      {/* Profile Image with animated glow rings */}
                      <div className="relative">
                        <div className="absolute inset-0 w-20 h-20 rounded-full bg-[var(--y)]/25 animate-ping" />
                        <img 
                          src={nextTwin.image} 
                          alt={`${nextTwin.name} Avatar`} 
                          className="w-20 h-20 rounded-full object-cover border-2 border-[var(--y)] shadow-[0_0_20px_rgba(255,231,1,0.4)] relative z-20"
                        />
                      </div>
                      <h3 className="font-heading font-black text-base text-white uppercase tracking-wider mt-4">{nextTwin.name}</h3>
                      <span className="text-[9px] font-mono font-bold tracking-widest text-[var(--y)] uppercase leading-none mt-1.5 animate-pulse">CONNECTING CALL...</span>
                    </div>

                    {/* Decline / Accept controls */}
                    <div className="flex items-center justify-center gap-8 mb-12 w-full z-20 relative">
                      {/* Decline Outgoing Call */}
                      <button className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer">
                        <span className="text-base font-bold rotate-[135deg]">📞</span>
                      </button>

                      {/* Accept Call */}
                      <button className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer animate-bounce">
                        <span className="text-base font-bold">📞</span>
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 2. FEATURED AI TWINS GRID */}
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
            onClick={() => navigate('/explore')}
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

        {/* Stats card banner as shown in image 2 */}
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

      {/* 3. FEATURES GRID (5 columns) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {[
          {
            icon: MessageSquare,
            title: 'Real Conversations',
            desc: 'Natural, human-like responses that feel incredibly real. Built on neural cognition models.'
          },
          {
            icon: Video,
            title: 'HD Calls & Voice',
            desc: 'Crystal-clear FaceTime-quality voice synthesis and real-time facial expressions synchronization.'
          },
          {
            icon: Brain,
            title: 'Memory That Grows',
            desc: 'Your digital companion remembers context details and grows closer to you with every chat.'
          },
          {
            icon: Radio,
            title: 'Live Streams',
            desc: 'Watch your favorite clones go live autonomously, sending active telemetry and comments stream.'
          },
          {
            icon: Shield,
            title: 'Private & Secure',
            desc: 'Enterprise-grade encryption keeps all your biometrics, scripts, and logs fully private and secure.'
          }
        ].map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div key={i} className="p-5 border border-white/5 bg-zinc-950/20 rounded-2xl flex flex-col justify-between gap-4 text-left group hover:border-[var(--border2)] transition-all">
              <div className="flex flex-col gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--y)]/10 border border-[var(--y)]/20 flex items-center justify-center text-[var(--y)] group-hover:bg-[var(--y)] group-hover:text-black transition-all">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-sm font-heading font-black uppercase text-[#f5f5f5] tracking-wide">{feat.title}</h3>
                <p className="text-xs text-[#f5f5f5]/60 leading-relaxed font-body">{feat.desc}</p>
              </div>
              <button 
                onClick={() => navigate('/explore')}
                className="text-[10px] font-bold font-mono uppercase tracking-wider text-[var(--y)] hover:underline flex items-center gap-1 self-start mt-2"
              >
                <span>Learn more</span>
                <span className="text-xs">➔</span>
              </button>
            </div>
          );
        })}
      </section>

      {/* 4. "FOR CREATORS" WIDESCREEN BANNER */}
      <section className="w-full bg-zinc-950 border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[var(--y)]/5 to-transparent blur-3xl rounded-full" />
        
        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column content */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[var(--y)] uppercase">
              For Creators
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase leading-[0.95] text-[#f5f5f5]">
              Build Your <br className="hidden md:inline" />
              Own AI Twin
            </h2>
            <p className="text-xs sm:text-sm text-[#f5f5f5]/65 leading-relaxed font-body">
              Bring your vision to life. Train custom voice vectors, calibrate facial angles, feed cognitive libraries, and deploy your autonomous twin clone into the catalog.
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/create')}
                className="flex items-center gap-2 bg-[var(--y)] hover:bg-[var(--y2)] text-[var(--blk)] font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl border border-[var(--blk)] shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <HamsterIcon className="w-4 h-4 fill-current shrink-0" />
                <span>Start Creating</span>
              </button>
              
              <button 
                onClick={() => navigate('/explore')}
                className="flex items-center gap-2 bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current shrink-0 text-[var(--y)]" />
                <span>How it Works</span>
              </button>
            </div>
          </div>

          {/* Right Column visual preview mockup */}
          <div className="lg:col-span-7 w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800" 
              alt="Creator Desk Dashboard mockup" 
              className="w-full h-full object-cover opacity-80"
            />
            {/* Tiny HUD overlays */}
            <div className="absolute top-4 left-4 bg-black/60 border border-white/10 rounded-lg p-2.5 z-20 font-mono text-[8px] flex flex-col gap-1 backdrop-blur-md">
              <span className="text-[var(--y)] uppercase font-bold">● training active</span>
              <span className="text-white/40">CALIBRATING VOICE VECTOR</span>
            </div>
          </div>
        </div>
      </section>



      {/* 6. FAQ & APP PREVIEW GRID */}
      <section className="grid lg:grid-cols-12 gap-12 items-stretch mt-4">
        {/* Left Column: FAQ Accordion */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--y)] animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-[#f5f5f5]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col border border-white/5 bg-black overflow-hidden rounded-2xl">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border-b border-white/5 last:border-0">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className={`w-full flex items-center justify-between p-5 text-left font-bold text-[#f5f5f5] hover:bg-white/5 transition-colors cursor-pointer ${
                      isOpen ? 'border-l-4 border-[var(--y)] bg-white/2' : ''
                    }`}
                  >
                    <span className="text-sm">{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-[var(--y)] shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-[#f5f5f5]/70 leading-relaxed font-body">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: App Preview widescreen card */}
        <div className="lg:col-span-6 bg-zinc-950 border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row justify-between gap-8 relative overflow-hidden shadow-2xl items-center text-left">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[var(--y)]/5 to-transparent blur-3xl rounded-full" />
          
          <div className="flex flex-col gap-6 relative z-10 max-w-xs md:max-w-[50%]">
            <h2 className="text-3xl font-heading font-black uppercase text-[#f5f5f5] leading-none">
              Your AI Twin. <br />
              <span className="text-[var(--y)] drop-shadow-[0_0_10px_rgba(255,231,1,0.25)]">Always With You.</span>
            </h2>
            
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-mono font-bold text-white/30 uppercase tracking-widest">Available On</span>
              <div className="flex flex-col gap-2">
                <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-white/10 hover:border-white/20 text-xs font-bold uppercase transition-all bg-black cursor-default w-full">
                  <span> iOS App</span>
                </button>
                <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-white/10 hover:border-white/20 text-xs font-bold uppercase transition-all bg-black cursor-default w-full">
                  <span>🤖 Android</span>
                </button>
                <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-white/10 hover:border-white/20 text-xs font-bold uppercase transition-all bg-black cursor-default w-full">
                  <span>🌐 Web Browser</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Mobile Phone Mockup */}
          <div className="relative w-56 h-[340px] rounded-[32px] border-4 border-zinc-800 bg-black overflow-hidden shadow-2xl shrink-0 z-10 self-center">
            {/* Camera notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-zinc-800 rounded-full z-20" />
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" 
              alt="FaceTime Mockup"
              className="w-full h-full object-cover filter brightness-[0.7]" 
            />
            {/* FaceTime overlay UI inside phone */}
            <div className="absolute inset-0 p-3.5 flex flex-col justify-between z-10 font-mono text-[8px] text-[#f5f5f5] pointer-events-none select-none">
              <div className="flex justify-between items-center mt-3">
                <span className="bg-black/50 px-1.5 py-0.5 rounded-full font-bold">FACETIME LIVE</span>
                <span className="bg-black/50 px-1.5 py-0.5 rounded-full text-[var(--y)]">03:42</span>
              </div>
              <div className="flex flex-col items-center gap-2 mb-2">
                <span className="text-[10px] font-bold font-heading uppercase text-white tracking-wider drop-shadow-md">Vale</span>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] shadow-lg">📞</div>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] shadow-lg">🎙️</div>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] shadow-lg">📹</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER SECTION */}
      <footer className="w-full border-t border-white/5 pt-12 pb-6 mt-6 flex flex-col gap-10">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 text-left">
          {/* Logo / Socials */}
          <div className="col-span-2 flex flex-col gap-4">
            <span className="text-xl font-heading font-black text-[var(--y)] uppercase tracking-tight select-none flex items-center gap-1.5">
              <HamsterIcon className="w-5 h-5 fill-current" />
              <span>DopeKin</span>
            </span>
            <p className="text-xs text-white/50 leading-relaxed font-body max-w-xs">
              Building the future of digital presence. Calibrate voices, train memories, and engage in real-time.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 text-white/40 mt-1">
              <a href="#" className="hover:text-[var(--y)] transition-colors text-sm">Twitter</a>
              <span className="text-white/10 text-[9px] font-mono">•</span>
              <a href="#" className="hover:text-[var(--y)] transition-colors text-sm">Instagram</a>
              <span className="text-white/10 text-[9px] font-mono">•</span>
              <a href="#" className="hover:text-[var(--y)] transition-colors text-sm">Discord</a>
              <span className="text-white/10 text-[9px] font-mono">•</span>
              <a href="#" className="hover:text-[var(--y)] transition-colors text-sm">YouTube</a>
            </div>
          </div>

          {/* Product links */}
          <div className="flex flex-col gap-3 font-mono text-[10px]">
            <span className="font-extrabold uppercase text-[#f5f5f5] tracking-wider mb-1">Product</span>
            <Link to="/explore" className="text-white/50 hover:text-[var(--y)] transition-colors">Explore</Link>
            <Link to="/live" className="text-white/50 hover:text-[var(--y)] transition-colors">Live Streams</Link>
            <Link to="/create" className="text-white/50 hover:text-[var(--y)] transition-colors">Creators OS</Link>
            <Link to="/pricing" className="text-white/50 hover:text-[var(--y)] transition-colors">Pricing Options</Link>
          </div>

          {/* Company links */}
          <div className="flex flex-col gap-3 font-mono text-[10px]">
            <span className="font-extrabold uppercase text-[#f5f5f5] tracking-wider mb-1">Company</span>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">About Us</a>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">Careers</a>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">Blog</a>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">Contact</a>
          </div>

          {/* Resources links */}
          <div className="flex flex-col gap-3 font-mono text-[10px]">
            <span className="font-extrabold uppercase text-[#f5f5f5] tracking-wider mb-1">Resources</span>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">Help Center</a>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">Guides</a>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">Community</a>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">API docs</a>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-3 font-mono text-[10px]">
            <span className="font-extrabold uppercase text-[#f5f5f5] tracking-wider mb-1">Legal</span>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">Terms of Service</a>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">Refund Policy</a>
            <a href="#" className="text-white/50 hover:text-[var(--y)] transition-colors">Cookies settings</a>
          </div>
        </div>

        {/* Newsletter and Copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-t border-white/5 pt-8 gap-6 mt-2">
          <span className="text-[10px] text-white/30 font-mono order-2 lg:order-1">
            © 2026 DOPEKIN INC. ALL RIGHTS RESERVED. TELEMETRY COGNITIVE V2.0
          </span>
          
          {/* Newsletter Input Form */}
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full max-w-sm order-1 lg:order-2">
            <input 
              type="email" 
              placeholder="Stay in the loop - Enter email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 h-9 bg-zinc-900 border border-white/10 rounded-lg px-3 text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 focus:outline-none focus:border-[var(--y)]"
              required
            />
            <button 
              type="submit" 
              className="h-9 px-4 rounded-lg bg-[var(--y)] text-[var(--blk)] flex items-center justify-center font-bold text-xs hover:bg-[var(--y2)] active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </footer>

      {/* Floating Active Call / Message Widget */}
      {showFloatingWidget && showWidgetBody && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
          {showNotificationText && (
            <div className="bg-black/90 border border-white/10 text-white p-3 rounded-2xl rounded-tr-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-start gap-1 backdrop-blur-md relative">
              {/* Close button */}
              <button 
                onClick={handleDecline}
                className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white/50 hover:text-white flex items-center justify-center text-[8px] cursor-pointer"
              >
                ✕
              </button>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] font-mono font-bold text-red-500 tracking-wider uppercase">
                  {NOTIFICATION_CAMPAIGNS[campaignIndex].title}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-white/90 leading-tight font-medium pr-3 mt-0.5 max-w-[150px] text-left">
                {NOTIFICATION_CAMPAIGNS[campaignIndex].message}
              </p>
              <div className="flex gap-2 mt-1.5">
                <Link 
                  to={NOTIFICATION_CAMPAIGNS[campaignIndex].link}
                  className="text-[9px] font-mono font-bold bg-[var(--y)] hover:bg-[var(--y2)] text-black px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all"
                >
                  {NOTIFICATION_CAMPAIGNS[campaignIndex].actionText}
                </Link>
                <button 
                  onClick={handleDecline}
                  className="text-[9px] font-mono font-bold bg-zinc-800 hover:bg-zinc-700 text-white/60 px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </div>
          )}

          {/* Circular Avatar Badge */}
          <Link 
            to={NOTIFICATION_CAMPAIGNS[campaignIndex].link}
            className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[var(--y)] bg-zinc-950 shadow-[0_0_20px_rgba(255,231,1,0.3)] hover:shadow-[0_0_30px_rgba(255,231,1,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer block group shrink-0"
          >
            <img 
              src={SHOWCASE_TWINS[campaignIndex].image} 
              alt={`${NOTIFICATION_CAMPAIGNS[campaignIndex].name} Avatar`} 
              className="w-full h-full rounded-full object-cover"
            />
            {/* Active call pulse border */}
            <div className="absolute inset-0 rounded-full border border-[var(--y)] animate-ping opacity-75 pointer-events-none" />

            {/* Red Notification Badge */}
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-md border border-zinc-950">
              1
            </div>
          </Link>
        </div>
      )}

    </div>
  );
}
export default HomePage;
