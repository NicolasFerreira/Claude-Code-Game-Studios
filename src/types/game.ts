/**
 * ICE DRILL - Game State Types
 * Implements core interfaces for the lunar colony idle clicker game.
 */

// All 9 resource types
export type ResourceType =
  | "ice" | "regolith" | "solarEnergy"
  | "water" | "oxygen" | "iron"
  | "gold" | "helium3" | "lunarWheat";

export interface ResourceDefinition {
  id: ResourceType;
  name: string;
  icon: string;
  description: string;
  color: string; // UI color for displays
}

export interface ResourceState {
  ice: number;
  regolith: number;
  solarEnergy: number;
  water: number;
  oxygen: number;
  iron: number;
  gold: number;
  helium3: number;
  lunarWheat: number;
}

// Building types
export type BuildingType =
  | "drill" | "solar" | "waterExtractor" | "greenhouse" | "oreProcessor" | "habitat" | "empty";

export interface BuildingDefinition {
  type: BuildingType;
  name: string;
  icon: string;
  description: string;
  cost: Partial<ResourceState>; // Cost to build
  production: Partial<ResourceState>; // Resources produced per cycle
  consumption: Partial<ResourceState>; // Resources consumed per cycle
  productionInterval: number; // seconds between production
  consumptionInterval: number; // seconds between consumption
}

export interface Building {
  id: string;
  type: BuildingType;
  position: { row: number; col: number };
  level: number;
  placedAt: number; // timestamp
  working: boolean; // true if has enough to consume and produce
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
  grid: Plot[][];
  buildings: Building[];
  stats: {
    totalClicks: number;
    totalResourcesGathered: number;
    buildingsPlaced: number;
    playTime: number; // seconds
  };
  lastUpdate: number; // timestamp
  expansionLevel: number; // 0 = 7x7, 1 = 9x9, 2 = 11x11, 3 = 13x13
  toolLevel: number; // 1-10, affects click power
}

// Actions for the reducer
export type GameAction =
  | { type: "PLACE_BUILDING"; payload: { row: number; col: number; buildingType: BuildingType } }
  | { type: "REMOVE_BUILDING"; payload: { row: number; col: number } }
  | { type: "COLLECT_RESOURCE"; payload: { resourceType: ResourceType; amount: number } }
  | { type: "TICK"; payload: { deltaTime: number } }
  | { type: "UPGRADE_BUILDING"; payload: { buildingId: string } }
  | { type: "CLICK_PLOT"; payload: { row: number; col: number } }
  | { type: "OFFLINE_PRODUCTION"; payload: { offlineTime: number } }
  | { type: "REMOVE_RESOURCE"; payload: { resource: ResourceType; amount: number } }
  | { type: "EXPAND_COLONY"; payload: { level: number } }
  | { type: "UPGRADE_TOOL" };

// Constants
export const GRID_SIZE = 7;
export const INITIAL_RESOURCES: ResourceState = {
  ice: 50,
  regolith: 0,
  solarEnergy: 20,
  water: 0,
  oxygen: 0,
  iron: 0,
  gold: 0,
  helium3: 0,
  lunarWheat: 0,
};

// Resource caps (overflow is lost)
export const RESOURCE_CAPS: Record<ResourceType, number> = {
  ice: 1000,
  regolith: 500,
  solarEnergy: 500,
  water: 500,
  oxygen: 500,
  iron: 300,
  gold: 100,
  helium3: 100,
  lunarWheat: 200,
};

// Food buffs
export type BuffType = "speed" | "luck" | "efficiency";

export interface FoodItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  ingredients: Partial<ResourceState>;
  duration: number; // seconds, 0 = no expiration
  buffType: BuffType;
  buffValue: number; // percentage, e.g., 10 = +10%
}

// Food inventory item with timestamp
export interface FoodInventoryItem {
  itemId: string;
  food: FoodItem;
  obtainedAt: number;
  expiresAt: number | null; // null = no expiration
}
