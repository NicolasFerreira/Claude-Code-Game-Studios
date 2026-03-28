"use client";

import { useNotification } from "@/hooks/useNotification";
import { NOTIFICATION_COLORS } from "@/systems/NotificationSystem";

export function Notifications() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="pixel-panel"
          style={{
            padding: "12px 16px",
            minWidth: "200px",
            maxWidth: "300px",
            borderLeft: `4px solid ${NOTIFICATION_COLORS[notif.type]}`,
            pointerEvents: "auto",
            cursor: "pointer",
            animation: "slideIn 200ms ease-out",
          }}
          onClick={() => removeNotification(notif.id)}
        >
          <span
            style={{
              color: NOTIFICATION_COLORS[notif.type],
              fontSize: "12px",
              fontFamily: "var(--font-pixel)",
            }}
          >
            {notif.message}
          </span>
        </div>
      ))}
    </div>
  );
}
