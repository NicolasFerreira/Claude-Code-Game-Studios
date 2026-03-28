/**
 * ICE DRILL - Notification System
 * Toast notifications and floating text animations.
 */

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration: number;
  createdAt: number;
}

export interface FloatingText {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  createdAt: number;
}

// Constants
export const NOTIFICATION_DURATION = 3000; // ms
export const NOTIFICATION_ENTER = 200; // ms
export const NOTIFICATION_EXIT = 200; // ms
export const FLOATING_DURATION = 800; // ms
export const MAX_VISIBLE_NOTIFICATIONS = 3;

export const NOTIFICATION_COLORS: Record<NotificationType, string> = {
  success: '#22c55e',
  error: '#ef4444',
  info: '#3b82f6',
  warning: '#f97316',
};

// Create notification ID
export function createNotificationId(): string {
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Create floating text ID
export function createFloatingId(): string {
  return `float-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Get resource color for floating text
export function getResourceColor(resourceType: string): string {
  const colors: Record<string, string> = {
    ice: '#22d3ee',
    solarEnergy: '#fbbf24',
    helium3: '#a78bfa',
    water: '#38bdf8',
    oxygen: '#4ade80',
    iron: '#94a3b8',
    gold: '#fbbf24',
  };
  return colors[resourceType] || '#ffffff';
}
