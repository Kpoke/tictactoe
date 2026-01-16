import React, { useCallback, useContext, useState, useMemo, memo } from "react";
import { WebSocketContext } from "../../WebSocket";
import { otherSide, conditionalRender } from "../../shared/utility";
import PreGame from "../PreGame/PreGame";
import Timer from "../Timer/Timer";
import Board from "../Board/Board";
import * as actions from "../../store/actions";
import Button from "../UI/Button/button";
import classes from "./Game.module.css";
import type { BoxKey, TimeObject } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { GAME_TIMER_SECONDS } from "../../shared/constants";
import { useSocketHandlers } from "../../hooks/useSocketHandlers";

interface GameProps {
  callback: (show: boolean) => void;
}

/**
 * Main game component that handles game state, player interactions, and game modes.
 * Supports single player (vs computer), local multiplayer, and online multiplayer.
 * 
 * @param callback - Function to show/hide authentication form when needed
 */
const Game: React.FC<GameProps> = ({ callback }) => {
  const ws = useContext(WebSocketContext);
  const dispatch = useAppDispatch();
  const [showPreGame, setShowPreGame] = useState(false);
  const [localOpponentTime, setLocalOpponentTime] = useState(GAME_TIMER_SECONDS);
  const [localUserTime, setLocalUserTime] = useState(GAME_TIMER_SECONDS);

  const {
    gameOver,
    onlineGame,
    winner,
    draw,
    timeObject,
    players,
    gameStarted,
  } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.auth);

  // Memoize computed values to prevent unnecessary recalculations
  const opponentInfo = useMemo(() => {
    if (players.length === 2) {
      return `${players[1].username} is ${players[1].side}`;
    }
    return `Computer is ${otherSide(players[0]?.side || "X")}`;
  }, [players]);

  const localTimeObject = useMemo(
    () => ({ opponent: localOpponentTime, user: localUserTime }),
    [localOpponentTime, localUserTime]
  );

  const setPlayers = useCallback(
    (number: number) => dispatch(actions.setPlayers(number)),
    [dispatch]
  );

  const played = useCallback(
    (box: BoxKey, timeObject?: TimeObject) => dispatch(actions.played(box, timeObject)),
    [dispatch]
  );

  // Use custom hook for socket handlers
  useSocketHandlers({
    onPlay: useCallback(
      ({ box, timeObject }: { box: BoxKey; timeObject: TimeObject }) => {
        played(box, timeObject);
      },
      [played]
    ),
  });
  
  return (
    <div className={classes.container} role="main" aria-label="Tic Tac Toe Game">
      {showPreGame ? (
        <div className={classes.preGame} role="dialog" aria-label="Pre-game setup">
          <PreGame showPreGame={setShowPreGame} />
        </div>
      ) : null}
      {gameOver ? (
        draw ? (
          <div role="status" aria-live="polite">
            <h6 className={classes.miniHeaders}>Game ended in a draw</h6>
          </div>
        ) : (
          <div role="status" aria-live="polite">
            <h6 className={classes.miniHeaders}>{winner?.username} won</h6>
          </div>
        )
      ) : null}
      {conditionalRender(
        gameStarted,
        <h6 className={classes.miniHeaders} aria-label="Opponent information">
          {opponentInfo}
          {onlineGame && players[1] ? (
            <Timer
              side={players[1].side}
              setTime={setLocalOpponentTime}
              seconds={timeObject.opponent}
            />
          ) : null}
        </h6>
      )}
      <div className={classes.board} role="grid" aria-label="Game board">
        <Board localTimeObject={localTimeObject} />
      </div>
      {conditionalRender(
        gameStarted,
        <h6 className={classes.miniHeaders}>
          {onlineGame && players[0] ? (
            <Timer
              side={players[0].side}
              seconds={timeObject.user}
              setTime={setLocalUserTime}
            />
          ) : null}
          {players[0]?.username}, you're {players[0]?.side}
        </h6>
      )}
      {conditionalRender(
        !gameStarted,
        <div className={classes.buttons}>
          <Button
            btnType="Primary"
            size="Small"
            onClick={() => setPlayers(1)}
            style={{ margin: 10 }}
            aria-label="Start game against computer"
          >
            Play Against Computer?
          </Button>
          <Button
            btnType="Primary"
            size="Small"
            onClick={() => setPlayers(2)}
            style={{ margin: 10 }}
            aria-label="Start local multiplayer game"
          >
            Pass and Play
          </Button>
          <Button
            btnType="Primary"
            size="Small"
            onClick={() => {
              if (ws && user) {
                ws.setPlayers(user, callback, setShowPreGame);
              }
            }}
            style={{ margin: 10 }}
            aria-label="Start online multiplayer game"
          >
            Play online
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(Game);
