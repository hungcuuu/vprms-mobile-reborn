import { updateObject } from '../../utils';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    vehicles: null,
    loading: false,
};

const fetchVehicles = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};

const fetchVehiclesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        vehicles: action.vehicles,
    });
};
const createVehicle = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};

const createVehicleSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        vehicles: state.vehicles.concat({ id: Math.random(), ...action.vehicle }),
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
        default:
            return state;
    }
};

export default reducer;
