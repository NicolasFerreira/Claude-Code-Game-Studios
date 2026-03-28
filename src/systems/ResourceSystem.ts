/**
 * ICE DRILL - Resource System
 * Defines all resources and building definitions with production chains.
 */

import { ResourceDefinition, ResourceType, ResourceState, BuildingDefinition, BuildingType } from "@/types/game";

// Resource definitions with icons and colors
export const RESOURCES: Record<ResourceType, ResourceDefinition> = {
  ice: {
    id: "ice",
    name: "Ice",
    icon: "/assets/resources/ice.png",
    description: "Frozen water extracted from lunar regolith",
    color: "#22d3ee",
  },
  regolith: {
    id: "regolith",
    name: "Regolith",
    icon: "/assets/resources/regolith.png",
    description: "Lunar soil rich in minerals and ice",
    color: "#94a3b8",
  },
  solarEnergy: {
    id: "solarEnergy",
    name: "Solar Energy",
    icon: "/assets/resources/solar-energy.png",
    description: "Clean energy from the sun",
    color: "#fbbf24",
  },
  water: {
    id: "water",
    name: "Water",
    icon: "/assets/resources/water.png",
    description: "Essential for life and industry",
    color: "#38bdf8",
  },
  oxygen: {
    id: "oxygen",
    name: "Oxygen",
    icon: "/assets/resources/oxygen.png",
    description: "Breathable air for colonists",
    color: "#4ade80",
  },
  iron: {
    id: "iron",
    name: "Iron",
    icon: "/assets/resources/iron.png",
    description: "Base metal for construction",
    color: "#a78bfa",
  },
  gold: {
    id: "gold",
    name: "Gold",
    icon: "/assets/resources/gold.png",
    description: "Precious metal for electronics",
    color: "#fbbf24",
  },
  helium3: {
    id: "helium3",
    name: "Helium-3",
    icon: "/assets/resources/credits.png",
    description: "Rare isotope for fusion reactors",
    color: "#a78bfa",
  },
  lunarWheat: {
    id: "lunarWheat",
    name: "Lunar Wheat",
    icon: "/assets/resources/lunar-wheat.png",
    description: "Grown in biodomes, sustains colonists",
    color: "#4ade80",
  },
};

// Building definitions matching PR-PLAN spec
// Production formula: amount * level * 1.8 per productionInterval
// Consumption formula: amount * level per consumptionInterval
export const BUILDINGS: Record<BuildingType, BuildingDefinition> = {
  empty: {
    type: "empty",
    name: "Empty",
    icon: "",
    description: "",
    cost: {},
    production: {},
    consumption: {},
    productionInterval: 0,
    consumptionInterval: 0,
  },
  drill: {
    type: "drill",
    name: "Ice Drill",
    icon: "/assets/buildings/ice-drill.png",
    description: "Extracts ice from lunar deposits",
    cost: { regolith: 30, iron: 5 },
    production: { ice: 1 },
    consumption: { solarEnergy: 1 },
    productionInterval: 5, // 1 ice every 5s
    consumptionInterval: 5, // 1 solar every 5s
  },
  solar: {
    type: "solar",
    name: "Solar Array",
    icon: "/assets/buildings/solar-panel.png",
    description: "Generates power from sunlight",
    cost: { regolith: 10 },
    production: { solarEnergy: 3 },
    consumption: {},
    productionInterval: 3, // 3 energy every 3s
    consumptionInterval: 0,
  },
  waterExtractor: {
    type: "waterExtractor",
    name: "Water Extractor",
    icon: "/assets/buildings/water-extractor.png",
    description: "Melts ice and extracts water",
    cost: { regolith: 20, iron: 10 },
    production: { water: 1 },
    consumption: { solarEnergy: 1, ice: 2 },
    productionInterval: 10, // 1 water every 10s
    consumptionInterval: 10,
  },
  greenhouse: {
    type: "greenhouse",
    name: "Biodome",
    icon: "/assets/buildings/biodome.png",
    description: "Grows lunar wheat in controlled environment",
    cost: { iron: 40, water: 20 },
    production: { lunarWheat: 1, oxygen: 1 },
    consumption: { water: 2, solarEnergy: 2 },
    productionInterval: 30, // 1 wheat + 1 O2 every 30s
    consumptionInterval: 30,
  },
  oreProcessor: {
    type: "oreProcessor",
    name: "Ore Processor",
    icon: "/assets/buildings/ore-processor.png",
    description: "Refines iron ore into pure iron",
    cost: { iron: 50 },
    production: { iron: 1 },
    consumption: { solarEnergy: 3 },
    productionInterval: 60, // 1 iron every 60s
    consumptionInterval: 60,
  },
  habitat: {
    type: "habitat",
    name: "Habitat Module",
    icon: "/assets/buildings/habitat.png",
    description: "Houses colonists, generates helium-3",
    cost: { iron: 100, gold: 10 },
    production: { helium3: 0.5, oxygen: 2 },
    consumption: { water: 5, lunarWheat: 1 },
    productionInterval: 30,
    consumptionInterval: 30,
  },
};

