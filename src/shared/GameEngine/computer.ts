import { DecisionTree } from "./decisionTree";
import { data } from "./data";
import { otherSide as opponentSide } from "../utility";
import { FIRST_MOVE, SECOND_MOVE, THIRD_MOVE, FIRST_MOVE_O, SECOND_MOVE_O } from "../constants";
import type { Boxes, BoxKey } from "../../types";

const Tree = new DecisionTree(data);

const cornerBoxes: BoxKey[] = ["a1", "a3", "c1", "c3"];
const adjacentBoxes: BoxKey[] = ["a2", "b1", "b3", "c2"];
const keyBoxesArray: [BoxKey, BoxKey, BoxKey][] = [
  ["a2", "b1", "a1"],
  ["a2", "b3", "a3"],
  ["c2", "b1", "c1"],
  ["c2", "b3", "c3"],
  ["a1", "b3", "a3"],
  ["a1", "c2", "c1"],
  ["a3", "c2", "c3"],
  ["a3", "b1", "a1"],
  ["c1", "a2", "a1"],
  ["c1", "b3", "c3"],
  ["c3", "b1", "c1"],
  ["c3", "a2", "a3"],
];
const responseAdjacentBoxes: [BoxKey, BoxKey][] = [
  ["a1", "c3"],
  ["a3", "c1"],
];
const responseCornerBoxes: [BoxKey, BoxKey][] = [
  ["a2", "c2"],
  ["b1", "b3"],
];
const winCombinationArray: [BoxKey, BoxKey, BoxKey][] = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
  ["a1", "b1", "c1"],
  ["a2", "b2", "c2"],
  ["a3", "b3", "c3"],
  ["a1", "b2", "c3"],
  ["a3", "b2", "c1"],
];
const randomIndex = (upperLimit: number): number => Math.floor(Math.random() * upperLimit);

export const checkAvailable = (boxes: Boxes): BoxKey[] => {
  const availableBoxes: BoxKey[] = [];
  for (let key in boxes) {
    if (boxes[key as BoxKey] === "") {
      availableBoxes.push(key as BoxKey);
    }
  }
  return availableBoxes;
};

/**
 * Improved winning boxes detection with better logic
 * @param boxes - Current board state
 * @param toPlay - Current player's side
 * @param prevent - If true, looks for opponent's winning moves to block
 * @returns Box key to play, or null if no immediate win/block
 */
const winningBoxes = (boxes: Boxes, toPlay: "X" | "O", prevent: boolean): BoxKey | null => {
  const otherSide = opponentSide(toPlay);
  const targetSide = prevent ? otherSide : toPlay;
  
  for (const comboArray of winCombinationArray) {
    const values = [
      boxes[comboArray[0]],
      boxes[comboArray[1]],
      boxes[comboArray[2]],
    ];
    
    // Count how many boxes match target side and how many are empty
    let targetCount = 0;
    let emptyIndex = -1;
    
    for (let i = 0; i < 3; i++) {
      if (values[i] === targetSide) {
        targetCount++;
      } else if (values[i] === "") {
        emptyIndex = i;
      } else {
        // Opponent's piece in this combo, skip
        targetCount = -1;
        break;
      }
    }
    
    // If we have 2 of target side and 1 empty, this is a winning/blocking move
    if (targetCount === 2 && emptyIndex !== -1) {
      return comboArray[emptyIndex];
    }
  }
  return null;
};

/**
 * Find moves that create forks (two winning opportunities)
 */
const findForkMove = (boxes: Boxes, toPlay: "X" | "O"): BoxKey | null => {
  const freeBoxes = checkAvailable(boxes);
  const forkMoves: BoxKey[] = [];
  
  for (const box of freeBoxes) {
    // Simulate playing this box
    const testBoxes = { ...boxes };
    testBoxes[box] = toPlay;
    
    // Count how many winning opportunities this creates
    let winOpportunities = 0;
    for (const combo of winCombinationArray) {
      if (combo.includes(box)) {
        const values = [testBoxes[combo[0]], testBoxes[combo[1]], testBoxes[combo[2]]];
        const targetCount = values.filter(v => v === toPlay).length;
        const emptyCount = values.filter(v => v === "").length;
        if (targetCount === 2 && emptyCount === 1) {
          winOpportunities++;
        }
      }
    }
    
    // If this move creates 2+ winning opportunities, it's a fork
    if (winOpportunities >= 2) {
      forkMoves.push(box);
    }
  }
  
  return forkMoves.length > 0 ? forkMoves[randomIndex(forkMoves.length)] : null;
};

/**
 * Block opponent's fork opportunities
 */
const blockOpponentFork = (boxes: Boxes, toPlay: "X" | "O"): BoxKey | null => {
  const otherSide = opponentSide(toPlay);
  return findForkMove(boxes, otherSide);
};

const checkKeyBoxes = (boxes: Boxes, toPlay: "X" | "O"): BoxKey | undefined => {
  const otherSide = opponentSide(toPlay);
  for (const element of keyBoxesArray) {
    const [box1, box2, response] = element;
    if (boxes[box1] === otherSide && boxes[box2] === otherSide) return response;
  }
  for (const element of responseAdjacentBoxes) {
    const [box1, box2] = element;
    if (boxes[box1] === otherSide && boxes[box2] === otherSide)
      return adjacentBoxes[randomIndex(adjacentBoxes.length)];
  }
  for (const element of responseCornerBoxes) {
    const [box1, box2] = element;
    if (boxes[box1] === otherSide && boxes[box2] === otherSide)
      return cornerBoxes[randomIndex(cornerBoxes.length)];
  }

  for (const element of cornerBoxes) {
    if (boxes[element] === otherSide && boxes["b2"] === otherSide)
      return cornerBoxes[randomIndex(cornerBoxes.length)];
  }
  return undefined;
};

