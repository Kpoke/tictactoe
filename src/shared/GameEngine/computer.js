import { DecisionTree } from "./decisionTree";
import { data } from "./data";

const Tree = new DecisionTree(data);

const cornerBoxes = ["a1", "a3", "c1", "c3"];
const adjacentBoxes = ["a2", "b1", "b3", "c2"];
const keyBoxesArray = [
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
const responseAdjacentBoxes = [
  ["a1", "c3"],
  ["a3", "c1"],
];
const responseCornerBoxes = [
  ["a2", "c2"],
  ["b1", "b3"],
];
const winCombinationArray = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
  ["a1", "b1", "c1"],
  ["a2", "b2", "c2"],
  ["a3", "b3", "c3"],
  ["a1", "b2", "c3"],
  ["a3", "b2", "c1"],
];
const randomIndex = (upperLimit) => Math.floor(Math.random() * upperLimit);

export const checkAvailable = (boxes) => {
  const availableBoxes = [];
  for (let key in boxes) {
    if (boxes[key] === "") {
      availableBoxes.push(key);
    }
  }
  return availableBoxes;
};

const winningBoxes = (boxes, toPlay, prevent) => {
  const otherSide = toPlay === "X" ? "O" : "X";
  for (let i = 0; i < winCombinationArray.length; i++) {
    const comboArray = winCombinationArray[i];
    const values = [
      boxes[comboArray[0]],
      boxes[comboArray[1]],
      boxes[comboArray[2]],
    ];
    const check = prevent
      ? values[0] === toPlay || values[1] === toPlay || values[2] === toPlay
      : values[0] === otherSide ||
        values[1] === otherSide ||
        values[2] === otherSide;
    if (check) continue;
    const empty = values.reduce((result, value, i) => {
      if (value === "") result.push(i);
      return result;
    }, []);
    if (empty.length === 1) {
      return comboArray[empty[0]];
    }
  }
  return null;
};

const checkKeyBoxes = (boxes, toPlay) => {
  const otherSide = toPlay === "X" ? "O" : "X";
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
};

const openingO = (boxes, difficulty, freeBoxes) => {
  return difficulty === "easy"
    ? freeBoxes[randomIndex(freeBoxes.length)]
    : boxes.b2 === ""
    ? "b2"
    : cornerBoxes[randomIndex(cornerBoxes.length)];
};

const checkIfBoxAvailable = (box, freeBoxes) => {
  for (let index of freeBoxes) {
    if (index === box) return true;
  }
  return false;
};

const getPlayedXBoxes = (boxes) => {
  const playedXBoxes = [];
  for (let key in boxes) {
    if (boxes[key] === "X") {
      playedXBoxes.push(key);
    }
  }
  return playedXBoxes;
};

const playingAsX = (boxes, freeBoxes, difficulty) => {
  if (freeBoxes.length === 9 || difficulty === "easy")
    return freeBoxes[randomIndex(freeBoxes.length)];

  if (freeBoxes.length === 7) {
    for (let key in boxes) {
      if (boxes[key] === "X") {
        const children = Tree.getChoice(key).children;
        const boxes = children.map((child) => child.split(" ")[1]);
        const boxToPlay = boxes[randomIndex(boxes.length)];
        const flag = checkIfBoxAvailable(boxToPlay, freeBoxes);
        if (flag) return boxToPlay;
        const availableToPlay = boxes.filter((box) => box !== boxToPlay);
        return availableToPlay[randomIndex(availableToPlay.length)];
      }
    }
  }

  if (freeBoxes.length === 5) {
    const playedXBoxes = getPlayedXBoxes(boxes);
    const nextToPlayBoxes = Tree.getChoice(playedXBoxes.join(" ")).children;
    if (nextToPlayBoxes.length === 1) {
      return checkIfBoxAvailable(nextToPlayBoxes[0], freeBoxes)
        ? nextToPlayBoxes[0]
        : freeBoxes[randomIndex(freeBoxes.length)];
    }
    let randomNextToPlayIndex = randomIndex(nextToPlayBoxes.length);

    return checkIfBoxAvailable(
      nextToPlayBoxes[randomNextToPlayIndex],
      freeBoxes
    )
      ? nextToPlayBoxes[randomNextToPlayIndex]
      : nextToPlayBoxes[1 - randomNextToPlayIndex];
  }

  return freeBoxes[randomIndex(freeBoxes.length)];
};

export const computerPlay = (toPlay, boxes, difficulty) => {
  const play = (box) => {
    const newBoxes = { ...boxes };
    newBoxes[box] = toPlay;
    return newBoxes;
  };
  const freeBoxes = checkAvailable(boxes);
  if (freeBoxes.length === 1) return play(freeBoxes[0]);

  const toWinBox = winningBoxes(boxes, toPlay, false);
  if (toWinBox) return play(toWinBox);

  const preventLossBox = winningBoxes(boxes, toPlay, true);
  if (preventLossBox) return play(preventLossBox);

  if (toPlay === "X") return play(playingAsX(boxes, freeBoxes, difficulty));

  if (freeBoxes.length === 8)
    return play(openingO(boxes, difficulty, freeBoxes));

  if (freeBoxes.length === 6 && difficulty === "hard") {
    const keyBox = checkKeyBoxes(boxes, toPlay);
    if (keyBox) {
      return play(keyBox);
    }
  }
  return play(freeBoxes[randomIndex(freeBoxes.length)]);
};
