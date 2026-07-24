import { Link, useNavigate } from 'react-router-dom';
import type { Twin } from '../../../types/twin';
import { useAppStore } from '../../../store/useAppStore';

export interface FavoritesRowProps {
  favorites?: string[];
  twins?: Twin[];
}

export function FavoritesRow({ favorites: favoritesProp, twins: twinsProp }: FavoritesRowProps) {
  const navigate = useNavigate();
  const storeTwins = useAppStore((state) => state.twins);
  const twins = twinsProp || storeTwins;
  const favorites = favoritesProp ?? ['vale', 'rina', 'aiko'];

  const getTwin = (id: string) => twins.find((t) => t.id === id) || twins[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
          Your Favorites
        </h3>
        <span
          className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer font-mono"
          onClick={() => navigate('/discover?filter=favorites')}
        >
          View all
        </span>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {favorites.map((favId) => {
          const twin = getTwin(favId);
          if (!twin) return null;
          return (
            <Link
              key={favId}
              to={`/chat?twin=${favId}`}
              className="flex flex-col items-center gap-2.5 group cursor-pointer shrink-0"
            >
              <div className="relative w-28 h-28 rounded-full p-[4px] bg-zinc-900 border border-white/5 group-hover:bg-[var(--y)] group-hover:border-[var(--y)] transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(255,231,1,0.35)]">
                <img
                  src={twin.avatarUrl}
                  alt={twin.name}
                  className="w-full h-full rounded-full object-cover border-2 border-black"
                />
                <span className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full border-2 border-black shadow-md" />
              </div>
              <span className="text-xs md:text-sm text-zinc-300 font-extrabold group-hover:text-white tracking-wide transition-colors mt-1.5 truncate max-w-[7rem]">
                {twin.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritesRow;
