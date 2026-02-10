"use client";

import { useId } from "react";

export function Grain() {
  const id = useId();
  return (
    <div className="fixed inset-0 pointer-events-none z-[9000] opacity-[0.05] mix-blend-overlay" aria-hidden="true">
      <svg className="w-full h-full">
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  );
}
