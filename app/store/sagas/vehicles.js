import { put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';
import { VEHICLES } from '../../data/dummy-data';
import axios from '../../axios';

function* fetchVehicles(action) {
    try {
        yield put(actions.fetchVehiclesSuccess([...VEHICLES]));
    } catch (error) {
        console.log(error);
    }
}
function* createVehicle(action) {
    try {
        let data = yield axios
            .post('vehicles/', action.vehicle, {
                headers: {
                    'Content-Type': 'application/json ; charset=UTF-8',
                    Accept: 'application/json',
                },
            })
            .then((rs) => rs.data);

        yield put(actions.createVehicleSuccess(data));
        action.callBack();
    } catch (error) {
        // put(actions.createVehicleFail(error));
        console.log(error);
    }
}
function* deleteVehicle(action) {
    try {
        yield put(actions.deleteVehicleSuccess(action.id));
        // throw 'Error';
    } catch (error) {
        // console.log(error);
        yield put(actions.deleteVehicleFail(error));
    }
}
function* updateVehicle(action) {
    try {
        yield put(actions.updateVehicleSuccess(action.vehicle));
    } catch (error) {
        yield put(actions.updateVehicleFail(error));
    }
}
export default function* vehiclesSagas() {
    yield takeEvery(actionTypes.FETCH_VEHICLE, fetchVehicles);
    yield takeEvery(actionTypes.CREATE_VEHICLE, createVehicle);
    yield takeEvery(actionTypes.DELETE_VEHICLE, deleteVehicle);
    yield takeEvery(actionTypes.UPDATE_VEHICLE, updateVehicle);
}
