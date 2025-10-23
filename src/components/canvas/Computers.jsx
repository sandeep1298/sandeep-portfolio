import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useMemo(() => useGLTF("./desktop_pc/wall-e_and_eve-opt.glb"), []);
  useGLTF.preload("./desktop_pc/wall-e_and_eve-opt.glb");

  return (
    <mesh>
      <hemisphereLight intensity={0.8}  />
      
      <pointLight intensity={isMobile ? 30 : 40} />
      <ambientLight intensity={0.5} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.58}      // Increase scale for mobile, decrease for large screens
        position={isMobile ? [1.5, -3, -2.5] : [2, -2, -2]}
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
       frameloop="always"                   // Render only when needed
      shadows={false}                    // Disable shadows on mobile
     dpr={[1, isMobile ? 1.2 : 1.2]}      // Reduce dpr for mobile
   camera={{ position: [15, 2, 5], fov: 30 }}
    gl={{
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance",
  }}
   
    >
      <Suspense fallback={<CanvasLoader />} >
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={true}            // Disable auto-rotate on mobile
          autoRotateSpeed={0.5}             // Reduce auto-rotate speed for smoother experience
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
