import { updateObject } from '../../utils';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    services: null,
    loading: false,
};

const fetchServices = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};

const fetchServicesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        services: action.services,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SERVICES:
            return fetchServices(state, action);
        case actionTypes.FETCH_SERVICES_SUCCESS:
            return fetchServicesSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;
