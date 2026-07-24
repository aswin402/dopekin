# Implementation Guide — DopeKin Website Rebuild 🏗️

> **Reference Model**: [DreamGF.ai](https://dreamgf.ai/) — adapted for DopeKin's AI avatar live video call platform  
> **Brand Identity**: Cyber-brutalist dark theme · Neon Yellow (#FFE701) accent · "Digital Twins" terminology  
> **Stack**: React 19 + Vite 8 + Tailwind CSS v4 + Zustand + TypeScript

---

## 1. Architecture Overview

### 1.1 High-Level System Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                         DopeKin Frontend                            │
│                                                                      │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────────┐  │
│  │ Landing   │  │ Avatar Grid  │  │ Creator    │  │ Video Call   │  │
│  │ Page      │  │ & Profiles   │  │ Studio     │  │ Engine       │  │
│  └─────┬────┘  └──────┬───────┘  └─────┬──────┘  └──────┬───────┘  │
│        │               │                │                 │          │
│  ┌─────┴───────────────┴────────────────┴─────────────────┴─────┐   │
│  │                    Zustand State Layer                         │   │
│  │  (auth · twins · chat · subscriptions · preferences)          │   │
│  └───────────────────────────┬───────────────────────────────────┘   │
│                              │                                       │
│  ┌───────────────────────────┴───────────────────────────────────┐   │
│  │              API Service Layer (REST / WebSocket)              │   │
│  └───────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
     ┌─────────────┐  ┌──────────────┐  ┌────────────────┐
     │ Auth Service │  │ AI Avatar    │  │ Streaming /    │
     │ (Firebase /  │  │ Generation   │  │ WebRTC Engine  │
     │  Supabase)   │  │ Engine       │  │                │
     └─────────────┘  └──────────────┘  └────────────────┘
```

### 1.2 Tech Stack Breakdown

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| **Framework** | React 19 | Component architecture, concurrent rendering |
| **Bundler** | Vite 8 | Dev server, HMR, production builds |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with custom theme tokens |
| **State** | Zustand | Lightweight global state management |
| **Routing** | React Router v7 | SPA navigation with nested layouts |
| **Type Safety** | TypeScript 5.x | End-to-end type safety |
| **Animations** | Framer Motion + GSAP | Page transitions, micro-interactions, scroll-driven |
| **Icons** | Lucide React | Consistent icon set |
| **Video** | WebRTC + Daily.co / LiveKit | Real-time video calling infrastructure |
| **AI Voice** | ElevenLabs / PlayHT API | Real-time voice synthesis |
| **AI Avatar** | D-ID / HeyGen / Simli | Avatar video generation |
| **Auth** | Firebase Auth / Supabase Auth | User authentication + OAuth providers |
| **Database** | Firestore / Supabase | User profiles, twin data, chat history |
| **Payments** | Stripe | Subscription management |
| **Storage** | Firebase Storage / S3 | User uploads, avatar assets |
| **CDN** | Cloudflare / Vercel Edge | Asset delivery, caching |

---

## 2. Project Structure

```
dopekin/
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── avatars/           # Default twin portrait images
│   │   ├── hero/              # Hero section backgrounds
│   │   ├── icons/             # Brand icons, favicons
│   │   └── misc/              # Decorative assets
│   └── videos/                # Background loops, demo clips
│
├── src/
│   ├── app/
│   │   ├── App.tsx            # Root component, router setup
│   │   ├── routes.tsx         # Route definitions
│   │   └── providers.tsx      # Context providers wrapper
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx           # Persistent navigation sidebar
│   │   │   ├── TopNav.tsx            # Sticky top bar with search
│   │   │   ├── MobileNav.tsx         # Bottom tab bar (mobile)
│   │   │   ├── Footer.tsx            # Global footer
│   │   │   └── AppShell.tsx          # Main layout wrapper
│   │   │
│   │   ├── landing/
│   │   │   ├── HeroBanner.tsx        # Full-width hero with CTA
│   │   │   ├── FeaturedIn.tsx        # Press logos marquee
│   │   │   ├── HowItWorks.tsx        # Step-by-step guide section
│   │   │   ├── TwinShowcase.tsx      # Featured avatar cards scroll
│   │   │   ├── FeatureHighlights.tsx # Chat/Call/Create feature blocks
│   │   │   ├── Testimonials.tsx      # User testimonials carousel
│   │   │   ├── PricingPreview.tsx    # Pricing tiers overview
│   │   │   ├── FAQAccordion.tsx      # Collapsible FAQ panel
│   │   │   ├── CTABanner.tsx         # Bottom conversion banner
│   │   │   └── AnnouncementBar.tsx   # Top marquee ticker
│   │   │
│   │   ├── twins/
│   │   │   ├── TwinCard.tsx          # Individual portrait card
│   │   │   ├── TwinGrid.tsx          # Responsive grid container
│   │   │   ├── TwinProfile.tsx       # Full profile page
│   │   │   ├── TwinFilters.tsx       # Category filter tabs
│   │   │   ├── TwinSearch.tsx        # Search with instant results
│   │   │   └── TwinBadges.tsx        # Status badges (LIVE, FREE, NEW)
│   │   │
│   │   ├── creator/
│   │   │   ├── CreatorWizard.tsx     # Multi-step creation flow
│   │   │   ├── StepBio.tsx           # Step 1: Bio & personality
│   │   │   ├── StepAppearance.tsx    # Step 2: Visual calibration
│   │   │   ├── StepVoice.tsx         # Step 3: Voice training
│   │   │   ├── StepKnowledge.tsx     # Step 4: Cognitive upload
│   │   │   ├── StepLaunch.tsx        # Step 5: Pricing & deploy
│   │   │   ├── WizardProgress.tsx    # Progress indicator
│   │   │   └── PhotoUploader.tsx     # Photo upload component
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatWorkspace.tsx     # Main chat interface
│   │   │   ├── ChatBubble.tsx        # Individual message bubble
│   │   │   ├── ChatInput.tsx         # Message input with actions
│   │   │   ├── ChatSidebar.tsx       # Conversation list
│   │   │   ├── TypingIndicator.tsx   # AI typing animation
│   │   │   └── ChatHeader.tsx        # Active twin info header
│   │   │
│   │   ├── call/
│   │   │   ├── VideoCallModal.tsx    # Full-screen video call overlay
│   │   │   ├── CallControls.tsx      # Mute, camera, end call buttons
│   │   │   ├── AvatarVideoFeed.tsx   # AI avatar video stream
│   │   │   ├── CallTimer.tsx         # Duration counter
│   │   │   ├── SubtitleOverlay.tsx   # Real-time transcript overlay
│   │   │   └── CallPaywall.tsx       # Subscription lock screen
│   │   │
│   │   ├── stream/
│   │   │   ├── StreamPlayer.tsx      # Twitch-style player
│   │   │   ├── StreamChat.tsx        # Live chat sidebar
│   │   │   ├── StreamOverlay.tsx     # Viewer count, badges
│   │   │   └── StreamCard.tsx        # Stream preview card
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginModal.tsx        # Login/register overlay
│   │   │   ├── AuthProvider.tsx      # Auth context provider
│   │   │   ├── ProtectedRoute.tsx    # Route guard component
│   │   │   └── SocialButtons.tsx     # OAuth login buttons
│   │   │
│   │   ├── pricing/
│   │   │   ├── PricingPage.tsx       # Full pricing page
│   │   │   ├── PlanCard.tsx          # Individual plan card
│   │   │   ├── FeatureComparison.tsx # Feature matrix table
│   │   │   └── CheckoutModal.tsx     # Stripe checkout wrapper
│   │   │
│   │   ├── feed/
│   │   │   ├── SocialFeed.tsx        # Twitter/X style feed
│   │   │   ├── FeedPost.tsx          # Individual post card
│   │   │   └── FeedComposer.tsx      # New post form
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx            # Primary/Secondary/Ghost variants
│   │       ├── Badge.tsx             # Status badges
│   │       ├── Card.tsx              # Base card component
│   │       ├── Modal.tsx             # Reusable modal
│   │       ├── Accordion.tsx         # Collapsible panel
│   │       ├── Input.tsx             # Styled input field
│   │       ├── Avatar.tsx            # Rounded avatar image
│   │       ├── Skeleton.tsx          # Loading skeleton
│   │       ├── Toast.tsx             # Notification toast
│   │       ├── Marquee.tsx           # Scrolling text ticker
│   │       ├── GlowEffect.tsx        # Neon glow wrapper
│   │       └── AnimatedCounter.tsx   # Number counter animation
│   │
│   ├── hooks/
│   │   ├── useAuth.ts               # Auth state & methods
│   │   ├── useTwins.ts              # Twin CRUD operations
│   │   ├── useChat.ts               # Chat messaging logic
│   │   ├── useVideoCall.ts          # WebRTC call management
│   │   ├── useSubscription.ts       # Subscription status
│   │   ├── useMediaRecorder.ts      # Voice/video recording
│   │   ├── useLocalStorage.ts       # Persistent local state
│   │   ├── useDebounce.ts           # Debounced values
│   │   ├── useIntersection.ts       # Scroll intersection observer
│   │   └── useMediaQuery.ts         # Responsive breakpoint hook
│   │
│   ├── stores/
│   │   ├── authStore.ts             # Authentication state
│   │   ├── twinStore.ts             # Twins catalog state
│   │   ├── chatStore.ts             # Active chat state
│   │   ├── callStore.ts             # Video call state
│   │   ├── uiStore.ts               # UI preferences (sidebar, theme)
│   │   └── subscriptionStore.ts     # Subscription tier state
│   │
│   ├── services/
│   │   ├── api.ts                   # Base API client (Axios/fetch)
│   │   ├── authService.ts           # Auth API calls
│   │   ├── twinService.ts           # Twin CRUD API
│   │   ├── chatService.ts           # Chat messaging API
│   │   ├── callService.ts           # Video call signaling
│   │   ├── voiceService.ts          # Voice synthesis API
│   │   ├── avatarService.ts         # Avatar generation API
│   │   ├── stripeService.ts         # Payment processing
│   │   └── storageService.ts        # File upload/download
│   │
│   ├── types/
│   │   ├── twin.ts                  # Twin data interfaces
│   │   ├── chat.ts                  # Chat message types
│   │   ├── user.ts                  # User profile types
│   │   ├── subscription.ts          # Plan/subscription types
│   │   └── api.ts                   # API response types
│   │
│   ├── utils/
│   │   ├── formatters.ts            # Date, number, string formatters
│   │   ├── validators.ts            # Form validation helpers
│   │   ├── constants.ts             # App-wide constants
│   │   ├── cn.ts                    # Classname merger (clsx + twMerge)
│   │   └── storage.ts              # LocalStorage helpers
│   │
│   ├── data/
│   │   ├── defaultTwins.ts          # Seed twin profiles
│   │   ├── categories.ts            # Filter categories
│   │   ├── faq.ts                   # FAQ content
│   │   └── pricing.ts              # Pricing plan data
│   │
│   ├── styles/
│   │   ├── index.css                # Global styles, Tailwind imports
│   │   ├── dopekin.css              # Custom CSS variables (theme tokens)
│   │   ├── animations.css           # Keyframe animations
│   │   └── fonts.css                # @font-face declarations
│   │
│   └── main.tsx                     # App entry point
│
├── .env.example                     # Environment variable template
├── tailwind.config.ts               # Tailwind configuration
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies
└── onpkg.json                       # AI Agent Manifest
```

---

## 3. Page-by-Page Implementation (DreamGF → DopeKin Mapping)

### 3.1 Landing Page (`/`)

This is the **highest-priority page**. It mirrors DreamGF's homepage structure but adapted for DopeKin's digital twin / AI video call product.

#### Section Breakdown (Top → Bottom)

| # | Section | DreamGF Equivalent | DopeKin Adaptation |
|:--|:--------|:-------------------|:-------------------|
| 1 | **Announcement Marquee** | N/A (DopeKin original) | Scrolling ticker: `CHOOSE A TWIN OR CREATE YOUR OWN • ALL CREATORS HAVE VOICE CAPABILITIES` |
| 2 | **Hero Banner** | "AI girlfriend APP that works" hero | Split layout: Left = headline + sub + CTA, Right = featured twin 3D card or video preview |
| 3 | **Featured In** | Press logos bar (Forbes, Sifted, Daily Star) | "As Featured In" logo bar — placeholder for future press coverage |
| 4 | **Twin Showcase Grid** | "Meet our best AI girlfriends" grid | "Meet Our Digital Twins" — masonry/grid of pre-built twin cards with hover effects |
| 5 | **How It Works** | 6-step accordion guide | 5-step guide: Create Account → Choose/Build Twin → Customize Personality → Start Video Call → Upgrade for More |
| 6 | **Feature Highlights** | "Chat & Sexting" section | Three feature blocks: **Live Video Call** / **AI Chat** / **Creator Studio** — each with screenshot mockup + feature bullets |
| 7 | **Referral Program** | Referral section with token rewards | "Invite & Earn" — referral bonus system with DopeKin credits |
| 8 | **Daily Bonus** | "Daily Claim Bonus Program" | "Daily Login Rewards" — streak-based free call minutes |
| 9 | **Blog / News** | Latest blog posts grid | "From the Lab" — latest platform updates and AI twin news |
| 10 | **FAQ Accordion** | FAQ section with accordion | Cyber-brutalist styled FAQ accordion |
| 11 | **CTA Banner** | Bottom CTA | Full-width "Deploy Your Twin Today" conversion banner |
| 12 | **Footer** | Standard footer | Links, socials, legal, branding |

#### Hero Banner Implementation

```tsx
// components/landing/HeroBanner.tsx
// Split layout: text left, visual right
// Background: subtle gradient mesh or animated particles
// CTA buttons with neon-yellow glow on hover

<section className="hero">
  <div className="hero-content">
    <h1>
      <span className="text-primary">Create & Chat</span>
      <span>with</span>
      <span className="text-glow">Digital Twins</span>
    </h1>
    <p className="hero-sub">
      High-fidelity, real-time AI clones of your favorite creators.
      Experience custom voice synthesis, neural vision calibration,
      and autonomous live streaming twins.
    </p>
    <div className="hero-ctas">
      <Button variant="primary" glow>Deploy Your Twin</Button>
      <Button variant="ghost">Explore Twins →</Button>
    </div>
  </div>
  <div className="hero-visual">
    {/* Floating 3D twin card with parallax effect */}
    <TwinShowcaseCard twin={featuredTwin} animated />
  </div>
</section>
```

#### How It Works Implementation (DreamGF Pattern)

DreamGF uses a **left sidebar tab selector + right content panel** pattern on desktop, and **accordion collapse** on mobile. We replicate this:

```tsx
// components/landing/HowItWorks.tsx
// Desktop: tabs on left, content with screenshot on right
// Mobile: accordion with expand/collapse

const steps = [
  {
    icon: <UserPlus />,
    title: "Create Account",
    description: "Sign up in seconds. Quick, free, and easy.",
    image: "/images/how/step-1.webp"
  },
  {
    icon: <Palette />,
    title: "Choose or Build a Twin",
    description: "Browse pre-built twins or create your own from scratch with our Creator Studio.",
    image: "/images/how/step-2.webp"
  },
  {
    icon: <Sparkles />,
    title: "Customize Personality",
    description: "Set vibe, voice, knowledge base — make your twin truly unique.",
    image: "/images/how/step-3.webp"
  },
  {
    icon: <Video />,
    title: "Start a Live Video Call",
    description: "Experience real-time AI conversation with voice synthesis and face animation.",
    image: "/images/how/step-4.webp"
  },
  {
    icon: <Crown />,
    title: "Upgrade for More",
    description: "Unlock premium twins, longer calls, and exclusive content.",
    image: "/images/how/step-5.webp"
  }
];
```

---

### 3.2 Twin Gallery Page (`/explore`)

Mirrors DreamGF's main listing grid. Filterable, searchable, paginated.

#### Features:
- **Category Filter Tabs**: All / Musicians / Athletes / Comedians / Creators / Streamers
- **Search Bar**: Instant keyup filtering
- **Card Grid**: Responsive masonry grid (2-col mobile, 3-col tablet, 4-col desktop)
- **Sort Options**: Popular / Newest / Price (Low-High) / Price (High-Low)
- **Load More**: Paginated batches (12 per load)
- **Quick Actions**: Hover reveals "Chat" and "Video Call" buttons

#### Twin Card Component (DreamGF Pattern)

DreamGF uses portrait-ratio cards (3:4) with:
- Full-bleed portrait image
- Name overlay at bottom
- Hover reveals personality tags
- Subscription price badge

```tsx
// components/twins/TwinCard.tsx
interface TwinCardProps {
  twin: Twin;
  onChat: () => void;
  onCall: () => void;
}

// Card structure:
// ┌─────────────────────────┐
// │                         │
// │     Portrait Image      │  ← aspect-ratio: 3/4
// │       (full bleed)      │
// │                         │
// │  ┌─── Hover Overlay ──┐ │
// │  │  ⚡ Chat   📹 Call  │ │
// │  └────────────────────┘ │
// ├─────────────────────────┤
// │ Name        Price Badge │
// │ @handle     ★ 2.1M fans │
// └─────────────────────────┘
```

---

### 3.3 Twin Profile Page (`/twin/:id`)

Full profile page for a selected twin. Inspired by DreamGF's profile but enhanced for video calling.

#### Layout:
```
┌──────────────────────────────────────────────────┐
│  ┌──────────┐  Twin Name           [Chat] [Call] │
│  │ Avatar   │  @handle • Profession              │
│  │ (large)  │  ★★★★★ 2.1M fans                   │
│  │          │  "Bio / personality description..." │
│  └──────────┘                                     │
├──────────────────────────────────────────────────┤
│  [About] [Gallery] [Reviews] [Streams]  ← Tabs   │
├──────────────────────────────────────────────────┤
│                                                    │
│  Tab Content Area                                  │
│  • About: personality traits, voice sample, stats  │
│  • Gallery: AI-generated photos grid               │
│  • Reviews: User ratings & comments                │
│  • Streams: Past VODs and upcoming schedule        │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

### 3.4 Creator Studio (`/create`)

Multi-step wizard (5 steps). Matches existing PRD. Implementation mirrors DreamGF's builder flow.

#### Wizard Flow:
```
Step 1: Bio & Personality
├── Twin Name (text input)
├── Profession (select dropdown)
├── Vibe (radio group: Warm, Chaotic, Focused, etc.)
├── Communication Style (radio)
└── Bio prompt (textarea)

Step 2: Appearance / Presence Calibration
├── Photo Upload (5 angle slots)
│   ├── Front Angle
│   ├── Left Profile
│   ├── Right Profile
│   ├── Smiling Expression
│   └── Neutral Expression
├── Webcam Capture (alternative)
├── QR Code Sync (mobile upload)
└── Consent checkboxes (3)

Step 3: Voice Training
├── Script display for reading
├── Voice recording (MediaRecorder API)
├── Waveform visualization
├── Playback preview
└── Re-record option

Step 4: Cognitive Upload
├── Drag & drop zone (PDF, TXT, MD)
├── URL input (scrape blog/social)
├── Processing terminal (animated log lines)
└── Knowledge base preview

Step 5: Pricing & Launch
├── Subscription price slider ($0-$49.99/mo)
├── Free tier toggle
├── Mock validation call
├── Preview card
└── Deploy button
```

---

### 3.5 Chat Workspace (`/chat`)

Split-panel messaging interface.

```
┌──────────────────────────────────────────────────┐
│ ┌──────────┐ ┌─────────────────────────────────┐ │
│ │ Chat     │ │ [Twin Avatar] Twin Name  [📞]   │ │
│ │ List     │ │─────────────────────────────────│ │
│ │          │ │                                  │ │
│ │ Twin 1 ◉ │ │  AI: Hey! Great to talk to you. │ │
│ │ Twin 2   │ │                                  │ │
│ │ Twin 3   │ │  You: Tell me about your music.  │ │
│ │          │ │                                  │ │
│ │          │ │  AI: I've been working on...      │ │
│ │          │ │  ···  (typing indicator)          │ │
│ │          │ │                                  │ │
│ │          │ │─────────────────────────────────│ │
│ │          │ │ [📎] Type a message...    [Send] │ │
│ └──────────┘ └─────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

Key features:
- Real-time AI responses via streaming API
- Voice message support (send + receive)
- "Call" button → launches VideoCallModal
- Subscription paywall for premium twins
- Typing indicator with branded animation
- Message history persistence

---

### 3.6 Video Call Interface (`/call/:twinId`)

The **core differentiator** of DopeKin. Full-screen modal or dedicated page.

```
┌──────────────────────────────────────────────────┐
│                                                    │
│        ┌──────────────────────────┐               │
│        │                          │               │
│        │     AI Avatar Video      │  ← D-ID/HeyGen│
│        │     (Full Frame)         │    real-time   │
│        │                          │    avatar      │
│        │                          │               │
│        └──────────────────────────┘               │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │  Live Subtitle: "Hey! Great to talk to you"  │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│     [🔇 Mute]  [📹 Camera]  [🔴 End Call]        │
│                                                    │
│  ┌──────────┐                     Call Time: 2:34  │
│  │ Your Cam │  (small PiP)                        │
│  └──────────┘                                      │
└──────────────────────────────────────────────────┘
```

#### Implementation Details:
- **Avatar Rendering**: D-ID Streaming API or HeyGen for lip-synced avatar video
- **Voice Synthesis**: ElevenLabs WebSocket streaming for ultra-low latency
- **Speech-to-Text**: Web Speech API for user input transcription
- **Subtitle Overlay**: Real-time transcript display
- **Call Timer**: Elapsed time counter
- **PiP Camera**: User's webcam in small overlay (optional)
- **Paywall Gate**: Timer-based paywall for free users (e.g., 3 min free)

---

### 3.7 Live Stream Page (`/live`)

Twitch-style streaming interface for autonomous AI twin broadcasts.

- Theater-mode video player
- Live chat sidebar with badges (VIP, SUB, MOD)
- Viewer count overlay
- Follow/Subscribe buttons
- Simulated chat comments feed

---

### 3.8 Pricing Page (`/pricing`)

Three-tier pricing inspired by DreamGF's plans page.

| | Free | Pro ($9.99/mo) | Elite ($24.99/mo) |
|:--|:-----|:---------------|:-------------------|
| Text Chat | ✅ 50 msg/day | ✅ Unlimited | ✅ Unlimited |
| Video Calls | ❌ | ✅ 30 min/day | ✅ Unlimited |
| Voice Synthesis | Basic | Premium HD | Ultra-Realistic |
| Create Twins | 1 | 5 | Unlimited |
| Live Streams | View only | Create | Create + Monetize |
| Priority Support | ❌ | ✅ | ✅ VIP |

---

### 3.9 Social Feed (`/feed`)

Twitter/X-style feed showing twin activity posts.

- Post cards with: avatar, handle, text, media, engagement stats
- Like / Retweet / Comment interactions
- Infinite scroll pagination

---

### 3.10 Auth Pages (`/login`, `/register`)

- Modal-based auth (DreamGF pattern — overlay on any page)
- OAuth providers: Google, Discord, X/Twitter
- Email + password fallback
- "Free Trial" prominent CTA (mirrors DreamGF's sidebar/header "Free Trial" button)

---

## 4. API Architecture

### 4.1 REST Endpoints

```
Auth:
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/logout
  POST   /api/auth/refresh
  GET    /api/auth/me

Twins:
  GET    /api/twins                    # List all (paginated, filterable)
  GET    /api/twins/:id                # Get single twin
  POST   /api/twins                    # Create custom twin
  PATCH  /api/twins/:id                # Update twin
  DELETE /api/twins/:id                # Delete twin
  GET    /api/twins/:id/gallery        # Get twin's gallery
  GET    /api/twins/featured           # Homepage featured twins

Chat:
  GET    /api/chat/conversations       # List conversations
  GET    /api/chat/:conversationId     # Get messages
  POST   /api/chat/:twinId/message     # Send message (returns AI response)
  DELETE /api/chat/:conversationId     # Delete conversation

Calls:
  POST   /api/calls/initiate/:twinId   # Start video call session
  POST   /api/calls/:callId/end        # End call
  GET    /api/calls/history            # Past call history

Subscriptions:
  GET    /api/subscriptions/plans      # Available plans
  POST   /api/subscriptions/checkout   # Create Stripe checkout
  GET    /api/subscriptions/status     # Current subscription
  POST   /api/subscriptions/cancel     # Cancel subscription

Feed:
  GET    /api/feed                     # Social feed posts
  POST   /api/feed/:postId/like       # Like a post
  POST   /api/feed/:postId/comment    # Comment on a post

Upload:
  POST   /api/upload/photo             # Upload photo (returns URL)
  POST   /api/upload/voice             # Upload voice sample
  POST   /api/upload/document          # Upload cognitive file
```

### 4.2 WebSocket Events

```
// Chat real-time
ws://api/chat/stream
  → { type: "message", twinId, content, timestamp }
  → { type: "typing", twinId, isTyping }

// Video call signaling
ws://api/call/signal
  → { type: "offer", sdp }
  → { type: "answer", sdp }
  → { type: "ice-candidate", candidate }
  → { type: "avatar-frame", frameData }
  → { type: "voice-chunk", audioData }
  → { type: "subtitle", text, timestamp }

// Live stream
ws://api/stream/live
  → { type: "chat-message", user, badge, content }
  → { type: "viewer-count", count }
  → { type: "event", name, data }
```

---

## 5. Key Interaction Patterns

### 5.1 Animations & Micro-interactions

| Interaction | Animation | Library |
|:------------|:----------|:--------|
| Page transitions | Fade + slide (150ms) | Framer Motion |
| Twin card hover | Scale 1.08 + translateY(-8px) + border glow | CSS + Framer |
| Button hover | Neon glow box-shadow pulse | CSS keyframes |
| Sidebar navigation | Active item slide indicator | Framer Motion |
| Chat message appear | Fade up + scale from 0.95 | Framer Motion |
| Video call launch | Zoom in from center (scale 1.05→1) | CSS keyframes |
| Marquee ticker | Continuous horizontal scroll | CSS animation |
| FAQ accordion | Height auto transition | Framer Motion |
| Loading skeletons | Shimmer pulse | CSS animation |
| Toast notifications | Slide in from top-right | Framer Motion |
| Scroll-driven parallax | Hero background parallax on scroll | GSAP ScrollTrigger |
| Number counters | Animated count-up on viewport entry | GSAP |

### 5.2 Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|:-----------|:------|:---------------|
| **Mobile** | < 640px | Single column, bottom tab nav, stacked cards |
| **Tablet** | 640–1024px | 2-column grid, collapsed sidebar overlay |
| **Desktop** | 1024–1440px | 3-column grid, persistent sidebar (220px) |
| **Wide** | > 1440px | 4-column grid, expanded content area |

---

## 6. Third-Party Integration Guide

### 6.1 AI Avatar Video (D-ID / HeyGen)

```typescript
// services/avatarService.ts
export async function createAvatarStream(config: {
  twinId: string;
  sourceImage: string;    // Twin's face photo
  voiceId: string;        // ElevenLabs voice ID
}) {
  // 1. Initialize D-ID streaming session
  const session = await did.createStream({
    source_url: config.sourceImage,
    driver_url: "bank://lively",
  });

  // 2. Connect WebRTC peer
  const pc = new RTCPeerConnection();
  pc.ontrack = (event) => {
    // Render avatar video to <video> element
    videoElement.srcObject = event.streams[0];
  };

  // 3. Feed text → voice → avatar pipeline
  async function speak(text: string) {
    const audioStream = await elevenLabs.textToSpeech({
      text,
      voice_id: config.voiceId,
      stream: true
    });
    await session.sendAudio(audioStream);
  }

  return { session, speak, destroy: () => session.close() };
}
```

### 6.2 Voice Synthesis (ElevenLabs)

```typescript
// services/voiceService.ts
export async function synthesizeVoice(text: string, voiceId: string) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      })
    }
  );
  return response.body; // ReadableStream<Uint8Array>
}
```

### 6.3 Payments (Stripe)

```typescript
// services/stripeService.ts
export async function createCheckoutSession(planId: string) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: planId, quantity: 1 }],
    success_url: `${APP_URL}/pricing?success=true`,
    cancel_url: `${APP_URL}/pricing?canceled=true`,
  });
  return session.url;
}
```

---

## 7. Performance Targets

| Metric | Target | Strategy |
|:-------|:-------|:---------|
| **LCP** | < 2.5s | Preload hero image, lazy-load below-fold |
| **FID/INP** | < 100ms | Code split routes, defer non-critical JS |
| **CLS** | < 0.1 | Reserve image dimensions, font-display: swap |
| **TTI** | < 1.5s | Tree-shake, Vite chunk splitting |
| **Bundle Size** | < 200KB initial | Dynamic imports for routes |
| **Lighthouse** | > 90 all categories | Follow all CWV best practices |

### Optimization Strategies:
1. **Route-based code splitting** — `React.lazy()` for all page components
2. **Image optimization** — WebP/AVIF with `<picture>` srcset, lazy loading
3. **Font optimization** — `font-display: swap`, subset fonts, preload critical
4. **Prefetching** — Prefetch likely next routes on hover
5. **Service Worker** — Cache static assets for offline shell
6. **CDN** — All static assets through Cloudflare/Vercel Edge

---

## 8. Environment Variables

```env
# .env.example

