/**
 * ICE DRILL - Autosave Hook
 * Automatically saves game state at intervals and on page unload.
 */

import { useEffect, useRef } from "react";
import { GameState } from "@/types/game";
import { saveGame } from "@/systems/SaveSystem";

const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export function useAutosave(state: GameState) {
  const lastSaveRef = useRef<number>(Date.now());

  useEffect(() => {
    // Autosave interval
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastSaveRef.current >= AUTOSAVE_INTERVAL) {
        const success = saveGame(state);
        if (success) {
          lastSaveRef.current = now;
        }
      }
    }, AUTOSAVE_INTERVAL);

    // Save on page unload
    const handleUnload = () => {
      saveGame(state);
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [state]);
}
