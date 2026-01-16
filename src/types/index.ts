// Game Types
export type BoxKey = "a1" | "a2" | "a3" | "b1" | "b2" | "b3" | "c1" | "c2" | "c3";
export type Side = "X" | "O" | "";

export interface Boxes {
  a1: Side;
  a2: Side;
  a3: Side;
  b1: Side;
  b2: Side;
  b3: Side;
  c1: Side;
  c2: Side;
  c3: Side;
}

export interface Player {
  username: string;
  side: "X" | "O";
}

export interface TimeObject {
  user: number;
  opponent: number;
}

export type Winner = Player | { username: string };

export interface GameState {
  boxes: Boxes;
  timeObject: TimeObject;
  onlineGame: boolean;
  username: string | null;
  opponentId: string | null;
  gameOver: boolean;
  gameStarted: boolean;
  won: string | null;
  draw: boolean;
  players: Player[];
  winner: Winner | null;
  toPlay: "X" | "O";
  leaders: Leader[];
  error: boolean;
  loading: boolean;
  winningCombination: [BoxKey, BoxKey, BoxKey] | null;
}

export interface Leader {
  username: string;
  points: number;
  _id?: string;
}

// Auth Types
export interface User {
  username: string;
  _id?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  error: string | null;
  loading: boolean;
}

// Action Types
export interface PlayedAction {
  type: "PLAYED";
  box: BoxKey;
  timeObject?: TimeObject;
}

export interface PlayedActionPayload {
  box: BoxKey;
  timeObject?: TimeObject;
}

export interface SetPlayersAction {
  type: "SET_PLAYERS";
  number: number;
}

export interface SetOnlinePlayersAction {
  type: "SET_ONLINE_PLAYERS";
  username: string;
  opponentId: string;
  opponentSide: "X" | "O";
  opponentUsername: string;
}

export interface SetWinnerAction {
  type: "SET_WINNER";
  side: "X" | "O";
}

export interface SetLeaderboardAction {
  type: "SET_LEADERBOARD";
  leaders: Leader[];
}

export interface LeaderboardStartAction {
  type: "LEADERBOARD_START";
}

export interface LeaderboardFailedAction {
  type: "LEADERBOARD_FAILED";
}

export interface AuthStartAction {
  type: "AUTH_START";
}

export interface AuthSuccessAction {
  type: "AUTH_SUCCESS";
  token: string;
  user: User;
}

export interface AuthFailAction {
  type: "AUTH_FAIL";
  error: string;
}

export interface AuthLogoutAction {
  type: "AUTH_LOGOUT";
}

export type GameAction =
  | PlayedAction
  | SetPlayersAction
  | SetOnlinePlayersAction
  | SetWinnerAction
  | SetLeaderboardAction
  | LeaderboardStartAction
  | LeaderboardFailedAction;

export type AuthAction =
  | AuthStartAction
  | AuthSuccessAction
  | AuthFailAction
  | AuthLogoutAction;

export type RootState = {
  game: GameState;
  auth: AuthState;
};

// Validation Rules
export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isNumeric?: boolean;
}
