/**
 * ICE DRILL - Achievement Context
 * Tracks unlocked achievements and displays toasts.
 */

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Achievement, checkAchievements, AchievementStats } from "@/systems/AchievementSystem";
import { AchievementToast } from "@/components/game/AchievementToast";
import { useGame } from "@/context/GameContext";

interface AchievementContextValue {
  unlockedIds: string[];
  achievementStats: AchievementStats;
  recentAchievement: Achievement | null;
  dismissAchievement: () => void;
}

export const AchievementContext = createContext<AchievementContextValue | null>(null);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const { state } = useGame();
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);

  // Check for sold resources in localStorage (persisted via save)
  const hasSoldResources = typeof window !== "undefined"
    ? localStorage.getItem("ice_drill_has_sold") === "true"
    : false;

  // Build achievement stats from game state
  const achievementStats: AchievementStats = {
    buildingsPlaced: state.stats.buildingsPlaced,
    totalResourcesGathered: state.stats.totalResourcesGathered,
    playTime: state.stats.playTime,
    highestLevel: state.buildings.length > 0
      ? Math.max(...state.buildings.map((b) => b.level))
      : 0,
    buildingsByType: state.buildings.reduce<Record<string, number>>((acc, b) => {
      acc[b.type] = (acc[b.type] || 0) + 1;
      return acc;
    }, {}),
    hasSoldResources,
    hasExpanded: state.expansionLevel >= 3,
    hasUpgradedBuilding: state.buildings.some((b) => b.level > 1),
  };

  // Check achievements whenever stats change
  useEffect(() => {
    const newAchievement = checkAchievements(achievementStats, unlockedIds);
    if (newAchievement) {
      setRecentAchievement(newAchievement);
      setUnlockedIds((prev) => [...prev, newAchievement.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievementStats]);

  const dismissAchievement = useCallback(() => {
    setRecentAchievement(null);
  }, []);

  return (
    <AchievementContext.Provider
      value={{
        unlockedIds,
        achievementStats,
        recentAchievement,
        dismissAchievement,
      }}
    >
      {children}
      {recentAchievement && (
        <AchievementToast
          achievement={recentAchievement}
          onClose={dismissAchievement}
        />
      )}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error("useAchievements must be used within AchievementProvider");
  }
  return context;
}
