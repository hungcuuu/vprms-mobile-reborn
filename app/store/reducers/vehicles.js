import { updateObject } from '../../utils';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    vehicles: [],
    loading: false,
    error: null,
    currentVehicle: {},
};

const updateCurrentVehicle = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};
const updateCurrentVehicleSuccess = (state, action) => {
    return updateObject(state, {
        currentVehicle: action.vehicle,
        loading: false,
    });
};
const fetchVehicles = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const fetchVehiclesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        vehicles: action.vehicles,
        error: null,
        currentVehicle: action.vehicles[0],
    });
};
const createVehicle = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const createVehicleSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        vehicles: state.vehicles.concat({ ...action.vehicle }),
        error: null,
    });
};

const createVehicleFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const deleteVehicle = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const deleteVehicleSuccess = (state, action) => {
    return updateObject(state, {
        vehicles: state.vehicles.filter((veh) => veh.id !== action.id),
        error: null,
    });
};
const deleteVehicleFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const updateVehicle = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};
const updateVehicleSuccess = (state, action) => {
    const updatedVehicles = [...state.vehicles];
    const updatedIndex = updatedVehicles.findIndex(
        (vehicle) => vehicle.id === action.vehicle.id,
    );
    updatedVehicles[updatedIndex] = action.vehicle;
    return updateObject(state, {
        error: null,
        vehicles: updatedVehicles,
        loading: false,
    });
};
const updateVehicleFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VEHICLE:
            return fetchVehicles(state, action);
        case actionTypes.FETCH_VEHICLE_SUCCESS:
            return fetchVehiclesSuccess(state, action);
        case actionTypes.CREATE_VEHICLE:
            return createVehicle(state, action);
        case actionTypes.CREATE_VEHICLE_SUCCESS:
            return createVehicleSuccess(state, action);
        case actionTypes.CREATE_VEHICLE_FAIL:
            return createVehicleFail(state, action);
        case actionTypes.DELETE_VEHICLE:
            return deleteVehicle(state, action);
        case actionTypes.DELETE_VEHICLE_SUCCESS:
            return deleteVehicleSuccess(state, action);
        case actionTypes.DELETE_VEHICLE_FAIL:
            return deleteVehicleFail(state, action);
        case actionTypes.UPDATE_VEHICLE:
            return updateVehicle(state, action);
        case actionTypes.UPDATE_VEHICLE_SUCCESS:
            return updateVehicleSuccess(state, action);
        case actionTypes.UPDATE_VEHICLE_FAIL:
            return updateVehicleFail(state, action);
        case actionTypes.UPDATE_CURRENT_VEHICLE:
            return updateCurrentVehicle(state, action);
        case actionTypes.UPDATE_CURRENT_VEHICLE_SUCCESS:
            return updateCurrentVehicleSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;
