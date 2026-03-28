/**
 * ICE DRILL - Game Selector Hook
 * Optimized selectors using useMemo to prevent unnecessary re-renders.
 */

import { useContext, useMemo } from "react";
import { GameContext } from "@/context/GameContext";
import { GameState, ResourceType, ResourceState, Building, Plot } from "@/types/game";
import { calculateProductionRate } from "@/systems/ResourceSystem";

// Root selector - returns full state (use sparingly)
export function useGameState(): GameState {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameProvider");
  }
  return context.state;
}

// Selector for a specific resource
export function useResourceSelector(resourceType: ResourceType): number {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useResourceSelector must be used within a GameProvider");
  }
  return useMemo(() => context.state.resources[resourceType], [context.state.resources, resourceType]);
}

// Selector for all resources
export function useResourcesSelector(): ResourceState {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useResourcesSelector must be used within a GameProvider");
  }
  return useMemo(() => context.state.resources, [context.state.resources]);
}

// Selector for production rate of a specific resource
export function useProductionRateSelector(resourceType: ResourceType): number {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useProductionRateSelector must be used within a GameProvider");
  }
  return useMemo(() => {
    let totalRate = 0;
    for (const building of context.state.buildings) {
      const rates = calculateProductionRate(building.type, building.level);
      if (rates[resourceType]) {
        totalRate += rates[resourceType]!;
      }
    }
    return totalRate;
  }, [context.state.buildings, resourceType]);
}

// Selector for a specific plot
export function usePlotSelector(row: number, col: number): Plot {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("usePlotSelector must be used within a GameProvider");
  }
  return useMemo(() => context.state.grid[row][col], [context.state.grid, row, col]);
}

// Selector for all plots
export function useGridSelector(): Plot[][] {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGridSelector must be used within a GameProvider");
  }
  return useMemo(() => context.state.grid, [context.state.grid]);
}

// Selector for buildings array
export function useBuildingsSelector(): Building[] {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useBuildingsSelector must be used within a GameProvider");
  }
  return useMemo(() => context.state.buildings, [context.state.buildings]);
}

// Selector for buildings at specific position
export function useBuildingAtSelector(row: number, col: number): Building | null {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useBuildingAtSelector must be used within a GameProvider");
  }
  return useMemo(
    () => context.state.buildings.find((b) => b.position.row === row && b.position.col === col) || null,
    [context.state.buildings, row, col]
  );
}

// Selector for game stats
export function useStatsSelector() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useStatsSelector must be used within a GameProvider");
  }
  return useMemo(() => context.state.stats, [context.state.stats]);
}

// Generic selector hook - creates a memoized selector
export function useGameSelector<T>(selector: (state: GameState) => T, deps: unknown[] = []): T {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameSelector must be used within a GameProvider");
  }
  return useMemo(() => selector(context.state), [selector, context.state, ...deps]);
}
