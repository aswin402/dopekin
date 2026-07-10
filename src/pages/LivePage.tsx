import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Radio, Users, Play, Pause, Volume2, VolumeX, Send } from 'lucide-react';

interface ChatComment {
  id: string;
  username: string;
  badge: 'VIP' | 'SUB' | 'MOD' | 'VIEWER';
  badgeColor: string;
  content: string;
}

export function LivePage() {
  const twins = useAppStore((state) => state.twins);
  const user = useAppStore((state) => state.user);

  const activeStreamer = twins.find(t => t.id === 'vale') || twins[0];

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [viewersCount, setViewersCount] = useState(12430);
  const [comments, setComments] = useState<ChatComment[]>([]);
  const [inputComment, setInputComment] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  const defaultComments = [
    "Wait, that is actually crazy!",
    "Is this twin running 100% on AI?",
    "Wow, the voice synthesis sounds so real!",
    "Can you play my favorite song next?",
    "This is the future of streaming fr",
    "Hype train! Let's go!",
    "How do I create my own twin?",
    "Subscribed! Keep up the awesome work."
  ];

  const usernames = [
    'cyber_sam', 'neon_rider', 'pixel_queen', 'synth_wave', 'retro_gamer',
    'alpha_tester', 'block_coder', 'bit_runner', 'hologram_fan', 'ai_dev_max'
  ];

  const badges: ('VIP' | 'SUB' | 'MOD' | 'VIEWER')[] = ['VIP', 'SUB', 'MOD', 'VIEWER'];
  const badgeColors = {
    VIP: 'bg-purple-500 text-white',
    SUB: 'bg-[var(--y)] text-[var(--blk)] font-bold',
    MOD: 'bg-emerald-500 text-white',
    VIEWER: 'bg-zinc-800 text-white/60'
  };

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  // Roll mock chat comments
  useEffect(() => {
    // Populate 3 initial comments
    const initialComments: ChatComment[] = Array.from({ length: 3 }).map((_, idx) => ({
      id: `init-${idx}`,
      username: usernames[Math.floor(Math.random() * usernames.length)],
      badge: badges[Math.floor(Math.random() * badges.length)],
      badgeColor: '',
      content: defaultComments[Math.floor(Math.random() * defaultComments.length)]
    }));
    setComments(initialComments);

    const interval = setInterval(() => {
      const newComment: ChatComment = {
        id: Math.random().toString(),
        username: usernames[Math.floor(Math.random() * usernames.length)],
        badge: badges[Math.floor(Math.random() * badges.length)],
        badgeColor: '',
        content: defaultComments[Math.floor(Math.random() * defaultComments.length)]
      };
      setComments((prev) => [...prev.slice(-30), newComment]); // keep last 30
      
      // Randomly change viewer count
      setViewersCount((prev) => prev + Math.floor(Math.random() * 15) - 7);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputComment.trim()) return;

    const userComment: ChatComment = {
      id: Math.random().toString(),
      username: user ? user.name.toLowerCase().replace(/\s/g, '_') : 'you',
      badge: 'SUB',
      badgeColor: '',
      content: inputComment
    };

    setComments((prev) => [...prev, userComment]);
    setInputComment('');
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      {/* Header Info */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-black uppercase text-[#f5f5f5] tracking-tight flex items-center gap-2">
            <Radio className="w-8 h-8 text-[var(--error)] animate-pulse" />
            <span>Autonomous Broadcasts</span>
          </h1>
          <p className="text-sm text-[#f5f5f5]/60 mt-1">Watch live streaming twins communicate autonomously with global chat feeds.</p>
        </div>

        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 px-3 py-1.5 rounded-full text-xs font-bold text-red-500 uppercase tracking-widest animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>Vale is LIVE</span>
        </div>
      </div>

      {/* Grid: 8-cols video player, 4-cols chat */}
      <div className="grid lg:grid-cols-12 border border-[var(--border)] rounded-2xl bg-black overflow-hidden shadow-2xl">
        
        {/* Video Player */}
        <div className="lg:col-span-8 flex flex-col bg-black relative aspect-video justify-between p-4 group">
          <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
            {/* Visual loop */}
            {isPlaying ? (
              <div className="relative w-full h-full">
                <img 
                  src={activeStreamer.avatarUrl} 
                  alt="Streaming Twin" 
                  className="w-full h-full object-cover filter brightness-[0.7]"
                />
                {/* Audio pulsing rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="absolute w-24 h-24 rounded-full border border-[var(--y)]/35 animate-ping [animation-duration:1.5s]" />
                  <span className="absolute w-36 h-36 rounded-full border border-[var(--y)]/20 animate-ping [animation-duration:2.5s]" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-[#f5f5f5]/30">
                <Pause className="w-16 h-16" />
                <span className="text-sm font-semibold uppercase tracking-wider">Stream Paused</span>
              </div>
            )}
          </div>

          {/* Player controls */}
          <div className="z-10 flex justify-between items-center w-full bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-[#f5f5f5] hover:text-[var(--y)] transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="text-[#f5f5f5] hover:text-[var(--y)] transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#f5f5f5]/65">
              <Users className="w-4 h-4 text-[var(--y)]" />
              <span>{viewersCount.toLocaleString()} Viewers</span>
            </div>
          </div>
        </div>

        {/* Live Chat Panel */}
        <div className="lg:col-span-4 h-[450px] lg:h-auto flex flex-col bg-black border-t lg:border-t-0 lg:border-l border-[var(--border)]">
          <div className="p-4 border-b border-white/5 font-heading font-bold text-sm text-[var(--muted2)] tracking-wider uppercase flex items-center justify-between shrink-0">
            <span>Live Chat</span>
            <div className="flex items-center gap-1.5 text-xs text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono">LIVE FEED</span>
            </div>
          </div>

          {/* Comments Feed */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 font-body text-xs">
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-0.5 animate-fade-up">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold ${badgeColors[comment.badge]}`}>
                    {comment.badge}
                  </span>
                  <span className="font-bold text-[#f5f5f5]/85">{comment.username}</span>
                </div>
                <p className="text-[#f5f5f5]/70 pl-0.5 leading-relaxed">{comment.content}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Send comment form */}
          <form onSubmit={handleSendComment} className="p-3 border-t border-white/5 bg-black flex gap-2 shrink-0">
            <input
              type="text"
              placeholder="Send a comment..."
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
              className="flex-1 h-9 bg-black border border-[var(--border)] rounded-lg px-3 text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 focus:outline-none focus:border-[var(--y)]"
            />
            <button
              type="submit"
              disabled={!inputComment.trim()}
              className="w-9 h-9 rounded-lg bg-[var(--y)] text-[var(--blk)] flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all border border-[var(--blk)]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
export default LivePage;
