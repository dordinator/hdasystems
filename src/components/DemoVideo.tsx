"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function fmt(t: number) {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* Demo video with custom, on-brand controls: play/pause, skip ±10s,
   seek scrubber and mute. Looped by default; sound on unless muted. */
export default function DemoVideo({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onTime = () => setCurrent(v.currentTime);
    const onMeta = () => {
      setDuration(v.duration);
      // Nudge to the first frame so it renders as a poster (no black box).
      if (v.currentTime < 0.05) {
        try {
          v.currentTime = 0.05;
        } catch {
          /* seeking not ready yet */
        }
      }
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      setStarted(true);
      v.play();
    } else v.pause();
  }, []);

  const skip = useCallback((delta: number) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = Math.min(
      Math.max(0, v.currentTime + delta),
      v.duration || v.currentTime
    );
  }, []);

  const toggleMute = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const seek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = ref.current;
    if (!v || !v.duration) return;
    const pct = Number(e.target.value) / 100;
    v.currentTime = pct * v.duration;
    setCurrent(v.currentTime);
  }, []);

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="group/vid flex h-full w-full flex-col bg-white">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <video
          ref={ref}
          src={`${src}#t=0.1`}
          loop
          muted={muted}
          playsInline
          preload="metadata"
          aria-label={title}
          onClick={togglePlay}
          className="h-full w-full cursor-pointer bg-white object-contain"
        />

        {/* Big play overlay — shown until the video is playing */}
        {!playing && (
          <button
            onClick={togglePlay}
            aria-label="Play demo"
            className="group/play absolute inset-0 flex items-center justify-center bg-ink/10 transition-colors hover:bg-ink/20"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-accent-coral text-white shadow-card transition-transform duration-150 group-hover/play:scale-105 group-active/play:scale-95">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-0.5"
              >
                <path d="M7 5l12 7-12 7z" />
              </svg>
            </span>
            {!started && (
              <span className="absolute bottom-6 rounded-lg border-2 border-ink bg-base-50 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink shadow-card-sm">
                Watch demo
              </span>
            )}
          </button>
        )}
      </div>

      {/* control bar — below the video so nothing in-frame gets covered */}
      <div className="flex flex-none items-center gap-2.5 border-t-2 border-ink bg-base-50 px-3 py-2">
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border-2 border-ink bg-accent-coral text-white transition-transform active:translate-y-0.5"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 5l12 7-12 7z" />
            </svg>
          )}
        </button>

        <button
          onClick={() => skip(-10)}
          aria-label="Back 10 seconds"
          className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border-2 border-ink bg-base-50 text-ink transition-transform active:translate-y-0.5"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 17l-5-5 5-5" />
            <path d="M18 17l-5-5 5-5" />
          </svg>
        </button>

        <button
          onClick={() => skip(10)}
          aria-label="Forward 10 seconds"
          className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border-2 border-ink bg-base-50 text-ink transition-transform active:translate-y-0.5"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 17l5-5-5-5" />
            <path d="M6 17l5-5-5-5" />
          </svg>
        </button>

        <span className="flex-none font-mono text-[11px] font-semibold text-ink-muted">
          {fmt(current)} / {fmt(duration)}
        </span>

        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={pct}
          onChange={seek}
          aria-label="Seek"
          className="hda-scrubber h-1.5 flex-1 cursor-pointer appearance-none rounded-full border border-ink"
          style={{
            background: `linear-gradient(to right, #E86A4A ${pct}%, #E7DFD2 ${pct}%)`,
          }}
        />

        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border-2 border-ink bg-base-50 text-ink transition-transform active:translate-y-0.5"
        >
          {muted ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <path d="m22 9-6 6M16 9l6 6" />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M19 5a9 9 0 0 1 0 14" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
