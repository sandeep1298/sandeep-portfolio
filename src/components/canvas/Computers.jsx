import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useMemo(() => useGLTF("./desktop_pc/scene.gltf"), []);

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={isMobile ? 0.5 : 0.8} // Lower intensity for mobile
        castShadow={!isMobile}          // Disable shadows on mobile
        shadow-mapSize={isMobile ? 256 : 512} // Lower shadow resolution on mobile
      />
      <pointLight intensity={isMobile ? 50 : 80} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.7}      // Reduced scale for mobile
        position={isMobile ? [1.5, -3, -2.5] : [1.5, -2.8, -3.5]}
        rotation={[0, 0.9, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      frameloop="demand"                     // Render only when needed
      shadows={!isMobile}                    // Disable shadows on mobile
      dpr={[isMobile ? 0.5 : 1, 2]}          // Reduce dpr for mobile
      camera={{ position: [15, 2, 5], fov: 30 }} // Adjusted camera for less render load
      gl={{ antialias: !isMobile, preserveDrawingBuffer: true }} // No antialias on mobile
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={!isMobile}            // Disable auto-rotate on mobile
          autoRotateSpeed={0.5}             // Reduce auto-rotate speed for smoother experience
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
