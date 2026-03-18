import React, { Suspense, useEffect, useRef, useState, useMemo, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";
import CanvasLoader from "../Loader";
import { ThemeContext } from "../../context/ThemeContext";

const Earth = ({ isMobile,darkTheme, active }) => {
const { scene, animations } =  useGLTF("./drone/drone_concept-superopt.glb");

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
    if (active && mixer.current) mixer.current.update(delta);
  });


  const scale = useMemo(() => (isMobile ? 0.9 : 1.3), [isMobile]); // Dynamic scaling based on screen size

  return (
    <mesh>
      <hemisphereLight intensity={isMobile || darkTheme ? 3.5 : 4} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        castShadow={false} // Disable shadows for mobile to boost performance
      />
      <pointLight intensity={isMobile ? 2 : 5} />
      <primitive
        object={scene}
        scale={scale}
        position={isMobile ? [0, 0, 0] : [0, 0, 0]}
        rotation={[-0.7, -20, -0.7]}
      />
    </mesh>
  );
};

const EarthCanvas = ({ active = true }) => {
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
      shadows={false}
      frameloop={active ? "always" : "never"}
      dpr={[1, isMobile ? 1 : 1.25]}
      gl={{
        antialias: true,
        preserveDrawingBuffer: false,
        powerPreference: "default", 
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={({ gl }) => {
        gl.getContext().canvas.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
        });
      }}
      camera={{
        fov: isMobile ? 45 : 60,
        near: 0.1,
        far: 200,
        position: [isMobile ? -3 : -4, isMobile ? 2 : 3, isMobile ? 4 : 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enabled={active}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={active && !isMobile}
          autoRotateSpeed={isMobile ? 0.2 : 0.35}
        />
        <Earth isMobile={isMobile} darkTheme={darkTheme} active={active} />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
