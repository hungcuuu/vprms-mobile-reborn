import * as actionTypes from './actionTypes';

export const loginRequest = (phoneNumber, password) => {
    return {
        type: actionTypes.LOGIN_REQUEST,
        phoneNumber,
        password,
    };
};

export const loginSuccess = user => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user,
    };
};

export const loginFailed = error => {
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

export const registerRequest = (phoneNumber, password, fullname) => {
    return {
        type: actionTypes.REGISTER_REQUEST,
        phoneNumber,
        password,
        fullname,
    };
};
