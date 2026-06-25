import { useEffect, useState } from "react";

let hasLoaded = false;

/**
 * Simulates a page-level loading state.
 * Returns `true` for the given duration, then `false`.
 * Plays only once per refresh.
 */
export function usePageLoading(durationMs = 1200): boolean {
  const [isLoading, setIsLoading] = useState(!hasLoaded);

  useEffect(() => {
    if (hasLoaded) return;

    const timer = setTimeout(() => {
      hasLoaded = true;
      setIsLoading(false);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs]);

  return isLoading;
}
