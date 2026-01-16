import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import type { AuthState, AuthAction, AuthStartAction, AuthSuccessAction, AuthFailAction, AuthLogoutAction } from "../../types";

const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
  loading: false,
};

const authStart = (state: AuthState, action: AuthStartAction): AuthState => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state: AuthState, action: AuthSuccessAction): AuthState => {
  return updateObject(state, {
    token: action.token,
    user: action.user,
    error: null,
    loading: false,
  });
};

const authFail = (state: AuthState, action: AuthFailAction): AuthState => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state: AuthState, action: AuthLogoutAction): AuthState => {
  return updateObject(state, { token: null, user: null });
};

const reducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
