import { computerPlay, checkAvailable } from "./GameEngine/computer";
import { otherSide as switchToPlay } from "./utility";
import type { Boxes, BoxKey, Player, GameState, PlayedAction } from "../types";

// Optimized win combinations - pre-computed for better performance
const WIN_COMBINATIONS: [BoxKey, BoxKey, BoxKey][] = [
  ["a1", "a2", "a3"], // Row 1
  ["b1", "b2", "b3"], // Row 2
  ["c1", "c2", "c3"], // Row 3
  ["a1", "b1", "c1"], // Column 1
  ["a2", "b2", "c2"], // Column 2
  ["a3", "b3", "c3"], // Column 3
  ["a1", "b2", "c3"], // Diagonal \
  ["a3", "b2", "c1"], // Diagonal /
];

export type WinningCombination = [BoxKey, BoxKey, BoxKey] | null;

/**
 * Optimized win detection that returns both the winner and the winning combination
 * Supports 3x3, 4x4, and 5x5 boards with different win conditions
 * @param boxes - Current game board state
 * @param boardSize - Size of the board (3, 4, or 5)
 * @param winCondition - Number of squares needed to win (3, 4, or 5)
 * @returns Object with winner side and winning combination, or null if no winner
 */
export const checkBoxes = (
  boxes: Boxes,
  boardSize: number = 3,
  winCondition: number = 3
): { side: "X" | "O"; combination: BoxKey[] } | null => {
  // Early exit optimization: check if board has enough moves for a win
  const filledCount = Object.values(boxes).filter((box) => box !== "").length;
  if (filledCount < winCondition * 2 - 1) return null;

  // For 3x3, use pre-computed combinations for performance
  if (boardSize === 3 && winCondition === 3) {
    for (const combination of WIN_COMBINATIONS) {
      const [box1, box2, box3] = combination;
      const val1 = boxes[box1];
      const val2 = boxes[box2];
      const val3 = boxes[box3];

      if (val1 !== "" && val1 === val2 && val2 === val3) {
        return { side: val1 as "X" | "O", combination };
      }
    }
    return null;
  }

  // For 4x4 and 5x5, check dynamically
  return checkWinDynamic(boxes, boardSize, winCondition);
};

/**
 * Dynamic win detection for 4x4 and 5x5 boards
 */
const checkWinDynamic = (
  boxes: Boxes,
  boardSize: number,
  winCondition: number
): { side: "X" | "O"; combination: BoxKey[] } | null => {
  const letters = "abcde";
  
  // Check rows
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col <= boardSize - winCondition; col++) {
      const combination: BoxKey[] = [];
      let firstVal: "X" | "O" | "" = "";
      let allMatch = true;
      
      for (let i = 0; i < winCondition; i++) {
        const key = `${letters[row]}${col + i + 1}` as BoxKey;
        const val = boxes[key as keyof Boxes] as "X" | "O" | "";
        combination.push(key);
        
        if (i === 0) {
          firstVal = val;
        } else if (val !== firstVal || val === "") {
          allMatch = false;
          break;
        }
      }
      
      if (allMatch && firstVal !== "") {
        return { side: firstVal, combination };
      }
    }
  }
  
  // Check columns
  for (let col = 0; col < boardSize; col++) {
    for (let row = 0; row <= boardSize - winCondition; row++) {
      const combination: BoxKey[] = [];
      let firstVal: "X" | "O" | "" = "";
      let allMatch = true;
      
      for (let i = 0; i < winCondition; i++) {
        const key = `${letters[row + i]}${col + 1}` as BoxKey;
        const val = boxes[key as keyof Boxes] as "X" | "O" | "";
        combination.push(key);
        
        if (i === 0) {
          firstVal = val;
        } else if (val !== firstVal || val === "") {
          allMatch = false;
          break;
        }
      }
      
      if (allMatch && firstVal !== "") {
        return { side: firstVal, combination };
      }
    }
  }
  
  // Check diagonals (top-left to bottom-right)
  for (let row = 0; row <= boardSize - winCondition; row++) {
    for (let col = 0; col <= boardSize - winCondition; col++) {
      const combination: BoxKey[] = [];
      let firstVal: "X" | "O" | "" = "";
      let allMatch = true;
      
      for (let i = 0; i < winCondition; i++) {
        const key = `${letters[row + i]}${col + i + 1}` as BoxKey;
        const val = boxes[key as keyof Boxes] as "X" | "O" | "";
        combination.push(key);
        
        if (i === 0) {
          firstVal = val;
        } else if (val !== firstVal || val === "") {
          allMatch = false;
          break;
        }
      }
      
      if (allMatch && firstVal !== "") {
        return { side: firstVal, combination };
      }
    }
  }
  
  // Check diagonals (top-right to bottom-left)
  for (let row = 0; row <= boardSize - winCondition; row++) {
    for (let col = winCondition - 1; col < boardSize; col++) {
      const combination: BoxKey[] = [];
      let firstVal: "X" | "O" | "" = "";
      let allMatch = true;
      
      for (let i = 0; i < winCondition; i++) {
        const key = `${letters[row + i]}${col - i + 1}` as BoxKey;
        const val = boxes[key as keyof Boxes] as "X" | "O" | "";
        combination.push(key);
        
        if (i === 0) {
          firstVal = val;
        } else if (val !== firstVal || val === "") {
          allMatch = false;
          break;
        }
      }
      
      if (allMatch && firstVal !== "") {
        return { side: firstVal, combination };
      }
    }
  }
  
  return null;
};

