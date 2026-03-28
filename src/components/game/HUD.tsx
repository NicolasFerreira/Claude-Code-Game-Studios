"use client";

import { useGameSelector } from "@/hooks/useGameSelector";

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return Math.floor(n).toString();
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
        gap: "8px",
        padding: "8px 12px",
        background: "rgba(15, 23, 42, 0.8)",
        borderRadius: "8px",
        border: `2px solid ${color}44`,
      }}
    >
      <img
        src={icon}
        alt={label}
        style={{
          width: "24px",
          height: "24px",
          imageRendering: "pixelated",
          filter: `drop-shadow(0 0 4px ${color})`,
        }}
      />
      <span
        className="balance-text"
        style={{ color, fontSize: "12px" }}
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
  const ice = useGameSelector((s) => s.resources.ice);
  const solarEnergy = useGameSelector((s) => s.resources.solarEnergy);
  const helium3 = useGameSelector((s) => s.resources.helium3);

  const resources = [
    { icon: "/assets/resources/ice.png", amount: ice, color: "#22d3ee", label: "Ice" },
    { icon: "/assets/resources/solar-energy.png", amount: solarEnergy, color: "#fbbf24", label: "Solar" },
    { icon: "/assets/resources/credits.png", amount: helium3, color: "#a78bfa", label: "He-3" },
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
        gap: "12px",
        padding: "12px 20px",
        zIndex: 100,
      }}
    >
      {resources.map((r) => (
        <ResourceDisplay key={r.label} {...r} />
      ))}
      <button
        onClick={onOpenTrade}
        className="pixel-btn"
        style={{
          marginLeft: "8px",
          padding: "8px 16px",
          background: "#a78bfa",
        }}
      >
        Trade
      </button>
    </div>
  );
}
