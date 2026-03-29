/**
 * ICE DRILL - Tool Upgrade System
 * Upgrades for the collection tool, increasing click power.
 */

import { ResourceState, ResourceType } from "@/types/game";

export const MAX_TOOL_LEVEL = 10;
export const TOOL_UPGRADE_COST_PER_LEVEL = 0.15; // +15% per level

export interface ToolState {
  level: number;
  lastUpgrade: string | null; // ISO date
}

export interface UpgradeCost {
  helium3: number;
  iron: number;
}

// Cost formula: increases with each level
// Level 1->2: 5 helium3, 10 iron
// Level 2->3: 10 helium3, 20 iron
// etc.
export function getUpgradeCost(currentLevel: number): UpgradeCost {
  if (currentLevel >= MAX_TOOL_LEVEL) {
    return { helium3: 0, iron: 0 };
  }

  const multiplier = currentLevel;
  return {
    helium3: 5 * multiplier,
    iron: 10 * multiplier,
  };
}

// Check if player can afford upgrade
export function canUpgradeTool(toolState: ToolState, resources: ResourceState): boolean {
  if (toolState.level >= MAX_TOOL_LEVEL) return false;

  const cost = getUpgradeCost(toolState.level);
  return resources.helium3 >= cost.helium3 && resources.iron >= cost.iron;
}

// Apply upgrade cost to resources
export function deductUpgradeCost(cost: UpgradeCost, resources: ResourceState): ResourceState {
  return {
    ...resources,
    helium3: resources.helium3 - cost.helium3,
    iron: resources.iron - cost.iron,
  };
}

// Calculate click power with tool level bonus
// Base click = 1 ice, +15% per level
export function getClickPower(toolLevel: number): number {
  const basePower = 1;
  const bonus = 1 + (TOOL_UPGRADE_COST_PER_LEVEL * toolLevel);
  return basePower * bonus;
}

// Get tool level from saved state or default to 1
export function getInitialToolState(): ToolState {
  return {
    level: 1,
    lastUpgrade: null,
  };
}

// Check if upgrade is maxed
export function isMaxLevel(level: number): boolean {
  return level >= MAX_TOOL_LEVEL;
}
