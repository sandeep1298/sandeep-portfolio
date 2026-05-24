import { Suspense, useContext, useEffect, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { ThemeContext } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const MODEL_PATH = "./desktop_pc/wall-e_and_eve-opt.glb";

const Computers = memo(function Computers({ isMobile, darkTheme }) {
  const computer = useGLTF(MODEL_PATH);

  return (
    <mesh>
      <hemisphereLight intensity={darkTheme ? 0.8 : 0} />
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
});

const ComputersCanvas = ({ active = true }) => {
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
      frameloop={active ? "always" : "never"}
      shadows={false}
      dpr={[1, isMobile ? 1 : 1.1]}
      camera={{ position: [15, 2, 5], fov: 30 }}
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
    >
      <Suspense fallback={<CanvasLoader />}>
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

export default memo(ComputersCanvas);
