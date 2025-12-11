import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

const Earth = () => {
  const earthRef = useRef();
  const earth = useGLTF("/planet/scene.gltf");

  // Enhance materials and fix ribbons
  useEffect(() => {
    if (!earth.scene) return;

    earth.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Handle materials
        const materials = Array.isArray(child.material) ? child.material : [child.material];

        materials.forEach((mat) => {
          if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
            // Enhance PBR properties
            mat.metalness = 0.1;
            mat.roughness = 0.8;
            mat.envMapIntensity = 1.0;

            // Separate handling for ribbons vs planet
            const isRibbon = child.name.toLowerCase().includes("ribbon") || 
                            child.name.toLowerCase().includes("ring") ||
                            child.name.toLowerCase().includes("orbit");

            if (isRibbon) {
              // Ribbons: scale outward to avoid intersection
              child.scale.set(1.1, 1.1, 1.1);
              mat.emissive = new THREE.Color(0x00bcd4);
              mat.emissiveIntensity = 0.3;
              mat.transparent = true;
              mat.opacity = 0.8;
            } else {
              // Planet: enhance with emissive for city lights
              if (mat.map) {
                mat.emissiveMap = mat.map;
                mat.emissiveIntensity = 0.2;
              }
            }
          }
        });
      }
    });
  }, [earth.scene]);

  // Smooth rotation
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <primitive 
        ref={earthRef}
        object={earth.scene} 
        scale={2.5} 
        position-y={0} 
        rotation-y={0} 
      />
    </Float>
  );
};

const EarthCanvas = () => {
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
        fov: 45,
        near: 0.5,
        far: 1000,
        position: [-4, 2, 6],
      }}
    >
      <Suspense fallback={null}>
        {/* Environment for realistic lighting */}
        <Environment preset="night" />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight 
          position={[-5, 3, -5]} 
          intensity={0.5}
          color="#00bcd4"
        />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        
        {/* Rim light for depth */}
        <directionalLight 
          position={[0, 0, -10]} 
          intensity={0.3}
          color="#00bcd4"
        />

        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
