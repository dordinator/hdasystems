import { SCENE_READY_EVENT } from "./pageReady";
import { SEE_IT_IN_ACTION_PATH, seeItInAction } from "./site";

const nextFrame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );

function isHomePage() {
  const path = window.location.pathname;
  return path === "/" || path === "";
}

function isSeeItInActionPage() {
  return window.location.pathname === SEE_IT_IN_ACTION_PATH;
}

function getKnownPosterUrls(): string[] {
  if (!isSeeItInActionPage()) return [];
  return seeItInAction.sections
    .map((section) => section.poster)
    .filter((poster): poster is string => Boolean(poster));
}

function preloadPosterUrls(urls: string[]): Promise<void> {
  if (urls.length === 0) return Promise.resolve();
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        })
    )
  ).then(() => {});
}

/** Scroll the full page while the loader covers the screen so lazy assets start fetching. */
async function warmPageLayout() {
  const max = document.documentElement.scrollHeight;

  window.scrollTo({ top: max, left: 0, behavior: "instant" });
  await nextFrame();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  await nextFrame();
}

function waitForScene(timeoutMs: number): Promise<void> {
  if (!isHomePage()) return Promise.resolve();

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

function waitForVideos(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    let finished = false;
    let scans = 0;
    let sawVideos = false;
    const pending = new Set<HTMLVideoElement>();
    const trackedPosters = new Set<string>();

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
      if (sawVideos) finish();
      else if (scans >= 8) finish();
    };

    const preloadPoster = (src: string) => {
      if (trackedPosters.has(src)) return;
      trackedPosters.add(src);
      const img = new Image();
      img.src = src;
    };

    const trackVideo = (video: HTMLVideoElement) => {
      sawVideos = true;

      const poster = video.getAttribute("poster");
      if (poster) preloadPoster(poster);

      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) return;
      if (pending.has(video)) return;

      const untrack = () => {
        pending.delete(video);
        tryFinish();
      };

      pending.add(video);
      video.addEventListener("loadedmetadata", untrack, { once: true });
      video.addEventListener("error", untrack, { once: true });

      if (video.preload === "none") video.preload = "metadata";
      video.load();
    };

    const scan = () => {
      scans += 1;
      document.querySelectorAll("video").forEach((node) => {
        trackVideo(node as HTMLVideoElement);
      });
      tryFinish();
    };

    getKnownPosterUrls().forEach(preloadPoster);

    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = setTimeout(finish, timeoutMs);
    const poll = setInterval(scan, 150);
    setTimeout(scan, 200);
  });
}

/** Block until fonts, layout, images, videos, and hero scene are ready to show. */
export async function preparePage(): Promise<void> {
  await document.fonts.ready;
  await nextFrame();

  await Promise.all([
    preloadPosterUrls(getKnownPosterUrls()),
    warmPageLayout(),
  ]);
  await nextFrame();

  await Promise.all([
    waitForScene(2500),
    waitForDocumentImages(4000),
    waitForVideos(isSeeItInActionPage() ? 8000 : 3000),
  ]);

  await nextFrame();
}
