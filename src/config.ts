import io, { Socket } from "socket.io-client";
import { getEnvConfigWithFallback } from "./utils/env";
import { isOnlineMultiplayerEnabled } from "./utils/featureFlags";

// Conditionally initialize socket only if online multiplayer is enabled
let socketInstance: Socket | null = null;

if (isOnlineMultiplayerEnabled()) {
  const { WS_BASE_URL } = getEnvConfigWithFallback();
  socketInstance = io(WS_BASE_URL);
}

// Export a getter function that returns null if feature is disabled
export const getSocket = (): Socket | null => {
  return socketInstance;
};

// Export socket for backward compatibility (will be null if disabled)
export const socket: Socket | null = socketInstance;
