# UI & Design System Specification — DopeKin v2.0 🎨

> **Design Philosophy**: Cyber-brutalist meets premium SaaS — dark, bold, alive  
> **Reference**: [DreamGF.ai](https://dreamgf.ai/) layout patterns, adapted with DopeKin's neon-yellow brutalist identity  
> **Status**: ACTIVE — This document supersedes the v1 design spec

---

## 1. Design Principles

| Principle | Description |
|:----------|:------------|
| **Cyber-Brutalist DNA** | Raw geometric edges, stark contrasts, neon accents over deep dark surfaces. Nothing is passive — every element has presence. |
| **Dark-First** | `#0d0b14` base. The interface lives in darkness; content and interaction elements glow against it. |
| **Neon Yellow as Verb** | Yellow (#FFE701) is never decorative — it marks **action points**: CTAs, active states, focus rings, live indicators. |
| **Motion = Aliveness** | Micro-animations on every interactive element. Hover states, transitions, and scroll-triggered reveals make the interface feel alive, not static. |
| **Content Density Balance** | DreamGF-inspired card grids with generous spacing. Dense where it creates discovery (twin gallery), spacious where it creates focus (video call). |
| **Mobile-Native Layouts** | Bottom-tab navigation, swipeable card carousels, full-screen call modals. Mobile is not a scaled-down desktop. |

---

## 2. Design Tokens (CSS Custom Properties)

### 2.1 Color System

```css
:root {
  /* ─── Primary Palette ─── */
  --color-primary:          #ffe701;     /* Neon Yellow — primary brand */
  --color-primary-hover:    #fffa7d;     /* Lighter yellow for hover */
  --color-primary-pressed:  #e6d001;     /* Darker yellow for active/pressed */
  --color-primary-subtle:   rgba(255, 231, 1, 0.12); /* Subtle yellow tint */
  --color-primary-muted:    rgba(255, 231, 1, 0.25);  /* Muted yellow border */

  /* ─── Surface Palette (Dark) ─── */
  --color-bg-base:          #000000;     /* Pure Black background */
  --color-bg-elevated:      #121212;     /* Elevated Card surfaces */
  --color-bg-overlay:       #1c1c1c;     /* Headers, inputs, modals */
  --color-bg-hover:         #222222;     /* Hover state surfaces */
  --color-bg-active:        #2a2a2a;     /* Active/selected surfaces */

  /* ─── Text Palette ─── */
  --color-text-primary:     #f5f5f5;     /* Primary body text (White/Off-White) */
  --color-text-secondary:   rgba(255, 255, 255, 0.7);  /* Labels, meta */
  --color-text-tertiary:    rgba(255, 255, 255, 0.4);  /* Disabled, hints */
  --color-text-inverted:    #000000;     /* Text on yellow backgrounds */

  /* ─── Semantic Colors ─── */
  --color-success:          #00ff88;     /* Success states */
  --color-error:            #ff3b5c;     /* Errors, destructive actions */
  --color-warning:          #ffaa00;     /* Warnings */
  --color-info:             #00bbff;     /* Informational */
  --color-live:             #ff3b5c;     /* Live indicator red */

  /* ─── Border & Divider ─── */
  --color-border:           rgba(255, 231, 1, 0.12); /* Default borders */
  --color-border-strong:    rgba(255, 231, 1, 0.25); /* Focused borders */
  --color-border-subtle:    rgba(255, 255, 255, 0.08); /* Faint dividers */

  /* ─── Gradient Presets ─── */
  --gradient-hero:          linear-gradient(135deg, #0D0B14 0%, #1A1628 50%, #13101F 100%);
  --gradient-card:          linear-gradient(180deg, transparent 60%, rgba(13, 11, 20, 0.95) 100%);
  --gradient-cta:           linear-gradient(135deg, #FFE701 0%, #FFFA7D 100%);
  --gradient-glow:          radial-gradient(ellipse at center, rgba(255, 231, 1, 0.15) 0%, transparent 70%);
}
```

### 2.2 Typography Scale

```css
:root {
  /* ─── Font Families ─── */
  --font-heading:     'Inter', system-ui, -apple-system, sans-serif;
  --font-body:        'Poppins', system-ui, -apple-system, sans-serif;
  --font-mono:        'JetBrains Mono', 'Fira Code', monospace;

  /* ─── Font Sizes (fluid scale) ─── */
  --text-xs:          clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem);     /* 11-12px */
  --text-sm:          clamp(0.75rem, 0.7rem + 0.15vw, 0.875rem);      /* 12-14px */
  --text-base:        clamp(0.875rem, 0.8rem + 0.2vw, 1rem);          /* 14-16px */
  --text-lg:          clamp(1rem, 0.9rem + 0.3vw, 1.125rem);          /* 16-18px */
  --text-xl:          clamp(1.125rem, 1rem + 0.4vw, 1.25rem);         /* 18-20px */
  --text-2xl:         clamp(1.25rem, 1rem + 0.6vw, 1.5rem);           /* 20-24px */
  --text-3xl:         clamp(1.5rem, 1.2rem + 0.8vw, 1.875rem);       /* 24-30px */
  --text-4xl:         clamp(1.875rem, 1.5rem + 1vw, 2.25rem);        /* 30-36px */
  --text-5xl:         clamp(2.25rem, 1.8rem + 1.5vw, 3rem);          /* 36-48px */
  --text-hero:        clamp(2.5rem, 2rem + 2vw, 4.5rem);             /* 40-72px */

  /* ─── Font Weights ─── */
  --weight-light:     300;
  --weight-regular:   400;
  --weight-medium:    500;
  --weight-semibold:  600;
  --weight-bold:      700;
  --weight-extrabold: 800;
  --weight-black:     900;

  /* ─── Line Heights ─── */
  --leading-tight:    1.15;
  --leading-snug:     1.3;
  --leading-normal:   1.5;
  --leading-relaxed:  1.65;

  /* ─── Letter Spacing ─── */
  --tracking-tight:   -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.02em;
  --tracking-wider:   0.05em;
  --tracking-widest:  0.1em;
}
```

### 2.3 Spacing & Layout

```css
:root {
  /* ─── Spacing Scale (4px base) ─── */
  --space-0:   0;
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */

  /* ─── Layout Dimensions ─── */
  --sidebar-width:       220px;
  --sidebar-collapsed:   64px;
  --topnav-height:       56px;
  --mobile-nav-height:   64px;
  --content-max-width:   1400px;
  --card-gap:            var(--space-4);

  /* ─── Border Radius ─── */
  --radius-sm:    6px;
  --radius-md:    10px;
  --radius-lg:    16px;
  --radius-xl:    24px;
  --radius-full:  9999px;

  /* ─── Z-Index Scale ─── */
  --z-base:       1;
  --z-dropdown:   100;
  --z-sticky:     200;
  --z-overlay:    300;
  --z-modal:      400;
  --z-popover:    500;
  --z-toast:      600;
  --z-tooltip:    700;
}
```

### 2.4 Shadow & Glow Effects

```css
:root {
  /* ─── Box Shadows ─── */
  --shadow-sm:        0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-md:        0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-lg:        0 8px 24px rgba(0, 0, 0, 0.6);
  --shadow-xl:        0 16px 48px rgba(0, 0, 0, 0.7);

  /* ─── Neon Glow Effects ─── */
  --glow-yellow:      0 0 20px rgba(255, 231, 1, 0.55),
                      0 0 50px rgba(255, 231, 1, 0.25);
  --glow-yellow-sm:   0 0 10px rgba(255, 231, 1, 0.35);
  --glow-yellow-lg:   0 0 30px rgba(255, 231, 1, 0.65),
                      0 0 80px rgba(255, 231, 1, 0.3);
  --glow-red:         0 0 12px rgba(255, 59, 92, 0.6);
  --glow-green:       0 0 12px rgba(0, 255, 136, 0.5);

  /* ─── Brutalist Effects ─── */
  --brutal-shadow:    3px 3px 0px var(--color-primary);
  --brutal-shadow-lg: 5px 5px 0px var(--color-primary);
}
```

### 2.5 Motion & Transition Tokens

```css
:root {
  /* ─── Durations ─── */
  --duration-instant:   75ms;
  --duration-fast:      150ms;
  --duration-normal:    250ms;
  --duration-slow:      400ms;
  --duration-slower:    600ms;

  /* ─── Easing Curves ─── */
  --ease-default:       cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:            cubic-bezier(0.4, 0, 1, 1);
  --ease-out:           cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out:        cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce:        cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth:        cubic-bezier(0.165, 0.84, 0.44, 1);

  /* ─── Common Transitions ─── */
  --transition-colors:  color var(--duration-fast) var(--ease-default),
                        background-color var(--duration-fast) var(--ease-default),
                        border-color var(--duration-fast) var(--ease-default);
  --transition-transform: transform var(--duration-normal) var(--ease-smooth);
  --transition-all:     all var(--duration-normal) var(--ease-default);
}
```

---

## 3. Component Design Specifications

### 3.1 Navigation Sidebar (`.sidebar`)

Inspired by DreamGF's left sidebar but with DopeKin's brutalist flair.

```
┌────────────────────┐
│  ⚡ DopeKin         │  ← Logo + wordmark
│────────────────────│
│  🏠 Home           │
│  🔍 Explore        │
│  💬 Chat       (3) │  ← Unread count badge
│  📹 Video Call     │
│  🔴 Live       ●   │  ← Pulsing red LIVE dot
│  ✨ Create Twin    │  ← Highlighted CTA
│────────────────────│
│  🏷️ Pricing        │
│  ❓ Help           │
│────────────────────│
│  👤 Profile        │
│  ⚙️ Settings       │
└────────────────────┘
```

**Specs:**
- Width: `var(--sidebar-width)` = 220px desktop
- Position: fixed, left: 0, top: 0, bottom: 0
- Background: `#100E1B` with `border-right: 1px solid var(--color-border)`
- Nav items: 44px height, 16px horizontal padding
- Active state: `background: var(--color-primary)`, `color: var(--color-text-inverted)`, `font-weight: 600`
- Hover state: `background: rgba(255, 255, 255, 0.05)`, `color: #fff`
- LIVE badge: 8px red circle with `pulse-glow` animation
- Create Twin button: `background: var(--color-primary)`, brutalist shadow, full-width
- **Mobile**: Overlay from left with backdrop blur, triggered by hamburger menu
- **Tablet**: Collapsed icon-only mode (64px width)

---

### 3.2 Top Navigation Bar (`.topnav`)

DreamGF Pattern: sticky top bar with logo, search, auth buttons.

```
┌──────────────────────────────────────────────────────────────┐
│  [☰]  ⚡DopeKin    [🔍 Search twins...]    [Login] [Try Free]│
└──────────────────────────────────────────────────────────────┘
```

**Specs:**
- Height: `var(--topnav-height)` = 56px
- Position: `sticky`, top: 0
- Background: `var(--color-bg-overlay)` with `backdrop-filter: blur(12px)`
- Border: `border-bottom: 1px solid var(--color-border)`
- Z-index: `var(--z-sticky)`
- Search bar: `background: var(--color-bg-base)`, `border: 1px solid var(--color-border)`, rounded-full
- "Try Free" button: primary yellow with glow on hover

---

### 3.3 Twin Portrait Cards (`.twin-card`)

DreamGF Pattern: portrait-ratio cards with hover reveal, adapted for DopeKin.

**Structure:**
```
┌─────────────────────────────┐
│                             │
│      Portrait Image         │  aspect-ratio: 3/4
│      (object-fit: cover)    │
│                             │
│   ┌─── Badge ───┐          │
│   │ ● LIVE      │          │  top-left: conditional
│   └─────────────┘          │
│                             │
│   ╔═══ Hover Overlay ═════╗ │  opacity 0 → 1
│   ║  💬 Chat   📹 Call    ║ │
│   ╚═══════════════════════╝ │
│                             │
├─────────────────────────────┤
│  Twin Name        $0.00    │  bottom info bar
│  @handle    ★ 2.1M fans   │
│  Musician · Magnetic       │
└─────────────────────────────┘
```

**Specs:**
- Aspect ratio: `3/4`
- Border: `1px solid var(--color-border)`
- Border-radius: `var(--radius-lg)` = 16px
- Overflow: hidden
- Background: `var(--color-bg-elevated)`

**Hover Animations:**
1. Card lift: `transform: translateY(-8px)` over `var(--duration-normal)` with `var(--ease-smooth)`
2. Image zoom: `transform: scale(1.08)` over `var(--duration-slower)` with `var(--ease-smooth)`
3. Glow border: `border-color: var(--color-primary-muted)`, `box-shadow: var(--glow-yellow-sm)`
4. CTA slide-in: `translateY(12px) → translateY(0)`, `opacity: 0 → 1` over `var(--duration-normal)`

**Badges (top-left corner):**
- LIVE: Red pulsing badge with `var(--glow-red)`
- FREE: Green badge `var(--color-success)`
- NEW: Yellow badge `var(--color-primary)`
- Price: Semi-transparent backdrop, white text

---

### 3.4 Hero Banner (`.hero-banner`)

DreamGF Pattern: split layout — text left, visual right on desktop. Full-width stacked on mobile.

**Desktop Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   CREATE & CHAT              ┌──────────────────┐           │
│   with                       │                  │           │
│   DIGITAL TWINS              │  Featured Twin   │           │
│                              │  3D Card / Video │           │
│   High-fidelity, real-time   │  (floating with  │           │
│   AI clones of your fav...   │   parallax)      │           │
│                              │                  │           │
│   [Deploy Your Twin] [→]     └──────────────────┘           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Background:** Gradient mesh with animated particle grid or subtle animated noise

**Specs:**
- Min height: `70vh` desktop, `50vh` mobile
- Background: `var(--gradient-hero)` with overlay particle/grid animation
- Headline: `var(--text-hero)`, `var(--weight-black)`, `var(--font-heading)`
- "DIGITAL TWINS" text: `color: var(--color-primary)` with `text-shadow: var(--glow-yellow)`
- CTA button: Large (56px height), `var(--gradient-cta)` background, `border-radius: var(--radius-full)`, brutalist shadow
- Right visual: Floating twin card with CSS `perspective` and `transform: rotateY(-5deg) rotateX(5deg)` for 3D tilt, parallax on mouse move

---

### 3.5 How It Works Section (`.how-it-works`)

DreamGF Pattern: Left tab navigation + Right content panel (desktop) / Accordion (mobile).

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│         HOW TO GET STARTED WITH DOPEKIN                      │
│                                                              │
│  ┌─────────────────┐  ┌──────────────────────────────────┐  │
│  │ ○ Step 1         │  │                                  │  │
│  │   Create Account │  │   [Screenshot / Animation]       │  │
│  │                  │  │                                  │  │
│  │ ● Step 2 ►      │  │   ────────────────────────────── │  │
│  │   Choose a Twin  │  │   CHOOSE OR BUILD A TWIN         │  │
│  │                  │  │   Browse pre-built twins or      │  │
│  │ ○ Step 3         │  │   create your own from scratch   │  │
│  │   Customize      │  │   with our Creator Studio.       │  │
│  │                  │  │                                  │  │
│  │ ○ Step 4         │  └──────────────────────────────────┘  │
│  │   Start Call     │                                        │
│  │                  │                                        │
│  │ ○ Step 5         │                                        │
│  │   Upgrade        │                                        │
│  └─────────────────┘                                        │
└──────────────────────────────────────────────────────────────┘
```

**Tab Item Specs:**
- Inactive: `opacity: 0.6`, no background
- Active: `background: var(--color-bg-hover)`, `border-left: 3px solid var(--color-primary)`, full opacity
- Icon: 40px circle with icon, `background: var(--color-primary-subtle)`
- Content transition: Fade + slide (250ms)

**Mobile:** Accordion collapse pattern with `+`/`−` toggle icons

---

### 3.6 Feature Highlight Cards (`.feature-card`)

Three feature blocks for **Live Video Call**, **AI Chat**, **Creator Studio**.

```
┌────────────────────────────────────────┐
│  ┌──────────────┐                      │
│  │  Screenshot  │  YOUR PERFECT        │
│  │  / Mockup    │  VIDEO COMPANION     │
│  │              │                      │
│  │              │  • Real-time lip sync │
│  │              │  • HD voice synthesis │
│  │              │  • Subtitle overlay   │
│  └──────────────┘                      │
│                  [Try Video Call →]     │
└────────────────────────────────────────┘
```

- Alternating left/right layout (image-text, text-image)
- Feature bullets with neon-yellow icon circles
- CTA button with arrow icon

---

### 3.7 Pricing Cards (`.plan-card`)

DreamGF's pricing page pattern with three tiers.

```
┌─────────────┐  ┌─────────────────┐  ┌─────────────┐
│    FREE      │  │  ★ PRO ★        │  │   ELITE      │
│              │  │  MOST POPULAR   │  │              │
│   $0/mo      │  │   $9.99/mo      │  │  $24.99/mo   │
│              │  │                 │  │              │
│  ✓ 50 msg    │  │  ✓ Unlimited    │  │  ✓ Everything│
│  ✓ 1 twin    │  │  ✓ 30min calls  │  │  ✓ Unlimited │
│  ✗ Calls     │  │  ✓ 5 twins      │  │  ✓ Monetize  │
│  ✗ Create    │  │  ✓ HD Voice     │  │  ✓ VIP       │
│              │  │                 │  │              │
│  [Start]     │  │  [Upgrade]      │  │  [Go Elite]  │
└─────────────┘  └─────────────────┘  └─────────────┘
```

**Pro card highlight:**
- `border: 2px solid var(--color-primary)`
- `box-shadow: var(--glow-yellow)`
- "MOST POPULAR" badge at top
- Slightly elevated (`transform: scale(1.05)`)

---

### 3.8 Chat Interface (`.chat-workspace`)

Split-panel: conversation list + message thread.

**Message Bubble Specs:**
- User messages: `background: var(--color-primary)`, `color: var(--color-text-inverted)`, right-aligned, `border-radius: 16px 16px 4px 16px`
- AI messages: `background: var(--color-bg-elevated)`, `color: var(--color-text-primary)`, left-aligned, `border-radius: 16px 16px 16px 4px`
- Typing indicator: Three dots with staggered bounce animation
- Input bar: `background: var(--color-bg-overlay)`, `border: 1px solid var(--color-border)`, sticky bottom

---

### 3.9 Video Call Modal (`.video-call-modal`)

Full-screen overlay with AI avatar video feed.

**Specs:**
- Background: `#000000` full screen
- Avatar video: Centered, max 80% viewport height
- Subtitle bar: Bottom 15%, semi-transparent `backdrop-filter: blur(8px)`
- Controls: Bottom center, icon-only buttons (48px circles)
  - Mute: `background: var(--color-bg-overlay)`, white icon
  - Camera: `background: var(--color-bg-overlay)`, white icon
  - End Call: `background: var(--color-error)`, white phone icon
- User PiP: Bottom-right corner, 120×160px, `border-radius: var(--radius-lg)`, `border: 2px solid var(--color-primary)`
- Call timer: Top-right, monospace font, semi-transparent

---

### 3.10 FAQ Accordion (`.faq-accordion`)

Cyber-brutalist styled collapsibles.

**Specs:**
- Container: `border: 1px solid var(--color-border)`
- Item separator: `border-bottom: 1px solid var(--color-border-subtle)`
- Question: `font-weight: var(--weight-semibold)`, `padding: var(--space-5)`
- Toggle icon: `+` / `−` with 180° rotation animation
- Answer: `padding: 0 var(--space-5) var(--space-5)`, max-height transition
- Active item: Left border accent `border-left: 3px solid var(--color-primary)`

---

## 4. Keyframe Animations

### 4.1 Pulse Glow (Live Badge)
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 4px var(--color-live); opacity: 1; }
  50%      { box-shadow: 0 0 12px var(--color-live), 0 0 24px rgba(255, 59, 92, 0.4); opacity: 0.8; }
}
```

### 4.2 Marquee Scroll
```css
@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### 4.3 Video Call Zoom In
```css
@keyframes zoom-in {
  0%   { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1);    opacity: 1;   }
}
```

