"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function Asteroid() {
  const voxels = useMemo(() => {
    const v: { position: [number, number, number]; color: string }[] = [];
    const radius = 10;
    const segments = 16;

    // Create hollow sphere voxels
    for (let phi = 0; phi < Math.PI * 2; phi += Math.PI / segments) {
      for (let theta = 0; theta < Math.PI; theta += Math.PI / segments) {
        // Only surface voxels
        const x = Math.round(radius * Math.sin(theta) * Math.cos(phi));
        const y = Math.round(radius * Math.cos(theta));
        const z = Math.round(radius * Math.sin(theta) * Math.sin(phi));

        // Gray asteroid color with slight variation
        const shade = 0.3 + Math.random() * 0.15;
        const color = `hsl(30, 5%, ${shade * 100}%)`;

        v.push({ position: [x, y, z], color });
      }
    }
    return v;
  }, []);

  return (
    <group>
      {voxels.map((v, i) => (
        <mesh key={i} position={v.position}>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshStandardMaterial color={v.color} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}