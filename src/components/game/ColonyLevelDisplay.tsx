/**
 * ICE DRILL - Colony Level Display
 * Shows current colony level and XP progress - improved visibility.
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
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minWidth: "180px",
        background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
        border: "2px solid #fbbf24",
        boxShadow: "0 0 20px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
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
            fontSize: "9px",
            color: "#fbbf24",
            letterSpacing: "1px",
            textShadow: "0 0 8px rgba(251, 191, 36, 0.5)",
          }}
        >
          COLONY
        </span>
        <span
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "14px",
            color: "#fbbf24",
            textShadow: "0 0 10px rgba(251, 191, 36, 0.7)",
          }}
        >
          LVL {progress.level}
        </span>
      </div>

      <div
        style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "8px",
          color: "#e2e8f0",
          textAlign: "center",
          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        {LEVEL_NAMES[progress.level] || `Level ${progress.level}`}
      </div>

      {/* XP Bar - larger and more visible */}
      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#0f172a",
          borderRadius: "4px",
          overflow: "hidden",
          border: "2px solid #334155",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            width: `${progress.progress * 100}%`,
            height: "100%",
            background: progress.isMaxLevel
              ? "linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)"
              : "linear-gradient(90deg, #22d3ee, #06b6d4, #22d3ee)",
            backgroundSize: "200% 100%",
            animation: progress.isMaxLevel
              ? "gold-shimmer 2s linear infinite"
              : "cyan-shimmer 3s ease-in-out infinite",
            transition: "width 300ms ease-out",
            boxShadow: progress.isMaxLevel
              ? "0 0 12px rgba(251, 191, 36, 0.8)"
              : "0 0 8px rgba(34, 211, 238, 0.6)",
          }}
        />
      </div>

      {!progress.isMaxLevel && (
        <div
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "7px",
            color: "#94a3b8",
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
            fontSize: "8px",
            color: "#fbbf24",
            textAlign: "center",
            textShadow: "0 0 8px rgba(251, 191, 36, 0.8)",
            animation: "ready-pulse 1.5s ease-in-out infinite",
          }}
        >
          MAX LEVEL!
        </div>
      )}
    </div>
  );
}
