import { caseStudies } from "./site";

/** Local screenshots preloaded in document head for faster first paint. */
export const PAGE_IMAGE_URLS = caseStudies.map((cs) => cs.screenshot);
