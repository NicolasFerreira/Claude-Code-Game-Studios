"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import { useGameSelector } from "@/hooks/useGameSelector";
import { HUD } from "@/components/game/HUD";
import { TradePanel } from "@/components/game/TradePanel";
import { GameFrame } from "@/components/game/GameFrame";
import { BuildingType } from "@/types/game";
import { NotificationProvider } from "@/context/NotificationContext";
import { Notifications } from "@/components/game/Notifications";
import { FloatingTextContainer } from "@/components/game/FloatingNumber";
import { BuildingInfoPanel } from "@/components/game/BuildingInfoPanel";
import { Building } from "@/types/game";
import { TutorialHints } from "@/components/game/TutorialHints";
import { ExpansionPanel } from "@/components/game/ExpansionPanel";
import { AchievementProvider, useAchievements } from "@/context/AchievementContext";
import { EndgameScreen } from "@/components/game/EndgameScreen";
import { ColonyLevelDisplay } from "@/components/game/ColonyLevelDisplay";
import { QuestProvider, useQuests } from "@/context/QuestContext";
import { QuestPanel } from "@/components/game/QuestPanel";
import { CookingProvider } from "@/context/CookingContext";
import { Kitchen } from "@/components/game/Kitchen";
import { FoodInventory } from "@/components/game/FoodInventory";

const CELL_SIZE = 64;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

const BUILDING_ASSETS: Record<string, string> = {
  drill: "/assets/buildings/ice-drill.png",
  solar: "/assets/buildings/solar-panel.png",
  waterExtractor: "/assets/buildings/water-extractor.png",
  greenhouse: "/assets/buildings/biodome.png",
  oreProcessor: "/assets/buildings/ore-processor.png",
  habitat: "/assets/buildings/habitat.png",
  kitchen: "/assets/buildings/biodome.png", // fallback
  empty: "/assets/resources/ice.png",
  // Advanced buildings
  deepCoreMine: "/assets/buildings/ore-processor.png", // fallback
  fusionReactor: "/assets/buildings/solar-panel.png", // fallback
  helium3Extractor: "/assets/buildings/water-extractor.png", // fallback
  assembler: "/assets/buildings/biodome.png", // fallback
  researchLab: "/assets/buildings/biodome.png", // fallback
};

const FALLBACK_ICON = "/assets/resources/ice.png";

