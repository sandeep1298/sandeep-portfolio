import React, { Suspense, useEffect, useState, useMemo, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { ThemeContext } from "../../context/ThemeContext";

const Computers = ({ isMobile,darkTheme }) => {
  const computer = useMemo(() => useGLTF("./desktop_pc/wall-e_and_eve-opt.glb"), []);
  useGLTF.preload("./desktop_pc/wall-e_and_eve-opt.glb");

  return (
    <mesh>
      <hemisphereLight intensity={ darkTheme ? 0.8 : 0}  />
      
      <pointLight intensity={isMobile ? 30 : 40} />
      <ambientLight intensity={0.5} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.58}
        position={isMobile ? [1.5, -3, -2.5] : [2, -2, -2]}
        rotation={[0, 0.9, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  const { darkTheme } = useContext(ThemeContext);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
    performance={{ min: 0.5 }} 
       frameloop="always"                   // Render only when needed
      shadows={false}                    // Disable shadows on mobile
     dpr={[1, isMobile ? 1.2 : 1.2]}      // Reduce dpr for mobile
   camera={{ position: [15, 2, 5], fov: 30 }}
    gl={{
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance",
     failIfMajorPerformanceCaveat: false,
  }}
    onCreated={({ gl }) => {
    gl.getContext().canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      console.warn("WebGL context lost");
    });
  }}
  
    >
      <Suspense fallback={<CanvasLoader />} >
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={true}           
          autoRotateSpeed={0.5} 
        />
        <Computers isMobile={isMobile} darkTheme={darkTheme} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
