// src/types/twin.ts
export interface Twin {
  id: string;
  name: string;
  profession: string;
  vibe: string;
  bio: string;
  fans: string;
  price: string;
  isCustom?: boolean;
  avatarUrl: string;
  videoUrl?: string;
  voiceId?: string;
  category: 'models' | 'musicians' | 'athletes' | 'comedians' | 'creators';
  unreadCount?: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
  isVoice?: boolean;
  voiceDuration?: string;
}

export interface SocialPost {
  id: string;
  handle: string;
  name: string;
  avatarUrl: string;
  text: string;
  time: string;
  comments: string;
  retweets: string;
  likes: string;
  views: string;
  image?: string;
}
