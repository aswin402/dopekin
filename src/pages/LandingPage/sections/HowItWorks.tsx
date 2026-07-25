import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Cpu, Database, Rocket, Key, Radio, Code, Gift, Sparkles, MessageCircle } from 'lucide-react';
import DopeIcon from '../../../assets/DopeIcon.svg';

export function HowItWorks() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      stepNum: '01',
      stepLabel: 'Step 01',
      title: 'Train & Calibrate',
      desc: 'Upload voice samples & photo vectors to calibrate facial sync and low-latency speech synthesis. Takes only a few seconds.',
      icon: Key,
      badgeColor: 'from-amber-500/20 via-purple-600/30 to-purple-950',
      badgeBorder: 'border-amber-400/40',
      iconColor: 'text-amber-400',
    },
    {
      stepNum: '02',
      stepLabel: 'Step 02',
      title: 'Feed Cognitive Memory',
      desc: 'Define custom backstories, behavioral vibes, and conversation history so your twin learns & retains context over time.',
      icon: Radio,
      badgeColor: 'from-purple-600/30 via-indigo-600/30 to-purple-950',
      badgeBorder: 'border-purple-400/40',
      iconColor: 'text-purple-300',
    },
    {
      stepNum: '03',
      stepLabel: 'Step 03',
      title: 'Deploy & Engage',
      desc: 'Publish your autonomous clone live for real-time 1-on-1 FaceTime calls, chat, and stream broadcasts with your unique twin code.',
      icon: Code,
      badgeColor: 'from-amber-400/20 via-indigo-900/40 to-purple-950',
      badgeBorder: 'border-amber-300/40',
      iconColor: 'text-amber-300',
    },
  ];

  return (
    <section className="w-full flex flex-col gap-12 text-left">
      {/* "FOR CREATORS" WIDESCREEN BANNER */}
      <div className="w-full bg-zinc-950 border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl">
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
                <img src={DopeIcon} className="w-4 h-4 shrink-0 object-contain" alt="" />
                <span>Start Creating</span>
              </button>
              
              <button 
                onClick={() => navigate('/discover')}
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
      </div>

      {/* HEADER SECTION FOR THE STEP-BY-STEP WORKFLOW */}
      <div className="flex flex-col gap-2 items-center text-center max-w-xl mx-auto mt-4">
        <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[var(--y)] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3-Step Journey</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white tracking-tight">
          How It Works
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-body">
          Follow the simple 3-step path to launch your personalized AI twin clone in minutes.
        </p>
      </div>

      {/* WINDING VERTICAL STEP-BY-STEP ROADMAP (MATCHING REFERENCE DESIGN) */}
      <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
        
        {/* SVG CURVED DASHED WINDING TIMELINE PATH (Desktop/Tablet) */}
        <div className="absolute top-0 bottom-0 left-8 sm:left-16 md:left-24 lg:left-32 w-48 pointer-events-none hidden sm:block z-0">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 160 900">
            {/* Soft Glowing Background Path */}
            <path
              d="M 60 70 C 170 170, 170 290, 60 410 C 170 520, 170 640, 60 750 C 120 810, 100 860, 60 900"
              fill="none"
              stroke="rgba(168, 85, 247, 0.15)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Dashed Connecting Winding Path Line */}
            <path
              d="M 60 70 C 170 170, 170 290, 60 410 C 170 520, 170 640, 60 750 C 120 810, 100 860, 60 900"
              fill="none"
              stroke="#a855f7"
              strokeWidth="3.5"
              strokeDasharray="8 8"
              strokeLinecap="round"
              className="opacity-60"
            />
          </svg>
        </div>

        {/* STEP ITEMS VERTICAL STACK */}
        <div className="flex flex-col gap-16 md:gap-24 relative z-10">
          
          {/* ================= STEP 01 ================= */}
          <div 
            className="flex flex-col sm:flex-row items-start gap-6 md:gap-10 group"
            onMouseEnter={() => setActiveStep(1)}
            onMouseLeave={() => setActiveStep(null)}
          >
            {/* Left 3D Circular Badge */}
            <div className="relative shrink-0 self-center sm:self-start">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${steps[0].badgeColor} border-4 ${steps[0].badgeBorder} flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] cursor-pointer relative z-10`}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md">
                  <Key className={`w-6 h-6 sm:w-8 sm:h-8 ${steps[0].iconColor} drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]`} />
                </div>
              </div>
            </div>

            {/* Right Soft Elevated Card */}
            <div className={`flex-1 p-6 sm:p-8 rounded-3xl border transition-all duration-500 bg-zinc-950/80 backdrop-blur-xl ${
              activeStep === 1 
                ? 'border-[var(--y)] shadow-[0_15px_40px_rgba(255,231,1,0.12)] translate-y-[-4px]' 
                : 'border-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            }`}>
              <div className="flex flex-col gap-3">
                {/* Step Pill */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-950 border border-purple-500/30 text-white font-mono font-black text-xs flex items-center justify-center shadow-inner">
                    {steps[0].stepNum}
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                    {steps[0].stepLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-black uppercase text-white tracking-tight">
                  {steps[0].title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-body">
                  {steps[0].desc}
                </p>
              </div>
            </div>
          </div>

          {/* FLOATING DECOR BETWEEN STEP 1 & STEP 2 */}
          <div className="hidden sm:flex items-center justify-start pl-28 md:pl-40 -my-8 z-20 pointer-events-none">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-purple-950/80 border border-purple-500/30 backdrop-blur-md shadow-xl animate-bounce [animation-duration:3s]">
              <Cpu className="w-4 h-4 text-[var(--y)]" />
              <span className="text-[10px] font-mono font-bold text-zinc-200 uppercase tracking-widest">
                AI Vector Syncing...
              </span>
            </div>
          </div>

          {/* ================= STEP 02 ================= */}
          <div 
            className="flex flex-col sm:flex-row items-start gap-6 md:gap-10 group"
            onMouseEnter={() => setActiveStep(2)}
            onMouseLeave={() => setActiveStep(null)}
          >
            {/* Left 3D Circular Badge */}
            <div className="relative shrink-0 self-center sm:self-start">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${steps[1].badgeColor} border-4 ${steps[1].badgeBorder} flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] cursor-pointer relative z-10`}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md">
                  <Radio className={`w-6 h-6 sm:w-8 sm:h-8 ${steps[1].iconColor} drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]`} />
                </div>
              </div>
            </div>

            {/* Right Soft Elevated Card */}
            <div className={`flex-1 p-6 sm:p-8 rounded-3xl border transition-all duration-500 bg-zinc-950/80 backdrop-blur-xl ${
              activeStep === 2 
                ? 'border-[var(--y)] shadow-[0_15px_40px_rgba(255,231,1,0.12)] translate-y-[-4px]' 
                : 'border-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            }`}>
              <div className="flex flex-col gap-3">
                {/* Step Pill */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-950 border border-purple-500/30 text-white font-mono font-black text-xs flex items-center justify-center shadow-inner">
                    {steps[1].stepNum}
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                    {steps[1].stepLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-black uppercase text-white tracking-tight">
                  {steps[1].title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-body">
                  {steps[1].desc}
                </p>
              </div>
            </div>
          </div>

          {/* FLOATING DECOR BETWEEN STEP 2 & STEP 3 */}
          <div className="hidden sm:flex items-center justify-start pl-32 md:pl-48 -my-8 z-20 pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md shadow-xl animate-pulse">
              <MessageCircle className="w-4 h-4 text-purple-300" />
              <span className="text-[10px] font-mono font-bold text-zinc-200 uppercase tracking-widest">
                Cognitive Memories Integrated
              </span>
            </div>
          </div>

          {/* ================= STEP 03 ================= */}
          <div 
            className="flex flex-col sm:flex-row items-start gap-6 md:gap-10 group"
            onMouseEnter={() => setActiveStep(3)}
            onMouseLeave={() => setActiveStep(null)}
          >
            {/* Left 3D Circular Badge */}
            <div className="relative shrink-0 self-center sm:self-start">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${steps[2].badgeColor} border-4 ${steps[2].badgeBorder} flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] cursor-pointer relative z-10`}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md">
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] font-mono text-amber-300 font-black tracking-tighter">***</span>
                    <span className="text-xs sm:text-sm font-mono text-white font-black">348</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Soft Elevated Card */}
            <div className={`flex-1 p-6 sm:p-8 rounded-3xl border transition-all duration-500 bg-zinc-950/80 backdrop-blur-xl ${
              activeStep === 3 
                ? 'border-[var(--y)] shadow-[0_15px_40px_rgba(255,231,1,0.12)] translate-y-[-4px]' 
                : 'border-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            }`}>
              <div className="flex flex-col gap-3">
                {/* Step Pill */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-950 border border-purple-500/30 text-white font-mono font-black text-xs flex items-center justify-center shadow-inner">
                    {steps[2].stepNum}
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                    {steps[2].stepLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-black uppercase text-white tracking-tight">
                  {steps[2].title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-body">
                  {steps[2].desc}
                </p>
              </div>
            </div>
          </div>

          {/* PATH END DECORATIVE NODE (GIFT BOX AT BOTTOM) */}
          <div className="hidden sm:flex items-center justify-start pl-20 md:pl-28 -mt-6 z-20">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-purple-600/30 border border-amber-400/40 backdrop-blur-md shadow-2xl">
              <Gift className="w-5 h-5 text-amber-300 animate-bounce" />
              <span className="text-xs font-mono font-black text-white uppercase tracking-wider">
                Twin Launched & Ready!
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
