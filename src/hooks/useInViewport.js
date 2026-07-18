import { useEffect, useRef, useState } from "react";

/**
 * Instant hide + debounced show — avoids waking WebGL during fast scroll.
 */
export function useInViewport({
  threshold = 0.12,
  rootMargin = "0px 0px",
  enterDelayMs = 200,
  targetRef,
} = {}) {
  const internalRef = useRef(null);
  const ref = targetRef || internalRef;
  const visibleRef = useRef(false);
  const ratioRef = useRef(0);
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
          if (ratioRef.current !== ratio) {
            ratioRef.current = ratio;
            setIntersectionRatio(ratio);
          }

          if (!intersecting) {
            window.clearTimeout(enterTimeoutId);
            enterTimeoutId = null;
            if (visibleRef.current) {
              visibleRef.current = false;
              setIsVisible(false);
            }
            frameId = null;
            return;
          }

          window.clearTimeout(enterTimeoutId);
          enterTimeoutId = window.setTimeout(() => {
            if (!visibleRef.current) {
              visibleRef.current = true;
              setIsVisible(true);
            }
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
  }, [enterDelayMs, ref, rootMargin, threshold]);

  return { ref, isVisible, intersectionRatio };
}
