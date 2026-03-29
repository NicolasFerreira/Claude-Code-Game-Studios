/**
 * ICE DRILL - Tool Upgrade Context
 * Manages tool upgrades via GameContext state.
 */

"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useGame } from "@/context/GameContext";
import { getUpgradeCost, canUpgradeTool, MAX_TOOL_LEVEL } from "@/systems/ToolUpgrade";

interface ToolUpgradeContextValue {
  toolLevel: number;
  upgradeTool: () => boolean;
  canAffordUpgrade: boolean;
  upgradeCost: { helium3: number; iron: number };
}

const ToolUpgradeContext = createContext<ToolUpgradeContextValue | null>(null);

export function ToolUpgradeProvider({ children }: { children: React.ReactNode }) {
  const { state: gameState, dispatch: gameDispatch } = useGame();

  const toolLevel = gameState.toolLevel;
  const upgradeCost = getUpgradeCost(toolLevel);
  const canAffordUpgrade = canUpgradeTool({ level: toolLevel, lastUpgrade: null }, gameState.resources);

  const upgradeTool = useCallback((): boolean => {
    if (toolLevel >= MAX_TOOL_LEVEL) return false;
    if (!canAffordUpgrade) return false;

    // Deduct resources
    gameDispatch({
      type: "REMOVE_RESOURCE",
      payload: { resource: "helium3", amount: upgradeCost.helium3 },
    });
    gameDispatch({
      type: "REMOVE_RESOURCE",
      payload: { resource: "iron", amount: upgradeCost.iron },
    });

    // Upgrade tool level in game state
    gameDispatch({ type: "UPGRADE_TOOL" });

    return true;
  }, [toolLevel, canAffordUpgrade, upgradeCost, gameDispatch]);

  return (
    <ToolUpgradeContext.Provider value={{ toolLevel, upgradeTool, canAffordUpgrade, upgradeCost }}>
      {children}
    </ToolUpgradeContext.Provider>
  );
}

export function useToolUpgrade() {
  const context = useContext(ToolUpgradeContext);
  if (!context) {
    throw new Error("useToolUpgrade must be used within a ToolUpgradeProvider");
  }
  return context;
}
