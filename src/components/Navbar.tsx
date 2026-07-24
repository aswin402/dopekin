import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Menu, Search, Wallet } from 'lucide-react';
import { useState } from 'react';
import DopeIcon from '../assets/DopeIcon.svg';

interface NavbarProps {
  onToggleMobileMenu?: () => void;
}

export function Navbar({ onToggleMobileMenu }: NavbarProps) {
  const navigate = useNavigate();
  const userTokens = useAppStore((state) => state.userTokens);
  
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-[var(--border)] bg-black/90 backdrop-blur-md z-40 flex lg:hidden items-center justify-between px-4 lg:px-6">
      {/* Brand & Toggle */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleMobileMenu} 
          className="lg:hidden text-[#f5f5f5] p-1.5 hover:bg-white/5 rounded-lg cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="text-2xl font-heading font-black tracking-tighter text-[var(--y)] flex items-center gap-1.5 lg:hidden select-none">
          <img src={DopeIcon} className="w-6 h-6 object-contain" alt="DopeKin" />
          <span>DopeKin</span>
        </div>
      </div>

      {/* Search Bar - Hidden on small screens */}
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

      {/* Tokens Controls (Rendered on mobile right side matching Reference Image 2) */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/pricing')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 hover:border-[var(--y)] hover:bg-zinc-900 text-xs font-bold cursor-pointer transition-all shadow-md select-none"
          title="Tokens Balance"
        >
          <Wallet className="w-3.5 h-3.5 text-[var(--y)]" />
          <span className="text-[#f5f5f5]">{userTokens} Tokens</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--y)]" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
