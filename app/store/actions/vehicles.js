import * as actionTypes from './actionTypes';

export const fetchVehicles = (id) => {
    return {
        type: actionTypes.FETCH_VEHICLE,
        id,
    };
};

export const fetchVehiclesSuccess = (vehicles) => {
    return {
        type: actionTypes.FETCH_VEHICLE_SUCCESS,
        vehicles,
    };
};

export const createVehicle = (vehicle, callBack) => {
    return {
        type: actionTypes.CREATE_VEHICLE,
        vehicle,
        callBack,
    };
};

export const createVehicleSuccess = (vehicle) => {
    return {
        vehicle,
        type: actionTypes.CREATE_VEHICLE_SUCCESS,
    };
};

export const createVehicleFail = (error) => {
    return {
        error,
        type: actionTypes.CREATE_VEHICLE_FAIL,
    };
};

export const deleteVehicle = (id, callBack) => {
    return {
        type: actionTypes.DELETE_VEHICLE,
        id,
        callBack,
    };
};

export const deleteVehicleSuccess = (id) => {
    return {
        type: actionTypes.DELETE_VEHICLE_SUCCESS,
        id,
    };
};

export const deleteVehicleFail = (error) => {
    return {
        type: actionTypes.DELETE_VEHICLE_FAIL,
        error,
    };
};

export const updateVehicle = (vehicle, callBack) => {
    return {
        type: actionTypes.UPDATE_VEHICLE,
        vehicle,
        callBack,
    };
};
export const updateVehicleSuccess = (vehicle) => {
    return {
        type: actionTypes.UPDATE_VEHICLE_SUCCESS,
        vehicle,
    };
};
export const updateVehicleFail = (error) => {
    return {
        type: actionTypes.UPDATE_VEHICLE_FAIL,
        error,
    };
};
