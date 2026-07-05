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
        <>
          {/* Mobile — compact single-line CTA */}
          <motion.a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="btn-primary fixed bottom-4 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap !px-6 !py-3 text-sm shadow-[0_20px_50px_-20px_rgba(44,38,32,0.45)] md:hidden"
          >
            Book a call
            <span aria-hidden>↗</span>
          </motion.a>

          {/* Desktop — unchanged pill with context */}
          <motion.a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-line bg-base-800/90 py-2 pl-5 pr-2 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(44,38,32,0.45)] md:flex"
          >
            <span className="text-sm font-medium text-ink">
              Ready to grow? <span className="text-ink-muted">£299/mo</span>
            </span>
            <span className="btn-primary !px-4 !py-2 text-sm">
              Book a call
              <span aria-hidden>↗</span>
            </span>
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
