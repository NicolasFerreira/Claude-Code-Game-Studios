"use client";

import { useGame } from "@/context/GameContext";
import { BUILDINGS } from "@/systems/ResourceSystem";
import { Building, ResourceType } from "@/types/game";

interface BuildingInfoPanelProps {
  building: Building | null;
  isOpen: boolean;
  onClose: () => void;
}

const MAX_LEVEL = 3;

export function BuildingInfoPanel({ building, isOpen, onClose }: BuildingInfoPanelProps) {
  const { state, upgradeBuilding } = useGame();

  if (!isOpen || !building) return null;

  const def = BUILDINGS[building.type];

  // Production rate per second with level multiplier (design doc formula: level * 1.8)
  const productionRate = Object.entries(def.production).reduce((acc, [resource, amount]) => {
    if (amount) {
      const baseRate = amount / def.productionInterval;
      acc[resource as ResourceType] = baseRate * building.level * 1.8;
    }
    return acc;
  }, {} as Record<ResourceType, number>);

  // Upgrade cost: baseCost * level * 1.5 (design doc formula)
  const upgradeCost = Object.entries(def.cost).reduce((acc, [resource, amount]) => {
    if (amount) {
      acc[resource as ResourceType] = amount * building.level * 1.5;
    }
    return acc;
  }, {} as Record<ResourceType, number>);

  // Check if can afford upgrade
  const canAffordUpgrade = Object.entries(upgradeCost).every(
    ([resource, cost]) => state.resources[resource as ResourceType] >= cost
  );

  const isMaxLevel = building.level >= MAX_LEVEL;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: "320px",
        background: "rgba(13, 13, 26, 0.95)",
        borderLeft: "4px solid #334155",
        zIndex: 200,
        animation: "slideInRight 300ms ease-out",
        overflowY: "auto",
      }}
    >
      <div className="pixel-panel" style={{ margin: "16px", padding: "16px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ color: "#e2e8f0", fontFamily: "var(--font-pixel)", fontSize: "12px", margin: 0 }}>
            {def.name}
          </h2>
          <button onClick={onClose} className="pixel-btn" style={{ padding: "4px 8px", fontSize: "10px" }}>
            ×
          </button>
        </div>

        {/* Level */}
        <div style={{ marginBottom: "16px" }}>
          <span style={{ color: "#22d3ee", fontFamily: "var(--font-pixel)", fontSize: "10px" }}>
            Level {building.level}
          </span>
          {isMaxLevel && (
            <span style={{ color: "#fbbf24", fontFamily: "var(--font-pixel)", fontSize: "10px", marginLeft: "8px" }}>
              MAX
            </span>
          )}
        </div>

        {/* Production */}
        <div style={{ marginBottom: "16px" }}>
          <p style={{ color: "#94a3b8", fontSize: "10px", marginBottom: "8px" }}>Production</p>
          {Object.entries(productionRate).length > 0 ? (
            Object.entries(productionRate).map(([resource, rate]) => (
              <div key={resource} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#e2e8f0", fontSize: "10px" }}>{resource}</span>
                <span style={{ color: "#22d3ee", fontFamily: "var(--font-pixel)", fontSize: "10px" }}>
                  {rate.toFixed(2)}/s
                </span>
              </div>
            ))
          ) : (
            <span style={{ color: "#64748b", fontSize: "10px" }}>No production</span>
          )}
        </div>

        {/* Upgrade Section */}
        {!isMaxLevel && (
          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "2px solid #334155" }}>
            <p style={{ color: "#94a3b8", fontSize: "10px", marginBottom: "8px" }}>Upgrade Cost</p>
            {Object.entries(upgradeCost).map(([resource, cost]) => (
              <div key={resource} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#e2e8f0", fontSize: "10px" }}>{resource}</span>
                <span
                  style={{
                    color: state.resources[resource as ResourceType] >= cost ? "#22c55e" : "#ef4444",
                    fontFamily: "var(--font-pixel)",
                    fontSize: "10px"
                  }}
                >
                  {Math.ceil(cost)}
                </span>
              </div>
            ))}
            <button
              onClick={() => upgradeBuilding(building.id)}
              disabled={!canAffordUpgrade}
              className="pixel-btn"
              style={{
                width: "100%",
                marginTop: "12px",
                background: canAffordUpgrade ? "#22d3ee" : undefined,
                color: canAffordUpgrade ? "#0d0d1a" : undefined,
              }}
            >
              Upgrade to Lv.{building.level + 1}
            </button>
          </div>
        )}

        {/* Position */}
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "2px solid #334155" }}>
          <span style={{ color: "#64748b", fontSize: "8px" }}>
            Position: ({building.position.row}, {building.position.col})
          </span>
        </div>
      </div>
    </div>
  );
}