function GamePreview() {
  const { clickPlot, placeBuilding } = useGame();
  const { unlockedIds } = useAchievements();
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [buildingInfoBuilding, setBuildingInfoBuilding] = useState<Building | null>(null);
  const [expansionOpen, setExpansionOpen] = useState(false);
  const [endgameOpen, setEndgameOpen] = useState(false);
  const [questOpen, setQuestOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const grid = useGameSelector((s) => s.grid);
  const WORLD_SIZE = grid.length * CELL_SIZE;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * delta)));
  };

  const handleCellClick = (row: number, col: number) => {
    if (isDragging) return;

    const plot = grid[row][col];

    if (plot.building) {
      // Clicking on existing building shows info panel
      setBuildingInfoBuilding(plot.building);
    } else if (selectedBuilding) {
      placeBuilding(row, col, selectedBuilding);
    } else {
      clickPlot(row, col);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  // Show endgame screen when all achievements unlocked
  const totalAchievements = 10; // ACHIEVEMENTS.length
  useEffect(() => {
    if (unlockedIds.length >= totalAchievements && !endgameOpen) {
      setEndgameOpen(true);
    }
  }, [unlockedIds.length, endgameOpen]);

  const buildingOptions: { type: BuildingType; src: string; label: string; cost: string }[] = [
    { type: "drill", src: BUILDING_ASSETS.drill, label: "Drill", cost: "30R 5Fe" },
    { type: "solar", src: BUILDING_ASSETS.solar, label: "Solar", cost: "10R" },
    { type: "waterExtractor", src: BUILDING_ASSETS.waterExtractor, label: "Water", cost: "20R 10Fe" },
    { type: "greenhouse", src: BUILDING_ASSETS.greenhouse, label: "Dome", cost: "40Fe 20H2O" },
    { type: "oreProcessor", src: BUILDING_ASSETS.oreProcessor, label: "Ore", cost: "50Fe" },
  ];

  const [kitchenOpen, setKitchenOpen] = useState(false);
  const [foodInventoryOpen, setFoodInventoryOpen] = useState(false);

  return (
    <GameFrame title="ICE DRILL">
      {/* HUD with Trade button */}
      <HUD onOpenTrade={() => setTradeOpen(true)} />

      {/* Building Selector - RIGHT side, vertical stack */}
      <div
        className="pixel-panel"
        style={{
          position: "fixed",
          top: "130px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "12px",
          zIndex: 100,
        }}
      >
        {/* Collect tool */}
        <button
          onClick={() => setSelectedBuilding(null)}
          className={selectedBuilding === null ? "pixel-btn" : ""}
          style={{
            padding: "8px 12px",
            background: selectedBuilding === null ? "#22d3ee" : "#1e293b",
            color: selectedBuilding === null ? "#0d0d1a" : "#94a3b8",
            border: selectedBuilding === null ? "2px solid #22d3ee" : "2px solid #334155",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "20px" }}>⛏️</span>
          <span style={{ fontSize: "8px", fontFamily: "var(--font-pixel)" }}>Collect</span>
        </button>

        {/* Building buttons */}
        {buildingOptions.map((b) => (
          <button
            key={b.type}
            onClick={() => setSelectedBuilding(b.type)}
            style={{
              padding: "8px 12px",
              background: selectedBuilding === b.type ? "#22d3ee33" : "#1e293b",
              border: selectedBuilding === b.type ? "2px solid #22d3ee" : "2px solid #334155",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Image src={b.src} alt={b.label} width={40} height={40} style={{ imageRendering: "pixelated" }} />
            <span style={{ fontSize: "8px", fontFamily: "var(--font-pixel)", color: "#e2e8f0" }}>{b.label}</span>
            <span style={{ fontSize: "6px", fontFamily: "var(--font-pixel)", color: "#fbbf24" }}>{b.cost}</span>
          </button>
        ))}
      </div>

      {/* Game Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        style={{
          width: "100%",
          height: "100%",
          cursor: isDragging ? "grabbing" : "grab",
          position: "relative",
        }}
      >
        {/* Starfield Background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "url('/assets/ui/starfield-bg.png')",
            backgroundSize: "32px 32px",
            zIndex: 0,
          }}
        />

        {/* World Container */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            zIndex: 1,
          }}
        >
          {/* Lunar Ground Grid */}
          <div
            className="pixel-panel"
            style={{
              width: WORLD_SIZE,
              height: WORLD_SIZE,
              background: "url('/assets/ui/lunar-ground.png')",
              backgroundSize: "32px 32px",
              padding: "4px",
              display: "grid",
              gridTemplateColumns: `repeat(${grid.length}, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${grid.length}, ${CELL_SIZE}px)`,
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((plot, colIndex) => {
                const isSelected = buildingInfoBuilding?.id === plot.building?.id;
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      border: isSelected ? "3px solid #22d3ee" : "1px solid #33415533",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.1s ease, border 0.1s ease",
                      boxShadow: isSelected ? "0 0 12px rgba(34, 211, 238, 0.6)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = "rgba(34, 211, 238, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {plot.building ? (
                      <Image
                        src={BUILDING_ASSETS[plot.building.type] || FALLBACK_ICON}
                        alt={plot.building.type}
                        width={56}
                        height={56}
                        style={{ imageRendering: "pixelated" }}
                        onError={(e) => { e.currentTarget.src = FALLBACK_ICON; }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          background: "rgba(34, 211, 238, 0.15)",
                          borderRadius: "4px",
                          border: "2px dashed #22d3ee44",
                        }}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Zoom Controls - LEFT side */}
      <div
        style={{
          position: "fixed",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          zIndex: 100,
        }}
      >
        <button
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z * 1.2))}
          className="pixel-btn"
          style={{ width: 40, height: 40, fontSize: 20 }}
        >
          +
        </button>
        <span
          style={{
            color: "#94a3b8",
            fontSize: "10px",
            fontFamily: "var(--font-pixel)",
            textAlign: "center",
          }}
        >
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z / 1.2))}
          className="pixel-btn"
          style={{ width: 40, height: 40, fontSize: 20 }}
        >
          -
        </button>
      </div>

      {/* Instructions */}
      <div
        className="pixel-panel"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 24px",
          zIndex: 100,
        }}
      >
        <p
          style={{
            color: "#94a3b8",
            fontSize: "10px",
            fontFamily: "var(--font-pixel)",
            margin: 0,
            textAlign: "center",
          }}
        >
          Click = Collect • Select building = Place • Drag = Pan • Scroll = Zoom
        </p>
      </div>

      {/* Trade Modal */}
      <TradePanel isOpen={tradeOpen} onClose={() => setTradeOpen(false)} />

      {/* Building Info Panel */}
      <BuildingInfoPanel
        building={buildingInfoBuilding}
        isOpen={buildingInfoBuilding !== null}
        onClose={() => setBuildingInfoBuilding(null)}
      />

      {/* Tutorial Hints */}
      <TutorialHints />

      {/* Expansion Panel */}
      <ExpansionPanel isOpen={expansionOpen} onClose={() => setExpansionOpen(false)} />

      {/* Quest Panel */}
      <QuestPanel isOpen={questOpen} onClose={() => setQuestOpen(false)} />

      {/* Kitchen Panel */}
      <Kitchen isOpen={kitchenOpen} onClose={() => setKitchenOpen(false)} />

      {/* Food Inventory Panel */}
      <FoodInventory isOpen={foodInventoryOpen} onClose={() => setFoodInventoryOpen(false)} />

      {/* Endgame Screen */}
      <EndgameScreen isOpen={endgameOpen} onClose={() => setEndgameOpen(false)} />

      {/* Colony Level Display */}
      <div
        style={{
          position: "fixed",
          bottom: "80px",
          left: "20px",
          zIndex: 100,
        }}
      >
        <ColonyLevelDisplay />
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setExpansionOpen(true)}
        className="pixel-btn"
        style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          zIndex: 101,
          padding: "8px 12px",
          fontSize: "10px",
        }}
      >
        Expand
      </button>

      {/* Quest Button */}
      <button
        onClick={() => setQuestOpen(true)}
        className="pixel-btn"
        style={{
          position: "fixed",
          top: "120px",
          right: "20px",
          zIndex: 101,
          padding: "8px 12px",
          fontSize: "10px",
          background: "#10b981",
          border: "2px solid #34d399",
        }}
      >
        Quests
      </button>

      {/* Kitchen Button */}
      <button
        onClick={() => setKitchenOpen(true)}
        className="pixel-btn"
        style={{
          position: "fixed",
          top: "160px",
          right: "20px",
          zIndex: 101,
          padding: "8px 12px",
          fontSize: "10px",
          background: "#f97316",
          border: "2px solid #fb923c",
        }}
      >
        Kitchen
      </button>

      {/* Food Inventory Button */}
      <button
        onClick={() => setFoodInventoryOpen(true)}
        className="pixel-btn"
        style={{
          position: "fixed",
          top: "200px",
          right: "20px",
          zIndex: 101,
          padding: "8px 12px",
          fontSize: "10px",
          background: "#334155",
          border: "2px solid #475569",
        }}
      >
        Food
      </button>
    </GameFrame>
  );
}

export default function PreviewPage() {
  return (
    <NotificationProvider>
      <GameProvider>
        <AchievementProvider>
          <QuestProvider>
            <CookingProvider>
              <GamePreview />
              <Notifications />
              <FloatingTextContainer />
            </CookingProvider>
          </QuestProvider>
        </AchievementProvider>
      </GameProvider>
    </NotificationProvider>
  );
}
