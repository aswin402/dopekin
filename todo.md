# TODO — DopeKin Website Build Roadmap ✅

> **Project**: DopeKin — AI Avatar Live Video Call Platform  
> **Reference Model**: [DreamGF.ai](https://dreamgf.ai/)  
> **Stack**: React 19 · Vite 8 · Tailwind v4 · Zustand · TypeScript  
> **Last Updated**: 2026-07-09

---

## Legend

| Status | Meaning |
|:-------|:--------|
| `⬜` | Not started |
| `🔲` | In progress |
| `✅` | Complete |
| `🚫` | Blocked / Deferred |
| `⭐` | Priority / Critical Path |

---

## Phase 0 — Project Bootstrap & Infrastructure

> **Goal**: Scaffold the project, configure tooling, set up the development environment.  
> **Timeline**: Days 1–2

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 0.1 | Check `onpkg stack list` for available React/Vite stacks | ⭐ | ⬜ | Per user rule — always check onpkg first |
| 0.2 | Scaffold project with `onpkg stack add` or `npx create-vite@latest ./ --template react-ts` | ⭐ | ⬜ | React 19 + TypeScript + Vite 8 |
| 0.3 | Install Tailwind CSS v4 (`@tailwindcss/vite`) | ⭐ | ⬜ | CSS-first config |
| 0.4 | Install core dependencies | ⭐ | ⬜ | `zustand`, `react-router`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge` |
| 0.5 | Create `onpkg.json` manifest | | ⬜ | Runtime, package manager, folder architecture |
| 0.6 | Set up ESLint + Prettier config | | ⬜ | Strict TypeScript rules |
| 0.7 | Configure path aliases (`@/components`, `@/hooks`, etc.) | | ⬜ | `tsconfig.json` + `vite.config.ts` |
| 0.8 | Create `.env.example` with all required env vars | | ⬜ | Auth, AI APIs, Stripe, etc. |
| 0.9 | Set up Git repo + `.gitignore` | | ⬜ | |
| 0.10 | Create folder structure per `implementation.md` | ⭐ | ⬜ | Full directory tree |

---

## Phase 1 — Design System & Foundation

> **Goal**: Establish the visual foundation — tokens, global styles, base UI components.  
> **Timeline**: Days 2–4  
> **Depends on**: Phase 0

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 1.1 | Create `src/styles/dopekin.css` — all CSS custom properties | ⭐ | ⬜ | Colors, typography, spacing, shadows, glows from `design.md` |
| 1.2 | Create `src/styles/index.css` — Tailwind imports + global resets | ⭐ | ⬜ | Scrollbar, body background, font loading |
| 1.3 | Create `src/styles/animations.css` — all keyframe animations | | ⬜ | `pulse-glow`, `marquee-scroll`, `zoom-in`, `fade-up`, `shimmer`, `typing-bounce`, `aura-pulse`, `float` |
| 1.4 | Configure `tailwind.config.ts` — extend theme with DopeKin tokens | ⭐ | ⬜ | Map CSS variables to Tailwind classes |
| 1.5 | Load Google Fonts — Inter (800, 900) + Poppins (300–700) | | ⬜ | `font-display: swap`, preload critical weights |
| 1.6 | Build `<Button>` component — Primary, Secondary, Ghost, Danger variants | ⭐ | ⬜ | Neon glow hover, brutalist shadow option, loading state |
| 1.7 | Build `<Badge>` component — LIVE, FREE, NEW, price, count variants | | ⬜ | With pulse animation for LIVE |
| 1.8 | Build `<Card>` component — base card with elevation variants | | ⬜ | |
| 1.9 | Build `<Input>` / `<Textarea>` components | | ⬜ | Focus ring with yellow glow |
| 1.10 | Build `<Modal>` component — overlay with backdrop blur | | ⬜ | Animated enter/exit with Framer Motion |
| 1.11 | Build `<Accordion>` component — FAQ style | | ⬜ | Height animation, rotate toggle icon |
| 1.12 | Build `<Avatar>` component — rounded with size variants | | ⬜ | Status dot (online/offline/live) |
| 1.13 | Build `<Skeleton>` component — shimmer loading state | | ⬜ | Card, text, avatar skeleton variants |
| 1.14 | Build `<Toast>` / notification system | | ⬜ | Slide in from top-right, auto-dismiss |
| 1.15 | Build `<Marquee>` component — infinite scroll text | | ⬜ | Used for announcement bar |
| 1.16 | Build `<GlowEffect>` wrapper — neon glow container | | ⬜ | |
| 1.17 | Create `cn()` utility (clsx + tailwind-merge) | | ⬜ | `src/utils/cn.ts` |

---

## Phase 2 — Layout Shell & Navigation

> **Goal**: Build the persistent app shell — sidebar, top nav, routing, mobile nav.  
> **Timeline**: Days 4–6  
> **Depends on**: Phase 1

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 2.1 | Build `<AppShell>` layout — sidebar + main content area | ⭐ | ⬜ | Responsive: sidebar on desktop, bottom tabs on mobile |
| 2.2 | Build `<Sidebar>` component | ⭐ | ⬜ | Fixed left panel, 220px, nav links, LIVE badge, Create Twin CTA |
| 2.3 | Build `<TopNav>` component | ⭐ | ⬜ | Sticky, search bar, auth buttons, logo |
| 2.4 | Build `<MobileNav>` bottom tab bar | ⭐ | ⬜ | 5 icons: Home, Explore, Chat, Call, Profile |
| 2.5 | Build `<Footer>` component | | ⬜ | Links, socials, legal, branding |
| 2.6 | Set up React Router v7 with routes | ⭐ | ⬜ | `/`, `/explore`, `/chat`, `/call/:id`, `/live`, `/create`, `/pricing`, `/feed`, `/twin/:id` |
| 2.7 | Implement route-based code splitting with `React.lazy()` | | ⬜ | All page components lazy-loaded |
| 2.8 | Build `<ProtectedRoute>` guard component | | ⬜ | Redirect to login if unauthenticated |
| 2.9 | Create providers wrapper (`<Providers>`) | | ⬜ | Auth, theme, router providers |
| 2.10 | Implement sidebar collapse/expand on tablet | | ⬜ | 64px icon-only mode |
| 2.11 | Add page transition animations | | ⬜ | Framer Motion `AnimatePresence` on route changes |

---

## Phase 3 — Landing Page (Homepage)

> **Goal**: Build the full landing page — the first thing users see. Mirror DreamGF homepage flow.  
> **Timeline**: Days 6–10  
> **Depends on**: Phase 2  
> **Reference**: DreamGF.ai homepage sections

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 3.1 | Build `<AnnouncementBar>` — scrolling marquee ticker | | ⬜ | `CHOOSE A TWIN OR CREATE YOUR OWN • ALL CREATORS HAVE VOICE CAPABILITIES...` |
| 3.2 | Build `<HeroBanner>` — split layout hero section | ⭐ | ⬜ | Headline left, floating twin card/video right, gradient mesh background |
| 3.3 | Create hero background animation (particle grid / gradient mesh) | | ⬜ | Subtle, performant, reduces on `prefers-reduced-motion` |
| 3.4 | Build floating twin card visual for hero | | ⬜ | 3D tilt effect with CSS perspective, parallax on mouse move |
| 3.5 | Build `<FeaturedIn>` — press logos bar | | ⬜ | "As Featured In" — placeholder logos for future press |
| 3.6 | Build `<TwinShowcase>` — featured twins horizontal scroll | ⭐ | ⬜ | Pre-built twin cards in scrollable row |
| 3.7 | Create `TwinCard` component | ⭐ | ⬜ | 3:4 portrait, hover animations (lift + zoom + glow + CTA slide), badges |
| 3.8 | Populate default twin data | | ⬜ | `src/data/defaultTwins.ts` — Vale, Serena, Aiko, Cody, Sarang, Carlos, Ben, Rina, Etherik, Sasha |
| 3.9 | Build `<HowItWorks>` section | ⭐ | ⬜ | DreamGF pattern: left tabs + right content (desktop), accordion (mobile) |
| 3.10 | Create screenshots/mockups for each How It Works step | | ⬜ | 5 step images — can use AI-generated mockups initially |
| 3.11 | Build `<FeatureHighlights>` — three feature blocks | ⭐ | ⬜ | Live Video Call / AI Chat / Creator Studio — alternating layout |
| 3.12 | Build `<ReferralSection>` — invite & earn | | ⬜ | DreamGF referral pattern adapted for DopeKin credits |
| 3.13 | Build `<DailyBonus>` — login rewards streak | | ⬜ | Streak-based free call minutes |
| 3.14 | Build `<BlogPreview>` — latest news grid | | ⬜ | 2-3 blog post cards |
| 3.15 | Build `<FAQAccordion>` section | | ⬜ | Content from `content.md` FAQ section |
| 3.16 | Build `<CTABanner>` — bottom conversion banner | | ⬜ | Full-width "Deploy Your Twin Today" with gradient background |
| 3.17 | Implement scroll-driven animations (GSAP ScrollTrigger) | | ⬜ | Fade-up sections on viewport entry |
| 3.18 | Add animated number counters (fans, twins, calls stats) | | ⬜ | Count-up on scroll into view |
| 3.19 | Performance: optimize LCP for hero section | | ⬜ | Preload hero image, critical CSS inlining |

---

## Phase 4 — Twin Gallery & Profiles

> **Goal**: Build the browsable twin catalog and individual twin profiles.  
> **Timeline**: Days 10–14  
> **Depends on**: Phase 3 (TwinCard component)

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 4.1 | Build `<TwinGrid>` — responsive masonry grid | ⭐ | ⬜ | 2-col mobile, 3-col tablet, 4-col desktop |
| 4.2 | Build `<TwinFilters>` — category filter tabs | ⭐ | ⬜ | All / Musicians / Athletes / Comedians / Creators / Streamers |
| 4.3 | Build `<TwinSearch>` — instant search with debounce | | ⬜ | `useDebounce` hook, filters twin grid in real-time |
| 4.4 | Build sort options (Popular / Newest / Price) | | ⬜ | Dropdown select |
| 4.5 | Implement "Load More" pagination | | ⬜ | 12 twins per batch, infinite scroll or button |
| 4.6 | Build `<TwinProfile>` page (`/twin/:id`) | ⭐ | ⬜ | Full profile: avatar, bio, stats, tabs (About/Gallery/Reviews/Streams) |
| 4.7 | Build About tab content | | ⬜ | Personality traits, voice sample player, stats grid |
| 4.8 | Build Gallery tab content | | ⬜ | AI-generated photo grid |
| 4.9 | Build Reviews tab content | | ⬜ | User ratings & comments |
| 4.10 | Build "Chat" and "Video Call" CTA buttons on profile | | ⬜ | Route to chat/call with twinId |
| 4.11 | Implement twin deletion for custom twins | | ⬜ | Confirmation modal, red trashcan icon |
| 4.12 | Create Zustand `twinStore` | ⭐ | ⬜ | CRUD operations, filter/sort state, pagination |

---

## Phase 5 — Creator Studio (Onboarding Wizard)

> **Goal**: Build the 5-step twin creation wizard.  
> **Timeline**: Days 14–18  
> **Depends on**: Phase 2

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 5.1 | Build `<CreatorWizard>` — multi-step container | ⭐ | ⬜ | Step management, progress indicator, next/back navigation |
| 5.2 | Build `<WizardProgress>` — step indicator bar | | ⬜ | Numbered steps with active/complete/upcoming states |
| 5.3 | Build Step 1: `<StepBio>` — bio & personality form | ⭐ | ⬜ | Name, profession select, vibe radio, communication style, bio textarea |
| 5.4 | Build Step 2: `<StepAppearance>` — photo upload | ⭐ | ⬜ | 5 angle photo slots, webcam capture tab, QR mock |
| 5.5 | Build `<PhotoUploader>` — drag & drop + click upload | | ⬜ | Image preview, crop/rotate, remove |
| 5.6 | Implement webcam capture (MediaStream API) | | ⬜ | Capture 5 snapshots from camera stream |
| 5.7 | Build consent checkboxes for Step 2 | | ⬜ | 3 required checkboxes from `content.md` |
| 5.8 | Build Step 3: `<StepVoice>` — voice recording | ⭐ | ⬜ | Script display, record button, waveform viz, playback |
| 5.9 | Implement voice recording (MediaRecorder API) | | ⬜ | Record, stop, preview, re-record |
| 5.10 | Build waveform visualization (canvas or CSS) | | ⬜ | Real-time audio levels during recording |
| 5.11 | Build Step 4: `<StepKnowledge>` — cognitive upload | | ⬜ | Drag & drop file zone, processing terminal animation |
| 5.12 | Build animated terminal log lines | | ⬜ | `[SYSTEM] Booting DopeKin Engine v2.0...` etc. from `content.md` |
| 5.13 | Build Step 5: `<StepLaunch>` — pricing & deploy | ⭐ | ⬜ | Price slider ($0-$49.99), preview card, mock validation call, deploy button |
| 5.14 | Build aura sphere animation for wizard background | | ⬜ | Ambient glow pulsing sphere |
| 5.15 | Wire wizard to Zustand store + LocalStorage persistence | | ⬜ | Draft saving, resume incomplete wizards |
| 5.16 | Implement `window.name` bridge for `file:///` protocol | | ⬜ | Per existing PRD requirement |

---

## Phase 6 — Chat System

> **Goal**: Build the real-time chat workspace.  
> **Timeline**: Days 18–22  
> **Depends on**: Phase 4 (twin selection)

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 6.1 | Build `<ChatWorkspace>` — split panel layout | ⭐ | ⬜ | Left: conversation list, Right: message thread |
| 6.2 | Build `<ChatSidebar>` — conversation list | ⭐ | ⬜ | Twin avatar, name, last message preview, unread count |
| 6.3 | Build `<ChatHeader>` — active twin info bar | | ⬜ | Avatar, name, status, call button |
| 6.4 | Build `<ChatBubble>` — message bubble component | ⭐ | ⬜ | User (yellow right) vs AI (dark left), timestamps |
| 6.5 | Build `<ChatInput>` — message input bar | ⭐ | ⬜ | Text input, send button, attachment icon, voice message |
| 6.6 | Build `<TypingIndicator>` — three bouncing dots | | ⬜ | Staggered animation |
| 6.7 | Implement AI response simulation | | ⬜ | Typing delay + stream response character-by-character |
| 6.8 | Build voice message send/receive | | ⬜ | Record, send audio blob, playback waveform |
| 6.9 | Implement `<CallPaywall>` — subscription gate | | ⬜ | "Subscribe to unlock FaceTime" overlay |
| 6.10 | Create Zustand `chatStore` | ⭐ | ⬜ | Conversations, messages, active chat, typing state |
| 6.11 | Implement message persistence (LocalStorage initially) | | ⬜ | Save/restore chat history |
| 6.12 | Add FaceTime call button → routes to video call | | ⬜ | In ChatHeader, launches call modal/page |

---

## Phase 7 — Video Call System ⭐ (Core Differentiator)

> **Goal**: Build the live AI video call experience — the USP of DopeKin.  
> **Timeline**: Days 22–28  
> **Depends on**: Phase 6

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 7.1 | Build `<VideoCallModal>` — full-screen call overlay | ⭐ | ⬜ | Black background, centered avatar video, controls bottom |
| 7.2 | Build `<AvatarVideoFeed>` — AI avatar video display | ⭐ | ⬜ | Receives video stream from D-ID/HeyGen, renders in `<video>` element |
| 7.3 | Build `<CallControls>` — mute, camera, end call | ⭐ | ⬜ | 48px circular icon buttons, end call in red |
| 7.4 | Build `<CallTimer>` — elapsed time counter | | ⬜ | `MM:SS` format, monospace font, top-right |
| 7.5 | Build `<SubtitleOverlay>` — real-time transcript | ⭐ | ⬜ | Bottom bar with semi-transparent backdrop blur |
| 7.6 | Build user PiP camera preview | | ⬜ | Bottom-right, 120×160px, yellow border |
| 7.7 | Integrate D-ID Streaming API (or HeyGen) | ⭐ | ⬜ | `avatarService.ts` — create stream, feed audio, receive video |
| 7.8 | Integrate ElevenLabs voice synthesis | ⭐ | ⬜ | `voiceService.ts` — text-to-speech streaming |
| 7.9 | Implement Web Speech API for user speech-to-text | | ⬜ | Transcribe user's speech in real-time |
| 7.10 | Build AI conversation pipeline (user speech → LLM → voice → avatar) | ⭐ | ⬜ | Full loop: STT → AI response → TTS → Avatar lip sync |
| 7.11 | Implement call time paywall (3 min free, then gate) | | ⬜ | Timer-based paywall for free users |
| 7.12 | Build zoom-in animation on call launch | | ⬜ | `zoom-in` keyframe from design.md |
| 7.13 | Build call end summary screen | | ⬜ | Duration, cost, "Call Again" CTA |
| 7.14 | Create Zustand `callStore` | | ⬜ | Call state, timer, active twin, mute/camera toggles |
| 7.15 | Handle call errors gracefully | | ⬜ | Network drop, API timeout, browser permission denied |
| 7.16 | Add call history to user profile | | ⬜ | Past calls with duration, date, twin |

---

## Phase 8 — Live Streaming

> **Goal**: Build the Twitch-style twin stream viewer.  
> **Timeline**: Days 28–31  
> **Depends on**: Phase 2

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 8.1 | Build `<StreamPlayer>` — theater mode video player | ⭐ | ⬜ | Full-width, play/pause, volume, fullscreen |
| 8.2 | Build `<StreamOverlay>` — viewer count, badges, verified | | ⬜ | Top-left overlay on player |
| 8.3 | Build `<StreamChat>` — live chat sidebar | ⭐ | ⬜ | Scrolling comments, user badges (VIP/SUB/MOD), input |
| 8.4 | Populate simulated chat comments | | ⬜ | Content from `content.md` section 7 |
| 8.5 | Build `<StreamCard>` — stream preview in grid | | ⬜ | Thumbnail, live indicator, viewer count, twin name |
| 8.6 | Add follow/subscribe buttons on stream page | | ⬜ | |
| 8.7 | Implement simulated viewer count changes | | ⬜ | Gradual random increment/decrement |

---

## Phase 9 — Authentication & User System

> **Goal**: Implement user registration, login, and profile management.  
> **Timeline**: Days 31–34  
> **Depends on**: Phase 2

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 9.1 | Build `<LoginModal>` — modal-based auth overlay | ⭐ | ⬜ | DreamGF pattern: overlay on any page, not separate route |
| 9.2 | Build `<SocialButtons>` — OAuth providers | ⭐ | ⬜ | Google, Discord, X/Twitter |
| 9.3 | Build email + password login/register forms | | ⬜ | With validation |
| 9.4 | Build "Free Trial" prominent CTA | | ⬜ | Header + sidebar, opens login modal |
| 9.5 | Integrate Firebase Auth (or Supabase Auth) | ⭐ | ⬜ | `authService.ts` |
| 9.6 | Create Zustand `authStore` | ⭐ | ⬜ | User state, login/logout, token refresh |
| 9.7 | Build `<AuthProvider>` context | | ⬜ | Wraps app, checks auth state on mount |
| 9.8 | Build user profile page | | ⬜ | Avatar, name, email, created twins, subscription status |
| 9.9 | Build settings page | | ⬜ | Account, notifications, privacy |
| 9.10 | Implement password reset flow | | ⬜ | |

---

## Phase 10 — Pricing & Subscriptions

> **Goal**: Build the pricing page and Stripe integration.  
> **Timeline**: Days 34–37  
> **Depends on**: Phase 9

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 10.1 | Build `<PricingPage>` — three-tier layout | ⭐ | ⬜ | Free / Pro ($9.99) / Elite ($24.99) |
| 10.2 | Build `<PlanCard>` — individual plan card | ⭐ | ⬜ | Pro card highlighted with yellow border + glow + scale |
| 10.3 | Build `<FeatureComparison>` — feature matrix table | | ⬜ | Check/cross marks per feature per plan |
| 10.4 | Integrate Stripe Checkout | ⭐ | ⬜ | `stripeService.ts` — session creation, redirect |
| 10.5 | Build `<CheckoutModal>` — Stripe embedded form | | ⬜ | Or redirect to Stripe hosted page |
| 10.6 | Implement subscription status checking | | ⬜ | Via Stripe webhook or API polling |
| 10.7 | Build subscription management (cancel, upgrade, downgrade) | | ⬜ | |
| 10.8 | Create Zustand `subscriptionStore` | | ⬜ | Current plan, features unlocked, usage limits |
| 10.9 | Gate premium features based on subscription | | ⬜ | Video calls, twin creation limits, etc. |

---

## Phase 11 — Social Feed

> **Goal**: Build the Twitter/X-style community feed.  
> **Timeline**: Days 37–39  
> **Depends on**: Phase 2

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 11.1 | Build `<SocialFeed>` — feed container | | ⬜ | Infinite scroll |
| 11.2 | Build `<FeedPost>` — individual post card | | ⬜ | Avatar, handle, text, media, engagement stats |
| 11.3 | Populate simulated posts | | ⬜ | Content from `content.md` section 3 |
| 11.4 | Build like / retweet / comment interactions | | ⬜ | Animated counter on click |
| 11.5 | Build `<FeedComposer>` — new post form | | ⬜ | Textarea + submit (future: connected to backend) |

---

## Phase 12 — Polish, Animation & Performance

> **Goal**: Final polish pass — animations, performance, edge cases.  
> **Timeline**: Days 39–42  
> **Depends on**: All previous phases

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 12.1 | Implement GSAP ScrollTrigger for section reveals | | ⬜ | Fade-up, scale-in on scroll |
| 12.2 | Add parallax effect to hero section | | ⬜ | Background moves slower than foreground |
| 12.3 | Add hover micro-animations to all interactive elements | | ⬜ | Buttons, cards, links, icons |
| 12.4 | Implement page transition animations (AnimatePresence) | | ⬜ | Fade + slide between routes |
| 12.5 | Add loading skeletons to all data-dependent views | | ⬜ | Twin grid, chat, feed |
| 12.6 | Implement `prefers-reduced-motion` override | | ⬜ | Disable all animations for accessibility |
| 12.7 | Optimize images — WebP/AVIF conversion, lazy loading | | ⬜ | `<picture>` with srcset |
| 12.8 | Optimize fonts — subset, `font-display: swap`, preload | | ⬜ | |
| 12.9 | Run Lighthouse audit — target 90+ all categories | ⭐ | ⬜ | Performance, Accessibility, Best Practices, SEO |
| 12.10 | Fix all Lighthouse issues | | ⬜ | |
| 12.11 | Test responsive design on all breakpoints | ⭐ | ⬜ | xs, sm, md, lg, xl |
| 12.12 | Test keyboard navigation and focus management | | ⬜ | Tab order, focus traps in modals |
| 12.13 | Add error boundaries for graceful error handling | | ⬜ | |
| 12.14 | Implement offline fallback / service worker | | ⬜ | Static shell caching |
| 12.15 | Bundle size analysis and optimization | | ⬜ | Tree-shake, chunk splitting |

---

## Phase 13 — SEO & Meta

> **Goal**: Implement SEO best practices on every page.  
> **Timeline**: Days 42–43  
> **Depends on**: Phase 12

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 13.1 | Add `<title>` and `<meta description>` per page | ⭐ | ⬜ | Unique, descriptive |
| 13.2 | Add Open Graph meta tags | | ⬜ | `og:title`, `og:description`, `og:image`, `og:url` |
| 13.3 | Add Twitter Card meta tags | | ⬜ | `twitter:card`, `twitter:site`, `twitter:image` |
| 13.4 | Implement structured data (JSON-LD) | | ⬜ | Organization, WebApplication, FAQ schemas |
| 13.5 | Add `canonical` link tags | | ⬜ | |
| 13.6 | Create `sitemap.xml` | | ⬜ | Auto-generated or static |
| 13.7 | Create `robots.txt` | | ⬜ | |
| 13.8 | Ensure proper heading hierarchy (single H1 per page) | | ⬜ | |
| 13.9 | Add `alt` text to all images | | ⬜ | |
| 13.10 | Add favicon and apple-touch-icon | | ⬜ | Multiple sizes |

---

## Phase 14 — Backend Integration (When Ready)

> **Goal**: Connect frontend to actual backend APIs.  
> **Timeline**: Days 43–50  
> **Depends on**: Backend API availability

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 14.1 | Create `src/services/api.ts` — base API client | ⭐ | ⬜ | Axios or fetch wrapper, auth token injection |
| 14.2 | Wire `authService.ts` to real auth endpoints | ⭐ | ⬜ | |
| 14.3 | Wire `twinService.ts` to real twin CRUD endpoints | ⭐ | ⬜ | |
| 14.4 | Wire `chatService.ts` to real chat/WebSocket | ⭐ | ⬜ | |
| 14.5 | Wire `callService.ts` to real WebRTC signaling | ⭐ | ⬜ | |
| 14.6 | Wire `voiceService.ts` to ElevenLabs API | | ⬜ | |
| 14.7 | Wire `avatarService.ts` to D-ID/HeyGen API | | ⬜ | |
| 14.8 | Wire `stripeService.ts` to Stripe backend | | ⬜ | |
| 14.9 | Wire `storageService.ts` to file upload endpoints | | ⬜ | |
| 14.10 | Replace all mock data with real API calls | | ⬜ | |
| 14.11 | Add error handling and retry logic for all API calls | | ⬜ | |
| 14.12 | Add loading states for all async operations | | ⬜ | |

---

## Phase 15 — Testing & QA

> **Goal**: Ensure quality across the application.  
> **Timeline**: Ongoing from Phase 3

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 15.1 | Set up Vitest for unit testing | | ⬜ | |
| 15.2 | Write unit tests for utility functions | | ⬜ | `formatters.ts`, `validators.ts`, `cn.ts` |
| 15.3 | Write unit tests for Zustand stores | | ⬜ | |
| 15.4 | Set up React Testing Library | | ⬜ | |
| 15.5 | Write component tests for UI primitives | | ⬜ | Button, Badge, Card, Modal, Accordion |
| 15.6 | Write integration tests for Creator Wizard flow | | ⬜ | |
| 15.7 | Write integration tests for Chat flow | | ⬜ | |
| 15.8 | Set up Playwright for E2E testing | | ⬜ | |
| 15.9 | Write E2E tests for critical user journeys | | ⬜ | Home → Explore → Profile → Chat → Call |
| 15.10 | Cross-browser testing (Chrome, Firefox, Safari, Edge) | | ⬜ | |
| 15.11 | Mobile device testing (iOS Safari, Android Chrome) | | ⬜ | |

---

## Phase 16 — Deployment

> **Goal**: Ship to production.  
> **Timeline**: Day 50+

| # | Task | Priority | Status | Notes |
|:--|:-----|:---------|:-------|:------|
| 16.1 | Configure Vercel / Firebase Hosting deployment | ⭐ | ⬜ | |
| 16.2 | Set up CI/CD pipeline (GitHub Actions) | ⭐ | ⬜ | Lint → Test → Build → Deploy |
| 16.3 | Configure preview deployments for PRs | | ⬜ | |
| 16.4 | Set up custom domain + SSL | | ⬜ | `dopekin.ai` or equivalent |
| 16.5 | Configure CDN caching headers | | ⬜ | |
| 16.6 | Set up error monitoring (Sentry) | | ⬜ | |
| 16.7 | Set up analytics (PostHog / GA4) | | ⬜ | |
| 16.8 | Production environment variables in hosting platform | | ⬜ | |
| 16.9 | Performance monitoring in production | | ⬜ | |
| 16.10 | Create launch checklist | | ⬜ | |

---

## Stretch Goals / Future Phases 🚀

| Feature | Description | Priority |
|:--------|:------------|:---------|
| **Light Mode** | Theme toggle with CSS variable overrides | 🚫 v2 |
| **PWA Support** | Install prompt, push notifications | 🚫 v2 |
| **Multi-language** | i18n support with `react-intl` or `i18next` | 🚫 v2 |
| **Twin Marketplace** | Community-created twins with revenue share | 🚫 v2 |
| **Group Calls** | Multiple users in same video call | 🚫 v3 |
| **AI Twin Training Dashboard** | Analytics for twin creators | 🚫 v2 |
| **Mobile App** | React Native or Capacitor wrapper | 🚫 v3 |
| **Voice Cloning** | Users train twins with their own voice | 🚫 v2 |
| **AR Filters** | Augmented reality effects during calls | 🚫 v3 |
| **Affiliate Program** | Revenue sharing for referrals | 🚫 v2 |

---

## Summary Stats

| Metric | Count |
|:-------|:------|
| **Total Phases** | 16 (+ stretch goals) |
| **Total Tasks** | ~160 |
| **Critical Path Tasks (⭐)** | ~45 |
| **Estimated Timeline** | ~50 working days (10 weeks) |
| **Core Pages** | 10 (Landing, Explore, Profile, Create, Chat, Call, Live, Pricing, Feed, Auth) |
| **UI Components** | ~40 |
| **Zustand Stores** | 6 |
| **Service Modules** | 9 |
