# Featured Twins Homepage Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Featured Twins" section immediately following the "Recommended for you" grid on the homepage, displaying all available twins/companions in a grid that replicates the card design from the discover page.

**Architecture:** Use the existing `twins` store data to render all companions in a responsive layout using the visual card styling of `ExplorePage.tsx`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lucide-react.

## Global Constraints
* Render all twins using the exact card style of `ExplorePage.tsx` (width `w-44`, padding `p-3`, aspect ratio `3/4`, hover effects).
* Do not introduce any new npm dependencies.
* Keep the code lint-free.

---

### Task 1: Add "Featured Twins" UI Section on HomePage

**Files:**
* Modify: `src/pages/HomePage.tsx`

**Interfaces:**
* Consumes: `twins` from Zustand `useAppStore`

- [ ] **Step 1: Add the Featured Twins section HTML markup**

Insert the new section immediately after the end of the `RECOMMENDED FOR YOU GRID` wrapper div (after line 386) in [src/pages/HomePage.tsx](file:///home/aswin/programming/vscode/celestialabs/Dopekin/src/pages/HomePage.tsx):

```tsx
      {/* FEATURED TWINS SECTION */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
            Featured Twins
          </h3>
          <Link to="/explore" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-0.5">
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 justify-start">
          {twins.map((twin) => (
            <div 
              key={twin.id}
              className="w-44 p-3 bg-black border border-white/5 rounded-2xl flex flex-col relative group overflow-hidden transition-all duration-300 hover:translate-y-[-6px] hover:border-white/10 shrink-0 text-left"
            >
              {/* Aspect Ratio 3:4 */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-black">
                <img 
                  src={twin.avatarUrl} 
                  alt={twin.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1.5 z-20">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/90 text-white text-[8px] font-extrabold uppercase animate-pulse-glow">
                    <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                    Live
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-black/60 text-[#f5f5f5]/90 text-[8px] font-bold">
                    {twin.price}
                  </span>
                </div>

                {/* Hover Quick Actions */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all z-20 bg-black/50 backdrop-blur-[2px] p-2">
                  <Link 
                    to={`/chat?twin=${twin.id}`}
                    className="flex items-center justify-center gap-1.5 bg-[var(--y)] text-black font-extrabold text-[10px] uppercase w-32 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] border border-black"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </Link>
                  <Link 
                    to={`/chat?twin=${twin.id}&call=true`}
                    className="flex items-center justify-center gap-1.5 bg-black border border-[var(--y)] text-[var(--y)] font-extrabold text-[10px] uppercase w-32 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[2px_2px_0px_rgba(255,235,31,0.2)]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </Link>
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-3 px-1 flex flex-col gap-0.5">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-black text-xs flex items-center gap-1">
                    <span>{twin.name}</span>
                    {twin.isCustom && (
                      <span className="text-[7px] bg-white/10 px-1 py-0.5 rounded text-[#f5f5f5]/60 font-mono">Trained</span>
                    )}
                  </h3>
                  <span className="text-[8px] text-[#f5f5f5]/40 uppercase font-mono font-semibold">{twin.fans}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#f5f5f5]/60 font-body">
                  <span className="truncate max-w-20">{twin.profession}</span>
                  <span className="text-[var(--y)] font-semibold text-[9px] shrink-0">{twin.vibe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
```

- [ ] **Step 2: Run build and lint verification**

Run:
```bash
bun run build
bun run lint
```
Expected: build succeeds, and no new lint issues are introduced.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: add Featured Twins section on homepage"
```
