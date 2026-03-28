"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { useGameSelector } from "@/hooks/useGameSelector";
import { EXPANSIONS, getNextExpansion, MAX_EXPANSION_LEVEL } from "@/systems/LandExpansion";

interface ExpansionPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExpansionPanel({ isOpen, onClose }: ExpansionPanelProps) {
  const { state, dispatch } = useGame();
  const expansionLevel = useGameSelector((s) => (s as any).expansionLevel || 0);
  const resources = useGameSelector((s) => s.resources);

  if (!isOpen) return null;

  const currentExpansion = EXPANSIONS[expansionLevel];
  const nextExpansion = getNextExpansion(expansionLevel);

  const canExpand = nextExpansion
    ? Object.entries(nextExpansion.cost).every(([resource, cost]) => {
        if (!cost) return true;
        return resources[resource as keyof typeof resources] >= cost;
      })
    : false;

  const handleExpand = () => {
    if (!nextExpansion || !canExpand) return;

    // Deduct cost
    for (const [resource, cost] of Object.entries(nextExpansion.cost)) {
      if (cost) {
        dispatch({
          type: "REMOVE_RESOURCE",
          payload: { resource: resource as any, amount: cost },
        });
      }
    }

    // Increase expansion level
    dispatch({ type: "EXPAND_COLONY" as any, payload: { level: expansionLevel + 1 } });

    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
      }}
    >
      <div className="pixel-panel" style={{ padding: "1.5rem", maxWidth: "400px", width: "90%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2
            style={{
              color: "#e2e8f0",
              margin: 0,
              fontFamily: "var(--font-pixel)",
              fontSize: "12px",
            }}
          >
            Colony Expansion
          </h2>
          <button onClick={onClose} className="pixel-btn" style={{ padding: "4px 8px", fontSize: "12px" }}>
            ×
          </button>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <p style={{ color: "#94a3b8", fontSize: "10px", marginBottom: "0.5rem" }}>
            Current: {currentExpansion.description}
          </p>
          <p style={{ color: "#64748b", fontSize: "10px" }}>
            Grid Size: {currentExpansion.gridSize}x{currentExpansion.gridSize}
          </p>
        </div>

        {nextExpansion ? (
          <div className="pixel-panel" style={{ padding: "1rem", marginBottom: "1rem", border: "2px solid #22d3ee" }}>
            <h3 style={{ color: "#22d3ee", fontSize: "11px", margin: "0 0 0.5rem 0" }}>
              Next Expansion
            </h3>
            <p style={{ color: "#e2e8f0", fontSize: "10px", margin: "0 0 0.5rem 0" }}>
              {nextExpansion.description}
            </p>
            <p style={{ color: "#64748b", fontSize: "9px", margin: "0 0 1rem 0" }}>
              Grid: {nextExpansion.gridSize}x{nextExpansion.gridSize}
            </p>

            <p style={{ color: "#94a3b8", fontSize: "10px", marginBottom: "0.5rem" }}>Cost:</p>
            {Object.entries(nextExpansion.cost).map(([resource, cost]) => (
              <div
                key={resource}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <span style={{ color: "#e2e8f0", fontSize: "10px" }}>{resource}</span>
                <span
                  style={{
                    color:
                      resources[resource as keyof typeof resources] >= (cost || 0)
                        ? "#22c55e"
                        : "#ef4444",
                    fontSize: "10px",
                    fontFamily: "var(--font-pixel)",
                  }}
                >
                  {cost}
                </span>
              </div>
            ))}

            <button
              onClick={handleExpand}
              disabled={!canExpand}
              className="pixel-btn"
              style={{
                width: "100%",
                marginTop: "1rem",
                background: canExpand ? "#22d3ee" : undefined,
                color: canExpand ? "#0d0d1a" : undefined,
              }}
            >
              Expand Colony
            </button>
          </div>
        ) : (
          <div
            className="pixel-panel"
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              border: "2px solid #fbbf24",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#fbbf24", fontSize: "11px", margin: 0 }}>MAX EXPANSION</p>
            <p style={{ color: "#94a3b8", fontSize: "10px", marginTop: "0.5rem" }}>
              You have reached the largest possible colony size!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
