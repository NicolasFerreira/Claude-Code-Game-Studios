"use client";

import { useGameSelector } from "@/hooks/useGameSelector";
import { VoxelBuilding } from "./VoxelBuilding";

export function PlacedBuildings() {
  const buildings = useGameSelector((s) => s.buildings);
  const grid = useGameSelector((s) => s.grid);

  // Get position for each building from grid
  const getBuildingPosition = (buildingId: string): [number, number, number] | null => {
    for (const row of grid) {
      for (const cell of row) {
        if (cell.building?.id === buildingId) {
          const radius = 10 + 0.5;
          const x = Math.round(radius * Math.sin(cell.row * 0.3) * Math.cos(cell.col * 0.3));
          const y = Math.round(radius * Math.cos(cell.row * 0.3));
          const z = Math.round(radius * Math.sin(cell.row * 0.3) * Math.sin(cell.col * 0.3));
          return [x, y + 1, z];
        }
      }
    }
    return null;
  };

  return (
    <group>
      {buildings.map((building) => {
        const pos = getBuildingPosition(building.id);
        if (!pos) return null;

        return (
          <VoxelBuilding
            key={building.id}
            type={building.type}
            position={pos}
            level={building.level}
            working={building.working}
          />
        );
      })}
    </group>
  );
}
