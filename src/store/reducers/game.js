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
  onlineGame: false,
  username: "Testing t",
  opponentId: null,
  gameOver: false,
  gameStarted: false,
  won: null,
  draw: false,
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
  leaders: [],
  error: false,
  loading: false,
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
    const boxes = computerPlay("X", initialState.boxes);
    return {
      ...initialState,
      leaders: state.leaders,
      players,
      gameStarted: true,
      boxes,
      toPlay: "O",
    };
  }

  return {
    ...initialState,
    leaders: state.leaders,
    players,
    gameStarted: true,
  };
};

const setOnlinePlayers = (state, action) => {
  const mySide = otherSide(action.opponentSide);
  let players = [
    {
      username: action.username,
      side: mySide,
    },
    {
      username: action.opponentUsername,
      side: action.opponentSide,
    },
  ];
  return {
    ...initialState,
    players,
    leaders: state.leaders,
    gameStarted: true,
    onlineGame: true,
    opponentId: action.opponentId,
  };
};

const setWinner = (state, action) => {
  return { ...state, ...findWinner(state.players, action.side) };
};

const setLeaderboard = (state, action) => {
  return { ...state, leaders: action.leaders, error: false, loading: false };
};

const leaderboardStart = (state, action) => {
  return { ...state, loading: true };
};

const leaderboardFailed = (state, action) => {
  return { ...state, loading: false, error: true };
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
    case actionTypes.SET_LEADERBOARD:
      return setLeaderboard(state, action);
    case actionTypes.LEADERBOARD_START:
      return leaderboardStart(state, action);
    case actionTypes.LEADERBOARD_FAILED:
      return leaderboardFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
