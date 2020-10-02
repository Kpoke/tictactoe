import axios from "axios";
import * as actionTypes from "./actionTypes";

export const played = (box, timeObject) => {
  return {
    type: actionTypes.PLAYED,
    box,
    timeObject,
  };
};

export const setPlayers = (number) => {
  return {
    type: actionTypes.SET_PLAYERS,
    number,
  };
};

export const setOnlinePlayers = (username, opponent) => {
  return {
    type: actionTypes.SET_ONLINE_PLAYERS,
    username,
    opponentId: opponent.id,
    opponentSide: opponent.side,
    opponentUsername: opponent.username,
  };
};

export const setWinner = (side) => {
  return {
    type: actionTypes.SET_WINNER,
    side,
  };
};

const fetchLeaderboardStart = () => {
  return {
    type: actionTypes.LEADERBOARD_START,
  };
};

const leaderboardFailed = () => {
  return {
    type: actionTypes.LEADERBOARD_FAILED,
  };
};

const setLeaderboard = ({ leaders }) => {
  return {
    type: actionTypes.SET_LEADERBOARD,
    leaders,
  };
};

export const fetchLeaderboard = () => {
  return (dispatch) => {
    dispatch(fetchLeaderboardStart());
    axios
      .get(`http://localhost:3001/api/leaderBoard`)
      .then((response) => {
        dispatch(setLeaderboard(response.data));
      })
      .catch((error) => {
        dispatch(leaderboardFailed());
      });
  };
};
