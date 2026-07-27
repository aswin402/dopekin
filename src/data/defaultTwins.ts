import type { Twin, SocialPost } from '../types/twin';

// Static URL mappings for all 24 Avatar Portraits and Videos
const etherikImg = new URL('../assets/Avatars/9_16_Ratio_Images/01_Etherik.webp', import.meta.url).href;
const etherikVid = new URL('../assets/Avatars/Intro_Videos/Etherik.mp4', import.meta.url).href;

const sarangImg = new URL('../assets/Avatars/9_16_Ratio_Images/02_Sarang_Sleevless.webp', import.meta.url).href;
const sarangVid = new URL('../assets/Avatars/Intro_Videos/Sarang_Intro.mp4', import.meta.url).href;

const aikoImg = new URL('../assets/Avatars/9_16_Ratio_Images/03_Aiko_V2.webp', import.meta.url).href;
const aikoVid = new URL('../assets/Avatars/Intro_Videos/Aiko.mp4', import.meta.url).href;

const serenaImg = new URL('../assets/Avatars/9_16_Ratio_Images/05_Serena_C4.webp', import.meta.url).href;
const serenaVid = new URL('../assets/Avatars/Intro_Videos/Serena.mp4', import.meta.url).href;

const senpaiImg = new URL('../assets/Avatars/9_16_Ratio_Images/Anime_Senpai_Potrait.webp', import.meta.url).href;
const senpaiVid = new URL('../assets/Avatars/Intro_Videos/Anime_Senpai.mp4', import.meta.url).href;

const bookwormImg = new URL('../assets/Avatars/9_16_Ratio_Images/Bookworm_Crush_Potrait.webp', import.meta.url).href;
const bookwormVid = new URL('../assets/Avatars/Intro_Videos/Bookworm_Crush.mp4', import.meta.url).href;

const chefImg = new URL('../assets/Avatars/9_16_Ratio_Images/Chef_Potrait.webp', import.meta.url).href;
const chefVid = new URL('../assets/Avatars/Intro_Videos/Chef.mp4', import.meta.url).href;

const comfortImg = new URL('../assets/Avatars/9_16_Ratio_Images/Comfort_Buddy_Potrait.webp', import.meta.url).href;
const comfortVid = new URL('../assets/Avatars/Intro_Videos/Comfort_Buddy.mp4', import.meta.url).href;

const cosmicWitchImg = new URL('../assets/Avatars/9_16_Ratio_Images/Cosmic_Witch_ Portrait.webp', import.meta.url).href;
const cosmicWitchVid = new URL('../assets/Avatars/Intro_Videos/Cosmic_Witch.mp4', import.meta.url).href;

const fashionStylistImg = new URL('../assets/Avatars/9_16_Ratio_Images/Fashion_Stylist_Potrait.webp', import.meta.url).href;
const fashionStylistVid = new URL('../assets/Avatars/Intro_Videos/Fashion_Stylist_Video.mp4', import.meta.url).href;

const flirtyNeighborImg = new URL('../assets/Avatars/9_16_Ratio_Images/Flirty_Neighbor_Potrait.webp', import.meta.url).href;
const flirtyNeighborVid = new URL('../assets/Avatars/Intro_Videos/Flirty_Neighbour.mp4', import.meta.url).href;

const gymImg = new URL('../assets/Avatars/9_16_Ratio_Images/Gym_P.webp', import.meta.url).href;
const gymVid = new URL('../assets/Avatars/Intro_Videos/Gym_Coach.mp4', import.meta.url).href;

const mermaidImg = new URL('../assets/Avatars/9_16_Ratio_Images/Mermaid_P.webp', import.meta.url).href;
const mermaidVid = new URL('../assets/Avatars/Intro_Videos/Mermaid.mp4', import.meta.url).href;

const comedianImg = new URL('../assets/Avatars/9_16_Ratio_Images/Potrait_comedian.webp', import.meta.url).href;
const comedianVid = new URL('../assets/Avatars/Intro_Videos/Comedian.mp4', import.meta.url).href;

