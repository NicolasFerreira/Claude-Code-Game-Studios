/**
 * ICE DRILL - Resource System
 * Defines all resources with their metadata and icons.
 */

import { ResourceDefinition, ResourceType, ResourceState, BuildingDefinition, BuildingType } from "@/types/game";

// Resource definitions using existing assets only
export const RESOURCES: Record<ResourceType, ResourceDefinition> = {
  ice: {
    id: "ice",
    name: "Ice",
    icon: "/assets/resources/ice.png",
    description: "Frozen water extracted from lunar regolith",
  },
  solarEnergy: {
    id: "solarEnergy",
    name: "Solar Energy",
    icon: "/assets/resources/solar-energy.png",
    description: "Clean energy from the sun",
  },
  helium3: {
    id: "helium3",
    name: "Helium-3",
    icon: "/assets/resources/credits.png",
    description: "Rare isotope for fusion reactors",
  },
};

// Building definitions using existing assets
export const BUILDINGS: Record<BuildingType, BuildingDefinition> = {
  empty: {
    type: "empty",
    name: "Empty",
    icon: "",
    cost: {},
    production: {},
    productionInterval: 0,
  },
  drill: {
    type: "drill",
    name: "Ice Drill",
    icon: "/assets/buildings/ice-drill.png",
    cost: { solarEnergy: 50 },
    production: { ice: 1 },
    productionInterval: 3,
  },
  solar: {
    type: "solar",
    name: "Solar Panel",
    icon: "/assets/buildings/solar-panel.png",
    cost: { ice: 20 },
    production: { solarEnergy: 2 },
    productionInterval: 2,
  },
  water: {
    type: "water",
    name: "Water Extractor",
    icon: "/assets/buildings/water-extractor.png",
    cost: { solarEnergy: 100, ice: 30 },
    production: { helium3: 0.5 },
    productionInterval: 5,
  },
  dome: {
    type: "dome",
    name: "Biodome",
    icon: "/assets/buildings/biodome.png",
    cost: { solarEnergy: 200, ice: 100 },
    production: { helium3: 1 },
    productionInterval: 4,
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
 * Calculate total production per second for a resource type
 */
export function calculateProductionRate(
  buildings: { type: BuildingType; level: number }[],
  resourceType: ResourceType
): number {
  return buildings.reduce((total, building) => {
    const def = BUILDINGS[building.type];
    const production = def.production[resourceType] || 0;
    return total + (production / def.productionInterval) * building.level;
  }, 0);
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
