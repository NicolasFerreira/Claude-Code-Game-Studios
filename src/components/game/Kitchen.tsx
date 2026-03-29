/**
 * ICE DRILL - Kitchen Component
 * Cooking UI for the Kitchen building.
 */

"use client";

import { useCooking } from "@/context/CookingContext";
import { FOODS, getAllRecipes } from "@/systems/CookingSystem";

interface KitchenProps {
  isOpen: boolean;
  onClose: () => void;
}

function RecipeCard({ foodId, onCook }: { foodId: string; onCook: () => void }) {
  const food = FOODS[foodId];
  if (!food) return null;

  const ingredientList = Object.entries(food.ingredients)
    .filter(([, amount]) => amount && amount > 0)
    .map(([resource, amount]) => `${amount} ${resource}`)
    .join(", ");

  const durationMinutes = Math.floor(food.duration / 60);

  return (
    <div
      style={{
        background: "#1e293b",
        border: "2px solid #334155",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "8px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span
          style={{
            color: "#e2e8f0",
            fontSize: "12px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          {food.name}
        </span>
        <span
          style={{
            color: "#94a3b8",
            fontSize: "9px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          {durationMinutes}min
        </span>
      </div>

      <p
        style={{
          color: "#10b981",
          fontSize: "9px",
          fontFamily: "var(--font-pixel)",
          margin: "0 0 8px 0",
        }}
      >
        {food.description}
      </p>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "8px",
          fontFamily: "var(--font-pixel)",
          margin: "0 0 8px 0",
        }}
      >
        {ingredientList}
      </p>

      <button
        onClick={onCook}
        className="pixel-btn"
        style={{
          width: "100%",
          padding: "6px",
          fontSize: "9px",
          background: "#10b981",
          border: "2px solid #34d399",
        }}
      >
        COOK
      </button>
    </div>
  );
}

export function Kitchen({ isOpen, onClose }: KitchenProps) {
  const { cook } = useCooking();
  const recipes = getAllRecipes();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "320px",
        height: "100vh",
        background: "#0f172a",
        borderRight: "4px solid #f97316",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 24px rgba(249, 115, 22, 0.3)",
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
          KITCHEN
        </h2>
        <p
          style={{
            margin: "4px 0 0 0",
            color: "#94a3b8",
            fontSize: "9px",
            fontFamily: "var(--font-pixel)",
          }}
        >
          Cook food for buffs
        </p>
      </div>

      {/* Recipe list */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} foodId={recipe.id} onCook={() => cook(recipe.id)} />
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
