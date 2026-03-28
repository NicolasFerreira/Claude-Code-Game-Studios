/**
 * ICE DRILL - Advanced Buildings
 * Tier 2-3 buildings for late game content.
 */

import { ResourceType, ResourceState } from "@/types/game";

export type AdvancedBuildingType =
  | "deepCoreMine"    // Tier 2 - produces gold
  | "fusionReactor"  // Tier 2 - converts He-3 to massive energy
  | "helium3Extractor" // Tier 3 - rare He-3 extraction
  | "assembler"      // Tier 3 - boosts adjacent building output
  | "researchLab";   // Tier 3 - unlocks new recipes

export interface AdvancedBuildingDefinition {
  type: AdvancedBuildingType;
  name: string;
  icon: string;
  description: string;
  tier: 2 | 3;
  unlockLevel: number;
  requiresExpansion: number;
  cost: Partial<ResourceState>;
  production: Partial<ResourceState>;
  consumption: Partial<ResourceState>;
  productionInterval: number;
  consumptionInterval: number;
}

export const ADVANCED_BUILDINGS: Record<AdvancedBuildingType, AdvancedBuildingDefinition> = {
  deepCoreMine: {
    type: "deepCoreMine",
    name: "Deep Core Mine",
    icon: "/assets/buildings/deep-core-mine.png",
    description: "Mines rare gold deposits from deep lunar core",
    tier: 2,
    unlockLevel: 3,
    requiresExpansion: 1,
    cost: { iron: 100, gold: 20 },
    production: { gold: 1 },
    consumption: { solarEnergy: 5 },
    productionInterval: 60,
    consumptionInterval: 60,
  },
  fusionReactor: {
    type: "fusionReactor",
    name: "Fusion Reactor",
    icon: "/assets/buildings/fusion-reactor.png",
    description: "Converts Helium-3 into massive clean energy",
    tier: 2,
    unlockLevel: 4,
    requiresExpansion: 1,
    cost: { iron: 150, gold: 50 },
    production: { solarEnergy: 20 },
    consumption: { helium3: 1 },
    productionInterval: 10,
    consumptionInterval: 10,
  },
  helium3Extractor: {
    type: "helium3Extractor",
    name: "Helium-3 Extractor",
    icon: "/assets/buildings/helium3-extractor.png",
    description: "Extracts rare Helium-3 from lunar regolith",
    tier: 3,
    unlockLevel: 6,
    requiresExpansion: 2,
    cost: { iron: 200, gold: 100 },
    production: { helium3: 2 },
    consumption: { solarEnergy: 15, water: 5 },
    productionInterval: 30,
    consumptionInterval: 30,
  },
  assembler: {
    type: "assembler",
    name: "Assembler",
    icon: "/assets/buildings/assembler.png",
    description: "Boosts output of adjacent buildings by 25%",
    tier: 3,
    unlockLevel: 5,
    requiresExpansion: 1,
    cost: { iron: 80, gold: 30 },
    production: {},
    consumption: { solarEnergy: 3 },
    productionInterval: 0,
    consumptionInterval: 30,
  },
  researchLab: {
    type: "researchLab",
    name: "Research Lab",
    icon: "/assets/buildings/research-lab.png",
    description: "Unlocks new building recipes and upgrades",
    tier: 3,
    unlockLevel: 7,
    requiresExpansion: 2,
    cost: { iron: 300, gold: 150 },
    production: {},
    consumption: { solarEnergy: 10, oxygen: 5 },
    productionInterval: 0,
    consumptionInterval: 30,
  },
};

export function isAdvancedBuilding(type: string): type is AdvancedBuildingType {
  return type in ADVANCED_BUILDINGS;
}

export function getBuildingTier(type: string): 1 | 2 | 3 {
  if (isAdvancedBuilding(type)) {
    return ADVANCED_BUILDINGS[type].tier;
  }
  return 1; // Base tier
}
