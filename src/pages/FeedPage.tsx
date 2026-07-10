import { useState } from 'react';
import { DEFAULT_POSTS } from '../data/defaultTwins';
import { MessageSquare, Heart, Repeat, Eye, Rss } from 'lucide-react';

export function FeedPage() {
  const [posts, setPosts] = useState(DEFAULT_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [retweetedPosts, setRetweetedPosts] = useState<string[]>([]);

  const handleLike = (id: string) => {
    const isLiked = likedPosts.includes(id);
    setLikedPosts(isLiked ? likedPosts.filter((p) => p !== id) : [...likedPosts, id]);
    
    setPosts(posts.map((post) => {
      if (post.id === id) {
        // Parse numerical value
        let count = parseFloat(post.likes.replace(/[^\d.]/g, ''));
        if (post.likes.includes('K')) count *= 1000;
        
        const newCount = isLiked ? count - 1 : count + 1;
        const formatted = newCount >= 1000 ? `${(newCount / 1000).toFixed(1)}K` : newCount.toString();
        return { ...post, likes: formatted };
      }
      return post;
    }));
  };

  const handleRetweet = (id: string) => {
    const isRetweeted = retweetedPosts.includes(id);
    setRetweetedPosts(isRetweeted ? retweetedPosts.filter((p) => p !== id) : [...retweetedPosts, id]);

    setPosts(posts.map((post) => {
      if (post.id === id) {
        let count = parseFloat(post.retweets.replace(/[^\d.]/g, ''));
        if (post.retweets.includes('K')) count *= 1000;

        const newCount = isRetweeted ? count - 1 : count + 1;
        const formatted = newCount >= 1000 ? `${(newCount / 1000).toFixed(1)}K` : newCount.toString();
        return { ...post, retweets: formatted };
      }
      return post;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: Math.random().toString(),
      handle: '@you_dope',
      name: 'You',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      text: newPostText,
      time: 'Just now',
      comments: '0',
      retweets: '0',
      likes: '0',
      views: '1'
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-black uppercase text-[#f5f5f5] tracking-tight flex items-center gap-2">
          <Rss className="w-8 h-8 text-[var(--y)]" />
          <span>Community Feed</span>
        </h1>
        <p className="text-sm text-[#f5f5f5]/60 mt-1">Read the latest community telemetry, social notes, and twin updates.</p>
      </div>

      {/* Post Composer */}
      <form onSubmit={handleCreatePost} className="p-4 bg-black border border-[var(--border)] rounded-2xl flex flex-col gap-3">
        <div className="flex gap-3">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" 
            alt="User avatar" 
            className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0" 
          />
          <textarea
            placeholder="Broadcast something to the network..."
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            className="flex-1 bg-transparent border-0 text-[#f5f5f5] placeholder-[#f5f5f5]/30 text-sm focus:outline-none focus:ring-0 resize-none h-20 font-body"
          />
        </div>
        <div className="flex justify-between items-center border-t border-white/5 pt-3">
          <span className="text-[10px] text-white/30 font-mono">TELEMETRY SYSTEM V2.0</span>
          <button
            type="submit"
            disabled={!newPostText.trim()}
            className="bg-[var(--y)] text-[var(--blk)] font-extrabold uppercase text-xs tracking-wider px-5 py-2 rounded-lg border border-[var(--blk)] shadow-[var(--brutal)] hover:translate-y-[-1px] active:translate-y-[0px] disabled:opacity-50 transition-all cursor-pointer"
          >
            Broadcast
          </button>
        </div>
      </form>

      {/* Feed post list */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          const isLiked = likedPosts.includes(post.id);
          const isRetweeted = retweetedPosts.includes(post.id);
          return (
            <div 
              key={post.id}
              className="p-5 bg-black border border-[var(--border)] rounded-2xl flex gap-4 transition-all hover:border-[var(--border2)]"
            >
              <img src={post.avatarUrl} alt={post.name} className="w-11 h-11 rounded-full object-cover border border-white/10 shrink-0" />
              
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-bold text-[#f5f5f5]">{post.name}</span>
                  <span className="text-white/40 text-xs truncate">{post.handle}</span>
                  <span className="text-white/20 text-xs shrink-0 font-mono">· {post.time}</span>
                </div>

                <p className="text-sm text-[#f5f5f5]/85 leading-relaxed font-body whitespace-pre-wrap">{post.text}</p>

                {/* Metrics actions */}
                <div className="flex justify-between items-center text-white/45 text-xs mt-2 border-t border-white/5 pt-3 max-w-md w-full">
                  <button className="flex items-center gap-1.5 hover:text-[var(--y)] transition-colors cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button 
                    onClick={() => handleRetweet(post.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${isRetweeted ? 'text-[var(--success)]' : 'hover:text-[var(--success)]'}`}
                  >
                    <Repeat className="w-4 h-4" />
                    <span>{post.retweets}</span>
                  </button>
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${isLiked ? 'text-[var(--error)]' : 'hover:text-[var(--error)]'}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  <div className="flex items-center gap-1.5 cursor-default">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default FeedPage;
