import { findWinner, played } from "./gameLogic";
import type { GameState, Player, Boxes } from "../types";
import { GAME_TIMER_SECONDS } from "./constants";

describe("gameLogic", () => {
  describe("findWinner", () => {
    it("should find the winner when player has winning side", () => {
      const players: Player[] = [
        { username: "Player One", side: "X" },
        { username: "Player Two", side: "O" },
      ];

      const result = findWinner(players, "X");

      expect(result).toEqual({
        winner: players[0],
        gameOver: true,
        gameStarted: false,
      });
    });

    it("should return undefined when no player has the winning side", () => {
      const players: Player[] = [
        { username: "Player One", side: "X" },
        { username: "Player Two", side: "O" },
      ];

      const result = findWinner(players, "X");

      expect(result).toBeDefined();
      expect(result?.winner.side).toBe("X");
    });
  });

  describe("played", () => {
    const createInitialState = (): GameState => ({
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
      gameStarted: true,
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
    });

    it("should not play if game is over", () => {
      const state = createInitialState();
      state.gameOver = true;

      const result = played(state, { type: "PLAYED" as const, box: "a1" });

      expect(result).toBe(state);
      expect(result.boxes.a1).toBe("");
    });

    it("should not play if box is already occupied", () => {
      const state = createInitialState();
      state.boxes.a1 = "X";

      const result = played(state, { type: "PLAYED" as const, box: "a1" });

      expect(result).toBe(state);
    });

    it("should place X in the box when it's X's turn", () => {
      const state = createInitialState();

      const result = played(state, { type: "PLAYED" as const, box: "a1" });

      expect(result.boxes.a1).toBe("X");
      expect(result.toPlay).toBe("O");
    });

    it("should detect a horizontal win", () => {
      const state = createInitialState();
      state.boxes.a1 = "X";
      state.boxes.a2 = "X";
      state.toPlay = "X";

      const result = played(state, { type: "PLAYED" as const, box: "a3" } as any);

      expect(result.gameOver).toBe(true);
      expect(result.winner).toBeDefined();
      expect(result.winner?.username).toBe("Player One");
    });

    it("should detect a vertical win", () => {
      const state = createInitialState();
      state.boxes.a1 = "O";
      state.boxes.b1 = "O";
      state.toPlay = "O";

      const result = played(state, { type: "PLAYED" as const, box: "c1" } as any);

      expect(result.gameOver).toBe(true);
      expect(result.winner).toBeDefined();
      expect(result.winner?.username).toBe("Player Two");
    });

    it("should detect a diagonal win", () => {
      const state = createInitialState();
      state.boxes.a1 = "X";
      state.boxes.b2 = "X";
      state.toPlay = "X";

      const result = played(state, { type: "PLAYED" as const, box: "c3" } as any);

      expect(result.gameOver).toBe(true);
      expect(result.winner).toBeDefined();
    });

    it("should detect a draw when all boxes are filled", () => {
      const state = createInitialState();
      state.boxes = {
        a1: "X",
        a2: "O",
        a3: "X",
        b1: "O",
        b2: "X",
        b3: "O",
        c1: "O",
        c2: "X",
        c3: "",
      };
      state.toPlay = "O";

      const result = played(state, { type: "PLAYED" as const, box: "c3" } as any);

      expect(result.gameOver).toBe(true);
      expect(result.draw).toBe(true);
    });
  });
});
