import { all } from 'redux-saga/effects';

import authSagas from './auth';
import cartSagas from './cart';
import servicesSagas from './services';
import vehiclesSagas from './vehicles';

export default function* rootSaga() {
    yield all([authSagas(), servicesSagas(), vehiclesSagas(), cartSagas()]);
}
