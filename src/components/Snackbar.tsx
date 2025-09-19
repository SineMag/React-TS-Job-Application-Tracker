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
}
