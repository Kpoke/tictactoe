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
const randomIndex = Math.floor(Math.random() * 4);

const checkAvailable = (boxes) => {
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
      return adjacentBoxes[randomIndex];
  }
  for (const element of responseCornerBoxes) {
    const [box1, box2] = element;
    if (boxes[box1] === otherSide && boxes[box2] === otherSide)
      return cornerBoxes[randomIndex];
  }
};

const openingO = (boxes, difficulty, freeBoxes) => {
  return difficulty === "easy"
    ? freeBoxes[Math.floor(Math.random() * freeBoxes.length)]
    : boxes.b2 === ""
    ? "b2"
    : cornerBoxes[randomIndex];
};

export const computerPlay = (toPlay, boxes, difficulty) => {
  const play = (box) => {
    const newBoxes = { ...boxes };
    newBoxes[box] = toPlay;
    return newBoxes;
  };
  const freeBoxes = checkAvailable(boxes);
  if (freeBoxes.length === 1) return play(freeBoxes[0]);

  if (freeBoxes.length === 8)
    return play(openingO(boxes, difficulty, freeBoxes));

  const toWinBox = winningBoxes(boxes, toPlay, false);
  if (toWinBox) return play(toWinBox);

  const preventLossBox = winningBoxes(boxes, toPlay, true);
  if (preventLossBox) return play(preventLossBox);

  if (freeBoxes.length === 6 && difficulty === "hard") {
    console.log(difficulty);
    const keyBox = checkKeyBoxes(boxes, toPlay);
    if (keyBox) {
      return play(keyBox);
    }
  }
  return play(freeBoxes[0]);
};
