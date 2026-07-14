# Design Specification: Featured Twins Card Size & Video Play on Hover

This document specifies the design changes to make the "Featured Twins" cards larger, play their respective videos on hover, and style them similar to the uploaded image inside our theme without separate Chat/Call buttons.

## Goals & Context
* **Card Resizing:** Increase card width to `w-64` (256px) and keep the 3:4 aspect ratio.
* **Hover Video Playback:** Instead of static auto-playing videos, videos will start paused and play on hover.
* **Text Overlay Layout:** Place the text information (Name, Vibe/Profession, and a bio snippet) directly inside the card as an overlay at the bottom with a dark gradient backing.
* **Card Navigation:** The entire card will be wrapped in a React Router `Link` component that navigates directly to the chat page: `/chat?twin={twinId}`.
* **No Quick Actions:** There will be no separate "Chat" or "Call" buttons appearing on hover.

## Location & Structure
In [src/pages/HomePage.tsx](file:///home/aswin/programming/vscode/celestialabs/Dopekin/src/pages/HomePage.tsx):
* Modify the mapping of `twins` inside the `Featured Twins` section.
* Move the text block inside the aspect ratio container, positioned absolute at the bottom.
* Wrap the entire card container in a React Router `Link`.

## Video Playback Behavior
* The `<video>` tag will be configured with `muted`, `loop`, `playsInline` and will not have `autoPlay`.
* The card container will have mouse listeners:
  * `onMouseEnter`: Play the nested video element.
  * `onMouseLeave`: Pause the nested video element and reset its time to `0`.
