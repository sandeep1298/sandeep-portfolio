import { useState, useEffect, useRef, useMemo, Suspense, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { ThemeContext } from "../../context/ThemeContext";

const Stars = (props) => {
  const ref = useRef();
  const [particleCount, setParticleCount] = useState(getParticleCount());
  const { darkTheme } = useContext(ThemeContext);

  // Function to determine particle count based on screen width
  function getParticleCount() {
    if (window.innerWidth < 500) return 1500; // Mobile
    if (window.innerWidth < 1024) return 1500; // Tablet
    return 1500; // Desktop
  }

  useEffect(() => {
    const handleResize = () => {
      setParticleCount(getParticleCount());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sphere = useMemo(
    () => random.inSphere(new Float32Array(particleCount * 3), { radius: 1.2 }),
    [particleCount]
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={darkTheme ? "#ffffff" : "#000000"}
          size={0.003}
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
        frameloop="always"
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
