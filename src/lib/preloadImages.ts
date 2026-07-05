import { caseStudies } from "./site";

/** Local images that must be cached before the preloader dismisses. */
export const PAGE_IMAGE_URLS = [
  ...caseStudies.map((cs) => cs.screenshot),
] as const;

function preloadOne(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

/** Prefetch hero page screenshots — never waits on iframes or off-screen lazy assets. */
export function waitForPageImages(timeoutMs = 2500): Promise<void> {
  return Promise.race([
    Promise.all(PAGE_IMAGE_URLS.map(preloadOne)).then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}
