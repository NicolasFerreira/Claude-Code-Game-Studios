/**
 * ICE DRILL - Game Context
 * Centralized state management using useReducer.
 */

"use client";

import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from "react";
import {
  GameState,
  GameAction,
  Plot,
  Building,
  GRID_SIZE,
  INITIAL_RESOURCES,
  BuildingType,
  ResourceType,
} from "@/types/game";
import { BUILDINGS, canAfford, deductCost } from "@/systems/ResourceSystem";
import { loadGame, getOfflineTime, hasSave } from "@/systems/SaveSystem";
import { useAutosave } from "@/hooks/useAutosave";

// Create initial grid (7x7)
function createInitialGrid(): Plot[][] {
  return Array(GRID_SIZE)
    .fill(null)
    .map((_, row) =>
      Array(GRID_SIZE)
        .fill(null)
        .map((__, col) => ({
          row,
          col,
          building: null,
          resourceDrops: ["ice"] as ResourceType[], // all plots can drop ice
        }))
    );
}

// Initial game state
const initialState: GameState = {
  resources: { ...INITIAL_RESOURCES },
  grid: createInitialGrid(),
  buildings: [],
  stats: {
    totalClicks: 0,
    totalResourcesGathered: 0,
    buildingsPlaced: 0,
    playTime: 0,
  },
  lastUpdate: Date.now(),
};

// Extended action type including REMOVE_RESOURCE and OFFLINE_PRODUCTION
type ExtendedGameAction = GameAction | { type: "REMOVE_RESOURCE"; payload: { resource: string; amount: number } } | { type: "OFFLINE_PRODUCTION"; payload: { offlineTime: number } };

// Reducer function
function gameReducer(state: GameState, action: ExtendedGameAction): GameState {
  switch (action.type) {
    case "CLICK_PLOT": {
      const { row, col } = action.payload;
      const plot = state.grid[row][col];

      // If plot has a building, we don't collect directly from it
      // Clicking is for placing buildings or manual collection from ice
      if (plot.building) {
        return state;
      }

      // Manual ice collection from empty plots (1 ice per click)
      const collected = 1;
      return {
        ...state,
        resources: {
          ...state.resources,
          ice: state.resources.ice + collected,
        },
        stats: {
          ...state.stats,
          totalClicks: state.stats.totalClicks + 1,
          totalResourcesGathered: state.stats.totalResourcesGathered + collected,
        },
      };
    }

    case "PLACE_BUILDING": {
      const { row, col, buildingType } = action.payload;
      const plot = state.grid[row][col];

      // Can't place on occupied plot
      if (plot.building) {
        return state;
      }

      const buildingDef = BUILDINGS[buildingType];

      // Check if can afford
      if (!canAfford(buildingDef.cost, state.resources)) {
        return state;
      }

      // Deduct cost
      const newResources = deductCost(buildingDef.cost, state.resources);

      // Create building
      const newBuilding: Building = {
        id: `${buildingType}-${Date.now()}`,
        type: buildingType,
        position: { row, col },
        level: 1,
        placedAt: Date.now(),
      };

      // Update grid
      const newGrid = state.grid.map((r) => r.map((p) => ({ ...p })));
      newGrid[row][col].building = newBuilding;

      return {
        ...state,
        resources: newResources,
        grid: newGrid,
        buildings: [...state.buildings, newBuilding],
        stats: {
          ...state.stats,
          buildingsPlaced: state.stats.buildingsPlaced + 1,
        },
      };
    }

    case "REMOVE_BUILDING": {
      const { row, col } = action.payload;
      const plot = state.grid[row][col];

      if (!plot.building) {
        return state;
      }

      // Update grid
      const newGrid = state.grid.map((r) => r.map((p) => ({ ...p })));
      newGrid[row][col].building = null;

      return {
        ...state,
        grid: newGrid,
        buildings: state.buildings.filter(
          (b) => !(b.position.row === row && b.position.col === col)
        ),
      };
    }

    case "TICK": {
      const { deltaTime } = action.payload;
      const newResources = { ...state.resources };

      // Calculate production from all buildings
      for (const building of state.buildings) {
        const def = BUILDINGS[building.type];
        const productionAmount = def.production;
        const interval = def.productionInterval;

        for (const [resource, amount] of Object.entries(productionAmount)) {
          if (amount && interval > 0) {
            const produced = (amount / interval) * deltaTime;
            newResources[resource as ResourceType] += produced;
          }
        }
      }

      return {
        ...state,
        resources: newResources,
        stats: {
          ...state.stats,
          playTime: state.stats.playTime + deltaTime,
        },
        lastUpdate: Date.now(),
      };
    }

    case "UPGRADE_BUILDING": {
      const { buildingId } = action.payload;
      const building = state.buildings.find((b) => b.id === buildingId);

      if (!building) {
        return state;
      }

      // Upgrade cost = base cost * level * 1.5 (design doc formula)
      const def = BUILDINGS[building.type];
      const upgradeCost: Partial<Record<ResourceType, number>> = {};
      for (const [resource, amount] of Object.entries(def.cost)) {
        if (amount) {
          upgradeCost[resource as ResourceType] = amount * building.level * 1.5;
        }
      }

      if (!canAfford(upgradeCost, state.resources)) {
        return state;
      }

      const newResources = deductCost(upgradeCost, state.resources);

      // Update building and grid
      const newBuildings = state.buildings.map((b) =>
        b.id === buildingId ? { ...b, level: b.level + 1 } : b
      );

      const newGrid = state.grid.map((r) =>
        r.map((p) => {
          if (p.building?.id === buildingId) {
            return { ...p, building: { ...p.building, level: p.building.level + 1 } };
          }
          return p;
        })
      );

      return {
        ...state,
        resources: newResources,
        buildings: newBuildings,
        grid: newGrid,
      };
    }

    case "COLLECT_RESOURCE": {
      const { resourceType, amount } = action.payload;
      return {
        ...state,
        resources: {
          ...state.resources,
          [resourceType]: state.resources[resourceType] + amount,
        },
        stats: {
          ...state.stats,
          totalResourcesGathered: state.stats.totalResourcesGathered + amount,
        },
      };
    }

    case "REMOVE_RESOURCE": {
      const { resource, amount } = action.payload;
      const currentAmount = state.resources[resource as ResourceType] || 0;
      const newAmount = Math.max(0, currentAmount - amount);
      return {
        ...state,
        resources: {
          ...state.resources,
          [resource]: newAmount,
        },
      };
    }

    case "OFFLINE_PRODUCTION": {
      const { offlineTime } = action.payload;
      const newResources = { ...state.resources };

      // Calculate production from all buildings for offline time
      for (const building of state.buildings) {
        const def = BUILDINGS[building.type];
        const productionAmount = def.production;
        const interval = def.productionInterval;

        for (const [resource, amount] of Object.entries(productionAmount)) {
          if (amount && interval > 0) {
            const produced = (amount / interval) * offlineTime;
            newResources[resource as ResourceType] += produced;
          }
        }
      }

      return {
        ...state,
        resources: newResources,
        stats: {
          ...state.stats,
          playTime: state.stats.playTime + offlineTime,
        },
        lastUpdate: Date.now(),
      };
    }

    default:
      return state;
  }
}

