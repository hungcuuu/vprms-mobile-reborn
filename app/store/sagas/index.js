import { all } from 'redux-saga/effects';

import authSagas from './auth';
import servicesSagas from './services';

export default function* rootSaga() {
    yield all([authSagas(), servicesSagas()]);
}
