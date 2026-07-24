import { useState, useMemo, useEffect, TouchEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Play, MessageSquare, ChevronRight } from 'lucide-react';
import type { Twin } from '../../../types/twin';
import { useAppStore } from '../../../store/useAppStore';

export interface PromoBannerProps {
  twins?: Twin[];
}

export function PromoBanner({ twins: twinsProp }: PromoBannerProps) {
  const navigate = useNavigate();
  const storeTwins = useAppStore((state) => state.twins);
  const twins = twinsProp || storeTwins;

  const getTwin = (id: string) => twins.find((t) => t.id === id) || twins[0];

  const banners = useMemo(
    () => [
      {
        id: 'special-offers',
        tag: 'SPECIAL OFFER',
        tagClass: 'bg-amber-500 text-black font-extrabold',
        title: 'UNLOCK',
        highlightText: 'VIP PASS',
        description:
          'Get unlimited messaging, priority access to new companion releases, and custom photo generation.',
        btnText: 'Claim 50% Off',
        btnIcon: <Sparkles className="w-3.5 h-3.5 fill-current" />,
        bgGradient:
          'bg-gradient-to-r from-amber-950/70 via-yellow-950/40 to-zinc-950',
        radialGradient:
          'radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.15), transparent 45%)',
        twinIds: ['vale', 'cody', 'serena'],
        action: () => navigate('/pricing'),
      },
      {
        id: 'new-release',
        tag: 'NEW RELEASE',
        tagClass: 'bg-rose-500 text-white animate-pulse-glow',
        title: 'CYBERPUNK',
        highlightText: 'SUMMER',
        description:
          'Step into the neon metropolis and watch your favorite twins interact in autonomous mini-episodes.',
        btnText: 'Watch Now',
        btnIcon: <Play className="w-3.5 h-3.5 fill-current" />,
        bgGradient:
          'bg-gradient-to-r from-purple-900/60 via-pink-900/50 to-zinc-950',
        radialGradient:
          'radial-gradient(circle at 70% 30%, rgba(255, 235, 31, 0.15), transparent 45%)',
        twinIds: ['serena', 'sarang', 'aiko'],
        action: () => navigate('/feed'),
      },
      {
        id: 'trending',
        tag: 'TRENDING NOW',
        tagClass: 'bg-indigo-500 text-white font-extrabold',
        title: 'MEET THE RISING',
        highlightText: 'STARS',
        description:
          'Interact with the most active and highly rated digital twins of the week. Find your perfect connection.',
        btnText: 'Chat Now',
        btnIcon: <MessageSquare className="w-3.5 h-3.5 fill-current" />,
        bgGradient:
          'bg-gradient-to-r from-indigo-900/60 via-blue-950/50 to-zinc-950',
        radialGradient:
          'radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.15), transparent 45%)',
        twinIds: ['sarang', 'aiko', 'serena'],
        action: () => navigate('/explore'),
      },
      {
        id: 'trending-feed',
        tag: 'TRENDING FEED',
        tagClass: 'bg-emerald-500 text-black font-extrabold',
        title: 'HOT ON THE',
        highlightText: 'FEED',
        description:
          'Stay updated with selfies, diaries, and stories shared directly by the twins on the community feed.',
        btnText: 'Explore Feed',
        btnIcon: <ChevronRight className="w-3.5 h-3.5" />,
        bgGradient:
          'bg-gradient-to-r from-teal-900/60 via-emerald-950/50 to-zinc-950',
        radialGradient:
          'radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.15), transparent 45%)',
        twinIds: ['aiko', 'vale', 'sarang'],
        action: () => navigate('/feed'),
      },
    ],
    [navigate]
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // Swipe gesture tracking (touch and mouse drag)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setSlideDirection('next');
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    } else if (isRightSwipe) {
      setSlideDirection('prev');
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleMouseDown = (e: MouseEvent) => {
    // Avoid triggering swipe/drag if clicking interactive elements like buttons
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (touchStart !== null) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        setSlideDirection('next');
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      } else if (isRightSwipe) {
        setSlideDirection('prev');
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentSlide, isHovered, banners.length]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="group relative w-full rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[3/1] lg:aspect-[4/1] border border-white/10 shadow-2xl transition-all duration-700 ease-in-out select-none cursor-grab active:cursor-grabbing"
    >
      {/* Layered background gradients for smooth cross-fading */}
      {banners.map((banner, index) => (
        <div
          key={`bg-${banner.id}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${banner.bgGradient} ${
            currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      ))}

      {/* Layered radial glow overlays for smooth cross-fading */}
      {banners.map((banner, index) => (
        <div
          key={`glow-${banner.id}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: banner.radialGradient,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10" />

      {/* Content Wrapper for Left Text */}
      <div
        key={`text-${currentSlide}`}
        className={`absolute inset-y-0 left-6 sm:left-12 flex flex-col justify-center gap-2 max-w-[85%] sm:max-w-md z-20 pointer-events-none ${
          slideDirection === 'next' ? 'animate-scroll-next-text' : 'animate-scroll-prev-text'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${banners[currentSlide].tagClass}`}
          >
            {banners[currentSlide].tag}
          </span>
          <span className="text-[10px] text-zinc-400 font-bold tracking-wider font-mono">
            DOPEKIN SPECIALS
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black uppercase text-white leading-none tracking-tight">
          {banners[currentSlide].title}{' '}
          <span className="text-[var(--y)]">{banners[currentSlide].highlightText}</span>
        </h2>
        <p className="text-xs text-zinc-400 leading-snug line-clamp-2 max-w-xs sm:max-w-sm">
          {banners[currentSlide].description}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            banners[currentSlide].action();
          }}
          className="mt-2 w-fit h-9 px-5 rounded-full bg-[var(--y)] text-[var(--blk)] font-bold text-xs uppercase tracking-wider shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[0.5px] transition-transform border border-black flex items-center gap-1.5 cursor-pointer pointer-events-auto"
        >
          {banners[currentSlide].btnIcon}
          <span>{banners[currentSlide].btnText}</span>
        </button>
      </div>

      {/* Three portrait overlays from screenshot */}
      <div
        key={`images-${currentSlide}`}
        className={`absolute right-0 top-0 bottom-0 w-1/2 hidden sm:flex items-center justify-end pr-10 pointer-events-none overflow-hidden opacity-85 z-10 ${
          slideDirection === 'next' ? 'animate-scroll-next-images' : 'animate-scroll-prev-images'
        }`}
      >
        <div className="flex gap-4 transform rotate-12 translate-x-12 translate-y-6">
          {banners[currentSlide].twinIds.map((id, i) => {
            const twin = getTwin(id);
            return (
              <div
                key={id}
                className="w-24 h-36 lg:w-28 lg:h-40 rounded-xl overflow-hidden border border-white/20 shadow-2xl relative shrink-0 transition-transform duration-500 hover:scale-105"
                style={{ transform: `translateY(${i * -12}px)` }}
              >
                <img
                  src={twin?.avatarUrl}
                  alt=""
                  draggable="false"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide Indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              if (index !== currentSlide) {
                setSlideDirection(index > currentSlide ? 'next' : 'prev');
                setCurrentSlide(index);
              }
            }}
            className={`relative h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index ? 'w-6 bg-[var(--y)]' : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PromoBanner;
