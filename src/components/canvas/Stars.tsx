import { useRef, useMemo } from "react";
import { useFrame, type CanvasProps } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import type { Points as ThreePoints } from "three";
import { useTheme } from "../../context/theme";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import BaseCanvas from "./BaseCanvas";

const LARGE_SCREEN_QUERY = "(min-width: 1024px)";
const CAMERA: CanvasProps["camera"] = { position: [0, 0, 1] };
const GROUP_ROTATION: [number, number, number] = [0, 0, Math.PI / 4];
const CANVAS_STYLE = { width: "100%", height: "100%" };

interface StarsProps {
  particleCount: number;
  animate: boolean;
}

function Stars({ particleCount, animate }: StarsProps) {
  const ref = useRef<ThreePoints>(null);
  const { darkTheme } = useTheme();

  const sphere = useMemo(
    () =>
      // inSphere fills and returns the array it is given
      random.inSphere(new Float32Array(particleCount * 3), {
        radius: particleCount > 400 ? 1.05 : 1.2,
      }) as Float32Array,
    [particleCount],
  );

  useFrame((_, delta) => {
    if (!animate || !ref.current) return;

    // Clamp so a long pause doesn't make the field jump when it resumes
    const step = Math.min(delta, 0.1) * 0.02;
    ref.current.rotation.x += step;
    ref.current.rotation.y += step;
  });

  return (
    <group rotation={GROUP_ROTATION}>
      <Points key={particleCount} ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={darkTheme ? "#ffffff" : "#000000"}
          size={0.0032}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarsCanvas() {
  const isLargeScreen = useMediaQuery(LARGE_SCREEN_QUERY);
  const prefersReducedMotion = usePrefersReducedMotion();
  const particleCount = isLargeScreen ? 300 : 420;

  return (
    <BaseCanvas
      visible={!prefersReducedMotion}
      antialias={false}
      camera={CAMERA}
      style={CANVAS_STYLE}
    >
      <Stars particleCount={particleCount} animate={!prefersReducedMotion} />
    </BaseCanvas>
  );
}
