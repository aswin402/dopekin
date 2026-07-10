import type { SVGProps } from 'react';

export function HamsterIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Ears */}
      <path d="M6 7a3 3 0 1 1 3-3" />
      <path d="M18 7a3 3 0 1 0-3-3" />
      
      {/* Head shape with chubbiness */}
      <path d="M6 7h12c1.5 0 3 1.5 3 3.5 0 2.5-1 4.5-3 5.5-.5.5-1 1-1.5 1.5-.5.5-1 .5-2 .5H9.5c-1 0-1.5 0-2-.5C7 17 6.5 16.5 6 16c-2-1-3-3-3-5.5C3 8.5 4.5 7 6 7z" />
      
      {/* Eyes */}
      <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
      
      {/* Snout */}
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" stroke="none" />
      
      {/* Split mouth curves (Hamster cheeks) */}
      <path d="M10 14c.5.5 1 .5 2 0s1.5-.5 2 0" />
    </svg>
  );
}
