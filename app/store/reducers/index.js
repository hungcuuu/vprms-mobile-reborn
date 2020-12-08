import { combineReducers } from 'redux';

import authReducer from './auth';
import servicesReducer from './services';
import vehiclesReducer from './vehicles';
const rootReducer = combineReducers({
    auth: authReducer,
    services: servicesReducer,
    vehicles: vehiclesReducer,
});

export default rootReducer;
