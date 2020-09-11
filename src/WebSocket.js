import React, { createContext, useCallback } from "react";
import * as actions from "./store/actions/index";
import { socket } from "./config";
import { useDispatch, useSelector } from "react-redux";

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  let ws;

  const dispatch = useDispatch();

  const { toPlay, players, opponentId } = useSelector((state) => state.game);

  const played = useCallback((box) => dispatch(actions.played(box)), [
    dispatch,
  ]);
  const setOnlinePlayers = useCallback(
    (opponent) => dispatch(actions.setOnlinePlayers(opponent)),
    [dispatch]
  );

  const setPlayers = (username) => {
    socket.emit("setPlayers", username);
  };

  const play = (box) => {
    if (toPlay === players[0].side) {
      socket.emit("play", { box, opponentId });
      played(box);
    }
  };

  socket.on("matched", (opponent) => {
    setOnlinePlayers(opponent);
  });

  socket.on("play", (box) => played(box));
  ws = {
    play,
    setPlayers,
  };

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
