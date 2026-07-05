import { useSyncExternalStore } from "react";

/** True only after hydration — safe for deferring client-only UI without mismatches. */
export function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
