"use client";

import { useEffect, useState } from "react";
import { Achievement } from "@/systems/AchievementSystem";

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade animation
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: visible ? "translate(-50%, -50%)" : "translate(-50%, -50%) scale(0.8)",
        opacity: visible ? 1 : 0,
        transition: "all 300ms ease-out",
        zIndex: 300,
        textAlign: "center",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        className="pixel-panel"
        style={{
          padding: "2rem 3rem",
          border: "3px solid #fbbf24",
          boxShadow: "0 0 40px rgba(251, 191, 36, 0.4)",
          animation: "ready-pulse 1.5s ease-in-out infinite",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{achievement.icon}</div>
        <p
          style={{
            color: "#fbbf24",
            fontFamily: "var(--font-pixel)",
            fontSize: "10px",
            margin: "0 0 0.5rem 0",
            letterSpacing: "2px",
          }}
        >
          ACHIEVEMENT UNLOCKED
        </p>
        <h2
          style={{
            color: "#e2e8f0",
            fontFamily: "var(--font-pixel)",
            fontSize: "14px",
            margin: "0 0 0.5rem 0",
          }}
        >
          {achievement.name}
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "10px", margin: 0 }}>
          {achievement.description}
        </p>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="pixel-btn"
          style={{ marginTop: "1rem", padding: "6px 16px" }}
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
