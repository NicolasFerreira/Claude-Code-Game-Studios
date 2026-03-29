/**
 * ICE DRILL - Quest Context
 * Manages daily quest state and persistence.
 */

"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from "react";
import {
  Quest,
  QuestState,
  QuestType,
  generateDailyQuests,
  shouldResetQuests,
  getTodayString,
  updateQuestProgress,
  claimQuest,
  getUnclaimedCount,
} from "@/systems/QuestSystem";
import { useGame } from "@/context/GameContext";

const QUEST_SAVE_KEY = "ice-drill-quests";

interface QuestContextValue {
  quests: Quest[];
  claimableCount: number;
  claimReward: (questId: string) => void;
  trackEvent: (type: QuestType, amount?: number) => void;
}

const QuestContext = createContext<QuestContextValue | null>(null);

function loadQuestState(): QuestState {
  if (typeof window === "undefined") {
    return { quests: generateDailyQuests(), lastReset: getTodayString() };
  }

  try {
    const saved = localStorage.getItem(QUEST_SAVE_KEY);
    if (!saved) {
      return { quests: generateDailyQuests(), lastReset: getTodayString() };
    }

    const state: QuestState = JSON.parse(saved);

    // Check if we need daily reset
    if (shouldResetQuests(state.lastReset)) {
      return { quests: generateDailyQuests(), lastReset: getTodayString() };
    }

    return state;
  } catch {
    return { quests: generateDailyQuests(), lastReset: getTodayString() };
  }
}

function saveQuestState(state: QuestState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(QUEST_SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save quest state:", e);
  }
}

type QuestAction =
  | { type: "LOAD"; payload: QuestState }
  | { type: "CLAIM"; payload: { questId: string; reward: number } }
  | { type: "TRACK"; payload: { eventType: QuestType; amount: number } }
  | { type: "RESET" };

function questReducer(state: QuestState, action: QuestAction): QuestState {
  switch (action.type) {
    case "LOAD":
      return action.payload;

    case "CLAIM": {
      const result = claimQuest(state.quests, action.payload.questId);
      if (!result) return state;
      return { ...state, quests: result.quests };
    }

    case "TRACK": {
      const newQuests = updateQuestProgress(state.quests, action.payload.eventType, action.payload.amount);
      return { ...state, quests: newQuests };
    }

    case "RESET":
      return { quests: generateDailyQuests(), lastReset: getTodayString() };

    default:
      return state;
  }
}

export function QuestProvider({ children }: { children: React.ReactNode }) {
  const { state: gameState, dispatch: gameDispatch } = useGame();
  const [questState, dispatch] = useReducer(questReducer, null, () => loadQuestState());
  const lastBuildingsCount = useRef(gameState.buildings.length);
  const lastCollectedFrom = useRef<Set<string>>(new Set());

  // Save to localStorage on changes
  useEffect(() => {
    saveQuestState(questState);
  }, [questState]);

  // Track building placements
  useEffect(() => {
    const currentCount = gameState.buildings.length;
    if (currentCount > lastBuildingsCount.current) {
      const placed = currentCount - lastBuildingsCount.current;
      dispatch({ type: "TRACK", payload: { eventType: "place_buildings", amount: placed } });
    }
    lastBuildingsCount.current = currentCount;
  }, [gameState.buildings.length]);

  // Track collection from buildings (when resources change from production)
  useEffect(() => {
    // This is called on each tick, but we only want to track actual production
    // We'll use a different approach - track when buildings produce
  }, [gameState.resources]);

  // Public API
  const claimReward = useCallback((questId: string) => {
    const quest = questState.quests.find((q) => q.id === questId);
    if (!quest || !quest.completed || quest.claimed) return;

    dispatch({ type: "CLAIM", payload: { questId, reward: quest.reward } });
    gameDispatch({
      type: "COLLECT_RESOURCE",
      payload: { resourceType: "helium3", amount: quest.reward },
    });
  }, [questState.quests, gameDispatch]);

  const trackEvent = useCallback((type: QuestType, amount: number = 1) => {
    dispatch({ type: "TRACK", payload: { eventType: type, amount } });
  }, []);

  const claimableCount = getUnclaimedCount(questState.quests);

  return (
    <QuestContext.Provider value={{ quests: questState.quests, claimableCount, claimReward, trackEvent }}>
      {children}
    </QuestContext.Provider>
  );
}

export function useQuests() {
  const context = useContext(QuestContext);
  if (!context) {
    throw new Error("useQuests must be used within a QuestProvider");
  }
  return context;
}
