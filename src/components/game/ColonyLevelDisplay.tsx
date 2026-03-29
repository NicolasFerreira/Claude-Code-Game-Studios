/**
 * ICE DRILL - Colony Level Display
 * Shows current colony level and XP progress.
 */

"use client";

import { useGameSelector } from "@/hooks/useGameSelector";
import { calculateColonyProgress, LEVEL_NAMES } from "@/systems/ColonyLevel";
import { useAchievements } from "@/context/AchievementContext";

export function ColonyLevelDisplay() {
  const playTime = useGameSelector((s) => s.stats.playTime);
  const buildingsPlaced = useGameSelector((s) => s.stats.buildingsPlaced);
  const expansionLevel = useGameSelector((s) => s.expansionLevel);
  const { unlockedIds } = useAchievements();

  const progress = calculateColonyProgress(
    playTime,
    buildingsPlaced,
    unlockedIds.length,
    expansionLevel
  );

  return (
    <div
      className="pixel-panel"
      style={{
        padding: "8px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        minWidth: "140px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "8px",
            color: "#94a3b8",
            letterSpacing: "1px",
          }}
        >
          COLONY
        </span>
        <span
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "10px",
            color: "#fbbf24",
          }}
        >
          LVL {progress.level}
        </span>
      </div>

      <div
        style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "7px",
          color: "#e2e8f0",
          textAlign: "center",
        }}
      >
        {LEVEL_NAMES[progress.level] || "Unknown"}
      </div>

      {/* XP Bar */}
      <div
        style={{
          width: "100%",
          height: "6px",
          background: "#1e293b",
          borderRadius: "2px",
          overflow: "hidden",
          border: "1px solid #334155",
        }}
      >
        <div
          style={{
            width: `${progress.progress * 100}%`,
            height: "100%",
            background: progress.isMaxLevel
              ? "linear-gradient(90deg, #fbbf24, #f59e0b)"
              : "linear-gradient(90deg, #22d3ee, #06b6d4)",
            transition: "width 300ms ease-out",
            boxShadow: progress.isMaxLevel
              ? "0 0 8px rgba(251, 191, 36, 0.6)"
              : "0 0 6px rgba(34, 211, 238, 0.4)",
          }}
        />
      </div>

      {!progress.isMaxLevel && (
        <div
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "6px",
            color: "#64748b",
            textAlign: "center",
          }}
        >
          {Math.floor(progress.progress * 100)}% to LVL {progress.level + 1}
        </div>
      )}

      {progress.isMaxLevel && (
        <div
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "6px",
            color: "#fbbf24",
            textAlign: "center",
            animation: "ready-pulse 1.5s ease-in-out infinite",
          }}
        >
          MAX LEVEL!
        </div>
      )}
    </div>
  );
}
