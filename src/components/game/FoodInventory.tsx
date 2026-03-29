/**
 * ICE DRILL - Food Inventory Component
 * Shows active food buffs.
 */

"use client";

import { useCooking } from "@/context/CookingContext";
import { isExpired } from "@/systems/CookingSystem";

interface FoodInventoryProps {
  isOpen: boolean;
  onClose: () => void;
}

function FoodItemCard({ item, onConsume }: { item: any; onConsume: () => void }) {
  const expired = isExpired(item);
  const food = item.food;

  // Calculate remaining time
  let remainingText = "No expiry";
  if (item.expiresAt !== null && !expired) {
    const remaining = Math.max(0, Math.floor((item.expiresAt - Date.now()) / 1000));
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    remainingText = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div
      style={{
        background: expired ? "#1e293b44" : "#1e293b",
        border: expired ? "2px solid #33415544" : "2px solid #10b981",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "8px",
        opacity: expired ? 0.5 : 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span
          style={{
            color: "#e2e8f0",
            fontSize: "11px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          {food.name}
        </span>
        <span
          style={{
            color: expired ? "#94a3b8" : "#10b981",
            fontSize: "9px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          {expired ? "EXPIRED" : remainingText}
        </span>
      </div>

      <p
        style={{
          color: food.buffType === "speed" ? "#22d3ee" : food.buffType === "luck" ? "#fbbf24" : "#a78bfa",
          fontSize: "10px",
          fontFamily: "var(--font-pixel)",
          margin: "0 0 8px 0",
        }}
      >
        {food.description}
      </p>

      {!expired && (
        <button
          onClick={onConsume}
          className="pixel-btn"
          style={{
            width: "100%",
            padding: "4px",
            fontSize: "8px",
            background: "#334155",
            border: "2px solid #475569",
          }}
        >
          CONSUME
        </button>
      )}
    </div>
  );
}

export function FoodInventory({ isOpen, onClose }: FoodInventoryProps) {
  const { inventory, activeFoods, consumeFood } = useCooking();

  if (!isOpen) return null;

  const activeCount = activeFoods.length;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "320px",
        height: "100vh",
        background: "#0f172a",
        borderRight: "4px solid #10b981",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 24px rgba(16, 185, 129, 0.3)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "2px solid #334155",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#e2e8f0",
            fontSize: "14px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          FOOD INVENTORY
        </h2>
        <p
          style={{
            margin: "4px 0 0 0",
            color: "#94a3b8",
            fontSize: "9px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          {activeCount} active buff{activeCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Food list */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
        {inventory.length === 0 ? (
          <p
            style={{
              color: "#94a3b8",
              fontSize: "10px",
              fontFamily: "var(--font-pixel)",
              textAlign: "center",
            }}
          >
            No food cooked yet
          </p>
        ) : (
          inventory.map((item) => (
            <FoodItemCard key={item.itemId} item={item} onConsume={() => consumeFood(item.itemId)} />
          ))
        )}
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
