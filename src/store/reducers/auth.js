import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  user: null,
  error: null,
  loading: false,
  // authRedirectPath: "/"
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    user: action.user,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, user: null });
};

// const setAuthRedirectPath = (state, action) => {
//   const state2 = updateObject(state, { authRedirectPath: action.path });
//   return state2;
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    // case actionTypes.SET_AUTH_REDIRECT_PATH:
    //   return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
