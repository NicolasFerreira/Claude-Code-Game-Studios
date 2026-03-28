"use client";

import { ReactNode } from "react";

interface GameFrameProps {
  children: ReactNode;
  title?: string;
}

/**
 * GameFrame - Main game container with Sunflower Land / Pixels-style UI
 *
 * Features:
 * - Dark navy background (#0d0d1a)
 * - Inset shadow effect for depth
 * - Pixel-art styled borders with white accent
 * - Wraps the entire game area
 */
export function GameFrame({ children, title }: GameFrameProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(180deg, #0d0d1a 0%, #151528 50%, #0d0d1a 100%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Outer border frame */}
      <div
        style={{
          position: "absolute",
          inset: "12px",
          border: "4px solid #334155",
          borderRadius: "8px",
          boxShadow: `
            inset 0 0 0 2px #0d0d1a,
            inset 0 0 0 4px #1e293b,
            0 0 40px rgba(0, 0, 0, 0.8)
          `,
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Corner accents - pixel art style */}
      <PixelCorner position="top-left" />
      <PixelCorner position="top-right" />
      <PixelCorner position="bottom-left" />
      <PixelCorner position="bottom-right" />

      {/* Title bar if provided */}
      {title && (
        <div
          style={{
            padding: "12px 20px",
            background: "linear-gradient(180deg, #2d3a4a 0%, #1e293b 100%)",
            borderBottom: "4px solid #334155",
            boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3)",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "14px",
              color: "#e2e8f0",
              textShadow: "2px 2px 0 #0d0d1a",
              margin: 0,
              textAlign: "center",
            }}
          >
            {title}
          </h1>
        </div>
      )}

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          position: "relative",
          margin: "16px",
          marginTop: title ? undefined : "16px",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Pixel corner accent - decorative corner piece
 */
function PixelCorner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const size = 16;
  const thickness = 4;

  const styles: Record<
    string,
    { top?: string; left?: string; right?: string; bottom?: string }
  > = {
    "top-left": { top: "4px", left: "4px" },
    "top-right": { top: "4px", right: "4px" },
    "bottom-left": { bottom: "4px", left: "4px" },
    "bottom-right": { bottom: "4px", right: "4px" },
  };

  const isVertical = position.includes("top") || position.includes("bottom");
  const isStart = position.includes("left") || position.includes("top");

  return (
    <div
      style={{
        position: "absolute",
        ...styles[position],
        width: isVertical ? `${size}px` : `${thickness}px`,
        height: isVertical ? `${thickness}px` : `${size}px`,
        background: "#475569",
        zIndex: 11,
        pointerEvents: "none",
      }}
    >
      {/* White highlight edge */}
      <div
        style={{
          position: "absolute",
          top: isStart || position.includes("top") ? "0" : undefined,
          bottom: !isStart && position.includes("bottom") ? "0" : undefined,
          left: isStart || position.includes("left") ? "0" : undefined,
          right: !isStart && position.includes("right") ? "0" : undefined,
          width: isVertical ? "100%" : "2px",
          height: isVertical ? "2px" : "100%",
          background: "#64748b",
        }}
      />
    </div>
  );
}
