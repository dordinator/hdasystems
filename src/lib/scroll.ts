"use client";

export function isPageReload() {
  const nav = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function clearUrlHash() {
  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }
}

/** Smooth-scroll to an on-page anchor without leaving a hash in the URL. */
export function scrollToAnchor(href: string) {
  if (!href.startsWith("#")) return;

  const id = href.slice(1);
  if (!id || id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    clearUrlHash();
    return;
  }

  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  clearUrlHash();
}

/** Retry scrolling until the target exists — needed after cross-page navigation. */
export function scrollToAnchorWhenReady(
  href: string,
  { maxAttempts = 40, intervalMs = 50 } = {}
) {
  if (!href.startsWith("#")) return;

  const id = href.slice(1);
  if (!id || id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    clearUrlHash();
    return;
  }

  let attempts = 0;
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      clearUrlHash();
      return;
    }

    attempts += 1;
    if (attempts < maxAttempts) {
      setTimeout(tryScroll, intervalMs);
    }
  };

  tryScroll();
}

/** Keep reloads at the top; strip stale #hash fragments left by nav clicks. */
export function runScrollRestoration() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  if (isPageReload()) {
    clearUrlHash();
    scrollToTop();
    return;
  }

  if (!window.location.hash) {
    scrollToTop();
  }
}
