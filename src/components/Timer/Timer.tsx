import React, { useEffect, useContext } from "react";
import { WebSocketContext } from "../../WebSocket";
import { otherSide } from "../../shared/utility";
import useTimer from "../../hooks/useTimer";
import { useAppSelector } from "../../store/hooks";

interface TimerProps {
  side: "X" | "O";
  seconds: number;
  setTime: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ side, seconds, setTime }) => {
  const ws = useContext(WebSocketContext);
  const { toPlay, gameStarted, gameOver } = useAppSelector((state) => state.game);
  const [time, start, pause, reset] = useTimer(seconds);

  useEffect(() => {
    setTime(time);
  }, [time, setTime]);

  useEffect(() => {
    if (time === 0 && gameStarted && ws) {
      ws.fixWinner(otherSide(side));
      reset();
    }
  }, [gameStarted, ws, side, time, reset]);

  useEffect(() => {
    if (gameStarted && toPlay === side) {
      start();
    } else {
      pause();
    }
    if (gameOver) {
      pause();
    }
  }, [gameStarted, gameOver, start, pause, toPlay, side]);
  
  return <div>{time}</div>;
};

export default Timer;
