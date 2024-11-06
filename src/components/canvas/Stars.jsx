import { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();

  // Dynamically adjust particle count based on screen size
  const particleCount = window.innerWidth < 500 ? 3000 : 5000;
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(particleCount), { radius: 1.2 }),
    [particleCount]
  );

  // Rotate particles using useFrame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.020; // Reduced speed
      ref.current.rotation.y += delta * 0.020; // Reduced speed
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
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
        frameloop="always" // Change to 'always' to ensure constant rendering for animation
        dpr={[1, 1.5]}
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
