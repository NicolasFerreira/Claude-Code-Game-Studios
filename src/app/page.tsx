"use client";

import dynamic from "next/dynamic";
import { MainMenu } from "@/components/game/MainMenu";
import { GameState } from "@/types/game";
import { hasSave, loadGame } from "@/systems/SaveSystem";
import { useState, useEffect } from "react";

const GamePreview = dynamic(() => import("./preview/page").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d1a 100%)",
        color: "#e2e8f0",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌙</div>
      <h1 style={{ fontFamily: "var(--font-pixel)", color: "#22d3ee", fontSize: "1.5rem" }}>
        ICE DRILL
      </h1>
      <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>Loading colony...</p>
    </main>
  ),
});

export default function HomePage() {
  const [showGame, setShowGame] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasSave()) {
      const saved = loadGame();
      if (saved) {
        // Small delay for splash effect
        const timer = setTimeout(() => {
          setShowGame(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
    setIsLoading(false);
  }, []);

  const handlePlay = () => {
    setShowGame(true);
  };

  if (showGame) {
    return <GamePreview />;
  }

  if (isLoading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d1a 100%)",
          color: "#e2e8f0",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌙</div>
        <h1 style={{ fontFamily: "var(--font-pixel)", color: "#22d3ee", fontSize: "1.5rem" }}>
          ICE DRILL
        </h1>
        <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>Resuming colony...</p>
      </main>
    );
  }

  return <MainMenu onPlay={handlePlay} onContinue={handlePlay} />;
}
