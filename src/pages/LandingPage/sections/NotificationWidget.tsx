import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NOTIFICATION_CAMPAIGNS, SHOWCASE_TWINS } from '../constants';

export function NotificationWidget() {
  const [showNotificationText, setShowNotificationText] = useState(true);
  const [campaignIndex, setCampaignIndex] = useState(0);
  const [showFloatingWidget, setShowFloatingWidget] = useState(false);
  const [showWidgetBody, setShowWidgetBody] = useState(true);

  const notificationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startNotificationRotation = () => {
    if (notificationIntervalRef.current) clearInterval(notificationIntervalRef.current);
    notificationIntervalRef.current = setInterval(() => {
      setCampaignIndex((prev) => (prev + 1) % NOTIFICATION_CAMPAIGNS.length);
      setShowWidgetBody(true);
      setShowNotificationText(true);
    }, 12000);
  };

  const handleDecline = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowWidgetBody(false);
    setShowNotificationText(false);
    
    if (notificationIntervalRef.current) {
      clearInterval(notificationIntervalRef.current);
      notificationIntervalRef.current = null;
    }
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    notificationTimeoutRef.current = setTimeout(() => {
      setCampaignIndex((prev) => (prev + 1) % NOTIFICATION_CAMPAIGNS.length);
      setShowWidgetBody(true);
      setShowNotificationText(true);
      startNotificationRotation();
    }, 6000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingWidget(true);
      } else {
        setShowFloatingWidget(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    startNotificationRotation();
    return () => {
      if (notificationIntervalRef.current) clearInterval(notificationIntervalRef.current);
      if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
    };
  }, []);

  if (!showFloatingWidget || !showWidgetBody) {
    return null;
  }

  const campaign = NOTIFICATION_CAMPAIGNS[campaignIndex];
  const avatarImage = SHOWCASE_TWINS[campaignIndex]?.image;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
      {showNotificationText && (
        <div className="bg-black/90 border border-white/10 text-white p-3 rounded-2xl rounded-tr-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-start gap-1 backdrop-blur-md relative">
          {/* Close button */}
          <button 
            onClick={handleDecline}
            className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white/50 hover:text-white flex items-center justify-center text-[8px] cursor-pointer"
          >
            ✕
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[8px] font-mono font-bold text-red-500 tracking-wider uppercase">
              {campaign.title}
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-white/90 leading-tight font-medium pr-3 mt-0.5 max-w-[150px] text-left">
            {campaign.message}
          </p>
          <div className="flex gap-2 mt-1.5">
            <Link 
              to={campaign.link}
              className="text-[9px] font-mono font-bold bg-[var(--y)] hover:bg-[var(--y2)] text-black px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all"
            >
              {campaign.actionText}
            </Link>
            <button 
              onClick={handleDecline}
              className="text-[9px] font-mono font-bold bg-zinc-800 hover:bg-zinc-700 text-white/60 px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all cursor-pointer"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      {/* Circular Avatar Badge */}
      <Link 
        to={campaign.link}
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[var(--y)] bg-zinc-950 shadow-[0_0_20px_rgba(255,231,1,0.3)] hover:shadow-[0_0_30px_rgba(255,231,1,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer block group shrink-0"
      >
        <img 
          src={avatarImage} 
          alt={`${campaign.name} Avatar`} 
          className="w-full h-full rounded-full object-cover"
        />
        {/* Active call pulse border */}
        <div className="absolute inset-0 rounded-full border border-[var(--y)] animate-ping opacity-75 pointer-events-none" />

        {/* Red Notification Badge */}
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-md border border-zinc-950">
          1
        </div>
      </Link>
    </div>
  );
}
