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
  RESOURCE_CAPS,
  BuildingType,
  ResourceType,
  ResourceState,
} from "@/types/game";
import { BUILDINGS, canAfford, canConsume, deductCost, addResource } from "@/systems/ResourceSystem";
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
          resourceDrops: ["ice"] as ResourceType[],
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

// Extended action type
type ExtendedGameAction = GameAction | { type: "REMOVE_RESOURCE"; payload: { resource: ResourceType; amount: number } };

// Process production for a single building
function processBuildingProduction(
  building: Building,
  deltaTime: number,
  resources: ResourceState
): { resources: ResourceState; building: Building } {
  const def = BUILDINGS[building.type];

  // Check if building has consumption requirements
  if (Object.keys(def.consumption).length > 0) {
    // Can it consume?
    if (!canConsume(def.consumption, resources)) {
      // Building is starved - no production
      return {
        resources,
        building: { ...building, working: false },
      };
    }

    // Deduct consumption (scaled by level and time)
    let newResources = { ...resources };
    for (const [resource, amount] of Object.entries(def.consumption)) {
      if (amount && def.consumptionInterval > 0) {
        const consumed = (amount * building.level * deltaTime) / def.consumptionInterval;
        newResources[resource as ResourceType] = Math.max(0, newResources[resource as ResourceType] - consumed);
      }
    }

    // Add production (scaled by level * 1.8 and time)
    for (const [resource, amount] of Object.entries(def.production)) {
      if (amount && def.productionInterval > 0) {
        const produced = (amount * building.level * 1.8 * deltaTime) / def.productionInterval;
        const cap = RESOURCE_CAPS[resource as ResourceType];
        newResources[resource as ResourceType] = Math.min(
          newResources[resource as ResourceType] + produced,
          cap
        );
      }
    }

    return {
      resources: newResources,
      building: { ...building, working: true },
    };
  } else {
    // No consumption - pure production (solar arrays, etc.)
    let newResources = { ...resources };
    for (const [resource, amount] of Object.entries(def.production)) {
      if (amount && def.productionInterval > 0) {
        const produced = (amount * building.level * 1.8 * deltaTime) / def.productionInterval;
        const cap = RESOURCE_CAPS[resource as ResourceType];
        newResources[resource as ResourceType] = Math.min(
          newResources[resource as ResourceType] + produced,
          cap
        );
      }
    }

    return {
      resources: newResources,
      building: { ...building, working: true },
    };
  }
}

// Reducer function
function gameReducer(state: GameState, action: ExtendedGameAction): GameState {
  switch (action.type) {
    case "CLICK_PLOT": {
      const { row, col } = action.payload;
      const plot = state.grid[row][col];

      if (plot.building) {
        return state;
      }

      // Manual ice collection (1-3 ice per click with level bonus)
      const collected = 1;
      return {
        ...state,
        resources: addResource(state.resources, "ice", collected, RESOURCE_CAPS.ice),
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

      if (plot.building || buildingType === "empty") {
        return state;
      }

      const buildingDef = BUILDINGS[buildingType];

      if (!canAfford(buildingDef.cost, state.resources)) {
        return state;
      }

      const newResources = deductCost(buildingDef.cost, state.resources);

      const newBuilding: Building = {
        id: `${buildingType}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type: buildingType,
        position: { row, col },
        level: 1,
        placedAt: Date.now(),
        working: true,
      };

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

      let currentResources = state.resources;
      const updatedBuildings: Building[] = [];

      for (const building of state.buildings) {
        if (building.type === "empty") {
          updatedBuildings.push(building);
          continue;
        }

        const result = processBuildingProduction(building, deltaTime, currentResources);
        currentResources = result.resources;
        updatedBuildings.push(result.building);
      }

      // Update grid with updated buildings
      const newGrid = state.grid.map((r) =>
        r.map((p) => {
          const updatedBuilding = updatedBuildings.find(
            (b) => b.position.row === p.row && b.position.col === p.col
          );
          return {
            ...p,
            building: updatedBuilding || p.building,
          };
        })
      );

      return {
        ...state,
        resources: currentResources,
        buildings: updatedBuildings,
        grid: newGrid,
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

      if (!building || building.level >= 3) {
        return state;
      }

      // Upgrade cost = base cost * level * 1.5
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
      const cap = RESOURCE_CAPS[resourceType];
      return {
        ...state,
        resources: addResource(state.resources, resourceType, amount, cap),
        stats: {
          ...state.stats,
          totalResourcesGathered: state.stats.totalResourcesGathered + amount,
        },
      };
    }

    case "REMOVE_RESOURCE": {
      const { resource, amount } = action.payload;
      const currentAmount = state.resources[resource] || 0;
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

      let currentResources = state.resources;
      const updatedBuildings: Building[] = [];

      for (const building of state.buildings) {
        if (building.type === "empty") {
          updatedBuildings.push(building);
          continue;
        }

        const result = processBuildingProduction(building, offlineTime, currentResources);
        currentResources = result.resources;
        updatedBuildings.push({ ...result.building, working: true }); // Assume working when online
      }

      const newGrid = state.grid.map((r) =>
        r.map((p) => {
          const updatedBuilding = updatedBuildings.find(
            (b) => b.position.row === p.row && b.position.col === p.col
          );
          return {
            ...p,
            building: updatedBuilding || p.building,
          };
        })
      );

      return {
        ...state,
        resources: currentResources,
        buildings: updatedBuildings,
        grid: newGrid,
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
      const offlineTime = getOfflineTime(savedState.lastUpdate);
      if (offlineTime > 0) {
        dispatch({ type: "OFFLINE_PRODUCTION", payload: { offlineTime } });
      }
    }
  }, []);

  useAutosave(state);

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      dispatch({ type: "TICK", payload: { deltaTime } });
    }, 100);

    return () => clearInterval(interval);
  }, []);

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

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
