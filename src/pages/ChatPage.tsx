import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import type { Message } from '../types/twin';
import { 
  Send, PhoneOff, Mic, MicOff, Video, VideoOff, 
  ArrowLeft, ShieldAlert, Sparkles, ChevronLeft, ChevronRight,
  Search, Users, Settings, Image as ImageIcon,
  X, Wallet, BadgeCheck, SlidersHorizontal, Check, Pin, MoreHorizontal,
  Phone, Star, Heart
} from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-1.007-.33.078-.656-.125-.734-.456-.078-.33.125-.657.456-.734 3.86-.882 7.15-.5 9.825 1.135.295.18.387.565.207.86zm1.224-2.72c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.076-1.183-.412.125-.843-.107-.968-.52-.125-.412.107-.843.52-.968 3.67-1.114 8.24-.567 11.338 1.338.367.226.487.707.26 1.074zm.106-2.833C14.738 8.87 9.5 8.7 6.463 9.62c-.48.146-.983-.13-1.13-.61-.146-.48.13-.983.61-1.13 3.5-1.06 9.27-.86 12.96 1.33.432.257.575.815.318 1.25-.257.432-.815.575-1.25.318z"/>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.387.51A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.862.51 9.387.51 9.387.51s7.524 0 9.387-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const AudioWavesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 10v4M6 6v12M9 3v18M12 7v10M15 5v14M18 8v8M21 11v2" />
  </svg>
);

const Sparkline = () => (
  <svg className="w-8 h-5 text-[var(--y)] ml-2 shrink-0 inline-block" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M2 18 L10 14 L18 16 L26 8 L34 10 L38 2" />
  </svg>
);

