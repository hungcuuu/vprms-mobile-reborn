import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

const initialState = {
    user: {},
    token: 'abc',
    loading: false,
};

const loginRequest = (state, action) => {
    return updateObject(state, { loading: true });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        user: action.user,
        token: action.token,
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

const registerRequest = (state, action) => {
    return updateObject(state, {
        loading: true,
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
        case actionTypes.REGISTER_REQUEST:
            return registerRequest(state, action);
        default:
            return state;
    }
};

export default reducer;
