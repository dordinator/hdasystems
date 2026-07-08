"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/site";

const SHOW_MS = 420; // brief brand flash, no 3D wait

export default function Preloader() {
  const pathname = usePathname();
  const enabled = pathname === "/";
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const t = setTimeout(() => setReady(true), SHOW_MS);
    return () => clearTimeout(t);
  }, [enabled]);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setGone(true), 600);
    return () => clearTimeout(t);
  }, [ready]);

  if (!enabled || gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-base transition-opacity duration-500 ease-out ${
        ready ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-5"
      >
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-accent-coral" />
          <span className="text-lg font-semibold tracking-tight text-ink">
            {BRAND}
          </span>
        </div>
        <div className="relative h-1.5 w-44 overflow-hidden rounded-full border-2 border-ink bg-base-100">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-accent-coral"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.42, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
