import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { FAQS_DATA } from '../constants';

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
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
          {FAQS_DATA.map((faq, idx) => {
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
  );
}
