"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { PAGE_READY_EVENT } from "@/lib/pageReady";
import {
  isPageReload,
  runScrollRestoration,
  scrollToAnchorWhenReady,
  scrollToTop,
} from "@/lib/scroll";

function scrollHomeHash() {
  if (window.location.pathname !== "/") return;
  const hash = window.location.hash;
  if (hash) scrollToAnchorWhenReady(hash);
}

export default function ScrollRestoration() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  // Run before first paint so reload doesn't flash the old scroll position.
  useLayoutEffect(() => {
    runScrollRestoration();
  }, []);

  useEffect(() => {
    // The preloader unlocks overflow once the page is ready — re-assert top
    // so the browser can't restore an old scroll position underneath it.
    const onPageReady = () => {
      if (isPageReload() || !window.location.hash) {
        scrollToTop();
      }
    };

    window.addEventListener(PAGE_READY_EVENT, onPageReady);
    return () => window.removeEventListener(PAGE_READY_EVENT, onPageReady);
  }, []);

  // Cross-page nav (e.g. /see-it-in-action → /#pricing) — scroll once home renders.
  useEffect(() => {
    if (prevPathname.current === null) {
      prevPathname.current = pathname;
      return;
    }
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    scrollHomeHash();
  }, [pathname]);

  return null;
}
