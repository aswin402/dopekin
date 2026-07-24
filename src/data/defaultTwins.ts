import type { Twin, SocialPost } from '../types/twin';

// Map high-fidelity local assets statically for Vite analysis
const serenaImg = new URL('../assets/Avatars/9_16 Ratio Images/05_Serena_C4.png', import.meta.url).href;
const serenaVid = new URL('../assets/Avatars/potrait videos/serina-mac.mp4', import.meta.url).href;

const sarangImg = new URL('../assets/Avatars/9_16 Ratio Images/02_Sarang_Sleevless.png', import.meta.url).href;
const sarangVid = new URL('../assets/Avatars/potrait videos/sarang_mac.mp4', import.meta.url).href;

const aikoImg = new URL('../assets/Avatars/9_16 Ratio Images/03_Aiko_V2.png', import.meta.url).href;
const aikoVid = new URL('../assets/Avatars/Intro Videos/Aiko  3.mp4', import.meta.url).href;

const etherikImg = new URL('../assets/Avatars/9_16 Ratio Images/01_Etherik.png', import.meta.url).href;
const etherikVid = new URL('../assets/Avatars/potrait videos/etherik_mac.mp4', import.meta.url).href;

export const DEFAULT_TWINS: Twin[] = [
  {
    id: 'vale',
    name: 'Vale',
    profession: 'Musician',
    vibe: 'Magnetic',
    bio: 'Warm brown eyes, shoulder-length wavy brunette hair, friendly natural smile. Wearing a grey casual knit hoodie, sitting in a cozy music studio with synths and soft neon ambient lighting.',
    fans: '2.1M FANS',
    price: '$0.00 (Free)',
    avatarUrl: serenaImg,
    category: 'musicians',
    voiceId: 'vale-voice-id',
    videoUrl: serenaVid
  },
  {
    id: 'serena',
    name: 'Serena',
    profession: 'Wellness Coach',
    vibe: 'Warm & Empathic',
    bio: 'Warm friendly eyes, athletic visual presence, sitting in an airy yoga studio with soft daylight, bamboo plants, and meditation mats in the background.',
    fans: '5.4M FANS',
    price: '$0.00 (Free)',
    avatarUrl: serenaImg,
    category: 'models',
    voiceId: 'serena-voice-id',
    videoUrl: serenaVid
  },
  {
    id: 'aiko',
    name: 'Aiko',
    profession: 'Executive Assistant',
    vibe: 'Focused & Attentive',
    bio: 'Sharp observant expression, neat office setting with glowing multiple computer screens, data dashboards, and warm keyboard backlights in the background.',
    fans: '15.9M FANS',
    price: '$0.00 (Free)',
    avatarUrl: aikoImg,
    category: 'creators',
    voiceId: 'aiko-voice-id',
    videoUrl: aikoVid
  },
  {
    id: 'cody',
    name: 'Cody',
    profession: 'Crypto Degen',
    vibe: 'Witty & Fast',
    bio: 'A tech enthusiast wearing glasses and casual streetwear, sitting in a cyberpunk bedroom setup with RGB lights, trading charts, and a hardware wallet on the desk.',
    fans: '800K FANS',
    price: '$0.00 (Free)',
    avatarUrl: etherikImg,
    category: 'creators',
    voiceId: 'cody-voice-id',
    videoUrl: etherikVid
  },
  {
    id: 'sarang',
    name: 'Sarang',
    profession: 'K-pop Idol',
    vibe: 'Charming & Bright',
    bio: 'Stylish outfit, studio photoshoot lighting, colorful creative background, sparkling jewelry, and a friendly wave that melts fans\' hearts.',
    fans: '4.5M FANS',
    price: '$0.00 (Free)',
    avatarUrl: sarangImg,
    category: 'creators',
    voiceId: 'sarang-voice-id',
    videoUrl: sarangVid
  },
  {
    id: 'carlos',
    name: 'Carlos V.',
    profession: 'Comedian',
    vibe: 'Satirical & Sharp',
    bio: 'Expressive eyebrows, holding a microphone on a dim comedy stage with spotlights, brick wall background, and a mischievous grin.',
    fans: '3.2M FANS',
    price: '$4.99/mo',
    avatarUrl: etherikImg,
    category: 'comedians',
    voiceId: 'carlos-voice-id',
    videoUrl: etherikVid
  },
  {
    id: 'ben',
    name: 'Ben T.',
    profession: 'Streamer',
    vibe: 'Energetic',
    bio: 'Wearing a gaming headset with microphone, gaming setup background, dual monitors glowing with a shooter game, and a supportive gamer posture.',
    fans: '2.9M FANS',
    price: '$9.99/mo',
    avatarUrl: etherikImg,
    category: 'creators',
    voiceId: 'ben-voice-id',
    videoUrl: etherikVid
  },
  {
    id: 'rina',
    name: 'Rina L.',
    profession: 'DJ',
    vibe: 'Techno-Focused',
    bio: 'Surrounded by synthesizers, DJ turntables, glowing dark underground club vibe with laser beams, headphones resting around her neck.',
    fans: '1.1M FANS',
    price: '$3.99/mo',
    avatarUrl: sarangImg,
    category: 'musicians',
    voiceId: 'rina-voice-id',
    videoUrl: sarangVid
  },
  {
    id: 'etherik',
    name: 'Etherik T.',
    profession: 'YouTuber',
    vibe: 'Charismatic & Analytical',
    bio: 'Sitting behind a high-quality vlog setup camera, acoustic panels in background, ring light reflections in eyes, presenting with structured hand gestures.',
    fans: '6.7M FANS',
    price: '$5.99/mo',
    avatarUrl: etherikImg,
    category: 'creators',
    voiceId: 'etherik-voice-id',
    videoUrl: etherikVid
  },
  {
    id: 'sasha',
    name: 'Sasha W.',
    profession: 'Boxer',
    vibe: 'Disciplined & Intense',
    bio: 'Athletic boxer stance, boxing wraps on hands, training gym background with boxing ring, drops of sweat, and a highly focused gaze.',
    fans: '9.2M FANS',
    price: '$2.99/mo',
    avatarUrl: sarangImg,
    category: 'athletes',
    voiceId: 'sasha-voice-id',
    videoUrl: sarangVid
  }
];

export const DEFAULT_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    handle: '@vale_wild',
    name: 'Vale',
    avatarUrl: serenaImg,
    text: 'Late night studio sessions are the best. Working on something massive for the next festival! 🎧🔥 #cyberpunk #techno #studiolife',
    time: '2 hours ago',
    comments: '240',
    retweets: '1.2K',
    likes: '12.4K',
    views: '104K'
  },
  {
    id: 'post-2',
    handle: '@aiko_hq',
    name: 'Aiko',
    avatarUrl: aikoImg,
    text: 'Morning run completed! 💪 Endorphins are high today. Who else is getting a workout in?',
    time: '4 hours ago',
    comments: '115',
    retweets: '430',
    likes: '8.9K',
    views: '45K'
  },
  {
    id: 'post-3',
    handle: '@serena_coach',
    name: 'Serena',
    avatarUrl: serenaImg,
    text: 'Knows exactly how to get you to open up — and exactly how to make you want to. 🧘‍♀️ Take a breath today and check in with your mind.',
    time: '1 day ago',
    comments: '892',
    retweets: '3.1K',
    likes: '24.1K',
    views: '280K'
  }
];