# App
VITE_APP_URL=http://localhost:5173
VITE_APP_NAME=DopeKin

# Firebase / Supabase Auth
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=

# AI Services
VITE_ELEVENLABS_API_KEY=
VITE_DID_API_KEY=
VITE_OPENAI_API_KEY=

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=

# WebRTC / Video
VITE_DAILY_API_KEY=
VITE_LIVEKIT_URL=

# API
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
```

---

## 9. Deployment Pipeline

```
┌─────────────┐    ┌──────────────┐    ┌────────────────┐
│  Developer   │───▶│  GitHub PR   │───▶│  CI Pipeline   │
│  Push        │    │  Review      │    │  (lint, test,  │
│              │    │              │    │   build)       │
└─────────────┘    └──────────────┘    └───────┬────────┘
                                               │
                                    ┌──────────┴─────────┐
                                    ▼                    ▼
                            ┌──────────────┐    ┌──────────────┐
                            │  Preview     │    │  Production  │
                            │  (Vercel     │    │  (Vercel /   │
                            │   Preview)   │    │   Firebase)  │
                            └──────────────┘    └──────────────┘
```

### Build Commands:
```bash
# Development
npm run dev          # Vite dev server on :5173

# Production build
npm run build        # Output to dist/
npm run preview      # Preview production build

# Quality checks
npm run lint         # ESLint
npm run type-check   # TypeScript compiler check
npm run test         # Vitest
```

---

## 10. Security Considerations

1. **Authentication**: JWT with HTTP-only cookies, refresh token rotation
2. **API Rate Limiting**: Per-user rate limits on chat/call endpoints
3. **Content Moderation**: AI-generated content scanning before display
4. **Input Sanitization**: DOMPurify for user-generated content
5. **CORS**: Strict origin policies
6. **CSP**: Content Security Policy headers
7. **File Upload Validation**: Type checking, size limits, virus scanning
8. **Stripe Webhooks**: Signature verification
9. **WebRTC Security**: DTLS encryption, TURN server authentication
10. **Privacy**: GDPR compliance, data deletion endpoints, consent management
