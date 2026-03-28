"use client";

import { useNotification } from "@/hooks/useNotification";

export function FloatingNumber({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        color: color,
        fontFamily: "var(--font-pixel)",
        fontSize: "12px",
        fontWeight: "bold",
        textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
        pointerEvents: "none",
        animation: "floatUp 800ms ease-out forwards",
        zIndex: 1000,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
}

export function FloatingTextContainer() {
  const { floatingTexts } = useNotification();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      {floatingTexts.map((float) => (
        <FloatingNumber key={float.id} x={float.x} y={float.y} text={float.text} color={float.color} />
      ))}
    </div>
  );
}
