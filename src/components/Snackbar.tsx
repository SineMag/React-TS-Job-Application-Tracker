<<<<<<< HEAD
import { useEffect } from 'react';
import { useNotification, type Notification } from '../contexts/NotificationContext';

interface SnackbarProps {
  notification: Notification;
}

const SnackbarItem = ({ notification }: SnackbarProps) => {
  const { removeNotification } = useNotification();

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.id, notification.duration, removeNotification]);

  const getSnackbarClass = (type: Notification['type']) => {
    const baseClass = 'snackbar';
    switch (type) {
      case 'success':
        return `${baseClass} snackbar-success`;
      case 'error':
        return `${baseClass} snackbar-error`;
      case 'warning':
        return `${baseClass} snackbar-warning`;
      case 'info':
        return `${baseClass} snackbar-info`;
      default:
        return baseClass;
    }
  };

  return (
    <div className={getSnackbarClass(notification.type)}>
      <span className="snackbar-message">{notification.message}</span>
      <button 
        className="snackbar-close"
        onClick={() => removeNotification(notification.id)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default function Snackbar() {
  const { notifications } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="snackbar-container">
      {notifications.map((notification) => (
        <SnackbarItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
=======
import React, { useEffect, useState } from "react";
import "./Snackbar.css";

interface SnackbarProps {
  message: string;
  duration?: number; // optional, default 3000ms
  type?: "success" | "error" | "info"; // optional, default info
  onClose?: () => void; // optional callback when snackbar hides
}

export default function Snackbar({
  message,
  duration = 3000,
  type = "info",
  onClose,
}: SnackbarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return <div className={`snackbar ${type}`}>{message}</div>;
>>>>>>> 7fca742ce54faa43bf5f46c538852efbc5fd9324
}
