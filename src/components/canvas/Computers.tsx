import { memo } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useTheme } from "../../context/theme";
import { MODEL_PATHS } from "../../constants/models";
import BaseCanvas from "./BaseCanvas";
import CanvasLoader from "./CanvasLoader";
import type { CanvasProps } from "@react-three/fiber";

const CAMERA: CanvasProps["camera"] = { position: [15, 2, 5], fov: 30 };
const MODEL_POSITION: [number, number, number] = [2, -2, -2];
const MODEL_ROTATION: [number, number, number] = [0, 0.9, -0.1];

const Computers = memo(function Computers({ darkTheme }: { darkTheme: boolean }) {
  const { scene } = useGLTF(MODEL_PATHS.computer);

  return (
    <group>
      <hemisphereLight intensity={darkTheme ? 0.8 : 0} />
      <pointLight intensity={40} />
      <ambientLight intensity={0.5} />
      <primitive
        object={scene}
        scale={0.58}
        position={MODEL_POSITION}
        rotation={MODEL_ROTATION}
      />
    </group>
  );
});

const ComputersCanvas = ({ visible }: { visible: boolean }) => {
  const { darkTheme } = useTheme();

  return (
    <BaseCanvas visible={visible} dpr={1.1} camera={CAMERA} fallback={<CanvasLoader />}>
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.35}
      />
      <Computers darkTheme={darkTheme} />
    </BaseCanvas>
  );
};

export default memo(ComputersCanvas);
