import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-zinc-900/80 border border-white/5 ${className}`}
      {...props}
    />
  );
}

// 3:4 Aspect Ratio Twin Card Skeleton (used in Discover, HomePage Featured, etc.)
export function TwinCardSkeleton() {
  return (
    <div className="w-full aspect-[3/4] bg-zinc-950 border border-white/5 rounded-2xl flex flex-col relative overflow-hidden p-4 justify-between animate-pulse">
      {/* Top Badges */}
      <div className="flex justify-between items-center w-full z-10">
        <Skeleton className="w-14 h-5 rounded-full" />
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>

      {/* Bottom Info */}
      <div className="flex flex-col gap-2 z-10 mt-auto">
        <Skeleton className="w-2/3 h-5 rounded-md" />
        <Skeleton className="w-1/2 h-3.5 rounded-md bg-[var(--y)]/10" />
        <Skeleton className="w-full h-3 rounded-md opacity-60" />
        <Skeleton className="w-4/5 h-3 rounded-md opacity-40" />
      </div>
    </div>
  );
}

// Horizontal Recommended Card Skeleton
export function RecommendedCardSkeleton() {
  return (
    <div className="w-full sm:w-60 max-w-sm sm:max-w-none bg-zinc-950 border border-white/5 rounded-2xl flex flex-col shrink-0 overflow-hidden animate-pulse">
      <div className="aspect-[3/4] w-full bg-zinc-900/80 relative p-3 flex justify-between">
        <Skeleton className="w-14 h-4 rounded-md" />
        <Skeleton className="w-7 h-7 rounded-lg" />
      </div>
      <div className="p-3.5 flex flex-col gap-2 bg-zinc-950">
        <Skeleton className="w-1/2 h-4 rounded-md" />
        <Skeleton className="w-3/4 h-3 rounded-md" />
        <Skeleton className="w-2/3 h-3 rounded-md opacity-50" />
      </div>
    </div>
  );
}

// Avatar Circle Skeleton (used in New Companions row)
export function AvatarCircleSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2.5 shrink-0 animate-pulse">
      <div className="w-28 h-28 rounded-full bg-zinc-900 border border-white/5 p-1 flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-full" />
      </div>
      <Skeleton className="w-16 h-3.5 rounded-md" />
    </div>
  );
}

// Large Promo Banner Skeleton
export function BannerSkeleton() {
  return (
    <div className="w-[calc(100%+2rem)] -mx-4 sm:mx-0 sm:w-full aspect-[1.8/1] sm:aspect-[2.4/1] md:aspect-[2.75/1] lg:aspect-[2.85/1] rounded-none sm:rounded-3xl bg-zinc-950 border-y border-x-0 sm:border border-white/5 p-6 sm:p-10 flex flex-col justify-between animate-pulse">
      <div className="flex justify-between items-start">
        <Skeleton className="w-24 h-5 rounded-full" />
        <Skeleton className="w-12 h-4 rounded-md" />
      </div>
      <div className="flex flex-col gap-3 max-w-lg">
        <Skeleton className="w-3/4 h-8 sm:h-10 rounded-xl" />
        <Skeleton className="w-full h-4 rounded-md opacity-70" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="w-32 h-10 rounded-full" />
        <Skeleton className="w-24 h-10 rounded-full opacity-60" />
      </div>
    </div>
  );
}

// Social Feed Post Skeleton
export function FeedPostSkeleton() {
  return (
    <div className="p-5 bg-black border border-white/5 rounded-2xl flex gap-4 animate-pulse">
      <Skeleton className="w-11 h-11 rounded-full shrink-0" />
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-24 h-4 rounded-md" />
          <Skeleton className="w-16 h-3.5 rounded-md opacity-50" />
        </div>
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-4/5 h-4 rounded-md opacity-70" />
        <div className="flex justify-between items-center pt-2 border-t border-white/5 max-w-md">
          <Skeleton className="w-12 h-4 rounded-md" />
          <Skeleton className="w-12 h-4 rounded-md" />
          <Skeleton className="w-12 h-4 rounded-md" />
          <Skeleton className="w-12 h-4 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// Chat Companion List Item Skeleton
export function ChatCompanionSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950/60 border border-white/5 animate-pulse">
      <Skeleton className="w-12 h-12 rounded-full shrink-0" />
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <div className="flex justify-between items-center">
          <Skeleton className="w-20 h-4 rounded-md" />
          <Skeleton className="w-10 h-3 rounded-md opacity-40" />
        </div>
        <Skeleton className="w-3/4 h-3 rounded-md opacity-60" />
      </div>
    </div>
  );
}

// Chat Bubble Skeleton
export function ChatMessageSkeleton({ isUser = false }: { isUser?: boolean }) {
  return (
    <div className={`flex items-end gap-3 max-w-[80%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
      {!isUser && <Skeleton className="w-8 h-8 rounded-full shrink-0" />}
      <div className={`p-4 rounded-2xl flex flex-col gap-2 ${isUser ? 'bg-zinc-900 border border-white/10' : 'bg-black border border-white/5'}`}>
        <Skeleton className="w-48 h-4 rounded-md" />
        <Skeleton className="w-32 h-3.5 rounded-md opacity-60" />
      </div>
    </div>
  );
}

// Live Stream Page Video Skeleton
export function LiveStreamSkeleton() {
  return (
    <div className="w-full aspect-video rounded-3xl bg-zinc-950 border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden animate-pulse">
      <div className="flex justify-between items-center z-10">
        <Skeleton className="w-20 h-6 rounded-full" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
      <div className="flex justify-center z-10">
        <Skeleton className="w-16 h-16 rounded-full" />
      </div>
      <div className="flex justify-between items-end z-10">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-5 rounded-md" />
          <Skeleton className="w-48 h-3.5 rounded-md opacity-60" />
        </div>
        <Skeleton className="w-24 h-10 rounded-xl" />
      </div>
    </div>
  );
}

// Pricing Card Skeleton
export function PricingCardSkeleton() {
  return (
    <div className="p-8 rounded-3xl bg-zinc-950 border border-white/5 flex flex-col gap-6 animate-pulse">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-28 h-5 rounded-md" />
        <Skeleton className="w-20 h-8 rounded-lg" />
        <Skeleton className="w-full h-4 rounded-md opacity-60" />
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="w-4 h-4 rounded-full shrink-0" />
            <Skeleton className="w-full h-3.5 rounded-md" />
          </div>
        ))}
      </div>
      <Skeleton className="w-full h-12 rounded-2xl" />
    </div>
  );
}
