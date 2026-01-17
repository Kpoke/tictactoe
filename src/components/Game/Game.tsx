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
import { isOnlineMultiplayerEnabled, isAuthEnabled } from "../../utils/featureFlags";

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
  
  // Only show auth form if auth is enabled
  const handleShowAuthForm = useCallback((show: boolean) => {
    if (isAuthEnabled()) {
      callback(show);
    }
  }, [callback]);
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
    boardSize,
  } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.auth);
  
  const [selectedBoardSize, setSelectedBoardSize] = useState<number>(boardSize || 3);

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

  const setBoardSizeAction = useCallback(
    (size: number) => {
      dispatch(actions.setBoardSize(size, size)); // winCondition = boardSize
      setSelectedBoardSize(size);
    },
    [dispatch]
  );

  const setPlayers = useCallback(
    (number: number) => {
      const size = selectedBoardSize || boardSize || 3;
      dispatch(actions.setPlayers(number, size));
    },
    [dispatch, selectedBoardSize, boardSize]
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
    <>
      {showPreGame && isOnlineMultiplayerEnabled() ? <PreGame showPreGame={setShowPreGame} /> : null}
      <div className={classes.contentContainer} role="main" aria-label="Tic Tac Toe Game">
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
      </div>
      {conditionalRender(
        !gameStarted,
        <>
          <div className={classes.boardSizeSelector}>
            <p className={classes.boardSizeLabel}>Select Board Size:</p>
            <div className={classes.boardSizeButtons}>
              <Button
                btnType="Primary"
                size="Small"
                onClick={() => setBoardSizeAction(3)}
                className={selectedBoardSize === 3 ? classes.selectedSize : ""}
                aria-label="3x3 board (3 in a row to win)"
              >
                3×3
              </Button>
              <Button
                btnType="Primary"
                size="Small"
                onClick={() => setBoardSizeAction(4)}
                className={selectedBoardSize === 4 ? classes.selectedSize : ""}
                aria-label="4x4 board (4 in a row to win)"
              >
                4×4
              </Button>
              <Button
                btnType="Primary"
                size="Small"
                onClick={() => setBoardSizeAction(5)}
                className={selectedBoardSize === 5 ? classes.selectedSize : ""}
                aria-label="5x5 board (5 in a row to win)"
              >
                5×5
              </Button>
            </div>
          </div>
          <div className={classes.buttons}>
            <Button
              btnType="Primary"
              size="Small"
              onClick={() => setPlayers(1)}
              aria-label="Start game against computer"
            >
              Play Against Computer?
            </Button>
            <Button
              btnType="Primary"
              size="Small"
              onClick={() => setPlayers(2)}
              aria-label="Start local multiplayer game"
            >
              Pass and Play
            </Button>
            {isOnlineMultiplayerEnabled() && (
              <Button
                btnType="Primary"
                size="Small"
                onClick={() => {
                  if (ws) {
                    // Pass user if available, otherwise pass null - setPlayers will handle auth check
                    ws.setPlayers(user || { username: "" }, handleShowAuthForm, setShowPreGame);
                  }
                }}
                aria-label="Start online multiplayer game"
              >
                Play online
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default memo(Game);
