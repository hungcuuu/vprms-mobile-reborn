import { put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';
import { VEHICLES } from '../../data/dummy-data';

function* fetchVehicles(action) {
    try {
        yield put(actions.fetchVehiclesSuccess([...VEHICLES]));
    } catch (error) {
        console.log(error);
    }
}
function* createVehicle(action) {
    try {
        yield put(actions.createVehicleSuccess(action.vehicle));
    } catch (error) {
        console.log(error);
    }
}
export default function* vehiclesSagas() {
    yield takeEvery(actionTypes.FETCH_VEHICLE, fetchVehicles);
    yield takeEvery(actionTypes.CREATE_VEHICLE, createVehicle);
}
