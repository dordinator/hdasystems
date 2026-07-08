"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CAL_URL } from "@/lib/site";

export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      // show after the hero, hide near the very bottom (contact section)
      setShow(y > window.innerHeight * 0.9 && y < max - 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-2xl border-2 border-ink bg-base-50 py-2 pl-5 pr-2 shadow-card"
        >
          <span className="text-sm font-medium text-ink">
            Ready to grow? <span className="text-ink-muted">from £99/mo</span>
          </span>
          <span className="btn-primary !py-2 !px-4 text-sm">
            Book a call
            <span aria-hidden>↗</span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
