"use client";

import { useEffect, useState } from "react";

export function useLocalTime() {
  const [time, setTime] = useState<string>("--:--:--");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function updateClock() {
      const now = new Date();
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTime(formatter.format(now));
      } catch {
        // Fallback to local time if timezone string fails
        const pad = (n: number) => n.toString().padStart(2, "0");
        setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
      }
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return { time, mounted };
}
