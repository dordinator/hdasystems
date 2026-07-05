"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/site";

const SCENE_READY_EVENT = "hda:scene-ready";
const MIN_SHOW_MS = 500; // avoid a flicker on fast/cached loads
const MAX_WAIT_MS = 4500; // hard fallback so it never hangs

export default function Preloader() {
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);
  const start = useRef(Date.now());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const finish = () => {
      const elapsed = Date.now() - start.current;
      const wait = Math.max(0, MIN_SHOW_MS - elapsed);
      timer = setTimeout(() => setReady(true), wait);
    };

    window.addEventListener(SCENE_READY_EVENT, finish);
    const hardStop = setTimeout(finish, MAX_WAIT_MS);

    // lock scroll while the loader is visible
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener(SCENE_READY_EVENT, finish);
      clearTimeout(hardStop);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.style.overflow = "";
    const t = setTimeout(() => setGone(true), 750); // after fade-out
    return () => clearTimeout(t);
  }, [ready]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-base transition-opacity duration-700 ease-out ${
        ready ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* soft warm glow, on-brand */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(196,98,63,0.14),rgba(217,140,106,0.07)_45%,transparent_70%)] blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center gap-6"
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-terra opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-terra" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-ink">
            {BRAND}
          </span>
        </div>

        {/* indeterminate progress bar */}
        <div className="relative h-px w-44 overflow-hidden rounded-full bg-ink/10">
          <motion.div
            className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-accent-terra to-transparent"
            animate={{ x: ["-110%", "320%"] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-ink-faint">
          Preparing experience
        </span>
      </motion.div>
    </div>
  );
}
