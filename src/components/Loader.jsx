import { Html, useProgress } from "@react-three/drei";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";



const CanvasLoader = () => {
  const { darkTheme } = useContext(ThemeContext);
  const { progress } = useProgress();
  return (
    <Html
      as='div'
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className='canvas-loader'></span>
      <p
        style={{
          fontSize: 14,
          color: darkTheme ? "#F1F1F1" : "#1A1A1A", 
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;