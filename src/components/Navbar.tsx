import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Menu, Search, Wallet, LogIn } from 'lucide-react';
import { useState } from 'react';
import { HamsterIcon } from './HamsterIcon';

interface NavbarProps {
  onToggleMobileMenu?: () => void;
}

export function Navbar({ onToggleMobileMenu }: NavbarProps) {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const userTokens = useAppStore((state) => state.userTokens);
  const isPro = useAppStore((state) => state.isPro);
  const isElite = useAppStore((state) => state.isElite);
  const claimDailyBonus = useAppStore((state) => state.claimDailyBonus);
  const lastDailyClaim = useAppStore((state) => state.lastDailyClaim);
  
  const [searchVal, setSearchVal] = useState('');

  const todayStr = new Date().toDateString();
  const hasClaimedToday = lastDailyClaim === todayStr;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-[var(--border)] bg-black/90 backdrop-blur-md z-40 flex lg:hidden items-center justify-between px-4 lg:px-6">
      {/* Brand & Toggle */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleMobileMenu} 
          className="lg:hidden text-[#f5f5f5] p-1.5 hover:bg-white/5 rounded-lg"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/" className="text-2xl font-heading font-black tracking-tighter text-[var(--y)] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 lg:hidden">
          <HamsterIcon className="w-6 h-6 fill-current" />
          <span>DopeKin</span>
        </Link>
      </div>

      {/* Search Bar - Hidden on small screens unless on explore page */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative max-w-md w-full mx-8">
        <input
          type="text"
          placeholder="Search digital twins..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full h-9 bg-black border border-[var(--border)] rounded-full pl-10 pr-4 text-sm text-[#f5f5f5] placeholder-[#f5f5f5]/30 focus:outline-none focus:border-[var(--y)] focus:ring-1 focus:ring-[var(--y)] transition-all font-body"
        />
        <Search className="absolute left-3.5 w-4 h-4 text-[#f5f5f5]/30" />
      </form>

      {/* Auth / Tokens Controls */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            {/* Tokens Badge */}
            <button 
              onClick={() => {
                claimDailyBonus();
                navigate('/pricing');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-[var(--border)] text-xs font-semibold cursor-pointer transition-all hover:border-[var(--y)] hover:bg-zinc-800 ${!hasClaimedToday ? 'animate-pulse' : ''}`}
              title={!hasClaimedToday ? "Claim Daily +20 Tokens!" : "Daily tokens claimed"}
            >
              <Wallet className="w-3.5 h-3.5 text-[var(--y)]" />
              <span>{userTokens} Tokens</span>
              {!hasClaimedToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--y)] animate-ping" />
              )}
            </button>

            {/* Profile link */}
            <Link 
              to="/pricing" 
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--y)] text-[var(--blk)] text-xs font-bold uppercase tracking-wider shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[1px] transition-transform border border-[var(--blk)]"
            >
              {isElite ? 'Elite Member' : isPro ? 'Pro Active' : 'Upgrade'}
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link 
              to="/pricing"
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[var(--y)] text-[var(--blk)] text-xs font-bold uppercase tracking-wide shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[1px] transition-transform border border-[var(--blk)]"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Try Free Trial</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
