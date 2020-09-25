import React, { createContext, useCallback, useEffect } from "react";
import * as actions from "./store/actions/index";
import { socket } from "./config";
import { useDispatch, useSelector } from "react-redux";

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  let ws;

  const dispatch = useDispatch();

  const { toPlay, players, opponentId, winner, onlineGame } = useSelector(
    (state) => state.game
  );
  const fetchLeaderboard = useCallback(
    () => dispatch(actions.fetchLeaderboard()),
    [dispatch]
  );
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const { user, token } = useSelector((state) => state.auth);

  const played = useCallback((box) => dispatch(actions.played(box)), [
    dispatch,
  ]);

  const setWinner = useCallback((side) => dispatch(actions.setWinner(side)), [
    dispatch,
  ]);

  useEffect(() => {
    if (winner && user && onlineGame) {
      if (winner.username === user.username) {
        socket.emit("updateuserpoints", token);
      }
    }
  }, [token, user, winner, onlineGame]);

  //socket functions
  const fixWinner = (side) => {
    if (isAuthenticated) {
      socket.emit("winner", { side, opponentId });
    }
    setWinner(side);
  };

  const setPlayers = (user, showAuthForm, showLoading) => {
    if (isAuthenticated) {
      showLoading(true);
      socket.emit("setPlayers", user.username);
    } else {
      showAuthForm(true);
    }
  };

  const play = (box) => {
    if (toPlay === players[0].side) {
      socket.emit("play", { box, opponentId });
      played(box);
    }
  };

  socket.on("play", (box) => played(box));

  socket.on("updated", () => {
    fetchLeaderboard();
  });

  socket.on("winner", (side) => setWinner(side));

  socket.on("an error", (error) => console.log(error));

  ws = {
    play,
    setPlayers,
    fixWinner,
  };

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
