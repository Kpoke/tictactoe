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
 * Game board component that renders the grid of boxes dynamically based on board size.
 * Handles click events for both local and online games.
 * 
 * @param localTimeObject - Time tracking object for the current game
 */
const Board: React.FC<BoardProps> = ({ localTimeObject }) => {
  const ws = useContext(WebSocketContext);
  const dispatch = useAppDispatch();
  const { boxes, onlineGame, gameStarted, winningCombination, boardSize } = useAppSelector(
    (state) => state.game
  );
  const played = useCallback(
    (box: BoxKey) => dispatch(actions.played(box)),
    [dispatch]
  );

  const size = boardSize || 3;

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

  // Determine border classes for each box based on position
  const getBoxLocation = (row: number, col: number, size: number): string => {
    const locations: string[] = [];
    if (col < size - 1) locations.push("right");
    if (row < size - 1) locations.push("bottom");
    return locations.join(" ");
  };

  // Render boxes in a grid
  const renderBoxes = () => {
    const rows: JSX.Element[] = [];
    const letters = "abcde";
    
    for (let row = 0; row < size; row++) {
      const boxElements: JSX.Element[] = [];
      for (let col = 0; col < size; col++) {
        const key = `${letters[row]}${col + 1}` as BoxKey;
        const boxValue = boxes[key as keyof typeof boxes] as "X" | "O" | "" | undefined;
        const isWinning = winningCombination?.includes(key);
        const loc = getBoxLocation(row, col, size);
        
        boxElements.push(
          <Box
            key={key}
            loc={loc}
            onClick={() => clickHandler(key)}
            disable={!gameStarted}
            isWinning={isWinning}
            aria-label={`Box ${key}, ${boxValue || "empty"}`}
          >
            {boxValue || ""}
          </Box>
        );
      }
      rows.push(
        <div key={`row-${row}`} className={classes.row}>
          {boxElements}
        </div>
      );
    }
    
    return rows;
  };
    
  return (
    <div 
      className={classes.board} 
      role="grid" 
      aria-label={`Tic Tac Toe board ${size}x${size}`}
      data-size={size}
    >
      {renderBoxes()}
    </div>
  );
};

export default memo(Board);