### 4.4 Fade Up (Chat Messages, Cards)
```css
@keyframes fade-up {
  0%   { transform: translateY(12px); opacity: 0; }
  100% { transform: translateY(0);    opacity: 1; }
}
```

### 4.5 Shimmer (Loading Skeletons)
```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0;  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-elevated) 25%,
    var(--color-bg-hover) 50%,
    var(--color-bg-elevated) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### 4.6 Typing Indicator Dots
```css
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30%           { transform: translateY(-6px); }
}

.typing-dot:nth-child(1) { animation-delay: 0ms; }
.typing-dot:nth-child(2) { animation-delay: 150ms; }
.typing-dot:nth-child(3) { animation-delay: 300ms; }
```

### 4.7 Aura Sphere (Creator Studio)
```css
@keyframes aura-pulse {
  0%, 100% { transform: scale(1);    opacity: 0.6; }
  50%      { transform: scale(1.15); opacity: 0.3; }
}
```

### 4.8 Float (Hero Visual)
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-12px); }
}
```

---

## 5. Iconography

- **Icon Library**: Lucide React (consistent, tree-shakeable)
- **Icon Size Scale**: 16px (sm), 20px (md), 24px (lg), 32px (xl)
- **Custom Brand Icons**: DopeKin logo, Twin badge, Creator studio mark
- **Status Icons**: LIVE dot (8px), unread count (16px badge), verified checkmark

