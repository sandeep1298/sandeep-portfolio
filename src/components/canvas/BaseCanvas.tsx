import { Suspense, useEffect, type ReactNode } from "react";
import { Canvas, useThree, type CanvasProps, type RootState } from "@react-three/fiber";
import { useIsScrolling } from "../../hooks/useScroll";
import { usePageVisible } from "../../hooks/usePageVisible";

// Don't re-measure the canvas on page scroll — only real resizes matter
const RESIZE_OPTIONS = { scroll: false, debounce: { scroll: 0, resize: 200 } };

/**
 * Runs the render loop only while the canvas is on screen, the tab is visible and the
 * page isn't scrolling. When paused it falls back to "demand", so the last frame stays
 * drawn and resizes/model loads still render a single frame. It subscribes to the scroll
 * store itself, so pausing never re-renders the parent React tree.
 */
function FrameloopController({ visible }: { visible: boolean }) {
  const isScrolling = useIsScrolling();
  const isPageVisible = usePageVisible();
  const setFrameloop = useThree((state) => state.setFrameloop);
  const getState = useThree((state) => state.get);

  const frameloop = visible && isPageVisible && !isScrolling ? "always" : "demand";

  // No dependency list on purpose: <Canvas> re-applies its own `frameloop` prop whenever
  // it re-renders, so re-assert ours after every render.
  useEffect(() => {
    if (getState().frameloop !== frameloop) setFrameloop(frameloop);
  });

  return null;
}

function handleCreated({ gl }: RootState) {
  // Let the browser restore the context instead of leaving a dead canvas
  gl.domElement.addEventListener("webglcontextlost", (event: Event) => {
    event.preventDefault();
  });
}

interface BaseCanvasProps extends Omit<CanvasProps, "children" | "dpr" | "gl" | "frameloop"> {
  /** Run the render loop (when false it renders on demand only). */
  visible?: boolean;
  /** Upper bound for the device pixel ratio. */
  dpr?: number;
  antialias?: boolean;
  /** Shown inside the canvas while the scene suspends (e.g. a model loading). */
  fallback?: ReactNode;
  children: ReactNode;
}

/** Shared <Canvas> setup for every 3D scene on the page. */
export default function BaseCanvas({
  visible = true,
  dpr = 1,
  antialias = true,
  fallback = null,
  children,
  ...canvasProps
}: BaseCanvasProps) {
  return (
    <Canvas
      frameloop={visible ? "always" : "demand"}
      dpr={[1, dpr]}
      resize={RESIZE_OPTIONS}
      gl={{
        antialias,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      onCreated={handleCreated}
      {...canvasProps}
    >
      <FrameloopController visible={visible} />
      <Suspense fallback={fallback}>{children}</Suspense>
    </Canvas>
  );
}
