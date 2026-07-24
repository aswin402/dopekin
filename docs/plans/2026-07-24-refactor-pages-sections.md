# Modular Page Architecture Refactoring Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor Dopekin's large, monolithic page files (`ChatPage.tsx`, `CreatorPage.tsx`, `HomePage.tsx`, and `LandingPage.tsx`) into subfolder structures with localized modular sections (e.g. `src/pages/ChatPage/sections/...`) to improve codebase readability, ease of modification, and component maintenance.

**Architecture:** Split each major page into a directory containing an `index.tsx` (the orchestrator and layout page container) and a `sections/` folder containing isolated, typed presentation or layout subcomponents. State logic remains managed either in Zustand or passed down cleanly via props to subcomponents.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Zustand.

---

## Phase 1: ChatPage Refactoring

### Task 1.1: Create WalletGate Component
**Files:**
- Create: `src/pages/ChatPage/sections/WalletGate.tsx`

**Steps:**
1. Create `WalletGate.tsx` extracting the wallet connection UI from `src/pages/ChatPage.tsx:257-289`.
2. Ensure types are declared:
```tsx
import { Wallet } from 'lucide-react';

interface WalletGateProps {
  onConnect: () => void;
}

export function WalletGate({ onConnect }: WalletGateProps) {
  return (
    <div className="h-[calc(100vh-8rem)] lg:h-screen w-full flex items-center justify-center bg-black p-4 select-none">
      <div className="max-w-md w-full p-8 md:p-10 rounded-[32px] bg-zinc-950 border border-white/10 flex flex-col items-center text-center gap-6 shadow-[0_0_50px_rgba(255,231,1,0.15)]">
        <div className="w-16 h-16 rounded-full bg-black border border-[var(--y)] flex items-center justify-center shadow-[0_0_15px_rgba(255,231,1,0.2)]">
          <span className="font-heading font-black text-2xl text-[var(--y)]">W</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xl md:text-2xl font-heading font-black uppercase text-white tracking-tight">
            Connect Your Wallet
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 font-body leading-relaxed max-w-xs mx-auto">
            Connect your AppKit wallet to DopaMint to continue and check your reward eligibility.
          </p>
        </div>
        <button
          onClick={onConnect}
          className="mt-2 w-full py-3.5 px-6 rounded-2xl bg-[var(--y)] text-black font-extrabold uppercase text-xs md:text-sm tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </button>
      </div>
    </div>
  );
}
```
3. Commit the new component:
```bash
git add src/pages/ChatPage/sections/WalletGate.tsx
git commit -m "refactor: create WalletGate section subcomponent"
```

---

### Task 1.2: Create ChatSidebar Component
**Files:**
- Create: `src/pages/ChatPage/sections/ChatSidebar.tsx`

**Steps:**
1. Extract the sidebar conversation listing panel from `src/pages/ChatPage.tsx:294-432`.
2. Add necessary types for activeTwin, twins list, conversations navigation click callbacks, search triggers, and unread badges.
3. Commit:
```bash
git add src/pages/ChatPage/sections/ChatSidebar.tsx
git commit -m "refactor: create ChatSidebar section subcomponent"
```

---

### Task 1.3: Create VideoCallOverlay Component
**Files:**
- Create: `src/pages/ChatPage/sections/VideoCallOverlay.tsx`

**Steps:**
1. Extract the video FaceTime call full-screen overlay component from `src/pages/ChatPage.tsx:435-523`.
2. Propagate props: `twin`, `callTime`, `isMuted`, `isVideoOff`, `callSubtitle`, `isFullscreen`, `onToggleMute`, `onToggleVideo`, `onToggleFullscreen`, `onEndCall`.
3. Commit:
```bash
git add src/pages/ChatPage/sections/VideoCallOverlay.tsx
git commit -m "refactor: create VideoCallOverlay section subcomponent"
```

---

### Task 1.4: Create ProfileSidebar Component
**Files:**
- Create: `src/pages/ChatPage/sections/ProfileSidebar.tsx`

**Steps:**
1. Extract the right-hand side panel showing details of the active twin, social links (Instagram/TikTok), gallery grid from `src/pages/ChatPage.tsx:644-710`.
2. Declare component props interface and export cleanly.
3. Commit:
```bash
git add src/pages/ChatPage/sections/ProfileSidebar.tsx
git commit -m "refactor: create ProfileSidebar section subcomponent"
```

---

### Task 1.5: Create ChatWindow Component
**Files:**
- Create: `src/pages/ChatPage/sections/ChatWindow.tsx`

**Steps:**
1. Extract the central chat workspace (header info, message bubbles flow, typing animations, bottom message box and voice note controls) from `src/pages/ChatPage.tsx:526-641`.
2. Pass relevant handlers: `messages`, `inputText`, `setInputText`, `isTyping`, `isLocked`, `onSendText`, `onSendVoice`, `onStartCall`, `onToggleProfileSidebar`, `onToggleChatList`.
3. Commit:
```bash
git add src/pages/ChatPage/sections/ChatWindow.tsx
git commit -m "refactor: create ChatWindow section subcomponent"
```

---

