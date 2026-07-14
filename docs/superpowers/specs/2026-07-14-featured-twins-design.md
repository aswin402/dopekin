# Design Specification: Featured Twins Homepage Section

This document details the plan to insert a "Featured Twins" section on the homepage showing all twins in a grid, matching the style on the discover/explore page.

## Goals & Context
* **Objective:** Insert a new "Featured Twins" section showing all companions immediately below the "Recommended for you" section and above the "Trending Companions & Latest Feeds" section.
* **Layout Consistency:** Use the exact card design, dimensions, hover actions, and styling from the Discover page ([src/pages/ExplorePage.tsx](file:///home/aswin/programming/vscode/celestialabs/Dopekin/src/pages/ExplorePage.tsx)) for visual consistency.
* **Aesthetics:** Display the companions in a clean, responsive layout.

## Location
In [src/pages/HomePage.tsx](file:///home/aswin/programming/vscode/celestialabs/Dopekin/src/pages/HomePage.tsx):
* Insert after the end of the `RECOMMENDED FOR YOU GRID` wrapper div (after line 386).
* Insert before the `DOUBLE SECTION ROW: TRENDING COMPANIONS & LATEST FEEDS` wrapper div.

## Card Details & Styling
Each card in the "Featured Twins" section will show:
* **Dimensions:** Width `w-44` with padding `p-3`, border, and rounded corners (`rounded-2xl`). Hover transition translates the card slightly upwards (`hover:translate-y-[-6px]`).
* **Media Frame:** 3:4 aspect ratio with the companion's avatar.
* **Badges:** Absolute positioned overlay badges showing "Live" (animated pulse glow) and price (e.g. "Free").
* **Hover Overlay:** Slide-in or fade-in overlay showing a yellow "Chat" button and a dark bordered "Call" button.
* **Text Info:** Name, dynamic fan count, profession, and vibe.

## Navigation
* The "Chat" button will route to `/chat?twin={twinId}`.
* The "Call" button will route to `/chat?twin={twinId}&call=true`.
