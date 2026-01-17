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
  
  return (
    <>
      <div className={classes.overlay} onClick={() => {
        if (ws && !matched) {
          ws.cancelWaiting();
        }
        showPreGame(false);
      }} />
      <div className={classes.container} role="dialog" aria-label="Waiting for opponent" aria-live="polite">
        <div className={classes.header}>
          <h2 className={classes.headerTitle}>
            {matched ? "Match Found!" : "Finding Opponent"}
          </h2>
          <p className={classes.headerSubtitle}>
            {matched ? "Get ready to play" : "Waiting for another player to join"}
          </p>
        </div>

        <div className={classes.content}>
          {matched ? (
            <div className={classes.matchedContainer}>
              <div className={classes.opponentCard}>
                <p className={classes.opponentFound}>Your Opponent</p>
                <p className={classes.opponentName}>{opponent?.username}</p>
                {opponent?.side && (
                  <span className={`${classes.opponentSide} ${opponent.side === "X" ? classes.opponentSideX : classes.opponentSideO}`}>
                    Playing as {opponent.side}
                  </span>
                )}
              </div>
              <div className={classes.countdownContainer}>
                <p className={classes.countdownLabel}>Game starts in</p>
                <p className={classes.countdownNumber}>{time}</p>
              </div>
            </div>
          ) : (
            <div className={classes.searchingContainer}>
              <div className={classes.spinnerWrapper}>
                <Loading />
              </div>
              <div>
                <p className={classes.searchingText}>Searching for Opponents</p>
                <p className={classes.searchingSubtext}>This may take a few moments...</p>
              </div>
              <Button
                btnType="Danger"
                size="Small"
                onClick={() => {
                  if (ws) {
                    ws.cancelWaiting();
                  }
                  showPreGame(false);
                }}
                className={classes.cancelButton}
              >
                <span>Cancel Search</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PreGame;
