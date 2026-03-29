/**
 * ICE DRILL - Endgame Screen
 * Displayed when all achievements are unlocked.
 */

"use client";

import { useEffect, useState } from "react";
import { ACHIEVEMENTS, getTotalCount } from "@/systems/AchievementSystem";
import { useAchievements } from "@/context/AchievementContext";
import { LEVEL_NAMES, calculateColonyProgress } from "@/systems/ColonyLevel";
import { useGameSelector } from "@/hooks/useGameSelector";

interface EndgameScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EndgameScreen({ isOpen, onClose }: EndgameScreenProps) {
  const { unlockedIds } = useAchievements();
  const playTime = useGameSelector((s) => s.stats.playTime);
  const buildingsPlaced = useGameSelector((s) => s.stats.buildingsPlaced);
  const expansionLevel = useGameSelector((s) => s.expansionLevel);

  const [visible, setVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const totalAchievements = getTotalCount();
  const allUnlocked = unlockedIds.length >= totalAchievements;
  const progress = calculateColonyProgress(
    playTime,
    buildingsPlaced,
    unlockedIds.length,
    expansionLevel
  );

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // Delay content for animation
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 400,
        opacity: visible ? 1 : 0,
        transition: "opacity 300ms ease-out",
      }}
      onClick={onClose}
    >
      <div
        className="pixel-panel"
        style={{
          padding: "2rem 3rem",
          maxWidth: "500px",
          width: "90%",
          textAlign: "center",
          border: "3px solid #fbbf24",
          boxShadow: "0 0 60px rgba(251, 191, 36, 0.4)",
          opacity: showContent ? 1 : 0,
          transform: showContent ? "scale(1)" : "scale(0.9)",
          transition: "all 300ms ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🏆</div>

        <h2
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "16px",
            color: "#fbbf24",
            margin: "0 0 0.5rem 0",
            letterSpacing: "3px",
          }}
        >
          LUNAR PIONEER
        </h2>

        <p
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "10px",
            color: "#e2e8f0",
            margin: "0 0 1.5rem 0",
          }}
        >
          You have completed all achievements!
        </p>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div className="pixel-panel" style={{ padding: "1rem" }}>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "6px",
                color: "#94a3b8",
                marginBottom: "4px",
              }}
            >
              COLONY LEVEL
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "18px",
                color: "#22d3ee",
              }}
            >
              {progress.level}
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "7px",
                color: "#64748b",
              }}
            >
              {LEVEL_NAMES[progress.level]}
            </div>
          </div>

          <div className="pixel-panel" style={{ padding: "1rem" }}>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "6px",
                color: "#94a3b8",
                marginBottom: "4px",
              }}
            >
              PLAY TIME
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "18px",
                color: "#22d3ee",
              }}
            >
              {Math.floor(playTime / 3600)}h
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "7px",
                color: "#64748b",
              }}
            >
              {Math.floor((playTime % 3600) / 60)}m
            </div>
          </div>

          <div className="pixel-panel" style={{ padding: "1rem" }}>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "6px",
                color: "#94a3b8",
                marginBottom: "4px",
              }}
            >
              BUILDINGS
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "18px",
                color: "#22d3ee",
              }}
            >
              {buildingsPlaced}
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "7px",
                color: "#64748b",
              }}
            >
              Placed
            </div>
          </div>

          <div className="pixel-panel" style={{ padding: "1rem" }}>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "6px",
                color: "#94a3b8",
                marginBottom: "4px",
              }}
            >
              ACHIEVEMENTS
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "18px",
                color: "#22d3ee",
              }}
            >
              {unlockedIds.length}/{totalAchievements}
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "7px",
                color: "#64748b",
              }}
            >
              Unlocked
            </div>
          </div>
        </div>

        {/* Achievement Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "8px",
            marginBottom: "1.5rem",
          }}
        >
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = unlockedIds.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                style={{
                  fontSize: "24px",
                  padding: "8px",
                  background: unlocked ? "#1e293b" : "#0f172a",
                  border: unlocked ? "2px solid #fbbf24" : "2px solid #1e293b",
                  borderRadius: "4px",
                  opacity: unlocked ? 1 : 0.3,
                  boxShadow: unlocked ? "0 0 8px rgba(251, 191, 36, 0.3)" : "none",
                }}
                title={`${achievement.name}: ${achievement.description}`}
              >
                {achievement.icon}
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="pixel-btn"
          style={{
            padding: "12px 32px",
            fontSize: "10px",
          }}
        >
          Continue Playing
        </button>
      </div>
    </div>
  );
}
