"use client";

import React, { createContext, useContext, useReducer, useCallback, useRef, useEffect } from "react";
import {
  Notification,
  FloatingText,
  NotificationType,
  NOTIFICATION_DURATION,
  FLOATING_DURATION,
  MAX_VISIBLE_NOTIFICATIONS,
  createNotificationId,
  createFloatingId,
  getResourceColor,
} from "@/systems/NotificationSystem";

// State
interface NotificationState {
  notifications: Notification[];
  floatingTexts: FloatingText[];
}

// Actions
export type NotificationAction =
  | { type: "ADD_NOTIFICATION"; payload: { message: string; notificationType: NotificationType } }
  | { type: "REMOVE_NOTIFICATION"; payload: { id: string } }
  | { type: "ADD_FLOATING_TEXT"; payload: { text: string; x: number; y: number; color: string } }
  | { type: "REMOVE_FLOATING_TEXT"; payload: { id: string } }
  | { type: "CLEAR_ALL_NOTIFICATIONS" }
  | { type: "CLEAR_ALL_FLOATING_TEXTS" };

// Reducer (exported for testing)
export function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      const newNotification: Notification = {
        id: createNotificationId(),
        message: action.payload.message,
        type: action.payload.notificationType,
        duration: NOTIFICATION_DURATION,
        createdAt: Date.now(),
      };
      // Keep only MAX_VISIBLE recent notifications
      const newNotifications = [newNotification, ...state.notifications].slice(0, MAX_VISIBLE_NOTIFICATIONS);
      return { ...state, notifications: newNotifications };
    }
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload.id),
      };
    case "ADD_FLOATING_TEXT": {
      const newFloating: FloatingText = {
        id: createFloatingId(),
        text: action.payload.text,
        x: action.payload.x,
        y: action.payload.y,
        color: action.payload.color,
        createdAt: Date.now(),
      };
      return { ...state, floatingTexts: [...state.floatingTexts, newFloating] };
    }
    case "REMOVE_FLOATING_TEXT":
      return {
        ...state,
        floatingTexts: state.floatingTexts.filter((f) => f.id !== action.payload.id),
      };
    case "CLEAR_ALL_NOTIFICATIONS":
      return { ...state, notifications: [] };
    case "CLEAR_ALL_FLOATING_TEXTS":
      return { ...state, floatingTexts: [] };
    default:
      return state;
  }
}

// Context
interface NotificationContextValue {
  notifications: Notification[];
  floatingTexts: FloatingText[];
  addNotification: (message: string, type?: NotificationType) => void;
  addSuccess: (message: string) => void;
  addError: (message: string) => void;
  addInfo: (message: string) => void;
  addWarning: (message: string) => void;
  removeNotification: (id: string) => void;
  addFloatingText: (text: string, x: number, y: number, color?: string) => void;
  removeFloatingText: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);

// Provider
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
    floatingTexts: [],
  });

  // Auto-remove notifications after duration
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      state.notifications.forEach((notif) => {
        if (now - notif.createdAt > notif.duration) {
          dispatch({ type: "REMOVE_NOTIFICATION", payload: { id: notif.id } });
        }
      });
      state.floatingTexts.forEach((float) => {
        if (now - float.createdAt > FLOATING_DURATION) {
          dispatch({ type: "REMOVE_FLOATING_TEXT", payload: { id: float.id } });
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [state.notifications, state.floatingTexts]);

  const addNotification = useCallback((message: string, type: NotificationType = "info") => {
    dispatch({ type: "ADD_NOTIFICATION", payload: { message, notificationType: type } });
  }, []);

  const addSuccess = useCallback((message: string) => addNotification(message, "success"), [addNotification]);
  const addError = useCallback((message: string) => addNotification(message, "error"), [addNotification]);
  const addInfo = useCallback((message: string) => addNotification(message, "info"), [addNotification]);
  const addWarning = useCallback((message: string) => addNotification(message, "warning"), [addNotification]);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: { id } });
  }, []);

  const addFloatingText = useCallback((text: string, x: number, y: number, color?: string) => {
    const resourceMatch = text.match(/\+?(\d+)?\s*(\w+)/);
    const resourceType = resourceMatch ? resourceMatch[2].toLowerCase() : "";
    const finalColor = color || getResourceColor(resourceType);
    dispatch({ type: "ADD_FLOATING_TEXT", payload: { text, x, y, color: finalColor } });
  }, []);

  const removeFloatingText = useCallback((id: string) => {
    dispatch({ type: "REMOVE_FLOATING_TEXT", payload: { id } });
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        floatingTexts: state.floatingTexts,
        addNotification,
        addSuccess,
        addError,
        addInfo,
        addWarning,
        removeNotification,
        addFloatingText,
        removeFloatingText,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// Hook
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}
