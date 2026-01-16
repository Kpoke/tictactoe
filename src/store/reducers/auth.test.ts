import authReducer from "./auth";
import * as actionTypes from "../actions/actionTypes";
import type { AuthState, User } from "../../types";

describe("authReducer", () => {
  const initialState: AuthState = {
    token: null,
    user: null,
    error: null,
    loading: false,
  };

  it("should return initial state for unknown action", () => {
    const result = authReducer(undefined, { type: "UNKNOWN" as any });
    expect(result).toEqual(initialState);
  });

  it("should handle AUTH_START action", () => {
    const action: { type: typeof actionTypes.AUTH_START } = {
      type: actionTypes.AUTH_START,
    };

    const result = authReducer(initialState, action as any);

    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it("should handle AUTH_SUCCESS action", () => {
    const user: User = { username: "testuser" };
    const token = "test-token-123";
    const action: { type: typeof actionTypes.AUTH_SUCCESS; token: string; user: User } = {
      type: actionTypes.AUTH_SUCCESS,
      token,
      user,
    };

    const result = authReducer(initialState, action as any);

    expect(result.token).toBe(token);
    expect(result.user).toEqual(user);
    expect(result.loading).toBe(false);
    expect(result.error).toBeNull();
  });

  it("should handle AUTH_FAIL action", () => {
    const error = "Invalid credentials";
    const action: { type: typeof actionTypes.AUTH_FAIL; error: string } = {
      type: actionTypes.AUTH_FAIL,
      error,
    };

    const result = authReducer(initialState, action as any);

    expect(result.error).toBe(error);
    expect(result.loading).toBe(false);
  });

  it("should handle AUTH_LOGOUT action", () => {
    const state: AuthState = {
      token: "test-token",
      user: { username: "testuser" },
      error: null,
      loading: false,
    };
    const action: { type: typeof actionTypes.AUTH_LOGOUT } = {
      type: actionTypes.AUTH_LOGOUT,
    };

    const result = authReducer(state, action as any);

    expect(result.token).toBeNull();
    expect(result.user).toBeNull();
  });
});
