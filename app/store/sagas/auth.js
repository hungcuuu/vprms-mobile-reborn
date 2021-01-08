import { put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';
import axios from '../../axios';

function* login(action) {
    const { phoneNumber, password } = action;
    try {
        const deviceToken = yield messaging().getToken();

        const data = yield axios
            .post('/users', { phoneNumber, password, deviceToken })
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
    try {
        const data = yield axios
            .post('/users/signup', action.payload)
            .then(({ data }) => data);
        yield AsyncStorage.setItem('user', JSON.stringify(data));
        yield put(actions.loginSuccess(data));
    } catch (error) {
        console.log(error);
    }
}
function* updateUser(action) {
    const { id, fullName, gender } = action;
    console.log(id, fullName, gender);
    try {
        const data = yield axios
            .post(`/users/${id}`, { fullName, gender })
            .then(({ data }) => data);
        yield AsyncStorage.setItem('user', JSON.stringify(data));
        yield put(actions.updateUserSuccess(data));
        action.callBack();
    } catch (error) {
        console.log(error);
    }
}
export default function* authSagas() {
    yield takeEvery(actionTypes.LOGIN_REQUEST, login);
    yield takeEvery(actionTypes.LOGOUT_REQUEST, logout);
    yield takeEvery(actionTypes.REGISTER, register);
    yield takeEvery(actionTypes.UPDATE_USER, updateUser);
}
