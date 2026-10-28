import { memo, useState, type ReactNode } from "react";
import { useInViewport } from "../../hooks/useInViewport";
import { useMediaQuery } from "../../hooks/useMediaQuery";

/**
 * Mounts a 3D scene once it gets near the viewport and keeps it mounted afterwards, so
 * scrolling back never re-parses models or recompiles shaders. `children` is a render
 * function receiving `{ visible }`.
 */
interface LazyCanvasProps {
  children: (state: { visible: boolean }) => ReactNode;
  className?: string;
  /** How far outside the viewport to start mounting (IntersectionObserver rootMargin). */
  nearMargin?: string;
  /** Fraction of the element that must be on screen to count as visible. */
  threshold?: number;
}

function LazyCanvas({ children, className = "", nearMargin, threshold }: LazyCanvasProps) {
  const { ref, isNear, isVisible } = useInViewport<HTMLDivElement>({ nearMargin, threshold });
  const [hasMounted, setHasMounted] = useState(false);
  // On touch screens let swipes over the model scroll the page instead of rotating it
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");

  if (isNear && !hasMounted) {
    setHasMounted(true);
  }

  const interactive = isVisible && !isCoarsePointer;

  return (
    <div
      ref={ref}
      className={`${className} ${interactive ? "" : "pointer-events-none"}`}
    >
      {hasMounted ? children({ visible: isVisible }) : null}
    </div>
  );
}

export default memo(LazyCanvas);