const gamerBoyImg = new URL('../assets/Avatars/9_16_Ratio_Images/Potrait_gamer.webp', import.meta.url).href;
const gamerBoyVid = new URL('../assets/Avatars/Intro_Videos/Gamer_boy.mp4', import.meta.url).href;

const gamerGirlImg = new URL('../assets/Avatars/9_16_Ratio_Images/Potrait_gamer_girl.webp', import.meta.url).href;
const gamerGirlVid = new URL('../assets/Avatars/Intro_Videos/Gamer_Girl.mp4', import.meta.url).href;

const rockstarImg = new URL('../assets/Avatars/9_16_Ratio_Images/Rockstar_Potrait.webp', import.meta.url).href;
const rockstarVid = new URL('../assets/Avatars/Intro_Videos/Rockstar.mp4', import.meta.url).href;

const girlNextDoorImg = new URL('../assets/Avatars/9_16_Ratio_Images/The_Girl_Next_Door_Portrait.webp', import.meta.url).href;
const girlNextDoorVid = new URL('../assets/Avatars/Intro_Videos/The_Girl_Next_Door .mp4', import.meta.url).href;

const boyNextDoorImg = new URL('../assets/Avatars/9_16_Ratio_Images/The_boy_next_door_Portrait.webp', import.meta.url).href;
const boyNextDoorVid = new URL('../assets/Avatars/Intro_Videos/The_Boy_Next_Door.mp4', import.meta.url).href;

const therapistImg = new URL('../assets/Avatars/9_16_Ratio_Images/Therapist_With_Potrait.webp', import.meta.url).href;
const therapistVid = new URL('../assets/Avatars/Intro_Videos/Therapist.mp4', import.meta.url).href;

const travelBuddyImg = new URL('../assets/Avatars/9_16_Ratio_Images/Travel_Buddy_Potrait.webp', import.meta.url).href;
const travelBuddyVid = new URL('../assets/Avatars/Intro_Videos/Travel_Buddy.mp4', import.meta.url).href;

const vampireImg = new URL('../assets/Avatars/9_16_Ratio_Images/Vampire_Portrait.webp', import.meta.url).href;
const vampireVid = new URL('../assets/Avatars/Intro_Videos/The_Vampire_Lord.mp4', import.meta.url).href;

const wifeImg = new URL('../assets/Avatars/9_16_Ratio_Images/Wife_Potrait.webp', import.meta.url).href;
const wifeVid = new URL('../assets/Avatars/Intro_Videos/Wife.mp4', import.meta.url).href;

const situationshipImg = new URL('../assets/Avatars/9_16_Ratio_Images/Your_Situationship_ Portrait.webp', import.meta.url).href;
const situationshipVid = new URL('../assets/Avatars/Intro_Videos/Your_Situationship.mp4', import.meta.url).href;

const emmaImg = new URL('../assets/Avatars/9_16_Ratio_Images/Emma.webp', import.meta.url).href;
const emmaVid = new URL('../assets/Avatars/Intro_Videos/Emma.mp4', import.meta.url).href;

const lyraImg = new URL('../assets/Avatars/9_16_Ratio_Images/Lyra.webp', import.meta.url).href;
const lyraVid = new URL('../assets/Avatars/Intro_Videos/Lyra.mp4', import.meta.url).href;

