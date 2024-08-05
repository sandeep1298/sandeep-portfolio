import React, { Suspense , useEffect, useRef, useState} from "react";
import { Canvas ,useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";
import CanvasLoader from "../Loader";

const Earth = ({ isMobile }) => {
  const { scene, nodes, materials,animations } = useGLTF("./drone/scene.gltf");
 
  

  const mixer = useRef(null);

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.play();
      });
      //console.log("Animations loaded:", animations);
    } else {
     // console.log("No animations found in the GLTF file.");
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
      //console.log("Mixer updated with delta:", delta);
    }
  });

  return (
    
    <mesh>
      <hemisphereLight intensity={8} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
       
        castShadow
      
      />
      <pointLight intensity={8} />
    <primitive object={scene} scale={1.3} 
      
    
    position={isMobile ? [0, 0, 0] : [0, 0, 0]} rotation={[0, -20, 0]} />
    </mesh>
  
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

 
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
    
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
        
           enableZoom={false}
           maxPolarAngle={Math.PI / 2 }
           minPolarAngle={Math.PI / 2 }
           autoRotate={true}
        
          autoRotateSpeed={0.5}
        />
        <Earth isMobile={isMobile} />

       
      </Suspense>
      <Preload  all  />
    </Canvas>
  );
};

export default EarthCanvas;