### Task 1.6: Rewrite ChatPage Entrypoint
**Files:**
- Create: `src/pages/ChatPage/index.tsx`
- Delete: `src/pages/ChatPage.tsx`
- Modify: `src/App.tsx` (only if folder resolution requires it; else keep standard import)

**Steps:**
1. Create `src/pages/ChatPage/index.tsx` assembling all the extracted subcomponents and holding the state/effects logic.
2. Verify all references to Zustand, hooks, searchParams, and SpeechSynthesis functions compile correctly.
3. Delete the legacy monolithic file `src/pages/ChatPage.tsx`.
4. Run code validation/lint.
5. Commit:
```bash
git rm src/pages/ChatPage.tsx
git add src/pages/ChatPage/index.tsx
git commit -m "refactor: assemble modular ChatPage from sections"
```

---

## Phase 2: CreatorPage Refactoring

### Task 2.1: Extract Step Components
**Files:**
- Create: `src/pages/CreatorPage/sections/StepBio.tsx`
- Create: `src/pages/CreatorPage/sections/StepPresence.tsx`
- Create: `src/pages/CreatorPage/sections/StepVoice.tsx`
- Create: `src/pages/CreatorPage/sections/StepBrain.tsx`
- Create: `src/pages/CreatorPage/sections/StepDeploy.tsx`

**Steps:**
1. Split each step block from `src/pages/CreatorPage.tsx` into a separate file inside `sections/`.
2. Ensure camera stream states, audio waveform variables, logs triggers, and consent checklists are exposed through typed handlers or shared states.
3. Commit step files:
```bash
git add src/pages/CreatorPage/sections/Step*.tsx
git commit -m "refactor: create separate Step sections for Creator Studio"
```

---

### Task 2.2: Rewrite CreatorPage Entrypoint
**Files:**
- Create: `src/pages/CreatorPage/index.tsx`
- Delete: `src/pages/CreatorPage.tsx`

**Steps:**
1. Assemble the wizard layout inside `src/pages/CreatorPage/index.tsx`, importing the step sections.
2. Delete the legacy `src/pages/CreatorPage.tsx` file.
3. Commit:
```bash
git rm src/pages/CreatorPage.tsx
git add src/pages/CreatorPage/index.tsx
git commit -m "refactor: assemble modular CreatorPage"
```

---

## Phase 3: HomePage Refactoring

### Task 3.1: Extract Sub-Sections
**Files:**
- Create: `src/pages/HomePage/sections/PromoBanner.tsx`
- Create: `src/pages/HomePage/sections/DashboardStats.tsx`
- Create: `src/pages/HomePage/sections/FavoritesRow.tsx`
- Create: `src/pages/HomePage/sections/ContinueChatting.tsx`

**Steps:**
1. Move the interactive banner carousel (with mouse/touch swipe parameters), stats dashboard, favorites circle lists, and recent active chats elements to files under `src/pages/HomePage/sections/`.
2. Commit:
```bash
git add src/pages/HomePage/sections/*.tsx
git commit -m "refactor: create homepage section subcomponents"
```

---

### Task 3.2: Rewrite HomePage Entrypoint
**Files:**
- Create: `src/pages/HomePage/index.tsx`
- Delete: `src/pages/HomePage.tsx`

**Steps:**
1. Write the main frame in `src/pages/HomePage/index.tsx`, integrating the newly created section subcomponents.
2. Delete the old file `src/pages/HomePage.tsx`.
3. Commit:
```bash
git rm src/pages/HomePage.tsx
git add src/pages/HomePage/index.tsx
git commit -m "refactor: assemble modular HomePage"
```

---

## Phase 4: LandingPage Refactoring

### Task 4.1: Extract Sub-Sections
**Files:**
- Create: `src/pages/LandingPage/sections/HeroSection.tsx`
- Create: `src/pages/LandingPage/sections/TwinShowcase.tsx`
- Create: `src/pages/LandingPage/sections/HowItWorks.tsx`
- Create: `src/pages/LandingPage/sections/FeatureHighlights.tsx`
- Create: `src/pages/LandingPage/sections/FAQSection.tsx`
- Create: `src/pages/LandingPage/sections/FooterSection.tsx`
- Create: `src/pages/LandingPage/sections/NotificationWidget.tsx`

**Steps:**
1. Separate landing blocks into modular components inside `src/pages/LandingPage/sections/`.
2. Ensure state timers for showcases, scroll handlers for widgets, and accordion click handlers remain typed and clean.
3. Commit:
```bash
git add src/pages/LandingPage/sections/*.tsx
git commit -m "refactor: create landing page section components"
```

---

### Task 4.2: Rewrite LandingPage Entrypoint
**Files:**
- Create: `src/pages/LandingPage/index.tsx`
- Delete: `src/pages/LandingPage.tsx`

**Steps:**
1. Re-assemble `src/pages/LandingPage/index.tsx` with all the sections.
2. Remove the old monolithic file.
3. Validate routing links and compile.
4. Commit:
```bash
git rm src/pages/LandingPage.tsx
git add src/pages/LandingPage/index.tsx
git commit -m "refactor: assemble modular LandingPage and verify all routes"
```
