"use client";

import { useRef, useState, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const GRID_RADIUS = 10; // Same as asteroid radius
const GRID_SEGMENTS = 16; // Angular segments for grid

export interface GridCell {
  id: string;
  position: [number, number, number];
  phi: number; // Azimuthal angle
  theta: number; // Polar angle
  occupied: boolean;
}

interface VoxelGridProps {
  onCellClick?: (cell: GridCell) => void;
  onCellHover?: (cell: GridCell | null) => void;
  occupiedCells?: Set<string>;
}

export function VoxelGrid({ onCellClick, onCellHover, occupiedCells = new Set() }: VoxelGridProps) {
  const [hoveredCell, setHoveredCell] = useState<GridCell | null>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const { camera, size } = useThree();

  // Generate grid cells on asteroid surface
  const gridCells: GridCell[] = [];
  for (let phi = 0; phi < Math.PI * 2; phi += Math.PI / GRID_SEGMENTS) {
    for (let theta = Math.PI / 6; theta < Math.PI * 5 / 6; theta += Math.PI / GRID_SEGMENTS) {
      const radius = GRID_RADIUS + 0.5; // Slightly above asteroid surface
      const x = Math.round(radius * Math.sin(theta) * Math.cos(phi));
      const y = Math.round(radius * Math.cos(theta));
      const z = Math.round(radius * Math.sin(theta) * Math.sin(phi));

      const id = `${phi.toFixed(2)},${theta.toFixed(2)}`;
      gridCells.push({
        id,
        position: [x, y, z],
        phi,
        theta,
        occupied: occupiedCells.has(id),
      });
    }
  }

  const handleClick = useCallback((cell: GridCell) => {
    if (!cell.occupied) {
      onCellClick?.(cell);
    }
  }, [onCellClick]);

  const handlePointerMove = useCallback((cell: GridCell) => {
    if (!cell.occupied) {
      setHoveredCell(cell);
      onCellHover?.(cell);
    }
  }, [onCellHover]);

  const handlePointerOut = useCallback(() => {
    setHoveredCell(null);
    onCellHover?.(null);
  }, [onCellHover]);

  return (
    <group>
      {gridCells.map((cell) => {
        const isHovered = hoveredCell?.id === cell.id;
        const isOccupied = cell.occupied;

        return (
          <mesh
            key={cell.id}
            position={cell.position}
            onClick={() => handleClick(cell)}
            onPointerEnter={() => handlePointerMove(cell)}
            onPointerLeave={handlePointerOut}
          >
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial
              color={isOccupied ? "#1e293b" : isHovered ? "#22d3ee" : "#334155"}
              transparent
              opacity={isOccupied ? 0 : isHovered ? 0.8 : 0.3}
              emissive={isHovered && !isOccupied ? "#22d3ee" : "#000000"}
              emissiveIntensity={isHovered && !isOccupied ? 0.5 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}
