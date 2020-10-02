import { computerPlay, checkAvailable } from "./GameEngine/computer";
import { areEqual, otherSide as switchToPlay } from "./utility";

const checkBoxes = (boxes) => {
  const winCombinationArray = [
    [boxes.a1, boxes.a2, boxes.a3],
    [boxes.b1, boxes.b2, boxes.b3],
    [boxes.c1, boxes.c2, boxes.c3],
    [boxes.a1, boxes.b1, boxes.c1],
    [boxes.a2, boxes.b2, boxes.c2],
    [boxes.a3, boxes.b3, boxes.c3],
    [boxes.a1, boxes.b2, boxes.c3],
    [boxes.a3, boxes.b2, boxes.c1],
  ];
  for (let i = 0; i < winCombinationArray.length; i++) {
    const [side, equal] = areEqual(
      winCombinationArray[i][0],
      winCombinationArray[i][1],
      winCombinationArray[i][2]
    );
    if (equal) return side;
  }
  return null;
};

export const findWinner = (players, side) => {
  for (let i = 0; i < players.length; i++) {
    if (players[i].side === side)
      return { winner: players[i], gameOver: true, gameStarted: false };
  }
};

const checkGameOver = (boxes, players, computer) => {
  if (computer) {
    const side = checkBoxes(boxes);
    if (side) {
      if (side === players[0].side) {
        return { winner: players[0], gameOver: true, gameStarted: false };
      } else {
        return {
          winner: { username: "Computer" },
          gameOver: true,
          gameStarted: false,
        };
      }
    }
  }
  const side = checkBoxes(boxes);
  if (side) return findWinner(players, side);

  for (let key in boxes) {
    if (boxes[key] === "") {
      return { gameOver: false };
    }
  }
  return { gameOver: true, draw: true, gameStarted: false };
};

const playLogic = (boxes, box, players, toPlay, computer) => {
  if (
    checkAvailable(boxes).length === 9 &&
    players[0].side === "O" &&
    players.length === 1
  ) {
    return;
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

export const played = (state, action) => {
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
    return { ...state, ...result };
  }
  const result = playLogic(
    state.boxes,
    action.box,
    state.players,
    state.toPlay,
    false
  );
  return { ...state, ...result, timeObject: action.timeObject };
};
