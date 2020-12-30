import { all, call, put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';
import axios from '../../axios';

function* login(action) {
    const { phoneNumber, password } = action;
    try {
        const data = yield axios
            .post('/users', { phoneNumber, password })
            .then(({ data }) => data);
        yield AsyncStorage.setItem('user', JSON.stringify(data));
        yield put(actions.loginSuccess(data));
    } catch (error) {
        console.log('Error: ', error);
        yield put(actions.loginFailed(error));
    }
}

function* logout(action) {
    yield AsyncStorage.clear();
    yield put(actions.logout());
}

function* register(action) {
    yield put(actions.loginRequest(action.phoneNumber, action.password));
}

export default function* authSagas() {
    yield takeEvery(actionTypes.LOGIN_REQUEST, login);
    yield takeEvery(actionTypes.LOGOUT_REQUEST, logout);
    yield takeEvery(actionTypes.REGISTER_REQUEST, register);
}
