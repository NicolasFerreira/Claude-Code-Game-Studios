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

const CELL_SIZE = 64;
const WORLD_SIZE = 7 * CELL_SIZE;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

const BUILDING_ASSETS: Record<BuildingType, string> = {
  drill: "/assets/buildings/ice-drill.png",
  solar: "/assets/buildings/solar-panel.png",
  water: "/assets/buildings/water-extractor.png",
  dome: "/assets/buildings/biodome.png",
  empty: "/assets/resources/ice.png",
};

function GamePreview() {
  const { clickPlot, placeBuilding } = useGame();
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [buildingInfoBuilding, setBuildingInfoBuilding] = useState<Building | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const grid = useGameSelector((s) => s.grid);

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

  const buildingOptions: { type: BuildingType; src: string; label: string; cost: string }[] = [
    { type: "drill", src: BUILDING_ASSETS.drill, label: "Drill", cost: "50⚡" },
    { type: "solar", src: BUILDING_ASSETS.solar, label: "Solar", cost: "20🧊" },
    { type: "water", src: BUILDING_ASSETS.water, label: "Water", cost: "100⚡ 30🧊" },
    { type: "dome", src: BUILDING_ASSETS.dome, label: "Dome", cost: "200⚡ 100🧊" },
  ];

  return (
    <GameFrame title="ICE DRILL">
      {/* HUD with Trade button */}
      <HUD onOpenTrade={() => setTradeOpen(true)} />

      {/* Building Selector */}
      <div
        className="pixel-panel"
        style={{
          position: "fixed",
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
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
              gridTemplateColumns: `repeat(7, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(7, ${CELL_SIZE}px)`,
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
                        src={BUILDING_ASSETS[plot.building.type]}
                        alt={plot.building.type}
                        width={56}
                        height={56}
                        style={{ imageRendering: "pixelated" }}
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

      {/* Zoom Controls */}
      <div
        style={{
          position: "fixed",
          right: "20px",
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
    </GameFrame>
  );
}

export default function PreviewPage() {
  return (
    <NotificationProvider>
      <GameProvider>
        <GamePreview />
        <Notifications />
        <FloatingTextContainer />
      </GameProvider>
    </NotificationProvider>
  );
}
