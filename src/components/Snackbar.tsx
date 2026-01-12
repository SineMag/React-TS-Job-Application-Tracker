import { useEffect } from 'react';
import { useNotification, type Notification } from '../contexts/NotificationContext';
import './Snackbar.css';

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
}
