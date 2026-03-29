/**
 * ICE DRILL - Achievement System
 * Tracks and triggers player achievements.
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: AchievementStats) => boolean;
  unlockedAt?: number;
}

export interface AchievementStats {
  buildingsPlaced: number;
  totalResourcesGathered: number;
  playTime: number; // seconds
  highestLevel: number;
  buildingsByType: Record<string, number>;
  hasSoldResources: boolean;
  hasExpanded: boolean;
  hasUpgradedBuilding: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_steps",
    name: "First Steps",
    description: "Build your first building",
    icon: "🏗️",
    condition: (s) => s.buildingsPlaced >= 1,
  },
  {
    id: "colony_grow",
    name: "Colony Growth",
    description: "Have 5 buildings at once",
    icon: "🌱",
    condition: (s) => s.buildingsPlaced >= 5,
  },
  {
    id: "self_sufficient",
    name: "Energy Self-Sufficient",
    description: "Have 5 Solar Arrays running",
    icon: "☀️",
    condition: (s) => (s.buildingsByType["solar"] || 0) >= 5,
  },
  {
    id: "water_world",
    name: "Water World",
    description: "Produce 100 water",
    icon: "💧",
    condition: (s) => s.totalResourcesGathered >= 100,
  },
  {
    id: "green_thumb",
    name: "Green Thumb",
    description: "Harvest 10 lunar wheat",
    icon: "🌾",
    condition: (s) => s.totalResourcesGathered >= 10,
  },
  {
    id: "deep_pockets",
    name: "Deep Pockets",
    description: "Collect 50 gold",
    icon: "💰",
    condition: (s) => s.totalResourcesGathered >= 50,
  },
  {
    id: "colonist",
    name: "Colonist",
    description: "Reach Colony Level 5",
    icon: "👤",
    condition: (s) => s.highestLevel >= 5,
  },
  {
    id: "pioneer",
    name: "Lunar Pioneer",
    description: "Unlock all land expansions",
    icon: "🚀",
    condition: (s) => s.hasExpanded,
  },
  {
    id: "trader",
    name: "Trader",
    description: "Sell resources to the Trade Station",
    icon: "📦",
    condition: (s) => s.hasSoldResources,
  },
  {
    id: "upgrader",
    name: "Upgrader",
    description: "Upgrade a building to level 2",
    icon: "⬆️",
    condition: (s) => s.hasUpgradedBuilding,
  },
];

export function checkAchievements(
  stats: AchievementStats,
  unlockedIds: string[]
): Achievement | null {
  for (const achievement of ACHIEVEMENTS) {
    if (!unlockedIds.includes(achievement.id) && achievement.condition(stats)) {
      return achievement;
    }
  }
  return null;
}

export function getAllAchievements(): Achievement[] {
  return ACHIEVEMENTS;
}

export function getUnlockedCount(unlockedIds: string[]): number {
  return unlockedIds.length;
}

export function getTotalCount(): number {
  return ACHIEVEMENTS.length;
}
