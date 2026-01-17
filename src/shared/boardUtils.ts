import type { Boxes, BoxKey } from "../types";

/**
 * Generate an empty board for a given size
 */
export const createEmptyBoard = (size: number): Boxes => {
  const board: Boxes = {
    a1: "", a2: "", a3: "",
    b1: "", b2: "", b3: "",
    c1: "", c2: "", c3: "",
  };
  
  if (size >= 4) {
    (board as any).a4 = "";
    (board as any).b4 = "";
    (board as any).c4 = "";
    (board as any).d1 = "";
    (board as any).d2 = "";
    (board as any).d3 = "";
    (board as any).d4 = "";
  }
  
  if (size >= 5) {
    (board as any).a5 = "";
    (board as any).b5 = "";
    (board as any).c5 = "";
    (board as any).d5 = "";
    (board as any).e1 = "";
    (board as any).e2 = "";
    (board as any).e3 = "";
    (board as any).e4 = "";
    (board as any).e5 = "";
  }
  
  return board;
};

/**
 * Get all box keys for a given board size
 */
export const getAllBoxKeys = (size: number): BoxKey[] => {
  const keys: BoxKey[] = [];
  const letters = "abcde";
  
  for (let row = 0; row < size; row++) {
    for (let col = 1; col <= size; col++) {
      const key = `${letters[row]}${col}` as BoxKey;
      keys.push(key);
    }
  }
  
  return keys;
};

/**
 * Check if a box key is valid for the given board size
 */
export const isValidBoxKey = (key: BoxKey, size: number): boolean => {
  const row = key.charCodeAt(0) - 97; // a=0, b=1, etc.
  const col = parseInt(key.substring(1));
  
  return row >= 0 && row < size && col >= 1 && col <= size;
};
