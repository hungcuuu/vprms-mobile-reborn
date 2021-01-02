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

export const register = newUser => {
    return {
        type: actionTypes.REGISTER,
        payload: newUser,
    };
};

export const updateUser = (id, fullName, gender, callBack) => {
    return {
        type: actionTypes.UPDATE_USER,
        id,
        fullName,
        gender,
        callBack,
    };
};

export const updateUserSuccess = user => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
        user,
    };
};
