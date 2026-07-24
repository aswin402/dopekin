import { useNavigate } from 'react-router-dom';
import { FEATURES_DATA } from '../constants';

export function FeatureHighlights() {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
      {FEATURES_DATA.map((feat, i) => {
        const Icon = feat.icon;
        return (
          <div 
            key={i} 
            className="p-5 border border-white/5 bg-zinc-950/20 rounded-2xl flex flex-col justify-between gap-4 text-left group hover:border-[var(--border2)] transition-all"
          >
            <div className="flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--y)]/10 border border-[var(--y)]/20 flex items-center justify-center text-[var(--y)] group-hover:bg-[var(--y)] group-hover:text-black transition-all">
                <Icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-heading font-black uppercase text-[#f5f5f5] tracking-wide">{feat.title}</h3>
              <p className="text-xs text-[#f5f5f5]/60 leading-relaxed font-body">{feat.desc}</p>
            </div>
            <button 
              onClick={() => navigate('/explore')}
              className="text-[10px] font-bold font-mono uppercase tracking-wider text-[var(--y)] hover:underline flex items-center gap-1 self-start mt-2 cursor-pointer"
            >
              <span>Learn more</span>
              <span className="text-xs">➔</span>
            </button>
          </div>
        );
      })}
    </section>
  );
}
