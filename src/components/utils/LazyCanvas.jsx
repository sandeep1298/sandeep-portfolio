import { useEffect, useState, memo } from "react";
import { useInViewport } from "../../hooks/useInViewport";
import { useScrollIdle } from "../../hooks/useScrollIdle";
import { useWebGLFocus } from "../../hooks/useWebGLFocus";
import { usePageVisible } from "../../hooks/usePageVisible";

function LazyCanvas({
  children,
  canvasId,
  height = "500px",
  threshold = 0.15,
  rootMargin = "0px 0px",
  enterDelayMs = 220,
}) {
  const isScrolling = useScrollIdle();
  const isPageVisible = usePageVisible();
  const { ref, isVisible, intersectionRatio } = useInViewport({
    threshold,
    rootMargin,
    enterDelayMs,
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setHasMounted(true);
    }
  }, [isVisible]);

  const isFocused = useWebGLFocus(canvasId, isVisible, intersectionRatio);
  const isActive = isFocused && !isScrolling && isPageVisible;

  const content =
    typeof children === "function" ? children({ active: isActive }) : children;

  return (
    <div
      ref={ref}
      style={{ height, width: "100%" }}
      className={isActive ? undefined : "pointer-events-none"}
    >
      {hasMounted ? content : null}
    </div>
  );
}

export default memo(LazyCanvas);
