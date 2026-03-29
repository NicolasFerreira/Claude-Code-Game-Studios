"use client";

import { useMemo } from "react";

interface VoxelData {
  position: [number, number, number];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
}

interface BuildingVoxels {
  [key: string]: VoxelData[];
}

// Define voxel shapes for each building type (relative positions)
export const BUILDING_VOXELS: BuildingVoxels = {
  drill: [
    { position: [0, 0, 0], color: "#64748b" },
    { position: [0, 1, 0], color: "#22d3ee", emissive: "#22d3ee", emissiveIntensity: 0.3 },
    { position: [0, 2, 0], color: "#ffffff", emissive: "#22d3ee", emissiveIntensity: 0.5 },
  ],
  solar: [
    { position: [0, 0, 0], color: "#1e3a8a" },
    { position: [1, 0, 0], color: "#1e3a8a" },
    { position: [0, 0, 1], color: "#1e3a8a" },
    { position: [1, 0, 1], color: "#22d3ee", emissive: "#22d3ee", emissiveIntensity: 0.4 },
  ],
  waterExtractor: [
    { position: [0, 0, 0], color: "#475569" },
    { position: [0, 1, 0], color: "#0ea5e9", emissive: "#0ea5e9", emissiveIntensity: 0.3 },
    { position: [0, 2, 0], color: "#38bdf8" },
  ],
  greenhouse: [
    { position: [0, 0, 0], color: "#166534" },
    { position: [1, 0, 0], color: "#166534" },
    { position: [0, 1, 0], color: "#22c55e", emissive: "#22c55e", emissiveIntensity: 0.2 },
    { position: [1, 1, 0], color: "#22c55e", emissive: "#22c55e", emissiveIntensity: 0.2 },
  ],
  oreProcessor: [
    { position: [0, 0, 0], color: "#78716c" },
    { position: [0, 1, 0], color: "#f59e0b", emissive: "#f59e0b", emissiveIntensity: 0.3 },
    { position: [0, 2, 0], color: "#fbbf24" },
  ],
  habitat: [
    { position: [0, 0, 0], color: "#6b7280" },
    { position: [1, 0, 0], color: "#6b7280" },
    { position: [0, 1, 0], color: "#9ca3af" },
    { position: [1, 1, 0], color: "#9ca3af" },
  ],
  kitchen: [
    { position: [0, 0, 0], color: "#dc2626" },
    { position: [0, 1, 0], color: "#f97316", emissive: "#f97316", emissiveIntensity: 0.4 },
    { position: [1, 1, 0], color: "#fbbf24" },
  ],
};

interface VoxelBuildingProps {
  type: string;
  position: [number, number, number];
  level?: number;
  working?: boolean;
  isGhost?: boolean;
}

export function VoxelBuilding({ type, position, level = 1, working = true, isGhost = false }: VoxelBuildingProps) {
  const voxels = BUILDING_VOXELS[type] || BUILDING_VOXELS.drill;

  // Scale based on level
  const scale = 1 + (level - 1) * 0.1;

  // Adjust emissive based on working state
  const getMaterialProps = (voxel: VoxelData) => {
    const baseProps = {
      color: voxel.color,
      transparent: isGhost,
      opacity: isGhost ? 0.5 : 1,
      roughness: 0.7,
    };

    if (voxel.emissive && !isGhost) {
      return {
        ...baseProps,
        emissive: working ? voxel.emissive : "#1e293b",
        emissiveIntensity: working ? (voxel.emissiveIntensity || 0.3) : 0,
      };
    }

    return baseProps;
  };

  return (
    <group position={position} scale={scale}>
      {voxels.map((voxel, i) => (
        <mesh key={i} position={voxel.position}>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial {...getMaterialProps(voxel)} />
        </mesh>
      ))}
    </group>
  );
}
