import type { Boxes, BoxKey } from "../../types";
import { otherSide as opponentSide } from "../utility";

/**
 * Minimax algorithm for optimal AI play
 * This makes the AI much harder to beat
 */
interface MinimaxResult {
  score: number;
  move: BoxKey | null;
}

/**
 * Evaluate the board state for minimax
 * Returns positive score for AI win, negative for player win, 0 for draw
 */
const evaluate = (
  boxes: Boxes,
  boardSize: number,
  winCondition: number,
  aiSide: "X" | "O",
  playerSide: "X" | "O"
): number => {
  // Check for wins
  const aiWin = checkWin(boxes, boardSize, winCondition, aiSide);
  const playerWin = checkWin(boxes, boardSize, winCondition, playerSide);
  
  if (aiWin) return 1000;
  if (playerWin) return -1000;
  
  // Heuristic: count potential winning lines
  const aiLines = countWinningLines(boxes, boardSize, winCondition, aiSide);
  const playerLines = countWinningLines(boxes, boardSize, winCondition, playerSide);
  
  return aiLines - playerLines;
};

/**
 * Check if a player has won
 */
const checkWin = (
  boxes: Boxes,
  boardSize: number,
  winCondition: number,
  side: "X" | "O"
): boolean => {
  const rows = boardSize;
  const cols = boardSize;
  
  // Check rows
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - winCondition; col++) {
      let count = 0;
      for (let i = 0; i < winCondition; i++) {
        const key = getBoxKey(row, col + i, boardSize);
        const val = boxes[key as keyof Boxes] as "X" | "O" | "";
        if (val === side) count++;
      }
      if (count === winCondition) return true;
    }
  }
  
  // Check columns
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row <= rows - winCondition; row++) {
      let count = 0;
      for (let i = 0; i < winCondition; i++) {
        const key = getBoxKey(row + i, col, boardSize);
        const val = boxes[key as keyof Boxes] as "X" | "O" | "";
        if (val === side) count++;
      }
      if (count === winCondition) return true;
    }
  }
  
  // Check diagonals (top-left to bottom-right)
  for (let row = 0; row <= rows - winCondition; row++) {
    for (let col = 0; col <= cols - winCondition; col++) {
      let count = 0;
      for (let i = 0; i < winCondition; i++) {
        const key = getBoxKey(row + i, col + i, boardSize);
        const val = boxes[key as keyof Boxes] as "X" | "O" | "";
        if (val === side) count++;
      }
      if (count === winCondition) return true;
    }
  }
  
  // Check diagonals (top-right to bottom-left)
  for (let row = 0; row <= rows - winCondition; row++) {
    for (let col = winCondition - 1; col < cols; col++) {
      let count = 0;
      for (let i = 0; i < winCondition; i++) {
        const key = getBoxKey(row + i, col - i, boardSize);
        const val = boxes[key as keyof Boxes] as "X" | "O" | "";
        if (val === side) count++;
      }
      if (count === winCondition) return true;
    }
  }
  
  return false;
};

/**
 * Count potential winning lines for a player
 */
const countWinningLines = (
  boxes: Boxes,
  boardSize: number,
  winCondition: number,
  side: "X" | "O"
): number => {
  let count = 0;
  const rows = boardSize;
  const cols = boardSize;
  
  // Check rows
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - winCondition; col++) {
      let sideCount = 0;
      let emptyCount = 0;
      for (let i = 0; i < winCondition; i++) {
        const key = getBoxKey(row, col + i, boardSize);
        const value = boxes[key as keyof Boxes] as "X" | "O" | "";
        if (value === side) sideCount++;
        else if (value === "") emptyCount++;
      }
      if (sideCount > 0 && sideCount + emptyCount === winCondition) count += sideCount;
    }
  }
  
  // Check columns
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row <= rows - winCondition; row++) {
      let sideCount = 0;
      let emptyCount = 0;
      for (let i = 0; i < winCondition; i++) {
        const key = getBoxKey(row + i, col, boardSize);
        const value = boxes[key as keyof Boxes] as "X" | "O" | "";
        if (value === side) sideCount++;
        else if (value === "") emptyCount++;
      }
      if (sideCount > 0 && sideCount + emptyCount === winCondition) count += sideCount;
    }
  }
  
  // Check diagonals
  for (let row = 0; row <= rows - winCondition; row++) {
    for (let col = 0; col <= cols - winCondition; col++) {
      let sideCount = 0;
      let emptyCount = 0;
      for (let i = 0; i < winCondition; i++) {
        const key = getBoxKey(row + i, col + i, boardSize);
        const value = boxes[key as keyof Boxes] as "X" | "O" | "";
        if (value === side) sideCount++;
        else if (value === "") emptyCount++;
      }
      if (sideCount > 0 && sideCount + emptyCount === winCondition) count += sideCount;
    }
  }
  
  for (let row = 0; row <= rows - winCondition; row++) {
    for (let col = winCondition - 1; col < cols; col++) {
      let sideCount = 0;
      let emptyCount = 0;
      for (let i = 0; i < winCondition; i++) {
        const key = getBoxKey(row + i, col - i, boardSize);
        const value = boxes[key as keyof Boxes] as "X" | "O" | "";
        if (value === side) sideCount++;
        else if (value === "") emptyCount++;
      }
      if (sideCount > 0 && sideCount + emptyCount === winCondition) count += sideCount;
    }
  }
  
  return count;
};

