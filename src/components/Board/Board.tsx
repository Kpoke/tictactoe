import React, { useCallback, useContext, memo } from "react";
import { WebSocketContext } from "../../WebSocket";
import * as actions from "../../store/actions";
import Box from "../Box/Box";
import classes from "./Board.module.css";
import type { BoxKey, TimeObject } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface BoardProps {
  localTimeObject: TimeObject;
}

/**
 * Game board component that renders the 3x3 grid of boxes.
 * Handles click events for both local and online games.
 * 
 * @param localTimeObject - Time tracking object for the current game
 */
const Board: React.FC<BoardProps> = ({ localTimeObject }) => {
  const ws = useContext(WebSocketContext);
  const dispatch = useAppDispatch();
  const { boxes, onlineGame, gameStarted, winningCombination } = useAppSelector(
    (state) => state.game
  );
  const played = useCallback(
    (box: BoxKey) => dispatch(actions.played(box)),
    [dispatch]
  );

  // Memoize click handler to prevent unnecessary re-renders
  const clickHandler = useCallback(
    (location: BoxKey) => {
      if (onlineGame && ws) {
        ws.play(location, localTimeObject);
      } else {
        played(location);
      }
    },
    [onlineGame, ws, localTimeObject, played]
  );

  // Determine winning line class based on combination
  const getWinningLineClass = (): string => {
    if (!winningCombination) return "";
    
    const [box1, box2, box3] = winningCombination;
    const combo = [box1, box2, box3].sort().join("-");
    
    // Map combinations to CSS classes
    const lineMap: Record<string, string> = {
      "a1-a2-a3": classes.winRow1,
      "b1-b2-b3": classes.winRow2,
      "c1-c2-c3": classes.winRow3,
      "a1-b1-c1": classes.winCol1,
      "a2-b2-c2": classes.winCol2,
      "a3-b3-c3": classes.winCol3,
      "a1-b2-c3": classes.winDiag1,
      "a3-b2-c1": classes.winDiag2,
    };
    
    return lineMap[combo] || "";
  };
    
  return (
    <div className={classes.board} role="grid" aria-label="Tic Tac Toe board">
      {winningCombination && (
        <div className={`${classes.winningLine} ${getWinningLineClass()}`} aria-hidden="true" />
      )}
      <div className={classes.row}>
        <Box
          loc="right bottom"
          onClick={() => clickHandler("a1")}
          disable={!gameStarted}
          isWinning={winningCombination?.includes("a1")}
          aria-label={`Box a1, ${boxes.a1 || "empty"}`}
        >
          {boxes.a1}
        </Box>
        <Box
          loc="right bottom"
          onClick={() => clickHandler("a2")}
          disable={!gameStarted}
          isWinning={winningCombination?.includes("a2")}
          aria-label={`Box a2, ${boxes.a2 || "empty"}`}
        >
          {boxes.a2}
        </Box>
        <Box
          loc="bottom"
          onClick={() => clickHandler("a3")}
          disable={!gameStarted}
          isWinning={winningCombination?.includes("a3")}
          aria-label={`Box a3, ${boxes.a3 || "empty"}`}
        >
          {boxes.a3}
        </Box>
      </div>
      <div className={classes.row}>
        <Box
          loc="right bottom"
          onClick={() => clickHandler("b1")}
          disable={!gameStarted}
          isWinning={winningCombination?.includes("b1")}
          aria-label={`Box b1, ${boxes.b1 || "empty"}`}
        >
          {boxes.b1}
        </Box>
        <Box
          loc="right bottom"
          onClick={() => clickHandler("b2")}
          disable={!gameStarted}
          isWinning={winningCombination?.includes("b2")}
          aria-label={`Box b2, ${boxes.b2 || "empty"}`}
        >
          {boxes.b2}
        </Box>
        <Box
          loc="bottom"
          onClick={() => clickHandler("b3")}
          disable={!gameStarted}
          isWinning={winningCombination?.includes("b3")}
          aria-label={`Box b3, ${boxes.b3 || "empty"}`}
        >
          {boxes.b3}
        </Box>
      </div>
      <div className={classes.row}>
        <Box
          loc="right"
          onClick={() => clickHandler("c1")}
          disable={!gameStarted}
          isWinning={winningCombination?.includes("c1")}
          aria-label={`Box c1, ${boxes.c1 || "empty"}`}
        >
          {boxes.c1}
        </Box>
        <Box
          loc="right"
          onClick={() => clickHandler("c2")}
          disable={!gameStarted}
          isWinning={winningCombination?.includes("c2")}
          aria-label={`Box c2, ${boxes.c2 || "empty"}`}
        >
          {boxes.c2}
        </Box>
        <Box
          onClick={() => clickHandler("c3")}
          disable={!gameStarted}
          isWinning={winningCombination?.includes("c3")}
          aria-label={`Box c3, ${boxes.c3 || "empty"}`}
        >
          {boxes.c3}
        </Box>
      </div>
    </div>
  );
};

export default memo(Board);
