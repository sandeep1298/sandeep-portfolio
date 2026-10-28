import { useRef, useCallback, type PointerEvent } from "react";

/**
 * Cursor-following glow: writes `--spot-x` / `--spot-y` (px) on the element so CSS can
 * position a radial gradient. Updates at most once per frame, mouse only.
 */
export function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || frameRef.current !== null) return;

    const { clientX, clientY } = event;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const element = ref.current;
      if (!element) return;

      // Measured per frame (not cached) so the glow stays under the cursor while scrolling
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--spot-x", `${clientX - rect.left}px`);
      element.style.setProperty("--spot-y", `${clientY - rect.top}px`);
    });
  }, []);

  return { ref, onPointerMove };
}
