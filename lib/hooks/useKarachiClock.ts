"use client";

import { useState, useEffect } from "react";

/**
 * Hook providing a live, accurate timecode in Karachi (Asia/Karachi, UTC+5).
 * Formatted as HH:mm:ss in tabular numerals.
 */
export function useKarachiClock() {
  const [timeStr, setTimeStr] = useState<string>("00:00:00 KHI");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const updateTime = () => {
      try {
        const formatted = formatter.format(new Date());
        setTimeStr(`${formatted} KHI`);
      } catch {
        // Fallback if Intl timezone not supported
        const d = new Date();
        const utc = d.getTime() + d.getTimezoneOffset() * 60000;
        const khi = new Date(utc + 3600000 * 5);
        const pad = (n: number) => String(n).padStart(2, "0");
        setTimeStr(`${pad(khi.getHours())}:${pad(khi.getMinutes())}:${pad(khi.getSeconds())} KHI`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeStr;
}