---

## 6. Imagery & Media Standards

| Asset Type | Format | Max Size | Notes |
|:-----------|:-------|:---------|:------|
| Twin portraits | WebP + AVIF | 300KB | 3:4 ratio, 600×800px min |
| Hero backgrounds | WebP | 500KB | 1920×1080 max, lazy-load |
| Thumbnails | WebP | 50KB | 300×400px, eager load |
| Icons | SVG | 5KB | Inline or sprite |
| Videos | MP4 (H.264) | 10MB | Autoplay muted, loop |
| Avatars (user) | WebP | 100KB | 1:1 ratio, 256×256px |

---

## 7. Scrollbar Styling

```css
/* Custom scrollbar — neon yellow thin track */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg-base);
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 231, 1, 0.3);
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 231, 1, 0.5);
}
```

---

## 8. Responsive Design Strategy

### Breakpoints (Tailwind v4)

| Name | Width | Grid Columns | Sidebar |
|:-----|:------|:-------------|:--------|
| `xs` | < 480px | 1 | Hidden (bottom tabs) |
| `sm` | 480-640px | 1-2 | Hidden (bottom tabs) |
| `md` | 640-1024px | 2-3 | Collapsed (64px icons) |
| `lg` | 1024-1440px | 3-4 | Full (220px) |
| `xl` | > 1440px | 4-5 | Full (220px) |

