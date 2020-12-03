import { put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';
import axios from '../../axios';

function* login(action) {
  const { phoneNumber, password } = action;
  try {
    const response = yield axios
      .post('/authenticate', { username: phoneNumber, password })
      .then((res) => res.data);
    const { jwtToken } = response;
    yield AsyncStorage.setItem('AUTH_TOKEN', jwtToken);
    const user = { phoneNumber, fullName: 'Test Login', role: 'ADMIN' };
    yield put(actions.loginSuccess(user, jwtToken));
  } catch (error) {
    console.log('Error: ', error);
    yield put(actions.loginFailed(error));
  }
}

export default function* authSagas() {
  yield takeEvery(actionTypes.LOGIN_REQUEST, login);
}
