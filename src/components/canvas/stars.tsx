import { Points, PointMaterial, Preload } from "@react-three/drei";
import { Canvas, type ThreeElements, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useRef, Suspense, useState, useEffect } from "react";
import type { Points as PointsType } from "three";
import { OffscreenObserver } from "../../hoc";

// Stars
const Stars = (props: Omit<ThreeElements["points"], "ref"> & { isMobile: boolean }) => {
  const ref = useRef<any>(null);
  const { isMobile, ...restProps } = props;
  // Reduce star count on mobile for performance
  const starCount = isMobile ? 3000 : 6000;
  
  // For each star
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(starCount), { radius: 1.2 }),
  );

  // Rotate multiple stars - reduced speed on mobile
  useFrame((_state, delta) => {
    if (ref.current) {
      const rotationSpeed = isMobile ? 0.5 : 1;
      ref.current.rotation.x -= (delta / 10) * rotationSpeed;
      ref.current.rotation.y -= (delta / 15) * rotationSpeed;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Points */}
      <Points
        ref={ref}
        positions={new Float32Array(sphere)}
        stride={3}
        frustumCulled
        {...restProps}
      >
        {/* Each point material */}
        <PointMaterial
          transparent
          color="#f272c8"
          size={isMobile ? 0.0025 : 0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Stars Canvas
const StarsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if device is Mobile
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    // Check if device prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    setShouldRender(!prefersReducedMotion.matches);

    // Handle screen size change
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      setShouldRender(!event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    prefersReducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      prefersReducedMotion.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  // Don't render if user prefers reduced motion
  if (!shouldRender) {
    return <div className="w-full h-auto absolute inset-0 z-[-1] bg-primary" />;
  }

  return (
    <div className="w-full h-screen fixed inset-0 z-[-1]">
      {/* Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        frameloop="demand"
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        {/* Show stars if not fallback */}
        <Suspense fallback={null}>
          <Stars isMobile={isMobile} />
        </Suspense>

        {/* preload all */}
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
