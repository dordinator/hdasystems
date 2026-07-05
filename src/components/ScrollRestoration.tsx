"use client";

import { useEffect, useLayoutEffect } from "react";
import { PAGE_READY_EVENT } from "@/lib/pageReady";
import { isPageReload, runScrollRestoration, scrollToTop } from "@/lib/scroll";

export default function ScrollRestoration() {
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

  return null;
}
