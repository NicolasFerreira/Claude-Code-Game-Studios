/**
 * ICE DRILL - Colony Level System
 * XP and leveling based on play time, achievements, and progress.
 */

export interface ColonyLevelConfig {
  maxLevel: number;
  xpPerMinute: number;      // Base XP from play time
  xpPerBuilding: number;    // XP per building placed
  xpPerAchievement: number; // XP per achievement unlocked
  xpPerExpansion: number;   // XP per land expansion
}

export const COLONY_LEVEL_CONFIG: ColonyLevelConfig = {
  maxLevel: 10,
  xpPerMinute: 10,
  xpPerBuilding: 50,
  xpPerAchievement: 100,
  xpPerExpansion: 200,
};

// XP required for each level (exponential curve)
export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

// Total XP required to reach a level from level 1
export function getTotalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += getXpForLevel(i);
  }
  return total;
}

// Current level from total XP
export function getLevelFromXp(totalXp: number): number {
  let level = 1;
  let xpNeeded = 0;
  while (level < COLONY_LEVEL_CONFIG.maxLevel) {
    const forNextLevel = getXpForLevel(level + 1);
    if (xpNeeded + forNextLevel > totalXp) break;
    xpNeeded += forNextLevel;
    level++;
  }
  return level;
}

// Progress to next level (0-1)
export function getLevelProgress(totalXp: number): number {
  const currentLevel = getLevelFromXp(totalXp);
  if (currentLevel >= COLONY_LEVEL_CONFIG.maxLevel) return 1;

  const xpForCurrent = getTotalXpForLevel(currentLevel);
  const xpForNext = xpForCurrent + getXpForLevel(currentLevel + 1);
  const xpIntoLevel = totalXp - xpForCurrent;

  return xpIntoLevel / getXpForLevel(currentLevel + 1);
}

export interface ColonyProgress {
  level: number;
  currentXp: number;
  xpForNextLevel: number;
  progress: number; // 0-1
  isMaxLevel: boolean;
}

// Calculate full colony progress
export function calculateColonyProgress(
  playTimeSeconds: number,
  buildingsPlaced: number,
  achievementsUnlocked: number,
  expansionLevel: number
): ColonyProgress {
  const totalXp =
    Math.floor(playTimeSeconds / 60) * COLONY_LEVEL_CONFIG.xpPerMinute +
    buildingsPlaced * COLONY_LEVEL_CONFIG.xpPerBuilding +
    achievementsUnlocked * COLONY_LEVEL_CONFIG.xpPerAchievement +
    (expansionLevel + 1) * COLONY_LEVEL_CONFIG.xpPerExpansion;

  const level = getLevelFromXp(totalXp);
  const isMaxLevel = level >= COLONY_LEVEL_CONFIG.maxLevel;
  const xpForCurrent = getTotalXpForLevel(level);
  const xpForNext = isMaxLevel ? xpForCurrent : xpForCurrent + getXpForLevel(level + 1);
  const xpIntoLevel = totalXp - xpForCurrent;
  const progress = isMaxLevel ? 1 : xpIntoLevel / getXpForLevel(level + 1);

  return {
    level,
    currentXp: totalXp,
    xpForNextLevel: xpForNext,
    progress: Math.min(1, Math.max(0, progress)),
    isMaxLevel,
  };
}

// Level names for display
export const LEVEL_NAMES: Record<number, string> = {
  1: "Outpost",
  2: "Settlement",
  3: "Colony",
  4: "Advanced Colony",
  5: "Minor Base",
  6: "Major Base",
  7: "Outpost Alpha",
  8: "Colony Prime",
  9: "Lunar City",
  10: "Lunar Capital",
};
