"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  videoSrc?: string;
  poster?: string;
};

export default function VideoDemo({ title, videoSrc, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  // Load metadata only when the video scrolls into view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.preload === "none") {
          video.preload = "metadata";
          video.load();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  if (!videoSrc) {
    return (
      <div className="overflow-hidden rounded-3xl border border-line bg-base-800">
        <div className="relative flex aspect-video items-center justify-center bg-base-700 px-6 text-center">
          <div>
            <span className="eyebrow">Coming soon</span>
            <p className="mt-3 text-sm text-ink-muted">
              Video walkthrough for this feature is on its way.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    void video.play().catch(() => {
      setStarted(false);
    });
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-ink shadow-[0_26px_50px_-34px_rgba(44,38,32,0.35)]">
      <div className="relative aspect-video bg-ink">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          controls={started}
          playsInline
          preload="none"
          className="demo-video absolute inset-0 h-full w-full object-cover"
          onPlay={() => setStarted(true)}
          onPause={() => {
            if (videoRef.current?.currentTime === 0) setStarted(false);
          }}
          onEnded={() => setStarted(false)}
          onError={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />

        {!started && (
          <button
            type="button"
            onClick={play}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/20 transition-colors hover:bg-ink/30"
            aria-label={`Play ${title} demo`}
          >
            <span className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-accent-terra text-[#fbf5ec] shadow-[0_16px_40px_-12px_rgba(196,98,63,0.85)] transition-transform group-hover:scale-105">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="rounded-full border border-[#fbf5ec]/25 bg-ink/50 px-4 py-1.5 text-sm font-semibold text-[#fbf5ec] backdrop-blur-sm">
              Play demo
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
