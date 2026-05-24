import { useEffect, useRef, useState } from "react";

/**
 * Instant hide + debounced show — avoids waking WebGL during fast scroll.
 */
export function useInViewport({
  threshold = 0.12,
  rootMargin = "0px 0px",
  enterDelayMs = 200,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let enterTimeoutId = null;
    let frameId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const intersecting = entry.isIntersecting && ratio >= threshold;

        if (frameId !== null) {
          window.cancelAnimationFrame(frameId);
        }

        frameId = window.requestAnimationFrame(() => {
          setIntersectionRatio(ratio);

          if (!intersecting) {
            window.clearTimeout(enterTimeoutId);
            enterTimeoutId = null;
            setIsVisible(false);
            frameId = null;
            return;
          }

          window.clearTimeout(enterTimeoutId);
          enterTimeoutId = window.setTimeout(() => {
            setIsVisible(true);
          }, enterDelayMs);

          frameId = null;
        });
      },
      { threshold: [0, threshold, 0.25, 0.5, 0.75, 1], rootMargin },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(enterTimeoutId);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [enterDelayMs, rootMargin, threshold]);

  return { ref, isVisible, intersectionRatio };
}
