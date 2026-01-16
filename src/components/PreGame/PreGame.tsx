import React, { useEffect, useCallback, useState, useContext } from "react";
import useTimer from "../../hooks/useTimer";
import * as actions from "../../store/actions";
import Button from "../UI/Button/button";
import Loading from "../UI/Spinner/LoadingIndicator";
import classes from "./PreGame.module.css";
import { WebSocketContext } from "../../WebSocket";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PREGAME_COUNTDOWN_SECONDS } from "../../shared/constants";
import { useSocketHandlers } from "../../hooks/useSocketHandlers";

interface PreGameProps {
  showPreGame: (show: boolean) => void;
}

interface Opponent {
  id: string;
  side: "X" | "O";
  username: string;
  callback?: () => void;
}

const PreGame: React.FC<PreGameProps> = ({ showPreGame }) => {
  const ws = useContext(WebSocketContext);
  const [time, start] = useTimer(PREGAME_COUNTDOWN_SECONDS);
  const [matched, setMatched] = useState(false);
  const [opponent, setOpponent] = useState<Opponent | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const setOnlinePlayers = useCallback(
    (username: string, opponent: Opponent | null) => {
      if (opponent) {
        dispatch(actions.setOnlinePlayers(username, opponent));
      }
    },
    [dispatch]
  );

  // Use custom hook for socket handlers
  useSocketHandlers({
    onMatched: useCallback((opponentData: unknown) => {
      const opponent = opponentData as Opponent;
      setMatched(true);
      setOpponent(opponent);
      if (opponent.callback) {
        opponent.callback();
      }
    }, []),
  });

  useEffect(() => {
    if (matched) start();
  }, [matched, start]);

  useEffect(() => {
    if (time === 0 && user) {
      showPreGame(false);
      setOnlinePlayers(user.username, opponent);
    }
  }, [setOnlinePlayers, user, showPreGame, opponent, time]);
  
  const toShow = (
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
            onClick={() => {
              if (ws) {
                ws.cancelWaiting();
              }
              showPreGame(false);
            }}
          >
            cancel
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className={classes.container} role="dialog" aria-label="Waiting for opponent" aria-live="polite">
      {toShow}
    </div>
  );
};

export default PreGame;
