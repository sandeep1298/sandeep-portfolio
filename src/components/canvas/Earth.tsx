import { memo, useEffect } from "react";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useTheme } from "../../context/theme";
import { MODEL_PATHS } from "../../constants/models";
import BaseCanvas from "./BaseCanvas";
import CanvasLoader from "./CanvasLoader";
import type { CanvasProps } from "@react-three/fiber";

const CAMERA: CanvasProps["camera"] = { fov: 60, near: 0.1, far: 200, position: [-4, 3, 6] };
const SPOT_POSITION: [number, number, number] = [-20, 50, 10];
const MODEL_POSITION: [number, number, number] = [0, 0, 0];
const MODEL_ROTATION: [number, number, number] = [-0.7, -20, -0.7];

const Earth = memo(function Earth({ darkTheme }: { darkTheme: boolean }) {
  const { scene, animations } = useGLTF(MODEL_PATHS.drone);
  // useAnimations advances the mixer from useFrame, so it pauses with the render loop
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const clips = Object.values(actions);
    clips.forEach((action) => action?.play());
    return () => clips.forEach((action) => action?.stop());
  }, [actions]);

  return (
    <group>
      <hemisphereLight intensity={darkTheme ? 3.5 : 4} />
      <spotLight position={SPOT_POSITION} angle={0.12} penumbra={1} />
      <pointLight intensity={5} />
      <primitive
        object={scene}
        scale={1.3}
        position={MODEL_POSITION}
        rotation={MODEL_ROTATION}
      />
    </group>
  );
});

const EarthCanvas = ({ visible }: { visible: boolean }) => {
  const { darkTheme } = useTheme();

  return (
    <BaseCanvas visible={visible} dpr={1.2} camera={CAMERA} fallback={<CanvasLoader />}>
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.35}
      />
      <Earth darkTheme={darkTheme} />
    </BaseCanvas>
  );
};

export default memo(EarthCanvas);