const openingO = (boxes: Boxes): BoxKey => {
  return boxes.b2 === "" ? "b2" : cornerBoxes[randomIndex(cornerBoxes.length)];
};

const checkIfBoxAvailable = (box: string, freeBoxes: BoxKey[]): boolean => {
  for (let index of freeBoxes) {
    if (index === box) return true;
  }
  return false;
};

const getPlayedXBoxes = (boxes: Boxes): BoxKey[] => {
  const playedXBoxes: BoxKey[] = [];
  for (let key in boxes) {
    if (boxes[key as BoxKey] === "X") {
      playedXBoxes.push(key as BoxKey);
    }
  }
  return playedXBoxes;
};

const playingAsX = (boxes: Boxes, freeBoxes: BoxKey[]): BoxKey => {
  if (freeBoxes.length === FIRST_MOVE) return freeBoxes[randomIndex(freeBoxes.length)];

  if (freeBoxes.length === SECOND_MOVE) {
    for (let key in boxes) {
      if (boxes[key as BoxKey] === "X") {
        const choice = Tree.getChoice(key);
        if (choice === false) continue;
        const children = choice.children || [];
        const boxChoices = children.map((child) => child.split(" ")[1]);
        const boxToPlay = boxChoices[randomIndex(boxChoices.length)];
        const flag = checkIfBoxAvailable(boxToPlay, freeBoxes);
        if (flag) return boxToPlay as BoxKey;
        const availableToPlay = boxChoices.filter((box) => box !== boxToPlay);
        return (availableToPlay[randomIndex(availableToPlay.length)] || freeBoxes[0]) as BoxKey;
      }
    }
  }

  if (freeBoxes.length === THIRD_MOVE) {
    const playedXBoxes = getPlayedXBoxes(boxes);
    const choice = Tree.getChoice(playedXBoxes.join(" "));
    if (choice === false) return freeBoxes[randomIndex(freeBoxes.length)];
    const nextToPlayBoxes = choice.children || [];
    if (nextToPlayBoxes.length === 1) {
      return checkIfBoxAvailable(nextToPlayBoxes[0], freeBoxes)
        ? (nextToPlayBoxes[0] as BoxKey)
        : freeBoxes[randomIndex(freeBoxes.length)];
    }
    let randomNextToPlayIndex = randomIndex(nextToPlayBoxes.length);

    return checkIfBoxAvailable(
      nextToPlayBoxes[randomNextToPlayIndex],
      freeBoxes
    )
      ? (nextToPlayBoxes[randomNextToPlayIndex] as BoxKey)
      : (nextToPlayBoxes[1 - randomNextToPlayIndex] as BoxKey);
  }

  return freeBoxes[randomIndex(freeBoxes.length)];
};

/**
 * Improved AI with better strategic play
 * Priority: Win > Block > Fork > Block Fork > Center > Corner > Edge
 */
export const computerPlay = (toPlay: "X" | "O", boxes: Boxes): Boxes => {
  const play = (box: BoxKey): Boxes => {
    const newBoxes = { ...boxes };
    newBoxes[box] = toPlay;
    return newBoxes;
  };
  
  const freeBoxes = checkAvailable(boxes);
  if (freeBoxes.length === 1) return play(freeBoxes[0]);

  // 1. Win if possible
  const toWinBox = winningBoxes(boxes, toPlay, false);
  if (toWinBox) return play(toWinBox);

  // 2. Block opponent from winning
  const preventLossBox = winningBoxes(boxes, toPlay, true);
  if (preventLossBox) return play(preventLossBox);

  // 3. Create a fork (two winning opportunities)
  const forkBox = findForkMove(boxes, toPlay);
  if (forkBox) return play(forkBox);

  // 4. Block opponent's fork
  const blockForkBox = blockOpponentFork(boxes, toPlay);
  if (blockForkBox) return play(blockForkBox);

  // 5. Take center if available
  if (boxes.b2 === "") return play("b2");

  // 6. Take opposite corner if opponent is in corner
  const oppositeCorners: [BoxKey, BoxKey][] = [
    ["a1", "c3"],
    ["a3", "c1"],
    ["c1", "a3"],
    ["c3", "a1"],
  ];
  const otherSide = opponentSide(toPlay);
  for (const [corner1, corner2] of oppositeCorners) {
    if (boxes[corner1] === otherSide && boxes[corner2] === "" && freeBoxes.includes(corner2)) {
      return play(corner2);
    }
  }

  // 7. Take any available corner
  const availableCorners = cornerBoxes.filter(box => freeBoxes.includes(box));
  if (availableCorners.length > 0) {
    return play(availableCorners[randomIndex(availableCorners.length)]);
  }

  // 8. Fallback to existing strategy for X
  if (toPlay === "X") return play(playingAsX(boxes, freeBoxes));

  // 9. Fallback to existing strategy for O
  if (freeBoxes.length === FIRST_MOVE_O) return play(openingO(boxes));
  if (freeBoxes.length === SECOND_MOVE_O) {
    const keyBox = checkKeyBoxes(boxes, toPlay);
    if (keyBox) return play(keyBox);
  }

  // 10. Random move as last resort
  return play(freeBoxes[randomIndex(freeBoxes.length)]);
};
