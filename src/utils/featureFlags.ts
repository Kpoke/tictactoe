/**
 * Feature flags for backend-dependent features
 * Allows toggling features that require backend/API connectivity
 */

export interface FeatureFlags {
  enableBackend: boolean;
  enableAuth: boolean;
  enableOnlineMultiplayer: boolean;
  enableLeaderboard: boolean;
  enableUserPoints: boolean;
}

/**
 * Get feature flags from environment variables
 * Defaults to false if backend is not explicitly enabled
 */
export const getFeatureFlags = (): FeatureFlags => {
  const enableBackend = process.env.REACT_APP_ENABLE_BACKEND === "true";
  
  return {
    enableBackend,
    enableAuth: enableBackend && process.env.REACT_APP_ENABLE_AUTH !== "false",
    enableOnlineMultiplayer: enableBackend && process.env.REACT_APP_ENABLE_ONLINE_MULTIPLAYER !== "false",
    enableLeaderboard: enableBackend && process.env.REACT_APP_ENABLE_LEADERBOARD !== "false",
    enableUserPoints: enableBackend && process.env.REACT_APP_ENABLE_USER_POINTS !== "false",
  };
};

/**
 * Feature flags singleton
 */
export const featureFlags = getFeatureFlags();

/**
 * Check if backend features are enabled
 */
export const isBackendEnabled = (): boolean => {
  return featureFlags.enableBackend;
};

/**
 * Check if authentication is enabled
 */
export const isAuthEnabled = (): boolean => {
  return featureFlags.enableAuth;
};

/**
 * Check if online multiplayer is enabled
 */
export const isOnlineMultiplayerEnabled = (): boolean => {
  return featureFlags.enableOnlineMultiplayer;
};

/**
 * Check if leaderboard is enabled
 */
export const isLeaderboardEnabled = (): boolean => {
  return featureFlags.enableLeaderboard;
};

/**
 * Check if user points are enabled
 */
export const isUserPointsEnabled = (): boolean => {
  return featureFlags.enableUserPoints;
};
