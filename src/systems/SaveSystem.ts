/**
 * ICE DRILL - Save System
 * Handles persistence of game state to localStorage.
 */

import { GameState } from "@/types/game";

const SAVE_KEY = "ice-drill-save";
const SAVE_VERSION = 1;

export interface SaveData {
  version: number;
  state: GameState;
  savedAt: string;
}

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/**
 * Save game state to localStorage
 * @returns true if save succeeded, false if failed
 */
export function saveGame(state: GameState): boolean {
  if (!isBrowser()) return false;

  const saveData: SaveData = {
    version: SAVE_VERSION,
    state,
    savedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    return true;
  } catch (e) {
    console.error("Failed to save game:", e);
    return false;
  }
}

/**
 * Load game state from localStorage
 */
export function loadGame(): GameState | null {
  if (!isBrowser()) return null;

  try {
    const data = localStorage.getItem(SAVE_KEY);
    if (!data) return null;

    const saveData: SaveData = JSON.parse(data);

    // Version migration if needed
    if (saveData.version < SAVE_VERSION) {
      return migrateSave(saveData);
    }

    return saveData.state;
  } catch (e) {
    console.error("Failed to load game:", e);
    return null;
  }
}

/**
 * Check if a save exists
 */
export function hasSave(): boolean {
  if (!isBrowser()) return false;
  return localStorage.getItem(SAVE_KEY) !== null;
}

/**
 * Delete save
 */
export function deleteSave(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(SAVE_KEY);
}

/**
 * Export save as JSON string
 */
export function exportSave(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(SAVE_KEY);
}

/**
 * Import save from JSON string
 */
export function importSave(json: string): boolean {
  if (!isBrowser()) return false;

  try {
    const saveData: SaveData = JSON.parse(json);
    if (!saveData.state || !saveData.version) {
      return false;
    }
    localStorage.setItem(SAVE_KEY, json);
    return true;
  } catch {
    return false;
  }
}

/**
 * Migrate old save versions
 */
function migrateSave(saveData: SaveData): GameState {
  // Future: add migration logic here
  // For now, just update version
  return {
    ...saveData.state,
  };
}

/**
 * Get offline time in seconds (max 8 hours)
 */
export function getOfflineTime(savedAt: string | number): number {
  if (!isBrowser()) return 0;

  // savedAt can be a number (timestamp) or ISO string
  const saved = typeof savedAt === 'number' ? savedAt : new Date(savedAt).getTime();
  const now = Date.now();
  const diff = (now - saved) / 1000; // seconds
  return Math.min(diff, 8 * 60 * 60); // max 8 hours
}
