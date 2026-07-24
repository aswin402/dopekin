import { Heart, Sparkles, Brain, Activity, Music, Star, MessageSquare, Video, Radio, Shield } from 'lucide-react';

export const SHOWCASE_TWINS = [
  {
    name: 'Serena',
    video: new URL('../../assets/Avatars/potrait videos/serina-mac.mp4', import.meta.url).href,
    image: new URL('../../assets/Avatars/9_16 Ratio Images/05_Serena_C4.png', import.meta.url).href,
  },
  {
    name: 'Sarang',
    video: new URL('../../assets/Avatars/potrait videos/sarang_mac.mp4', import.meta.url).href,
    image: new URL('../../assets/Avatars/9_16 Ratio Images/02_Sarang_Sleevless.png', import.meta.url).href,
  },
  {
    name: 'Aiko',
    video: new URL('../../assets/Avatars/Intro Videos/Aiko  3.mp4', import.meta.url).href,
    image: new URL('../../assets/Avatars/9_16 Ratio Images/03_Aiko_V2.png', import.meta.url).href,
  },
  {
    name: 'Etherik',
    video: new URL('../../assets/Avatars/potrait videos/etherik_mac.mp4', import.meta.url).href,
    image: new URL('../../assets/Avatars/9_16 Ratio Images/01_Etherik.png', import.meta.url).href,
  }
];

export const NOTIFICATION_CAMPAIGNS = [
  {
    twinId: 'vale',
    name: 'Vale',
    title: 'Custom Twin Ready',
    message: 'Want to design your own custom AI Twin?',
    actionText: 'Create Now',
    link: '/create'
  },
  {
    twinId: 'sarang',
    name: 'Sarang',
    title: 'Companion Match',
    message: 'Find a companion that matches your energy',
    actionText: 'Explore',
    link: '/discover'
  },
  {
    twinId: 'aiko',
    name: 'Aiko',
    title: 'Live Call Request',
    message: 'Aiko wants to start a live video call',
    actionText: 'Accept Call',
    link: '/chat?twin=aiko&call=true'
  },
  {
    twinId: 'etherik',
    name: 'Etherik',
    title: 'Create Avatar',
    message: 'Design a unique AI companion backstory',
    actionText: 'Build Twin',
    link: '/create'
  }
];

export const FAQS_DATA = [
  {
    q: 'What is a DopeKin digital twin?',
    a: 'A digital twin is a high-fidelity AI replication of a creator\'s voice, personality, and visual appearance. They can chat, voice call via FaceTime, and broadcast live streams autonomously based on the creator\'s uploaded cognitive data.'
  },
  {
    q: 'How does FaceTime with AI work?',
    a: 'FaceTime calls are powered by advanced low-latency text-to-speech voice synthesis and real-time facial synchronization. When you call an avatar, they respond verbally on-the-fly, creating a seamless and lifelike conversation.'
  },
  {
    q: 'Can my twin remember past conversations?',
    a: 'Yes. Every premium digital twin has integrated cognitive memory. They remember details you share across sessions, evolving and growing closer to you over time.'
  },
  {
    q: 'Is DopeKin safe and private?',
    a: 'Absolutely. We prioritize user privacy and data encryption. All message logs and biometrics are strictly secured, and we do not sell your personal training data to third parties.'
  }
];

export const FEATURES_DATA = [
  {
    icon: MessageSquare,
    title: 'Real Conversations',
    desc: 'Natural, human-like responses that feel incredibly real. Built on neural cognition models.'
  },
  {
    icon: Video,
    title: 'HD Calls & Voice',
    desc: 'Crystal-clear FaceTime-quality voice synthesis and real-time facial expressions synchronization.'
  },
  {
    icon: Brain,
    title: 'Memory That Grows',
    desc: 'Your digital companion remembers context details and grows closer to you with every chat.'
  },
  {
    icon: Radio,
    title: 'Live Streams',
    desc: 'Watch your favorite clones go live autonomously, sending active telemetry and comments stream.'
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    desc: 'Enterprise-grade encryption keeps all your biometrics, scripts, and logs fully private and secure.'
  }
];

export const getVibeStyles = (vibe: string) => {
  const v = vibe.toLowerCase();
  if (v.includes('magnetic') || v.includes('intense')) {
    return { bg: 'bg-rose-500/20 border-rose-500/30 text-rose-400', icon: Heart };
  }
  if (v.includes('warm') || v.includes('empathic') || v.includes('charming') || v.includes('bright')) {
    return { bg: 'bg-amber-400/20 border-amber-400/30 text-amber-300', icon: Sparkles };
  }
  if (v.includes('focused') || v.includes('attentive') || v.includes('analytical')) {
    return { bg: 'bg-sky-400/20 border-sky-400/30 text-sky-300', icon: Brain };
  }
  if (v.includes('witty') || v.includes('fast') || v.includes('energetic')) {
    return { bg: 'bg-emerald-400/20 border-emerald-400/30 text-emerald-300', icon: Activity };
  }
  if (v.includes('techno') || v.includes('satirical')) {
    return { bg: 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-300', icon: Music };
  }
  return { bg: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300', icon: Star };
};
