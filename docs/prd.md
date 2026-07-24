# Product Requirements Document (PRD) — DopeKin Rebuild [COMPLETED] 🚀

## 1. Project Vision & Purpose
DopeKin is a premium web platform that enables creators and users to build, customize, and engage in real-time conversation (both text-based and FaceTime audio calls) with high-fidelity digital twins. 

The objective of this rebuild has been successfully achieved, porting the legacy high-friction, static HTML website into a state-of-the-art Single Page Application (SPA) powered by **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Zustand**. All modules compile cleanly with robust type safety, component modularity, instant routing transitions, and reliable local caching.

---

## 2. Core Functional Requirements (Implemented)

### A. Persistent Navigation Shell & Sidebar Layout
*   **Adaptive Sidebar**:
    *   Persistent on desktop (`width: 220px`), overlay/collapsible on mobile.
    *   Links: `Home`, `Feed` (Twitter/X style), `Chat` (Active digital twins workspace), `Live` (Twin stream simulations), and `Create Twin` (Creator Studio).
    *   Dynamic badges: Active pulsing red `LIVE` tag on the Stream link, custom unread message bubble counts.
*   **Top Navigation Bar**:
    *   Sticky at top, featuring the branding logo wordmark (`DopeKin`).
    *   Search bar with instant keyup filtering of the twin grid.
    *   Category selector tags (All, Models, Musicians, Athletes, Comedians, Creators).

### B. Dynamic Homepage Spotlight & Cards Grid
*   **Spotlight Hero**: High-fidelity banner showcasing the default digital twin (Vale) with action triggers to launch custom twins.
*   **Twin Portrait Grid**: 
    *   Displays pre-configured default twins (Vale, Sarang, Serina, Aiko, Cody, Carlos) along with any custom user-generated twins.
    *   Interactive card triggers: hover scaling (`1.08x`), hover translations (`-8px`), neon yellow overlay CTA, subscriber price labels.
    *   Inline Delete: A discrete red trashcan button on custom twins that prompts for deletion with confirmation.
*   **Accordion FAQ Panel**: Cyber-brutalist collapsibles explaining Twin technology, latency, capabilities, and pricing.
*   **Load More Pagination**: Paginated batches that append twin cards.

### C. Creator Studio (Onboarding Wizard)
*   **Step 1: Onboarding Bio**: Form capture for Twin Name, Profession (with custom selection support), Vibe description, Archetype select, and default visual prompt.
*   **Step 2: Presence Calibration**:
    *   Upload tab (5 angles: front, left, right, smiling, neutral).
    *   Webcam capture tab (accesses camera stream and snaps 5 snapshots).
    *   Mobile QR mock sync.
*   **Step 3: Vocal Training**:
    *   Voice wave telemetry simulation.
    *   Mock voice recording trigger showing dynamic CSS scales.
*   **Step 4: Cognitive Ingestion**:
    *   Drag & drop files with mock terminal lines printing initialization logs.
*   **Step 5: Configure & Launch**:
    *   FaceTime validation call modal.
    *   LocalStorage synchronization.

### D. Direct Chat Workspace
*   **Dynamic Messaging Feed**: Alternating AI response bubbles, typing feedback state ("..." loader).
*   **FaceTime Audio/Video Call Overlay**:
    *   Twin background video streaming (looping `/kyle-video.mp4` path).
    *   FaceTime duration clock counting.
    *   Web Speech synthesis speaking out chosen twin answers.
*   **Subscription Lock**: Gated window for twins with pricing models, prompting subscribe events.

### E. Twin Stream Simulation
*   **Twitch-Style Player**: Fit-to-screen theater frame loading `/Banner video.mp4` with play/pause, volume control, viewer count overlays, and verified badge.
*   **Live Stream Chat**: Dynamic user badges (`VIP`, `SUB`, `MOD`), scrolling mock comments, and a comment input form.

---

## 3. Storage & State Synchronization

*   **State Hydration**: On launch, the app pulls the custom twin profiles from the local storage arrays.
*   **`window.name` Bridge**: For filesystem protocol (`file:///`) portability, all custom twin additions are stringified to `window.name` so data traverses page updates safely.

---

## 4. Key Performance Indicators (KPIs) (Achieved)
*   **Time to Interactive (TTI)**: Under 1.5 seconds.
*   **Lighthouse Performance**: Target > 90 across mobile/desktop.
*   **Storage Boundaries**: Fail-safe cleaning logic that drops large base64 image strings if local storage limits are saturated.