export function ChatPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const twins = useAppStore((state) => state.twins);
  const chats = useAppStore((state) => state.chats);
  const addMessage = useAppStore((state) => state.addMessage);
  const clearChat = useAppStore((state) => state.clearChat);
  const subscribedTwinIds = useAppStore((state) => state.subscribedTwinIds);
  const subscribeToTwin = useAppStore((state) => state.subscribeToTwin);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  const activeTwinId = searchParams.get('twin') || twins[0]?.id;
  const activeTwin = twins.find((t) => t.id === activeTwinId) || twins[0];

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Call states
  const [isCalling, setIsCalling] = useState(searchParams.get('call') === 'true');
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callSubtitle, setCallSubtitle] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const callTimerRef = useRef<any>(null);

  // Check if twin is locked by paywall
  const isLocked = activeTwin 
    ? activeTwin.price !== '$0.00 (Free)' && 
      activeTwin.price !== '$0.00' && 
      !subscribedTwinIds.includes(activeTwin.id)
    : false;

  // Sync calling parameter in URL
  useEffect(() => {
    const callParam = searchParams.get('call') === 'true';
    if (callParam !== isCalling) {
      setIsCalling(callParam);
    }
  }, [searchParams]);

  // Handle call timer
  useEffect(() => {
    if (isCalling && !isLocked && user) {
      setCallTime(0);
      setCallSubtitle("Hey there! It's so great to talk to you directly. What's on your mind today?");
      speakAnswer("Hey there! It's so great to talk to you directly. What's on your mind today?");
      
      callTimerRef.current = setInterval(() => {
        setCallTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      window.speechSynthesis?.cancel();
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      window.speechSynthesis?.cancel();
    };
  }, [isCalling, isLocked, activeTwinId, user]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeTwinId, isTyping]);

  // Reset carousel index when changing active twin
  useEffect(() => {
    setCarouselIndex(0);
  }, [activeTwinId]);

  // Voice synthesis helper
  const speakAnswer = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const femaleKeywords = ['female', 'google us english', 'samantha', 'zira', 'karen'];
        const maleKeywords = ['male', 'daniel', 'david', 'google uk english male'];
        
        const isMale = ['cody', 'carlos', 'ben', 'etherik'].includes(activeTwin?.id || '');
        const targetKeywords = isMale ? maleKeywords : femaleKeywords;
        
        const matchedVoice = voices.find(v => 
          targetKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
        );
        if (matchedVoice) utterance.voice = matchedVoice;
      }

      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLocked) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    addMessage(activeTwin.id, userMsg);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Hey! That is actually crazy you mention that. Tell me more!",
        "I've been working on some new projects lately. Let me know what you think!",
        "Wellness and focus start from within. Remember to take a deep breath today.",
        "The markets are absolutely wild today! Remember to HODL and stay sharp.",
        "Oh, wow! That is so funny. We should talk about this in our next video call!",
        "I love talking with you. You always bring such a great energy."
      ];
      
      let chosenText = responses[Math.floor(Math.random() * responses.length)];
      if (activeTwin.id === 'vale') chosenText = "I've been working on some new music tracks in the studio today. Let me know what you think!";
      if (activeTwin.id === 'serena') chosenText = "Wellness starts from within. Remember to take a deep breath today and release any tension.";
      if (activeTwin.id === 'cody') chosenText = "The crypto markets are wild today! Remember to HODL and stay sharp. What's your play?";
      if (activeTwin.id === 'carlos') chosenText = "That's exactly what I tell the crowd, except they usually throw tomatoes!";

      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        content: chosenText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      addMessage(activeTwin.id, aiMsg);
      setIsTyping(false);

      if (isCalling) {
        setCallSubtitle(chosenText);
        speakAnswer(chosenText);
      }
    }, 1500);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleCallStart = () => {
    setSearchParams((prev) => {
      prev.set('call', 'true');
      return prev;
    });
  };

  const handleCallEnd = () => {
    setSearchParams((prev) => {
      prev.delete('call');
      return prev;
    });
    setIsCalling(false);
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear chat history with this twin?")) {
      clearChat(activeTwin.id);
    }
  };

  const currentChats = chats[activeTwin?.id] || [];

  // Filter twins by search text
  const filteredTwins = twins.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.profession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] flex border border-[var(--border)] rounded-2xl bg-black overflow-hidden animate-fade-up relative">
      
      {/* Login Wallet Modal Overlay */}
      {!user && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 md:p-10 rounded-[32px] bg-zinc-950 border border-white/10 flex flex-col items-center text-center gap-6 shadow-[0_0_50px_rgba(255,231,1,0.15)] animate-in zoom-in-95 duration-200">
            {/* Logo Badge */}
            <div className="w-16 h-16 rounded-full bg-black border border-[var(--y)] flex items-center justify-center shadow-[0_0_15px_rgba(255,231,1,0.2)]">
              <span className="font-heading font-black text-2xl text-[var(--y)]">W</span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xl md:text-2xl font-heading font-black uppercase text-white tracking-tight">
                Connect Your Wallet
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 font-body leading-relaxed max-w-xs mx-auto">
                Connect your AppKit wallet to DopaMint to continue and check your reward eligibility.
              </p>
            </div>

            {/* Connect button */}
            <button
              onClick={() => {
                setUser({ name: 'Aswin Dope', email: 'aswin@celestialabs.com' });
              }}
              className="mt-2 w-full py-3.5 px-6 rounded-2xl bg-[var(--y)] text-black font-extrabold uppercase text-xs md:text-sm tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. Left Twin List Panel */}
      <div className="w-80 border-r border-[var(--border)] flex flex-col bg-black shrink-0 hidden md:flex">
        {/* Panel Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-lg font-heading font-black text-white uppercase tracking-wider">Messages</span>
          <button 
            onClick={() => alert("Group creation coming soon!")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 hover:border-[var(--y)] hover:text-[var(--y)] text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer active:scale-95"
          >
            <Users className="w-3.5 h-3.5" />
            <span>New Group</span>
          </button>
        </div>

        {/* Search profile input */}
        <div className="p-3 border-b border-white/5 flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search people or groups..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 focus:outline-none focus:border-[var(--y)] focus:bg-zinc-900 transition-all font-body"
            />
          </div>
          <button 
            onClick={() => alert("Filters coming soon!")}
            className="p-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white transition-all cursor-pointer active:scale-95 shrink-0"
            title="Filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {filteredTwins.map((twin) => {
            const isActive = twin.id === activeTwinId;
            const messages = chats[twin.id] || [];
            const lastMsg = messages[messages.length - 1];
            
            // Mock unread count and times to match layout 2
            let unreadCount = 0;
            let lastMsgTime = "7:53 PM";
            if (twin.id === 'vale') {
              unreadCount = 2;
              lastMsgTime = "7:53 PM";
            } else if (twin.id === 'serena') {
              unreadCount = 1;
              lastMsgTime = "7:40 PM";
            } else if (twin.id === 'aiko') {
              lastMsgTime = "7:28 PM";
            } else if (twin.id === 'cody') {
              lastMsgTime = "7:10 PM";
            } else if (twin.id === 'sarang') {
              lastMsgTime = "6:55 PM";
            } else if (twin.id === 'carlos') {
              lastMsgTime = "6:42 PM";
            } else if (twin.id === 'ben') {
              lastMsgTime = "6:30 PM";
            } else if (twin.id === 'rina') {
              lastMsgTime = "6:18 PM";
            } else if (twin.id === 'etherik') {
              lastMsgTime = "6:05 PM";
            }

            return (
              <button
                key={twin.id}
                onClick={() => setSearchParams({ twin: twin.id })}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-zinc-900 border border-[var(--border2)] shadow-[var(--brutal)]' 
                    : 'bg-transparent border border-transparent hover:bg-white/5'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={twin.avatarUrl} alt={twin.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#f5f5f5] text-sm truncate flex items-center gap-1">
                      <span>{twin.name}</span>
                      <BadgeCheck className="w-3.5 h-3.5 text-[var(--y)] fill-black shrink-0" />
                    </span>
                    <span className={`text-[9px] font-mono shrink-0 ${unreadCount > 0 ? 'text-[var(--y)] font-bold' : 'text-white/30'}`}>
                      {lastMsgTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center min-w-0">
                    <p className="text-xs text-[#f5f5f5]/65 truncate">
                      {lastMsg ? lastMsg.content : `${twin.profession} · ${twin.vibe}`}
                    </p>
                    {unreadCount > 0 ? (
                      <span className="w-5 h-5 rounded-full bg-[var(--y)] text-black text-[10px] font-black flex items-center justify-center shrink-0 ml-2">
                        {unreadCount}
                      </span>
                    ) : (
                      <span className="text-white/20 shrink-0 ml-2">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Middle Workspace Panel */}
      <div className="flex-1 flex flex-col bg-black relative">
        
        {/* Chat Header */}
        <div className="h-14 border-b border-[var(--border)] px-4 flex items-center justify-between bg-black shrink-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile back trigger */}
            <button 
              onClick={() => navigate('/explore')} 
              className="md:hidden p-1 text-[#f5f5f5]/70 hover:text-white rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative">
              <img src={activeTwin?.avatarUrl} alt={activeTwin?.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse" />
            </div>
            <div className="min-w-0 flex flex-col items-start">
              <span className="font-bold text-sm truncate text-[#f5f5f5] flex items-center gap-1">
                <span>{activeTwin?.name}</span>
                <BadgeCheck className="w-3.5 h-3.5 text-[var(--y)] fill-black shrink-0" />
              </span>
              <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Online</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-zinc-400">
            <button
              onClick={handleCallStart}
              className="hover:text-white hover:scale-105 transition-all cursor-pointer"
              title="Video Call"
            >
              <Video className="w-5 h-5" />
            </button>
            <button
              onClick={handleCallStart}
              className="hover:text-[var(--y)] hover:scale-105 transition-all cursor-pointer"
              title="Voice Call"
            >
              <Phone className="w-5 h-5 text-zinc-400 hover:text-[var(--y)]" />
            </button>
            <button
              onClick={() => alert("Pinned chats")}
              className="hover:text-white transition-colors cursor-pointer"
              title="Pin Chat"
            >
              <Pin className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={handleClear}
              className="hover:text-white transition-colors cursor-pointer"
              title="Clear chat history"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message feed / Locked paywall */}
        {isLocked ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md w-full p-8 rounded-2xl bg-black border-2 border-[var(--border2)] text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[var(--y)]" />
              <div className="w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-[var(--y)] mb-2">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-heading font-black uppercase text-[var(--y)]">FaceTime Gated</h3>
                <p className="text-sm text-[#f5f5f5]/70 leading-relaxed font-body">
                  FaceTime calls and real-time voice synthesis are locked for this premium digital twin. Subscribe to unlock full conversation capabilities.
                </p>
              </div>
              <button 
                onClick={() => {
                  subscribeToTwin(activeTwin.id);
                  alert(`Successfully subscribed to ${activeTwin.name}! Unlocking full capabilities...`);
                }}
                className="w-full py-4 rounded-xl bg-[var(--y)] text-[var(--blk)] font-extrabold uppercase text-sm tracking-wider shadow-[var(--brutal)] hover:translate-y-[-2px] transition-transform border-2 border-[var(--blk)] cursor-pointer"
              >
                Subscribe for {activeTwin.price}
              </button>
              <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Premium Creator Clone</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {currentChats.length > 0 ? (
              currentChats.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div 
                    key={msg.id}
                    className={`flex flex-col max-w-[75%] gap-1 ${
                      isUser ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    <div 
                      className={`px-4 py-2.5 text-sm leading-relaxed ${
                        isUser 
                          ? 'bg-[var(--y)] text-[var(--blk)] font-semibold rounded-[16px_16px_4px_16px] shadow-[2px_2px_0_rgba(255,231,1,0.15)]'
                          : 'bg-zinc-900/90 text-[#f5f5f5] rounded-[16px_16px_16px_4px] border border-white/5'
                      }`}
                    >
                      {msg.content}
                    </div>
                    
                    {/* Timestamp with Audio waveform lines for Twin messages */}
                    <div className="flex items-center gap-1.5 mt-0.5 px-1">
                      {!isUser && <AudioWavesIcon className="text-[var(--y)] w-3.5 h-3.5 shrink-0" />}
                      <span className="text-[9px] text-[#f5f5f5]/30 font-mono">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                <div className="p-4 rounded-full bg-zinc-900/20 border border-[var(--y)]/10 animate-pulse mb-1">
                  <Sparkles className="w-10 h-10 text-[var(--y)]" />
                </div>
                <h3 className="font-heading font-black uppercase text-base text-[#f5f5f5] tracking-wide">
                  Beginning of communication
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs mt-1">
                  Send a text message or launch a FaceTime call to train the avatar.
                </p>

                {/* Pre-defined action buttons */}
                <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-md">
                  <button 
                    onClick={() => setInputText("👋 Wave hello")}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-300 hover:text-white hover:border-[var(--y)]/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:bg-zinc-800"
                  >
                    <span>👋</span>
                    <span>Wave hello</span>
                  </button>
                  <button 
                    onClick={() => setInputText("🎵 Share a song")}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-300 hover:text-white hover:border-[var(--y)]/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:bg-zinc-800"
                  >
                    <span>🎵</span>
                    <span>Share a song</span>
                  </button>
                  <button 
                    onClick={handleCallStart}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-300 hover:text-white hover:border-[var(--y)]/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:bg-zinc-800"
                  >
                    <span>📹</span>
                    <span>Video call</span>
                  </button>
                  <button 
                    onClick={() => setInputText("🎙️ Voice message")}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-300 hover:text-white hover:border-[var(--y)]/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:bg-zinc-800"
                  >
                    <span>🎙️</span>
                    <span>Voice message</span>
                  </button>
                </div>
              </div>
            )}

            {isTyping && (
              <div className="self-start flex flex-col gap-1 items-start max-w-[70%]">
                <div className="bg-zinc-900 border border-white/5 px-4 py-3 rounded-[16px_16px_16px_4px] flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[var(--y)] animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 rounded-full bg-[var(--y)] animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-[var(--y)] animate-bounce" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Message Input controls (Replica of the user's uploaded layout) */}
        {!isLocked && (
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border)] bg-black shrink-0 flex flex-col gap-3">
            <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-3 flex flex-col gap-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <textarea
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                className="w-full bg-transparent text-sm text-[#f5f5f5] placeholder-[#f5f5f5]/30 focus:outline-none resize-none min-h-[50px] font-body"
              />
              
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <span>Show me the scene:</span>
                  <button
                    type="button"
                    onClick={() => setInputText("Generate an image of you right now!")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-950 text-zinc-300 hover:bg-[var(--y)] hover:text-black hover:border-black border border-white/5 text-[10px] font-bold transition-all cursor-pointer"
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputText("Show me a short video clip!")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-950 text-zinc-300 hover:bg-[var(--y)] hover:text-black hover:border-black border border-white/5 text-[10px] font-bold transition-all cursor-pointer"
                  >
                    <Video className="w-3 h-3" />
                    <span>Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Opening settings...")}
                    className="p-1 rounded-full bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer border border-white/5"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert("Emojis list coming soon!")}
                    className="p-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    title="Insert Emoji"
                  >
                    <span className="text-lg">😊</span>
                  </button>
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="w-9 h-9 rounded-full bg-[var(--y)] text-[var(--blk)] flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed transition-all cursor-pointer border border-black shadow-[1px_1px_0px_rgba(255,231,1,0.5)] shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* 3. FaceTime Video Overlay (Triggered by isCalling && !isLocked) */}
        {isCalling && !isLocked && user && (
          <div className="absolute inset-0 bg-black z-50 flex flex-col justify-between p-6 animate-zoom-in">
            {/* Header info */}
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <img src={activeTwin?.avatarUrl} alt={activeTwin?.name} className="w-11 h-11 rounded-full object-cover border border-white/20" />
                <div className="flex flex-col">
                  <h3 className="text-[#f5f5f5] font-heading font-black uppercase text-base">{activeTwin?.name}</h3>
                  <span className="text-[10px] text-white/50 tracking-widest font-mono">FACETIME CONNECTED</span>
                </div>
              </div>
              <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg font-mono text-xs font-semibold text-[var(--y)] border border-[var(--y)]/20 shadow-lg">
                {formatTime(callTime)}
              </div>
            </div>

            {/* Main Video feed Area */}
            <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden bg-zinc-950">
              <div className="absolute inset-0 bg-radial-gradient(var(--y)/5% 50% 50% 50%) opacity-30 pointer-events-none" />
              {isVideoOff ? (
                <div className="flex flex-col items-center gap-4 text-[#f5f5f5]/30">
                  <VideoOff className="w-16 h-16" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Avatar Video Disabled</span>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={activeTwin?.avatarUrl} 
                    alt="Active Video" 
                    className="w-full h-full object-cover max-w-3xl"
                  />
                  {window.speechSynthesis?.speaking && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                      <div className="flex gap-1.5 mt-auto mb-20 animate-pulse">
                        <span className="w-1 bg-[var(--y)] h-6 animate-bounce" />
                        <span className="w-1 bg-[var(--y)] h-10 animate-bounce [animation-delay:-0.2s]" />
                        <span className="w-1 bg-[var(--y)] h-8 animate-bounce [animation-delay:-0.4s]" />
                        <span className="w-1 bg-[var(--y)] h-12 animate-bounce [animation-delay:-0.1s]" />
                        <span className="w-1 bg-[var(--y)] h-6 animate-bounce" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Subtitle / spoken text bar */}
            {callSubtitle && (
              <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-center text-xs md:text-sm text-[#f5f5f5] z-10 leading-relaxed font-body shadow-2xl">
                {callSubtitle}
              </div>
            )}

            {/* Controls panel */}
            <div className="flex justify-center items-center gap-4 z-10">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border border-white/15 cursor-pointer ${
                  isMuted ? 'bg-red-500/85 text-white' : 'bg-black/60 hover:bg-black/80 text-[#f5f5f5]'
                }`}
                title={isMuted ? "Unmute Mic" : "Mute Mic"}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={handleCallEnd}
                className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-black"
                title="End Call"
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border border-white/15 cursor-pointer ${
                  isVideoOff ? 'bg-red-500/85 text-white' : 'bg-black/60 hover:bg-black/80 text-[#f5f5f5]'
                }`}
                title={isVideoOff ? "Enable Video" : "Disable Video"}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
            </div>

            {/* Small User Webcam PiP */}
            {!isMuted && (
              <div className="absolute bottom-6 right-6 w-24 h-32 bg-zinc-900 border-2 border-[var(--y)] rounded-xl overflow-hidden shadow-2xl hidden sm:block">
                <div className="absolute inset-0 bg-radial-gradient(var(--y)/5% 50% 50% 50%) opacity-30 pointer-events-none" />
                <div className="w-full h-full flex items-center justify-center text-[10px] text-white/40 uppercase font-mono font-semibold">
                  You
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* 3. Right Profile Sidebar (Replica of the user's uploaded layout) */}
      {showProfile && (
        <div className="w-80 border-l border-[var(--border)] bg-black shrink-0 flex flex-col overflow-y-auto p-4 z-20 absolute inset-y-0 right-0 md:relative md:flex animate-in slide-in-from-right duration-300">
          
          {/* Close button overlay for mobile/small screens */}
          <div className="flex md:hidden justify-between items-center mb-4 border-b border-white/5 pb-2">
            <span className="text-xs font-mono font-black uppercase text-zinc-500">Twin Profile</span>
            <button 
              onClick={() => setShowProfile(false)}
              className="p-1 text-zinc-400 hover:text-white rounded-lg bg-zinc-950 border border-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Carousel Display */}
          <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden group rounded-2xl border border-white/5 shadow-2xl">
            {carouselIndex === 0 ? (
              <img 
                src={activeTwin?.avatarUrl} 
                alt={activeTwin?.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-103" 
              />
            ) : activeTwin?.videoUrl ? (
              <video 
                src={activeTwin?.videoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500">
                <Video className="w-10 h-10 mb-2 opacity-50 text-[var(--y)]" />
                <span className="text-[9px] font-bold uppercase tracking-wider font-mono">No video training file</span>
              </div>
            )}
            
            {/* Carousel Navigation Arrows */}
            <button 
              type="button"
              onClick={() => setCarouselIndex(0)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-[#f5f5f5] flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer z-10 hover:border-[var(--y)]/30 active:scale-90"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button 
              type="button"
              onClick={() => setCarouselIndex(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-[#f5f5f5] flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer z-10 hover:border-[var(--y)]/30 active:scale-90"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>

            {/* V2.0 Badge - Top Left */}
            <div className="absolute top-3 left-3 bg-[#e4e4e7]/10 text-white backdrop-blur-md text-[9px] font-black px-2 py-0.5 rounded-md border border-white/10 uppercase tracking-wider z-10">
              v2.0
            </div>

            {/* Heart Favorite Trigger - Top Right */}
            <button 
              type="button"
              onClick={() => alert("Added to favorites!")}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-yellow-400 hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer z-10"
            >
              <Heart className="w-4 h-4" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 px-2.5 py-1 rounded-full border border-white/5 backdrop-blur-[2px]">
              <span className={`w-1.5 h-1.5 rounded-full transition-all ${carouselIndex === 0 ? 'bg-[var(--y)] w-3' : 'bg-white/30'}`} />
              <span className={`w-1.5 h-1.5 rounded-full transition-all ${carouselIndex === 1 ? 'bg-[var(--y)] w-3' : 'bg-white/30'}`} />
            </div>
          </div>

          {/* Twin Details info */}
          <div className="mt-4 flex flex-col gap-1.5 text-left">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-black text-xl text-white tracking-tight uppercase flex items-center gap-1">
                <span>{activeTwin?.name}</span>
                <BadgeCheck className="w-4.5 h-4.5 text-[var(--y)] fill-black shrink-0" />
              </h3>
              <span className="text-[10px] text-emerald-500 font-mono font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ONLINE</span>
              </span>
            </div>
            
            <p className="text-xs text-[var(--y)] font-mono font-bold">
              {activeTwin?.profession} • {activeTwin?.vibe}
            </p>
            
            <p className="text-xs text-zinc-400 font-body leading-relaxed mt-1">
              {activeTwin?.bio}
            </p>

            {/* Social media connections */}
            <div className="flex gap-2.5 mt-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 hover:border-[var(--y)] hover:text-[var(--y)] flex items-center justify-center text-zinc-400 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(255,231,1,0.15)]"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 hover:border-[var(--y)] hover:text-[var(--y)] flex items-center justify-center text-zinc-400 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(255,231,1,0.15)]"
              >
                <TiktokIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://spotify.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 hover:border-[var(--y)] hover:text-[var(--y)] flex items-center justify-center text-zinc-400 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(255,231,1,0.15)]"
              >
                <SpotifyIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 hover:border-[var(--y)] hover:text-[var(--y)] flex items-center justify-center text-zinc-400 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(255,231,1,0.15)]"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Dynamic About Me fields */}
          <div className="border-t border-white/5 pt-5 mt-5 flex flex-col gap-4 text-left">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-mono font-black uppercase text-zinc-500 tracking-wider">
                About me
              </h4>
              <button 
                onClick={() => alert("About details expanded")}
                className="text-[10px] font-mono font-bold text-[var(--y)] hover:underline cursor-pointer"
              >
                View all &gt;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 font-body">
              <div className="p-3 bg-zinc-900/40 border border-white/5 rounded-xl flex flex-col gap-0.5 text-left">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wide">Profession</span>
                <span className="text-xs font-extrabold text-[#f5f5f5] truncate">{activeTwin?.profession}</span>
              </div>
              <div className="p-3 bg-zinc-900/40 border border-white/5 rounded-xl flex flex-col gap-0.5 text-left">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wide">Vibe</span>
                <span className="text-xs font-extrabold text-[var(--y)] truncate">{activeTwin?.vibe}</span>
              </div>
              <div className="p-3 bg-zinc-900/40 border border-white/5 rounded-xl flex flex-col gap-0.5 text-left relative overflow-hidden">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wide">Fans/Reach</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#f5f5f5] truncate">{activeTwin?.fans}</span>
                  <Sparkline />
                </div>
              </div>
              <div className="p-3 bg-zinc-900/40 border border-white/5 rounded-xl flex flex-col gap-0.5 text-left">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wide">Tier</span>
                <span className="text-xs font-extrabold text-[#f5f5f5] truncate">{activeTwin?.price}</span>
              </div>
            </div>

            {/* Train Avatar Action Button */}
            <button
              onClick={() => alert(`Starting training simulation for ${activeTwin?.name}'s AI model...`)}
              className="mt-4 w-full py-3 rounded-2xl bg-[var(--y)] text-black font-extrabold uppercase text-xs md:text-sm tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Train Avatar</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default ChatPage;
