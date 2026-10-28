import { useEffect, useRef, useState } from "react";

/**
 * `isNear` — element is within `nearMargin` of the viewport (use it to mount/preload).
 * `isVisible` — at least `threshold` of the element is on screen (use it to animate).
 */
interface InViewportOptions {
  nearMargin?: string;
  threshold?: number;
}

export function useInViewport<T extends Element = HTMLDivElement>({
  nearMargin = "600px 0px",
  threshold = 0.15,
}: InViewportOptions = {}) {
  const ref = useRef<T>(null);
  const [isNear, setIsNear] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const nearObserver = new IntersectionObserver(
      ([entry]) => setIsNear(entry.isIntersecting),
      { rootMargin: nearMargin },
    );
    const visibleObserver = new IntersectionObserver(
      ([entry]) =>
        setIsVisible(
          entry.isIntersecting && entry.intersectionRatio >= threshold,
        ),
      { threshold: [0, threshold] },
    );

    nearObserver.observe(node);
    visibleObserver.observe(node);

    return () => {
      nearObserver.disconnect();
      visibleObserver.disconnect();
    };
  }, [nearMargin, threshold]);

  return { ref, isNear, isVisible };
}
