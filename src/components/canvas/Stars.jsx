import { useRef, useMemo, Suspense, useContext, useEffect, useState } from "react";
import { Canvas, useFrame, invalidate } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { ThemeContext } from "../../context/ThemeContext";

const LARGE_SCREEN_QUERY = "(min-width: 1025px)";

const Stars = ({ isLargeScreen }) => {
  const ref = useRef();
  const { darkTheme } = useContext(ThemeContext);

  const sphere = useMemo(
    () =>
      random.inSphere(
        new Float32Array((isLargeScreen ? 600 : 800) * 3),
        { radius: isLargeScreen ? 1.05 : 1.2 },
      ),
    [isLargeScreen]
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.02;
      invalidate(); // Render only on change (with frameloop="demand")
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color={darkTheme ? "#ffffff" : "#000000"}
          size={0.0025}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(LARGE_SCREEN_QUERY);
    let idleCallbackId = null;
    let timeoutId = null;

    const clearScheduledRender = () => {
      if (idleCallbackId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
        idleCallbackId = null;
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const scheduleCanvasRender = (matches) => {
      setIsLargeScreen(matches);

      if (!matches) {
        setShouldRenderCanvas(true);
        return;
      }

      setShouldRenderCanvas(false);

      const enableCanvas = () => {
        setShouldRenderCanvas(true);
      };

      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(enableCanvas, {
          timeout: 1200,
        });
      } else {
        timeoutId = window.setTimeout(enableCanvas, 250);
      }
    };

    scheduleCanvasRender(mediaQuery.matches);

    const handleChange = (event) => {
      clearScheduledRender();
      scheduleCanvasRender(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      clearScheduledRender();
    };
  }, []);

  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      {shouldRenderCanvas ? (
        <Canvas
          frameloop="demand"
          dpr={[1, isLargeScreen ? 1.1 : 1.5]}
          camera={{ position: [0, 0, 1] }}
        >
          <Suspense fallback={null}>
            <Stars isLargeScreen={isLargeScreen} />
          </Suspense>
          {!isLargeScreen ? <Preload all /> : null}
        </Canvas>
      ) : null}
    </div>
  );
};

export default StarsCanvas;
