"use client";

import { useState, useEffect } from "react";
import { hasSave, exportSave, importSave, deleteSave } from "@/systems/SaveSystem";
import { GameState } from "@/types/game";

interface MainMenuProps {
  onPlay: () => void;
  onContinue: (state: GameState) => void;
}

export function MainMenu({ onPlay, onContinue }: MainMenuProps) {
  const [savedGame, setSavedGame] = useState<GameState | null>(null);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(50);
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    if (hasSave()) {
      const state = localStorage.getItem("ice-drill-save");
      if (state) {
        try {
          const parsed = JSON.parse(state);
          setSavedGame(parsed.state);
        } catch {
          setSavedGame(null);
        }
      }
    }
  }, []);

  const handleContinue = () => {
    if (savedGame) {
      onContinue(savedGame);
    }
  };

  const handleNewGame = () => {
    if (hasSave()) {
      if (confirm("Starting a new game will erase your current progress. Continue?")) {
        deleteSave();
        onPlay();
      }
    } else {
      onPlay();
    }
  };

  const handleExport = () => {
    const save = exportSave();
    if (save) {
      navigator.clipboard.writeText(save).then(() => {
        alert("Save copied to clipboard!");
      }).catch(() => {
        prompt("Copy this save data:", save);
      });
    }
  };

  const handleImport = () => {
    if (importSave(importText)) {
      window.location.reload();
    } else {
      alert("Invalid save data!");
    }
  };

  const handleReset = () => {
    deleteSave();
    window.location.reload();
  };

  if (showHowToPlay) {
    return (
      <div style={styles.container}>
        <div className="pixel-panel" style={styles.panel}>
          <h2 style={styles.title}>How to Play</h2>

          <div style={styles.tutorialSection}>
            <h3 style={styles.tutorialHeader}>🎯 Goal</h3>
            <p style={styles.tutorialText}>
              Build a thriving lunar colony by extracting ice, generating power, and producing resources.
              Ship goods to earn Helium-3 and unlock new buildings.
            </p>
          </div>

          <div style={styles.tutorialSection}>
            <h3 style={styles.tutorialHeader}>⛏️ Collecting</h3>
            <p style={styles.tutorialText}>
              Click on empty plots to collect ice. Build Solar Arrays to generate power for other buildings.
            </p>
          </div>

          <div style={styles.tutorialSection}>
            <h3 style={styles.tutorialHeader}>🏗️ Buildings</h3>
            <p style={styles.tutorialText}>
              Select a building from the toolbar, then click an empty plot to place it.
              Each building has costs and produces/consumes resources.
            </p>
          </div>

          <div style={styles.tutorialSection}>
            <h3 style={styles.tutorialHeader}>🔄 Production Chains</h3>
            <p style={styles.tutorialText}>
              Solar → Drill → Ice → Water Extractor → Water
              Water + Energy → Biodome → Wheat + Oxygen
              Iron → Ore Processor → Gold
            </p>
          </div>

          <div style={styles.tutorialSection}>
            <h3 style={styles.tutorialHeader}>📈 Upgrades</h3>
            <p style={styles.tutorialText}>
              Click on placed buildings to see their stats and upgrade them.
              Higher levels = more production!
            </p>
          </div>

          <button
            onClick={() => setShowHowToPlay(false)}
            className="pixel-btn"
            style={{ marginTop: "1rem", width: "100%" }}
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (showSettings) {
    return (
      <div style={styles.container}>
        <div className="pixel-panel" style={styles.panel}>
          <h2 style={styles.title}>Settings</h2>

          <div style={styles.settingRow}>
            <span style={styles.settingLabel}>Sound Effects</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="pixel-btn"
              style={{
                padding: "6px 12px",
                background: soundEnabled ? "#22d3ee" : undefined,
                color: soundEnabled ? "#0d0d1a" : undefined,
              }}
            >
              {soundEnabled ? "ON" : "OFF"}
            </button>
          </div>

          <div style={styles.settingRow}>
            <span style={styles.settingLabel}>Music Volume</span>
            <input
              type="range"
              min="0"
              max="100"
              value={musicVolume}
              onChange={(e) => setMusicVolume(Number(e.target.value))}
              style={{ width: "120px" }}
            />
          </div>

          <div style={styles.settingRow}>
            <span style={styles.settingLabel}>Export Save</span>
            <button onClick={handleExport} className="pixel-btn" style={{ padding: "6px 12px" }}>
              Copy
            </button>
          </div>

          <div style={styles.settingRow}>
            <span style={styles.settingLabel}>Import Save</span>
            <button
              onClick={() => setShowImport(!showImport)}
              className="pixel-btn"
              style={{ padding: "6px 12px" }}
            >
              {showImport ? "Hide" : "Show"}
            </button>
          </div>

          {showImport && (
            <div style={{ marginTop: "0.5rem" }}>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste save data here..."
                style={{
                  width: "100%",
                  height: "80px",
                  background: "#0d0d1a",
                  border: "2px solid #334155",
                  borderRadius: "4px",
                  color: "#e2e8f0",
                  padding: "8px",
                  fontFamily: "monospace",
                  fontSize: "10px",
                }}
              />
              <button
                onClick={handleImport}
                className="pixel-btn"
                style={{ marginTop: "0.5rem", width: "100%" }}
              >
                Import
              </button>
            </div>
          )}

          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "2px solid #334155" }}>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="pixel-btn"
              style={{
                width: "100%",
                background: "#ef4444",
                color: "white",
              }}
            >
              Reset Progress
            </button>
          </div>

          {showResetConfirm && (
            <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
              <p style={{ color: "#ef4444", fontSize: "10px", marginBottom: "0.5rem" }}>
                Are you sure? This cannot be undone!
              </p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={handleReset} className="pixel-btn" style={{ flex: 1, background: "#ef4444", color: "white" }}>
                  Yes, Reset
                </button>
                <button onClick={() => setShowResetConfirm(false)} className="pixel-btn" style={{ flex: 1 }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowSettings(false)}
            className="pixel-btn"
            style={{ marginTop: "1rem", width: "100%" }}
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.logoArea}>
        <div style={styles.moon}>🌙</div>
        <h1 style={styles.gameTitle}>ICE DRILL</h1>
        <p style={styles.subtitle}>LUNAR COLONY</p>
      </div>

      <div className="pixel-panel" style={styles.menuPanel}>
        {savedGame ? (
          <button onClick={handleContinue} className="pixel-btn" style={styles.menuButton}>
            Continue
          </button>
        ) : (
          <button onClick={handleNewGame} className="pixel-btn" style={styles.menuButton}>
            New Game
          </button>
        )}

        <button onClick={handleNewGame} className="pixel-btn" style={styles.menuButtonSecondary}>
          {savedGame ? "New Game" : "Start"}
        </button>

        <button onClick={() => setShowHowToPlay(true)} className="pixel-btn" style={styles.menuButtonSecondary}>
          How to Play
        </button>

        <button onClick={() => setShowSettings(true)} className="pixel-btn" style={styles.menuButtonSecondary}>
          Settings
        </button>
      </div>

      <p style={styles.footer}>Based on Sunflower Land | Lunar Theme</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d1a 100%)",
    padding: "2rem",
  },
  logoArea: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  moon: {
    fontSize: "5rem",
    marginBottom: "1rem",
    filter: "drop-shadow(0 0 20px rgba(34, 211, 238, 0.4))",
  },
  gameTitle: {
    fontSize: "2.5rem",
    fontFamily: "var(--font-pixel)",
    color: "#22d3ee",
    margin: 0,
    textShadow: "0 0 30px rgba(34, 211, 238, 0.6)",
    letterSpacing: "4px",
  },
  subtitle: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    margin: "0.5rem 0 0 0",
    letterSpacing: "0.3em",
  },
  panel: {
    maxWidth: "400px",
    width: "100%",
    padding: "1.5rem",
  },
  menuPanel: {
    width: "100%",
    maxWidth: "320px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  menuButton: {
    width: "100%",
    padding: "14px 20px",
    fontSize: "12px",
    background: "#22d3ee",
    color: "#0d0d1a",
  },
  menuButtonSecondary: {
    width: "100%",
    padding: "10px 16px",
    fontSize: "10px",
  },
  title: {
    fontFamily: "var(--font-pixel)",
    fontSize: "14px",
    color: "#e2e8f0",
    marginBottom: "1rem",
    textAlign: "center",
  },
  tutorialSection: {
    marginBottom: "1rem",
  },
  tutorialHeader: {
    fontSize: "11px",
    color: "#22d3ee",
    marginBottom: "0.25rem",
  },
  tutorialText: {
    fontSize: "10px",
    color: "#94a3b8",
    margin: 0,
    lineHeight: 1.5,
  },
  settingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 0",
    borderBottom: "1px solid #33415533",
  },
  settingLabel: {
    fontSize: "10px",
    color: "#e2e8f0",
  },
  footer: {
    marginTop: "2rem",
    fontSize: "0.75rem",
    color: "#64748b",
  },
};
