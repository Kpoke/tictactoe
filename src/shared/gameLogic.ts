import { computerPlay, checkAvailable } from "./GameEngine/computer";
import { otherSide as switchToPlay } from "./utility";
import { BOARD_SIZE } from "./constants";
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
 * @param boxes - Current game board state
 * @returns Object with winner side and winning combination, or null if no winner
 */
export const checkBoxes = (
  boxes: Boxes
): { side: "X" | "O"; combination: [BoxKey, BoxKey, BoxKey] } | null => {
  // Early exit optimization: check if board has enough moves for a win (at least 5 moves)
  const filledCount = Object.values(boxes).filter((box) => box !== "").length;
  if (filledCount < 5) return null;

  // Check each winning combination
  for (const combination of WIN_COMBINATIONS) {
    const [box1, box2, box3] = combination;
    const val1 = boxes[box1];
    const val2 = boxes[box2];
    const val3 = boxes[box3];

    // Optimized check: all three must be non-empty and equal
    if (val1 !== "" && val1 === val2 && val2 === val3) {
      return { side: val1 as "X" | "O", combination };
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
  winningCombination?: [BoxKey, BoxKey, BoxKey] | null;
}

const checkGameOver = (boxes: Boxes, players: Player[], computer: boolean): GameResult => {
  const winResult = checkBoxes(boxes);
  
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
  for (let key in boxes) {
    if (boxes[key as BoxKey] === "") {
      return { gameOver: false, winningCombination: null };
    }
  }
  return { gameOver: true, draw: true, gameStarted: false, winningCombination: null };
};

const playLogic = (
  boxes: Boxes,
  box: BoxKey,
  players: Player[],
  toPlay: "X" | "O",
  computer: boolean
): GameResult | undefined => {
  if (
    checkAvailable(boxes).length === BOARD_SIZE &&
    players[0].side === "O" &&
    players.length === 1
  ) {
    return undefined;
  }
  let newBoxes = { ...boxes };
  newBoxes[box] = toPlay;
  const result = checkGameOver(newBoxes, players, computer);
  const nextSide = switchToPlay(toPlay);

  if (computer && !result.gameOver) {
    const latestboxes = computerPlay(nextSide, newBoxes);
    const checkResult = checkGameOver(latestboxes, players, computer);
    const newSide = switchToPlay(nextSide);
    return { ...checkResult, boxes: latestboxes, toPlay: newSide };
  }
  return { ...result, boxes: newBoxes, toPlay: nextSide };
};

export const played = (state: GameState, action: PlayedAction): GameState => {
  if (state.gameOver || !(state.boxes[action.box] === "")) {
    return state;
  }
  if (state.players.length === 1) {
    const result = playLogic(
      state.boxes,
      action.box,
      state.players,
      state.toPlay,
      true
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
    false
  );
  if (!result) return state;
  return {
    ...state,
    ...result,
    timeObject: action.timeObject || state.timeObject,
    winningCombination: result.winningCombination ?? null,
  };
};
