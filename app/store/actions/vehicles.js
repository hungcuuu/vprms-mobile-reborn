import * as actionTypes from './actionTypes';

export const fetchVehicles = () => {
    return {
        type: actionTypes.FETCH_VEHICLE,
    };
};

export const fetchVehiclesSuccess = (vehicles) => {
    return {
        type: actionTypes.FETCH_VEHICLE_SUCCESS,
        vehicles,
    };
};

export const createVehicle = (vehicle) => {
    return {
        type: actionTypes.CREATE_VEHICLE,
        vehicle,
    };
};

export const createVehicleSuccess = (vehicle) => {
    return {
        vehicle,
        type: actionTypes.CREATE_VEHICLE_SUCCESS,
    };
};
