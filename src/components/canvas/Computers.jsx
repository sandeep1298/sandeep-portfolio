import React, { Suspense, useContext, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { ThemeContext } from "../../context/ThemeContext";

const Computers = ({ isMobile,darkTheme }) => {
  const computer =  useGLTF("./desktop_pc/wall-e_and_eve-opt.glb")
 

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

const ComputersCanvas = ({ active = true }) => {
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
      frameloop={active ? "always" : "never"}
      shadows={false}
      dpr={[1, isMobile ? 1 : 1.15]}
      camera={{ position: [15, 2, 5], fov: 30 }}
      gl={{
        antialias: true,
        preserveDrawingBuffer: false,
        powerPreference: "default",
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
          enabled={active}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={active}
          autoRotateSpeed={0.35}
        />
        <Computers isMobile={isMobile} darkTheme={darkTheme} />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;
