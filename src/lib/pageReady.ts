export const PAGE_READY_EVENT = "hda:page-ready";
export const SCENE_READY_EVENT = "hda:scene-ready";

export function signalPageReady() {
  window.dispatchEvent(new Event(PAGE_READY_EVENT));
}

export function signalSceneReady() {
  window.dispatchEvent(new Event(SCENE_READY_EVENT));
}
