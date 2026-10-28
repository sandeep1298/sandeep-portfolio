import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html as="div" center className="flex flex-col items-center justify-center">
      <span className="canvas-loader" />
      <p className="mt-10 text-sm font-extrabold text-[#1A1A1A] dark:text-[#F1F1F1]">
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
