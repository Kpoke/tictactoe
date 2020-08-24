import * as actionTypes from "../actions/actionTypes";

function areEqual() {
  let len = arguments.length;
  for (let i = 1; i < len; i++) {
    if (arguments[i] === "" || arguments[i] !== arguments[i - 1]) {
      return false;
    }
  }
  return true;
}

const played = (state, action, value) => {
  if (state.gameOver) {
    return state;
  }
  let newBoxes = { ...state.boxes };
  newBoxes[action.box] = value;
  const gameOver = checkGameOver(newBoxes);
  return { ...state, boxes: newBoxes, gameOver };
};

const initialState = {
  boxes: {
    a1: "",
    a2: "",
    a3: "",
    b1: "",
    b2: "",
    b3: "",
    c1: "",
    c2: "",
    c3: "",
  },
  gameOver: false,
  gameStarted: false,
};

const checkGameOver = (boxes) => {
  if (
    areEqual(boxes.a1, boxes.a2, boxes.a3) ||
    areEqual(boxes.b1, boxes.b2, boxes.b3) ||
    areEqual(boxes.c1, boxes.c2, boxes.c3) ||
    areEqual(boxes.a1, boxes.b1, boxes.c1) ||
    areEqual(boxes.a2, boxes.b2, boxes.c2) ||
    areEqual(boxes.a3, boxes.b3, boxes.c3) ||
    areEqual(boxes.a1, boxes.b2, boxes.c3) ||
    areEqual(boxes.a3, boxes.b2, boxes.c1)
  ) {
    return true;
  }

  for (let key in boxes) {
    if (boxes[key] === "") {
      return false;
    }
  }
  return true;
};

const playedX = (state, action) => played(state, action, "X");

const playedO = (state, action) => played(state, action, "O");

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAYED_X:
      return playedX(state, action);
    case actionTypes.PLAYED_O:
      return playedO(state, action);
    default:
      return state;
  }
};

export default reducer;
