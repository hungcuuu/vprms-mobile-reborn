import { put, takeEvery } from 'redux-saga/effects';

import { SERVICES } from '../../data/dummy-data';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';

function* fetchServices(action) {
    try {
        yield put(actions.fetchServicesSuccess([...SERVICES]));
    } catch (error) {
        console.log(error);
    }
}

export default function* servicesSagas() {
    yield takeEvery(actionTypes.FETCH_SERVICES, fetchServices);
}
