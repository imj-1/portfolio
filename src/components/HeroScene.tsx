"use client";

import {useMemo, useRef} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Float} from "@react-three/drei";
import * as THREE from "three";

/**
 * The animated shape inside the Canvas.
 * Separated from Canvas because hooks like useFrame
 * can only be called inside a Canvas context.
 */
function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const {pointer} = useThree();

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.4, 4), []);

  // This runs every frame (~60fps). It rotates the mesh
  // and tilts it slightly toward the mouse cursor.
  useFrame((
             _,
             delta
           ) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.3,
      0.05
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      -pointer.x * 0.2,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      {/*<mesh ref={meshRef} geometry={geometry} scale={1}>*/}
      {/*    <MeshDistortMaterial*/}
      {/*        color="#58a6ff"*/}
      {/*        emissive="#3a2d8e"*/}
      {/*        emissiveIntensity={0.4}*/}
      {/*        roughness={0.3}*/}
      {/*        metalness={0.8}*/}
      {/*        distort={0.25}        // how much the geometry warps*/}
      {/*        speed={2}             // speed of the distortion animation*/}
      {/*        wireframe={false}*/}
      {/*    />*/}
      {/*</mesh>*/}
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{position: [0, 0, 5], fov: 45}}
        dpr={[1, 2]}       // device pixel ratio range (performance vs. quality)
        gl={{antialias: true, alpha: true}}  // transparent background
      >
        {/* Lights */}
        <ambientLight intensity={0.3}/>
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff"/>
        <pointLight position={[-3, -2, 4]} intensity={0.5} color="#3fb950"/>

        {/* The shape */}
        <FloatingShape/>
      </Canvas>
    </div>
  );
}