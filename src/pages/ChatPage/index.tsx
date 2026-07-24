import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import type { Message } from '@/types/twin';

import { WalletGate } from './sections/WalletGate';
import { ChatSidebar } from './sections/ChatSidebar';
import { ChatWindow } from './sections/ChatWindow';
import { ProfileSidebar } from './sections/ProfileSidebar';

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
  const [searchQuery, setSearchQuery] = useState('');

  // Call states
  const [isCalling, setIsCalling] = useState(searchParams.get('call') === 'true');
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callSubtitle, setCallSubtitle] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const callTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

        const matchedVoice = voices.find((v) =>
          targetKeywords.some((keyword) => v.name.toLowerCase().includes(keyword))
        );
        if (matchedVoice) utterance.voice = matchedVoice;
      }

      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle call timer & speech synthesis
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLocked) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
        "I love talking with you. You always bring such a great energy.",
      ];

      let chosenText = responses[Math.floor(Math.random() * responses.length)];
      if (activeTwin.id === 'vale')
        chosenText = "I've been working on some new music tracks in the studio today. Let me know what you think!";
      if (activeTwin.id === 'serena')
        chosenText = "Wellness starts from within. Remember to take a deep breath today and release any tension.";
      if (activeTwin.id === 'cody')
        chosenText = "The crypto markets are wild today! Remember to HODL and stay sharp. What's your play?";
      if (activeTwin.id === 'carlos')
        chosenText = "That's exactly what I tell the crowd, except they usually throw tomatoes!";

      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        content: chosenText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      addMessage(activeTwin.id, aiMsg);
      setIsTyping(false);

      if (isCalling) {
        setCallSubtitle(chosenText);
        speakAnswer(chosenText);
      }
    }, 1500);
  };

  const handleSendVoiceNote = () => {
    if (isLocked) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      content: '🎤 Voice message (0:05)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    addMessage(activeTwin.id, userMsg);
    setIsTyping(true);

    setTimeout(() => {
      let chosenText = "I received your voice message! 🎧 That sounds wonderful. Let's keep chatting!";
      if (activeTwin.id === 'vale')
        chosenText = "Listening to your voice note now... 🎵 That's a great vibe! Let me know if you want to FaceTime.";
      if (activeTwin.id === 'serena')
        chosenText = "Thank you for the voice message. 🌸 Take a deep breath and connect with your inner self.";
      if (activeTwin.id === 'cody')
        chosenText = "Got your audio! 🚀 Sounds like you are ready to send it. What's the next coin you are looking at?";

      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        content: chosenText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      addMessage(activeTwin.id, aiMsg);
      setIsTyping(false);

      if (isCalling) {
        setCallSubtitle(chosenText);
        speakAnswer(chosenText);
      }
    }, 1500);
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

  const handleSelectTwin = (twinId: string) => {
    setSearchParams((prev) => {
      prev.set('twin', twinId);
      return prev;
    });
  };

  const toggleFullscreen = () => {
    const element = document.getElementById('video-call-container');
    if (!element) return;

    if (!document.fullscreenElement) {
      element
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error("Error entering fullscreen mode:", err);
          setIsFullscreen(!isFullscreen);
        });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const currentChats = chats[activeTwin?.id] || [];

  // Enforce connecting wallet first before rendering chat layout
  if (!user) {
    return (
      <WalletGate
        onConnect={() => {
          setUser({ name: 'Aswin Dope', email: 'aswin@celestialabs.com' });
        }}
      />
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-screen flex bg-black overflow-hidden relative">
      <ChatSidebar
        showChatList={showChatList}
        activeTwin={activeTwin}
        twins={twins}
        currentChats={currentChats}
        isTyping={isTyping}
        inputText={inputText}
        setInputText={setInputText}
        onSendMessage={handleSendMessage}
        onSendVoiceNote={handleSendVoiceNote}
        onClose={() => setShowChatList(false)}
        messagesEndRef={messagesEndRef}
        onSelectTwin={handleSelectTwin}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ChatWindow
        activeTwin={activeTwin}
        isLocked={isLocked}
        isCalling={isCalling}
        callTime={callTime}
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        callSubtitle={callSubtitle}
        isFullscreen={isFullscreen}
        showChatList={showChatList}
        showProfile={showProfile}
        onStartCall={handleCallStart}
        onEndCall={handleCallEnd}
        onToggleMute={() => setIsMuted(!isMuted)}
        onToggleVideo={() => setIsVideoOff(!isVideoOff)}
        onToggleFullscreen={toggleFullscreen}
        onToggleProfileSidebar={() => setShowProfile(!showProfile)}
        onToggleChatList={() => setShowChatList(!showChatList)}
        onSubscribe={(twinId) => {
          subscribeToTwin(twinId);
          alert(`Successfully subscribed to ${activeTwin.name}! Unlocking full capabilities...`);
        }}
        onBack={() => navigate('/discover')}
        onCreateTwin={() => navigate('/create')}
      />

      <ProfileSidebar
        showProfile={showProfile}
        activeTwin={activeTwin}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
}

export default ChatPage;
