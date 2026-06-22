import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";

import CanvasLoader from "../loader";

type BallProps = {
  imgUrl: string;
  isMobile: boolean;
  prefersReducedMotion: boolean;
};

// Ball
const Ball = ({ imgUrl, isMobile, prefersReducedMotion }: BallProps) => {
  // use texture from drei
  const [decal] = useTexture([imgUrl]);

  return (
    <Float 
      speed={prefersReducedMotion ? 0 : isMobile ? 1.2 : 1.75}
      rotationIntensity={prefersReducedMotion ? 0 : isMobile ? 0.5 : 1}
      floatIntensity={prefersReducedMotion ? 0 : isMobile ? 1 : 2}
    >
      {/* Lights */}
      <ambientLight intensity={isMobile ? 0.35 : 0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      {/* Mesh */}
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, isMobile ? 0 : 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

type BallCanvasProps = {
  icon: string;
};

// Ball Canvas
const BallCanvas = ({ icon }: BallCanvasProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if device is Mobile
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setIsMobile(mediaQuery.matches);

    // Check if user prefers reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    // Handle changes
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return (
    <Canvas 
      frameloop="demand"
      dpr={isMobile ? 1 : [1, 1.5]}
      gl={{ powerPreference: "high-performance", preserveDrawingBuffer: true, antialias: isMobile ? false : true }}
    >
      {/* Show canvas loader on fallback */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />
      </Suspense>

      {/* Preload all */}
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
