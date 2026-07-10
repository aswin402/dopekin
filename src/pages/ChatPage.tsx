import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import type { Message } from '../types/twin';
import { 
  Send, PhoneCall, PhoneOff, Mic, MicOff, Video, VideoOff, 
  Trash2, ArrowLeft, ShieldAlert, Sparkles 
} from 'lucide-react';

export function ChatPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const twins = useAppStore((state) => state.twins);
  const chats = useAppStore((state) => state.chats);
  const addMessage = useAppStore((state) => state.addMessage);
  const clearChat = useAppStore((state) => state.clearChat);
  const subscribedTwinIds = useAppStore((state) => state.subscribedTwinIds);
  const subscribeToTwin = useAppStore((state) => state.subscribeToTwin);

  const activeTwinId = searchParams.get('twin') || twins[0]?.id;
  const activeTwin = twins.find((t) => t.id === activeTwinId) || twins[0];

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
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
    if (isCalling && !isLocked) {
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
  }, [isCalling, isLocked, activeTwinId]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeTwinId, isTyping]);

  // Voice synthesis helper
  const speakAnswer = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select voice based on activeTwin gender/vibe (mocked by picking first match)
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Try to pick a high quality female/male voice based on twin characteristics
        const femaleKeywords = ['female', 'google us english', 'samantha', 'zira', 'karen'];
        const maleKeywords = ['male', 'daniel', 'david', 'google uk english male'];
        
        const isMale = ['cody', 'carlos', 'ben', 'etherik'].includes(activeTwin?.id || '');
        const targetKeywords = isMale ? maleKeywords : femaleKeywords;
        
        const matchedVoice = voices.find(v => 
          targetKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
        );
        if (matchedVoice) utterance.voice = matchedVoice;
      }

      utterance.rate = 0.95; // slightly slower for better synth realism
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

    // Simulate AI response delay
    setTimeout(() => {
      const responses = [
        "Hey! That is actually crazy you mention that. Tell me more!",
        "I've been working on some new projects lately. Let me know what you think!",
        "Wellness and focus start from within. Remember to take a deep breath today.",
        "The markets are absolutely wild today! Remember to HODL and stay sharp.",
        "Oh, wow! That is so funny. We should talk about this in our next video call!",
        "I love talking with you. You always bring such a great energy."
      ];
      
      // Select specific responses for specific vibes
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

  return (
    <div className="h-[calc(100vh-8rem)] flex border border-[var(--border)] rounded-2xl bg-black overflow-hidden animate-fade-up">
      
      {/* 1. Left Twin List Panel */}
      <div className="w-80 border-r border-[var(--border)] flex flex-col bg-black shrink-0 hidden md:flex">
        <div className="p-4 border-b border-white/5 font-heading font-bold text-sm text-[var(--muted2)] tracking-wider uppercase">
          Conversations
        </div>
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
                    ? 'bg-zinc-900 border border-[var(--border2)]' 
                    : 'bg-transparent border border-transparent hover:bg-white/5'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={twin.avatarUrl} alt={twin.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 border border-black animate-pulse" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#f5f5f5] text-sm truncate">{twin.name}</span>
                    <span className="text-[10px] text-white/30 font-mono shrink-0">{twin.price}</span>
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

      {/* 2. Right Workspace Panel */}
      <div className="flex-1 flex flex-col bg-black relative">
        
        {/* Chat Header */}
        <div className="h-14 border-b border-[var(--border)] px-4 flex items-center justify-between bg-black shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile back trigger */}
            <button 
              onClick={() => navigate('/explore')} 
              className="md:hidden p-1 text-[#f5f5f5]/70 hover:text-white rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img src={activeTwin?.avatarUrl} alt={activeTwin?.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
            <div className="min-w-0 flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm truncate">{activeTwin?.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
              </div>
              <span className="text-[10px] text-[#f5f5f5]/50 truncate">{activeTwin?.profession} · {activeTwin?.vibe}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleClear}
              className="p-2 text-[#f5f5f5]/40 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
              title="Clear chat history"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={handleCallStart}
              className="flex items-center gap-1.5 bg-[var(--y)] hover:bg-[var(--y2)] text-[var(--blk)] font-extrabold text-xs uppercase px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-[var(--brutal)] border border-[var(--blk)]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>FaceTime</span>
            </button>
          </div>
        </div>         {/* Message feed / Locked paywall */}
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
                          ? 'bg-[var(--y)] text-[var(--blk)] font-medium rounded-[16px_16px_4px_16px] shadow-[2px_2px_0_rgba(255,231,1,0.2)]'
                          : 'bg-zinc-900 text-[#f5f5f5] rounded-[16px_16px_16px_4px] border border-white/5'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[9px] text-[#f5f5f5]/30 px-1 font-mono">{msg.timestamp}</span>
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center opacity-40">
                <Sparkles className="w-10 h-10 text-[var(--y)]" />
                <h3 className="font-bold text-sm">Beginning of communication</h3>
                <p className="text-xs max-w-xs">Send a text message or launch a FaceTime call to train the avatar.</p>
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

        {/* Message Input controls */}
        {!isLocked && (
          <form onSubmit={handleSendMessage} className="h-16 border-t border-[var(--border)] px-4 flex items-center gap-3 bg-black shrink-0">
            <input
              type="text"
              placeholder={`Send message to ${activeTwin?.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 h-10 bg-zinc-950 border border-[var(--border)] rounded-xl px-4 text-sm text-[#f5f5f5] placeholder-[#f5f5f5]/30 focus:outline-none focus:border-[var(--y)] font-body"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-xl bg-[var(--y)] text-[var(--blk)] flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all cursor-pointer border border-[var(--blk)] shadow-[1px_1px_0px_var(--y)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 3. FaceTime Video Overlay (Triggered by isCalling && !isLocked) */}
        {isCalling && !isLocked && (
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
                  {/* Mock live mouth/face pulse animation to simulate speech aliveness */}
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
    </div>
  );
}
export default ChatPage;
