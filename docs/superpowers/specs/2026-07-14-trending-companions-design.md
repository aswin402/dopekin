# Design Specification: Trending Companions Homepage Section

This document details the plan to replace the "Recent Chats" section on the homepage with a dynamic "Trending Companions" section.

## Goals & Context
* **Objective:** Replace the existing "Recent Chats" container inside the homepage column layout with a "Trending Companions" container.
* **Layout Integrity:** Maintain the existing two-column responsive grid next to the "Latest Feeds" section.
* **Visual Excellence:** Build a high-quality vertical row layout displaying rich avatars, names, dynamic badges (e.g. `🔥 Hot`, `📈 Trending`), fan counts, and direct action triggers.

## Architecture & Data Flow

### 1. Data Selection (Dynamic Parsing)
We will fetch the companions dynamically from the `twins` store (`useAppStore`). Since the fan count is represented as a string like `"15.9M FANS"` or `"800K FANS"`, we will parse it to determine the ranking:
* Extract the numeric part (e.g. `15.9` or `800`).
* Adjust for the suffix multiplier (`M` for millions, `K` for thousands).
* Sort the companions descending based on this calculated score.
* Take the top 3 highest-rated companions as the trending list.

### 2. Badge Assignment
To make the list dynamic and visually appealing, each trending companion will receive a badge:
1. Rank 1: `🔥 Hot`
2. Rank 2: `📈 Trending`
3. Rank 3: `⭐ Rising`

### 3. Component Details
In [src/pages/HomePage.tsx](file:///home/aswin/programming/vscode/celestialabs/Dopekin/src/pages/HomePage.tsx):
* Replace the `Recent Chats` title header and its container block.
* Header will show `Trending Companions` and a `View all` link that navigates to `/explore`.
* Inside the container, render the top 3 trending companions.
* Each row will show:
  * Avatar image with a sleek circle frame.
  * Name and Profession.
  * The trending badge (e.g., in a colorful, eye-catching text badge style).
  * Fan count (e.g., `5.4M Fans` or `800K Fans`) rendered in a clean font.
  * A `Chat` button linking directly to `/chat?twin={twinId}`.

## Implementation Details

### Parsing Helper Function
```typescript
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
```

### Sorted Companions Selection
```typescript
const trendingCompanions = [...twins]
  .sort((a, b) => getFansCount(b.fans) - getFansCount(a.fans))
  .slice(0, 3);
```

## Verification & Testing Plan
* **Layout Check:** Verify that the "Trending Companions" layout fits perfectly next to "Latest Feeds" on both mobile and desktop screens.
* **Dynamic Sorting:** Verify that sorting works correctly by ensuring the list contains the three companions with the highest fans.
* **Navigation Check:** Ensure the `View all` link successfully routes to `/explore`, and clicking the `Chat` button routes to the correct companion's chat screen.
