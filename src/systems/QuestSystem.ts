/**
 * ICE DRILL - Quest System
 * Daily quests with progress tracking.
 */

export type QuestType =
  | "collect_ice"
  | "place_buildings"
  | "sell_resources"
  | "collect_from_buildings";

export interface Quest {
  id: string;
  type: QuestType;
  description: string;
  target: number;
  progress: number;
  reward: number; // helium3 reward
  completed: boolean;
  claimed: boolean;
}

export interface QuestState {
  quests: Quest[];
  lastReset: string; // ISO date string for daily reset
}

const QUEST_DEFINITIONS: Omit<Quest, "progress" | "completed" | "claimed">[] = [
  {
    id: "collect_ice_1",
    type: "collect_ice",
    description: "Collect 50 ice",
    target: 50,
    reward: 10,
  },
  {
    id: "place_buildings_1",
    type: "place_buildings",
    description: "Place 3 buildings",
    target: 3,
    reward: 25,
  },
  {
    id: "sell_resources_1",
    type: "sell_resources",
    description: "Sell resources worth 100 helium3",
    target: 100,
    reward: 30,
  },
  {
    id: "collect_from_buildings_1",
    type: "collect_from_buildings",
    description: "Collect from 10 buildings",
    target: 10,
    reward: 20,
  },
];

/**
 * Generate daily quests for today
 */
export function generateDailyQuests(): Quest[] {
  return QUEST_DEFINITIONS.map((def) => ({
    ...def,
    progress: 0,
    completed: false,
    claimed: false,
  }));
}

/**
 * Check if quests need to be reset (new day)
 */
export function shouldResetQuests(lastReset: string): boolean {
  const last = new Date(lastReset);
  const today = new Date();
  return (
    last.getFullYear() !== today.getFullYear() ||
    last.getMonth() !== today.getMonth() ||
    last.getDate() !== today.getDate()
  );
}

/**
 * Get today's date string for reset tracking
 */
export function getTodayString(): string {
  return new Date().toISOString();
}

/**
 * Update quest progress based on game events
 */
export function updateQuestProgress(
  quests: Quest[],
  eventType: QuestType,
  amount: number = 1
): Quest[] {
  return quests.map((quest) => {
    if (quest.completed || quest.claimed) return quest;
    if (quest.type !== eventType) return quest;

    const newProgress = Math.min(quest.progress + amount, quest.target);
    return {
      ...quest,
      progress: newProgress,
      completed: newProgress >= quest.target,
    };
  });
}

/**
 * Claim a completed quest reward
 */
export function claimQuest(quests: Quest[], questId: string): { quests: Quest[]; reward: number } | null {
  const questIndex = quests.findIndex((q) => q.id === questId);
  if (questIndex === -1) return null;

  const quest = quests[questIndex];
  if (!quest.completed || quest.claimed) return null;

  const newQuests = [...quests];
  newQuests[questIndex] = { ...quest, claimed: true };

  return { quests: newQuests, reward: quest.reward };
}

/**
 * Get count of completed but unclaimed quests
 */
export function getUnclaimedCount(quests: Quest[]): number {
  return quests.filter((q) => q.completed && !q.claimed).length;
}

/**
 * Get total reward available from unclaimed quests
 */
export function getTotalAvailableReward(quests: Quest[]): number {
  return quests
    .filter((q) => q.completed && !q.claimed)
    .reduce((sum, q) => sum + q.reward, 0);
}
