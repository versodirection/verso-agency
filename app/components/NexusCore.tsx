"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

const NexusCore = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} scale={2.8}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};

export default function NexusCoreWithEnv() {
  return (
    <>
      <NexusCore />
      <Environment preset="city" />
    </>
  );
}