export const DEFAULT_TWINS: Twin[] = [
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
    id: 'emma',
    name: 'Emma',
    profession: 'AI Architect & Hacker',
    vibe: 'Tech-Savvy & Bold',
    bio: 'Elite cyber engineer and neural strategist designing the next frontier of intelligent companions.',
    fans: '5.2M FANS',
    price: '$4.99/mo',
    avatarUrl: emmaImg,
    category: 'creators',
    voiceId: 'emma-voice-id',
    videoUrl: emmaVid
  },
  {
    id: 'lyra',
    name: 'Lyra',
    profession: 'Celestial Vocalist',
    vibe: 'Ethereal & Harmonious',
    bio: 'Dreamy synthwave artist and ambient composer bringing melodic warmth and atmospheric soundscapes.',
    fans: '6.1M FANS',
    price: '$5.99/mo',
    avatarUrl: lyraImg,
    category: 'musicians',
    voiceId: 'lyra-voice-id',
    videoUrl: lyraVid
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
    id: 'etherik',
    name: 'Etherik T.',
    profession: 'Tech Creator & YouTuber',
    vibe: 'Analytical & Charismatic',
    bio: 'Sitting behind a high-quality vlog setup camera, acoustic panels in background, ring light reflections in eyes, presenting with structured hand gestures.',
    fans: '6.7M FANS',
    price: '$5.99/mo',
    avatarUrl: etherikImg,
    category: 'creators',
    voiceId: 'etherik-voice-id',
    videoUrl: etherikVid
  },

  {
    id: 'maya',
    name: 'Maya',
    profession: 'Architectural Designer',
    vibe: 'Playful & Witty',
    bio: 'The charismatic neighbor who always drops by with fresh baked treats, creative house blueprints, and witty banter.',
    fans: '6.2M FANS',
    price: '$0.00 (Free)',
    avatarUrl: flirtyNeighborImg,
    category: 'models',
    voiceId: 'maya-voice-id',
    videoUrl: flirtyNeighborVid
  },
  {
    id: 'vale',
    name: 'Vale',
    profession: 'Indie Musician',
    vibe: 'Magnetic & Authentic',
    bio: 'Acoustic tunes, cozy oversized hoodies, friendly natural smile, sitting in a studio with synths and soft neon ambient lighting.',
    fans: '2.1M FANS',
    price: '$0.00 (Free)',
    avatarUrl: girlNextDoorImg,
    category: 'musicians',
    voiceId: 'vale-voice-id',
    videoUrl: girlNextDoorVid
  },
  {
    id: 'alex',
    name: 'Alex',
    profession: 'Fitness Coach',
    vibe: 'High Energy & Motivated',
    bio: 'Personal fitness trainer pushing you to hit PRs, master workout routines, optimize nutrition, and stay consistent.',
    fans: '5.1M FANS',
    price: '$2.99/mo',
    avatarUrl: gymImg,
    category: 'athletes',
    voiceId: 'alex-voice-id',
    videoUrl: gymVid
  },
  {
    id: 'carlos',
    name: 'Carlos V.',
    profession: 'Stand-up Comedian',
    vibe: 'Satirical & Sharp',
    bio: 'Expressive eyebrows, holding a microphone on a dim comedy stage with spotlights, brick wall background, and a mischievous grin.',
    fans: '3.2M FANS',
    price: '$4.99/mo',
    avatarUrl: comedianImg,
    category: 'comedians',
    voiceId: 'carlos-voice-id',
    videoUrl: comedianVid
  },
  {
    id: 'cody',
    name: 'Cody',
    profession: 'Pro Gamer & Degen',
    vibe: 'Competitive & Fast',
    bio: 'A tech enthusiast wearing headset and street style, sitting in a RGB gaming setup with dual monitors and crypto charts.',
    fans: '2.9M FANS',
    price: '$0.00 (Free)',
    avatarUrl: gamerBoyImg,
    category: 'creators',
    voiceId: 'cody-voice-id',
    videoUrl: gamerBoyVid
  },
  {
    id: 'senpai',
    name: 'Ren (Senpai)',
    profession: 'Anime Mentor',
    vibe: 'Cool & Protective',
    bio: 'Handsome senpai with effortless style, calm demeanor, and wise mentorship for all your anime and gaming adventures.',
    fans: '3.8M FANS',
    price: '$1.99/mo',
    avatarUrl: senpaiImg,
    category: 'creators',
    voiceId: 'senpai-voice-id',
    videoUrl: senpaiVid
  },
  {
    id: 'claire',
    name: 'Claire',
    profession: 'Literature Major',
    vibe: 'Thoughtful & Cozy',
    bio: 'Lover of classic novels, rainy café afternoons, handwritten notes, and late-night deep conversations.',
    fans: '2.3M FANS',
    price: '$0.00 (Free)',
    avatarUrl: bookwormImg,
    category: 'creators',
    voiceId: 'claire-voice-id',
    videoUrl: bookwormVid
  },
  {
    id: 'marco',
    name: 'Chef Marco',
    profession: 'Executive Chef',
    vibe: 'Passionate & Culinary',
    bio: 'Master of gourmet flavors, kitchen secrets, fine wine pairings, and creating unforgettable culinary dishes.',
    fans: '1.9M FANS',
    price: '$3.49/mo',
    avatarUrl: chefImg,
    category: 'creators',
    voiceId: 'marco-voice-id',
    videoUrl: chefVid
  },
  {
    id: 'leo',
    name: 'Leo',
    profession: 'Comfort Companion',
    vibe: 'Gentle & Reassuring',
    bio: 'Always here to listen without judgment, offering cozy vibes, warm tea recommendations, and emotional grounding.',
    fans: '4.1M FANS',
    price: '$0.00 (Free)',
    avatarUrl: comfortImg,
    category: 'models',
    voiceId: 'leo-voice-id',
    videoUrl: comfortVid
  },
  {
    id: 'chloe',
    name: 'Chloe',
    profession: 'Fashion Stylist',
    vibe: 'Chic & Trendsetting',
    bio: 'Runway aesthetician, wardrobe consultant, and trend creator keeping your style sharp and ahead of fashion week.',
    fans: '2.7M FANS',
    price: '$3.99/mo',
    avatarUrl: fashionStylistImg,
    category: 'models',
    voiceId: 'chloe-voice-id',
    videoUrl: fashionStylistVid
  },
  {
    id: 'marina',
    name: 'Marina',
    profession: 'Oceanographer',
    vibe: 'Ethereal & Free-Spirited',
    bio: 'Deep sea explorer fascinated by marine biology, coastal breezes, sun-kissed salt water, and aquatic wonders.',
    fans: '1.8M FANS',
    price: '$1.99/mo',
    avatarUrl: mermaidImg,
    category: 'models',
    voiceId: 'marina-voice-id',
    videoUrl: mermaidVid
  },
  {
    id: 'sam',
    name: 'Sam',
    profession: 'Landscape Photographer',
    vibe: 'Genuine & Charming',
    bio: 'Outdoor adventure lover, golden-hour photo enthusiast, kind smile, and effortless boy-next-door charm.',
    fans: '3.5M FANS',
    price: '$0.00 (Free)',
    avatarUrl: boyNextDoorImg,
    category: 'creators',
    voiceId: 'sam-voice-id',
    videoUrl: boyNextDoorVid
  },
  {
    id: 'dr-elena',
    name: 'Dr. Elena',
    profession: 'Mindfulness Specialist',
    vibe: 'Calm & Insightful',
    bio: 'Compassionate active listener helping you decompress stress, build healthy habits, and cultivate mental resilience.',
    fans: '6.0M FANS',
    price: '$5.99/mo',
    avatarUrl: therapistImg,
    category: 'creators',
    voiceId: 'elena-voice-id',
    videoUrl: therapistVid
  },
  {
    id: 'rio',
    name: 'Rio',
    profession: 'Travel Vlogger',
    vibe: 'Adventurous & Energetic',
    bio: 'Globe-trotting backpacker exploring hidden tropical beaches, night markets, and mountain trails.',
    fans: '2.4M FANS',
    price: '$0.00 (Free)',
    avatarUrl: travelBuddyImg,
    category: 'creators',
    voiceId: 'rio-voice-id',
    videoUrl: travelBuddyVid
  },
  {
    id: 'drake',
    name: 'Drake',
    profession: 'Gothic Novelist',
    vibe: 'Dark & Intriguing',
    bio: 'Enigmatic aristocrat with velvet tailored suits, moonlit castle libraries, and centuries of captivating stories.',
    fans: '5.9M FANS',
    price: '$4.99/mo',
    avatarUrl: vampireImg,
    category: 'creators',
    voiceId: 'drake-voice-id',
    videoUrl: vampireVid
  },
  {
    id: 'hannah',
    name: 'Hannah',
    profession: 'Interior Architect',
    vibe: 'Devoted & Sweet',
    bio: 'Warm morning coffee chats, cozy home design enthusiast, sweet laugh, and your most devoted companion.',
    fans: '8.1M FANS',
    price: '$6.99/mo',
    avatarUrl: wifeImg,
    category: 'models',
    voiceId: 'hannah-voice-id',
    videoUrl: wifeVid
  },
  {
    id: 'noah',
    name: 'Noah',
    profession: 'Creative Director',
    vibe: 'Flirty & Unpredictable',
    bio: 'Late-night text messages, coffee run dates, artistic vision, and undeniably intense magnetic chemistry.',
    fans: '9.5M FANS',
    price: '$7.99/mo',
    avatarUrl: situationshipImg,
    category: 'models',
    voiceId: 'noah-voice-id',
    videoUrl: situationshipVid
  },
  {
    id: 'kaia',
    name: 'Kaia',
    profession: 'Esports Athlete',
    vibe: 'Fiery & Skilled',
    bio: 'Tournament champion, pro streamer with cat-ear headset icon dominating leaderboards with tactical precision and playful banter.',
    fans: '7.4M FANS',
    price: '$0.00 (Free)',
    avatarUrl: gamerGirlImg,
    category: 'athletes',
    voiceId: 'kaia-voice-id',
    videoUrl: gamerGirlVid
  },
  {
    id: 'luna',
    name: 'Luna',
    profession: 'Astrologer & Mystic',
    vibe: 'Mysterious & Enchanting',
    bio: 'Tarot reader, star mapper, and crystal enthusiast guiding you through cosmic energies, celestial shifts, and moon cycles.',
    fans: '3.1M FANS',
    price: '$3.99/mo',
    avatarUrl: cosmicWitchImg,
    category: 'creators',
    voiceId: 'luna-voice-id',
    videoUrl: cosmicWitchVid
  },
  {
    id: 'jax',
    name: 'Jax',
    profession: 'Lead Guitarist',
    vibe: 'Rebellious & Electric',
    bio: 'Leather jacket, electric solos, backstage energy, and uninhibited rock & roll passion for live music junkies.',
    fans: '4.8M FANS',
    price: '$4.99/mo',
    avatarUrl: rockstarImg,
    category: 'musicians',
    voiceId: 'jax-voice-id',
    videoUrl: rockstarVid
  }
];

export const DEFAULT_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    handle: '@vale_wild',
    name: 'Vale',
    avatarUrl: girlNextDoorImg,
    text: 'Late night studio sessions are the best. Working on something massive for the next acoustic drop! 🎧🔥 #techno #studiolife',
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
    text: 'Morning run & workflow diagnostic completed! 💪 Endorphins are high today. Ready to crush your goals?',
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
  },
  {
    id: 'post-4',
    handle: '@kaia_gg',
    name: 'Kaia',
    avatarUrl: gamerGirlImg,
    text: 'Ranked lobbies are intense tonight! 🎮 Who is joining the stream for the 24hr marathon?',
    time: '3 hours ago',
    comments: '412',
    retweets: '920',
    likes: '18.3K',
    views: '150K'
  },
  {
    id: 'post-5',
    handle: '@jax_riffs',
    name: 'Jax',
    avatarUrl: rockstarImg,
    text: 'Just finished soundcheck in Tokyo. The guitar solo in track 4 is going to blow minds tonight. 🎸⚡',
    time: '5 hours ago',
    comments: '530',
    retweets: '1.8K',
    likes: '31.2K',
    views: '210K'
  }
];
