import React, { Suspense, useEffect, useRef, useState, useMemo, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";
import CanvasLoader from "../Loader";
import { ThemeContext } from "../../context/ThemeContext";

const Earth = ({ isMobile,darkTheme }) => {
  const { scene, animations } = useGLTF("./drone/drone_concept-opt.glb");
   useGLTF.preload("./drone/drone_concept-opt.glb");
  const mixer = useRef(null);

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.play();
      });
    }
  }, [animations, scene]);
   useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });


  const scale = useMemo(() => (isMobile ? 0.9 : 1.3), [isMobile]); // Dynamic scaling based on screen size

  return (
    <mesh>
      <hemisphereLight intensity={isMobile || darkTheme ? 4 :  7}  />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        castShadow={!isMobile} // Disable shadows for mobile to boost performance
      />
      <pointLight intensity={isMobile ? 3 : 8} />
      <primitive
        object={scene}
        scale={scale}
        position={isMobile ? [0, 0, 0] : [0, 0, 0]}
        rotation={[-0.7, -20, -0.7]}
      />
    </mesh>
  );
};

const EarthCanvas = () => {
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
      shadows
       frameloop="always" // Optimize by rendering only when necessary
      dpr={[isMobile ? 0.5 : 1, 2]} // Reduce dpr for mobile to save resources
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
      camera={{
        fov: isMobile ? 45 : 60, // Adjust camera for mobile to optimize view
        near: 0.1,
        far: 200,
        position: [isMobile ? -3 : -4, isMobile ? 2 : 3, isMobile ? 4 : 6], // Adjust position for mobile
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={!isMobile} // Disable auto-rotate for mobile
          autoRotateSpeed={isMobile ? 0.2 : 0.5} // Reduce speed for mobile
        />
        <Earth isMobile={isMobile}  darkTheme={darkTheme} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
