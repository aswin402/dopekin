# Trending Companions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Recent Chats" section on the homepage with a dynamically sorted, visually premium "Trending Companions" section.

**Architecture:** Use a helper function inside the `HomePage` component to parse fan count strings from the store's `twins` data, sort the companions descending, and render the top 3 as vertical cards next to the "Latest Feeds" column.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lucide-react, Zustand.

## Global Constraints
* Maintain the 2-column grid layout next to the "Latest Feeds" column.
* Do not introduce any new npm dependencies.
* Keep the code lint-free.

---

### Task 1: Add Parsing Helper & Sorting Logic

**Files:**
* Modify: `src/pages/HomePage.tsx`

**Interfaces:**
* Consumes: `twins` from Zustand `useAppStore`
* Produces: `trendingCompanions: Twin[]` containing the top 3 twins sorted by fans

- [ ] **Step 1: Write helper function & sorting logic**

Add the helper function and sorting logic in [src/pages/HomePage.tsx](file:///home/aswin/programming/vscode/celestialabs/Dopekin/src/pages/HomePage.tsx):

```typescript
  // Helper to parse fan count strings (e.g. "15.9M FANS" -> 15900000)
  const getFansCount = (fansStr: string): number => {
    const clean = fansStr.toUpperCase().replace('FANS', '').trim();
    if (clean.includes('M')) {
      return parseFloat(clean.replace('M', '')) * 1_000_000;
    }
    if (clean.includes('K')) {
      return parseFloat(clean.replace('K', '')) * 1_000;
    }
    return parseFloat(clean) || 0;
  };

  const trendingCompanions = [...twins]
    .sort((a, b) => getFansCount(b.fans) - getFansCount(a.fans))
    .slice(0, 3);
```

- [ ] **Step 2: Run typecheck to verify there are no compilation errors**

Run: `bun run build` (or `tsc -b`) in the root directory.
Expected: Build passes without compilation errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: add fan parsing and sorting logic for trending companions"
```

---

### Task 2: Replace "Recent Chats" with "Trending Companions" UI

**Files:**
* Modify: `src/pages/HomePage.tsx`

**Interfaces:**
* Consumes: `trendingCompanions: Twin[]` from Task 1

- [ ] **Step 1: Replace Recent Chats section HTML markup**

Replace lines 373-416 in [src/pages/HomePage.tsx](file:///home/aswin/programming/vscode/celestialabs/Dopekin/src/pages/HomePage.tsx) with the new layout using `trendingCompanions`. Assign dynamic badges based on their rank:
* Rank 0: `🔥 Hot`
* Rank 1: `📈 Trending`
* Rank 2: `⭐ Rising`

```tsx
        {/* Trending Companions */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-black uppercase text-white/50 tracking-wider">
              Trending Companions
            </h3>
            <span className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer font-mono" onClick={() => navigate('/explore')}>View all</span>
          </div>

          <div className="flex-1 flex flex-col justify-between gap-4 bg-zinc-950 border border-white/5 rounded-3xl p-6 font-body">
            {trendingCompanions.map((twin, idx) => {
              const badges = ['🔥 Hot', '📈 Trending', '⭐ Rising'];
              const badgeColors = [
                'bg-rose-500/10 text-rose-400 border border-rose-500/25',
                'bg-amber-500/10 text-amber-400 border border-amber-500/25',
                'bg-indigo-500/10 text-indigo-400 border border-indigo-500/25'
              ];
              return (
                <div key={twin.id} className="flex items-center justify-between gap-4 p-1.5 rounded-2xl hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden shrink-0 bg-zinc-950 relative">
                      <img src={twin.avatarUrl} alt={twin.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-sm text-white truncate">{twin.name}</span>
                        <span className={`text-[8px] font-mono font-black px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${badgeColors[idx] || badgeColors[2]}`}>
                          {badges[idx] || '⭐ Rising'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-body truncate mt-0.5 max-w-[15rem] sm:max-w-[20rem]">
                        {twin.profession} • <span className="text-[var(--y)] font-semibold">{twin.vibe}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0 font-mono">
                    <span className="text-[10px] text-zinc-500 font-bold hidden sm:inline">{twin.fans}</span>
                    <button 
                      onClick={() => navigate(`/chat?twin=${twin.id}`)}
                      className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 hover:border-[var(--y)] hover:bg-[var(--y)] hover:text-black flex items-center justify-center text-zinc-400 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
```

- [ ] **Step 2: Run typecheck and lint to verify validity**

Run:
```bash
bun run build
bun run lint
```
Expected: Both build and lint pass successfully.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: replace recent chats with trending companions UI on homepage"
```
