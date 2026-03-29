/**
 * ICE DRILL - Cooking Context
 * Manages food inventory and active buffs.
 */

"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { FoodInventoryItem } from "@/types/game";
import { createFoodItem, isExpired, FOODS } from "@/systems/CookingSystem";
import { useGame } from "@/context/GameContext";

const COOKING_SAVE_KEY = "ice-drill-cooking";

interface CookingState {
  inventory: FoodInventoryItem[];
}

interface CookingContextValue {
  inventory: FoodInventoryItem[];
  activeFoods: FoodInventoryItem[];
  cook: (foodId: string) => boolean;
  consumeFood: (itemId: string) => void;
}

const CookingContext = createContext<CookingContextValue | null>(null);

function loadCookingState(): CookingState {
  if (typeof window === "undefined") {
    return { inventory: [] };
  }

  try {
    const saved = localStorage.getItem(COOKING_SAVE_KEY);
    if (!saved) return { inventory: [] };

    const state: CookingState = JSON.parse(saved);
    // Filter out expired items
    state.inventory = state.inventory.filter((item) => !isExpired(item));
    return state;
  } catch {
    return { inventory: [] };
  }
}

function saveCookingState(state: CookingState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COOKING_SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save cooking state:", e);
  }
}

type CookingAction =
  | { type: "LOAD"; payload: CookingState }
  | { type: "ADD_FOOD"; payload: FoodInventoryItem }
  | { type: "CONSUME_FOOD"; payload: string };

function cookingReducer(state: CookingState, action: CookingAction): CookingState {
  switch (action.type) {
    case "LOAD":
      return action.payload;

    case "ADD_FOOD":
      return { ...state, inventory: [...state.inventory, action.payload] };

    case "CONSUME_FOOD":
      return {
        ...state,
        inventory: state.inventory.filter((item) => item.itemId !== action.payload),
      };

    default:
      return state;
  }
}

export function CookingProvider({ children }: { children: React.ReactNode }) {
  const { state: gameState, dispatch: gameDispatch } = useGame();
  const [cookingState, dispatch] = useReducer(cookingReducer, null, () => loadCookingState());

  // Save to localStorage on changes
  useEffect(() => {
    saveCookingState(cookingState);
  }, [cookingState]);

  // Periodically clean up expired items
  useEffect(() => {
    const interval = setInterval(() => {
      const hasExpired = cookingState.inventory.some((item) => isExpired(item));
      if (hasExpired) {
        dispatch({ type: "LOAD", payload: { inventory: cookingState.inventory.filter((item) => !isExpired(item)) } });
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [cookingState.inventory]);

  // Cook a recipe
  const cookFood = useCallback(
    (foodId: string): boolean => {
      const food = FOODS[foodId];
      if (!food) return false;

      // Check if we can afford the ingredients
      const ingredients = food.ingredients;
      const canAfford = Object.entries(ingredients).every(([resource, amount]) => {
        if (!amount) return true;
        return gameState.resources[resource as keyof typeof gameState.resources] >= amount;
      });

      if (!canAfford) return false;

      // Deduct resources from game state
      const newResources = { ...gameState.resources };
      for (const [resource, amount] of Object.entries(ingredients)) {
        if (amount) {
          newResources[resource as keyof typeof newResources] -= amount;
        }
      }

      // Update game state
      for (const [resource, amount] of Object.entries(ingredients)) {
        if (amount) {
          gameDispatch({
            type: "REMOVE_RESOURCE",
            payload: { resource: resource as any, amount },
          });
        }
      }

      // Create and add food item to inventory
      const foodItem = createFoodItem(foodId);
      if (foodItem) {
        dispatch({ type: "ADD_FOOD", payload: foodItem });
      }

      return true;
    },
    [gameState.resources, gameDispatch]
  );

  // Consume (eat) a food item - removes from inventory
  const consumeFood = useCallback((itemId: string) => {
    dispatch({ type: "CONSUME_FOOD", payload: itemId });
  }, []);

  // Active foods are non-expired items in inventory
  const activeFoods = cookingState.inventory.filter((item) => !isExpired(item));

  return (
    <CookingContext.Provider value={{ inventory: cookingState.inventory, activeFoods, cook: cookFood, consumeFood }}>
      {children}
    </CookingContext.Provider>
  );
}

export function useCooking() {
  const context = useContext(CookingContext);
  if (!context) {
    throw new Error("useCooking must be used within a CookingProvider");
  }
  return context;
}
