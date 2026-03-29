import { create } from 'zustand';

interface WorldState {
  // Camera
  cameraPosition: [number, number, number];
  setCameraPosition: (pos: [number, number, number]) => void;

  // Selection
  selectedCell: string | null;
  setSelectedCell: (cellId: string | null) => void;

  // Hover
  hoveredCell: string | null;
  setHoveredCell: (cellId: string | null) => void;

  // Building mode
  selectedBuildingType: string | null;
  setSelectedBuildingType: (type: string | null) => void;

  // Ghost preview
  ghostPosition: [number, number, number] | null;
  setGhostPosition: (pos: [number, number, number] | null) => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  cameraPosition: [0, 15, 30],
  setCameraPosition: (pos) => set({ cameraPosition: pos }),

  selectedCell: null,
  setSelectedCell: (cellId) => set({ selectedCell: cellId }),

  hoveredCell: null,
  setHoveredCell: (cellId) => set({ hoveredCell: cellId }),

  selectedBuildingType: null,
  setSelectedBuildingType: (type) => set({ selectedBuildingType: type }),

  ghostPosition: null,
  setGhostPosition: (pos) => set({ ghostPosition: pos }),
}));
