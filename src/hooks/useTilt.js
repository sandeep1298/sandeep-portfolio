import { useRef, useCallback } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Lightweight pointer tilt (react-tilt defaults: max 45, scale 1, speed 450). */
export function useTilt({ max = 45, scale = 1, speed = 450 } = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const onMouseMove = useCallback(
    (event) => {
      if (prefersReducedMotion || !ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    },
    [max, scale, prefersReducedMotion],
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(${scale}, ${scale}, ${scale})`;
  }, [scale]);

  const tiltStyle = prefersReducedMotion
    ? undefined
    : {
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
        transformStyle: "preserve-3d",
      };

  return { ref, onMouseMove, onMouseLeave, tiltStyle };
}
