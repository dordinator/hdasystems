"use client";

import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // On a plain refresh (no #hash), start at the top. Hash links like #demo
    // are intentional — leave those to the browser.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
