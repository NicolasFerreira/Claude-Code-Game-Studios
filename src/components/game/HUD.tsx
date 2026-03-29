"use client";

import { useGameSelector } from "@/hooks/useGameSelector";
import { RESOURCES } from "@/systems/ResourceSystem";
import { ResourceType } from "@/types/game";

function formatNumber(n: number | undefined | null): string {
  if (n == null) return "0";
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  if (n >= 100) return Math.floor(n).toString();
  return n.toFixed(1);
}

interface ResourceDisplayProps {
  icon: string;
  amount: number;
  color: string;
  label: string;
}

function ResourceDisplay({ icon, amount, color, label }: ResourceDisplayProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 10px",
        background: "rgba(15, 23, 42, 0.8)",
        borderRadius: "6px",
        border: `1px solid ${color}44`,
        minWidth: "80px",
      }}
    >
      <img
        src={icon}
        alt={label}
        style={{
          width: "18px",
          height: "18px",
          imageRendering: "pixelated",
        }}
      />
      <span
        style={{
          color,
          fontFamily: "var(--font-pixel)",
          fontSize: "9px",
        }}
      >
        {formatNumber(amount)}
      </span>
    </div>
  );
}

interface HUDProps {
  onOpenTrade?: () => void;
}

export function HUD({ onOpenTrade }: HUDProps) {
  const resources = useGameSelector((s) => s.resources);

  const resourceList: { type: ResourceType; icon: string; color: string; label: string }[] = [
    { type: "ice", icon: RESOURCES.ice.icon, color: RESOURCES.ice.color, label: "Ice" },
    { type: "regolith", icon: RESOURCES.regolith.icon, color: RESOURCES.regolith.color, label: "Regolith" },
    { type: "solarEnergy", icon: RESOURCES.solarEnergy.icon, color: RESOURCES.solarEnergy.color, label: "Energy" },
    { type: "water", icon: RESOURCES.water.icon, color: RESOURCES.water.color, label: "Water" },
    { type: "oxygen", icon: RESOURCES.oxygen.icon, color: RESOURCES.oxygen.color, label: "O2" },
    { type: "iron", icon: RESOURCES.iron.icon, color: RESOURCES.iron.color, label: "Iron" },
    { type: "gold", icon: RESOURCES.gold.icon, color: RESOURCES.gold.color, label: "Gold" },
    { type: "helium3", icon: RESOURCES.helium3.icon, color: RESOURCES.helium3.color, label: "He-3" },
    { type: "lunarWheat", icon: RESOURCES.lunarWheat.icon, color: RESOURCES.lunarWheat.color, label: "Wheat" },
  ];

  return (
    <div
      className="pixel-panel"
      style={{
        position: "fixed",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px",
        padding: "10px 16px",
        zIndex: 100,
        flexWrap: "wrap",
        maxWidth: "90vw",
        justifyContent: "center",
      }}
    >
      {resourceList.map((r) => (
        <ResourceDisplay
          key={r.type}
          icon={r.icon}
          amount={resources[r.type]}
          color={r.color}
          label={r.label}
        />
      ))}
      <button
        onClick={onOpenTrade}
        className="pixel-btn"
        style={{
          marginLeft: "8px",
          padding: "6px 14px",
          background: "#a78bfa",
        }}
      >
        Trade
      </button>
    </div>
  );
}
