import { useRef, useMemo, Suspense, useContext } from "react";
import { Canvas, useFrame, invalidate } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { ThemeContext } from "../../context/ThemeContext";

const Stars = () => {
  const ref = useRef();
  const { darkTheme } = useContext(ThemeContext);

  // Compute the particle positions ONCE
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(800 * 3), { radius: 1.2 }),
    []
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
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
        frameloop="demand"         // major performance improvement
        dpr={[1, 1.5]}             // optimized DPR
        camera={{ position: [0, 0, 1] }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
