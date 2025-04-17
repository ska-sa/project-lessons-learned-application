import { useEffect, useState } from "react";
import { useAuth } from "../features/auth/AuthProvider";

const SESSION_WARNING_TIME = 300; // 5 minutes in seconds

export function useSessionTimeout() {
  const { logout } = useAuth();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let lastActivity = Date.now();

    const resetTimer = () => {
      lastActivity = Date.now();
      setShowWarning(false);
    };

    const startTimer = () => {
      const sessionTimeout =
        Number(process.env.REACT_APP_SESSION_TIMEOUT) || 28800;

      timeoutId = setTimeout(() => {
        logout();
      }, sessionTimeout * 1000);

      intervalId = setInterval(() => {
        const remaining =
          sessionTimeout - Math.floor((Date.now() - lastActivity) / 1000);
        setTimeLeft(remaining);

        if (remaining <= SESSION_WARNING_TIME) {
          setShowWarning(true);
        }
      }, 1000);
    };

    const handleActivity = () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      resetTimer();
      startTimer();
    };

    // Set up event listeners
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity);

    startTimer();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [logout]);

  return { timeLeft, showWarning };
}
