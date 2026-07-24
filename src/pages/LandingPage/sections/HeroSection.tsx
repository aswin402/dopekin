import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DopeIcon from '../../../assets/DopeIcon.svg';
import { SHOWCASE_TWINS } from '../constants';

export function HeroSection() {
  const navigate = useNavigate();
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % SHOWCASE_TWINS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentTwin = SHOWCASE_TWINS[showcaseIndex];
  const nextIndex = (showcaseIndex + 1) % SHOWCASE_TWINS.length;
  const nextTwin = SHOWCASE_TWINS[nextIndex];

  return (
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
            <img src={DopeIcon} className="w-4 h-4 shrink-0 object-contain" alt="" />
            <span>Create Your Twin</span>
          </button>
          
          <button 
            onClick={() => navigate('/discover')}
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
        </div>
      </div>
    </section>
  );
}
