/**
 * ICE DRILL - Cooking System
 * Recipes and food definitions for the Kitchen building.
 */

import { FoodItem, FoodInventoryItem, ResourceState, ResourceType } from "@/types/game";

// Food items that can be cooked
export const FOODS: Record<string, FoodItem> = {
  lunarBread: {
    id: "lunarBread",
    name: "Lunar Bread",
    icon: "/assets/resources/lunar-wheat.png",
    description: "+10% production speed",
    ingredients: { lunarWheat: 5 },
    duration: 300, // 5 minutes
    buffType: "speed",
    buffValue: 10,
  },
  hydrationSoup: {
    id: "hydrationSoup",
    name: "Hydration Soup",
    icon: "/assets/resources/water.png",
    description: "+10% luck",
    ingredients: { water: 3, lunarWheat: 2 },
    duration: 300,
    buffType: "luck",
    buffValue: 10,
  },
  powerBars: {
    id: "powerBars",
    name: "Power Bars",
    icon: "/assets/resources/iron.png",
    description: "+10% efficiency",
    ingredients: { iron: 10 },
    duration: 300,
    buffType: "efficiency",
    buffValue: 10,
  },
};

// Check if player can afford to cook a recipe
export function canCook(foodId: string, resources: ResourceState): boolean {
  const food = FOODS[foodId];
  if (!food) return false;

  return Object.entries(food.ingredients).every(([resource, amount]) => {
    if (!amount) return true;
    return resources[resource as ResourceType] >= amount;
  });
}

// Cook a recipe, deducting ingredients
export function cook(foodId: string, resources: ResourceState): ResourceState | null {
  const food = FOODS[foodId];
  if (!food || !canCook(foodId, resources)) return null;

  const newResources = { ...resources };
  for (const [resource, amount] of Object.entries(food.ingredients)) {
    if (amount) {
      newResources[resource as ResourceType] -= amount;
    }
  }

  return newResources;
}

// Create a food inventory item from a cooked recipe
export function createFoodItem(foodId: string): FoodInventoryItem | null {
  const food = FOODS[foodId];
  if (!food) return null;

  const now = Date.now();
  return {
    itemId: `${foodId}-${now}`,
    food,
    obtainedAt: now,
    expiresAt: food.duration > 0 ? now + food.duration * 1000 : null,
  };
}

// Check if a food item has expired
export function isExpired(item: FoodInventoryItem): boolean {
  if (item.expiresAt === null) return false;
  return Date.now() > item.expiresAt;
}

// Apply food buffs to a base value
export function applyBuffs<T extends number>(
  baseValue: T,
  activeFoods: FoodInventoryItem[],
  buffType: "speed" | "luck" | "efficiency"
): T {
  let multiplier = 1;

  for (const item of activeFoods) {
    if (isExpired(item)) continue;
    if (item.food.buffType === buffType) {
      multiplier += item.food.buffValue / 100;
    }
  }

  return Math.floor(baseValue * multiplier) as T;
}

// Get list of cookable recipes
export function getCookableRecipes(resources: ResourceState): string[] {
  return Object.keys(FOODS).filter((id) => canCook(id, resources));
}

// Get all available recipes
export function getAllRecipes(): FoodItem[] {
  return Object.values(FOODS);
}