/**
 * Get box key from row/col coordinates
 * For 3x3: a1-a3, b1-b3, c1-c3
 * For 4x4: a1-a4, b1-b4, c1-c4, d1-d4
 * For 5x5: a1-a5, b1-b5, c1-c5, d1-d5, e1-e5
 */
const getBoxKey = (row: number, col: number, boardSize: number): string => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
    return `${letters[row]}${col + 1}`;
  }
  return "";
};

/**
 * Get available moves
 */
const getAvailableMoves = (boxes: Boxes, boardSize: number): BoxKey[] => {
  const moves: BoxKey[] = [];
  const letters = "abcde";
  
  for (let row = 0; row < boardSize; row++) {
    for (let col = 1; col <= boardSize; col++) {
      const key = `${letters[row]}${col}` as BoxKey;
      const val = boxes[key as keyof Boxes] as "X" | "O" | "";
      if (val === "" || val === undefined) {
        moves.push(key);
      }
    }
  }
  
  return moves;
};

/**
 * Minimax algorithm with alpha-beta pruning
 */
const minimax = (
  boxes: Boxes,
  boardSize: number,
  winCondition: number,
  depth: number,
  isMaximizing: boolean,
  aiSide: "X" | "O",
  playerSide: "X" | "O",
  alpha: number,
  beta: number,
  maxDepth: number
): MinimaxResult => {
  const aiWin = checkWin(boxes, boardSize, winCondition, aiSide);
  const playerWin = checkWin(boxes, boardSize, winCondition, playerSide);
  const availableMoves = getAvailableMoves(boxes, boardSize);
  
  // Terminal conditions
  if (aiWin) return { score: 1000 - depth, move: null };
  if (playerWin) return { score: -1000 + depth, move: null };
  if (availableMoves.length === 0 || depth >= maxDepth) {
    return { score: evaluate(boxes, boardSize, winCondition, aiSide, playerSide), move: null };
  }
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove: BoxKey | null = null;
    
    for (const move of availableMoves) {
      const newBoxes = { ...boxes };
      (newBoxes as any)[move] = aiSide;
      const result = minimax(newBoxes, boardSize, winCondition, depth + 1, false, aiSide, playerSide, alpha, beta, maxDepth);
      
      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    
    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove: BoxKey | null = null;
    
    for (const move of availableMoves) {
      const newBoxes = { ...boxes };
      (newBoxes as any)[move] = playerSide;
      const result = minimax(newBoxes, boardSize, winCondition, depth + 1, true, aiSide, playerSide, alpha, beta, maxDepth);
      
      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    
    return { score: bestScore, move: bestMove };
  }
};

/**
 * Get the best move using minimax
 */
export const getBestMove = (
  boxes: Boxes,
  boardSize: number,
  winCondition: number,
  aiSide: "X" | "O"
): BoxKey | null => {
  const playerSide = opponentSide(aiSide);
  const availableMoves = getAvailableMoves(boxes, boardSize);
  
  if (availableMoves.length === 0) return null;
  
  // Adjust max depth based on board size for performance
  let maxDepth = 9; // For 3x3, can search deeper
  if (boardSize === 4) maxDepth = 4;
  if (boardSize === 5) maxDepth = 3;
  
  const result = minimax(
    boxes,
    boardSize,
    winCondition,
    0,
    true,
    aiSide,
    playerSide,
    -Infinity,
    Infinity,
    maxDepth
  );
  
  return result.move;
};
