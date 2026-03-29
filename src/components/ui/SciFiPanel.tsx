"use client";

import { ReactNode } from "react";

interface SciFiPanelProps {
  children: ReactNode;
  glowColor?: "cyan" | "orange" | "purple" | "green";
  style?: React.CSSProperties;
}

export function SciFiPanel({ children, glowColor = "cyan", style }: SciFiPanelProps) {
  const glowColors = {
    cyan: "rgba(34, 211, 238, 0.4)",
    orange: "rgba(249, 115, 22, 0.4)",
    purple: "rgba(167, 139, 250, 0.4)",
    green: "rgba(16, 185, 129, 0.4)",
  };

  return (
    <div
      className="scifi-panel"
      style={{
        boxShadow: `inset 0 0 30px ${glowColors[glowColor]}, 0 0 20px ${glowColors[glowColor]}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
