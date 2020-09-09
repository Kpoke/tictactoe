import React, { createContext, useCallback } from "react";
import io from "socket.io-client";
import * as actions from "./store/actions/index";
import { WS_BASE } from "./config";
import { useDispatch } from "react-redux";

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();
  const setOnlinePlayers = useCallback(
    (opponent) => dispatch(actions.setOnlinePlayers(opponent)),
    [dispatch]
  );

  const setPlayers = (username) => {
    socket.emit("setPlayers", username);
  };

  const play = (box, side) => {
    socket.emit("play", { box, side });
    dispatch();
  };

  if (!socket) {
    socket = io.connect(WS_BASE);

    socket.on("matched", (opponent) => {
      setOnlinePlayers(opponent);
    });
    ws = {
      socket,
      play,
      setPlayers,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
