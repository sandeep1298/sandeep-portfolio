import { lazy, Suspense, memo } from "react";

const StarsCanvas = lazy(() => import("./Stars"));

/** One fixed star field behind the whole page: it never moves or repaints on scroll. */
function StarsBackground() {
  return (
    <div
      aria-hidden="true"
      className="stars-layer pointer-events-none fixed inset-x-0 top-0 -z-10"
    >
      <Suspense fallback={null}>
        <StarsCanvas />
      </Suspense>
    </div>
  );
}

export default memo(StarsBackground);
