import type { RefObject } from 'react';
import { 
  ArrowLeft, ShieldAlert, Sparkles, PanelRight, MessageSquare 
} from 'lucide-react';
import type { Twin, Message } from '../../../types/twin';
import { VideoCallOverlay } from './VideoCallOverlay';

export interface ChatWindowProps {
  activeTwin?: Twin;
  twin?: Twin;
  messages?: Message[];
  currentChats?: Message[];
  inputText?: string;
  setInputText?: (text: string) => void;
  isTyping?: boolean;
  isLocked?: boolean;
  isCalling?: boolean;
  callTime?: number;
  isMuted?: boolean;
  isVideoOff?: boolean;
  callSubtitle?: string;
  isFullscreen?: boolean;
  showChatList?: boolean;
  showProfile?: boolean;
  messagesEndRef?: RefObject<HTMLDivElement>;

  // Handlers
  onSendText?: (e: React.FormEvent) => void;
  onSendMessage?: (e: React.FormEvent) => void;
  onSendVoice?: () => void;
  onSendVoiceNote?: () => void;
  onStartCall?: () => void;
  onCallStart?: () => void;
  onEndCall?: () => void;
  onCallEnd?: () => void;
  onToggleMute?: () => void;
  onToggleVideo?: () => void;
  onToggleFullscreen?: () => void;
  onToggleProfileSidebar?: () => void;
  onToggleProfile?: () => void;
  onToggleChatList?: () => void;
  onSubscribe?: (twinId: string) => void;
  onBack?: () => void;
  onCreateTwin?: () => void;
}

export function ChatWindow({
  activeTwin,
  twin,
  isLocked = false,
  isCalling = false,
  callTime = 0,
  isMuted = false,
  isVideoOff = false,
  callSubtitle = '',
  isFullscreen = false,
  showChatList = false,
  showProfile = true,
  onStartCall,
  onCallStart,
  onEndCall,
  onCallEnd,
  onToggleMute,
  onToggleVideo,
  onToggleFullscreen,
  onToggleProfileSidebar,
  onToggleProfile,
  onToggleChatList,
  onSubscribe,
  onBack,
  onCreateTwin,
}: ChatWindowProps) {
  const currentTwin = activeTwin || twin;
  const handleStartCall = onStartCall || onCallStart;
  const handleEndCall = onEndCall || onCallEnd;
  const handleToggleProfile = onToggleProfileSidebar || onToggleProfile;

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 relative overflow-hidden">
      {/* Header */}
      <div className="h-14 border-b border-zinc-900 px-4 flex items-center justify-between bg-black shrink-0 z-10 font-body">
        <div className="flex items-center gap-2 text-white lg:pl-3">
          <button 
            onClick={onBack} 
            className="md:hidden p-1 text-zinc-400 hover:text-white rounded-lg"
            aria-label="Back to explore"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm tracking-wide text-[#f5f5f5]">{currentTwin?.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCreateTwin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-extrabold uppercase border border-white/5 transition-all cursor-pointer shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--y)]" />
            <span>Create Twin</span>
          </button>
          <button
            onClick={onToggleChatList}
            className={`p-2 hover:bg-zinc-900 rounded-lg transition-all cursor-pointer ${showChatList ? 'text-[var(--y)] bg-zinc-900' : 'text-zinc-400'}`}
            title="Toggle Chat Panel"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            onClick={handleToggleProfile}
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
                if (currentTwin && onSubscribe) {
                  onSubscribe(currentTwin.id);
                }
              }}
              className="w-full py-4 rounded-2xl bg-[var(--y)] text-[var(--blk)] font-extrabold uppercase text-sm tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform border-2 border-[var(--blk)] cursor-pointer"
            >
              Subscribe for {currentTwin?.price}
            </button>
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Premium Creator Clone</span>
          </div>
        </div>
      ) : (
        /* Main Interactive Video Area */
        <VideoCallOverlay
          twin={currentTwin}
          isCalling={isCalling}
          callTime={callTime}
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          callSubtitle={callSubtitle}
          isFullscreen={isFullscreen}
          onToggleMute={onToggleMute}
          onToggleVideo={onToggleVideo}
          onToggleFullscreen={onToggleFullscreen}
          onEndCall={handleEndCall}
          onStartCall={handleStartCall}
        />
      )}
    </div>
  );
}

export default ChatWindow;
