import * as actionTypes from "../actions/actionTypes";
import { played } from "../../shared/gameLogic";

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
  won: null,
  draw: false,
  difficulty: "hard",
  players: [
    {
      username: "Player One",
      side: "X",
    },
    {
      username: "Player Two",
      side: "O",
    },
  ],
  winner: null,
  toPlay: "X",
};

const playedX = (state, action) => played(state, action, "X");

const playedO = (state, action) => played(state, action, "O");

const reset = (state, action) => {
  return {
    ...initialState,
  };
};

//for now just toggling
const setPlayers = (state, action) => {
  let players;
  state.players.length === 1
    ? (players = [
        {
          username: "Player One",
          side: "X",
        },
        {
          username: "Player Two",
          side: "O",
        },
      ])
    : (players = [
        {
          username: "Player One",
          side: "X",
        },
      ]);
  return { ...state, players, gameStarted: true };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAYED_X:
      return playedX(state, action);
    case actionTypes.PLAYED_O:
      return playedO(state, action);
    case actionTypes.RESET:
      return reset(state, action);
    case actionTypes.SET_PLAYERS:
      return setPlayers(state, action);
    default:
      return state;
  }
};

export default reducer;
