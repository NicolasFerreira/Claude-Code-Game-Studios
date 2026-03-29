/**
 * ICE DRILL - Tool Upgrade Panel
 * UI for upgrading the collection tool.
 */

"use client";

import { useGame } from "@/context/GameContext";
import { useToolUpgrade } from "@/context/ToolUpgradeContext";
import {
  getUpgradeCost,
  canUpgradeTool,
  getClickPower,
  isMaxLevel,
  MAX_TOOL_LEVEL,
} from "@/systems/ToolUpgrade";

interface ToolUpgradePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ToolUpgradePanel({ isOpen, onClose }: ToolUpgradePanelProps) {
  const { state: gameState } = useGame();
  const { toolLevel, upgradeTool, canAffordUpgrade, upgradeCost } = useToolUpgrade();

  if (!isOpen) return null;

  const clickPower = getClickPower(toolLevel);
  const maxed = isMaxLevel(toolLevel);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "320px",
        height: "100vh",
        background: "#0f172a",
        borderRight: "4px solid #a78bfa",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 24px rgba(167, 139, 250, 0.3)",
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
          TOOL UPGRADE
        </h2>
        <p
          style={{
            margin: "4px 0 0 0",
            color: "#94a3b8",
            fontSize: "9px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          Level {toolLevel} / {MAX_TOOL_LEVEL}
        </p>
      </div>

      {/* Tool info */}
      <div style={{ padding: "16px", borderBottom: "2px solid #334155" }}>
        <div
          style={{
            background: "#1e293b",
            border: "2px solid #334155",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "48px" }}>⛏️</span>
          <p
            style={{
              color: "#e2e8f0",
              fontSize: "12px",
              fontFamily: "var(--font-pixel)",
              margin: "8px 0 0 0",
            }}
          >
            Collection Tool
          </p>
          <p
            style={{
              color: "#22d3ee",
              fontSize: "18px",
              fontFamily: "var(--font-pixel)",
              margin: "8px 0 0 0",
            }}
          >
            +{clickPower.toFixed(1)} ice/click
          </p>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "9px",
              fontFamily: "var(--font-pixel)",
              margin: "4px 0 0 0",
            }}
          >
            {toolLevel * 15}% bonus
          </p>
        </div>
      </div>

      {/* Upgrade upgradeCost */}
      {!maxed && (
        <div style={{ padding: "16px", borderBottom: "2px solid #334155" }}>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "9px",
              fontFamily: "var(--font-pixel)",
              margin: "0 0 8px 0",
            }}
          >
            UPGRADE COST
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <div>
              <span
                style={{
                  color: "#a78bfa",
                  fontSize: "12px",
                  fontFamily: "var(--font-pixel)",
                }}
              >
                {upgradeCost.helium3}
              </span>
              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "9px",
                  fontFamily: "var(--font-pixel)",
                  marginLeft: "4px",
                }}
              >
                He3
              </span>
            </div>
            <div>
              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "12px",
                  fontFamily: "var(--font-pixel)",
                }}
              >
                {upgradeCost.iron}
              </span>
              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "9px",
                  fontFamily: "var(--font-pixel)",
                  marginLeft: "4px",
                }}
              >
                Iron
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Current resources */}
      <div style={{ padding: "16px", borderBottom: "2px solid #334155" }}>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "9px",
            fontFamily: "var(--font-pixel)",
            margin: "0 0 8px 0",
          }}
        >
          YOUR RESOURCES
        </p>
        <div style={{ display: "flex", gap: "16px" }}>
          <div>
            <span
              style={{
                color: "#a78bfa",
                fontSize: "12px",
                fontFamily: "var(--font-pixel)",
              }}
            >
              {Math.floor(gameState.resources.helium3)}
            </span>
            <span
              style={{
                color: "#94a3b8",
                fontSize: "9px",
                fontFamily: "var(--font-pixel)",
                marginLeft: "4px",
              }}
            >
              He3
            </span>
          </div>
          <div>
            <span
              style={{
                color: "#94a3b8",
                fontSize: "12px",
                fontFamily: "var(--font-pixel)",
              }}
            >
              {Math.floor(gameState.resources.iron)}
            </span>
            <span
              style={{
                color: "#94a3b8",
                fontSize: "9px",
                fontFamily: "var(--font-pixel)",
                marginLeft: "4px",
              }}
            >
              Iron
            </span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div style={{ padding: "16px", flex: 1 }}>
        {maxed ? (
          <div
            style={{
              textAlign: "center",
              padding: "16px",
              background: "#064e3b",
              borderRadius: "8px",
              border: "2px solid #10b981",
            }}
          >
            <span
              style={{
                color: "#10b981",
                fontSize: "12px",
                fontFamily: "var(--font-pixel)",
              }}
            >
              MAX LEVEL REACHED
            </span>
          </div>
        ) : (
          <button
            onClick={upgradeTool}
            disabled={!canAffordUpgrade}
            className="pixel-btn"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "12px",
              background: canAffordUpgrade ? "#a78bfa" : "#334155",
              border: `2px solid ${canAffordUpgrade ? "#c4b5fd" : "#475569"}`,
              color: canAffordUpgrade ? "#0f172a" : "#94a3b8",
              cursor: canAffordUpgrade ? "pointer" : "not-allowed",
            }}
          >
            {canAffordUpgrade ? "UPGRADE" : "NOT ENOUGH"}
          </button>
        )}
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
