import { useEffect, useState, useCallback } from "react";

export default (seconds) => {
  const [time, setTime] = useState(seconds);
  const [toPause, setToPause] = useState(true);
  const start = useCallback(() => setToPause(false), []);
  const pause = useCallback(() => setToPause(true), []);
  const reset = useCallback(() => {
    setTime(seconds);
    setToPause(true);
  }, [seconds]);
  useEffect(() => {
    time && !toPause && setTimeout(() => setTime((prev) => prev - 1), 1000);
  }, [time, toPause]);
  return [time, start, pause, reset];
};
