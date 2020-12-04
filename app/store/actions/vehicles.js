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
