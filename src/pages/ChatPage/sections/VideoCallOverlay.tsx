import { 
  PhoneCall, PhoneOff, Mic, MicOff, Video, VideoOff, 
  Maximize2, Minimize2 
} from 'lucide-react';
import type { Twin } from '../../../types/twin';

export interface VideoCallOverlayProps {
  twin?: Twin;
  isCalling?: boolean;
  callTime?: number;
  isMuted?: boolean;
  isVideoOff?: boolean;
  callSubtitle?: string;
  isFullscreen?: boolean;
  onToggleMute?: () => void;
  onToggleVideo?: () => void;
  onToggleFullscreen?: () => void;
  onEndCall?: () => void;
  onStartCall?: () => void;
}

export function VideoCallOverlay({
  twin,
  isCalling = true,
  callTime = 0,
  isMuted = false,
  isVideoOff = false,
  callSubtitle = '',
  isFullscreen = false,
  onToggleMute,
  onToggleVideo,
  onToggleFullscreen,
  onEndCall,
  onStartCall,
}: VideoCallOverlayProps) {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 bg-zinc-950 relative flex flex-col justify-between overflow-hidden p-4 md:p-6">
      {/* Landscape Screen container for Desktop/Tab */}
      <div className="flex-1 flex items-center justify-center h-full w-full">
        <div 
          id="video-call-container"
          className={`w-full transition-all duration-300 relative overflow-hidden bg-black flex flex-col justify-between border border-white/5 ${
            isFullscreen 
              ? 'fixed inset-0 max-w-none h-full w-full rounded-none border-none z-50' 
              : 'aspect-[3/4] sm:aspect-video max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-2xl md:rounded-3xl shadow-2xl animate-in fade-in duration-300'
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
                  src={twin?.avatarUrl} 
                  alt={twin?.name} 
                  className="w-full h-full object-cover"
                  style={{ 
                    objectPosition: twin?.id === 'aiko' 
                      ? 'center 25%' 
                      : twin?.id === 'sarang' 
                      ? 'center 20%' 
                      : ['vale', 'serena'].includes(twin?.id || '') 
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
            onClick={onToggleFullscreen}
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
                  onClick={onStartCall}
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 border border-emerald-400/20 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <PhoneCall className="w-3.5 h-3.5 fill-current" />
                  <span>START VIDEO CHAT</span>
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
                    onClick={onToggleMute}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/5 cursor-pointer transition-colors ${
                      isMuted ? 'bg-red-500/85 text-white' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
                    }`}
                    title={isMuted ? "Unmute Mic" : "Mute Mic"}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={onToggleVideo}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/5 cursor-pointer transition-colors ${
                      isVideoOff ? 'bg-red-500/85 text-white' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
                    }`}
                    title={isVideoOff ? "Enable Video" : "Disable Video"}
                  >
                    {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={onEndCall}
                    className="w-12 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center cursor-pointer transition-colors"
                    title="End FaceTime Call"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                </div>

                {/* Empty right node to balance layout */}
                <div className="w-10 shrink-0 hidden sm:block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCallOverlay;
