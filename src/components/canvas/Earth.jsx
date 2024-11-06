import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";
import CanvasLoader from "../Loader";

const Earth = ({ isMobile }) => {
  const { scene, animations } = useGLTF("./drone/scene.gltf");
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
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  const scale = useMemo(() => (isMobile ? 0.9 : 1.3), [isMobile]); // Dynamic scaling based on screen size

  return (
    <mesh>
      <hemisphereLight intensity={isMobile ? 4 : 8} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={isMobile ? 0.5 : 1}
        castShadow={!isMobile} // Disable shadows for mobile to boost performance
      />
      <pointLight intensity={isMobile ? 3 : 8} />
      <primitive
        object={scene}
        scale={scale}
        position={isMobile ? [0, 0, 0] : [0, 0, 0]}
        rotation={[0, -20, 0]}
      />
    </mesh>
  );
};

const EarthCanvas = () => {
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
      shadows
      frameloop="demand" // Optimize by rendering only when necessary
      dpr={[isMobile ? 0.5 : 1, 2]} // Reduce dpr for mobile to save resources
      gl={{ antialias: !isMobile, preserveDrawingBuffer: true }} // Disable antialiasing for mobile
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
        <Earth isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
