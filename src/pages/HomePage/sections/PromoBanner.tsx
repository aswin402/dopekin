import { useState, useEffect } from 'react';
import type { TouchEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const newCompanionBanner = new URL('../../../assets/banner/new_companion_banner.webp', import.meta.url).href;
const hotFeedBanner = new URL('../../../assets/banner/hot_feed_banner.webp', import.meta.url).href;
const tokenPlanBanner = new URL('../../../assets/banner/token_plan_banner.webp', import.meta.url).href;

const BANNERS = [
  {
    id: 'new-companion',
    image: newCompanionBanner,
    alt: 'Create & Meet New Companions',
    link: '/discover',
  },
  {
    id: 'hot-feed',
    image: hotFeedBanner,
    alt: 'Trending Social Feed',
    link: '/feed',
  },
  {
    id: 'token-plan',
    image: tokenPlanBanner,
    alt: 'Token Top-Up Plans & Offers',
    link: '/pricing',
  },
];

export function PromoBanner() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Swipe / Drag support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

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
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleMouseDown = (e: MouseEvent) => {
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
      if (distance > minSwipeDistance) {
        nextSlide();
      } else if (distance < -minSwipeDistance) {
        prevSlide();
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleBannerClick = (link: string) => {
    navigate(link);
  };

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
      className="group relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 select-none cursor-pointer bg-zinc-950"
    >
      {/* Banner Images Carousel */}
      <div className="relative w-full aspect-[2.1/1] sm:aspect-[2.4/1] md:aspect-[2.75/1] lg:aspect-[2.85/1] overflow-hidden bg-zinc-950">
        {BANNERS.map((banner, idx) => (
          <div
            key={banner.id}
            onClick={() => handleBannerClick(banner.link)}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              currentIndex === idx ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Full Width Edge-to-Edge Banner Graphic */}
            <img
              src={banner.image}
              alt={banner.alt}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrow Controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:border-[var(--y)] hover:text-[var(--y)] hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:border-[var(--y)] hover:text-[var(--y)] hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx ? 'w-5 bg-[var(--y)]' : 'w-1.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PromoBanner;
