import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

const GPU = () => {
  const gpuRef = useRef();
  const gpu = useGLTF("/models/gpu/scene.gltf");

  // Enhance materials for premium look
  useEffect(() => {
    if (!gpu.scene) return;

    gpu.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const materials = Array.isArray(child.material) ? child.material : [child.material];

        materials.forEach((mat) => {
          if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
            // Premium PBR properties
            mat.metalness = 0.9;
            mat.roughness = 0.2;
            mat.envMapIntensity = 1.2;

            // Remove any blue/cyan tint from materials
            if (mat.color) {
              mat.color.multiplyScalar(1.0); // Keep original color
            }
          }
        });
      }
    });
  }, [gpu.scene]);

  // Subtle floating animation
  useFrame((state, delta) => {
    if (gpuRef.current) {
      gpuRef.current.rotation.y += delta * 0.05; // Very slow rotation
      gpuRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
      <primitive 
        ref={gpuRef}
        object={gpu.scene} 
        scale={0.8} 
        position-y={0} 
        rotation-y={0} 
      />
    </Float>
  );
};

const GPUCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='always'
      dpr={[1, 2]}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: true
      }}
      camera={{
        fov: 50,
        near: 0.1,
        far: 1000,
        position: [0, 0, 5],
      }}
    >
      <Suspense fallback={null}>
        {/* Environment for realistic lighting */}
        <Environment preset="sunset" />
        
        {/* Premium lighting setup - neutral white lights */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={2.0}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          color="#ffffff"
        />
        <directionalLight 
          position={[-5, 5, -5]} 
          intensity={0.8}
          color="#ffffff"
        />
        <pointLight position={[0, 5, 5]} intensity={1.2} color="#ffffff" />
        
        {/* Fill light for better visibility */}
        <directionalLight 
          position={[0, -5, 0]} 
          intensity={0.3}
          color="#ffffff"
        />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
        />
        <GPU />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

// Preload GPU model
useGLTF.preload("/models/gpu/scene.gltf");

export default GPUCanvas;

