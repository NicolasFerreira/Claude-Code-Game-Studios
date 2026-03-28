import { describe, it, expect } from 'vitest';
import { notificationReducer, NotificationAction } from '@/context/NotificationContext';
import {
  NOTIFICATION_DURATION,
  FLOATING_DURATION,
  MAX_VISIBLE_NOTIFICATIONS,
} from '@/systems/NotificationSystem';

describe('NotificationSystem', () => {
  describe('notificationReducer', () => {
    it('should add a notification', () => {
      const state = { notifications: [], floatingTexts: [] };
      const action: NotificationAction = {
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Test message', notificationType: 'success' },
      };
      const result = notificationReducer(state, action);

      expect(result.notifications.length).toBe(1);
      expect(result.notifications[0].message).toBe('Test message');
      expect(result.notifications[0].type).toBe('success');
    });

    it('should remove a notification by id', () => {
      const notifId = 'notif-1';
      const state = {
        notifications: [
          { id: notifId, message: 'Test', type: 'info' as const, timestamp: Date.now(), duration: 3000, createdAt: Date.now() },
          { id: 'notif-2', message: 'Test 2', type: 'info' as const, timestamp: Date.now(), duration: 3000, createdAt: Date.now() },
        ],
        floatingTexts: [],
      };
      const action: NotificationAction = { type: 'REMOVE_NOTIFICATION', payload: { id: notifId } };
      const result = notificationReducer(state, action);

      expect(result.notifications.length).toBe(1);
      expect(result.notifications[0].id).toBe('notif-2');
    });

    it('should clear all notifications', () => {
      const state = {
        notifications: [
          { id: '1', message: 'Test', type: 'info' as const, timestamp: Date.now(), duration: 3000, createdAt: Date.now() },
          { id: '2', message: 'Test 2', type: 'error' as const, timestamp: Date.now(), duration: 3000, createdAt: Date.now() },
        ],
        floatingTexts: [],
      };
      const action: NotificationAction = { type: 'CLEAR_ALL_NOTIFICATIONS' };
      const result = notificationReducer(state, action);

      expect(result.notifications.length).toBe(0);
    });

    it('should not exceed MAX_VISIBLE_NOTIFICATIONS', () => {
      const state = { notifications: [], floatingTexts: [] };

      // Add 5 notifications (MAX is 3)
      let result = state;
      for (let i = 0; i < 5; i++) {
        const action: NotificationAction = {
          type: 'ADD_NOTIFICATION',
          payload: { message: `Message ${i}`, notificationType: 'info' },
        };
        result = notificationReducer(result, action);
      }

      expect(result.notifications.length).toBeLessThanOrEqual(MAX_VISIBLE_NOTIFICATIONS);
    });

    it('should add a floating text', () => {
      const state = { notifications: [], floatingTexts: [] };
      const action: NotificationAction = {
        type: 'ADD_FLOATING_TEXT',
        payload: { text: '+1 Ice', x: 100, y: 200, color: '#22d3ee' },
      };
      const result = notificationReducer(state, action);

      expect(result.floatingTexts.length).toBe(1);
      expect(result.floatingTexts[0].x).toBe(100);
      expect(result.floatingTexts[0].y).toBe(200);
      expect(result.floatingTexts[0].text).toBe('+1 Ice');
      expect(result.floatingTexts[0].color).toBe('#22d3ee');
    });

    it('should remove a floating text by id', () => {
      const floatId = 'float-1';
      const state = {
        notifications: [],
        floatingTexts: [
          { id: floatId, x: 0, y: 0, text: 'test', color: '#fff', createdAt: Date.now() },
        ],
      };
      const action: NotificationAction = { type: 'REMOVE_FLOATING_TEXT', payload: { id: floatId } };
      const result = notificationReducer(state, action);

      expect(result.floatingTexts.length).toBe(0);
    });

    it('should clear all floating texts', () => {
      const state = {
        notifications: [],
        floatingTexts: [
          { id: '1', x: 0, y: 0, text: 'test', color: '#fff', createdAt: Date.now() },
          { id: '2', x: 10, y: 10, text: 'test2', color: '#fff', createdAt: Date.now() },
        ],
      };
      const action: NotificationAction = { type: 'CLEAR_ALL_FLOATING_TEXTS' };
      const result = notificationReducer(state, action);

      expect(result.floatingTexts.length).toBe(0);
    });
  });

  describe('constants', () => {
    it('should have correct notification duration', () => {
      expect(NOTIFICATION_DURATION).toBe(3000);
    });

    it('should have correct floating text duration', () => {
      expect(FLOATING_DURATION).toBe(800);
    });

    it('should have correct max visible notifications', () => {
      expect(MAX_VISIBLE_NOTIFICATIONS).toBe(3);
    });
  });
});
