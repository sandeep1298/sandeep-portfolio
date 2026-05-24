import { useRef, useMemo, Suspense, useContext, useEffect } from "react";
import { Canvas, useFrame, invalidate } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { ThemeContext } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const LARGE_SCREEN_QUERY = "(min-width: 1025px)";

/** Restarts the render loop after tab focus / visibility return. */
function StarsAnimationDriver({ isActive }) {
  useEffect(() => {
    if (!isActive) return undefined;

    const kickRenderLoop = () => {
      invalidate();
    };

    const handleVisibility = () => {
      if (!document.hidden) {
        kickRenderLoop();
      }
    };

    kickRenderLoop();
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", kickRenderLoop);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", kickRenderLoop);
    };
  }, [isActive]);

  return null;
}

const Stars = ({ particleCount, isActive }) => {
  const ref = useRef();
  const { darkTheme } = useContext(ThemeContext);

  const sphere = useMemo(
    () =>
      random.inSphere(new Float32Array(particleCount * 3), {
        radius: particleCount > 400 ? 1.05 : 1.2,
      }),
    [particleCount],
  );

  useFrame((_, delta) => {
    if (!isActive || !ref.current) return;

    ref.current.rotation.x += delta * 0.02;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <>
      <StarsAnimationDriver isActive={isActive} />
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled>
          <PointMaterial
            transparent
            color={darkTheme ? "#ffffff" : "#000000"}
            size={0.0032}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>
      </group>
    </>
  );
};

const StarsCanvas = ({ isActive = true }) => {
  const isLargeScreen = useMediaQuery(LARGE_SCREEN_QUERY);
  const prefersReducedMotion = usePrefersReducedMotion();

  const particleCount = useMemo(() => {
    if (prefersReducedMotion) return 0;
    if (isLargeScreen) return 300;
    return 420;
  }, [isLargeScreen, prefersReducedMotion]);

  if (particleCount === 0) {
    return null;
  }

  return (
    <Canvas
      frameloop={isActive ? "always" : "never"}
      dpr={[1, isLargeScreen ? 1 : 1.2]}
      camera={{ position: [0, 0, 1] }}
      gl={{ powerPreference: "high-performance", antialias: false }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <Stars particleCount={particleCount} isActive={isActive} />
      </Suspense>
    </Canvas>
  );
};

export default StarsCanvas;
