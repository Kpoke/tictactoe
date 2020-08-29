import * as actionTypes from "./actionTypes";

export const playedX = (box) => {
  return {
    type: actionTypes.PLAYED_X,
    box,
  };
};

export const playedO = (box) => {
  return {
    type: actionTypes.PLAYED_O,
    box,
  };
};

export const reset = () => {
  return {
    type: actionTypes.RESET,
  };
};

export const setPlayers = () => {
  return {
    type: actionTypes.SET_PLAYERS,
  };
};
