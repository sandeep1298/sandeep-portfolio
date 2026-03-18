// LazyCanvas.jsx
import { useEffect, useRef, useState } from "react";

export default function LazyCanvas({
  children,
  height = "500px",
  threshold = 0.1,
  rootMargin = "200px 0px",
}) {
  const ref = useRef(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observedNode = ref.current;
    if (!observedNode) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextIsActive = entry.isIntersecting;
        setIsActive((previous) =>
          previous === nextIsActive ? previous : nextIsActive,
        );
        if (nextIsActive) {
          setHasEnteredView(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(observedNode);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const content =
    typeof children === "function" ? children({ active: isActive }) : children;

  return (
    <div
      ref={ref}
      style={{
        height,
        width: "100%",
      }}
    >
      {hasEnteredView ? content : null}
    </div>
  );
}
