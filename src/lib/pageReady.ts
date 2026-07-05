export const PAGE_READY_EVENT = "hda:page-ready";
export const SCENE_READY_EVENT = "hda:scene-ready";

type Gate = "hydrated" | "fonts" | "scene";

const REQUIRED: Gate[] = ["hydrated", "fonts", "scene"];
const met = new Set<Gate>();
let resolved = false;

export function isPageReady() {
  return resolved;
}

function resolve() {
  if (resolved) return;
  resolved = true;
  window.dispatchEvent(new Event(PAGE_READY_EVENT));
}

export function markGate(gate: Gate) {
  if (resolved) return;
  met.add(gate);
  if (REQUIRED.every((g) => met.has(g))) resolve();
}

/** Last-resort fallback so the loader never hangs indefinitely. */
export function forcePageReady() {
  resolve();
}
