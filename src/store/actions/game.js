import * as actionTypes from "./actionTypes";

export const played = (box, side) => {
  return {
    type: actionTypes.PLAYED,
    box,
    side,
  };
};

export const setPlayers = (number) => {
  return {
    type: actionTypes.SET_PLAYERS,
    number,
  };
};

export const setOnlinePlayers = ({ id, username, side }) => {
  return {
    type: actionTypes.SET_ONLINE_PLAYERS,
    id,
    username,
    side,
  };
};

export const setWinnerDueToTime = (side) => {
  return {
    type: actionTypes.SET_WINNER,
    side,
  };
};
