"use client";

import { useEffect, useState } from "react";
import AnchorLink from "@/components/AnchorLink";
import { BRAND, CAL_URL, nav } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 pl-5 transition-all duration-500 md:px-3 md:py-2 md:pl-6 ${
          scrolled
            ? "border border-line bg-base-800/80 backdrop-blur-xl shadow-[0_20px_50px_-32px_rgba(44,38,32,0.4)]"
            : "border border-transparent bg-transparent"
        }`}
      >
        <AnchorLink href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-terra opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-terra" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-ink">
            {BRAND}
          </span>
        </AnchorLink>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <AnchorLink
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {item.label}
            </AnchorLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden md:inline-flex"
          >
            Book a call
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-[72px] glass flex flex-col gap-1 p-4 md:hidden">
          {nav.map((item) => (
            <AnchorLink
              key={item.href}
              href={item.href}
              onNavigate={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base text-ink-muted hover:bg-ink/5 hover:text-ink"
            >
              {item.label}
            </AnchorLink>
          ))}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 justify-center"
          >
            Book a call
          </a>
        </div>
      )}
    </header>
  );
}
