import gameReducer from "./game";
import * as actionTypes from "../actions/actionTypes";
import type { GameState } from "../../types";
import { GAME_TIMER_SECONDS } from "../../shared/constants";

describe("gameReducer", () => {
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
      { username: "Player One", side: "X" },
      { username: "Player Two", side: "O" },
    ],
    winner: null,
    toPlay: "X",
    leaders: [],
    error: false,
    loading: false,
    winningCombination: null,
  };

  it("should return initial state for unknown action", () => {
    const result = gameReducer(undefined, { type: "UNKNOWN" as any });
    expect(result).toEqual(initialState);
  });

  it("should handle SET_PLAYERS action for single player", () => {
    const action: { type: typeof actionTypes.SET_PLAYERS; number: number } = {
      type: actionTypes.SET_PLAYERS,
      number: 1,
    };

    const result = gameReducer(initialState, action as any);

    expect(result.gameStarted).toBe(true);
    expect(result.players.length).toBe(1);
    expect(result.players[0].username).toBe("Player One");
  });

  it("should handle SET_PLAYERS action for two players", () => {
    const action: { type: typeof actionTypes.SET_PLAYERS; number: number } = {
      type: actionTypes.SET_PLAYERS,
      number: 2,
    };

    const result = gameReducer(initialState, action as any);

    expect(result.gameStarted).toBe(true);
    expect(result.players.length).toBe(2);
  });

  it("should handle SET_ONLINE_PLAYERS action", () => {
    const action: {
      type: typeof actionTypes.SET_ONLINE_PLAYERS;
      username: string;
      opponentId: string;
      opponentSide: "X" | "O";
      opponentUsername: string;
    } = {
      type: actionTypes.SET_ONLINE_PLAYERS,
      username: "Player1",
      opponentId: "opponent123",
      opponentSide: "X" as const,
      opponentUsername: "Player2",
    };

    const result = gameReducer(initialState, action as any);

    expect(result.gameStarted).toBe(true);
    expect(result.onlineGame).toBe(true);
    expect(result.opponentId).toBe("opponent123");
    expect(result.players.length).toBe(2);
  });

  it("should handle SET_WINNER action", () => {
    const state = { ...initialState, gameStarted: true };
    const action: { type: typeof actionTypes.SET_WINNER; side: "X" | "O" } = {
      type: actionTypes.SET_WINNER,
      side: "X" as const,
    };

    const result = gameReducer(state, action as any);

    expect(result.gameOver).toBe(true);
    expect(result.winner).toBeDefined();
    expect(result.winner?.username).toBe("Player One");
  });

  it("should handle SET_LEADERBOARD action", () => {
    const leaders = [
      { username: "Player1", points: 100 },
      { username: "Player2", points: 50 },
    ];
    const action: { type: typeof actionTypes.SET_LEADERBOARD; leaders: typeof leaders } = {
      type: actionTypes.SET_LEADERBOARD,
      leaders,
    };

    const result = gameReducer(initialState, action as any);

    expect(result.leaders).toEqual(leaders);
    expect(result.error).toBe(false);
    expect(result.loading).toBe(false);
  });

  it("should handle LEADERBOARD_START action", () => {
    const action: { type: typeof actionTypes.LEADERBOARD_START } = {
      type: actionTypes.LEADERBOARD_START,
    };

    const result = gameReducer(initialState, action as any);

    expect(result.loading).toBe(true);
  });

  it("should handle LEADERBOARD_FAILED action", () => {
    const action: { type: typeof actionTypes.LEADERBOARD_FAILED } = {
      type: actionTypes.LEADERBOARD_FAILED,
    };

    const result = gameReducer(initialState, action as any);

    expect(result.loading).toBe(false);
    expect(result.error).toBe(true);
  });
});
