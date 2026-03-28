"use client";

import { useState, useEffect } from "react";

export default function GamePlaceholder() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)",
        color: "#e2e8f0",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌙</div>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#22d3ee",
          marginBottom: "0.5rem",
          textShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
        }}
      >
        ICE DRILL
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "#94a3b8",
          marginBottom: "2rem",
          letterSpacing: "0.1em",
        }}
      >
        LUNAR COLONY
      </p>

      <div
        style={{
          background: "rgba(45, 55, 72, 0.8)",
          border: "2px solid #334155",
          borderRadius: "12px",
          padding: "2rem",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            fontSize: "1rem",
            color: "#e2e8f0",
            marginBottom: "1rem",
          }}
        >
          Restructuring Project{dots}
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#94a3b8",
            lineHeight: "1.6",
          }}
        >
          Design documents are complete. Implementation starting soon.
        </p>
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22d3ee",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#4ade80",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#a78bfa",
            }}
          />
        </div>
      </div>

      <p
        style={{
          marginTop: "2rem",
          fontSize: "0.75rem",
          color: "#64748b",
        }}
      >
        Based on Sunflower Land | Lunar Theme
      </p>
    </main>
  );
}
