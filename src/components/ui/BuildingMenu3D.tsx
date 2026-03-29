"use client";

import { useState } from "react";
import { useWorldStore } from "@/stores/worldStore";
import { BUILDINGS } from "@/systems/ResourceSystem";
import { SciFiPanel } from "./SciFiPanel";
import { BuildingType } from "@/types/game";

const BUILDING_OPTIONS: BuildingType[] = ["drill", "solar", "waterExtractor", "greenhouse", "oreProcessor"];

// Building name abbreviations for menu
const BUILDING_LABELS: Record<string, string> = {
  drill: "Drill",
  solar: "Solar",
  waterExtractor: "Water",
  greenhouse: "Bio",
  oreProcessor: "Ore",
};

export function BuildingMenu3D() {
  const selectedBuildingType = useWorldStore((s) => s.selectedBuildingType);
  const setSelectedBuildingType = useWorldStore((s) => s.setSelectedBuildingType);

  return (
    <SciFiPanel
      glowColor="orange"
      style={{
        position: "fixed",
        top: 80,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 12,
        zIndex: 100,
        width: 120,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 10,
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 4,
        }}
      >
        Buildings
      </div>

      {BUILDING_OPTIONS.map((type) => {
        const def = BUILDINGS[type];
        const isSelected = selectedBuildingType === type;

        return (
          <button
            key={type}
            onClick={() => setSelectedBuildingType(isSelected ? null : type)}
            className="scifi-btn"
            style={{
              padding: "8px 12px",
              background: isSelected ? "var(--accent-orange)" : "transparent",
              color: isSelected ? "var(--bg-primary)" : "var(--accent-orange)",
              borderColor: "var(--accent-orange)",
              fontSize: 10,
              width: "100%",
            }}
          >
            {def.icon} {BUILDING_LABELS[type]}
          </button>
        );
      })}
    </SciFiPanel>
  );
}
