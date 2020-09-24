import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import useTimer from "../../hooks/useTimer";
import { socket } from "../../config";
import * as actions from "../../store/actions";
import Button from "../UI/Button/button";
import Loading from "../UI/Spinner/LoadingIndicator";
import classes from "./PreGame.module.css";

const Leaderboard = ({ showPreGame }) => {
  const [time, start] = useTimer(4);
  const [matched, setMatched] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const setOnlinePlayers = useCallback(
    (username, opponent) =>
      dispatch(actions.setOnlinePlayers(username, opponent)),
    [dispatch]
  );

  useEffect(() => {
    socket.on("matched", (opponent) => {
      setMatched(true);
      setOpponent(opponent);
    });
    return () => socket.off("matched");
  }, [setMatched]);

  useEffect(() => {
    if (matched) start();
  }, [matched, start]);

  useEffect(() => {
    if (time === 0) {
      showPreGame(false);
      setOnlinePlayers(user.username, opponent);
    }
  }, [setOnlinePlayers, user.username, showPreGame, opponent, time]);
  let toShow = (
    <div>
      {matched ? (
        <p>Game Starts in {time}</p>
      ) : (
        <div>
          <Loading />
          <p>Searching for Opponents</p>
          <Button
            btnType="Success"
            size="Small"
            onClick={() => showPreGame(false)}
          >
            cancel
          </Button>
        </div>
      )}
    </div>
  );

  return <div className={classes.container}>{toShow}</div>;
};

export default Leaderboard;
