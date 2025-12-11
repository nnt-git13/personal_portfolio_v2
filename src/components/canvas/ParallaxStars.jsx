import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const StarsLayer = ({ count, radius, speed, color, size, scrollProgress = 0 }) => {
  const ref = useRef();

  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(count), { radius })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / (10 * speed);
      ref.current.rotation.y -= delta / (15 * speed);
      
      // Parallax effect based on scroll
      const parallaxOffset = scrollProgress * 0.5;
      ref.current.position.z = parallaxOffset * 2;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ParallaxStarsCanvas = ({ scrollProgress = 0 }) => {
  return (
    <div className='w-full h-full absolute inset-0 z-[-1] pointer-events-none'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          {/* Background layer - slow, small stars */}
          <StarsLayer
            count={3000}
            radius={1.5}
            speed={1}
            color="#ffffff"
            size={0.001}
            scrollProgress={scrollProgress}
          />
          
          {/* Mid layer - medium speed */}
          <StarsLayer
            count={2000}
            radius={1.2}
            speed={1.5}
            color="#00bcd4"
            size={0.0015}
            scrollProgress={scrollProgress}
          />
          
          {/* Foreground layer - faster, larger stars */}
          <StarsLayer
            count={1000}
            radius={1.0}
            speed={2}
            color="#f272c8"
            size={0.002}
            scrollProgress={scrollProgress}
          />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ParallaxStarsCanvas;
