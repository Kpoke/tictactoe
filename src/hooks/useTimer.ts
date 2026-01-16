import { useEffect, useState, useCallback } from "react";

const useTimer = (seconds: number): [number, () => void, () => void, () => void] => {
  const [time, setTime] = useState(seconds);
  const [toPause, setToPause] = useState(true);
  const start = useCallback(() => setToPause(false), []);
  const pause = useCallback(() => setToPause(true), []);
  const reset = useCallback(() => {
    setTime(seconds);
    setToPause(true);
  }, [seconds]);
  useEffect(() => {
    if (time && !toPause) {
      const timeout = setTimeout(() => setTime((prev) => prev - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [time, toPause]);
  return [time, start, pause, reset];
};

export default useTimer;