### Mobile-Specific Patterns:
- **Bottom Tab Bar**: Home / Explore / Chat / Call / Profile (5 items, 64px height)
- **Swipeable Cards**: Horizontal scroll carousels instead of grids
- **Full-Screen Modals**: Video call, chat, and creator studio fill viewport
- **Pull-to-Refresh**: On feed and chat pages
- **Gesture Navigation**: Swipe-back on chat conversations

---

## 9. Accessibility Requirements

- **Color Contrast**: All text meets WCAG 2.1 AA (4.5:1 body, 3:1 large text)
- **Focus States**: Yellow focus ring (`outline: 2px solid var(--color-primary)`, `outline-offset: 2px`)
- **Keyboard Navigation**: All interactive elements focusable in logical order
- **Screen Reader**: ARIA labels on all icons, badges, and interactive elements
- **Reduced Motion**: `prefers-reduced-motion` query disables all animations
- **Touch Targets**: Minimum 44×44px on mobile

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Dark/Light Mode Strategy

DopeKin is **dark-first by default**. A future light mode can be layered with CSS custom property overrides:

```css
[data-theme="light"] {
  --color-bg-base:      #F8F7FC;
  --color-bg-elevated:  #FFFFFF;
  --color-bg-overlay:   #F0EDF8;
  --color-text-primary: #1A1628;
  --color-text-secondary: rgba(26, 22, 40, 0.6);
  /* ... */
}
```

For v1, dark mode only. Light mode is a stretch goal for v2.