export const findWinner = (players: Player[], side: "X" | "O"): { winner: Player; gameOver: boolean; gameStarted: boolean } | undefined => {
  for (let i = 0; i < players.length; i++) {
    if (players[i].side === side)
      return { winner: players[i], gameOver: true, gameStarted: false };
  }
  return undefined;
};

interface GameResult {
  gameOver: boolean;
  gameStarted?: boolean;
  draw?: boolean;
  winner?: Player | { username: string };
  boxes?: Boxes;
  toPlay?: "X" | "O";
  winningCombination?: BoxKey[] | null;
}

const checkGameOver = (boxes: Boxes, players: Player[], computer: boolean, boardSize: number = 3, winCondition: number = 3): GameResult => {
  const winResult = checkBoxes(boxes, boardSize, winCondition);
  
  if (winResult) {
    const { side, combination } = winResult;
    
    if (computer) {
      if (side === players[0].side) {
        return {
          winner: players[0],
          gameOver: true,
          gameStarted: false,
          winningCombination: combination,
        };
      } else {
        return {
          winner: { username: "Computer" },
          gameOver: true,
          gameStarted: false,
          winningCombination: combination,
        };
      }
    }
    
    const winnerResult = findWinner(players, side);
    if (winnerResult) {
      return { ...winnerResult, winningCombination: combination };
    }
    // Edge case: winner found but not in players array - still end game
    return {
      gameOver: true,
      gameStarted: false,
      winningCombination: combination,
    };
  }

  // Check for draw - all boxes filled
  const totalBoxes = boardSize * boardSize;
  let filledCount = 0;
  for (let key in boxes) {
    const val = boxes[key as BoxKey];
    if (val !== "") filledCount++;
  }
  
  if (filledCount >= totalBoxes) {
    return { gameOver: true, draw: true, gameStarted: false, winningCombination: null };
  }
  
  return { gameOver: false, winningCombination: null };
};

const playLogic = (
  boxes: Boxes,
  box: BoxKey,
  players: Player[],
  toPlay: "X" | "O",
  computer: boolean,
  boardSize: number = 3,
  winCondition: number = 3
): GameResult | undefined => {
  const totalBoxes = boardSize * boardSize;
  if (
    checkAvailable(boxes).length === totalBoxes &&
    players[0].side === "O" &&
    players.length === 1
  ) {
    return undefined;
  }
  let newBoxes = { ...boxes };
  newBoxes[box] = toPlay;
  const result = checkGameOver(newBoxes, players, computer, boardSize, winCondition);
  const nextSide = switchToPlay(toPlay);

  if (computer && !result.gameOver) {
    const latestboxes = computerPlay(nextSide, newBoxes, boardSize, winCondition);
    const checkResult = checkGameOver(latestboxes, players, computer, boardSize, winCondition);
    const newSide = switchToPlay(nextSide);
    return { ...checkResult, boxes: latestboxes, toPlay: newSide };
  }
  return { ...result, boxes: newBoxes, toPlay: nextSide };
};

export const played = (state: GameState, action: PlayedAction): GameState => {
  if (state.gameOver || !(state.boxes[action.box] === "")) {
    return state;
  }
  const boardSize = state.boardSize || 3;
  const winCondition = state.winCondition || 3;
  
  if (state.players.length === 1) {
    const result = playLogic(
      state.boxes,
      action.box,
      state.players,
      state.toPlay,
      true,
      boardSize,
      winCondition
    );
    if (!result) return state;
    return {
      ...state,
      ...result,
      winningCombination: result.winningCombination ?? null,
    };
  }
  const result = playLogic(
    state.boxes,
    action.box,
    state.players,
    state.toPlay,
    false,
    boardSize,
    winCondition
  );
  if (!result) return state;
  return {
    ...state,
    ...result,
    timeObject: action.timeObject || state.timeObject,
    winningCombination: result.winningCombination ?? null,
  };
};
