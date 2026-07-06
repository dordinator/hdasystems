import { caseStudies, seeItInAction } from "./site";

/** Local images preloaded in document head for faster first paint. */
export const PAGE_IMAGE_URLS = [
  ...caseStudies.map((cs) => cs.screenshot),
  ...seeItInAction.sections
    .map((section) => section.poster)
    .filter((poster): poster is string => Boolean(poster)),
];
