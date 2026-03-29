"use client";

import { useGameSelector } from "@/hooks/useGameSelector";
import { RESOURCES } from "@/systems/ResourceSystem";
import { SciFiPanel } from "./SciFiPanel";

const RESOURCE_ORDER = ["ice", "regolith", "solarEnergy", "water", "oxygen", "iron", "gold", "helium3", "lunarWheat"] as const;

// Emoji icons to use since file paths won't load
const RESOURCE_ICONS: Record<string, string> = {
  ice: "🧊",
  regolith: "🪨",
  solarEnergy: "☀️",
  water: "💧",
  oxygen: "🫧",
  iron: "⛓️",
  gold: "🥇",
  helium3: "⚛️",
  lunarWheat: "🌾",
};

const RESOURCE_CAPS: Record<string, number> = {
  ice: 1000,
  regolith: 500,
  solarEnergy: 500,
  water: 500,
  oxygen: 500,
  iron: 300,
  gold: 100,
  helium3: 100,
  lunarWheat: 200,
};

export function ResourceBar() {
  const resources = useGameSelector((s) => s.resources);

  return (
    <SciFiPanel
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 12,
        padding: "12px 20px",
        zIndex: 100,
      }}
    >
      {RESOURCE_ORDER.map((key) => {
        const resource = RESOURCES[key];
        const amount = Math.floor(resources[key] || 0);
        const cap = RESOURCE_CAPS[key] || 1000;

        return (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: 4,
              border: `1px solid ${resource.color}44`,
              minWidth: 80,
            }}
          >
            <span style={{ fontSize: 16 }}>{RESOURCE_ICONS[key]}</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: resource.color,
              }}
            >
              {amount}
            </span>
          </div>
        );
      })}
    </SciFiPanel>
  );
}
