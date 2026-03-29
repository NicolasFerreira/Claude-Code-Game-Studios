"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Asteroid } from "./Asteroid";
import { Lights } from "./Lights";

export function CanvasWrapper() {
  return (
    <div style={{ width: "100%", height: "100%", position: "fixed", inset: 0 }}>
      <Canvas camera={{ position: [0, 15, 30], fov: 50 }}>
        <color attach="background" args={["#050510"]} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <Lights />
        <Asteroid />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={15}
          maxDistance={50}
          enablePan={true}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}