# Featured Twins Card Size & Video Hover Play Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify the "Featured Twins" section on the homepage to display cards with `w-64` width, play videos on hover, overlay the companion's details/bio at the bottom, and navigate to the chat page upon clicking.

**Architecture:** Use video DOM properties with mouse event listeners on the card container to programmatically control playback. Style text and gradient overlays using absolute positioning.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lucide-react.

## Global Constraints
* Cards must be `w-64` (256px wide) with a 3:4 aspect ratio.
* Videos must start paused and only play when the card is hovered.
* Bio, Name, and Vibe/Profession must be overlaid on the bottom of the card with a dark gradient backing.
* The entire card must link to `/chat?twin={twinId}`.
* Do not introduce any new npm dependencies.
* Keep the code lint-free.

---

### Task 1: Update Featured Twins section in HomePage

**Files:**
* Modify: `src/pages/HomePage.tsx`

**Interfaces:**
* Consumes: `twins` from Zustand `useAppStore`

- [ ] **Step 1: Replace Featured Twins section HTML markup**

Modify the "Featured Twins" section mapping in [src/pages/HomePage.tsx](file:///home/aswin/programming/vscode/celestialabs/Dopekin/src/pages/HomePage.tsx):
* Add `onMouseEnter` and `onMouseLeave` handlers to play/pause the video.
* Place the text info overlay at the bottom of the card.
* Wrap the entire card container in a React Router `Link` navigating to `/chat?twin={twin.id}`.

```tsx
        <div className="flex flex-wrap gap-6 justify-start">
          {twins.map((twin) => (
            <Link 
              key={twin.id}
              to={`/chat?twin=${twin.id}`}
              onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.play().catch(err => console.log('Playback prevented', err));
                }
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}
              className="w-64 aspect-[3/4] bg-black border border-[var(--border)] rounded-2xl flex flex-col relative group overflow-hidden transition-all duration-300 hover:translate-y-[-6px] hover:border-[var(--border2)] shrink-0 text-left cursor-pointer"
            >
              {/* Card Media (Image/Video) */}
              <div className="absolute inset-0 w-full h-full bg-zinc-900">
                {twin.videoUrl ? (
                  <video 
                    src={twin.videoUrl}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                ) : (
                  <img 
                    src={twin.avatarUrl} 
                    alt={twin.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                )}
              </div>

              {/* Bottom Dark Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-1.5 z-20">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/90 text-white text-[8px] font-extrabold uppercase animate-pulse-glow">
                  <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                  Live
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black/60 text-[#f5f5f5]/90 text-[8px] font-bold">
                  {twin.price}
                </span>
              </div>

              {/* Overlaid Text Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col gap-1 text-left">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-heading font-black text-lg text-white">
                    {twin.name}
                  </h4>
                  <span className="text-[9px] font-bold text-[var(--y)] tracking-wide uppercase">
                    {twin.vibe}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-semibold font-mono uppercase tracking-wider">
                  {twin.profession} • {twin.fans}
                </span>
                <p className="text-[11px] text-zinc-300 font-body leading-relaxed line-clamp-2 mt-1">
                  {twin.bio}
                </p>
              </div>
            </Link>
          ))}
        </div>
```

- [ ] **Step 2: Run build and lint verification**

Run:
```bash
bun run build
bun run lint
```
Expected: Build and lint pass without any errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: implement video hover play and overlaid w-64 cards for Featured Twins"
```
