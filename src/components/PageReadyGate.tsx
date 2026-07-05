"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import {
  forcePageReady,
  isPageReady,
  markGate,
  PAGE_READY_EVENT,
  SCENE_READY_EVENT,
} from "@/lib/pageReady";
import { waitForPageImages } from "@/lib/preloadImages";

const MAX_WAIT_MS = 5000;

const PageReadyContext = createContext(false);

export function usePageReady() {
  return useContext(PageReadyContext);
}

export default function PageReadyGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(isPageReady());
  const [revealed, setRevealed] = useState(isPageReady());

  useLayoutEffect(() => {
    markGate("hydrated");
    void document.fonts.ready.then(() => markGate("fonts"));

    const onSceneReady = () => markGate("scene");
    window.addEventListener(SCENE_READY_EVENT, onSceneReady);

    void waitForPageImages().then(() => markGate("images"));

    const onPageReady = () => {
      setReady(true);
      setRevealed(true);
    };
    window.addEventListener(PAGE_READY_EVENT, onPageReady);
    if (isPageReady()) onPageReady();

    const hardStop = setTimeout(forcePageReady, MAX_WAIT_MS);

    return () => {
      window.removeEventListener(SCENE_READY_EVENT, onSceneReady);
      window.removeEventListener(PAGE_READY_EVENT, onPageReady);
      clearTimeout(hardStop);
    };
  }, []);

  return (
    <PageReadyContext.Provider value={ready}>
      <div
        className={`relative z-10 transition-opacity duration-700 ease-out ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </PageReadyContext.Provider>
  );
}
