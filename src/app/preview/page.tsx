"use client";

import dynamic from "next/dynamic";
import { GameProvider } from "@/context/GameContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { AchievementProvider } from "@/context/AchievementContext";
import { QuestProvider } from "@/context/QuestContext";
import { CookingProvider } from "@/context/CookingContext";
import { ToolUpgradeProvider } from "@/context/ToolUpgradeContext";

// Dynamic import for 3D canvas (no SSR)
const CanvasWrapper = dynamic(() => import("@/canvas/CanvasWrapper").then(m => ({ default: m.CanvasWrapper })), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#050510",
      color: "#22d3ee",
      fontFamily: "monospace"
    }}>
      Loading 3D World...
    </div>
  )
});

export default function PreviewPage() {
  return (
    <NotificationProvider>
      <GameProvider>
        <AchievementProvider>
          <QuestProvider>
            <CookingProvider>
              <ToolUpgradeProvider>
                <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
                  <CanvasWrapper />
                </div>
              </ToolUpgradeProvider>
            </CookingProvider>
          </QuestProvider>
        </AchievementProvider>
      </GameProvider>
    </NotificationProvider>
  );
}