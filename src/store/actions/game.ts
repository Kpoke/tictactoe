import axios from "axios";
import * as actionTypes from "./actionTypes";
import type { BoxKey, TimeObject, Leader, GameAction } from "../../types";
import type { ThunkDispatch } from "redux-thunk";
import type { RootState } from "../../types";
import logger from "../../utils/logger";
import { getEnvConfigWithFallback } from "../../utils/env";
import { isLeaderboardEnabled } from "../../utils/featureFlags";

export const played = (box: BoxKey, timeObject?: TimeObject): { type: "PLAYED"; box: BoxKey; timeObject?: TimeObject } => {
  return {
    type: actionTypes.PLAYED,
    box,
    timeObject,
  };
};

export const setPlayers = (number: number, boardSize: number = 3): { type: "SET_PLAYERS"; number: number; boardSize: number } => {
  return {
    type: actionTypes.SET_PLAYERS,
    number,
    boardSize,
  };
};

export const setBoardSize = (boardSize: number, winCondition: number): { type: "SET_BOARD_SIZE"; boardSize: number; winCondition: number } => {
  return {
    type: actionTypes.SET_BOARD_SIZE,
    boardSize,
    winCondition,
  };
};

export const setOnlinePlayers = (
  username: string,
  opponent: { id: string; side: "X" | "O"; username: string }
): { type: "SET_ONLINE_PLAYERS"; username: string; opponentId: string; opponentSide: "X" | "O"; opponentUsername: string } => {
  return {
    type: actionTypes.SET_ONLINE_PLAYERS,
    username,
    opponentId: opponent.id,
    opponentSide: opponent.side,
    opponentUsername: opponent.username,
  };
};

export const setWinner = (side: "X" | "O"): { type: "SET_WINNER"; side: "X" | "O" } => {
  return {
    type: actionTypes.SET_WINNER,
    side,
  };
};

const fetchLeaderboardStart = (): { type: "LEADERBOARD_START" } => {
  return {
    type: actionTypes.LEADERBOARD_START,
  };
};

const leaderboardFailed = (): { type: "LEADERBOARD_FAILED" } => {
  return {
    type: actionTypes.LEADERBOARD_FAILED,
  };
};

const setLeaderboard = (leaders: Leader[]): { type: "SET_LEADERBOARD"; leaders: Leader[] } => {
  return {
    type: actionTypes.SET_LEADERBOARD,
    leaders,
  };
};

/**
 * Fetches the leaderboard from the API
 * @returns Thunk action that dispatches leaderboard data or error
 */
export const fetchLeaderboard = () => {
  return (dispatch: ThunkDispatch<RootState, unknown, GameAction>) => {
    if (!isLeaderboardEnabled()) {
      logger.debug("Leaderboard is disabled. Skipping fetch.");
      return;
    }
    
    dispatch(fetchLeaderboardStart());
    const { API_BASE_URL } = getEnvConfigWithFallback();
    axios
      .get<{ leaders: Leader[] }>(`${API_BASE_URL}/api/leaderBoard`)
      .then((response) => {
        dispatch(setLeaderboard(response.data.leaders));
        logger.debug("Leaderboard fetched successfully");
      })
      .catch((error) => {
        logger.error("Failed to fetch leaderboard:", error);
        dispatch(leaderboardFailed());
      });
  };
};
