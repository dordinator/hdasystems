"use client";

import { useCallback, useState } from "react";

export default function DemoPdf({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const [hint, setHint] = useState(true);
  const dismiss = useCallback(() => setHint(false), []);

  return (
    <div
      className="relative h-full w-full"
      onWheel={dismiss}
      onPointerDown={dismiss}
    >
      <iframe
        src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
        title={title}
        loading="lazy"
        className="h-full w-full bg-white"
      />

      {/* Compact, unobtrusive nudge pinned to the bottom edge. */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4 transition-opacity duration-300 ${
          hint ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-base-50/95 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink shadow-card-sm backdrop-blur-sm">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce text-accent-coral"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
          Scroll to see the full roadmap
        </span>
      </div>
    </div>
  );
}