// Context types
interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<ExtendedGameAction>;
  placeBuilding: (row: number, col: number, buildingType: BuildingType) => void;
  removeBuilding: (row: number, col: number) => void;
  clickPlot: (row: number, col: number) => void;
  upgradeBuilding: (buildingId: string) => void;
}

export const GameContext = createContext<GameContextValue | null>(null);

// Provider component
export function GameProvider({ children }: { children: React.ReactNode }) {
  // Try to load saved state, otherwise use initial state
  const initialGameState = hasSave() ? loadGame() || initialState : initialState;

  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const lastTickRef = useRef<number>(Date.now());
  const initializedRef = useRef<boolean>(false);

  // Initialize: process offline production if applicable
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const savedState = hasSave() ? loadGame() : null;
    if (savedState) {
      const offlineTime = getOfflineTime(savedState.lastUpdate.toString());
      if (offlineTime > 0) {
        dispatch({ type: "OFFLINE_PRODUCTION", payload: { offlineTime } });
      }
    }
  }, []);

  // Autosave integration
  useAutosave(state);

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastTickRef.current) / 1000; // convert to seconds
      lastTickRef.current = now;
      dispatch({ type: "TICK", payload: { deltaTime } });
    }, 100); // tick every 100ms

    return () => clearInterval(interval);
  }, []);

  // Action creators
  const placeBuilding = useCallback((row: number, col: number, buildingType: BuildingType) => {
    dispatch({ type: "PLACE_BUILDING", payload: { row, col, buildingType } });
  }, []);

  const removeBuilding = useCallback((row: number, col: number) => {
    dispatch({ type: "REMOVE_BUILDING", payload: { row, col } });
  }, []);

  const clickPlot = useCallback((row: number, col: number) => {
    dispatch({ type: "CLICK_PLOT", payload: { row, col } });
  }, []);

  const upgradeBuilding = useCallback((buildingId: string) => {
    dispatch({ type: "UPGRADE_BUILDING", payload: { buildingId } });
  }, []);

  return (
    <GameContext.Provider
      value={{ state, dispatch, placeBuilding, removeBuilding, clickPlot, upgradeBuilding }}
    >
      {children}
    </GameContext.Provider>
  );
}

// Hook to use game context
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
