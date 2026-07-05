import { SCENE_READY_EVENT } from "./pageReady";

const nextFrame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );

/** Scroll the full page while the loader covers the screen so lazy assets start fetching. */
async function warmPageLayout() {
  const root = document.documentElement;
  const y = window.scrollY;
  const max = root.scrollHeight;

  window.scrollTo({ top: max, left: 0, behavior: "instant" });
  await nextFrame();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  await nextFrame();
}

function waitForScene(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    const done = () => {
      window.removeEventListener(SCENE_READY_EVENT, onReady);
      clearTimeout(timer);
      resolve();
    };
    const onReady = () => done();
    window.addEventListener(SCENE_READY_EVENT, onReady);
    const timer = setTimeout(done, timeoutMs);
  });
}

function waitForDocumentImages(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    let finished = false;
    let scans = 0;
    let sawPending = false;
    const pending = new Set<HTMLImageElement>();

    const finish = () => {
      if (finished) return;
      finished = true;
      observer.disconnect();
      clearTimeout(timer);
      clearInterval(poll);
      resolve();
    };

    const tryFinish = () => {
      if (pending.size > 0) return;
      // Avoid resolving before hydration has painted <img> nodes into the tree.
      if (sawPending || scans >= 4) finish();
    };

    const scan = () => {
      scans += 1;
      document.querySelectorAll("img").forEach((node) => {
        const img = node as HTMLImageElement;
        img.loading = "eager";
        if (img.complete) return;
        if (pending.has(img)) return;

        sawPending = true;
        const untrack = () => {
          pending.delete(img);
          tryFinish();
        };
        pending.add(img);
        img.addEventListener("load", untrack, { once: true });
        img.addEventListener("error", untrack, { once: true });
      });

      tryFinish();
    };

    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = setTimeout(finish, timeoutMs);
    const poll = setInterval(scan, 150);
    setTimeout(scan, 200);
  });
}

/** Block until fonts, layout, images, and hero scene are ready to show. */
export async function preparePage(): Promise<void> {
  await document.fonts.ready;
  await nextFrame();

  await warmPageLayout();
  await nextFrame();

  await Promise.all([
    waitForScene(2500),
    waitForDocumentImages(4000),
  ]);

  await nextFrame();
}
