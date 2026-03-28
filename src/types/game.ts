/**
 * ICE DRILL - Game State Types
 * Implements core interfaces for the lunar colony idle clicker game.
 */

// Resource types with available assets
export type ResourceType = "ice" | "solarEnergy" | "helium3";

export interface ResourceDefinition {
  id: ResourceType;
  name: string;
  icon: string;
  description: string;
}

export interface ResourceState {
  ice: number;
  solarEnergy: number;
  helium3: number;
}

// Building types matching the preview code
export type BuildingType = "drill" | "solar" | "water" | "dome" | "empty";

export interface BuildingDefinition {
  type: BuildingType;
  name: string;
  icon: string;
  cost: Partial<ResourceState>;
  production: Partial<ResourceState>;
  productionInterval: number; // seconds
}

export interface Building {
  id: string;
  type: BuildingType;
  position: { row: number; col: number };
  level: number;
  placedAt: number; // timestamp
}

// Plot on the 7x7 grid
export interface Plot {
  row: number;
  col: number;
  building: Building | null;
  resourceDrops: ResourceType[]; // resources that can spawn here
}

// Full game state
export interface GameState {
  resources: ResourceState;
  grid: Plot[][]; // 7x7 = 49 plots
  buildings: Building[];
  stats: {
    totalClicks: number;
    totalResourcesGathered: number;
    buildingsPlaced: number;
    playTime: number; // seconds
  };
  lastUpdate: number; // timestamp
}

// Actions for the reducer
export type GameAction =
  | { type: "PLACE_BUILDING"; payload: { row: number; col: number; buildingType: BuildingType } }
  | { type: "REMOVE_BUILDING"; payload: { row: number; col: number } }
  | { type: "COLLECT_RESOURCE"; payload: { resourceType: ResourceType; amount: number } }
  | { type: "TICK"; payload: { deltaTime: number } }
  | { type: "UPGRADE_BUILDING"; payload: { buildingId: string } }
  | { type: "CLICK_PLOT"; payload: { row: number; col: number } }
  | { type: "OFFLINE_PRODUCTION"; payload: { offlineTime: number } };

// Constants
export const GRID_SIZE = 7;
export const INITIAL_RESOURCES: ResourceState = {
  ice: 50,       // Starting resources to avoid softlock
  solarEnergy: 20, // Can buy Solar (20 ice) or try for Drill (50 solarEnergy after collecting)
  helium3: 0,
};
