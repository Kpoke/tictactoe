import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/actions";
import { otherSide } from "../../shared/utility";
import useTimer from "../../hooks/useTimer";

const Timer = ({ side }) => {
  const dispatch = useDispatch();
  const setWinnerDueToTime = useCallback(
    (side) => dispatch(actions.setWinnerDueToTime(side)),
    [dispatch]
  );
  const { toPlay, gameStarted, gameOver } = useSelector((state) => state.game);
  const [time, start, pause, reset] = useTimer(10);

  useEffect(() => {
    gameStarted && reset();
  }, [gameStarted, reset]);

  useEffect(() => {
    if (time === 0 && gameStarted) {
      setWinnerDueToTime(otherSide(side));
      reset();
    }
  }, [gameStarted, setWinnerDueToTime, side, time, reset]);

  useEffect(() => {
    gameStarted && toPlay === side ? start() : pause();
    gameOver && pause();
  }, [gameStarted, gameOver, start, pause, reset, toPlay, side, time]);
  return <h4>{time}</h4>;
};

export default Timer;
