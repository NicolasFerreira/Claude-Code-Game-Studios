"use client";

import { useGameSelector } from "@/hooks/useGameSelector";
import { VoxelBuilding } from "./VoxelBuilding";

export function PlacedBuildings() {
  const buildings = useGameSelector((s) => s.buildings);
  const grid = useGameSelector((s) => s.grid);

  // Get position for each building from grid
  // Uses the same coordinate mapping as Asteroid.cellIdToGridPos
  const getBuildingPosition = (buildingId: string): [number, number, number] | null => {
    for (const row of grid) {
      for (const cell of row) {
        if (cell.building?.id === buildingId) {
          const radius = 10 + 0.5;
          // Match the coordinate mapping used in Asteroid.tsx cellIdToGridPos
          const theta = Math.PI / 6 + cell.row * (Math.PI * 2 / 3 / 7) + (Math.PI * 2 / 3 / 7) / 2;
          const phi = cell.col * (Math.PI * 2 / 7) + (Math.PI * 2 / 7) / 2;
          const x = Math.round(radius * Math.sin(theta) * Math.cos(phi));
          const y = Math.round(radius * Math.cos(theta));
          const z = Math.round(radius * Math.sin(theta) * Math.sin(phi));
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
