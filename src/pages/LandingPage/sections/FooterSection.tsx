import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import DopeIcon from '../../../assets/DopeIcon.svg';

export function FooterSection() {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      alert(`Subscribed successfully with: ${newsletterEmail}`);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="w-full border-t border-white/5 pt-12 pb-6 mt-6 flex flex-col gap-10">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 text-left">
        {/* Logo / Socials */}
        <div className="col-span-2 flex flex-col gap-4">
          <span className="text-xl font-heading font-black text-[var(--y)] uppercase tracking-tight select-none flex items-center gap-1.5">
            <img src={DopeIcon} className="w-5 h-5 object-contain" alt="DopeKin Logo" />
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
  );
}
