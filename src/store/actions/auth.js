import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (authData, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    let url = isSignup
      ? "http://localhost:3001/api/signup"
      : "http://localhost:3001/api/login";

    axios
      .post(url, authData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(authSuccess(response.data.token, response.data.user));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, user));
    }
  };
};
