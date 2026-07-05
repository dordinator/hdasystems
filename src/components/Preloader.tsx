"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/site";
import { preparePage } from "@/lib/preparePage";
import { signalPageReady } from "@/lib/pageReady";
import { isPageReload, scrollToTop } from "@/lib/scroll";

const MIN_SHOW_MS = 400;
const MAX_WAIT_MS = 6000;

export default function Preloader() {
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);
  const start = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;
    let done = false;
    let minTimer: ReturnType<typeof setTimeout>;

    document.documentElement.style.overflow = "hidden";

    const finish = () => {
      if (cancelled || done) return;
      done = true;
      clearTimeout(hardStop);
      signalPageReady();
      const elapsed = Date.now() - start.current;
      const wait = Math.max(0, MIN_SHOW_MS - elapsed);
      minTimer = setTimeout(() => setReady(true), wait);
    };

    const hardStop = setTimeout(finish, MAX_WAIT_MS);

    void preparePage().then(finish);

    return () => {
      cancelled = true;
      clearTimeout(hardStop);
      clearTimeout(minTimer);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.style.overflow = "";
    if (isPageReload() || !window.location.hash) {
      scrollToTop();
    }
    const t = setTimeout(() => setGone(true), 500);
    return () => clearTimeout(t);
  }, [ready]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-base transition-opacity duration-500 ease-out ${
        ready ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
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
