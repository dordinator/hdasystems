"use client";

import { useLayoutEffect, useState } from "react";
import {
  forcePageReady,
  isPageReady,
  markGate,
  PAGE_READY_EVENT,
  SCENE_READY_EVENT,
} from "@/lib/pageReady";

const MAX_WAIT_MS = 8000;

export default function PageReadyGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    markGate("hydrated");
    void document.fonts.ready.then(() => markGate("fonts"));

    const onSceneReady = () => markGate("scene");
    const onPageReady = () => setRevealed(true);

    window.addEventListener(SCENE_READY_EVENT, onSceneReady);
    window.addEventListener(PAGE_READY_EVENT, onPageReady);
    if (isPageReady()) setRevealed(true);

    const hardStop = setTimeout(forcePageReady, MAX_WAIT_MS);

    return () => {
      window.removeEventListener(SCENE_READY_EVENT, onSceneReady);
      window.removeEventListener(PAGE_READY_EVENT, onPageReady);
      clearTimeout(hardStop);
    };
  }, []);

  return (
    <div
      className={`relative z-10 transition-opacity duration-700 ease-out ${
        revealed ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
