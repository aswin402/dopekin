import { useNavigate } from 'react-router-dom';
import { Play, Cpu, Database, Rocket } from 'lucide-react';
import DopeIcon from '../../../assets/DopeIcon.svg';

export function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      step: '01',
      title: 'Train & Calibrate',
      desc: 'Upload voice samples & photo vectors to calibrate facial sync and low-latency speech synthesis.',
      icon: Cpu,
    },
    {
      step: '02',
      title: 'Feed Cognitive Memory',
      desc: 'Define custom backstories, behavioral vibes, and conversation history so your twin learns & retains context.',
      icon: Database,
    },
    {
      step: '03',
      title: 'Deploy & Engage',
      desc: 'Publish your autonomous clone live for real-time 1-on-1 FaceTime calls, chat, and stream broadcasts.',
      icon: Rocket,
    },
  ];

  return (
    <section className="w-full flex flex-col gap-8">
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
      </div>

      {/* 3-STEP ROADMAP OF TRAINING & DEPLOYING */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item, idx) => {
          const StepIcon = item.icon;
          return (
            <div 
              key={idx} 
              className="p-6 bg-zinc-950/40 border border-white/5 rounded-2xl flex flex-col gap-3 text-left relative overflow-hidden group hover:border-[var(--border2)] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--y)]/10 text-[var(--y)] border border-[var(--y)]/20 uppercase tracking-wider">
                  STEP {item.step}
                </span>
                <StepIcon className="w-5 h-5 text-white/30 group-hover:text-[var(--y)] transition-colors" />
              </div>
              <h3 className="text-base font-heading font-black uppercase text-[#f5f5f5] mt-1">{item.title}</h3>
              <p className="text-xs text-[#f5f5f5]/60 leading-relaxed font-body">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
