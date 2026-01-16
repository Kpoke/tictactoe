import React, { createContext, useCallback, useEffect, useMemo } from "react";
import * as actions from "./store/actions/index";
import { socket } from "./config";
import type { BoxKey, TimeObject, User } from "./types";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useSocketHandlers } from "./hooks/useSocketHandlers";
import logger from "./utils/logger";

interface WebSocketContextType {
  play: (box: BoxKey, localTimeObject: TimeObject) => void;
  setPlayers: (user: User, showAuthForm: (show: boolean) => void, showLoading: (show: boolean) => void) => void;
  fixWinner: (side: "X" | "O") => void;
  cancelWaiting: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export { WebSocketContext };

interface WebSocketProviderProps {
  children: React.ReactNode;
}

const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { toPlay, players, opponentId, winner, onlineGame } = useAppSelector(
    (state) => state.game
  );
  const fetchLeaderboard = useCallback(
    () => dispatch(actions.fetchLeaderboard()),
    [dispatch]
  );
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const { user, token } = useAppSelector((state) => state.auth);

  const played = useCallback(
    (box: BoxKey, timeObject?: TimeObject) => dispatch(actions.played(box, timeObject)),
    [dispatch]
  );

  const setWinner = useCallback(
    (side: "X" | "O") => dispatch(actions.setWinner(side)),
    [dispatch]
  );

  // Update user points when winner is determined
  useEffect(() => {
    if (winner && user && onlineGame && token) {
      if (winner.username === user.username) {
        socket.emit("updateuserpoints", token);
        logger.debug("User points updated after win");
      }
    }
  }, [token, user, winner, onlineGame]);

  // Register socket listeners using custom hook
  useSocketHandlers({
    onUpdated: fetchLeaderboard,
    onWinner: setWinner,
  });

  //socket functions - wrapped in useCallback to prevent unnecessary re-renders
  const fixWinner = useCallback(
    (side: "X" | "O") => {
      if (isAuthenticated && opponentId) {
        socket.emit("winner", { side, opponentId });
      }
      setWinner(side);
    },
    [isAuthenticated, opponentId, setWinner]
  );

  const setPlayers = useCallback(
    (user: User, showAuthForm: (show: boolean) => void, showLoading: (show: boolean) => void) => {
      if (isAuthenticated) {
        showLoading(true);
        socket.emit("setPlayers", user.username);
      } else {
        showAuthForm(true);
      }
    },
    [isAuthenticated]
  );

  const cancelWaiting = useCallback(() => {
    socket.emit("cancel");
  }, []);

  const play = useCallback(
    (box: BoxKey, localTimeObject: TimeObject) => {
      if (toPlay === players[0]?.side && opponentId) {
        socket.emit("play", { box, opponentId });
        played(box, localTimeObject);
      }
    },
    [toPlay, players, opponentId, played]
  );

  // Memoize WebSocket context value to prevent unnecessary re-renders
  const ws: WebSocketContextType = useMemo(
    () => ({
      play,
      setPlayers,
      fixWinner,
      cancelWaiting,
    }),
    [play, setPlayers, fixWinner, cancelWaiting]
  );

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
