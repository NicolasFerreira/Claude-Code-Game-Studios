/**
 * ICE DRILL - Land Expansion System
 * Handles grid size increases and expansion costs.
 */

import { ResourceType } from "@/types/game";

export interface ExpansionLevel {
  level: number;
  gridSize: number;
  cost: Partial<Record<ResourceType, number>>;
  description: string;
}

export const EXPANSIONS: ExpansionLevel[] = [
  {
    level: 0,
    gridSize: 7,
    cost: {},
    description: "Starting colony (7x7)",
  },
  {
    level: 1,
    gridSize: 9,
    cost: { helium3: 10 },
    description: "Small Expansion (9x9)",
  },
  {
    level: 2,
    gridSize: 11,
    cost: { helium3: 25 },
    description: "Medium Expansion (11x11)",
  },
  {
    level: 3,
    gridSize: 13,
    cost: { helium3: 50 },
    description: "Large Expansion (13x13)",
  },
];

export const MAX_EXPANSION_LEVEL = 3;

export function getNextExpansion(currentLevel: number): ExpansionLevel | null {
  if (currentLevel >= MAX_EXPANSION_LEVEL) return null;
  return EXPANSIONS[currentLevel + 1];
}

export function getExpansionCost(level: number): Partial<Record<ResourceType, number>> {
  const expansion = EXPANSIONS[level + 1];
  return expansion ? expansion.cost : {};
}

export function canExpand(
  currentLevel: number,
  resources: Record<ResourceType, number>
): boolean {
  const next = getNextExpansion(currentLevel);
  if (!next) return false;

  return Object.entries(next.cost).every(([resource, cost]) => {
    if (!cost) return true;
    return resources[resource as ResourceType] >= cost;
  });
}
