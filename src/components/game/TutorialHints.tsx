"use client";

import { useState, useEffect } from "react";
import { useGameSelector } from "@/hooks/useGameSelector";

interface TutorialHint {
  id: string;
  condition: (state: { buildingsPlaced: number; playTime: number }) => boolean;
  title: string;
  message: string;
}

const TUTORIAL_HINTS: TutorialHint[] = [
  {
    id: "first_building",
    condition: (s) => s.buildingsPlaced >= 1,
    title: "Building Placed!",
    message: "Great! Your building is now producing resources. Click it to see stats.",
  },
  {
    id: "need_power",
    condition: (s) => s.buildingsPlaced >= 1 && s.playTime > 10,
    title: "Power Matters",
    message: "Buildings consume solar energy to work. Build Solar Arrays first!",
  },
  {
    id: "upgrade_hint",
    condition: (s) => s.buildingsPlaced >= 1 && s.playTime > 30,
    title: "Upgrade!",
    message: "Click on your buildings to upgrade them. Higher levels = more output!",
  },
  {
    id: "trade_hint",
    condition: (s) => s.buildingsPlaced >= 3,
    title: "Ship to Mars",
    message: "Click the Trade button to sell resources for Helium-3!",
  },
];

const TUTORIAL_DURATION = 5000; // 5 seconds per hint

export function TutorialHints() {
  const buildingsPlaced = useGameSelector((s) => s.stats.buildingsPlaced);
  const playTime = useGameSelector((s) => s.stats.playTime);

  const [currentHint, setCurrentHint] = useState<TutorialHint | null>(null);
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Find first unmet hint
    for (const hint of TUTORIAL_HINTS) {
      if (!dismissedHints.has(hint.id) && hint.condition({ buildingsPlaced, playTime })) {
        setCurrentHint(hint);
        return;
      }
    }
    setCurrentHint(null);
  }, [buildingsPlaced, playTime, dismissedHints]);

  // Auto-dismiss after duration
  useEffect(() => {
    if (currentHint) {
      const timer = setTimeout(() => {
        setDismissedHints((prev) => new Set([...prev, currentHint.id]));
        setCurrentHint(null);
      }, TUTORIAL_DURATION);
      return () => clearTimeout(timer);
    }
  }, [currentHint]);

  if (!currentHint) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 150,
        animation: "slideIn 200ms ease-out",
        maxWidth: "320px",
      }}
    >
      <div className="pixel-panel" style={{ padding: "12px 16px", border: "2px solid #22d3ee" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ fontSize: "14px" }}>💡</span>
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "9px",
              color: "#22d3ee",
            }}
          >
            {currentHint.title}
          </span>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "10px", margin: 0, lineHeight: 1.4 }}>
          {currentHint.message}
        </p>
        <button
          onClick={() => {
            setDismissedHints((prev) => new Set([...prev, currentHint.id]));
            setCurrentHint(null);
          }}
          style={{
            marginTop: "8px",
            background: "none",
            border: "none",
            color: "#64748b",
            fontSize: "8px",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
