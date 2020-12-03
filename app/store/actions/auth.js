import * as actionTypes from './actionTypes';

export const loginRequest = (phoneNumber, password) => {
  return {
    type: actionTypes.LOGIN_REQUEST,
    phoneNumber,
    password,
  };
};

export const loginSuccess = (user, token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user,
    token,
  };
};

export const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error,
  };
};

export const logoutRequest = () => {
  return {
    type: actionTypes.LOGOUT_REQUEST,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