/**
 * Get all resource definitions as an array
 */
export function getAllResources(): ResourceDefinition[] {
  return Object.values(RESOURCES);
}

/**
 * Get resource definition by type
 */
export function getResource(id: ResourceType): ResourceDefinition {
  return RESOURCES[id];
}

/**
 * Get building definition by type
 */
export function getBuilding(type: BuildingType): BuildingDefinition {
  return BUILDINGS[type];
}

/**
 * Check if player can afford a building
 */
export function canAfford(cost: Partial<ResourceState>, resources: ResourceState): boolean {
  return Object.entries(cost).every(([resource, amount]) => {
    if (!amount) return true;
    return resources[resource as ResourceType] >= amount;
  });
}

/**
 * Check if building can consume its required resources
 */
export function canConsume(consumption: Partial<ResourceState>, resources: ResourceState): boolean {
  if (Object.keys(consumption).length === 0) return true;
  return Object.entries(consumption).every(([resource, amount]) => {
    if (!amount) return true;
    return resources[resource as ResourceType] >= amount;
  });
}

/**
 * Deduct cost from resources
 */
export function deductCost(cost: Partial<ResourceState>, resources: ResourceState): ResourceState {
  const next = { ...resources };
  for (const [resource, amount] of Object.entries(cost)) {
    if (amount) {
      next[resource as ResourceType] -= amount;
    }
  }
  return next;
}

/**
 * Add resources with cap enforcement
 */
export function addResource(
  resources: ResourceState,
  type: ResourceType,
  amount: number,
  cap: number
): ResourceState {
  return {
    ...resources,
    [type]: Math.min(resources[type] + amount, cap),
  };
}

/**
 * Calculate production rate per second for a building
 * Formula: amount * level * 1.8 / productionInterval
 */
export function calculateProductionRate(
  buildingType: BuildingType,
  level: number
): Partial<Record<ResourceType, number>> {
  const def = BUILDINGS[buildingType];
  const result: Partial<Record<ResourceType, number>> = {};

  for (const [resource, amount] of Object.entries(def.production)) {
    if (amount && def.productionInterval > 0) {
      result[resource as ResourceType] = (amount * level * 1.8) / def.productionInterval;
    }
  }

  return result;
}

/**
 * Calculate consumption rate per second for a building
 */
export function calculateConsumptionRate(
  buildingType: BuildingType,
  level: number
): Partial<Record<ResourceType, number>> {
  const def = BUILDINGS[buildingType];
  const result: Partial<Record<ResourceType, number>> = {};

  for (const [resource, amount] of Object.entries(def.consumption)) {
    if (amount && def.consumptionInterval > 0) {
      result[resource as ResourceType] = (amount * level) / def.consumptionInterval;
    }
  }

  return result;
}
