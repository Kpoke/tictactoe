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

export const setPlayers = (number) => {
  return {
    type: actionTypes.SET_PLAYERS,
    number,
  };
};
