"use client";

import { useWorldStore } from "@/stores/worldStore";
import { VoxelBuilding, BUILDING_VOXELS } from "./VoxelBuilding";

export function BuildingGhost() {
  const ghostPosition = useWorldStore((s) => s.ghostPosition);
  const selectedBuildingType = useWorldStore((s) => s.selectedBuildingType);

  if (!ghostPosition || !selectedBuildingType) {
    return null;
  }

  const voxels = BUILDING_VOXELS[selectedBuildingType];
  if (!voxels) return null;

  return (
    <group position={ghostPosition}>
      {voxels.map((voxel, i) => (
        <mesh key={i} position={voxel.position}>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial
            color="#22d3ee"
            transparent
            opacity={0.5}
            emissive="#22d3ee"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
