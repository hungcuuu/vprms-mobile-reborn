import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

const initialState = {
    user: null,
    loading: false,
};

const loginRequest = (state, action) => {
    return updateObject(state, { loading: true });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        user: action.user,
    });
};

const loginFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
    });
};

const logoutSuccess = (state, action) => {
    return updateObject(state, {
        user: null,
        token: null,
    });
};
const updateUser = (state, action) => {
    return updateObject(state, { loading: true });
};

const updateUserSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        user: action.user,
    });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return loginRequest(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAILED:
            return loginFailed(state, action);
        case actionTypes.LOGOUT:
            return logoutSuccess(state, action);
        case actionTypes.UPDATE_USER:
            return updateUser(state, action);
        case actionTypes.UPDATE_USER_SUCCESS:
            return updateUserSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;
