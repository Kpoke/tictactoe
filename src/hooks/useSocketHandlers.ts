/**
 * Custom hook for managing WebSocket event handlers.
 * Centralizes socket event handling logic for better organization and reusability.
 */

import { useEffect } from "react";
import { socket } from "../config";
import logger from "../utils/logger";
import type { BoxKey, TimeObject } from "../types";

interface UseSocketHandlersProps {
  onUpdated?: () => void;
  onWinner?: (side: "X" | "O") => void;
  onPlay?: (data: { box: BoxKey; timeObject: TimeObject }) => void;
  onMatched?: <T = unknown>(opponent: T) => void;
  onError?: (error: unknown) => void;
}

/**
 * Custom hook for managing socket event handlers with automatic cleanup
 * @param handlers - Object containing handler functions for socket events
 */
export const useSocketHandlers = (handlers: UseSocketHandlersProps): void => {
  const { onUpdated, onWinner, onPlay, onMatched, onError } = handlers;

  // Register socket listeners
  useEffect(() => {
    if (onUpdated) {
      socket.on("updated", onUpdated);
    }

    if (onWinner) {
      socket.on("winner", onWinner);
    }

    if (onPlay) {
      socket.on("play", onPlay);
    }

    if (onMatched) {
      socket.on("matched", (data: unknown) => onMatched(data));
    }

    if (onError) {
      socket.on("an error", (error: unknown) => {
        logger.error("Socket error:", error);
        onError(error);
      });
    } else {
      // Default error handler if none provided
      socket.on("an error", (error: unknown) => {
        logger.error("Socket error:", error);
      });
    }

    // Cleanup: remove all listeners on unmount
    return () => {
      if (onUpdated) socket.off("updated");
      if (onWinner) socket.off("winner");
      if (onPlay) socket.off("play");
      if (onMatched) socket.off("matched");
      socket.off("an error");
    };
  }, [onUpdated, onWinner, onPlay, onMatched, onError]);
};
