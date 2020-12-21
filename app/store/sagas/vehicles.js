import { put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';
import { VEHICLES } from '../../data/dummy-data';
import axios from '../../axios';

function* updateCurrentVehicle(action) {
    try {
        yield put(actions.updateCurrentVehicleSuccess(action.vehicle));
        action.callBack();
    } catch (error) {
        console.log(error);
    }
}
function* fetchVehicles(action) {
    try {
        let data = yield axios
            .get('vehicles/users/' + action.id, {
                headers: {
                    'Content-Type': 'application/json ; charset=UTF-8',
                    Accept: 'application/json',
                },
            })
            .then((rs) => rs.data);
        yield put(actions.fetchVehiclesSuccess(data));
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
        yield axios.delete('vehicles/' + action.id, {
            headers: {
                'Content-Type': 'application/json ; charset=UTF-8',
                Accept: 'application/json',
            },
        });

        yield put(actions.deleteVehicleSuccess(action.id));
        action.callBack();

        // else yield put(actions.deleteVehicleFail("error"));

        // throw 'Error';
    } catch (error) {
        console.log(error);
        // yield put(actions.deleteVehicleFail(error));
    }
}
function* updateVehicle(action) {
    try {
        let data = yield axios
            .post(
                'vehicles/' + action.vehicle.id,
                {
                    boughtDate: action.vehicle.boughtDate,
                    color: action.vehicle.color,
                    modelId: action.vehicle.model.id,
                    plateNumber: action.vehicle.plateNumber,
                    vinNumber: action.vehicle.vinNumber,
                },
                {
                    headers: {
                        'Content-Type': 'application/json ; charset=UTF-8',
                        Accept: 'application/json',
                    },
                },
            )
            .then((rs) => rs.data);
        yield put(actions.updateVehicleSuccess(data));
        action.callBack();
    } catch (error) {
        yield put(actions.updateVehicleFail(error));
    }
}
export default function* vehiclesSagas() {
    yield takeEvery(actionTypes.FETCH_VEHICLE, fetchVehicles);
    yield takeEvery(actionTypes.CREATE_VEHICLE, createVehicle);
    yield takeEvery(actionTypes.DELETE_VEHICLE, deleteVehicle);
    yield takeEvery(actionTypes.UPDATE_VEHICLE, updateVehicle);
    yield takeEvery(actionTypes.UPDATE_CURRENT_VEHICLE, updateCurrentVehicle);
}
