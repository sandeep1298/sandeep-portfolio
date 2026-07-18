import { lazy, Suspense, memo, useEffect, useRef, useState } from "react";
import { useInViewport } from "../hooks/useInViewport";
import { useScrollIdle } from "../hooks/useScrollIdle";
import { usePageVisible } from "../hooks/usePageVisible";

const StarsCanvas = lazy(() => import("./canvas/Stars.jsx"));

const StarsBackground = ({
  className = "absolute inset-0 z-[-1]",
  threshold = 0.08,
  rootMargin = "0px 0px",
  enterDelayMs = 150,
  preloadRootMargin = rootMargin,
  preloadThreshold = threshold,
  preloadDelayMs = enterDelayMs,
}) => {
  const containerRef = useRef(null);
  const isScrolling = useScrollIdle();
  const isPageVisible = usePageVisible();
  const [hasMounted, setHasMounted] = useState(false);
  const { ref, isVisible } = useInViewport({
    threshold,
    rootMargin,
    enterDelayMs,
    targetRef: containerRef,
  });
  const { isVisible: shouldMount } = useInViewport({
    threshold: preloadThreshold,
    rootMargin: preloadRootMargin,
    enterDelayMs: preloadDelayMs,
    targetRef: containerRef,
  });

  useEffect(() => {
    if (shouldMount) {
      setHasMounted(true);
    }
  }, [shouldMount]);

  const isActive = isVisible && !isScrolling && isPageVisible;

  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      {hasMounted ? (
        <Suspense fallback={null}>
          <StarsCanvas isActive={isActive} />
        </Suspense>
      ) : null}
    </div>
  );
};

export default memo(StarsBackground);
