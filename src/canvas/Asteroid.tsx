"use client";

import { useMemo, useCallback } from "react";
import { VoxelGrid, GridCell } from "./VoxelGrid";
import { useWorldStore } from "@/stores/worldStore";
import { useGameSelector, useGameState } from "@/hooks/useGameSelector";
import { BuildingType } from "@/types/game";

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

  const { setHoveredCell, setSelectedCell, setGhostPosition, selectedBuildingType } = useWorldStore();
  const dispatch = useGameSelector((s => s => s), []) as (action: any) => void;
  const gameState = useGameState();

  // Convert cell ID (phi,theta) to grid row,col
  const cellIdToGridPos = useCallback((cellId: string): { row: number; col: number } | null => {
    const [phiStr, thetaStr] = cellId.split(",");
    const phi = parseFloat(phiStr);
    const theta = parseFloat(thetaStr);

    // Map theta (PI/6 to 5PI/6) to row (0 to 6)
    // theta range: PI/6 ≈ 0.524 to 5PI/6 ≈ 2.618
    // That's a range of about 2.094, divided by 7 cells ≈ 0.299 per cell
    const row = Math.floor((theta - Math.PI / 6) / (Math.PI * 2 / 3 / 7));
    // Map phi (0 to 2PI) to col (0 to 6)
    // phi range: 0 to 2PI ≈ 6.283, divided by 7 cells ≈ 0.898 per cell
    const col = Math.floor(phi / (Math.PI * 2 / 7));

    if (row >= 0 && row < 7 && col >= 0 && col < 7) {
      return { row, col };
    }
    return null;
  }, []);

  // Find first empty cell starting from a position
  const findEmptyCell = useCallback((startRow: number, startCol: number): { row: number; col: number } | null => {
    for (let offset = 0; offset < 49; offset++) {
      const row = (startRow + Math.floor(offset / 7)) % 7;
      const col = (startCol + (offset % 7)) % 7;
      const plot = gameState.grid[row]?.[col];
      if (plot && !plot.building) {
        return { row, col };
      }
    }
    return null;
  }, [gameState.grid]);

  // Get occupied cells as a Set of cell IDs
  const occupiedCells = useMemo(() => {
    const occupied = new Set<string>();
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 7; col++) {
        const plot = gameState.grid[row]?.[col];
        if (plot?.building) {
          // Generate the corresponding cell ID for this grid position
          const theta = Math.PI / 6 + row * (Math.PI * 2 / 3 / 7) + (Math.PI * 2 / 3 / 7) / 2;
          const phi = col * (Math.PI * 2 / 7) + (Math.PI * 2 / 7) / 2;
          occupied.add(`${phi.toFixed(2)},${theta.toFixed(2)}`);
        }
      }
    }
    return occupied;
  }, [gameState.grid]);

  const handleCellClick = useCallback((cell: GridCell) => {
    setSelectedCell(cell.id);
    setGhostPosition(cell.position);

    // If a building type is selected and we have a dispatch function, place the building
    if (selectedBuildingType && dispatch) {
      const gridPos = cellIdToGridPos(cell.id);
      if (gridPos) {
        // Check if the cell is empty
        const plot = gameState.grid[gridPos.row]?.[gridPos.col];
        if (plot && !plot.building) {
          dispatch({
            type: "PLACE_BUILDING",
            payload: { row: gridPos.row, col: gridPos.col, buildingType: selectedBuildingType as BuildingType }
          });
        } else {
          // Try to find another empty cell
          const emptyCell = findEmptyCell(gridPos.row, gridPos.col);
          if (emptyCell) {
            dispatch({
              type: "PLACE_BUILDING",
              payload: { row: emptyCell.row, col: emptyCell.col, buildingType: selectedBuildingType as BuildingType }
            });
          }
        }
      }
    }
  }, [selectedBuildingType, dispatch, cellIdToGridPos, findEmptyCell, gameState.grid, setSelectedCell, setGhostPosition]);

  const handleCellHover = useCallback((cell: GridCell | null) => {
    setHoveredCell(cell?.id ?? null);
    setGhostPosition(cell?.position ?? null);
  }, [setHoveredCell, setGhostPosition]);

  return (
    <group>
      {voxels.map((v, i) => (
        <mesh key={i} position={v.position}>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshStandardMaterial color={v.color} roughness={0.9} />
        </mesh>
      ))}
      <VoxelGrid onCellClick={handleCellClick} onCellHover={handleCellHover} occupiedCells={occupiedCells} />
    </group>
  );
}