import * as actionTypes from "../actions/actionTypes";
import { played, findWinner } from "../../shared/gameLogic";
import { computerPlay } from "../../shared/GameEngine/computer";
import { otherSide } from "../../shared/utility";

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
  username: "Testing t",
  opponentId: null,
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

const play = (state, action) => played(state, action);

const setPlayers = (state, action) => {
  const sideArray = ["X", "O"];
  const random = Math.floor(Math.random() * 2);
  const side1 = sideArray[random];
  const side2 = sideArray[1 - random];
  let players;
  action.number === 2
    ? (players = [
        {
          username: "Player One",
          side: side1,
        },
        {
          username: "Player Two",
          side: side2,
        },
      ])
    : (players = [
        {
          username: "Player One",
          side: side1,
        },
      ]);
  if (players[0].side === "O" && players.length === 1) {
    const boxes = computerPlay("X", initialState.boxes, state.difficulty);
    return { ...initialState, players, gameStarted: true, boxes, toPlay: "O" };
  }

  return { ...initialState, players, gameStarted: true };
};

const setOnlinePlayers = (state, action) => {
  const mySide = otherSide(action.side);
  let players = [
    {
      username: state.username,
      side: mySide,
    },
    {
      username: action.username,
      side: action.side,
    },
  ];
  return { ...initialState, players, gameStarted: true, opponentId: action.id };
};

const setWinner = (state, action) => {
  return { ...state, ...findWinner(state.players, action.side) };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAYED:
      return play(state, action);
    case actionTypes.SET_PLAYERS:
      return setPlayers(state, action);
    case actionTypes.SET_WINNER:
      return setWinner(state, action);
    case actionTypes.SET_ONLINE_PLAYERS:
      return setOnlinePlayers(state, action);
    default:
      return state;
  }
};

export default reducer;
