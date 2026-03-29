/**
 * ICE DRILL - Quest Panel
 * Displays daily quests with progress and claim buttons.
 */

"use client";

import { useQuests } from "@/context/QuestContext";
import { Quest } from "@/systems/QuestSystem";

interface QuestPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

function QuestItem({ quest, onClaim }: { quest: Quest; onClaim: () => void }) {
  const progress = quest.progress;
  const target = quest.target;
  const percent = Math.min((progress / target) * 100, 100);
  const canClaim = quest.completed && !quest.claimed;

  return (
    <div
      style={{
        background: quest.claimed
          ? "#1e293b"
          : quest.completed
          ? "#064e3b"
          : "#0f172a",
        border: quest.completed ? "2px solid #10b981" : "2px solid #334155",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            color: "#e2e8f0",
            fontSize: "11px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          {quest.description}
        </span>
        <span
          style={{
            color: "#fbbf24",
            fontSize: "10px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          {quest.reward} He3
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#1e293b",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: quest.completed
              ? "linear-gradient(90deg, #10b981, #34d399)"
              : "linear-gradient(90deg, #22d3ee, #06b6d4)",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#94a3b8",
            fontSize: "9px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          {progress} / {target}
        </span>

        {canClaim ? (
          <button
            onClick={onClaim}
            className="pixel-btn"
            style={{
              padding: "4px 12px",
              fontSize: "9px",
              background: "#10b981",
              border: "2px solid #34d399",
            }}
          >
            CLAIM
          </button>
        ) : quest.claimed ? (
          <span
            style={{
              color: "#10b981",
              fontSize: "9px",
              fontFamily: "var(--font-pixel)",
            }}
          >
            CLAIMED
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function QuestPanel({ isOpen, onClose }: QuestPanelProps) {
  const { quests, claimReward, claimableCount } = useQuests();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "320px",
        height: "100vh",
        background: "#0f172a",
        borderLeft: "4px solid #22d3ee",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        boxShadow: "-4px 0 24px rgba(34, 211, 238, 0.3)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "2px solid #334155",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#e2e8f0",
              fontSize: "14px",
              fontFamily: "var(--font-pixel)",
            }}
          >
            DAILY QUESTS
          </h2>
          <p
            style={{
              margin: "4px 0 0 0",
              color: "#94a3b8",
              fontSize: "9px",
              fontFamily: "var(--font-pixel)",
            }}
          >
            Resets at midnight
          </p>
        </div>

        {claimableCount > 0 && (
          <div
            style={{
              background: "#10b981",
              color: "#0f172a",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "10px",
              fontFamily: "var(--font-pixel)",
              fontWeight: "bold",
            }}
          >
            {claimableCount} CLAIMABLE
          </div>
        )}
      </div>

      {/* Quest list */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
        {quests.map((quest) => (
          <QuestItem key={quest.id} quest={quest} onClaim={() => claimReward(quest.id)} />
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="pixel-btn"
        style={{
          margin: "16px",
          padding: "8px",
          background: "#334155",
          border: "2px solid #475569",
        }}
      >
        Close
      </button>
    </div>
  );
}
