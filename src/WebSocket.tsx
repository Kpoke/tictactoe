import React, { createContext, useCallback, useEffect, useMemo } from "react";
import * as actions from "./store/actions/index";
import { getSocket } from "./config";
import type { BoxKey, TimeObject, User } from "./types";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useSocketHandlers } from "./hooks/useSocketHandlers";
import logger from "./utils/logger";
import { isOnlineMultiplayerEnabled, isLeaderboardEnabled, isUserPointsEnabled } from "./utils/featureFlags";

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
  const socket = getSocket();

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
    if (socket && isUserPointsEnabled() && winner && user && onlineGame && token) {
      if (winner.username === user.username) {
        socket.emit("updateuserpoints", token);
        logger.debug("User points updated after win");
      }
    }
  }, [socket, token, user, winner, onlineGame]);

  // Register socket listeners using custom hook (only if online multiplayer is enabled)
  useSocketHandlers({
    onUpdated: isLeaderboardEnabled() ? fetchLeaderboard : () => {},
    onWinner: setWinner,
  });

  //socket functions - wrapped in useCallback to prevent unnecessary re-renders
  const fixWinner = useCallback(
    (side: "X" | "O") => {
      if (socket && isAuthenticated && opponentId) {
        socket.emit("winner", { side, opponentId });
      }
      setWinner(side);
    },
    [socket, isAuthenticated, opponentId, setWinner]
  );

  const setPlayers = useCallback(
    (user: User, showAuthForm: (show: boolean) => void, showLoading: (show: boolean) => void) => {
      if (!socket || !isOnlineMultiplayerEnabled()) {
        showAuthForm(true);
        return;
      }
      if (isAuthenticated && user && user.username) {
        showLoading(true);
        socket.emit("setPlayers", user.username);
      } else {
        showAuthForm(true);
      }
    },
    [socket, isAuthenticated]
  );

  const cancelWaiting = useCallback(() => {
    if (socket) {
      socket.emit("cancel");
    }
  }, [socket]);

  const play = useCallback(
    (box: BoxKey, localTimeObject: TimeObject) => {
      if (socket && toPlay === players[0]?.side && opponentId) {
        socket.emit("play", { box, opponentId });
        played(box, localTimeObject);
      }
    },
    [socket, toPlay, players, opponentId, played]
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
