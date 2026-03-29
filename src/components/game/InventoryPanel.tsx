/**
 * ICE DRILL - Inventory Panel
 * Shows all resources in a grid bag view.
 */

"use client";

import { useGame } from "@/context/GameContext";
import { RESOURCES } from "@/systems/ResourceSystem";
import { ResourceType } from "@/types/game";

interface InventoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Resource icons mapping (using emoji as fallback)
const RESOURCE_ICONS: Record<ResourceType, string> = {
  ice: "🧊",
  regolith: "🪨",
  solarEnergy: "☀️",
  water: "💧",
  oxygen: "💨",
  iron: "⛏️",
  gold: "🪙",
  helium3: "⚛️",
  lunarWheat: "🌾",
};

export function InventoryPanel({ isOpen, onClose }: InventoryPanelProps) {
  const { state: gameState } = useGame();

  if (!isOpen) return null;

  const resourceTypes: ResourceType[] = [
    "ice",
    "regolith",
    "solarEnergy",
    "water",
    "oxygen",
    "iron",
    "gold",
    "helium3",
    "lunarWheat",
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "340px",
        height: "100vh",
        background: "#0f172a",
        borderLeft: "4px solid #22d3ee",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        boxShadow: "-4px 0 24px rgba(34, 211, 238, 0.3)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "2px solid #334155",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#e2e8f0",
            fontSize: "14px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          INVENTORY
        </h2>
        <p
          style={{
            margin: "4px 0 0 0",
            color: "#94a3b8",
            fontSize: "9px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          All your resources
        </p>
      </div>

      {/* Resource grid */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "16px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          alignContent: "start",
        }}
      >
        {resourceTypes.map((resourceType) => {
          const def = RESOURCES[resourceType];
          const amount = Math.floor(gameState.resources[resourceType]);
          const icon = RESOURCE_ICONS[resourceType];

          return (
            <div
              key={resourceType}
              style={{
                background: "#1e293b",
                border: "2px solid #334155",
                borderRadius: "8px",
                padding: "12px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{ fontSize: "28px" }}>{icon}</span>
              <span
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: "10px",
                  color: "#e2e8f0",
                  textAlign: "center",
                }}
              >
                {def.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: "14px",
                  color: def.color,
                  fontWeight: "bold",
                  textShadow: `0 0 8px ${def.color}40`,
                }}
              >
                {amount.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="pixel-btn"
        style={{
          margin: "16px",
          padding: "8px",
          background: "#334155",
          border: "2px solid #475569",
        }}
      >
        Close
      </button>
    </div>
  );
}
