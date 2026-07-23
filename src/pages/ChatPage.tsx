import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import type { Message } from '../types/twin';
import { 
  PhoneCall, PhoneOff, Mic, MicOff, Video, VideoOff, 
  ArrowLeft, ShieldAlert, Sparkles, PanelRight, Users, 
  X, Wallet, MessageSquare, Maximize2, Minimize2
} from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function ChatPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const twins = useAppStore((state) => state.twins);
  const chats = useAppStore((state) => state.chats);
  const addMessage = useAppStore((state) => state.addMessage);
  const subscribedTwinIds = useAppStore((state) => state.subscribedTwinIds);
  const subscribeToTwin = useAppStore((state) => state.subscribeToTwin);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  const activeTwinId = searchParams.get('twin') || twins[0]?.id;
  const activeTwin = twins.find((t) => t.id === activeTwinId) || twins[0];

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [showChatList, setShowChatList] = useState(false);
  const [showChatOverlay, setShowChatOverlay] = useState(false);
  
  // Call states
  const [isCalling, setIsCalling] = useState(searchParams.get('call') === 'true');
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callSubtitle, setCallSubtitle] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Listen for fullscreen change events to update react state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

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

  const toggleFullscreen = () => {
    const element = document.getElementById('video-call-container');
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Error entering fullscreen mode:", err);
        // Class-based fallback toggle
        setIsFullscreen(!isFullscreen);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const currentChats = chats[activeTwin?.id] || [];

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-screen flex bg-black overflow-hidden relative">
      
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
      {showChatList && (
        <div className="w-80 border-r border-zinc-900 flex flex-col bg-black shrink-0 z-20 absolute inset-y-0 left-0 md:relative md:flex animate-in slide-in-from-left duration-300">
          {/* Panel Header */}
          <div className="p-4 border-b border-zinc-900 flex items-center justify-between">
            <span className="text-lg font-heading font-black text-white uppercase tracking-wider">Chat</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert("Group creation coming soon!")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 hover:border-[var(--y)] hover:text-[var(--y)] text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer active:scale-95"
              >
                <Users className="w-3.5 h-3.5" />
                <span>New Group</span>
              </button>
              <button 
                onClick={() => setShowChatList(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-white/5 cursor-pointer hover:border-zinc-700 transition-colors"
                title="Hide Chat List"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
            {twins.map((twin) => {
              const isActive = twin.id === activeTwinId;
              const messages = chats[twin.id] || [];
              const lastMsg = messages[messages.length - 1];
              return (
                <button
                  key={twin.id}
                  onClick={() => setSearchParams({ twin: twin.id })}
                  className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-zinc-900/60 border-l-2 border-[var(--y)]' 
                      : 'bg-transparent border-l-2 border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={twin.avatarUrl} alt={twin.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#f5f5f5] text-sm truncate">{twin.name}</span>
                      <span className="text-[9px] text-white/30 font-mono shrink-0">7:53PM</span>
                    </div>
                    <p className="text-xs text-[#f5f5f5]/65 truncate">
                      {lastMsg ? lastMsg.content : `${twin.profession} · ${twin.vibe}`}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Middle Workspace Panel (Interactive Video Panel) */}
      <div className="flex-1 flex flex-col bg-zinc-950 relative overflow-hidden">
        
        {/* Header */}
        <div className="h-14 border-b border-zinc-900 px-4 flex items-center justify-between bg-black shrink-0 z-10 font-body">
          <div className="flex items-center gap-2 text-white lg:pl-3">
            <button 
              onClick={() => navigate('/explore')} 
              className="md:hidden p-1 text-zinc-400 hover:text-white rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm tracking-wide text-[#f5f5f5]">{activeTwin?.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/create')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-extrabold uppercase border border-white/5 transition-all cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--y)]" />
              <span>Create Twin</span>
            </button>
            <button
              onClick={() => setShowChatList(!showChatList)}
              className={`p-2 hover:bg-zinc-900 rounded-lg transition-all cursor-pointer ${showChatList ? 'text-[var(--y)] bg-zinc-900' : 'text-zinc-400'}`}
              title="Toggle Chat List"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className={`p-2 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer ${showProfile ? 'text-[var(--y)]' : 'text-zinc-400'}`}
              title="Toggle Profile Sidebar"
            >
              <PanelRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Locked paywall overlay */}
        {isLocked ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-black z-10 animate-fade-in">
            <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-950 border border-white/5 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
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
                className="w-full py-4 rounded-2xl bg-[var(--y)] text-[var(--blk)] font-extrabold uppercase text-sm tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform border-2 border-[var(--blk)] cursor-pointer"
              >
                Subscribe for {activeTwin.price}
              </button>
              <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Premium Creator Clone</span>
            </div>
          </div>
        ) : (
          /* Main Interactive Video Area */
          <div className="flex-1 bg-zinc-950 relative flex flex-col justify-between overflow-hidden p-4 md:p-6">
            
            {/* Landscape Screen container for Desktop/Tab */}
            <div className="flex-1 flex items-center justify-center h-full w-full">
              <div 
                id="video-call-container"
                className={`w-full transition-all duration-300 relative overflow-hidden bg-black flex flex-col justify-between border border-white/5 ${
                  isFullscreen 
                    ? 'fixed inset-0 max-w-none h-full w-full rounded-none border-none z-50' 
                    : 'aspect-video max-w-[95%] xl:max-w-[90%] rounded-2xl md:rounded-3xl shadow-2xl animate-in fade-in duration-300'
                }`}
              >
                {/* Background image / simulated video */}
                <div className="absolute inset-0 select-none overflow-hidden bg-zinc-950 flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial-gradient(var(--y)/5% 50% 50% 50%) opacity-30 pointer-events-none" />
                  
                  {isVideoOff && isCalling ? (
                    <div className="flex flex-col items-center gap-4 text-[#f5f5f5]/30">
                      <VideoOff className="w-16 h-16 animate-pulse" />
                      <span className="text-sm font-semibold uppercase tracking-wider">Avatar Video Disabled</span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={activeTwin?.avatarUrl} 
                        alt={activeTwin?.name} 
                        className="w-full h-full object-cover"
                        style={{ 
                          objectPosition: activeTwin?.id === 'aiko' 
                            ? 'center 25%' 
                            : activeTwin?.id === 'sarang' 
                            ? 'center 20%' 
                            : ['vale', 'serena'].includes(activeTwin?.id || '') 
                            ? 'center 35%' 
                            : 'center 30%' 
                        }}
                      />
                      
                      {/* Speaking indicator wave lines */}
                      {isCalling && window.speechSynthesis?.speaking && (
                        <div className="absolute inset-x-0 bottom-24 flex justify-center z-10">
                          <div className="flex gap-1.5 animate-pulse bg-black/60 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
                            <span className="w-1 bg-[var(--y)] h-4 animate-bounce" />
                            <span className="w-1 bg-[var(--y)] h-6 animate-bounce [animation-delay:-0.2s]" />
                            <span className="w-1 bg-[var(--y)] h-5 animate-bounce [animation-delay:-0.4s]" />
                            <span className="w-1 bg-[var(--y)] h-7 animate-bounce [animation-delay:-0.1s]" />
                            <span className="w-1 bg-[var(--y)] h-4 animate-bounce" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Quality/Latency Notification */}
                {isCalling && (
                  <div className="absolute top-4 inset-x-0 flex justify-center z-10">
                    <span className="px-3.5 py-1.5 bg-black/75 border border-white/10 rounded-full text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider shadow-lg select-none animate-fade-in">
                      Network unstable, quality auto-lowered
                    </span>
                  </div>
                )}

                {/* Floating Call Subtitles / Text Speech Bubble */}
                {isCalling && callSubtitle && (
                  <div className="absolute bottom-24 inset-x-4 max-w-xl mx-auto z-10 animate-fade-up">
                    <div className="p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/5 text-center text-xs md:text-sm text-[#f5f5f5] leading-relaxed shadow-2xl">
                      {callSubtitle}
                    </div>
                  </div>
                )}

                {/* Fullscreen Button overlay inside the video container */}
                <button 
                  onClick={toggleFullscreen}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/5 hover:border-[var(--y)] text-zinc-400 hover:text-white transition-all cursor-pointer z-20"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Bottom Controls Bar (Nested inside the video container for layout & fullscreen support) */}
                <div className="w-full pb-4 pt-3 px-4 flex justify-center items-center z-20 mt-auto bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  {!isCalling ? (
                    /* Pre-Call Setup controls */
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleCallStart}
                        className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 border border-emerald-400/20 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      >
                        <PhoneCall className="w-3.5 h-3.5 fill-current" />
                        <span>Start video chat</span>
                      </button>
                    </div>
                  ) : (
                    /* Active Call controls */
                    <div className="w-full max-w-xl flex justify-between items-center relative gap-4">
                      {/* Left Counter */}
                      <span className="font-mono text-xs font-bold text-zinc-400 bg-zinc-950/80 px-3 py-1 rounded-lg border border-white/5 select-none shrink-0">
                        {formatTime(callTime)}
                      </span>

                      {/* Center Control Panel */}
                      <div className="flex items-center gap-2 mx-auto">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/5 cursor-pointer transition-colors ${
                            isMuted ? 'bg-red-500/85 text-white' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
                          }`}
                          title={isMuted ? "Unmute Mic" : "Mute Mic"}
                        >
                          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                        
                        <button
                          onClick={() => setIsVideoOff(!isVideoOff)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/5 cursor-pointer transition-colors ${
                            isVideoOff ? 'bg-red-500/85 text-white' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
                          }`}
                          title={isVideoOff ? "Enable Video" : "Disable Video"}
                        >
                          {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => setShowChatOverlay(!showChatOverlay)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/5 cursor-pointer transition-colors ${
                            showChatOverlay ? 'bg-[var(--y)] text-black' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
                          }`}
                          title="Open Text Chat Panel"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>

                        <button
                          onClick={toggleFullscreen}
                          className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/5 cursor-pointer transition-colors ${
                            isFullscreen ? 'bg-[var(--y)] text-black' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
                          }`}
                          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        >
                          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={handleCallEnd}
                          className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border border-black shadow-lg"
                          title="End Call"
                        >
                          <PhoneOff className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      {/* Empty right node to balance layout */}
                      <div className="w-10 shrink-0 hidden sm:block" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Floating Message Input Overlay */}
            {showChatOverlay && (
              <div className="absolute inset-x-4 top-16 bottom-28 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 p-4 z-30 flex flex-col justify-between shadow-2xl animate-in fade-in duration-200">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Text Chat Session</span>
                  <button 
                    onClick={() => setShowChatOverlay(false)} 
                    className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Message logs */}
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 scrollbar-none mb-3">
                  {currentChats.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div key={msg.id} className={`flex flex-col max-w-[85%] gap-0.5 ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
                        <div className={`px-3 py-2 text-xs rounded-xl ${isUser ? 'bg-[var(--y)] text-black font-semibold' : 'bg-zinc-900 text-white border border-white/5'}`}>
                          {msg.content}
                        </div>
                        <span className="text-[8px] text-white/30 font-mono mt-0.5">{msg.timestamp}</span>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Simple input field */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-zinc-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <button type="submit" className="px-3 bg-[var(--y)] text-black font-black text-xs uppercase rounded-xl">
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

      </div>

      {/* 3. Right Profile Sidebar */}
      {showProfile && (
        <div className="w-80 border-l border-zinc-900 bg-black shrink-0 flex flex-col overflow-y-auto p-4 z-20 absolute inset-y-0 right-0 md:relative md:flex animate-in slide-in-from-right duration-300">
          
          {/* Close button overlay for mobile/small screens */}
          <div className="flex md:hidden justify-between items-center mb-4 border-b border-zinc-900/50 pb-2">
            <span className="text-xs font-mono font-black uppercase text-zinc-500">Twin Profile</span>
            <button 
              onClick={() => setShowProfile(false)}
              className="p-1 text-zinc-400 hover:text-white rounded-lg bg-zinc-950 border border-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Image View */}
          <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden group rounded-2xl border border-white/5">
            <img 
              src={activeTwin?.avatarUrl} 
              alt={activeTwin?.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-103" 
            />
            {/* Badge Indicator */}
            <div className="absolute top-3 right-3 bg-[var(--y)] text-black text-[9px] font-black px-2 py-0.5 rounded-md border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] uppercase tracking-wider z-10">
              v2.0
            </div>
          </div>

          {/* Twin Details info */}
          <div className="mt-4 flex flex-col gap-1.5 text-left">
            <h3 className="font-heading font-black text-xl text-white tracking-tight uppercase flex items-center gap-2">
              <span>{activeTwin?.name}</span>
              {activeTwin?.isCustom && (
                <span className="text-[7px] bg-[var(--y)]/10 text-[var(--y)] px-1.5 py-0.5 rounded uppercase font-mono tracking-wider">Custom</span>
              )}
            </h3>
            <p className="text-xs text-zinc-400 font-body leading-relaxed">
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
            </div>
          </div>

          {/* Dynamic Sleek About Me List */}
          <div className="border-t border-zinc-900 pt-5 mt-5 flex flex-col gap-4 text-left">
            <h4 className="text-xs font-mono font-black uppercase text-zinc-500 tracking-wider">
              About me:
            </h4>
            <div className="flex flex-col gap-3 font-body text-sm">
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-900/50">
                <span className="text-zinc-500">Profession</span>
                <span className="font-extrabold text-[#f5f5f5]">{activeTwin?.profession}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-900/50">
                <span className="text-zinc-500">Vibe</span>
                <span className="font-extrabold text-[var(--y)]">{activeTwin?.vibe}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-900/50">
                <span className="text-zinc-500">Fans/Reach</span>
                <span className="font-extrabold text-[#f5f5f5]">{activeTwin?.fans}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-zinc-500">Access Tier</span>
                <span className="font-extrabold text-[#f5f5f5]">{activeTwin?.price}</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default ChatPage;
