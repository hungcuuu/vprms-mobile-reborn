import * as actionTypes from './actionTypes';

export const fetchServices = () => {
    return {
        type: actionTypes.FETCH_SERVICES,
    };
};

export const fetchServicesSuccess = (services) => {
    return {
        type: actionTypes.FETCH_SERVICES_SUCCESS,
        services,
    };
};
