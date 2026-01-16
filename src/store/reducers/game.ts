import * as actionTypes from "../actions/actionTypes";
import { played as playedLogic, findWinner, checkBoxes } from "../../shared/gameLogic";
import { computerPlay } from "../../shared/GameEngine/computer";
import { otherSide } from "../../shared/utility";
import { GAME_TIMER_SECONDS } from "../../shared/constants";
import type { GameState, GameAction, PlayedAction, SetPlayersAction, SetOnlinePlayersAction, SetWinnerAction, SetLeaderboardAction } from "../../types";

const initialState: GameState = {
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
  timeObject: {
    user: GAME_TIMER_SECONDS,
    opponent: GAME_TIMER_SECONDS,
  },
  onlineGame: false,
  username: null,
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
  winningCombination: null,
};

const play = (state: GameState, action: PlayedAction): GameState => playedLogic(state, action);

const setPlayers = (state: GameState, action: SetPlayersAction): GameState => {
  const sideArray: ("X" | "O")[] = ["X", "O"];
  const random = Math.floor(Math.random() * 2);
  const side1 = sideArray[random];
  const side2 = sideArray[1 - random];
  let players;
  if (action.number === 2) {
    players = [
      {
        username: "Player One",
        side: side1,
      },
      {
        username: "Player Two",
        side: side2,
      },
    ];
  } else {
    players = [
      {
        username: "Player One",
        side: side1,
      },
    ];
  }
  
  // For single player mode: alternate who starts
  // If player is O, computer (X) starts first
  // If player is X, player starts first (no computer move needed)
  if (players.length === 1) {
    if (players[0].side === "O") {
      // Computer starts as X
      const boxes = computerPlay("X", initialState.boxes);
      return {
        ...initialState,
        leaders: state.leaders,
        players,
        gameStarted: true,
        boxes,
        toPlay: "O",
      };
    } else {
      // Player starts as X, computer will be O
      return {
        ...initialState,
        leaders: state.leaders,
        players,
        gameStarted: true,
        toPlay: "X",
      };
    }
  }

  return {
    ...initialState,
    leaders: state.leaders,
    players,
    gameStarted: true,
  };
};

const setOnlinePlayers = (state: GameState, action: SetOnlinePlayersAction): GameState => {
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

const setWinner = (state: GameState, action: SetWinnerAction): GameState => {
  const winnerResult = findWinner(state.players, action.side);
  if (winnerResult) {
    // Check for winning combination when setting winner
    const winResult = checkBoxes(state.boxes);
    return {
      ...state,
      ...winnerResult,
      winningCombination: winResult?.combination || null,
    };
  }
  return state;
};

const setLeaderboard = (state: GameState, action: SetLeaderboardAction): GameState => {
  return { ...state, leaders: action.leaders, error: false, loading: false };
};

const leaderboardStart = (state: GameState): GameState => {
  return { ...state, loading: true };
};

const leaderboardFailed = (state: GameState): GameState => {
  return { ...state, loading: false, error: true };
};

const reducer = (state: GameState = initialState, action: GameAction): GameState => {
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
      return leaderboardStart(state);
    case actionTypes.LEADERBOARD_FAILED:
      return leaderboardFailed(state);
    default:
      return state;
  }
};

export default reducer;
