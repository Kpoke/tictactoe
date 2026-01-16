/**
 * Environment variable validation and configuration
 * Ensures required environment variables are set and provides type-safe access
 */

interface EnvConfig {
  API_BASE_URL: string;
  WS_BASE_URL: string;
}

/**
 * Validates and returns environment configuration
 * @throws Error if required environment variables are missing
 */
export const getEnvConfig = (): EnvConfig => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const WS_BASE_URL = process.env.REACT_APP_WS_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error(
      "REACT_APP_API_BASE_URL is not set. Please check your .env file."
    );
  }

  if (!WS_BASE_URL) {
    throw new Error(
      "REACT_APP_WS_BASE_URL is not set. Please check your .env file."
    );
  }

  return {
    API_BASE_URL,
    WS_BASE_URL,
  };
};

/**
 * Gets environment configuration with fallback values
 * Use this when you want to provide defaults instead of throwing errors
 */
export const getEnvConfigWithFallback = (): EnvConfig => {
  return {
    API_BASE_URL:
      process.env.REACT_APP_API_BASE_URL || "https://playtttoe.herokuapp.com",
    WS_BASE_URL:
      process.env.REACT_APP_WS_BASE_URL || "https://playtttoe.herokuapp.com",
  };
};
