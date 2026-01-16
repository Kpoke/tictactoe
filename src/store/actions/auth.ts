import axios from "axios";
import * as actionTypes from "./actionTypes";
import type { User, AuthAction, RootState } from "../../types";
import type { ThunkDispatch } from "redux-thunk";
import storageService from "../../utils/storage";
import logger from "../../utils/logger";
import { getEnvConfigWithFallback } from "../../utils/env";

export const authStart = (): { type: "AUTH_START" } => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token: string, user: User): { type: "AUTH_SUCCESS"; token: string; user: User } => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    user,
  };
};

export const authFail = (error: string): { type: "AUTH_FAIL"; error: string } => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

/**
 * Logs out the user and clears authentication data
 * @returns Logout action
 */
export const logout = (): { type: "AUTH_LOGOUT" } => {
  storageService.clear();
  logger.info("User logged out");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (authData: { username: string; password: string }, isSignup: boolean) => {
  return (dispatch: ThunkDispatch<RootState, unknown, AuthAction>) => {
    dispatch(authStart());
    const { API_BASE_URL: baseUrl } = getEnvConfigWithFallback();
    const url = isSignup ? `${baseUrl}/api/signup` : `${baseUrl}/api/login`;

    axios
      .post<{ token: string; user: User }>(url, authData)
      .then((response) => {
        const success = storageService.setToken(response.data.token);
        const userSuccess = storageService.setUser(response.data.user);
        
        if (!success || !userSuccess) {
          logger.error("Failed to store authentication data");
          dispatch(authFail("Failed to store authentication data"));
          return;
        }
        
        dispatch(authSuccess(response.data.token, response.data.user));
        logger.info("User authenticated successfully");
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || err.response?.data || "Authentication failed";
        logger.error("Authentication failed:", errorMessage);
        dispatch(authFail(typeof errorMessage === "string" ? errorMessage : JSON.stringify(errorMessage)));
      });
  };
};

/**
 * Checks if user is authenticated by verifying stored token and user data
 * @returns Thunk action that dispatches auth success or logout
 */
export const authCheckState = () => {
  return (dispatch: ThunkDispatch<RootState, unknown, AuthAction>) => {
    const token = storageService.getToken();
    const user = storageService.getUser<User>();
    
    if (!token || !user) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, user));
      logger.debug("Auth state restored from storage");
    }
  };
};
