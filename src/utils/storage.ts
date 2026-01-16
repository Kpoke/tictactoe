/**
 * Secure storage utility for handling authentication tokens and user data.
 * Provides a centralized interface for storage operations with error handling.
 */

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

/**
 * Storage interface for token and user data operations
 */
interface StorageService {
  setToken: (token: string) => boolean;
  getToken: () => string | null;
  removeToken: () => void;
  setUser: (user: unknown) => boolean;
  getUser: <T = unknown>() => T | null;
  removeUser: () => void;
  clear: () => void;
}

/**
 * Secure storage service implementation
 * Note: For production, consider using httpOnly cookies instead of localStorage
 * to prevent XSS attacks. This requires backend changes.
 */
const storageService: StorageService = {
  /**
   * Stores authentication token securely
   * @param token - The authentication token to store
   * @returns true if successful, false otherwise
   */
  setToken: (token: string): boolean => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      return true;
    } catch (error) {
      // Storage quota exceeded or localStorage disabled
      return false;
    }
  },

  /**
   * Retrieves the authentication token
   * @returns The token if found, null otherwise
   */
  getToken: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      return null;
    }
  },

  /**
   * Removes the authentication token
   */
  removeToken: (): void => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      // Ignore errors during removal
    }
  },

  /**
   * Stores user data securely
   * @param user - The user object to store
   * @returns true if successful, false otherwise
   */
  setUser: (user: unknown): boolean => {
    try {
      const userString = JSON.stringify(user);
      localStorage.setItem(USER_KEY, userString);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Retrieves user data
   * @returns The user object if found, null otherwise
   */
  getUser: <T = unknown>(): T | null => {
    try {
      const userString = localStorage.getItem(USER_KEY);
      if (!userString) return null;
      return JSON.parse(userString) as T;
    } catch (error) {
      return null;
    }
  },

  /**
   * Removes user data
   */
  removeUser: (): void => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      // Ignore errors during removal
    }
  },

  /**
   * Clears all authentication data
   */
  clear: (): void => {
    storageService.removeToken();
    storageService.removeUser();
  },
};

export default storageService;
