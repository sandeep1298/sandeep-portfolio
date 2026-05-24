import { Suspense, useEffect, useRef, useMemo, useContext, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";
import CanvasLoader from "../Loader";
import { ThemeContext } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const MODEL_PATH = "./drone/drone_concept-superopt.glb";

const Earth = memo(function Earth({ isMobile, darkTheme, active }) {
  const { scene, animations } = useGLTF(MODEL_PATH);
  const mixer = useRef(null);

  useEffect(() => {
    if (!animations?.length) return undefined;

    mixer.current = new AnimationMixer(scene);
    animations.forEach((clip) => {
      mixer.current.clipAction(clip).play();
    });

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current = null;
      }
    };
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (active && mixer.current) {
      mixer.current.update(delta);
    }
  });

  const scale = useMemo(() => (isMobile ? 0.9 : 1.3), [isMobile]);

  return (
    <mesh>
      <hemisphereLight intensity={isMobile || darkTheme ? 3.5 : 4} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        castShadow={false}
      />
      <pointLight intensity={isMobile ? 2 : 5} />
      <primitive
        object={scene}
        scale={scale}
        position={[0, 0, 0]}
        rotation={[-0.7, -20, -0.7]}
      />
    </mesh>
  );
});

const EarthCanvas = ({ active = true }) => {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const { darkTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (active) {
      useGLTF.preload(MODEL_PATH);
    }
  }, [active]);

  return (
    <Canvas
      performance={{ min: 0.5, max: 1, debounce: 200 }}
      shadows={false}
      frameloop={active ? "always" : "never"}
      dpr={[1, isMobile ? 1 : 1.2]}
      gl={{
        antialias: !isMobile,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={({ gl }) => {
        gl.getContext().canvas.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
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

export default memo(EarthCanvas);
